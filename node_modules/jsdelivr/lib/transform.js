'use strict';

var _ = require('lodash');


/**
 * Determine if a package is a JS file or foldered
 */
var isJS = function(pkg) {
    if(!pkg.mainfile) {
        return;
    }

    return pkg.mainfile.match(/\.js$/i);
};
var isFoldered = function(pkg) {
    if(!pkg.mainfile) {
        return;
    }

    return pkg.mainfile.match(/\//);
};

var nameMatchesPackageName = function(name, packageName) {
    return name.toLowerCase().indexOf(packageName.toLowerCase()) !== -1;
};

var fileType = function(filename) {
    return filename.match(/min\.js$/i) ? 'minified' : 'default';
};

/**
 * Determine if a package has a mainfile
 */
var hasMainfile = function(pkg) {
    return 'mainfile' in pkg;
};

var extractName = function (filename) {
    return filename.replace(/([.-]min)?\.js$/, '');
};

var processAssetFiles = function(pkg, memo, asset) {
    return asset.files.reduce(function (memo, mainfile) {
        // Not Javascript? No thanks.
        if(!isJS({mainfile: mainfile})) {
            return memo;
        }
        // In a folder? No thanks. We might support this stuff in future, but right
        // now it's not possible to do reliably.
        if(isFoldered({mainfile: mainfile})) {
            return memo;
        }
        // Grab a name for this asset (no 'min' or file extensions)
        var name = extractName(mainfile);
        // If the package name isn't in the file name, don't bother. This
        // is a heuristic to make sure we aren't getting dependencies that can't
        // be associated with the libary.
        if(!nameMatchesPackageName(name, extractName(pkg.name))) {
            return memo;
        }

        // If this is a new package, add the skeleton object
        if(!memo[name]) {
            memo[name] = {
                root: pkg.name,
                version: pkg.assets[0].version,
                files: {
                    default: mainfile
                },
                versions: []
            };
        }
        // If multiple libraries specify the same file, we will just return memo. Again,
        // this is weird dependency shit.
        if(pkg.name !== memo[name].root) {
            return memo;
        }
        // Figure out what kind of file this is and add it. This could be extended
        // later for other kinds of files.
        memo[name].files[fileType(mainfile)] = mainfile;
        // Save the version associated with the current asset. Versioning ftw.
        memo[name].versions = _.unique(memo[name].versions.concat([asset.version]));
        return memo;
    }, memo);
};

var extractAssets = function(memo, pkg) {
    return pkg.assets.reduce(processAssetFiles.bind(null, pkg), memo);
};

var processPackages =  function(packages) {
    return packages.filter(hasMainfile).filter(isJS).reduce(extractAssets, {});
};

module.exports = function(packages) {
    var assets = processPackages(packages);

    return Object.keys(assets).map(function (name) {
        return _.extend(assets[name], {
            name: name
        });
    });
};
