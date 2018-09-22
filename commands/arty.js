const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
exports.data = {
	name: "arty",
	description: "I give you some daily material!",
	guildOnly: false,
	args: false,
	cooldown: 2,
	aliases: ["art2"],
};
exports.execute = async (client, message, args) =>
{
	let http = new XMLHttpRequest();
	// Get random post from hentai subreddit
	const url = "https://www.reddit.com/r/hentai/random.json";
	// Establish connection to website
	http = new XMLHttpRequest();
	http.onreadystatechange = function()
	{
		if (this.readyState == 4 && this.status == 200)
		{
			// Parse JSON
			const jsonObj = JSON.parse(this.responseText);
			// Send url of image
			message.channel.send(jsonObj[0].data.children[0].data.preview.images[0].source.url);
		}
	};
	http.open("GET", url, true);
	http.send();
};
