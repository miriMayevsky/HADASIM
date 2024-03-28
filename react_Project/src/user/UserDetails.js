import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { getUserByParameter } from "./UserApi";
import { useEffect, useState } from "react";
import './userDetails.css';
import CoronaDetails from '../corona/CoronaDetails';
import VaccinationsDetails from '../vaccinations/VaccinationsDetails';
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
    let navigate = useNavigate();
    let { idNumber } = useParams();
    console.log(idNumber);
    let [users, setUsers] = useState(null);

    useEffect(() => {
        getUserByParameter(idNumber)
            .then((res) => {
                try {
                    setUsers(res.data);
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

    if (!users) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="user-details">
                <h1>{users.firstName}  {users.lastName}</h1>
                <div>{`idNumber ${users.idNumber} `}</div>
                <div>{`birthDate ${users.birthDate} `}</div>
                <div>{`address: city ${users.address.city}, street ${users.address.street}, number ${users.address.number}`}</div>
                <div>{`phone  ${users.phone}`}</div>
                <div>{`mobilePhone  ${users.mobilePhone}`}</div>
                <CoronaDetails />
                <div>
                    <button onClick={() => navigate(`/Addcorona/${idNumber}`)}> Add corona</button>
                </div>
                <VaccinationsDetails />
                <div>
                    <button onClick={() => navigate(`/addVaccinations/${idNumber}`)}> Add Vaccinations</button>
                </div>

                <Link to={"/"}>
                    back
                </Link>
            </div>


        </>
    );
}

export default UserDetails;
