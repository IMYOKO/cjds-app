// 公共提示
const DELAY = 3000
export const toast = (option) => {
	if (typeof option === 'string') {
		uni.showToast({
			title: option,
			icon: 'none',
			duration: DELAY
		});
	} else {
		const {
			title,
			success,
			fail
		} = option
		uni.showToast({
			title,
			icon: 'none',
			duration: DELAY,
			success,
			fail
		});
	}
}

export const showLoading = (option) => {
	if (typeof option === 'string') {
		uni.showLoading({
			title: option,
			mask: true
		})
	} else {
		uni.showLoading({
			mask: true,
			...option
		})
	}
}

export const hideLoading = () => {
	uni.hideLoading();
}
