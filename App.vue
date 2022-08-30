<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			const updateManager = uni.getUpdateManager(); // 获取更新管理器对象
			updateManager.onCheckForUpdate(function(res) {
				// console.log(res,"res")    //检测更新结果
				if (res.hasUpdate) {
					updateManager.onUpdateReady(function() {
						uni.showModal({
							title: '更新提示',
							content: '新版本已经准备好，点击确定重新启动',
							showCancel: false,
							success: res => {
								if (res.confirm) {
									updateManager.applyUpdate();
								}
							}
						})
					})
					updateManager.onUpdateFailed(function() {
						uni.showModal({
							title: '提示',
							content: '检查到有新版本，但是下载失败，请检查网络设置',
							showCancel: false
						})
					})
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	// @import 'uni_modules/uview-ui/index.scss'
	.uni-calendar-item--isDay {
		background-color: #CDA67F !important;
		border-radius: 50%;
	}

	.uni-calendar-item--checked {
		background-color: #CDA67F !important;
		border-radius: 50%;
	}

	.uni-select {
		border: none !important;
	}

	.uni-select__selector-empty,
	.uni-select__selector-item {
		padding: 0 40rpx !important;
	}

	.uni-select--disabled {
		background-color: white !important;
	}
</style>
