import { Schema } from 'mongoose';
import companySchema from '.';

const contactSchema = new Schema(
  {
    title: {
      type: String,
      enum: ['Mr', 'Mrs', 'Miss', 'Ms'],
      validate: {
        validator: function() {
          return (
            (this.company != null && this.designation != null && this.name != null && this.title != null) ||
            (this.company == null && this.designation == null && this.name == null && this.title == null)
          );
        },
        message: 'Either all fields should be present or all should be absent.',
      },
    },
    name: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
      match: /^\d{10}$/,
    },
    email: {
      type: String,
      required: true,
      match: /\S+@\S+\.\S+/,
    },
    designation: {
      type: String,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: companySchema.name,
    },
  },
  {
    timestamps: true,
  },
);

export default { name: 'Contact', schema: contactSchema };
