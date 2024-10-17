var gameHeading = document.querySelector(".game-heading");

var cubeImg1 = document.querySelector(".cube-1");
var cubeImg2 = document.querySelector(".cube-2");

var playerName1 = document.querySelector(".player-name-1");
var playerName2 = document.querySelector(".player-name-2");

var playerEmoji = document.querySelectorAll(".player-emoji")[0];
var botEmoji = document.querySelectorAll(".player-emoji")[1];

var playerNameInput1 = document.querySelector(".player-name-input-1");
var playerNameInput2 = document.querySelector(".player-name-input-2");

var score1 = document.querySelector(".score-player");
var score2 = document.querySelector(".score-bot");

var counter = document.querySelector(".count");

var footerEmoji = document.querySelector(".footer span");

var game = document.querySelector(".game");
var rules = document.querySelector(".rules");

var btnSetName1 = document.querySelector(".btn-set-name-1");
var btnSetName2 = document.querySelector(".btn-set-name-2");
var btn1 = document.querySelector(".btn-1");
var btn1000 = document.querySelector(".btn-1000");
var btnRN = document.querySelector(".btn-RN");
var btnRules = document.querySelector(".btn-rules");
var btnReturn = document.querySelector(".btn-return");

var p1Score = 0;
var p2Score = 0;

var count = 0;
var doubleRollCount = 0;
var myInterval;
var btn;
var rnRand;
var rand1;
var rand2;

var enter = 0;

btnSetName1.addEventListener("click", function () {
   if (playerNameInput1.value != "") {
      playerName1.innerHTML = playerNameInput1.value;
      playerNameInput1.value = "";
   }
});

btnSetName2.addEventListener("click", function () {
   if (playerNameInput2.value != "") {
      playerName2.innerHTML = playerNameInput2.value;
      playerNameInput2.value = "";
   }
});

btnRules.addEventListener("click", function () {
   rules.style.display = "flex";
   game.style.overflow = "hidden";
});

btnReturn.addEventListener("click", function () {
   rules.style.display = "none";
   game.style.overflow = "visible";
});

btn1.addEventListener("click", function () {
   btn = 0;
   if (enter == 0) {
      disablingFunc();
   }
   roll();
});

btn1000.addEventListener("click", function () {
   btn = 1;
   if (enter == 0) {
      disablingFunc();
   }
   myInterval = setInterval(roll, 1);
});

btnRN.addEventListener("click", function () {
   btn = 2;
   if (enter == 0) {
      disablingFunc();
   }
   rnRand = count + Math.ceil(Math.random() * 1000) + 2000;
   myInterval = setInterval(roll, 1);
});

function disablingFunc() {
   btnSetName1.disabled = true;
   btnSetName2.disabled = true;

   playerNameInput1.disabled = true;
   playerNameInput2.disabled = true;
   playerNameInput1.setAttribute("placeholder", "");
   playerNameInput2.setAttribute("placeholder", "");
   playerNameInput1.value = "";
   playerNameInput2.value = "";

   footerEmoji.innerHTML = "🙂";

   enter = 1;
}

function roll() {
   rand1 = Math.ceil(Math.random() * 6);
   rand2 = Math.ceil(Math.random() * 6);

   if (Math.abs(rand1 - rand2) === 5) {
      doubleRollCount++;
   }

   if (btn === 0) {
      if (doubleRollCount > 0 && Math.abs(rand1 - rand2) != 5) {
         if (rand1 > rand2) {
            gameHeading.innerHTML = "Round Winner: " + playerName1.innerHTML + "🚩";
            p1Score += 2 * (rand1 - rand2);
         } else if (rand1 < rand2) {
            gameHeading.innerHTML = "Round Winner: " + playerName2.innerHTML + "🚩";
            p2Score += 2 * (rand2 - rand1);
         } else {
            gameHeading.innerHTML = "Round Winner: ⭐Draw!⭐";
         }
         doubleRollCount--;
      } else if (Math.abs(rand1 - rand2) != 5) {
         if (rand1 > rand2) {
            gameHeading.innerHTML = "Round Winner: " + playerName1.innerHTML + "🚩";
            p1Score += rand1 - rand2;
         } else if (rand1 < rand2) {
            gameHeading.innerHTML = "Round Winner: " + playerName2.innerHTML + "🚩";
            p2Score += rand2 - rand1;
         } else {
            gameHeading.innerHTML = "Round Winner: ⭐Draw!⭐";
         }
      }
      if (Math.abs(rand1 - rand2) === 5) {
         gameHeading.innerHTML = "Double Roll Round!🥁(" + doubleRollCount + ")";
      }
   }

   if (btn === 1 || btn === 2) {
      if (doubleRollCount > 0 && Math.abs(rand1 - rand2) != 5) {
         if (rand1 > rand2) {
            p1Score += 2 * (rand1 - rand2);
         } else if (rand1 < rand2) {
            p2Score += 2 * (rand2 - rand1);
         }
         doubleRollCount--;
      } else if (Math.abs(rand1 - rand2) != 5) {
         if (rand1 > rand2) {
            p1Score += rand1 - rand2;
         } else if (rand1 < rand2) {
            p2Score += rand2 - rand1;
         }
      }
      btn1.disabled = true;
      btn1000.disabled = true;
      btnRN.disabled = true;
      gameHeading.innerHTML = "Rolling...";
   }

   cubeImg1.setAttribute("src", "images/" + rand1 + ".png");
   cubeImg2.setAttribute("src", "images/" + rand2 + ".png");

   if (p1Score > p2Score) {
      playerEmoji.innerHTML = "😀";
      botEmoji.innerHTML = "😥";
   } else if (p1Score < p2Score) {
      playerEmoji.innerHTML = "😥";
      botEmoji.innerHTML = "😀";
   } else {
      playerEmoji.innerHTML = "😐";
      botEmoji.innerHTML = "😐";
   }

   score1.innerHTML = p1Score;
   score2.innerHTML = p2Score;

   count++;
   counter.innerHTML = count;

   if (count % 1000 === 0 && btn === 1) {
      clearInterval(myInterval);
      btn1.disabled = false;
      btn1000.disabled = false;
      btnRN.disabled = false;
      if (p1Score > p2Score) {
         gameHeading.innerHTML =
            count / 1000 + "000th Roll Winner: " + playerName1.innerHTML + "🚩";
      } else if (p1Score < p2Score) {
         gameHeading.innerHTML =
            count / 1000 + "000th Roll Winner: " + playerName2.innerHTML + "🚩";
      } else {
         gameHeading.innerHTML = count / 1000 + "000th Roll Winner: ⭐Draw!⭐";
      }
   }

   if (count % rnRand === 0 && btn === 2) {
      clearInterval(myInterval);
      btn1.disabled = false;
      btn1000.disabled = false;
      btnRN.disabled = false;
      if (p1Score > p2Score) {
         gameHeading.innerHTML = "RN Roll Winner: " + playerName1.innerHTML + "🚩";
      } else if (p1Score < p2Score) {
         gameHeading.innerHTML = "RN Roll Winner: " + playerName2.innerHTML + "🚩";
      } else {
         gameHeading.innerHTML = "RN Roll Winner: ⭐Draw!⭐";
      }
   }
}
