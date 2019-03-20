<style lang="scss">



</style>

<template>

<div class="x-bar">
    <div :id="id" :option="option"></div>
</div>

</template>

<script>

import HighCharts from 'highcharts/highstock';

export default {
    // 验证类型
    props: {
        id: {
            type: String
        },
        option: {
            type: Object
        }
    },
    watch: {
        option() {
            new HighCharts.chart(this.id, this.option);
        }
    },
    mounted() {
        new HighCharts.chart(this.id, this.option);
    }
}

</script>
