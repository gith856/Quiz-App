// selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timetext = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .time_sec");
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// let timeValue = 15;
// let que_count = 0;
// let que_numb = 1;
// let userScore = 0;
// let counter;
// let counterLine;
// let widthValue = 0;
 let que_count = 0;
    let userScore = 0;
    let counter;
    let timeValue = 15;

// Start Quiz
start_btn.onclick = () => {
    info_box.classList.add("activeInfo");
};

// Exit Quiz
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
};

// Continue to Quiz
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(que_count);
    queCounter(que_numb);
    startTimer(timeValue);
    startTimeLine();
};

// Next Question
// next_btn.onclick = () => {
//     if (que_count < questions.length - 1) {
//         que_count++;
//         que_numb++;
//         showQuestions(que_count);
//         queCounter(que_numb);
//         clearInterval(counter);
//         clearInterval(counterLine);
//         startTimer(timeValue);
//         startTimeLine();
//         timetext.textContent = "Time Left";
//         next_btn.classList.remove("show");
//     } else {
//         clearInterval(counter);
//         clearInterval(counterLine);
//         showResult();
//     }
// };
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;

        showQuestions(que_count);   // Load next question
        queCounter(que_numb);       // Update counter

        clearInterval(counter);     // Clear old timer
        startTimer(timeValue);      // ✅ START TIMER HERE
        startTimeLine();            // Reset visual timeline

        timetext.textContent = "Time Left";
        next_btn.classList.remove("show");
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        showResult(); // Show results at end
    }
};


// Show Questions and Options
function showQuestions(index) {
    const que_text = document.querySelector(".que_txt");

    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag =
        '<div class="option"><span>' + questions[index].option[0] + '</span></div>' +
        '<div class="option"><span>' + questions[index].option[1] + '</span></div>' +
        '<div class="option"><span>' + questions[index].option[2] + '</span></div>' +
        '<div class="option"><span>' + questions[index].option[3] + '</span></div>';

    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const options = option_list.querySelectorAll(".option");
    for (let i = 0; i < options.length; i++) {
        options[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// Option selected
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    const allOptions = option_list.children.length;

    if (userAns == correctAns) {
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correctAns) {
                option_list.children[i].classList.add("correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show");
}

// Result Box
function showResult() {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");

    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3) {
        scoreText.innerHTML = '<span>and congrats! 🎉 You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
    } else if (userScore > 1) {
        scoreText.innerHTML = '<span>and nice 😎 You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
    } else {
        scoreText.innerHTML = '<span>and sorry 😊 You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
    }
}

// Restart and Quit
const restart_quiz = document.querySelector(".result_box .restart");
const quit_quiz = document.querySelector(".result_box .quit");

restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    timeValue = 15;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimeLine();
    timetext.textContent = "Time Left";
    next_btn.classList.remove("show");
};

quit_quiz.onclick = () => {
    window.location.reload();
};

//Timer
function startTimer(time) {
  timeCount.textContent = time;  // Show initial time

  counter = setInterval(() => {
    time--;  // decrease time

    if (time < 10) {
      timeCount.textContent = "0" + time;  // Add leading zero
    } else {
      timeCount.textContent = time;
    }

    if (time < 0) {
      clearInterval(counter);
      timetext.textContent = "Time Off";

      const correctAns = questions[que_count].answer;
      const allOptions = option_list.children.length;

      for (let i = 0; i < allOptions; i++) {
        const option = option_list.children[i];
        if (option.textContent === correctAns) {
          option.classList.add("correct");
          option.insertAdjacentHTML("beforeend", tickIconTag);
        }
        option.classList.add("disabled");
      }

      next_btn.classList.add("show");
    }
  }, 1000);
}
// function startTimer(time) {
//   timeCount.textContent = time < 10 ? "0" + time : time;

//   counter = setInterval(() => {
//     time--;

//     if (time >= 0) {
//       timeCount.textContent = time < 10 ? "0" + time : time;
//     }

//     if (time < 0) {
//       clearInterval(counter);
//       timetext.textContent = "Time Off";

//       const correctAns = questions[que_count].answer;
//       const allOptions = option_list.children.length;

//       for (let i = 0; i < allOptions; i++) {
//         const option = option_list.children[i];
//         if (option.textContent.trim() === correctAns.trim()) {
//           option.classList.add("correct");
//           option.insertAdjacentHTML("beforeend", tickIconTag);
//         }
//         option.classList.add("disabled");
//       }

//       next_btn.classList.add("show");
//     }
//   }, 1000);
// }


// Timer Line
function startTimeLine() {
    let time = 0;
    counterLine = setInterval(() => {
        time += 1;
        time_line.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }, 29);
}

// Question Counter
function queCounter(index) {
    let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;
}
