import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedQuestionData } from "../../../app/examSettingsSlice";

function ExamQuestionDesc() {

  const [questionData, setQuestionData] = useState(null)



   const CodingQuestions = useSelector((state) => state.exam.codingQuestions);
   const MCQQuestions = useSelector((state) => state.exam.mcqQuestions);
   const dispatch = useDispatch();
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
     setQuestionData(QD);
     // console.log(selectedQuestion);
     // console.log(selectedQuestionData);
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [
     selectedQuestion,
     dispatch
   ]);

  return (
    <div className="bg-pink-500 w-1/2 h-full">
      {selectedQuestion ? (
        questionData?.type === "Coding" ? (
          <div>
            <h1>{questionData?.slug}</h1>
            <h3>Coding</h3>
            <h3>{questionData?.description}</h3>
            <h3>{questionData?.difficulty}</h3>
            <h3>{questionData?.tags.join(", ")}</h3>
            {questionData?.testCases.map((testcase) => {
              return (
                <div key={testcase?._id}>
                  <p className="">Input {testcase.input}</p>
                  <p className="">Output {testcase.output}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {" "}
            MCQ <br /> {questionData?.title}{" "}
          </div>
        )
      ) : (
        <div> Select A Question To Start The Exam </div>
      )}
    </div>
  );
}

export default ExamQuestionDesc