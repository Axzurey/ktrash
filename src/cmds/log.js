module.exports = {
    name: 'log',
    description: 'Find the log algorithm of 2 numbers. [Number] [Number]',
    execute(message, args, Extra) {
        try {
            Channel = message.channel
            Embed = Extra["Embed"]
            Math = Extra["Math"]
			var x = Math.log(args[0], args[1])
			var ToSend = `The log algorithm of ${args[0]} and ${args[1]} is ${x}`
			Embed.setDescription(ToSend)
			Channel.send(Embed)
		} catch (error) {
			console.log(error)
		}
    }
}