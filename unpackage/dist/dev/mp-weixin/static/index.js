import http from '@/static/request.js'
import Base64 from '@/static/base.js'

// 登录
export const login = (data)=>http.post('/user/wechatLogin',Base64.encode(JSON.stringify(data)))

// 作品展示
export const workList = (data)=>http.post('/api/works/worksList',Base64.encode(JSON.stringify(data)))

// 作品详情
export const workShow = (data)=>http.post('/api/works/worksDetails',Base64.encode(JSON.stringify(data)))

// 评论列表
export const comment = (data)=>http.post('/api/works/commentList',Base64.encode(JSON.stringify(data)))

// 点赞列表
export const good = (data)=>http.post('/api/works/likeList',Base64.encode(JSON.stringify(data)))

//公共参数
export const gong = ()=>http.post('/api/user/config')

//我的信息
export const message = (data)=>http.post('/api/user/mine',Base64.encode(JSON.stringify(data)))

//会员实名认证
export const autoym = (data)=>http.post('/api/user/certified',Base64.encode(JSON.stringify(data)))

//会员实名认证
export const myVip = (data)=>http.post('/api/user/memberLog',Base64.encode(JSON.stringify(data)))

//我的订单列表
export const order = (data)=>http.post('/api/user/orderList',Base64.encode(JSON.stringify(data)))

// 取消订单
export const cancel = (data)=>http.post('/api/user/orderCancel',Base64.encode(JSON.stringify(data)))

// 课程视频
export const video = (data)=>http.post('/api/video/videoList',Base64.encode(JSON.stringify(data)))

// 提交评论
export const submitComment = (data)=>http.post('/api/works/sendComment',Base64.encode(JSON.stringify(data)))

// 点赞作品
export const goodWorks = (data)=>http.post('/api/works/sendLike',Base64.encode(JSON.stringify(data)))

// 发布作品
export const upload = (data)=>http.post('/api/works/sendWorks',Base64.encode(JSON.stringify(data)))

// 上传图片
// export const uploadPic = (data)=>http.post('/api/common/upload',Base64.encode(JSON.stringify(data)))

// 门店列表
export const shopList = (data)=>http.post('/api/index/shopList',Base64.encode(JSON.stringify(data)))

// 门店详情
export const shopOrder = (data)=>http.post('/api/index/shopDetails',Base64.encode(JSON.stringify(data)))

// 课程详情
export const classOrder = (data)=>http.post('/api/index/courseDetails',Base64.encode(JSON.stringify(data)))

// 课程预约
export const courseOrder = (data)=>http.post('/api/index/courseOrder',Base64.encode(JSON.stringify(data)))