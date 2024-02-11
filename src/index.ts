import { z } from "zod";
import { client } from "./client";

const getRamadanCountdown = async () => {
	const schema = z.object({
		countdown: z.object({
			days: z.number(),
		}),
	});

	const resp = await fetch(
		"https://ramadan.zakiego.com/api/countdown?timezoneOffset=7",
	).then((res) => res.json());

	const parsed = schema.parse(resp);

	return parsed.countdown.days;
};

const main = async () => {
	const days = await getRamadanCountdown();

	try {
		let content = `${days} days until Ramadan`;
		if (days === 1) {
			content = `${days} day until Ramadan`;
		}

		console.log("Tweeting:", content);

		await client.v2.tweet(content);

		console.log(`Tweeted: ${content}`);
	} catch (e) {
		console.log("Error:", e);
	}
};

main();
