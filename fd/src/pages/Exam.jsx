import { useEffect, useState } from "react";
import screenfull from "screenfull";
import ExamNav from "../components/Exam/ExamNav/ExamNav";
import devtools from "devtools-detect";
// import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
// import { resetState } from "../app/examSlice";
import ExamMainArea from "../components/Exam/Main/ExamMainArea";


const Exam = () => {
  const [isFullscreen, setIsFullscreen] = useState(screenfull.isFullscreen);
  // const [isFullscreen, setIsFullscreen] = useState(true);
  const [firstRender, setFirstRender] = useState(true);
  // const navigate = useNavigate();
  // const { id } = useParams();
  // const dispatch = useDispatch();
 
  useEffect(() => {

    // console.log(examData);

    const handleFullScreenChange = () => {
      if (devtools.isOpen) {
        alert("Close DevTools");
        // Perform actions when DevTools is open
      } else {
        setIsFullscreen(screenfull.isFullscreen);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // User switched tabs or opened a new window
        // Stop the quiz or take appropriate action
        // console.log("User switched tabs or opened a new window");
      } else {
        // User returned to the tab
        // Resume the quiz or continue
        // console.log("User returned to the tab");
      }
    };

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue =
        "Warning You Will All Progress, Are you sure you want to leave?";
    };

    if (screenfull.isEnabled) {
      document.addEventListener(
        screenfull.raw.fullscreenchange,
        handleFullScreenChange
      );
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Keys shortcuts still baki

    return () => {
      if (screenfull.isEnabled) {
        document.removeEventListener(
          screenfull.raw.fullscreenchange,
          handleFullScreenChange
        );
        window.addEventListener("beforeunload", handleBeforeUnload);
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      }
    };
  }, []);

  const toggleFullScreen = () => {
    if (firstRender) {
      setFirstRender(false);
    }
    if (screenfull.isEnabled) {
      if (screenfull.isFullscreen) {
        screenfull.exit();
        // pause();
      } else {
        screenfull.request();
        // start();
      }
    }
  };

  return (
    <div className="relative">
      {isFullscreen && !devtools.isOpen ? (
      // {isFullscreen  ? (
      <div className="h-screen bg-green-500 w-screen top-0 left-0">
        <ExamNav
          toggleFullScreen={toggleFullScreen}
          isFullscreen={isFullscreen}
        />
        <ExamMainArea />
      </div>
      ) : (
      <div className="h-screen flex justify-center items-center bg-red-500 w-screen top-0 left-0">
        {firstRender ? (
          <button
            className="bg-green-400 px-4 py-2 rounded-xl text-xl font-bold"
            onClick={toggleFullScreen}
          >
            Start Exam
          </button>
        ) : (
          <button
            className="bg-green-400 px-4 py-2 rounded-xl text-xl font-bold"
            onClick={toggleFullScreen}
          >
            Continue Exam
          </button>
        )}
      </div>
      )}
    </div>

    // ExamNav
    // Timer
    // Submit Button
    // MainContent
    //  Question Description
    //  Answer Area
  );
};

export default Exam;
