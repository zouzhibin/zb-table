## 介绍
基于uni-app开发的一个抽屉组件，功能有、支持设置宽度百分比、高度百分比、左边弹出、右边弹出、顶部弹出、底部弹出、
关闭按钮等功能
已用于生产环境


## qq群 731805264
## -- github 永远保持最新，有啥想法的可以提PR,共同开发 [地址](https://github.com/zouzhibin/zb-ui.git)

## drawer属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |是否必须|
| ------ | ------ | ------ | ------ | ------ |------ |
| modal | 是否需要遮罩层 | boolean | -- | true|否|
| width | 设置左右的时候，设置宽度才有用 | string | '50%' | |否|
| mode | Drawer 打开的方向 | String | 'left'、'right'、'top'、'bottom' | right|否|
| show-close | 是否显示关闭按钮 | boolean | -- | true|否|
| title | Drawer 的标题，也可通过具名 slot （见下表）传入 | string | -- | --|否|
| visible | 是否显示 Drawer，支持 .sync 修饰符 | boolean | -- | false|否|
| withHeader | 控制是否显示 header 栏, 默认为 true, 当此项为 false 时, title attribute 和 title slot 均不生效 | boolean | -- | true|否|
| wrapperClosable | 点击遮罩层是否可以关闭 Drawer	 | boolean | -- | true|否|
| before-close | 关闭前的回调，会暂停 Drawer 的关闭,在这可以进行异步操作	 | function(done,type)，done 用于关闭 Drawer,type为mask遮罩层关闭，cancel为头部按钮关闭 | -- | --|否|


## drawer slot

| 参数 | 说明 | 
| ------ | ------ |
| — | Drawer 的内容 | 
| title | Drawer 标题区的内容 | 

## drawer 方法

| 参数 | 说明 | 
| ------ | ------ |
| closeDrawer | 用于关闭 Drawer, 该方法会调用传入的 before-close 方法 | 

## 示例
```
<zb-drawer 
	:mode="mode" 
	width="80%" 
	:visible.sync="isShow1" >
	<view class="top-content"></view>
	</zb-drawer>
```

