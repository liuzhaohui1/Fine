<template>
	<view style="overflow-x: hidden;">
		<view class="content">
			<view>
				<image :src=workShow_.avatar mode=""></image>
				<view>
					<text>{{workShow_.username}}</text>
					<text>{{workShow_.createtime}}</text>
				</view>
			</view>
			<text>{{workShow_.content}}</text>
			<view class="picture" @click="look">
				<image @click="look" :src=workShow_.images[0] mode=""></image>
				<image @click="look" :src=workShow_.images[1] mode=""></image>
				<image @click="look" :src=workShow_.images[2] mode=""></image>
			</view>
			<view class="comment">
				<view>
					<view @click="select(1)">
						<view style="width: 214rpx;">
							<image src="../../static/image/pinglun.png" v-if="none_1" mode=""></image>
							<image src="../../static/image/pl.png" v-if="none_2" mode=""></image>
							<text :class="{'text':test==1}">评论</text>
							<text :class="{'text':test==1}">{{workShow_.comment_count}}</text>
						</view>
						<text :class="{'text1':test==1}"></text>
					</view>
					<view @click="select1(2)">
						<view style="width: 214rpx;">
							<image src="../../static/image/dianzan.png" v-if="none_3" mode=""></image>
							<image src="../../static/image/dz.png" v-if="none_4" mode=""></image>
							<text :class="{'text':test==2}">点赞</text>
							<text :class="{'text':test==2}">{{workShow_.like_count}}</text>
						</view>
						<text :class="{'text1':test==2}"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="center" v-if="none" v-for="item,index in commentList_" :key="index">
			<view>
				<view>
					<image :src=item.avatar mode=""></image>
					<text>{{item.username}}</text>
				</view>
				<text>{{item.createtime}}</text>
			</view>
			<text>{{item.comment_content}}</text>
		</view>
		<view class="center" v-if="none1" v-for="item,index1 in goodList_" :key="index1">
			<view>
				<view>
					<image :src=item.avatar mode=""></image>
					<text>{{item.username}}</text>
				</view>
				<text>{{item.createtime}}</text>
			</view>
		</view>
		<view class="bottom">
			<image src="../../static/image/pinglun.png" mode=""></image>
			<input type="text" placeholder="写评论..." @confirm="doSearch" v-model="text">
			<view style="height: 20rpx;"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				test: 1,
				none: true,
				none1: false,
				none_1: false,
				none_2: true,
				none_3: true,
				none_4: false,
				workShow_: '',
				commentList_: '',
				goodList_: '',
				text: '',
				// 作品id
				id: '',
				page: 1,
				limit: 30,
				isNext: true,
			}
		},
		onLoad(option) {
			this.id = option.id
			// console.log('id',this.id);
		},
		onShow() {
			// this.page = 1;
			// this.isNext = true;
			// this.worksList = [];
			this.workShow();
			this.commentList();
		},
		// onReachBottom() {
		// 	if (this.isNext) {
		// 		this.isNext = false;
		// 		this.page++;
		// 		this.commentList();
		// 		console.log('page', this.page);
		// 	}
		// },
		// onReachBottom() {
		// 	if (this.isNext) {
		// 		this.isNext = false;
		// 		this.page++;
		// 		this.goodList();
		// 		console.log('page', this.page);
		// 	}
		// },
		methods: {
			// 作品详情
			workShow() {
				let data = {
					works_id: this.id
				}
				this.$api.workShow(data).then(res => {
					this.workShow_ = res.data
				})
			},
			// 评论列表
			commentList() {
				let data = {
					works_id: this.id,
					page: this.page,
					limit: this.limit
				}
				this.$api.comment(data).then(res => {
					// console.log('pinglun',res.data);
					this.commentList_ = res.data
					// console.log('评论了');
					// if (res.data.length == this.limit) {
					// 	this.isNext = true
					// }
					// this.commentList_ = [...this.commentList_, ...res.data]
					// if (res.code == 0) {
					// 	uni.showToast({
					// 		title: res.msg,
					// 		icon: 'error'
					// 	})
					// }
				})
			},
			// 点赞列表
			goodList() {
				let data = {
					works_id: this.id,
					page: this.page,
					limit: this.limit
				}
				this.$api.good(data).then(res => {
					// console.log('dianzan',res.data);
					this.goodList_ = res.data
					// if (res.data.length == this.limit) {
					// 	this.isNext = true
					// }
					// this.goodList_ = [...this.goodList_, ...res.data]
					// console.log('点赞了');
					// if (res.code == 0) {
					// 	uni.showToast({
					// 		title: res.msg,
					// 		icon: 'error'
					// 	})
					// }
				})
			},
			// 提交评论
			doSearch(item) {
				let data = {
					token: uni.getStorageSync('token'),
					works_id: this.id,
					content: this.text
				}
				this.$api.submitComment(data).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none',
						})
						this.text = ''
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'success'
						})
						this.text = '';
						this.commentList();
					}
				})
			},
			// 查看大图
			look() {
				uni.previewImage({
					urls: this.workShow_.images,
					current: this.workShow_,
				})
			},
			select(index) {
				this.test = index;
				this.none = true;
				this.none1 = false;
				this.none_1 = false;
				this.none_2 = true;
				this.none_3 = true;
				this.none_4 = false;
				// this.page = 1;
				// this.isNext = true;
				// this.commentList_ = [];
				// this.commentList();
			},
			select1(index) {
				this.test = index;
				this.none = false;
				this.none1 = true;
				this.none_1 = true;
				this.none_2 = false;
				this.none_3 = false;
				this.none_4 = true;
				// this.page = 1;
				// this.isNext = true;
				// this.goodList_ = [];
				this.goodList();
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

	page>view:nth-child(1)>view:nth-child(2) {
		margin-top: 118rpx;
	}

	.content {
		width: 100%;
		height: 100%;
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
		padding-bottom: 30rpx;
	}

	.comment>view:nth-child(1) {
		width: 95%;
		border-bottom: 1rpx solid rgb(230, 230, 230);
		margin: auto;
		margin-top: 20rpx;
		display: flex;
		justify-content: flex-start;
		line-height: 64rpx;
	}

	.comment>view:nth-child(1)>view {
		display: flex;
		align-items: center;
		flex-direction: column-reverse;
	}

	.comment>view:nth-child(1)>view>view {
		margin-bottom: 10rpx;
	}

	.comment>view:nth-child(1)>view>view>image {
		width: 30rpx;
		height: 30rpx;
		vertical-align: middle;
		margin-left: 40rpx;
	}

	.comment>view:nth-child(1)>view>view>text {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		margin-left: 10rpx;
		color: #999999;
		vertical-align: middle;
	}

	.comment>view:nth-child(1)>view>text:nth-child(2) {
		width: 150rpx;
		height: 10rpx;
		border-radius: 20rpx;
		position: absolute;
	}

	/* 点击添加的样式 */
	.text {
		color: #333333 !important;
	}

	.text1 {
		background-color: #CDA67F;
	}

	.center {
		width: 100%;
		height: 100%;
		background-color: white;
		padding: 10rpx 0;
	}

	.center>view:nth-child(1) {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.center>view:nth-child(1)>view {
		display: flex;
		align-items: center;
		margin-left: 40rpx;
	}

	.center>view:nth-child(1)>view>image {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
	}

	.center>view:nth-child(1)>view>text {
		font-size: 28rpx;
		font-weight: 550;
		margin-left: 20rpx;

	}

	.center>view:nth-child(1)>text:nth-child(2) {
		font-size: 28rpx;
		color: #999999;
		margin-right: 30rpx;
	}

	.center>text:nth-child(2) {
		display: block;
		font-size: 28rpx;
		margin-left: 40rpx;
		margin-top: 20rpx;
		margin-right: 39rpx;
		color: gray;
	}

	.bottom {
		width: 100%;
		height: 150rpx;
		background-color: white;
		position: fixed;
		bottom: 0rpx
	}

	.bottom>image {
		width: 31rpx;
		height: 28rpx;
		position: absolute;
		top: 56rpx;
		left: 9%;
		z-index: 5;
	}

	input {
		display: inline-block;
		background-color: rgb(230, 230, 230);
		width: 80%;
		height: 80rpx;
		border-radius: 50rpx;
		padding-left: 70rpx;
		position: relative;
		top: 30rpx;
		left: 5.5%;
	}
</style>
