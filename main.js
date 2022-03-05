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
let tileId = "#tile"
let wordGuess = ""
let word = "horse"
let rowClass = "#guess1"
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
    let validate = setTimeout(() => {
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

        // ----ENTER KEY-----------
        if(event.keyCode == 13){
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordGuess}`)
            .then(res => res.json())
            .then(res => {
                if(res.title == 'No Definitions Found'){
                    $(rowClass).last().focus()
                    console.log(rowClass)
                } else {
                    
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
                                $(`#tile${letter + 1}`).addClass("rightPlace")
                                console.log(word[letter], typeof(word[letter]))
                                
                            } else {
                                for(let i = 0; i <= 5; i++){
                                    if(word[prvLetter] == wordGuess[i]){
                                        console.log(`${word[prvLetter]} is in the WORD but in the WRONG SPOT`)
                                        $(`#tile${letter + 1}`).addClass("wrongPlace")
                                    } else {
                                        $(`#tile${letter + 1}`).addClass("gray")
                                    }
                                }
                            }
                            letter ++
                        }
                        $(rowClass).attr('disabled', 'disabled');
                    }
                }
                rowClass = `#guess${(parseInt(rowClass[6]) + 1).toString()}`
            })
        }
        tileId = "#tile"
    }, 20)
})