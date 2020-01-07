#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const { RTMClient } = require('@slack/rtm-api');
const readline = require('readline');
/*const yargs = require("yargs");

const options = yargs
 .usage("Usage: -n <name>")
 .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
 .argv;*/

// const greetingTxt = `Hello, ${options.name}!`;
const greeting = chalk.white.bold("Welcome to CLI Slack!");

const boxenOptions = {
 padding: 1,
 margin: 1,
 borderStyle: "round",
 borderColor: "green",
 backgroundColor: "#555555"
};
const msgBox = boxen( greeting, boxenOptions );

console.log(msgBox);


let remoteUserId = null;

// connect to slack
// Read a token from the environment variables
const token = process.env.SLACK_BOT_TOKEN;
// Initialize
const rtm = new RTMClient(token);


// event listener
rtm.on('message', (event) => {
	remoteUserId = event.channel;
  console.log(chalk.blue("Rashidul: ") + event.text);
});

// connect
(async () => {
  // Connect to Slack
  const { self, team } = await rtm.start();
  // remoteUserId = team.id;
  console.log('connected: ', team);
})();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  rtm.sendMessage(input, remoteUserId).then( reply => {});
    // console.log('Message sent successfully', reply.ts);	
});
