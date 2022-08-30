
// 全局配置
export const common={
	baseUrl: "https://information.zzqtrj.net",
	header:{
		'Content-Type':'application/json;charset=UTF-8',
	},
	data:{request:''},
	method:'GET',
	dataType:'json'
}

export default {
	// 请求 返回promise
	request(options = {}){
		// 组织参数
		options.url = common.baseUrl + options.url
		options.header = options.header || common.header
		options.data = options.data || common.data
		options.method = options.method || common.method
		options.dataType = options.dataType || common.dataType
		
		// 请求
		return new Promise((res,rej)=>{
			// 请求之前... todos
			// uni.showLoading({
			// 	title:'加载中...'
			// })
			// 请求中...
			uni.request({
				...options,
				success: (result) => {
					// 返回原始数据
					if(result.statusCode!==200){
						if(result.data.msg=='请登录后操作'){
							uni.showToast({
								title: '您未登录请登录',
								icon: 'error'
							})						
							// console.log('请登录后操作');
							// uni.removeStorageSync('token')
							// uni.removeStorageSync('avatar')
							// uni.removeStorageSync('name')
							// uni.removeStorageSync('type')
							setTimeout(function() {
								uni.switchTab({
									url:'/pages/my/my'
								})
							}, 1000)
							return
						}
						uni.showToast({
							title:result.data.msg || '服务端失败',
							icon:'none'
						})
						rej(result.data)
					}
	
					return res(result.data)
				},
				fail: (error) => {
					uni.showToast({
						title: error.errMsg || '请求失败',
						icon: 'none'
					});
					return rej()
				},
				complete: () => {
					// uni.hideLoading()
				}
			});
		})
	},
	// post请求
	post(url,data,options = {}){
		options.url = url
		options.data =data?{ request_data:data }:{request:''}
		options.method = 'POST'
		return this.request(options)
	}
}