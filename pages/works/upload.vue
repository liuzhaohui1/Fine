<template>
	<view>
		<view class="text">
			<textarea class="textarea" placeholder="快来发布你的作品吧~" placeholder-style="font-size:30rpx" v-model="text" />
			<!-- @linechange="descInput" -->
		</view>
		<view class="picture">
			<text>上传图片</text>
			<view>
				<uni-file-picker limit="3" @select="select" v-model="imageValue">
					<image class="img" src="../../static/image/up.png" mode=""></image>
				</uni-file-picker>
			</view>
		</view>
		<button @click="succeed">发布</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://information.zzqtrj.net',
				text: '',
				img: '',
				file: [],
				list: '',
				picList: [],
				imageValue: [],
				file1: [],
			}
		},
		methods: {
			// 发布作品
			succeed() {
				let data = {
					token: uni.getStorageSync('token'),
					content: this.text,
					images: this.file1
				}
				this.$api.upload(data).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: res.msg,
							icon: 'error'
						})
					} else {
						uni.navigateTo({
							url: './cg'
						})
					}
				})
			},
			select(e) {
				// console.log('选择文件：', e.tempFilePaths)
				let picList = e.tempFilePaths;
				// console.log('picList', picList);
				for(let i=0; i<picList.length; i++) {
					uni.uploadFile({
						url: 'https://information.zzqtrj.net/api/common/upload',
						filePath: picList[i],
						name: 'file',
						success: tempFiles => {
							// console.log('上传成功', tempFiles)
							var res = JSON.parse(tempFiles.data);
							this.file = res.data.url.split(',');
							// console.log('file',this.file);
							this.file.map(v => {
								this.file1.push(v)
								// console.log('123',this.file1);
							})
						}
					})
				}
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

	.text {
		width: 90%;
		height: 320rpx;
		background-color: white;
		border-radius: 20rpx;
		margin: 0 auto;
		margin-top: 20rpx;
		padding: 20rpx;
	}

	.picture {
		width: 90%;
		height: 100%;
		background-color: white;
		padding: 20rpx;
		margin: auto;
		margin-top: 30rpx;
		border-radius: 20rpx;
		padding-bottom: 30rpx;
	}

	.picture>text:nth-child(1) {
		display: block;
		font-size: 30rpx;
		font-weight: 550;
		margin-bottom: 30rpx;
	}

	.img {
		width: 204rpx;
		height: 204rpx;
		border-radius: 10rpx;
		border: 1rpx dashed gray;
	}

	textarea {
		width: 100%;
		padding: 10rpx;
	}

	button {
		width: 88%;
		margin-top: 60rpx;
		background-color: rgb(205, 166, 127);
		color: white;
		font-size: 32rpx;
		border-radius: 50rpx;
	}
</style>
