<template>
	<view class="pages">
		<Headers>
			<view class="header-text">
				<text>信息</text>
			</view>
		</Headers>
		<view class="pages-wrapper rules-wrapper">
			<view class="rules-content">
				<ul class="vip-list">
					<li v-for="(item, index) in list" :key="index">
						<h3>{{item.MContent}}</h3>
						<p>{{item.AddTime}}</p>
					</li>
				</ul>
				<view class="no-data" v-if="list.length === 0">
					<text>暂无信息</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapActions
	} from "vuex";
	import Headers from "@/components/common/headers.vue"
	export default {
		data() {
			return {
				list: []
			}
		},
		components: {
			Headers
		},
		onLoad() {
			this.getZNXInfo()
		},
		methods: {
			...mapActions("User", ["getZNX"]),
			async getZNXInfo() {
				try {
					const list = await this.getZNX()
					console.log(list)
					this.list = list
				} catch (e) {
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url('~@/assets/styles/common.less');

	.header-text {
		display: flex;
		height: 100%;
		justify-content: center;
		align-items: center;
		font-size: 30/@rem;
	}

	.rules-wrapper {
		display: flex;
		justify-content: center;

		.rules-content {
			width: 50%;
			min-height: 100%;
			border: 1px solid rgba(255, 255, 255, 0.2);
			border-top: none;
			border-bottom: none;

			.vip-list {
				padding: 0 40/@rem;

				li {
					padding: 20/@rem 0;
					border-bottom: 1px solid rgba(255, 255, 255, 0.2);

					h3 {
						font-size: 28/@rem;
						line-height: 34/@rem;
						margin-bottom: 15/@rem;
					}

					p {
						opacity: 0.5;
						font-size: 24/@rem;
					}
				}
			}

			.no-data {
				opacity: 0.5;
				text-align: center;
				font-size: 24/@rem;
				color: #fff;
				opacity: 0.5;
				padding: 40/@rem 0;
			}
		}
	}
</style>
