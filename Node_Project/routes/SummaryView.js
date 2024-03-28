import express from "express";
const router=express.Router();
import {getActivePatientsPerDayInLastMonth
} from '../SummaryView.js'

router.get("/", async (req, res) => {
    try {
        const activePatients = await getActivePatientsPerDayInLastMonth();
        res.json(activePatients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
