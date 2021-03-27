module.exports = {
    name: 'eval',
    description: 'evaluate an equation. [Equation]',
    execute(message, args, Extra) {
        try {
			let math = Extra["math"]
			let Channel = message.channel
			let Embed = Extra["Embed"]
			var x = math.evaluate(args.join(' '))
			var ToSend = `Evaluation result: ${x}`
			Embed.setDescription(ToSend)
			Channel.send(Embed)
		} catch (error) {
			console.log(error)
		}
    }
}