const Discord = require('discord.js')
const client = new Discord.Client()

var ver = '1.1.3'
var color = '#ff9900'
var playlist = ["Destiny 1", "?help"]

bot_secret_token = "THIS IS A PLACEHOLDER"

var request = require('request')
var baseRequest = request.defaults({ headers: { "X-API-KEY": "THIS IS A PLACEHOLDER" } })

xur_url = "https://www.bungie.net/d1/platform/Destiny/Advisors/Xur/"	//a data access point in the destiny web api

/////////////////////EMBEDS////////////////////////////////////////

const helpEmbed = new Discord.RichEmbed()
	.setColor(color)
	.setAuthor('Sweeper Bot Command Help', 'https://i.imgur.com/qx8n0IA.jpg')
	.addField("?help", "Displays this menu")
	.addField("?botstat", "Displays bot statistics")
	.addField("?xur", "Displays Xur's weekly inventory")
	.setTimestamp()
	.setFooter('Made by Paul Huber', 'https://i.imgur.com/qx8n0IA.jpg')

const helpEmbedChat = new Discord.RichEmbed()
	.setColor(color)
	.setDescription("Help Sent!")

const classEmbed = new Discord.RichEmbed()
	.setColor(color)
	.setTitle("What's your main class?")
	.setDescription("React/click the emoji with the class (or classes) that you play as the most.")

const consoleEmbed = new Discord.RichEmbed()
	.setColor(color)
	.setTitle("What's your platform?")
	.setDescription("React/click the emoji that corresponds to your platform.")

const lfgEmbed = new Discord.RichEmbed()
	.setColor(color)
	.setTitle("Would you like to be tagged for LFG posts?")
	.setDescription("React/click the LFG emoji below for the lfg role. If you would like this role removed, please react/click on the X emoji.")


////////////////////////////////////ROLE MANAGEMENT////////////////////////////////////

client.on('message', (receivedMessage) => {
	if (receivedMessage.author == client.user) {
		return
	}
	if (receivedMessage.channel.type == "dm") {
		botMessage(receivedMessage)
	} else {
		if (receivedMessage.content.startsWith("?")) {
			processCommand(receivedMessage)
		}
	}
})

client.on('error', console.error)

const joinEmbed = new Discord.RichEmbed()
	.setColor(color)
	.setTitle("Welcome to The Tower!")
	.setDescription("Thanks for joining our Destiny 1 gaming community! Just a few things to get you started:\n\n- Please read #rules\n- Check out #role-request to assign yourself a role\n**You'll need to assign yourself a platform role to access LFG chats*\n- Please invite others from D1 to help our server grow\n- Have fun!")
client.on("guildMemberAdd", (member) => {
	member.addRole(member.guild.roles.find(r => r.name === "New Member"))
	member.send(joinEmbed)
})

client.on('message', message => {
	const filter = (reaction, user) => {
		return user.id === message.author.id
	}
})

