import { View } from "react-native";
import CardColumn from "./cardColumn";
import type { Word, Selection } from "@luobingo/shared";

interface ContProps {
  leftData: Word[];
  rightData: Word[];
  onSelect: (id: string | number, side: "dkh" | "kan") => void;
  selection: Selection;
  matched: (string | number)[];
  wrongPair: (string | number)[];
  successPair: (string | number)[];
}

export default function Cont({
  leftData,
  rightData,
  onSelect,
  selection,
  matched,
  wrongPair,
  successPair,
}: ContProps) {
  return (
    <View className="flex-row w-full justify-between gap-4 p-2">
      <View className="flex-1">
        <CardColumn
          data={leftData}
          field="dkh"
          onSelect={onSelect}
          selection={selection}
          matched={matched}
          wrongPair={wrongPair}
          successPair={successPair}
        />
      </View>
      <View className="flex-1">
        <CardColumn
          data={rightData}
          field="kan"
          onSelect={onSelect}
          selection={selection}
          matched={matched}
          wrongPair={wrongPair}
          successPair={successPair}
        />
      </View>
    </View>
  );
}
