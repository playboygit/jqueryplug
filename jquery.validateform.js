//表单验证实现
/*
1、必填项 require    OK
2、长度限制 length    OK
3、类型限制 number\email\汉字\英文  OK     
----逻辑-----
1.页面初始化时对表单元素初始化  OK
2.在表单提交之前验证            OK
3.单个文本框失焦时验证          OK
初始化时必填项后加*，然后验证不通过的元素在文本框下方给出提示
*/
(function($){
	var formFlag = true;
	$.fn.validateform=function(){
		var $form = $(this);
		iptRequired($form);
		iptLengthLimit($form);
		beforeSubmit($form);
		iptValueType($form);
	}
	//验证非空
	function iptRequired($form){
		$form.find(":input[require]").each(function(){
			var $this = $(this);
			$this.after("<span class='form-icon-required'>*</span>");
			$this.on("blur",function(){
				if($this.next().next().hasClass("form-error")){
					$this.next().next().remove();
				}
				if($.trim($this.val())==""){		
					var sText = "此项内容不能为空";
					showError($this, sText);
				}
			});
		});
	}
	//验证字符长度
	function iptLengthLimit($form){
		$form.find(":input[maxLengths]").each(function(){
			var $this = $(this);
			$this.on("blur",function(){
				var maxLengths = $this.attr("maxLengths");
				if(!$this.next().next().hasClass("form-error")){
					if($.trim($this.val()).length>maxLengths){	
						var sText = "最多只能输入"+maxLengths+"个字符";
						showError($this, sText);
					}
				}
			});
		});

		$form.find(":input[minLengths]").each(function(){
			var $this = $(this);
			$this.on("blur",function(){
				var minLengths = $this.attr("minLengths");
				if(!$this.next().next().hasClass("form-error")){
					if($.trim($this.val()).length<minLengths && $.trim($this.val()).length>0){			
						var sText = "请至少输入"+minLengths+"个字符";
						showError($this, sText);
					}
				}
			});
		});
	}
	//验证值类型
	function iptValueType($form){
		var numRegxp = /^\d+$/;
		var emailRegxp = /^([a-z0-9_\.-]+)@([\da-z]+)\.([a-z]+)$/;
		var zhRegxp = /^[\u2E80-\u9FFF]+$/;
		var enRegxp = /^[a-zA-Z]+$/;
		$form.find(":input[data-type]").each(function(){
			var $this = $(this);
			$this.on("blur",function(){
				var dataType = $(this).attr("data-type");
				var value = $.trim($this.val());
				var valueType = "";
				if(!$this.next().next().hasClass("form-error")){
					if(value.length>0){
						switch(dataType){
							case 'number':
								if(!numRegxp.test(value)){
									valueType="数字";
								}
							break;
							case 'email':
								if(!emailRegxp.test(value)){
									valueType="正确邮箱";
								}
							break;
							case 'zh':
								if(!zhRegxp.test(value)){
									valueType="汉字";
								}
							break;
							case 'en':
								if(!enRegxp.test(value)){
									valueType="英文";
								}
							break;
						}
					}
					if(valueType!=""){
						var sText = "请输入"+valueType+"字符";
						showError($this, sText);
					}	
				}
			});
		});
	}
	//信息提示
	function showError($this, sText){
		var $error = $("<span class='form-error form-minlen'>"+sText+"！</span>");
		var left = $this.offset().left;
		$error.css({left:left});
		$this.next().after($error);
		formFlag = false;
	}
	//表单提交验证
	function beforeSubmit($form){
		$form.submit(function(){
			$form.find(".form-error").remove();
			$form.find(":input").blur();
			if(!formFlag){
				formFlag = true;
				return false;
			}
		});
	}

})(jQuery);
