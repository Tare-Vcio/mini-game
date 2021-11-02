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
      healAnimate: false,
      isFighting: false,
      userAnimate: false,
      monserAnimate: false,
      isAttack: false, // animate cho User
      isAttacked: false, // animate cho Quai Vat
      isActiveBubble: false, // animate Heal
      isStart: "", // bat dau cho null
      styleStartTop: {
        left: "",
      },
      styleOverlayTop: {
        left: "",
      },
      styleStartBottom: {
        right: "",
      },
      styleOverlayBottom: {
        right: "",
      },
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
      this.monsterAnimate = true;
      console.log(this.monsterAnimate);
      this.isAttack = true; // nhan vat tan cong
      this.isAttacked = false; // trang thai quai vat bi. tan cong
      setTimeout(() => {
        this.monsterAttack();
        this.monsterAnimate = false;
      }, 1300);
    },
    monsterAttack() {
      if (this.isStart === "easy") {
        this.monsterDamage = getRandomValue(10, 20);
        console.log("monster: " + this.monsterDamage);
      } else {
        this.monsterDamage = getRandomValue(12, 23);
      }
      this.userHeart -= this.monsterDamage;
      this.userAnimate = true;
      console.log(this.userAnimate);
      this.isFighting = false;
      this.isAttack = false; // nhan vat tan cong
      this.isAttacked = true; // trang thai quai vat bi. tan cong
      setTimeout(() => {
        this.userAnimate = false;
      }, 1300);
    },
    userBuff() {
      this.round++;
      this.healHeart = getRandomValue(15, 25);
      this.isActiveBubble = true; //Bat animation Heal
      setTimeout(() => {
        this.isActiveBubble = false;
      }, 1300); //Tat animation Heal
      if (this.userHeart + this.healHeart > 100) {
        this.userHeart = 100;
      } else {
        setTimeout(() => {
          this.userHeart += this.healHeart;
          console.log("heal: " + this.healHeart);
        }, 500);
      }
      this.healAnimate = true;
      setTimeout(() => {
        this.monsterAttack();
        this.healAnimate = false;
      }, 1000);
    },
    specialAttackMonster() {
      this.round++;
      this.isFighting = true;
      this.userDamage = getRandomValue(15, 30);
      this.monsterHeart -= this.userDamage;
      console.log("user: " + this.userDamage);
      this.monsterAnimate = true;
      setTimeout(() => {
        this.monsterAttack();
      }, 1300);
    },
    surrender() {
      this.userHeart = 0;
    },
    chooseEasy() {
      this.isStart = "easy";
      console.log(this.isStart);
    },
    chooseHard() {
      this.isStart = "hard";
      console.log(this.isStart);
    },
    startGame(e) {
      if (this.isStart === "easy" || this.isStart === "hard") {
        this.styleOverlayTop.left = "-100%";
        this.styleOverlayBottom.right = "-100%";
        this.styleStartTop.left = "-100%";
        this.styleStartBottom.right = "-100%";
      } else {
        alert("Vui lòng chọn cấp độ easy or hard");
      }
    },
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
