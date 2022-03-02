
var funProto = Function.prototype;
var objProto = Object.prototype;

var getPrototypeOf = Object.getPrototypeOf;

var objToString = objProto.toString;
var hasOwnProperty = objProto.hasOwnProperty;
var funToString = funProto.toString;


// 获取 url 参数集合
export const getUrlParams = function (url) {
	url = url || window.location.href;

	var index = url.indexOf("?");
	var result = {};

	if(index !== -1){
	    var str = url.substr(index + 1, url.length - index - 1);
	    var parts = str.split("&");

	    for(var i = 0, length = parts.length; i < length; i++){
	        var part = parts[i];
	        var item = part.split("=");
	        var key = item[0];
	        var value = item[1];

	        result[key] = decodeURIComponent(value);
	    }
	}

	return result;
}


export const setTitle = (title)=>{
	// #ifdef H5
    // document.title=title
    uni.setNavigationBarTitle({
        title,
    });
    // console.log('===========ssss',title)
	// #endif
	// #ifndef H5
	uni.setNavigationBarTitle({
	    title,
	});
	// #endif
}

export const decimalPlaces = (num)=>{
    let newNum = num.toString().split('.')[1]
    if(newNum&&newNum.length>2){
        return num.toFixed(2)
    }else {
        return num
    }
}

export const formatYAxisNumber = (num)=>{
    if(num>1000000){
        return decimalPlaces((num/1000000)) + '百万';
    }else if(num>10000){
        return decimalPlaces((num/10000)) + '万';
    }else if(num>1000){
        return decimalPlaces((num/1000)) + '千';
    }else {
        return decimalPlaces(num)
    }
}


// // 深度克隆 array 数组或 json 对象，返回克隆后的副本
export const deepClone = function(obj){
    let weakMap = new WeakMap()
    function clone (obj){
        if(!isArray(obj) && !isPlainObject(obj)){
            return obj;
        }
        if(obj instanceof Date){ return new Date(obj) }
        if(obj instanceof RegExp){ return new RegExp(obj)}

        if(weakMap.get(obj)){
            return weakMap.get(obj)
        }

        // var copy = utils.isArray(obj) ? [] : {};
        var copy =  new obj.constructor
        weakMap.set(obj,copy)
        for(var key in obj){
            if(hasOwnProperty.call(obj, key)){
                var value = obj[key];

                copy[key] = clone(value);
            }
        }

        return copy;
    }
    return clone (obj)
};
/**
 * 获取不含子菜单的第一个菜单项
 * @param {Array} data 菜单数据
 */
export const getMenuWithoutChildren = function (data){
	var target;

	for(var i = 0, length = data.length; i < length; i++){
		var element = data[i];

		if(element.children){
			target = getMenuWithoutChildren(element.children);
		}
		else{
			target = element;
		}
		if(target){
			break;
		}
	}
	console.log('target',target)
	return target;
}

/**
 *
 */
export const getChildrenMenu = function (data) {
    var target = data[0]||{};
    let arr = [target]
    function deep(){
        if(target.children){
            target = target.children[0]
            arr.push(target)
            deep()
        }
    }
    deep()
    if(arr.length===1){
        let item = arr[0]
        item.isFlop = 1 // 是否是翻牌器
        return [item];
    }else{
        let item = arr[arr.length-2]
        item.children1 = item.children
        item.isFlop = 1 // 是否是翻牌器
        delete item.children
        return item.children1;
    }
}



/**
 * 将英文字段名称转为中文标题
 * @param {Array} columns 字段配置
 * @param {String} name 英文字段名称
 */
export const getChartLegend = function(columns, name){
    try{
        columns = JSON.parse(columns);

        var column = columns.find(function(column){
            return column.dataIndex === name;
        });

        return column && column.title ? column.title : name;
    }
    catch(e){
        return name;
    }
};

