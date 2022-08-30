<template>
	<view>
		<view class="inp">
			<image src="../../static/image/ss.png" mode=""></image>
			<input type="text" placeholder="搜索相关信息" @confirm="doSearch" v-model="videoText">
		</view>
		<image class="img" v-if="img" src="../../static/image/000.png" mode=""></image>
		<view class="list" v-for="item in mv" :key="index">
			<video :src="item.video_url" object-fit="cover"></video>
			<view>
				<text>{{item.video_name}}</text>
				<text>{{item.video_desc}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				type: '',
				mv: '',
				img: false,
				videoText: ''
			}
		},
		onShow() {
			this.message();
			this.video();
		},
		methods: {
			// 课程列表
			video() {
				let data = {
					token: uni.getStorageSync('token')
				}
				this.$api.video(data).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					} else {
						console.log(res.data);
						this.mv = res.data;
						// if (res.data.length == 0) {
						// 	this.img = true;
						// } else {
						// 	this.img = false;
						// }
					}
				})
			},
			// 我的信息
			message() {
				let data = {
					token: uni.getStorageSync('token')
				}
				this.$api.message(data).then(res => {
					this.type = res.data.type
					if (this.type == 1) {
						this.img = true;
					} else {
						this.img = false;
					}
					console.log(this.type);
				})
			},
			// 搜索
			doSearch() {
				let data = {
					token: uni.getStorageSync('token'),
					search: this.videoText
				}
				this.$api.video(data).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					} else {
						console.log(res.data);
						this.mv = res.data;
						this.videoText = '';
					}
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
		width: 350rpx;
		height: 350rpx;
		display: block;
		margin: 200rpx auto;
	}

	.inp {
		width: 100%;
		height: 100rpx;
		background-color: white;
	}

	.inp>image {
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		top: 22rpx;
		left: 8%;
		z-index: 5;
	}

	input {
		display: inline-block;
		background-color: rgb(247, 247, 247);
		width: 80%;
		height: 70rpx;
		border-radius: 50rpx;
		padding-left: 66rpx;
		position: relative;
		left: 5%;
		font-size: 30rpx;
	}

	.list {
		width: 88%;
		height: 156rpx;
		border-radius: 20rpx;
		margin: auto;
		margin-top: 20rpx;
		padding: 28rpx;
		background-color: white;
		display: flex;

	}

	.list>video {
		width: 250rpx;
		height: 154rpx;
		border-radius: 20rpx;
	}

	.list>view:nth-child(2) {
		width: 430rpx;
	}

	.list>view:nth-child(2)>text:nth-child(1) {
		display: block;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #1A1A1A;
		margin-left: 20rpx;
		margin-top: 6rpx;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}

	.list>view:nth-child(2)>text:nth-child(2) {
		display: block;
		font-size: 26rpx;
		font-family: PingFang SC;
		color: #666666;
		margin-left: 20rpx;
		margin-top: 20rpx;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
</style>
