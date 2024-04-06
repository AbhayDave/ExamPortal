import { useEffect, useState } from "react";
import Exam from "../components/Exam";
import { getAllExams } from "../Api/exam/examService";

function AllExam() {
  const [exams, setExams] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedExam, setSelectedExam] = useState(null)

  useEffect(() => {

    const fetchExams = async () => {
      const response = await getAllExams();

      if (response) {
        setExams(response)

      }
      console.log(response);
    }

    fetchExams()

    // if(exams){
    //   setExams(exams)
    // }

  }, [])

  const viewDetailsHandler = (id) => {
    const ex = exams.find(exam => exam._id === id);
    if (ex) {
      console.log(ex);
      setSelectedExam(ex)
      setIsOpen(true)
    }
  }

  const closeDetailsHandler = () => {
    setSelectedExam(null)
    setIsOpen(false)
  }


  return (
    <section className="w-full h-[80vh] max-w-7xl mx-auto px-4 pt-10 pb-20">
      <h1 className="text-3xl font-bold text-left">All Exams</h1>

      {/* <div className="mt-5 flex justify-between border h-full p-4 gap-2"> */}


      <div className="w-full flex flex-col overflow-y-auto px-5 py-10 max-h-full border gap-2 items-center">
        {exams && exams.map((exam) => {
          return (<Exam key={exam._id} viewDetailsHandler={viewDetailsHandler} exam={exam} />)
        })}
      </div>
      {/* </div> */}

      {(selectedExam && isOpen) && <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div className="bg-white h-2/3 w-1/2 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">{selectedExam.title.toUpperCase()}</h2>
          <p className="text-gray-700">{selectedExam.description}</p>
          <p className="text-gray-700">{new Date(selectedExam.examDate).toDateString()}</p>
          <p className="text-gray-700">Duration: {selectedExam.examDuration}HR</p>
          <div className="flex h-1/2 items-center justify-around">
            <div className="">
              <h2 className="text-xl font-bold my-4">Coding Questions</h2>
              <ul>
                {selectedExam.CodingQuestions &&
                  selectedExam.CodingQuestions.map((question) => { return <li key={question}>{question}</li> })}
              </ul>
            </div>
            <div className="">
              <h2 className="text-xl font-bold my-4">Coding Questions</h2>
              <ul>
                {selectedExam.MCQQuestions &&
                  selectedExam.MCQQuestions.map((question) => { return <li key={question}>{question}</li> })}
              </ul>
            </div>
          </div>

          <button onClick={closeDetailsHandler} className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4">Close</button>
        </div>
      </div>}

    </section >
  );
}

export default AllExam;