export const debounce = function(fn, delay) {
  // 定时器
  let timer = null

  // 将debounce处理结果当作函数返回
  return function () {
    // 保留调用时的this上下文
    let context = this
    // 保留调用时传入的参数
    let args = arguments

    // 每次事件被触发时，都去清除之前的旧定时器
    if(timer) {
      clearTimeout(timer)
    }
    // 设立新定时器
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

export const throttle = function(fn, interval) {
  // last为上一次触发回调的时间
  let last = 0

  // 将throttle处理结果当作函数返回
  return function() {
    // 保留调用时的this上下文
    let context = this
    // 保留调用时传入的参数
    let args = arguments
    // 记录本次触发回调的时间
    let now = +new Date()

    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last >= interval) {
      // 如果时间间隔大于我们设定的时间间隔阈值，则执行回调
      last = now;
      fn.apply(context, args);
    }
  }
}
// 检查给定的值是否是数值
export const isNumber = function (value) {
    return objToString.call(value) === "[object Number]";
};


export const toLocaleString = function(value, toFixed){
    if(!isNumber(value)){
        return value;
    }

    if(toFixed){
        value = value.toFixed(toFixed);
        value = value.split(".");

        var integer = value[0];
        var decimal = value[1];

        integer = String(integer).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        return integer + "." + decimal;
    }
    else{
        return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
};


// 判断日期、时间、日期时间格式
export const check = {
    date: function(value){
        return /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(value);
    },
    time: function(value){
        return /^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/.test(value);
    },
    datetime: function(value){
        return /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d(.0)?$/.test(value);
    },
    integer: function(value){
        return /^-?\d+$/.test(value);
    },
    decimal: function(value){
        return /^-?\d+\.\d+$/.test(value);
    }
};
// 检查给定的值是否是纯对象，纯对象是指通过 {} 或 new Object() 声明的对象
export const isPlainObject = function(value) {
    if (!value || objToString.call(value) !== "[object Object]") {
        return false;
    }

    var prototype = getPrototypeOf(value);

    if (prototype === null) {
        return true;
    }

    var constructor = hasOwnProperty.call(prototype, "constructor") && prototype.constructor;

    return typeof constructor === "function" && funToString.call(constructor) === funToString.call(Object);
};

// 检查给定的值是否是数组
export const isArray = function(value) {
    return objToString.call(value) === "[object Array]";
};





export const deleteArray = function (arr,value) {
    let index = arr.indexOf( value )
    arr.splice(index,1)
    return arr.join(',')
}
// 检查给定的值是否是字符串
export const isString = function(value) {
    return objToString.call(value) === "[object String]";
};

let utils = {};

// 日期操作
 utils.date = {
    parse: function(){
        var args = arguments, date = null;

        if(args.length == 0){
            date = new Date();
        }
        else if(args.length == 1){
            if(isString(args[0])){
                date = new Date(args[0].replace(/-/g, "/"));
            }
            else if(isNumber(args[0])){
                date = new Date(args[0]);
            }
        }
        else if(args.length == 3){
            date = new Date(args[0], args[1], args[2]);
        }

        return date;
    },
    timestamp: function(date){
        date = this.parse(date);

        return date.getTime();
    },
    format: function(date, format){
        date = this.parse(date);

        var model = {
            "M+": date.getMonth()+1,
            "d+": date.getDate(),
            "h+": date.getHours() == 12 ? 12 : date.getHours() % 12,
            "H+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "S": date.getMilliseconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3)
        };
        var week = {
            "0": "/u65e5",
            "1": "/u4e00",
            "2": "/u4e8c",
            "3": "/u4e09",
            "4": "/u56db",
            "5": "/u4e94",
            "6": "/u516d"
        };

        if(/(y+)/.test(format)){
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        if(/(E+)/.test(format)){
            format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[date.getDay() + ""]);
        }

        for(var key in model){
            if(new RegExp("(" + key + ")").test(format)){
                format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (model[key]) : (("00" + model[key]).substr(("" + model[key]).length)));
            }
        }

        return format;
    },
    plus: function(date, value){
        date = this.parse(date);
        date = date.getTime();
        date = date + parseInt(value) * 24 * 60 * 60 * 1000;

        return date;
    },
    minus: function(date, value){
        date = this.parse(date);
        date = date.getTime();
        date = date - parseInt(value) * 24 * 60 * 60 * 1000;

        return date;
    }
};

 export {utils}
