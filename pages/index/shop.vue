<template>
	<view class="content">
		<view>
			<swiper :circular="circular" :autoplay="autoplay" :interval="interval" :duration="duration"
				indicator-active-color="rgb(126, 84, 68)" indicator-color="#ffffff" indicator-dots="true">
				<swiper-item v-for="item,index1 in banner" :key="index1">
					<image class="img" :src="item"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="center">
			<text>【</text>
			<text>{{shopOrder_.shop_name}}】</text>
			<text></text>
			<text>乐舍陶艺</text>
			<view>
				<view class="tel">
					<view>
						<image src="../../static/image/222.png" mode=""></image>
						<text>{{shopOrder_.address}}</text>
					</view>
					<view>
						<image src="../../static/image/tel.png" mode=""></image>
						<text @click="tel">{{shopOrder_.shop_phone}}</text>
					</view>
				</view>
				<view class="site" @click="navigation">
					<image src="../../static/image/daohang.png" mode=""></image>
					<text>地图导航</text>
				</view>
			</view>
		</view>
		<view class="shopList">
			<view>
				<image src="../../static/image/LIST.png" mode=""></image>
				<text>门店课程</text>
			</view>
			<view class="list" v-for="item,index in course" :key="index">
				<view @click="class1(item)">
					<image :src="item.course_image" mode=""></image>
					<view>
						<text>{{item.course_name}}</text>
						<text>{{item.course_desc}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="shop">
			<view>
				<view @click="select(1)">
					<text :class="{'text':test==1}">门店详情</text>
					<text :class="{'text1':test==1}"></text>
				</view>
				<view @click="select1(2)">
					<text :class="{'text':test==2}">使用须知</text>
					<text :class="{'text1':test==2}"></text>
				</view>
			</view>
			<view class="detail" v-show="none">
				<rich-text :nodes="order"></rich-text>
			</view>
			<view class="use" v-show="none1">
				<rich-text :nodes="user"></rich-text>
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
				test: 1,
				none: true,
				none1: false,
				tel_: '',
				id: '',
				shopOrder_: '',
				banner: '',
				course: '',
				order: '',
				user: '',
				x: '',
				y: ''
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.x = option.x;
			this.y = option.y;
			// console.log(this.id,this.x,this.y);
		},
		onShow() {
			this.shopOrder();
		},
		methods: {
			shopOrder() {
				uni.getLocation({
					type: 'wgs84',
					geocode: true,
					success: (res) => {
						// console.log(res)
						let data = {
							longitude: res.longitude,
							latitude: res.latitude,
							shop_id: this.id
						}
						this.$api.shopOrder(data).then(res => {
							// console.log(res);
							// 门店轮播
							this.banner = res.data.shop_banner;
							// 门店详情
							this.shopOrder_ = res.data;
							// 手机号
							this.tel_ = res.data.shop_phone;
							// 门店课程
							this.course = res.data.course;
							// 门店详情
							this.order = res.data.shop_desc.replace('<img', '<img class="richImg"')
							// 使用须知
							this.user = res.data.shop_instruction.replace('<img',
								'<img class="richImg"')
						})
					},
				})
			},
			// 导航
			navigation() {
				uni.openLocation({
					latitude: Number(this.y),
					longitude: Number(this.x),
					name: '乐舍陶艺',
					success: function(res) {
						// console.log('111',res);
					}
				});
			},
			// 点击切换门店详情，使用须知
			select(index) {
				this.test = index;
				this.none = true;
				this.none1 = false;
			},
			select1(index) {
				this.test = index;
				this.none = false;
				this.none1 = true;
			},
			// 课程详情
			class1(item) {
				uni.navigateTo({
					url: './class?id=' + item.id
				})
			},
			// 联系我们
			tel() {
				uni.makePhoneCall({
					phoneNumber: this.tel_
				});
			}
		}
	}
</script>

<style>
	page {
		width: 100% !important;
		height: 100% !important;
		background-color: rgb(247, 247, 247) !important;
		padding-top: 20rpx;
	}

	.richImg {
		display: block !important;
		width: 100% !important;
		margin: auto !important;
		border-radius: 20rpx !important;
		margin-top: 20rpx !important;
	}
</style>

