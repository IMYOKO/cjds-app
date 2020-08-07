import { showLoading, hideLoading } from "@/utils/index.js";
const defaultheader = () => {
    const token = uni.getStorageSync("token") || null
    if (token) {
        return {
			'Content-Type': 'application/json; charset=UTF-8',
            token: encodeURIComponent(token)
        }
    }
    return {}
}
class BasicRequest {
    request(method, url, data = {}, loading = false) {
		const headers = defaultheader()
		loading && showLoading('请求中...')
        return new Promise((reslove, reject) => {
            uni.request({
                method,
                url,
                data,
                header: { ...headers },
                success: res => {
                    if (res.statusCode === 200 && res.data && res.data.Status === true) {
                        return reslove(res.data.Data)
                    } else {
                        return reject(res.data)
                    }
                },
                fail: err => {
                    return reject(err)
                },
                complete: (data) => {
					loading && hideLoading()
				}
            })
        })
    }
    get(url, data, loading) {
        return this.request('GET', url, data, loading)
    }
    post(url, data, loading) {
        return this.request('POST', url, data, loading)
    }
}

export default BasicRequest