import { PolygonSvg, Star28Svg } from "@/app/assets/icons";
import Link from "next/link";

const DiaryEmptyBanner = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <Link href={"/diary/new"}>
        <div className="flex flex-col items-center">
          <div className="flex items-center px-5 py-3 rounded-xl bg-gradient-to-r from-gradient-02-100 to-gradient-02-200">
            <p className="text-white text-body2 font-bold">
              {"다이어리를 만들어보세요"}
            </p>
          </div>
          <PolygonSvg />
        </div>
        <div className="flex justify-center">
          {<Star28Svg className="text-white" />}
        </div>
      </Link>
    </div>
  );
};

export default DiaryEmptyBanner;
