let validKeys = [] //backspace & enter
for (let i = 65; i <= 90; i++) { //all alphabets
    validKeys.push(i)
}

let word = words[Math.floor(Math.random() * words.length)]
console.log(word)
$(".message").hide()
$("#tile1").focus()
$("#currentTile").val("1")
let inputId = $(this).attr("")
function everything(keyPressed, keyCode, element, event = null) {
    let currentTile = parseInt($("#currentTile").val())
    let inputId = currentTile < 1 ? "hiddenTile" : "tile" + currentTile
    let nextTileNumber = parseInt($("#nextTile").val())
    console.log(currentTile, keyCode, inputId, "currentTile, kc and inputId")
    if (validKeys.includes(keyCode) && inputId != "hiddenTile") {
        $(`#${inputId}`).val(keyPressed)
        if (shouldMoveTile(inputId)) {
            let nextTile = getNextTile(inputId)
            $(`#${nextTile}`).focus()
            currentTile += 1
        } else {
            $("#nextTile").val(extractTileNumber(inputId) + 1)
            console.log("finished row - setting focus to hiddenTile")
            $("#hiddenTile").focus()
            currentTile = 0
        }
        $("#currentTile").val(currentTile)
    } else if (keyCode == 13 && inputId == "hiddenTile") { // ENTER Key pressed
        let number = parseInt($("#nextTile").val()) - 1
        let enteredWord = extractWord(number)
        let result = checkWord(enteredWord, word)
        console.log("ENTER key pressed")
        if (result.result) { // when the guess is right

            let i = $("#nextTile").val() - 1
            let stopat = i - 5
            for (; i > stopat; i--) {
                $(`#tile${i}`).addClass("right")
            }
            $(".alert-success").fadeIn(1500).text("You Won!")
            pop()
            $("input").attr("disabled", "disabled")
        } else { // when the guess is wrong
            isRealWord(enteredWord)
                .then((isReal) => {
                    if (isReal) {

                        let i = nextTileNumber - 5
                        result.positions.forEach((value) => {
                            $(`#tile${i}`)
                                .attr('disabled', true)
                                .attr('readonly', true)
                                .addClass(value)
                            console.log(($(`#tile${i}`).val()).toUpperCase())
                            // Add Keyboard Colors
                            if (value == "right") { 
                                $(`.letter:contains(${($(`#tile${i}`).val()).toUpperCase()})`).addClass("right")
                                if ($(`.letter:contains(${($(`#tile${i}`).val()).toUpperCase()})`).hasClass("exists")) {
                                    $(`.letter:contains(${($(`#tile${i}`).val()).toUpperCase()})`).removeClass("exists")
                                }
                            }
                            if (value == "exists") {
                                if ($(`.letter:contains(${($(`#tile${i}`).val()).toUpperCase()})`).hasClass("right")) {

                                } else {
                                    $(`.letter:contains(${($(`#tile${i}`).val()).toUpperCase()})`).addClass("exists")
                                }
                            }
                            if (value == "wrong") {
                                $(`.letter:contains(${($(`#tile${i}`).val()).toUpperCase()})`).addClass("wrong")
                            }
                            i++
                        })

                        //proceed to the next row: 
                        let nextTile = "#tile" + nextTileNumber
                        $("#currentTile").val(nextTileNumber)
                        $(nextTile).focus()


                        if (nextTile == "#tile31") {
                            $(".alert-primary").fadeIn(1500).text("You did not get the word 😟. The word was " + word)
                        }
                    } else {


                        console.log("nw setting the focus to tile" + nextTileNumber)
                        $(`#tile${nextTileNumber}`).focus()
                        $(".alert-danger").fadeIn(1000).text("Not a word")
                        setTimeout(() => {
                            $(".alert-danger").fadeOut(1000)
                        }, 3000)
                    }
                })
        }
    } else if (keyCode == 8) { // DELETE key pressed

        console.log("Delete key is pressed with " + inputId, nextTileNumber)

        //     then we have to use nextTile to find while tiles to delete the values from
        if (inputId == "hiddenTile") {
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
    everything(event.key, event.keyCode, this, event)
})

$(".letter").on("click", function (event) {
    let letter = $(this).val()
    everything(letter, getKeyCode(letter))
})