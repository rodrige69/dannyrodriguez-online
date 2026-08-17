import { defineCliConfig } from "sanity/cli";

// Lets `npx sanity <command>` (login, deploy, dataset, etc.) know which project/dataset to
// target without prompting for it every time. Not used by the Next.js app itself — only by the
// Sanity CLI when run directly from this folder.
export default defineCliConfig({
  api: {
    projectId: "bkxauu92",
    dataset: "production",
  },
  // Deployed hosted Studio: https://danny-rodriguez.sanity.studio/ — pinning the appId here so
  // future `npx sanity deploy` runs update this same studio instead of prompting each time.
  deployment: {
    appId: "vofav8aroc5z9wvt2pkouxn7",
  },
});
