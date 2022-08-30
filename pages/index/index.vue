<template>
	<view class="content">
		<image class="img" src="../../static/image/3.png" mode=""></image>
		<image src="../../static/image/ls.png" mode=""></image>
		<view class="swiper">
			<swiper :circular="circular" :autoplay="autoplay" :interval="interval" :duration="duration"
				:indicator-dots="indicatorDots" indicator-active-color="rgb(126, 84, 68)" indicator-color="#ffffff">
				<swiper-item v-for="(item,index) in banner" :key="index">
					<image :src='item'></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="shopList">
			<view>
				<image src="../../static/image/LIST.png" mode=""></image>
				<text>门店列表</text>
			</view>
			<view class="list" v-for="item,index1 in shopList_" :key="index1">
				<view @click="shop(item)">
					<image :src="item.shop_image" mode=""></image>
					<view>
						<text>【{{item.shop_name}}】乐舍陶艺</text>
						<text>{{item.address}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图参数
				circular: true, //是否循环
				indicatorDots: true, //是否显示底部圆点
				autoplay: true, //是否自动播放
				interval: 3000, //自动切换时长间隔
				duration: 800, //滑动动画时长
				banner: '',
				x: '',
				y: '',
				page: 1,
				limit: 10,
				shopList_: ''
			}
		},
		onLoad() {

		},
		onShow() {
			this.swiper();
			this.site();
		},
		methods: {
			// 轮播图
			swiper() {
				let data = {}
				this.$api.gong(data).then(res => {
					this.banner = res.data.platform_banner
				})
			},
			// 获取当前定位
			site() {
				uni.getLocation({
					type: 'wgs84',
					geocode: true,
					success: (res) => {
						// console.log(res)
						let data = {
							longitude: res.longitude,
							latitude: res.latitude,
							page: this.page,
							limit: this.limit
						}
						this.$api.shopList(data).then(res => {
							// console.log(res);
							this.shopList_ = res.data
						})
					},
				})
			},
			// 门店详情
			shop(item) {
				uni.navigateTo({
					url: './shop?id=' +item.id + '&x=' +item.longitude + '&y=' +item.latitude
				})
			}
		}
	}
</script>

<style>
	page {
		width: 100% !important;
		height: 100% !important;
		background-color: rgb(247, 247, 247) !important;
	}
</style>

<style lang="scss" scoped>
	.content {
		image:nth-of-type(1) {
			width: 100%;
			height: 665rpx;
		}

		image:nth-of-type(2) {
			width: 200rpx;
			height: 36rpx;
			position: relative;
			top: -570rpx;
			left: 30rpx;
		}

		.swiper {
			width: 94%;
			height: 400rpx;
			margin: 0 auto;
			border-radius: 20rpx;
			position: relative;
			top: -540rpx;

			swiper {
				width: 100%;
				height: 100%;

				swiper-item {
					image {
						width: 100%;
						height: 400rpx;
						border-radius: 20rpx;
					}
				}
			}
		}

		.shopList {
			width: 94%;
			height: 100%;
			margin: auto;
			margin-top: -500rpx;
			border-radius: 20rpx;
			background-color: white;
			padding-top: 30rpx;

			view:nth-child(1) {
				display: flex;
				align-items: center;
				margin-bottom: 40rpx;

				image:nth-child(1) {
					width: 60rpx;
					height: 60rpx;
					margin-left: 30rpx;
				}

				text:nth-child(2) {
					font-size: 32rpx;
					font-weight: 550;
					margin-left: -34rpx;
					margin-top: 6rpx;
					z-index: 2;
				}
			}

			.list {
				width: 100%;
				height: 200rpx;
				margin: auto;

				view:nth-child(1) {
					display: flex;
					align-items: stretch;

					image:nth-child(1) {
						width: 270rpx;
						height: 160rpx;
						border-radius: 20rpx;
					}

					view:nth-child(2) {
						text:nth-child(1) {
							display: block;
							width: 350;
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #1A1A1A;
							margin-left: 20rpx;
							margin-top: 15rpx;
						}

						text:nth-child(2) {
							display: block;
							width: 380rpx;
							font-size: 26rpx;
							font-weight: 400;
							font-family: PingFang SC;
							color: #666666;
							margin-left: 30rpx;
							margin-top: 20rpx;
							margin-right: 20rpx;
						}
					}
				}
			}
		}
	}
</style>
