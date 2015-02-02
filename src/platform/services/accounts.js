var _ = require('lodash');
var request = require('superagent');
var q = require('q');

var socket = require('../socket');
var storage = require('../storage');

import {Base} from './base';
import {Account} from '../models/account';

class Accounts extends Base {

    constructor() {
        this.accounts = [];

        // register our financial transaction handler
        socket.addEventHandler('accounts', 'financialTransaction', function(account) {
            var a = _.find(this.accounts, { id: account.id });
            _.extend(a, account);

            this.emit('change', a, this.accounts);
        }.bind(this));
    }

    getAccounts() {

        var deferred = q.defer();
        var self = this;

        request
            .get('/api/accounts')
            .end(function(res) {
                self.accounts = res.body;
                deferred.resolve(self.accounts);
            });

        return deferred.promise;
    }
}

export {Accounts}