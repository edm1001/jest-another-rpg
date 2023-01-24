const Player = require('../lib/Player.js')
const Potion = require('../lib/Potion')
jest.mock('../lib/Potion')

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
    expect(player.inventory).toEqual([expect.any(Object)])

 })
 console.log( new Potion());