client.on('messageReactionAdd', (reaction, user) => {
	let uMember = reaction.message.guild.member(user)
	let titanRole = reaction.message.guild.roles.find(r => r.name === "Titan")
	let warlockRole = reaction.message.guild.roles.find(r => r.name === "Warlock")
	let hunterRole = reaction.message.guild.roles.find(r => r.name === "Hunter")
	let xboxRole = reaction.message.guild.roles.find(r => r.name === "Xbox")
	let psRole = reaction.message.guild.roles.find(r => r.name === "PlayStation")
	let lfgRole = reaction.message.guild.roles.find(r => r.name === "lfg")
	let memRole = reaction.message.guild.roles.find(r => r.name === "New Member")

	if (!(uMember.id === '575095674719305728')) {
		if (reaction.emoji.name === 'titan') {
			const roleEmbed = new Discord.RichEmbed()
				.setColor(color)
				.setTitle("Role 'Titan' given!")

			if (!(uMember.roles.has(titanRole.id))) {
				uMember.send(roleEmbed)
				uMember.addRole(titanRole)
				if (uMember.roles.has(memRole.id)) {
					uMember.removeRole(memRole)
				}
			}
		} else if (reaction.emoji.name === 'warlock') {
			const roleEmbed = new Discord.RichEmbed()
				.setColor(color)
				.setTitle("Role 'Warlock' given!")
			if (!(uMember.roles.has(warlockRole.id))) {
				uMember.send(roleEmbed)
				uMember.addRole(warlockRole)
				if (uMember.roles.has(memRole.id)) {
					uMember.removeRole(memRole)
				}
			}
		} else if (reaction.emoji.name === 'hunter') {
			const roleEmbed = new Discord.RichEmbed()
				.setColor(color)
				.setTitle("Role 'Hunter' given!")
			if (!(uMember.roles.has(hunterRole.id))) {
				uMember.send(roleEmbed)
				uMember.addRole(hunterRole)
				if (uMember.roles.has(memRole.id)) {
					uMember.removeRole(memRole)
				}
			}
		} else if (reaction.emoji.name === 'xbox') {
			const roleEmbed = new Discord.RichEmbed()
				.setColor(color)
				.setTitle("Role 'Xbox' given!")
			if (!(uMember.roles.has(xboxRole.id))) {
				uMember.send(roleEmbed)
				uMember.addRole(xboxRole)
				if (uMember.roles.has(memRole.id)) {
					uMember.removeRole(memRole)
				}
			}
		} else if (reaction.emoji.name === 'ps') {
			const roleEmbed = new Discord.RichEmbed()
				.setColor(color)
				.setTitle("Role 'PlayStation' given!")
			if (!(uMember.roles.has(psRole.id))) {
				uMember.send(roleEmbed)
				uMember.addRole(psRole)
				if (uMember.roles.has(memRole.id)) {
					uMember.removeRole(memRole)
				}
			}
		} else if (reaction.emoji.name === 'lfg') {
			const roleEmbed = new Discord.RichEmbed()
				.setColor(color)
				.setTitle("Role 'lfg' given!")
			if (!(uMember.roles.has(lfgRole.id))) {
				uMember.send(roleEmbed)
				uMember.addRole(lfgRole)
				if (uMember.roles.has(memRole.id)) {
					uMember.removeRole(memRole)
				}
			}
		} else if (reaction.emoji.name === 'remove') {
			const roleEmbed = new Discord.RichEmbed()
				.setColor(color)
				.setTitle("Role 'lfg' removed!")
			uMember.send(roleEmbed)
			if (uMember.roles.has(lfgRole.id)) {
				uMember.removeRole(lfgRole)
			}
		}
	}

	if ((!(user.id === '575095674719305728')) && reaction.message.author.id === '575095674719305728') {
		reaction.remove(user.id)
	}
})

/////////////////////////////SETUP///////////////////////////////////////////////

client.on('ready', () => {
	let channel = client.channels.get('575110770694815759')
	channel.send(classEmbed).then(sentClassEmbed => {
		sentClassEmbed.react(client.emojis.find(emoji => emoji.name === "warlock"))
		sentClassEmbed.react(client.emojis.find(emoji => emoji.name === "titan"))
		sentClassEmbed.react(client.emojis.find(emoji => emoji.name === "hunter"))
	})

	channel.send(consoleEmbed).then(sentConsoleEmbed => {
		sentConsoleEmbed.react(client.emojis.find(emoji => emoji.name === "xbox"))
			.then(() => sentConsoleEmbed.react(client.emojis.find(emoji => emoji.name === "ps")))
	})

	channel.send(lfgEmbed).then(sentLfgEmbed => {
		sentLfgEmbed.react(client.emojis.find(emoji => emoji.name === "lfg"))
		sentLfgEmbed.react(client.emojis.find(emoji => emoji.name === "remove"))
	})

	var statSwitch = true
	setInterval(function () {
		if (statSwitch) {
			client.user.setActivity(playlist[Math.floor(Math.random() * playlist.length)], { type: "PLAYING" })
			statSwitch = false
		} else {
			client.user.setActivity(playlist[Math.floor(Math.random() * playlist.length)], { type: "PLAYING" })
			statSwitch = true
		}
	}, 5000)
})

//////////////////////////////COMMANDS/////////////////////////////////////

