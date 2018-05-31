exports.data = {
	name: "darling",
	description: "Gets or sets current darling",
	guildOnly: true,
	args: false,
	usage: "<newDarling> || [empty to get current]",
	cooldown: 2,
	aliases: ["husbando", "dinoAidsBuddy"],
};
exports.execute = async (client, message, args) =>
{
	try
	{
		if (args.length)	// If there are arguments
		{
			// Set new darling
			client.settings.set(`${message.guild.id}`, { darling: `${args[0]}` });
			await message.channel.send("My darling is now " + client.settings.getProp(message.guild.id, "darling"));
		}
		// If there is no collections entry
		else if(!client.settings.get(`${message.guild.id}`))
		{
			await message.channel.send("I haven't found my darling yet! (◕︵◕)");
		}
		// There is no property
		else if(!client.settings.get(`${message.guild.id}`).hasOwnProperty("darling"))
		{
			await message.channel.send("I haven't found my darling yet! (◕︵◕)");
		}
		else
		{
			// Output current darling
			await message.channel.send("My darling is " + client.settings.getProp(message.guild.id, "darling"));
		}
	}
	catch (err)
	{
		console.log(err);
	}
};
