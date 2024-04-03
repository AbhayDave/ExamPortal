import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function QuestionHut() {
  const questionTypeCategories = ["Coding", "MCQ"];
  const questionTopicCategories = [
    "Array",
    "LinkedList",
    "Recursion",
    "String",
  ];

  // const [questionTypeCategories, setQuestionTypeCategories] = useState(null);
  // const [questionTopicCategories, setQuestionTopicCategories] =
  //   useState(null);

  // useEffect(() => {

  // }, [questionTypeCategories, questionTopicCategories])

  const notify = () =>
    toast("Question Id Copied!", {
      position: "top-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

  const copy = async (e) => {
    await navigator.clipboard.writeText(e.target.innerText);
    notify();
  };

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  return (
    <div className="container w-1/2 bg-white shadow-md rounded-lg p-6 mx-auto my-5">
      <div className="header bg-red-600 text-white font-sans text-lg text-center py-3 rounded-t-lg">
        Question Hut
      </div>
      <ToastContainer />
      <div className="flex items-center justify-evenly">
        <div className="my-4 flex flex-col justify-evenly items-center gap-1">
          <div className="w-full border mb-3 text-center shadow-md bg-red-600 text-white font-sans text-lg py-3 rounded-t-lg">
            Question Search
          </div>
          <SearchBar
            questionTypeCategories={questionTypeCategories}
            questionTopicCategories={questionTopicCategories}
            setSelectedQuestion={setSelectedQuestion}
          />
        </div>
      </div>
      <div>
        {selectedQuestion ? (
          <div className="min-w-2/5 border mx-auto p-5">
            <h2 className="text-2xl">{selectedQuestion.title}</h2>
            <h2 className="text-lg text-red-500 hover:underline" onClick={copy}>
              {selectedQuestion._id}
            </h2>
            <h2 className="text-lg">{selectedQuestion.description}</h2>
            <h2 className="text-lg">{selectedQuestion.difficulty}</h2>
          </div>
        ) : (
          <div className=""></div>
        )}
      </div>
    </div>
  );
}

export default QuestionHut;
