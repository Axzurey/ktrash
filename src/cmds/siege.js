module.exports = {
    name: 'siege',
    description: `Rainbow six siege stats: \n Operator syntax -> .siege [username] [platform] ['operator'] [operator name] \n
	Ranked syntax -> .siege [username] [platform] [season(with spaces)]
	`,
	aliases: ['r6'],
    async execute(message, args, Extra) {
		client = Extra["client"]
		Embed = Extra["Embed"]
		let Channel = message.channel
		let r6api = Extra["R6Api"]
		let ToSend
        try {
			const username = args[0]
			platform = args[1]

			const id = await r6api.getId(platform, username).then(el => el[0].userId)

			if (args[2] == "operator") {
				const stats = await r6api.getStats(platform, id).then(el => el[0])
				let s = stats.pvp.operators[args[3]]
				ToSend = `
				${args[0]}'s Stats on ${args[3]} \n
				Role: ${s["role"]} \n
				CTU: ${s["ctu"]} \n
				Kills: ${s["kills"]} \n
				Deaths: ${s["deaths"]} \n
				Wins: ${s["wins"]}\n
				Losses: ${s["losses"]}\n
				Headshots: ${s["headshots"]}\n
				Melee Kills: ${s["meleeKills"]}\n
				DBNO: ${s["dbno"]} \n
				Playtime(Seconds): ${s["playtime"]} \n
				${s["gadget"][0]["name"]}: ${s["gadget"][0]["value"]}
				`
				Embed.setThumbnail(s["badge"])
			}
			else if (args[2] == "ranked") {
				let seasons = {
					6: 'Health', 
					7: 'Blood Orchid', 
					8: 'White Noise',
					9: 'Chimera', 
					10: 'Para Bellum', 
					11: 'Grim Sky',
					12: 'Wind Bastion',
					13: 'Burnt Horizon', 
					14: 'Phantom Sight',
					15: 'Ember Rise', 
					16: 'Shifting Tides',  
					17: 'Void Edge',
					18: 'Steel Wave', 
					19: 'Shadow Legacy', 
					20: 'Neon Dawn'
				}
				let Season
				for (var key in seasons) {
					// check if the property/key is defined in the object itself, not in parent
					if (seasons.hasOwnProperty(key)) {   
						if (seasons[key].toLowerCase() == `${args[3]} ${args[4]}`.toLowerCase()) {
							Season = key
						}
					}
				}
				const stats = await r6api.getRank(platform, id, { regions: ['emea'], seasons: [Season] })
				let S = Season
				console.log(S)
				let Mmr = stats[0]["seasons"][S]["regions"]["emea"]["current"]["mmr"]
				let Rank = stats[0]["seasons"][S]["regions"]["emea"]["current"]["name"]
				let MaxMmr = stats[0]["seasons"][S]["regions"]["emea"]["max"]["mmr"]
				let MaxRank = stats[0]["seasons"][S]["regions"]["emea"]["max"]["name"]
				let Kills = stats[0]["seasons"][S]["regions"]["emea"]["kills"]
				let Deaths = stats[0]["seasons"][S]["regions"]["emea"]["deaths"]
				let Wins = stats[0]["seasons"][S]["regions"]["emea"]["wins"]
				let Losses = stats[0]["seasons"][S]["regions"]["emea"]["losses"]
				let Matches = stats[0]["seasons"][S]["regions"]["emea"]["matches"]
				let Abandons = stats[0]["seasons"][S]["regions"]["emea"]["abandons"]
				Embed.setThumbnail(stats[0]["seasons"][S]["regions"]["emea"]["current"]["image"])
				ToSend = `
				Season: ${args[3]} ${args[4]} \n
				Current Rank: ${Rank} \n
				Current MMR: ${Mmr} \n
				Highest Rank: ${MaxRank} \n
				Highest	 MMR: ${MaxMmr} \n
				Kills: ${Kills} \n
				Deaths: ${Deaths} \n
				Wins: ${Wins} \n
				Losses: ${Losses} \n
				Matches: ${Matches} \n
				Abandons: ${Abandons} \n
				`
			}

			
			Embed.setDescription(ToSend)
			Channel.send(Embed)
		} catch (error) {
			console.log(error)
		}
    }
}