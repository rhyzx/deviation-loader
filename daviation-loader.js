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
            var author = authors[i];
            $.getJSON(
                'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=' +max
                +'&q=http%3A%2F%2Fbackend.deviantart.com%2Frss.xml%3Ftype%3Ddeviation%26q%3D'
                +'by%253A' +encodeURIComponent(author)
                +'&callback=?'
                , function(rs) {
                    next(rs.responseData.feed.entries, author)
                }
            });
        }

        function next(ds, author) {
            for(var i=0, d; d=ds[i++];) {
                data.push({
                    title:	d.title
                    ,link:	d.link
                    ,time:	new Date(d.publishedDate)
                    ,desc:	d.contentSnippet
                    ,thumb:	d.mediaGroups[0].contents[0].thumbnails[1].url
                    ,author: author
                });
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