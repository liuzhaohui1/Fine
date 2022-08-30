<template>
	<view class="content">
		<swiper :circular="circular" :autoplay="autoplay" :interval="interval" :duration="duration"
			indicator-active-color="rgb(126, 84, 68)" indicator-color="#ffffff" indicator-dots="true">
			<swiper-item v-for="item,index1 in banner" :key="index1">
				<image :src='item'></image>
			</swiper-item>
		</swiper>
		<view class="classDetail">
			<text>{{classOrder_.course_name}}</text>
		</view>
		<view class="date">
			<view class="time">
				<image src="../../static/image/ty.png" mode=""></image>
				<text>选择预约时间</text>
			</view>
			<!-- 日历组件 -->
			<uni-calendar class="uni-calendar--hook" showMonth="false" @change="change" :startDate="startDate"
				:endDate="endDate" />
		</view>
			<view class="order">
				<image src="../../static/image/ty.png" mode=""></image>
				<text>请选择适合您的预约时间段</text>
				<view>
					<text v-for="(item,index) in time" :key="index" @click="select(index,item)"
						:class="test === index?'text1':''">{{item.start_time}}-{{item.end_time}}({{item.use_num}}/{{item.total_num}})</text>
				</view>
			</view>
		<view class="classDetail1" :style="height">
			<image src="../../static/image/ty.png" mode=""></image>
			<text>课程详情</text>
			<text>{{classOrder_.course_desc}}</text>
		</view>
		<view class="flex">
			<text @click="look" class="text" v-if="chakan">查看更多</text>
			<image src="../../static/image/jiantou.png" v-if="chakan" mode=""></image>
		</view>
		<view style="height: 150rpx;"></view>
		<view class="btn">
			<button @click="make" class="button">立即预约</button>
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
				test: '',
				none: true,
				none1: false,
				// 日历
				showCalendar: false,
				startDate: this.getTime(),
				endDate: this.getTime1(),
				// test: 0,
				id: '',
				classOrder_: '',
				banner: '',
				time: [],
				// 预约
				time_id: '',
				date: this.getTime(),
				type: '',
				time1: '',
				start_time: '',
				span: ' ',
				timeDate: '',
				timestamp: '',
				timestamp1: '',
				height: 'height: 320rpx;',
				chakan: true
			}
		},
		onLoad(option) {
			this.id = option.id
		},
		onShow() {
			this.classOrder();
			this.message();
			this.timeDate_();
		},
		methods: {
			classOrder() {
				let data = {
					course_id: this.id
				}
				this.$api.classOrder(data).then(res => {
					// console.log(res);
					// 课程详情
					this.classOrder_ = res.data;
					// 轮播图
					this.banner = res.data.course_banner;
					// 默认第一个时间段id
					this.time_id = res.data.time[0].id;
					// 预约时间段
					this.time = res.data.time;
					// console.log(this.time);
				})
			},
			// 我的信息 判断是否为会员
			message() {
				let data = {
					token: uni.getStorageSync('token')
				}
				this.$api.message(data).then(res => {
					this.type = res.data.type
					// console.log(this.type);
				})
			},
			// 预约成功
			make() {
				if (this.type == 1) {
					uni.showModal({
						title: '不可预约',
						content: '您暂未开通会员,门店开通会员后可预约',
						confirmColor: '#CDA67F',
						cancelColor: '#666666',
						showCancel: false
					})
				} else {
					let data = {
						token: uni.getStorageSync('token'),
						course_id: this.id,
						time_id: this.time_id,
						date: this.date,
					}
					this.$api.courseOrder(data).then(res => {
						console.log(res);
						if (res.code == 0) {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						} else {
							uni.navigateTo({
								url: '././make'
							})
						}
					})
				}
			},
			change(e) {
				console.log('change 返回:', e)
				this.date = e.fulldate
				this.timeDate_();
			},
			// 选择时间段添加样式
			select(index, item) {
				this.test = index;
				this.time_id = item.id;
				this.start_time = item.start_time;
				this.timeProcessing();
				this.disableClick();
			},
			// 获取当前时间戳
			timeDate_() {
				this.timestamp = new Date().getTime();
				// console.log('当前时间戳',this.timestamp);
			},
			// 转换点击按钮时间戳
			timeProcessing() {
				let timeDate = this.date + this.span + this.start_time + ':' + '00';
				// console.log('点击后的时间',timeDate);
				this.timestamp1 = Date.parse(timeDate.replace(/-/g, '/'));
				// console.log('点击后的时间转化时间戳',this.timestamp1)
			},
			// 判断按钮是否可点击
			disableClick() {
				console.log(this.timestamp, this.timestamp1);
				if (this.timestamp > this.timestamp1) {
					uni.showModal({
						title: '不可预约',
						content: '当前时间段已过,请您重新选择预约时间',
						confirmColor: '#CDA67F',
						cancelColor: '#666666',
						showCancel: false,
					})
					this.test = '';
				} else {
					console.log('当前时段可选');
				}
			},
			// 获取当前日期
			getTime: function() {
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate();
				if (month >= 1 && month <= 9) month = '0' + month;
				if (day >= 0 && day <= 9) day = '0' + day;
				var timer = year + '-' + month + '-' + day;
				return timer;
			},
			// 结束日期
			getTime1: function() {
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 2,
					day = date.getDate();
				if (month >= 1 && month <= 9) month = '0' + month;
				if (day >= 0 && day <= 9) day = '0' + day;
				var timer = year + '-' + month + '-' + day;
				return timer;
			},
			// 点击显示全部详情
			look() {
				this.height = 'height: 100%;';
				this.chakan = false;
			},
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background-color: rgb(247, 247, 247);
	}

	.button>image {
		width: 50rpx;
		height: 50rpx;
	}

	swiper {
		width: 100%;
		height: 400rpx;
	}

	swiper-item>image {
		width: 100%;
		height: 100%;
		border-radius: 0;
	}

	.classDetail {
		width: 90%;
		height: 100%;
		margin: 30rpx auto;
		padding: 20rpx;
		border-radius: 20rpx;
		background-color: white;
		text-align: center;
	}

	.classDetail>text:nth-child(1) {
		display: block;
		font-size: 32rpx;
		font-weight: 550;
	}

	.classDetail1 {
		width: 88%;
		height: 500rpx;
		overflow: hidden;
		margin: 20rpx auto;
		padding: 20rpx;
		border-radius: 20rpx;
		background-color: white;
		margin-bottom: 0rpx;
	}
	.classDetail1>image {
		width: 26rpx;
		height: 26rpx;
		margin-left: 10rpx;
	}
	.classDetail1>text:nth-child(2) {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #1A1A1A;
		margin-left: 20rpx;
	}
	.classDetail1>text:nth-child(3) {
		display: block;
		color: #666666;
		font-size: 30rpx;
		margin-top: 20rpx;
	}

	.btn {
		width: 100%;
		height: 130rpx;
		position: fixed;
		bottom: 0rpx;
		background-color: white;
	}

	.date {
		width: 94%;
		height: 100%;
		margin: auto;
		border-radius: 20rpx;
		background-color: white;
		padding-bottom: 30rpx;
		position: relative;
	}

	.time {
		width: 88%;
		height: 44rpx;
		padding: 20rpx;
		background-color: white;
		border-radius: 10rpx 10rpx 0 0;
		z-index: 5;
	}

	.time>image {
		width: 26rpx;
		height: 26rpx;
	}

	.time>text {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #1A1A1A;
		margin-left: 20rpx;
	}

	.order {
		width: 88%;
		padding: 20rpx;
		background-color: white;
		margin: auto;
		margin-top: 20rpx;
		border-radius: 20rpx;
	}
	
	.order>image {
		width: 26rpx;
		height: 26rpx;
	}
	
	.order>text {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #1A1A1A;
		margin-left: 20rpx;
	}

	.order>view:nth-child(3) {
		width: 100%;
		margin-top: 20rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		margin-top: 20rpx;
	}

	.order>view:nth-child(3)>text:nth-child(2n) {
		margin-left: 6.5%;
	}

	.order>view>text {
		display: block;
		width: 46%;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		border: 1rpx solid #AAAAAA;
		margin-top: 20rpx;
		border-radius: 10rpx;
		color: #666666;
		font-size: 26rpx;
		display: inline-block;
		background-color: white;
		margin-left: 0;
	}

	.text1 {
		background-color: rgb(247, 236, 233) !important;
		color: #CDA67F !important;
		border: 1rpx solid #CDA67F !important;
	}

	.button {
		width: 84%;
		margin-top: 10rpx;
		color: white;
		font-size: 32rpx;
		font-weight: 550;
		border-radius: 50rpx;
		background-color: #CDA67F;
		border: 2rpx solid #CDA67F;
	}

	.flex {
		position: relative;
	}

	.flex>image {
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		top: 24rpx;
		left: 57%;
	}

	.text {
		display: block;
		text-align: center;
		width: 94%;
		margin: auto;
		color: #8a8a8a;
		font-size: 26rpx;
		border-radius: 20rpx;
		background-color: white;
		padding: 20rpx 0rpx;
	}
</style>
