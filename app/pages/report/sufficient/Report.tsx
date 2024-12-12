import { Star28Svg } from "@/app/assets/icons";
import SufficientItem from "./Item";

const ReportSufficient = () => {
  return (
    <SufficientItem
      icon={<Star28Svg className="text-white" />}
      text="이번주 회고를 분석해 보세요"
    />
  );
};

export default ReportSufficient;
