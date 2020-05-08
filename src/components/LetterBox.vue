<template>
  <div class="col-1">
    <div class="box" v-bind:class="{ 'correct': status === 'correct' }">
      <div v-if="status == 'period'" class="letter">
        .
      </div>
      <div v-else-if="status == 'inword'" class="letter inword">
        {{ letter }}
      </div>
      <div v-else class="letter">
        {{ letter }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Letterbox',
  props: ['letter', 'status']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .box {
    color: white;
    font-weight: bold;
    border: 1px solid blue;
    width: 30px;
    height: 30px;
    position: relative;
    background: royalblue;
    margin-bottom: 1px;
  }
  .letter {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    text-transform: uppercase;
  }
  .col-1 {
    width: 33px;
  }
  .inword {
    background: gold;
    border: 1px solid orange;
    border-radius: 99px;
    padding-left: 9px;
    padding-right: 9px;
    padding-top: 4px;
    padding-bottom: 4px;
    text-shadow: 1px 1px 0 orange,
    -1px 1px 0 orange,
    1px -1px 0 orange,
    -1px -1px 0 orange,
    0px 1px 0 orange,
    0px -1px 0 orange,
    -1px 0px 0 orange,
    1px 0px 0 orange,
    1px 1px 0 orange,
    -1px 1px 0 orange,
    1px -1px 0 orange,
    -1px -1px 0 orange,
    0px 1px 0 orange,
    0px -1px 0 orange,
    -1px 0px 0 orange,
    1px 0px 0 orange,
    1px 1px 0 orange,
    -1px 1px 0 orange,
    1px -1px 0 orange,
    -1px -1px 0 orange,
    1px 1px 0 orange,
    -1px 1px 0 orange,
    1px -1px 0 orange,
    -1px -1px 0 orange;
  }
  .correct {
    background: red;
    border-color: darkred;
  }
</style>
