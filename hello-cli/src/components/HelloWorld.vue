<style scoped>

h3 {
    margin: 40px 0 0;
    font-size: 14px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

</style>

<template>

<div class="hello">
    <h3>{{ msg }}</h3>
</div>

</template>

<script>

export default {
    name: 'HelloWorld',
    props: {
        msg: String
    }
}

</script>
