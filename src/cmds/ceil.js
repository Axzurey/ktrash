module.exports = {
    name: 'ceil',
    description: 'Round a number to the nearest higher whole. [Number]',
    execute(message, args, Extra) {
        try {
			let Channel = message.channel
			let Embed = Extra["Embed"]
			Math = Extra["Math"]
			var x = Math.ceil(args[0])
			var ToSend = `${args[0]} rounded up is ${x}`
			Embed.setDescription(ToSend)
			Channel.send(Embed)
		} catch (error) {
			console.log(error)
		}
    }
}