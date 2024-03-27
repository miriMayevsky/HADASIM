import axios from "axios";

let baseUrl="http://localhost:4600/api/users";
export const getUser=()=>{
    return axios.get(`${baseUrl}`);
}
export const getUserByParameter=(idNumber)=>{
    return axios.get(`${baseUrl}/${idNumber}`);
}
export const DeleteUserByParameter=(idNumber)=>{
    return axios.delete(`${baseUrl}/${idNumber}`);
}
export const PostUser=(User)=>{
    return axios.post(`${baseUrl}`,User);
}

export const updateUserByParameter=(idNumber,User)=>{
    return axios.put(`${baseUrl}/${idNumber}`,User)
 }