<template>
  <view
      :style="{
         flex:(wrapIndex===transColumns.length-1||(multify.length&&isMulitiLastLength))?1:'none',
         flexDirection:multify.length?'column':'row'
      }"
      class="zb__item-inner"

  >
    <view
        @click.stop="sortAction(item,index)"
        class="item-th"
        :style="[{
                  width:`${item.width?item.width+'px':'100%'}`,
                  flex:(index===transColumns.length-1)?1:'none',
                  minWidth:`${item.width?item.width:'100'}px`,
                  borderRight:`${border?'1px solid #e8e8e8':''}`,
				  <!-- #ifdef H5 || APP-PLUS -->
                  borderRight:`${(scrollbarSize&&wrapIndex===transColumns.length-1)?'':border?'1px solid #e8e8e8':''}`,
				  <!-- #endif -->
                  borderBottom:`${border?'1px solid #e8e8e8':''}`,
                  justifyContent:textPosition(item)

                },getCellStyle(item,wrapIndex)]"
        >

        <template v-if="item.type==='selection'">
          <view class="item-content" style="width: 100%">
            <view class="checkbox-item">
              <tableCheckbox
                  :indeterminate="indeterminate" :checked="checkedAll" @checkboxSelected="checkboxSelectedAll"></tableCheckbox>
            </view>
          </view>

        </template>
        <template v-else>
          <view class="item-content" >
            {{ item.label ||''}}
          <view class="sorter-table" v-if="item.sorter">
            <view :class="['sorter-table-icon',item.sorterMode==='_asc'&&`sorting${item.sorterMode||''}`]"></view>
            <view :class="['sorter-table-icon',item.sorterMode==='_desc'&&`sorting${item.sorterMode||''}`]"></view>
          </view>
         </view>
        </template>

    </view>
    <view class="item-children" v-if="item.children&&item.children.length">
      <table-header-item
          :item="ite"
          @sortAction="sortAction"
          :border="border"
          wrapIndex=""
          @checkboxSelectedAll="checkboxSelectedAll"
          :indeterminate="indeterminate"
          :checkedAll="checkedAll"
          :transColumns="transColumns"
          :index='`${i}-1-${index}`'
          :key='i'
          :multify="multify"
          :isMulitiLastLength="(item.children.length-1)===i"
          :scrollbarSize="scrollbarSize"
          v-for="(ite,i) in item.children"/>
    </view>
  </view>
</template>

<script >
  import TableCheckbox from './table-checkbox.vue'
  import TableHeaderItem from './table-header-item.vue'
  export default {
    name:'tableHeaderItem',
    components:{
      TableHeaderItem,
      TableCheckbox
    },
    props:{

      item:{
        type:Object,
        default:()=>{}
      },
      cellHeaderStyle:Function,
      multify:{
        type:Array,
        default:()=>[]
      },
      isMulitiLastLength:{
        type:Boolean,
        default:false
      },
      border:{
        type:Boolean,
        default:false
      },
      indeterminate:Boolean,
      checkedAll:Boolean,
      transColumns:{
        type:Array,
        default:()=>[]
      },
      scrollbarSize:{
        type:Number,
        default:0
      },
      realColumns:{
        type:Array,
        default:()=>[]
      },
      index:[Number,String],
      wrapIndex:[Number,String],
      childIndex:[Number,String],
      fixedLeftColumns:{
        type:Array,
        default:()=>[]
      }
    },
    computed:{
      textPosition(){
        return(item)=>{
          if(item.align==='right') return 'flex-end'
          if(item.align==='left') return 'flex-start'
          if(item.align==='center') return 'center'
        }
      },
      getCellStyle() {
        return (column,  columnIndex,childIndex)=>{
          const cellStyle = this.cellHeaderStyle;
          if(typeof cellStyle==='function'){
            return cellStyle({ column, columnIndex})
          }
          return {}
        }
      },
    },
    data(){
      return{

      }
    },
    methods:{

      sortAction(item,index){
        this.$emit('sortAction',item,index)
      },
      checkboxSelectedAll(e){
        this.$emit('checkboxSelectedAll',e)
      }
    }
  }
</script>

<style lang="scss" scoped>

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
.zb__item-inner{
  /* #ifndef H5 || APP-PLUS */
  height: 100%;
/*  #endif*/
  display: flex;
  flex-direction: column;
  .item-th{
    height: 100%!important;
    position: relative;
    display: flex;
   background: #fafafa;
    align-items: center;
    box-sizing: border-box;
    .item-content{
      height: 40px;
      padding-left: 8px;
      padding-right: 20px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
    }
  }
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
.item-children{
  display: flex;
}
}

</style>
