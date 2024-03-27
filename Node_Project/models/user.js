// import mongoose from "mongoose";
// import Joi from "joi";

// // mongoose בדיקה זו מטרתה לוודא שהנתונים שנשמרים בבסיס הנתונים עונים לדרישות 
// const userSchema = new mongoose.Schema({
//     personalInfo: {
//       firstName:String,
//     //  { type: String, required: true },
//       lastName: { type: String, required: false },
//       idNumber: { type: String, required: false },
//       password: { type: String, required: false },
//       role:{type:String,default:'USER'},
//       address: {
//         city: { type: String, required: false },
//         street: { type: String, required: false },
//         number: { type: String, required: false }
//       },
//       birthDate: { type: Date, required: false },
//       phone: { type: String, required: false },
//       mobilePhone: { type: String, required: false }
//     },
//     coronaInfo: {
//       vaccines: [{
//         date: { type: Date, required: false },
//         // יַצרָן
//         manufacturer: { type: String, required: false }
//       }],
//       positiveTestDate: { type: Date },
//     //   תאריך התאוששות
//       recoveryDate: { type: Date }
//     }
//   });

// export const UserModel=mongoose.model("users",userSchema);


// // Joi סכמה לבדיקה שהנתונים שנשלחים מהשרת תקינים ומתאימים לעיבוד נוסף 
// export const userValidatorForLogin = (_user) => {

//     const schema = Joi.object({
//         idNumber: Joi.string().pattern(new RegExp('^[0-9]{9}$')).required(),
//         password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,15}$')).required()
//     });
//     return schema.validate(_user);
// }

// export const userValidator = (_user) => {
//     const schema = Joi.object({
//         personalInfo: Joi.object({
//             firstName: Joi.string(),
//             // .required(),
//             lastName: Joi.string(),
//             // .required(),
//             idNumber: Joi.string().pattern(new RegExp('^[0-9]{9}$')),
//             // .required(),
//             password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,15}$')),
//             // .required(),
//             role: Joi.string().valid("USER","ADMIN"),
//             // .required(),
//             address: Joi.object({
//               city: Joi.string(),
//             //   .required(),
//               street: Joi.string(),
//             //   .required(),
//               number: Joi.string()
//             //   .required()
//             }),
//             // .required(),
//             birthDate: Joi.date(),
//             // .required(),
//             phone: Joi.string().pattern(new RegExp('^[0-9]{10}$')),
//             // .required(),
//             mobilePhone: Joi.string()
//             // .required()
//           }),
//           coronaInfo: Joi.object({
//             vaccines: Joi.array().items(Joi.object({
//               date: Joi.date(),
//             //   .required(),
//               manufacturer: Joi.string().required()
//             })),
//             // .required(),
//             // תאריך תוצאה חיובית במידה והיה חולה 
//             positiveTestDate: Joi.date().optional(),
//                 //  במידה והיה חולה תאריך התאוששות

//             recoveryDate: Joi.date().optional()
//           })
//         });

//     return schema.validate(_user);
// };

import mongoose from "mongoose";
import Joi from "joi";

// mongoose בדיקה זו מטרתה לוודא שהנתונים שנשמרים בבסיס הנתונים עונים לדרישות 
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
    maxLength: [9, "The maximum digitis are 9"]
  },
  birthDate: {
    type: Date,
    max: [new Date(), "birthDate cannot be in the future"],
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

export const UserModel = mongoose.model("users", userSchema);

UserModel.createCollection().then(function (collection) {
  console.log('users Collection is created!');
}).catch(function (err) {
  console.log('Error creating Corona Collection:', err);
});


// Joi סכמה לבדיקה שהנתונים שנשלחים מהשרת תקינים ומתאימים לעיבוד נוסף 

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

