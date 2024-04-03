import CreateExamForm from "../components/CreateExamForm";
import QuestionHut from "./QuestionHut";
function CreateExam() {
  return (
    <div className="flex">
      <CreateExamForm />
      <QuestionHut />
    </div>
  );
}

export default CreateExam;
