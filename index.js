// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const roleClaim = require('./functions/role-claim');

// Create a new client instance
/**
 * Utilisation des Intents
 * @param FLAGS.GUILDS : Permet à notre bot de gérer un serveur
 * @param FLAGS.GUILD_MESSAGE_REACTIONS : Permet de gérer les réactions aux messages */
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

// EventListenener 'ready'
bot.once('ready', () => {
	console.log('Le bot est bien initialisé!');
    roleClaim(bot);
});

// Login to Discord with your client's token
bot.login(token);