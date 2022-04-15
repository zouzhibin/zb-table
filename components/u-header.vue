<template>
	<view class="m-header">
		<view class="m-layout-header">
			<uni-icons type="list" size="30" @click="showMenu"></uni-icons>
		</view>
		<view>
			
		</view>
		<zb-drawer mode="left" 
			title="组件"
			width="60%" :visible.sync="isShowDrawer" >
			<view class="drawer_content">
				<view class="item" @click="goTo('/pages/table/index')">表格组件</view>
				<view class="item" @click="goTo('')">分页组件</view>
				<view class="item" @click="goTo('/pages/drawer/drawer')">抽屉组件</view>
			</view>
		</zb-drawer>
	</view>
</template>


<script>
	export default{
		data(){
			return {
				isShowDrawer:false
			}
		},
		mounted(){
			// uni.navigateTo({
			//         url: `/pages/table/index`,
			//         animationType: 'slide-in-right',
			//         animationDuration: 2000,
			//       });
		},
		methods:{
			goTo(url){
				this.isShowDrawer = false
				setTimeout(()=>{
					uni.navigateTo({
					        url,
					        animationType: 'slide-in-right',
					        animationDuration: 2000,
					      });
				},300)
				
			},
			showMenu(){
				this.isShowDrawer = true
			}
		}
	}
</script>	
	
<style lang="scss" scoped>
	.m-header{
		/* position: absolute; */
		/* right: 0; */
		/* bottom: 0; */
		/* left: 0; */
		top: 0;
	}
	.m-layout-header{
		height: 80rpx;
		background-color: white;
		display: flex;
		flex-direction: row;
		padding-left: 8px;
		padding-right: 8px;
		justify-content: space-between;
		align-items: center;
	}
	.drawer_content{
		padding-left: 8px;
		padding-right: 8px;
		.item{
			 overflow: hidden;
				    color: #808080;
				    font-size: 32rpx;
					height: 80rpx;
				    text-overflow: ellipsis;
				    word-wrap: normal;
				    white-space: nowrap;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
			  align-items: center;
		}
	}
</style>	