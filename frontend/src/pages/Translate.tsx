import Bubble from "../components/translate/bubble";
import ProgBar from "../components/ProgBar";
import Chips from "../components/chips";
import Table from "../components/translate/table";
import DuolingoTransition from "../components/translate/DuolingoTransition";

export default function Translate() {
  return (
    <>
      <ProgBar />
      <br />
      <br />
      <Bubble />
      <br />
      <br />
      <Table />
      <br />
      <br />
      <Chips wrd="dumbo" />
      <Chips />
      <Chips wrd="alice" />

      <br />
      <br />
      <DuolingoTransition />
    </>
  );
}
