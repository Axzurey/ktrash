module.exports = {
    name: 'hello',
    description: 'send a message to a user',
    helpmessage: "<user mention> <message>",
    execute(message, args, Extra) {
		client = Extra["client"]
		Embed = Extra["Embed"]
		let Channel = message.channel
        try {
            function getUserFromMention(mention) {
                if (!mention) return
            
                if (mention.startsWith('<@') && mention.endsWith('>')) {
                    mention = mention.slice(2, -1)
            
                    if (mention.startsWith('!')) {
                        mention = mention.slice(1)
                    }
            
                    return client.users.cache.get(mention)
                }
            }
            let user = args[0]
            let isuser = getUserFromMention(user)
            if (isuser) {
                console.log("user")
            }
			let ToSend = `nothing special, just a test`
			Embed.setDescription(ToSend)
			Channel.send(Embed)
		} catch (error) {
			console.log(error)
		}
    }
}