import { UserModel, userValidator } from "../models/user.js";
import { VaccinationModel } from '../models/vaccination.js'

export const AddNewVaccination = async (req, res) => {
    let { idNumber } = req.params;
    try {
        let user = await UserModel.findOne({ idNumber })
        if (!user) {
            return res.status(404).json({ type: 'not found', message: 'user not found' });
        }

        const maxVaccinations = 4;

        // Checks if the maximum number has been reached 
        const count = await VaccinationModel.countDocuments({ idNumber });
        if (count < maxVaccinations) {

            // Finds the last vaccine 
            const lastVaccination = await VaccinationModel.findOne({ idNumber }).sort({ index: -1 });
            let lastIndex = lastVaccination ? lastVaccination.index : 0;

            //create object
            let newVaccination = new VaccinationModel({ idNumber, idPerson: user.id, ...req.body, index: lastIndex + 1 });
            await newVaccination.save();
            console.log(newVaccination);
            return res.json({ newVaccination });

        } else {
            res.status(400).send("The maximum vaccination is 4");
        }
    } catch (err) {
        res.status(400).json({ type: "error", message: `Error: ${err.message}` });
    }
}


export const getAll = async (req, res) => {
    try {
        const data = await VaccinationModel.find({});
        console.log(data);
        res.json(data);
    } catch (err) {
        res.status(400).json({ type: "error", message: err.message });
    }
}

export const GetById = async (req, res) => {
    let { idNumber } = req.params;

    try {
        let data = await VaccinationModel.find({ idNumber })
        if (!data) {
            return res.status(404).json({ type: 'not found', message: 'Vaccination not found' });
        }
        console.log(data);
        res.json(data);
    } catch (err) {
        res.status(400).json({ type: "error", message: err.message });
    }
};

export const deleteVaccination = async (req, res) => {
    let { idNumber, index } = req.params;
    try {
        let data = await VaccinationModel.find({ idNumber, index })
        if (!data) {
            console.log(data);
            return res.status(404)
                .json({ type: 'not found', message: 'not found user to delete with such id' });
        }
        let deletedVaccination = await VaccinationModel.findOneAndDelete({ idNumber, index });
        res.json(deletedVaccination);
    } catch (err) {
        res.status(400).json({ type: "error", message: err.message });
    }
}


export const updateVaccination = async (req, res) => {
    let { idNumber, index } = req.params;
    try {
        let user = await VaccinationModel.findOne({ idNumber, index })
        if (!user)
            return res.status(404)
                .json({ type: 'not found', message: 'not found user to delete with such id' });
        let updatedVaccination = req.body;
        await VaccinationModel.findOneAndUpdate({ idNumber, index }, updatedVaccination, { runValidators: true });
        let updatedVaccinationModel = await VaccinationModel.findOne({ idNumber, index });
        res.json(updatedVaccinationModel);
    } catch (err) {
        res.status(400).json({ type: "error", message: err.message });
    }
}
