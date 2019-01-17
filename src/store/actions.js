/*
通过mutation间接更新state的多个方法的对象
 */
import {
	RECEIVE_GOODS_LIST, 	//商品列表
	RECEIVE_GOODS_TATOL_COUNT,//商品列表总数量
	

} from './mutation-types'

export default {
  //同步记录用户信息
  recordGoodsList({commit},goodsList){
    commit(RECEIVE_GOODS_LIST,goodsList)
	console.log('actions==='+goodsList)
  },
	//同步记录用户信息
  recordGoodsTatolCount({commit},goodsTatolCount){
    commit(RECEIVE_GOODS_TATOL_COUNT,goodsTatolCount)
	console.log('actions==='+goodsTatolCount)
  },
}