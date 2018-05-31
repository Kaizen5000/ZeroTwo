// Get the command prefix
const { prefix } = require("../config.json");

exports.data = {
	name: "help",
	description: "List all of my commands or info about a specific command.",
	aliases: ["commands"],
	usage: "<command name>",
	cooldown: 5,
};
exports.execute = async (message, args) =>
{
	const { commands } = message.client;
	const data = [];
	// Check if there are any arguments
	if (!args.length) // Display all commands
	{
		data.push("Here's a list of all my commands:");
		data.push(commands.map(command => command.data.name).join(", "));
		data.push("\nYou can send `" + prefix + "help [command name]` to get info on a specific command!");
	}
	else // Display info about a specific command
	{
		// If invalid command
		if (!commands.has(args[0]))
		{
			return message.reply("What does that mean?!");
		}
		const command = commands.get(args[0]);
		data.push(`**Name:** ${command.name}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(", ")}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
	}
	/*
    // DM the person asking for help
    message.author.send(data, { split: true }).then(() =>
    {
            if (message.channel.type !== "dm")
            {
                // Send message in the server
				//message.channel.send("I\"ve sent you a DM with all my commands!");
            }
    // If you can't DM the user
    }).catch(() => message.reply("It seems like I can\"t DM you!"));
    */
	message.channel.send(data, { split:true });
};