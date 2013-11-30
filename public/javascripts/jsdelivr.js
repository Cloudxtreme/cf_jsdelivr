CloudFlare.define(
    'jsdelivr',
    ['jsdelivr/config'],
    function(config) {
        var libs = {
            jquery: 'cdn.jsdelivr.net/jquery/2.0.3/jquery-2.0.3.min.js',
            mootools: 'cdn.jsdelivr.net/mootools/1.4.5/mootools-core-1.4.5-full-compat.js',
            backbone: 'cdn.jsdelivr.net/backbonejs/1.1.0/backbone-min.js',
            underscore: 'cdn.jsdelivr.net/underscorejs/1.5.2/underscore-min.js',
            jquerycookie: 'cdn.jsdelivr.net/jquery.cookie/1.4.0/jquery.cookie.min.js',
            mustache: 'cdn.jsdelivr.net/mustache.js/0.7.3/mustache.min.js'
        };

        Object.keys(libs).forEach(function(id) {
            // load the libs here
            if(config[id] == 'true'){
				var a = document.createElement('script');
				a.type = 'text/javascript';
				a.src = '//' + libs[id];
				document.body.appendChild(a);
			}
			
			
        });
    }
);