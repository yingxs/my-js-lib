/**
 * 1.无法删除事件
 * 2.无法顺序执行
 * 3.IE的现代事件绑定存在内存泄漏
 * @param obj
 * @param type
 * @param fn
 */

//跨浏览器事件绑定
function addEvent(obj,type,fn){
	if(typeof obj.addEventListener != 'undefined'){
		obj.addEventListener(type,fn,false);
	}else if(typeof obj.attachEvent != 'undefined'){
		obj.attachEvent('on'+type,function(){
			fn.call(obj,window.event);       //兼容IE无法传递this为目标对象的问题
		});
	}
}

//跨浏览器删除事件
function removeEvent(obj,type,fn){
	if(typeof obj.removeEventListener != 'undefined'){
		obj.removeEventListener(type,fn,false);
	}else if(typeof obj.detachEvent != 'undefined'){
		obj.detachEvent('on'+type,fn);
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

//获取Event对象
function getEvent(event){
	return event || window.event;
}

//跨浏览器移除link规则
function deleteRule(sheet,index){
	if(typeof sheet.deleteRule != 'undefined'){         //W3C
		sheet.deleteRule(index);
	}else if(typeof sheet.removeRule != 'undefined'){   //IE
		sheet.removeRule(index);
	}
}

//阻止默认行为
function preDef(event){
	var e = getEvent(event);
	if(typeof e.preventDefault != 'undefined'){         //W3C
		e.preventDefault();
	}else{                                              //IE
		e.returnValue = false;
	}

}











