<template>
	<view class="content">
    <uni-card title="全部功能" >
      <view style="height: 300px">
        <zb-table
            @sort-change="sortChange"
            :pullUpLoading="pullUpLoading"
            :isShowLoadMore="true"
            :highlight="true"
            :show-header="true"
            :columns="column"
            :fit="false"
            :permissionBtn="permissionBtn"
            row-key="id"
            @rowClick="rowClick"
            @toggleRowSelection="toggleRowSelection"
            @toggleAllSelection="toggleAllSelection"
            :border="true"
            @custom="custom"
            @edit="buttonEdit"
            @dele="dele"
            :data="data"></zb-table>
      </view>
    </uni-card>
    <uni-card title="普通表格" >
      <view style="height: 200px">
        <zb-table
            :columns="column1"
            :stripe="true"
            @rowClick="rowClick"
            :data="data"></zb-table>
      </view>
    </uni-card>
    <uni-card title="带边框表格" >
      <view style="height: 200px">
        <zb-table
            :columns="column1"
            :stripe="true"
            @rowClick="rowClick"
            :border="true"
            :data="data"></zb-table>
      </view>
    </uni-card>
    <uni-card title="多选，多行数据时使用 Checkbox" >
      <view style="height: 200px">
        <zb-table
            :columns="column2"
            :stripe="true"
            @rowClick="rowClick"
            @toggleRowSelection="toggleRowSelection"
            @toggleAllSelection="toggleAllSelection"
            :border="true"
            @edit="buttonEdit"
            @dele="dele"
            :data="data"></zb-table>
      </view>
    </uni-card>
    <uni-card title="固定多列和表头" >
      <view style="height: 200px">
        <zb-table
            :columns="column3"
            :stripe="true"
            @rowClick="rowClick"
            @toggleRowSelection="toggleRowSelection"
            @toggleAllSelection="toggleAllSelection"
            :border="true"
            @edit="buttonEdit"
            @dele="dele"
            :data="data"></zb-table>
      </view>
    </uni-card>
    <uni-card title="年纪、日期排序" >
      <view style="height: 200px">
        <zb-table
            :show-header="true"
            :columns="column4"
            :stripe="true"
            :fit="false"
            @rowClick="rowClick"
            @toggleRowSelection="toggleRowSelection"
            @toggleAllSelection="toggleAllSelection"
            :border="true"
            @edit="buttonEdit"
            @dele="dele"
            :data="data"></zb-table>
      </view>
    </uni-card>

    <uni-card title="表尾合计" >
      <view style="height: 300px">
        <zb-table
            :show-header="true"
            :columns="column"
            :fit="false"
            :show-summary="true"
            :summary-method="getSummaries"
            @rowClick="rowClick"
            @toggleRowSelection="toggleRowSelection"
            @toggleAllSelection="toggleAllSelection"
            :border="true"
            @edit="buttonEdit"
            @dele="dele"
            :data="data1"></zb-table>
      </view>
    </uni-card>

    <uni-card title="上拉加载" >
      <view style="height: 300px">
        <zb-table
            :show-header="true"
            :columns="column"
            :isShowLoadMore="true"
            ref="zbTable"
            @pullUpLoading="pullUpLoadingAction"
            :summary-method="getSummaries"
            @rowClick="rowClick"
            @toggleRowSelection="toggleRowSelection"
            @toggleAllSelection="toggleAllSelection"
            :border="true"
            @edit="buttonEdit"
            @dele="dele"
            :data="data"></zb-table>
      </view>
    </uni-card>


    <uni-card title="选择单行数据时使用色块表示" >
      <view style="height: 300px">
        <zb-table
            :show-header="true"
            :columns="column1"
            @currentChange="currentChange"
            :highlight="true"
            :border="true"
            :data="data"></zb-table>
      </view>
    </uni-card>

    <uni-card title="支持设置单元格样式" >
      <view style="height: 300px">
        <zb-table
            :cell-style="cellStyle"
            :show-header="true"
            :columns="column1"
            @currentChange="currentChange"
            :highlight="true"
            :border="true"
            :data="data"></zb-table>
      </view>
    </uni-card>

	</view>
</template>

