import axios from "axios";

let baseUrl="http://localhost:4600/api/vaccinations";
export const GetAll=()=>{
    return axios.get(`${baseUrl}`);
}
export const GetById=(idNumber)=>{
    return axios.get(`${baseUrl}/${idNumber}`);
}
export const DeleteVaccination=(idNumber,index)=>{
    return axios.delete(`${baseUrl}/${idNumber}/${index}`);
}
export const PostVaccinations=(idNumber,vaccination)=>{
    return axios.post(`${baseUrl}/${idNumber}`,vaccination);
}
export const UpdateVaccinations=(idNumber,index,vaccination)=>{
    return axios.put(`${baseUrl}/${idNumber}/${index}`,vaccination);
}