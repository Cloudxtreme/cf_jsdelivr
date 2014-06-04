'use strict';

CloudFlare.define('jsdelivr', ['cloudflare/dom', 'jsdelivr/config'], function (dom, _config) {
    var JSDelivr = function (config) {
        this.baseUrl = '//cdn.jsdelivr.net';
        this.config = config;
    };

    JSDelivr.prototype.initialize = function () {
        var libraries;

        if (!this.config.libraries) {
            return;
        }

        if (this.config.combined) {
            libraries = this.baseUrl + '/g/' + this.config.libraries;
        } else {
            libraries = this.parseLibraries(this.config.libraries);
        }

        this.addScripts(libraries);

        if (this.config.cedexis) {
            this.useCedexis();
        }
    };

    JSDelivr.prototype.addScripts = function (urls) {
        if (typeof urls === 'string') {
            urls = [urls];
        }

        var referenceNode = document.getElementsByTagName('script')[0],
            script;

        for (var i = 0; i < urls.length; i++) {
            script = dom.createElement('script');
            script.type = 'text/javascript';
            script.src = urls[i];

            referenceNode.parentNode.appendChild(script);
        }
    };

    JSDelivr.prototype.parseLibraries = function (libraries) {
        var pattern = /^([a-z0-9\.\-_]+)([@a-z0-9\.\-_]+)?(\(.+\))?/i,
            urls = [],
            url, parts, name, version, files, file;

        libraries = libraries.replace(/\s/g, '');
        libraries = libraries.split(',');

        for (var i = 0; i < libraries.length; i++) {
            url = libraries[i];

            parts = pattern.exec(url);

            name = parts[1];
            version = (parts[2] || 'latest').replace('@', '');
            files = (parts[3] || 'mainfile').replace('(', '').replace(')', '').split('+');

            for (var j = 0; j < files.length; j++) {
                file = files[j];
                urls.push(this.baseUrl + '/' + name + '/' + version + '/' + file);
            }
        }

        return urls;
    };

    JSDelivr.prototype.useCedexis = function () {
        dom.onLoad.then(function () {
            var script = dom.createElement('script');
            script.type = 'text/javascript';
            script.async = 'async';
            script.src = '//' +
                (window.location.protocol === 'https:' ? 's3.amazonaws.com/cdx-radar/' : 'radar.cedexis.com/') +
                '01-11475-radar10.min.js';
            document.body.appendChild(script);
        });
    };

    var jsdelivr = new JSDelivr(_config);

    jsdelivr.initialize();

});
