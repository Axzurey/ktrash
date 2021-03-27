module.exports = {
    name: 'floor',
    description: 'round a number to the nearest lower whole. [Number]',
    execute(message, args, Extra) {
        try {
			Channel = message.channel
			Embed = Extra["Embed"]
			Math = Extra["Math"]
			var x = Math.floor(args[0])
			var ToSend = `${args[0]} rounded down is ${x}`
			Embed.setDescription(ToSend)
			Channel.send(Embed)
		} catch (error) {
			console.log(error)
		}
    }
}