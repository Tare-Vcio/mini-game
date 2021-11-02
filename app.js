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
      isBigger: false, // animate Kiem xuat hien
      isSlide: false, // animate Kiem bay
      isAppear: false, // animate Fire-Ball xuat hien
      isFire: false, // Quai vat khac lua
      isUserDameged: false, // kich hoat hinh anh nguoi trung skill
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
      location.reload(); // load lai trang
    },

    //Hero tấn công
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
      }, 700);
    },

    //Quais vật tấn công
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

    //Buff hồi máu
    userBuff() {
      this.round++;
      this.isFighting = true;
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

    // kĩ năng đăc biệt đánh rồng
    specialAttackMonster() {
      this.round++;
      this.isFighting = true;
      this.userDamage = getRandomValue(15, 30);
      this.monsterHeart -= this.userDamage;
      console.log("user: " + this.userDamage);
      this.specialAttackAnimationForUser();
      setTimeout(() => {this.monsterAnimate = true;},1000)
      setTimeout(() => {
        this.monsterAttack();
        setTimeout(() => {this.specialAttackAnimationForMonster();},1000);
      }, 1300);
    },

    specialAttackAnimationForUser(){
      this.isBigger = true;
      setTimeout(() => {this.isBigger = false},2000)
      setTimeout(() => {this.isAttack = true},900)
      setTimeout(() => {this.isAttack = false},2000)
      this.isSlide = true;
    },
    specialAttackAnimationForMonster(){
      this.isAppear = true;
      setTimeout(() => {this.isFire = true}, 50)
      setTimeout(() => {this.isFire = false}, 350)
      setTimeout(() => {this.isAppear = false}, 1800)     
      setTimeout(() => {this.isUserDameged = true},1500)
      setTimeout(() => {this.isUserDameged = false},2200)
    },
    

    // đầu hàng vô điều kiện
    surrender() {
      this.userHeart = 0;
    },

    //chọn chế độ easy
    chooseEasy() {
      this.isStart = "easy";
      console.log(this.isStart);
    },

    //chọn chế độ hard
    chooseHard() {
      this.isStart = "hard";
      console.log(this.isStart);
    },

    //bắt đầu game chọn chế độ
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
    // điều kiện để buff máu phải trên vòng 1
    canUseBuff() {
      return this.round < 1;
    },

    // điều kiện dùng speacil skill 3 round mới xử dụng lại được
    canUseSpecialAttack() {
      return this.round % 3 !== 0;
    },

    //win
    headleEnd1() {
      if (this.monsterHeart <= 0) {
        this.monsterHeart = 0;
        return true;
      }
      return false;
    },

    //lost
    headleEnd2() {
      if (this.userHeart <= 0) {
        this.userHeart = 0;
        return true;
      }
      return false;
    },

    // xử lý trong lúc đánh
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
