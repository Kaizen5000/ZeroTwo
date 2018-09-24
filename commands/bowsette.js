const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
exports.data = {
	name: "bowsette",
	description: "I give you some daily material!",
	guildOnly: false,
	args: false,
	cooldown: 2,
	aliases: ["bowser"],
};
exports.execute = async (client, message, args) =>
{
	let http = new XMLHttpRequest();

	const url = "https://www.reddit.com/r/bowsette/";
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
