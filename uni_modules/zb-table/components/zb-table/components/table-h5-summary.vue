<template>
  <view class="table-h5-footer top-header-uni" :style="{paddingRight:`${scrollbarSize}px`}">
    <scroll-view class="zb-table-headers"
                 @scroll="handleFooterTableScrollLeft"
                 scroll-x="true"
                 scroll-y="false"
                 id="tableFooterHeaders"
                 scroll-anchoring="true"
                 :scroll-left="headerFooterTableLeft"
                 style="padding-bottom: 0px;
						background: #fafafa;height: 100%">
      <view class="zb-table-fixed" >
        <view class="zb-table-thead" style="position: relative;" >
          <view class="item-tr">
            <view
                class="item-th"
                :style="{
	                              width:`${item.width?item.width:'100'}px`,
															  flex:index===transColumns.length-1?1:'none',
															  minWidth:`${item.width?item.width:'100'}px`,
															  borderRight:`${border?'1px solid #e8e8e8':''}`,
															  borderTop:`${border?'1px solid #e8e8e8':''}`,
															  textAlign:item.align||'left'
														  }"
                v-for="(item,index) in transColumns" :key="index">
              {{ sums[index] }}
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<script>
import summary from '../js/summary.js'
export default {
  name:'table-footer',
  mixins:[summary],
}
</script>
<style lang="scss" scoped>
.table-h5-footer {
  background: #fafafa;
  /*每个页面公共css */
  scroll-view ::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    background: transparent;
  }
  //第二种
  ::-webkit-scrollbar{
    display: none;
  }
  .item-tr{
    display: flex;
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

}
</style>
