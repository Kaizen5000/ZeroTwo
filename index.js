// create filesystem
const fs = require("fs");

// require the discord.js module
const Discord = require("discord.js");

// extract from config
const { prefix, token } = require("./config.json");

// create a new Discord client
const client = new Discord.Client();
// Creates a collection of commands
client.commands = new Discord.Collection();

// Retrieves all command.js files from the folder
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

// For each file in the collection
for (const file of commandFiles)
{
	// Get file as variable
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// Creates a collection to track cooldowns
const cooldowns = new Discord.Collection();

// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on("ready", () =>
{
	console.log("Ready!");
});

client.on("message", message =>
{
	// Don"t continue if message is by bot or doesn"t start with prefix
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	// Remove prefix and add all arguements to an array, seperated by spaces
	const args = message.content.slice(prefix.length).split(/ +/);

	// Removes and assigns first element in array which is the command name
	const commandName = args.shift().toLowerCase();

	// Use command name to get the command, takes into account all aliases
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	// If there is no command, return
	if (!command) return;

	// Checks if the command can only be executed in a channel
	if (command.guildOnly && message.channel.type !== "text")
	{
		return message.reply("We shouldn't do that privately!");
	}

	// Check if the command needs argument and ensures the arguments from the user complies
	if (command.args && !args.length)
	{
		// Initial reply
		let reply = `I"m going to need more information than that, ${message.author}!`;
		if (command.usage) // If the command has a usage property
		{
			// Add new line informing how to use it
			reply += `\nYou need to say: \`${prefix}${command.name} ${command.usage}\``;
		}
		// Send message
		return message.channel.send(reply);
	}

	// If the command doesn't have an entry in the cooldowns collection
	if (!cooldowns.has(command.name))
	{
		// Add to collection
		cooldowns.set(command.name, new Discord.Collection());
	}

	// Current time
	const now = Date.now();
	// Get the collection element for the current command
	const timestamps = cooldowns.get(command.name);
	// Get the cooldown amount for the command, default 1
	const cooldownAmount = (command.cooldown || 1) * 1000;

	// If timestamps collection doesn't have the author ID
	if (!timestamps.has(message.author.id))
	{
		// Add author to the timestamp collection with the current time
		timestamps.set(message.author.id, now);
		// Set the timestamp entry to delete after the cooldown has expired
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}
	else
	{
		// Get author ID's time, add cooldown amount
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		// If the the expiration time hasn"t been reached
		if (now < expirationTime)
		{
			// Calculate the time left
			const timeLeft = (expirationTime - now) / 1000;
			// Print
			return message.reply(`NU! Wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command again!`);
		}
		// Add author to the timestamp collection with the current time
		timestamps.set(message.author.id, now);
		// Set the timestamp entry to delete after the cooldown has expired
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}


	try
	{
		// Execute the command
		if (!args.length)
		{
			command.execute(message);
		}
		else
		{
			command.execute(message, args);
		}
	}
	catch (error)
	{
		// Catch error for command
		console.error(error);
		message.reply("I refuse!");
	}
});
// login to Discord with your app's token
client.login(token);