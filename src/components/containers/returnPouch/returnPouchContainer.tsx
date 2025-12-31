import { RETURN_POUCHES } from "@/components/data/return-pouch";
import ReturnPouchScene from "./returnPouchScene";

const ReturnPouchContainer = () => {
  return <ReturnPouchScene pouches={RETURN_POUCHES} />;
};

export default ReturnPouchContainer;

