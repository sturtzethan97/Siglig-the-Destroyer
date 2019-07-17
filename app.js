//Features List:
//1
//2
//3
//4
new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    
    attack: function() {
      var floor = 6;
      var playerArray = ["You destroy Siglig's hopes and dreams for", "You steal Sig's very gross wife for", "You explain to Siglig why his family has never loved him for", "You force Siglig to do an act of worsip to you for", "You sing Siglig a nice song for", "Siglig trips over his own legs like a panzy"];
      var damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: playerArray[Math.round(Math.random() * 5)] + ' ' + damage + ' damage'
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
    
    specialAttack: function() {
      var damage = this.calculateDamage(8, 20);
      var specialArray = ["You... you. I can't believe you went there", "You use your signature move 'The Strangler'", "You marry Siglig's own mother", "You demorilize Siglig's only child", "You listen to Siglig's problems", "You actually use your sword for once"];
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: specialArray[Math.round(Math.random() * 5)] + ' for ' + damage + ' damage'
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
   
   heal: function() {
      var healArray = [""];
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
        this.monsterAttacks();
      }
      this.turns.unshift({
        isPlayer: true,
        text: healArray[Math.round(Math.random() * 5)] + ' 10 points!'
      });
      if (this.checkWin()) {
        return;
      }
    },
   
   giveUp: function() {
      if (confirm("Wow, just wow... and after all we've been through.")) {
        this.gameIsRunning = false;
      } else;
    },
    
    monsterAttacks: function() {
      var damage = this.calculateDamage(5, 12);
      var monsterArray = ["Siglig tries his best", "Siglig uses 'Fire Hands'", "Siglig knows you are self-conscious and laughs at the size of your sword", "Siglig reminds you of your varios faliures", "Siglig invites you to be friends with him", "Siglig shows you just how nasty his feet are"];
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: monsterArray[Math.round(Math.random() * 5)] + ' for ' + damage + ' damage'
      });
      this.checkWin();
    },
    
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    
    checkWin: function() {
      if (this.monsterHealth <= 0) {
        if (confirm('You Won! New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm('You Lost! Try Again?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    }
  }
});