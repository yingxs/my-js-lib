/*
函数式
function $(id){
	return document.getElementById(id);
}*/


/**
 * 对象式
 * @type {{getId: Function, getName: Function, getTagName: Function}}
 */

	/*
var Base = {
	getId :function(id){
		return document.getElementById(id);
	},
	getName:function(name){
		return document.getElementsByName(name);
	},
	getTagName:function(tag){
		return document.getElementsByTagName(tag);
	}
};

*/

//前台调用
var $ = function (_this){
	return new Base(_this);
};

//基础类库对象
function Base(_this){
	//创建一个数组，来保存获取的结点和结点数组
	this.elements=[];
	if(_this != undefined) { //_this 是一个对象，区别于typeof返回的带单引号字符串
		this.elements[0] = _this;
	}
}



//根据ID获取元素节点
Base.prototype.getId = function(id){
	this.elements.push(document.getElementById(id));
	return this;
};

//根据标签名获取元素节点
Base.prototype.getTagName = function(tag){
	var tags = document.getElementsByTagName(tag);
	for(var i=0;i<tags.length;i++){
		this.elements.push(tags[i]);
	}

	return this;
};

//根据CLASS获取结点数组
Base.prototype.getClass = function(className,idName){
	var node = null;
	if(arguments.length == 2){
		node = document.getElementById(idName);
	}else{
		node = document;
	}


	var all = node.getElementsByTagName("*");
	for(var i=0;i<all.length;i++){
		if(all[i].className == className){
			this.elements.push(all[i]);
		}
	}
	return this;
};

Base.prototype.getElement = function(num){
	var element = this.elements[num];
	this.elements = [];
	this.elements[0] = element;
	return this;
};

//设置css
Base.prototype.css = function (attr,value){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==1){
			if(typeof window.getComputedStyle != 'undefined'){
				return window.getComputedStyle(this.elements[i],null)[attr];
			}else if(typeof this.elements[i].currentStyle != 'undefined'){
				return this.elements[i].currentStyle[attr];

			}
		}
		this.elements[i].style[attr] = value;
	}
	return this;
};
//添加Class
Base.prototype.addClass = function(className){
	for(var i=0 ; i<this.elements.length ; i++){
		if(!this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|^)'))){
			this.elements[i].className += ' '+className;
		}
	}
	return this;
};

//移除class
Base.prototype.removeClass = function(className){
	for(var i=0 ; i<this.elements.length ; i++){
		if(this.elements[i].className.match( new RegExp('(\\s|^)'+className+'(\\s|^)'))){
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|^)'),'');
		}
	}
	return this;
};

//添加link或style的CSS规则
Base.prototype.addRule = function(num,selectorText,cssText,position){
	var sheet = document.styleSheets[num];
	if(typeof sheet.insertRule != 'undefined'){         //W3C
		sheet.insertRule(selectorText+'{'+cssText+'}',position);
	}else if(typeof sheet.add != 'undefined'){          //IE
		sheet.addRule(selectorText,cssText,position);
	}
	return this;
};

//移除link或者style的CSS规则
Base.prototype.removeRule = function(num,index){
	var sheet = document.styleSheets[num];
	if(typeof sheet.deleteRule != 'undefined'){         //W3C
		sheet.deleteRule(index);
	}else if(typeof sheet.removeRule != 'undefined'){   //IE
		sheet.removeRule(index);
	}
	return this;

};

//设置内容
Base.prototype.html = function (str){

	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==0){
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML = str;
	}
	return this;
};

//设置鼠标移入移出方法
Base.prototype.hover = function(over,out){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onmouseover = over;
		this.elements[i].onmouseout = out;
	}
	return this;
};

//设置隐藏
Base.prototype.hide = function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display = 'none';

	}
	return this;
};
//设置显示
Base.prototype.show = function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display = 'block';

	}
	return this;
};
//触发点击事件
Base.prototype.click = function (fn){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onclick = fn;
	}
	return this;
};






























