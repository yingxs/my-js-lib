<?php
    require 'config.php';

    $query = mysql_query("select user FROM blog_user WHERE user='{$_POST['user']}' AND pass='{$_POST['pass']}' ")or die("SQL执行错误！");

    if(mysql_fetch_array($query,MYSQL_ASSOC)){
        sleep(3);
        echo '0';
    }else{
        sleep(3);
        echo '1';
    }


    mysql_close();
?>