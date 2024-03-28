import { Link } from 'react-router-dom';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { PostUser } from './UserApi'
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    let { register, handleSubmit, reset, formState: { errors } } = useForm();
    let navigate = useNavigate()

    const save = (data) => {
        PostUser(data).then((res) => {
            alert("Adding user succeeded ");
            reset();
            navigate("/")
        }).catch((err) => {
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            }
            else if (err.response && err.response.data) {
                alert(err.response.data);
            } else {
                alert("An error occurred while adding the user. Please try again later.");
            }

        });
    };

    return (<>

        <div style={{ margin: "20px auto", maxWidth: "500px" }}>
            <form onSubmit={handleSubmit(save)} style={{ display: "flex", flexDirection: "column" }}>

                <label>firstName</label>
                <input {...register('firstName', { required: 'Field is required' })} type="text" />
                {errors.firstName && <p>{errors.firstName.message}</p>}

                <label>lastName</label>
                <input {...register('lastName', { required: 'Field is required' })} type="text" />
                {errors.lastName && <p>{errors.lastName.message}</p>}

                <label>idNumber</label>
                <input {...register('idNumber', {
                    required: 'Field is required',
                    minLength: { value: 9, message: 'idNumber  must be 9 digits' },
                    maxLength: { value: 9, message: 'idNumber  must be 9 digits' }

                })} type="text" />
                {errors.idNumber && <p>{errors.idNumber.message}</p>}

                <label>birthDate</label>
                <input {...register('birthDate', {
                    max: { value: new Date().toISOString().split('T')[0], message: ' the date cannot be in the future' },
                    min: { value: '1900-01-01', message: 'The date must be later than 1900-01-01' }

                })}
                    type="date" />
                {errors.birthDate && <p>{errors.birthDate.message}</p>}

                <label>phone</label>
                <input {...register('phone')} type="text" />
                {errors.phone && <p>{errors.phone.message}</p>}

                <label>mobilePhone</label>
                <input {...register('mobilePhone', {
                    required: 'Field is required',
                    minLength: { value: 10, message: 'Mobile phone number must be 10 digits' },
                    maxLength: { value: 10, message: 'Mobile phone number must be 10 digits' }

                })} type="text" />
                {errors.mobilePhone && <p>{errors.mobilePhone.message}</p>}

                <label>address.city</label>
                <input {...register('address.city')} type="text" />
                {errors.address && errors.address.city && <p>{errors.address.city.message}</p>}
                <label>address.street</label>
                <input {...register('address.street')} type="text" />
                {errors.address && errors.address.street && <p>{errors.address.street.message}</p>}
                <label>address.number</label>
                <input {...register('address.number')} type="number" />
                {errors.address && errors.address.number && <p>{errors.address.number.message}</p>}

                <input type="submit" style={{ marginTop: "20px", textAlign: "center", display: "block" }} />
            </form>
        </div>
        <div className="c">
            <Link to={"/"}>
                back
            </Link>
        </div>
    </>
    );
}

export default AddUser;