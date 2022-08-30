<template>
	<view>
		<view class="img">
			<image src="../../static/image/myvip1.png" mode=""></image>
		</view>
		<text class="vip1">【</text>
		<text class="vip">{{vipMsg.shop_name}}】</text>
		<text class="vip2"></text>
		<text class="vipTime">到期时间：</text>
		<text class="vipTime1">{{vipMsg.expire_time}}</text>
		<view class="order">
			<text>预约记录</text>
			<view class="user1" v-for="item in order">
				<view>
					<text>{{item.course_name}}</text>
				</view>
				<view>
					<view>
						<text>预约时间：</text>
						<text>{{item.date}} {{item.start_time}} - {{item.end_time}}</text>
					</view>
					<view>
						<text>预约门店：</text>
						<text>{{item.shop_name}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				// 会员卡信息
				vipMsg: '',
				// 预约记录
				order: ''
			}
		},
		onShow() {
			this.myVip();
		},
		methods: {
			myVip() {
				let data = {
					token: uni.getStorageSync('token')
				}
				this.$api.myVip(data).then(res => {
					console.log(res.data);
					this.vipMsg = res.data
					this.order = res.data.list
				})
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

	.img {
		width: 96%;
		position: relative;
		margin: 20rpx auto;
	}

	.img>image {
		width: 100%;
		height: 400rpx;
		display: block;
		margin: auto;
		margin-top: 10rpx;
	}
	
	.vip {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #DA9337;
		position: absolute;
		top: 180rpx;
		left: 13%;
	}
	
	.vip1 {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #DA9337;
		position: absolute;
		top: 180rpx;
		left: 9%;
	}
	
	.vip2 {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #DA9337;
		position: absolute;
		top: 180rpx;
		left: 32%;
	}
	
	.vipTime {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #DA9337;
		position: absolute;
		top: 350rpx;
		left: 11%
	}
	
	.vipTime1 {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #DA9337;
		position: absolute;
		top: 350rpx;
		left: 27%
	}
	
	.order>text:nth-child(1) {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #1A1A1A;
		display: block;
		width: 92%;
		margin: 30rpx auto;
	}

	.user1 {
		width: 87%;
		height: 100%;
		margin: auto;
		margin-top: 30rpx;
		padding: 30rpx;
		border-radius: 20rpx;
		background-color: white;
		overflow: hidden;
	}

	.user1>view:nth-child(1) {
		display: flex;
		justify-content: space-between;
		font-size: 30rpx;
		margin-left: 10rpx;
	}

	.user1>view:nth-child(1)>text:nth-child(1) {
		font-size: 30rpx;
		font-weight: 550;
	}

	.user1>view:nth-child(1)>text:nth-child(2) {
		font-size: 30rpx;
		color: #CDA67F;
	}

	.user1>view:nth-child(2) {
		margin-top: 30rpx;
	}

	.user1>view:nth-child(2)>view {
		margin-top: 10rpx;
		margin-left: 10rpx;
	}

	.user1>view:nth-child(2)>view>text:nth-child(1) {
		font-size: 30rpx;
	}

	.user1>view:nth-child(2)>view>text:nth-child(2) {
		font-size: 30rpx;
		color: gray;
	}
</style>
