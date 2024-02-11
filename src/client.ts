import { TwitterApi } from "twitter-api-v2";
import { z } from "zod";

const envSchema = z.object({
	TWITTER_ACCESS_TOKEN: z.string(),
	TWITTER_ACCESS_SECRET: z.string(),
	TWITTER_APP_KEY: z.string(),
	TWITTER_APP_SECRET: z.string(),
});

const env = envSchema.parse(process.env);

export const client = new TwitterApi({
	accessToken: env.TWITTER_ACCESS_TOKEN,
	accessSecret: env.TWITTER_ACCESS_SECRET,
	appKey: env.TWITTER_APP_KEY,
	appSecret: env.TWITTER_APP_SECRET,
});
