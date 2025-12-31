import {
  POUCH_REPORTS,
} from "@/components/data/pouch-history";
import PouchHistoryScene from "./pouchHistoryScene";

const PouchHistoryContainer = () => {
  return (
    <PouchHistoryScene
      reports={POUCH_REPORTS}
    />
  );
};

export default PouchHistoryContainer;

