<template>
	<view class="content-wrapper">
		<view class="content-box">
			<view class="left-wrapper">
				<view class="left-box">
					<view class="rank-wrapper">
						<ul class="rank-list">
							<li v-for="({NickName, YL}, index) in rankList" :key="index">
								<view class="list-content">
									<view class="rank-img">
										<view :class="`img img-${index}`" v-if="index < 3"></view>
										<view class="img" v-else>
											{{index + 1}}
										</view>
									</view>
									<view class="rank-info">
										<h3>{{NickName}}</h3>
										<h4>{{YL}}</h4>
									</view>
								</view>
							</li>
						</ul>
					</view>
				</view>
			</view>
			<view class="right-wrapper">
				<view class="right-wrapper-content">
					<view class="message-loop-wrapper">
						<view class="message-icon"></view>
						<view class="message-content">
							<view class="message-content-inner">
								{{advertising}}
							</view>
						</view>
					</view>
					<view class="game-table-list-wrapper" :class="{'min-wrapper': showFooter}">
						<ul class="game-table-list">
							<li v-for="({Id, TableName}, index) in gameTableList" :key="index" title="">
								<view class="game-table-box">
									<view class="game-table-header">
										<view class="game-table-header-title">{{TableName}}</view>
									</view>
									<view class="game-table-content">
										<GameTable :tableList="gameList" />
									</view>
									<view class="button" @click="goGamePage(Id)"></view>
								</view>
							</li>
						</ul>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from "vuex";
	import GameTable from "@/components/common/game-table";
	export default {
		props: {
			showFooter: Boolean
		},
		mounted() {
			this.getRankList()
			this.getGG()
		},
		components: {
			GameTable
		},
		computed: {
			...mapState('Common', ['advertising']),
			...mapState('Games', ['gameTableList', 'rankList', 'gameList'])
		},
		methods: {
			...mapActions('Games', ["getRankList"]),
			...mapActions('Common', ['getGG']),
			goGamePage(id) {
				uni.redirectTo({
					url: `/pages/game?id=${id}`
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url('~@/assets/styles/common.less');

	.content-wrapper {
		margin-top: 92/@rem;
		height: calc(100vh - @HOME_CONTENT_HEIGHT);
		overflow: hidden;

		.content-box {
			display: flex;
			height: 100%;

			.left-wrapper {
				width: 330/@rem;
				margin-bottom: 66/@rem;
				display: flex;
				justify-content: center;

				.left-box {
					align-self: center;
					width: 303/@rem;
					height: 522/@rem;
					background: url('~@/assets/images/home/left_wrapper@2x.png') no-repeat;
					background-size: 100% 100%;

					.rank-wrapper {
						margin: 60/@rem 0;
						height: 400/@rem;
						overflow: hidden;

						.rank-list {
							padding: 0 10/@rem;
							max-height: 400/@rem;
							overflow-y: auto;

							li {
								padding: 16/@rem 0;
								border-bottom: 1px solid #4c382a;

								&:last-child {
									border-bottom: none;
								}

								.list-content {
									display: flex;

									.rank-img {
										width: 56/@rem;
										padding: 0 16/@rem 0 10/@rem;

										display: flex;
										justify-content: center;

										.img {
											width: 48/@rem;
											height: 36/@rem;
											align-self: center;
											text-align: center;
											color: #b79b89;

											&-0 {
												background: url('~@/assets/images/home/rank_1@2x.png') no-repeat;
												background-size: contain;
											}

											&-1 {
												background: url('~@/assets/images/home/rank_2@2x.png') no-repeat;
												background-size: contain;
											}

											&-2 {
												background: url('~@/assets/images/home/rank_3@2x.png') no-repeat;
												background-size: contain;
											}

										}
									}

									.rank-info {
										flex: 1;
									}

									h3 {
										-webkit-text-stroke: .5px #522e0f;
										font-weight: bold;
										font-size: 28/@rem;
									}

									h4 {
										color: #c9b492;
										margin-top: 10/@rem;
										font-size: 20/@rem;
									}
								}

							}
						}
					}
				}
			}

			.right-wrapper {
				flex: 1;
				display: flex;
				justify-content: center;

				&-content {
					width: 900/@rem;

					.message-loop-wrapper {
						height: 40/@rem;
						line-height: 40/@rem;
						position: relative;
						padding-left: 60/@rem;
						margin: 10/@rem 0;
						border: 1px solid #806744;
						border-radius: 10px;
						
						.message-icon {
							width: 36/@rem;
							height: 36/@rem;
							background: url('~@/assets/images/home/message@2x.png') no-repeat;
							background-size: contain;
							position: absolute;
							left: 2px;
							top: 50%;
							transform: translateY(-50%);
						}
						
						.message-content {
							overflow: hidden;
							font-size: 22/@rem;
							
							.message-content-inner {
								opacity: 0.6;
							}
						}
					}
					
					.game-table-list-wrapper {
						height: calc(100vh - @MESSAGE_LOOP_HEIGHT);
						overflow-y: auto;

						&.min-wrapper {
							height: calc(100vh - @MESSAGE_LOOP_HEIGHT_MIN);
						}
					}

					.game-table-list {
						li {
							margin-bottom: 20/@rem;

							.game-table-box {
								min-height: 100px;
								overflow: hidden;
								border-radius: 10px;
								border: 1px solid #806744;
								background-color: #15110e;
								position: relative;

								.game-table-header {
									height: 50/@rem;
									line-height: 50/@rem;
									background-color: #26211b;
									display: flex;
									justify-content: center;

									&-title {
										width: 240/@rem;
										height: 50/@rem;
										text-align: center;
										font-size: 24/@rem;
										line-height: 50/@rem;
										background: url('~@/assets/images/home/table-header@2x.png') no-repeat;
										background-size: contain;
									}
								}
								
								.game-table-content {
									
								}
								
								.button {
									width: 125/@rem;
									height: 40/@rem;
									background: url('~@/assets/images/home/button_game@2x.png') no-repeat;
									background-size: contain;
									position: absolute;
									top: 0;
									right: 20/@rem;
									z-index: 10;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
