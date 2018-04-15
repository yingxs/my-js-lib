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
		if((new RegExp('(\\s|^)'+className+'(\\s|$)')).test(all[i].className)){
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

//获取某组结点的数量
Base.prototype.length = function(){
	return this.elements.length;
};

//获取某一结点的属性
Base.prototype.attr = function(attr){
	return this.elements[0][attr];
};

//获取某一个节点在整个节点组中是第几个索引
Base.prototype.index = function(){
	var children = this.elements[0].parentNode.children;
	for(var i=0;i<children.length;i++){
		if(this.elements[0] == children[i]) return i;
	}
};


//获取某个节点，并返回Base对象
Base.prototype.eq = function(num){
	var element = this.elements[num];
	this.elements = [];
	this.elements[0] = element;
	return this;
};

//获取当前元素同级节点的下一个节点
Base.prototype.next = function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i] = this.elements[i].nextSibling;
		if(this.elements[i]==null) throw new Error('找不到下一个同级元素节点');
		if(this.elements[i].nodeType == 3)this.next();
	}
	return this;
};


//获取当前元素同级节点的上一个节点
Base.prototype.prev = function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i] = this.elements[i].previousSibling;
		if(this.elements[i]==null) throw new Error('找不到上一个同级元素节点');
		if(this.elements[i].nodeType == 3)this.prev();
	}
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

//设置表单字段元素
Base.prototype.form = function(name){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i] = this.elements[i][name];
	}
	return this;
};

//表单字段内容获取
Base.prototype.value = function (str){

	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==0){
			return this.elements[i].value;
		}
		this.elements[i].value = str;
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


//设置innerText
Base.prototype.text = function (str){

	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==0){
			return getInnerText(this.elements[i]);
		}
		setInnerText(this.elements[i],str);
	}
	return this;
};



//设置事件发生器
Base.prototype.bind = function(event,fn){
	for(var i=0;i<this.elements.length;i++){
		addEvent(this.elements[i],event,fn);
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

//设置点击切换方法
Base.prototype.toggle = function(){
	for(var i=0;i<this.elements.length;i++){
		(function(element,args){
			var count=0;
			addEvent(element,'click',function(){
				args[count++ % args.length].call(this);
			});
		})(this.elements[i],arguments);
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


//设置动画
Base.prototype.animate = function(obj){
	for(var i=0;i<this.elements.length;i++){
		var element = this.elements[i];
		var attr = obj['attr'] == 'x' ? 'left' :obj['attr']== 'y' ? 'top' :
					obj['attr'] == 'w' ? 'width' : obj['attr'] == 'h' ? 'height':
						obj['attr'] == 'o'? 'opacity' : obj['attr'] != undefined ? obj['attr'] : 'left';


		//var attr = obj['attr'] != undefined ? obj['attr'] :'left';                      //可选，默认left
		var start = obj['start'] != undefined ?obj['start'] :
				    attr =='opacity' ? parseFloat(getStyle(element,attr))*100 : parseInt(getStyle(element,attr)) ;    //可选，默认是css中的起始位置
		var t = obj['t'] != undefined ? obj['t'] : 10;                                  //可选，默认是50毫秒执行一次
		var step = obj['step'] != undefined ?obj['step'] :20;                            //可选，每次运行10像素

		var alter = obj['alert'];
		var target = obj['target'];
		var mul = obj['mul'];


		var speed = obj['speed'] != undefined ? obj['speed']:6;
		var type = obj['type']==0 ? 'constant' : obj['type']==1 ? 'buffer' :'buffer';   //可选，0表示匀速，1表示缓冲，默认是缓冲


		if(alter != undefined && target == undefined){
			target = alter +start;
		}else if(alter == undefined && target == undefined && mul == undefined){
			throw  new Error('alter增量或者target目标量必须传一个');
		}



		if(start > target)step*=-1;

		if(attr == 'opacity'){
			element.style.opacity =parseInt(start) / 100;
			element.style.filter = 'alpha(opacity='+start+')';
		}else{
			//element.style[attr] = parseInt(start) +'px';
		}



		if(mul == undefined){
			mul = {};
			mul[attr] = target;
		}


		clearInterval(element.timer);

		element.timer = setInterval(function(){
			/*

			问题1：多个动画执行了多个队列动画，我们要求不管多少动画只执行一个队列动画
			问题2：多个动画数值差别太大，导致动画无法执行到目标值，原因是定时器提前清理掉了

			解决1：不管多少个动画，只提供一次队列动画的机会
			解决2：多个动画按最后一个分动画执行完毕后再清理即可
			 */

			//创建一个布尔值，这个值可以了解多个动画知否全部执行完毕
			var flag = true;//true表示都执行完了

			for(var i in mul) {
				attr = i == 'x' ? 'left' : i == 'y' ? 'top' : i == 'w' ? 'width' : i == 'h' ? 'height' : i == 'o' ? 'opacity' : i != undefined ? i :'left';
				target = mul[i];

				if (type == 'buffer') {
					step = attr == 'opacity' ? (target - parseFloat(getStyle(element, attr)) * 100 ) / speed :
					(target - parseInt(getStyle(element, attr))) / speed;
					step = step > 0 ? Math.ceil(step) : Math.floor(step);
				}

				if (attr == 'opacity') {

					if (step == 0) {
						setOpacity();
					} else if (step > 0 && Math.abs(parseFloat(getStyle(element, attr)) * 100 - target) <= step) {
						setOpacity();
					} else if (step < 0 && (parseFloat(getStyle(element, attr)) * 100 - target) <= Math.abs(step)) {
						setOpacity();
					} else {
						var temp = parseFloat(getStyle(element, attr)) * 100;
						element.style.opacity = parseInt(temp + step) / 100;
						element.style.filter = 'alpha(opacity=' + parseInt(temp + step) + ')';
					}

					if(parseInt(target) != parseInt(parseFloat(getStyle(element,attr))*100)) flag=false;


				} else {
					if (step == 0) {
						setTarget();
					} else if (step > 0 && Math.abs(parseInt(getStyle(element, attr)) - target) <= step) {
						setTarget();
					} else if (step < 0 && (parseInt(getStyle(element, attr)) - target) <= Math.abs(step)) {
						setTarget();
					} else {
						element.style[attr] = parseInt(getStyle(element, attr)) + step + 'px';
					}
					if(parseInt(target) != parseInt(getStyle(element, attr))) flag = false;
				}
				//document.getElementById('test').innerHTML += i+":"+"--"+parseInt(target)+"--"+parseInt(getStyle(element, attr))+'--'+flag+'<br/>';
			}
			//document.getElementById('aaa').innerHTML += getStyle(element,attr)+'<br/>';
			//document.getElementById('aaa').innerHTML += step+'<br/>';

			if(flag){
				clearInterval(element.timer);
				if(obj.fn != undefined) obj.fn();
			}

		},t);

		function setTarget(){
			element.style[attr] = target +'px';

		}

		function setOpacity(){
			element.style.opacity = parseInt(target)/100;
			element.style.filter = 'alpha(opacity='+parseInt(target)+')';
		}

	}
	return this;


};

//插件入口
Base.prototype.extend = function(name,fn){
	Base.prototype[name] = fn;
};



/*
Base.prototype.bbb = function(){
	alert('123');
};

*/



















