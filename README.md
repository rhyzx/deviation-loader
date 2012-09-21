=Deviation Loader



==example

    $.getDeviations(['henry1025', 'ladav'], function(deviations) {
        var $container = $('#container');
        
        $.each(deviations, function(i, deviation) {
            $container.append('<img src="' +deviation.thumb +'" title="' +deviation.title +'" alt="' +deviation.author +'" />');
        });
    });
    
    
==DEMO
[team3.tk](http://team3.tk)