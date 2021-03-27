module.exports = {
    name: 'darkjoke',
    description: 'want a dark joke?',
	aliases: ['dj'],
    execute(message, args, Extra) {
		client = Extra["client"]
		Embed = Extra["Embed"]
		let DarkJokes = Extra["DarkJokes"]
		let Channel = message.channel
        try {
			let DJ = DarkJokes[Math.floor(Math.random() * DarkJokes.length)]
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