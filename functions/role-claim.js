// eslint-disable-next-line no-unused-vars
const { Client, MessageReaction, User } = require('discord.js');
const firstMessage = require('./first-msg');

const ROLE_CHANNEL_ID = '1011708536721514629';

/**
 * Récupération des customs émoji et des roles */
const emojis = {
    system: 'Admin Système - DevOps',
    boss: 'Chef d\'entreprise',
    po: 'Chef de projet - Scrum Master - PO',
    security: 'Cybersécurité',
    data: 'Data Analyst / Scientist / Engineer',
    dev: 'Développeur',
    student: 'Étudiant',
    formateur: 'Formateur Tech',
    design: 'UX/UI Designer - Graphiste',
    marketing: 'Webmarketing - SEO',
};

/* const emojisGeo = {
    Martinique: 'Martinique',
    Guadeloupe: 'Guadeloupe',
    Guyanne: 'Guyanne',
    France: 'France',
    Canada: 'Canada',
    Suisse: 'Suisse',
    AutresPays: 'Autres Pays',
}; */


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

    // on récupère le membre
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

/* const handleReacts2 = (reaction, user, add) => {
    // on récupère l'emoji
    const emojiName = reaction.emoji.name;
    // on récupère le serveur
    const { guild } = reaction.message;
    // on récupère le nom du role
    const roleName2 = emojisGeo[emojiName];

    if (!roleName2) return;
    // on cherche le bon role dans le serveur
    // eslint-disable-next-line no-shadow
    const role = guild.roles.cache.find(role => role.name === roleName2);
    if (!role) return;

    // on récupère le membre
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
 */

/**
 * @param { Client } bot */
module.exports = (bot) => {
    // Récupère le channel
    // eslint-disable-next-line no-shadow
    const channel = bot.channels.cache.find(channel => channel.id === ROLE_CHANNEL_ID);
    const getEmoji = (emojiName) => bot.emojis.cache.find(emoji => emoji.name === emojiName);
    const reactions = [];

    let text = '> Réagis avec les émojis pour obtenir les rôles qui te correspondent le mieux : \n\n';
    for (const key in emojis) {
        const emoji = getEmoji(key);
        //console.log('emoji = ' + emoji);
        if (!emoji) return;
        reactions.push(emoji);
        text += `${emoji} : ${emojis[key]}\n\r`;
        //console.log(key);
    }

    /*     let text2 = 'Sélectionne ta localisation en réagissant à l\'un des émojis suivants: \n\n';
        for (const key in emojisGeo) {
            const emoji = getEmoji(key);
            console.log('emoji = ' + emoji);
            if (!emoji) return;
            reactions.push(emoji);
            text2 += `${emoji} : ${emojisGeo[key]}\n`;
            console.log(key);
        } */


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