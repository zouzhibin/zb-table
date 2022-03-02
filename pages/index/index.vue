<template>
	<view class="content">
		<zb-table :columns="column" :data="data"></zb-table>
	</view>
</template>

<script>
	import ZbTable from '@/components/zb-table/index.vue'
	export default {
		components:{
			ZbTable
		},
		data() {
			return {
				title: 'Hello',
        column:[
          { name: 'name', label: '姓名',fixed:true },
          { name: 'age', label: '年纪',sorter:true },
          { name: 'sex', label: '性别' },
          { name: 'address', label: '地址' },
          { name: 'date', label: '日期',sorter:true },
          { name: 'province', label: '省份' },
          { name: 'city', label: '城市' },
          { name: 'zip', label: '邮编' },
        ],
        data:[
          {
            date: '2016-05-02',
            name: '王小虎1',
            province: '上海',
            sex:'男',
            age:'16',
            city: '普陀区',
            address: '上海市普',
            zip: 200333
          },
          {
            date: '2016-05-01',
            name: '王小虎2',
            province: '上海',
            sex:'男',
            age:12,
            city: '普陀区',
            address: '上海市普',
            zip: 200333
          },
          {
            date: '2016-05-02',
            name: '王小虎3',
            province: '上海',
            sex:'男',
            age:'15',
            city: '普陀区',
            address: '上海市普',
            zip: 200333
          },
          {
            date: '2016-04-02',
            name: '王小虎4',
            province: '上海',
            sex:'男',
            age:'11',
            city: '普陀区',
            address: '上海市普',
            zip: 200333
          },
          {
            date: '2016-03-02',
            name: '王小虎5',
            province: '上海',
            sex:'男',
            age:'14',
            city: '普陀区',
            address: '上海市普',
            zip: 200333
          },{
            date: '2014-05-02',
            name: '王小虎6',
            province: '上海',
            sex:'男',
            age:'12',
            city: '普陀区',
            address: '上海市普',
            zip: 200333
          },{
            date: '2019-05-02',
            name: '王小虎7',
            province: '上海',
            sex:'男',
            age:'10',
            city: '普陀区',
            address: '上海市普',
            zip: 200333
          },{
            date: '2012-05-02',
            name: '王小虎8',
            province: '上海',
            sex:'男',
            age:'29',
            city: '普陀区',
            address: '上海市普',
            zip: 200333
          },{
            date: '2011-05-02',
            name: '王小虎9',
            province: '上海',
            sex:'男',
            age:'30',
            city: '普陀区',
            address: '上海市普',
            zip: 200333
          }
        ]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content{
		height: 600rpx;
	}
</style>
