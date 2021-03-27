module.exports = {
    name: 'sqrt',
    description: 'get the square root of a number. [Number]',
    execute(message, args, Extra) {
        try {
			Channel = message.channel
			Embed = Extra["Embed"]
			Math = Extra["Math"]
			var x = Math.sqrt(args[0])
			var ToSend = `The square root of ${args[0]} is ${x}`
			Embed.setDescription(ToSend)
			Channel.send(Embed)
		} catch (error) {
			console.log(error)
		}
    }
}