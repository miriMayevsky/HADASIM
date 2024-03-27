import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UpdateVaccinations, GetById } from './VaccinationsApi';
import { useNavigate } from 'react-router-dom';

const UpdateVaccination = () => {
    let navigate = useNavigate();
    let { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [Vaccinations, setVaccinations] = useState([]);
    let { idNumber, index } = useParams();
    const [currentVaccin, SetCurrentVaccin] = useState({});

    useEffect(() => {
        GetById(idNumber)
            .then((res) => {
                if (res?.data?.length) {
                    console.log(res.data);
                    setVaccinations(res.data);
                }
            })
            .catch((err) => {
                alert("Unable to load the details");
                console.error("error:" + err.message);
            });
    }, []);

    useEffect(() => {
        const vaccination = Vaccinations.find(v => v.index == index);
        if (vaccination) {
            SetCurrentVaccin(vaccination);

        }
    }, [Vaccinations, index]);

    useEffect(() => {
        if (currentVaccin) {
            reset(currentVaccin);
        }
    }, [currentVaccin]);

    console.log(index);

    const save = (data) => {
        console.log(data);
        UpdateVaccinations(idNumber, index, data)
            .then((res) => {
                console.log(index);

                alert("  The details have been successfully updated  ");
                reset();
                navigate(`/userDetails/${idNumber}`);
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

                <label>date</label>
                <input {...register('date', {
                    required: 'Field is required',
                    max: { value: new Date().toISOString().split('T')[0], message: ' the date cannot be in the future' },
                    min: { value: '2021-01-01', message: 'The date must be later than 2021-01-01' }
                })} type="date" />
                {errors.date && <p>{errors.date.message}</p>}
                <div style={{ marginBottom: "10px" }}></div>


                <select
                    {...register('manufacturer', { required: 'Field is required' })}
                    value={currentVaccin?.manufacturer}
                    onChange={(e) => {
                        SetCurrentVaccin({ ...currentVaccin, manufacturer: e.target.value });
                        setValue('manufacturer', e.target.value);
                    }}
                >
                    <option value="fizer">Fizer</option>
                    <option value="Moderna">Moderna</option>
                </select>


                {errors.manufacturer && <p>{errors.manufacturer.message}</p>}

                <input type="submit" style={{ marginTop: "20px", textAlign: "center", display: "block" }} />
            </form>

            <Link to={`/userDetails/${idNumber}`} style={{ marginTop: "20px", textAlign: "center", display: "block" }}>
                back
            </Link>
        </div>
    );
}

export default UpdateVaccination;