function processCommand(receivedMessage) {
	let fullCommand = receivedMessage.content.substr(1)
	let splitCommand = fullCommand.split(" ")
	let primaryCommand = splitCommand[0]
	let arguments = splitCommand.slice(1)

	console.log("Command received: " + primaryCommand)
	console.log("Arguments: " + arguments)

	if (!fullCommand.length == 0) {
		if (primaryCommand == "help") {
			helpCommand(arguments, receivedMessage)
		} else if (primaryCommand == "botstat") {
			botStatCommand(arguments, receivedMessage)
		} else if (primaryCommand == "xur") {
			xurCommand(arguments, receivedMessage)
		} else if (primaryCommand == "say") {
			sayCommand(arguments, receivedMessage)
		} else {
			receivedMessage.channel.send("I don't understand this command. Try `?help` for command help.")
		}
	}
}

//retrieves data from the endpoint link in json format then parses it and puts it into an embed for readability
function xurCommand(arguments, receivedMessage) {
	var weapons = '\n'
	var armor = '\n'
	var normalItems = "\n"
	baseRequest(xur_url, function (error, response, body) {
		if (!error && JSON.parse(body).ErrorCode < 400) {
			var total = 0
			for (const i in JSON.parse(body).Response.data.saleItemCategories) {
				for (const j in JSON.parse(body).Response.data.saleItemCategories[i].saleItems) {
					itemHashUrl = "https://www.bungie.net/platform/Destiny/Manifest/6/" + JSON.parse(body).Response.data.saleItemCategories[i].saleItems[j].item.itemHash
					baseRequest(itemHashUrl, function (error, response, body) {
						itemName = JSON.parse(body).Response.data.inventoryItem.itemName
						itemType = JSON.parse(body).Response.data.inventoryItem.itemTypeName
						itemTier = JSON.parse(body).Response.data.inventoryItem.tierTypeName

						if (itemType == "Helmet" || itemType == "Gauntlets" || itemType == "Leg Armor" || itemType == "Chest Armor") {
							armor = armor + "\n-" + itemName
						} else if (itemType == undefined || itemType == "Scout Rifle" || itemType == "Auto Rifle" || itemType == "Pulse Rifle" || itemType == "Hand Cannon" || itemType == "Shotgun" || itemType == "Sniper Rifle" || itemType == "Sidearm" || itemType == "Fusion Rifle" || itemType == "Rocket Launcher" || itemType == "Sword" || itemType == "Machine Gun") {
							weapons = weapons + "\n-" + itemName
						}

						if (total == 14) {
							const xurListEmbed = new Discord.RichEmbed()
								.setColor(color)
								.setAuthor('Xur Weekly Items')
								.addField('__**Weapons**__', "" + weapons)
								.addField('__**Armor**__', "" + armor)
							receivedMessage.channel.send(xurListEmbed)
						}
						total++
					})
				}
			}
		} else {
			const xurNotHere = new Discord.RichEmbed()
				.setColor(color)
				.setDescription('Xur is not present! He will reappear on Friday at 9AM UTC.')
			receivedMessage.channel.send(xurNotHere)
		}
	})
}

//takes all messages sent to the bot, formats them, then sends them to an admin channel
function botMessage(receivedMessage) {
	id = receivedMessage.author.id
	author = client.users.get(id).tag
	dmAdminChannel = "579387028412694548"
	const messageEmbed = new Discord.RichEmbed()
		.setColor(color)
		.setAuthor("From user: " + author.toString())
		.setDescription(receivedMessage)
	client.channels.get(dmAdminChannel).send(messageEmbed)
}

function helpCommand(arguments, receivedMessage) {
	if (arguments.length == 0) {
		receivedMessage.author.send(helpEmbed)
		receivedMessage.channel.send(helpEmbedChat)
	}
}

//displays bot statistics including version number, uptime, and response speed
function botStatCommand(arguments, receivedMessage) {
	let totalSeconds = (client.uptime / 1000)
	let days = Math.floor(totalSeconds / 86400)
	let hours = (Math.floor(totalSeconds / 3600) - (days * 24))
	totalSeconds %= 3600
	let minutes = Math.floor(totalSeconds / 60)
	let seconds = Math.round(totalSeconds % 60)

	let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`

	const statEmbed = new Discord.RichEmbed()
		.setColor(color)
		.setAuthor('The Stranger Bot Statistics')
		.addField("Version:", "" + ver)
		.addField("Uptime:", "" + uptime)
		.addField("Response speed:", Math.round(client.ping) + "ms")

	if (arguments.length == 0) {
		receivedMessage.channel.send(statEmbed)
	}
}

client.login(bot_secret_token)
