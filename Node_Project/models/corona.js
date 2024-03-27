import mongoose from "mongoose";
// import Joi from "joi";

// mongoose בדיקה זו מטרתה לוודא שהנתונים שנשמרים בבסיס הנתונים עונים לדרישות 
// create schema & model
let autoIncrementIndex = 0; // הערך המבוקש להיות הערך הזה + 1 בכל פעם

const CoronaSchema  = new mongoose.Schema({

    idNumber: {
        type: String,
       
    },
    idPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // מפתח זר 
        default: () => new mongoose.Types.ObjectId() // יוצר ObjectId חדש כברירת מחדל בכל פעם  
        },
    //תאריך תוצאה חיובית
    positiveTestDate: { 
        type: Date ,
        max: [new Date(), "datePositive cannot be in the future"], 
        min: ['2021-01-01', "Date should be after 2021 "],
        required: [true, "date field is required"],

        // unique: { index: { unique: true }, message: "Duplicate positiveTestDate for the same idNumber" } 
    },
    //   תאריך התאוששות
     recoveryDate: { 
        type: Date ,
        max: [new Date(), "datePositive cannot be in the future"],
        min: ['2021-01-01', "Date should be after 2021 "],
   
        // unique: { index: { unique: true }, message: "Duplicate positiveTestDate for the same idNumber" } 

    },
    index:{
        type:Number  
    }
});


CoronaSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

//create document 
export const CoronaModel=mongoose.model('coronas', CoronaSchema);

//create colection 
CoronaModel.createCollection().then(function (collection) {
    console.log('Corona Collection is created!');
}).catch(function(err) {
    console.log('Error creating Corona Collection:', err);
});

// Joi סכמה לבדיקה שהנתונים שנשלחים מהשרת תקינים ומתאימים לעיבוד נוסף 

// export const coronaValidator = (_user) => {
//     const schema = Joi.object({
//             // תאריך תוצאה חיובית במידה והיה חולה 
//             positiveTestDate: Joi.date().optional(),
//             //  במידה והיה חולה תאריך התאוששות
//             recoveryDate: Joi.date().optional()
//           })

//     return schema.validate(_user);
// };