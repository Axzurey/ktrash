module.exports = {
	name: 'help',
	description: 'get a list of the commands',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args, Extra) {
		const data = [];
        const { commands } = message.client
        let Embed = Extra["Embed"]
        let prefix = Extra["Prefix"]
        let Channel = message.channel

        if (!args.length) {
            data.push("Here's what I can do:")
            data.push(commands.map(command => command.name).join(', '))
            data.push(`\nyou can send ${prefix}help [command name] for more information on a command`)
            Embed.setDescription(data, { split: true })
            return message.author.send(Embed)
                .then(() => {
                    if (message.channel.type === 'dm') return
                    message.reply('Check your dms')
                })
                .catch(error => {
                    message.reply('Unable to access your dms')
                })
        }
        const name = args[0].toLowerCase()
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name))
        
        if (!command) {
            return message.reply('Invalid command')
        }
        
        data.push(`***Command:*** ${command.name}`)
        
        if (command.aliases) data.push(`***Aliases:*** ${command.aliases.join(', ')}`)
        if (command.description) data.push(`***Description:*** ${command.description}`)
        if (command.usage) data.push(`***Usage:*** ${prefix}${command.name} ${command.usage}`)
        
        //message.channel.send(data, { split: true })
		Embed.setDescription(data, { split: true })
		Channel.send(Embed)
	}
}