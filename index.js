#!/usr/bin/env node // this line tells the system to use the node version installed on the system

// shebang 

import chalk from 'chalk'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation' // built on top of chalk 
import figlet from 'figlet'
import { createSpinner } from 'nanospinner'



// console.log(chalk.bgGreen('Hello'));
// console.log(chalk.green.underline.italic('Hello'));

// a function assigned to a constant which returns a promise
const sleep = (t=2) => new Promise((resolve)=>setTimeout(resolve,t*1000))  // resolve after t amount of time

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Welcome to the world of JS \n'
    )
    
    // input in seconds
    await sleep() // don't move forward until this promise is resolved

    rainbowTitle.stop();
    
    console.log(`
    ${chalk.blue('JS welcomes you')}
    `);
}

await welcome()







