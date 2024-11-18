declare module "*.svg" {
  import React, { SVGProps } from "react";
  const svg: React.FC<SVGProps<SVGSVGElement>>;
  export default svg;
}
