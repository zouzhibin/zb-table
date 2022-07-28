<template>
	<!-- #ifdef H5 || APP-PLUS -->
	<view :class="['zb-table','zb-table-fixed-header',!border&&(bodyTableLeft>50||headerTableLeft>50)&&'scroll-left-fixed']">
	  <view class="zb-table-content" style="flex: 1">
	    <view class="zb-table-scroll" style="height: 100%;">
	      <template v-if="showHeader">
	        <view class="zb-table-header top-header-uni" :style="{paddingRight:`${scrollbarSize}px`}"
          >
	          <scroll-view class="zb-table-headers"
	                       @scroll="handleTableScrollLeft"
	                       scroll-x="true"
	                       scroll-y="false"
	                       id="tableHeaders"
	                       scroll-anchoring="true"
	                       :scroll-left="headerTableLeft"
	                       style="
						height: 100%">
	            <view class="zb-table-fixed" >
	              <view class="zb-table-thead" style="position: relative;" >
	                <view class="item-tr">
	                  <view
	                      @click.stop="sortAction(item,index)"
	                      class="item-th"
	                      :style="[{
	                              width:`${item.width?item.width:'100'}px`,
															  flex:index===transColumns.length-1?1:'none',
															  minWidth:`${item.width?item.width:'100'}px`,
															  borderRight:`${border?'1px solid #e8e8e8':''}`,
															  borderRight:`${(scrollbarSize&&index===transColumns.length-1)?'':border?'1px solid #e8e8e8':''}`,
															  borderTop:`${border?'1px solid #e8e8e8':''}`,
															  textAlign:item.align||'left'
														  },getHeaderCellStyle(item,index)]"
	                      v-for="(item,index) in transColumns" :key="index">
                      <template v-if="item.type==='selection'">
                        <view class="checkbox-item">
                          <tableCheckbox
                              :indeterminate="indeterminate" :checked="checkedAll" @checkboxSelected="checkboxSelectedAll"></tableCheckbox>
                        </view>
                      </template>
                      <template v-else>
                        {{ item.label }}
                        <view class="sorter-table" v-if="item.sorter">
                          <view :class="['sorter-table-icon',item.sorterMode==='_asc'&&`sorting${item.sorterMode||''}`]"></view>
                          <view :class="['sorter-table-icon',item.sorterMode==='_desc'&&`sorting${item.sorterMode||''}`]"></view>
                        </view>
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
	      <scroll-view
            class="zb-table-body" ref="tableBody"	scroll-x="true"	scroll-y="true"	id="tableBody"
	                   :lower-threshold="40"
	                   :upper-threshold="10"
                     @scrolltolower="scrolltolower"
	                   @scrolltoupper="(e)=>debounce(scrollToLeft)(e)"
                     @scroll="handleBodyScroll"	:scroll-left="bodyTableLeft"	:scroll-top="bodyScrollTop"
                     :style=" `height: calc(100% - ${showSummary?80:40}px)`" >
	          <view class="zb-table-fixed">
	            <view class="zb-table-tbody">
	              <view  :class="['item-tr',highlight&&isHighlight(item,index)?'current-row':'']"
                       @click.stop="rowClick(item,index)"
	                     v-for="(item,index) in transData" :key="item.key" >
	                <view
	                    :style="[{
									              width:`${ite.width?ite.width:'100'}px`,
															  flex:i===transColumns.length-1?1:'none',
															  minWidth:`${ite.width?ite.width:'100'}px`,
															  borderRight:`${border?'1px solid #e8e8e8':''}`,
                                textAlign:ite.align||'left',
														  },cellStyle&&getCellStyle(item,ite,index,i)]"

	                    :class="['item-td',stripe?(index % 2) != 0?'odd':'even':'']"
	                    v-for="(ite,i) in transColumns" :key="i">
	                  <template  v-if="ite.type==='operation'">
	                    <view style="display: flex;align-items: center;height: 100%">
	                      <view
                            v-for="ren,ind in permission(item,ite.renders,index)"
	                          :key="ind"
	                          @click.stop="$emit(ren.func,item,index)"
	                          :style="{
	                          display:'flex',
	                          alignItems: 'center',
	                          marginRight:ite.renders.length>1?'8px':'0'
	                        }">
                          <template v-if="ren.type==='custom'">
                            <view :class="ren.class||''" style="cursor: pointer">
                              {{ren.name}}
                            </view>
                          </template>
                          <template v-else>
                            <button
                                :class="ren.class||''"
                                :type="ren.type||'primary'" :size="ren.size||'mini'">{{ren.name}}</button>
                          </template>
	                      </view>
	                    </view>
	                  </template>
                    <template v-else-if="ite.type==='selection'">
                      <view class="checkbox-item">
                        <tableCheckbox @checkboxSelected="(e)=>checkboxSelected(e,item)" :cellData="item" :checked="item.checked"/>
                      </view>
                    </template>
                    <template v-else-if="ite.type==='index'">
                      {{index+1}}
                    </template>
                  <template v-else-if="ite.type==='img'">
                    <view class="checkbox-item">
                      <image
                    @click.stop="previewImage(item,item[ite.name],index)"
                    v-if="item[ite.name]"
                    :show-menu-by-longpress="false"
                    :src="item[ite.name]" style="width: 40px;height:30px; " mode="aspectFit"></image>
                    <text v-else>{{ite.emptyString}}</text>
                    </view>
                  </template>
	                  <template  v-else>
