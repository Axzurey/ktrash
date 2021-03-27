module.exports = {
    name: 'color',
    description: 'Change Embed Color. [Hexadecimal]',
    execute(message, args, Extra) {
		client = Extra["client"]
		Embed = Extra["Embed"]
		let Channel = message.channel
		let re = /[0-9A-Fa-f]{6}/g
        try {
			if (re.test(args[0])) {
				var ToSend = `Changed Embed color to ${args[0]}`
				Embed.setColor(args[0])
				Embed.setDescription(ToSend)
				Channel.send(Embed)
			}
			else {
				var ToSend = `This command requires the color to be in hexadecimal format. ${args[0]} is not in that format`
				Embed.setDescription(ToSend)
				Channel.send(Embed)
			}
		} catch (error) {
			console.log(error)
		}
    }
}