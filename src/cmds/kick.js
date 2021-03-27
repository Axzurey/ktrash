module.exports = {
    name: 'kick',
    description: 'kick a user. [Mention]',
    execute(message, args, Extra) {
		client = Extra["client"]
		Embed = Extra["Embed"]
		let Channel = message.channel
		let member = message.member
        try {
			const tokick = message.mentions.members.first()
			if (!member.hasPermission('KICK_MEMBERS')) {
				return
			}
			tokick.kick()
			var ToSend = `User ${tokick} has been kicked from the server`
			Embed.setDescription(ToSend)
			Channel.send(Embed)
		} catch (error) {
			console.log(error)
		}
    }
}