import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';

const SummaryView = () => {
    const [activePatients, setActivePatients] = useState([]); // State to hold active patients data
    const chartRef = useRef(null); // Reference to the chart canvas element

    // Fetch data from the server when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4600/api/active-patients-last-month');
                const data = response.data;
                const dataArray = Object.keys(data).map(date => ({ date, count: data[date] }));
                setActivePatients(dataArray);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    // Update the chart when activePatients state changes
    useEffect(() => {
        if (activePatients.length > 0 && chartRef.current) {
            const labels = activePatients.map(patient => patient.date);
            const counts = activePatients.map(patient => patient.count);

            // Destroy the existing chart instance if it exists
            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }

            // Create a new chart instance
            const ctx = chartRef.current.getContext('2d');
            chartRef.current.chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Active Patients',
                        data: counts,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y', // Display y-axis labels horizontally
                    responsive: true,
                    maintainAspectRatio: false, // Don't maintain aspect ratio to allow smaller size
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, [activePatients]);

    // Render the component
    return (
        <div>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Summary View</h1>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <canvas ref={chartRef} width="400" height="600"></canvas> {/* Canvas element for the chart */}
            </div>
            <Link to={"/"}> {/* Link to navigate back to the home page */}
                back
            </Link>
        </div>
    );
};


export default SummaryView;
