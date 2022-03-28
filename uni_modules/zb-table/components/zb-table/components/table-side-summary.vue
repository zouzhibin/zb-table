<template>
  <view class="zb-table-header" style="display: flex;" >
    <view class="item-tr" >
      <view class='item-td'
            :style="{
	                       width:`${item.width?item.width:'100'}px`,
	                       borderRight:`${border?'1px solid #e8e8e8':''}`,
	                       textAlign:item.align||'left'
	                      }"
            :key="`15255966555${index}`"
            v-for="(item,index) in fixedLeftColumns">
        <template >
          {{sums[index]}}
        </template>
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
.zb-table-header {
  overflow: hidden;
  background: #fafafa;
  .item-th{
    padding-left: 8px;
    line-height: 39px;
    height: 40px;
    //display: flex;
    //align-items: center;
    box-sizing: border-box;
  }
}
.item-tr{
  display: flex;
  box-sizing: border-box;
}
.item-td{
  flex-shrink: 0;
  width: 100px;
  padding-left: 8px;
  height: 40px;
  line-height: 40px;
  padding-right: 20px;
  box-sizing: border-box;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  border-bottom: 1px solid #e8e8e8;
  background: rgb(250, 250, 250);
}
</style>
