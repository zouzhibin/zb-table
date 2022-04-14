<template>
	<view class="zb-pagination">
    <uni-card title="全部功能" >
      <zb-pagination
          :current-page="2"
          :total="45"
          layout="first,prev,next,last,total"
          :page-size="10"
          @current-change="handleCurrentChange"/>
    </uni-card>

    <uni-card title="简单功能" >
      <zb-pagination
          :current-page="2"
          :total="45"
          layout="prev,next"
          :page-size="10"
          @current-change="handleCurrentChange"/>
    </uni-card>

    <uni-card title="总条数" >
      <zb-pagination
          :current-page="2"
          :total="45"
          layout="total,prev,next"
          :page-size="10"
          @current-change="handleCurrentChange"/>
    </uni-card>

	</view>
</template>

<script>
// import ZbPagination from '../../components/pagination/pagination'
	export default {
    components:{
      // ZbPagination
    },
		data() {
			return {

			}
		},
		methods: {
      handleCurrentChange(val){
        uni.showToast({
          icon:'none',
          duration:3000,
          title:`当前页: ${val}`
        })
        console.log(`当前页: ${val}`);
      }
		}
	}
</script>

<style lang="scss" scoped>
::v-deep{
  .uni-card{
    margin: 0px!important;
    padding: 8px!important;
    .uni-card__content{
      padding: 0!important;
      padding-top: 8px!important;
    }
  }
  .uni-card__header{
    padding-left: 0!important;
  }
}
</style>
