import mongoose from "mongoose";

let autoIncrementIndex = 0;

const VaccinationSchema = new mongoose.Schema({

    idNumber: {
        type: String,
    },
    idPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        default: () => new mongoose.Types.ObjectId() // יוצר ObjectId חדש כברירת מחדל בכל פעם  
    },
    date: {
        type: Date,
        required: [true, "date field is required"],
        // unique: { index: { unique: true }, message: "Duplicate positiveTestDate for the same idNumber" },  
        max: [new Date(), "datePositive cannot be in the future"],
        min: ['2021-01-01', "Date should be after 2021 "],
    },
    manufacturer: {
        type: String,
        required: [true, "manufacturer field is required"],
    },
    index: {
        type: Number,

    }
});

VaccinationSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

//create document 
export const VaccinationModel = mongoose.model("Vaccinations", VaccinationSchema);

//create colection 
VaccinationModel.createCollection().then(function (collection) {
    console.log('Vaccination Collection is created!');
}).catch(function (err) {
    console.log('Error creating Vaccination Collection:', err);
});
// //להעלות את ינדקס ב1
// VaccinationModel.findOne({}, {}, { sort: { 'index': -1 } }, function (err, lastVaccination) {
//     if (err) {
//         console.error("Error finding last vaccination:", err);
//         return;
//     }
//     if (lastVaccination) {
//         autoIncrementIndex = lastVaccination.index;
//     }
//     console.log("autoIncrementIndex set to:", autoIncrementIndex);
// });