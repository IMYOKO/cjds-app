<template>
	<view class="game-table-wrapper">
		<table class="game-table">
			<tr>
				<td class="game-table-td" v-for="(tableItem, index) in tableList" :key="index">
					<view class="table-box" :class="{'table-box-0': item[2] === 1 && item[0] > 0, 'table-box-1': item[2] === 0 && item[0] > 0}" v-for="(item, eq) in tableItem"
					 :key="`num-${eq}`">
						<span v-if="item[0] > 0">{{item[0]}}:{{item[1]}}</span>
						<span v-else></span>
					</view>
				</td>
				<!-- <td class="game-table-td" v-for="({num, DS}, index) in tableList" :key="index">
					<view class="table-box" :class="{'table-box-0': DS === 0 && item, 'table-box-1': DS === 1 && item}" v-for="(item, eq) in num"
					 :key="`num-${eq}`">
						{{item}}
					</view>
				</td> -->
			</tr>
		</table>
	</view>
</template>

<script>
	export default {
		props: {
			tableList: Array
		}
	}
</script>

<style lang="less" scoped>
	@import url('~@/assets/styles/common.less');
	
	@tableBgColor: #15110e;
	@tableTdBgColor: #26211c;

	.game-table-wrapper {

		.game-table {
			width: 100%;
			font-size: 12/@rem;
			background-color: @tableBgColor;

			.game-table-td {
				width: 5%;
				padding: 0;
				background-color: @tableTdBgColor;
				border-top: 1px solid @tableBgColor;

				.table-box {
					width: 100%;
					height: 34/@rem;
					font-size: 24/@rem;
					text-align: center;
					line-height: 34/@rem;
					margin-left: -1/@rem;
					border-bottom: 1px solid @tableBgColor;
					border-right: 1px solid @tableBgColor;

					&-0 {
						background-color: #0544b8;
					}

					&-1 {
						background-color: #bf0d0b;
					}
				}
			}
		}
	}
</style>
