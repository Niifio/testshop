import axios from "axios";

const API_URL = "http://localhost:8081/users";

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  return response.data;
};

const getData = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const updateUser = async (userData) => {
  const { id } = userData;
  console.log(userData);
  const response = await axios.put(API_URL + "/" + id, userData);
  return response.data;
};

const deleteUser = async(id)=>{
const  response = await axios.delete(API_URL + "/" + id)
return  response.data
}
const authService = {
  register,
  getData,
  updateUser,
  deleteUser
};

export default authService;
