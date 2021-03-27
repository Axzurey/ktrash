const dotenv = require('dotenv')
const {Client, MessageAttachment, MessageEmbed, Collection} = require('discord.js')
const {Prefix} = require('./Config.json')
const math = require('mathjs')
const fs = require('fs')
const Operators = require('r6operators')
const Snoostorm = require('snoostorm')
const Snoowrap = require('snoowrap')
const R6API = require('r6api.js');
const PythonSandbox = require('docker-python-sandbox')
const r6api = new R6API('zeronotnil@gmail.com', 'DarkPro64');

dotenv.config()

const R = new Snoowrap({
	userAgent : "Quark;",
	clientId : process.env.R_CLIENTID,
	clientSecret : process.env.R_CLIENTSECRET,
	username: process.env.R_USERNAME,
	password : process.env.R_PASSWORD
})

let RedditDankMemes = []
let RedditDarkJokes = []
let RedditShowerThoughts = []

function RedditAddPostMemes(x) {
	x.forEach(element => {
		if (!RedditDankMemes[element]) {
			RedditDankMemes.push(element)
		}
	})
}

function RedditAddPostJokes(x) {
	x.forEach(element => {
		if (!RedditDarkJokes[element]) {
			RedditDarkJokes.push(element)
		}
	})
}

function RedditAddPostShower(x) {
	x.forEach(element => {
		if (!RedditShowerThoughts[element]) {
			RedditShowerThoughts.push(element)
		}
	})
}

function GetPosts() {
	R.getSubreddit('dankmemes').getHot({limit : 100}).map(post => post).then(RedditAddPostMemes)
	R.getSubreddit('showerthoughts').getHot({limit : 100}).map(post => post).then(RedditAddPostShower)
	R.getSubreddit('darkjokes').getHot({limit : 100}).map(post => post).then(RedditAddPostJokes)
}

GetPosts()

const mongoose = require('mongoose')
const { time } = require('console')

let UserCache = {}
let ServerCache = {}

//const express = require('express')`

const Schema = new mongoose.Schema({
	ID: {
		type: Number, //Type of data
		required: true, //Required
		unique: true //Unique means it will error if the same thing exists in the collection
	},
	EmbedColor: {
		type: String,
		required: true,
		unique: false
	}
})

const ServerSchema = new mongoose.Schema({
	ID: {
		type: Number, //Type of data
		required: true, //Required
		unique: true //Unique means it will error if the same thing exists in the collection
	},
	Reactions: {
		type: Boolean,
		required: true,
		unique: false
	},
	Prefix: {
		type: String,
		required: true,
		unique: false
	},
})

let DB = mongoose.connect(process.env.MONGO, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
})

let User = mongoose.model("_Users", Schema)
let Server = mongoose.model("_Servers", ServerSchema)

async function initializeDatabase() {
	await User.init()
	await Server.init()
}

initializeDatabase()

async function CreateDataForServer(ServerID) {
	let CurrentServer = await Server.findOne({
		ID : ServerID
	})

	if (!CurrentServer) {
		const NewServer = new Server({
			ID : ServerID,
			Reactions : true,
			Prefix : ".",
		})
		NewServer.save()
		CurrentServer = NewServer
	}
	return CurrentServer
}

async function ResetDataForServer(ServerID) {
	let CurrentServer = await Server.findOne({
		ID : ServerID
	})

	if (CurrentServer) {
		await Server.findOneAndDelete(ServerID, function(err) {
			if (err) throw err
		})
		ServerCache[ServerID] = await CreateDataForServer(ServerID)
	}
	else {
		ServerCache[ServerID] = await CreateDataForServer(ServerID)
	}
	return CurrentServer
}

async function CreateDataForUser(UserID) {
	let	 CurrentUser = await User.findOne({
		ID: UserID
	})
	
	if (!CurrentUser) {
		const NewUser = new User({
			ID: UserID,
			EmbedColor : "#00ff00",
		})
		NewUser.save()
		CurrentUser = NewUser

	}
	return CurrentUser
}

async function GetDataForServer(ServerID) {
	let CurrentServer = await Server.findOne({
		ID: ServerID
	}, function(err, data) {
		if (err) throw err
		return data
	})
	if (CurrentServer) {
		return CurrentServer
	}
	else {
		await CreateDataForServer(ServerID)
		let CurrentServer = await Server.findOne({
			ID: ServerID
		}, function(err, data) {
			if (err) throw err
			return data
		})
		return CurrentServer
	}
}

async function GetDataForUser(UserID) {
	let CurrentUser = await User.findOne({
		ID: UserID
	}, function(err, data) {
		if (err) throw err
		return data
	})
	if (CurrentUser) {
		return CurrentUser
	}
	else {
		await CreateDataForUser(UserID)
		let CurrentUser = await User.findOne({
			ID: UserID
		}, function(err, data) {
			if (err) throw err
			return data
		})
		return CurrentUser
	}
}

