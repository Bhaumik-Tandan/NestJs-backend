import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import Company from './company.schema';
import Contact from './company.schema/contact.schema';
import Address from './company.schema/address.schema';
import Legal from './company.schema/legal.schema';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: Model<typeof Company>,
    @InjectModel(Contact.name)
    private contactModel: Model<typeof Contact>,
    @InjectModel(Address.name)
    private addressModel: Model<typeof Address>,
    @InjectModel(Legal.name)
    private legalModel: Model<typeof Legal>,
  ) {}

  async create(createCompany): Promise<any> {
    const session = await this.companyModel.startSession();
    session.startTransaction();

    try {
      const { about, contactDetails, legalInformation, offices, user } = createCompany;

      const legalInfo = await this.createLegalInformation(legalInformation, session);

      const company = new this.companyModel({
        ...about,
        legalInformation: legalInfo._id,
        user: new mongoose.Types.ObjectId(user),
      });

      const savedCompany = await company.save({ session });

      await Promise.all(contactDetails.map((contact) => this.createContact(contact, savedCompany, session)));

      await Promise.all(offices.map((office) => this.createAddress(office.address, session)));

      await session.commitTransaction();
      session.endSession();

      return savedCompany;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async createContact(contactDetails, company, session): Promise<any> {
    const contact = new this.contactModel({ ...contactDetails, company });
    return contact.save({ session });
  }

  async createAddress(addressDetails, session): Promise<any> {
    const address = new this.addressModel(addressDetails);
    return address.save({ session });
  }

  async createLegalInformation(legalInfoDetails, session): Promise<any> {
    const { registrationAddress, ...rest } = legalInfoDetails;
    const { _id } = await this.createAddress(registrationAddress, session);
    const legalInfo = new this.legalModel({
      ...rest,
      registrationAddress: _id,
    });
    return legalInfo.save({ session });
  }
}
