// eslint-disable-next-line no-unused-vars
const { Client, MessageReaction, User } = require('discord.js');
const firstMessage = require('./first-msg');

const ROLE_CHANNEL_ID = '981193791144857651';

/**
 * Récupération des customs émoji et des roles */
const emojis = {
    windows: 'Windows',
    apple: 'MacOS',
    linux: 'Linux',
    ruby: 'Ruby',
    rust: 'Rust',
    php: 'PHP',
    css: 'CSS',
    html: 'HTML',
    py: 'Python',
    csharp: 'C#',
    c_: 'C',
    cpp: 'C++',
    java: 'Java',
    js: 'JavaScript',
};

/**
 * @param {MessageReaction} reaction
 * @param {User} user
 * @param {Boolean} add
 */
const handleReacts = (reaction, user, add) => {
    // on récupère l'emoji
    const emojiName = reaction.emoji.name;
    // on récupère le serveur
    const { guild } = reaction.message;
    // on récupère le nom du role
    const roleName = emojis[emojiName];
    if (!roleName) return;
    // on cherche le bon role dans le serveur
    // eslint-disable-next-line no-shadow
    const role = guild.roles.cache.find(role => role.name === roleName);
    if (!role) return;

    // eslint-disable-next-line no-shadow
    const member = guild.members.cache.find(member => member.id === user.id);
    if (!member) return;

    if (add) {
        member.roles.add(role);
    }
    else {
        member.roles.remove(role);
    }

};


/**
 * @param { Client } bot */
module.exports = (bot) => {
    // Récupère le channel
    // eslint-disable-next-line no-shadow
    const channel = bot.channels.cache.find(channel => channel.id === ROLE_CHANNEL_ID);
    const getEmoji = (emojiName) => bot.emojis.cache.find(emoji => emoji.name === emojiName);
    const reactions = [];

    let text = 'Réagis avec l\'un des émojis pour obtenir le rôle de développeur qui te correspond le mieux : \n\n';
    for (const key in emojis) {
        const emoji = getEmoji(key);
        console.log('emoji = ' + emoji);
        if (!emoji) return;
        reactions.push(emoji);
        text += `${emoji} : ${emojis[key]}\n`;
        console.log(key);
    }

    firstMessage(channel, text, reactions);

    bot.on('messageReactionAdd', (reaction, user) => {
        // Si notre réaction provient de notre channel
        if (reaction.message.channel.id === channel.id) { handleReacts(reaction, user, true); }
    });

    bot.on('messageReactionRemove', (reaction, user) => {
        // Si notre réaction provient de notre channel
        if (reaction.message.channel.id === channel.id) { handleReacts(reaction, user, false); }
    });
};