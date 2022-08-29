'use strict';

var jsdelivr = require('../');
var should = require('should');


describe('packages', function () {
    it('should pull down all packages correctly', function (done) {
        this.timeout(20000);

        jsdelivr.packages(function (err, packages) {
            should.not.exist(err);
            packages.should.be.ok;
            packages.should.be.an.instanceOf(Array);
            done();
        });
    });

    it('should cache packages', function (done) {
        this.timeout(20000);

        jsdelivr.packages(function (err, packages) {
            should.not.exist(err);
            packages.should.be.ok;
            packages.should.be.an.instanceOf(Array);
            jsdelivr.cache.packages.should.be.ok.and.be.an.instanceOf(Array);

            jsdelivr.packages(function (err, cachePackages, hitCache) {
                hitCache.should.be.ok;
                done();
            });
        });
    });
});

describe('search', function () {
    it('should find a known set of packages', function (done) {
        this.timeout(20000);

        jsdelivr.search('jquery', function (err, result) {
            should.not.exist(err);
            result.should.be.ok;
            result.should.be.an.instanceOf(Array);
            result.length.should.be.above(20);
            done();
        });
    });

    it('should find a known url', function (done) {
        this.timeout(5000);

        jsdelivr.url('platform.js', function (err, result) {
            should.not.exist(err);
            result.name.should.equal('platform');
            result.url.should.match(/\/\/cdn.jsdelivr.net\/platform.js\/(.*)\/platform.js/);
            done();
        });
    });
});

describe('url', function () {
    it('should find a url for a known package', function (done) {
        this.timeout(5000);

        jsdelivr.url('platform.js', function (err, result) {
            should.not.exist(err);
            result.should.be.ok;
            result.name.should.equal('platform');
            done();
        });
    });

    it('should find a url for a known package with ".js" added to the name', function (done) {
        this.timeout(5000);

        jsdelivr.url('jquery.js', function (err, result) {
            should.not.exist(err);
            result.should.be.ok;
            result.name.should.equal('jquery');
            done();
        });
    });

    it('should find a url for a known package with ".js" missing from the name', function (done) {
        this.timeout(5000);

        jsdelivr.url('platform', function (err, result) {
            should.not.exist(err);
            result.name.should.equal('platform');
            result.url.should.match(/\/\/cdn.jsdelivr.net\/platform.js\/(.*)\/platform.js/);
            done();
        });
    });

    it('should find a versioned url for a known package', function (done) {
        this.timeout(5000);

        jsdelivr.url('jquery@2.1.0', function (err, result) {
            should.not.exist(err);
            result.should.be.ok;
            result.name.should.equal('jquery');
            result.url.should.include('2.1.0');
            done();
        });
    });
});
