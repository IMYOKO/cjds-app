<template>
	<view class="">
		
	</view>
	<!-- <video ref="videoRef" class="video-js">
		<source src="http://58.84.7.20:8081/vedio/1.mp4" type="video/mp4">
	</video> -->
</template>

<script>
	// import videojs from "video.js";
	// import "video.js/dist/video-js.css";
	// import "videojs-flash";
	// import "videojs-contrib-hls";
	export default {
		name: "VideoPlayer",
		props: {
			options: {
				type: Object,
				default () {
					return {};
				}
			}
		},
		data() {
			return {
				player: null
			};
		},
		mounted() {
			console.log('sdsdsd', videojs)
			console.log(this.$refs.videoRef)
			// this.$nextTick(()=>{
			// 	this.player = videojs(
			// 		this.$refs.videoRef,
			// 		this.options,
			// 		function onPlayerReady() {}
			// 	);
			// })
		},
		beforeDestroy() {
			// if (this.player) {
			// 	this.player.dispose();
			// }
		}
	};
</script>

<style lang="less" scoped>
</style>
