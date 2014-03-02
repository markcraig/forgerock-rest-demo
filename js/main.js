/*
 * The contents of this file are subject to the terms of the Common Development and
 * Distribution License (the License). You may not use this file except in compliance with the
 * License.
 *
 * You can obtain a copy of the License at legal/CDDLv1.0.txt. See the License for the
 * specific language governing permission and limitations under the License.
 *
 * When distributing Covered Software, include this CDDL Header Notice in each file and include
 * the License file at legal/CDDLv1.0.txt. If applicable, add the following below the CDDL
 * Header, with the fields enclosed by brackets [] replaced by your own identifying
 * information: "Portions Copyrighted [year] [name of copyright owner]".
 *
 * Copyright 2014 ForgeRock AS
 */

/*global angular, window, rsUrl */

/**
 * The URL to the JSON Resource Servlet.
 * @type {string} The URL to the JSON Resource Servlet.
 */
var rsUrl;
rsUrl = window.location.protocol + "//" + window.location.hostname + ":" +
    window.location.port + "/json/";

angular.module('main', ['ngResource', 'ngRoute', 'ui.bootstrap'])
    .factory('crestResource', function ($resource) {
        "use strict";
        var CrestResource;

        CrestResource = $resource("");

        CrestResource.prototype.getAll = function (url, successCb, errorCb) {
            CrestResource = $resource(url);
            return CrestResource.get({"_queryFilter": true}, successCb, errorCb);
        };

        CrestResource.prototype.del = function (url, successCb, errorCb) {
            CrestResource = $resource(url);
            return CrestResource.remove({}, successCb, errorCb);
        };

        return new CrestResource();
    })
    .config(function ($routeProvider) {
        "use strict";

        $routeProvider
            .when('/', {
                templateUrl: 'partials/about.html'
            })
            .when('/create', {
                templateUrl: 'partials/create.html'
            })
            .when('/read', {
                templateUrl: 'partials/read.html',
                controller: function ($scope, users, groups) {
                    $scope.users = users;
                    $scope.groups = groups;
                },
                resolve: {
                    users: function ($q, crestResource) {
                        var url, deferred, successCb, options, failureCb;

                        url = rsUrl + "users";

                        deferred = $q.defer();

                        successCb = function (result) {
                            if (angular.equals(result, {})) {
                                deferred.reject("No users found");
                            } else {
                                options = result.result.sort(function (a, b) {
                                    return a.fullname[0].toString()
                                        .localeCompare(b.fullname[0].toString());
                                });
                                deferred.resolve(options);
                            }
                        };

                        failureCb = function () {
                            deferred.reject("No users found");
                        };

                        crestResource.getAll(url, successCb, failureCb);

                        return deferred.promise;
                    },
                    groups: function ($q, crestResource) {
                        var url, deferred, successCb, options, failureCb;

                        url = rsUrl + "groups";

                        deferred = $q.defer();

                        successCb = function (result) {
                            if (angular.equals(result, {})) {
                                deferred.reject("No groups found");
                            } else {
                                options = result.result.sort(function (a, b) {
                                    return a.name.toString()
                                        .localeCompare(b.name.toString());
                                });
                                deferred.resolve(options);
                            }
                        };

                        failureCb = function () {
                            deferred.reject("No groups found");
                        };

                        crestResource.getAll(url, successCb, failureCb);

                        return deferred.promise;
                    }
                }
            })
            .when('/update', {
                templateUrl: 'partials/update.html'
            })
            .when('/delete', {
                templateUrl: 'partials/delete.html',
                controller: function ($scope, $q, crestResource, users, groups) {
                    $scope.users = users;
                    $scope.groups = groups;
                    $scope.deleteUser = function () {
                        var url, deferred, successCb, failureCb;

                        url = rsUrl + "users/" + $scope.user._id;

                        deferred = $q.defer();

                        successCb = function (result) {
                            if (angular.equals(result, {})) {
                                deferred.reject("Delete failed");
                            } else {
                                $scope.users = $scope.users.filter(
                                    function (user) {
                                        return user._id != result._id;
                                    });
                                $scope.deletedUser = result;
                                deferred.resolve(result);
                            }
                        };

                        failureCb = function () {
                            deferred.reject("Delete failed");
                        };

                        crestResource.del(url, successCb, failureCb);

                        return deferred.promise;
                    };
                    $scope.deleteGroup = function () {
                        var url, deferred, successCb, failureCb;

                        url = rsUrl + "groups/" + $scope.group._id;

                        deferred = $q.defer();

                        successCb = function (result) {
                            if (angular.equals(result, {})) {
                                deferred.reject("Delete failed");
                            } else {
                                $scope.groups = $scope.groups.filter(
                                    function (group) {
                                        return group._id != result._id;
                                    });
                                $scope.deletedGroup = result;
                                deferred.resolve(result);
                            }
                        };

                        failureCb = function () {
                            deferred.reject("Delete failed");
                        };

                        crestResource.del(url, successCb, failureCb);

                        return deferred.promise;
                    };
                },
                resolve: {
                    users: function ($q, crestResource) {
                        var url, deferred, successCb, options, failureCb;

                        url = rsUrl + "users";

                        deferred = $q.defer();

                        successCb = function (result) {
                            if (angular.equals(result, {})) {
                                deferred.reject("No users found");
                            } else {
                                options = result.result.sort(function (a, b) {
                                    return a.fullname[0].toString()
                                        .localeCompare(b.fullname[0].toString());
                                });
                                deferred.resolve(options);
                            }
                        };

                        failureCb = function () {
                            deferred.reject("No users found");
                        };

                        crestResource.getAll(url, successCb, failureCb);

                        return deferred.promise;
                    },
                    groups: function ($q, crestResource) {
                        var url, deferred, successCb, options, failureCb;

                        url = rsUrl + "groups";

                        deferred = $q.defer();

                        successCb = function (result) {
                            if (angular.equals(result, {})) {
                                deferred.reject("No groups found");
                            } else {
                                options = result.result.sort(function (a, b) {
                                    return a.name.toString()
                                        .localeCompare(b.name.toString());
                                });
                                deferred.resolve(options);
                            }
                        };

                        failureCb = function () {
                            deferred.reject("No groups found");
                        };

                        crestResource.getAll(url, successCb, failureCb);

                        return deferred.promise;
                    }
                }
            })
            .when('/patch', {
                templateUrl: 'partials/patch.html'
            })
            .when('/action', {
                templateUrl: 'partials/action.html'
            })
            .when('/query', {
                templateUrl: 'partials/query.html',
                controller: function ($scope, users, groups) {
                    $scope.users = users;
                    $scope.userName = true;
                    $scope.userMail = true;
                    $scope.showUsers = false;

                    $scope.groups = groups;
                    $scope.groupName = true;
                    $scope.groupDescription = true;
                    $scope.showGroups = false;
                },
                resolve: {
                    users: function ($q, crestResource) {
                        var url, deferred, successCb, theUsers, failureCb;

                        url = rsUrl + "users";

                        deferred = $q.defer();

                        successCb = function (result) {
                            if (angular.equals(result, {})) {
                                deferred.reject("No users found");
                            } else {
                                theUsers = result.result.sort(function (a, b) {
                                    return a.fullname[0].toString()
                                        .localeCompare(b.fullname[0].toString());
                                });
                                deferred.resolve(theUsers);
                            }
                        };

                        failureCb = function () {
                            deferred.reject("No users found");
                        };

                        crestResource.getAll(url, successCb, failureCb);

                        return deferred.promise;
                    },
                    groups: function ($q, crestResource) {
                        var url, deferred, successCb, theGroups, failureCb;

                        url = rsUrl + "groups";

                        deferred = $q.defer();

                        successCb = function (result) {
                            if (angular.equals(result, {})) {
                                deferred.reject("No groups found");
                            } else {
                                theGroups = result.result.sort(function (a, b) {
                                    return a.name.toString()
                                        .localeCompare(b.name.toString());
                                });
                                deferred.resolve(theGroups);
                            }
                        };

                        failureCb = function () {
                            deferred.reject("No groups found");
                        };

                        crestResource.getAll(url, successCb, failureCb);

                        return deferred.promise;
                    }
                }
            });
    });
