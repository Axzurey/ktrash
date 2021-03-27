module.exports = {
    name: 'meme',
    description: 'want a meme?',
    execute(message, args, Extra) {
		client = Extra["client"]
		Embed = Extra["Embed"]
		let DankMemes = Extra["DankMemes"]
		let Channel = message.channel
        console.log(DankMemes.length)
        try {
			let DJ = DankMemes[Math.floor(Math.random() * DankMemes.length)]
			let ToSend = `${DJ["selftext"]}`
			Embed.setDescription(ToSend)
            Embed.setURL(`https://reddit.com${DJ["permalink"]}`)
			Embed.setTitle(DJ["title"])
            Embed.setImage(DJ["url"])
			Channel.send(Embed)
            Embed.setImage(null)
			Embed.setURL(null)
			Embed.setDescription(null)
		} catch (error) {
			console.log(error)
		}
    }
}