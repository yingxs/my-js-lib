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
			return getStyle(this.elements[i],attr);
		}
		this.elements[i].style[attr] = value;
	}
	return this;
};
//添加Class
Base.prototype.addClass = function(className){
	for(var i=0 ; i<this.elements.length ; i++){
		if(!hasClass(this.elements[i],className)){
			this.elements[i].className += ' '+className;
		}
	}
	return this;
};

//移除class
Base.prototype.removeClass = function(className){
	for(var i=0 ; i<this.elements.length ; i++){
		if(hasClass(this.elements[i],className)){
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),'');
		}
	}
	return this;
};

//添加link或style的CSS规则
Base.prototype.addRule = function(num,selectorText,cssText,position){
	var sheet = document.styleSheets[num];
	insertRule(sheet,selectorText,cssText,position);
	return this;
};

//移除link或者style的CSS规则
Base.prototype.removeRule = function(num,index){
	var sheet = document.styleSheets[num];
	deleteRule(sheet,index);
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
		addEvent(this.elements[i],'mouseover',over);
		addEvent(this.elements[i],'mouseout',out);
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

//设置居中
Base.prototype.center = function(width,height){
	var top  = (getInner().height - height)/2;
	var left  = (getInner().width - width)/2;
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.top = top+'px';
		this.elements[i].style.left = left+'px';
	}
	return this;
};

//遮罩锁屏功能
Base.prototype.lock = function(){
	for(var i=0;i<this.elements.length;i++){
		//this.elements[i].style.width = document.documentElement.clientWidth+'px';
		//this.elements[i].style.height = document.documentElement.clientHeight+'px';
		this.elements[i].style.width = getInner().width+'px';
		this.elements[i].style.height = getInner().height+'px';

		this.elements[i].style.display = 'block';
		document.documentElement.style.overflow = 'hidden';

		addEvent(window,'scroll',scrollTop);

	}
	return this;
};

//解除遮罩锁屏
Base.prototype.unlock = function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display = 'none';
		document.documentElement.style.overflow = 'auto';
	}
	removeEvent(window,'scroll',scrollTop);
	return this;
};


//触发点击事件
Base.prototype.click = function (fn){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onclick = fn;
	}
	return this;
};

//触发浏览器窗口大小改变事件
Base.prototype.resize = function(fn){
	for(var i=0;i<this.elements.length;i++){
		var element = this.elements[i];
		addEvent(window,'resize',function(){
			fn();
			if(element.offsetLeft > getInner().width - element.offsetWidth){
				element.style.left = getInner().width - element.offsetWidth+'px';
			}
			if(element.offsetTop > getInner().height - element.offsetHeight){
				element.style.top = getInner().height - element.offsetHeight+'px';
			}
		});

	}
	return this;
};


//拖拽功能
Base.prototype.drag = function(){
	for(var i=0;i<this.elements.length;i++){

		addEvent(this.elements[i],'mousedown', function (e) {
			if(trim(this.innerHTML).length == 0) e.preventDefault();
			var _this = this;
			var diffX = e.clientX - _this.offsetLeft;
			var diffY = e.clientY - _this.offsetTop;


			if(e.target.tagName == 'H2'){
				addEvent(document,'mousemove',move);
				addEvent(document,'mouseup',up);
			}else{
				removeEvent(document,'mousemove',move);
				removeEvent(document,'mouseup',up);
			}


			function move(e){
				var left = e.clientX - diffX;
				var top =  e.clientY - diffY;

				if(left<0){
					left=0;
				}else if(left > getInner().width - _this.offsetWidth){
					left = getInner().width - _this.offsetWidth;
				}

				if(top<0){
					top = 0;
				}else if(top >getInner().height - _this.offsetHeight){
					top = getInner().height - _this.offsetHeight;

				}

				_this.style.left = left+'px';
				_this.style.top  = top+'px';

				//兼容IE向下拉出白边，在鼠标移出浏览器窗口时，依然能够控制
				//鼠标锁住时触发(点击住)
				if(typeof _this.setCapture != 'undefined'){
					_this.setCapture();
				}
			}

			function up(){

				removeEvent(document,'mousemove',move);
				removeEvent(document,'mouseup',up);
				document.onmouseup = null;
				//兼容IE向下拉出白边
				//鼠标释放时触发
				if(_this.releaseCapture()){
					_this.releaseCapture();
				}

			}
		});


	}
	return this;
};



























