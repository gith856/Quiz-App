// selecting all requirement element
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


// if startQuiz button clicked
start_btn.onclick = () =>{
    info_box.classList.add("activeInfo"); //show info box
}

// if startQuiz button clicked
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //hide info box
}

continue_btn.onclick = () =>{
    info_box.classList.remove("activeInfo"); //hide info
    quiz_box.classList.add("activeQuiz"); //show info
    showQuestions(0); // calling shoQuestions functions
    queCounter(1); // passing 1 parameter to queCounter
    startTimer(15); //calling startTimer Function
    startTimeLine(0); //calling startTimerLine function
}

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = restart_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = () =>{
    quiz_box.classList.add("activeQuiz"); //show
    result_box.classList.remove("activeResult"); //hide result
    timeValue = 15;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(que_count); //calling showQuestion function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); // clear counter
    clearInterval(counterLine); // clear counterLine
    startTimer(timeValue); //calling startTimer
    startTimeLine(widthValue); // calling startTimerLine
    timetext.textContent = "Time Left"; // change the text of timeText to Time left
    next_btn.classList.remove("show"); // hide the next button
}

//if quitQuiz button clicked
quit_quiz.onclick = () =>{
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

//if Next Que Button clicked
next_btn.onclick = () =>{
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimeLine(widthValue);
        timetext.textContent = "Time Left";
        next_btn.classList.remove("show");
    }
    else{
        clearInterval(counter);
        clearInterval(counterLine);
        showResult(); //calling result function
    }
}

//getting question and question from array

// function showQuestions(index){
//     const que_text = document.querySelector(".que_text");

//     //creating a new span and div tag for question and option and passing the value using array
//     let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
//     let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
//     +'<div class="option"><span>'+questions[index].options[1] +'</span></div>'
//     +'<div class="option"><span>'+questions[index].options[2] +'</span></div>'
//     +'<div class="option"><span>'+questions[index].options[3] +'</span></div>';
//     que_text.innerHTML = que_tag; //adding new span tag inside que_tag
//     option_list.innerHTML = option_tag;//adding new div tag inside option tag

//     const option = option_list.querySelectorAll("option");

//     //set onclick aattribute to all available option
//     for(i=0 ; i < option.length; i++){
//         option[i].setAttribute("onclick","optionSelected(this)");
 //    }
//}
function showQuestions(index){
    // Select the div jisme question dikhana hai
    const que_text = document.querySelector(".que_txt");

    // Question ko span me wrap kar ke prepare karo
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';

    // Options ko divs me banate hain, 4 options ke liye
    let option_tag = 
        '<div class="option"><span>' + questions[index].options[0] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[1] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[2] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[3] + '</span></div>';

    // Question aur options ko HTML me inject karo
    que_text.innerHTML = que_tag;  // Question set kar diya
    option_list.innerHTML = option_tag;  // Options set kar diye

    // Sabhi options ko select karo
    const options = option_list.querySelectorAll(".option");

    // Sabhi options ko onclick event do, jisse optionSelected function chalega
    for(let i = 0; i < options.length; i++){
        options[i].setAttribute("onclick", "optionSelected(this)");
    }
}


//creating the new div tag which for icon
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    clearInterval(counter);
        clearInterval(counterLine);
        let userAns = answer.textContent; // geting user select option
        let correctAns = questions[que_count].answer; //getting correct option in array
        const allOptions = option_list.children.length; // getting all option item

        if(userAns == correctAns){
            userScore += 1;
            answer.classList.add("correct");
            answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick to correct answer
            console.log("Correct Answer");
            console.log("Your Correct Answer = " + userScore);
        }else{
            answer.classList.add("incorrect");
            answer.insertAdjacentHTML("beforeend", crossIconTag); //adding tick to correct answer
            console.log("Wrong Answer");

            for(i=0; i < allOptions; i++){
                 option_list.children[i].classList.add("disabled"); //once user select an option then disabled
            }
            next_btn.classList.add("show");
        }
}

function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if(userScore > 3){
        let scoreTag = '<span>and congrats!🎉, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = '<span>and nice 😎 , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>and sorry😊, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(TimeRanges,1000);
    function timer(){
        timeCount.textContent = time;
        time --;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timetext.textContent = "Time off";
            const allOptions = option_list.children.length;
            let correcAns = questions[que_count].answer;
            for(i = 0; i< allOptions;i++){
                if(option_list.children[i].textContent == correcAns){
                    option_list.children[i].setAttribute("class","option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend",tickIconTag);
                    console.log("Time off: Auto selected correct answer.");
                }
            }
            for(i = 0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled");
            }
            next_btn.classList.add("show");
        }

        function startTimeLine(time){
            counterLine = setInterval(timer, 29);
            function timer(){
                time += 1;
                time_line.computedStyleMap.width = time + "px";
                if(time > 549){
                    clearInterval(counterLine);
                }
            }
        }

        
        function queCounter(index){
            let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
            bottom_ques_counter.innerHTML = totalQueCounTag;
        }

        const bottom_ques_counter = document.querySelector("footer .total_que");

    }
}