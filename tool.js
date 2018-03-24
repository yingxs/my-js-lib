/**
 * 1.无法删除事件
 * 2.无法顺序执行
 * 3.IE的现代事件绑定存在内存泄漏
 * @param obj
 * @param type
 * @param fn
 */

//为每个事件分配一个计数器
addEvent.ID = 1;
//跨浏览器事件绑定
function addEvent(obj,type,fn){
	if(typeof obj.addEventListener != 'undefined'){
		obj.addEventListener(type,fn,false);
	}else {
		//创建一个存放事件的哈希表(散列表)
		if(!obj.events) obj.events = {};

		//第一次绑定事件时执行
		if(!obj.events[type]){
			//创建一个存放事件处理函数的数组
			obj.events[type]=[];

			//把第一次的事件处理函数先储存到第一个位置上
			obj.events[type][0] = fn;
		}else{
			//同一个注册函数进行屏蔽
			if(addEvent.equal(obj.events[type],fn)) return false;
			//从第二次事件绑定开始我们用事件计数器来存储
			obj.events[type][addEvent.ID++] = fn;
		}


		//绑定事件处理函数
		obj['on'+type] = addEvent.exec;


	}
}


addEvent.exec = function(event){
	var e = event || addEvent.fixEvent(window.event);
	var es = this.events[e.type];
	for(var i in es){
		es[i].call(this,e);
	}
};


//同一个注册函数进行屏蔽
addEvent.equal = function(es,fn){
	for(var i in es){
		if(es[i] == fn)return true;
	}
	return false;
};

//把IE常用的Event对象配对到W3C中去
addEvent.fixEvent = function(event){
	event.preventDefault = addEvent.fixEvent.preventDefault;
	event.stopPropagation =addEvent.fixEvent.stopPropagation;
	event.target = event.srcElement;
	return event;
};

//IE阻止默认行为
addEvent.fixEvent.preventDefault = function(){
	this.returnValue = false;
};

//IE取消冒泡
addEvent.fixEvent.stopPropagation = function(){
	this.cancelBubble = true;
}

//跨浏览器删除事件
function removeEvent(obj,type,fn){
	if(typeof obj.removeEventListener != 'undefined'){
		obj.removeEventListener(type,fn,false);
	}else if(typeof obj.detachEvent != 'undefined'){
		if(obj.events){
			for(var i in obj.events[type]){
				if(obj.events[type][i] == fn){
					delete obj.events[type][i];
				}
			}
		}
	}
}



//跨浏览器获取视口大小
function getInner(){

	if(typeof window.innerWidth != 'undefined'){
		return {
			width : window.innerWidth,
			height : window.innerHeight
		};
	}else{
		return {
			width : document.documentElement.clientWidth,
			height : document.documentElement.clientHeight
		};
	}
}



//跨浏览器获取style
function getStyle(element,attr){
	if(typeof window.getComputedStyle != 'undefined'){      //W3C
		return window.getComputedStyle(element,null)[attr];
	}else if(typeof element.currentStyle != 'undefined' ){  //IE
		return element.currentStyle[attr];
	}


}

//判断class是否存在
function hasClass(element,className){
	return element.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'));
}

//添加link规则
function insertRule(sheet,selectorText,cssText,position){
	if(typeof sheet.insertRule != 'undefined'){         //W3C
		sheet.insertRule(selectorText+'{'+cssText+'}',position);
	}else if(typeof sheet.add != 'undefined'){          //IE
		sheet.addRule(selectorText,cssText,position);
	}
}


/*
//获取Event对象
function getEvent(event){
	return event || window.event;
}

*/
//跨浏览器移除link规则
function deleteRule(sheet,index){
	if(typeof sheet.deleteRule != 'undefined'){         //W3C
		sheet.deleteRule(index);
	}else if(typeof sheet.removeRule != 'undefined'){   //IE
		sheet.removeRule(index);
	}
}
/*
//阻止默认行为
function preDef(event){
	var e = getEvent(event);
	if(typeof e.preventDefault != 'undefined'){         //W3C
		e.preventDefault();
	}else{                                              //IE
		e.returnValue = false;
	}

}

*/

//删除前后的空格
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,'');

}


//滚动条置顶
function scrollTop(){
	document.documentElement.scrollTop = 0;
	document.body.scrollTop = 0;
}






