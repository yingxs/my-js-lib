


window.onload = function(){

	//��������-�����˵�
	$().getClass('member').hover(function(){
		$().getClass('member_ul').show();
	},function(){
		$().getClass('member_ul').hide();
	});

	//��¼��
	var login = $().getId('login');
	login.center(350,250).resize(function(){
		login.center(350,250);
	});
	$().getClass('login').click(function(){
		login.show();
	});
	$().getClass('close').click(function(){
		login.hide();
	});



	/*
	var top  = (document.documentElement.clientHeight - 250)/2;
	var left  = (document.documentElement.clientWidth - 350)/2;
	$().getId('login').css('top',top+'px').css('left',left+'px');

	//��¼��
	window.onresize = function(){
		var top  = (document.documentElement.clientHeight - 250)/2;
		var left  = (document.documentElement.clientWidth - 350)/2;
		$().getId('login').css('top',top+'px').css('left',left+'px');
	};

	*/
};