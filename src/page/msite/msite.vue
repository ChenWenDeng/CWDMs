<template>
    <div class="page-container">
        <el-container>
            <el-header >
                <div class="logoName">
                    <router-link to="/msite/home">
                        Eend商城后台管理系统
                    </router-link>
                </div>
                <span class="logout-span" @click="logout">
                    {{adminName}}
                    <span v-if="adminName">退出</span>
                </span>
            </el-header>
            <el-aside width="200px">
                <el-menu :default-openeds="['1', '3']">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-document"></i>数据管理</template>
                        <el-menu-item-group>
                        <router-link to="/msite/userList">
                            <el-menu-item index="1-1">
                                用户列表
                            </el-menu-item>
                        </router-link>
                        <router-link to="/msite/goodList">
                            <el-menu-item index="1-2">
                                商品列表
                            </el-menu-item>
                        </router-link>
                        <router-link to="/msite/orderList">
                            <el-menu-item index="1-3">
                                订单列表
                            </el-menu-item>
                        </router-link>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-plus"></i>添加数据</template>
                        <el-menu-item-group>
                            <router-link to="/msite/addGoods">
                                 <el-menu-item index="2-1">添加商品</el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-star-on"></i>图表</template>
                        <el-menu-item-group>
                        <router-link to="/msite/chart">
                            <el-menu-item index="3-1">
                                用户分布
                            </el-menu-item>
                        </router-link>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-edit"></i>编辑</template>
                        <el-menu-item-group>
                        <!-- <router-link to=""> -->
                            <el-menu-item index="4-1">
                                文本编辑
                            </el-menu-item>
                        <!-- </router-link> -->
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title"><i class="el-icon-setting"></i>设置</template>
                        <el-menu-item-group>
                        <!-- <router-link to=""> -->
                            <el-menu-item index="5-1">
                                管理员设置
                            </el-menu-item>
                        <!-- </router-link> -->
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title"><i class="el-icon-question"></i>说明</template>
                        <el-menu-item-group>
                        <router-link to="/msite/explain">
                            <el-menu-item index="6-1">
                                说明
                            </el-menu-item>
                        </router-link>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
        </el-container>
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
import {mapState} from 'vuex'
export default {
    data(){
        return{
            adminNames:'',//保存管理员用户名
            adminId: 0
        }
    },
    methods:{
        checkLogin(){
		    axios.get("api/admins/checkLogin").then((response) =>{
                let res = response.data;
				if(res.status == "0"){
					this.adminNames = res.result.adminName;
					this.adminId = res.result.adminId;
					console.log('this.adminName===' +this.adminNames)

					//修改用户名状态 拿到用户名 登录功能
                    this.$store.dispatch('recordAdminName',this.adminNames)	
                    
					this.$store.dispatch('recordAdminId',this.adminId)
				}
			})
        },
        //用户登出功能
		logout(){
			axios.post("api/admins/logout").then((response) =>{
				let res = response.data;
				if(res.status == "0"){					
					//修改用户名状态 修改为空 退出功能
					this.$store.dispatch('recordAdminName','')
						
					//修改用户id状态 修改为0 退出功能
                   this.$store.dispatch('recordAdminId',0)
                    
                    this.$router.push({path:'/'});
				}else{
					console.log('失败'+res.msg)
				}
			})
		},
    },
    computed:{
		...mapState(['adminName'])
    },
    mounted(){
        this.checkLogin()
    }
}
</script>

<style lang="scss" scoped> 
.page-container{
    width: 94.9375rem;
    height: 100%;
    display: flex;
    .logout-span{
        display: inline-block;
        width: 100px;
        cursor:pointer;
    }
    .el-container{
        width: 100%;
        height: 100%;
        .el-header{
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: darkcyan;
            color: #333;
            text-align: center;
            height: 3.75rem;
            line-height: 3.75rem;
            .logoName{
                font-size: 1.375rem;
                color: #fff;
            }
        }
        .el-aside {
            background: #000;
            min-height:1000px;
            .el-menu{
                border-right:0rem;
                background: #000;;
                .el-submenu__title{
                    color: #fff;
                }
                .el-menu-item-group{
                    // background: #000;
                    background: #14191f;
                    .el-menu-item:hover{
                        color: #000;
                    }
                    .el-menu-item{
                        color: #fff;
                    }
                }
            }
        }
    }
    .view-container{
        overflow: hidden;
        position: absolute;
        top: 3.75rem;
        left: 12.5rem;
        width: 82.4375rem;
        background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547747830330&di=76fc61899c3d282a51835a4b42f3d9a4&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201511%2F25%2F20151125141303_c2LyT.thumb.700_0.gif') ;
        background-size:100% 100%;
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

<style lang="scss">
.page-container{
    .el-header{
        a{
            color:#fff;
        }
        position:fixed;
        left:0px;
        right: 0px;
        top:0px;
        width:100%;height:30px;position:fixed;top:0;left:0;
        z-index: 2;
    }
    .el-menu-item-group__title{
        padding:0px;
    }
    .el-aside{
        position:fixed;
        left:0px;
        top:60px;
        background:red;
        z-index: 1;
        .el-submenu__title{
            color:#fff;
        }
        .el-submenu__title:active{
            a{
                color:#000;
            }
        }
        .el-submenu__title:hover{
            color:#000;
        }
        .el-menu-item:active{
            a{
                color:#000;
            }
        }
        .el-menu-item:hover{
            a{
                color:#000;
            }
        }
        .el-menu-item{
            &.is-active{
                background:	#989898;
            }
        }
        a{
            color:#fff;
        }
    }
}
</style>
