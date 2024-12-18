import dynamic from "next/dynamic";

const DiaryLayout = dynamic(() => import("./layout/Layout"));
const DiaryLoadingLayout = dynamic(() => import("./layout/Loading"));

export { DiaryLayout, DiaryLoadingLayout };
