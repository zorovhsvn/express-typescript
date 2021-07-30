"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "replication": {
        "write": {
            "host": "localhost",
            "username": "root",
            "password": ""
        },
        "read": [{
                "host": "localhost",
                "username": "root",
                "password": ""
            }]
    },
    "database": "table",
    "logging": false,
    "sync": {
        "force": false,
        "alter": false
    }
};
