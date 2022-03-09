<template>
  <view class="zb-table zb-table-fixed-header zb-table-layout-fixed zb-table-default zb-table-scroll-position-left">
    <view class="zb-table-content">
      <view class="zb-table-scroll" style="height: 100%;">
        <view class="zb-table-header top-header-uni" style="height: 50px;">
          <scroll-view class="zb-table-headers"
                       @scroll="handleTableScrollLeft"
                       scroll-x="true"
                       scroll-y="true"
                       id="tableHeaders"
                       scroll-anchoring="true"
                       :scroll-left="headerTableLeft"
                       style="min-width: 17px;padding-bottom: 0px;
					background: #fafafa;height: 100%">
            <view class="zb-table-fixed" >
              <view class="zb-table-thead" style="position: relative;">
                <view class="item-tr">
                  <view class="item-th">header1</view>
                  <view class="item-th ">header2</view>
                  <view class="item-th">header3</view>
                  <view class="item-th">header4</view>
                  <view class="item-th">header5</view>
                  <view class="item-th">header6</view>
                  <view class="item-th">header7</view>
                  <view class="item-th">header8</view>
                  <view class="item-th">header9</view>
                  <view class="item-th">header10</view>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
        <scroll-view class="zb-table-body"
                     ref="tableBody"
                     scroll-x="true"
                     scroll-y="true"
                     id="tableBody"
                     @scrolltoupper="scrollToLeft"
                     @scroll="handleBodyScroll"
                     :scroll-left="bodyTableLeft"
                     :scroll-top="bodyScrollTop"
                     style=" height: calc(100% - 50px);" >
          <view class="zb-table-fixed">
            <view class="zb-table-tbody">
              <view  class="item-tr">
                <view class="item-td">Edrward 1</view>
                <view class="item-td">Edrward 2</view>
                <view class="item-td">Edrward 3</view>
                <view class="item-td">Edrward 4</view>
                <view class="item-td">Edrward 5</view>
                <view class="item-td">Edrward 6</view>
                <view class="item-td">Edrward 7</view>
                <view class="item-td">Edrward 8</view>
                <view class="item-td">Edrward 9</view>
                <view class="item-td">Edrward 10</view>
              </view>
              <view  class="item-tr">
                <view class="item-td">Edrward 1</view>
                <view class="item-td">Edrward 2</view>
                <view class="item-td">Edrward 3</view>
                <view class="item-td">Edrward 4</view>
                <view class="item-td">Edrward 5</view>
                <view class="item-td">Edrward 6</view>
                <view class="item-td">Edrward 7</view>
                <view class="item-td">Edrward 8</view>
                <view class="item-td">Edrward 9</view>
                <view class="item-td">Edrward 10</view>
              </view>
              <view  class="item-tr">
                <view class="item-td">Edrward 1</view>
                <view class="item-td">Edrward 2</view>
                <view class="item-td">Edrward 3</view>
                <view class="item-td">Edrward 4</view>
                <view class="item-td">Edrward 5</view>
                <view class="item-td">Edrward 6</view>
                <view class="item-td">Edrward 7</view>
                <view class="item-td">Edrward 8</view>
                <view class="item-td">Edrward 9</view>
                <view class="item-td">Edrward 10</view>
              </view>
              <view  class="item-tr">
                <view class="item-td">Edrward 1</view>
                <view class="item-td">Edrward 2</view>
                <view class="item-td">Edrward 3</view>
                <view class="item-td">Edrward 4</view>
                <view class="item-td">Edrward 5</view>
                <view class="item-td">Edrward 6</view>
                <view class="item-td">Edrward 7</view>
                <view class="item-td">Edrward 8</view>
                <view class="item-td">Edrward 9</view>
                <view class="item-td">Edrward 10</view>
              </view>
              <view  class="item-tr">
                <view class="item-td">Edrward 1</view>
                <view class="item-td">Edrward 2</view>
                <view class="item-td">Edrward 3</view>
                <view class="item-td">Edrward 4</view>
                <view class="item-td">Edrward 5</view>
                <view class="item-td">Edrward 6</view>
                <view class="item-td">Edrward 7</view>
                <view class="item-td">Edrward 8</view>
                <view class="item-td">Edrward 9</view>
                <view class="item-td">Edrward 10</view>
              </view>
              <view  class="item-tr">
                <view class="item-td">Edrward 1</view>
                <view class="item-td">Edrward 2</view>
                <view class="item-td">Edrward 3</view>
                <view class="item-td">Edrward 4</view>
                <view class="item-td">Edrward 5</view>
                <view class="item-td">Edrward 6</view>
                <view class="item-td">Edrward 7</view>
                <view class="item-td">Edrward 8</view>
                <view class="item-td">Edrward 9</view>
                <view class="item-td">Edrward 10</view>
              </view>
              <view  class="item-tr">
                <view class="item-td">Edrward 1</view>
                <view class="item-td">Edrward 2</view>
                <view class="item-td">Edrward 3</view>
                <view class="item-td">Edrward 4</view>
                <view class="item-td">Edrward 5</view>
                <view class="item-td">Edrward 6</view>
                <view class="item-td">Edrward 7</view>
                <view class="item-td">Edrward 8</view>
                <view class="item-td">Edrward 9</view>
                <view class="item-td">Edrward 10</view>
              </view>
              <view  class="item-tr">
                <view class="item-td">Edrward 1</view>
                <view class="item-td">Edrward 2</view>
                <view class="item-td">Edrward 3</view>
                <view class="item-td">Edrward 4</view>
                <view class="item-td">Edrward 5</view>
                <view class="item-td">Edrward 6</view>
                <view class="item-td">Edrward 7</view>
                <view class="item-td">Edrward 8</view>
                <view class="item-td">Edrward 9</view>
                <view class="item-td">Edrward 10</view>
              </view>
              <view  class="item-tr">
                <view class="item-td">Edrward 1</view>
                <view class="item-td">Edrward 2</view>
                <view class="item-td">Edrward 3</view>
                <view class="item-td">Edrward 4</view>
                <view class="item-td">Edrward 5</view>
                <view class="item-td">Edrward 6</view>
                <view class="item-td">Edrward 7</view>
                <view class="item-td">Edrward 8</view>
                <view class="item-td">Edrward 9</view>
                <view class="item-td">Edrward 10</view>
              </view>
              <view  class="item-tr">
                <view class="item-td">Edrward 1</view>
                <view class="item-td">Edrward 2</view>
                <view class="item-td">Edrward 3</view>
                <view class="item-td">Edrward 4</view>
                <view class="item-td">Edrward 5</view>
                <view class="item-td">Edrward 6</view>
                <view class="item-td">Edrward 7</view>
                <view class="item-td">Edrward 8</view>
                <view class="item-td">Edrward 9</view>
                <view class="item-td">Edrward 10</view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
      <view class="zb-table-fixed-left">
        <view class="zb-table-header">
          <view class="item-tr" style="flex-direction: column;">
            <view class="item-td">header1</view>
          </view>
        </view>
        <view class="zb-table-body-outer center-header-uni" style="height: 100%;">
          <scroll-view
              scroll-y="true"
              id="leftTableFixed"
              @scroll="leftFixedScrollAction"
              :scroll-top="leftFiexScrollTop"
              class="zb-table-body-inner"
              style=" height: calc(100% - 50px);">
            <view class="zb-table-fixed">
              <view class="zb-table-tbody">
                <view class="item-tr" style="flex-direction: column;">
                  <view class="item-td" v-for="item,index in data" :key="key(item,index)">{{ item.name }}</view>
                </view>
              </view>

            </view>
          </scroll-view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props:{
    itemDate:{
      type:Object,
      default:()=>{}
    },
    columns:{
      type:Array,
      default:()=>[]
    },
    data:{
      type:Array,
      default:()=>[]
    },
  },
  computed:{
    // dataSource(){
    //   let columns = itemDate.columns[0].children;
    //   columns = columns.map(function(column){
    //     return {
    //       title: column.title,
    //       data: column.dataIndex,
    //       dataType: column.dataType
    //     };
    //   });

    //   columns.forEach(function(column){
    //     if(column.dataType === "Number"){
    //       dataSource.forEach(function(data){
    //         var value = data[column.data];
    //         var toFixed = 0;

    //         if(utils.check.decimal(value)){
    //           toFixed = 2;
    //         }

    //         data[column.data] = utils.toLocaleString(data[column.data], toFixed);
    //       });
    //     }
    //     else if(column.dataType === "Float"){
    //       dataSource.forEach(function(data){
    //         data[column.data] = utils.toLocaleString(data[column.data], 2);
    //       });
    //     }
    //   });


    //   // return
    // }
  },
  data() {
    return {
      bodyTableLeft:0,
      headerTableLeft:0,
      lastScrollLeft:0,
      leftFiexScrollTop:0,
      bodyScrollTop:0,
      currentDriver:null,
      currentDriver1:null,
      bodyTime:null,
      bodyTime1:null,
      headerTime:null,
    }
  },
  mounted(){


  },
  methods: {
    key(item,index){
      console.log('===')
      return item.id
    },
    handleBodyScroll(e){
      if(this.currentDriver&&this.currentDriver!==e.currentTarget.id)return
      this.currentDriver = e.currentTarget.id
      this.headerTableLeft = e.detail.scrollLeft
      this.leftFiexScrollTop = e.detail.scrollTop
      this.bodyTime&&clearTimeout(this.bodyTime)
      this.bodyTime = setTimeout(()=>{
        this.currentDriver=null
      },200)

    },
    leftFixedScrollAction(e){
      if(this.currentDriver&&this.currentDriver!==e.currentTarget.id)return
      this.currentDriver = e.currentTarget.id
      this.bodyScrollTop = e.detail.scrollTop
      this.bodyTime&&clearTimeout(this.bodyTime)
      this.bodyTime = setTimeout(()=>{
        this.currentDriver=null
      },200)
    },
    scrollToLeft(e){

    },
    handleTableScrollLeft(e,type){
      if(this.currentDriver&&this.currentDriver!==e.currentTarget.id)return
      this.currentDriver = e.currentTarget.id
      this.bodyTableLeft = e.detail.scrollLeft
      this.bodyTime&&clearTimeout(this.bodyTime)
      this.bodyTime = setTimeout(()=>{
        this.currentDriver=null
      },200)
    }
  }
}
</script>

