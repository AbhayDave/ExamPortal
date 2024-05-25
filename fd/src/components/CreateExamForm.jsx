import { useForm } from "react-hook-form";
import Input from "./Input";
import { createExam, updateExam } from "../Api/exam/examService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateExamForm({ exam }) {
  // if (exam) console.log(new Date(exam?.examDate).toISOString().substring(0, 10))

  const { register, handleSubmit, errors, setError, setValue } = useForm({
    defaultValues: {
      title: exam?.title || "",
      description: exam?.description || "",
      examDate: exam?.examDate || "",
      status: exam?.status || "Scheduled",
      startTime: exam?.startTime || "",
      examDuration: exam?.examDuration || "",
      CodingQuestions: exam?.CodingQuestions.join(",") || "",
      MCQQuestions: exam?.MCQQuestions.join(",") || "",
    },
    mode: "all",
  });

  useEffect(() => {
    if (exam) {
      setValue(
        "examDate",
        new Date(exam?.examDate).toISOString().substring(0, 10)
      ); // Set the default time value
    }
  }, [setValue, exam?.examDate, exam]);

  const [error, setEError] = useState("");
  const navigate = useNavigate();
  // const userData = useSelector((state) => state.auth.userData);

  function convertString(inputString) {
    // Split the string into an array based on commas
    let listOfValues = inputString.split(",");

    // Remove leading/trailing spaces from each value in the array
    let trimmedList = listOfValues.map((value) => value.trim());

    // Join the trimmed array back into a comma-separated string
    return trimmedList.join(",");
  }

  function convertArray(inputString) {
    // Split the string into an array based on commas
    let listOfValues = inputString.split(",");

    // Remove leading/trailing spaces from each value in the array
    let trimmedList = listOfValues.map((value) => value.trim());

    // Join the trimmed array back into a comma-separated string
    return trimmedList;
  }

  function getHHMM(date) {
    // Get hours and minutes using zero-padded format
    let hours = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");

    // Combine hours and minutes with a colon (:)
    return hours + ":" + minutes;
  }

  const validateDuration = (value) => {
    // Regular expression for HH:MM format
    const regex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
    if (!regex.test(value)) {
      // alert('Invalid duration format. Please use HH:MM.'); ``
      return "Invalid duration format. Please use HH:MM.";
    }
    return undefined; // No error if valid
  };

  const onSubmitHandler = async (data) => {
    setEError("");
    // console.log(data.attendes[0]);

    if (exam) {
      const updatedData = {};

      // Check if the values of the 'attendes' key are different
      // if (exam.attendes[0] !== data?.attendes[0]) {
      //   updatedData.attendes = data?.attendes[0];
      // }

      // Check if the values of the 'title' key are different
      if (exam.title !== data?.title) {
        updatedData.title = data?.title;
      }

      // Check if the values of the 'description' key are different
      if (exam.description !== data?.description) {
        updatedData.description = data?.description;
      }

      //  data.CodingQuestions = convertArray(data?.CodingQuestions);
      //  data.MCQQuestions = convertArray(data?.MCQQuestions);

      // const oldFormatCodingQuestions = exam.CodingQuestions.join(",")
      // const oldFormatMCQQuestions = exam.MCQQuestions.join(",")

      // Check if the values of the 'CodingQuestions' key are different
      if (exam.CodingQuestions.length !== data?.CodingQuestions.length) {
        updatedData.CodingQuestions = convertString(data?.CodingQuestions);
      } else {
        for (let i = 0; i < exam.CodingQuestions.length; i++) {
          if (exam.CodingQuestions[i] !== data?.CodingQuestions[i]) {
            updatedData.CodingQuestions = convertString(data?.CodingQuestions);
            break;
          }
        }
      }

      // Check if the values of the 'MCQQuestions' key are different
      if (exam.MCQQuestions.length !== data?.MCQQuestions.length) {
        updatedData.MCQQuestions = convertString(data?.MCQQuestions);
      } else {
        for (let i = 0; i < exam.MCQQuestions.length; i++) {
          if (exam.MCQQuestions[i] !== data?.MCQQuestions[i]) {
            updatedData.MCQQuestions = convertString(data?.MCQQuestions);
            break;
          }
        }
      }

      // Check if the values of the 'examDate' key are different
      if (exam.examDate !== data?.examDate) {
        updatedData.examDate = data?.examDate;
      }

      // Check if the values of the 'examDuration' key are different
      if (exam.examDuration !== data?.examDuration) {
        updatedData.examDuration = data?.examDuration;
      }

      // Check if the values of the 'startTime' key are different
      if (exam.startTime !== data?.startTime) {
        updatedData.startTime = data?.startTime;
      }

      // Check if the values of the 'status' key are different
      if (exam.status !== data?.status) {
        updatedData.status = data?.status;
      }

      if (Object.keys(updatedData).length > 0) {
        const formData = new FormData();
        for (const [key, value] of Object.entries(updatedData)) {
          formData.append(key, value);
        }

        try {
          const response = await updateExam(exam._id, formData);
          if (response) alert("Exam Updated Successfully");
        } catch (error) {
          console.log(error.message);
          setEError(error.message);
        }
      }
    } else {
      let { CodingQuestions, MCQQuestions, examDate, startTime } = data;

      const givenDate = new Date(examDate);
      const currentDate = new Date();

      const givenTime = startTime;
      const currentTime = getHHMM(givenDate);

      // console.log(givenTime, currentTime);

      if (givenDate < currentDate) {
        alert("Given date is in the past");
        return;
      } else if (givenDate == currentDate && givenTime > currentTime) {
        console.log("Given date and time is available");
      } else if (givenDate > currentDate) {
        console.log("Given date and time is available");
      } else {
        alert("Slot Not available");
        return;
      }

      data.CodingQuestions = convertString(CodingQuestions);
      data.MCQQuestions = convertString(MCQQuestions);

      const formData = new FormData();
      formData.append("attendes", data.attendes[0]);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("CodingQuestions", data.CodingQuestions);
      formData.append("MCQQuestions", data.MCQQuestions);
      formData.append("examDate", data.examDate);
      formData.append("examDuration", data.examDuration);
      formData.append("startTime", data.startTime);
      formData.append("status", data.status);

      try {
        const response = await createExam(formData);
        if (response) alert("Exam Created Successfully");
      } catch (error) {
        console.log(error.message);
        setEError(error.message);
      }
    }

    // Make API calls or perform further actions with the form data
  };

  return (
    <div className="container w-1/2 bg-white shadow-md rounded-lg p-6 mx-auto my-16">
      <div className="header bg-red-600 text-white font-sans text-lg text-center py-3 rounded-t-lg">
        {exam ? "Update Exam" : "Create Exam"}
      </div>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="mt-8"
        encType="multipart/form-data"
      >
        <div className="mt-8 w-full grid gap-4 grid-cols-2">
          <Input
            label="Exam Title: "
            type="text"
            placeholder="Title..."
            className="w-full p-3 border mb-3 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            {...register("title", {
              required: true,
            })}
          />

          {/* {errors.title && <span>Title is required</span>} */}
          <Input
            type="text"
            label="Exam Description: "
            placeholder="Description..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            {...register("description", {
              required: true,
            })}
          />

          <Input
            label="Exam Date: "
            type="date"
            placeholder="Exam Date"
            className="w-full p-3 border mb-3 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            {...register("examDate", {
              required: true,
            })}
          />
          <Input
            type="time"
            label="Start Time: "
            placeholder="Start Time..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            {...register("startTime", {
              required: true,
            })}
          />

          <Input
            type="text"
            label="Exam Duration: "
            placeholder="Enter duration (HH:MM)"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            {...register("examDuration", {
              required: true,
              validate: validateDuration,
            })}
          />

          <Input
            type="file"
            label="Eligible Students: "
            placeholder="Eligible Students"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            accept=".xlsx, .xls"
            {...register("attendes", {
              required: true,
            })}
          />

          <Input
            type="text"
            label="Coding Questions: "
            placeholder="Enter Question's Id"
            className="w-full col-span-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            {...register("CodingQuestions", {
              required: true,
            })}
          />

          <Input
            type="text"
            label="MCQ Questions: "
            placeholder="Enter Question's Id"
            className="w-full col-span-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            {...register("MCQQuestions", {
              required: true,
            })}
          />

          <div className="w-full col-span-2">
            <label htmlFor="examStatus">Exam Status</label>
            <select
              className="mr-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
              id="examStatus"
              {...register("status", {
                required: true,
              })}
            >
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button className="footer col-span-2 bg-red-600 text-white mt-3 font-sans w-full text-center py-3 rounded-b-lg">
            {exam ? "Update Exam" : "Create Exam"}
          </button>
        </div>
      </form>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
    </div>
  );
}

export default CreateExamForm;
