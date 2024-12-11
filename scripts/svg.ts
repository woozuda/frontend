import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

async function fileToModule() {
  const argv = process.argv;
  const icons = path.resolve(process.cwd(), "./app/assets/icons");
  let svgs = await readdir(icons);
  svgs = svgs.filter((svg) => svg.includes(".svg"));

  const modArg = argv.find((arg) => arg.includes("--module="));

  let content = "";
  for (const svg of svgs) {
    const svgName = svg.split(".")[0] + "Svg";
    content += `import ${svgName} from \"@/app/assets/icons/${svg}\"\n`;
  }
  content += "\n";
  content += "export {\n";
  for (const svg of svgs) {
    const svgName = svg.split(".")[0] + "Svg";
    content += `  ${svgName},\n`;
  }
  content += "}\n";

  if (modArg) {
    const modName = modArg.replace("--module=", "").trim();
    content += `export * from \"./${modName}\"\n`;
  }

  const file = path.resolve(process.cwd(), "./app/assets/icons/index.ts");
  writeFile(file, content);
}

fileToModule();

// Env Update
