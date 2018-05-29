var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
module.exports = {
    name: 'daily',
    description: 'I give you some daily material!',
    guildOnly: false,
    args: false,
    cooldown: 2,
    aliases: ["art", "manga"],
    execute(message, args) 
    {
        // Try to get a valid URL 20 times
        for (i = 0; i < 20; ++i)
        {
            // Random number between 100000 and 999999
            const code = Math.floor(Math.random() * 999999) + 100000;
            // Format URL
            const url = "https://nhentai.net/g/" + code + "/";
            //Establish connection to website
            var http = new XMLHttpRequest();
            http.open('HEAD', url, false);
            http.send();
            // If not error code 404
            if (http.status != 404)
            {
                // Send url and iteration number
                message.channel.send(url + " "+i);
                break;  // Exit loop
            }
            else
            {
                // Do next iteration
               continue;
            }
        }
    },
};