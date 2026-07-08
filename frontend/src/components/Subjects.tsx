import Btn from "./Buttons/MenuButtons";

const sublis = ["Physics", "Chemistry", "Biology"];
export default function Subjects() {
  const subjectBtns = sublis.map((subject) => (
    <Btn key={subject} text={subject} />
  ));
  return <div>{subjectBtns}</div>;
}

// <span>
//   {sublis.map((subli) => (
//     <Btn text={subli} />
//   ))}
// </span>

// export default function List() {
//   const listItems = people.map(person =>
//     <li>{person}</li>
//   );
//   return <ul>{listItems}</ul>;
// }
