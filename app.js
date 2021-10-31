function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      userHeart: 100,
      monsterHeart: 100,
      userDamage: 10,
      monsterDamage: 20,
      isFighting: false,
      animate: false,
    };
  },
  methods: {
    userAttack() {
      this.isFighting = true;
      this.userDamage = Math.floor(Math.random() * 20) + 10;
      this.monsterHeart -= this.userDamage;
      console.log("user: " + this.userDamage);

      this.animate = false;
      setTimeout(() => {
        this.monsterAttack();
      }, 200);
    },
    userBuff() {
      setTimeout(() => {
        this.userHeart += 10;
      }, 500);
    },
    specialAttackMonster() {
      const attackValue = getRandomValue(20, 35);
      this.monsterHeart -= attackValue;
      this.isFighting = false;
      setTimeout(() => {
        this.monsterAttack();
      }, 200);
    },
    monsterAttack() {
      this.monsterDamage = Math.floor(Math.random() * 20) + 10;
      console.log("monster: " + this.monsterDamage);
      this.animate = true;
      this.userHeart -= this.monsterDamage;
      this.isFighting = false;
    },
    surrender() {
      this.userHeart = 0;
    }
  },
  computed: {
    headleEnd1() {
      if (this.monsterHeart <= 0) {
        this.monsterHeart = 0;
        return true;
      }
    },
    headleEnd2() {
      if (this.userHeart <= 0) {
        this.userHeart = 0;
        return true;
      }
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
