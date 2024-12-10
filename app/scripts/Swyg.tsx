"use client";

import Script from "next/script";
import { Suspense } from "react";

const SwygScript = () => {
  return (
    <Suspense fallback={<></>}>
      <Script
        defer
        src="https://cdn.swygbro.com/public/widget/swyg-widget.js"
        strategy="afterInteractive"
      />
    </Suspense>
  );
};

export default SwygScript;
