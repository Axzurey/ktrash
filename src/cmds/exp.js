module.exports = {
    name: 'exp',
    description: 'exponent calculation. [Number] [Number]',
    execute(message, args, Extra) {
        try {
            let Channel = message.channel
            let Embed = Extra["Embed"]
            Math = Extra["Math"]
			var x = Math.pow(args[0], args[1])
			var ToSend = `${args[0]} to the power of ${args[1]} is ${x}`
			Embed.setDescription(ToSend)
			Channel.send(Embed)
		} catch (error) {
			console.log(error)
		}
    }
}