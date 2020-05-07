<template>
  <div id="app" v-if="word">
    <div class="row">
      <LetterBox v-for="i in wordLength" :key="i" :letter="word.charAt(i - 1)" />
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
    return {
      word: null
    }
  },
  computed: {
    wordLength: function () {
      return this.word.length
    }
  },
  mounted: function () {
    this.word = 'test'
  }
}
</script>

<style>

</style>
