import { App } from "@slack/bolt";
import "dotenv/config";
import { promisify } from "util";
import { exec } from "child_process";

const run = promisify(exec);

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

app.message(/upali klimu$/i, async ({ message, say }) => {
  try {
    await run("ir-ctl --send=klima-keys/POWERON -d /dev/lirc0");
    await say(`Palim klimu! :ice_cube:`);
  } catch (error) {
    console.error(error);
  }
});

app.message(/ugasi klimu$/i, async ({ message, say }) => {
  try {
    await run("ir-ctl --send=klima-keys/POWEROFF -d /dev/lirc0");
    await say(`Gasim klimu! :saluting_face:`);
  } catch (error) {
    console.error(error);
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log("klima bot is running!");
})();
