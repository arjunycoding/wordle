/*
points
clues 
storing what they already worked 
on shareing exact word
topics expand

*/

let validKeys = [] //backspace & enter
for (let i = 65; i <= 90; i++) { //all alphabets
    validKeys.push(i)
}
$('#modal').hide()
$(".headerIcon").hide()
$("#showAllClues").hide()

let pointCout = 100
let randomIndex = Math.floor(Math.random() * words.length)
$("#clues").hide()
$("#showClue1").hide()
$("#showClue2").hide()
$("#showClue3").hide()
$("#singleClue").hide()
let text = ""
let displayText = ""
let names = ["math", "science", "random", "computers"]
let id = ["easy", "medium", "hard"]
let autoshow = false
$(".message").hide()
$("#currentTile").val("1")
$("#game").hide()
let url = new URL(window.location.href)
let search_params = url.searchParams
if (search_params.has('id') && words.length > search_params.get('id')) {
    randomIndex = search_params.get('id')
    $("#game").show()
    $("#form").hide()
    $("#tile1").focus()
}
let wordObject = words[randomIndex]
let word = wordObject.word
let clue1 = wordObject.clue1
let clue2 = wordObject.clue2
let clue3 = wordObject.clue3
$("#clue1").html(clue1).hide()
$("#clue2").html(clue2).hide()
$("#clue3").html(clue3).hide()
$("#submit").on("click", () => {
    // names.forEach((value) => {
    //     if ($(`input[value='${value}']:checked`).val()) {
    //         if (value == "math") {
    //             word = mathwords[Math.floor(Math.random() * mathwords.length)]
    //             console.log(word)
    //         } else if (value == "science") {
    //             word = sciencewords[Math.floor(Math.random() * sciencewords.length)]
    //         } else if (value == "computers") {
    //             word = computerwords[Math.floor(Math.random() * computerwords.length)]
    //         }
    //     }
    // })
    id.forEach((value) => {
        if ($(`input[id='${value}']:checked`).val()) {
            if (value == "easy") {
                autoshow = true
            } else if (value == "medium") {
                pointCout = 150
            } else if (value == "hard") {
                pointCout = 200
                $("#showClue1").remove()
                $("#showClue2").remove()
                $("#showClue3").remove()
            }
        }
    })
    $("#game").show()
    $("#form").hide()
    $("#tile1").focus()
})
let inputId = $(this).attr("")
function everything(keyPressed, keyCode, event = null) {
    let currentTile = parseInt($("#currentTile").val())
    let inputId = currentTile < 1 ? "hiddenTile" : "tile" + currentTile
    let nextTileNumber = parseInt($("#nextTile").val())
    console.log(autoshow)
    if (autoshow) {
        if (inputId == "tile11") {
            $('#showClue1').click()
            $("#showClue1").hide()
            $("#showClue2").hide()
            $("#showClue3").hide()
        } else if (inputId == "tile16") {
            $('#showClue2').click()
            $("#showClue1").hide()
            $("#showClue2").hide()
            $("#showClue3").hide()
        } else if (inputId == "tile21") {
            $('#showClue3').click()
            $("#showClue1").hide()
            $("#showClue2").hide()
            $("#showClue3").hide()
        }
    }
    if (inputId == "tile11" && !autoshow) {
        $("#showClue1").show()
    }
    if (validKeys.includes(keyCode) && inputId != "hiddenTile") {
        $(`#${inputId}`).val(keyPressed)
        if (shouldMoveTile(inputId)) {
            let nextTile = getNextTile(inputId)
            $(`#${nextTile}`).focus()
            currentTile += 1
        } else {
            $("#nextTile").val(extractTileNumber(inputId) + 1)
            $("#hiddenTile").focus()
            currentTile = 0
        }
        $("#currentTile").val(currentTile)
    } else if (keyCode == 13 && inputId == "hiddenTile") { // ENTER Key pressed
        let number = parseInt($("#nextTile").val()) - 1
        let enteredWord = extractWord(number)
        let result = checkWord(enteredWord, word)
        if (result.result) { // when the guess is right
            let i = $("#nextTile").val() - 1
            let stopat = i - 5
            for (; i > stopat; i--) {
                $(`#tile${i}`).addClass("right")
                $(`#tile${i}`).addClass("speacialFlip")
                $(`.letter:contains(${($(`#tile${i}`).val()).toUpperCase()})`).addClass("right")
            }
            $("#showClue1").hide()
            $("#showClue2").hide()
            $("#showClue3").hide()
            pop()
            text += "🟩🟩🟩🟩🟩"
            displayText += "🟩🟩🟩🟩🟩"
            let lines = ((displayText.split("<br>")).length)
            text = `${lines} Tries \n ${pointCout} Points\n` + text + `\nWant To Play The Same Wordle? Go To: https://arjunycoding.github.io/wordle/?id=${randomIndex}`
            console.log(`${lines} Tires \nBefore \n${pointCout} Points\n More`)
            $("#textMessage").val(text)
            setTimeout(() => {
                $("input").attr("disabled", "disabled")
                $('#modal').click()
                $(".modal-body").html(
                    `You Got It!<br> The word was ${word}<br> You earned ${pointCout} Points <br>Here is your attempt: <br> ${displayText}`
                )
            }, 3000)
        } else { // when the guess is wrong
            isRealWord(enteredWord)
                .then((isReal) => {
                    if (isReal) {

                        let i = nextTileNumber - 5
                        let seconds = 50
                        result.positions.forEach((value) => {
                            // setTimeout(() => {
                            $(`#tile${i}`).addClass(value)
                            $(`#tile${i}`).addClass("flip")
                            // }, seconds)
                            $(`#tile${i}`).prop('disabled', true)
                            document.getElementById(`tile${i}`).readOnly = true
                            // Add Keyboard Colors
                            if (value == "right") {
                                text += "🟩"
                                displayText += "🟩"
                                $(`.letter:contains(${($(`#tile${i}`).val()).toUpperCase()})`).addClass("right")
                                if ($(`.letter:contains(${($(`#tile${i}`).val()).toUpperCase()})`).hasClass("exists")) {
                                    $(`.letter:contains(${($(`#tile${i}`).val()).toUpperCase()})`).removeClass("exists")
                                }
                            } else if (value == "exists") {
                                text += "🟨"
                                displayText += "🟨"
                                if ($(`.letter:contains(${($(`#tile${i}`).val()).toUpperCase()})`).hasClass("right")) {

                                } else {
                                    $(`.letter:contains(${($(`#tile${i}`).val()).toUpperCase()})`).addClass("exists")
                                }
                            } else if (value == "wrong") {
                                text += "⬛"
                                displayText += "⬛"
                                if (!$(`.letter:contains(${($(`#tile${i}`).val()).toUpperCase()})`).hasClass("right")) {
                                    $(`.letter:contains(${($(`#tile${i}`).val()).toUpperCase()})`).addClass("wrong")
                                }
                            }
                            i++
                            // seconds += 0.5
                        })
                        text += "\n"
                        displayText += "<br>"
                        $("#textMessage").val(text)

                        //proceed to the next row: 
                        let nextTile = "#tile" + nextTileNumber
                        $("#currentTile").val(nextTileNumber)
                        $(nextTile).focus()


                        if (nextTile == "#tile31") {
                            $(".alert-primary").fadeIn(1500).text("You did not get the word 😟. The word was " + word)
                        }
                        pointCout -= 10

                        $("#ponitCount").html(pointCout)
                    } else {
                        $(`#tile${nextTileNumber}`).focus()
                        $(".alert-danger").fadeIn(1000).text("Not a word")
                        setTimeout(() => {
                            $(".alert-danger").fadeOut(1000)
                        }, 3000)
                    }
                })
        }
    } else if (keyCode == 8) { // DELETE key pressed
        //     then we have to use nextTile to find while tiles to delete the values from
        if (inputId == "tile6" || inputId == "tile11" || inputId == "tile16" || inputId == "tile21" || inputId == "tile26") {

        } else if (inputId == "hiddenTile") {
            $(`#tile${nextTileNumber - 1}`).val("")
            $(`#tile${nextTileNumber - 1}`).focus()
            $("#currentTile").val((nextTileNumber - 1))
        } else {
            $(`#tile${currentTile}`).val("")
            $(`#tile${currentTile - 1}`).val("")
            $(`#tile${currentTile - 1}`).focus()
            $("#currentTile").val((currentTile - 1))

        }
    } else {
        if (event) {
            event.preventDefault()
        }
    }
}
$(".guess").keydown(function (event) {
    everything(event.key, event.keyCode, event)
})

$(".letter").on("click", function (event) {
    let letter = $(this).val()
    everything(letter, getKeyCode(letter))
})

$("#showClue1").on("click", () => {
    $("#clue1").show()
    $("#clues").hide()
    $("#singleClue").show()
    $("#clue").html(clue1)
    $("#showClue1").hide()
    $("#showClue1").hide()
    $("#showClue2").show()
    pointCout -= 10
    $("#ponitCount").html(pointCout)

})
$("#showClue2").on("click", () => {
    $("#clue2").show()
    $("#clue").html(clue2)
    $("#showClue2").hide()
    $("#showClue2").hide()
    $("#showClue3").show()
    pointCout -= 20
    $("#ponitCount").html(pointCout)

})
$("#showClue3").on("click", () => {
    $("#clue3").show()
    $("#clue").html(clue3)
    $("#showClue3").hide()
    pointCout -= 50
    $("#ponitCount").html(pointCout)

})


$("#showAllClues").on("click", () => {
    $("#clues").show()
    $("#singleClue").hide()
    setTimeout(() => {
        $("#singleClue").show()
        $("#clues").hide()
    }, 10000)
})