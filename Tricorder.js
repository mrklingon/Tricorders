// advance mode, display signal color
function nxtState() {
    state = States.shift()
    States.push(state)
    if (state == "Light") {
        light.setAll(0xffff00)
    }
    if (state == "Temp") {
        light.setAll(0xff0000)
    }
    if (state == "Sound") {
        light.setAll(0x00ff00)
    }
    if (state == "Text") {
        light.setAll(0x0000ff)
    }
    pause(500)
}
// translate text, display in Morse
function doCode(inputxt: string) {
    encrypt(inputxt)
    for (let index = 0; index <= code.length - 1; index++) {
        char = code.substr(index, 1)
        if (char == ".") {
            dot()
        }
        if (char == "-") {
            dash()
        }
        if (char == " ") {
            space()
        }
    }
}
function encrypt(text: string) {
    code = ""
    for (let index2 = 0; index2 <= text.length - 1; index2++) {
        char = text.substr(index2, 1)
        enc = alphabet.indexOf(char)
        if (-1 < enc) {
            code = "" + code + morse[enc] + " "
        } else {
            code = "" + code + " "
        }
    }
}
function space() {
    light.setAll(0x000000)
    light.showRing(
        `black black black purple purple purple purple black black black`
    )
    pause(100)
    light.setAll(0x000000)
}
function dash() {
    light.setAll(0x000000)
    light.showRing(
        `blue blue blue black black black black blue blue blue`
    )
    music.playTone(262, music.beat(BeatFraction.Half))
    light.setAll(0x000000)
}
function dot() {
    light.setAll(0x000000)
    light.showRing(
        `yellow black black black black black black black black yellow`
    )
    music.playTone(523, music.beat(BeatFraction.Quarter))
    light.setAll(0x000000)
}
// translate number to string, display each digit with
// neopixels.
function ShowNum(value: number) {
    pause2 = true
    nstr = convertToText(value)
    light.setAll(0x000000)
    for (let index3 = 0; index3 <= nstr.length - 1; index3++) {
        light.setAll(0x000000)
        nval = parseFloat(nstr.substr(index3, 1))
        if (nval == 0) {
            light.setAll(0x00ffff)
        } else {
            for (let index22 = 0; index22 <= nval - 1; index22++) {
                light.setPixelColor(index22, 0x00ff00)
            }
        }
        pause(700)
    }
    pause(1000)
    light.setAll(0x000000)
    pause2 = false
}
function initMorse() {
    morse = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--..", ".----", "..---", "...--", "....-", ".....", "-....", "--...", "---..", "----.", "-----", "/"]
    alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", " "]
    spock = "live long and prosper"
    yoda = "do or do not"
    yoda2 = "size matters not"
    yoda3 = "luminous beings are we"
    kirk = "to boldly go"
    picard = "engage"
    verses = [spock, yoda, yoda2, yoda3, kirk, picard]
    vnum = 0
}
// change mode
input.buttonsAB.onEvent(ButtonEvent.Click, function () {
    pause2 = true
    light.setAll(0x000000)
    nxtState()
    if ("Text" == state) {
        doCode("text")
    }
    pause2 = false
})
// initaie output appropriate to current state
input.buttonA.onEvent(ButtonEvent.Click, function () {
    if (state == "Light") {
        ShowNum(input.lightLevel())
    }
    if (state == "Temp") {
        if (input.switchRight()) {
            ShowNum(input.temperature(TemperatureUnit.Celsius))
        } else {
            ShowNum(input.temperature(TemperatureUnit.Fahrenheit))
        }
    }
    if (state == "Sound") {
        ShowNum(input.soundLevel())
    }
    if (state == "Text") {
        doCode(verses[vnum])
    }
})
// choose text
input.onGesture(Gesture.TiltRight, function () {
    if ("Text" == state) {
        vnum += 1
        if (vnum >= verses.length) {
            vnum = verses.length - 1
        }
        ShowNum(vnum)
    }
})
// choose text 
input.onGesture(Gesture.TiltLeft, function () {
    if ("Text" == state) {
        vnum += -1
        if (vnum < 0) {
            vnum = 0
        }
        ShowNum(vnum)
    }
})
let vnum = 0
let verses: string[] = []
let spock = ""
let spock2 = ""
let yoda = ""
let yoda2 = ""
let yoda3 = ""
let kirk = ""
let picard = ""
let nval = 0
let nstr = ""
let morse: string[] = []
let alphabet: string[] = []
let enc = 0
let char = ""
let code = ""
let state = ""
let pause2 = false
let States: string[] = []
States = ["Idle", "Light", "Temp", "Sound", "Text"]
nxtState()
pause2 = true
initMorse()
doCode("hello")
pause2 = false
forever(function () {
    if (!(pause2) && state == "Idle") {
        light.showAnimationFrame(light.rainbowAnimation)
    }
})
forever(function () {
    if (!(pause2) && state == "Light") {
        light.graph(input.lightLevel())
    }
})
forever(function () {
    if (!(pause2) && state == "Temp") {
        if (!(input.switchRight())) {
            light.graph(input.temperature(TemperatureUnit.Fahrenheit))
        } else {
            light.graph(input.temperature(TemperatureUnit.Celsius))
        }
    }
})
forever(function () {
    if (!(pause2) && state == "Sound") {
        light.graph(input.soundLevel())
    }
})
