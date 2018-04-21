<?php
	header('Content-Type:text/html;charset=utf-8');
	define('DB_HOST','127.0.0.1:3308');
define('DB_USER','root');
define('DB_PWD','123456');
define('DB_NAME','blog');
$conn = @mysql_connect(DB_HOST,DB_USER,DB_PWD) or die("数据库连接失败".mysql_error());
@mysql_select_db(DB_NAME)or die("数据库错误".mysql_error());
@mysql_query("set names utf8")or die("数据库字符集设置错误".mysql_error());






?>