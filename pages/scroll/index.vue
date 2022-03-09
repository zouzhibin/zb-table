<template>
  <view>
    <view class="uni-padding-wrap uni-common-mt">
      <view class="uni-title uni-common-mt">
        Vertical Scroll
        <text>\n纵向滚动</text>
      </view>
      <view>
        <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
                     @scroll="scroll">
          <view id="demo1" class="scroll-view-item uni-bg-red" :key="key(item)" v-for="item in datas">A</view>
        </scroll-view>
      </view>
      <view @tap="goTop" class="uni-link uni-center uni-common-mt">
        点击这里返回顶部
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      scrollTop: 0,
      old: {
        scrollTop: 0
      },
      datas:[
        {
          date: '2016-05-02',
          name: '',
          province: '上海',
          sex:'1',
          id:"1",
          age:'',
          city: '普陀区',
          address: '上海市普上海市普上海市普上海市普',
          zip: 200333
        },
        {
          date: '2016-05-01',
          name: '王小虎2',
          province: '上海',
          sex:'0',
          id:"2",
          age:12,
          city: '普陀区',
          address: '上海市普',
          zip: 200333
        },
        {
          date: '2016-05-02',
          name: '王小虎3',
          province: '上海',
          sex:1,
          id:"3",
          age:'15',
          city: '普陀区',
          address: '上海市普',
          zip: 200333
        },
        {
          date: '2016-04-02',
          name: '王小虎4',
          province: '上海',
          sex:1,
          age:'11',
          id:"4",
          city: '普陀区',
          address: '上海市普',
          zip: 200333
        },
        {
          date: '2016-03-02',
          name: '王小虎5',
          province: '上海',
          sex:1,
          age:'14',
          id:"5",
          city: '普陀区',
          address: '上海市普',
          zip: 200333
        },{
          date: '2014-05-02',
          name: '王小虎6',
          province: '上海',
          sex:1,
          id:"6",
          age:'12',
          city: '普陀区',
          address: '上海市普',
          zip: 200333
        },
      ]
    }
  },
  methods: {
    key(item){
      console.log(111111)
      return item.id
    },
    upper: function(e) {
      // console.log(e)
    },
    lower: function(e) {
      // console.log(e)
    },
    scroll: function(e) {
      // console.log(e)
      this.old.scrollTop = e.detail.scrollTop
    },
    goTop: function(e) {
      this.scrollTop = this.old.scrollTop
      this.$nextTick(() => {
        this.scrollTop = 0
      });
      uni.showToast({
        icon:"none",
        title:"纵向滚动 scrollTop 值已被修改为 0"
      })
    }
  }
}
</script>

<style>
.scroll-Y{
  height: 100px;
}
.scroll-view-item{
  width: 100%;
  height: 100px;
}
</style>
