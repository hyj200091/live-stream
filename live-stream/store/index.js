import Vue from 'vue'
import Vuex from 'vuex'

import $H from '../common/request.js';
import $C from '../common/config.js';
import io from '../common/uni-socket.io.js';
Vue.use(Vuex)


export default new Vuex.Store({
	state: {
		user: null,
		token: null,
		socket: null
	},
	actions: {
		//连接socket
		  connectSocket({
		   state,
		   dispatch
		  }){
			console.log(12121212)
		   const S =io($C.sorketUrl,{
		    query:{},
		    transports:['websocket'],
		    timeout:5000
		   })
		   //监听连接
		     S.on('connect',()=>{
		      console.log('已连接')
			  S.emit('test','测试socket')
		     }) 
		     //监听失败
		     S.on('error',()=>{
		      console.log('连接失败')
		     })
		     //监听断开
		     S.on('disconnect',()=>{
		      console.log('已断开')
		     })
		  },
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