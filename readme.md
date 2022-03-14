
## 介绍
基于uni-app开发的一个普通的表格组件，功能有固定首列和表头、排序、操作按钮、已用于生产环境

## table 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |是否必须|
| ------ | ------ | ------ | ------ | ------ |------ |
| data | 显示的数据 | array |-- | -- |必须 |
| column | 显示的列数据 | array |-- | -- |必须 |
| stripe | 是否为斑马纹 table| boolean | - |false | 否 |
| fit | 列的宽度是否自撑开 | boolean |true,false | false |否 |
| show-header | 是否显示表头 | boolean |true,false | true |否 |
| border | 是否带有纵向边框 | boolean |true,false | true |否 |

## table 事件
| 参数 | 说明 | 类型 | 可选值 | 默认值 |是否必须|
| ------ | ------ | ------ | ------ | ------ |------ |
| 事件名自定义 | 取决于type类型为operation的 renders参数里面 func 的参数名 | Function |(row,index)=>{} | -- |否 |
| toggleRowSelection | 用于多选表格，切换某一行的选中状态，第一个参数代表选中状态，参数二代表选中的对象 | Function |(selected ,array)=>{} | -- |否 |
| toggleAllSelection | 用于多选表格，切换所有行的选中状态 ，第一个参数代表选中状态，参数二代表选中的对象| Function |(selected ,array)=>{} | -- |否 |
| rowClick | 单击某行 ，第一个参数代表选中对象，参数二代表选中的index| Function |(row ,index)=>{} | -- |否 |

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
| sorter | 排序 | boolean |true,false | false |
| emptyString | 当值为空的时候默认显示的值 | string |  | -- |
| filters | 对象过滤的选项，对象格式，对象中的元素需要有 key 和 value 属性。 | Object | {key:value} | -- |
| align | 对齐方式 | String | left/center/right | left |
| type | 为 operation 的时候代表为操作按钮 | string | operation | -- |
| renders | type 为operation的时候 必传 | Array | {name:'名字',func:"父元素接收事件名",type:"按钮的类型",size:"大小"} | -- |
```
type 为 operation 的时候代表为操作按钮
renders 代表传入的按钮  Array  =>[
    {
        name:'编辑',
        type:'primary',代表按钮的类型
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
            city: '普陀区',
			img:"https://img1.baidu.com/it/u=300787145,1214060415&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
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
