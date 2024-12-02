import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

async function fileToModule() {
  const icons = path.resolve(process.cwd(), "./app/assets/icons");
  const svgs = await readdir(icons);

  let content = "";
  for (const svg of svgs) {
    const svgName = svg.split(".")[0] + "Svg";
    if (svgName === "indexSvg") {
      continue;
    }
    content += `import ${svgName} from \"@/app/assets/icons/${svg}\"\n`;
  }
  content += "\n";
  content += "export {\n";
  for (const svg of svgs) {
    const svgName = svg.split(".")[0] + "Svg";
    if (svgName === "indexSvg") {
      continue;
    }
    content += `  ${svgName},\n`;
  }
  content += "}";

  const file = path.resolve(process.cwd(), "./app/assets/icons/index.ts");
  writeFile(file, content);
}

fileToModule();
