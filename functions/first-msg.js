/* eslint-disable no-unused-vars */
const { TextChannel, Message, Collection } = require('discord.js');

const TIMEOUT = 500;
/**
 * @param {Message} message
 * @param {Array} reactions
 */
const addReactions = (message, reactions) => {
    // on vérifie si le message contient une réaction
    message.react(reactions[0]);
    // on efface la 1ère réaction.
    reactions.shift();
    // si il y a tjrs des elts dans reactions
    if (reactions.length > 0) {
        // on va répéter cette fonction toutes les 500ms
        setTimeout(() => addReactions(message, reactions), TIMEOUT);
    }
};


const initFirstMsg = async (channel, text, reactions) => {
    // poster notre 1er message
    await channel.send(text).then(message => {
        addReactions(message, reactions);
    });
};

/**
 * @param {Collection <String, Message>} messages
 * @param {String} text
 * @param {Array} reactions
 */
const editFirstMsg = (messages, text, reactions) => {
    for (const message of messages) {
        // message [1] sera donc la value de l'objet messages et message[0] la clé
        message[1].edit(text);
        // si il y a des réactions
        if (reactions) {
            // on ajoute à ce message les réactions
            addReactions(message[1], reactions);
        }
    }
};

/**
 * @param {TextChannel} channel
 * @param {String} text
 * @param {Array} reactions
 */
module.exports = (channel, text, reactions) => {
    channel.messages.fetch().then(messages => {
        if (messages.size === 0) {
            initFirstMsg(channel, text, reactions);
        }
        else if (messages.size === 1) {
            editFirstMsg(messages, text, reactions);
        }
    });
};