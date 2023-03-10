const inquirer = require('inquirer');
const Enemy = require('./Enemy')
const Player = require('./Player')

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}

Game.prototype.initializeGame = function() {
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));
    this.currentEnemy = this.enemies[0];
    inquirer 
    .prompt({
        type: 'text',
        name: 'name',
        message: 'what is your name?'
    })
// destructure name from prompt object
    .then(({name}) =>  {
        this.player = new Player(name);
        // test the object creation
        // console.log(this.currentEnemy, this.player);
        this.startNewBattle();
    })
}

Game.prototype.startNewBattle = function() {
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    }else {
        this.isPlayerTurn = false;
    }

    console.log("Your stats are as follows");
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());

    this.battle();
}

Game.prototype.battle = function() {
    if (this.isPlayerTurn) {
        // player prompts will go here
        inquirer 
        .prompt({
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: ['Attack', 'Use potion']
        })
        .then(({action}) => {
            if (action === 'Use potion') {
                if (!this.player.getInventory()) {
                    // follow up prompt will go here
                    console.log("You dont have ny potions");
                    return;    
                }
                inquirer
                    .prompt({
                        type: 'list',
                        message: 'Which potion would you like to use?',
                        name: 'action',
                        choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                    })
                    .then(({action}) => {
                        const potionDetails = action.split(': ');

                        this.player.usePotion(potionDetails[0] -1);
                        console.log(`You used a ${potionDetails[1]} potion. `)
                    })
            } else {
                const damage = this.currentEnemy.getAttackValue();
                this.player.reduceHealth(damage);
        
                console.log(`You were attacked by the ${this.currentEnemy.name}`);
                console.log(this.currentEnemy.getHealth());
            }
        })
    } 
};

module.exports = Game;