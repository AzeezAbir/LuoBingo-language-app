import { Button } from "@mui/material";
import Homebtn from "../components/Buttons/Homebtn";
import ProgBar from "../components/ProgBar";
import "../styles/UI.css";
import ActionAreaCard from "../components/Buttons/ActionAreaCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function C12() {
  const clicker = () => {
    alert("You clicked");
  };
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isSubmitted, SetIsSubmitted] = useState(false);

  const currentProg = isSubmitted && selectedIndex === 2 ? 100 : 10;

  const navigate = useNavigate();

  const changeIndex = (newIndex) => {
    setSelectedIndex(newIndex);
    SetIsSubmitted(false);
  };
  const handleCheckClick = () => {
    SetIsSubmitted(true);
    if (isSubmitted && selectedIndex === 2) {
      navigate("/");
      return;
    }
    if (selectedIndex === 2) {
      console.log("Correct! , check!");
    }
  };

  return (
    <>
      <Homebtn />
      <ProgBar progressValue={currentProg} />
      <p>
        <strong>Which of the following is a semiconductor</strong>
      </p>
      <br />
      <span>
        <ActionAreaCard
          index={1}
          onCardSelect={changeIndex}
          isSelected={selectedIndex === 1}
          fast={"Metals"}
          imageName="conductors.jpg"
          className={selectedIndex === 1 ? "actionCardd" : ""}
        />
        <ActionAreaCard
          index={2}
          onCardSelect={changeIndex}
          isSelected={selectedIndex === 2}
          fast={"Semiconductors"}
          imageName="semi.jpg"
          className={selectedIndex === 2 ? "actionCardd" : ""}
        />
        <ActionAreaCard
          index={3}
          onCardSelect={changeIndex}
          isSelected={selectedIndex === 3}
          fast={"Insulators"}
          imageName="insulators.jpg"
          className={selectedIndex === 3 ? "actionCardd" : ""}
        />
      </span>
      <br />
      <Button
        sx={{
          color: selectedIndex === 2 && isSubmitted ? "green" : "inherit",
        }}
        onClick={handleCheckClick}
      >
        {selectedIndex === 2 && isSubmitted ? "Continue" : "Check"}
      </Button>
    </>
  );
}

// import { Button } from "@mui/material";
// import Homebtn from "../components/Buttons/Homebtn";
// import ProgBar from "../components/ProgBar";
// import "../styles/UI.css";
// import ActionAreaCard from "../components/Buttons/ActionAreaCard";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function C12() {
//   const [questionData, setQuestionData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [selectedIndex, setSelectedIndex] = useState(null);
//   const [isSubmitted, SetIsSubmitted] = useState(false);
//   const navigate = useNavigate();

//   // 1. Fetch data from your backend when the component mounts
//   useEffect(() => {
//     const fetchQuestion = async () => {
//       try {
//         // Adjust this URL to match your actual backend route!
//         const response = await fetch("http://localhost:5000/api/questions/C12");
//         const data = await response.json();

//         // Your controller returns an array. Let's grab the first question.
//         if (data && data.length > 0) {
//           setQuestionData(data[0]);
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching question:", error);
//         setLoading(false);
//       }
//     };

//     fetchQuestion();
//   }, []);

//   // Show a loading state while fetching data
//   if (loading) return <p>Loading question...</p>;
//   if (!questionData) return <p>No question found for this chapter.</p>;

//   // 2. Use dynamic data for logic instead of hardcoded '2'
//   const correctAnswer = questionData.correctAnswer;
//   const currentProg = isSubmitted && selectedIndex === correctAnswer ? 100 : 10;

//   const changeIndex = (newIndex) => {
//     setSelectedIndex(newIndex);
//     SetIsSubmitted(false);
//   };

//   const handleCheckClick = () => {
//     SetIsSubmitted(true);
//     if (isSubmitted && selectedIndex === correctAnswer) {
//       navigate("/");
//       return;
//     }
//     if (selectedIndex === correctAnswer) {
//       console.log("Correct! , check!");
//     }
//   };

//   return (
//     <>
//       <Homebtn />
//       <ProgBar progressValue={currentProg} />
//       <p>
//         {/* 3. Render the dynamic question text */}
//         <strong>{questionData.questionText}</strong>
//       </p>
//       <br />
//       <span>
//         {/* 4. Map through the dynamic options array from your database */}
//         {questionData.options.map((opt) => (
//           <ActionAreaCard
//             key={opt.index}
//             index={opt.index}
//             onCardSelect={changeIndex}
//             fast={opt.fast}
//             // Standardized class name logic based on selection
//             className={selectedIndex === opt.index ? "actionCardd" : ""}
//           />
//         ))}
//       </span>
//       <br />
//       <Button
//         sx={{
//           color:
//             selectedIndex === correctAnswer && isSubmitted
//               ? "green"
//               : "inherit",
//         }}
//         onClick={handleCheckClick}
//       >
//         {selectedIndex === correctAnswer && isSubmitted ? "Continue" : "Check"}
//       </Button>
//     </>
//   );
// }