<script>
  import {column1,column2,column3,column4} from './all.js'
  let that = null
	export default {
		components:{
		},
		data() {
			return {
        column1,
        column2,
        column3,
        column4,
				title: 'Hello',
        column:[
          { type:'selection', fixed:true,width:60 },
          { name: 'name', label: '姓名',fixed:true,width:80,emptyString:'--' },
          { name: 'age', label: '年龄',sorter:'custom',align:'right',fixed:false, },
          { name: 'sex', label: '性别',filters:{0:'男',1:'女'}},
          { name: 'price', label: '价格'},
          { name: 'admin', label: '账号'},
          { name: 'address', label: '地址' },
          { name: 'date', label: '日期',sorter:true },
          { name: 'province', label: '省份' },
          { name: 'city', label: '城市' },
          { name: 'zip', label: '邮编' },
          { name: 'img', label: '图片',type:"img",align: "center" },
          { name: 'operation', type:'operation',label: '操作',renders:[
              {
                name:'编辑',
                class:'edit',
                type:"primary",
                func:'edit' // func 代表子元素点击的事件 父元素接收的事件 父元素 @edit
              },
              {
                name:'自定义按钮',
                type:'custom', // type 为custom的时候自定义按钮
                class:"custom",
                func:'custom'
              },
              {
                name:'删除',
                type:'warn', // type 为custom的时候自定义按钮
                class:"del",
                func:'dele',
              },
            ]},
        ],
        data:[
          {
            date: '2016-05-02',
            name: '',
            price: 0,
            province: '上海',
            admin:"admin",
            sex:'1',
            checked:true,
            id:"20",
			      img:"https://img1.baidu.com/it/u=300787145,1214060415&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
            age:0,
            city: '普陀区',
            address: '上海市普上海市普上海市普上海市普',
            zip: 200333
          },
          {
            date: '2016-05-01',
            name: '王小虎2',
            province: '上海',
            sex:'0',
            price: 0,
            id:"2",
            age:12,
            city: '普陀区',
img:"https://img.pddpic.com/mms-material-img/2020-11-27/84c7fad3-d945-4e71-ab09-7a1ed80f6055.jpeg.a.jpeg",
            address: '上海市普',
            zip: 200333
          },
          {
            date: '2022-03-25T09:27:42',
            name: '王小虎3',
            province: '上海',
            sex:1,
            price: 33,
            id:"3",
            age:'15',
			img:"https://img1.baidu.com/it/u=300787145,1214060415&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
            city: '普陀区',
            address: '上海市普',
            zip: 200333555
          },
          {
            date: '2016-04-02',
            name: '王小虎4',
            province: '上海',
            sex:1,
            age:'11',
            price: 33,
            id:"4",
			img:"https://img1.baidu.com/it/u=300787145,1214060415&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
            city: '普陀区',
            address: '上海市普',
            zip: 200333
          },
          {
            date: '2016-03-02',
            name: '王小虎5',
            province: '上海',
            price: 0,
            sex:1,
            age:'14',
			img:"https://img1.baidu.com/it/u=300787145,1214060415&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
            id:"5",
            city: '普陀区',
            address: '上海市普',
            zip: 200333
          },{
            date: '2014-05-02',
            name: '王小虎6',
            province: '上海',
            price: 33,
            sex:1,
            id:"6",
            age:'12',
			img:"https://img1.baidu.com/it/u=300787145,1214060415&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
            city: '普陀区',
            address: '上海市普',
            zip: 0
          },{
            date: '2019-05-02',
            name: '王小虎7',
            price: 33,
            province: '上海',
            sex:1,
            age:0,
            id:"7",
            city: '普陀区',
			img:"https://img1.baidu.com/it/u=300787145,1214060415&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
            address: '上海市普',
            zip: 200333
          },{
            date: '2012-05-02',
            name: '王小虎8',
            province: '上海',
            price: 0,
            sex:1,
            age:'29',
            id:"8",
            city: '普陀区',
			img:"https://img1.baidu.com/it/u=300787145,1214060415&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
            address: '上海市普',
            zip: 200333
          },{
            date: '2011-05-02',
            name: '王小虎91',
            price: 33,
			img:"https://img1.baidu.com/it/u=300787145,1214060415&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
            province: '上海',
            sex:1,
            id:"9",
            age:'30',
            city: '普陀区',
            address: '上海市普',
            zip: 200333
          },{
            date: '2011-05-02',
            name: '王小虎10',
            province: '上海',
            sex:1,
            id:"10",
            age:'30',
			img:"https://img1.baidu.com/it/u=300787145,1214060415&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
            city: '普陀区',
            address: '上海市普',
            zip: 200333
          },{
            date: '2011-05-02',
            name: '王小虎20',
            province: '上海',
            sex:1,
            price: 33,
            id:"11",
            age:'30',
            city: '普陀区',
            address: '上海市普',
            zip: 200333
          }
        ],
        data1:[],
        flag1:true,
		flag2:true,
        num:0,
		num1:0,
        isShowLoadMore:true
			}
		},
		onLoad() {

		},
    created(){
		  that = this
    },
    mounted(){
		  this.data1 = JSON.parse(JSON.stringify(this.data))
		  let data2 = JSON.parse(JSON.stringify(this.data))
      setTimeout(()=>{
        //  data2.forEach(item=>{
        //   item.checked = true
        // })
        // this.data = data2
      },3000)
    },
    methods:{
      sortChange(item,sorterMode,index){

        console.log('触发排序',item,sorterMode,index)
      },
      cellStyle({row, column, rowIndex, columnIndex}){
        // console.log('row, column, rowIndex, columnIndex')
        if(columnIndex === 1 || columnIndex === 4) {
          return{
            color:'red'
          }
        }
      },
      pullUpLoading(done){
        if(!this.flag1){
          return
        }
        setTimeout(()=>{
          this.data.push({
            date: '2011-05-02',
            name: '王小虎23',
            province: '上海',
            sex:1,
            price: 33,
            id:11111+this.num,
            age:'30',
            city: '普陀区',
            address: '上海市普',
            zip: 200333
          })

          this.num ++
          if(this.num===3){
            done('ok')
            this.flag1 = false
          }else {
            done()
          }
        },2000)
      },
      permissionBtn (row,renders,rowIndex){
        if(row.id==2){
          let arr = renders.filter(item=>item.func==='edit')
          return arr
        }
        return renders
      },
	  pullUpLoadingAction(done){
	    if(!this.flag2){
	      return
	    }
	    setTimeout(()=>{
	      this.data.push({
	        date: '2011-05-02',
	        name: '王小虎23',
	        province: '上海',
	        sex:1,
	        price: 33,
	        id:"11111",
	        age:'30',
	        city: '普陀区',
	        address: '上海市普',
	        zip: 200333
	      })

	      this.num1 ++
	      if(this.num1===3){
			this.$refs.zbTable.pullUpCompleteLoading('ok')
	        this.flag2 = false
	      }else {
	        this.$refs.zbTable.pullUpCompleteLoading()
	      }
	    },1000)
	  },
      buttonEdit(ite,index){
        uni.showToast({
          icon:'none',
          duration:3000,
          title:'点击编辑'
        })
        console.log(ite,index)
      },
      dele(ite,index){
        uni.showToast({
          icon:'none',
          duration:3000,
          title:'点击删除'
        })
        // alert('点击删除')
        console.log(ite,index)
      },
      custom(){
        uni.showToast({
          icon:'none',
          duration:3000,
          title:'点击自定义'
        })
      },
      toggleAllSelection(checked,arr){
        uni.showToast({
          icon:'none',
          duration:3000,
          title:'点击全选'
        })
        console.log('全选',checked,arr)
      },
      toggleRowSelection(checked,arr){
        uni.showToast({
          icon:'none',
          duration:3000,
          title:'点击单选'
        })
        console.log('单选',checked,arr)
      },
      currentChange(row,index){
        uni.showToast({
          icon:'none',
          duration:3000,
          title:'选中当前一行'
        })
        console.log('单选',row,index)
      },
      rowClick(row,index){
        uni.showToast({
          icon:'none',
          duration:3000,
          title:'单击某行'
        })
        console.log('单击某行',row,index)
      },
      getSummaries(param){
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          if(column.name==='price'){
            const values = data.map(item => Number(item[column.name]));
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index] += ' 元';
            }
          }else{
            sums[index] = 'N/A';
          }
        });
        return sums;
      }
    },

	}
</script>

<style scoped lang="scss">
::v-deep{
  .uni-card{
    margin: 8px!important;
    padding: 0!important;
    .uni-card__content{
      padding: 0!important;
    }
  }
}
	.content{
		//height: 600rpx;
    //.title{
    //  font-weight: bold;
    //  padding: 20rpx 0;
    //}
	}

</style>
