CloudFlare.define(
    'jsdelivr',
    ['jsdelivr/config'],
    function(config) {
        var libs = {
            jquery: 'http://cdn.jsdelivr.net/jquery/2.0.3/jquery-2.0.3.min.js',
            mootools: 'http://cdn.jsdelivr.net/mootools/1.4.5/mootools-core-1.4.5-full-compat.js',
            backbone: 'http://cdn.jsdelivr.net/backbonejs/1.1.0/backbone-min.js',
            underscore: 'http://cdn.jsdelivr.net/underscorejs/1.5.2/underscore-min.js',
            jquerycookie: 'http://cdn.jsdelivr.net/jquery.cookie/1.4.0/jquery.cookie.min.js',
            mustache: 'http://cdn.jsdelivr.net/mustache.js/0.7.3/mustache.min.js'
        };

        Object.keys(libs).forEach(function(id) {
            // load the libs here
            if(config[id] == 'true') CloudFlare.require([libs[id]]);
        });
    }
);