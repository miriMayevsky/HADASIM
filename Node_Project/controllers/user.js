import { UserModel, userValidator } from "../models/user.js";
import mongoose from 'mongoose';
import { CoronaModel } from '../models/corona.js'
import { VaccinationModel } from "../models/vaccination.js";

export const addUser = async (req, res) => {
    //בודק אם עומד בתנאי סכמת גוי
    let validate = userValidator(req.body);
    if (validate.error)
        return res.status(400).json({ type: "not valid body", message: validate.error.details[0].message });
    let { idNumber } = req.body;
    try {
        // let sameUser = await UserModel.findOne({ "personalInfo.idNumber": idNumber });
        let sameUser = await UserModel.findOne({ idNumber });
        if (sameUser) {
            return res.status(409).json({ type: "same user", message: "user with same parameters already exists" });
        }
        //מכניס לסכמת mongoose את המשתמש החדש
        let newUser = new UserModel({ ...req.body });
        await newUser.save();
        return res.json({ newUser });

    }
    catch (err) {
        res.status(400).json({ type: "error", message: `err !!! ${err.message}` });
    }
}



export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await UserModel.find({});
        console.log(allUsers);
        res.json(allUsers);
    } catch (err) {
        res.status(400).json({ type: "error", message: err.message });
    }
}

export const getUserById = async (req, res) => {
    let { idNumber } = req.params;

    try {
        let user = await UserModel.findOne({ idNumber })
        if (!user) {
            return res.status(404).json({ type: 'not found', message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(400).json({ type: "error", message: err.message });
    }
};


export const deleteUser = async (req, res) => {
    let { idNumber } = req.params;
    try {
        // מחיקת המשתמש
        let deletedUser = await UserModel.findOneAndDelete({ idNumber });
        if (!deletedUser) {
            return res.status(404).json({ type: 'not found', message: 'user not found with such id' });
        }

        // מחיקת רשומות הקורונה הקשורות למשתמש לפי idNumber
        await CoronaModel.deleteMany({ idNumber });

        // מחיקת רשומות החיסונים הקשורות למשתמש לפי idNumber
        await VaccinationModel.deleteMany({ idNumber });

        res.json(deletedUser);
    } catch (err) {
        res.status(400).json({ type: "error", message: err.message });
    }
}


export const updateUser = async (req, res) => {
    let { idNumber } = req.params;
    try {
        let user = await UserModel.find({ idNumber })
        if (!user)
            return res.status(404)
                .json({ type: 'not found', message: 'not found user to delete with such id' });
        let updatedUser = req.body;
        await UserModel.findOneAndUpdate({ idNumber }, updatedUser, { runValidators: true });
        let updatedUserModel = await UserModel.findOne({ idNumber });
        res.json(updatedUserModel);
    } catch (err) {
        res.status(400).json({ type: "error", message: err.message });
    }
}
