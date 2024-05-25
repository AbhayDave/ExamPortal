import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMcqQuestionAnswer } from "../../app/examSlice";

const MCQComp = ({ mcqQuestion }) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);

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
         QD = MCQQuestions.find(
           (question) => question._id === selectedQuestion
         );
       }

       setSelectedOption(QD?.userAnswer);
     }, [selectedQuestion]);

     useEffect(() => {
       dispatch(
         setMcqQuestionAnswer({ id: selectedQuestion, answer: selectedOption })
       );
     }, [selectedOption, dispatch, selectedQuestion]);

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    dispatch(setMcqQuestionAnswer(mcqQuestion._id, selectedValue));
  };

  return (
    <div>
      <h3>{mcqQuestion?.title}</h3>
      <p>{mcqQuestion?.description}</p>
      {mcqQuestion?.options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            value={option}
            checked={selectedOption === option}
            onChange={handleOptionChange}
          />
          <label>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default MCQComp;
