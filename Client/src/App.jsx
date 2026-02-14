import { useState, useEffect } from "react";
import "./App.css";
import Cont from "./container";

const data = [
  {
    id: 1,
    kan: "ಗಿಳಿ",
    wrd: "Parrot",
    dkh: "Tota",
    description: "Main Character",
  },
  {
    id: 2,
    kan: "ಮರ",
    wrd: "Tree",
    dkh: "Jhadh",
    description: "where parrot lived",
  },
  {
    id: 3,
    kan: "ಬೇಡ",
    wrd: "Hunter",
    dkh: "Shikari",
    description: "the antagonist",
  },
  {
    id: 4,
    kan: "ಬಾಣ",
    wrd: "Arrow",
    dkh: "Teer",
    description: "used by the hunter",
  },
  {
    id: 5,
    kan: "ವಿಷ",
    wrd: "Poison",
    dkh: "Zeher",
    description: "was on the arrow",
  },
];

// Helper function to shuffle an array (Fisher-Yates algorithm)
const shuffleArray = (array) => {
  const newArray = [...array]; // Make a copy so we don't mutate original
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

function App() {
  const [selection, setSelection] = useState({ id: null, side: null });
  const [matched, setMatched] = useState([]);

  // 1. New State for our two columns
  const [columns, setColumns] = useState({ left: [], right: [] });

  // 2. Shuffle data ONCE when app mounts
  useEffect(() => {
    setColumns({
      left: shuffleArray(data),
      right: shuffleArray(data),
    });
  }, []);

  const handleSelect = (id, side) => {
    if (selection.side === null || selection.side === side) {
      setSelection({ id: id, side: side });
      return;
    }

    if (id === selection.id) {
      setMatched([...matched, id]);
      setSelection({ id: null, side: null });
    } else {
      setSelection({ id: id, side: side });
    }
  };

  return (
    <Cont
      // 3. Pass the two shuffled lists separately
      leftData={columns.left}
      rightData={columns.right}
      onSelect={handleSelect}
      selection={selection}
      matched={matched}
    />
  );
}

export default App;
