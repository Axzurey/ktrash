module.exports = {
    name: 'config',
    description: 'change the server configuration [Setting] [Value]',
    async execute(message, args, Extra) {
		client = Extra["client"]
		Embed = Extra["Embed"]
		let Channel = message.channel
        let member = message.member
        let ServerData = Extra["ServerData"]
        try {
			if (member.hasPermission("MANAGE_GUILD") || message.author.id === 362297684742373386) {
                if (args[0] == "reactions") {
                    try {
                        if (args[1] == "true" || args[1] == "false") {
                            ServerData["Reactions"] = args[1]
                            await Extra["WriteDataForServer"](message.guild.id, ServerData)
                            var ToSend = `[Reactions Enabled] = ${args[1]}`
                            Embed.setDescription(ToSend)
                            Channel.send(Embed)
                        }
                        else {
                            var ToSend = `${args[1]} is not a valid parameter`
                            Embed.setDescription(ToSend)
                            Channel.send(Embed)
                        }
                    }
                    catch (err) {
                        console.log(err)
                    }
                }
                else if (args[0] == "prefix") {
                    try {
                        ServerData["Prefix"] = args[1]
                        await Extra["WriteDataForServer"](message.guild.id, ServerData)
                        var ToSend = `[Prefix] = ${args[1]}`
                        Embed.setDescription(ToSend)
                        Channel.send(Embed)
                    }
                    catch (err) {
                        console.log(err)
                    }
                }
			}
            else {
                var ToSend = `You do not have permission to use this command. Permission needed: Manage Server`
				Embed.setDescription(ToSend)
				Channel.send(Embed)
            }
		} catch (error) {
			console.log(error)
		}
    }
}