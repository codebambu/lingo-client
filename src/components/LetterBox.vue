<template>
  <div class="col-1">
  <div class="box">
    <span class="letter">{{ letter }}</span>
  </div></div>
</template>

<script>
export default {
  name: 'Letterbox',
  props: ['letter']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .box {
    border: 1px solid red;
    width: 30px;
    height: 30px;
    position: relative;
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
</style>