<!--                      {{ ite.filters?itemFilter(item,ite):(item[ite.name]==null||item[ite.name]==='')?ite.emptyString:item[ite.name] }}-->
                      {{ ite.filters?itemFilter(item,ite):formatterAction(item,ite,index,i) }}
	                  </template>
	                </view>
	              </view>
	            </view>
	          </view>
	        </scroll-view>
       <table-h5-summary
           :scrollbarSize="scrollbarSize"
           :data="data"
           :handleFooterTableScrollLeft="handleFooterTableScrollLeft"
           :headerFooterTableLeft="headerFooterTableLeft"
           v-if="showSummary"
           :showSummary="showSummary"
           :transColumns="transColumns"
           :border="border"
           :summary-method="summaryMethod"
           :sumText="sumText"
           :fixedLeftColumns="fixedLeftColumns"/>
	    </view>
	    <view class="zb-table-fixed-left"
            v-if="isFixedLeft"
            :style=" {height:  `calc(100% - ${scrollbarSize}px)`}"
      >
	      <template v-if="showHeader">
	        <view class="zb-table-header" style="display: flex">
	          <view class="item-tr"
                  style=""
                  @click.stop="rowClick(item,index)"
                  v-for="(item,index) in fixedLeftColumns" :key="index">
	            <view
	                :style="{
	               width:`${item.width?item.width:'100'}px`,
	               borderRight:`${border?'1px solid #e8e8e8':''}`,
	               borderTop:`${border?'1px solid #e8e8e8':''}`,
                textAlign:item.align||'left'
	            }"
	                @click.stop="sortAction(item,index)"
	                class="item-th"
	            >
                <template v-if="item.type==='selection'">
                  <view class="checkbox-item">
                    <tableCheckbox
                        :indeterminate="indeterminate" :checked="checkedAll" @checkboxSelected="checkboxSelectedAll"></tableCheckbox>
                  </view>
                </template>
                <template v-else>
                  {{ item.label }}
                  <view class="sorter-table" v-if="item.sorter">
                    <view :class="['sorter-table-icon',item.sorterMode==='_asc'&&`sorting${item.sorterMode||''}`]"></view>
                    <view :class="['sorter-table-icon',item.sorterMode==='_desc'&&`sorting${item.sorterMode||''}`]"></view>
                  </view>
                </template>
              </view>
	          </view>

	        </view>
	      </template>
        <scroll-view
            scroll-y="true"
            id="leftTableFixed"
            :upper-threshold="15"
            @scrolltoupper="(e)=>scrollToFixedLeft(e)"
            @scroll="leftFixedScrollAction"
            :scroll-top="leftFiexScrollTop"
            class="zb-table-body-inner"
            :style=" `height: calc(100% - ${showSummary?80:40}px)`">
          <view class="zb-table-fixed">
            <view class="zb-table-tbody">
              <view
                  :class="['item-tr',stripe?(i % 2) != 0?'odd':'even':'',highlight&&isHighlight(ite,i)?'current-row':'']"
                    v-for="(ite,i) in transData"
                    @click.stop="rowClick(ite,i)"
                    :key="ite.key"
                    style="">
                <view class='item-td'
                      :style="[{
	                       width:`${item.width?item.width:'100'}px`,
	                       borderRight:`${border?'1px solid #e8e8e8':''}`,
	                       textAlign:item.align||'left'
	                      },cellStyle&&getCellStyle(ite,item,i,index)]"
                      :key="index"
                      v-for="(item,index) in fixedLeftColumns">
                  <template v-if="item.type==='selection'">
                    <view class="checkbox-item">
                      <tableCheckbox @checkboxSelected="(e)=>checkboxSelected(e,ite)" :cellData="ite" :checked="ite.checked"/>
                    </view>
                  </template>
                  <template v-else-if="item.type==='index'">
                    {{i+1}}
                  </template>
                  <template v-else>
                    {{ite[item.name]||item.emptyString}}
                  </template>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
        <table-side-summary
            :scrollbarSize="scrollbarSize"
            v-if="showSummary&&!(scrollbarSize>0)"
            :data="data"
            :showSummary="showSummary"
            :transColumns="transColumns"
            :border="border"
            :summary-method="summaryMethod"
            :sumText="sumText"
            :fixedLeftColumns="fixedLeftColumns"/>
	    </view>
	  </view>
    <zb-load-more v-if="isLoadMore&&!completeLoading"/>
	</view>
	<!-- #endif -->
	<!-- #ifndef H5 || APP-PLUS -->
	<view class="zb-table-applet">
	  <view class="zb-table-content">
      <scroll-view
		<!-- #ifdef MP-ALIPAY -->
		@scroll="scrollAlipay"
		<!-- #endif  -->

          @scrolltolower="scrolltolower"
					<!-- #ifdef MP-ALIPAY -->
                   style=" height: 100%;overflow-x:scroll"
				   <!-- #endif  -->
				   <!-- #ifndef MP-ALIPAY -->
				   style=" height: 100%"
				   <!-- #endif  -->
                   scroll-y="true"
				   scroll-x="true">
	    <view class="zb-table-scroll" >
	      <template v-if="showHeader">
	        <view class="zb-table-header top-header-uni" style="">
	            <view class="zb-table-fixed" >
	              <view class="zb-table-thead" style="position: relative;" >
	                <view class="item-tr">
	                  <view
	                      @click.stop="sortAction(item,index)"
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
                      <template v-if="item.type==='selection'">
                        <view class="checkbox-item">
                          <tableCheckbox
                              :indeterminate="indeterminate" :checked="checkedAll" @checkboxSelected="checkboxSelectedAll"></tableCheckbox>
                        </view>
                      </template>
                      <template v-else>
                        {{ item.label||'' }}
                        <view class="sorter-table" v-if="item.sorter">
                          <view :class="['sorter-table-icon',item.sorterMode==='_asc'&&`sorting${item.sorterMode||''}`]"></view>
                          <view :class="['sorter-table-icon',item.sorterMode==='_desc'&&`sorting${item.sorterMode||''}`]"></view>
                        </view>
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
              <view  :class="['item-tr',highlight&&isHighlight(item,index)?'current-row':'']"
                     @click.stop="rowClick(item,index)"
                     v-for="(item,index) in transData" :key="item.key" >
                <view
                    :style="[{
                      left:`${ite.left}px`,
                      width:`${ite.width?ite.width:'100'}px`,
                      flex:i===transColumns.length-1?1:'none',
                      minWidth:`${ite.width?ite.width:'100'}px`,
                      borderRight:`${border?'1px solid #e8e8e8':''}`,
                      textAlign:ite.align||'left',
                    },getCellStyle(item,ite,index,i)]"
                    :class="['item-td', i <fixedLeftColumns.length&&'zb-stick-side',stripe?(index % 2) != 0?'odd':'even':'']"
                    v-for="(ite,i) in transColumns" :key="i">
                  <template  v-if="ite.type==='operation'">
                    <view style="display: flex;align-items: center;height: 100%">
                      <view
                          v-for="ren,ind in permission(item,ite.renders,index)"
                          :key="ind"
                          @click.stop="$emit(ren.func,item,index)"
                          :style="{
	                          display:'flex',
	                          alignItems: 'center',
	                          marginRight:ite.renders.length>1?'8px':'0'
	                        }">
                        <template v-if="ren.type==='custom'">
                          <view :class="ren.class||''" style="cursor: pointer">
                            {{ren.name}}
                          </view>
                        </template>
                        <template v-else>
                          <button
                              :class="ren.class||''"
                              :type="ren.type||'primary'" :size="ren.size||'mini'">{{ren.name}}</button>
                        </template>
                      </view>
                    </view>
                  </template>
                  <template v-else-if="ite.type==='selection'">
                    <view class="checkbox-item">
                      <tableCheckbox @checkboxSelected="(e)=>checkboxSelected(e,item)" :cellData="item" :checked="item.checked"/>
                    </view>
                  </template>
                  <template v-else-if="ite.type==='img'">
                    <image
                        @click.stop="previewImage(item,item[ite.name],index)"
                        v-if="item[ite.name]"
                        :show-menu-by-longpress="false"
                        :src="item[ite.name]" style="width: 40px;height:30px; " mode="aspectFit"></image>
                    <text v-else>{{ite.emptyString}}</text>
                  </template>
                  <template v-else-if="ite.type==='index'">
                    {{index+1}}
                  </template>
                  <template  v-else>
