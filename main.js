let invalidKeys = [
    192,
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    219,
    221,
    220,
    9,
    186,
    222,
    188,
    190,
    191,
    189,
    187
]
$("#tile1").focus()
// let id = "#guess"
// let innerHtml = ""
// let word = (words[Math.floor(Math.random() * words.length)].toString()).toLocaleLowerCase()
// let guesses = 1
// let letter = 0
// let prvLetter = 1
// let letterId = "#letter"
// $(".guess").keydown(function (event) {
//     // guessingStr = ""
//     if(event.keyCode == 13){
//         console.log(word)
//         let guess = $(this).val()
//         console.log($(this))
//         if(guess){
//             if(word == guess){
//                 innerHtml = `you're right!`
//                 $(this).attr('disabled', 'disabled');
//                 $(".correntWord").html(innerHtml)
//                 $(".letter").css('background-color', 'green')
//                 return
//             } else {
//                 for(let i = 0; i < guess.length; i++){
//                     let letterNumber = letter.toString()
//                     letterId += letterNumber
//                     if(guess[i] == word[i]){
//                         innerHtml += `${guess[i]} is in the right place <br/> `
//                         $(letterId).css('background-color', 'green')
                        
//                     } else {
//                         letter = letter
//                         prvLetter = letter
//                         while(letter != 5){
//                             j = 0
//                             letterId = "#letter"
//                             letter++
//                             letterNumber = letter.toString()
//                             letterId += letterNumber
//                             let curLetter = guess[i]
//                             j++
//                             if(curLetter == word[j]){
//                                 innerHtml += `${curLetter} is IN the word but NOT in the RIGHT spot <br/> `
//                                 $(letterId).css('background-color', 'yellow');
//                                 break
//                             } else {
//                                 innerHtml += `${guess[i]} is not in the word <br/> `
//                                 $(letterId).css('background-color', 'gray');
//                                 break
//                             }
//                         }
//                     }
//                     letter = prvLetter
//                     console.log(letterId)
//                     letter++
//                     letterId = "#letter"
//                 }
//             }
//             // $(this).attr('disabled', 'disabled');
//             // $(".currentGuess").next("input").removeAttr("disabled").addClass("currentGuess")
            
//             // console.log(this)
//             // $(this).removeClass("currentGuess")
//             let number = (parseInt($(this).attr("id")[5]) + 1).toString()
//             id += number
//             $(id).removeAttr("disabled")
//             $(id).focus();
//             $(this).attr('disabled', 'disabled');
//             console.log(id, number, guesses)
//             id = "#guess"
//             $(".correntWord").html(innerHtml)
//             guesses++
//             if(guesses == 6){
//                 $(".correntWord").html(`The word was ${word}`)
//             }
//             innerHtml = ""
//         } else {
//             console.log("Enter Something!")
//         }
//     }
//     for(let i = 0; i <= invalidKeys.length; i++){
//         if(invalidKeys[i] == event.keyCode){
//             event.preventDefault()
//             console.log(invalidKeys[i])
//         }
//     }
// });

let tileId = "#tile"
let wordGuess = ""
$(".guess").keydown(function(event){
    console.log(event.code)
    let number = (parseInt($(this).attr("id")[4]) + 1).toString()
    setTimeout(() => {
        console.log(number)
        tileId += number
        if(event.keyCode == 8){
            number -= 2
            tileId = "#tile"
            tileId += number
            console.log(tileId)
            $(tileId).focus()
        }
        if($(this).val() != ""){
            console.log(`"${$(this).val()}"`, tileId)
            wordGuess += $(this).val()
            $(tileId).focus()
        }
        tileId = "#tile"
    }, 20)
    if(event.keyCode == 13){
        console.log(wordGuess)
    }
})