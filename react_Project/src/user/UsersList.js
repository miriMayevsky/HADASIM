import { useEffect, useState, useMemo } from "react";
import { getUser } from "./UserApi";
import UserItem from "./UserItem";
import { Link } from 'react-router-dom';

const UsersList = () => {

  let [users, setUsers] = useState([]);

  useEffect(() => {
    getUser()
      .then((res) => {
        try {
          setUsers(res.data);
        }
        catch (error) {
          console.error("Error parsing JSON:", error);
        }
      })
      .catch((err) => {
        alert("לא ניתן לטעון את המוצרים");
        console.error("eror:" + err);
        console.log("err" + err);
      });
  }, []);

  if (!users) {
    return <div>No data available</div>; // הצגת הודעה כאשר אין נתונים
  }
  return (
    <>
     <div style={{ margin: 20 }}>
        <Link to="/addUser">
          <button className="btn btn__login">
            add User</button>
        </Link>
      </div>
      {users.map((user, index) => (
        <UserItem key={index} one={user} users={users} setUsers={setUsers} />

      ))}
     
    </>
  );
}

export default UsersList;
