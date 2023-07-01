import { Schema } from 'mongoose';

const addressSchema = new Schema(
  {
    type:{
      type: String,
      enum: ['Registered Office', 'Corporate Office', 'Branch Office','Site Office','Client Office','Head Office'],
    },
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pinode: {
      type: String,
      required: true,
      RegExp: /^\d{6}$/,
    },
  },
  {
    timestamps: true,
  },
);

export default { name: 'Address', schema: addressSchema };
