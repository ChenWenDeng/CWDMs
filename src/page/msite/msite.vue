<template>
    <div class="page-container">
        <el-container>
            <el-header >
                <div class="logoName">
                    <router-link to="/msite/home">
                        Eend商城后台管理系统
                    </router-link>
                </div>
                <span>用户名</span>
            </el-header>
            <el-aside width="200px">
                <el-menu :default-openeds="['1', '3']">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-document"></i>数据管理</template>
                        <el-menu-item-group>
                        <el-menu-item index="1-1">
                            <router-link to="/msite/userList">
                                用户列表
                            </router-link>
                        </el-menu-item>
                        <el-menu-item index="1-2">
                            <router-link to="/msite/goodList">
                                商品列表
                            </router-link>
                        </el-menu-item>
                        <el-menu-item index="1-3">
                            <router-link to="/msite/orderList">
                                订单列表
                            </router-link>
                        </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-plus"></i>添加数据</template>
                        <el-menu-item-group>
                        <el-menu-item index="2-1">添加商品</el-menu-item>
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
export default {
    
}
</script>

<style lang="scss" scoped> 
a:hover{
    color: #000;
}
a{
    color:#fff;
}
.page-container{
    width: 94.9375rem;
    height: 100%;
    display: flex;
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
            color: #333;
            min-height: 40.1875rem;
            background: #000;
            min-height:1000px;
            .el-menu{
                border-right:0rem;
                background: #000;;
                .el-submenu__title{
                    color: #fff;
                }
                .el-menu-item-group{
                    background: #000;
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
