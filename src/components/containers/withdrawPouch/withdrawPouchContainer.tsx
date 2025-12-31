import { AVAILABLE_POUCHES } from "@/components/data/withdraw-pouch";
import WithdrawPouchScene from "./withdrawPouchScene";

const WithdrawPouchContainer = () => {
  return <WithdrawPouchScene pouches={AVAILABLE_POUCHES} />;
};

export default WithdrawPouchContainer;

