// export {logoutUser, loginUser, changeUserPassword, getCurrentUser};
import axios from "axios";
const baseUrl = "http://localhost:8000/api/v1";

export async function loginUser({ email, password, name }) {
  try {
    const response = await axios.post(`${baseUrl}/users/login`, {
      email,
      password,
      name,
    });

    if (response) {
      const { accessToken } = response.data.data;
      const userData = response.data.data.user;

      // Store access token in localStorage
      localStorage.setItem("accessToken", accessToken);
      return userData;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export async function logoutUser() {
  try {
    const accessToken = localStorage.getItem("accessToken");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
    const response = await axios.post(`${baseUrl}/users/logout`, {}, {headers});

    if (response) {
      localStorage.setItem("accessToken", null);
      return response;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios.post(
      `${baseUrl}/users/current-user`,
      {},
      { headers }
    );

    if (response) {
      return response;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }

  return null;
}

export async function changeUserPassword(data) {
   try {
     const accessToken = localStorage.getItem("accessToken");
     const headers = {
       Authorization: `Bearer ${accessToken}`,
       "Content-Type": "application/json",
     };
     const response = await axios.post(
       `${baseUrl}/users/change-password`,
       {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
       },
       { headers }
     );

     if (response) {
       localStorage.setItem("accessToken", null);
       return response;
     }
   } catch (error) {
     console.log(error.message);
     throw error;
   }
}
