import dynamic from "next/dynamic";

const DiaryLayout = dynamic(() => import("./layout/Layout"));

export { DiaryLayout };
