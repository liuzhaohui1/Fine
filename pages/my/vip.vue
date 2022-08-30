<template>
	<view>
		<view class="content">
			<view>
				<text>照片</text>
				<image src="../../static/image/uptx.jpg" @click="uptx" v-if="imgNone" mode=""></image>
				<image :src="img" @click="uptx" v-else mode=""></image>
			</view>
			<view>
				<text>昵称</text>
				<text>{{myMsg.username}}</text>
			</view>
			<view>
				<text>姓名</text>
				<input type="text" placeholder="请输入" v-model="name" :disabled='disabled'>
			</view>
			<view>
				<text>性别</text>
				<uni-section>
					<uni-data-select v-model="value" :localdata="range" @change="change" :disabled='disabled'
						:clear="false">
					</uni-data-select>
				</uni-section>
				<!-- <input type="text" placeholder="请输入" v-model="gender"> -->
			</view>
			<view>
				<text>年龄</text>
				<input type="text" placeholder="请输入" v-model="age" :disabled='disabled'>
			</view>
			<view>
				<text>手机号码</text>
				<input type="text" placeholder="请输入" v-model="tel" :disabled='disabled'>
			</view>
			<view>
				<text>收货地址</text>
				<input type="text" placeholder="请输入" v-model="site" :disabled='disabled'>
			</view>
		</view>
		<view class="text">
			<text>*</text>
			<text>温馨提示：会员信息保存后不可更改</text>
		</view>
		<button @click="save" :disabled='disabled' :class="disabled == true?'button': ''">保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: '',
				img: '',
				myMsg: '',
				name: '',
				age: '',
				gender: '',
				site: '',
				tel: '',
				imgNone: true,
				disabled: true,
				value: '',
				is_perfect: '',
				range: [{
						value: 0,
						text: "女"
					},
					{
						value: 1,
						text: "男"
					},
				],
			}
		},
		onShow() {
			this.message();
			this.lookSave();
		},
		methods: {
			// 我的信息
			message() {
				let data = {
					token: uni.getStorageSync('token')
				}
				this.$api.message(data).then(res => {
					// console.log(res.data);
					this.myMsg = res.data
					this.tel = res.data.mobile
				})
			},
			// 会员信息查看
			lookSave() {
				let data = {
					token: uni.getStorageSync('token'),
					type: 1
				}
				this.$api.autoym(data).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: res.msg,
							icon: 'error'
						})
					} else {
						// console.log('111', res);
						this.name = res.data.truename;
						this.value = res.data.gender;
						this.age = res.data.age;
						this.site = res.data.address;
						this.tel = res.data.mobile;
						this.img = res.data.photo;
						this.is_perfect = res.data.is_perfect;
						if (res.data.is_perfect == 2) {
							this.disabled = true;
						} else if (res.data.is_perfect == 1) {
							this.disabled = false;
						}
						if (res.data.photo !== '') {
							this.imgNone = false;
						}
					}
				})
			},
			// 会员信息修改
			save() {
				let data = {
					token: uni.getStorageSync('token'),
					truename: this.name, //姓名
					mobile: this.tel, //手机号
					gender: this.gender, // 0女 1男
					age: this.age, //年龄
					address: this.site, // 地址
					photo: this.img, //照片
					type: 2
				}
				this.$api.autoym(data).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: res.msg,
							icon: 'error'
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'success'
						})
					}
				})
			},
			change(e) {
				console.log("e:", e);
				this.gender = e;
			},
			// 上传头像
			uptx() {
				if (this.is_perfect == 2) {
					uni.showModal({
						title: '提示',
						content: '您已实名认证,不可更改照片',
						confirmColor: '#CDA67F',
						cancelColor: '#666666',
						showCancel: false
					})
				} else {
					uni.chooseImage({
						count: 1,
						sizeType: ['compressed'],
						sourceType: ['album'],
						success: (chooseImageRes) => {
							console.log(chooseImageRes);
							const tempFilePaths = chooseImageRes.tempFilePaths;
							// console.log(tempFilePaths);
							// 调用接口上传至服务器
							uni.uploadFile({
								url: 'https://information.zzqtrj.net/api/common/upload',
								filePath: tempFilePaths[0],
								name: 'file',
								formData: {
									"file": chooseImageRes.tempFiles[0],
								},
								success: uploadFileRes => {
									console.log('上传成功', uploadFileRes);
									var res = JSON.parse(uploadFileRes.data);
									console.log(res.data.url);
									this.imgUrl = res.data.url;
									this.img = res.data.url;
									this.imgNone = false;
								}
							})
						},
					});
				}
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
		width: 85%;
		height: 760rpx;
		border-radius: 20rpx;
		background-color: white;
		margin: 20rpx auto;
		padding: 30rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #1B1B1B;
	}

	.content>view:nth-child(1) {
		height: 140rpx;
	}

	.content>view:nth-child(7) {
		height: 140rpx;
		border: none;
	}

	.content>view {
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid rgb(240, 240, 240);
	}

	.content>view>image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin-right: 10rpx;
	}

	.content>view>text:nth-child(2) {
		margin-right: 10rpx;
	}

	input {
		text-align: right;
		font-size: 30rpx;
		margin-right: 10rpx;
	}

	.text {
		width: 90%;
		margin: auto;
		margin-top: 30rpx;
	}

	.text>text:nth-child(1) {
		font-size: 28rpx;
		color: red;
	}

	.text>text:nth-child(2) {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
		margin-left: 10rpx;
	}

	button {
		width: 80%;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		background: #CDA67F;
		border-radius: 50rpx;
		margin-top: 60rpx;
		border: 2rpx solid #CDA67F;
	}

	.button {
		border: 2rpx solid #666666 !important;
	}

	uni-section {
		z-index: 5;
		text-align: right;
		width: 100rpx;
	}
</style>
