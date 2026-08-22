import { Platform, View, Text } from 'react-native';
import { useMatchBoard } from '../../hooks/useMatchBoard';
import ContMatch from './container';
import type { Word } from '../../types/match';

interface MatchBoardProps {
  words: Word[];
  onCorrect: () => void;
}

export default function MatchBoard({ words, onCorrect }: MatchBoardProps) {
  const {
    columns,
    selection,
    matched,
    wrongPair,
    successPair,
    handleSelect,
  } = useMatchBoard({ words, onCorrect });

  if (Platform.OS === 'web') {
    return (
      <div className="w-full flex-1 flex flex-col">
        <div className="text-center md:text-left mt-2 mb-4 w-full">
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-wide font-sans mb-1">
            Tap the matching pairs
          </h2>
        </div>
        <div className="w-full flex-1 flex flex-col justify-center my-auto">
          <ContMatch
            leftData={columns.left}
            rightData={columns.right}
            onSelect={handleSelect}
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
    <View className="w-full flex-1 flex flex-col justify-center p-4">
      <View className="my-4">
        <Text className="text-2xl font-extrabold text-white text-center">
          Tap the matching pairs
        </Text>
      </View>
      <ContMatch
        leftData={columns.left}
        rightData={columns.right}
        onSelect={handleSelect}
        selection={selection}
        matched={matched}
        wrongPair={wrongPair}
        successPair={successPair}
      />
    </View>
  );
}
