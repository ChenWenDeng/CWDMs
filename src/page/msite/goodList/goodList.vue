<template>
    <div class="goodsList-container">
        <ul class="title-ul">
            <li>商品ID</li>
            <li>缩略图</li>
            <li class="ellipsis">商品名称</li>
            <li>单价</li>
            <li>商品动画</li>
            <li>
                <input class="search-input" type="text" v-model="searchName" placeholder="输入关键字搜索">
            </li>
        </ul>
        <!-- ======================   全部商品列表  ==================== -->
        <div class="goods-container" v-if="searchName==''">
            <ul class="goods-ul" v-for="(goods, index) in goodsList" :key="index">
                <li>{{goods.productId}}</li>
                <li>
                    <img v-lazy="goods.productImage" :key="goods.productImage" alt="">
                </li>
                <li class="ellipsis">{{goods.productName}}</li>
                <li>{{goods.salePrice}}</li>
                <li>{{goods.direction}}</li>
                <li> 
                    <el-button type="primary" icon="el-icon-edit" circle></el-button>
                    <el-button @click="delGoods(goods.productId)" type="danger" icon="el-icon-delete" circle></el-button>
                </li>
            </ul>
        </div>
         <!-- ======================   搜索商品列表  ==================== -->
        <div class="search-goods-container" v-if="searchCount!=0">
            <ul class="goods-ul" v-for="(goods, index) in searchList" :key="index">
                <li>{{goods.productId}}</li>
                <li>
                    <img v-lazy="goods.productImage" :key="goods.productImage" alt="">
                </li>
                <li class="ellipsis">{{goods.productName}}</li>
                <li>{{goods.salePrice}}</li>
                <li>{{goods.direction}}</li>
                <li> 
                    <el-button type="primary" icon="el-icon-edit" circle></el-button>
                    <el-button @click="delGoods(goods.productId)" type="danger" icon="el-icon-delete" circle></el-button>
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
                :page-sizes="[8]" 
                                 
                layout="total, sizes, prev, pager, next, jumper"
                :total="searchList.length==0?tatolCount:searchCount" v-if="goodsList.length !=0 || searchList.length!=0">    
        </el-pagination>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            page:1, //当前第的页数
            pageSize:8, //一次有几条数据
            goodsList:[],//接收商品列表
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
                this.searchGoods()
            }
        },
        handleSizeChange(pageSize){
            this.pageSize = pageSize
        },
        //渲染商品列表
        init(){
            axios.post('api/goods', {
                    page: this.page,
                    pageSize:this.pageSize
				}).then((response) => {
				let res = response.data;
				if (res.status == '0') {
                    console.log('成功')
                    this.tatolCount = res.tatolCount;
                    this.goodsList = res.list;
                    this.$store.dispatch('recordGoodsList',this.goodsList)
                    this.$store.dispatch('recordGoodsTatolCount',this.tatolCount)
				} else {
					console.log('失败' + res.msg)
				}
			})
        },
        //删除商品
        delGoods(index){
            console.log(index)
            axios.post('api/goods/delGoods', {
                    productId:index
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
        searchGoods(){
            console.log(this.searchName);
            axios.post('api/goods/searchGoods', {
                    productName:this.searchName,
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
                    this.goodsList = [] //防止出现暂无数据也出现分页栏
                    this.intervalId = setTimeout(()=>{ //搜索延迟发请求
                        this.tiem--
                        if(this.item == 0){
                            clearTimeout(this.intervalId);
                        }
                        axios.post('api/goods/searchGoods', {
                            productName: val,
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
        //渲染商品列表
        this.init()
    }
}
</script>

<style lang="scss" scoped>  
.goodsList-container{
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
                }
                img{
                    width: 5rem;
                    height: 5rem;
                }
            }
        }
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
}
</style>
