<template>
	<video class="video" preload :src="src" autoplay controls="false" show-center-play-btn="false" enable-progress-gesture="false"
	 @error="error" @waiting="waiting" muted>
		 <cover-view class="video-pop">
			<slot></slot>
		 </cover-view>
	</video>
</template>

<script>
	// 'rtmp://58.84.7.20:1935/hls/hls'
	// 'http://58.84.7.20:8081/vedio/1.mp4'
	export default {
		name: 'VideoPlayer',
		data() {
			return {
				src: 'http://58.84.7.20:8081/vedio/1.mp4'
			}
		},
		methods: {
			error(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			waiting(e) {
				console.log('waiting：', e)
			}
		}
	}
</script>

<style lang="less" scoped>
	.video {
		width: 100%;
		height: 100%;
		display: block;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 100;
		
		.video-pop {
			width: 100%;
			height: 100%;
			display: block;
			position: relative;
			left: 0;
			top: 0;
			z-index: 10;
		}
	}
</style>
