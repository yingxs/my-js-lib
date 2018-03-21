


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

	login.center(350,250).addClass('a').addClass('b').removeClass('b');

	$().resize(function(){
		login.center(350,250);
		if(login.css('display')=='block'){
			screen.lock();
		}

	});

	$().getClass('login').click(function(){
		login.show();
		screen.lock();
	});
	$().getClass('close').click(function(){
		login.hide();
		screen.unlock();
	});


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

};