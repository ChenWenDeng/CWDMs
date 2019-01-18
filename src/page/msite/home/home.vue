<template>
    <div class="home-container">
        <div class="statistics-box">
            <p>数据统计</p>
            <ul>
                <li>当日数据</li>
                <li>新增用户</li>
                <li>新增订单</li>
            </ul>
            <ul>
                <li>总数据</li>
                <li>注册用户</li>
                <li>总订单</li>
            </ul>
        </div>
        <div class="power_chart">
                <chart :options="operationAnalysisOfAssetAllocation" style="width: 100%;height:100%;" ref="echarts1" ></chart>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            operationAnalysisOfAssetAllocation: {
                    // 提示框
                    tooltip: {
                        trigger: "axis",
                        position: pt => {
                            return [pt[0], "10%"];
                        }

                    },
                    // 图表在盒子的位置
                    grid: {
                        left: 47,
                        right: 40,
                        bottom: 40
                    },
                    backgroundColor: "#212427",
                    legend: {
//                         data: ["该基金", "私募全市场"],
//                         icon: "rect", //设置图例的图形形状，circle为圆，rect为矩形
//                         itemWidth: 15, //图例标记的图形宽度[ default: 25 ]
//                         itemHeight: 15, //图例标记的图形高度。[ default: 14 ]
//                         // itemGap: 30, //图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。[ default: 10 ]
//                         top: 20, //图例组件离容器右侧的距离
//                         textStyle: {
//                             fontSize: 12,
//                             color: "#ccc"
//                         }
                    },
                    color: ["#D96D32", "#74404A"],
                    xAxis: {
                        type: "category",
                        boundaryGap: false,
                        data: ['2019-01-11', '2019-01-12', '2019-01-13', '2019-01-14', '2019-01-15', '2019-01-16', '2019-01-17'],
                        // scale:false,
                        axisLine: {
                            lineStyle: {
                                color: "#979797" //坐标轴线线的颜色。
                            }
                        }             
                    },
                    yAxis: {
                        type: "value",
                        boundaryGap: [0, "100%"],
                        splitLine: {
                        show: true,
                        lineStyle: {
                            type: "dashed",
                            color: "#404243",
                            width: 1
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#979797" //坐标轴线线的颜色。
                            }
                        }
                    },
                    // 底部滑动区域
                    dataZoom: [{
                        type: "inside",
                        start: 0,
                        end: 100
                    },{
                        start: 0,
                        end: 10,
                        handleSize: "80%",
                        handleStyle: {
                            color: "#fff",
                            shadowBlur: 3,
                            shadowColor: "rgba(0, 0, 0, 0.6)",
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        },
                        show: false,
                        bottom: "auto",
                        realtime: true,
                        start: 0,
                        end: 100,
                        textStyle: {
                            color: "#fff"
                        },
                        dataBackground: {
                            areaStyle: {
                                color: "#fff"
                            },
                            lineStyle: {
                                color: "#fff"
                            }
                        }
                    }],
                    series: [{
                        name: "新增用户",
                        type: "line",
                        smooth: true,
                        // symbol: "none",
                        showSymbol: false,
                        areaStyle: {normal: {}},
                        data:[22, 36, 52, 34,22, 36, 52, 34]
                    },{
                        name: "新增订单",
                        type: "line",
                        smooth: true,
                        // symbol: "none",
                        showSymbol: false,
                        areaStyle: {normal: {}},
                        data:[70, 3,2,23,70, 3,2,23]
                    },
                    ]
                },
        }
    },
    mounted(){
    }
}
</script>

<style lang="scss" scoped>  
.power_chart{
    width: 62.5rem;
    height: 25rem;
    margin: 1.25rem auto;
}
.home-container{
    background: #fff;
    height: 990px;
    .statistics-box{
       p{
            width: 100%;
            padding: 1.25rem;
            text-align: center;
            font-size: 1.875rem;
       }
       ul{
            width: 100%;
            padding: 0.3125rem;
            display: flex;
            justify-content: center;
            li{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 12.5rem;
                // border: 0.0625rem s/olid #000;
                padding: 0.625rem;
                margin-right: 0.8125rem;
                background: darkcyan;
                color: #fff;
            }
       }
    }
}
</style>
