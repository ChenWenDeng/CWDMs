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
        <router-view class="view-container">
		</router-view>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>  
.page-container{
    width: 100%;
    height: 100%;
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
            height:683 px;
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
}
.view-container{
    position: absolute;
    top: 3.75rem;
    left: 12.5rem;
}
</style>
