<template>
  <view class="zb-table-footer" style="height: 40px;">
    <view class="zb-table-fixed" >
      <view class="zb-table-thead" style="position: relative;" >
        <view class="item-tr">
          <view
              :class="['item-th',index <fixedLeftColumns.length&&'zb-stick-side']"
              :style="{
	                              left:`${item.left}px`,
	                              width:`${item.width?item.width:'100'}px`,
															  flex:index===transColumns.length-1?1:'none',
															  minWidth:`${item.width?item.width:'100'}px`,
															   borderRight:`${border?'1px solid #e8e8e8':''}`,
															  borderTop:`${border?'1px solid #e8e8e8':''}`,
															   textAlign:item.align||'left'
														  }"
              v-for="(item,index) in transColumns" :key="index">
            <template>
              {{ sums[index]||item.emptyString }}
            </template>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  import summary from '../js/summary.js'
  export default {
    mixins:[summary]
  }
</script>
<style lang="scss" scoped>
  .zb-table-footer {
    background: #fafafa;
    width: fit-content;
    min-width: 100%;
    position: sticky;
    bottom: 0;
    z-index: 2;
    .item-tr{
      display: flex;
      min-width: 100%;
    }
    .item-th{
      padding-left: 8px;
      line-height: 39px;
      height: 40px;
      //display: flex;
      //align-items: center;
      box-sizing: border-box;
      flex-shrink: 0;
      width: 100px;
      padding-right: 20px;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      overflow-wrap: break-word;
      border-bottom: 1px solid #e8e8e8;
    }
    .zb-table-fixed{
      min-width: 100%;

    }
    .zb-stick-side{
      position: sticky;
      bottom:0 ;
      left: 0;
      z-index: 2;
      //border-right: solid 1rpx #dbdbdb;
      box-sizing: border-box;
      background: #fafafa;
      //box-shadow: 6px 0 6px -4px #ccc;
    }
  }
</style>
