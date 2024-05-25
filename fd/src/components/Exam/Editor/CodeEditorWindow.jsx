// CodeEditorWindow.js

import { useEffect, useState } from "react";

import Editor from "@monaco-editor/react";
import { useSelector, useDispatch } from "react-redux";
import { setCodingQuestionAnswer } from "../../../app/examSlice";

const javascriptDefault = `/**
* Problem: Binary Search: Search a sorted array for a target value.
*/

// Time: O(log n)
const binarySearch = (arr, target) => {
 return binarySearchHelper(arr, target, 0, arr.length - 1);
};

const binarySearchHelper = (arr, target, start, end) => {
 if (start > end) {
   return false;
 }
 let mid = Math.floor((start + end) / 2);
 if (arr[mid] === target) {
   return mid;
 }
 if (arr[mid] < target) {
   return binarySearchHelper(arr, target, mid + 1, end);
 }
 if (arr[mid] > target) {
   return binarySearchHelper(arr, target, start, mid - 1);
 }
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 5;
console.log(binarySearch(arr, target));
`;

const CodeEditorWindow = ({ theme }) => {
  const [value, setValue] = useState("");
    const dispatch = useDispatch()
//   const [questionData, setQuestionData] = useState(null);

  const CodingQuestions = useSelector((state) => state.exam.codingQuestions);
  const MCQQuestions = useSelector((state) => state.exam.mcqQuestions);

  const selectedQuestion = useSelector(
    (state) => state.examSettings.selectedQuestion
  );

  useEffect(() => {
    let QD = CodingQuestions.find(
      (question) => question._id === selectedQuestion
    );

    if (!QD) {
      QD = MCQQuestions.find((question) => question._id === selectedQuestion);
    }

    setValue(QD?.userAnswer);
  }, [selectedQuestion]);

  useEffect(() => {
    dispatch(setCodingQuestionAnswer({ id: selectedQuestion, answer: value }));
  }, [value, dispatch, selectedQuestion]);

  const language = useSelector((state) => state.examSettings.selectedLanguage);

  const handleEditorChange = (value) => {
    setValue(value);
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height={`100%`}
        width={`100%`}
        language={language || "python"}
        value={value || javascriptDefault}
        theme={theme}
        defaultValue={javascriptDefault}
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditorWindow;
