import { ReportEnums, ReportLibs } from "@/app/lib/report";
import { RetrospectEnums } from "@/app/models/report";
import Link from "next/link";
import { ReadonlyURLSearchParams } from "next/navigation";

export interface ReportChipHeaderProps {
  searchParams: Record<string, string>;
}

const ReportChipHeader = (props: ReportChipHeaderProps) => {
  const searchParams = new URLSearchParams(props.searchParams);
  const paramType = ReportLibs.getRetrospectType(
    searchParams as ReadonlyURLSearchParams
  );
  const hrefs = Object.values(RetrospectEnums).map((type) => {
    const params = new URLSearchParams(searchParams);
    params.set("type", type);
    const url = `/report/${ReportEnums.RETROSPECTIVE}?${params}`;

    return {
      text: ReportLibs.getChipText(type),
      url,
      active: paramType === type,
    };
  });

  return (
    <div className="w-full flex gap-x-2.5 h-[60px]">
      {hrefs.map((href) => {
        const classNames = {
          chip: !href.active
            ? "h-10 w-[72px] flex items-center justify-center rounded-[30px] bg-app-primary-400"
            : "h-10 w-[72px] flex items-center justify-center rounded-[30px] bg-app-gray-1200",
          text: !href.active
            ? "text-app-primary-200 text-sub4"
            : "text-white text-sub4",
        };
        return (
          <Link className={classNames.chip} href={href.url} key={href.text}>
            <span className={classNames.text}>{href.text}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default ReportChipHeader;
