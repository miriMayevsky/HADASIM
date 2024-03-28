import { UserModel, userValidator } from "../models/user.js";
import { CoronaModel } from "../models/corona.js";

export const AddNewDisease = async (req, res) => {
    let { idNumber } = req.params;
    try {
        let user = await UserModel.findOne({ idNumber })
        if (!user) {
            return res.status(404).json({ type: 'not found', message: 'user not found' });
        }
        //find the last disease
        const lastDisease = await CoronaModel.findOne({ idNumber }).sort({ index: -1 });
        let lastIndex = lastDisease ? lastDisease.index : 0;
        console.log(lastIndex);
        //create new disease
        let newDisease = new CoronaModel({ idNumber, idPerson: user.id, ...req.body, index: lastIndex + 1 });
        await newDisease.save();
        // Sending the new disease record to the client
        return res.json({ newDisease });

    } catch (err) {
        res.status(400).json({ type: "error", message: `Error: ${err.message}` });
    }
}

export const getAll = async (req, res) => {
    try {
        const data = await CoronaModel.find();
        console.log(data);
        res.json(data);
    } catch (err) {
        res.status(400).json({ type: "error", message: err.message });
    }
}

export const GetById = async (req, res) => {
    let { idNumber } = req.params;

    try {
        let data = await CoronaModel.find({ idNumber })
        if (!data) {
            return res.status(404).json({ type: 'not found', message: 'User not found' });
        }
        res.json(data);
        console.log(data);
    } catch (err) {
        res.status(400).json({ type: "error", message: err.message });
    }
};


export const deleteDisease = async (req, res) => {
    let { idNumber, index } = req.params;
    try {
        let data = await CoronaModel.findOne({ idNumber, index });
        if (!data) {
            console.log(data);
            return res.status(404)
                .json({ type: 'not found', message: 'not found user to delete with such id and index' });
        }
        let deletedUser = await CoronaModel.findOneAndDelete({ idNumber, index });
        res.json(deletedUser);
    } catch (err) {
        res.status(400).json({ type: "error", message: err.message });
    }
}

export const updateDisease = async (req, res) => {
    let { idNumber, index } = req.params;
    try {
        let user = await CoronaModel.findOne({ idNumber, index });
        if (!user)
            return res.status(404)
                .json({ type: 'not found', message: 'not found user to update with such id and index' });

        let updatedCorona = req.body;
        await CoronaModel.findOneAndUpdate({ idNumber, index }, updatedCorona, { runValidators: true });
        let updatedCoronaModel = await CoronaModel.findOne({ idNumber, index });
        res.json(updatedCoronaModel);
    } catch (err) {
        res.status(400).json({ type: "error", message: err.message });
    }
};
