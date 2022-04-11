<template>
  <view class="item-inner">
    <template v-if="item.children&&item.children.length">
      <view class="item-td" >{{item.title}}</view>
      <view class="item-children" >
        <item :item="ite" v-for="ite in item.children"/>
      </view>
    </template>
    <view class="item-td" :style="{width:item.width}" v-else>{{item.title}}</view>
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
}
.item-inner{
  //height: 100%;
  .item-td{
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
