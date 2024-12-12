import { DiaryResult } from "./result";

const DiaryReport = () => {
  // return <DiaryInsufficient />
  // return <DiarySufficient />
  return (
    <div className="flex flex-col w-full px-5 py-1 pb-10">
      <DiaryResult />
    </div>
  );
};

export default DiaryReport;
