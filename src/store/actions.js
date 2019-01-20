/*
通过mutation间接更新state的多个方法的对象
 */
import {
	RECEIVE_GOODS_LIST, 	//商品列表
  RECEIVE_GOODS_TATOL_COUNT,//商品列表总数量
  RECEIVE_ADMIN_NAME, //管理员用户名
	RECEIVE_ADMIN_ID, //管理员id

} from './mutation-types'

export default {
  //同步记录商品列表
  recordGoodsList({commit},goodsList){
    commit(RECEIVE_GOODS_LIST,goodsList)
	console.log('actions==='+goodsList)
  },

	//同步记录商品列表总数量
  recordGoodsTatolCount({commit},goodsTatolCount){
    commit(RECEIVE_GOODS_TATOL_COUNT,goodsTatolCount)
	console.log('actions==='+goodsTatolCount)
  },

  //同步记录管理员用户名
  recordAdminName({commit},adminName){
    commit(RECEIVE_ADMIN_NAME,adminName)
	console.log('actions==='+adminName)
  },

  //同步记录管理员用户名
  recordAdminId({commit},adminId){
    commit(RECEIVE_ADMIN_ID,adminId)
	console.log('actions==='+adminId)
  },
}