<template>
  <div id="app" v-if="word">
    <div class="row" v-for="(wordObject, index) in rows" :key="index">
      <LetterBox v-for="letterObject in wordObject.letters"
        :key="letterObject.index"
        :letter="letterObject.letter"
        :status="letterObject.status"
      />
    </div>
    <input type="text">
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
    }
  },
  computed: {
    wordLength: function () {
      return this.word.length
    }
  },
  mounted: function () {
    // how many tries do oy get?
    const tries = 5

    // get a random word 
    const word = 'test'

    // set the word to be guessed
  
    this.word = word

    // push inital row
    this.rows.push(this.buildWordObject(word, this.buildInitialMask(word)))

    // push period masked row for the rest
    for (var i = 0; i < tries -1; i++) {
      this.rows.push(this.buildWordObject(word, this.buildPeriodMask(word)))
    }
  }
  
}
</script>

<style>

</style>
