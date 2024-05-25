import axios from "axios";
import { ApiError } from "../utils/ApiError.js";

export const createSubmission = async (data) => {
  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": process.env.JUDGE0_RAPID_APIKEY,
      "X-RapidAPI-Host": process.env.JUDGE0_RAPID_HOST,
    },
    data,
  };

  try {
    const response = await axios.request(options);
    return response.data.token;
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Error fetching question");
  }
};

export const getSubmission = async (token) => {
  const options = {
    method: "GET",
    url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "X-RapidAPI-Key": process.env.JUDGE0_RAPID_APIKEY,
      "X-RapidAPI-Host": process.env.JUDGE0_RAPID_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    let statusId = response.data.status?.id;

    if (statusId === 1 || statusId === 2) {
      setTimeout(() => {
        getSubmission(token);
      }, 2000);
      return;
    } else {
      // console.log(response.data);
      // console.log(atob(response.data?.source_code));
      console.log(atob(response.data?.stdin));
      console.log(atob(response.data?.stdout));
            console.log(atob(response.data?.compile_output));
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};
