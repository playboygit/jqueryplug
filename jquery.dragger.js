//物体在窗口内任意拖动拖动实现
//author zhoubing
//param  true:容器可以拖出可视范围，false：容器只能在可视方位内拖动
(function($){
	$.fn.dragger=function(isOver){
		var $this = $(this);
		if($this.css("position")=="static"){
			$this.css("position","absolute");
		}
		$this[0].onmousedown=function(ev){
			var oEvent = ev || event;
			var disX = oEvent.clientX-$this.offset().left;
			var disY = oEvent.clientY-$this.offset().top;
			$(document).on("mousemove",function(ev){
				var oEvent = ev || event;
				var left = oEvent.clientX-disX;
				var top = oEvent.clientY-disY;
				if(isOver){
					var cWidth = $(window).outerWidth();
					var cHeight = $(window).outerHeight();
					if(left<0){left=0;}
					if(left>cWidth-$this.outerWidth()){left=cWidth-$this.outerWidth();}
					if(top<0){top=0;}
					if(top>cHeight-$this.outerHeight()){top=cHeight-$this.outerHeight();}
				}
				$this.css({left:left,top:top});
			})
			if($this[0].setCapture){
				$this[0].setCapture();
			}
			$(document).on("mouseup",function(){
				if($this[0].releaseCapture){
					$this[0].releaseCapture();
				}
				$(document).unbind("mousemove");
				$(document).unbind("mouseup");
			})
			return false;
		}
	}
})(jQuery);