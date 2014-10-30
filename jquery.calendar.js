//calendar
    (function() {

      for(var $ = '', i = 1940, j = 2019; i <= j; i++) {

        $ += '<a href="javascript:;">' + i + '</a>';

        if((i + 1) % 10 == 0) {
          $ += '</span><span>';
        }
      }

      document.write(

          '<div class="calendar false">'

        + '	<div class="full">'

        + '		<a class="year" href="javascript:;">年</a> - <a class="month" href="javascript:;">月</a>'
        + '		<a class="prev" href="javascript:;">前</a>'
        + '		<a class="next" href="javascript:;">后</a>'

        + '	</div>'

        + '	<div class="full-year false">'

        + '		<span>' + $ + '</span>'

        + '	</div>'

        + '	<div class="full-month false">'

        + '		<a href="javascript:;">1月</a>'
        + '		<a href="javascript:;">2月</a>'
        + '		<a href="javascript:;">3月</a>'
        + '		<a href="javascript:;">4月</a>'
        + '		<a href="javascript:;">5月</a>'
        + '		<a href="javascript:;">6月</a>'
        + '		<a href="javascript:;">7月</a>'
        + '		<a href="javascript:;">8月</a>'
        + '		<a href="javascript:;">9月</a>'
        + '		<a href="javascript:;">10月</a>'
        + '		<a href="javascript:;">11月</a>'
        + '		<a href="javascript:;">12月</a>'

        + '	</div>'

        + '	<div class="week">'

        + '		<span>日</span>'
        + '		<span>一</span>'
        + '		<span>二</span>'
        + '		<span>三</span>'
        + '		<span>四</span>'
        + '		<span>五</span>'
        + '		<span>六</span>'

        + '	</div>'

        + '	<div class="days">'

        + '		<!-- <a class="day" href="javascript:;"></a> -->'

        + '	</div>'

        + '	<div class="time">'

        + '		<label class="false"><input class="hours" type="text" maxlength="2" /> 时</label>'
        + '		<label class="false"><input class="minutes" type="text" maxlength="2" /> 分</label>'
        + '		<label class="false"><input class="seconds" type="text" maxlength="2" /> 秒</label>'

        + '		<!-- button -->'
        + '		<input class="submit" type="button" value="确定" />'

        + '	</div>'

        + '</div>'

      );

    })();

    (function() {

      /* 元素 */ {

        var calendar           = jQuery('div.calendar');
        var calendar_full      = jQuery('div.calendar div.full');
        var calendar_fullYear  = jQuery('div.calendar div.full-year');
        var calendar_fullMonth = jQuery('div.calendar div.full-month');
        var calendar_week      = jQuery('div.calendar div.week');
        var calendar_days      = jQuery('div.calendar div.days');
        var calendar_time      = jQuery('div.calendar div.time');
        var calendar_year      = jQuery('div.calendar a.year');
        var calendar_month     = jQuery('div.calendar a.month');
        var calendar_hours     = jQuery('div.calendar input.hours');
        var calendar_minutes   = jQuery('div.calendar input.minutes');
        var calendar_seconds   = jQuery('div.calendar input.seconds');

      }

      /* 变量 */ {

        var t;
        var a;
        var d;
        var i;

      }

      /* 格式 */ {

        var format_year = function(p/* Number param */) {

          return p;

        };

        var format_month = function(p/* Number param */) {

          return a.indexOf('MM') > -1 ? ('0' + (p + 1)).slice(-2) : (p + 1);

        };

        var format_date = function(p/* Number param */) {

          return a.indexOf('DD') > -1 ? ('0' + p).slice(-2) : p;

        };

        var format_hours = function(p/* Number param */) {

          return a.indexOf('hh') > -1 ? ('0' + p).slice(-2) : p;

        };

        var format_minutes = function(p/* Number param */) {

          return a.indexOf('mm') > -1 ? ('0' + p).slice(-2) : p;

        };

        var format_seconds = function(p/* Number param */) {

          return a.indexOf('ss') > -1 ? ('0' + p).slice(-2) : p;

        };

      }

      /* 计算 */ {

        var full = function(p/* Object param */) {

          //年
          jQuery(calendar_year).html(format_year(p.getFullYear()));

          //月
          jQuery(calendar_month).html(format_month(p.getMonth()));

          //时
          jQuery(calendar_hours).val(format_hours(p.getHours()));

          //分
          jQuery(calendar_minutes).val(format_minutes(p.getMinutes()));

          //秒
          jQuery(calendar_seconds).val(format_seconds(p.getSeconds()));

        };

        var days = function(p/* Object param */) {

          var $ = '';

          for(var i = 0, j = days_index(p); i < j; i++) {
            $ += '<a></a>';
          }

          for(var i = 1, j = days_count(p), k = days_today(p); i <= j; i++) {

            var c = '';

            //今天
            if(i == k) {
              c += ' this';
            }

            //索引
            if(i == d.getDate() && p.getMonth() == d.getMonth() && p.getFullYear() == d.getFullYear()) {
              c += ' index';
            }

            $ += '<a class="day' + c + '" href="javascript:;">' + format_date(i) + '</a>';

          }

          jQuery(calendar_days).html($);

        };

        var days_index = function(p/* Object param */) {

          var $ = new Date();

          $.setFullYear(p.getFullYear());
          $.setMonth(p.getMonth());
          $.setDate(1);

          return $.getDay();

        };

        var days_count = function(p/* Object param */) {

          var $ = p.getMonth() + 1;

          if(/^(1|3|5|7|8|10|12)$/.test($)) {
            return 31;
          }

          if(/^(4|6|9|11)$/.test($)) {
            return 30;
          }

          //二月
          $ = p.getFullYear();

          if(($ % 4 == 0 && $ % 100 != 0) || $ % 400 == 0) {
            return 29;
          } else {
            return 28;
          }

        };

        var days_today = function(p/* Object param */) {

          var $ = new Date();

          if($.getMonth() == p.getMonth() && $.getFullYear() == p.getFullYear()) {
            return $.getDate();
          } else {
            return 0;
          }

        };

      }

      /* 行为 */ {

        var action = function(e/* Object event */) {

          action_reset();

          try {

            var t = e.target;

            if(t.className.indexOf('prev')   > -1) {action_prev(t)}
            if(t.className.indexOf('next')   > -1) {action_next(t)}
            if(t.className.indexOf('year')   > -1) {action_year(t)}
            if(t.className.indexOf('month')  > -1) {action_month(t)}
            if(t.className.indexOf('day')    > -1) {action_day(t)}
            if(t.className.indexOf('submit') > -1) {action_submit(t)}

            e.stopPropagation();

          } catch(ex) {

            return;

          }

        };

        var action_fullYear = function(e/* Object event */) {

          try {

            i.setYear(e.target.innerHTML);

            full(i);
            days(i);

          } catch(ex) {

            return;

          }

        };

        var action_fullMonth = function(e/* Object event */) {

          try {

            i.setMonth(parseInt(e.target.innerHTML) - 1);

            full(i);
            days(i);

          } catch(ex) {

            return;

          }

        };

        var action_prev = function(p/* Var param */) {

          i.setMonth(i.getMonth() - 1);

          full(i);
          days(i);

        };

        var action_next = function(p/* Var param */) {

          i.setMonth(i.getMonth() + 1);

          full(i);
          days(i);

        };

        var action_year = function(p/* Var param */) {

          jQuery(calendar_fullYear).attr('class', 'full-year');

        };

        var action_month = function(p/* Var param */) {

          jQuery(calendar_fullMonth).attr('class', 'full-month');

        };

        var action_day = function(p/* Var param */) {

          d.setFullYear(i.getFullYear());
          d.setMonth(i.getMonth());
          d.setDate(p.innerHTML);

          days(i);

        };

        var action_submit = function(p/* Var param */) {

          t.value = a.replace(/[a-zA-Z]+/g, function($) {

            switch($.charAt(0)) {

              case 'Y' : return format_year   (d.getFullYear());
              case 'M' : return format_month  (d.getMonth());
              case 'D' : return format_date   (d.getDate());
              case 'h' : return format_hours  (d.getHours());
              case 'm' : return format_minutes(d.getMinutes());
              case 's' : return format_seconds(d.getSeconds());

            }

          });

          display();

        };

        var action_reset = function() {

          jQuery(calendar_fullYear).attr('class', 'full-year false');
          jQuery(calendar_fullMonth).attr('class', 'full-month false');

        };

      }

      /* 方法 */ {

        var main = function(e/* Object event */) {

          try {

            if(e.target.getAttribute('calendar')) {

              t = e.target;
              a = t.getAttribute('calendar');
              d = new Date();
              i = new Date();

              if(a == 'true') {
                a = 'YYYY/M/D hh:mm';
              }

              full(i);
              days(i);

            }

            display(e);

          } catch(ex) {

            return;

          }

        };

        var display = function(e/* Object event */) {

          try {

            for(var t = e.target; t; t = t.parentNode) {

              if(t.getAttribute('calendar')) {
                break;
              }

              if(t.className.indexOf('calendar') > -1) {
                return;
              }

            }

            jQuery(calendar).css({

              'left' : (jQuery(t).offset().left) + 'px',
              'top'  : (jQuery(t).offset().top + jQuery(t).height() + 10) + 'px'

            });

            jQuery(calendar)                 .attr('class', 'calendar');
            jQuery(calendar_fullYear)        .attr('class', 'full-year false');
            jQuery(calendar_fullMonth)       .attr('class', 'full-month false');
            jQuery(calendar_hours)  .parent().attr('class', a.indexOf('h') > -1);
            jQuery(calendar_minutes).parent().attr('class', a.indexOf('m') > -1);
            jQuery(calendar_seconds).parent().attr('class', a.indexOf('s') > -1);

          } catch(ex) {

            jQuery(calendar).attr('class', 'calendar false');

          }

        };

      }

      /* 绑定 */ {

        //主体
        jQuery(document).focusin(main);

        //显示
        jQuery(document).click(display);

        //日历行为
        jQuery(calendar).click(action);

        //年份行为
        jQuery(calendar_fullYear).click(action_fullYear);

        //月份行为
        jQuery(calendar_fullMonth).click(action_fullMonth);

      }

    })();
