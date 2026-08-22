import { Platform, View } from 'react-native';
import CardColumn from './cardColumn';
import type { Word, Selection } from '../../types/match';

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
  if (Platform.OS === 'web') {
    return (
      <div className="grid grid-cols-2 gap-4 p-1 md:gap-8 md:p-4 w-full match-container">
        <div>
          <CardColumn
            data={leftData}
            field="dkh"
            onSelect={onSelect}
            selection={selection}
            matched={matched}
            wrongPair={wrongPair}
            successPair={successPair}
          />
        </div>
        <div>
          <CardColumn
            data={rightData}
            field="kan"
            onSelect={onSelect}
            selection={selection}
            matched={matched}
            wrongPair={wrongPair}
            successPair={successPair}
          />
        </div>
      </div>
    );
  }

  return (
    <View className="flex-row w-full p-4 justify-between gap-4">
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
