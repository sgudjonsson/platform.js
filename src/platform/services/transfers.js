
var q = require('q');
var request = require('superagent');

class Transfers {

    constructor() {

    }

    transfer(accountId, amount) {

        var deferred = q.defer();

        request
            .post('/api/transfer')
            .type('application/json')
            .send({ accountId: accountId, amount: amount })
            .end(function(res) {
                deferred.resolve(true);
            });

        return deferred.promise;

    }

}

export {Transfers}