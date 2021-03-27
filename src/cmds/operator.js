module.exports = {
	name: 'operator',
	description: 'operator information(not a specific user\'s)',
	aliases: ['ops'],
	execute(message, args, Extra) {
        let Embed = Extra["Embed"]
        let prefix = Extra["Prefix"]
        let Channel = message.channel
        let Ops = Extra["Operators"]
        if (Ops[args[0]]) {
            let Info = Ops[args[0]]
            var ToSend = `
            Name: ${Info.name} \n
            Role: ${Info.role} \n
            Unit: ${Info.unit} \n
            Ratings[Armor]: ${Info.ratings.armor} \n
            Ratings[Speed]: ${Info.ratings.speed} \n
            Ratings[Difficulty]: ${Info.ratings.difficulty} \n
            Info[Sex]: ${Info.meta.sex} \n
            Info[Country]: ${Info.meta.country} \n
            Info[Season]: ${Info.meta.season} \n
            Info[Height]: ${Info.meta.height}cm \n
            Info[Weight]: ${Info.meta.weight}kg \n
            Bio[Real Name]: ${Info.bio.real_name} \n
            Bio[Birth Place]: ${Info.bio.birthplace} \n`
			Embed.setDescription(ToSend)
            Embed.attachFiles([`./OperatorIcons/${args[0]}.png`])
            Embed.setThumbnail(`attachment://${args[0]}.png`)
			Channel.send(Embed)
            Embed.setThumbnail(null)
        }
        else {

        }
	}
}