<style lang="scss" scoped>
	.content>view:nth-child(1) {
		width: 94%;
		height: 460rpx;
		margin: auto;
		border-radius: 20rpx;
	}

	.content>view:nth-child(1)>swiper {
		width: 100%;
		height: 100%;
	}

	.img {
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
	}

	.center {
		width: 94%;
		height: 240rpx;
		background-color: white;
		margin: 30rpx auto;
		border-radius: 20rpx;
	}

	.center>text:nth-child(1),
	.center>text:nth-child(2),
	.center>text:nth-child(3),
	.center>text:nth-child(4) {
		display: inline-block;
		font-size: 32rpx;
		font-weight: 550;
		padding-top: 20rpx;
		margin-left: 10rpx;
	}

	.center>view:nth-child(5) {
		height: 160rpx;
		display: flex;
		align-items: center;
	}

	.tel {
		margin-left: 20rpx;
	}

	.tel>view {
		display: flex;
		align-items: baseline;
	}

	.tel>view>image:nth-child(1) {
		width: 22rpx;
		height: 26rpx;
	}

	.tel>view:nth-child(2)>image:nth-child(1) {
		width: 26rpx;
		height: 26rpx;
	}

	.tel>view>text:nth-child(2) {
		display: inline-block;
		width: 500rpx;
		font-size: 28rpx;
		margin-top: 30rpx;
		margin-left: 14rpx;
	}

	.site {
		height: 60rpx;
		border-left: 1rpx solid rgb(240, 240, 240);
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-left: 20rpx;
	}

	.site>image {
		width: 37rpx;
		height: 37rpx;
		position: absolute;
	}

	.site>text {
		font-size: 28rpx;
		margin-top: 40rpx;
	}

	.shopList {
		width: 94%;
		height: 100%;
		margin: auto;
		margin-top: -100rpx;
		border-radius: 20rpx;
		background-color: white;
		padding-top: 30rpx;
		margin-top: 20rpx;

		&>view:nth-child(1) {
			display: flex;
			align-items: center;

			&>image:nth-child(1) {
				width: 60rpx;
				height: 60rpx;
				margin-left: 30rpx;
			}

			text:nth-child(2) {
				font-size: 32rpx;
				font-weight: 550;
				margin-left: -34rpx;
				margin-top: 4rpx;
				z-index: 2;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				white-space: nowrap;
			}
		}

		.list {
			width: 100%;
			height: 200rpx;
			margin: 20rpx auto;

			&>view:nth-child(1) {
				display: flex;
				align-items: stretch;

				&>image:nth-child(1) {
					width: 240rpx;
					height: 160rpx;
					border-radius: 20rpx;
					margin-left: 30rpx;
				}

				&>view:nth-child(2) {
					text:nth-child(1) {
						display: block;
						width: 400rpx;
						font-size: 30rpx;
						font-weight: 550;
						margin-left: 20rpx;
						margin-top: 10rpx;
					}

					&>text:nth-child(2) {
						display: block;
						width: 380rpx;
						font-weight: 400;
						font-size: 28rpx;
						color: gray;
						margin-left: 20rpx;
						margin-top: 26rpx;
						word-break: break-all;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
				}
			}
		}
	}

	.shop {
		width: 94%;
		height: 100%;
		margin: auto;
		border-radius: 20rpx;
		background-color: white;
		padding: 30rpx 0rpx;
		margin-top: 20rpx;
	}

	.shop>view:nth-child(1) {
		display: flex;
		justify-content: space-around;
		font-size: 32rpx;
	}

	.shop>view:nth-child(1)>view {
		display: flex;
		align-items: center;
		flex-direction: column-reverse;
	}

	.shop>view:nth-child(1)>view>text:nth-child(1) {
		color: #666666;
	}

	.shop>view:nth-child(1)>view>text:nth-child(2) {
		display: block;
		width: 130rpx;
		height: 10rpx;
		border-radius: 20rpx;
		position: relative;
		top: 60rpx;
	}

	// 点击添加的样式
	.text {
		font-weight: 550;
		color: black !important;
	}

	.text1 {
		background-color: #CDA67F;
	}

	.detail {
		width: 92%;
		margin: 50rpx auto;
		font-size: 30rpx;
		color: #666666;
		margin-top: 40rpx;
	}

	.use {
		width: 92%;
		margin: 50rpx auto;
		font-size: 30rpx;
		color: #666666;
		margin-top: 40rpx;
	}
</style>
