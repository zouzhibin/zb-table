
## 介绍
基于uni-app开发的一个普通的表格组件 ，功能有固定首列和表头，已用于生产环境

## table 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |是否必须|
| ------ | ------ | ------ | ------ | ------ |------ |
| data | 显示的数据 | array |-- | -- |必须 |
| column | 显示的列数据 | array |-- | -- |必须 |
| stripe | 是否为斑马纹 table| boolean | - |false | 否 |
| fit | 列的宽度是否自撑开 | boolean |true,false | false |否 |
| show-header | 是否显示表头 | boolean |true,false | true |否 |

```
type 为 operation 的时候代表为操作按钮
renders 代表传入的按钮  Array  =>[
    {
        func:'edit' // func 代表子元素点击的事件 父元素接收的事件 父元素 @edit
        例如：// <zb-table @edit=""/>
    }
]
```


## table 事件
| 参数 | 说明 | 类型 | 可选值 | 默认值 |是否必须|
| ------ | ------ | ------ | ------ | ------ |------ |
| 名字 | 取决于类型为operation func 的参数 | Function |-- | -- |必须 |


## column 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| name | 属性值 | string |-- | 无 |
| label | 显示的标题 | string |-- | 无 |
| width | 列的宽度 | number |-- | 100 |
| fixed | 列是否固定在左侧，true 表示固定在左侧 | boolean |true,false | true |
| sorter | 排序 | boolean |true,false | false |
| emptyString | 当值为空的时候默认显示的值 | string |  | -- |


## 数据格式
```
column:[
          { name: 'name', label: '姓名',fixed:true,width:80,emptyString:'--' },
          { name: 'age', label: '年纪',sorter:true },
          { name: 'sex', label: '性别' },
          { name: 'address', label: '地址' },
          { name: 'date', label: '日期',sorter:true },
          { name: 'province', label: '省份' },
          { name: 'city', label: '城市' },
          { name: 'zip', label: '邮编' },
          { name: 'operation', type:'operation',label: '操作',width: 150,renders:[
              {
                name:'编辑',
                func:'edit' // func 代表子元素点击的事件 父元素接收的事件 父元素 @edit
              },
              {
                name:'删除',
                type:'warn',
                func:"dele"
              }
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
          },{
            date: '2016-05-02',
            name: '王小虎6',
            province: '上海',
            sex:'男',
            age:'18',
            city: '普陀区',
            address: '上海市普',
            zip: 200333
          },{
            date: '2016-05-02',
            name: '王小虎7',
            province: '上海',
            sex:'男',
            age:'18',
            city: '普陀区',
            address: '上海市普',
            zip: 200333
          },{
            date: '2016-05-02',
            name: '王小虎8',
            province: '上海',
            sex:'男',
            age:'18',
            city: '普陀区',
            address: '上海市普',
            zip: 200333
          },{
            date: '2016-05-02',
            name: '王小虎9',
            province: '上海',
            sex:'男',
            age:'18',
            city: '普陀区',
            address: '上海市普',
            zip: 200333
          }

        ]       
```
