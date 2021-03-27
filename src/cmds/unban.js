module.exports = {
    name: 'unban',
    description: 'unban a user. [UserID]',
    execute(message, args, Extra) {
		client = Extra["client"]
		Embed = Extra["Embed"]
		let Channel = message.channel
		let member = message.member
        try {
            let id = args[0]
            message.guild.members.unban(id)
			let ToSend = `User with id ${id} has been unbanned from the server`
			Embed.setDescription(ToSend)
			Channel.send(Embed)
		} catch (error) {
			console.log(error)
		}
    }
}