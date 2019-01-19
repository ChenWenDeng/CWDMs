<template>
    <div class="rating_page">
        <router-link to="/msite/orderList" tag="el-button" type="info" icon="el-icon-message" circle>返回</router-link>
        <div class="details-container">
            <!-- <router-link to="/msite/orderList" tag="el-button" type="info" icon="el-icon-message" circle>返回</router-link> -->
            <span class="title1">基本信息</span>
            <ul class="title-ul">
                <li class="ellipsis">订单号</li>
                <li class="ellipsis">下单时间</li>
                <li>用户账号</li>
                <li>订单金额</li>
            </ul>
            <!-- ======================   对应订单详情列表  ==================== -->
            <div class="goods-container">
                <!-- <ul class="goods-ul" v-for="(goods, index) in orderDetailsList" :key="index"> -->
                <ul class="goods-ul">
                    <li class="ellipsis">{{orderDetailsList.phone}}</li>
                    <li class="ellipsis">{{orderDetailsList.createDate}}</li>
                    <li>{{orderDetailsList.userName}}</li>
                    <li>{{orderDetailsList.totalPrice}}</li>
                </ul>
            </div>
        </div>
        <!-- ======================   对应收货人信息  ==================== -->
        <div class="details-container">
            <span class="title">收货人信息</span>
            <ul class="title-ul">
                <li class="ellipsis">收货地址</li>
                <li>具体地址</li>
                <li>邮编号码</li>
                <li>收货电话</li>
                <li>收货人</li>
            </ul>
            <div class="goods-container">
                <!-- <ul class="goods-ul" v-for="(goods, index) in orderDetailsList" :key="index"> -->
                <ul class="goods-ul">
                    <li class="ellipsis">{{orderDetailsList.addressInfo.cityName}}</li>
                    <li>{{orderDetailsList.addressInfo.streeName}}</li>
                    <li>{{orderDetailsList.addressInfo.postCode}}</li>
                    <li>{{orderDetailsList.addressInfo.tel}}</li>
                    <li>{{orderDetailsList.addressInfo.userName}}</li>
                </ul>
            </div>
        </div>
        <!-- ======================   对应收货人信息  ==================== -->
        <div class="details-container">
            <span class="title">商品信息</span>
            <ul class="title-ul">
                <li>商品ID</li>
                <li>商品图片</li>
                <li class="ellipsis">商品名称</li>
                <li>单价</li>
                <li>数量</li>
                <li>小计</li>
            </ul>
            <div class="goods-container">
                <ul class="goods-ul" v-for="(goods, index) in orderDetailsList.goodsList" :key="index">
                <!-- <ul class="goods-ul"> -->
                    <li>{{goods.productId}}</li>
                     <li>
                         <img :src="goods.smImg[0]" alt="">
                     </li>
                    <li class="ellipsis">{{goods.productName}}</li>
                    <li>{{goods.salePrice}}</li>
                    <li>{{goods.num}}</li>
                    <li>{{goods.salePrice*goods.num}}</li>
                </ul>
            </div>
            <p>合计：<span>{{orderDetailsList.totalPrice}}</span></p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            orderId: 0 ,//orderList页面传来的对应订单id
            orderDetailsList:[], //订单详情列表
        }
    },
    methods:{
        init(){
            axios.post('api/orders/orderDetails', {
                    orderId:this.orderId
                }).then((response) => {
                let res = response.data;
                if (res.status == '0') {
                    console.log('成功')
                    console.log(res.list)
                    this.orderDetailsList = res.list;
                } else {
                console.log('失败' + res.msg)
                }
            })
        }
    },
    mounted(){
        this.orderId = this.$route.query.orderId
        console.log(this.orderId)
        //渲染订单列表
        this.init()
    }
    
}
</script>

<style lang="scss" scoped>  
.rating_page{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 202;
    // padding-top: 2.5rem;
    .el-button{
           margin:10px 0.625rem;
           padding:10px 50px;
       }
    .details-container{
        width: 90%;
        padding-top:0.625rem;
        margin: 20px auto;
        // height: 300px;
        p{
            padding: 10px 0;
            text-align: right;
            padding-right:90px;
            span{
                font-size: 20px;
                color: red;
            }
        }
        .title1{
            display: inline-block;
            width: 100%;
            text-align: center;
            // margin-left: 10px;
            font-weight: bold;
            padding: 10px 0;
            background: #808080;
            color: #fff;
        }
        .title{
            display: inline-block;
            width: 100%;
            text-align: center;
            // margin-left: 105px;
            font-weight: bold;
            padding: 10px 0;
            background: #808080;
            color: #fff;
        }
    //    .el-button{
    //        margin:0 0.625rem;
    //        margin-bottom: 0.625rem;
    //        padding:10px 50px;
    //    }
        .title-ul{
            width: 100%;
            display: flex;
            align-items: center;
            background: #f3f3f3f3;
            border: 1px solid #ccc;
            border-bottom: none;
            li{
                width: 12.5rem;
                padding: 0.625rem 1.25rem;
                display: flex;
                justify-content: center;
                &.ellipsis{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 18.75rem;
                    height: 3.125rem;
                }
                .search-input{
                    width: 200px;
                    border-radius: 5px;
                    border: 1px solid #000;
                    font-size: 13px;
                    padding: 0.3125rem 0.825rem;
                }
            }
        }
        .goods-container,{
            background: #fff;
             border: 1px solid #ccc;
             border-top: none;
            // min-height: 800px;
            .goods-ul{
                width: 100%;
                display: flex;
                background: #fff;
                &.goods-ul:hover{
                    background: #f5f5f8;
                    cursor:pointer;
                }
                li{
                    width: 12.5rem;
                    padding: 0.625rem 1.25rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &.ellipsis{
                        display: inline-block;
                        width: 18.75rem;
                        height: 6.25rem;
                        line-height: 5rem;
                        text-align: center;
                    }
                    img{
                        width: 5rem;
                        height: 5rem;
                    }
                }
            }
        }
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
}
</style>
