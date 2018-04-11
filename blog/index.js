




$(function(){

	//个人中心-下拉菜单
	$('#header .member').hover(function(){
		$('#header .member_ul').show().animate({
			t:30,
			step:10,
			mul:{
				o:100,
				h:120
			}
		});
	},function(){
		$('#header .member_ul').animate({
			t:30,
			step:10,
			mul:{
				o:0,
				h:0
			},
			fn: function () {
				$('#header .member_ul').hide();
			}
		});
	});

	//遮罩画布
	var screen = $('#screen');

	//登录框
	var login = $('#login');
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


	//注册框
	var reg = $('#reg');
	reg.center(600,550).resize(function(){
		if(reg.css('display')=='block'){
			screen.lock();
		}
	});
	$('#header .reg').click(function(){
		reg.center(600,550).show();
		screen.lock().animate({
			attr:'o',
			target:30,
			t:30,
			step:1
		});
	});
	$('#reg .close').click(function(){
		reg.hide();
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

	});
	//拖拽
	login.drag($('#login h2').last(),$('#login .other').last());
	reg.drag($('#reg h2').last());


	//百度分享初始化位置
	$('#share').css('top', getScroll().top + (getInner().height - parseInt(getStyle( $('#share').first() ,'height')))/2+'px');



/*
	addEvent(window,'scroll',function(){
		//$('#share').css('top', getScroll().top + (getInner().height - parseInt(getStyle( $('#share').first() ,'height')))/2+'px');
		$('#share').animate({
			attr:'y',
			target:getScroll().top + (getInner().height - parseInt(getStyle( $('#share').first() ,'height')))/2
		});

	});

*/

	$(window).bind('scroll',function(){
		$('#share').animate({
			attr:'y',
			target:getScroll().top + (getInner().height - parseInt(getStyle( $('#share').first() ,'height')))/2
		});
	});



	//百度分享收缩效果
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


	//滑动导航1
	$('#nav .black li').hover(function(){
		//alert(this.offsetLeft);
		var target = this.offsetLeft;
		$('#nav span').animate({
			attr:'x',
			target:target+15

		});

	},function(){
		$('#nav span').animate({
			attr:'x',
			target:15

		});
	});


	//滑动导航2
	$('#nav2 .about li').hover(function(){
		//alert(this.offsetLeft);
		var target = this.offsetLeft;
		$('#nav2 .nav_bg').animate({
			attr:'x',
			target:target+15,
			fn:function(){
				$('#nav2 .white').animate({
					attr:'x',
					target:(target+2)*-1
				});
			}

		});

	},function(){
		$('#nav2 .nav_bg').animate({
			attr:'x',
			target:15,
			fn:function(){
				$('#nav2 .white').animate({
					attr:'x',
					target:0
				});
			}
		})
	});


	//左侧菜单
	$('#sidebar h2').toggle(function(){
		$(this).next().animate({
			mul:{
				h:0,
				o:0
			}
		});
	},function(){
		$(this).next().animate({
			mul:{
				h:150,
				o:100
			}
		});
	});


	//表单验证
	//alert($('form').first().user.value);
	//alert($('form').form('user').value('bbb'));

	$('form').form('user').bind('focus',function(){
		$('#reg .info_user').css('display','block');
		$('#reg .error_user').css('display','none');
		$('#reg .succ_user').css('display','none');
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('#reg .info_user').css('display','none');
			$('#reg .error_user').css('display','none');
			$('#reg .succ_user').css('display','none');
		}else if(!/[a-zA-Z0-9_]{2,20}/.test(trim($(this).value()))){
			$('#reg .error_user').css('display','block');
			$('#reg .info_user').css('display','none');
			$('#reg .succ_user').css('display','none');
		}else{
			$('#reg .succ_user').css('display','block');
			$('#reg .info_user').css('display','none');
			$('#reg .error_user').css('display','none');

		}
	});



	////test
	//$('#test').click(function(){
	//	$(this).animate({
	//
	//		t:30,
	//		step:10,
	//		//mul参数是一个对象，只有属性：目标量
	//		mul:{
	//			w:101,      //长度变成300
	//			h:101,      //高度变成300
	//			o:20
	//		},
	//		fn:function(){
	//			alert('123');
	//		}
	//
	//
	//	});
	//
	//});




	//
	////test
	//$('#test').click(function(){
	//	var _this = this;
	//	$(_this).animate({
	//		attr :'w',
	//		target:300,
	//		t:30,
	//		step:10,
	//		fn : function(){
	//			$(_this).animate({
	//				attr :'h',
	//				target:300,
	//				t:30,
	//				step:10,
	//				fn:function(){
	//					$(_this).animate({
	//						attr :'o',
	//						target:30,
	//						t:30,
	//						step:10
	//					});
	//				}
	//			});
	//		}
	//	});
	//
	//});
	//

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

































