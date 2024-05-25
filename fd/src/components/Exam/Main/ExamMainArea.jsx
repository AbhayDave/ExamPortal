import React from "react";
import ExamQuestionDesc from "./ExamQuestionDesc";
import AnswerArea from "./AnswerArea";
import Sidebar from "../Sidebar/Sidebar";
import { useSelector } from "react-redux";

function ExamMainArea() {


  return (
    <div className="w-screen absolute h-screen -top-0 pt-16">
      <div className="flex justify-between h-full">
        <Sidebar />
        <ExamQuestionDesc />
        <AnswerArea />
      </div>
    </div>
  );
}

export default ExamMainArea;
