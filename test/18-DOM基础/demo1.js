/*
* 节点分为三类
*   1.元素节点，其实就是标签<div></div>
*   2.文本节点：就是标签内的纯文本 测试div
*   3.属性节点：其实就是标签的属性，id="box"

 //查找元素
 var box = document.getElementById('box');
 alert(box.tagName);        //获取这个元素节点的标签名
 alert(box.innerHTML);       //获取这个元素节点里的纯本html标签页文本化
 //innerHtml获取的是这个元素的文本内容，而不是文本节点





 var box = document.getElementById('box');
 //alert(box.id);        //获取这个元素节点id属性的值，注意不是属性节点
 //alert(box.title);        //获取这个元素节点id属性的值，注意不是属性节点
 //alert(box.style.color);  //获取style属性值
 //alert(box.class);           //保留字，
 //alert(box.className);       //获取class属性的值

 //以上是HTML属性的直接调用，当然后面还有几种方式可以调用
 alert(box.bbb);       //自定义属性直接获取，非IE不支持





 */











































