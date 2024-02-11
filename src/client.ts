import { TwitterApi } from "twitter-api-v2";

export const client = new TwitterApi({
	accessToken: process.env.TWITTER_ACCESS_TOKEN,
	accessSecret: process.env.TWITTER_ACCESS_SECRET,
	appKey: process.env.TWITTER_APP_KEY,
	appSecret: process.env.TWITTER_APP_SECRET,
});
