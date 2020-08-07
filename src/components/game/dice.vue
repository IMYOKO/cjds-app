<template>
	<view class="dice-wrapper">
		<view class="dice-content" :class="{'dice-left': index === 0, 'dice-middle': index === 1, 'dice-right': index === 2}"
		 v-for="(diceItem, index) in diceData" :key='index'>
			<view class="dice-box">
				<block class="dice-box" v-for="(item, eq) in diceItem" :key='item.type'>
					<DiceItem :item="item" :listIndex="index" :itemIndex="eq" />
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from "vuex";
	import DiceItem from '@/components/game/dice-item.vue'
	export default {
		computed: {
			...mapState("Games", ["diceData"])
		},
		components: {
			DiceItem
		}
	}
</script>

<style lang="less" scoped>
	@import url('~@/assets/styles/common.less');

	.dice-wrapper {
		display: flex;
		padding: 10/@rem;
		justify-content: center;

		.dice-content {
			flex: 1;
			display: flex;
			justify-content: center;

			.dice-box {
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				align-content: flex-start;
			}

			&.dice-left,
			&.dice-right {
				flex: 1/4;

				.dice-item {
					width: calc(50% - @DICE_ITEM_WIDTH_1);
				}
			}

			&.dice-middle {
				flex: 1/2;
				align-self: center;
				.dice-item {
					width: calc(25% - @DICE_ITEM_WIDTH_2);
				}
			}
		}
	}
</style>
