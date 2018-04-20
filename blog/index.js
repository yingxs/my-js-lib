




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
	login.drag($('#login h2').last());
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
		setTimeout(function(){
			$('#share').animate({
				attr:'y',
				target:getScroll().top + (getInner().height - parseInt(getStyle( $('#share').first() ,'height')))/2
			});
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
	$('form').first().reset();

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
		}else if(!check_user()){
			$('#reg .error_user').css('display','block');
			$('#reg .info_user').css('display','none');
			$('#reg .succ_user').css('display','none');
		}else{
			$('#reg .succ_user').css('display','block');
			$('#reg .info_user').css('display','none');
			$('#reg .error_user').css('display','none');

		}
	});

	function check_user(){
		if(/[\w]{2,20}/.test(trim($('form').form('user').value())))return true;
	}

	//密码验证
	$('form').form('pass').bind('focus',function(){
		$('#reg .info_pass').css('display','block');
		$('#reg .error_pass').css('display','none');
		$('#reg .succ_pass').css('display','none');
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('#reg .info_pass').css('display','none');
		}else {
			if(check_pass()){
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
		check_pass();
	});

	//密码验证函数
	function check_pass(){
		var value = trim($('form').form('pass').value());
		var value_length = value.length;
		var code_length = 0;
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
		if(/[^\w]/.test(value)){
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
			return true;
		} else{
			return false;
		}
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
		}else if(check_notpass()){
			$('#reg .info_notpass').css('display','none');
			$('#reg .error_notpass').css('display','none');
			$('#reg .succ_notpass').css('display','block');
		}else{
			$('#reg .info_notpass').css('display','none');
			$('#reg .error_notpass').css('display','block');
			$('#reg .succ_notpass').css('display','none');
		}
	});

	function check_notpass(){
		if(trim($('form').form('notpass').value())==trim($('form').form('pass').value())){
			return true;
		}else{
			return false;
		}
	}

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


	//提问
	$('form').form('ques').bind('change',function(){
		if(check_ques()){
			$('#reg .error_ques').css('display','none');
		}
	});

	function check_ques(){
		if($('form').form('ques').value() !=0 ){
			return true;
		}else{
			return false;
		}
	}




	//回答
	$('form').form('ans').bind('focus',function(){
		$('#reg .info_ans').css('display','block');
		$('#reg .error_ans').css('display','none');
		$('#reg .succ_ans').css('display','none');
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('#reg .info_ans').css('display','none');
		}else if(check_ans() ){
			$('#reg .info_ans').css('display','none');
			$('#reg .error_ans').css('display','none');
			$('#reg .succ_ans').css('display','block');
		}else{
			$('#reg .info_ans').css('display','none');
			$('#reg .error_ans').css('display','block');
			$('#reg .succ_ans').css('display','none');
		}
	});

	function check_ans(){
		if(trim( $('form').form('ans').value()).length>=2 && trim( $('form').form('ans').value()).length<=32){
			return true;
		}else{
			return false;
		}

	}
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
		}else if(check_email() ){
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

	function check_email(){
		if(/^[\w_\-\.]+@[\w_\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($('form').form('email').value()))){
			return true;
		}else{
			return false;
		}
	}


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

	//年月日
	var year = $('form').form('year');
	var month = $('form').form('month');
	var day = $('form').form('day');
	var day30 = [4,6,9,11];
	var day31 = [1,3,5,7,8,10,12];

	//注入年
	for(var i=1950;i<=2018 ;i++){
		year.first().add(new Option(i,i),undefined);
	}
	//注入月
	for(var i=1;i<=12 ;i++){
		month.first().add(new Option(i,i),undefined);
	}


	//不确定的日期
	var cur_day=0;

	year.bind('change',select_day);
	month.bind('change',select_day);
	day.bind('change',function(){
		if(check_brithday())$('#reg .error_birthday').css('display','none');
	});


	function select_day(){
		if(year.value()!=0 && month.value() !=0 ){
			//清理之前的注入
			day.first().options.length=1;
			//注入日
			if(inArray(day31,parseInt(month.value()))){
				cur_day=31;
			}else if(inArray(day30,parseInt(month.value()))){
				cur_day=30;
			}else{
				if((parseInt(year.value())%4 == 0 && parseInt(year.value()) % 100 != 0) || parseInt(year.value()) % 400 == 0 ){
					cur_day=29;
				}else{
					cur_day=28;
				}
			}

			for(var i = 1 ;i<=cur_day;i++){
				day.first().add(new Option(i,i),undefined);
			}

		}else{
			//清理之前的注入
			day.first().options.length=1;
		}
	}

	function check_brithday(){
		if(year.value()!=0 && month.value()!=0 && day.value()!=0){
			return true;
		}else{
			return false;
		}
	}

	//备注
	$('form').form('ps').bind('keyup',check_ps).bind('paste',function(){
		setTimeout(check_ps,50);
	}).bind('cut',function(){
		setTimeout(check_ps,50);
	});

	//清尾
	$('#reg ps .clear').click(function(){
		$('form').form('ps').value($('form').form('ps').value().substring(0,200));
		check_ps();
	});


	function check_ps(){
		var num = 200-$('form').form('ps').value().length;
		if(num>=0){
			$('#reg .ps').eq(0).css('display','block');
			$('#reg .ps .num').eq(0).html(num);
			$('#reg .ps').eq(1).css('display','none');
			return true;

		}else{
			$('#reg .ps').eq(0).css('display','none');
			$('#reg .ps .num').eq(1).html(Math.abs(num)).css('color','red');
			$('#reg .ps').eq(1).css('display','block');
			return false;

		}
	}


	//提交
	$('form').form('sub').click(function(){
		var flag = true;
		if(!check_user()){
			$('#reg .error_user').css('display','block');
			flag=false;
		}

		if(!check_pass()){
			$('#reg .error_pass').css('display','block');
			flag=false;

		}

		if(!check_notpass()){
			$('#reg .error_notpass').css('display','block');
			flag=false;
		}

		if(!check_ques()){
			$('#reg .error_ques').css('display','block');
			flag=false;
		}
		if(!check_ans()){
			$('#reg .error_ans').css('display','block');
			flag=false;
		}
		if(!check_email()){
			$('#reg .error_email').css('display','block');
			flag=false;
		}
		if(!check_brithday()){
			$('#reg .error_birthday').css('display','block');
			flag=false;
		}
		if(!check_ps()){
			flag=false;
		}



		if(flag){
			//$('form').first().submit();
			ajax({
				method:'post',
				url:'demo.php',
				data:$('form').eq(0).serialize(),
				success : function(text){
					alert(text);
				},
				async:true
			});

		}



		//alert($('form').eq(0).serialize());


	});



	//轮播器初始化
	//$('#banner img').css('display','none');
	//$('#banner img').eq(0).css('display','block');

	$('#banner img').opacity(0);
	$('#banner img').eq(0).opacity(100);
	$('#banner ul li').eq(0).css('color','#333');
	$('#banner strong').html($('#banner img').eq(0).attr('alt'));

	//轮播器计数器
	var banner_index=1;
	//轮播器类型
	var banner_type=3;     //1.表示透明度变化，2表示上下滚动





	//自动轮播器
	var banner_time = setInterval(banner_fn,2000);

	//手动轮播器
	$('#banner ul li').hover(function(){
		if($(this).css('color')!='rgb(51, 51, 51)' && $(this).css('color')!='#333'){
			banner(this,banner_index== 0 ? $('#banner ul li').length()-1 : banner_index-1);
		}
		clearInterval(banner_time);

	},function(){
		banner_index = $(this).index()+1;
		banner_time = setInterval(banner_fn,1000);
		//setInterval(banner_fn,1000);
	});
/*

	function banner(obj){
		$('#banner img').css('display','none');
		$('#banner img').eq($(obj).index()).css('display','block');
		$('#banner ul li').css('color','#999');
		$(obj).css('color','#333');
		$('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));
	}

*/


	function banner(obj,prev){
		$('#banner img').eq($(obj).index()).css('display','block');
		$('#banner ul li').css('color','#999');
		$(obj).css('color','#333');
		$('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));


		if(banner_type == 1){
			$('#banner img').eq(prev).animate({
				attr:'o',
				target:0,
				t:30,
				step:10
			}).css('z-index',1);
			$('#banner img').eq($(obj).index()).animate({
				attr:'o',
				target:100,
				t:30,
				step:10
			}).css('z-index',2);
		}else if(banner_type == 2){
			$('#banner img').eq(prev).animate({
				attr:'y',
				target:150,
				t:30,
				step:10
			}).css('z-index',1).opacity(100);
			$('#banner img').eq($(obj).index()).animate({
				attr:'y',
				target:0,
				t:30,
				step:10
			}).css('top','-150px').css('z-index',2).opacity(100);

		}else if(banner_type == 3){
			$('#banner img').eq(prev).animate({
				attr:'x',
				target:-900,
				t:30,
				step:10
			}).css('z-index',1).opacity(100);
			$('#banner img').eq($(obj).index()).animate({
				attr:'x',
				target:0,
				t:30,
				step:10
			}).css('left','900px').css('z-index',2).opacity(100);

		}

	}



	function banner_fn(){
		if(banner_index >= $('#banner ul li').length()) banner_index = 0;
		banner($('#banner ul li').eq(banner_index).first(),banner_index== 0 ? $('#banner ul li').length()-1 : banner_index-1);
		banner_index++;
	}




	//问题1.当w图片进去可视区域的时候，将图片的xsrc的地址替换到src即可
	//alert($('.wait_load').eq(0).attr('xsrc'));
	//$('.wait_load').eq(0).attr('src',$('.wait_load').eq(0).attr('xsrc'));


	//问题2.获取图片元素到最外层顶点元素的距离
	//alert(offsetTop($('.wait_load').first()));




	//问题3.获取页面可视区域最低点的位置 (可视区的高度+滚动条拉下来的距离)
	//alert(getInner().height + getScroll().top );

	var wait_load=$('.wait_load');
	wait_load.opacity(0);
	$(window).bind('scroll',_wait_load);
	$(window).bind('resize',_wait_load);

	function _wait_load(){
		setTimeout(function(){
			for(var i=0;i<wait_load.length();i++){
				var _this=wait_load.ge(i);
				if(getInner().height + getScroll().top >= offsetTop(_this)){
					$(_this).attr('src',$(_this).attr('xsrc')).animate({
						attr:'o',
						target:100,
						t:30,
						step:10
					});
				}

			}
		},100);
	}

	//图片弹窗
	var photo_big = $('#photo_big');
	photo_big.center(620,511).resize(function(){
		if(photo_big.css('display')=='block'){
			screen.lock();
		}
	});
	$('#photo dl dt img').click(function(){
		photo_big.center(620,511).show();
		screen.lock().animate({
			attr:'o',
			target:30,
			t:30,
			step:1
		});


		var temp_img = new Image();
		$(temp_img).bind('load',function(){
			$('#photo_big .big img').attr('src',temp_img.src).animate({
				attr:'o',
				target:100,
				t:30,
				step:10
			}).opacity(0);
		});
		temp_img.src = $(this).attr('bigsrc');



		var children = this.parentNode.parentNode;
		//alert($(children).index());

		prev_next_img(children);


	});
	$('#photo_big .close').click(function(){
		photo_big.hide();
		screen.animate({
			attr:'o',
			target:0,
			t:30,
			step:1,
			fn:function(){
				screen.unlock();
			}
		});

		$('#photo_big .big img').attr('src',"image/load.gif");

	});


	//拖拽
	photo_big.drag($('#photo_big h2').last());

/*

	$('#photo_big .big img').attr('src','http://www.yingxs.com/m/p1big.jpg').animate({
		attr:'0',
		target:100,
		t:30,
		step:10
	}).opacity(0);
	//问题：未出现动画效果
	*/

	//创建一个临时图片

	/*var temp_img = new Image();
	$(temp_img).bind('load',function(){
		$('#photo_big .big img').attr('src',temp_img.src).animate({
			attr:'o',
			target:100,
			t:30,
			step:10
		}).opacity(0);
	});

	temp_img.src = 'http://yingxs.com/m/p1big.jpg';
*/

	//图片上方鼠标划过
	$('#photo_big .big .left').hover(function(){
		$('#photo_big .big .sl').animate({
			attr:'o',
			target:50,
			t:30,
			step:10
		});
	},function(){
		$('#photo_big .big .sl').animate({
			attr:'o',
			target:0,
			t:30,
			step:10
		});
	});
	$('#photo_big .big .right').hover(function(){
		$('#photo_big .big .sr').animate({
			attr:'o',
			target:50,
			t:30,
			step:10
		});
	},function(){
		$('#photo_big .big .sr').animate({
			attr:'o',
			target:0,
			t:30,
			step:10
		});
	});


	//图片上一张
	$('#photo_big .big .left').click(function(){

		$('#photo_big .big img').attr('src',"image/load.gif");

		var current_img = new Image();

		$(current_img).bind('load',function(){
			$('#photo_big .big img').attr('src',$(this).attr('src')).animate({
				attr:'o',
				target:100,
				t:30,
				step:10
			}).opacity(0);
		});


		//alert($('#photo_big .big img').attr('index'));
		current_img.src = $(this).attr('src');
		//dl节点
		var children = $('#photo_dl dt img').ge(prevIndex($('#photo_big .big img').attr('index'),$('#photo').first())).parentNode.parentNode;

		//alert(children);
		prev_next_img(children);
	});
	//图片下一张
	$('#photo_big .big .right').click(function(){

		$('#photo_big .big img').attr('src',"image/load.gif");

		var current_img = new Image();

		$(current_img).bind('load',function(){
			$('#photo_big .big img').attr('src',$(this).attr('src')).animate({
				attr:'o',
				target:100,
				t:30,
				step:10
			}).opacity(0);
		});

		//alert($('#photo_big .big img').attr('index'));
		current_img.src = $(this).attr('src');
		//dl节点
		var children = $('#photo_dl dt img').ge(nextIndex($('#photo_big .big img').attr('index'),$('#photo').first())).parentNode.parentNode;

		//alert(children);
		prev_next_img(children);
	});


	function prev_next_img(children){
		var prev = prevIndex($(children).index(),children.parentNode);
		var next = nextIndex($(children).index(),children.parentNode);
		//alert(next);

		var prev_img = new Image();
		var next_img = new Image();
		prev_img.src = $('#photo dl dt img').eq(prev).attr('bigsrc');
		next_img.src = $('#photo dl dt img').eq(next).attr('bigsrc');
		$('#photo_big .big .left').attr('src',prev_img.src);
		$('#photo_big .big .right').attr('src',next_img.src);
		$('#photo_big .big img').attr('index',$(children).index());

		$('#photo_big .big .index').html($(children).index()+1+"/"+$('#photo dl dt img').length());
	}

/*
	//调用ajax
	$(document).click(function(){
		//alert('');
		ajax({
			method:'post',
			url:'demo.php',
			data:{
				'name':'Lee',
				'age':100
			},
			success : function(text){
				//alert(text);
			},
			async:true
		});
	});

*/



	//图片下一张


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

































