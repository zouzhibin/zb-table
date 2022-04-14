## 介绍
基于uni-app开发的一个分页组件


## qq群 731805264  
## -- github 第一时间会更新到github，永远保持最新，有啥想法的可以提PR,共同开发 [地址](https://github.com/zouzhibin/zb-ui)

## 友情链接
#### vue-admin-perfect —— [企业级、通用型中后台前端解决方案（基于vue3.0+TS+Element-Plus  最新版，同时支持电脑，手机，平板)](https://github.com/zouzhibin/vue-admin-perfect)


## drawer属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |是否必须|
| ------ | ------ | ------ | ------ | ------ |------ |
| total | 总条目数 | number | -- | -- |是|
| page-size | 每页显示条目个数 | number | -- | 10|否|
| current-page | 当前页数 | number | -- | 1|否|
| layout | 组件布局，子组件名用逗号分隔 | string | total,first,prev,next,last| first,prev,next,last|否|
| prevText | 上一页文字 | string | -- | 上一页|否|
| nextText | 下一页文字 | string | -- | 下一页|否|


## 事件
|事件名称 | 说明 | 参数|
| ------ | ------ | ------ |
| current-change | currentPage 改变时会触发 | 当前页|
