const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
exports.data = {
	name: "arty",
	description: "I give you some daily material!",
	guildOnly: false,
	args: false,
	cooldown: 2,
	aliases: ["art", "art2"],
};
exports.execute = async (client, message, args) =>
{
	const source = ["https://www.reddit.com/r/hentai/",
		"https://www.reddit.com/r/Overwatch_Porn/",
		"https://www.reddit.com/r/Rule34Overwatch/",
		"https://www.reddit.com/r/skindentation/",
		"https://www.reddit.com/r/tanime/",
		"https://www.reddit.com/r/thighdeology/",
		"https://www.reddit.com/r/thighhighhentai/",
		"https://www.reddit.com/r/ecchi/",
		"https://www.reddit.com/r/thick_hentai/",
		"https://www.reddit.com/r/rule34/",
		"https://www.reddit.com/r/HENTAI_GIF/",
		"https://www.reddit.com/r/pantsu/",
		"https://www.reddit.com/r/WesternHentai/",
		"https://www.reddit.com/r/KuroiHada/",
		"https://www.reddit.com/r/waifusgonewild/",
		"https://www.reddit.com/r/dekaihentai/",
		"https://www.reddit.com/r/bowsette/",
		"https://www.reddit.com/r/rule34/"];
	let http = new XMLHttpRequest();
	// Get random post from hentai subreddit
	const sourceIndex = Math.floor(Math.random() * source.length);
	const url = source[sourceIndex];
	// Establish connection to website
	http = new XMLHttpRequest();
	http.onreadystatechange = function()
	{
		if (this.readyState == 4 && this.status == 200)
		{
			// console.log(sourceIndex + " " + url);
			// console.log(JSON.parse(this.responseText));

			// Parse JSON
			const jsonObj = JSON.parse(this.responseText);
			// Send url of image
			const link = jsonObj[0].data.children[0].data.preview.images[0].source.url;
			// If the image is a gif, send different link
			if (link.includes(".gif"))
			{
				message.channel.send(jsonObj[0].data.children[0].data.preview.images[0].variants.gif.source.url);
				console.log("sent " + jsonObj[0].data.children[0].data.preview.images[0].variants.gif.source.url);
			}
			else
			{
				message.channel.send(jsonObj[0].data.children[0].data.preview.images[0].source.url);
				console.log("sent " + jsonObj[0].data.children[0].data.preview.images[0].source.url);
			}
		}
	};
	http.open("GET", url + "random.json", true);
	http.send();
};
