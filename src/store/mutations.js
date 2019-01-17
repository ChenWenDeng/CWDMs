/*
直接更新state的多个方法的对象
 */
import Vue from 'vue'
import {
	RECEIVE_GOODS_LIST, 	//商品列表
	RECEIVE_GOODS_TATOL_COUNT,//商品列表总数量


} from './mutation-types'

export default {
  
	//改变用户名信息
  [RECEIVE_GOODS_LIST] (state, goodsList) {
  	state.goodsList = goodsList
	console.log('mutations==='+goodsList)
	},
	[RECEIVE_GOODS_TATOL_COUNT] (state, goodsTatolCount) {
  	state.goodsTatolCount = goodsTatolCount
	console.log('mutations==='+goodsTatolCount)
  },
}