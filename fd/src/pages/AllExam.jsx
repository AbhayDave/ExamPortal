import Exam from "../components/Exam";

function AllExam() {
  return (
    <section className="w-full h-[80vh] max-w-7xl mx-auto px-4 pt-10 pb-20">
      <h1 className="text-3xl font-bold text-left">All Exams</h1>

      {/* <div className="mt-5 flex justify-between border h-full p-4 gap-2">
        <div className="w-1/2 flex justify-center items-center border">
          ABHAY
        </div> */}

      <div className="w-full flex flex-col overflow-y-auto p-5 max-h-full border gap-2 items-center">
        <Exam />
        <Exam />
        <Exam />
        <Exam />
        <Exam />
        <Exam />
        <Exam />
      </div>
      {/* </div> */}
    </section>
  );
}

export default AllExam;
