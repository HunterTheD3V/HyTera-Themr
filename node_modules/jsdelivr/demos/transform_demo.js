#!/usr/bin/env node

'use strict';

var util = require('util');

var request = require('request');

var transform = require('../lib/transform');


main();

function main() {
    request.get({
        url: 'http://api.jsdelivr.com/v1/jsdelivr/libraries',
        json: true
    }, function (err, res, packages) {
        if(err) {
            return console.error(err);
        }

        var result = transform(packages);

        console.log(util.inspect(result, {
            depth: null,
            colors: false
        }));

        console.log('\n\nlength', result.length);
    });
}
