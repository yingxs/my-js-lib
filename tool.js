
//���������ȡ�ӿڴ�С
function getInner(){

	if(typeof window.innerWidth != 'undefined'){
		return {
			width : window.innerWidth,
			height : window.innerHeight
		};
	}else{
		return {
			width : document.documentElement.clientWidth,
			height : document.documentElement.clientHeight
		};
	}
}

//���������ȡstyle
function getStyle(element,attr){
	if(typeof window.getComputedStyle != 'undefined'){
		return window.getComputedStyle(element,null)[attr];
	}else if(typeof element.currentStyle != 'undefined'){
		return element.currentStyle[attr];

	}

}

//�ж�class�Ƿ����
function hasClass(element,className){
	return element.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'));
}

//���link����
function insertRule(sheet,selectorText,cssText,position){
	if(typeof sheet.insertRule != 'undefined'){         //W3C
		sheet.insertRule(selectorText+'{'+cssText+'}',position);
	}else if(typeof sheet.add != 'undefined'){          //IE
		sheet.addRule(selectorText,cssText,position);
	}
}

//��������Ƴ�link����
function deleteRule(sheet,index){
	if(typeof sheet.deleteRule != 'undefined'){         //W3C
		sheet.deleteRule(index);
	}else if(typeof sheet.removeRule != 'undefined'){   //IE
		sheet.removeRule(index);
	}
}











