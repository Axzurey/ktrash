module.exports = {
    name: 'ejs',
    description: 'Execute javascript code',
    execute(message, args, Extra) {
        try {
			let Channel = message.channel
			let Embed = Extra["Embed"]
            let Prefix = Extra["Prefix"]
			let x = eval(message.content.slice(Prefix.length))
			var ToSend = `${x}`
			Embed.setDescription(ToSend)
			Channel.send(Embed)
		} catch (error) {
			console.log(error)
		}
    }
}