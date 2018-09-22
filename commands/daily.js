const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
exports.data = {
	name: "daily",
	description: "I give you some daily material!",
	guildOnly: false,
	args: false,
	cooldown: 2,
	aliases: ["art", "manga"],
};
exports.execute = async (client, message, args) =>
{
	let http = new XMLHttpRequest();
	// Try to get a valid URL 20 times
	for (let i = 0; i < 50; ++i)
	{
		// Random number between 100000 and 999999
		let code = Math.floor(Math.random() * 999999);
   		code += (code < 100000) ? 100000 : 0;
		// Format URL
		const url = "https://nhentai.net/g/" + code + "/";
		// Establish connection to website
		http = new XMLHttpRequest();
		http.open("HEAD", url, false);
		http.send();
		// If not error code 404
		// if (http.status != 404)
    	if (http.status >= 200 && http.status <= 299)
		{
			// Send url and iteration number
			await message.channel.send(url + " " + i);
     	 	return; // Finish command
		}
		else
		{
			console.log(code + " " + http.status + " " + i);
			// Do next iteration
			continue;
		}
	}
	await message.channel.send("failed, I cri. status " + http.status);
};