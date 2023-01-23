function Potion(name) {
    this.name = name || this.types[Math.floor(Math.random() * this.types.length)];
    this.types = ['strength', 'agility','health'];
  
    if (this.name === 'health') {
      this.value = Math.floor(Math.random() * 10 + 30);
    } else {
      this.value = Math.floor(Math.random() * 5 + 7);
    }
  }
  
  module.exports = Potion;