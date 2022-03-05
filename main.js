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
    187,
    32
]
$("#tile1").focus()
function getVal(selctor) {
    const value = document.querySelector(selctor).value;
    console.log(value);
}
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
let word = "horse"
$(".guess").keydown(function(event){
    for(let i = 0; i <= invalidKeys.length; i++){
                if(invalidKeys[i] == event.keyCode){
                    event.preventDefault()
                }
            }
    let number = (parseInt($(this).attr("id")[4]) + 1).toString()
    if($(this).attr("id").length > 4){
        number = (parseInt($(this).attr("id").slice(4, 6)) + 1).toString()
    }
    setTimeout(() => {
        tileId += number
        //  --- DELETE KEY ----------
        if(event.keyCode == 8){
            number -= 2
            tileId = "#tile"
            $(this).closest().focus()
            tileId += number
            console.log(tileId)
            $(tileId).focus()
            wordGuess = wordGuess.substr(0, wordGuess.length - 1);
            console.log(wordGuess)
        }

        if($(this).val() != ""){
            console.log(`"${$(this).val()}"`, tileId)
            wordGuess += $(this).val()
            $(tileId).focus()
        }
        
        if(tileId == "#tile6" || tileId == "#tile11" || tileId == "#tile16" || tileId == "#tile21" || tileId == "#tile26"){
            if(event.keyCode){
                    event.preventDefault()
            }
            alert("Please Click Enter")
            event.preventDefault()
        }
        if(event.keyCode == 13){
            if(word == wordGuess){
                alert("Phew")
                $("input").attr('disabled', 'disabled')
            } else {
                let letter = 0
                let prvLetter = letter
                while(letter != 5){
                    prvLetter = letter
                    if(word[letter] == wordGuess[letter]){
                        console.log(`${word[letter]} is in the RIGHT SPOT`)
                        // console.log($(`input:contains('h')`))
                        // $( "input[value*='h']" ).css("color", "green")
                        // $('.guess').find(`input[value='"${word[letter]}"']`).css("background", "green")
                        // console.log($('.guess').find(`input[value='"${word[letter]}"']`).css())
                        // $(`input[value="'${word[letter]}'"]`).remove()
                        $(`input[value*="${word[letter]}"]`).css("background-color","blue");
                        console.log(word[letter], typeof(word[letter]))
                        // console.log(getVal('#tile1'))
                        // if(getVal('#tile1'))

                    } else {
                        for(let i = 0; i <= 5; i++){
                            if(word[prvLetter] == wordGuess[i]){
                                console.log(`${word[prvLetter]} is in the WORD but in the WRONG SPOT`)
                            }
                        }
                    }
                    letter ++
                }

            }
        }
        tileId = "#tile"
    }, 20)
    if(event.keyCode == 13){
        console.log(wordGuess)
    }
})