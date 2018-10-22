////url:https://jshare.com.cn/highstock/hhhhvr?hc-theme=dark-unica
var seriesOptions = [],
	seriesCounter = 0,
	names = ['MSFT', 'AAPL', 'GOOG'],
	// create the chart when all data is loaded
	createChart = function () {
		Highcharts.stockChart('container', {
			rangeSelector: {
				selected: 4
			},
			xAxis: {
				tickInterval: 7 * 24 * 3600 * 1000, // 坐标轴刻度间隔为一星期
				tickWidth: 0,
				gridLineWidth: 1,
				labels: {
					align: 'left',
					x: 3,
					y: -3
				},
				// 时间格式化字符
				// 默认会根据当前的刻度间隔取对应的值，即当刻度间隔为一周时，取 week 值
				dateTimeLabelFormats: {
					week: '%Y-%m-%d'
				}
			},
			yAxis: {
				labels: {
					formatter: function () {
						return (this.value > 0 ? ' + ' : '') + this.value + '%';
					}
				},
				plotLines: [{
					value: 0,
					width: 2,
					color: 'silver'
				}]
			},
			plotOptions: {
				series: {
					compare: 'percent'
				}
			},
			tooltip: {
				pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
				valueDecimals: 2
			},
			series: seriesOptions
		});
	};
$.each(names, function (i, name) {
	$.getJSON('https://data.jianshukeji.com/jsonp?filename=json/' + name.toLowerCase() + '-c.json&callback=?',    function (data) {
		seriesOptions[i] = {
			name: name,
			data: data
		};
		// As we're loading the data asynchronously, we don't know what order it will arrive. So
		// we keep a counter and create the chart when all the data is loaded.
		seriesCounter += 1;
		if (seriesCounter === names.length) {
			createChart();
			alert(1111111)
		}
	});
});