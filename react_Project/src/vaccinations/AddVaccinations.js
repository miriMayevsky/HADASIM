import { Link } from 'react-router-dom';
import React, { useState,useEffect  } from "react";
import { useForm } from "react-hook-form";
import { PostVaccinations } from './VaccinationsApi'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddVaccinations = () => {
    let { register, handleSubmit, reset, formState: { errors } } = useForm();
    let navigate = useNavigate();
    let { idNumber } = useParams();

    const save = (data) => {
        

        PostVaccinations(idNumber, data).then((res) => {
            alert("Adding the vaccine succeeded ");
            reset();
            navigate(`/userDetails/${idNumber}`);
        }).catch((err) => {
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert("An error occurred while adding the disease. Please try again later.");
            }
            console.error(err);
            console.log(err.response.data.message);

            // alert(`error ! ${JSON.stringify(err.response.data)}`);
        });
        
    };

    return (
        <>
            <div style={{ margin: "200px auto", maxWidth: "500px" }}>
                <form onSubmit={handleSubmit(save)} style={{ display: "flex", flexDirection: "column" }}>
                    <label>date</label>
                    <input {...register('date', {
                    required: 'Field is required',
                    max: { value: new Date().toISOString().split('T')[0], message:' the date cannot be in the future' },
                    min: { value: '2021-01-01', message: 'The date must be later than 2021-01-01' }
                })} type="date" />
                    {errors.date && <p>{errors.date.message}</p>}

                    <div style={{ marginBottom: "10px" }}></div>

                    <label>manufacturer</label>
                    <select {...register('manufacturer', { required: 'Field is required' })}>
                        <option value=""> Select a manufacturer</option>
                        <option value="fizer">Fizer</option>
                        <option value="Moderna">Moderna</option>
                    </select>
                    {errors.manufacturer && <p>{errors.manufacturer.message}</p>}

                    <input type="submit" style={{ marginTop: "20px", textAlign: "center", display: "block" }} />
                </form>
            </div>
            <div className="c">
                <Link to={`/userDetails/${idNumber}`} style={{ marginTop: "20px", textAlign: "center", display: "block" }}>
                    back
                </Link>
            </div>
        </>
    );
}

export default AddVaccinations;