<style lang="scss" scoped>
.zb-table-content{
  height: 100%;
  position: relative;
}
.zb-table-fixed{
  min-width: 100%;
}
.zb-table{
  height: 100%;
  overflow: hidden;
  width: 100%;
  font-size: 12px;
}
.zb-table-body{
  position: relative;
  background: #fff;
  transition: opacity 0.3s;
}
.item-tr{
  display: flex;
}
.item-td{
  flex-shrink: 0;
  width: 100px;
  padding: 16px 16px;
  overflow-wrap: break-word;
  border-bottom: 1px solid #e8e8e8;
  transition: background 0.3s;
}
.item-th{
  flex-shrink: 0;
  width: 100px;
  padding: 16px 16px;
  overflow-wrap: break-word;
  border-bottom: 1px solid #e8e8e8;
  transition: background 0.3s;
}
.zb-table-fixed-left .zb-table-header{
  overflow-y: hidden;
}
.zb-table-header {
  overflow: hidden;
  background: #fafafa;
}
.zb-table-fixed-left .zb-table-fixed{
  background: #fff;
}
.zb-table-fixed-right .zb-table-fixed{
  background: #fff;
}
.zb-table-fixed-header .zb-table-body-inner{
  height: 100%;
  // overflow: scroll;
}
.zb-table-fixed-left{
  position: absolute;
  top: 0;
  z-index: 1;
  overflow: hidden;
  border-radius: 0;
  height: 100%;
  transition: box-shadow 0.3s ease;
}
.zb-table-fixed-left {
  left: 0;
  box-shadow: 6px 0 6px -4px gray;
}
</style>
