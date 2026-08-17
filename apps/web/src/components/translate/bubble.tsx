interface WordWrapperProps {
  word: string;
  tooltip: string;
}

interface BubbleProps {
  words?: WordWrapperProps[];
}

function WordWrapper({ word, tooltip }: WordWrapperProps) {
  return (
    <div className="relative group inline-block cursor-pointer mx-0.5">
      <span
        className="border-b-2 border-dotted border-gray-400 hover:text-[#58cc02] transition-colors pb-0.5 text-2xl md:text-
  2.5xl font-medium"
      >
        {word}
      </span>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-50 pointer-events-none">
        <div className="bg-[#37464f] text-white text-sm py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap font-medium border border-[#4f5d65]">
          {tooltip}
        </div>
        <div className="w-2 h-2 bg-[#37464f] border-r border-b border-[#4f5d65] rotate-45 -mt-1"></div>
      </div>
    </div>
  );
}

export default function Bubble({ words }: BubbleProps) {
  const defaultWords = [
    { word: "Yo", tooltip: "I" },
    { word: "no", tooltip: "do not" },
    { word: "tengo", tooltip: "have" },
    { word: "mi", tooltip: "my" },
    { word: "pasaporte.", tooltip: "passport" },
  ];

  const displayWords = words ?? defaultWords;

  return (
    <div className="flex justify-center p-4">
      <div className="bg-[#242f35] border-2 border-[#37464f] rounded-2xl p-6 max-w-md w-full flex flex-wrap gap-x-2 gap-y-1 justify-center text-white shadow-lg">
        {displayWords.map((item, idx) => (
          <WordWrapper key={idx} word={item.word} tooltip={item.tooltip} />
        ))}
      </div>
    </div>
  );
}
