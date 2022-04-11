<template>
  <view class="table-header">
    <view class="item-tr" v-for="item in list">
      <item :item="item"></item>
    </view>
<!--    <view class="item-tr" >-->
<!--      <view class="inner-tr">-->
<!--        <view class="inner-td">-->
<!--          广州小区-->
<!--        </view>-->
<!--        <view class="child-td">-->
<!--          <view class="child-item-id" style="width: 100px">销售</view>-->
<!--          <view class="child-item-id" style="width: 100px">计划</view>-->
<!--          <view class="child-item-id" style="width: 100px">达成</view>-->
<!--        </view>-->
<!--      </view>-->
<!--    </view>-->
  </view>
</template>

<script>
import Item from './item'
import {coulum10 as list,column1} from '../index/all'
export default {
  components:{
    Item
  },
  data(){
    return{
      list:column1
    }
  }
}

</script>

<style lang="scss" scoped>
.table-header{
  display: flex;
  //width: 100%;
  overflow: auto;
  .child-td{
    display: flex;
  }
  .item-td1{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dbdbdb;
  }
}
</style>
