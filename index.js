#!/usr/bin/env node // this line tells the system to use the node version installed on the system

// shebang 

import chalk from 'chalk'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation' // built on top of chalk 
import figlet from 'figlet'
import { createSpinner } from 'nanospinner'
import dotenv from 'dotenv'

const URL = "'https://riddles.p.rapidapi.com/riddle/random";

dotenv.config() // check for .env file in local folder
const API_KEY = process.env.API_KEY;

// console.log(chalk.bgGreen('Hello'));
// console.log(chalk.green.underline.italic('Hello'));

let playerName;
// a function assigned to a constant which returns a promise
const sleep = (t=2) => new Promise((resolve)=>setTimeout(resolve,t*1000))  // resolve after t amount of time

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        '\tGame of Riddles\n'
    )

    // input in seconds
    await sleep() // don't move forward until this promise is resolved

    rainbowTitle.stop();
    
    console.log(`\t   ${chalk.blue('Welcome!')}\n`);
}

async function askName(){
    const response = await inquirer.prompt({
        name:'player_name',
        type: 'input',
        message: 'What is your name?',
        default(){
            return 'Player'
        }
    })
    playerName = response.player_name
}

async function handleAnswer(user_ans,ans){
    const spinner = createSpinner('Checking answer...').start();
    await sleep();
    console.log(user_ans);
    let isCorrect = (user_ans.toLowerCase() === ans);

    if(isCorrect){
        spinner.success({text: `Congo ${chalk.green(playerName)}`});
    }else{
        spinner.error({text:`You lose ${playerName}`});
        console.log(`Answer - ${chalk.green(ans)}`);
        process.exit(1);
    }
}

async function riddle1(){
    const answer = await inquirer.prompt({
        name: 'riddle',
        type: 'input',
        message :'What is always in front of you but can\'t be seen?'
    })
    await handleAnswer(answer['riddle'],"future")
}

async function winner(){
    console.clear();
    const msg = `Congrats ${playerName}! \n\n\t$ 1 , 0 0 0 , 0 0 0\n`;
    figlet(msg,(err,data)=>{
        console.log(`\n\t${gradient.pastel.multiline(msg)}`);
    })
    await sleep();
}

// await welcome();
// await askName();
// await riddle1();
// await winner();





