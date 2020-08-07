<template>
	<view class="game">
		<view class="v-player-wrapper lin-shi">
			<view class="back" @click="goHome">
				首页
			</view>
			<OrderAction />
		</view>
		<!-- <VideoPlayer>
			<cover-view class="v-player-wrapper">
				<view class="back" @click="goHome">
					首页
				</view>
				<OrderAction />
			</cover-view>
		</VideoPlayer> -->
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from "vuex";
	import VideoPlayer from '@/components/common/video-player'
	import OrderAction from '@/components/game/order-action'
	export default {
		data() {
			return {
				timer: null
			}
		},
		onLoad(option) {
			const id = option.id || 0
			this.updateGameTableId(id)
			this.getUserInfo(id)
			this.timer = setInterval(() => {
				this.getUserInfo(id)
			}, 15000)
			this.getGameTable()
		},
		onUnload() {
			console.log('onUnload')
			this.clearData()
			clearInterval(this.timer)
		},
		components: {
			VideoPlayer,
			OrderAction
		},
		methods: {
			...mapMutations("Games", ['updateDiceMoney', 'clearDiceData', 'updateGameTableId']),
			...mapActions("User", ["getUserInfo"]),
			...mapActions("Games", ["getGameTable"]),
			clearData() {
				this.updateDiceMoney(0)
				this.clearDiceData()
			},
			goHome() {
				uni.redirectTo({
					url: '/pages/home'
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url('~@/assets/styles/common.less');

	.game {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		overflow: hidden;
	}
	
	.v-player-wrapper {
		height: 100vh;
	}
	
	.lin-shi {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		overflow: hidden;
		background: url("~@/assets/images/home/home_bg@2x.png") center center no-repeat;
		background-size: contain;
	}

	.back {
		color: #fff;
		width: 120/@rem;
		height: 78/@rem;
		line-height: 78/@rem;
		text-align: center;
		background-color: #4f4f4f;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 200;
	}
</style>
