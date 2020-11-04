<template>
	<view class="container">
		<view class="flex align-center justify-center" style="height: 350rpx;">
			<text style="font-size: 50rpx;" class="text-secondary">{{ status ? '账号密码登录' : '手机验证码登录' }}</text>
		</view>
		<!-- 中间部分 进行判断 -->
		<view v-if="!status" style="height: 215rpx;" class="px-3 bg-white">
			<view class="flex  align-center border-bottom " style="height: 100rpx;">
				<text class="font-sm font-weight-bold mr-3">+86</text>
				<input type="number" placeholder="手机号" class="font-sm" v-model="form.phone">
			</view>
			<view class="flex justify-between align-center mt-1 border-bottom" style="height: 100rpx;">
				<input type="text" placeholder="请输入验证码" class="font-sm mr-5" v-model="form.code">
				<view style="width: 130rpx;height: 55rpx;" class="flex justify-center bg-secondary rounded align-center"  @click="getCode">
					<text class="font-sm  text-white">{{ codeTime === 0 ? '获取验证码' : second + 's' }}</text>
				</view>
				<!-- <view v-else style="width: 130rpx;height: 55rpx;" class="justify-center bg-secondary rounded align-center">
					<text class="ml-5 font-sm  text-white"> {{second}}s</text>
				</view> -->
			</view>
		</view>
		<view v-else style="height: 215rpx;" class="px-3 bg-white">
			<view class="flex  align-center border-bottom " style="height: 100rpx;">
				<input type="text" placeholder="昵称/手机号/邮箱" class="font-sm" v-model="form.username">
			</view>
			<view class="flex justify-between align-center mt-1 border-bottom" style="height: 100rpx;">
				<input type="text" placeholder="请输入密码" class="font-sm mr-5" v-model="form.password">
				<view style="width: 130rpx;height: 55rpx;" class="flex justify-center bg-secondary rounded align-center">
					<text class="font-sm  text-white">忘记密码</text>
				</view>
			</view>
		</view>
		
		<view :class="form.password === '' ? 'bg-secondary' : 'bg-danger'" style="height: 90rpx;width:100%;margin-top: 70rpx;" class="flex rounded-circle justify-center align-center" @click="submit">
			<text class="font text-white">登录</text>
		</view>
		<!-- 下面部分 -->
		<view class="bg-light" style="height: 380rpx;margin-top: 20rpx;">
			<!-- 验证码登录 | 登录遇到问题 -->
			<view style="height: 80rpx;" class="flex align-center justify-center">
				<text class="font-sm text-hover-primary mr-2" @click="changeStatus">{{ status ? '验证码登录' : '账号密码登录' }}</text>
				<text class="font-sm  mr-2">|</text>
				<text class="font-sm text-hover-primary">登录遇到了问题</text>
			</view>
			<!-- 社交账号登录 -->
			<view style="height: 80rpx;" class="flex align-center justify-center">
				<text class="font-sm text-secondary">————社交账号登录————</text>
			</view>
			<!-- 图标 -->
			<view class=" flex justify-center align-center" style="height: 120rpx;">
				<image class="rounded-circle" src="../../static/wx.png" mode="aspectFill" style="width: 100rpx;height: 100rpx;" @click="wxLogin"></image>
				<image class="rounded-circle mr-5 ml-5" src="../../static/qq.png" mode="aspectFill" style="width: 100rpx;height: 100rpx;"></image>
				<image class="rounded-circle" src="../../static/wb.png" mode="aspectFill" style="width: 100rpx;height: 100rpx;"></image>
			</view>
		    <!-- 底部 -->
		   <view class="flex align-center justify-center mt-3" style="height: 40rpx;">
			<text class="font-sm">注册即代表您同意</text>
			<text class="font-sm text-primary">《xxx社区协议》</text>
		   </view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 //控制文字和数字的显隐性
				 wxid: '',
				 username: '',
				 codeTime:0,
				 second: 60,
				status: false,
				form: {
					username: '',
					password: '',
					code: '',
					phone: ''
				}
			}
		},
		methods: {
			// 获取验证码
			getCode() {
				this.$H.post('/sendcode', { phone: this.form.phone }).then(res => {
				 });
				// 倒计时				 this.codeTime = 1				    var interval = setInterval(() => {				        --this.second				    }, 1000)					if(this.second<60 && this.second > 0){						uni.showToast({							title:"时间未到 不能重复获取!",							icon:'none'						})					}				    setTimeout(() => {				        clearInterval(interval)				        this.codeTime = 0				    }, 60000)
			   // });
			},
			// 表单验证
			validate() {
			//手机号正则
				var mPattern = /^1[34578]\d{9}$/;
					if (!mPattern.test(this.phone)) {
						uni.showToast({
							title: '手机号格式不正确',
							icon: 'none'
						});
					return false;
				}
			// ...更多验证
			return true;
			},
			// 初始化表单
			initForm() {
				this.form.username = '';
				this.form.password = '';
				this.form.phone = '';
				this.form.code = '';
			},
			changeStatus() {
			// 初始化表单
				this.initForm();
				this.status = !this.status;
			},
			submit() {
			// 表单验证
			// if (!this.validate()) {
			// 	return;
			// }
			let type = '';
			if (this.status) {
				type = 'login';
			} else {
				type = 'phoneLogin';
			}
			// console.log(type);
			console.log(this.form);
			this.$H.post('/' + type, this.form).then(res => {
				console.log(res);
				uni.showToast({
					title: '登录成功',
					icon: 'none'
				});
				this.$store.dispatch('login', res);
				uni.navigateBack({
					delta: 1
				});
			});
			},
			wxLogin() {
				var that = this
				// app第三方登录
				uni.getProvider({
				    service: 'oauth',
				    success: function (res) {
				        // console.log(res.provider)
				        if (~res.provider.indexOf('weixin')) {
				            uni.login({
				                provider: 'weixin',
				                success: function (loginRes) {
				        // console.log(JSON.stringify(loginRes));
					if(loginRes.errMsg === 'login:ok'){
						that.wxid = loginRes.authResult.openid
							// console.log(this.wxid);
							    // 获取用户信息
							    uni.getUserInfo({
							      provider: 'weixin',
							      success: function (infoRes) {
							        // console.log('用户昵称为：' + infoRes.userInfo.nickName);
									that.username = infoRes.userInfo.nickName
									// console.log(that.username);
									let wxlogDto = {"openId":that.wxid,"name":that.username};
									// console.log(wxlogDto);
										that.$H.post('/wxLogin',wxlogDto).then(res => {
											console.log(res);
											uni.showToast({
											title: '微信登录成功',
										    icon: 'none'
										});
								that.$store.dispatch('login', res);
								// console.log("11111111");
									uni.switchTab({
										url: '../my/my'
										});
									  })
							        }
							       });
								  }
				                }
				            });
				        }
				    }
				});
			}
		}
	}
</script>

<style>
	.container{
		width: 750rpx;
		height: 100vh;
		margin: 0;
		padding: 100rpx 0 0 0;
		background-size: cover;
		/* background-image: linear-gradient(to bottom, #BA7ACE 0%, #8745FF 100%); */
	}
	.list-item{
		width: 375rpx;
		height: 375rpx;
		padding-right: 5rpx;
		box-sizing: border-box;
		position: relative;
	}
</style>
