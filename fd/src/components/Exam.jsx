
function Exam() {
    return (
        <div className="flex text-white text-lg rounded-xl w-full h-40 bg-gray-500">
            <div className="w-3/4  flex flex-col items-start justify-evenly p-3">
                <h1>Exam Title</h1>
                <h3>Exam Date and Time</h3>
            </div>
            <div className="w-1/4 flex items-center justify-center">
                <button className="bg-gray-700 text-md px-3 py-2 rounded-lg hover:bg-black hover:font-semibold">
                    Start Exam
                </button>
                {/* <button className="bg-gray-700 text-md px-3 py-2 rounded-lg">
              View Result
            </button> */}
            </div>
        </div>
    )
}

export default Exam