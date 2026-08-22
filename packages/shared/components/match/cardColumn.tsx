import { Platform, View } from 'react-native';
import Card from './card';
import type { Word, Selection } from '../../types/match';

interface CardColumnProps {
  data: Word[];
  field: "dkh" | "kan";
  onSelect: (id: string | number, side: "dkh" | "kan") => void;
  selection: Selection;
  matched: (string | number)[];
  wrongPair: (string | number)[];
  successPair: (string | number)[];
}

export default function CardColumn({
  data,
  field,
  onSelect,
  selection,
  matched,
  wrongPair,
  successPair,
}: CardColumnProps) {
  if (Platform.OS === 'web') {
    return (
      <div className="flex flex-col w-full gap-4">
        {data.map((item) => (
          <Card
            key={item.id}
            text={item[field]}
            id={item.id}
            side={field}
            onSelect={onSelect}
            isActive={selection?.id === item.id && selection?.side === field}
            isMatched={matched.includes(item.id)}
            isWrong={wrongPair && wrongPair.includes(item.id)}
            isSuccess={successPair && successPair.includes(item.id)}
          />
        ))}
      </div>
    );
  }

  return (
    <View className="flex flex-col w-full gap-4">
      {data.map((item) => (
        <Card
          key={item.id}
          text={item[field]}
          id={item.id}
          side={field}
          onSelect={onSelect}
          isActive={selection?.id === item.id && selection?.side === field}
          isMatched={matched.includes(item.id)}
          isWrong={wrongPair && wrongPair.includes(item.id)}
          isSuccess={successPair && successPair.includes(item.id)}
        />
      ))}
    </View>
  );
}
