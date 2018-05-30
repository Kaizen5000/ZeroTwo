module.exports = {
	name: "ask",
	description: "Ask me a question! (yes/no/maybe)",
	guildOnly: false,
	args: true,
	usage: "<question>",
	cooldown: 2,
	aliases: ["question", "decide"],
	execute(message, args)
	{
		// Input message
		const sayMessage = args.join(" ");

		const reply = ["Yes", "No", "How silly of you to think so",
			"What an absurd question! Of course not", "Never", "Yep", "Of course not!",
			"Signs point to yes", "Don't count on it", "You may rely on it", "Very doubtful",
			"It is certain", "Without a doubt", "Don't count on it", "Only a baffoon would say yes",
			"It is within reason", "REEEEEEEE", "Does 2 + 2 = 4? Yeah I thought so", "Yes, if the sun is shining today",
			"My Magic 8-Ball says yes", "Don't bother me with such trivial questions", "Ask someone who cares",
			"Google it", "Affirmative", "After intense scientific research, I can confirm it is true",
			"Sounds like a conspiracy theory to me", "Never in a million years", "I shiver to think about it",
			"Please don't make me answer that", "Impossibru", "Only if the world ends tomorrow",
			"Not a chance", "There is a very small chance"];
		const result = reply[Math.floor(Math.random() * reply.length)] + "!";
		console.log(sayMessage + "\n" + result);
		message.channel.send(result);
	},
};
/*
TRADITIONAL MAGIC 8BALL
// Website: https://8ball.delegator.com/
// global fetch:false
require ("isomorphic-fetch");
module.exports = {
	name: "ask",
	description: "Ask me a question! (yes/no/maybe)",
	guildOnly: false,
	args: true,
	usage: "<question>",
	cooldown: 2,
	aliases: ["question", "decide"],
	execute(message, args)
	{
		const sayMessage = args.join(" ");
		const params = encodeURIComponent(sayMessage);
		const uri = "https://8ball.delegator.com/magic/JSON/" + params;
		fetch(uri).then((response) => { return response.json(); }).then((json) =>
		{
			message.channel.send(json.magic.answer + "!");
		});
	},
};
*/