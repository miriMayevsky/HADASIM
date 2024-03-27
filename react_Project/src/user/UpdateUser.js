import { Link, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getUserByParameter } from './UserApi'
import {useNavigate,useParams } from "react-router-dom";
import { updateUserByParameter } from './UserApi'

const UpdateUser = () => {
    let { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [users, setUsers] = useState({});
    let { idNumber } = useParams();
    let navigate = useNavigate();
    useEffect(() => {
        getUserByParameter(idNumber)
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                alert("Unable to load the details");
                console.error("error:" + err);
            });
    }, []);
    useEffect(() => {
        reset(users)},
         [users]);

    console.log(users);

    const save = (data) => {
        updateUserByParameter(idNumber,data)
            .then((res) => {
                alert("  The details have been successfully updated  ");
                reset()
                navigate(`/userDetails/${idNumber}`)
            })
            .catch((err) => {
                console.log(err.response.data);
                if (err.response.data.message)
                    alert(JSON.stringify(err.response.data.message));
                else
                    alert(JSON.stringify(err.response.data));                console.log(err.response);
            });
    };

    return (
        <div style={{ margin: "20px auto", maxWidth: "500px" }}>
            <form onSubmit={handleSubmit(save)} style={{ display: "flex", flexDirection: "column" }}>
                <label>firstName</label>
                <input {...register('firstName', { required: 'Field is required' })} type="text" />
                {errors.firstName && <p>{errors.firstName.message}</p>}
                
                {/* נותן רווח */}
                <div style={{ marginBottom: "10px" }}></div>

                <label>lastName</label>
                <input {...register('lastName', { required: 'Field is required' })} type="text" />
                {errors.lastName && <p>{errors.lastName.message}</p>}
                                <div style={{ marginBottom: "10px" }}></div>

                <label>birthDate</label>
                <input {...register('birthDate', { required: 'Field is required' })} type="date" />
                {errors.birthDate && <p>{errors.birthDate.message}</p>}
                <label>phone</label>
                <input {...register('phone', { required: 'Field is required' })} type="text" />
                {errors.phone && <p>{errors.phone.message}</p>}
                <label>mobilePhone</label>
                <input {...register('mobilePhone', { required: 'Field is required' })} type="text" />
                {errors.mobilePhone && <p>{errors.mobilePhone.message}</p>}
                <label>address.city</label>
                <input {...register('address.city', )} type="text" />
                {errors.address && errors.address.city && <p>{errors.address.city.message}</p>}
                <label>address.street</label>
                <input {...register('address.street', )} type="text" />
                {errors.address && errors.address.street && <p>{errors.address.street.message}</p>}
                <label>address.number</label>
                <input {...register('address.number',)} type="number" />
                {errors.address && errors.address.number && <p>{errors.address.number.message}</p>}
                <input type="submit" style={{ marginTop: "20px", textAlign: "center", display: "block" }}/>
            </form>
            
            <Link to={`/userDetails/${idNumber}`} style={{ marginTop: "20px", textAlign: "center", display: "block" }}>
                back
            </Link>
        </div>
    );
}

export default UpdateUser;

