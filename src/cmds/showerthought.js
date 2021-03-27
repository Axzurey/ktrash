module.exports = {
    name: 'showerthought',
    description: 'want a shower thought?',
    aliases: ['st'],
    execute(message, args, Extra) {
		client = Extra["client"]
		Embed = Extra["Embed"]
		let ShowerThoughts = Extra["ShowerThoughts"]
		let Channel = message.channel
        try {
			let DJ = ShowerThoughts[Math.floor(Math.random() * ShowerThoughts.length)]
			let ToSend = `${DJ["selftext"]}`
			Embed.setDescription(ToSend)
            Embed.setURL(`https://reddit.com${DJ["permalink"]}`)
			Embed.setTitle(DJ["title"])
			Channel.send(Embed)
			Embed.setURL(null)
			Embed.setDescription(null)
		} catch (error) {
			console.log(error)
		}
    }
}