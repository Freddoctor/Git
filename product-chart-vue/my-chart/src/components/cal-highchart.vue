<style lang="scss">



</style>

<template lang="html">

<Highstock :options="chartOptions" ref="highcharts"> </Highstock>

</template>

<script>

import $ from 'jquery';
export default {
    props: ['emmitDeliver', 'addtionDeliver'],
    data() {
        return {
            chart: null,
            timer: null,
            ohlc: [],
            volume: [],
            chartOptions: {
                plotOptions: {
                    series: {
                        marker: {
                            enabled: false
                        },
                        lineWidth: 1,
                    }
                },
                loading: {
                    hideDuration: 500,
                    showDuration: 200
                },
                chart: {
                    spacingTop: 32,
                    animation: false,
                    events: {
                        load: function() {
                            this.renderer.label(`<ul class="flex-table" id="renderer"></ul>`, 20, 0, "rect", 0, 0, true)
                                .css({
                                    left: 0,
                                    top: 0,
                                })
                                .add();
                        }
                    }
                },
                rangeSelector: {
                    enabled: false
                },
                tooltip: {
                    split: false,
                    shadow: false,
                    animation: false,
                    shared: true,
                    followPointer: true,
                    useHTML: true,
                    borderWidth: 0,
                    borderRadius: 0,
                    backgroundColor: 'transparent',
                    formatter: function() {
                        var s = '';
                        var render = "";
                        $.each(this.points, function() {
                            var options = $(this)[0].point.options;
                            if (options.open) {
                                s += `<li><em>时间:</em><span>${new Date(options.x).Format('yyyy-MM-dd')}</span></li>
                                      <li><em>开盘价:</em><span style="color:${this.series.color}">${options.open}</span></li>
                                      <li><em>最高价:</em><span style="color:${this.series.color}">${options.high}</span></li>
                                      <li><em>最低价:</em><span style="color:${this.series.color}">${options.low}</span></li>
                                      <li><em>收盘价:</em><span style="color:${this.series.color}">${options.close}</span></li>`
                            } else {
                                // s += `<li><em style="color:${this.series.color}">${this.series.name}:</em><span style="color:${this.series.color}">${this.y}</span></li>`;
                                render += `<li><span style="color:${this.series.color}">${this.series.name}: ${this.y}</span></li>`;
                            }
                        });
                        $("#renderer").html(render);
                        return '<ul class="list-tip">' + s + '</ul>';
                    },
                    positioner: function(width, height, point) {
                        var chartWidth = this.chart.chartWidth;
                        var plotX = point.plotX;
                        return {
                            x: (plotX > chartWidth / 2 ? 10 : (chartWidth - width - 30)),
                            y: 28
                        };
                    }
                },
                xAxis: {
                    crosshair: {
                        width: 1,
                        color: '#33353c',
                        dashStyle: 'Dot',
                        snap: false
                    }
                },
                yAxis: [{
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    title: {
                        text: '主图'
                    },
                    height: '65%',
                    resize: {
                        enabled: true
                    },
                    lineWidth: 2,
                    crosshair: {
                        width: 1,
                        color: '#33353c',
                        dashStyle: 'Dot',
                        snap: false
                    }
                }, {
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    title: {
                        text: '附图'
                    },
                    top: '65%',
                    height: '35%',
                    offset: 0,
                    lineWidth: 2
                }],
                series: []
            }
        }
    },

    mounted() {
        this.chart = this.$refs.highcharts.chart;
        // console.log(this.$Highcharts);
        // console.log(chart.series[1]);
        this.updataHighchart(this.emmitDeliver, this.addtionDeliver);
    },
    methods: {
        HighchartInit(emmitDeliver, addtionDeliver) {
                $("#renderer").html("");
                this.updataHighchart(emmitDeliver, addtionDeliver);
            },
            resizeHighchart(isTrue) { //图表缩放
                if (isTrue == true) {
                    this.chart.setSize($(window).width(), $(window).height(), false);
                } else {
                    this.chart.setSize($(".show-area").width(), 400, false);
                }
            },
            updataHighchart(emmitDeliver, addtionDeliver) { //更新表单
                this.chart.showLoading('Loading data from server...');
                while (this.chart.series.length) { //清空所有数据列
                    this.chart.series[0].remove();
                }
                if (this.chart.series.length == 0) {
                    $.getJSON("/kline/basic").then((res) => {
                        this.ohlc = res;
                        this.basicKline();
                        this.settingLength(30);
                        this.chart.hideLoading();
                    })
                    if (emmitDeliver.key != undefined) {
                        (typeof this["handle" + emmitDeliver.key] == 'function') ? this["handle" + emmitDeliver.key](emmitDeliver.params): "";
                    }
                    if (addtionDeliver.key != undefined) {
                        (typeof this["handle" + addtionDeliver.key] == 'function') ? this["handle" + addtionDeliver.key](addtionDeliver.params): "";
                    }
                }
            },
            basicKline() { //基础k线
                this.chart.addSeries({
                    id: 'sz',
                    type: 'candlestick',
                    name: '上证指数',
                    yAxis: 0,
                    color: '#009933',
                    lineColor: '#009933',
                    upColor: '#DD2200',
                    upLineColor: '#DD2200',
                    navigatorOptions: {
                        // color: this.$Highcharts.getOptions().colors[0],
                    },
                    data: this.ohlc
                })
            },
            settingLength(num) { //控制显示K线数量
                const OHLC = this.ohlc;
                var last = OHLC[OHLC.length - 1];
                var first = OHLC[OHLC.length - num];
                this.chart.xAxis[0].setExtremes(first[0], last[0]);
            },
            handleCJBS() { //CJBS线(已)
                $.getJSON("/kline/cjbs").then(res => {
                    this.chart.addSeries({
                        id: "Another",
                        name: 'CJBS',
                        type: 'column',
                        color: "#009933",
                        data: res,
                        yAxis: 1,
                        lineWidth: 1,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                })
            },
            handlePSY(params) { //PSY线(已)
                $.getJSON("/kline/psy", params).then(res => {
                    this.chart.addSeries({
                        id: "Another",
                        name: 'PSY',
                        type: 'spline',
                        color: "#0066cc",
                        data: res,
                        yAxis: 1,
                        lineWidth: 1,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                })
            },
            handleARBR(params) { //ARBR线(已)
                $.getJSON("/kline/arbr?", params).then(res => {
                    this.chart.addSeries({
                        name: 'BR',
                        type: 'spline',
                        color: "#0066cc",
                        data: res.BR,
                        yAxis: 1,
                        lineWidth: 1,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                    this.chart.addSeries({
                        name: 'AR',
                        type: 'spline',
                        color: "#ff9100",
                        data: res.AR,
                        yAxis: 1,
                        lineWidth: 1,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                })
            },
            handleCR(params) { //CR线(已)
                $.getJSON("/kline/cr", params).then(res => {
                    this.chart.addSeries({
                        name: 'MA1',
                        type: 'spline',
                        color: "#ff9100",
                        data: res.MA1,
                        yAxis: 1,
                        lineWidth: 1,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                    this.chart.addSeries({
                        name: 'MA2',
                        type: 'spline',
                        color: "#0066cc",
                        data: res.MA2,
                        yAxis: 1,
                        lineWidth: 1,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                    this.chart.addSeries({
                        name: 'MA3',
                        type: 'spline',
                        color: "#dd05ab",
                        data: res.MA3,
                        yAxis: 1,
                        lineWidth: 1,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                    this.chart.addSeries({
                        name: 'CR',
                        type: 'spline',
                        color: "#ff5721",
                        data: res.CR,
                        yAxis: 1,
                        lineWidth: 1,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                })
            },
            handleOBV() { //OBV线(已)
                $.getJSON("/kline/obv").then(res => {
                    this.chart.addSeries({
                        name: 'OBV',
                        type: 'spline',
                        color: "#0066cc",
                        data: res,
                        yAxis: 1,
                        lineWidth: 1,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                })
            },
            handleCCI(params) { //CCI线(已)
                $.getJSON("/kline/cci?", params).then(res => {
                    this.chart.addSeries({
                        name: 'CCI',
                        type: 'spline',
                        color: "#0066cc",
                        data: res,
                        yAxis: 1,
                        lineWidth: 1,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                })
            },
            handleDMA(params) { //DMA线(已)
                $.getJSON("/kline/dma?", params).then(res => {
                    this.chart.addSeries({
                        name: 'AMA',
                        type: 'spline',
                        color: "#ff5721",
                        data: res.AMA,
                        yAxis: 1,
                        lineWidth: 1,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                    this.chart.addSeries({
                        name: 'DDD',
                        type: 'spline',
                        color: "#0066cc",
                        data: res.DDD,
                        yAxis: 1,
                        lineWidth: 1,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                })
            },
            handleDMI(params) { //DMI线(已)
                $.getJSON("/kline/dmi?", params).then(res => {
                    this.chart.addSeries({
                        name: 'ADX',
                        type: 'spline',
                        color: "#ff9100",
                        data: res.ADX,
                        yAxis: 1,
                        lineWidth: 1,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                    this.chart.addSeries({
                        name: 'ADXR',
                        type: 'spline',
                        color: "#0066cc",
                        data: res.ADXR,
                        yAxis: 1,
                        lineWidth: 1,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                    this.chart.addSeries({
                        name: 'MDI',
                        type: 'spline',
                        color: "#dd05ab",
                        data: res.MDI,
                        yAxis: 1,
                        lineWidth: 1,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                    this.chart.addSeries({
                        name: 'PDI',
                        type: 'spline',
                        color: "#ff5721",
                        data: res.PDI,
                        yAxis: 1,
                        lineWidth: 1,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                })
            },
            handleWR(params) { //WR线(已)
                $.getJSON("/kline/wr?", params).then((res) => {
                    this.chart.addSeries({
                        name: 'WR1',
                        type: 'spline',
                        color: "#ff5721",
                        data: res.WR1,
                        yAxis: 1,
                        lineWidth: 1,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                    this.chart.addSeries({
                        name: 'WR2',
                        type: 'spline',
                        color: "#0066cc",
                        data: res.WR2,
                        yAxis: 1,
                        lineWidth: 1,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                })
            },
            handleKDJ(params) { //KDJ线(已)
                $.getJSON("/kline/kdj?", params).then(res => {
                    this.chart.addSeries({
                        name: 'K',
                        type: 'spline',
                        color: "#ff9100",
                        data: res.K,
                        yAxis: 1,
                        lineWidth: 1,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                    this.chart.addSeries({
                        name: 'D',
                        type: 'spline',
                        color: "#0066cc",
                        data: res.D,
                        yAxis: 1,
                        lineWidth: 1,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                    this.chart.addSeries({
                        name: 'J',
                        type: 'spline',
                        color: "#dd05ab",
                        data: res.J,
                        yAxis: 1,
                        lineWidth: 1,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                })
            },
            handleRSI(params) { //RSI线(已)
                $.getJSON("/kline/rsi?", params).then(res => {
                    this.chart.addSeries({
                        name: 'RSI1',
                        type: 'spline',
                        color: "#ff9100",
                        data: res.RSI1,
                        yAxis: 1,
                        lineWidth: 1,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                    this.chart.addSeries({
                        name: 'RSI2',
                        type: 'spline',
                        color: "#0066cc",
                        data: res.RSI2,
                        yAxis: 1,
                        lineWidth: 1,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                    this.chart.addSeries({
                        name: 'RSI3',
                        type: 'spline',
                        color: "#dd05ab",
                        data: res.RSI3,
                        yAxis: 1,
                        lineWidth: 1,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                })
            },
            handleBOLL(params) { //布林线(已)
                $.getJSON("/kline/boll?", params).then((res) => {
                    this.chart.addSeries({
                        name: 'LOWER',
                        type: 'spline',
                        color: "#dd05ab",
                        data: res.LOWER,
                        lineWidth: 1,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                    this.chart.addSeries({
                        name: 'MID',
                        type: 'spline',
                        color: "#0066cc",
                        data: res.MID,
                        lineWidth: 1,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                    this.chart.addSeries({
                        name: 'UPPER',
                        type: 'spline',
                        color: "#ff9100",
                        data: res.UPPER,
                        lineWidth: 1,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                })
            },
            handleMACD(params) { //MACD附图(已)
                $.getJSON("/kline/macd?", params).then((res) => {
                    var macd = res['MACD'];
                    var data = new Array();
                    for (var i = 0; i < macd.length; i++) {
                        data.push({
                            x: macd[i][0],
                            y: macd[i][1],
                            color: (macd[i][1] > 0 ? "#dd0022" : "#009933")
                        })
                    }
                    this.chart.addSeries({
                        name: 'MACD',
                        negativeColor: '',
                        type: 'column',
                        data: data,
                        yAxis: 1
                    });
                    this.chart.addSeries({
                        name: 'DIFF',
                        color: '#0066cc',
                        type: 'line',
                        data: res['DIFF'],
                        lineWidth: 1,
                        yAxis: 1,
                    });
                    this.chart.addSeries({
                        name: 'DEA',
                        color: '#ff5721',
                        type: 'line',
                        data: res['DEA'],
                        lineWidth: 2,
                        yAxis: 1,
                    })
                });
            },
            handleMA(params) { //MA线(已)
                $.getJSON("/kline/ma?", params).then((res) => {
                    const keys = Object.keys(res);
                    this.chart.addSeries({
                        name: 'MA' + params.p1,
                        type: 'spline',
                        color: "#FF9100",
                        data: res.MA1,
                        lineWidth: 1,
                        yAxis: 0,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                    this.chart.addSeries({
                        name: 'MA' + params.p2,
                        type: 'spline',
                        color: "#0066CC",
                        data: res.MA2,
                        lineWidth: 1,
                        yAxis: 0,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                    this.chart.addSeries({
                        name: 'MA' + params.p3,
                        type: 'spline',
                        color: "#DD05AB",
                        data: res.MA3,
                        lineWidth: 1,
                        yAxis: 0,
                        dataGrouping: {
                            enabled: false
                        },
                    });
                })
            }
    }
}

</script>
