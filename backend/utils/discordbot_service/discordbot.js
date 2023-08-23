require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const logger = require('../logger');
const reportModel = require('../../server/models/report_model');

exports.startDiscordBot = () => {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'log') {
      const title = 'System Log File\n------------------------------------\n';
      const logContent = await logger.readLogFile();
      const footer = '\n------------------------------------\n';
      await interaction.reply(title + logContent+ footer);
      // await logger.clearLogFile();

    } else if (interaction.commandName === 'report') {
      const title = 'System Report File\n------------------------------------\n';
      const reportContent = await reportModel.report();
      const footer = '------------------------------------\n';
      await interaction.reply(title + reportContent + footer);

    }
  });

  client.login(process.env.DISCORD_BOT_TOKEN);
}

// test
// const testLog = async () => {
//   for (i = 0; i < 5; i++) {
//     await logger.saveToLogFile(('Error ' + i));
//   }
//   console.log(logger.readLogFile());
// };

// testLog();


