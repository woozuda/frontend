import { ReportHeader } from "@/app/pages/report";

interface PageProps {
  searchParams: Record<string, string>;
}

export default function Page(props: PageProps) {
  return (
    <div className="w-full flex flex-col">
      <ReportHeader searchParams={props.searchParams} />
    </div>
  );
}
