document.documentElement.id = "JSen";

function go () {

    var IE6 = false;
    if ( /MSIE (5\.5|6)/.test(navigator.userAgent) ) {
        IE6 = true;;
    }

    /* Simple rating hover and assignment */
    var ratings_control = function () { 

        var ratings = document.getElementById("ratings"); 
        var ratingLabels = ratings.getElementsByTagName("label");
        var labelLength = ratingLabels.length;	

        var markLabels = function (num) {
            for (var i=0; i < labelLength; i++) {
                if (parseInt(ratingLabels[i].id.replace(/\D/g,'')) <= num) {
                    if (ratingLabels[i].className.indexOf('hover_star') >= 0) {
                        ratingLabels[i].className = 'active_star hover_star';
                    }
                    else {
                        ratingLabels[i].className = 'active_star';
                    }
                }
                else 
                {
                    ratingLabels[i].className = 'no_star';
                }
            }
        };

        var markActive = function (num) {
            for (var i=0; i < labelLength; i++) {
                if (parseInt(ratingLabels[i].id.replace(/\D/g,'')) <= num) {
                    ratingLabels[i].className = ratingLabels[i].className + ' hover_star';
                }
            }
        };

        var removeActive = function () {
            for (var i=0; i < labelLength; i++) {
                    ratingLabels[i].className = ratingLabels[i].className.replace(/\b ?hover_star\b/,'').replace(/\s+/g, ' ');
            }
        };

        var addSelection = function () {	
            var num = this.id.replace(/\D/g,'');
            markLabels(num);
        };

        var markSelection = function () {	
            var num = this.id.replace(/\D/g,'');
            markActive(num);
        };

        for (var i=0; i < labelLength; i++) {
            ratingLabels[i].onclick = addSelection;
            ratingLabels[i].onmouseover = markSelection;
            ratingLabels[i].onmouseout = removeActive;
        }
    };

    /* Replace src with blank gif
     * Apply AlphaImageLoader filter
     */
    var fixie = function() {

        // Quit please, if not IE
        if ( !IE6 ) {
            return;
        }

        /* Ratings */
        var ratings = document.getElementById('ratings'),
        imgs = ratings.getElementsByTagName('img'),
        i, 
        len = imgs.length,
        f = 'DXImageTransform.Microsoft.AlphaImageLoader',
        thisFolder = document.URL.replace(/(\\|\/)[^\\\/]*$/, '/'),
        blankImg = thisFolder + 'images/blank.gif';

        function fixit (elm, src) {
            var src = elm.src || src;
            elm.src = blankImg;
            elm.oSrc = src;
            elm.style.filter = 'progid:' + f + '(src="' + src + '",sizingMethod="' + ('scale') + '")';
        }

        for (i=0; i < len; i++) {
            fixit(imgs[i]);
        }

        /* Icons img */
        var icons = document.getElementById('iconimglist');
        imgs = icons.getElementsByTagName('img');
        len = imgs.length;
        for (i=0; i < len; i++) {
            if (imgs[i].offsetWidth) {
                imgs[i].style.width = imgs[i].offsetWidth + 'px';
            }
            if (imgs[i].clientHeight) {
                imgs[i].style.height = imgs[i].clientHeight + 'px';
            }
            if (imgs[i].currentStyle.display == 'inline') {
                imgs[i].style.display = 'inline-block';
            }
            fixit(imgs[i]);
        }

        /* Icons background 
         * Crop Images background using clip property
         */
        icons = document.getElementById('iconsbacklist');
        imgs = icons.getElementsByTagName('div');
        var xPos,
        yPos,
        elmW,
        elmH,
        pngW,
        pngH,
        clipR,
        clipB,
        bgPNG;
        for (i=0; i < imgs.length; i++) {
            // only icon class
            if (imgs[i].className.indexOf("icon") === -1) {
                continue;
            }
            // create div with appropriate dimensions and append it to the current div
            xPos = parseInt(imgs[i].currentStyle.backgroundPositionX.replace('px', ''));
            yPos = parseInt(imgs[i].currentStyle.backgroundPositionY.replace('px', ''));
            elmW = Math.max(imgs[i].clientWidth, imgs[i].scrollWidth);
            elmH = Math.max(imgs[i].clientHeight, imgs[i].scrollHeight);
            pngW = 127;
            pngH = 607;
            clipR = Math.max(0, xPos + pngW > elmW ? elmW - xPos : pngW),
            clipB = Math.max(0, yPos + pngH > elmH ? elmH - yPos : pngH);
            d = document.createElement('div');
            s = d.style;
            s.behavior = 'none';
            s.left = (xPos - parseInt(imgs[i].currentStyle.paddingLeft)) + 'px';
            s.top = yPos + 'px';
            s.width = clipR + 'px';
            s.height = clipB + 'px';
            s.clip = 'rect(' +
                (yPos < 0 ? 0 - yPos : 0) + 'px,' +
                clipR + 'px,' +
                clipB + 'px,' +
                (xPos < 0 ? 0 - xPos : 0) + 'px)';
            s.display = 'block';
            s.position = 'absolute';
            s.zIndex = -999;
            imgs[i].appendChild(d);
            bgPNG = imgs[i].currentStyle.backgroundImage.match(/url[("']+(.*\.png[^\)"']*)[\)"']/i);
            d.style.filter = 'progid:' + f + '(src="' + bgPNG[1] + '",sizingMethod="' + ('crop') + '")';
            imgs[i].style.backgroundImage = 'url("' + blankImg + '")';
        }
    };

    /* If we turn off images in IE 6
     * blank thumbnails from images will remain
     * So we have to hide them in ratings
     */
    var hideRatingErrorsImgs = function (display) {
        // Quit please, if not IE
        if ( !IE6 ) {
            return;
        }
        display = display || 'none';
        var ratings = document.getElementById('ratings');
        var imgs = ratings.getElementsByTagName('img');
        for (var i=0; i < imgs.length; i++) {
            imgs[i].style.display = display;
        }

    }

    ratings_control();
    // Fix for ratings in IE6
    hideRatingErrorsImgs();
    // check if images turned on
    var imgCheck = document.createElement('img');
    imgCheck.onload = function () { hideRatingErrorsImgs('inline'); fixie(); };
    imgCheck.setAttribute('src', 'images/blank.gif');
    
}

window.onload = go ;
