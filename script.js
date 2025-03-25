const symbols = "!@#$%^&*"
const numbers = "0123456789"
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// getRandom generates a random number greater or equal than a and lesser than b
function getRandom(a, b) {
    return Math.floor(a + Math.random() * b)
}

// shuffleString shuffle the elements of a string
function shuffleString(str) {
    const array = str.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array.join('');
}


// Password is a class that represent the password to be generated with the characteristics 
class Password {
    constructor(length, lowercase, uppercase, numbers, symbols) {
        this.length = length;
        this.lowercase = lowercase;
        this.uppercase = uppercase;
        this.numbers = numbers;
        this.symbols = symbols;
        this.password = ""

    }
    toString() {
        return this.length + ", " + this.lowercase + ", " + this.uppercase + ", " + this.numbers + ", " + this.symbols
    }
    generate() {
        this.password = ""
        let allCharacters = ""
        let index = 0
        if (this.lowercase === true) {
            index = getRandom(0, lowercase.length)
            this.password += lowercase[index]
            allCharacters += lowercase
        }
        if (this.uppercase === true) {
            index = getRandom(0, uppercase.length)
            this.password += uppercase[index]
            allCharacters += uppercase
        }
        if (this.numbers === true) {
            index = getRandom(0, numbers.length)
            this.password += numbers[index]
            allCharacters += numbers
        }
        if (this.symbols === true) {
            index = getRandom(0, symbols.length)
            this.password += symbols[index]
            allCharacters += symbols
        }
        allCharacters = shuffleString(allCharacters)
        while (this.password.length < this.length) {
            index = getRandom(0, allCharacters.length)
            this.password += allCharacters[index]
        }
        this.password = shuffleString(this.password)
    }
}

let generatePasswordEl = document.getElementById("generateBtn")
let copyEl = document.getElementById("copyBtn")
let passwordEl = document.getElementById("password")
let lowercaseEl = document.getElementById("includeLowercase")
let uppercaseEl = document.getElementById("includeUppercase")
let numbersEl = document.getElementById("includeNumbers")
let symbolsEl = document.getElementById("includeSymbols")




generatePasswordEl.addEventListener("click", function () {
    passwordEl.value = ""
    if (lowercaseEl.checked === false && uppercaseEl.checked === false && numbersEl.checked === false && symbolsEl.checked === false) {
        alert("At least one characteristic should be selected")
    } else {
        let lengthEl = document.getElementById("passwordLength")
        p = new Password(lengthEl.value, lowercaseEl.checked, uppercaseEl.checked, numbersEl.checked, symbolsEl.checked)
        p.generate()
        passwordEl.value = p.password
    }
})

copyEl.addEventListener("click", function () {
    if (passwordEl.value != '') {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(passwordEl.value)
                .then(() => {
                    alert('Password copied to clipboard!');
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                    alert('Failed to copy password.');
                });
        }
    }
})

