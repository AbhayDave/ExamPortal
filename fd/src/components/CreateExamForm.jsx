import { useForm } from "react-hook-form";
import Input from "./Input";

function CreateExamForm() {
  const { register, handleSubmit } = useForm();

  //   const dispatch = useDispatch();

  const onSubmitHandler = (data) => {
    console.log(data);
    // Make API calls or perform further actions with the form data
  };

  return (
    <div className="container w-1/2 bg-white shadow-md rounded-lg p-6 mx-auto my-16">
      <div className="header bg-red-600 text-white font-sans text-lg text-center py-3 rounded-t-lg">
        Create Exam
      </div>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="mt-8">
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
            type="time"
            label="Exam Duration: "
            placeholder="Exam Duration..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            {...register("examDuration", {
              required: true,
            })}
          />
          <Input
            type="file"
            label="Eligible Students: "
            placeholder="Eligible Students"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            {...register("attendes", {
              required: true,
            })}
          />

          <Input
            type="text"
            label="Coding Questions: "
            placeholder="Enter Question's Id"
            className="w-full col-span-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            {...register("Questions", {
              required: true,
            })}
          />

          <Input
            type="text"
            label="MCQ Questions: "
            placeholder="Enter Question's Id"
            className="w-full col-span-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            {...register("Questions", {
              required: true,
            })}
          />

          <button className="footer col-span-2 bg-red-600 text-white mt-3 font-sans w-full text-center py-3 rounded-b-lg">
            Create Exam
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateExamForm;
