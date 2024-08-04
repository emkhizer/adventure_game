#! /usr/bin/env node 

import chalk from "chalk"; // Chalk library ko import kiya jata hai, yeh colored text console mein display karne ke liye istemal hoti hai
import inquirer from "inquirer"; // Inquirer library ko import kiya jata hai, yeh user se interactive questions puchhne ke liye hoti hai

// classes player aur opponent
class Character {
  name: string; // Character ka name store karne ke liye variable
  fuel: number = 100; // Character ka initial fuel level 100 set kiya gaya hai

  constructor(name: string) {
    // Constructor function jo name ko initialize karta hai
    this.name = name; // Character ka name set kiya jata hai
  }

  fuelDecrease() {
    // Fuel decrease karne ke liye method
    this.fuel -= 25; // Fuel 25 points se kam kiya jata hai
  }

  fuelIncrease() {
    // Fuel increase karne ke liye method
    this.fuel = 100; // Fuel ko wapas 100 set kar diya jata hai
  }
}

class Player extends Character {} // Player class jo Character se inherit karti hai
class Opponent extends Character {} // Opponent class jo Character se inherit karti hai

// Player ka naam aur opponent select karne ke liye prompts
const playerResponse = await inquirer.prompt({
  type: "input", // Input type prompt
  name: "name", // Prompt ka naam "name" set kiya gaya hai
  message: "What is your name?", // User se naam puchhne ka message
});

const opponentResponse = await inquirer.prompt({
  type: "list", // List type prompt
  name: "select", // Prompt ka naam "select" set kiya gaya hai
  message: "Select your opponent", // User se opponent select karne ka message
  choices: ["Skeleton", "Assassin", "Zombie"], // Options jo user select kar sakta hai
});

// Gather Data
const player = new Player(playerResponse.name); // Player object create kiya jata hai, naam ke sath
const opponent = new Opponent(opponentResponse.select); // Opponent object create kiya jata hai, selected opponent ke sath

// Game loop
while (true) {
  // Infinite loop start karte hain game ke liye
  const actionResponse = await inquirer.prompt({
    type: "list", // List type prompt
    name: "opt", // Prompt ka naam "opt" set kiya gaya hai
    message: "What do you want to do?", // User se action puchhne ka message
    choices: ["Attack", "Drink portions", "Run for your life ..."], // Actions jo user perform kar sakta hai
  });

  const action = actionResponse.opt; // User ke selected action ko variable mein store kiya jata hai

  if (action === "Attack") {
    // Agar user ne "Attack" select kiya
    const num = Math.floor(Math.random() * 2); // Random number generate kiya jata hai (0 ya 1)
    if (num > 0) {
      // Agar number 1 hai
      player.fuelDecrease(); // Player ka fuel decrease hota hai
      console.log(chalk.bold.red(`${player.name} fuel is ${player.fuel}`)); // Player ka fuel console mein display hota hai
      console.log(
        chalk.bold.green(`${opponent.name} fuel is ${opponent.fuel}`)
      ); // Opponent ka fuel console mein display hota hai
      if (player.fuel <= 0) {
        // Agar player ka fuel 0 ya usse kam ho jata hai
        console.log(chalk.red.bold.italic("You lose, Better Luck Next Time")); // Player ko message dikhaya jata hai ke woh haar gaya hai
        break; // Loop ko break kar diya jata hai
      }
    } else {
      // Agar number 0 hai
      opponent.fuelDecrease(); // Opponent ka fuel decrease hota hai
      console.log(chalk.bold.red(`${opponent.name} fuel is ${opponent.fuel}`)); // Opponent ka fuel console mein display hota hai
      console.log(chalk.bold.green(`${player.name} fuel is ${player.fuel}`)); // Player ka fuel console mein display hota hai
      if (opponent.fuel <= 0) {
        // Agar opponent ka fuel 0 ya usse kam ho jata hai
        console.log(chalk.green.bold.italic("You Win...")); // Player ko message dikhaya jata hai ke woh jeet gaya hai
        break; // Loop ko break kar diya jata hai
      }
    }
  } else if (action === "Drink portions") {
    // Agar user ne "Drink portions" select kiya
    player.fuelIncrease(); // Player ka fuel wapas 100 ho jata hai
    console.log(
      chalk.bold.italic.green(
        `You drink health potion. Your fuel is ${player.fuel}`
      )
    ); // Message display hota hai ke player ne health potion pee liya
  } else if (action === "Run for your life ...") {
    // Agar user ne "Run for your life ..." select kiya
    console.log(chalk.red.bold.italic("You lose, Better Luck Next Time")); // Player ko message dikhaya jata hai ke woh haar gaya hai
    break; // Loop ko break kar diya jata hai
  }
}
