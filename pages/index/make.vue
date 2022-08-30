<template>
	<view class="content">
		<image src="../../static/image/wancheng.png" mode=""></image>
		<text>您已成功提交申请</text>
		<button @click="back">返回</button>
	</view>
</template>

<script>
	export default {
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style>
	.content>image {
		display: block;
		width: 200rpx;
		height: 200rpx;
		margin: auto;
		margin-top: 150rpx;
	}
	.content>text {
		display: block;
		font-size: 32rpx;
		font-weight: 550;
		width: 100%;
		text-align: center;
		margin-top: 40rpx;
	}
	.content>button {
		width: 30%;
		margin-top: 60rpx;
		border-radius: 50rpx;
		font-size: 30rpx;
		color: #CDA67F;
		border: 2rpx solid #CDA67F;
		background-color: white;
	}
</style>