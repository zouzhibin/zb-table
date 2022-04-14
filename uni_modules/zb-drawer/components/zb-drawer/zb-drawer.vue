<template>
  <view
  <!-- #ifdef H5 -->
  v-show="show"
  <!-- #endif -->
  <!-- #ifndef H5 -->
  v-if="show"
  <!-- #endif -->
      class="zb-drawer__wrapper"
  >
    <view class="mask" :class="{'mask__visible':show&&mask&&modal}" @click.stop="close('mask')"></view>
    <view 
	@click.stop=""
	class="zb-drawer__container"
         :class="[`zb-drawer_${mode}`,{
          'content--visible':mask&&(mode==='left'||mode==='right'),
          'content--visible_Y':mask&&(mode==='top'||mode==='bottom'),
		  'content--visible_top':radius&&mode==='top',
		  'content--visible_bottom':radius&&mode==='bottom'
          }]"
         :style="{
			top:(top>0||top)?top:false ,
            width:(mode==='left'||mode==='right')?getWidth:'100%',
            height:(mode==='top'||mode==='bottom')?height:'100%',
          }">
        <view class="zb_drawer__header" v-if="withHeader">
          <slot name="title">
            <view class="title">{{ title }}</view>
          </slot>

          <view class="close-wrap" v-if="showClose" @click="close('cancel')">
			  <!-- #ifndef APP-NVUE||APP-PLUS-NVUE -->
			<view class="close"></view>
			  <!-- #endif -->
            <!-- #ifdef APP-NVUE||APP-PLUS-NVUE -->
            <view class="close" v-if="showClose">
				<view class="before"></view>
				<view class="after"></view>
			</view>
              <!-- #endif -->
          </view>
        </view>
        <view class="zb_drawer__body">
			<slot></slot>
		</view>

    </view>
  </view>
</template>
<script >
export default {
  props:{
    withHeader:{
      type:Boolean,
      default:true
    },
      wrapperClosable:{
          type:Boolean,
          default:true
      },
    modal:{
      type:Boolean,
      default:true
    },
	radius:{
		type:Boolean,
		default:false
	},
    beforeClose:Function,
    showClose:{
      type:Boolean,
      default:true
    },
    title:{
      type:String,
      default:'我是标题'
    },
	top:{
		type:[Number,String],
		default:0
	},
    visible: Boolean,
    width:{
      type:[Number,String],
      default:'50%'
    },
    height: {
      type:[Number,String],
      default:'30%'
    },
    isShowTabBar:{
      type:Boolean,
      default:false
    },
    mode:{
      type:String,
      default:'right'
    }
  },
  computed:{
	getWidth(){
		let wid = this.width
		// #ifdef APP-NVUE||APP-PLUS-NVUE
		try {
			const res = uni.getSystemInfoSync();
			if(this.width.indexOf('%')>-1){
				let percent = Number(this.width.replace('%',''))
				wid = res.screenWidth*percent/100
			} 
		} catch (e) {
			// error
		}
		// #endif
		return wid
	}  
  },
  watch:{
    show:{
      handler(newValue){
        this.$emit('update:visible', newValue)
      },
      
    },
    visible:{
		async handler(val){
			if(val){
				 this._change('show','mask',val)
			}else{
				this._change('mask','show',val)
			}
		},
		immediate:true
	}
  },
  data(){
    return{
      show: false,
      mask:this.visible,
      watchTimer:null,
    }
  },
  methods:{
    _change(param1, param2, status) {
      this[param1] = status
      this.watchTimer&&clearTimeout(this.watchTimer)
      this.watchTimer = setTimeout(() => {
        this[param2] = status
        this.$emit('change',status)
      }, status ? 50 : 300)
    },
    close(type){
      if(this.beforeClose&&typeof this.beforeClose==='function'){
          return this.beforeClose(()=>{
              this._change('mask','show',false)
          },type)
      }

      if(this.wrapperClosable&&type==='mask'){
          this._change('mask','show',false)
      }
      if(type==='cancel'){
          this._change('mask','show',false)
      }
      this.$emit('closeDrawer')

    }
  }
}
</script>

<style lang="scss" scoped>
.zb-drawer__wrapper{
  //display: block;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  //bottom: calc(var(--window-bottom) + 20px);
  left: 0;
  overflow: hidden;
  margin: 0;
  z-index: 999;
}
.content--visible_top{
	border-bottom-left-radius: 8rpx;
	border-bottom-right-radius: 8rpx;
}
.content--visible_bottom{
	border-top-left-radius: 8rpx;
	border-top-right-radius: 8rpx;
}
.mask{
  //display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.4);
  transition: opacity 0.3s;
}
.mask__visible {
  ///* #ifndef APP-NVUE */
  //display: block;
  ///* #endif */
  opacity: 1;
}
.zb-drawer__body{
  padding: 10rpx 20rpx 0rpx;
}
.zb_drawer__header{
  display: flex;
  align-items: center;
  padding: 20rpx 28rpx;
  flex-direction: row;
  .title{
    flex: 1;
  }
  .close-wrap{
    position: relative;
	  /* #ifndef APP-NVUE || APP-PLUS-NVUE */
    flex-shrink: 0;
	/* #endif */
    overflow: hidden;
  }
  .close {
    width: 50rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    height:  50rpx;
	/* #ifndef APP-NVUE || APP-PLUS-NVUE */
    cursor: pointer;
	/* #endif */
  }
  .before, .after {
    position: absolute;
    left: 30rpx;
	/* #ifndef APP-NVUE || APP-PLUS-NVUE */
    content: ' ';
	 /* #endif */
    height: 30rpx;
    width: 4rpx;
    background-color: #333;
  }
  
  .close:before, .close:after {
	  /* #ifndef APP-NVUE || APP-PLUS-NVUE */
    position: absolute;
    left: 30rpx;
    content: ' ';
    height: 30rpx;
    width: 4rpx;
    background-color: #333;
	 /* #endif */
  }
 
  .before {
    transform: rotate(45deg);
  }
  .after {
    transform: rotate(-45deg);
  }
  .close:before {
    transform: rotate(45deg);
  }
  .close:after {
    transform: rotate(-45deg);
  }
}

.zb-drawer__container{
	/* #ifndef APP-NVUE || APP-PLUS-NVUE */
    outline: 0;
	/* #endif */
    height: 100%;
    position: absolute;
    width: 200px;
	z-index: 2;
	display: flex;
	flex-direction: column;
    background-color: #fff;
    transition: transform 0.3s ease;
  }

  .zb-drawer_top{
    top: 0;
	right:0;
	left: 0;
    transform: translateY(-100%);
  }
  .zb-drawer_bottom{
    bottom: 0;
	 right: 0;
	 left: 0;
    transform: translateY(100%);
  }
  .zb-drawer_right{
    right: 0;
	 top:0;
	 bottom: 0;
    transform: translateX(100%);
  }
  .zb-drawer_left{
	top:0;
    left: 0;
	bottom: 0;
    transform: translateX(-100%);
  }
  .content--visible{
    transform: translateX(0px);
  }
  .content--visible_Y{
    transform: translateY(0px);
  }
	.zb_drawer__body{
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
</style>
