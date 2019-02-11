const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');

const rootFolder = "C:\\temp\\Illustrator exports";

filewalker(rootFolder, function(err, data) {
    if (err) {
        throw err;
    }
    
    for (var i = 0; i < data.length; i++) {
        var filepath = data[i];
        var newfilepath = newFilePath(filepath);
        fs.renameSync(filepath, newfilepath); // might throw
        console.log("Renamed " + filepath +  "  >>>  " + newfilepath);
    }
});

var extensions = [ '.png', '.jpg', '.jpeg', '.gif' ];

function needToRename(filepath) {
    var parts = path.parse(filepath);
    var extmatch = parts.ext && extensions.includes(parts.ext.toLowerCase());
    var needToRename = extmatch && !RegExp(".*-[0-9]+x[0-9]+$").test(parts.name);

    if (extmatch && !needToRename) {
        console.log("Skipped " + filepath);
    }

    return needToRename;
}

function newFilePath(filepath) {
    var parts = path.parse(filepath);
    var dimensions = sizeOf(filepath);
    return path.join(parts.dir, parts.name + "-" + dimensions.width + "x" + dimensions.height + parts.ext);
}

// filewalker() from https://ourcodeworld.com/articles/read/420/how-to-read-recursively-a-directory-in-node-js
function filewalker(dir, doneCallback) {
    let results = [];

    fs.readdir(dir, function(err, list) {
        if (err) {
            return doneCallback(err);
        }

        var pending = list.length;

        if (!pending) {
            return doneCallback(null, results);
        }

        list.forEach(function(file){
            file = path.resolve(dir, file);

            fs.stat(file, function(err, stat){
                if (stat && stat.isDirectory()) {
                    //results.push(file); // add folderpath to results array

                    filewalker(file, function(err, res) {
                        results = results.concat(res);
                        if (!--pending) {
                            doneCallback(null, results);
                        }
                    });
                } else {
                    if (needToRename(file)) {
                        results.push(file);
                    }

                    if (!--pending) {
                        doneCallback(null, results);
                    }
                }
            });
        });
    });
};
