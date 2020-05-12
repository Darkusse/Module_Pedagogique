$("#sub").click (fuction () {

  
	$.post ( $("#frm").attr("action"), $("#frm :input").serializeArray (), function(info) {$("#sub"}.html(info);} ) ;
	clearInput();
	
});
$("#frm").submit (function () {
 return false ;

} );

function clearInput () {
	$("#frm : input).each (function () {
		$(this).val('');
	});
	
	
Onclick
