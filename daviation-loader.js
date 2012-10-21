/**
 * Deviation Loader
 * 
 * Copyright (c) 2012 rhyzx
 * https://github.com/rhyzx
 * Licensed under the MIT license
 * 
 * @require : jQuery
 * @example : 
        $.getDeviations(['henry1025, ladav01'], function(deviations) {
            $('#img').attr('src', deviantions[0].thumb);
        });
 */


;(function($) {
    
    $.getDeviations = getDeviations;
    
    /**
     * @param {Array} authors
     * @param {int} max             : max deviations per author
     * @param {Function} callback
     */
    function getDeviations(authors, max, callback) {
        if(!callback) {
            callback = max;
            max = 20;
        }
        
        var count	= authors.length,
            data	= [];
        
        for(var i=authors.length; i--;) {
            $.getJSON(
                'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=' +max
                +'&q=http%3A%2F%2Fbackend.deviantart.com%2Frss.xml%3Ftype%3Ddeviation%26q%3D'
                +'by%253A' +encodeURIComponent(authors[i])
                +'&callback=?'
                , function(rs) {
                    next(rs.responseData.feed.entries)
                }
            });
        }

        function next(ds) {
            for(var i=0, d; d=ds[i++];) {
                try {
					var ctns = d.mediaGroups[0].contents;
					data.push({
						title:		d.title
						,link:		d.link
						,time:		new Date(d.publishedDate)
						,desc:		d.contentSnippet
						,author:	ctns[0].credits[0].content
						,thumb:		ctns[0].thumbnails[1].url //same as thumb300
						,thumb150:	ctns[0].thumbnails[0].url
						,thumb300:	ctns[0].thumbnails[1].url
						,thumb900:	ctns[0].url
						,original:	ctns[1].url
					});
                } catch(e) {}
            }
            
            if(--count == 0) {
                data.sort(function(a, b) {
                    return b.time - a.time;
                });
                
                callback(data);
            }
        }
    }
})(jQuery);