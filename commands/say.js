module.exports = {
    name: 'say',
    description: "What should I say?",
    guildOnly: true,
    args: true,
    usage: "<Message for me to say>" ,
    cooldown: 1,
    //aliases: ["pingaz", "pongs"],
    execute(message, args) 
    {
        // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
        // To get the "message" itself we join the `args` back into a string with spaces: 
        const sayMessage = args.join(" ");
        // Then we delete the command message
        message.delete().catch(O_o=>{});
        //message.channel.bulkDelete(2, true).catch(O_o=>{}); 
        // Prints message
        message.channel.send(sayMessage);
    },
};