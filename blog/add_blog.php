<?php
    require 'config.php';

    $query = "insert into blog_blog(title,content,date) values ('{$_POST['title']}','{$_POST['content']}',now())";



    mysql_query($query)or die("新增失败！".mysql_error());
    //sleep(3);
    echo mysql_affected_rows();

    mysql_close();
?>