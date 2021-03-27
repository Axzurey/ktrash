module.exports = {
    name: 'serversettings',
    description: 'get your current server configuration',
	aliases: ['sset'],
    execute(message, args, Extra) {
		client = Extra["client"]
		Embed = Extra["Embed"]
        Data = Extra["ServerData"]
		let Channel = message.channel
        try {
			var ToSend = `Data for Server ${Data["ID"]}: \n MessageReactions : ${Data["Reactions"]}`
			Embed.setDescription(ToSend)
			Channel.send(Embed)
		} catch (error) {
			console.log(error)
		}
    }
}