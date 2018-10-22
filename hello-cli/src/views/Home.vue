<style  lang="scss" scoped>



</style>

<template>

<div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld :msg="helloworld" />
</div>

</template>

<script>

// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'home',
    components: {
        HelloWorld
    },
    data() {
        return {
            helloworld: "components helloworld template"
        }
    },
    methods: {

    }
}

</script>
