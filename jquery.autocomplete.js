//autocomplete实现
/*
调用：在input上绑定该方法，然后传入后端请求的url以及参数，自动完成就自动实现。
1.支持键盘上下选中
2.支持回车键选中所需的选项
3.支持鼠标点击选中
*/
//@author zhoubing
(function($){
	var settings,
		itemIndex = -1;
	$.fn.autocomplete=function(curSettings){
		var $this = $(this);
		settings=$.extend({
			url:'',  //异步请求url
			param:'', //请求参数
			length:5  //最多显示的结果数
			//ulStyle:ulCss, //外层边框样式
			//liSstyle：liCss //每行的样式
		},curSettings||{});
		//var result = ["第一个结果","第二个结果","第三个结果","第三个结果","第三个结果","第三个结果"];
		$this.on("keyup",function(ev){
			var oEvent = ev || event,
				keyCode = oEvent.keyCode||oEvent.which||oEvent.charCode;
			if(keyCode == 38 || keyCode == 40 || keyCode== 13){
				return;
			}else{
				if($.trim($this.val())!=""){
					//createList($this,result);
					ajaxComplete($this);
				}else{
					if($(".completeListBox").size()>0){
						$(".completeListBox").remove();
						itemIndex = -1;
					}					
				}
			}			
		}).on("focus",function(){
			if($.trim($this.val())!="" && $(".completeListBox").size()>0){
				$(".completeListBox").css("display","block");
			}
		}).on("blur",function(){
			if($(".completeListBox").size()>0){
				setTimeout(function(){
					$(".completeListBox").css("display","none");
				},200);
			}
		}).on("keydown",function(ev){   //上  38，下  40
			if($(".completeListBox").size()==0) return;
			var oEvent = ev || event,
				keyCode = oEvent.keyCode||oEvent.which||oEvent.charCode,
				maxLength = settings.length;
			if(keyCode == 38){
				if(itemIndex < 1){
					itemIndex = maxLength-1;
				}else{
					itemIndex--;
				}
			}else if(keyCode == 40){
				if(itemIndex == maxLength-1){
					itemIndex = 0;
				}else{
					itemIndex++;
				}
			}else if(keyCode== 13){
				$this.val($(".completeListBox li").eq(itemIndex).html());
				$(".completeListBox").remove();
				itemIndex = -1;
			}else{
				return;
			}
			$(".completeListBox li").css("background","#fff");
			$(".completeListBox li").eq(itemIndex).css("background","#B1C8EE");
		})
	}
	function createList(obj, result){  //参数为自动填充对象的ID
		var $this = obj;
		if($(".completeListBox").size()>0){   //如果结果框已经存在就不用创建
			var $ul = $(".completeListBox");
			var aLis = fillList(result);
			$ul.empty().append(aLis);
		}else{
			var oLeft,oTop,iWidth;
			iWidth = $this.outerWidth()-2;
			oLeft = $this.offset().left;
			oTop = $this.offset().top+$this.outerHeight()-1;
			var $list = $("<ul class='completeListBox'></ul>");
			$list.css({position:"absolute",display:"none",left:oLeft,top:oTop,listStyle:"none",border:"1px solid #ccc",width:iWidth,background:"#fff"});
			var aLis = fillList(result);
			$list.append(aLis);
			$("body").append($list);
			$list.css("display","block");
		}
		$(".completeListBox li").css({height:"24px",cursor:"default",lineHeight:"24px",listStyle:"none",color:"#444",fontSize:"14px",paddingLeft:"5px"});
		$(".completeListBox li").on("mouseover",function(){
			itemIndex = $(this).index();
			$(".completeListBox li").css("background","#fff");
			$(this).css("background","#B1C8EE");
		})
		$(".completeListBox li").on("click",function(){
			$this.val($(this).html());
			$(this).closest("ul").remove();
			itemIndex = -1;
		})
		$(".completeListBox").on("mouseout",function(){
			itemIndex = -1;
			$(".completeListBox li").css("background","#fff");
		})
	}

	function fillList(data){
		var aLis="",
			length=settings.length,
			index=0;
		$.each(data,function(i, n){
			if(index<length){
				aLis+="<li>"+n+"</li>";
				index++;
			}else{
				return false;
			}
		})
		return aLis;
	}
	function ajaxComplete(obj){
		if(settings.url=="") return;
		$.ajax({
			url:settings.url,
			data:settings.param,
			type:'post',
			success:function(result){//返回的数据要为json或字符窜
				createList(obj, result);
			}
		})
	}
})(jQuery);