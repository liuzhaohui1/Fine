<template>
	<view style="overflow-x: hidden;">
		<view class="content" v-for="(item,index) in worksList" :key="index">
			<view @click="show(item)">
				<image :src="item.avatar" mode=""></image>
				<view>
					<text>{{item.username}}</text>
					<text>{{item.createtime}}</text>
				</view>
			</view>
			<text>{{item.content}}</text>
			<view class="picture" @click="show(item)">
				<image :src="item.images[0]" mode=""></image>
				<image :src="item.images[1]" mode=""></image>
				<image :src="item.images[2]" mode=""></image>
			</view>
			<view class="comment">
				<view>
					<view @click="show(item)">
						<image src="../../static/image/pinglun.png" mode=""></image>
						<text>{{item.comment_count}}</text>
					</view>
					<view @click="comment(item)">
						<image src="../../static/image/dz.png" v-if="item.is_like" mode=""></image>
						<image src="../../static/image/dianzan.png"  v-else></image>
						<!-- <image src="../../static/image/dz.png" v-else mode=""></image> -->
						<text>{{item.like_count}}</text>
					</view>
				</view>
			</view>
			<view class="bac"></view>
		</view>
		<view class="upload" @click="upload">
			<image src="../../static/image/upload.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				none: true,
				worksList: '',
				// 分页
				page: 1,
				limit: 5,
				isNext: true,
				workShow_: '',
			}
		},
		onShow() {
			this.page = 1;
			this.isNext = true;
			this.worksList = [];
			this.works();
		},
		onReachBottom() {
			if (this.isNext) {
				this.isNext = false;
				this.page++;
				this.works();
				console.log('page', this.page);
			}
		},
		methods: {
			// 商品列表
			works() {
				let data = {
					token: uni.getStorageSync('token'),
					page: this.page,
					limit: this.limit
				}
				this.$api.workList(data).then(res => {
					console.log(res.data);
					this.workShow_ = res.data;
					// this.is_like = res.data.is_like;
					if (res.data.length == this.limit) {
						this.isNext = true
					}
					this.worksList = [...this.worksList, ...res.data]
					if (res.code == 0) {
						uni.showToast({
							title: res.msg,
							icon: 'error'
						})
					}
				})
			},
			// 点赞作品
			comment(item) {
				let data = {
					token: uni.getStorageSync('token'),
					works_id: item.id
				}
				this.$api.goodWorks(data).then(res => {
					console.log(res);
					// this.is_like = false;
					this.worksList = [];
					this.page = 1;
					this.works();
				})
			},
			// 跳转详情展示页面
			show(item) {
				uni.navigateTo({
					url: './workShow?id=' + item.id
				})
			},
			// 跳转发布上传页
			upload() {
				if (uni.getStorageSync('token') == '') {
					uni.showModal({
						title: '提示',
						content: '您未登录请登录',
						success: (res) => {
							res.confirm ? this.goMy() : ''
						}
					})
				} else {
					uni.navigateTo({
						url: './upload'
					})
				}
			},
			goMy() {
				uni.switchTab({
					url: '../my/my'
				})
			}
			// 查看大图
			// look() {
			// 	uni.previewImage({
			// 		urls: this.workShow_.images,
			// 	})
			// },
			// // 点赞
			// comment() {
			// 	this.none = !this.none
			// }
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background-color: rgb(247, 247, 247);
	}

	scroll-view {
		width: 100%;
		height: 1300rpx;
		background-color: rgb(247, 247, 247);
	}

	.content {
		width: 100%;
		background-color: white;
		padding-left: 30rpx;
		padding-top: 30rpx;
	}

	.content>view:nth-child(1) {
		display: flex;
	}

	.content>view:nth-child(1)>image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.content>view:nth-child(1)>view {
		margin-left: 30rpx;
	}

	.content>view:nth-child(1)>view>text:nth-child(1) {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #000000;
		display: block;
		margin-top: 4rpx;
	}

	.content>view:nth-child(1)>view>text:nth-child(2) {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
	}

	.content>text:nth-child(2) {
		display: block;
		width: 90%;
		font-size: 32rpx;
		font-family: PingFang SC;
		color: #333333;
		display: block;
		margin-top: 30rpx;
		margin-bottom: 10rpx;
	}

	.picture {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.picture>image {
		width: 220rpx;
		height: 220rpx;
		border-radius: 20rpx;
		margin-left: 20rpx;
		margin-top: 20rpx;
	}

	.picture>image:nth-child(3n+1) {
		width: 220rpx;
		height: 220rpx;
		border-radius: 20rpx;
		margin-left: 0rpx;
	}

	.comment {
		width: 100%;
		height: 90rpx;
		position: absolute;
		left: 0rpx;
		background-color: white;
	}

	.comment>view:nth-child(1) {
		width: 92%;
		border-top: 1rpx solid rgb(230, 230, 230);
		margin: auto;
		margin-top: 20rpx;
		display: flex;
		justify-content: space-around;
		line-height: 64rpx;
	}

	.comment>view:nth-child(1)>view>image {
		width: 28rpx;
		height: 26rpx;
		vertical-align: middle;
	}

	.comment>view:nth-child(1)>view>text {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
		margin-left: 10rpx;
		vertical-align: middle;
	}

	.upload>image {
		position: fixed;
		top: 800rpx;
		right: 10rpx;
		width: 140rpx;
		height: 140rpx;
		border-radius: 50%;
	}
	.bac {
		width: 100%;
		height: 115rpx;
		background-color: rgb(247, 247, 247);
		margin-left: -50rpx;
	}
</style>
