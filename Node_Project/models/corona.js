import mongoose from "mongoose";

//  This test checks that the data stored in the database meets the requirements mongoose
const CoronaSchema  = new mongoose.Schema({
  
    idNumber: {
        type: String,
       
    },
    idPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', //foreign key
        default: () => new mongoose.Types.ObjectId() // Creates a new ObjectId by default each time  
        },
    //תאריך תוצאה חיובית
    positiveTestDate: { 
        type: Date ,
        max: [new Date(), "datePositive cannot be in the future"], 
        min: ['2021-01-01', "Date should be after 2021 "],
        required: [true, "date field is required"],
    },
    //   תאריך התאוששות
     recoveryDate: { 
        type: Date ,
        max: [new Date(), "datePositive cannot be in the future"],
        min: ['2021-01-01', "Date should be after 2021 "],
    },
    index:{
        type:Number  
    },
   
      
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