<!--                    {{ ite.filters?itemFilter(item,ite):(item[ite.name]==null||item[ite.name]==='')?ite.emptyString:item[ite.name] }}-->
                    {{ ite.filters?itemFilter(item,ite):formatterAction(item,ite,index,i) }}
                  </template>
                </view>
              </view>
            </view>
          </view>
        <table-summary
            v-if="showSummary"
            :data="data"
            :showSummary="showSummary"
            :fixedLeftColumns="fixedLeftColumns"
            :transColumns="transColumns"
            :border="border"
            :summary-method="summaryMethod"
            :sumText="sumText"
        />
	    </view>
      </scroll-view>
	  </view>
    <zb-load-more v-if="isLoadMore&&!completeLoading"/>
	</view>
	<!-- #endif -->
</template>
<script>
import TableCheckbox from './components/table-checkbox.vue'
import TableSummary from "./components/table-summary.vue";
import TableSideSummary from "./components/table-side-summary.vue";
import TableH5Summary from './components/table-h5-summary'
import ZbLoadMore from './components/zb-load-more'

import {getScrollbarSize} from "./js/util";
export default {
  components:{
    TableCheckbox,
    TableSummary,
    TableSideSummary,
    TableH5Summary,
    ZbLoadMore
  },
  props:{
    highlight:{
      type:Boolean,
      default:false
    },
    itemDate:{
      type:Object,
      default:()=>{}
    },
    columns:{
      type:Array,
      default:()=>[]
    },
    showSummary:{
      type:Boolean,
      default:false
    },
    isShowLoadMore:{
      type:Boolean,
      default:false
    },
    data:{
      type:Array,
      default:()=>[]
    },
    sumText:{
      type:String,
      default:'合计'
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
    rowKey:[String, Function],
    summaryMethod:Function,
    pullUpLoading:Function,
    formatter:Function,
    cellStyle:Function,
    cellHeaderStyle:Function,
    permissionBtn:Function,
  },
  computed:{
    loadMoreHeight(){
      return this.isLoadMore?40:0
    },
    fixedLeftColumns(){
      let arr = []
      for(let i=0;i<this.columns.length;i++){
        let item = this.columns[i]
        if(item.fixed){
          arr.push(item)
        }else {
          break
        }
      }
      return arr
    },
    itemfilters(){
      return(item,ite)=>{
        if(item[ite.name]==null){
          return ite.emptyString
        }
        return item[ite.name]
      }
    },
    scrollbarSize(){
		// #ifdef H5
      return getScrollbarSize()
	  // #endif

	  // #ifndef H5
	  return 0
	  // #endif
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
			      let str = ''
            column.renders.map((item)=>{
              str+=item.name
            })
            column.width = this.getTextWidth(str)+column.renders.length*40
          }else if(column.type==="img"){
			   }else if(column.type==="selection"){
			}else{
			let arr = [this.getTextWidth(column.label)]
            this.data.forEach(data=>{
              let str = (data[column.name]+'')
			  if(str==='undefined'){
				   arr.push(30)
			  }else{
				   let width = this.getTextWidth(str)
				   arr.push(width)
			  }
            })
			      column.width = Math.max(...arr)+20
          }
        })
      }
      let number = 0
      this.columns.forEach((item,index)=>{
        if(item.type==="operation"&&item.renders&&!item.width){
          let str = ''
          item.renders.map((item)=>{
            str+=item.name
          })
          item.width = this.getTextWidth(str)+item.renders.length*40
        }
        if(item.fixed){
          if(index===0){
            item.left = 0
            number+=item.width
          }else {
            item.left = number
            number+=item.width
          }
        }
        item.emptyString = item.emptyString||'--'
      })
      return this.columns
    },
    transData(){
      let flag = this.columns.some(item=>item.type==='selection')
      this.data.forEach((item,index)=>{
        if(flag){
          if(item.checked){
            if(!this.selectArr.length){
              this.selectArr.push(item)
            }
          }
        }
        if(this.rowKey){
          if(typeof this.rowKey==='function'){
            item.key = Object.freeze(this.rowKey(item))||Date.now()
          }else {
            item.key = Object.freeze(item[this.rowKey])||Date.now()
          }
        }else {
          item.key = index
        }
      })
      if(flag&&this.data.length){
        let le = this.data.filter(item=>item.checked).length
        if(le){
          if(le===this.data.length){
            this.checkedAll = true
          }else {
            this.indeterminate = true
          }
        }
      }
      return this.data
    },
    isHighlight(){
      return (item,index)=>{
        if(this.rowKey){
          return item.key === this.currentRow['key']
        }else{
          return index === this.currentRowIndex
        }
      }
    },
    getHeaderCellStyle() {
      return (column,  columnIndex,childIndex)=>{
        const cellStyle = this.cellHeaderStyle;
        if(typeof cellStyle==='function'){
          return cellStyle({ column, columnIndex})
        }
        return {}
      }
    },
    getCellStyle() {
     return (row, column, rowIndex, columnIndex)=>{
       const cellStyle = this.cellStyle;
       if(typeof cellStyle==='function'){
         return cellStyle({row, column, rowIndex, columnIndex})
       }
       return {}
     }
    },
  },
  data() {
    return {
      button:[],
	    alipayScrollTop:0,
      alipayScrollOldTop:0,
      alipayFlag:false,
      bodyTableLeft:0,
      headerTableLeft:0,
      lastScrollLeft:0,
      isLoadMore:false,
      headerFooterTableLeft:0,
      leftFiexScrollTop:0,
      bodyScrollTop:0,
      currentDriver:null,
      currentDriver1:null,
      bodyTime:null,
      currentRowIndex:null,
      currentRow: {},
      bodyTime1:null,
      headerTime:null,
      debounceTime:null,
      operation:{},
      completedFlag:false,
      selectArr:[],
      indeterminate:false,
      checkedAll:false,
      completeLoading:false,
      aliTime:null,
    }
  },
  created(){
  },
  mounted(){
  },
  methods: {

    formatterAction(row,column,rowIndex,columnIndex){
      if(column.formatter&&typeof this.formatter==='function'){
        return this.formatter(row,column,rowIndex,columnIndex)
      }
      return (row[column.name]==null||row[column.name]==='')?column.emptyString:row[column.name]
    },
    permission(item,renders,index){
      if(this.permissionBtn&&typeof this.permissionBtn==='function'){
        return this.permissionBtn(item,renders,index)
      }
      return renders
    },
    pullUpCompleteLoading(type){
      this.isLoadMore = false
      if(type==='ok'){
        this.completeLoading = true
      }
    },
    scrollAlipay(e){

      if(!this.alipayScrollOldTop){
        this.alipayScrollOldTop = e.detail.scrollTop
      }
      this.aliTime&&clearTimeout(this.aliTime)
      this.aliTime = setTimeout(()=>{

        if(this.alipayFlag&&e.detail.scrollTop>this.alipayScrollOldTop){
          this.pullLoad()
        }
        this.alipayFlag = false
        this.alipayScrollOldTop = null
      },500)
    },
    pullLoad(){
      if(this.isShowLoadMore){
        this.isLoadMore = true
        this.$emit('pullUpLoading')
        let that = this
        this.pullUpLoading&&this.pullUpLoading.call(this.$parent.$parent, (type)=>{
          that.isLoadMore = false
          if(type==='ok'){
            that.completeLoading=true
          }
        })
      }

    },
    scrolltolower(e){
      this.alipayFlag = true
      if(e.detail.direction==='bottom'){
        this.pullLoad()
      }

      // this.pullUpLoading.call(this.$parent)
    },
	  previewImage(item,url,current){
		  uni.previewImage({
			  current,
			  urls:[url]
		  })
	  },
    resetHighlight(){
      this.currentRowIndex = null
      this.currentRow = {}
    },
    rowClick(row,index){
      if(this.highlight){
        this.currentRowIndex = index
        this.currentRow = row
        this.$emit('currentChange',row,index)
      }
      this.$emit('rowClick',row,index)
    },
    checkboxSelectedAll(e){
      this.indeterminate = false
      if(e.checked){
        this.selectArr = []
        this.checkedAll = true
        this.data.forEach(item=>{
          // this.$set(item,'checked',true)
          item.checked = true
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
      if(this.selectArr.length===this.transData.length){
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
      if(str.length<3){
        return 40
      }
      let regx = /^[0-9]+.?[0-9]*$/
      let flexWidth = 0
      for (const char of str) {
        if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
          // 如果是英文字符，为字符分配8个单位宽度
          flexWidth += 10
        } else if (char >= '\u4e00' && char <= '\u9fa5') {
          // 如果是中文字符，为字符分配15个单位宽度
          flexWidth += 15
        } else if(regx.test(char)){
          flexWidth += 9
        }else {
          // 其他种类字符，为字符分配8个单位宽度
          flexWidth += 7
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
      if(!item.sorter){return false}
      this.$set(item,'sorterMode',item.sorterMode==='_asc'?'_desc':'_asc')
      if(item.sorter==='custom'){
        this.$emit('sort-change',item,item.sorterMode.replace('_',''),index)
      }else {
        this.sortData(item)
      }
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
      this.headerFooterTableLeft = e.detail.scrollLeft
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
      this.headerFooterTableLeft = e.detail.scrollLeft
      this.bodyTime&&clearTimeout(this.bodyTime)
      this.bodyTime = setTimeout(()=>{
        this.currentDriver=null
      },200)
    },
    handleFooterTableScrollLeft(e){
      if(this.currentDriver&&this.currentDriver!==e.currentTarget.id)return
      this.currentDriver = e.currentTarget.id
      this.bodyTableLeft = e.detail.scrollLeft
      this.headerTableLeft = e.detail.scrollLeft
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
  /*去除左边滚动条 */
  scroll-view ::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    background: transparent;
  }
}
.zb-table-header{
  ///*去除头部滚动条 */
  scroll-view ::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    background: transparent;
  }
}

</style>
<style lang="scss" scoped>
.sorter-table{
  position: absolute;
  right: 6px;
  top:50%;
  transform:translateY(-50%);
  .sorter-table-icon{
    width: 0;
    height: 0;
    color: #dcdcdc;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
  }
  .sorter-table-icon:first-child{
    border-bottom: 5px solid currentColor;
  }
  .sorter-table-icon:last-child{
    margin-top: 1.5px;
    border-top: 5px solid currentColor;
  }
  .sorting_desc{
    color: #2979ff;
  }
  .sorting_asc{
    color: #2979ff;
  }
}
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
.item-th{
  position: relative;
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
.zb-table{
  height: 100%;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  position: relative;
  .zb-table-content{
    //height: 100%;
    //flex: 1;
    position: relative;
    overflow: hidden;
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
      //display: flex;
      //align-items: center;
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
.zb-table-applet{
  height: 100%;
  //overflow: hidden;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  .zb-table-content{
    //height: 100%;
    flex: 1;
    overflow: hidden;
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
  .zb-table-header {
    //overflow: hidden;
    position: sticky;
    top: 0;
    z-index: 2;
    //width: fit-content;
    .item-th{
      padding-left: 8px;
      line-height: 39px;
      height: 40px;
      box-sizing: border-box;
      background: #fafafa;
    }
    .zb-stick-side{
      position: sticky;
      top: 0;
      left: 0;
      z-index: 2;
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
      z-index: 1;
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
  .current-row{
    .item-td{
      background-color: #ecf5ff;
    }
  }
}
.current-row{
  .item-td{
    background-color: #ecf5ff;
  }
}
.zb-table-header{
  height: 40px;
}
</style>
