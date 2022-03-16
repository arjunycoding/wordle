let validKeys = [8, 13] //backspace & enter
for (let i = 65; i <= 90; i++) { //all alphabets
    validKeys.push(i)
}
$("#tile1").focus()
let tileId = "#tile"
let wordGuess = ""
let text = ""
let word = words[Math.floor(Math.random() * words.length)]
word = "crane"
let rowClass = ".guess1"
$(".guess").keydown(function (event) {
    if (validKeys.includes(event.keyCode)) {
        console.log($(this).attr("id"))
        let number = (parseInt($(this).attr("id")[4]) + 1).toString()
        if ($(this).attr("id").length > 4) {
            number = (parseInt($(this).attr("id").slice(4, 6)) + 1).toString()
        }
        let i = 1
        let stopat = 6
        tileId += number
        //  --- DELETE KEY ----------
        if (event.keyCode == 8) {
            // number -= 2
            tileId = "#tile"
            console.log(`${tileId.substr(0, tileId.length)} + ${number}`)
            tileId += number - 2
            console.log(`${tileId}`)
            $("#tile3").focus()
            console.log(`${tileId}`)
        }
        // ADD LETTER WHEN KEY PRESSED
        if ($(this).val() != "" || event.keyCode != 13) {
            $(tileId).focus()
            console.log(`I am going to ${tileId} coz I am a dumbo`)
        } else if (event.keyCode == 13) {
            wordGuess = ""
            if (rowClass == ".guess2") {
                i = 5 + 1
            }
            if (rowClass == ".guess3") {
                i = 10 + 1
            }
            if (rowClass == ".guess4") {
                i = 15 + 1
            }
            if (rowClass == ".guess5") {
                i = 20 + 1
            }
            if (rowClass == ".guess6") {
                i = 25 + 1
            }
            stopat = i + 5
            if (!wordGuess) {
                for (; i <= stopat; i++) {
                    wordGuess += $(`#tile${i}`).val()
                    console.log($(`#tile${i}`).val(), wordGuess)
                }
            }
            if (wordGuess.length == 5) {
                let link = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordGuess}`
                // ------- FETCH-------------
                fetch(link)
                    .then((res) => res.json())
                    .then((res) => {
                        if (res.title == "No Definitions Found") {
                            $(rowClass).first().focus()
                            wordGuess = ""
                            i = 0
                        } else {
                            if (word == wordGuess) {
                                $(rowClass).addClass("rightPlace")
                                $("input").attr("disabled", "disabled")
                                pop()
                                text += "🟩🟩🟩🟩🟩"
                            } else {
                                i = 0
                                let letterIndex = 0
                                if (rowClass == ".guess2") {
                                    letterIndex = 5
                                }
                                if (rowClass == ".guess3") {
                                    letterIndex = 10
                                }
                                if (rowClass == ".guess4") {
                                    letterIndex = 15
                                }
                                if (rowClass == ".guess5") {
                                    letterIndex = 20
                                }
                                if (rowClass == ".guess6") {
                                    letterIndex = 25
                                }
                                stopat = i + 5
                                while (i != stopat) {
                                    let curLetter = wordGuess[i]
                                    if (word[i] == curLetter) {
                                        $(`#tile${letterIndex + 1}`).addClass("rightPlace")
                                        text += "🟩"
                                    } else {
                                        if (word.includes(curLetter)) {
                                            $(`#tile${letterIndex + 1}`).addClass("wrongPlace")
                                            text += "🟨"
                                        } else {
                                            $(`#tile${letterIndex + 1}`).addClass("gray")
                                            text += "⬛"
                                        }
                                    }
                                    i++
                                    letterIndex++
                                }
                                text += "\n"
                                $(rowClass).attr("disabled", "true")
                                wordGuess = ""

                            }
                        }
                        rowClass = `.guess${(parseInt(rowClass[6]) + 1).toString()}`
                        if (rowClass == ".guess2") {
                            $("#tile6").focus()
                        }
                        if (rowClass == ".guess3") {
                            $("#tile11").focus()
                        }
                        if (rowClass == ".guess4") {
                            $("#tile16").focus()
                        }
                        if (rowClass == ".guess5") {
                            $("#tile21").focus()
                        }
                        if (rowClass == ".guess6") {
                            $("#tile26").focus()
                        }
                    })
            }
        }


        // IF FIVE LETTERS ARE TYPED
        // if (
        //     tileId == "#tile6" ||
        //     tileId == "#tile11" ||
        //     tileId == "#tile16" ||
        //     tileId == "#tile21" ||
        //     tileId == "#tile26" ||
        //     wordGuess.length == 5
        // ) {
        //     if (event.keyCode) {
        //         event.preventDefault()
        //         // alert("CLICK ENTER")
        //         return false
        //     }
        //     event.preventDefault()
        // }

        // ----ENTER KEY-----------
        if (!wordGuess) {
            for (; i <= stopat; i++) {
                wordGuess += $(`#tile${i}`).val()
            }
        }
        if (wordGuess.length == 5) {
            if (event.keyCode) {
                event.preventDefault()
            }
            event.preventDefault()
        }
        tileId = "#tile"
    } else {
        event.preventDefault()
    }
})


