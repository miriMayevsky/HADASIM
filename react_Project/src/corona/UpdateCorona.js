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
                console.log(res.data);
                if (res?.data?.length)
                    setCoronas(res.data);
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

                alert(JSON.stringify(err.response.data));
                console.log(err.response);
            });
    };

    return (
        <div style={{ margin: "200px auto", maxWidth: "500px" }}>
        <form onSubmit={handleSubmit(save)} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ marginBottom: "10px" }}></div>

                <label>positiveTestDate</label>
                <input {...register('positiveTestDate', {
                    required: 'Field is required',
                    max: { value: new Date().toISOString().split('T')[0], message:' the date cannot be in the future' },
                    min: { value: '2021-01-01', message: 'The date must be later than 2021-01-01' }
                })} type="date" />
                {errors.positiveTestDate && <p>{errors.positiveTestDate.message}</p>}

                <div style={{ marginBottom: "10px" }}></div>

                <label>recoveryDate</label>
                <input {...register('recoveryDate', {
                    max: { value: new Date().toISOString().split('T')[0], message:' the date cannot be in the future' },
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
