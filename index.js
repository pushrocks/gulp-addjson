/// <reference path="typings/tsd.d.ts" />
var through = require("through2");
var path = require("path");
var smartfile = require("smartfile");
var beautylog = require("beautylog")("os");
module.exports = function (jsonArg, dataTargetArg) {
    var dataToAdd;
    if (typeof jsonArg === "string") {
        dataToAdd = smartfile.readFileToObject(jsonArg);
    }
    else if (typeof jsonArg === "object") {
        dataToAdd = jsonArg;
    }
    else {
        beautylog.error("It seems that the first vaulue specified for gulp-addjson is strange");
    }
    return through.obj(function (file, enc, cb) {
        file.data[dataTargetArg] = dataToAdd;
        return cb(null, file); //tell gulp that we are complete
    });
};
