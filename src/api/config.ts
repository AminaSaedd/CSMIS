import axios from "axios";
import Swal from "sweetalert2";
import { UserInfo } from "../ViewModels/userInfo";
const BASE_URL = 'https://localhost:5001/api/';
// const BASE_URL ='http://137.184.86.97:8001/api/';

export const ENDPOINTS = {
  Auth: 'auth',
  Users: "users",
  Complains: "complains",
  ComplainTypes: "complainTypes",
  TaxPayers: "TaxPayers",
  Devices: "devices"
 
}

var token = (JSON.parse(localStorage.getItem("sys_user") ?? '{}') as UserInfo).token

axios.defaults.headers.common['Authorization'] = "Bearer " +  token ?? "";

export const axiosRequest = (endpoint: any) => {
  let url = BASE_URL + endpoint + '/';

  axios.interceptors.response.use(response => {   
    if(response.status === 201){
      Swal.fire("😊", "Submitted record has been added successfully.", "success");
    }  
    if(response.status === 204){
      Swal.fire("😊", "Record has been updated successfully.", "success");
    } 
    return response;
  }, error => {
    if (error.response.status === 401 && !error?.response?.data) {
      console.log({error});
      Swal.fire({
        title: 'Your seesion has expired, you will be redirected to login page.',       
        confirmButtonText: 'Ok',
      }).then((result) => {
        localStorage.removeItem("sys_user");
        window.location.replace("/auth/login")
      })
    }
    if (error.response.status === 404) {
      Swal.fire("Oops","Requested object not found", "error");
    }
    
    if (error.response.status === 500) {
      Swal.fire("Oops","An unprecedented error occurred, please try again.", "error");
    }
   
    return error;
  });

  return {
    fetchAll: () => axios.get(url),
    fetchById: (id: number) => axios.get(url + id),
    post: (newRecord: {}) => axios.post(url, newRecord),
    put: (id: number, updatedRecord: {}) => axios.put(url + id, updatedRecord),
    delete: (id: number) => axios.delete(url + id)
  }
}