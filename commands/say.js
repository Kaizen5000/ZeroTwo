exports.data = {
	name: "say",
	description: "What should I say?",
	guildOnly: true,
	args: true,
	usage: "<Message for me to say>",
	cooldown: 1,
};
exports.execute = async (message, args) =>
{
	// To get the "message" itself we join the `args` back into a string with spaces
	const sayMessage = args.join(" ");
	// Then we delete the command message
	message.delete().catch();
	// Prints message
	message.channel.send(sayMessage);
};