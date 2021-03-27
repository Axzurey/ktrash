module.exports = {
    name: 'clean',
    description: 'delete messages from the channel [Number]',
    execute(message, args, Extra) {
		client = Extra["client"]
		Embed = Extra["Embed"]
        Math = Extra["Math"]
		let Channel = message.channel
        try {
            let todelete = args[0]
            const tick1 = Date.now() / 1000
            while (todelete > 0) {
                if (todelete > 100) {
                    Channel.bulkDelete(100)
                }
                else {
                    Channel.bulkDelete(todelete)
                }
                todelete -= 1
            }
            const tick2 = Date.now() / 1000
            const time = tick2 - tick1
			var ToSend = `${args[0]} messages have been deleted in ${time} seconds`
			Embed.setDescription(ToSend)
			Channel.send(Embed)
		} catch (error) {
			console.log(error)
		}
    }
}