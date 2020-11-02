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
	}
})