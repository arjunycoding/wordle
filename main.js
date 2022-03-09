let invalidKeys = [
  192, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 219, 221, 220, 9, 186, 222, 188,
  190, 191, 189, 187, 32, 16,
]
$("#tile1").focus()
function getVal(selctor) {
  const value = document.querySelector(selctor).value
  console.log(value)
}
let tileId = "#tile"
let wordGuess = ""
let word = "crane"
let tiles = [
  ["#tile1", "#tile2", "#tile3", "#tile4", "#tile5"],
  ["#tile6", "#tile7", "#tile8", "#tile9", "#tile10"],
  ["#tile11", "#tile12", "#tile13", "#tile14", "#tile15"],
  ["#tile16", "#tile17", "#tile18", "#tile19", "#tile20"],
  ["#tile21", "#tile22", "#tile23", "#tile24", "#tile25"],
  ["#tile26", "#tile27", "#tile23", "#tile29", "#tile30"],
]
// let word = words[Math.floor(Math.random() * words.length)]
console.log(word)
let rowClass = ".guess1"
$(".guess").keydown(function (event) {
  for (let i = 0; i <= invalidKeys.length; i++) {
    if (invalidKeys[i] == event.keyCode) {
      event.preventDefault()
      break
    }
  }
  let number = (parseInt($(this).attr("id")[4]) + 1).toString()
  if ($(this).attr("id").length > 4) {
    number = (parseInt($(this).attr("id").slice(4, 6)) + 1).toString()
  }
  setTimeout(() => {
    let i = 1
    let stopat = i + 5
    tileId += number
    //  --- DELETE KEY ----------
    if (event.keyCode == 8) {
      number -= 2
      tileId = "#tile"
      if ($("#tile" + ($(this).attr("id").slice(4, 6) - 1).toString()).attr("disabled")) {
        return
      } else {
        $("#tile" + ($(this).attr("id").slice(4, 6) - 1).toString()).val("")
        $(this).val("")
        tileId += number
        console.log(tileId)
        $(tileId).focus()
        wordGuess = wordGuess.substr(0, wordGuess.length - 1)
        console.log(wordGuess)
        console.log(wordGuess.replace(",", ""))

      }
    }
    // ADD LETTER WHEN KEY PRESSED
    if ($(this).val() != "" || event.keyCode != 13) {
      $(tileId).focus()
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
          console.log(`#tile${i}`, wordGuess)
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
              console.log(rowClass)
              wordGuess = ""
              i = 0
            } else {
              if (word == wordGuess) {
                for (let i = 1; i <= stopat; i++) {
                  $(`#tile${i}`).addClass("rightPlace")
                  // $(`.guess1`).addClass("rightPlace")
                }
                wordGuess = ""
                alert("Phew")
                $("input").attr("disabled", "disabled")
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
                    console.log(`${word[i]} is in the RIGHT SPOT`)
                    $(`#tile${letterIndex + 1}`).addClass("rightPlace")
                  } else {
                    if (word.includes(curLetter)) {
                      console.log(
                        `${wordGuess[i]} is in the WORD but in the WRONG SPOT`,
                        wordGuess
                      )
                      $(`#tile${letterIndex + 1}`).addClass("wrongPlace")
                    } else {
                      $(`#tile${letterIndex + 1}`).addClass("gray")
                    }
                  }
                  i++
                  letterIndex++
                }
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
    if (
      tileId == "#tile6" ||
      tileId == "#tile11" ||
      tileId == "#tile16" ||
      tileId == "#tile21" ||
      tileId == "#tile26" ||
      wordGuess.length == 5
    ) {
      if (event.keyCode) {
        event.preventDefault()
        // alert("CLICK ENTER")
        return false
      }
      event.preventDefault()
    }

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
    else {
    }
    // wordGuess = ""
    tileId = "#tile"
    // "🟨🟩⬛"
  }, 20)
})
