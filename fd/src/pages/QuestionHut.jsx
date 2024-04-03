import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";

function QuestionHut() {
  const questionTypeCategories = ["Coding", "MCQ"];
  const questionTopicCategories = ["Arrays", "LinkedList", "Recursion"];

  // const [questionTypeCategories, setQuestionTypeCategories] = useState(null);
  // const [questionTopicCategories, setQuestionTopicCategories] =
  //   useState(null);

  // useEffect(() => {

  // }, [questionTypeCategories, questionTopicCategories])

  const handleChange = (category, searchTerm) => {
    // Handle search logic here, potentially filtering data based on category
    if (!searchTerm || !category) return;
    console.log(`Searching for "${searchTerm}" in category: "${category}"`);
    return ["ABHAY", "DAVE"];
  };

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  return (
    <div className="container w-1/2 bg-white shadow-md rounded-lg p-6 mx-auto my-5">
      <div className="header bg-red-600 text-white font-sans text-lg text-center py-3 rounded-t-lg">
        Question Hut
      </div>

      <div className="flex items-center justify-evenly">
        <div className="my-4 flex flex-col justify-evenly items-center gap-1">
          <div className="w-full border mb-3 text-center shadow-md bg-red-600 text-white font-sans text-lg py-3 rounded-t-lg">
            Question Search
          </div>
          <SearchBar
            questionTypeCategories={questionTypeCategories}
            questionTopicCategories={questionTopicCategories}
            setSelectedQuestion={setSelectedQuestion}
            onSearch={handleChange}
          />
        </div>
      </div>

      <div>
        {selectedQuestion ? (
          <div className="w-2/5 border mx-auto h-[50vh]">ABHAY</div>
        ) : (
          <div className=""></div>
        )}
      </div>
    </div>
  );
}

export default QuestionHut;
