// export {logoutUser, loginUser, changeUserPassword, getCurrentUser};
import axios from "axios";
const baseUrl = "http://localhost:8000/api/v1";

export async function getQuestionsBasedOnCategoryAndTitle(
  questionType,
  category,
  searchTerm
) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const ApiUrl =
      questionType.toLowerCase() === "coding"
        ? `${baseUrl}/questions/search`
        : `${baseUrl}/mcq/questions/search`;

    console.log(ApiUrl);

    const response = await axios.get(ApiUrl, {
      params: {
        category,
        searchTerm,
      },
      headers,
    });

    if (response) {
      console.log(response.data.data.questions);
      return response.data.data.questions;
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
    const response = await axios.post(
      `${baseUrl}/users/logout`,
      {},
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
        newPassword: data.newPassword,
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
