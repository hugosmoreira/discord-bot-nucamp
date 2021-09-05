const Discord = require('discord.js')
//const fetch = require('node-fetch')
//import fetch from 'node-fetch';
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });


client.login('')



function getQuote() {
    return fetch('https://zenquotes.io/api/quotes')
    .then(res => {
        return res.json
    })
    .then(data => {
        return data[0]["q"] + " -" + data[0]["a"]
    })
}

client.on('ready', () => {
    console.log(`Logged in as $client.user.tag`)
})

const replies = [
    'Hello World',
    "Ola Tudo Bem?",
    'Ding Dong',
    'Estoy Aqui mi Amor'
]

client.on('message', msg => {
    if (msg.author.bot) return

    if( msg.content === '$inspire') {
        getQuote().then(quote => msg.channel.send(quote))
    }
})

client.on('message', msg => {
    if( msg.content === 'Hello' || msg.content === 'hello') {
        const index = Math.floor(Math.random() * replies.length)
        msg.reply(replies[index])
    }
})

client.on('message', msg => {
    if(msg.channel.id === '883928300303564845' && msg.content === 'help' ) {
        msg.channel.send('Lets find some help for you !!')

    }
})

// Error handling
client
  .on("error", console.error)
  .on("warn", console.warn)
  .on("debug", console.log);
