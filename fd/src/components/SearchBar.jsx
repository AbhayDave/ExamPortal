/* eslint-disable react/prop-types */
import { useState } from "react";
import { getQuestionsBasedOnCategoryAndTitle } from "../Api/question/questionService";

const SearchBar = ({
  questionTopicCategories,
  questionTypeCategories,
  setSelectedQuestion,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const onSearch = async (questionType, category, searchTerm) => {
    // console.log(`Searching for "${searchTerm}" in category: "${category}"`);
    if (!searchTerm || !category || !questionType) return;

    const questions = await getQuestionsBasedOnCategoryAndTitle(
      questionType,
      category,
      searchTerm
    );

    return questions;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const results = await onSearch(
      selectedQuestionType,
      selectedCategory,
      searchTerm
    );
    if (results?.length > 0) {
      setSearchResults(results);
    } else {
      return null;
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleQuestionTypeChange = (e) => {
    setSelectedQuestionType(e.target.value);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <form className="flex items-center mx-auto" onSubmit={handleSearch}>
        <select
          value={selectedQuestionType}
          onChange={handleQuestionTypeChange}
          className="mr-2 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          required
        >
          <option value="">Select Type</option>
          {questionTypeCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="mr-2 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          required
        >
          <option value="">Select Category</option>
          <option value="All">All Categories</option>
          {questionTopicCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="Search Question Title..."
          required
        />
        <button
          type="submit"
          className="ml-2 rounded-md bg-indigo-500 px-3 py-2 text-white hover:bg-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          Search
        </button>
      </form>

      {searchResults ? (
        <div className="mt-4 min-h-32 max-h-96 overflow-y-scroll">
          <h3 className="text-lg font-medium mb-2">Search Results</h3>
          <ul className="list-disc space-y-2">
            {searchResults.map((question) => (
              <li
                className="bg-red-400"
                key={question._id}
                onClick={() => {
                  setSelectedQuestion(question);
                }}
              >
                {question.title}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default SearchBar;
