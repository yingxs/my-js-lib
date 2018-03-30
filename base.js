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
function Base(args){
	//创建一个数组，来保存获取的结点和结点数组
	this.elements=[];

	if(typeof args == 'string'){
		//CSS模拟
		if(args.indexOf(' ') != -1){
			var css = args.split(' ');             //把结点拆开分别保存到数组
			var childElements = [];                     //存放临时结点对象的数组解决被覆盖问题
			var node = [];                              //用来存放父节点
			for(var i=0; i < css.length;i++){
				if(node.length == 0 )
					node.push(document);                //如果没有父节点，就将document放入
				switch (css[i].charAt(0)){
					case '#':
						childElements = [];             //清理掉临时节点，以便父节点失效，子节点有效
						childElements.push(this.getId(css[i].substring(1)));
						node = childElements;           //保存父节点，因为childElement要清理，所以需要创建node数组
						//alert(css[i].substring(1)+"\r\nchildElements:"+childElements+"\r\n"+"node:"+node);
						break;
					case '.':
						childElements = [];
						for(var j=0 ;j<node.length;j++ ){
							var temps = this.getClass(css[i].substring(1),node[j]);
							for(var k = 0; k < temps.length;k++){
								childElements.push(temps[k]);
							}
						}
						node = childElements;
						//alert(css[i]+"\r\nchildElements:"+childElements+"\r\n"+"node:"+node);
						break;
					default :
						childElements = [];
						for(var j=0 ;j<node.length;j++ ){
							var temps = this.getTagName(css[i],node[j]);
							for(var k = 0; k < temps.length;k++){
								childElements.push(temps[k]);
							}
						}
						node = childElements;
						//alert(css[i]+"\r\nchildElements:"+childElements+"\r\n"+"node:"+node);
				}
			}
			this.elements = childElements;
		}else{
			//find模拟
			switch (args.charAt(0)){
				case '#':
					this.elements.push( this.getId(args.substring(1)));
					break;
				case '.':
					this.elements =  this.getClass(args.substring(1));
					break;
				default :
					this.elements =  this.getTagName(args);
			}
		}


	}else if(typeof args == 'object'){
		if(args != undefined) { //_this 是一个对象，区别于typeof返回的带单引号字符串
			this.elements[0] = args;
		}
	}else if(typeof  args == 'function'){
		//this.ready(args);
		addDomLoaded(args);
	}

}


//addDomloaded
Base.prototype.ready = function(fn){
	addDomLoaded(fn);
}



//根据ID获取元素节点
Base.prototype.getId = function(id){
	return document.getElementById(id);
};

//根据标签名获取元素节点
Base.prototype.getTagName = function(tag,parentNode){
	var node = null;
	var temps = [];
	if(parentNode != undefined){
		node = parentNode;
	}else{
		node = document;
	}

	var tags = node.getElementsByTagName(tag);
	for(var i=0;i<tags.length;i++){
		temps.push(tags[i]);
	}

	return temps;
};

//根据CLASS获取结点数组
Base.prototype.getClass = function(className,parentNode){
	var node = null;
	var temps = [];
	if(parentNode != undefined){
		node = parentNode;
	}else{
		node = document;
	}

	var all = node.getElementsByTagName("*");
	for(var i=0;i<all.length;i++){
		if(all[i].className == className){
			temps.push(all[i]);
		}
	}

	return temps;
};


//设置css选择器子节点
Base.prototype.find = function(str){
	var childElements = [];
	for(var i = 0 ;i<this.elements.length;i++){
		switch (str.charAt(0)){
			case '#':
				childElements.push(this.getId(str.substring(1)));
				break;
			case '.':


				var temps = this.getClass(str.substring(1),this.elements[i]);
				for(var j = 0;j < temps.length;j++){
					childElements.push(temps[j]);
				}


				break;
			default :
				/*
				var tags = this.elements[i].getElementsByTagName(str);
				for(var j=0;j<tags.length;j++){
					childElements.push(tags[j]);
				}*/

				var temps = this.getTagName(str,this.elements[i]);
				for(var j = 0;j < temps.length;j++){
					childElements.push(temps[j]);
				}

		}
	}
	 this.elements = childElements;
	return this;
};


//获取某一个节点对象，并返回这个节点对象
Base.prototype.ge = function(num){
	return  this.elements[num];

};

//获取首个节点，并返回这个节点对象
Base.prototype.first = function(){
	return this.elements[0];
};
//获取末尾节点，并返回这个节点对象
Base.prototype.last = function(){

	return this.elements[this.elements.length-1];
};


//获取某个节点，并返回Base对象
Base.prototype.eq = function(num){
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

/*
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


*/

//插件入口
Base.prototype.extend = function(name,fn){
	Base.prototype[name] = fn;
};



/*
Base.prototype.bbb = function(){
	alert('123');
};

*/



