async function WriteDataForUser(UserID, Data) {
	await User.findOneAndUpdate(UserID, Data, function(err) {
		if (err) throw err
		UserCache[UserID] = Data
	})
}

async function WriteDataForServer(ServerID, Data) {
	await Server.findOneAndUpdate(ServerID, Data, function(err) {
		if (err) throw err
		ServerCache[ServerID] = Data
	})
}

const client = new Client()

client.commands = new Collection()

const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(`./Commands/${file}`)
	client.commands.set(command.name, command)
}


client.once('ready', () => {
	console.log('Quark Running')
})

client.login(process.env.TOKEN)

client.on('message', async message => {

	if (message.author.bot) return

	let UserID = message.author.id

	let ServerID = message.guild.id

	let ServerData = ServerCache[ServerID]

	let UserData = UserCache[UserID]

	if (!ServerData) {
		ServerData = await GetDataForServer(ServerID)
	}

	if (!UserData) {
		UserData = await GetDataForUser(UserID)
	}

	let Prefix = ServerData["Prefix"] || "."

	const args = message.content.slice(Prefix.length).split(" ")
    const command = args.shift().toLowerCase()

	const Embed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Default')
	.setDescription('Default')

	Embed.setTitle(command)
	Embed.setURL(null)
	Embed.setDescription(null)
	Embed.setColor('#0099ff')
	Embed.setDescription('Default')

	let ReactionMessages = {
		"rip" : 'https://i.imgur.com/w3duR07.png',
		"pog" : "https://image.redbull.com/rbcom/052/2017-06-19/3965fbe6-3488-40f8-88bc-b82eb8d1a230/0010/1/800/800/1/pogchamp-twitch.png",
		"thonk" : "https://cdn.discordapp.com/emojis/403727203864412161.gif?size=64",
	}

	if (message.content.toLowerCase() == ".resetserverdata") {
		if (message.member.hasPermission("MANAGE_GUILD") || UserID === 362297684742373386) {
			await ResetDataForServer(ServerID)
			Embed.setTitle("Reset Server Data")
			Embed.setDescription("Server Data has been reset")
			message.channel.send(Embed)
		}
	}

	if (ServerData["Reactions"]) {
		if (ReactionMessages[message.content.toLowerCase()]) {
			const attachment = new MessageAttachment(ReactionMessages[message.content.toLowerCase()])
			message.channel.send(attachment)
		}
	}

	if (!message.content.startsWith(Prefix)) return
	let UData = ""
	if (command == "dbget") {
		if (!message.author.id === 362297684742373386) return
		try {
			UData = await GetDataForUser(args[0])
			let ToSend = `Data for ${args[0]} retrieved @Schema:Quasar => ${UData}`
			Embed.setDescription(ToSend)
			Channel.send(Embed)
		}
		catch (err) {
			console.log(err)
		}
	}

	if (command == "dbcreate") {
		if (!message.author.id === 362297684742373386) return
		try {
			await CreateDataForUser(args[0])
			UData = await GetDataForUser(args[0])
			let ToSend = `Data for ${args[0]} created @Schema:Quasar => ${UData}`
			Embed.setDescription(ToSend)
			Channel.send(Embed)
		}
		catch (err) {
			console.log(err)
		}
	}

	if (command == "color") {
		try {
			let re = /[0-9A-Fa-f]{6}/g
			if (re.test(args[0])) {
				UserData["EmbedColor"] = args[0]
				await WriteDataForUser(UserID, UserData)
			}
		}
		catch (err) {
			console.log(err)
		}
	}
	
	let EmbedColor
	try {
		EmbedColor = UserData["EmbedColor"]
	} catch (error) {
		console.warn(error)
	}

	Embed.setColor(EmbedColor)

	let Extra = {
		"Data" : UserData, 
		"Embed" : Embed, 
		"Math" : Math,
		"math" : math,
		"client" : client,
		"User" : User,
		"Server" : Server,
		"UserData" : UserData,
		"ServerData" : ServerData,
		"UData" : UData,
		"Prefix" : Prefix,
		"WriteDataForServer" : WriteDataForServer,
		"WriteDataForUser" : WriteDataForUser,
		"Operators" : Operators,
		"DankMemes" : RedditDankMemes,
		"DarkJokes" : RedditDarkJokes,
		"ShowerThoughts" : RedditShowerThoughts,
		"R6Api" : r6api,
		"Pyexec" : PythonSandbox,
	}
	if (message.content.toLowerCase() == ".resetserverdata" || command == "dbget" || command == "dbcreate") return
	try {
		console.log(command)
		let cmd = client.commands.get(command) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))
		cmd.execute(message, args, Extra)
	} catch (error) {
		return
	}
})