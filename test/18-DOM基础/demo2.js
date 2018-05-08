
/*
*
 var box = document.getElementById('box');
 box.innerHTML="123 <strong>JS<strong>";   //可以解析HTML，不是单纯的文本了


 var all = document.getElementsByName('*');
 //alert(all.length);
 //火狐的fireBug打开后，会自动创建一个DIv，可能会多算一个
 // IE浏览器可能会比谷歌和火狐显示多一个，因为IE浏览器把文档声明也当做一个标签了



 var box = document.getElementsByName('test');
 alert(box);
 //name属性本身不是div里面的属性，所以IE就忽略掉了，平常用在表单元素里面




 var box = document.getElementById('box');
 //alert(box.bbb);   //获取自定义属性，非IE无效
 //alert(box.getAttribute("bbb"));    //获取自定义属性，全部兼容
 //alert(box.getAttribute("style"));    //非IE返回的是style字符串，IE返回的是对象。这里有个不见通
 //alert(box.className);              //兼容
 //alert(box.getAttribute("class"));    //低版本IE不支持

 //跨浏览器获取className(不使用box.className)的情况下
 if(box.getAttribute('className')==null){
 alert(box.getAttribute('calss'));
 }else{
 alert(box.getAttribute('className'));
 }



 var box = document.getElementById('box');
 //alert(box.onclick);  //均返回函数式
 //如下：
 // function onclick(){
 //  abc();
 // }
 alert(box.getAttribute('onclick'));   //谷歌返回abc(); 低版本IE仍然返回函数式，IE8已经修复
 //getAttribute IE7及其以下访问style会返回一个对象，在开发中尽量避免使用getAttribute访问onclick和style属性


 var box = document.getElementById('box');
 //box.setAttribute('title','标题');
 //box.setAttribute('align','center');
 //box.setAttribute('ccc','aaa');
 box.setAttribute('style','color:red');  //IE7以下，使用setAttribute设置style和onclick没有效果，避免使用

 var box = document.getElementById('box');
 box.removeAttribute('style');            //IE6更低版本可能不支持

 * */

















