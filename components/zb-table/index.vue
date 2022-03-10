<template>
	<!-- #ifdef H5 || APP-PLUS -->
	<view :class="['zb-table','zb-table-fixed-header',!border&&(bodyTableLeft>50||headerTableLeft>50)&&'scroll-left-fixed']">
	  <view class="zb-table-content">
	    <view class="zb-table-scroll" style="height: 100%;">
	      <template v-if="showHeader">
	        <view class="zb-table-header top-header-uni" style="height: 40px;">
	          <scroll-view class="zb-table-headers"
	                       @scroll="handleTableScrollLeft"
	                       scroll-x="true"
	                       scroll-y="false"
	                       id="tableHeaders"
	                       scroll-anchoring="true"
	                       :scroll-left="headerTableLeft"
	                       style="min-width: 17px;padding-bottom: 0px;
						background: #fafafa;height: 100%">
	            <view class="zb-table-fixed" >
	              <view class="zb-table-thead" style="position: relative;" >
	                <view class="item-tr">
	                  <view
	                      @click="sortAction(item,index)"
	                      :class="['item-th',item.sorter&&`sorting${item.sorterMode||''}`]"
	                      :style="{
	                            width:`${item.width?item.width:'100'}px`,
															  flex:index===transColumns.length-1?1:'none',
															  minWidth:`${item.width?item.width:'100'}px`,
															  borderRight:`${border?'1px solid #e8e8e8':''}`,
															  borderTop:`${border?'1px solid #e8e8e8':''}`,
															  textAlign:item.align||'left'
														  }"
	                      v-for="(item,index) in transColumns" :key="index">
                      <template v-if="item.type==='selection'">
                        <view class="checkbox-item">
                          <tableCheckbox
                              :indeterminate="indeterminate" :checked="checkedAll" @checkboxSelected="checkboxSelectedAll"></tableCheckbox>
                        </view>
                      </template>
                      <template v-else>
                        {{ item.label }}
                      </template>
                    </view>
	                </view>
	              </view>
	            </view>
	          </scroll-view>
	        </view>
	      </template>
	      <template v-if="!data.length">
	        <view class="no-data">暂无数据~~</view>
	      </template>
	      <scroll-view class="zb-table-body" ref="tableBody"	scroll-x="true"	scroll-y="true"	id="tableBody"
	                   :lower-threshold="10"
	                   :upper-threshold="10"
	                   @scrolltoupper="(e)=>debounce(scrollToLeft)(e)"	@scroll="handleBodyScroll"	:scroll-left="bodyTableLeft"	:scroll-top="bodyScrollTop"	style=" height: calc(100% - 50px);" >

	          <view class="zb-table-fixed">
	            <view class="zb-table-tbody">
	              <view  class="item-tr"
	                     v-for="(item,index) in transData" :key="item.key" >
	                <view
	                    :style="{
									              width:`${ite.width?ite.width:'100'}px`,
															  flex:i===transColumns.length-1?1:'none',
															  minWidth:`${ite.width?ite.width:'100'}px`,
															  borderRight:`${border?'1px solid #e8e8e8':''}`,
                                textAlign:ite.align||'left'
														  }"

	                    :class="['item-td',showStripe(index)]"
	                    v-for="(ite,i) in transColumns" :key="i">
	                  <template  v-if="ite.type==='operation'">
	                    <view style="display: flex;align-items: center;height: 100%">
	                      <view
	                          v-for="ren,ind in ite.renders"
	                          :key="ind"
	                          @click.stop="$emit(ren.func,item,index)"
	                          :style="{
	                          display:'flex',
	                          alignItems: 'center',
	                          marginRight:ite.renders.length>1?'8px':'0'
	                        }">
	                        <button :type="ren.type||'primary'" :size="ren.size||'mini'">{{ren.name}}</button>
	                      </view>
	                    </view>
	                  </template>
                    <template v-else-if="ite.type==='selection'">
                      <view class="checkbox-item">
                        <tableCheckbox @checkboxSelected="(e)=>checkboxSelected(e,item)" :cellData="item" :checked="item.checked"/>
                      </view>
                    </template>
	                  <template  v-else>
	                    {{ ite.filters?itemFilter(item,ite):item[ite.name]||ite.emptyString }}
	                  </template>

	                </view>
	              </view>
	            </view>
	          </view>
	        </scroll-view>
	    </view>
	    <view class="zb-table-fixed-left" v-if="isFixedLeft">
	      <template v-if="showHeader">
	        <view class="zb-table-header" style="height: 40px;display: flex">
	          <view class="item-tr" style="" v-for="(item,index) in fixedLeftData" :key="index">
	            <view
	                :style="{
	               width:`${item.width?item.width:'100'}px`,
	               borderRight:`${border?'1px solid #e8e8e8':''}`,
	               borderTop:`${border?'1px solid #e8e8e8':''}`,
                textAlign:item.align||'left'
	            }"
	                @click="sortAction(item,0)"
	                :class="['item-th',item.sorter&&`sorting${item.sorterMode||''}`]"
	            >
                <template v-if="item.type==='selection'">
                  <view class="checkbox-item">
                    <tableCheckbox
                        :indeterminate="indeterminate" :checked="checkedAll" @checkboxSelected="checkboxSelectedAll"></tableCheckbox>
                  </view>
                </template>
                <template v-else>
                  {{ item.label }}
                </template>
              </view>
	          </view>
	        </view>
	      </template>
	      <view class="zb-table-body-outer center-header-uni" style="height: 100%;">
	        <scroll-view
	            scroll-y="true"
	            id="leftTableFixed"
	            :upper-threshold="15"
	            @scrolltoupper="(e)=>scrollToFixedLeft(e)"
	            @scroll="leftFixedScrollAction"
	            :scroll-top="leftFiexScrollTop"
	            class="zb-table-body-inner"
	            style=" height: calc(100% - 50px);">
	          <view class="zb-table-fixed">
	            <view class="zb-table-tbody">
	              <view :class="['item-tr',showStripe(i)]"
                      v-for="(ite,i) in transData"
                      :key="ite.key"
	                    style="">
	                <view :class="['item-td']"
	                      :style="{
	                       width:`${item.width?item.width:'100'}px`,
	                       borderRight:`${border?'1px solid #e8e8e8':''}`,
	                       textAlign:item.align||'left'
	                      }"
	                      :key="item.key"
	                      v-for="(item,index) in fixedLeftData">
                    <template v-if="item.type==='selection'">
                      <view class="checkbox-item">
                        <tableCheckbox @checkboxSelected="(e)=>checkboxSelected(e,ite)" :cellData="ite" :checked="ite.checked"/>
                      </view>
                    </template>
                    <template v-else>
                      {{ite[item.name]||item.emptyString}}
                    </template>

                  </view>
	              </view>
	            </view>
	          </view>
	        </scroll-view>
	      </view>
	    </view>
	  </view>
	</view>
	<!-- #endif -->
	<!-- #ifndef H5 || APP-PLUS -->
	<view class="zb-table-applet">
	  <view class="zb-table-content">
	    <view class="zb-table-scroll" style="height: 100%;overflow: scroll">
	      <template v-if="showHeader">
	        <view class="zb-table-header top-header-uni" style="height: 40px;">
	            <view class="zb-table-fixed" >
	              <view class="zb-table-thead" style="position: relative;" >
	                <view class="item-tr">
	                  <view
	                      @click="sortAction(item,index)"
	                      :class="['item-th',index <fixedLeftData.length&&'zb-stick-side',item.sorter&&`sorting${item.sorterMode||''}`]"
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
                      <template v-if="item.type==='selection'">
                        <view class="checkbox-item">
                          <tableCheckbox
                              :indeterminate="indeterminate" :checked="checkedAll" @checkboxSelected="checkboxSelectedAll"></tableCheckbox>
                        </view>

                      </template>
                      <template v-else>
                        {{ item.label }}
                      </template>

                    </view>
	                </view>
	              </view>
	            </view>
	        </view>
	      </template>
	      <template v-if="!data.length">
	        <view class="no-data">暂无数据~~</view>
	      </template>
	          <view class="zb-table-fixed">
	            <view class="zb-table-tbody">
	              <view  class="item-tr"
	                     v-for="(item,index) in transData" :key="item.key" >
	                <view
	                    :style="{
	                              left:`${ite.left}px`,
									              width:`${ite.width?ite.width:'100'}px`,
															  flex:i===transColumns.length-1?1:'none',
															  minWidth:`${ite.width?ite.width:'100'}px`,
															   borderRight:`${border?'1px solid #e8e8e8':''}`,
                                textAlign:ite.align||'left'
														  }"

	                    :class="['item-td', i <fixedLeftData.length&&'zb-stick-side',showStripe(index)]"
	                    v-for="(ite,i) in transColumns" :key="i">
	                  <template  v-if="ite.type==='operation'">
	                    <view style="display: flex;align-items: center;height: 100%">
	                      <view
	                          v-for="ren,ind in ite.renders"
	                          :key="ind"
	                          @click.stop="$emit(ren.func,item,index)"
	                          :style="{
	                          display:'flex',
	                          alignItems: 'center',
	                          marginRight:ite.renders.length>1?'8px':'0'
	                        }">
	                        <button :type="ren.type||'primary'" :size="ren.size||'mini'">{{ren.name}}</button>
	                      </view>
	                    </view>
	                  </template>
                    <template v-else-if="ite.type==='selection'">
                      <view class="checkbox-item">
                        <tableCheckbox @checkboxSelected="(e)=>checkboxSelected(e,item)" :cellData="item" :checked="item.checked"/>
                      </view>
                    </template>
	                  <template  v-else>
	                    {{ ite.filters?itemFilter(item,ite):item[ite.name]||ite.emptyString }}
	                  </template>
	                </view>
	              </view>
	            </view>
	          </view>
	    </view>
	  </view>
	</view>
	<!-- #endif -->
