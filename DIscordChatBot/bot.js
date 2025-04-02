import { Client, GatewayIntentBits } from 'discord.js'
import { aiCall } from './ai.js';
import "dotenv/config";

const TOKEN = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

function readCall(ready) {
    if (ready) {
        console.log(`bot ${ready.user.tag} er aktiv`);
    }
}

async function messageFn(message) {
    if( message.author.bot) {
        return;
    } // Ignore bot messages

    if(message.content) {
        message.channel.send(await aiCall(message.content))
    }
}

client.on("ready", readCall)
client.on("messageCreate", messageFn)

client.login(TOKEN)