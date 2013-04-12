$(document).ready( function() {
    var merge = function (obj1, obj2) {
        var res = [];
        for (var i=0; i<obj1.length; i++) {
            res[i] = obj1[i];
        }
        for (var i=0; i<obj2.length; i++) {
            res[obj1.length+i] = obj2[i];
        }
        return res
    }
	var table = document.getElementById("table2");
	var ths = table.getElementsByTagName("th");
	var tds = table.getElementsByTagName("td");
    console.log(tds);
	/* assuming we have valid number if cells */
	//var allm = document.querySelectorAll("#table2 th, #table2 td");
	var all = merge(ths, tds);
    console.log(all);
    console.log(allm);
	var rows = ths.length;
	var colls = all.length / ths.length;
	/* all cells have equal width in thix example */
	var cHeight = ths[0].clientHeight;
	var cWidth = ths[0].clientWidth;
	for (var i=0 /* header incr */, j=0 - rows /* cell incr */; i < all.length; i++, j++) {
	    var el = all[i];
	    if ( i < rows ) {
		/* offset for headers */
		var singleFloor = Math.floor(i/rows); 
		var fromTop = i * cHeight;
		var fromLeft = singleFloor * cWidth + singleFloor * 20;
			console.log(fromTop);
	    } else {
		/* offset for cells */
		var singleFloor = Math.floor(j/rows);
		var fromTop = singleFloor * cHeight;
		var fromLeft = j * cWidth - singleFloor * cWidth * rows + cWidth + 20;
	    }
	    el.style.top = fromTop + 'px';
	    el.style.left = fromLeft + 'px';
	}

});
