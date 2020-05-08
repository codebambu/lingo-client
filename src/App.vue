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
      <input v-on:keyup.enter="submit" maxlength="5" type="text" required>
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
      rows: [
      ]
    }
  },
  methods: {
    buildMask: function(word) {
      let vm = this

      // ensure word length matches vm.word length
      if (word.length !== vm.word.length) {
        return null;
      }
      
      let mask = []
      
      for (var i = 0; i < word.length; i++) {
        let wordLetter = word.charAt(i)

        if (vm.word.includes(wordLetter) && vm.word.charAt(i) == wordLetter) {
            mask.push('correct')
        } else if (vm.word.includes(wordLetter)) {
            mask.push('inword')
        } else {
          mask.push('incorrect')
        }
      }
      
      return mask
    },
    buildInitialMask: function(word) {
      let vm = this

      // ensure word length matches vm.word length
      if (word.length !== vm.word.length) {
        return null;
      }
      
      let mask = []
      
      for (var i = 0; i < word.length; i++) {
        if (i == 0) {
          mask.push('correct')
        }

        mask.push('period')
      }
      
      return mask
    },
    buildPeriodMask: function(word) {
      let vm = this

      // ensure word length matches vm.word length
      if (word.length !== vm.word.length) {
        return null;
      }
      
      let mask = []
      
      for (var i = 0; i < word.length; i++) {
        mask.push('period')
      }
      
      return mask
    },
    buildWordObject: function(word, mask) {
      let vm = this

      if (word.length !== vm.word.length) {
        return null
      }

      const wordObject = {
        letters: []
      }

      for (var i = 0; i < word.length; i++) {
        let letterObject = {};

        letterObject.letter = word.charAt(i)
        letterObject.status = mask[i]

        wordObject.letters.push(letterObject)
      }

      return wordObject
    },
    submit: function (event) {
      const value = event.srcElement.value.toLowerCase()
      
      // stop if guess length does not match expected word length
      // stop if first characters do not match
      // stop if amount of tries reaches max amount of tries
      if (value.length !== this.word.length || value.charAt(0) !== this.word.charAt(0) || this.tries == this.maxTries) {
        return
      }

      this.tries = this.tries + 1

      const guessMaskObject = this.buildMask(value)
      const guessWordObject = this.buildWordObject(value, guessMaskObject)
      
      this.$set(this.rows, this.tries -1, guessWordObject)

      event.srcElement.value = ''
    }
  },
  computed: {
    wordLength: function () {
      return this.word.length
    }
  },
  mounted: function () {
    // how many tries do oy get?
    this.maxTries = 5
    this.tries = 0

    // get a random word 
    const word = 'lingo'

    // set the word to be guessed
  
    this.word = word

    // push inital row
    this.rows.push(this.buildWordObject(word, this.buildInitialMask(word)))

    // push period masked row for the rest
    for (var i = 0; i < this.maxTries -1; i++) {
      this.rows.push(this.buildWordObject(word, this.buildPeriodMask(word)))
    }
  }
  
}
</script>

<style>
  input {
      text-transform: uppercase;
      font-size: 16px;
      letter-spacing: 1em;
      width: calc(30px * 5 + 8px);
      text-indent: 1em;
      text-align:center;
  }
  .wrapper {
    position: fixed;
    left: 5%;
    top: 5%;
    display: inline-block;
    border: 3px solid transparent;
  }
</style>
