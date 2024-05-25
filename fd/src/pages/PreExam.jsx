import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCodingQuestionsByID,
  getMCQQuestionsByID,
} from "../Api/question/questionService";
import { getExamByID } from "../Api/exam/examService";
import { useDispatch, useSelector } from "react-redux";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  setExamDetails,
  setCodingQuestions,
  setMcqQuestions,
  // resetState,
} from "../app/examSlice";

const PreExam = () => {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const checkRef = useRef(null);

  const notify = () =>
    toast("You can not give this Exam! Contact the Subject Teacher", {
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

  useEffect(() => {


    const loadExamDataToRedux = () => {
      const fetchExamData = async () => {
        const examData = await getExamByID(id);

        if (examData) return examData;
        else return null;
      };

      const fetchCodingQuestionsData = async (questions) => {
        const codingQuestionsPromises = questions.map(async (questionID) => {
          const questionData = await getCodingQuestionsByID(questionID);
          return questionData;
        });

        const codingQuestions = await Promise.all(codingQuestionsPromises);
        const codingQuestionsTemp = codingQuestions.map((question) => {
          return { ...question, userAnswer: "" };
        });

        return codingQuestionsTemp;
      };

     const fetchMCQQuestionsData = async (questions) => {
       const mcqQuestionsPromises = questions.map(async (questionID) => {
         const questionData = await getMCQQuestionsByID(questionID);
         return questionData;
       });

       const mcqQuestions = await Promise.all(mcqQuestionsPromises);
       const mcqQuestionsTemp = mcqQuestions.map((question) => {
         return { ...question, userAnswer: "" };
       });
       return mcqQuestionsTemp;
     };


      const mainWork = async () => {
        const examData = await fetchExamData();
        const { _id, title, description, examDuration, attendees, examDate } =
          examData;
          // console.log(examData);
        const { CodingQuestions, MCQQuestions } = examData;

        const examDetails = {
          examId: _id,
          examName: title,
          examDescription: description,
          examDate: examDate,
          duration: examDuration,
          totalQuestions: CodingQuestions?.length + MCQQuestions?.length,
          attendees: attendees,
        };

        if (!examData?.attendees.includes(userData._id)) {
          notify();
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }

        const codingQuestions = await fetchCodingQuestionsData(CodingQuestions);
        const mcqQuestions = await fetchMCQQuestionsData(MCQQuestions);

        dispatch(setExamDetails(examDetails));
        dispatch(setCodingQuestions(codingQuestions));
        dispatch(setMcqQuestions(mcqQuestions));
      };

      mainWork();
    };

    loadExamDataToRedux();


    // Keys shortcuts still baki

    // return () => {
    //   dispatch(resetState());
    // }

  }, [dispatch, id, navigate, userData]);

  const startTimeHandler = () => {
    if (checkRef.current.checked) {
      navigate(`/ex/${id}`);
    } else {
      alert("Accept the Terms and Conditions to Continue");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-red-500 w-screen">
      <label className="text-lg mb-3" htmlFor="acceptTerms">
        <input
          ref={checkRef}
          className="text-lg mr-3 size-5"
          type="checkbox"
          name="acceptTerms"
          id="acceptTerms"
        />
        I have read all the rules
      </label>
      <button
        className="bg-green-400 px-4 py-2 rounded-xl text-xl font-bold"
        onClick={startTimeHandler}
      >
        Start Exam
      </button>
      <ToastContainer />
    </div>

    // ExamNav
    // Timer
    // Submit Button
    // MainContent
    //  Question Description
    //  Answer Area
  );
};

export default PreExam;
