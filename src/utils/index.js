// 公共提示
export const toast = (option) => {
	if (typeof option === 'string') {
		uni.showToast({
			title: option,
			icon: 'none',
			duration: 2000
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
			duration: 2000,
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
