module.exports = {
    name: 'ban',
    description: 'ban a user. [Mention]',
    execute(message, args, Extra) {
		client = Extra["client"]
		Embed = Extra["Embed"]
		let Channel = message.channel
		let member = message.member
        try {
			const toban = message.mentions.members.first()
			if (!member.hasPermission('BAN_MEMBERS')) {
				return
			}
			toban.ban()
			var ToSend = `User ${toban} has been banned from the server`
			Embed.setDescription(ToSend)
			Channel.send(Embed)
		} catch (error) {
			console.log(error)
		}
    }
}