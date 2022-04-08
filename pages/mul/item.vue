<template>
  <view class="item-inner">
    <view class="item-td" :style="{width:item.width}">
      <view class="item-td2">
        {{item.label}}
      </view>
    </view>
    <view class="item-children" v-if="item.children&&item.children.length">
      <item :item="ite" v-for="ite in item.children"/>
    </view>
  </view>
</template>

<script>
export default {
  name:'item',
  props:{
    item:Object
  },
  data(){
    return{

    }
  }
}
</script>

<style lang="scss">
.item-children{
  display: flex;
  /*flex-direction: row;*/
}
.item-td{
  height: 100%;
  display: flex;
  align-items: center;
  width: 100px;
  border-right: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  box-sizing: border-box;
  .item-td2{
    height: 40px;
    //line-height: 42px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    overflow: hidden;
  }
}
.item-inner{
  height: 100%;
  display: flex;
  flex-direction: column;
  /*align-items: center;*/
}
</style>
