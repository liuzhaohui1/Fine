<template>
	<view>
		<view class="top">
			<text @click="select1(1)" :class="{'top1':test==1}">待使用</text>
			<text @click="select2(2)" :class="{'top1':test==2}">已取消</text>
			<text @click="select3(3)" :class="{'top1':test==3}">已完成</text>
			<text @click="select4(4)" :class="{'top1':test==4}">全部预约</text>
		</view>
		<scroll-view scroll-y="true" style="height: 1300rpx;" @scrolltolower="lowerBottom">
			<!-- 待使用 -->
			<view class="user" v-if="none1" v-for="item,index in orderMsg" :key="index">
				<view>
					<text>{{item.course_name}}</text>
					<text>{{item.status_text}}</text>
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
				<button @click="cancel">取消预约</button>
			</view>
			<!-- 已取消 -->
			<view class="user1" v-if="none2" v-for="item,index1 in orderMsg" :key="index1">
				<view>
					<text>{{item.course_name}}</text>
					<text style="color: #666666;">{{item.status_text}}</text>
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
			<!-- 已完成 -->
			<view class="user1" v-if="none3" v-for="item,index2 in orderMsg" :key="index2">
				<view>
					<text>{{item.course_name}}</text>
					<text style="color: #999999;">{{item.status_text}}</text>
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
			<!-- 全部预约 -->
			<view class="user2" v-if="none4" v-for="item,index4 in orderMsg" :key="index4">
				<view>
					<text>{{item.course_name}}</text>
					<text :class="{'color':item.status == 3,'color1':item.status == 2}">{{item.status_text}}</text>
				</view>
				<view :class="{'active':item.status == 1}">
					<view>
						<text>预约时间：</text>
						<text>{{item.date}} {{item.start_time}} - {{item.end_time}}</text>
					</view>
					<view>
						<text>预约门店：</text>
						<text>{{item.shop_name}}</text>
					</view>
				</view>
				<button @click="cancel(item)" v-show="item.status == 1? true : false">取消预约</button>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				test: 1,
				none1: true,
				none2: false,
				none3: false,
				none4: false,
				// 订单列表
				status: 0,
				page: 1,
				limit: 7,
				// 订单列表
				orderMsg: '',
				id: ''
			}
		},
		onLoad(option) {
			this.test = option.index
			console.log('index', this.test);
			if (this.test == 1) {
				this.select1(1);
			} else if (this.test == 2) {
				this.select2(2);
			} else if (this.test == 3) {
				this.select3(3);
			} else if (this.test == 4) {
				this.select4(4);
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.orderMsg = [];
			this.page = 1;
			this.order();
			setTimeout(function() {
				uni.showToast({
					title: '刷新成功',
					icon: 'none',
					duration: 800
				})
				uni.stopPullDownRefresh() //停止下拉刷新
			}, 500)
		},
		methods: {
			select1(index) {
				this.test = index;
				this.none1 = true;
				this.none2 = false;
				this.none3 = false;
				this.none4 = false;
				this.status = 1;
				this.page = 1;
				this.orderMsg = [];
				this.order();
			},
			select2(index) {
				this.test = index;
				this.none1 = false;
				this.none2 = true;
				this.none3 = false;
				this.none4 = false;
				this.status = 3;
				this.page = 1;
				this.orderMsg = [];
				this.order();
			},
			select3(index) {
				this.test = index;
				this.none1 = false;
				this.none2 = false;
				this.none3 = true;
				this.none4 = false;
				this.status = 2;
				this.page = 1;
				this.orderMsg = [];
				this.order();
			},
			select4(index) {
				this.test = index;
				this.none1 = false;
				this.none2 = false;
				this.none3 = false;
				this.none4 = true;
				this.status = 0;
				this.page = 1;
				this.orderMsg = [];
				this.order();
			},
			// 订单列表
			order() {
				let data = {
					token: uni.getStorageSync('token'),
					status: this.status, //0全部 1待使用 2已完成 3已取消
					page: this.page, //当前页
					limit: this.limit //每页条数
				}
				this.$api.order(data).then(res => {
					if (res.data.length == this.limit) {
						this.isNext = true
					}
					console.log(res.data);
					this.orderMsg = [...this.orderMsg, ...res.data]
					this.id = res.data[0].id
					// console.log(this.id);
				})
			},
			// 上滑加载
			lowerBottom() {
				if (this.isNext) {
					this.isNext = false;
					this.page++;
					this.order();
					console.log('page', this.page);
				}
			},
			// 取消预约
			cancel(item) {
				uni.showModal({
					title: '提示',
					content: '您确认要取消预约？',
					confirmColor: '#CDA67F',
					cancelColor: '#666666',
					success: (res) => {
						res.confirm ? this.noOrder() : ''
					}
				})
			},
			noOrder() {
				let data = {
					token: uni.getStorageSync('token'),
					order_id: this.id,
				}
				this.$api.cancel(data).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'success'
						})
					}
					this.orderMsg = '';
					this.order();
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

	.top {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		color: gray;
		font-size: 32rpx;
		background-color: white;
		display: flex;
		justify-content: space-around;
	}

	.top1 {
		color: #CDA67F !important;
		font-weight: 550;
	}

	.user {
		width: 88%;
		/* height: 270rpx; */
		margin: auto;
		margin-top: 20rpx;
		padding: 30rpx;
		border-radius: 20rpx;
		background-color: white;
		overflow: hidden;
	}

	.user>view:nth-child(1) {
		display: flex;
		justify-content: space-between;
		font-size: 30rpx;
		margin-left: 10rpx;
	}

	.user>view:nth-child(1)>text:nth-child(1) {
		font-size: 30rpx;
		font-weight: 550;
	}

	.user>view:nth-child(1)>text:nth-child(2) {
		font-size: 30rpx;
		color: #CDA67F;
	}

	.user>view:nth-child(2) {
		margin-top: 30rpx;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid rgb(247, 247, 247)
	}

	.active {
		margin-top: 30rpx !important;
		padding-bottom: 20rpx !important;
		border-bottom: 1rpx solid rgb(247, 247, 247) !important;
	}

	.color {
		color: #666666 !important;
	}

	.color1 {
		color: #999999 !important;
	}

	.user>view:nth-child(2)>view {
		margin-top: 10rpx;
		margin-left: 10rpx;
	}

	.user>view:nth-child(2)>view>text:nth-child(1) {
		font-size: 30rpx;
	}

	.user>view:nth-child(2)>view>text:nth-child(2) {
		font-size: 30rpx;
		color: gray;
	}

	button {
		width: 200rpx;
		font-size: 28rpx;
		margin-top: 20rpx;
		border-radius: 50rpx;
		background-color: white;
		color: gray;
		border: 1rpx solid gray;
		float: right;
	}

	.user1 {
		width: 88%;
		margin: auto;
		margin-top: 20rpx;
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

	.user2 {
		width: 88%;
		/* height: 270rpx; */
		margin: auto;
		margin-top: 20rpx;
		padding: 30rpx;
		border-radius: 20rpx;
		background-color: white;
		overflow: hidden;
	}

	.user2>view:nth-child(1) {
		display: flex;
		justify-content: space-between;
		font-size: 30rpx;
		margin-left: 10rpx;
	}

	.user>view:nth-child(1)>text:nth-child(1) {
		font-size: 30rpx;
		font-weight: 550;
	}

	.user2>view:nth-child(1)>text:nth-child(2) {
		font-size: 30rpx;
		color: #CDA67F;
	}

	.user2>view:nth-child(2) {
		margin-top: 30rpx;
		padding-bottom: 0rpx;
	}

	.user2>view:nth-child(2)>view {
		margin-top: 10rpx;
		margin-left: 10rpx;
	}

	.user2>view:nth-child(2)>view>text:nth-child(1) {
		font-size: 30rpx;
	}

	.user2>view:nth-child(2)>view>text:nth-child(2) {
		font-size: 30rpx;
		color: gray;
	}
</style>
