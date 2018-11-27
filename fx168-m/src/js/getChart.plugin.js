//个股分时图
function drawChart(el, jsonData, code) {
    //数据
    var timeLineData = jsonData.data;
    //数据长度
    var length = timeLineData.length;
    //最后数据
    var last_data = jsonData.data[length-1];
    //开盘价
    var todayOpen = Number(jsonData.open);
    //昨收(如果昨收为0，今开不为0，昨收用今开来计算)
    var yesterdayClose = jsonData.yes == 0 && jsonData.open != 0 ? Number(jsonData.open) : Number(jsonData.yes);
    var todayDate = timeLineData[0][0];

    var caldatas = [];
    var positions = [];

    var day = Highcharts.dateFormat('%Y/%m/%d', todayDate),
    breaks = [{
        from: new Date(day + ' 11:30').getTime(),
        to: new Date(day + ' 13:00').getTime(),
        breakSize: 0 * 60 * 1000
    }],
    min = new Date(day + ' 9:30').getTime(),
    max = new Date(day + ' 15:00').getTime(),
    // x 轴标签便宜高度
    height = $('#' + el).height() * 0.23,
    width = $('#' + el).width();

    if(jsonData.yes == 0 && last_data[2] == 0){
        var ymin = -2.0;
        var ymax = 2.0;
        var startOnTick = false;
        var endOnTick = false;
    }else{
        var ymin = null;
        var ymax = null;
        var startOnTick = true;
        var endOnTick = true;
    }

    caldatas = cal_data(timeLineData,yesterdayClose);
    show_info(timeLineData,yesterdayClose,jsonData.open,'si_fs_infos',1);
    //提示框出现
    $('#si_fs_infos').show();

    // Create the chart
    $('#' + el).highcharts('StockChart', {
        chart: {
            spacing: 1,
            borderRadius: 0,
            animation: false,
            events: {
                load: function() {

                    //获取当天日期
                    var myDate = new Date();
                    var day = myDate.getDay();
                    var hour = myDate.getHours();
                    var minute = myDate.getMinutes();
                    var time = hour + ':' + minute;

                    //周一到周五执行定时刷新
                    if (myDate.getDay() > 0 && myDate.getDay() < 6) {
                        if (time_range("09:30", "11:30") || time_range("13:00", "15:30")) {
                            //定时获取实时数据
                            setInterval(function() {
                                yesterdayClose = Number(jsonData.yes);
                                todayOpen = Number(jsonData.open);
                                //地址
                                var url = U('price/Data/getCur');
                                url += '&hqzqdm=' + code;
                                $.getJSON(url,function(jsonData) {
                                    var chart = $('#' + el).highcharts();
                                    
                                    timeLineData = jsonData.data;

                                    //价格
                                    var cur_price = jsonData.f3;

                                    //重新计算
                                    caldatas = cal_data(timeLineData,yesterdayClose);
                                    //更新图表
                                    chart.series[0].update({
                                        data: timeLineData
                                    },false);
                                    chart.series[1].update({
                                        data: timeLineData
                                    },false);
                                    chart.series[2].update({
                                        data: caldatas[4]
                                    },false);

                                    chart.redraw();


                                    //更新基本信息
                                    var pnum_html = '';
                                    var curpri_html = '';
                                    if(cur_price > jsonData.yes){//涨
                                        pnum_html = "<div class='numbers'><span class='price'><span class='red_font'>¥"+ jsonData.f3_float + "</span></span>";
                                        pnum_html += "<span class='updown'><span class='red_font'>+" + jsonData.zz + "(" + jsonData.updown + "%)</span></span></div>";
                                        pnum_html += "<div class='date'>" + jsonData.date +"</div>";
                                        curpri_html = "<span class='red_font'>" + jsonData.f3_float + "</span>";
                                    }else if(cur_price < jsonData.yes){//跌
                                        pnum_html = "<div class='numbers'><span class='price'><span class='green_font'>¥"+ jsonData.f3_float + "</span></span>";
                                        pnum_html += "<span class='updown'><span class='green_font'>" + jsonData.zz + "(" + jsonData.updown + "%)</span></span></div>";
                                        pnum_html += "<div class='date'>" + jsonData.date +"</div>";
                                        curpri_html = "<span class='green_font'>" + jsonData.f3_float + "</span>";
                                    }else{//相等
                                        pnum_html = "<div class='numbers'><span class='price'><span class='default_font'>¥"+ jsonData.f3_float + "</span></span>";
                                        pnum_html += "<span class='updown'><span class='default_font'>" + jsonData.zz + "(" + jsonData.updown + "%)</span></span></div>";
                                        pnum_html += "<div class='date'>" + jsonData.date +"</div>";
                                        curpri_html = "<span class='default_font'>" + jsonData.f3_float + "</span>";
                                    }
                                    $('.pnum').html(pnum_html);

                                    //涨跌，涨跌幅,最高最低
                                    $('.pdata table').find('tr').eq(1).find('td').eq(0).html('涨跌：' + jsonData.zz);
                                    $('.pdata table').find('tr').eq(1).find('td').eq(1).html('涨跌幅(%)：' + jsonData.updown);
                                    $('.pdata table').find('tr').eq(1).find('td').eq(2).html('最高：' + jsonData.f7);
                                    $('.pdata table').find('tr').eq(1).find('td').eq(3).html('最低：' + jsonData.f8);

                                    //成交量，成交额，成交笔数，振幅
                                    $('.pdata table').find('tr').eq(2).find('td').eq(0).html('成交量：' + jsonData.f4/10000 + '万');
                                    $('.pdata table').find('tr').eq(2).find('td').eq(1).html('成交额(万元)：' + jsonData.f5);
                                    $('.pdata table').find('tr').eq(2).find('td').eq(2).html('成交笔数：' + jsonData.f6);
                                    $('.pdata table').find('tr').eq(2).find('td').eq(3).html('振幅(%)：' + jsonData.zhenfu);

                                    //买卖价
                                    var t1_html = "<table><tbody><tr><td>卖5</td><td>"+ jsonData.f14 +"</td><td>"+ jsonData.f15 +"</td></tr>";
                                    t1_html += "<tr><td>卖4</td><td>"+ jsonData.f16 +"</td><td>"+ jsonData.f17 +"</td></tr>";
                                    t1_html += "<tr><td>卖3</td><td>"+ jsonData.f18 +"</td><td>"+ jsonData.f19 +"</td></tr>";
                                    t1_html += "<tr><td>卖2</td><td>"+ jsonData.f20 +"</td><td>"+ jsonData.f21 +"</td></tr>";
                                    t1_html += "<tr><td>卖1</td><td>"+ jsonData.f22 +"</td><td>"+ jsonData.f23 +"</td></tr></tbody></table>";

                                    var t2_html = "<table><tbody><tr><td>买1</td><td>"+ jsonData.f24 +"</td><td>"+ jsonData.f25 +"</td></tr>";
                                    t2_html += "<tr><td>买2</td><td>"+ jsonData.f26 +"</td><td>"+ jsonData.f27 +"</td></tr>";
                                    t2_html += "<tr><td>买3</td><td>"+ jsonData.f28 +"</td><td>"+ jsonData.f29 +"</td></tr>";
                                    t2_html += "<tr><td>买4</td><td>"+ jsonData.f30 +"</td><td>"+ jsonData.f31 +"</td></tr>";
                                    t2_html += "<tr><td>买5</td><td>"+ jsonData.f32 +"</td><td>"+ jsonData.f33 +"</td></tr></tbody></table>";

                                    $('.details_right .right_data').eq(0).html(t1_html);
                                    $('.details_right .right_data').eq(1).html(t2_html);
                                    $('.details_right .current_price').find('td').eq(2).html(curpri_html);

                                    //fs_infos
                                    var fs_infos_open = '今开:' + todayOpen + space;
                                    var fs_infos_cur = '当前:' + jsonData.f3_float;
                                    fs_infos_cur += jsonData.zz > 0  ? "<span class='red_font'>(" + jsonData.updown + "%)</span>" :  "<span class='green_font'>(" + jsonData.updown + "%)</span>";
                                    var fs_infos_time = '时间:' + Highcharts.dateFormat('%H:%M', jsonData.f0);
                                    var fs_infos = fs_infos_open + fs_infos_cur + space + fs_infos_time;
                                    $('#si_fs_infos').html(fs_infos);

                                });
                            },60 * 1000);
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }

                }
            }
        },
        colors: ['#2f7ed8', '#2E84CC', '#8bbc21', '#910000', '#1aadce', 
   '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
        rangeSelector: {
            enabled: false
        },
        scrollbar: {
            enabled: false,
        },
        navigator: {
            enabled: false
        },

        title: {
            text: ''
        },
        credits: {
            // enabled: false.
            text: 'Chinaipo.com',
            href: 'http://www.chinaipo.com',
            position: {
                align: 'left',
                x: 350,
                y: -height - 26,
                style: {
                    cursor: 'pointer',
                    fontSize: '12px'
                }
            }
        },
        xAxis: [{
            min: min,
            max: max,
            gridLineWidth: 1,
            tickLength: 0,
            labels: {
                y: -height - 5,
                autoRotation: false,
                autoRotationLimit: 0,
                formatter: function() {
                    if (this.value === new Date(day + ' 11:30').getTime()) {
                        return '11:30/13:00';
                    }
                    return Highcharts.dateFormat('%H:%M', this.value);
                }
            },
            breaks: breaks,
            tickPositioner: function() {
                return [new Date(day + ' 09:30').getTime(), new Date(day + ' 10:30').getTime(),
				new Date(day + ' 11:30').getTime(), new Date(day + ' 14:00').getTime(), new Date(day + ' 15:00').getTime()]
            },
        }],
        yAxis: [{
            max:ymax,
            min:ymin,
            startOnTick:startOnTick,
            endOnTick:endOnTick,
            height: '70%',
            lineColor: '#C7CBD4',
            opposite: false,
            lineWidth: 1,
            labels: {
                x: 10,
                align: 'left',
                formatter: function() {
                    if(yesterdayClose == 0){
                        if(this.value == 0){
                            return '0.00';
                        }else{
                            return false;
                        }
                    }else{
                        if (this.value.toFixed(2) == yesterdayClose) {
                            return this.value.toFixed(2);
                        } else if (this.value > yesterdayClose) {
                            return '<span style="color:#D71720">' + this.value.toFixed(2) + '</span>';
                        } else {
                            return '<span style="color:#00a650">' + this.value.toFixed(2) + '</span>';
                        }
                    }
                }
            },
            showFirstLabel: true,
            showLastLabel: true,
            tickPositioner: function() {
                positions = cal_positions(timeLineData,yesterdayClose,caldatas);
                if(jsonData.yes == 0){
                    positions = [2.00,1.00,0.00,-1.00,-2.00];
                }
                return positions;
            },
            plotLines: [{
                value: yesterdayClose,
                width: 2,
                color: '#D71720',
                dashStyle: 'shortDot',
                label: {
                    y: 14
                }
            }],
        },
        {
            max:ymax,
            min:ymin,
            startOnTick:startOnTick,
            endOnTick:endOnTick,
            height: '70%',
            opposite: true,
            showFirstLabel: true,
            showLastLabel: true,
            gridLineWidth: 1,
            labels: {
                x: -10,
                align: 'right',
                formatter: function() {
                    if(yesterdayClose == 0){
                        if(this.value == 0){
                            return '0.00%'
                        }else{
                            return false;
                        }
                    }else{
                        var percent = (this.value - yesterdayClose) / yesterdayClose * 100,
                        flag = percent > 0 ? '+': '';
                        if (percent.toFixed(2) == 0) {
                            return percent.toFixed(2) + '%';
                        } else if (this.value > yesterdayClose) {
                            return '<span style="color:#D71720">' + flag + percent.toFixed(2) + '%</span>';
                        } else {
                            return '<span style="color:#00a650">' + flag + percent.toFixed(2) + '%</span>';
                        }
                    }
                }
            },
            showFirstLabel: false,
            tickPositioner: function() {
                return positions;
            }

        },
        {
            top: '77%',
            height: '23%',
            showFirstLabel: false,

            labels: {
                x: -10,
                align: 'right',
                formatter: function() {
                    return (this.value / 10000).toFixed(2) + '万';
                }
            }
        }],
        plotOptions: {
            series: {
                dataGrouping: {
                    enabled: false
                },
                pointPlacement: 'on'
            }
        },

        tooltip: {
            shared: true,
            useHTML: true,
            shadow: false,
            borderColor: "rgba(255, 255, 255, 0)",
            backgroundColor: "rgba(255, 255, 255, 0)",
            formatter: function() {
                yesterdayClose = Number(jsonData.yes);
                todayOpen = Number(jsonData.open);
                var points = this.points,
                percent = 0,
                str = '今开:' + todayOpen.toFixed(2) + space,
                time = '时间:' + Highcharts.dateFormat('%H:%M', this.points[0].x);

                // console.log(points);
                // str                
                Highcharts.each(points,
                function(p, i) {
                    if (i === 0) {
                        str += '当前:' + p.y.toFixed(2);
                    } else if (i === 1) {
                        if(yesterdayClose == 0){
                            str += "(0.00%)" + space;
                        }else{
                            percent = (p.y - yesterdayClose) / yesterdayClose * 100;
                            str += '<span style="color: ' + (percent > 0 ? '#D71720': '#00a650') + '">(' + percent.toFixed(2) + '%)</span>' + space;
                        }
                    }
                    // else if (i === 2) {
                    //     str += '成交量(万):' + (p.y / 10000).toFixed(2) + space
                    // }
                });

                str += time;

                $('#si_fs_infos').html(str);

            }
        },

        series: [{
            name: '开盘价',
            data: timeLineData,
            tooltip: {
                valueDecimals: 2
            },
            // color: Highcharts.getOptions().colors[1],
            lineWidth: 0,
            states: {
                hover: {
                    lineWidthPlus: 0,
                    lineWidth: 1
                }
            }
        },
        {
            name: '涨幅',
            data: timeLineData,
            yAxis: 1,
            zIndex: 10,
            lineWidth: 1,
            states: {
                hover: {
                    lineWidthPlus: 0,
                    lineWidth: 1
                }
            }

        },
        {
            name: '成交量',
            data: caldatas[4],
            yAxis: 2,
            type: 'column'
        }]
    });

}