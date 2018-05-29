module.exports = {
	name: "ping",
	description: "Give me a little poke!",
	guildOnly: false,
	args: false,
	// usage: "<enter requirement here>" ,
	cooldown: 5,
	aliases: ["pingaz", "pongs"],
	execute(message)
	{
		message.channel.send("◕ ◡ ◕");
	},
};