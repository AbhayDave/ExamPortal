function AllExam() {
  return (
    <section className="w-full h-[80vh] max-w-7xl mx-auto px-4 pt-10 pb-20">
      <h1 className="text-3xl font-bold text-left">All Exams</h1>

      <div className="mt-5 flex justify-between border h-full p-4 gap-2">
        <div className="w-1/2 flex justify-center items-center border">
          ABHAY
        </div>

        <div className="w-1/2 flex justify-center items-center overflow-y-scroll h-full flex-col gap-2">
          <div className="flex text-white text-lg rounded-xl w-full h-24 bg-gray-500">
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
        </div>
      </div>
    </section>
  );
}

export default AllExam;
