#!/usr/bin/env node // this line tells the system to use the node version installed on the system
// shebang 

import chalk from 'chalk'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation' // built on top of chalk 
import figlet from 'figlet'
import { createSpinner } from 'nanospinner'
import jsonfile from 'jsonfile'


let playerName;
// a function assigned to a constant which returns a promise
const sleep = (t = 2) => new Promise((resolve) => setTimeout(resolve, t * 1000))  // resolve after t amount of time

const data = await jsonfile.readFile("data//collection-of-riddles-with-answers.json");

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        '\n\n\tGame of Riddles\n'
    )

    // input in seconds
    await sleep() // don't move forward until this promise is resolved

    rainbowTitle.stop();

    console.log(`\t   ${chalk.blue('Welcome!')}\n`);
}

async function askName() {
    const response = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player'
        }
    })
    playerName = response.player_name
    console.log(chalk.red("\nType '-1' to Exit\n"));
}

async function riddle() {
    const riddle = data[Math.floor(Math.random() * 499)];
    const answer = await inquirer.prompt({
        name: 'riddle',
        type: 'input',
        message: riddle['riddle']
    })
    handleAnswer(answer['riddle'], riddle['answer']);
}

async function handleAnswer(user_ans, ans) {
    if(user_ans==="-1") {
        await program_end();
    }
    const spinner = createSpinner('Checking answer...\n').start();
    // await sleep();
    let isCorrect = (user_ans === ans);

    if (isCorrect) {
        spinner.success({ text: `Congo ${chalk.green(playerName)}🥂` });
    } else {
        spinner.error({ text: `Wrong!` });
        console.log(`Answer - ${chalk.green(ans)}`);
    }
}

async function loop(){
    while(true){
        await riddle();
    }
}

async function program_end() {
    const msg = `Byee ${playerName}! Do visit again\n`;
    await figlet(msg, (err, data) => {
        console.clear();
        console.log(`\n\t${gradient.pastel.multiline(msg)}`);
    })
    await sleep();
    await process.exit(1);
}

console.clear();
await welcome();
await askName();
await loop();
await program_end();





