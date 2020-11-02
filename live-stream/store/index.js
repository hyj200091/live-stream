import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import $H from '../common/request.js';

export default new Vuex.Store({
	state: {
		user: null,
		token: null
	},
	actions: {
		login({ state }, user) {
			state.user = user
			state.token = user.token
			// 将登陆用户信心和token存入缓存
			uni.setStorageSync('user', JSON.stringify(user))
			uni.setStorageSync('token', user.token)
		},
		// logout({ state }) {
		// 	$H.post('/logout',{}, {
		// 		token: true
		// 	})
		// 	state.user = null
		// 	state.token = null
		// 	uni.removeStorageSync('user')
		// 	uni.removeStorageSync('token')
		// 	uni.removeStorageSync('dirs');
		// 	// 重启应用
		// 	uni.reLaunch({
		// 		url: '/pages/login/login'
		// 	});
		// },
		
		// initUser({ state }){
		// 	let user = uni.getStorageSync('user')
		// 	if(user) {
		// 		state.user = JSON.parse(user)
		// 		state.token = state.user.token
		// 	}
		// }
	}
})