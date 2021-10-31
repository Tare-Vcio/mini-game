function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      userHeart: 100,
      monsterHeart: 100,
      userDamage: 0,
      monsterDamage: 0,
      healHeart: 0,
      round: 0,
      isFighting: false,
      animate: false,
    };
  },
  methods: {
    startNewGame() {
      this.userHeart = 100;
      this.monsterHeart = 100;
      this.winner = null;
      this.round = 0;
    },
    userAttack() {
      this.round++;
      this.isFighting = true;
      this.userDamage = getRandomValue(5, 10);
      this.monsterHeart -= this.userDamage;
      console.log("user: " + this.userDamage);

      this.animate = false;
      setTimeout(() => {
        this.monsterAttack();
      }, 200);
    },
    monsterAttack() {
      this.monsterDamage = getRandomValue(10, 20);
      console.log("monster: " + this.monsterDamage);
      this.animate = true;
      this.userHeart -= this.monsterDamage;
      this.isFighting = false;
    },
    userBuff() {
      this.round++;
      this.healHeart = getRandomValue(10,20);
      if(this.userHeart + this.healHeart > 100) {
        this.userHeart = 100;
      } else {
        setTimeout(() => {
          this.userHeart += this.healHeart;
          console.log("heal: " + this.healHeart);
        }, 500);
      }
      this.animate = true;
      setTimeout(() => {
        this.monsterAttack();
      }, 200);
    },
    specialAttackMonster() {
      this.round++;
      const attackValue = getRandomValue(15, 30);
      this.monsterHeart -= attackValue;
      this.isFighting = true;
      setTimeout(() => {
        this.monsterAttack();
      }, 200);
    },
    surrender() {
      this.userHeart = 0;
    }
  },
  computed: {
    canUseBuff() {
      return this.round < 1;
    },
    canUseSpecialAttack() {
      return this.round % 3 !== 0;
    },
    headleEnd1() {
      if (this.monsterHeart <= 0) {
        this.monsterHeart = 0;
        return true;
      }
      return false;
    },
    headleEnd2() {
      if (this.userHeart <= 0) {
        this.userHeart = 0;
        return true;
      }
      return false;
    },
    handlebtn() {
      if (this.userHeart <= 0 || this.monsterHeart <= 0) {
        return false;
      } else {
        return true;
      }
    },
  },
});

app.mount("#app");
