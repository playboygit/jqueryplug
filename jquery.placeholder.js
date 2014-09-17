//placeholder实现
(function($){
	$.fn.placeholder=function(){
		if("placeholder" in document.createElement("input")) {return false;}
		var $this = $(this);
		var width = $this.css("width");
		var height = $this.css("height");
		var fontSize = $this.css("fontSize");
		var lineHeight = $this.css("lineHeight");
		var left = $this.offset().left;
		var top = $this.offset().top;
		var text = $this.attr("placeholder");
		var lable = $("<label class='label'></label>");
		lable.css({width:width,height:height,position:"absolute",fontSize:fontSize,paddingTop:"4px",paddingLeft:"2px",lineHeight:lineHeight,color:"#999",left:left,top:top,display:"block"});
		lable.html(text);
		$("body").append(lable);
		$this.focus(function(){
			lable.css("display","none");
		}).blur(function(){
			if($this.val()==""){
				lable.css("display","block");
			}		
		});
		lable.click(function(){
			$this.focus();
		});
		$this.keydown(function(e){
			var oEvent = e || event;
			var keyCode = oEvent.keyCode||oEvent.which||oEvent.charCode;
			if(oEvent.keyCode == 8){
				if($this.val().length<2){
					lable.css("display","block");
				}else{
					lable.css("display","none");
				}
			}else{
				lable.css("display","none");
			}
		});
	}
})(jQuery);