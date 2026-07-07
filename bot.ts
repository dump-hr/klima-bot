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

const ice_cube_generator = () => {
	const now = new Date();
	const month = now.getMonth();
	if (month >= 10 || month <= 3) {
		return `:sun_with_face:`;
	}
	return `:ice_cube:`;
}

app.message(/upali klimu$/i, async ({ message, say }) => {
  try {
    await run("ir-ctl --send=klima-keys/POWERON -d /dev/lirc0");
    await say(`Palim klimu! ${ice_cube_generator()}`);
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

app.message(/high power$/i, async ({ message, say }) => {
  try {
    await run("ir-ctl --send=klima-keys/POWERON -d /dev/lirc0");
    await run("ir-ctl --send=klima-keys/HIPOWERON -d /dev/lirc0");
    await say(`Palim HIGH POWERRR!!!! ${ice_cube_generator()} ${ice_cube_generator()} ${ice_cube_generator()} ${ice_cube_generator()} ${ice_cube_generator()}`);
  } catch (error) {
    console.error(error);
  }
});

app.message(/high power off$/i, async ({ message, say }) => {
  try {
    await run("ir-ctl --send=klima-keys/HIPOWEROFF -d /dev/lirc0");
    await say(`Gasim HIGH POWERRR :sob:`);
  } catch (error) {
    console.error(error);
  }
});

app.message(/quiet mode$/i, async ({ message, say }) => {
  try {
    await run("ir-ctl --send=klima-keys/QUIETMODEON -d /dev/lirc0");
    await say(`Palim quiet mode :shushing_face:`);
  } catch (error) {
    console.error(error);
  }
});

app.message(/quiet mode off$/i, async ({ message, say }) => {
  try {
    await run("ir-ctl --send=klima-keys/QUIETMODEOFF -d /dev/lirc0");
    await say(`Gasim quiet mode :shushing_face:`);
  } catch (error) {
    console.error(error);
  }
});

app.message(/1 crtica$/i, async ({ message, say }) => {
  try {
    await run("ir-ctl --send=klima-keys/FANCTRL1 -d /dev/lirc0");
    await say(`:heavy_minus_sign:`);
  } catch (error) {
    console.error(error);
  }
});

app.message(/2 crtice$/i, async ({ message, say }) => {
  try {
    await run("ir-ctl --send=klima-keys/FANCTRL2 -d /dev/lirc0");
    await say(`:heavy_minus_sign: :heavy_minus_sign:`);
  } catch (error) {
    console.error(error);
  }
});

app.message(/3 crtice$/i, async ({ message, say }) => {
  try {
    await run("ir-ctl --send=klima-keys/FANCTRL3 -d /dev/lirc0");
    await say(`:heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign:`);
  } catch (error) {
    console.error(error);
  }
});

app.message(/4 crtice$/i, async ({ message, say }) => {
  try {
    await run("ir-ctl --send=klima-keys/FANCTRL4 -d /dev/lirc0");
    await say(`:heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign:`);
  } catch (error) {
    console.error(error);
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log("klima bot is running!");
})();
