import { ScrollView, View, Text } from "react-native";
import { useEffect } from "react";
import { Link } from "expo-router";
import { Button } from "@/components/ui/button";
import { useDemoStore } from "../../../store/demoStore";
import { useMcqStore } from "../../../store/mcqStore";
import { useTilesStore } from "../../../store/tilesStore";
import { useTranslateStore } from "../../../store/translateStore";

import MatchBoard from "../../../components/match/MatchBoard";
import McqBoard from "../../../components/mcq/McqBoard";
import TilesBoard from "../../../components/tiles/TilesBoard";
import TranslateBoard from "../../../components/translate/TranslateBoard";

export default function Demo() {
  const state = useDemoStore();
  const mcq = useMcqStore();
  const tiles = useTilesStore();
  const translate = useTranslateStore();

  useEffect(() => {
    mcq.reset();
    tiles.reset();
    translate.reset();
  }, []);

  return (
    <ScrollView
      className="flex-1 w-full"
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Step 0: Match Exercise */}
      {state.currentStep === 0 && state.matchData.length > 0 && (
        <MatchBoard
          words={state.matchData}
          onCorrect={() => {
            useDemoStore.setState({ isStepCorrect: true, canCheck: true });
          }}
        />
      )}

      {/* Step 1: MCQ Exercise */}
      {state.currentStep === 1 && state.mcqQuestions.length > 0 && (
        <McqBoard
          question={state.mcqQuestions[0].question}
          options={state.mcqQuestions[0].options}
          selectedCard={mcq.selectedCard}
          isCorrect={state.isStepCorrect}
          isValidating={state.isValidating}
          onSelectCard={(opt) => mcq.setSelectedCard(opt)}
        />
      )}

      {/* Step 2: Tiles Exercise */}
      {state.currentStep === 2 && state.tilesQuestion && (
        <TilesBoard
          questionText={state.tilesQuestion.questionText}
          options={state.tilesQuestion.options}
          selectedIndex={tiles.selectedIndex}
          isCorrect={state.isStepCorrect}
          isValidating={state.isValidating}
          onSelectTile={(idx) => tiles.setSelectedIndex(idx)}
        />
      )}

      {/* Step 3: Translate Exercise */}
      {state.currentStep === 3 && state.translateQuestion && (
        <TranslateBoard
          key={translate.translateResetKey}
          sentenceWords={state.translateQuestion.sentenceWords}
          bankWords={state.translateQuestion.bankWords}
          correctOrder={state.translateQuestion.correctOrder}
          onSentenceChange={(sentence) =>
            translate.setSelectedTranslateWords(sentence)
          }
        />
      )}
    </ScrollView>
  );
}
