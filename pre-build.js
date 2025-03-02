import { execSync } from "child_process";
import fs from "fs";
import path from "path";

// Build the project
console.log("Building project...");
execSync("npm run build", { stdio: "inherit" });

const distPath = path.join(process.cwd(), "dist");
const files = fs.readdirSync(distPath);

// Delete existing folders in the root before replacing them
console.log("Cleaning up old directories...");
files.forEach((file) => {
  const rootFilePath = path.join(process.cwd(), file);

  if (fs.existsSync(rootFilePath) && fs.lstatSync(rootFilePath).isDirectory()) {
    fs.rmSync(rootFilePath, { recursive: true, force: true }); // Delete folder
    console.log(`Deleted folder: ${file}`);
  }
});

// Move built files to root (files will replace automatically)
console.log("Deploying new build...");
files.forEach((file) => {
  const src = path.join(distPath, file);
  const dest = path.join(process.cwd(), file);
  fs.renameSync(src, dest);
});

// Remove the empty dist folder
console.log("Final cleanup...");
fs.rmSync(distPath, { recursive: true });

console.log("Deployment complete! 🚀");
