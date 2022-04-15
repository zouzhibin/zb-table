<template>
	<view class="zb-pagination">
    <view class="item-total" v-if="layout.includes('total')">共{{total}}条</view>
    <view class="item__left">
      <view class="first-page"
            v-if="layout.includes('first')"
            :class="{disabled:currentInnerPage==1}"
            @click="btnOperation('first')">首页</view>
      <view class="prev-page"
            v-if="layout.includes('prev')"
            :class="{disabled:currentInnerPage==1}"
            @click="btnOperation('prev')">{{ prevText }}</view>
    </view>
    <view class="item__center">
      <text class="currentInnerPage">{{ currentInnerPage }}</text>
      <text>/</text>
      <text>{{this.pageNumber}}</text>
    </view>
    <view class="item__right">
      <view class="next-page"
            v-if="layout.includes('next')"
            @click="btnOperation('next')"
            :class="{disabled:currentInnerPage==pageNumber}">{{ nextText }}</view>
      <view class="last-page"
            v-if="layout.includes('last')"
            :class="{disabled:currentInnerPage==pageNumber}"
            @click="btnOperation('last')">尾页</view>
    </view>
	</view>
</template>

<script>
	export default {
	  props:{
      total:{
        type:Number,
        default:0
      },
      pageSize:{
        type:Number,
        default:10
      },
      prevText:{
        type:String,
        default:'上一页'
      },
      currentPage:{
        type:Number,
        default:1
      },
      layout: {
        type:String,
        default:'first,prev,next,last'
      },
      nextText:{
        type:String,
        default:'下一页'
      }
    },
    computed:{
	    pageNumber(){
	      return Math.ceil(this.total/this.pageSize)
      },
    },
    watch:{
      currentPage:{
        handler(val){
          this.currentInnerPage = val
        },
        immediate:true
      }
    },
		data() {
			return {
        currentInnerPage:1,
        isDisabled:false
			}
		},
		methods: {
      btnOperation(type){
        switch (type) {
          case 'first':
            this.currentInnerPage = 1
              this.$emit('current-change',this.currentInnerPage,type)
            break;
          case 'prev':
            if(this.pageNumber==1){
              return false
            }
            this.currentInnerPage--
            this.$emit('current-change',this.currentInnerPage,type)
            break;
          case 'next':
              if(this.currentInnerPage==this.pageNumber){return false}
              this.currentInnerPage++
            this.$emit('current-change',this.currentInnerPage,type)
            break;
          case 'last':
            this.currentInnerPage = this.pageNumber
            this.$emit('current-change',this.currentInnerPage,type)
            break;
        }
      }
		}
	}
</script>

<style lang="scss" scoped>
.zb-pagination{
  display: flex;
  flex-direction: row;
  .item-total{
    font-size: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 4px;
  }
  .item__left{
    display: flex;
    flex-direction: row;
  }
  .item__center{
    flex: 1;
	 display: flex;
	 flex-direction: row;
	 justify-content: center;
	 align-items: center;
  }
  .item__right{
    display: flex;
    flex-direction: row;
  }
}
.currentInnerPage{
  color: #007aff;
}
.first-page{
  margin-right: 4px;
}
.last-page{
  margin-left: 4px;
}
.first-page,
.prev-page,
.next-page,
.last-page {
  cursor: pointer;
  // font-size: 27rpx;
  font-size: 13px;
   // padding: 14rpx 25rpx;
   // padding: 12rpx 22rpx;
  padding: 4px 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  background-color: #f8f8f8;
  border: 1px solid #e5e5e5;
  white-space: nowrap;

}
.first-page:active,
.prev-page:active,
.next-page:active,
.last-page:active {
  opacity: 0.6;

}
.disabled{
  pointer-events: none;
  opacity: 0.5;
}
</style>
