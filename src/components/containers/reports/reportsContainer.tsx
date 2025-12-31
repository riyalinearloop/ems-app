import {
  REPORT_HISTORY,
  REPORT_STATS,
  QUICK_REPORT_TEMPLATES,
} from "@/components/data/reports";
import ReportsScene from "./reportsScene";

const ReportsContainer = () => {
  return (
    <ReportsScene
      reportHistory={REPORT_HISTORY}
      reportStats={REPORT_STATS}
      quickReportTemplates={QUICK_REPORT_TEMPLATES}
    />
  );
};

export default ReportsContainer;

