import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UpdateDisease, GetById } from './CoronaApi';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const UpdateCorona = () => {
    let navigate = useNavigate();
    let { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [coronas, setCoronas] = useState({});
    let { idNumber, index } = useParams();

    useEffect(() => {
        GetById(idNumber)
            .then((res) => {
                try {
                    setCoronas(res.data);
                    console.log(res.data);
                }
                catch (error) {
                    console.error("Error parsing JSON:", error);
                }
            })
            .catch((err) => {
                alert("Unable to load the details");
                console.error("error:" + err.message);
            });
    }, []);

    useEffect(() => {
        if (coronas[index])
            reset(coronas[index])
    }, [coronas[index]]);

    console.log(coronas[index]);

    const save = (data) => {
        UpdateDisease(idNumber, index, data)
            .then((res) => {
                alert("  The details have been successfully updated  ");
                reset()
                navigate(`/userDetails/${idNumber}`)
            })
            .catch((err) => {
                if (err.response && err.response.data && err.response.data.message) {
                    alert(err.response.data.message);
                }
                else if (err.response && err.response.data) {
                    alert(err.response.data);
                } else {
                    alert("An error occurred while update the disease. Please try again later.");
                }
            });
    };

    return (
        <div style={{ margin: "200px auto", maxWidth: "500px" }}>
            <form onSubmit={handleSubmit(save)} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ marginBottom: "10px" }}></div>

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
                    min: { value: '2021-01-01', message: 'The date must be later than 2021-01-01' }
                })} type="date" />
                {errors.recoveryDate && <p>{errors.recoveryDate.message}</p>}
                <input type="submit" style={{ marginTop: "20px", textAlign: "center", display: "block" }} />
            </form>


            <Link to={`/userDetails/${idNumber}`} style={{ marginTop: "20px", textAlign: "center", display: "block" }}>
                back
            </Link>
        </div>

    );
}

export default UpdateCorona;
