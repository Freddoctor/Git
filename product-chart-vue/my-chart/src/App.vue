<style lang="scss">

* {
    margin: 0;
    padding: 0;
    font-family: 'Biaodian Pro Sans GB', "Helvetica Neue", Helvetica, Arial, "pingfang sc", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", sans-serif;
}

ul li,
ol li {
    list-style: none;
}

.clearfix {
    zoom: 1;
}

.clearfix:after {
    clear: both;
    content: "";
    display: block;
}

.left {
    float: left;
}

.right {
    float: right;
}

.left-aside {
    width: 200px;
    .no-click {
        .el-submenu__title {
            opacity: 1;
        }
        .el-icon-arrow-down:before {
            content: "";
        }
    }
}

.main-wraper {
    .right-aside {
        width: -webkit-calc(100% - 230px);
        width: calc(100% - 230px);
        padding: 15px;
        h1 {
            line-height: 1.5em;
            border-bottom: 1px solid #ccc;
            padding-bottom: 10px;
            color: #666;
            font-weight: normal;
            position: relative;
        }
        .pos-icon {
            position: absolute;
            right: 10%;
            top: 5px;
            text-decoration: none;
        }
    }
    .show-area {
        width: 70%;
        .settting {
            h3 {
                padding: 15px 0;
                line-height: 1.5em;
                font-size: 20px;
                font-weight: normal;
                color: #333;
            }
        }
        .block {
            .demonstration {
                display: inline-block;
                width: 50px;
                vertical-align: middle;
            }
            .ls-control {
                display: inline-block;
                width: 200px;
                vertical-align: middle;
            }
            .box-tag {
                width: 45px;
                display: inline-block;
                vertical-align: middle;
            }
        }
    }
    .show-intro {
        width: 25%;
        h3 {
            font-weight: normal;
            font-size: 22px;
            color: #999;
            line-height: 1.5em;
            padding: 15px 0;
        }
        p {
            color: #666;
            font-size: 14px;
            line-height: 1.5em;
        }
    }
}

.header {
    padding: 15px 5px;
    min-width: 1190px;
    background: #999;
}

.subtitle-h1 {
    width: 200px;
    line-height: 40px;
    text-align: center;
    background: #999;
    color: #fff;
}

.chart-table-list {
    margin-bottom: 35px;
}

.canvas-highchart {
    width: 100%;
    height: 400px;
    margin: 40px 0;
    background: #c1c1c1;
    &.isZoom {
        z-index: 999;
        margin: 0;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        left: 0;
        background: #fff;
    }
}

.flex-table {
    display: flex;
    height: 32px;
    align-items: center;
    margin-top: -3px;
    li {
        display: block;
        margin-right: 5px;
    }
}

.list-tip {
    background: #fff;
    border: 1px solid rgba(218, 222, 229, .6);
    padding: 5px;
    width: 110px;
    li {
        margin: 2px 0;
        font-size: 13px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    em {
        display: block;
        font-style: normal;
        color: #333;
    }
    span {
        display: block;
    }
}

.el-pagination {
    text-align: center;
}

.el-slider__button-wrapper {
    z-index: 200;
}

</style>

<template>

<div id="app">
    <router-view/>
</div>

</template>

<script>

export default {
    name: 'App'
}

</script>
