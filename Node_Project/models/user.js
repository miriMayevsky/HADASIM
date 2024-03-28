import mongoose from "mongoose";
import Joi from "joi";

//  This test checks that the data stored in the database meets the requirements mongoose
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "firstName field is required"],
  },
  lastName: {
    type: String,
    required: [true, "lastName field is required"],
  },
  idNumber: {
    type: String,
    required: [true, "idNumber field is required"],
    unique: true,
    minLength: [9, "The minimum digitis are 9"],
    maxLength: [9, "The maximum digitis are 9"],
  },
  birthDate: {
    type: Date,
    max: [new Date(), "birthDate cannot be in the future"],
    min: [new Date("1900-01-01"), "birthDate must be after 1900"],

  },
  address: {
    city: { type: String },
    street: { type: String },
    number: { type: Number }
  },
  phone: {
    type: String,

  },
  mobilePhone: {
    type: String,
    required: [true, "mobilePhone field is required"],
    minlength: 10,
    maxlength: 10
  }
});

userSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
//create document 
export const UserModel = mongoose.model("users", userSchema);
//create colection 
UserModel.createCollection().then(function (collection) {
  console.log('users Collection is created!');
}).catch(function (err) {
  console.log('Error creating Corona Collection:', err);
});


// Joi schema to check that the data sent from the server is correct
export const userValidator = (_user) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    idNumber: Joi.string().pattern(new RegExp('^[0-9]{9}$')).required(),
    birthDate: Joi.date().allow('').optional(),
    address: Joi.object({
      city: Joi.string().allow('').optional(),
      street: Joi.string().allow('').optional(),
      number: Joi.number().allow('').optional(),
    }),
    phone: Joi.string().allow('').optional().min(10),
    mobilePhone: Joi.string().required().pattern(new RegExp('^[0-9]{10}$')),
  })
  return schema.validate(_user);
};

