<template>
    <div class="home-container">
        <div class="statistics-box">
            <p>数据统计</p>
            <ul>
                <li>
                    <div class="iconfont icon-shangpin-"></div>
                    商品总数
                    <div class="data-li">{{goodsNum}}</div>
                </li>
                <li>
                    <div class="iconfont icon-dingdan"></div>
                    订单总数
                    <div class="data-li">{{orderNum}}</div>
                </li>
                <li>
                    <div class="iconfont icon-yonghu"></div>
                    注册用户
                    <div class="data-li">{{userNum}}</div>
                </li>
            </ul>
            <ul>
                <li class="day-li">
                    <div class="iconfont icon-yonghu"></div>
                    当天注册用户
                    <div class="data-li days-li">{{dayUser}}</div>
                </li>
                <li class="day-li">
                    <div class="iconfont icon-dingdan"></div>
                    当天订单数量
                    <div class="data-li days-li">{{dayOrder}}</div>
                </li>
            </ul>
        </div>
        <div class="header-box">
            <span><i></i>当天用户</span>
            <span class="span2"><i></i>当天订单</span>
        </div>
        <div class="power_chart">
                <chart :options="operationAnalysisOfAssetAllocation" style="width: 100%;height:100%;" ref="echarts1" ></chart>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
//引入封装的时间戳转日期js文件
import date from '@/assets/js/time.js'
export default {
    data(){
        return{
            goodsCount:0,//商品总数
            dayUser:0,//当天用户数量
            userCount:0,//用户总数
            dayUserList:[],//当天用户数量数组
            dayOrderList:[],//当天订单数量数组
            dayOrder:0,//当天用户数量
            orderCount:0,//用户总数
            goodsNum:0,//商品数量计时
            userNum:0,//用户数量计时
            orderNum:0,//订单数量计时
            day1 : 0, //第一天时间戳
            day2 : 0, //第二天时间戳
            day3 : 0, //第三天时间戳
            day4 : 0, //第四天时间戳
            day5 : 0, //第五天时间戳
            day6 : 0, //第六天时间戳
            day7 : 0, //第七天时间戳
            myDate1:0, //第一天
            myDate2:0, //第二天
            myDate3:0, //第三天
            myDate4:0, //第四天
            myDate5:0, //第五天
            myDate6:0, //第六天
            myDate7:0, //第七天
            detaList:[], //折线图x轴 1-7日期
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
                        data: [],
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
    methods:{
        //日期
        dates(){
            this.myDate7 = date.date(this.day7)
            this.myDate6 = date.date(this.day6)
            this.myDate5 = date.date(this.day5)
            this.myDate4 = date.date(this.day4)
            this.myDate3 = date.date(this.day3)
            this.myDate2 = date.date(this.day2)
            this.myDate1 = date.date(this.day1)
        },
        timeNum(){
            this.intervalId = setInterval(()=>{
                this.goodsNum++
                if(this.goodsNum==this.goodsCount){
                        //停止计时
                    clearInterval(this.intervalId)
                }
            },50)
            this.intervalId1 = setInterval(()=>{
                this.orderNum++
                if(this.orderNum==this.orderCount){
                        //停止计时
                    clearInterval(this.intervalId1)
                }
            },50)
            this.intervalId2 = setInterval(()=>{
                this.userNum++
                if(this.userNum==this.userCount){
                        //停止计时
                    clearInterval(this.intervalId2)
                }
            },200)
        }
    },
    mounted(){
        this.day7 = new Date().getTime(); 
        this.day6 = new Date().getTime()-(1000*60*60*24); 
        this.day5 = new Date().getTime()-(1000*60*60*24*2); 
        this.day4 = new Date().getTime()-(1000*60*60*24*3); 
        this.day3 = new Date().getTime()-(1000*60*60*24*4); 
        this.day2 = new Date().getTime()-(1000*60*60*24*5); 
        this.day1 = new Date().getTime()-(1000*60*60*24*6); 

        //调用时间戳转日期方法
        this.dates()

        //折线图x轴日期数据
        this.detaList=[this.myDate1,this.myDate2,this.myDate3,this.myDate4,this.myDate5,this.myDate6,this.myDate7]
        console.log(this.detaList)

        //折线图x轴动态加载日期数据
        this.operationAnalysisOfAssetAllocation.xAxis.data = this.detaList
        //折线图订单动态加载数据
        this.operationAnalysisOfAssetAllocation.series[0].data = this.dayOrderList
        //折线图用户动态加载数据
        this.operationAnalysisOfAssetAllocation.series[1].data = this.dayUserList

        //获取商品数量
        axios.get('api/goods/goodsCount').then((response) => {
				let res = response.data;
				if (res.status == '0') {
                    console.log('成功')
                    this.goodsCount = res.goodsCont
				} else {
					console.log('失败' + res.msg)
				}
        })
        //获取用户数量
        axios.get('api/users/usersNum').then((response) => {
				let res = response.data;
				if (res.status == '0') {
                    console.log('成功')
                    this.dayUser = res.result.count;
                    this.userCount = res.result.userCount;

                    this.dayUserList.push(res.result.dayOneUser)
                    this.dayUserList.push(res.result.dayTwoUser)
                    this.dayUserList.push(res.result.dayThreeUser)
                    this.dayUserList.push(res.result.dayFourUser)
                    this.dayUserList.push(res.result.dayFiveUser)
                    this.dayUserList.push(res.result.daySixUser)
                    this.dayUserList.push(res.result.count)
				} else {
					console.log('失败' + res.msg)
				}
        })
        //获取订单数量
        axios.get('api/orders/orderNum').then((response) => {
				let res = response.data;
				if (res.status == '0') {
                    console.log('成功')
                    this.dayOrder = res.result.count;
                    this.orderCount = res.result.orderCount;
                    this.dayOrderList.push(res.result.dayOneOrder)
                    this.dayOrderList.push(res.result.dayTwoOrder)
                    this.dayOrderList.push(res.result.dayThreeOrder)
                    this.dayOrderList.push(res.result.dayFourOrder)
                    this.dayOrderList.push(res.result.dayFiveOrder)
                    this.dayOrderList.push(res.result.daySixOrder)
                    this.dayOrderList.push(res.result.count)

                    console.log(this.dayOrderList)
				} else {
					console.log('失败' + res.msg)
				}
        })
        //渲染数据
        this.timeNum()
    },
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
    height: 61.875rem;
    .header-box{
        width: 100%;
        text-align: center;
        display: flex;
        justify-content: center;
        margin-top:5.25rem;
        span{
            display: flex;
            align-items: center;
            i{
                display: inline-block;
                width:3.125rem;
                height: 0.3125rem;
                background: rgb(230, 28, 28);
            }
        }
        .span2{
            margin-left: 1rem;
            i{
                background: rgb(226, 117, 54);
            }
        }
    }
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
            padding-left: 3.4375rem;
            display: flex;
            justify-content: center;
            margin: 1rem 0;
            li{
                display: flex;
                align-items: center;
                justify-content: center;
                height: 6.25rem;;
                padding: 0.625rem;
                padding-right: 0px;
                margin-right: 3rem;
                background: rgb(56, 140, 196);
                color: #fff;
                font-size: 1.25rem;
                .iconfont{
                    font-size: 1.875rem;
                    color:#fff;
                    margin-right: 0.3125rem;
                }
                .data-li{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 7.375rem;
                    height: 100px;;
                    padding: 0.625rem;
                    margin-left: 0.9375rem;
                    background:rgb(90, 100, 100);
                    color: #fff;
                    font-size: 1.75rem;
                }
            }
            .day-li{
                width: 410px;
                background: rgb(30, 119, 122);
                .days-li{
                    width: 230px;
                    background: rgb(205, 210, 211);
                    font-size: 50px;
                    color:rgb(248, 94, 94);
                }
            }
       }
    }
}
</style>
