/*
直接更新state的多个方法的对象
 */
import Vue from 'vue'
import {
	RECEIVE_GOODS_LIST, 	//商品列表
	RECEIVE_GOODS_TATOL_COUNT,//商品列表总数量
	RECEIVE_ADMIN_NAME, //管理员用户名
	RECEIVE_ADMIN_ID, //管理员id

} from './mutation-types'

export default {
  
	//改变用户名信息
  [RECEIVE_GOODS_LIST] (state, goodsList) {
  	state.goodsList = goodsList
	console.log('mutations==='+goodsList)
	},

	//商品列表总数量
	[RECEIVE_GOODS_TATOL_COUNT] (state, goodsTatolCount) {
  	state.goodsTatolCount = goodsTatolCount
	console.log('mutations==='+goodsTatolCount)
	},
	
	//管理员用户名
	[RECEIVE_ADMIN_NAME] (state, adminName) {
  	state.adminName = adminName
	console.log('mutations==='+adminName)
	},
	
	//管理员id
	[RECEIVE_ADMIN_ID] (state, adminId) {
  	state.adminId = adminId
	console.log('mutations==='+adminId)
  },
}