import { Schema } from "mongoose";
import legalSchema from "./legal.schema";

const companySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        industry: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        website: {
            type: String,
            required: true,
            RegExp: /\S+\.\S+/,
        },
        employeeStrength: {
            type: Number,
            required: true,
        },
        legalInformation:{
            type: Schema.Types.ObjectId,
            ref: legalSchema.name,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        }
    },
    {
        timestamps: true,
    },
);

export default { name: 'Company', schema: companySchema };