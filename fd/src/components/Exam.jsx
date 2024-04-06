import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

function Exam(props) {

    const { viewDetailsHandler, exam } = props

    const userData = useSelector((state) => state.auth.userData);


    const {
        _id,
        title,
        description,
        creator,
        examDate,
        startTime,
        examDuration,
        CodingQuestions,
        MCQQuestions,
        status
    } = exam;

    return (
        <div className="flex justify-evenly text-white text-lg rounded-xl px-4 w-full h-40 bg-gray-500">
            <div className="grid gap-4 grid-cols-2 items-center pl-10">
                <h1>{title}</h1>
                <h3>{examDate && new Date(examDate).toDateString()}</h3>
                <h3>{examDuration && examDuration} HR</h3>
                <h3>{status && status}</h3>
            </div>
            <div className="gap-1 text-md flex items-center justify-center">

                {/* {userData.role !== 'teacher' ?  : null} */}

                {/* {status === "In Progress" && creator === userData._id ? <button className="bg-gray-700 text-md px-2 py-1 rounded-lg hover:bg-black hover:font-semibold">
                    Stop Exam
                </button> : null}

                {status === "Scheduled" && creator === userData._id ? <button className="bg-gray-700 text-md px-2 py-1 rounded-lg hover:bg-black hover:font-semibold">
                    Start Exam
                </button> : null} */}

                {status === "In Progress" && userData.role === 'student' ? <button className="bg-gray-700 text-md px-2 py-1 rounded-lg hover:bg-black hover:font-semibold">
                    Give Exam
                </button> : null}

                {creator === userData._id && status === "Scheduled" ? <Link to={`/edit-exam/${exam._id}`}>
                    <button className="bg-gray-700 text-md px-2 py-1 rounded-lg hover:bg-black hover:font-semibold">
                        Update Exam
                    </button>
                </Link> : null}

                

                {creator === userData._id && status === "Scheduled" ? <button className="bg-gray-700 text-md px-2 py-1 rounded-lg hover:bg-black hover:font-semibold">
                    Delete Exam
                </button> : null}

                {userData.role === "teacher" ? <button onClick={() => viewDetailsHandler(_id)} className="bg-gray-700 text-md px-2 py-1 rounded-lg hover:bg-black hover:font-semibold">
                    View Details
                </button> : null}

                {/* {status === "Completed"} <button className="bg-gray-700 text-md px-3 py-2 rounded-lg">
                    View Result
                </button> */}


            </div>
        </div>
    )
}

export default Exam