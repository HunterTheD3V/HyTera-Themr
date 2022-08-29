# npm-jsdelivr

[![build status](https://secure.travis-ci.org/jsdelivr/npm-jsdelivr.png)](http://travis-ci.org/jsdelivr/npm-jsdelivr)

`npm -jsdelivr` provides a CLI interface and an API to interface with [jsDelivr](http://www.jsdelivr.com/) [packages JSON](http://api.jsdelivr.com/v1/jsdelivr/libraries).

## Command-line Tool

Install `jsdelivr` globally:

`npm install -g jsdelivr`

### Search

To search jsDelivr:

`jsdelivr search angular`

```
restangular                   : //cdn.jsdelivr.net/restangular/1.3.1/restangular.min.js
elastic-angular-client        : //cdn.jsdelivr.net/elastic.js/1.1.1/elastic-angular-client.min.js
angular-restful               : //cdn.jsdelivr.net/angular-restful/0.0.3/angular-restful.min.js
```

### URL

To get a url for a library:

`jsdelivr url jquery`

```
jquery                        : //cdn.jsdelivr.net/jquery/2.1.0/jquery.min.js
```

The url method also supports versioning:

`jsdelivr url jquery@1.11.0`

```
jquery                        : //cdn.jsdelivr.net/jquery/1.11.0/jquery.min.js
```

### Default

With only one argument passed, `jsdelivr` assumes you want to search.

`jsdelivr angular`

```
Unknown method, assuming search.
restangular                   : //cdn.jsdelivr.net/restangular/1.3.1/restangular.min.js
elastic-angular-client        : //cdn.jsdelivr.net/elastic.js/1.1.1/elastic-angular-client.min.js
angular-restful               : //cdn.jsdelivr.net/angular-restful/0.0.3/angular-restful.min.js
```

## Module

`jsdelivr` can also be used as a module. The methods are roughly the same.

### Install

Install via npm:

`npm install jsdelivr`

### Search

Search `jsdelivr` for a given identifier:

```javascript
var jsdelivr = require('jsdelivr');
var util = require('util');

jsdelivr.search('d3', function(err, packages) {
    console.log(util.inspect(packages, {
        depth: null,
        colors: true
    }));
});
```

```json
[ { name: 'FileAPI.id3',
    url: '//cdn.jsdelivr.net/fileapi/1.2.5/fileapi',
    versions:
     { '1.2.5': '//cdn.jsdelivr.net/fileapi/1.2.5/fileapi',
       '1.1.0': '//cdn.jsdelivr.net/fileapi/1.1.0/fileapi' } } ]
```

### URL

Grab a URL for a specific package (it supports versions too):

```js
var jsdelivr = require('jsdelivr');
var util = require('util');

jsdelivr.url('jquery.tinymce', function(err, packages) {
    console.log(util.inspect(packages, {
        depth: null,
        colors: true
    }));
});
```

```json
{ name: 'jquery.tinymce',
  url: '//cdn.jsdelivr.net/tinymce/4.0b2/jquery.tinymce.min.js',
  versions:
   { '4.0.1': '//cdn.jsdelivr.net/tinymce/4.0.1/jquery.tinymce.min.js',
     '3.5.7': '//cdn.jsdelivr.net/tinymce/3.5.7/jquery.tinymce.min.js' } }
```

```js
jsdelivr.url('jquery.tinymce@3.5.7', function (err, packages) {
    console.log(util.inspect(packages, {
        depth: null,
        colors: true
    }));
});
```

```json
{ name: 'jquery.tinymce@3.5.7',
  url: '//cdn.jsdelivr.net/tinymce/3.5.7/jquery.tinymce.min.js',
  versions:
   { '4.0.1': '//cdn.jsdelivr.net/tinymce/4.0.1/jquery.tinymce.min.js',
     '3.5.7': '//cdn.jsdelivr.net/tinymce/3.5.7/jquery.tinymce.min.js' } }
```

## Contributors

* [Tom Ashworth](https://github.com/phuu) - Creator of original [cdnjs-transform](https://github.com/phuu/cdnjs-transform) and [cdnjs](https://github.com/phuu/cdnjs) modules this library is based upon.
* [Juho Vepsäläinen](https://github.com/bebraw) - jsDelivr specific tweaks

## License

MIT

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
