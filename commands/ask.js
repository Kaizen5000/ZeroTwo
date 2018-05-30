// Website: https://8ball.delegator.com/
/* global fetch:false */
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