
/*



var box = document.getElementById('box');
//alert('box');         //元素节点
//alert(box.nodeName);  //获取元素节点的标签名，和tagName等价
//alert(box.nodeType);  //获取元素节点的类型值, 元素节点值为1
alert(box.nodeValue); //元素节点本身没有内容，值为null
//node本身是把节点指针放在元素<div></div>上，也就是说，本身是没有value
//如果要输出<div>xxx</div>中包含的文本内容，应该使用innerHTML
alert(box.innerHTML);  //获取元素节点里面的文本内容
//node只能获取当前类型节点的东西



 var box = document.getElementById('box');
 //alert(box.childNodes);             //NodeList集合，返回当前元素节点所有子节点列表
 //alert(box.childNodes.length);      //3
 //第一个子节点为：测试DIV，这个节点为：文本节点
 //第二个子节点为：<em>倾斜</em>，这个节点为：元素节点
 //第三个子节点为：结尾，这个节点为：文本节点
 alert(box.childNodes[0]);            //[object Text]  表示一个文本节点对象
 alert(box.childNodes[0].nodeType);   //3,表示文本内容
 alert(box.childNodes[0].nodeValue);   //获取文办节点的文本内容
 alert(box.childNodes[0].innerHTML);   //undefined，当前是文本节点，怎么可以找到里面的内容?
 alert(box.childNodes[0].nodeName);    //#text,文本节点没有标签名


 var box = document.getElementById('box');
 for(var i=0;i<box.childNodes.length;i++){
  if(box.childNodes[i].nodeType === 1 ){
   alert("元素节点："+box.childNodes[i].nodeName);
  }else if(box.childNodes[i].nodeType === 3){
   alert("文本节点："+box.childNodes[i].nodeValue);

  }
 }


 var pox = document.getElementById('pox');
 //pox.innerHTML="测试<strong>Pox</strong>";    //有加粗效果，解析了html，
 pox.nodeValue='测试Pox';//没出错，但没有物质赋值上，nodeValue必须在当前节点上操作
 pox.childNodes[0].nodeValue='测试<strong>Pox</strong>';  //并没有加粗效果，没有解析html，只是把字符串当做纯文本作为文本内容

 */































