<template>
    <div id="app" v-if="word">
        <div class="wrapper">
            <div class="row" v-for="(wordObject, index) in rows" :key="index">
                <LetterBox v-for="letterObject in wordObject.letters"
                    :key="letterObject.index"
                    :letter="letterObject.letter"
                    :status="letterObject.status"
                />
            </div>
            <input :style="{ width: inputWidth + 'px' }"
                v-on:input="calculateMaxlength"
                v-on:keyup.enter="submit"
                :maxlength="maxLength"
                type="text"
                required
            >
        </div>
    </div>
</template>

<script>
import LetterBox from './components/LetterBox.vue'

export default {
    name: 'App',
    components: {
        LetterBox
    },
    data: function () {
        // example mask: 'correct-incorrect-inword-period'
        return {
            word: null,
            maxTries: null,
            tries: null,
            maxLength: 0,
            rows: [

            ]
        }
    },
    methods: {
        buildMask: function (lettersArray) {
            let vm = this
            const vmWordLettersArray = this.buildLettersArray(vm.word)
            let includesArray = []
            let inwordArray = []

            // ensure word length matches vm.word length
            if (lettersArray.length !== vmWordLettersArray.length) {
                return null;
            }

            let mask = []

            for (var i = 0; i < lettersArray.length; i++) {
                let wordLetter = lettersArray[i]

                if (vmWordLettersArray.includes(wordLetter) && vmWordLettersArray[i] == wordLetter) {
                    mask.push('correct')
                    includesArray.push(wordLetter)
                } else {
                    mask.push('incorrect')
                }
            }

            for (var j = 0; j < lettersArray.length; j++) {
                let wordLetter = lettersArray[j]

                if (mask[j] == 'incorrect') {
                    if (vmWordLettersArray.includes(wordLetter) && !includesArray.includes(wordLetter) && !inwordArray.includes(wordLetter)) {
                        mask[j] = 'inword'
                        inwordArray.push(wordLetter)
                    }
                }
            }

            return mask
        },
        buildInitialMask: function (lettersArray) {
            let vm = this
            const vmWordLettersArray = this.buildLettersArray(vm.word)

            // ensure word length matches vm.word length
            if (lettersArray.length !== vmWordLettersArray.length) {
                return null;
            }

            let mask = []

            for (var i = 0; i < lettersArray.length; i++) {
                if (i == 0) {
                    mask.push('correct')
                }

                mask.push('period')
            }

            return mask
        },
        buildPeriodMask: function (lettersArray) {
            let vm = this
            const vmWordLettersArray = this.buildLettersArray(vm.word)

            // ensure word length matches vm.word length
            if (lettersArray.length !== vmWordLettersArray.length) {
                return null;
            }

            let mask = []

            for (var i = 0; i < vmWordLettersArray.length; i++) {
                mask.push('period')
            }

            return mask
        },
        // TODO: modify this toa ccept a lettersArray instead of word
        buildWordObject: function (lettersArray, mask) {
            let vm = this
            const vmWordLettersArray = this.buildLettersArray(vm.word)

            if (lettersArray.length !== vmWordLettersArray.length) {
                return null
            }

            let wordObject = {
                letters: []
            }

            for (var i = 0; i < lettersArray.length; i++) {
                let letterObject = {};

                letterObject.letter = lettersArray[i]
                letterObject.status = mask[i]

                wordObject.letters.push(letterObject)
            }

            return wordObject
        },
        submit: function (event) {
            const value = event.srcElement.value.toLowerCase()
            const valueLettersArray = this.buildLettersArray(value)
            const vmWordLettersArray = this.buildLettersArray(this.word)

            // stop if guess length does not match expected word length
            // stop if first characters do not match
            // stop if amount of tries reaches max amount of tries
            if (valueLettersArray.length !== vmWordLettersArray.length || valueLettersArray[0] !== vmWordLettersArray[0] || this.tries == this.maxTries) {
                return
            }

            this.tries = this.tries + 1

            const guessMaskObject = this.buildMask(valueLettersArray)
            const guessWordObject = this.buildWordObject(valueLettersArray, guessMaskObject)

            this.$set(this.rows, this.tries - 1, guessWordObject)

            event.srcElement.value = ''
        },
        buildLettersArray: function (word) {
            let lettersArray = []

            for (var i = 0; i < word.length; i++) {
                if (word.charAt(i) == 'i' && word.charAt(i + 1) == 'j') {
                    lettersArray.push('ij')
                    i++
                    i++
                }

                lettersArray.push(word.charAt(i))
            }

            return lettersArray.filter(function (letter) {
                return letter !== ''
            })
        },
        calculateMaxlength: function (e) {
            const value = e.srcElement.value
            const wordLettersArray = this.buildLettersArray(this.word)

            if (value.includes('ij')) {
                this.maxLength = wordLettersArray.length + 1
            } else {
                this.maxLength = wordLettersArray.length
            }
        }
    },
    computed: {
        inputWidth: function () {
            const letterCount = this.buildLettersArray(this.word).length
            const part1 = (letterCount * 30) + 2
            const part2 = ((letterCount - 2) * 3) - 2
            return part1 + part2
        },

    },
    mounted: async function () {
        const response = await fetch('http://127.0.0.1:4567/word/5')
        const json = await response.json()
        this.word = json.word.toLowerCase()

        // max amount of tries
        this.maxTries = 5
        this.tries = 0

        const wordLettersArray = this.buildLettersArray(this.word)

        // // set the initial maxlength
        if (wordLettersArray.includes('ij')) {
            this.maxLength = wordLettersArray.length + 1
        } else {
            this.maxLength = wordLettersArray.length
        }

        // push inital row
        this.rows.push(this.buildWordObject(wordLettersArray, this.buildInitialMask(wordLettersArray)))

        // push period masked row for the rest
        for (var i = 0; i < this.maxTries - 1; i++) {
            this.rows.push(this.buildWordObject(wordLettersArray, this.buildPeriodMask(wordLettersArray)))
        }
    }
}
</script>

<style>
    html {
        background: white;
    }

    input {
        text-transform: uppercase;
        font-size: 16px;
        letter-spacing: 1em;
        text-indent: 1em;
        text-align: center;
    }

    .wrapper {
        position: fixed;
        left: 5%;
        top: 5%;
        display: inline-block;
        border: 3px solid transparent;
    }
</style>
