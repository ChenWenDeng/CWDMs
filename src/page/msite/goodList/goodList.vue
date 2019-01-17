<template>
    <div class="goodsList-container">
        <ul class="title-ul">
            <li>商品ID</li>
            <li>缩略图</li>
            <li class="ellipsis">商品名称</li>
            <li>单价</li>
            <li>商品动画</li>
            <li>操作</li>
        </ul>
        <div class="goods-container">
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
                    <el-button type="danger" icon="el-icon-delete" circle></el-button>
                </li>
            </ul>
        </div>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[8]" 
                                 
                layout="total, sizes, prev, pager, next, jumper"
                :total="tatolCount">    
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
        }
    },
    methods:{
        handleCurrentChange(cpage) {
            this.page = cpage;
            this.init()
        },
        handleSizeChange(pageSize){
            this.pageSize = pageSize
        },
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
                    console.log(this.goodsList)
                    this.$store.dispatch('recordGoodsList',this.goodsList)
                    this.$store.dispatch('recordGoodsTatolCount',this.tatolCount)
				} else {
					console.log('失败' + res.msg)
				}
			})
        },
    },
    mounted(){
        this.init()
    }
}
</script>

<style lang="scss" scoped>  
.goodsList-container{
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
                justify-content: center;
                width: 18.75rem;
                height: 3.125rem;
            }
        }
    }
    .goods-container{
        min-height: 50rem;
        background: #fff;
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
