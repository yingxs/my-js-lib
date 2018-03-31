




$(function(){

	//个人中心-下拉菜单
	$('#header .member').hover(function(){
		$('#header .member_ul').show().animate({
			attr:'o',
			target:100,
			t:30,
			step:10
		});
	},function(){
		$('#header .member_ul').animate({
			attr:'o',
			target:0,
			t:30,
			step:10,
			fn:function(){
				$('#header .member_ul').hide();
			}
		});
	});

	//登录框
	var login = $('#login');
	var screen = $('#screen');

	login.center(350,250).resize(function(){
		if(login.css('display')=='block'){
			screen.lock();
		}
	});
	$('#header .login').click(function(){
		login.center(350,250).show();
		screen.lock().animate({
			attr:'o',
			target:30,
			t:30,
			step:1
		});
	});
	$('#login .close').click(function(){
		login.hide();
		screen.animate({
			attr:'o',
			target:0,
			t:30,
			step:1,
			fn:function(){
				screen.unlock();
			}
		});
	});

	//test1
	$('.test1').hover(function(){
		$(this).animate({
			attr:'w',
			target:300,
			y:30,
			step:10
		});
	},function(){
		$(this).animate({
			attr:'w',
			target:100,
			y:30,
			step:10
		});
	});


	//拖拽
	login.drag($('#login h2').last(),$('#login .other').last());


	//百度分享初始化位置
	$('#share').css('top',(getInner().height - parseInt(getStyle( $('#share').first() ,'height')))/2+'px');

	$('#share').hover(function(){
		$(this).animate({
			attr :'x',
			target:0
		});
	},function(){
		$(this).animate({
			attr :'x',
			target:-211
		});
	});



	//test
	$('#test').click(function(){
		var _this = this;
		$(_this).animate({
			attr :'w',
			target:300,
			t:30,
			step:10,
			fn : function(){
				$(_this).animate({
					attr :'h',
					target:300,
					t:30,
					step:10,
					fn:function(){
						$(_this).animate({
							attr :'o',
							target:30,
							t:30,
							step:10
						});
					}
				});
			}
		});

	});


});






/*
window.onload = function(){

	//个人中心-下拉菜单
	$().getClass('member').hover(function(){
		$().getClass('member_ul').show();
	},function(){
		$().getClass('member_ul').hide();
	});



	//登录框
	var login = $().getId('login');
	var screen = $().getId('screen');

	login.center(350,250).resize(function(){
		if(login.css('display')=='block'){
			screen.lock();
		}


	});

	$().getClass('login').click(function(){
		login.center(350,250)
		login.show();
		screen.lock();
	});
	$().getClass('close').click(function(){
		login.hide();
		screen.unlock();
	});



	//拖拽
	login.drag([$().getTagName('h2').getElement(0)]);




*/



	//var oDiv = document.getElementById('login');
	//拖拽流程：
	//1.先点下去
	//2.点下的物体被选中，进行move移动
	//3.抬起鼠标，停止移动
	/*
	oDiv.onmousedown = function (e){
		var e = getEvent(e);
		var _this = this;

		var diffX = e.clientX - _this.offsetLeft;
		var diffY = e.clientY - _this.offsetTop;


		document.onmousemove = function(e){
			var e = getEvent(e);
			_this.style.left = e.clientX - diffX +'px';
			_this.style.top  = e.clientY - diffY +'px';
		};
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
		}

	};
	*/


	/*
	var top  = (document.documentElement.clientHeight - 250)/2;
	var left  = (document.documentElement.clientWidth - 350)/2;
	$().getId('login').css('top',top+'px').css('left',left+'px');

	//登录框
	window.onresize = function(){
		var top  = (document.documentElement.clientHeight - 250)/2;
		var left  = (document.documentElement.clientWidth - 350)/2;
		$().getId('login').css('top',top+'px').css('left',left+'px');
	};

	*/
	//$().addRule(0,'body','background:red',1);
	//$().removeRule(0,1);

//};

































