// export {logoutUser, loginUser, changeUserPassword, getCurrentUser};
import axios from "axios";
const baseUrl = "http://localhost:8000/api/v1";

export async function createExam(
    examData
) {
    // console.log(examData);

    try {
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        const ApiUrl = `${baseUrl}/exams`

        // console.log(ApiUrl);

        const response = await axios.post(ApiUrl, examData, { headers })


        if (response) {
            console.log(response.data);
            return response.data;
        }

    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export async function updateExam(
    id, examData
) {
    console.log(examData);

    try {
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        const ApiUrl = `${baseUrl}/exams/${id}`

        // console.log(ApiUrl);

        const response = await axios.put(ApiUrl, examData, { headers })


        if (response) {
            console.log(response.data);
            return response.data;
        }

    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export async function uploadFile(
    data
) {
    // console.log(examData);

    try {
        // const accessToken = localStorage.getItem("accessToken");
        // const headers = {
        //     Authorization: `Bearer ${accessToken}`,
        // };

        const ApiUrl = `http://localhost:8000`

        // console.log(ApiUrl);

        const response = await axios.post(ApiUrl, data)


        if (response) {
            console.log(response);
            return response
            // return response.data.data.questions;
        }

    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export async function getAllExams() {
    // console.log(examData);

    try {
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        const ApiUrl = `${baseUrl}/exams`

        // console.log(ApiUrl);

        const response = await axios.get(ApiUrl, { headers })


        if (response) {
            console.log(response.data);
            return response.data;
        }

    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export async function getExamByID(id) {
    // console.log(examData);

    try {
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        const ApiUrl = `${baseUrl}/exams/${id}`

        // console.log(ApiUrl);

        const response = await axios.get(ApiUrl, { headers })


        if (response) {
            // console.log(response.data);
            return response.data;
        }

    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

