import { CoronaModel } from "./models/corona.js";
import { startOfMonth, endOfMonth } from "date-fns";
import { Chart } from "chart.js";

/**
 * Retrieves the number of active patients per day in the last month.
 * @returns {Object} An object where keys are dates and values are the number of active patients on that date.
 */
export const getActivePatientsPerDayInLastMonth = async () => {
  const start = startOfMonth(new Date());
  const end = endOfMonth(new Date());
  const activePatients = await CoronaModel.find({
    $and: [
      { positiveTestDate: { $lte: end } },
      { $or: [{ recoveryDate: { $gte: start } }, { recoveryDate: null }] },
    ],
  });

  const groupedByDate = activePatients.reduce((acc, patient) => {
    const date = patient.positiveTestDate.toDateString();
    acc[date] = acc[date] ? acc[date] + 1 : 1;
    return acc;
  }, {});

  return groupedByDate;
};

/**
 * Renders a line chart displaying the number of active patients per day in the last month.
 * @param {Object} activePatientsData An object where keys are dates and values are the number of active patients on that date.
 */
export const renderCharts = async (activePatientsData) => {
  const ctxActivePatients = document.getElementById("activePatientsChart");
  new Chart(ctxActivePatients, {
    type: "line",
    data: {
      labels: Object.keys(activePatientsData),
      datasets: [
        {
          label: "Active Patients",
          data: Object.values(activePatientsData),
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};
