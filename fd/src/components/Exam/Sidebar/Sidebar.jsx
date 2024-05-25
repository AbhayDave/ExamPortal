import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedQuestion } from "../../../app/examSettingsSlice";



function Sidebar() {
  const isOpen = useSelector((state) => state.examSettings.sideBarOpen);
  const CodingQuestions = useSelector((state) => state.exam.codingQuestions);
  const MCQQuestions = useSelector((state) => state.exam.mcqQuestions);
  const dispatch = useDispatch()


  return (
    <div className={isOpen ? "relative bg-green-500 w-2/6" : "hidden"}>
      <div className="">
        <h1 className="text-xl py-4 text-center bg-gray-400">
          Coding Questions
        </h1>
        <ul>
          {CodingQuestions.map((question) => {
            return (
              <li
                key={question._id}
                onClick={() => {
                  dispatch(setSelectedQuestion({id: question._id, type: "Coding"}));
                }}
                className="py-3 bg-gray-700 text-white hover:bg-red-500"
              >
                {question.title}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border my-5 h-3 bg-black border-none" />

      <div className="">
        <h1 className="text-xl py-4 text-center bg-gray-400">MCQ Questions</h1>
        <ul>
          {MCQQuestions.map((question) => {
            return (
              <li
                key={question._id}
                onClick={() => {
                  dispatch(
                    setSelectedQuestion({ id: question._id, type: "MCQ" })
                  );
                }}
                className="py-3 bg-gray-700 text-white hover:bg-red-500"
              >
                {question.slug}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border my-5 h-3 bg-black border-none" />

      <div className="flex flex-col space-y-2">
        <button className="text-xl w-4/5 mx-auto py-4 text-center bg-gray-400 hover:bg-gray-500">
          Next
        </button>
        <button className="text-xl w-4/5 py-4 mx-auto text-center bg-gray-400 hover:bg-gray-500">
          Prev
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
