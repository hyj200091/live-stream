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
		// 需要登陆才能访问的方法，这个只能放在Vuex里才能生效
		authMethod({
			state
		},callback) {
			if(!state.token) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				return uni.navigateTo({
					url: '/pages/login/login'
				});
			}
			callback()
		},
		// 初始化用户登录状态
		initUser({
			state
		}) {
			let u = uni.getStorageSync('user')
			let t = uni.getStorageInfoSync('token')
			if (u) {
				state.user = JSON.parse(u)
				state.token = t
			}
		},
		logout({
			state
		}) {
			$H.post('/logout', {},{
				token: true,
				toast: false
			})
			state.user = null
			state.token = null
			uni.removeStorageSync('user')
			uni.removeStorageSync('token')
		},
		login({ state }, user) {
			state.user = user
			state.token = user.token
			// 将登陆用户信心和token存入缓存
			uni.setStorageSync('user', JSON.stringify(user))
			uni.setStorageSync('token', user.token)
		},
		getUserInfo({
			state
		}) {
			$H.get('/user/info', {
				token: true,
				noJump: true,
				toast: false
			}).then(res => {
				state.user = res
				uni.setStorage({
					key: 'user',
					data: JSON.stringify(state.user)
				})
			})
		}
	}
})