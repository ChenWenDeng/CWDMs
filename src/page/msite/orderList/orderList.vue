<template>
    <div class="orderList-container">
        <ul class="title-ul">
            <li class="ellipsis">订单号</li>
            <li>下单时间</li>
            <li>用户账号</li>
            <li>订单金额</li>
            <li class="input-li">
                <input class="search-input" type="text" v-model="searchName" placeholder="输入关键字搜索">
            </li>
        </ul>
        <!-- ======================   全部商品列表  ==================== -->
        <div class="goods-container" v-if="searchName==''">
            <ul class="goods-ul" v-for="(goods, index) in orderList" :key="index">
                <li class="ellipsis">{{goods.orderId}}</li>
                <li>{{goods.createDate}}</li>
                <li>{{goods.userName}}</li>
                <li>{{goods.totalPrice}}</li>
                <li class="ellipsis"> 
                    <el-button @click="orderDetails(goods.orderId)" type="info" icon="el-icon-message" >查看订单</el-button>
                    <el-button @click="delOrder(goods.orderId)" type="danger" icon="el-icon-delete" circle></el-button>
                </li>
            </ul>
        </div>
        <!-- ======================   搜索商品列表  ==================== -->
        <div class="search-goods-container" v-if="searchCount!=0">
            <ul class="goods-ul" v-for="(goods, index) in searchList" :key="index">
                <li class="ellipsis">{{goods.orderId}}</li>
                <li>{{goods.createDate}}</li>
                <li>{{goods.userName}}</li>
                <li>{{goods.totalPrice}}</li>
                <li class="ellipsis"> 
                    <el-button @click="orderDetails(goods.orderId)" type="info" icon="el-icon-message" >查看订单</el-button>
                    <el-button @click="delOrder(goods.orderId)" type="danger" icon="el-icon-delete" circle></el-button>
                </li>
            </ul>
        </div>
         <!-- ======================   暂无数据  ==================== -->
        <h2 v-if="searchName!=''&&searchCount==0">暂无数据...</h2>
         <!-- ======================   分页栏  ==================== -->
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[4]" 
                                 
                layout="total, sizes, prev, pager, next, jumper"
                :total="searchList.length==0?tatolCount:searchCount" v-if="orderList.length !=0 || searchList.length!=0">    
        </el-pagination>
        <div class="view-container">
          <transition name="router-slid" mode="out-in">
            <router-view>
            </router-view>
          </transition>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            page:1, //当前第的页数
            pageSize:4, //一次有几条数据
            orderList:[],//接收商品列表
            tatolCount:0,//商品列表总数
            searchName:'',//搜索关键字
            searchList:[],//接收搜索商品列表
            searchCount:0,//搜索商品总数
            tiem : 0, //搜索的时间
        }
    },
    methods:{
        //点击分页
        handleCurrentChange(cpage) {
            if(this.searchList.length==0){
                this.page = cpage;
                this.init()
            }else{
                this.page = cpage;
                this.searchOrder()
            }
        },
        handleSizeChange(pageSize){
            this.pageSize = pageSize
        },
        //渲染订单列表
        init(){
          axios.post('api/orders/orderList', {
            page: this.page,
            pageSize:this.pageSize
          }).then((response) => {
            let res = response.data;
            if (res.status == '0') {
                console.log('成功')
                console.log(res.list)
                this.tatolCount = res.orderCount;
                this.orderList = res.list;
            } else {
              console.log('失败' + res.msg)
            }
          })
        },
        //删除订单
        delOrder(index){
            console.log(index)
            axios.post('api/orders/delOrder', {
                    orderId:index
              }).then((response) => {
              let res = response.data;
              if (res.status == '0') {
                  console.log('成功')
                  this.init()
              } else {
                console.log('失败' + res.msg)
              }
            })
        },
        //搜索商品关键字
        searchOrder(){
            console.log(this.searchName);
            axios.post('api/orders/searchOrder', {
                    searchName:this.searchName,
                    page: this.page,
                    pageSize:this.pageSize
            }).then((response) => {
            let res = response.data;
            if (res.status == '0') {
                        console.log('成功')
                        this.searchList = res.list
                        this.searchCount = res.searchCount
            } else {
              console.log('失败' + res.msg)
            }
          })
        },
        orderDetails(orderId){
          console.log(orderId)
          this.$router.push({path: '/msite/orderList/orderDetails', query: {orderId:orderId}});
        }
    },
    watch:{
        //监听搜索商品关键字
        searchName(val){
            if(val==''){
                this.searchList = []; //先把搜索列表清空
                this.searchCount = 0; //先把搜索商品总数清0
                this.init()
            }else if(val!=''){
                if(this.tiem==0){
                    this.tiem=1
                    this.searchCount = null; //防止数组没显示前出现暂无数据
                    this.orderList = [] //防止出现暂无数据也出现分页栏
                    this.intervalId = setTimeout(()=>{ //搜索延迟发请求
                        this.tiem--
                        if(this.item == 0){
                            clearTimeout(this.intervalId);
                        }
                        axios.post('api/orders/searchOrder', {
                            searchName: val,
                            page: this.page,
                            pageSize:this.pageSize
                        }).then((response) => {
                            let res = response.data;
                            if (res.status == '0') {
                                console.log('成功')
                                this.searchList = res.list
                                this.searchCount = res.searchCount
                            } else {
                                console.log('失败' + res.msg)
                            }
                        })
                    },200)
                }
            }
        }
        
    },
    mounted(){
        //渲染订单列表
        this.init()
    }
}
</script>

<style lang="scss" scoped>  
.orderList-container{
    h2{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 385px 0;
        background: #fff;
    }
    .title-ul{
        width: 100%;
        display: flex;
        align-items: center;
        background: #f3f3f3f3;
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
    .goods-container,.search-goods-container{
        background: #fff;
        min-height: 800px;
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
    .input-li{
      width: 300px !important;
    }
    .el-pagination{
        height: 8.25rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 3.125rem;
        text-align: right;
        background: #fff;
    }

  .view-container{
        // overflow: hidden;
        // position: absolute;
        // top: 60px;
        // left: 200px;
        // width: 82.4375rem;
        // height: 100%;
        // background: #000;
        // background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547747830330&di=76fc61899c3d282a51835a4b42f3d9a4&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201511%2F25%2F20151125141303_c2LyT.thumb.700_0.gif') ;
        // background-size:100% 100%;
		.router-slid-enter-active, .router-slid-leave-active {
				transition: all .6s;
		}
		.router-slid-enter, .router-slid-leave-active {
				transform: translate3d(60rem, 0, 0);
				opacity: 0;
		}
  }
}
</style>
