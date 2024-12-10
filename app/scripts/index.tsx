import dynamic from "next/dynamic";

const SwygScript = dynamic(() => import("./Swyg"), { ssr: true });

export { SwygScript };
