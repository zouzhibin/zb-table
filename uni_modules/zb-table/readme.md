
## 介绍
基于uni-app开发的一个普通的表格组件，功能有固定首列和表头、排序、操作按钮、
table 表格 固定表头、固定首列、多列 上拉加载更多、 排序、自适应列宽、多选checkbox、编辑、删除、按钮、合计
已用于生产环境

## qq群 731805264  
## -- github 永远保持最新，有啥想法的可以提PR,共同开发 [地址](https://github.com/zouzhibin/zb-table)

## 友情链接
#### vue-admin-perfect —— [企业级、通用型中后台前端解决方案（基于vue3.0+TS+Element-Plus  最新版，同时支持电脑，手机，平板)](https://github.com/zouzhibin/vue-admin-perfect)



## table 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |是否必须|
| ------ | ------ | ------ | ------ | ------ |------ |
| data | 显示的数据 | array |-- | -- |必须 |
| column | 显示的列数据 | array |-- | -- |必须 |
| stripe | 是否为斑马纹 table| boolean | - |false | 否 |
| isLoading | 是否显示loading,动态控制 | boolean | - |false | 否 |
| fit | 列的宽度是否自撑开 | boolean |true,false | false |否 |
| show-header | 是否显示表头 | boolean |true,false | true |否 |
| cell-style | 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。 | Function({row, column, rowIndex, columnIndex})/Object |-- | -- |否 |
| cell-header-style | 头部单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。 | Function({ column, columnIndex})/Object |-- | -- |否 |
| border | 是否带有纵向边框 | boolean |true,false | true |否 |
| highlight | 是否要高亮当前行 | boolean |true,false | false |否 |
| show-summary | 是否在表尾显示合计行 | boolean |true,false | false |否 |
| sum-text | 合计行第一列的文本 | String |- | 合计 |否 |
| summary-method | 自定义的合计计算方法 | Function({ columns, data }) |- | - |否 |
| permissionBtn | 是否动态控制按钮的显示隐藏 | Function({ row, renders,index }) |- | - |否 |
| isShowLoadMore | 是否开启上拉加载 | boolean |true,false | false |否 |
| pullUpLoading | 开启上拉加载后的返回函数，接收参数done是函数,done(type),type为空代表还有数据，继续开启上拉加载，type='ok',代表结束上拉加载 | Function(done) |-- | -- |否 |

```
关闭上拉加载的方式1：pullUpLoading((done)=>{
	done(type)
})
done 接收参数为 type ，type为空代表还有数据，可以继续加载，无数据的时候传入 'ok'代表结束
```

## table 事件
| 参数 | 说明 | 类型 | 可选值 | 默认值 |是否必须|
| ------ | ------ | ------ | ------ | ------ |------ |
| 事件名自定义 | 取决于type类型为operation的 renders参数里面 func 的参数名 | Function |(row,index)=>{} | -- |否 |
| sort-change | 取决于type类型为operation的 renders参数里面 func 的参数名 | Function |(column,model,index)=>{} | -- |否 |
| currentChange | 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight属性,this.$refs.table.resetHighlight()清除选中 | Function |(row,index)=>{} | -- |否 |
| toggleRowSelection | 用于多选表格，切换某一行的选中状态，第一个参数代表选中状态，参数二代表选中的对象 | Function |(selected ,array)=>{} | -- |否 |
| toggleAllSelection | 用于多选表格，切换所有行的选中状态 ，第一个参数代表选中状态，参数二代表选中的对象| Function |(selected ,array)=>{} | -- |否 |
| rowClick | 单击某行 ，第一个参数代表选中对象，参数二代表选中的index| Function |(row ,index)=>{} | -- |否 |
| pullUpLoading | 开启上拉加载后的返回函数，无参数| Function  | -- |-- |否 |

```
关闭上拉加载的方式2：this.$refs.zbTable.pullUpCompleteLoading('ok')
接收参数为 type ，type为空代表还有数据，可以继续加载，无数据的时候传入 'ok'代表结束
```

## data 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| checked | 是否被勾选 | boolean |true,false | 无 |


