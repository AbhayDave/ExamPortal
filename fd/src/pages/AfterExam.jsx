import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../app/examSlice";

function AfterExam() {
  const examSubmission = useSelector((state) => state.exam);
  const dispatch = useDispatch();

  const [examSubmissionData, setExamSubmissionData] = useState(null);

  useEffect(() => {
    setExamSubmissionData(examSubmission);

    return () => {
      dispatch(resetState());
    };
  }, []);

  return (
    <div>
      <h1>Exam Finished</h1>
      <p>{examSubmissionData?.examDetails.examName}</p>
    </div>
  );
}

export default AfterExam;
