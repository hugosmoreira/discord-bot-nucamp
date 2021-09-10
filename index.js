require('dotenv').config()

const Discord = require('discord.js')

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const token = process.env.DISCORD_TOKEN;

const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
})

async function replyMsg(textQuery) {
    // A unique identifier for the given session
    const projectId = process.env.PROJECT_ID;
    const sessionId = uuid.v4();
  
    // Create a new session
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = await sessionClient.projectAgentSessionPath(
      projectId,
      sessionId
    );
  
    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: textQuery,
          // The language used by the client (en-US)
          languageCode: 'en-US',
        },
      },
    };
  
     // Send request and log result
     const responses = await sessionClient.detectIntent(request);
     //   console.log("Detected intent");
     const result = responses[0].queryResult;
     console.log(`Query: ${result.queryText}`);
     //   console.log(`  Response: ${result.fulfillmentText}`);
     //   if (result.intent) {
     //     console.log(`  Intent: ${result.intent.displayName}`);
     //   } else {
     //     console.log(`  No intent matched.`);
     //   }
 
     return await result.fulfillmentText;
 }

const replies = [
    'Hello World',
    "Ola Tudo Bem?",
    'Ding Dong',
    'Estoy Aqui mi Amor'
]

client.on('message', msg => {
    console.log(msg.author.bot)
    if (!msg.author.bot) {

        replyMsg(msg.content).then((res) => console.log(res))

        msg.reply(msg.content)

    }
    
})




client.on('message', msg => {
    if( msg.content === 'Oi' || msg.content === 'Oi') {
        const index = Math.floor(Math.random() * replies.length)
        msg.reply(replies[index])
    }
})

client.on('message', msg => {
    if(msg.channel.id === '883928300303564845' && msg.content === 'help' ) {
        msg.channel.send('Lets find some help for you !!')

    }
})



  client.login(token)