## column 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| name | 属性值 | string |-- | 无 |
| label | 显示的标题 | string |-- | 无 |
| width | 列的宽度 | number |-- | 100 |
| fixed | 列是否固定在左侧，true 表示固定在左侧 | boolean |true,false | true |
| sorter | 排序，当设置为custom的时候代表自定义排序，不会再触发默认排序，会触发table事件@sort-change,可以通过接口来进行排序 | boolean |true,false,'custom' | false |
| emptyString | 当值为空的时候默认显示的值 | string |  | -- |
| filters | 对象过滤的选项，对象格式，对象中的元素需要有 key 和 value 属性。 | Object | {key:value} | -- |
| align | 对齐方式 | String | left/center/right | left |
| type | 为 operation 的时候代表为操作按钮,img的时候代表图片地址,index代表序列号 | string | operation,img,index | -- |
| renders | type 为operation的时候 必传 | Array | {name:'名字',func:"父元素接收事件名",type:"按钮的类型",size:"大小"} | -- |
```
type 为 operation 的时候代表为操作按钮
renders 代表传入的按钮  Array  =>[
    {
        name:'编辑',
        class:"", // 添加class
        type:'primary',代表按钮的类型  type 为custom的时候自定义按钮 其他类型取决于uniapp buttom组件按钮
        size:'mini',代表按钮的大小
        func:'edit' // func 代表操作按钮点击的事件名字 父元素接收的事件 父元素 @edit
        例如：// <zb-table @edit=""/> 
        
    }
]
```
## 示例
```
<zb-table
            :show-header="true"
            :columns="column"
            :stripe="true"
            :fit="false"
            show-summary
            sum-text="合计"
            @rowClick="rowClick"
            :summary-method="getSummaries"
            @toggleRowSelection="toggleRowSelection"
            @toggleAllSelection="toggleAllSelection"
            :border="true"
            @edit="buttonEdit"
            @dele="dele"
            :data="data"></zb-table>
```

## 数据格式
```
column:[
          { type:'selection', fixed:true,width:50 },
          { name: 'name', label: '姓名',fixed:false,width:80,emptyString:'--' },
          { name: 'age', label: '年纪',sorter:false,align:'right', },
          { name: 'sex', label: '性别',filters:{0:'男',1:'女'}},
		  { name: 'img', label: '图片',type:"img" },
          { name: 'address', label: '地址' },
          { name: 'date', label: '日期',sorter:true },
          { name: 'province', label: '省份' },
          { name: 'city', label: '城市' },
          { name: 'zip', label: '邮编' },
          { name: 'operation', type:'operation',label: '操作',renders:[
              {
                name:'编辑',
                func:'edit' // func 代表子元素点击的事件 父元素接收的事件 父元素 @edit
              },
              {
                name:'自定义按钮',
                type:'custom', // type 为custom的时候自定义按钮 其他类型取决于uniapp buttom组件按钮
                class:"custom",
                func:'custom'
              },
              {
                name:'删除',
                type:'warn',
                func:"dele"
              },
            ]},
        ],
 data:[
          {
            date: '2016-05-02',
            name: '王小虎1',
            province: '上海',
            sex:'男',
            age:'18',
			img:"https://img1.baidu.com/it/u=300787145,1214060415&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
            city: '普陀区',
            address: '上海市普',
            zip: 200333
          },
          {
            date: '2016-05-02',
            name: '王小虎2',
            province: '上海',
            sex:'男',
            age:'18',
            city: '普陀区',
            address: '上海市普',
            zip: 200333
          },
          {
            date: '2016-05-02',
            name: '王小虎3',
            province: '上海',
            sex:'男',
            age:'18',
            city: '普陀区',
            address: '上海市普',
            zip: 200333
          },
          {
            date: '2016-05-02',
            name: '王小虎4',
            province: '上海',
            sex:'男',
            age:'18',
            city: '普陀区',
            address: '上海市普',
            zip: 200333
          },
          {
            date: '2016-05-02',
            name: '王小虎5',
            province: '上海',
            sex:'男',
            age:'18',
            city: '普陀区',
            address: '上海市普',
            zip: 200333
          }
        ]       
```
