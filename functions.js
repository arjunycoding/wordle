/**
 * this function returns a json object with two keys: 
 *      - key1 contains the end result (true / false)
 *      - key2 contains an array of char positions and values indicate one of the following: 
 *          - right: if the char exists and is in the right place 
 *          - exists: if the char exists but is in the wrong place 
 *          - wrong: if the char does not exist in the actualWord 
 **/
function checkWord(enteredWord, actualWord) {
    enteredWord = enteredWord.toLowerCase()
    actualWord = actualWord.toLowerCase()
    if (enteredWord == actualWord) {
        return {
            "result": true,
            "positions": ["right", "right", "right", "right", "right"]
        }
    } else {
        let positions = []
        for (let i = 0; i < enteredWord.length; i++) {
            if (enteredWord[i] == actualWord[i]) {
                positions.push("right")
            } else if (actualWord.includes(enteredWord[i])) {
                positions.push("exists")
            } else {
                positions.push("wrong")
            }
        }
        return {
            "result": false,
            "positions": positions
        }
    }
}

async function isRealWord(wordToCheck) {
    let link = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToCheck}`
    let response = await fetch(link)
    let result = await response.json()
    return await result.title != "No Definitions Found"
}

function extractWord(tileNumber) {
    if (tileNumber % 5 == 0) { //extract only when at the end tile for the word
        let enteredWord = ""
        let startPosition = tileNumber - 4
        for (; startPosition <= tileNumber; startPosition++) {
            enteredWord += $(`#tile${startPosition}`).val()
        }
        return enteredWord
    }
    return ""
}

function shouldMoveTile(inputId) {
    if (extractTileNumber(inputId) % 5 == 0) {
        return false
    }
    return true
}

function getNextTile(inputId) {
    let number = extractTileNumber(inputId)
    return inputId.slice(0, 4) + (number + 1)
}

function getPreviousTile(inputId) {
    let number = extractTileNumber(inputId)
    return inputId.slice(0, 4) + (number - 1)
}

function extractTileNumber(inputId) {
    let numberString = inputId.length > 4 ? inputId.slice(4, 6) : inputId[4]
    return parseInt(numberString)
}

// console.log(checkWord('horse', 'crane'))
// console.log(checkWord('HORSE', 'crane'))
// console.log(checkWord('crane', 'crane'))
// console.log(checkWord('zzzzz', 'crane'))

// console.log(extractTileNumber("1"))
// console.log(extractTileNumber("10"))

// console.log(getNextTile("tile1"))
// console.log(getNextTile("tile10"))

// isRealWord("asdfasd").then((result) => {
//     console.log(result)
// })
// isRealWord("crane").then((result) => {
//     console.log(result)
// })