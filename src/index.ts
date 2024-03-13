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

const getIsRamadan = async () => {
	const schema = z.union([
		z.object({
			isTodayRamadan: z.literal(true),
			daysElapsedSinceStart: z.number(),
		}),
		z.object({
			isTodayRamadan: z.literal(false),
		}),
	]);

	const resp = await fetch(
		"https://ramadan.zakiego.com/api/ramadan?timezoneOffset=7",
	).then((res) => res.json());

	const parsed = schema.parse(resp);

	return parsed;
};

const main = async () => {
	const days = await getRamadanCountdown();
	const isRamadan = await getIsRamadan();

	if (isRamadan.isTodayRamadan) {
		const content = `Day ${isRamadan.daysElapsedSinceStart} of Ramadan`;

		await client.v2
			.tweet(content)
			.then(() => {
				console.log(`Tweeted: ${content}`);
			})
			.catch((e) => {
				console.log(`Error tweeting: ${content} - ${e}`);
			});

		return;
	}

	let content = `${days} days until Ramadan`;
	if (days <= 1) {
		content = `${days} day until Ramadan`;
	}

	await client.v2
		.tweet(content)
		.then(() => {
			console.log(`Tweeted: ${content}`);
		})
		.catch((e) => {
			console.log(`Error tweeting: ${content} - ${e}`);
		});
};

main();
