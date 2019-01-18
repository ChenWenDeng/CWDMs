<template>
    <div class="usersList-container">
        <ul class="title-ul">
            <li>用户ID</li>
            <li>用户名称</li>
            <li class="ellipsis">手机号码</li>
            <li>邮箱地址</li>
            <li>创建时间</li>
            <li>
                <input class="search-input" type="text" v-model="searchName" placeholder="输入关键字搜索">
            </li>
            <li class="icon-li"></li>
        </ul>
        <!-- ======================   全部用户列表  ==================== -->
        <div class="goods-container" v-if="searchName==''">
          <el-collapse accordion>
            <el-collapse-item @click.native="dianji(index)" v-for="(user,index) in userList" :key="index">
              <template  slot="title">
                <ul class="goods-ul" :class="{check:checkIndex==index}">
                  <li> {{user.userId}}</li>
                  <li> {{user.userName}}</li>
                  <li class="ellipsis"> {{user.phone}}</li>
                  <li> {{user.eliam}}</li>
                  <li> {{user.createDate}}</li>
                  <li> 
                    <el-button type="primary" icon="el-icon-edit" circle></el-button>
                    <el-button @click="delUser(user.userId)" type="danger" icon="el-icon-delete" circle></el-button>
                  </li>
                  <li class="icon-li iconfont" :class="{'icon-ziyuanldpi':checkIndex==index}"></li>
                </ul>
              </template>
              <ul class="children-ul" v-if="user.cartList.length!=0">
                <li>商品id</li>
                <li>商品图片</li>
                <li class="ellipsis">商品名称</li>
                <li>单价</li>
                <li>数量</li>
                <li>选中状态</li>
              </ul>
              <h1 v-if="user.cartList.length==0">用户购物车暂未添加任何商品！<span class="iconfont icon-meiyoudingdan-01"></span></h1>
              <ul class="goods-ul" v-for="(useres,index) in user.cartList" :key="index">
                  <li v-for="(carts,index) in useres.details"> {{carts.productId}}</li>
                  <li v-for="(carts,index) in useres.details">
                    <img :src="carts.smImg[0]" alt="">
                  </li>
                  <li class="ellipsis" v-for="(carts,index) in useres.details"> {{carts.productName}}</li>
                  <li v-for="(carts,index) in useres.details"> {{carts.salePrice}}</li>
                  <li v-for="(carts,index) in useres.details"> {{carts.num}}</li>
                  <li v-for="(carts,index) in useres.details"> {{carts.checked==1?'选中':'未选中'}}</li>
                </ul>
            </el-collapse-item>  
          </el-collapse>
        </div>

         <!-- ======================   搜索用户列表  ==================== -->
        <div class="goods-container" v-if="searchCount!=0">
          <el-collapse accordion>
            <el-collapse-item @click.native="dianji(index)" v-for="(user,index) in searchList" :key="index">
              <template  slot="title">
                <ul class="goods-ul" :class="{check:checkIndex==index}">
                  <li> {{user.userId}}</li>
                  <li> {{user.userName}}</li>
                  <li class="ellipsis"> {{user.phone}}</li>
                  <li> {{user.eliam}}</li>
                  <li> {{user.createDate}}</li>
                  <li> 
                    <el-button type="primary" icon="el-icon-edit" circle></el-button>
                    <el-button @click="delGoods(goods.productId)" type="danger" icon="el-icon-delete" circle></el-button>
                  </li>
                  <li class="icon-li iconfont" :class="{'icon-ziyuanldpi':checkIndex==index}"></li>
                </ul>
              </template>
              <ul class="children-ul" v-if="user.cartList.length!=0">
                <li>商品id</li>
                <li>商品图片</li>
                <li class="ellipsis">商品名称</li>
                <li>单价</li>
                <li>数量</li>
                <li>选中状态</li>
              </ul>
              <h1 v-if="user.cartList.length==0">用户购物车暂未添加任何商品！<span class="iconfont icon-meiyoudingdan-01"></span></h1>
              <ul class="goods-ul" v-for="(useres,index) in user.cartList" :key="index">
                  <li v-for="(carts,index) in useres.details"> {{carts.productId}}</li>
                  <li v-for="(carts,index) in useres.details">
                    <img :src="carts.smImg[0]" alt="">
                  </li>
                  <li class="ellipsis" v-for="(carts,index) in useres.details"> {{carts.productName}}</li>
                  <li v-for="(carts,index) in useres.details"> {{carts.salePrice}}</li>
                  <li v-for="(carts,index) in useres.details"> {{carts.num}}</li>
                  <li v-for="(carts,index) in useres.details"> {{carts.checked==1?'选中':'未选中'}}</li>
                </ul>
            </el-collapse-item>  
          </el-collapse>
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
                :total="searchList.length==0?usersCount:searchCount" v-if="userList.length !=0 || searchList.length!=0">    
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
            userList:[],//接收商品列表
            searchName:'',//搜索关键字
            searchList:[],//接收搜索商品列表
            searchCount:0,//搜索商品总数
            tiem : 0, //搜索的时间
            checkIndex:0, //点击ul样式
            usersCount:0, //用户总数
        }
    },
    methods:{
      dianji(index){
        this.checkIndex = index;
      },
        //点击分页
        handleCurrentChange(cpage) {
            if(this.searchList.length==0){
                this.page = cpage;
                this.init()
            }else{
                this.page = cpage;
                this.searchUser()
            }
        },
        handleSizeChange(pageSize){
            this.pageSize = pageSize
        },
        //渲染商品列表
        init(){
            axios.post('api/users/userList', {
              page: this.page,
              pageSize:this.pageSize
            }).then((response) => {
            let res = response.data;
            if (res.status == '0') {
                console.log('成功')
                this.userList = res.list
                this.usersCount = res.usersCount;
                console.log(this.userList)
            } else {
              console.log('失败' + res.msg)
            }
          })
        },
        //删除商品
        delUser(userId){
            console.log(userId)
            axios.post('api/users/delUser', {
                    userId:userId
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
        searchUser(){
            console.log(this.searchName);
            axios.post('api/users/searchUser', {
                    userName:this.searchName,
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
                    this.userList = [] //防止出现暂无数据也出现分页栏
                    this.intervalId = setTimeout(()=>{ //搜索延迟发请求
                        this.tiem--
                        if(this.item == 0){
                            clearTimeout(this.intervalId);
                        }
                        axios.post('api/users/searchUser', {
                            userName: val,
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
<style lang="scss">
.usersList-container{
    .el-collapse-item__header{
      height: 100px;
    }
}
</style>

<style lang="scss" scoped>

.usersList-container{
  h1{
    text-align:center;
    .iconfont{
      font-size:30px;
    }
  }
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
        .check{
          background:red;
        }
        .children-ul{
          width: 100%;
          padding:5px 0;
          display: flex;
          background: #808080;
          color:#fff;
          li{
            width: 12.5rem;
            padding: 0.625rem 1.25rem;
            display: flex;
            justify-content: center;
            align-items: center;
            &.ellipsis{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 18.75rem;
                height: 3.125rem;
            }
          }
        }
        .goods-ul{
            width: 100%;
            height: 100px;
            display: flex;
            background: #fff;
            border-top:1px solid #ebeef5;
            border-bottom:1px solid #ebeef5;
            &.check{
              background:		#F0F8FF;
            }
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
                    height: 6.25rem;
                    line-height: 5rem;
                    text-align:center;
                    align-items: center;
                    justify-content: center;
                    width: 18.75rem;
                }
                img{
                    width: 5rem;
                    height: 5rem;
                }
            }
            .icon-ziyuanldpi{
             color: #32CD32;
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
  .icon-li{
    width:100px !important;
  }
}
</style>
