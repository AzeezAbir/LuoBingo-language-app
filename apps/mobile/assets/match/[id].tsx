import React from 'react';
    import { View, Text, Pressable } from 'react-native';
    import { useLocalSearchParams } from 'expo-router';
    import { useMatchBoard, type Word } from '@luobingo/shared';
    
    // Fetch/mock words
    const mockWords: Word[] = [
      { id: 1, dkh: "Khana", kan: "Oota" },
      { id: 2, dkh: "Pani", kan: "Neeru" },
    ];
    
    export default function MatchScreen() {
      const { id } = useLocalSearchParams();
    
      const {
        columns,
        selection,
        matched,
        wrongPair,
        successPair,
        handleSelect,
      } = useMatchBoard({
        words: mockWords,
        onCorrect: () => alert("Correct Match!"),
      });

      return (
        <View className="flex-1 bg-[#131f24] p-4 justify-center">
          <Text className="text-xl text-white font-bold text-center mb-6">Match Game {id}</Text>
          
          <View className="flex-row justify-between w-full">
            {/* Left Column (Dakhni) */}
            <View className="flex-1 mr-2 gap-4">
              {columns.left.map((item) => (
                <Pressable
                  key={item.id}
                  disabled={matched.includes(item.id)}
                  onPress={() => handleSelect(item.id, 'dkh')}
                  className={`p-4 border-2 rounded-lg items-center ${
                    selection.id === item.id && selection.side === 'dkh'
                      ? 'border-[#1cb0f6] bg-[#202f36]'
                      : matched.includes(item.id)
                      ? 'opacity-40 border-transparent bg-[#37464f]'
                      : 'border-[#37464f] bg-[#1a2930]'
                  }`}
                >
                  <Text className="text-white font-medium">{item.dkh}</Text>
                </Pressable>
              ))}
            </View>

            {/* Right Column (Kannada) */}
            <View className="flex-1 ml-2 gap-4">
              {columns.right.map((item) => (
                <Pressable
                  key={item.id}
                  disabled={matched.includes(item.id)}
                  onPress={() => handleSelect(item.id, 'kan')}
                  className={`p-4 border-2 rounded-lg items-center ${
                    selection.id === item.id && selection.side === 'kan'
                      ? 'border-[#1cb0f6] bg-[#202f36]'
                      : matched.includes(item.id)
                      ? 'opacity-40 border-transparent bg-[#37464f]'
                      : 'border-[#37464f] bg-[#1a2930]'
                  }`}
                >
                  <Text className="text-white font-medium">{item.kan}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      );
    }

