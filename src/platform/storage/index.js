
var data = {};

var storage = {};

storage.set = function(key, value) {
    data[key] = value;
};

storage.get = function(key) {
    return data[key];
};

module.exports = storage;