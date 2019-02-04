<template>
    <div class="chart-container">
        <h2>用户分布</h2>
        <div class="power_chart">
            <e-charts style="width:100%;height:600px" :options="chartOption"></e-charts>
        </div>
    </div>
</template>

<script>
import ECharts from 'vue-echarts/components/ECharts'
require('echarts/lib/chart/bar');

export default {
    components: {ECharts},
    data() {
      return {
        chartOption: {
          grid: {left: 30, top: 30, right: 30, bottom: 30},
          xAxis: {
            type: 'category',
            axisLine: {show: false},
            axisTick: {show: false},
            axisLabel: {color: '#999'},
            data: ['北京', '上海', '深圳', '广州', '杭州', '南京', '重庆', '成都', '长沙', '武汉']
          },
          yAxis: [
            {
              splitNumber: 5,
              scale: true,
              splitLine: {show: true, lineStyle: {color: ['#b6b6b6'], opacity: 0.1}},
              axisLine: {show: false},
              axisTick: {show: false},
              type: 'value',
              name: '',
              nameTextStyle: {
                fontFamily: 'MicrosoftYaHei',
                fontSize: 12,
                color: 'rgba(255,255,255,0.6)',
                align: 'left'
              },
              nameGap: 25,
              axisLabel: {formatter: '{value}', color: '#999'}
            }
          ],
          series: [
            {
              name: '收入',
              type: 'bar',
              stack: '总量',
              label: {normal: {show: true, position: 'top', color: 'rgba(255,255,255,0.6)'}},
              itemStyle: {
                normal: {
                  barBorderRadius: 4,
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: '#E93D3D'
                    }, {
                      offset: 1, color: '#EE7B53'
                    }]
                  }}},
              barWidth: 50,
              data: [7, 2, 20, 8, 31, '-', '-', '-', '-', '-']
            },
            {
              name: '支出',
              type: 'bar',
              stack: '总量',
              label: {normal: {show: true, position: 'top', color: 'rgba(255,255,255,0.6)'}},
              itemStyle: {
                normal: {
                  barBorderRadius: 4,
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: '#4CC453'
                    }, {
                    //   offset: 1, color: '#96D056'
                        offset: 1, color: '#96D'
                    }]
                  }}},
              barWidth: 18,
              data: [ '-', '-', '-', '-', '-', 46, 40, 16, 8, 9]
            }
          ]
        }
      };
    }
  }
</script>

<style lang="scss" scoped> 
.chart-container{
    min-height: 700px;
    padding:0px 50px;
    background: rgb(75, 73, 73);
    h2{
        width: 100%;
        text-align: center;
        padding: 25px 0;
        color: #fff;
    }
}
</style>

