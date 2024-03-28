import { Link, useParams } from 'react-router-dom';
import React, { useState } from "react";
import { AddDisease } from './CoronaApi'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AddCorona = () => {
    let { register, handleSubmit, reset, formState: { errors } } = useForm();
    let navigate = useNavigate();
    let { idNumber } = useParams();

    const save = (data) => {
        AddDisease(idNumber, data).then((res) => {
            alert("adding the disease succeeded ");
            reset();
            navigate(`/userDetails/${idNumber}`);
        }).catch((err) => {
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            }
            else if (err.response && err.response.data) {
                alert(err.response.data);
            } else {
                alert("An error occurred while adding the disease. Please try again later.");
            }
        });
    };

    return (<>

        <div style={{ margin: "200px auto", maxWidth: "500px" }}>
            <form onSubmit={handleSubmit(save)} style={{ display: "flex", flexDirection: "column" }}>
                <label>positiveTestDate</label>
                <input {...register('positiveTestDate', {
                    required: 'Field is required',
                    max: { value: new Date().toISOString().split('T')[0], message: ' the date cannot be in the future' },
                    min: { value: '2021-01-01', message: 'The date must be later than 2021-01-01' }
                })} type="date" />
                {errors.positiveTestDate && <p>{errors.positiveTestDate.message}</p>}

                <label>recoveryDate</label>
                <input {...register('recoveryDate', {
                    max: { value: new Date().toISOString().split('T')[0], message: ' the date cannot be in the future' },
                    min: { value: '2021-01-01', message: 'The date must be later than 2021-01-01' },
                })} type="date" />
                {errors.recoveryDate && <p>{errors.recoveryDate.message}</p>}
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

export default AddCorona;

