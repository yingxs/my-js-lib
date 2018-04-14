




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

	//$('#reg').center(620,550).show();
	//注册框
	var reg = $('#reg');
	reg.center(620,550).resize(function(){
		if(reg.css('display')=='block'){
			screen.lock();
		}
	});
	$('#header .reg').click(function(){
		reg.center(620,550).show();
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

	//用户名验证
	$('form').form('user').bind('focus',function(){
		$('#reg .info_user').css('display','block');
		$('#reg .error_user').css('display','none');
		$('#reg .succ_user').css('display','none');
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('#reg .info_user').css('display','none');
			$('#reg .error_user').css('display','none');
			$('#reg .succ_user').css('display','none');
		}else if(!/[\w]{2,20}/.test(trim($(this).value()))){
			$('#reg .error_user').css('display','block');
			$('#reg .info_user').css('display','none');
			$('#reg .succ_user').css('display','none');
		}else{
			$('#reg .succ_user').css('display','block');
			$('#reg .info_user').css('display','none');
			$('#reg .error_user').css('display','none');

		}
	});

	//密码验证
	$('form').form('pass').bind('focus',function(){
		$('#reg .info_pass').css('display','block');
		$('#reg .error_pass').css('display','none');
		$('#reg .succ_pass').css('display','none');
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('#reg .info_pass').css('display','none');
		}else {
			if(check_pass(this)){
				$('#reg .info_pass').css('display','none');
				$('#reg .error_pass').css('display','none');
				$('#reg .succ_pass').css('display','block');
			}else{
				$('#reg .info_pass').css('display','none');
				$('#reg .error_pass').css('display','block');
				$('#reg .succ_pass').css('display','none');
			}
		}
	});

	//密码强度验证
	$('form').form('pass').bind('keyup',function(){
		check_pass(this);
	});

	//密码验证函数
	function check_pass(_this){
		var value = trim($(_this).value());
		var value_length = value.length;
		var code_length = 0;
		var flag = false;
		//第一个必须条件的验证6-20位之间
		if(value_length >=6 && value_length <= 20){
			$('#reg .info_pass .q1').html('●').css('color','green');
		}else{
			$('#reg .info_pass .q1').html('○').css('color','#333');

		}

		//第二个必须的条件验证，字母或数字或非空字符，任意一个即可
		if(value_length > 0 && !/\s/.test(value)){
			$('#reg .info_pass .q2').html('●').css('color','green');
		}else{
			$('#reg .info_pass .q2').html('○').css('color','#333');

		}

		//第三个必须条件的验证，大写字母，小写字母，数字，飞空字符，任意两种混拼即可
		if(/[\d]/.test(value)){
			code_length++;
		}
		if(/[a-z]/.test(value)){
			code_length++;
		}
		if(/[A-Z]/.test(value)){
			code_length++;
		}
		if(/[^\W]/.test(value)){
			code_length++;
		}
		if(code_length>=2){
			$('#reg .info_pass .q3').html('●').css('color','green');
		}else{
			$('#reg .info_pass .q3').html('○').css('color','#333');

		}

		//安全级别
		/**
		 * 高：大于等于10个字符，三种不同类型的字符混拼
		 * 中：大于等于8个字符，两种不同类别的字符混拼
		 * 低：大于等于1个字符
		 * 无：没有字符
		 */
		if(value_length >= 10 && code_length >= 3){
			$('#reg .info_pass .s1').css('color','green');
			$('#reg .info_pass .s2').css('color','green');
			$('#reg .info_pass .s3').css('color','green');
			$('#reg .info_pass .s4').html('高').css('color','green');
		}else if(value_length >= 8 && code_length >= 2){
			$('#reg .info_pass .s1').css('color','#f60');
			$('#reg .info_pass .s2').css('color','#f60');
			$('#reg .info_pass .s3').css('color','#ccc');
			$('#reg .info_pass .s4').html('中').css('color','#f60');
		}else if(value_length>=1){
			$('#reg .info_pass .s1').css('color','maroon');
			$('#reg .info_pass .s2').css('color','#ccc');
			$('#reg .info_pass .s3').css('color','#ccc');
			$('#reg .info_pass .s4').html('低').css('color','maroon');

		}else{
			$('#reg .info_pass .s1').css('color','#ccc');
			$('#reg .info_pass .s2').css('color','#ccc');
			$('#reg .info_pass .s3').css('color','#ccc');
			$('#reg .info_pass .s4').html('');
		}


		if(value_length >= 6 && value_length <= 20 && !/\s/.test(value) && code_length>=2 ){
			flag = true;
		}
		return flag;
		//console.log(code_length);
	}

	//密码确认验证
	$('form').form('notpass').bind('focus',function(){
		$('#reg .info_notpass').css('display','block');
		$('#reg .error_notpass').css('display','none');
		$('#reg .succ_notpass').css('display','none');
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('#reg .info_notpass').css('display','none');
		}else if(trim($(this).value())==trim($('form').form('pass').value())){
			$('#reg .info_notpass').css('display','none');
			$('#reg .error_notpass').css('display','none');
			$('#reg .succ_notpass').css('display','block');
		}else{
			$('#reg .info_notpass').css('display','none');
			$('#reg .error_notpass').css('display','block');
			$('#reg .succ_notpass').css('display','none');
		}
	});

	$('form').form('notpass').bind('focus',function(){
		$('#reg .info_notpass').css('display','block');
		$('#reg .error_notpass').css('display','none');
		$('#reg .succ_notpass').css('display','none');
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('#reg .info_notpass').css('display','none');
		}else if(trim($(this).value())==trim($('form').form('pass').value())){
			$('#reg .info_notpass').css('display','none');
			$('#reg .error_notpass').css('display','none');
			$('#reg .succ_notpass').css('display','block');
		}else{
			$('#reg .info_notpass').css('display','none');
			$('#reg .error_notpass').css('display','block');
			$('#reg .succ_notpass').css('display','none');
		}
	});

	//回答
	$('form').form('ans').bind('focus',function(){
		$('#reg .info_ans').css('display','block');
		$('#reg .error_ans').css('display','none');
		$('#reg .succ_ans').css('display','none');
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('#reg .info_ans').css('display','none');
		}else if(trim( $(this).value()).length>=2 && trim( $(this).value()).length<=32 ){
			$('#reg .info_ans').css('display','none');
			$('#reg .error_ans').css('display','none');
			$('#reg .succ_ans').css('display','block');
		}else{
			$('#reg .info_ans').css('display','none');
			$('#reg .error_ans').css('display','block');
			$('#reg .succ_ans').css('display','none');
		}
	});
	//电子邮件
	$('form').form('email').bind('focus',function(){
		if($(this).value().indexOf('@')==-1)$('#reg .all_email').css('display','block');

		$('#reg .info_email').css('display','block');
		$('#reg .error_email').css('display','none');
		$('#reg .succ_email').css('display','none');
	}).bind('blur',function(){
		$('#reg .all_email').css('display','none');
		if(trim($(this).value())==''){
			$('#reg .info_email').css('display','none');
		}else if(/^[\w_\-\.]+@[\w_\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($(this).value())) ){
			$('#reg .info_email').css('display','none');
			$('#reg .error_email').css('display','none');
			$('#reg .succ_email').css('display','block');
		}else{
			$('#reg .info_email').css('display','none');
			$('#reg .error_email').css('display','block');
			$('#reg .succ_email').css('display','none');
		}



		/*
		邮件名：a-zA-Z0-9_-.
		域名：a-zA-Z0-9_-
		域名后缀
		 */
	});

	//电子邮件提示框键入事件
	$('form').form('email').bind('keyup',function(e){
		if($(this).value().indexOf('@')==-1){
			$('#reg .all_email').css('display','block');
			$('#reg .all_email li span').html($(this).value());
		}else {
			$('#reg .all_email').css('display','none');

		}



		$('#reg .all_email li').css('background','none');
		$('#reg .all_email li').css('color','#666');
		if(e.keyCode==40){
			if(this.index==undefined || this.index >= $('#reg .all_email li').length()-1){
				this.index=0;
			}else{
				this.index++;
			}


			$('#reg .all_email li').eq(this.index).css('background','#e5edf2');
			$('#reg .all_email li').eq(this.index).css('color','#369');
			console.log("keyCode:"+e.keyCode+",index:"+this.index);
		}

		if(e.keyCode==38){
			if(this.index==undefined || this.index <= 0){
				this.index=$('#reg .all_email li').length()-1;
			}else{
				this.index--;
			}


			$('#reg .all_email li').eq(this.index).css('background','#e5edf2');
			$('#reg .all_email li').eq(this.index).css('color','#369');
			console.log("keyCode:"+e.keyCode+",index:"+this.index);
		}


		if(e.keyCode==13){
			$(this).value($('#reg .all_email li').eq(this.index).text());
			$('#reg .all_email').css('display','none');
			this.index = undefined;
		}





	});

	//电子邮件点击补全获取
	$('#reg .all_email li').bind('mousedown',function(){
		$('form').form('email').value($(this).text());
	});

	//电子邮件补全鼠标移入移出效果
	$('#reg .all_email li').hover(function(){
		$(this).css('background','#e5edf2');
		$(this).css('color','#369');
	},function(){
		$(this).css('background','none');
		$(this).css('color','#666');

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

































