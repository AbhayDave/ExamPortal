import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import CodeEditorWindow from '../Editor/CodeEditorWindow';
import { setSelectedQuestionData } from '../../../app/examSettingsSlice';
import MCQComp from '../MCQComp';

function AnswerArea() {

    const [questionData, setQuestionData] = useState(null);

    const CodingQuestions = useSelector((state) => state.exam.codingQuestions);
    const MCQQuestions = useSelector((state) => state.exam.mcqQuestions);
    const dispatch = useDispatch()
    const selectedQuestion = useSelector(
      (state) => state.examSettings.selectedQuestion
    );
    const selectedQuestionData = useSelector(
      (state) => state.examSettings.selectedQuestionData
    );

    useEffect(() => {
      let QD = CodingQuestions.find(
        (question) => question._id === selectedQuestion
      );

      if (!QD) {
        QD = MCQQuestions.find((question) => question._id === selectedQuestion);
      }

      dispatch(setSelectedQuestionData(QD));
      // console.log(selectedQuestion);
      // console.log(selectedQuestionData);
    }, [
      selectedQuestion,
      CodingQuestions,
      MCQQuestions,
      dispatch,
      selectedQuestionData,
    ]);

  return (
    <div className="bg-blue-300 w-1/2 h-full">
      {selectedQuestion ? (
        selectedQuestionData?.type === "Coding" ? (
          <CodeEditorWindow />
        ) : (
          <div>
            <MCQComp mcqQuestion={selectedQuestionData} />
          </div>
        )
      ) : (
        <div> Answer Tab </div>
      )}
    </div>
  );
}

export default AnswerArea