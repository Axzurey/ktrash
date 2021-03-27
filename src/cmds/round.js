module.exports = {
    name: 'round',
    description: 'round a number to the nearest whole. [Number]',
    execute(message, args, Extra) {
        try {
			let math = Extra["math"]
			Channel = message.channel
			Embed = Extra["Embed"]
			var x = math.round(args[0], args[1])
			var ToSend = `${args[0]} rounded to ${args[1]} places is ${x}`
			Embed.setDescription(ToSend)
			Channel.send(Embed)
		} catch (error) {
			console.log(error)
		}
    }
}