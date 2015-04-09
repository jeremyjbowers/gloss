function isElementInViewport (el) {
	var rect = el.getBoundingClientRect();
	
	return (
		rect.top + (rect.height / 2 )  >= 0 &&
		rect.bottom - (rect.height / 2 )  <= (window.innerHeight || document.documentElement.clientHeight)
	);
}

function doAnnotatableScroll() {
	
	$("img.annotatable").each(function(){  
		var thisElement=$(this).get(0);
		var lastVisible=$(thisElement).data("lastVisible") || false;
		
		if (isElementInViewport(thisElement)==true && lastVisible==false) {
			$("canvas.annotorious-item").delay(500).animate({opacity: 0.00}, 1000);
    
    	} else if (isElementInViewport(thisElement)==false && lastVisible==true) {
			$("canvas.annotorious-item").animate({opacity: 1.00}, 1000);
			// TODO: Narrow this down to the specific element.
		}

		$(thisElement).data("lastVisible",isElementInViewport(thisElement) );
	});
}


// $(window).scroll(doAnnotatableScroll); 

