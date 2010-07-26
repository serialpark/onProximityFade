/*
 * onProximityFade jQuery Plugin v1.0.0
 * http://jquery.com/
 *
 * Copyright 2010, Jakub Linowski
 * Licensed under the MIT license
 * http://www.linowski.ca
 *
 * Date: July 25 2010
 */

//Default Settings
var opf = {
    farOpacity : 0.1,
	farDistanceMax : 120,
	closeOpacity : 1,
	closeDistanceMin : 10,
	className : "fadeBox" 
};

$(document).ready(function(){
	//setup default opacity on
	$("." + opf.className).each(function() {
		$(this).fadeTo(1,opf.farOpacity);
		// for links
		if($(this).get(0).tagName == "A")
		{
			//set all items as block (so that IE can pick up a width)
			$(this).css("display","inline-block");
			//set a background color so that FireFox & ClearType can better calculate an opacity colour
			$(this).css("background-color","inherit");
		}
	});
});

$(document).mousemove(function(e){
	//adjust opacity foreach element based on className
	$("." + opf.className).each(function() {
		//highlight the elements in the beginning to show they are there
		
		//grab the element's boundary points
		var boundary = new Object();
		boundary.topY = $(this).offset().top;
		boundary.bottomY = boundary.topY + $(this).height();
		boundary.leftX = $(this).offset().left;
		boundary.rightX = boundary.leftX + $(this).width();
		
		//cursor top left of element
		if ((e.pageX <= boundary.leftX) && (e.pageY <= boundary.topY)) {
			var distance = Math.sqrt(Math.pow((e.pageX - boundary.leftX), 2) + Math.pow((e.pageY - boundary.topY), 2));
		}
		//cursor top right of element
		else if ((e.pageX >= boundary.rightX) && (e.pageY <= boundary.topY)) {
			var distance = Math.sqrt(Math.pow((e.pageX - boundary.rightX), 2) + Math.pow((e.pageY - boundary.topY), 2));
		}
		//cursor bottom right of element
		else if ((e.pageX >= boundary.rightX) && (e.pageY >= boundary.bottomY)) {
			var distance = Math.sqrt(Math.pow((e.pageX - boundary.rightX), 2) + Math.pow((e.pageY - boundary.bottomY), 2));
		}
		//cursor bottom left of element
		else if ((e.pageX <= boundary.leftX) && (e.pageY >= boundary.bottomY)) {
			var distance = Math.sqrt(Math.pow((e.pageX - boundary.leftX), 2) + Math.pow((e.pageY - boundary.bottomY), 2));
		}
		
		//cursor left of element
		else if (e.pageX < boundary.leftX) {
			var distance = boundary.leftX - opf.closeDistanceMin - e.pageX;
		}
		//cursor right of element
		else if (e.pageX > boundary.rightX) {
			var distance = e.pageX - boundary.rightX + opf.closeDistanceMin ;
		}
		//cursor top of element
		else if (e.pageY < boundary.topY) {
			var distance = boundary.topY - opf.closeDistanceMin - e.pageY;
		}
		//cursor bottom of element
		else if (e.pageY > boundary.bottomY) {
			var distance = e.pageY - boundary.bottomY + opf.closeDistanceMin;
		}
		
		
		//set right opacity
		if (distance > opf.farDistanceMax) { distance = opf.farDistanceMax;}
		var opacity = opf.closeOpacity - distance / opf.farDistanceMax + opf.farOpacity;
		$(this).css("opacity",opacity);
		//$(this).stop().fadeTo(1,opacity);
	});
  
});
