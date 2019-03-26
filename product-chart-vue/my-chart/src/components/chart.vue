<style lang="sass">

</style>

<template>
  <div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    propMessage: String
  }
})
export default class Chart extends Vue {
  // initial data
  msg = 123;

  name = "typescript";
  // use prop values for initial data
  helloMsg = "Hello, " + this.propMessage;
  // lifecycle hook
  mounted() {
    console.log(this.name);
  }
  // computed
  get computedMsg() {
    return "computed " + this.msg;
  }
  // method
  greet() {
    alert("greeting: " + this.msg);
  }
}


</script>