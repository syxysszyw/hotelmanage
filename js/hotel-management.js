$(document).ready(function(){

	$('#resetOverseaHotelInfoForm').click(function(){
		$("#overseaHotelInfoManage")[0].reset();
		$('#pickUpLocationStoreQ').html("选择城市");
		$('#pickUpLocationCityQ').html("");

		//3表示主题标签的数量
		for(var j = 1; j <= 3; j++)	{
			resetThemeTag(j);
		}
	});

	//3表示图片数量
	for(var i = 1; i <= 3; i++){
		deletePicture(i);
	}

	$("#inputCity").wqCitySelect({
          title: '选择城市',
          targetId: 'pickUpLocationSelect',
          city_arg1: ['inputCity','pickUpLocationStore','pickUpLocationCity']
        });

	$("#inputQueryCity").wqCitySelect({
          title: '选择城市',
          targetId: 'pickUpLocationSelectQ',
          city_arg1: ['inputQueryCity','pickUpLocationStoreQ','pickUpLocationCityQ']
        });

	$("#overseaHotelInfoManage").submit(function(event){
		$('#queryHotelInfoResult').css("visibility","visible");
		$('#coordinate').css('display', 'none');
		//如果不加这一句，不知道是不是整个页面又刷新了，总是看不到表格。
		event.preventDefault();
	});
	
	$('#selectThemeTagBtn').click(function(event){
		event.preventDefault();
	});

	$('#editCoordinates').click(function(event){
		if($(this).html() == "修改"){
			$('#x').attr("disabled",false);
			$('#y').attr("disabled",false);
			$(this).removeClass("btn-primary").addClass("btn-success");
			$(this).html("提交");
		}else{
			$('#x').attr("disabled",true);
			$('#y').attr("disabled",true);
			$(this).removeClass("btn-success").addClass("btn-primary");
			$(this).html("修改");
		}		
		event.preventDefault();
	});

	$("#datepicker").datepicker();
})

function deletePicture(num){
	$("#deleteButton"+num).click(function(){
			if(confirm("确认要删除吗？")){
				$('#optionsPicture'+num).remove();
			}
			return false;
		});
}

function resetThemeTag(num){
	var _this = $('#themeTag'+num);
	_this.remove();

}
