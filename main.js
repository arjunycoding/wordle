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
            //TODO: go ahead and mark all cells green and 
            let i = $("#nextTile").val() - 1
            let stopat = i - 5
            for (; i > stopat; i--) {
                $(`#tile${i}`).addClass("right")
            }
            $(".alert-success").fadeIn(1500).text("You Won!")
            pop()
            $("input").attr("disabled", "disabled")
        } else { // when the guess is wrong
            //TODO: check if the word is real 🟩
            isRealWord(enteredWord)
                .then((isReal) => {
                    if (isReal) {

                        //TODO: go ahead and mark the cells with the right color 🟩
                        //TODO: right: green, exists: yellow, wrong: grey 🟩

                        let i = nextTileNumber - 5
                        result.positions.forEach((value) => {
                            $(`#tile${i}`).addClass(value).attr("disabled", "disabled")
                            // console.log(($(`#tile${i}`).val()).toUpperCase())
                            // $(`.key:contains(${($(`#tile${i}`).val()).toUpperCase()})`).addClass(value)
                            i++
                        })

                        //proceed to the next row: 
                        let nextTile = "#tile" + nextTileNumber
                        $("#currentTile").val(nextTileNumber)
                        $(nextTile).focus()

                        //TODO: if last cell - end the game with a sad face 🟩
                        if (nextTile == "#tile31") {
                            $(".alert-primary").fadeIn(1500).text("You did not get the word 😟. The word was " + word)
                        }
                    } else {
                        //TODO: if it is not a real word - do nothing 🟩

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
        //TODO: empty current val if already in one of the input tiles 🟩
        console.log("Delete key is pressed with " + inputId, nextTileNumber)
        //TODO: if the current inputId is hiddenTile  🟩
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
            // $("#nextTile").val((nextTileNumber - 5))
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

$(".key").on("click", function (event) {
    let letter = $(this).val()
    everything(letter, getKeyCode(letter))
})