import { Link } from 'react-router-dom';
import './styled-components.css';
import { useState } from 'react';
import { DeleteUserByParameter } from './UserApi'
import { useNavigate } from 'react-router-dom';

const UserItem = ({ one, users, setUsers }) => {
    let navigate = useNavigate();
    //מחיקת מוצר
    const [showAlert, setShowAlert] = useState(false);

    const handleDelete = (idNumber) => {
        const result = window.confirm("Are you sure you want to delete this item?");
        if (result) {
            // Delete the item
            DeleteUserByParameter(idNumber)
                .then((res) => {
                    console.log(res);
                    alert("Item deleted successfully");

                    // Update the state to remove the deleted user
                    setUsers(prevUsers => prevUsers.filter(user => user.idNumber !== idNumber));
                }).catch(err => {
                    alert("Error deleting item:", err);
                });
        }
    };

    return (<>
        <div className='UserContainer'>
            <Link to={`/userDetails/${one.idNumber}`}>
                <div className='UserName'>
                    {one.firstName} {one.lastName}
                </div>
            </Link>
        </div>
        <div>
            <button style={{margin: 3}} onClick={() =>  navigate(`/updateUser/${one.idNumber}`)}> update user</button>
            <button onClick={() =>   handleDelete(one.idNumber)}> delete user</button>

        </div>











    </>
    );
};

export default UserItem;
