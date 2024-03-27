

import { useParams } from "react-router-dom";
import { GetById } from "./CoronaApi.js";
import { useEffect, useState } from "react";
// import './userDetails.css';
import {deleteDisease} from './CoronaApi.js';
import {useNavigate } from 'react-router-dom';

const CoronaDetails = () => {
    const navigate = useNavigate();
    let { idNumber } = useParams(); 
    console.log(idNumber);
    let [coronas, setCoronas] = useState(null);
    useEffect(() => {
        GetById(idNumber) 
            .then((res) => {
                console.log(res.data);

                if (res && res.data) {
                    setCoronas(() => {
                        console.log("Setting corona:", res.data);
                        return res.data;
                    });
                } else {
                    console.log("Response is empty");
                }
            })
            .catch((err) => {
                alert("לא ניתן לטעון את הפרטים");
                console.error("error:" + err);
            });
    }, [idNumber]);

    if (!coronas) {
        return <div>Loading...</div>;
    }
    console.log(coronas);
    console.log(coronas.positiveTestDate);
    // console.log(corona[0]);

    const handleDeleteCorona = (idNumber,index) => {
        const result = window.confirm("Are you sure you want to delete this item?");
        if (result) {
            // Delete the item
            deleteDisease(idNumber,index)
            .then((res) => {
                console.log(res);
                alert("Item deleted successfully");
                    setCoronas(prevUsers => prevUsers.filter(corona => corona.index !== index));


            }).catch(err => {
                alert("Error deleting item:", err);
            });
        }
    };
    return (
        <>
        <h1>coronas details</h1>
            <div>
            {coronas.map((corona, index) => (
            <div key={index}>
            <div>{` positiveTestDate ${corona.positiveTestDate} `}</div>
            <div>{`recoveryDate ${corona.recoveryDate} `}</div>
            <div>Index: {corona.index}</div>
            <button  onClick={() => handleDeleteCorona(corona.idNumber,corona.index)}>DeleteCorona</button>
            <button onClick={() =>  navigate(`/UpdateCorona/${idNumber}/${corona.index}`)}> Update corona</button>

                </div>
            ))}
        </div>
        </>
    );
}
 
export default CoronaDetails;

