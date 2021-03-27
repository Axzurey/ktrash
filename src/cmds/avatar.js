module.exports = {
    name: 'avatar',
    description: 'get your avatar',
    execute(message, args, Extra) {
		client = Extra["client"]
		Embed = Extra["Embed"]
		let Channel = message.channel
        try {
            let x = message.author.displayAvatarURL()
			Embed.setThumbnail(x)
			var ToSend = `${message.author}'s avatar :)`
			Embed.setDescription(ToSend)
            Embed.setURL(x)
			Channel.send(Embed)
			Embed.setURL(null)
			Embed.setDescription(null)
		} catch (error) {
			console.log(error)
		}
    }
}