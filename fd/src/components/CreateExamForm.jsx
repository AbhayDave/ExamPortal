import { useForm } from "react-hook-form";
import Input from "./Input";
function CreateExamForm() {
  const { register, handleSubmit } = useForm();

  function convertString(inputString) {
    /**
     * This function removes extra spaces from a comma-separated string.
     *
     * @param {string} inputString - The string to be converted.
     * @returns {string} A string with extra spaces removed.
     */

    // Split the string into an array based on commas
    let listOfValues = inputString.split(",");

    // Remove leading/trailing spaces from each value in the array
    let trimmedList = listOfValues.map((value) => value.trim());

    // Join the trimmed array back into a comma-separated string
    return trimmedList.join(",");
  }

  const onSubmitHandler = (data) => {
    console.log(data);
    let { CodingQuestions, MCQQuestions, examDate, examDuration, startTime } =
      data;

    const givenDate = new Date(examDate);
    const currentDate = new Date();

    // console.log(data.CodingQuestions);
    // console.log(data.MCQQuestions);

    if (givenDate < currentDate) {
      alert("Given date is in the past");
      return;
    }
    alert("Given date is available");
    data.CodingQuestions = convertString(CodingQuestions);
    data.MCQQuestions = convertString(MCQQuestions);
    // CodingQuestions = CodingQuestions.split(",");

    // MCQQuestions = MCQQuestions.split(",");

    console.log(data.CodingQuestions);
    console.log(data.MCQQuestions);

    // Make API calls or perform further actions with the form data
  };

  return (
    <div className="container w-1/2 bg-white shadow-md rounded-lg p-6 mx-auto my-16">
      <div className="header bg-red-600 text-white font-sans text-lg text-center py-3 rounded-t-lg">
        Create Exam
      </div>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        encType="multipart/form-data"
        className="mt-8"
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
          {/* <Input
            type="time"
            label="Start Time: "
            placeholder="Start Time..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            {...register("startTime", {
              required: true,
            })}
          /> */}

          <Input
            type="time"
            label="Exam Duration: "
            placeholder="Exam Duration..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            {...register("examDuration", {
              required: true,
            })}
          />

          {/* <Input
            type="file"
            label="Eligible Students: "
            placeholder="Eligible Students"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            accept=".xlsx, .xls"
            {...register("attendes", {
              required: true,
            })}
          /> */}

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
            Create Exam
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateExamForm;
