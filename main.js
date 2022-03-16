let validKeys = [] //backspace & enter
for (let i = 65; i <= 90; i++) { //all alphabets
    validKeys.push(i)
}

let word = words[Math.floor(Math.random() * words.length)]
console.log(word)
$(".message").hide()
$("#tile1").focus()
$(".guess").keydown(function (event) {
    let inputId = $(this).attr("id")
    if (validKeys.includes(event.keyCode)) {
        $(`#${inputId}`).val(event.key)
        if (shouldMoveTile(inputId)) {
            let nextTile = getNextTile(inputId)
            $(`#${nextTile}`).focus()
        } else {
            $("#nextTile").val(extractTileNumber(inputId) + 1)
            $("#hiddenTile").focus()
        }
    } else if (event.keyCode == 13 && inputId == "hiddenTile") { // ENTER Key pressed
        let number = parseInt($("#nextTile").val()) - 1
        let enteredWord = extractWord(number)
        let result = checkWord(enteredWord, word)

        if (result.result) { // when the guess is right
            //TODO: go ahead and mark all cells green and 
            let i = $("#nextTile").val() - 1
            let stopat = i - 5
            for (; i > stopat; i--) {
                $(`#tile${i}`).addClass("right")
                $(".alert-success").fadeIn(1500).text("You Won!")
                pop()
            }

            //TODO: end the game
            $("input").attr("disabled", "disabled")

        } else { // when the guess is wrong

            //TODO: check if the word is real 🟩
            isRealWord(enteredWord)
                .then((isReal) => {
                    if (isReal) {
                        //TODO: go ahead and mark the cells with the right color 🟩
                        //TODO: right: green, exists: yellow, wrong: grey 🟩
                        let i = $("#nextTile").val() - 5
                        result.positions.forEach((value) => {
                            $(`#tile${i}`).addClass(value).attr("disabled", "disabled")
                            i++
                        })

                        //proceed to the next cell: 
                        let nextTile = "#tile" + $("#nextTile").val()
                        $(nextTile).focus()

                        //TODO: if last cell - end the game with a sad face 🟩
                        if (nextTile == "#tile31") {
                            $(".alert-primary").fadeIn(1500).text("You did not get the word 😟. The word was " + word)
                        }


                    } else {
                        //TODO: if it is not a real word - do nothing 🟩
                        let i = $("#nextTile").val() - 1
                        let stopat = i - 5
                        for (; i > stopat; i--) {
                            $(`#tile${i}`).val("").focus()
                            $(".alert-danger").fadeIn(1500).text("Not a word")
                            setTimeout(() => {
                                $(".alert-danger").fadeOut(1500)
                            }, 3000)
                        }



                    }
                })

        }

    } else if (event.keyCode == 8) { // DELETE key pressed
        //TODO: empty current val if already in one of the input tiles 🟩
        $(this).val("")
        //TODO: if the current inputId is hiddenTile  🟩
        //     then we have to use nextTile to find while tiles to delete the values from
        if ($(this).attr("id") == "hiddenTile") {
            $(`#tile${$("#nextTile").val() - 1}`).val("").focus()

        }
        //move to previous
        let prevTile = getPreviousTile(inputId)
        $(`#${prevTile}`).val("").focus()
    } else {
        event.preventDefault()
    }
})