</template>
<script>
import tableCheckbox from './table-checkbox.vue'
export default {
  components:{
    tableCheckbox
  },
  props:{
    itemDate:{
      type:Object,
      default:()=>{}
    },
    rowKey:Function,
    columns:{
      type:Array,
      default:()=>[]
    },
    data:{
      type:Array,
      default:()=>[]
    },
    showHeader:{
      type:Boolean,
      default:true
    },
    border:{
      type:Boolean,
      default:false
    },
    stripe:{
      type:Boolean,
      default:true
    },
    fit:{
      type:Boolean,
      default:false
    },
  },
  computed:{
    fixedLeftData(){
      let arr = []
      for(let i=0;i<this.columns.length;i++){
        let item = this.columns[i]
        if(item.fixed){
          if(i===0){
            item.left = 0
          }else {
            item.left = this.columns[i-1].width
          }
          arr.push(item)
        }else {
          break
        }
      }
      return arr
    },
    isFixedLeft(){
      if(!this.columns.length){
        return false
      }
      if(!this.data.length){
        return false
      }
      let [firstArr] = this.columns
      return !!firstArr.fixed;
    },
    transColumns(){
      if(this.fit){
        this.columns.forEach(column=>{
          if(column.type==="operation"&&column.renders){
            let str = column.renders.reduce((prev,next)=>{
              return prev.name+next.name
            })
            column.width = this.getTextWidth(str)+column.renders.length*40
          }else {
            let arr = [this.getTextWidth(column.label)]
            this.data.forEach(data=>{
              let str = (data[column.name]+'')
              let width = this.getTextWidth(str)
              arr.push(width)
            })
            column.width = Math.max(...arr)+12
          }
        })
        return this.columns
      }
      this.columns.forEach(item=>{
        if(item.type==="operation"&&item.renders){
          let str = item.renders.reduce((prev,next)=>{
            return prev.name+next.name
          })
          item.width = this.getTextWidth(str)+item.renders.length*40
        }
        item.emptyString = item.emptyString||'--'
      })
      return this.columns
    },
    transData(){
      this.data.forEach((item,index)=>{
        if(this.rowKey){
          item.key = Object.freeze(this.rowKey(item))||Date.now()
        }else {
          item.key = index
        }
      })
      return this.data
    }
  },
  data() {
    return {
      button:[],
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
      debounceTime:null,
      operation:{},
      completedFlag:false,
      selectArr:[],
      indeterminate:false,
      checkedAll:false
    }
  },
  created(){
    let flag = this.columns.some(item=>item.type==='selection')
    if(flag){
      this.data.forEach(item=> {
        item.checked = false
      })
    }
  },
  mounted(){
  },
  methods: {
    checkboxSelectedAll(e){
      this.indeterminate = false
      if(e.checked){
        this.selectArr = []
        this.checkedAll = true
        this.data.forEach(item=>{
          this.$set(item,'checked',true)
          this.selectArr.push(item)
        })
      }else{
        this.checkedAll = false
        this.data.forEach(item=>{
          this.$set(item,'checked',false)
        })
        this.selectArr = []
      }
      // #ifndef H5 || APP-PLUS
      this.$forceUpdate()
      // #endif
      this.$emit('toggleAllSelection',e.checked,this.selectArr)
    },
    checkboxSelected(e,item){
      // #ifdef H5 || APP-PLUS
      this.$set(item,'checked',e.checked)
      // #endif
      // #ifndef H5 || APP-PLUS
      this.data.forEach(item=>{
        if(item.key===e.data.key){
          item.checked = e.checked
        }
      })
      // #endif

      item.checked = e.checked
      e.data.checked = e.checked
      if(e.checked){
        this.selectArr.push(e.data)
      }else{
        this.selectArr = this.selectArr.filter(item=>item.key!==e.data.key)
      }
      if(this.selectArr.length===this.data.length){
        this.indeterminate = false
        this.checkedAll = true
      }else{
        this.indeterminate = true
        this.checkedAll = false
      }
      if(!this.selectArr.length){
        this.checkedAll = false
        this.indeterminate = false
      }
      // #ifndef H5 || APP-PLUS
      this.$forceUpdate()
      // #endif
      this.$emit('toggleRowSelection',e.checked,this.selectArr)
    },
    itemFilter(item,ite){
      if(ite.filters&&ite.name){
        let key = item[ite.name]
        return ite.filters[key]||''
      }
      return item[ite.name]||ite.emptyString
    },
    // 默认字体为微软雅黑 Microsoft YaHei,字体大小为 14px
    getTextWidth(str) {
      let flexWidth = 0
      for (const char of str) {
        if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
          // 如果是英文字符，为字符分配8个单位宽度
          flexWidth += 8
        } else if (char >= '\u4e00' && char <= '\u9fa5') {
          // 如果是中文字符，为字符分配15个单位宽度
          flexWidth += 18
        } else {
          // 其他种类字符，为字符分配8个单位宽度
          flexWidth += 8
        }
      }
      return flexWidth
    },
    width(item){
      return `${item.width?item.width:'100'}px`
    },
    showStripe(index){
      if(this.currentDriver)return
      if(this.stripe){
        return (index % 2) != 0?'odd':'even'
      }else{
        return ''
      }
    },
    //验证字符串是否是数字
    checkNumber(theObj) {
      var reg = /^[0-9]+.?[0-9]*$/;
      if (reg.test(theObj)) {
        return true;
      }
      return false;
    },
    isDate(data){
      if(isNaN(data)&&!isNaN(Date.parse(data))){
        return true
      }
      return false
    },
    sortAction(item,index){
      this.$set(item,'sorterMode',item.sorterMode==='_asc'?'_desc':'_asc')
      this.sortData(item)
	  // #ifndef H5 || APP-PLUS
	  this.$forceUpdate()
	  // #endif

    },

    sortData(item){
      let key = item.name
      if(item.sorterMode==='_asc'){
        this.data.sort((a,b)=>{
          if(this.checkNumber(a[key])){
            return a[key]-b[key]
          }
          if(this.isDate(a[key])){
            let a1 = new Date(a[key]).getTime()
            let b1 = new Date(b[key]).getTime()
            return a1-b1
          }
        })
      }else {
        this.data.sort((a,b)=>{
          if(this.checkNumber(a[key])){
            return b[key]-a[key]
          }
          if(this.isDate(a[key])){
            let a1 = new Date(a[key]).getTime()
            let b1 = new Date(b[key]).getTime()
            return b1-a1
          }
        })
      }
    },
    throttle(method,delay=60){
      let time = null
      return (...args)=>{
        if(!time){
          time = setTimeout(()=>{
            method(...args)
            time = null;
          },delay)
        }
      }
    },
    debounce(method,delay=1000){
      return (...args)=>{
        this.debounceTime&&clearTimeout(this.debounceTime)
        this.debounceTime = setTimeout(()=>{
          method(...args)
        },delay)
      }
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
      if(this.currentDriver1&&this.currentDriver1!==e.currentTarget.id)return
      this.currentDriver1 = e.currentTarget.id
      if(e.detail.direction==='left'&&this.headerTableLeft<10){
        this.headerTableLeft = 0
      }else if(e.detail.direction==='top'&&this.leftFiexScrollTop<10){
        this.leftFiexScrollTop = 0
      }
      this.bodyTime&&clearTimeout(this.bodyTime)
      this.bodyTime = setTimeout(()=>{
        this.currentDriver1=null
      },200)
    },
    scrollToFixedLeft(e){
      if(this.currentDriver1&&this.currentDriver1!==e.currentTarget.id)return
      this.currentDriver1 = e.currentTarget.id
      if(e.detail.direction==='top'&&this.bodyScrollTop<10){
        this.bodyScrollTop = 0
      }
      this.bodyTime&&clearTimeout(this.bodyTime)
      this.bodyTime = setTimeout(()=>{
        this.currentDriver1=null
      },200)
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
<style lang="scss">
.zb-table-fixed-left{
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
}
.zb-table-header{
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
}

</style>
<style lang="scss" scoped>
.checkbox-item{
  display: flex;align-items: center;justify-content: center;width: 100%;height: 100%
}
.no-data{
  width: 100%;
  height: 80rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
}
.zb-table{
  height: 100%;
  overflow: hidden;
  width: 100%;
  font-size: 12px;
  .zb-table-content{
    height: 100%;
    position: relative;
  }
  .zb-table-fixed{
    min-width: 100%;
  }
  .zb-table-body{
    position: relative;
    background: #fff;
    transition: opacity 0.3s;
  }
  .item-tr{
    display: flex;
    //height: 41px;
  }
  .item-td{
    flex-shrink: 0;
    width: 100px;
    padding-left: 8px;
    height: 40px;
    line-height: 40px;
	padding-right: 20px;
    box-sizing: border-box;
    word-break:keep-all;           /* 不换行 */
    white-space:nowrap;          /* 不换行 */
    overflow:hidden;               /* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;         /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
    overflow-wrap: break-word;
    border-bottom: 1px solid #e8e8e8;
    //transition: background 0.3s;
  }
  .item-th{
    flex-shrink: 0;
    width: 100px;
    overflow-wrap: break-word;
    border-bottom: 1px solid #e8e8e8;
    transition: background 0.3s;
    padding-right: 20px;
    word-break:keep-all;           /* 不换行 */
    white-space:nowrap;          /* 不换行 */
    overflow:hidden;               /* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;         /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
    overflow-wrap: break-word;
  }
  .zb-table-fixed-left .zb-table-header{
    overflow-y: hidden;
  }
  .zb-table-header {
    overflow: hidden;
    background: #fafafa;
    .item-th{
      padding-left: 8px;
      line-height: 39px;
      height: 40px;
      box-sizing: border-box;
    }
  }
  .zb-table-fixed-left .zb-table-fixed{
    background: #fff;
  }
  .zb-table-fixed-right .zb-table-fixed{
    background: #fff;
  }
  .zb-table-body-inner{
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
    //transition: box-shadow 0.3s ease;
  }

  .odd{
    background-color:rgba(249,249,249,0.6);
    //height: 100%;
    width: 100%;
  }
  .even{
    background-color:white ;
    //height: 100%;
    width: 100%;
  }
}
.scroll-left-fixed{
  .zb-table-fixed-left {
    left: 0;
    box-shadow: 6px 0 6px -4px #ccc;
  }
}
.sorting{
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjczRkE5Qjk2OTQwNDExRTk4NUU3RUY3OTQwOUYzOUU3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjczRkE5Qjk3OTQwNDExRTk4NUU3RUY3OTQwOUYzOUU3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzNGQTlCOTQ5NDA0MTFFOTg1RTdFRjc5NDA5RjM5RTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzNGQTlCOTU5NDA0MTFFOTg1RTdFRjc5NDA5RjM5RTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4R7rKqAAAAWklEQVR42mL8//8/AzUBEwOVwaiB2MHdu3f/gzBVDEQ2iBhDmYg1jFhDmUgxjBg5xkGfsFnI8RYIKCsrM5LkQlwaCMkxkeoKfIYRFYbIBhAybGjE8gg0ECDAAI+ULEsz8LFkAAAAAElFTkSuQmCC);
  background-repeat: no-repeat;
  background-position: center right;
  background-size: 20px 20px;
  cursor: pointer;
}
.sorting_asc{
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlDMzQ5NTk4OTQwNDExRTk4ODYwRkRDNTNBRUE5MTc1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlDMzQ5NTk5OTQwNDExRTk4ODYwRkRDNTNBRUE5MTc1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUMzNDk1OTY5NDA0MTFFOTg4NjBGREM1M0FFQTkxNzUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUMzNDk1OTc5NDA0MTFFOTg4NjBGREM1M0FFQTkxNzUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4u6TUfAAAAdElEQVR42mL8//8/AzUBEwOVweA3kIVUDdJbp8LZT72zyXMh0JD/IIzLEJIMhBmEzMZnKCO+ZINsGDIAGshIsgtxGUZIjnHQJ2ycyebu3bt4na6srMxIkgtxaSAkx0SqK/AZRlQYIhtAyLChEcsj0ECAAAMABS4rJ0ADXJ8AAAAASUVORK5CYII=);
  background-repeat: no-repeat;
  background-position: center right;
  background-size: 20px 20px;
  cursor: pointer;
}
.sorting_desc{
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg1MjMyQjFCOTQwNDExRTk5NjhDQjc2MEYxQzUxNkEzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg1MjMyQjFDOTQwNDExRTk5NjhDQjc2MEYxQzUxNkEzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODUyMzJCMTk5NDA0MTFFOTk2OENCNzYwRjFDNTE2QTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODUyMzJCMUE5NDA0MTFFOTk2OENCNzYwRjFDNTE2QTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz69xJt+AAAAaElEQVR42mL8//8/AzUBEwOVwaiB2MHdu3f/gzBVDEQ2iBhDmYg1jFhDmUgxjBg5xkGfsFlwSUhvnYrX6U+9sxlJciEuDYTkmEh1BUwM6APywhDZUHwuIxiG+FyKy3VDI9kMfgMBAgwAP+E336XXjQcAAAAASUVORK5CYII=);
  background-repeat: no-repeat;
  background-position: center right;
  background-size: 20px 20px;
  cursor: pointer;
}

.zb-table-applet{
  height: 100%;
  overflow: hidden;
  width: 100%;
  font-size: 12px;
  .zb-table-content{
    height: 100%;
    position: relative;
  }
  .zb-table-fixed{
    min-width: 100%;
    width: fit-content;
  }

  .zb-table-body{
    position: relative;
    background: #fff;
    transition: opacity 0.3s;
  }
  .item-tr{
    display: flex;
    //height: 41px;
  }
  .item-td{
    flex-shrink: 0;
    width: 100px;
    padding-left: 8px;
    height: 40px;
    line-height: 40px;
	padding-right:20px;
    box-sizing: border-box;
    word-break:keep-all;           /* 不换行 */
    white-space:nowrap;          /* 不换行 */
    overflow:hidden;               /* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;         /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
    overflow-wrap: break-word;
    border-bottom: 1px solid #e8e8e8;
    //transition: background 0.3s;
  }
  .item-th{
    flex-shrink: 0;
    width: 100px;
    overflow-wrap: break-word;
    border-bottom: 1px solid #e8e8e8;
    transition: background 0.3s;
    padding-right: 20px;
    word-break:keep-all;           /* 不换行 */
    white-space:nowrap;          /* 不换行 */
    overflow:hidden;               /* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;         /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
    overflow-wrap: break-word;
  }
  .zb-table-header {
    //overflow: hidden;
    position: sticky;
    top: 0;
    z-index: 1;
    width: fit-content;
    background: #fafafa;
    .item-th{
      padding-left: 8px;
      line-height: 39px;
      height: 40px;
      box-sizing: border-box;
    }
    .zb-stick-side{
      position: sticky;
      top: 0;
      left: 0;
      //border-right: solid 1rpx #dbdbdb;
      box-sizing: border-box;
      background: #fafafa;
      //box-shadow: 6px 0 6px -4px #ccc;
    }
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
    //transition: box-shadow 0.3s ease;
  }
  .scroll-left-fixed{
    .zb-table-fixed-left {
      left: 0;
      box-shadow: 6px 0 6px -4px #ccc;
    }
  }
  .odd{
    background-color:rgba(249,249,249,0.6);
    //height: 100%;
    width: 100%;
  }
  .even{
    background-color:white ;
    //height: 100%;
    width: 100%;
  }
  .zb-table-tbody {
    .zb-stick-side{
      position: sticky;
      left: 0;
      box-sizing: border-box;
      background:white;
      //box-shadow: 6px 0 6px -2px #ccc;
    }
    .odd{
      background:#f9f9f9;
      //height: 100%;
      width: 100%;
    }
    .even{
      background:white ;
      //height: 100%;
      width: 100%;
    }
  }
}

</style>
