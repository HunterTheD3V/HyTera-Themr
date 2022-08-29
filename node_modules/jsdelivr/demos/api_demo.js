#!/usr/bin/env node

'use strict';

var util = require('util');

var jsdelivr = require('../');


jsdelivr.search('angular', function(err, packages) {
    console.log('search:', util.inspect(packages, {
        depth: null,
        colors: true
    }));
});

jsdelivr.url('jquery', function(err, packages) {
    console.log('url:', util.inspect(packages, {
        depth: null,
        colors: true
    }));
});

jsdelivr.url('jquery@1.11.0', function(err, packages) {
    console.log('versioned url:', util.inspect(packages, {
        depth: null,
        colors: true
    }));
});
