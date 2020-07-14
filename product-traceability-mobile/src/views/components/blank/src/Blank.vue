<template>
    <div class="blank-wrap">
        <div class="blank">
          <img class="blank-picture" src="./blank.png">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Blank',
        props: {
            text: {
                type: String
            }
        },
        computed: {
            computedText () {
                return this.text;
            }
        }
    };
</script>

<style lang="scss">
  .blank-wrap{
    overflow: hidden;
    .blank {
      &-picture {
        width: 240px;
        display: block;
        margin: 0 auto;
      }
    }
  }
</style>
