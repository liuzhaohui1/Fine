<template>
	<view>
		<view class="content">
			<image src="../../static/image/my.png" mode=""></image>
			<image src="../../static/image/ls.png" mode=""></image>
		</view>
		<view class="msg" v-if="msg">
			<image src="../../static/image/wdl.png" @click="login" mode=""></image>
			<view>
				<view>
					<text class="msg1" @click="login">点击登录</text>
				</view>
				<text></text>
			</view>
		</view>
		<view class="msg" v-else>
			<image :src="myMsg.avatar" mode=""></image>
			<view>
				<view>
					<text>{{myMsg.username}}</text>
					<image v-if="vipTab" src="../../static/image/vip.png" mode=""></image>
				</view>
				<text>{{myMsg.mobile}}</text>
			</view>
		</view>
		<view class="order">
			<text>预约订单</text>
			<view>
				<view @click="order">
					<image src="../../static/image/dsy.png" mode=""></image>
					<text>待使用</text>
				</view>
				<view @click="order1">
					<image src="../../static/image/yqx.png" mode=""></image>
					<text>已取消</text>
				</view>
				<view @click="order2">
					<image src="../../static/image/ywc.png" mode=""></image>
					<text>已完成</text>
				</view>
				<view @click="order3">
					<image src="../../static/image/qb.png" mode=""></image>
					<text>全部订单</text>
				</view>
			</view>
		</view>
		<view class="vip">
			<view @click="vip">
				<view>
					<image src="../../static/image/VIP1.png" mode=""></image>
					<text>会员实名认证</text>
				</view>
				<image src="../../static/image/jt.png" mode=""></image>
			</view>
			<view @click="myVip">
				<view>
					<image src="../../static/image/MYVIP.png" mode=""></image>
					<text>我的会员</text>
				</view>
				<image src="../../static/image/jt.png" mode=""></image>
			</view>
			<view>
				<view>
					<image src="../../static/image/TEL1.png" mode=""></image>
					<text>联系我们</text>
				</view>
				<text @click="tel">{{phone_}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import base from '../../static/base.js'
	export default {
		data() {
			return {
				msg: false,
				code: '',
				encry: '',
				iv: '',
				id: '',
				phone_: '',
				user: '',
				myMsg: '',
				vipTab: false,
				vipNum: ''
			}
		},
		onShow() {
			if (uni.getStorageSync('token') !== '') {
				this.msg = false;
				this.message();
			} else {
				this.msg = true;
			}
			this.phone();
		},
		methods: {
			// 登录
			login() {
				// 获取code
				uni.login({
					success: (res) => {
						this.code = res.code
						//授权登录弹窗
					}
				})
				return new Promise((resolve, reject) => {
					uni.getUserProfile({
						lang: 'zh_CN',
						desc: '获取你的昵称、头像、地区及性别',
						success: (res) => {
							this.msg = false;
							// this.msg1 = true;
							this.encry = res.encryptedData;
							this.iv = res.iv;
							this.wxLogin();
						},
					})
				})
			},
			// 登录接口
			wxLogin() {
				let data = {
					'code': this.code,
					'encryptedData': this.encry,
					'iv': this.iv,
				}
				let base_data = (base.encode(JSON.stringify(data)))
				uni.request({
					url: 'https://information.zzqtrj.net/api/user/wechatLogin',
					method: 'POST',
					data: {
						'request_data': base_data,
					},
					header: {
						"Content-Type": "application/json"
					},
					success: (res) => {
						console.log(res);
						this.user = res.data.data.user_mes
						this.code = res.data.code
						this.msg = res.data.msg
						if (this.code == 0) {
							uni.showToast({
								title: this.msg,
								icon: 'error'
							})
						} else {
							uni.setStorageSync('token', res.data.data.token)
							this.msg = false;
							let data = {
								token: uni.getStorageSync('token')
							}
							this.$api.message(data).then(res => {
								// console.log(res.data);
								this.myMsg = res.data;
								if (res.data.type == 1) {
									this.vipTab = false;
								} else {
									this.vipTab = true;
								}
							})
						}
					}
				})
			},
			// 我的信息
			message() {
				let data = {
					token: uni.getStorageSync('token')
				}
				this.$api.message(data).then(res => {
					// console.log(res.data);
					this.myMsg = res.data;
					this.vipNum = res.data.type;
					if (res.data.type == 1) {
						this.vipTab = false;
					} else {
						this.vipTab = true;
					}
				})
			},
			// 客服电话
			phone() {
				let data = {}
				this.$api.gong(data).then(res => {
					// console.log(res.data);
					this.phone_ = res.data.service_phone
				})
			},
			// 订单
			order() {
				if (uni.getStorageSync('token') == '') {
					uni.showModal({
						title: '提示',
						content: '您未登录请登录'
					})
				} else {
					uni.navigateTo({
						url: './order?index=' + 1
					})
				}
			},
			order1() {
				if (uni.getStorageSync('token') == '') {
					uni.showModal({
						title: '提示',
						content: '您未登录请登录'
					})
				} else {
					uni.navigateTo({
						url: './order?index=' + 2
					})
				}
			},
			order2() {
				if (uni.getStorageSync('token') == '') {
					uni.showModal({
						title: '提示',
						content: '您未登录请登录',
						success: (res) => {
							res.confirm ? this.login() : ''
						}
					})
				} else {
					uni.navigateTo({
						url: './order?index=' + 3
					})
				}
			},
			order3() {
				if (uni.getStorageSync('token') == '') {
					uni.showModal({
						title: '提示',
						content: '您未登录请登录',
						success: (res) => {
							res.confirm ? this.login() : ''
						}
					})
				} else {
					uni.navigateTo({
						url: './order?index=' + 4
					})
				}
			},
			// 会员实名认证
			vip() {
				if (uni.getStorageSync('token') == '') {
					uni.showModal({
						title: '提示',
						content: '您未登录请登录',
						success: (res) => {
							res.confirm ? this.login() : ''
						}
					})
				} else {
					uni.navigateTo({
						url: './vip'
					})
				}
			},
			// 我的会员
			myVip() {
				if (uni.getStorageSync('token') == '') {
					uni.showModal({
						title: '提示',
						content: '您未登录请登录',
						success: (res) => {
							res.confirm ? this.login() : ''
						}
					})
				} else if (this.vipNum == 1) {
					uni.showModal({
						title: '提示',
						content: '您暂未开通会员，请前往门店开通',
						confirmColor: '#CDA67F',
						cancelColor: '#666666',
						showCancel: false
					})
				} else {
					uni.navigateTo({
						url: './myVip'
					})
				}
			},
			// 联系我们
			tel() {
				uni.makePhoneCall({
					phoneNumber: this.phone_
				});
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background-color: rgb(247, 247, 247);
	}

	.content {
		background-color: #ECDCD0;
	}

	.content>image:nth-child(1) {
		width: 100%;
		height: 665rpx;
	}

	.content>image:nth-child(2) {
		width: 200rpx;
		height: 35rpx;
		position: relative;
		top: -560rpx;
		left: 5%
	}

	.msg {
		width: 86%;
		height: 120rpx;
		padding: 30rpx;
		background-color: white;
		border-radius: 20rpx;
		margin: auto;
		position: relative;
		top: -100rpx;
		display: flex;
	}

	.msg>image:nth-child(1) {
		width: 110rpx;
		height: 110rpx;
		border-radius: 50%;
	}

	.msg>view:nth-child(2) {
		margin-left: 20rpx;
	}

	.msg>view:nth-child(2)>view>text:nth-child(1) {
		display: inline-block;
		font-size: 32rpx;
		font-weight: 550;
		margin-top: 10rpx;
	}

	.msg>view:nth-child(2)>text:nth-child(2) {
		display: block;
		font-size: 26rpx;
		color: gray;
		margin-top: 10rpx;
	}

	.msg>view>view>image:nth-child(2) {
		width: 127rpx;
		height: 29rpx;
		border-radius: 50rpx;
		margin-top: 10rpx;
		margin-left: 20rpx;
	}

	.order {
		width: 86%;
		height: 170rpx;
		border-radius: 20rpx;
		padding: 30rpx;
		margin: auto;
		background-color: white;
		position: relative;
		top: -80rpx;
	}

	.order>text:nth-child(1) {
		font-size: 32rpx;
		font-weight: 550;
	}

	.order>view:nth-child(2) {
		display: flex;
		justify-content: space-around;
		align-items: baseline;
	}

	.order>view:nth-child(2)>view {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.order>view:nth-child(2)>view:nth-child(1)>image {
		width: 35rpx;
		height: 41rpx;
		margin-top: 30rpx;
	}

	.order>view:nth-child(2)>view:nth-child(2)>image,
	.order>view:nth-child(2)>view:nth-child(3)>image {
		width: 46rpx;
		height: 46rpx;
		margin-top: 30rpx;
	}

	.order>view:nth-child(2)>view:nth-child(4)>image {
		width: 43rpx;
		height: 46rpx;
		margin-top: 30rpx;
	}

	.order>view:nth-child(2)>view>text {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
		margin-top: 24rpx;
	}

	.vip {
		width: 94%;
		height: 300rpx;
		border-radius: 20rpx;
		background-color: white;
		margin: auto;
		position: relative;
		top: -60rpx;
	}

	.vip>view {
		width: 92%;
		height: 100rpx;
		margin: auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid rgb(230, 230, 230);
	}

	.vip>view:nth-child(3) {
		border: none;
	}

	.vip>view>view {
		width: 96%;
		margin: auto;
		display: flex;
		align-items: center;
	}

	.vip>view:nth-child(1)>view>image:nth-child(1) {
		width: 35rpx;
		height: 41rpx;
		margin-left: 10rpx;
	}
	
	.vip>view:nth-child(2)>view>image:nth-child(1) {
		width: 37rpx;
		height: 36rpx;
		margin-left: 10rpx;
	}
	
	.vip>view:nth-child(3)>view>image:nth-child(1) {
		width: 35rpx;
		height: 33rpx;
		margin-left: 10rpx;
	}

	.vip>view>view>text:nth-child(2) {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #1A1A1A;
		margin-left: 20rpx;
	}

	.vip>view>image:nth-child(2) {
		width: 16rpx;
		height: 24rpx;
		margin-right: 10rpx;
	}

	.vip>view>text:nth-child(2) {
		color: #666666;
		width: 45%;
	}

	.msg1 {
		margin-top: 34rpx !important;
	}
</style>
