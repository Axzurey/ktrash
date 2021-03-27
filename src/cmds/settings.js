module.exports = {
    name: 'settings',
    description: 'get your current user configuration',
    execute(message, args, Extra) {
		client = Extra["client"]
		Embed = Extra["Embed"]
        Data = Extra["UserData"]
		let Channel = message.channel
        try {
			var ToSend = `Data for User ${Data["ID"]}: \n EmbedColor : ${Data["EmbedColor"]}`
			Embed.setDescription(ToSend)
			Channel.send(Embed)
		} catch (error) {
			console.log(error)
		}
    }
}