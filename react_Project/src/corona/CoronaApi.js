import axios from "axios";

let baseUrl="http://localhost:4600/api/coronas";
export const getAll=()=>{
    return axios.get(`${baseUrl}`);
}
export const GetById=(idNumber)=>{
    return axios.get(`${baseUrl}/${idNumber}`);
}
export const deleteDisease=(idNumber,index)=>{
    return axios.delete(`${baseUrl}/${idNumber}/${index}`);
}
export const AddDisease=(idNumber,Disease)=>{
    return axios.post(`${baseUrl}/${idNumber}`,Disease);
}
export const UpdateDisease=(idNumber,index,Disease)=>{
    return axios.put(`${baseUrl}/${idNumber}/${index}`,Disease);
}