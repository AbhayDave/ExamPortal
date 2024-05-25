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

export async function getMCQQuestionsByID(questionID) {
  try {

    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const ApiUrl = `${baseUrl}/mcq/questions/${questionID}`;


    const response = await axios.get(ApiUrl, {
      headers,
    });

    if (response) {
      // console.log(response);
      return response.data.data;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export async function getCodingQuestionsByID(questionID) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const ApiUrl = `${baseUrl}/questions/${questionID}`

    const response = await axios.get(ApiUrl, {
      headers,
    });

    if (response) {
      // console.log(response);
      return response.data.data;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
