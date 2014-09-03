;(function($, win, doc){
	
	/**
	 * 酒店城市选择框
 	 */
 	 $.fn.wqCitySelect = function(opts) {
		var defaults = {
			title: '',
			targetId: '',
			city_arg1: [],
			callback: $.noop
		},
		convertCityData = [];

		opts = $.extend({}, defaults, opts);

		return this.each(function() {
			var _this = $(this),
				offset = _this.offset(),
				top = offset.top,
				left = offset.left,
				citySelect = $('<div id="' + opts.targetId + '" class="city_select_wrapper">\
					<div class="city_select_mask hide"></div>\
					<i class="city_select_close_btn"></i>\
					<div class="select_head">\
						<h1 class="select_title">' + opts.title + '</h1>\
						<div class="search_wrapper hide">\
							<a href="javascript:;" class="search_btn"></a>\
							<input id="searchCarInput" type="text" class="search_input" data-original="输入城市(支持中英文)" value="输入城市(支持中英文)" >\
						</div>\
					</div>\
					<div class="select_body wq_clearfix">\
						<ul class="letter_list">\
							<li class="letter_title">城市</li>\
							<li class="letter_tag" data-id="A">A</li>\
							<li class="letter_tag" data-id="B">B</li>\
							<li class="letter_tag" data-id="C">C</li>\
							<li class="letter_tag" data-id="D">D</li>\
							<li class="letter_tag" data-id="E">E</li>\
							<li class="letter_tag" data-id="F">F</li>\
							<li class="letter_tag" data-id="G">G</li>\
							<li class="letter_tag" data-id="H">H</li>\
							<li class="letter_tag" data-id="I">I</li>\
							<li class="letter_tag" data-id="J">J</li>\
							<li class="letter_tag" data-id="K">K</li>\
							<li class="letter_tag" data-id="L">L</li>\
							<li class="letter_tag" data-id="M">M</li>\
							<li class="letter_tag" data-id="N">N</li>\
							<li class="letter_tag" data-id="O">O</li>\
							<li class="letter_tag" data-id="P">P</li>\
							<li class="letter_tag" data-id="Q">Q</li>\
							<li class="letter_tag" data-id="R">R</li>\
							<li class="letter_tag" data-id="S">S</li>\
							<li class="letter_tag" data-id="T">T</li>\
							<li class="letter_tag" data-id="U">U</li>\
							<li class="letter_tag" data-id="V">V</li>\
							<li class="letter_tag" data-id="W">W</li>\
							<li class="letter_tag" data-id="X">X</li>\
							<li class="letter_tag" data-id="Y">Y</li>\
							<li class="letter_tag" data-id="Z">Z</li>\
						</ul>\
						<div class="city_list_wrapper"></div>\
					</div>\
				</div>');
			_this.click(function() {
				if ($('#' + opts.targetId).length) {
					citySelect = $('#' + opts.targetId);
					if (citySelect.is(':visible')) {
						citySelect.hide();
						return;
					}
					citySelect.show();
					return;
				} else {
					citySelect.css({
						top: top+35,
						left: left
					}).appendTo(doc.body);
				}

				//render html
				citySelect.find('.city_list_wrapper').html(renderCityList(hotelcity));
				
				//search input
				citySelect.find('#searchCarInput').focus(function() {
					var _this = $(this),
						original = _this.attr('data-original'),
						value = _this.val();

					if (original == value) {
						_this.val('');
					}
				}).blur(function() {
					var _this = $(this),
						original = _this.attr('data-original'),
						value = _this.val();

					if (value && value != original) {
						return;
					} else if (!value) {
						_this.val(original);
					} 
				}).keyup(function() {
					var value = $(this).val();					
					//调用后台接口匹配
				});

				//hot city position fix
				citySelect.on('click', '.hot_city_table > p', function() {
					var _this = $(this),
						target = citySelect.find('.vertical_city_list li[data-key="' + _this.attr('data-key') + '"]');
					cityListPositionFix(target, citySelect.find('.city_list_wrapper'));
				});

				//letter tag position fix
				citySelect.on('click', '.letter_tag', function() {
					var _this = $(this),
						target = $('#' + opts.targetId + _this.attr('data-id'));
					cityListPositionFix(target, citySelect.find('.city_list_wrapper'));
				});

				//select shop
				//选择城市，并且把它填充到input里
				citySelect.on('click', '.city_name1', function() {
					_this.attr('data-key',$(this).parent().attr('data-key'));
					$('#' + opts.city_arg1[1]).html($(this).children('.city_en_name').html());
					if($(this).parent().prev().children('.city_cn_name').html() != '') {
						$('#' + opts.city_arg1[2]).html($(this).children('.city_cn_name').html());
					}
					citySelect.find('.city_list_wrapper').scrollTop(0);
					// $(this).parent().removeClass('active');
					citySelect.fadeOut();
				});

				//close select
				citySelect.on('click', '.city_select_close_btn', function() {
					close();
				});

			});
			function close() {
				citySelect.hide();
			}
		});

		/*scroll定位*/
		function cityListPositionFix(target, wrapper,expand) {
			var t_offset_top = target.position().top;
			wrapper.animate({
				scrollTop: t_offset_top + wrapper.scrollTop()
			});

			if (expand) {
				target.click();
			}
		}
		

		function renderCityList(jsonData) {
			return tableTemplate(hotelcity.hot) + allUlTemplate(hotelcity);
		}

		function renderShopList(jsonData) {

			var html = '<div class="vertical_shop_list">';

			for (var i=0; i<jsonData.length; i++) {
				html += '<p data-value="' + jsonData[i][0] + '">' + jsonData[i][1] + '</p>';
			}

			return $(html + '</div>');
		}

		//生成热门城市
		function tableTemplate(jsonData) {
			var html = '<div class="city_box table_box wq_clearfix">\
							<h2 class="city_list_title">美国热门城市</h2>\
							<div class="hot_city_table">';
			for (var i=0; i<jsonData.length; i++) {
				var city = jsonData[i];
				for (var k in city) {
					html += '<p data-key="' + k + '" data-tag="' + city[k][0] + '">' + city[k][2] + '</p>';
				}
			}

			return html += '</div></div>';
		}

		//生成热门城市下面a~z内容
		function allUlTemplate(jsonData) {
			var html = '';
			for (var i in jsonData) {
				if (i != 'hot') {
					html += singleUlTemplate(i, jsonData[i]);
				}
			}
			return html;

			/*
			var _data;
			$.ajax({
				async : false,
				url: "http://www.woqu.com/data/rentalcar",
				type: "POST",
				data : 'targetId=' + opts.targetId,
				dateType: "text",
				success: function(data) {
					_data = data;
				},
				error: function(a,b,c,d){
					alert("刷取数据异常!");
				}
			});
			return _data;*/
		}

		
		function singleUlTemplate(tag, jsonData) {
			var html = '<div class="city_box list_box">\
							<h2 id="' + opts.targetId + tag + '" class="city_list_title">' + tag + '</h2>\
							<ul class="vertical_city_list">';
			var cnName;
			for (var i=0; i<jsonData.length; i++) {
				var city = jsonData[i];
				for (var c in city) {
					cnName = city[c][2] ? city[c][2] : ''; 
					html += '<li data-key="' + c + '" class="wq_clearfix"><div class="city_name1 wq_clearfix"><span class="city_en_name">' + city[c][1] + 
					'</span><span class="city_cn_name">' + cnName +'</span></div></li>';
				}
			}
			return html += '</ul></div>';
		}
	};

}(jQuery, window, document));
