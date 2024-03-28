
import { useParams } from "react-router-dom";
import { GetById } from "./VaccinationsApi";
import { useEffect, useState } from "react";
import { DeleteVaccination } from './VaccinationsApi';
import { useNavigate } from 'react-router-dom';

const VaccinationsDetails = () => {
    const navigate = useNavigate();

    let { idNumber } = useParams();
    let [vaccination, setVaccination] = useState(null);
    useEffect(() => {
        GetById(idNumber)
            .then((res) => {
                try {
                    setVaccination(res.data);
                    console.log("Setting Vaccination:", res.data);
                }
                catch (error) {
                    console.error("Error parsing JSON:", error);
                }
            })
            .catch((err) => {
                alert("Unable to load the details");
                console.error("error:" + err);
            });
    }, [idNumber]);

    if (!vaccination) {
        return <div>Loading...</div>;
    }

    console.log(vaccination);

    const handleDeleteVaccination = (idNumber, index) => {
        const result = window.confirm("Are you sure you want to delete this item?");
        if (result) {
            // Delete the item
            DeleteVaccination(idNumber, index)
                .then((res) => {
                    console.log(res);
                    alert("Item deleted successfully");
                    setVaccination(prevUsers => prevUsers.filter(v => v.index !== index));


                }).catch(err => {
                    alert("Error deleting item:", err);
                });
        }
    };



    return (<><h1>vaccinations details</h1>
        <div>
            {vaccination.map((vaccine, index) => (
                <div key={index}>
                    <div>Manufacturer: {vaccine.manufacturer}</div>
                    <div>Date: {vaccine.date}</div>
                    <div>Index: {vaccine.index}</div>
                    <button onClick={() => handleDeleteVaccination(vaccine.idNumber, vaccine.index)}>DeleteVaccination</button>
                    <button onClick={() => navigate(`/updateVaccinations/${idNumber}/${vaccine.index}`)}> Update Vaccinations</button>

                </div>
            ))}
        </div></>
    );

}

export default VaccinationsDetails;