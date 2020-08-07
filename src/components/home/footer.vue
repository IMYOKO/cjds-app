<template>
	<view class="footer" :class="{'show': showFooter}">
		<view class="footer-action-wrapper">
			<ul class="footer-action-content">
				<li v-for="item in list" :key="item.title">
					<view class="footer-action-item" @click="item.handle">
						<image :src="item.src" alt=""></image>
					</view>
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
	import iconVideo from "@/assets/images/home/icon_video@2x.png";
	import iconMessage from "@/assets/images/home/icon_message@2x.png";
	import iconSounds from "@/assets/images/home/icon_sounds@2x.png";
	import iconSoundOpen from "@/assets/images/home/icon_sound_open@2x.png";
	import iconRecord from "@/assets/images/home/icon_record@2x.png";
	import iconRules from "@/assets/images/home/icon_rules@2x.png";
	import iconSetting from "@/assets/images/home/icon_setting@2x.png";
	import iconPassword from "@/assets/images/home/icon_password@2x.png";
	import iconChangePW from "@/assets/images/home/icon_changePW@2x.png";
	export default {
		props: {
			showFooter: Boolean
		},
		data() {
			return {
				list: [],
				soundMute: uni.getStorageSync('bgm') === 'mute' ? true : false,
				innerAudioContext: null
			};
		},
		mounted() {
			this.list = [{
					title: "全景视频",
					src: iconVideo,
					handle: () => {
						this.goVideo()
					},
				},
				{
					title: "信息",
					src: iconMessage,
					handle: () => {
						this.goVip()
					},
				},
				{
					title: "声音",
					src: this.soundMute ? iconSounds : iconSoundOpen,
					handle: () => {
						this.setSound()
					},
				},
				{
					title: "记录",
					src: iconRecord,
					handle: this.goOrder,
				},
				{
					title: "规则",
					src: iconRules,
					handle: () => {
						this.goRules()
					},
				},
				// {
				// 	title: "设置",
				// 	src: iconSetting,
				// 	handle: () => {},
				// },
				{
					title: "提款密码",
					src: iconPassword,
					handle: () => {
						this.goPassword(0)
					},
				},
				{
					title: "修改密码",
					src: iconChangePW,
					handle: () => {
						this.goPassword(1)
					},
				},
			];
			this.audioContext()
		},
		beforeDestroy() {
			this.innerAudioContext.destroy()
			this.innerAudioContext = null
		},
		methods: {
			goOrder() {
				uni.redirectTo({
					url: '/pages/order'
				});
			},
			goPassword(type) {
				uni.redirectTo({
					url: `/pages/password?type=${type}`
				});
			},
			goRules() {
				uni.redirectTo({
					url: '/pages/rules'
				});
			},
			goVip() {
				uni.redirectTo({
					url: '/pages/vip'
				});
			},
			setSound() {
				this.soundMute = !this.soundMute;
				if (this.soundMute) {
					uni.setStorageSync('bgm', 'mute');
					this.innerAudioContext.stop()
					this.$set(this.list, 2, {
						title: "声音",
						src: iconSounds,
						handle: () => {
							this.setSound()
						},
					})
				} else {
					uni.removeStorageSync('bgm');
					this.innerAudioContext.play()
					this.$set(this.list, 2, {
						title: "声音",
						src: iconSoundOpen,
						handle: () => {
							this.setSound()
						},
					})
				}
			},
			goVideo() {
				uni.redirectTo({
					url: '/pages/video'
				});
			},
			audioContext() {
				if (this.innerAudioContext) {
					return
				}
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = false;
				innerAudioContext.loop = true;
				innerAudioContext.volume = 0.6;
				innerAudioContext.src = 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3';
				innerAudioContext.onPlay(() => {
					console.log('开始播放');
				});
				innerAudioContext.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});
				if (!this.soundMute) {
					innerAudioContext.play()
				}
				this.innerAudioContext = innerAudioContext
			}
		}
	};
</script>

<style lang="less" scoped>
	@import url('~@/assets/styles/common.less');

	.footer {
		position: absolute;
		left: 0;
		bottom: -92/@rem;
		z-index: 10;
		width: 100%;
		height: 64/@rem;
		background-color: #15110d;
		border-top: 1px solid #8e8569;
		transition: bottom 0.3s;

		&.show {
			bottom: 0;
		}
	}

	.footer-action-wrapper {
		height: 100%;
		// margin-left: 86/@rem;
		position: relative;

		.footer-action-content {
			position: absolute;
			left: 0;
			bottom: 2px;
			width: 100%;
			display: flex;
			justify-content: space-between;
		}

		li {
			flex: 1;
			display: flex;
			justify-content: center;
		}

		.footer-action-item {
			align-items: center;
			width: 96/@rem;
			height: 92/@rem;

			image {
				display: block;
				max-width: 100%;
				height: 100%;
			}
		}
	}
</style>
