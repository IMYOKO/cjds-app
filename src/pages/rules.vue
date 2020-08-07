<template>
	<view class="pages">
		<Headers>
			<view class="header-text">
				<text>长江单双游戏规则</text>
			</view>
		</Headers>
		<view class="pages-wrapper rules-wrapper">
			<view class="rules-content">
				<view class="rules-box">
					<view class="rules-item">
						<h3>一、点数计算：</h3>
						<p>两颗骰子相加之和</p>
					</view>
					<view class="rules-item">
						<h3>二、路单：</h3>
						<p>单数显示为蓝色，双数显式为红色。例如2:3即显示蓝色；1:5即显示红色。</p>
					</view>
					<view class="rules-item">
						<h3>三、下注单、双、吃单数和吃双数</h3>
						<p>下注单、双、吃单数和吃双数时。开出1:2，则单赢70%，双输；开出1:3则双赢70%，单输。</p>
					</view>
					<view class="rules-item">
						<h3>四、特码规则</h3>
						<p>
							1:4，1:5，1:6，2:3，2:4，2:5，2:6，3:4，3:5，3:6，4:5，4:6，5:6
							<br />开出以上任意牌型赔率1:11<br />开出对子，如1:1，2:2，3:3，4:4，5:5，6:6则赔率1:18
							<br />如开出1:2，1:3特码时，则赔率1：12
							<br />下注并盈利特码不抽水
						</p>
					</view>
					<view class="rules-item">
						<h3>五、押单，押双，押吃单数，押吃双数</h3>
						<p>押单，押双，押吃单数，押吃双数，赔率均为1:1。</p>
					</view>
					<view class="rules-item">
						<h3>六、吃单数和吃双数</h3>
						<p>本金范围内可押注吃单数或者吃双数。当开单数时，则吃单数输，吃双数赢。当开双数时，吃双数输吃单数赢。</p>
					</view>
					<view class="rules-item">
						<h3>七、开奖结果以现场视讯显示为准。</h3>
						<p></p>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Headers from "@/components/common/headers.vue"
	export default {
		components: {
			Headers
		},
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

			.rules-box {
				padding: 20/@rem 30/@rem;
				
				.rules-item {
					margin-bottom: 40/@rem;
					
					h3 {
						font-size: 28/@rem;
						line-height: 40/@rem;
						margin-bottom: 10/@rem;
					}

					p {
						opacity: 0.6;
						font-size: 26/@rem;
						line-height: 38/@rem;
					}
				}

			}
		}
	}
</style>
