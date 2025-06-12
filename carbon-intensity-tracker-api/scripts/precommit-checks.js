const { execSync } = require("child_process");

function run(command) {
  console.log(`Running: ${command}`);
  execSync(command, { stdio: "inherit" });
}

try {
  run("npm run build");
  run("npm run test");
} catch (err) {
  console.error("Pre-commit hook failed.");
  process.exit(1);
}
