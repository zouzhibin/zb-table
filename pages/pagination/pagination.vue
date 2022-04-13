<template>
	<view class="zb-pagination">
    <zb-pagination
        :current-page="2"
        :total="5" @current-change="handleCurrentChange"/>
	</view>
</template>

<script>
import ZbPagination from '../../components/pagination/pagination'
	export default {
    components:{
      ZbPagination
    },
		data() {
			return {

			}
		},
		methods: {
      handleCurrentChange(val){
        console.log(`当前页: ${val}`);
      }
		}
	}
</script>

<style lang="scss" scoped>

</style>
