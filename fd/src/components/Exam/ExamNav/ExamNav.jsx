import { useSelector, useDispatch } from 'react-redux';
import ExamTimer from './ExamTimer';
import { toggleSideBar } from '../../../app/examSettingsSlice';
import { resetState } from '../../../app/examSlice';
import {useNavigate} from "react-router-dom"
import { submitExam } from '../../../Api/exam/examService';


function ExamNav({ toggleFullScreen, isFullscreen }) {
  const examData = useSelector((state) => state.exam.examDetails);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const examSubmission = useSelector((state) => state.exam);
 

  const isOpen = useSelector((state) => state.examSettings.sideBarOpen);


  const timeString = examData.duration;
  const [hours, minutes] = timeString.split(":").map(Number);
  const seconds = hours * 60 * 60 + (minutes * 60);
  // console.log(seconds); // 60

  const time = new Date();
  time.setSeconds(time.getSeconds() + seconds);

  const submitHandler = ()  => { 
    // console.log(examSubmission);
    submitExam(examSubmission)
    toggleFullScreen()
    // dispatch(resetState())
    navigate("/exam-done")
  }

  return (
    <nav className="w-screen fixed top-0 z-10 flex items-center justify-evenly bg-red-500">
      <ExamTimer expiryTimestamp={time} />

      <button
        className="bg-gray-500 py-3 px-4 font-semibold text-lg rounded-3xl hover:bg-black hover:text-white "
        onClick={submitHandler}
      >
        {isFullscreen ? "Submit Exam" : "Enter Fullscreen"}
      </button>

      <button
        className="bg-gray-500 py-3 px-4 font-semibold text-lg rounded-3xl hover:bg-black hover:text-white "
        onClick={() => {
          dispatch(toggleSideBar());
        }}
      >
        {isOpen ? "Close SideaBar" : "Open SideaBar"}
      </button>
    </nav>
  );
}

export default ExamNav