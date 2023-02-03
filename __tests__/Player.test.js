const Player = require('../lib/Player.js')
const Potion = require('../lib/Potion')

jest.mock('../lib/Potion.js');

// create tests
//arrow function to dace
// expect the variables name health strength agility

test('creates player object', () => { 
    const player = new Player('Dave');

    // expects a  value, dave is ph
    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));

    expect(player.inventory).toEqual(expect.arrayContaining([expect.any(Object)]));

 });

    test('gets player stats as an object', () => {
        const player = new Player('Dave');

        expect(player.getStats()).toHaveProperty('potions');   
        expect(player.getStats()).toHaveProperty('health');   
        expect(player.getStats()).toHaveProperty('strength');   
        expect(player.getStats()).toHaveProperty('agility');   
    });

    test('gets inventory from player or returns false', ()=>{
        const player = new Player('Dave');

        expect(player.getInventory()).toEqual(expect.any(Array));

        player.inventory = [];

        expect(player.getInventory()).toEqual(false);
    });
    
    test('gets player health and value', () => {
        const player = new Player('Dave');

        expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
    })

    // checks if player is alive or not
    test('checks if player is alive', () => {
        const player = new Player('Dave');

        expect(player.isAlive()).toBeTruthy();
        player.health = 0;
        expect(player.isAlive()).toBeFalsy();

    })

    test('subtracts from player health', () => {
        const player = new Player('Dave');
        const oldHealth = player.health;

        player.reduceHealth(5);

        expect(player.health).toBe(oldHealth - 5);

        player.reduceHealth(99999);
        expect(player.health).toBe(0);
    })
    test("gets player attack value", ()=> {
        const player = new Player('Dave');
        player.strength = 10;

        expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
        expect(player.getAttackValue()).toBeLessThanOrEqual(15);
    })
    
