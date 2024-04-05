// import React, { useState, useEffect, useId } from "react";

// const TagsInput = React.forwardRef(function TagsInput(
//   { label, type = "text", className = "", ...props },
//   ref
// ) {
//   const [tags, setTags] = useState([]);
//   const [tagInput, setTagInput] = useState("");
//   const [suggestions, setSuggestions] = useState([]);

//   useEffect(() => {
//     // Fetch suggestions from the database using AJAX
//     const fetchSuggestions = async () => {
//       // Make an AJAX request to fetch tag suggestions
//       // Update the 'suggestions' state with the fetched data
//     };

//     fetchSuggestions();
//   }, [tagInput]);

//   const handleTagInput = (e) => {
//     const input = e.target.value;
//     setTagInput(input);
//   };

//   const handleSuggestionSelect = (selectedSuggestion) => {
//     setTags([...tags, selectedSuggestion]);
//     setTagInput("");
//     setSuggestions([]); // Clear suggestions after selecting a tag
//   };

//   const id = useId();
//   return (
//     <div className="w-full">
//       {label && (
//         <label className="inline-block mb-1 pl-1" htmlFor={id}>
//           {label}
//         </label>
//       )}
//       <div>
//         <div>
//           {tags.map((tag, index) => (
//             <div key={index}>{tag}</div>
//           ))}
//         </div>
//         <input
//           type={type}
//           className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
//           ref={ref}
//           value={tagInput}
//           onChange={handleTagInput}
//           id={id}
//         />
//         <div>
//           {suggestions.map((suggestion, index) => (
//             <div key={index} onClick={() => handleSuggestionSelect(suggestion)}>
//               {suggestion}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// });

// export default TagsInput;
