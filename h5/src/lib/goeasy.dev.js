(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["GoEasy"] = factory();
	else
		root["GoEasy"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.noop = exports.GoEasyDomainNumber = exports.goEasyArray = exports.UUID = exports.calibrator = void 0;
var Calibrator_1 = __webpack_require__(29);
exports.calibrator = Calibrator_1.calibrator;
var UUID_1 = __webpack_require__(87);
exports.UUID = UUID_1.UUID;
var GoEasyArray_1 = __webpack_require__(91);
exports.goEasyArray = GoEasyArray_1.goEasyArray;
var GoEasyDomainNumber_1 = __webpack_require__(52);
exports.GoEasyDomainNumber = GoEasyDomainNumber_1["default"];
function noop() {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
}
exports.noop = noop;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.Permission = void 0;
var Permission;
(function (Permission) {
    Permission["WRITE"] = "WRITE";
    Permission["READ"] = "READ";
    Permission["NONE"] = "NONE";
})(Permission = exports.Permission || (exports.Permission = {}));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var utils_1 = __webpack_require__(0);
var Permission_1 = __webpack_require__(1);
var Rocket = /** @class */ (function () {
    function Rocket(options) {
        var _this = this;
        this.permission = Permission_1.Permission.NONE;
        this.singleTimeout = 0;
        this.totalTimeout = 0;
        this.startTime = 0;
        this.complete = false;
        this.retried = 0;
        this.unique = false;
        this.uuid = utils_1.UUID.get();
        this.name = options.name;
        this.params = options.params;
        this.permission = options.permission;
        this.totalTimeout = options.totalTimeout;
        this.singleTimeout = options.singleTimeout;
        if (options.unique) {
            this.unique = options.unique;
        }
        this.success = function (ack) {
            if (!_this.complete) {
                _this.complete = true;
                options.success(ack);
            }
        };
        this.fail = function (ack) {
            if (!_this.complete) {
                _this.complete = true;
                options.fail(ack);
            }
        };
    }
    Rocket.prototype.start = function () {
        this.startTime = Date.now();
    };
    Rocket.prototype.isTimeout = function () {
        var expiredTime = this.startTime + this.totalTimeout;
        return expiredTime < Date.now();
    };
    return Rocket;
}());
exports["default"] = Rocket;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.SocketTimeout = void 0;
var SocketTimeout;
(function (SocketTimeout) {
    SocketTimeout[SocketTimeout["connect"] = 1500] = "connect";
    SocketTimeout[SocketTimeout["reconnectionDelayMax"] = 3000] = "reconnectionDelayMax";
    SocketTimeout[SocketTimeout["commonQuerySingle"] = 2500] = "commonQuerySingle";
    SocketTimeout[SocketTimeout["commonQueryTotal"] = 12000] = "commonQueryTotal";
    SocketTimeout[SocketTimeout["commonRequestSingle"] = 1700] = "commonRequestSingle";
    SocketTimeout[SocketTimeout["commonRequestTotal"] = 12000] = "commonRequestTotal";
    SocketTimeout[SocketTimeout["commonInfiniteSingle"] = 1700] = "commonInfiniteSingle";
    SocketTimeout[SocketTimeout["commonInfiniteTotal"] = 86400000] = "commonInfiniteTotal";
})(SocketTimeout = exports.SocketTimeout || (exports.SocketTimeout = {}));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.RocketTypes = void 0;
var RocketTypes;
(function (RocketTypes) {
    RocketTypes["authorize"] = "authorize";
    RocketTypes["manualDisconnect"] = "manualDisconnect";
    // pubsub
    RocketTypes["subscribe"] = "subscribe";
    RocketTypes["unsubscribe"] = "unsubscribe";
    RocketTypes["publish"] = "publish";
    RocketTypes["ack"] = "ack";
    RocketTypes["historyMessages"] = "historyMessages";
    RocketTypes["hereNow"] = "hereNow";
    RocketTypes["hereNowByUserIds"] = "hereNowByUserIds";
    //im
    RocketTypes["imLastConversations"] = "imLastConversations";
    RocketTypes["markPrivateMessageAsRead"] = "markPrivateMessageAsRead";
    RocketTypes["markGroupMessageAsRead"] = "markGroupMessageAsRead";
    RocketTypes["imGroupOnlineCount"] = "imGroupOnlineCount";
    RocketTypes["imHereNow"] = "imHereNow";
    RocketTypes["imGroupHereNow"] = "imGroupHereNow";
    RocketTypes["publishIM"] = "publishIM";
    RocketTypes["imHistory"] = "imHistory";
    RocketTypes["subscribeUserPresence"] = "subscribeUserPresence";
    RocketTypes["unsubscribeUserPresence"] = "unsubscribeUserPresence";
    RocketTypes["subscribeGroupPresence"] = "subscribeGroupPresence";
    RocketTypes["unsubscribeGroupPresence"] = "unsubscribeGroupPresence";
    RocketTypes["removeConversation"] = "removeConversation";
    RocketTypes["topConversation"] = "topConversation";
    RocketTypes["imData"] = "imData";
    RocketTypes["subscribeGroups"] = "subscribeGroups";
    RocketTypes["unsubscribeGroup"] = "unsubscribeGroup";
    RocketTypes["IM_DELETE_MESSAGE"] = "IM_DELETE_MESSAGE";
})(RocketTypes = exports.RocketTypes || (exports.RocketTypes = {}));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.GoEasyIM = exports.PubSub = exports.ConversationDTO = exports.MessageStatus = exports.Scene = exports.CallBackOptions = void 0;
var NetworkStatus_1 = __webpack_require__(12);
var GoEasySocket_1 = __webpack_require__(64);
var utils_1 = __webpack_require__(0);
var ModuleTypes_1 = __webpack_require__(96);
var IM_1 = __webpack_require__(7);
var History_1 = __webpack_require__(151);
var HereNow_1 = __webpack_require__(152);
var Publisher_1 = __webpack_require__(153);
var Subscriber_1 = __webpack_require__(154);
var PresenceSubscriber_1 = __webpack_require__(156);
var GoEasyNotification_1 = __webpack_require__(158);
var im_api_events_1 = __webpack_require__(9);
var callback_utils_1 = __webpack_require__(11);
var goeasy_event_center_1 = __webpack_require__(13);
// Lib version flag
var packageVersion = '2.3.0-9';
var CallBackOptions = /** @class */ (function () {
    function CallBackOptions() {
    }
    return CallBackOptions;
}());
exports.CallBackOptions = CallBackOptions;
// --------------- IM API Options ---------------
var Scene;
(function (Scene) {
    Scene["PRIVATE"] = "private";
    Scene["GROUP"] = "group";
    Scene["SYSTEM"] = "system";
})(Scene = exports.Scene || (exports.Scene = {}));
var MessageStatus;
(function (MessageStatus) {
    MessageStatus["NEW"] = "new";
    MessageStatus["SENDING"] = "sending";
    MessageStatus["SUCCESS"] = "success";
    MessageStatus["FAIL"] = "fail";
})(MessageStatus = exports.MessageStatus || (exports.MessageStatus = {}));
var ConversationDTO = /** @class */ (function () {
    function ConversationDTO() {
    }
    return ConversationDTO;
}());
exports.ConversationDTO = ConversationDTO;
/**
 * @description PubSub 类
 */
var PubSub = /** @class */ (function () {
    function PubSub(options) {
        this.neverConnect = true;
        this.options = options;
    }
    PubSub.prototype.initialGoEasySocket = function (goEasySocket) {
        this.goEasySocket = goEasySocket;
        this.subscriber.initialGoEasySocket();
        this.presence.initialGoEasySocket();
    };
    PubSub.prototype.initialBeforeConnect = function () {
        this.neverConnect = false;
        this.publisher = new Publisher_1["default"](this);
        this.subscriber = new Subscriber_1.Subscriber(this);
        this.histories = new History_1.History(this);
        this.presence = new PresenceSubscriber_1.PresenceSubscriber(this);
        this.hereNows = new HereNow_1.HereNow(this);
    };
    PubSub.prototype.validateOptions = function () {
        var options = this.options;
        if (!options.modules || !options.modules.includes(ModuleTypes_1.ModuleTypes.PUBSUB)) {
            throw ({
                code: 400,
                content: "Invalid options: module '" + ModuleTypes_1.ModuleTypes.PUBSUB + "' is not enabled"
            });
        }
    };
    PubSub.prototype.publish = function (options) {
        this.validateOptions();
        this.publisher.publish(options);
    };
    PubSub.prototype.subscribe = function (options) {
        this.validateOptions();
        this.subscriber.subscribe(options);
    };
    PubSub.prototype.unsubscribe = function (options) {
        this.validateOptions();
        this.subscriber.unsubscribe(options);
    };
    PubSub.prototype.subscribePresence = function (options) {
        this.validateOptions();
        this.presence.subscribePresence(options);
    };
    PubSub.prototype.unsubscribePresence = function (options) {
        this.validateOptions();
        this.presence.unsubscribePresence(options);
    };
    PubSub.prototype.history = function (options) {
        this.validateOptions();
        this.histories.get(options);
    };
    PubSub.prototype.hereNow = function (options) {
        this.validateOptions();
        this.hereNows.byChannel(options);
    };
    PubSub.prototype.hereNowByUserIds = function (options) {
        this.validateOptions();
        this.hereNows.byUserId(options);
    };
    return PubSub;
}());
exports.PubSub = PubSub;
/**
 * @description IM 聊天类
 */
var GoEasyIM = /** @class */ (function () {
    function GoEasyIM(options) {
        this.options = options;
    }
    GoEasyIM.prototype.initialBeforeConnect = function (user) {
        IM_1.im.initialBeforeConnect(user);
    };
    GoEasyIM.prototype.initialAfterConnect = function () {
        IM_1.im.initialAfterConnect();
    };
    GoEasyIM.prototype.initialGoEasySocket = function (goEasySocket) {
        IM_1.im.initialGoEasySocket(goEasySocket);
    };
    GoEasyIM.prototype.validateOptions = function () {
        var options = this.options;
        if (!options.modules || !options.modules.includes(ModuleTypes_1.ModuleTypes.IM)) {
            throw Error("Invalid options: module '" + ModuleTypes_1.ModuleTypes.IM + "' is not enabled");
        }
    };
    GoEasyIM.prototype.validateMessageToData = function (options) {
        if (!utils_1.calibrator.isObject(options.to)) {
            throw ({
                code: 400,
                content: 'TypeError: to requires an object.'
            });
        }
        if (!utils_1.calibrator.isObject(options.to.data)) {
            throw ({
                code: 400,
                content: 'TypeError: to.data requires an object.'
            });
        }
    };
    // ----------- External API ----------
    GoEasyIM.prototype.on = function (event, callBack) {
        this.validateOptions();
        IM_1.im.on(event, callBack);
    };
    GoEasyIM.prototype.createTextMessage = function (createOptions) {
        this.validateOptions();
        this.validateMessageToData(createOptions);
        return IM_1.im.createTextMessage(createOptions);
    };
    GoEasyIM.prototype.createImageMessage = function (createOptions) {
        this.validateOptions();
        this.validateMessageToData(createOptions);
        return IM_1.im.createImageMessage(createOptions);
    };
    GoEasyIM.prototype.createFileMessage = function (createOptions) {
        this.validateOptions();
        this.validateMessageToData(createOptions);
        return IM_1.im.createFileMessage(createOptions);
    };
    GoEasyIM.prototype.createAudioMessage = function (createOptions) {
        this.validateOptions();
        this.validateMessageToData(createOptions);
        return IM_1.im.createAudioMessage(createOptions);
    };
    GoEasyIM.prototype.createVideoMessage = function (createOptions) {
        this.validateOptions();
        this.validateMessageToData(createOptions);
        return IM_1.im.createVideoMessage(createOptions);
    };
    GoEasyIM.prototype.createCustomMessage = function (createOptions) {
        this.validateOptions();
        this.validateMessageToData(createOptions);
        return IM_1.im.createCustomMessage(createOptions);
    };
    // upload(options: UploadOptions) {
    //   this.validateOptions();
    //   im.upload(options.file, options.name, options.onProgress).then(res => {
    //     if (calibrator.isFunction(options.onSuccess)) {
    //       options.onSuccess(res);
    //     }
    //   }).catch(e => {
    //     if (calibrator.isFunction(options.onFailed)) {
    //       options.onFailed(e);
    //     }
    //   });
    // }
    GoEasyIM.prototype.sendMessage = function (sendOptions) {
        this.validateOptions();
        IM_1.im.sendMessage(sendOptions);
    };
    // recallMessage(messageRecallOptions: MessageRecallOptions) {
    //     this.validateOptions();
    //     im.recallMessage(messageRecallOptions);
    // }
    GoEasyIM.prototype.deleteMessage = function (messageDeleteOptions) {
        this.validateOptions();
        IM_1.im.deleteMessage(messageDeleteOptions);
    };
    GoEasyIM.prototype.markGroupMessageAsRead = function (options) {
        this.validateOptions();
        IM_1.im.groupMarkAsRead(options);
    };
    GoEasyIM.prototype.markPrivateMessageAsRead = function (options) {
        this.validateOptions();
        IM_1.im.privateMarkAsRead(options);
    };
    GoEasyIM.prototype.latestConversations = function (options) {
        this.validateOptions();
        IM_1.im.latestConversations().then(function (res) {
            callback_utils_1.CallbackUtils.onSuccess(options, res);
        })["catch"](function (e) {
            callback_utils_1.CallbackUtils.onFailed(options, e);
        });
    };
    GoEasyIM.prototype.removePrivateConversation = function (options) {
        this.validateOptions();
        IM_1.im.removePrivateConversation(options);
    };
    GoEasyIM.prototype.removeGroupConversation = function (options) {
        this.validateOptions();
        IM_1.im.removeGroupConversation(options);
    };
    GoEasyIM.prototype.topPrivateConversation = function (options) {
        this.validateOptions();
        IM_1.im.topPrivateConversation(options);
    };
    GoEasyIM.prototype.topGroupConversation = function (options) {
        this.validateOptions();
        IM_1.im.topGroupConversation(options);
    };
    GoEasyIM.prototype.history = function (options) {
        this.validateOptions();
        IM_1.im.history(options);
    };
    GoEasyIM.prototype.subscribeUserPresence = function (options) {
        this.validateOptions();
        IM_1.im.subscribeUserPresence(options.userIds).then(function (res) {
            if (utils_1.calibrator.isFunction(options.onSuccess)) {
                options.onSuccess(res);
            }
        })["catch"](function (e) {
            if (utils_1.calibrator.isFunction(options.onFailed)) {
                options.onFailed(e);
            }
        });
    };
    GoEasyIM.prototype.unsubscribeUserPresence = function (options) {
        this.validateOptions();
        IM_1.im.unsubscribeUserPresence(options.userId).then(function (res) {
            if (utils_1.calibrator.isFunction(options.onSuccess)) {
                options.onSuccess(res);
            }
        })["catch"](function (e) {
            if (utils_1.calibrator.isFunction(options.onFailed)) {
                options.onFailed(e);
            }
        });
    };
    GoEasyIM.prototype.hereNow = function (options) {
        this.validateOptions();
        IM_1.im.hereNow(options).then(function (res) {
            if (utils_1.calibrator.isFunction(options.onSuccess)) {
                options.onSuccess(res);
            }
        })["catch"](function (e) {
            if (utils_1.calibrator.isFunction(options.onFailed)) {
                options.onFailed(e);
            }
        });
    };
    GoEasyIM.prototype.subscribeGroup = function (options) {
        this.validateOptions();
        IM_1.im.subscribeGroup(options).then(function (res) {
            if (utils_1.calibrator.isFunction(options.onSuccess)) {
                options.onSuccess(res);
            }
        })["catch"](function (e) {
            if (utils_1.calibrator.isFunction(options.onFailed)) {
                options.onFailed(e);
            }
        });
    };
    GoEasyIM.prototype.unsubscribeGroup = function (options) {
        this.validateOptions();
        IM_1.im.unsubscribeGroup(options.groupId).then(function (res) {
            if (utils_1.calibrator.isFunction(options.onSuccess)) {
                options.onSuccess(res);
            }
        })["catch"](function (e) {
            if (utils_1.calibrator.isFunction(options.onFailed)) {
                options.onFailed(e);
            }
        });
    };
    GoEasyIM.prototype.subscribeGroupPresence = function (options) {
        this.validateOptions();
        IM_1.im.subscribeGroupPresence(options.groupIds).then(function (res) {
            if (utils_1.calibrator.isFunction(options.onSuccess)) {
                options.onSuccess(res);
            }
        })["catch"](function (e) {
            if (utils_1.calibrator.isFunction(options.onFailed)) {
                options.onFailed(e);
            }
        });
    };
    GoEasyIM.prototype.unsubscribeGroupPresence = function (options) {
        this.validateOptions();
        IM_1.im.unsubscribeGroupPresence(options.groupId).then(function (res) {
            if (utils_1.calibrator.isFunction(options.onSuccess)) {
                options.onSuccess(res);
            }
        })["catch"](function (e) {
            if (utils_1.calibrator.isFunction(options.onFailed)) {
                options.onFailed(e);
            }
        });
    };
    GoEasyIM.prototype.groupHereNow = function (options) {
        this.validateOptions();
        IM_1.im.groupHereNow(options.groupId).then(function (res) {
            if (utils_1.calibrator.isFunction(options.onSuccess)) {
                options.onSuccess(res);
            }
        })["catch"](function (e) {
            if (utils_1.calibrator.isFunction(options.onFailed)) {
                options.onFailed(e);
            }
        });
    };
    GoEasyIM.prototype.groupOnlineCount = function (options) {
        this.validateOptions();
        IM_1.im.groupOnlineCount(options.groupId).then(function (result) {
            if (utils_1.calibrator.isFunction(options.onSuccess)) {
                options.onSuccess(result);
            }
        })["catch"](function (e) {
            if (utils_1.calibrator.isFunction(options.onFailed)) {
                options.onFailed(e);
            }
        });
    };
    return GoEasyIM;
}());
exports.GoEasyIM = GoEasyIM;
/**
 * @description GoEasy 对外接口核心类
 */
var GoEasy = /** @class */ (function () {
    function GoEasy(options) {
        if (utils_1.calibrator.isDef(GoEasy.instance) &&
            GoEasy.instance.getConnectionStatus() !== NetworkStatus_1.NetworkStatus.DISCONNECTED) {
            return GoEasy.instance;
        }
        this.validateOptions(options);
        this.options = options;
        this.pubsub = new PubSub(this.options);
        this.im = new GoEasyIM(this.options);
        this.notification = new GoEasyNotification_1.GoEasyNotification(this.options.allowNotification);
    }
    GoEasy.getInstance = function (options) {
        if (utils_1.calibrator.isUndef(GoEasy.instance)) {
            GoEasy.instance = new GoEasy(options);
        }
        return GoEasy.instance;
    };
    GoEasy.prototype.connect = function (options) {
        if (this.getConnectionStatus() !== NetworkStatus_1.NetworkStatus.DISCONNECTED) { //必须是手动断开或未连接，才能connect
            if (utils_1.calibrator.isObject(options) && utils_1.calibrator.isFunction(options.onFailed)) {
                options.onFailed({
                    code: 408,
                    content: 'It is already connected, don\'t try again until disconnect() is called. '
                });
                return;
            }
        }
        this.confirmUserId(options);
        goeasy_event_center_1.GoEasyEventCenter.initial();
        this.notification.listenNewMessage();
        this.pubsub.initialBeforeConnect();
        this.im.initialBeforeConnect({ id: options.id, data: options.data });
        this.goEasySocket = new GoEasySocket_1["default"](this.options, options);
        this.im.initialGoEasySocket(this.goEasySocket);
        this.goEasySocket.connect(this.notification);
        this.pubsub.initialGoEasySocket(this.goEasySocket);
        this.im.initialAfterConnect();
    };
    GoEasy.prototype.disconnect = function (options) {
        this.goEasySocket.disconnect(options).then(function () {
            if (utils_1.calibrator.isObject(options) && utils_1.calibrator.isFunction(options.onSuccess)) {
                options.onSuccess();
            }
        })["catch"](function (e) {
            if (utils_1.calibrator.isObject(options) && utils_1.calibrator.isFunction(options.onFailed)) {
                options.onFailed(e);
            }
        });
    };
    GoEasy.prototype.getConnectionStatus = function () {
        if (this.goEasySocket) {
            return this.goEasySocket.getStatus();
        }
        return NetworkStatus_1.NetworkStatus.DISCONNECTED;
    };
    GoEasy.prototype.validateOptions = function (options) {
        var msg = '';
        if (!utils_1.calibrator.isObject(options)) {
            msg = "options is require an object.";
            throw Error(msg);
        }
        if (!utils_1.calibrator.isPrimitive(options.appkey) || options.appkey.length == 0) {
            msg = "Invalid options:'host' is empty.";
            throw Error(msg);
        }
        if (!utils_1.calibrator.isPrimitive(options.host) || options.host.length == 0) {
            msg = "Invalid options:'host' is empty.";
            throw Error(msg);
        }
        if (!utils_1.calibrator.isArray(options.modules)) {
            msg = "Invalid options: 'modules' must be nonempty array";
            throw Error(msg);
        }
        var supportModules = [ModuleTypes_1.ModuleTypes.IM, ModuleTypes_1.ModuleTypes.PUBSUB];
        var modules = options.modules.map(function (moduleName) {
            var name = moduleName.toUpperCase();
            if (!supportModules.includes(name)) {
                msg = "Invalid options: module '" + moduleName + "' is not support";
                throw Error(msg);
            }
            return name;
        });
        options.modules = modules;
    };
    GoEasy.prototype.onClickNotification = function (clickHandler) {
        this.notification.onClickNotification(clickHandler);
    };
    GoEasy.prototype.confirmUserId = function (options) {
        if (this.options.modules.includes(ModuleTypes_1.ModuleTypes.IM) && (utils_1.calibrator.isEmpty(options.id) || !utils_1.calibrator.isStringOrNumber(options.id))) {
            throw ({
                code: 400,
                content: 'TypeError: id requires number or string.'
            });
        }
        else if (typeof options.id === 'string' && options.id.length > 60) { //if use calibrator.isString() directly, options.id.length will be error
            throw ({
                code: 400,
                content: 'id over max length 60'
            });
        }
    };
    GoEasy.version = packageVersion;
    GoEasy.IM_EVENT = im_api_events_1.ImApiEvents;
    GoEasy.IM_SCENE = Scene;
    return GoEasy;
}());
exports["default"] = GoEasy;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.str = exports.noop = exports.GoEasyDomainNumber = exports.goEasyArray = exports.UUID = exports.calibrator = void 0;
var Str_1 = __webpack_require__(113);
exports.str = Str_1.str;
var utils_1 = __webpack_require__(0);
exports.calibrator = utils_1.calibrator;
exports.UUID = utils_1.UUID;
exports.goEasyArray = utils_1.goEasyArray;
exports.GoEasyDomainNumber = utils_1.GoEasyDomainNumber;
exports.noop = utils_1.noop;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.im = exports.IM = void 0;
var GoEasyUploader_1 = __webpack_require__(56);
var GroupMessageSubscriber_1 = __webpack_require__(107);
var GroupOnlineCount_1 = __webpack_require__(108);
var GroupPresenceSubscriber_1 = __webpack_require__(109);
var UserPresenceSubscriber_1 = __webpack_require__(110);
var UserHereNow_1 = __webpack_require__(111);
var GroupHereNow_1 = __webpack_require__(112);
var IMReceiver_1 = __webpack_require__(114);
var DataCache_1 = __webpack_require__(116);
var IMMessageBuilder_1 = __webpack_require__(117);
var IMMessageSender_1 = __webpack_require__(132);
var EventCenter_1 = __webpack_require__(137);
var conversation_list_1 = __webpack_require__(138);
var MessageType_1 = __webpack_require__(18);
var callback_utils_1 = __webpack_require__(11);
var IM = /** @class */ (function () {
    function IM() {
        this._event = EventCenter_1.eventCenter;
    }
    IM.prototype.on = function (event, fn) {
        this._event.on(event, fn);
    };
    IM.prototype.initialBeforeConnect = function (user) {
        IM.userId = user.id;
        IM.userData = user.data;
        this._dataCache = new DataCache_1["default"](user);
        this.messageSender = new IMMessageSender_1["default"]();
        this.goEasyUploader = new GoEasyUploader_1.GoEasyUploader();
        this._userHereNow = new UserHereNow_1["default"](this);
        this._groupHereNow = new GroupHereNow_1["default"](this);
        this._groupOnlineCount = new GroupOnlineCount_1["default"](this);
    };
    IM.prototype.initialAfterConnect = function () {
        this._iMReceiver = new IMReceiver_1["default"](this);
        this.conversations = new conversation_list_1["default"]();
        this._groupPresenceSubscriber = new GroupPresenceSubscriber_1["default"](this);
        this.groupMessageSubscriber = new GroupMessageSubscriber_1["default"]();
        this._userPresenceSubscriber = new UserPresenceSubscriber_1["default"](this);
    };
    IM.prototype.initialGoEasySocket = function (goEasySocket) {
        this._goEasySocket = goEasySocket;
    };
    IM.prototype["catch"] = function (functionObj, callbackOptions) {
        try {
            functionObj();
        }
        catch (err) {
            callback_utils_1.CallbackUtils.onFailed(callbackOptions, err);
        }
    };
    IM.prototype.createTextMessage = function (createOptions) {
        return IMMessageBuilder_1.iMMessageBuilder.buildMessage(MessageType_1.MessageType.TEXT, createOptions);
    };
    IM.prototype.createImageMessage = function (createOptions) {
        return IMMessageBuilder_1.iMMessageBuilder.buildMessage(MessageType_1.MessageType.IMAGE, createOptions);
    };
    IM.prototype.createFileMessage = function (createOptions) {
        return IMMessageBuilder_1.iMMessageBuilder.buildMessage(MessageType_1.MessageType.FILE, createOptions);
    };
    IM.prototype.createAudioMessage = function (createOptions) {
        return IMMessageBuilder_1.iMMessageBuilder.buildMessage(MessageType_1.MessageType.AUDIO, createOptions);
    };
    IM.prototype.createVideoMessage = function (createOptions) {
        return IMMessageBuilder_1.iMMessageBuilder.buildMessage(MessageType_1.MessageType.VIDEO, createOptions);
    };
    IM.prototype.createCustomMessage = function (createOptions) {
        return IMMessageBuilder_1.iMMessageBuilder.buildMessage(createOptions.type, createOptions);
    };
    // 会话
    IM.prototype.latestConversations = function () {
        if (this.conversations) {
            return this.conversations.latestConversations();
        }
        else {
            return Promise.reject({
                code: 500,
                content: "Please connect GoEasyIM first."
            });
        }
    };
    IM.prototype.groupMarkAsRead = function (options) {
        var _this = this;
        this["catch"](function () {
            return _this.conversations.groupMarkAsRead(options);
        }, options);
    };
    IM.prototype.privateMarkAsRead = function (options) {
        var _this = this;
        this["catch"](function () {
            return _this.conversations.privateMarkAsRead(options);
        }, options);
    };
    IM.prototype.removePrivateConversation = function (options) {
        return this.conversations.removePrivateConversation(options);
    };
    IM.prototype.removeGroupConversation = function (options) {
        return this.conversations.removeGroupConversation(options);
    };
    IM.prototype.topPrivateConversation = function (options) {
        return this.conversations.topPrivateConversation(options);
    };
    IM.prototype.topGroupConversation = function (options) {
        return this.conversations.topGroupConversation(options);
    };
    IM.prototype.history = function (options) {
        var _this = this;
        this["catch"](function () {
            _this.conversations.history(options);
        }, options);
    };
    IM.prototype.upload = function (file, name, onProgress, messageType) {
        return this.goEasyUploader.upload(file, name, onProgress, messageType);
    };
    //系统
    IM.prototype.sendSystemMessage = function (to, message) {
        // return this.messageSender.send(to, message, Scene.SYSTEM) //  todo: 没用到的方法
    };
    IM.prototype.sendMessage = function (sendOptions) {
        this.messageSender.send(sendOptions);
    };
    //私聊
    IM.prototype.sendPrivateMessage = function (to, message) {
        // return this.messageSender.send(to, message, Scene.PRIVATE) //  todo: 没用到的方法
    };
    IM.prototype.subscribeUserPresence = function (userIds) {
        return this._userPresenceSubscriber.presence(userIds);
    };
    IM.prototype.unsubscribeUserPresence = function (userId) {
        return this._userPresenceSubscriber.unPresence(userId);
    };
    IM.prototype.hereNow = function (options) {
        return this._userHereNow.hereNow(options);
    };
    //
    // recallMessage(messageRecallOptions) {
    //     this.conversations.recallMessage(messageRecallOptions);
    // }
    IM.prototype.deleteMessage = function (options) {
        var _this = this;
        this["catch"](function () {
            _this.conversations.deleteMessage(options);
        }, options);
    };
    //群聊
    IM.prototype.sendGroupMessage = function (groupId, message) {
        //     return this.messageSender.send(groupId, message, Scene.GROUP) // todo:没用到的方法
    };
    IM.prototype.subscribeGroup = function (options) {
        return this.groupMessageSubscriber.subscribe(options);
    };
    IM.prototype.unsubscribeGroup = function (groupId) {
        return this.groupMessageSubscriber.unsubscribe(groupId);
    };
    IM.prototype.subscribeGroupPresence = function (groupIds) {
        return this._groupPresenceSubscriber.presence(groupIds);
    };
    IM.prototype.unsubscribeGroupPresence = function (groupId) {
        return this._groupPresenceSubscriber.unPresence(groupId);
    };
    IM.prototype.groupHereNow = function (groupId) {
        return this._groupHereNow.hereNow(groupId);
    };
    IM.prototype.groupOnlineCount = function (groupId) {
        return this._groupOnlineCount.get(groupId);
    };
    return IM;
}());
exports.IM = IM;
var im = new IM();
exports.im = im;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  return function () {};
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.ImApiEvents = void 0;
var ImApiEvents;
(function (ImApiEvents) {
    ImApiEvents["PRIVATE_MESSAGE_RECEIVED"] = "PRIVATE_MESSAGE_RECEIVED";
    ImApiEvents["PRIVATE_MESSAGE_READ"] = "PRIVATE_MESSAGE_READ";
    // MESSAGE_RECALLED = 'MESSAGE_RECALLED',
    ImApiEvents["GROUP_MESSAGE_RECEIVED"] = "GROUP_MESSAGE_RECEIVED";
    ImApiEvents["SYSTEM_MESSAGE_RECEIVED"] = "SYSTEM_MESSAGE_RECEIVED";
    ImApiEvents["CONVERSATIONS_UPDATED"] = "CONVERSATIONS_UPDATED";
    ImApiEvents["USER_PRESENCE"] = "USER_PRESENCE";
    ImApiEvents["GROUP_PRESENCE"] = "GROUP_PRESENCE";
    ImApiEvents["MESSAGE_DELETED"] = "MESSAGE_DELETED";
})(ImApiEvents = exports.ImApiEvents || (exports.ImApiEvents = {}));


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.AbstractPayloadBuilder = void 0;
var AbstractPayloadBuilder = /** @class */ (function () {
    function AbstractPayloadBuilder() {
    }
    AbstractPayloadBuilder.prototype.build = function (buildOptions) {
        this.validate(buildOptions.createOptions);
        var messagePayload = this.create();
        this.setPayload(buildOptions, messagePayload);
        return messagePayload;
    };
    return AbstractPayloadBuilder;
}());
exports.AbstractPayloadBuilder = AbstractPayloadBuilder;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.CallbackUtils = void 0;
var Calibrator_1 = __webpack_require__(29);
var CallbackUtils = /** @class */ (function () {
    function CallbackUtils() {
    }
    CallbackUtils.onSuccess = function (callbackOptions, result) {
        if (Calibrator_1.calibrator.isFunction(callbackOptions.onSuccess)) {
            callbackOptions.onSuccess(result);
        }
    };
    CallbackUtils.onFailed = function (callbackOptions, error) {
        if (Calibrator_1.calibrator.isObject(callbackOptions) && Calibrator_1.calibrator.isFunction(callbackOptions.onFailed)) {
            callbackOptions.onFailed(error);
        }
        else {
            throw error;
        }
    };
    CallbackUtils.validateCallbackOptions = function (callbackOptions) {
        if (Calibrator_1.calibrator.isUndef(callbackOptions) || !Calibrator_1.calibrator.isObject(callbackOptions)) {
            throw {
                code: 400,
                content: "bad parameters"
            };
        }
    };
    return CallbackUtils;
}());
exports.CallbackUtils = CallbackUtils;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.NetworkStatus = void 0;
var NetworkStatus;
(function (NetworkStatus) {
    NetworkStatus["DISCONNECTED"] = "disconnected";
    NetworkStatus["DISCONNECTING"] = "disconnecting";
    NetworkStatus["CONNECTING"] = "connecting";
    NetworkStatus["CONNECTED"] = "connected";
    NetworkStatus["RECONNECTING"] = "reconnecting";
    NetworkStatus["RECONNECTED"] = "reconnected";
    NetworkStatus["EXPIRED_RECONNECTED"] = "reconnected";
    NetworkStatus["CONNECT_FAILED"] = "connect_failed"; //连接失败
})(NetworkStatus = exports.NetworkStatus || (exports.NetworkStatus = {}));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.GoEasyEventCenter = void 0;
var EmitterEventDriver_1 = __webpack_require__(115);
var GoEasyEventCenter = /** @class */ (function () {
    function GoEasyEventCenter() {
    }
    GoEasyEventCenter.initial = function () {
        this.eventDriver = new EmitterEventDriver_1.EmitterEventDriver();
    };
    GoEasyEventCenter.on = function (eventname, callback) {
        this.eventDriver.on(eventname, callback);
    };
    GoEasyEventCenter.fire = function (eventname, data) {
        this.eventDriver.fire(eventname, data);
    };
    return GoEasyEventCenter;
}());
exports.GoEasyEventCenter = GoEasyEventCenter;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */
var keys = __webpack_require__(72);
var hasBinary = __webpack_require__(45);
// var sliceBuffer = require('arraybuffer.slice');
var after = __webpack_require__(76);
var utf8 = __webpack_require__(77);

// var base64encoder;
// if (typeof ArrayBuffer !== 'undefined') {
//   base64encoder = require('base64-arraybuffer');
// }

/**
 * Check if we are running an android browser. That requires us to use
 * ArrayBuffer with polling transports...
 *
 * http://ghinda.net/jpeg-blob-ajax-android/
 */

var isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);

/**
 * Check if we are running in PhantomJS.
 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
 * https://github.com/ariya/phantomjs/issues/11395
 * @type boolean
 */
var isPhantomJS = typeof navigator !== 'undefined' && /PhantomJS/i.test(navigator.userAgent);

/**
 * When true, avoids using Blobs to encode payloads.
 * @type boolean
 */
var dontSendBlobs = isAndroid || isPhantomJS;

/**
 * Current protocol version.
 */

exports.protocol = 3;

/**
 * Packet types.
 */

var packets = exports.packets = {
  open: 0 // non-ws
  , close: 1 // non-ws
  , ping: 2,
  pong: 3,
  message: 4,
  upgrade: 5,
  noop: 6
};

var packetslist = keys(packets);

/**
 * Premade error packet.
 */

var err = { type: 'error', data: 'parser error' };

/**
 * Create a blob api even for blob builder when vendor prefixes exist
 */

var Blob = __webpack_require__(78);

/**
 * Encodes a packet.
 *
 *     <packet type id> [ <data> ]
 *
 * Example:
 *
 *     5hello world
 *     3
 *     4
 *
 * Binary is encoded in an identical principle
 *
 * @api private
 */

exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
  if (typeof supportsBinary === 'function') {
    callback = supportsBinary;
    supportsBinary = false;
  }

  if (typeof utf8encode === 'function') {
    callback = utf8encode;
    utf8encode = null;
  }

  var data = packet.data === undefined ? undefined : packet.data.buffer || packet.data;

  // if (typeof ArrayBuffer !== 'undefined' && data instanceof ArrayBuffer) {
  //   return encodeArrayBuffer(packet, supportsBinary, callback);
  // } else if (typeof Blob !== 'undefined' && data instanceof Blob) {
  //   return encodeBlob(packet, supportsBinary, callback);
  // }
  //
  // // might be an object with { base64: true, data: dataAsBase64String }
  // if (data && data.base64) {
  //   return encodeBase64Object(packet, callback);
  // }

  // Sending data as a utf-8 string
  var encoded = packets[packet.type];

  // data fragment is optional
  if (undefined !== packet.data) {
    encoded += utf8encode ? utf8.encode(String(packet.data), { strict: false }) : String(packet.data);
  }

  return callback('' + encoded);
};

// function encodeBase64Object(packet, callback) {
//   // packet data is an object { base64: true, data: dataAsBase64String }
//   var message = 'b' + exports.packets[packet.type] + packet.data.data;
//   return callback(message);
// }

/**
 * Encode packet helpers for binary types
 */

// function encodeArrayBuffer(packet, supportsBinary, callback) {
//   if (!supportsBinary) {
//     return exports.encodeBase64Packet(packet, callback);
//   }
//
//   var data = packet.data;
//   var contentArray = new Uint8Array(data);
//   var resultBuffer = new Uint8Array(1 + data.byteLength);
//
//   resultBuffer[0] = packets[packet.type];
//   for (var i = 0; i < contentArray.length; i++) {
//     resultBuffer[i+1] = contentArray[i];
//   }
//
//   return callback(resultBuffer.buffer);
// }
//
// function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
//   if (!supportsBinary) {
//     return exports.encodeBase64Packet(packet, callback);
//   }
//
//   var fr = new FileReader();
//   fr.onload = function() {
//     exports.encodePacket({ type: packet.type, data: fr.result }, supportsBinary, true, callback);
//   };
//   return fr.readAsArrayBuffer(packet.data);
// }
//
// function encodeBlob(packet, supportsBinary, callback) {
//   if (!supportsBinary) {
//     return exports.encodeBase64Packet(packet, callback);
//   }
//
//   if (dontSendBlobs) {
//     return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
//   }
//
//   var length = new Uint8Array(1);
//   length[0] = packets[packet.type];
//   var blob = new Blob([length.buffer, packet.data]);
//
//   return callback(blob);
// }

/**
 * Encodes a packet with binary data in a base64 string
 *
 * @param {Object} packet, has `type` and `data`
 * @return {String} base64 encoded message
 */

// exports.encodeBase64Packet = function(packet, callback) {
//   var message = 'b' + exports.packets[packet.type];
//   if (typeof Blob !== 'undefined' && packet.data instanceof Blob) {
//     var fr = new FileReader();
//     fr.onload = function() {
//       var b64 = fr.result.split(',')[1];
//       callback(message + b64);
//     };
//     return fr.readAsDataURL(packet.data);
//   }
//
//   var b64data;
//   try {
//     b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
//   } catch (e) {
//     // iPhone Safari doesn't let you apply with typed arrays
//     var typed = new Uint8Array(packet.data);
//     var basic = new Array(typed.length);
//     for (var i = 0; i < typed.length; i++) {
//       basic[i] = typed[i];
//     }
//     b64data = String.fromCharCode.apply(null, basic);
//   }
//   message += btoa(b64data);
//   return callback(message);
// };

/**
 * Decodes a packet. Changes format to Blob if requested.
 *
 * @return {Object} with `type` and `data` (if any)
 * @api private
 */

exports.decodePacket = function (data, binaryType, utf8decode) {
  if (data === undefined) {
    return err;
  }
  // String data
  if (typeof data === 'string') {
    // if (data.charAt(0) === 'b') {
    //   return exports.decodeBase64Packet(data.substr(1), binaryType);
    // }

    if (utf8decode) {
      data = tryDecode(data);
      if (data === false) {
        return err;
      }
    }
    var type = data.charAt(0);

    if (Number(type) != type || !packetslist[type]) {
      return err;
    }

    if (data.length > 1) {
      return { type: packetslist[type], data: data.substring(1) };
    } else {
      return { type: packetslist[type] };
    }
  }

  var asArray = new Uint8Array(data);
  var type = asArray[0];
  var rest = sliceBuffer(data, 1);
  if (Blob && binaryType === 'blob') {
    rest = new Blob([rest]);
  }
  return { type: packetslist[type], data: rest };
};

function tryDecode(data) {
  try {
    data = utf8.decode(data, { strict: false });
  } catch (e) {
    return false;
  }
  return data;
}

/**
 * Decodes a packet encoded in a base64 string
 *
 * @param {String} base64 encoded message
 * @return {Object} with `type` and `data` (if any)
 */

// exports.decodeBase64Packet = function(msg, binaryType) {
//   var type = packetslist[msg.charAt(0)];
//   if (!base64encoder) {
//     return { type: type, data: { base64: true, data: msg.substr(1) } };
//   }
//
//   var data = base64encoder.decode(msg.substr(1));
//
//   if (binaryType === 'blob' && Blob) {
//     data = new Blob([data]);
//   }
//
//   return { type: type, data: data };
// };

/**
 * Encodes multiple messages (payload).
 *
 *     <length>:data
 *
 * Example:
 *
 *     11:hello world2:hi
 *
 * If any contents are binary, they will be encoded as base64 strings. Base64
 * encoded strings are marked with a b before the length specifier
 *
 * @param {Array} packets
 * @api private
 */

exports.encodePayload = function (packets, supportsBinary, callback) {
  if (typeof supportsBinary === 'function') {
    callback = supportsBinary;
    supportsBinary = null;
  }

  var isBinary = hasBinary(packets);
  //
  // if (supportsBinary && isBinary) {
  //   if (Blob && !dontSendBlobs) {
  //     return exports.encodePayloadAsBlob(packets, callback);
  //   }
  //
  //   return exports.encodePayloadAsArrayBuffer(packets, callback);
  // }

  if (!packets.length) {
    return callback('0:');
  }

  function setLengthHeader(message) {
    return message.length + ':' + message;
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, !isBinary ? false : supportsBinary, true, function (message) {
      doneCallback(null, setLengthHeader(message));
    });
  }

  map(packets, encodeOne, function (err, results) {
    return callback(results.join(''));
  });
};

/**
 * Async array map using after
 */

function map(ary, each, done) {
  var result = new Array(ary.length);
  var next = after(ary.length, done);

  var eachWithIndex = function eachWithIndex(i, el, cb) {
    each(el, function (error, msg) {
      result[i] = msg;
      cb(error, result);
    });
  };

  for (var i = 0; i < ary.length; i++) {
    eachWithIndex(i, ary[i], next);
  }
}

/*
 * Decodes data when a payload is maybe expected. Possible binary contents are
 * decoded from their base64 representation
 *
 * @param {String} data, callback method
 * @api public
 */

exports.decodePayload = function (data, binaryType, callback) {
  // if (typeof data !== 'string') {
  //   return exports.decodePayloadAsBinary(data, binaryType, callback);
  // }

  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var packet;
  if (data === '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

  var length = '',
      n,
      msg;

  for (var i = 0, l = data.length; i < l; i++) {
    var chr = data.charAt(i);

    if (chr !== ':') {
      length += chr;
      continue;
    }

    if (length === '' || length != (n = Number(length))) {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    msg = data.substr(i + 1, n);

    if (length != msg.length) {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    if (msg.length) {
      packet = exports.decodePacket(msg, binaryType, true);

      if (err.type === packet.type && err.data === packet.data) {
        // parser error in individual packet - ignoring payload
        return callback(err, 0, 1);
      }

      var ret = callback(packet, i + n, l);
      if (false === ret) return;
    }

    // advance cursor
    i += n;
    length = '';
  }

  if (length !== '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }
};

/**
 * Encodes multiple messages (payload) as binary.
 *
 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
 * 255><data>
 *
 * Example:
 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
 *
 * @param {Array} packets
 * @return {ArrayBuffer} encoded payload
 * @api private
 */

// exports.encodePayloadAsArrayBuffer = function(packets, callback) {
//   if (!packets.length) {
//     return callback(new ArrayBuffer(0));
//   }
//
//   function encodeOne(packet, doneCallback) {
//     exports.encodePacket(packet, true, true, function(data) {
//       return doneCallback(null, data);
//     });
//   }
//
//   map(packets, encodeOne, function(err, encodedPackets) {
//     var totalLength = encodedPackets.reduce(function(acc, p) {
//       var len;
//       if (typeof p === 'string'){
//         len = p.length;
//       } else {
//         len = p.byteLength;
//       }
//       return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
//     }, 0);
//
//     var resultArray = new Uint8Array(totalLength);
//
//     var bufferIndex = 0;
//     encodedPackets.forEach(function(p) {
//       var isString = typeof p === 'string';
//       var ab = p;
//       if (isString) {
//         var view = new Uint8Array(p.length);
//         for (var i = 0; i < p.length; i++) {
//           view[i] = p.charCodeAt(i);
//         }
//         ab = view.buffer;
//       }
//
//       if (isString) { // not true binary
//         resultArray[bufferIndex++] = 0;
//       } else { // true binary
//         resultArray[bufferIndex++] = 1;
//       }
//
//       var lenStr = ab.byteLength.toString();
//       for (var i = 0; i < lenStr.length; i++) {
//         resultArray[bufferIndex++] = parseInt(lenStr[i]);
//       }
//       resultArray[bufferIndex++] = 255;
//
//       var view = new Uint8Array(ab);
//       for (var i = 0; i < view.length; i++) {
//         resultArray[bufferIndex++] = view[i];
//       }
//     });
//
//     return callback(resultArray.buffer);
//   });
// };

/**
 * Encode as Blob
 */

// exports.encodePayloadAsBlob = function(packets, callback) {
//   function encodeOne(packet, doneCallback) {
//     exports.encodePacket(packet, true, true, function(encoded) {
//       var binaryIdentifier = new Uint8Array(1);
//       binaryIdentifier[0] = 1;
//       if (typeof encoded === 'string') {
//         var view = new Uint8Array(encoded.length);
//         for (var i = 0; i < encoded.length; i++) {
//           view[i] = encoded.charCodeAt(i);
//         }
//         encoded = view.buffer;
//         binaryIdentifier[0] = 0;
//       }
//
//       var len = (encoded instanceof ArrayBuffer)
//         ? encoded.byteLength
//         : encoded.size;
//
//       var lenStr = len.toString();
//       var lengthAry = new Uint8Array(lenStr.length + 1);
//       for (var i = 0; i < lenStr.length; i++) {
//         lengthAry[i] = parseInt(lenStr[i]);
//       }
//       lengthAry[lenStr.length] = 255;
//
//       if (Blob) {
//         var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
//         doneCallback(null, blob);
//       }
//     });
//   }
//
//   map(packets, encodeOne, function(err, results) {
//     return callback(new Blob(results));
//   });
// };

/*
 * Decodes data when a payload is maybe expected. Strings are decoded by
 * interpreting each byte as a key code for entries marked to start with 0. See
 * description of encodePayloadAsBinary
 *
 * @param {ArrayBuffer} data, callback method
 * @api public
 */

// exports.decodePayloadAsBinary = function (data, binaryType, callback) {
//   if (typeof binaryType === 'function') {
//     callback = binaryType;
//     binaryType = null;
//   }
//
//   var bufferTail = data;
//   var buffers = [];
//
//   while (bufferTail.byteLength > 0) {
//     var tailArray = new Uint8Array(bufferTail);
//     var isString = tailArray[0] === 0;
//     var msgLength = '';
//
//     for (var i = 1; ; i++) {
//       if (tailArray[i] === 255) break;
//
//       // 310 = char length of Number.MAX_VALUE
//       if (msgLength.length > 310) {
//         return callback(err, 0, 1);
//       }
//
//       msgLength += tailArray[i];
//     }
//
//     bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
//     msgLength = parseInt(msgLength);
//
//     var msg = sliceBuffer(bufferTail, 0, msgLength);
//     if (isString) {
//       try {
//         msg = String.fromCharCode.apply(null, new Uint8Array(msg));
//       } catch (e) {
//         // iPhone Safari doesn't let you apply to typed arrays
//         var typed = new Uint8Array(msg);
//         msg = '';
//         for (var i = 0; i < typed.length; i++) {
//           msg += String.fromCharCode(typed[i]);
//         }
//       }
//     }
//
//     buffers.push(msg);
//     bufferTail = sliceBuffer(bufferTail, msgLength);
//   }
//
//   var total = buffers.length;
//   buffers.forEach(function(buffer, i) {
//     callback(exports.decodePacket(buffer, binaryType, true), i, total);
//   });
// };

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.RemoteEvents = void 0;
var RemoteEvents;
(function (RemoteEvents) {
    RemoteEvents["message"] = "message";
    RemoteEvents["imMessage"] = "imMessage";
    RemoteEvents["userPresence"] = "userPresence";
    RemoteEvents["groupPresence"] = "groupPresence";
    RemoteEvents["IM_MSG_READ"] = "IM_MSG_READ";
    // IM_MSG_RECALLED = 'IM_MSG_RECALLED',
    RemoteEvents["IM_MSG_DELETED"] = "IM_MSG_DELETED";
})(RemoteEvents = exports.RemoteEvents || (exports.RemoteEvents = {}));


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.FrameworkDetector = exports.Framework = void 0;
var Framework;
(function (Framework) {
    Framework["UNIAPP"] = "UNIAPP";
    Framework["REACT_NATIVE"] = "REACT_NATIVE";
    Framework["TARO"] = "TARO";
    Framework["IONIC"] = "IONIC";
    // NATIVE APPLET
    Framework["NATIVE_APPLET_WX"] = "NATIVE_APPLET_WX";
    Framework["NATIVE_APPLET_ALIPAY"] = "NATIVE_APPLET_ALIPAY";
    Framework["UNKNOWN"] = "UNKNOWN";
})(Framework = exports.Framework || (exports.Framework = {}));
;
var FrameworkDetector = /** @class */ (function () {
    function FrameworkDetector() {
        var _a, e_1, _b;
        this.framework = null;
        this.methods = (_a = {},
            _a[Framework.UNIAPP] = this.isUniApp,
            _a[Framework.REACT_NATIVE] = this.isReactNative,
            // [Framework.TARO]: this.isTaro,
            _a[Framework.NATIVE_APPLET_WX] = this.isWXApplet,
            _a);
        var methods = this.methods;
        var keys = Object.keys(methods);
        try {
            for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                var key = keys_1_1.value;
                var method = methods[key];
                if (method()) {
                    this.framework = key;
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (keys_1_1 && !keys_1_1.done && (_b = keys_1["return"])) _b.call(keys_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.framework = this.framework || Framework.UNKNOWN;
        console.log('FrameworkDetector constructor - ', this.framework);
    }
    FrameworkDetector.currentFramework = function () {
        return this.instance.framework;
    };
    /**************  detection framework methods **************/
    FrameworkDetector.prototype.isUniApp = function () {
        return (typeof uni === 'object' &&
            (uni.getSystemInfoSync ? true : false));
    };
    FrameworkDetector.prototype.isReactNative = function () {
        return typeof global !== 'undefined' && global.__fbGenNativeModule;
    };
    FrameworkDetector.prototype.isTaro = function () {
        // typeof Taro, typeof taro   => undefined undefined
        return false;
    };
    FrameworkDetector.prototype.isWXApplet = function () {
        return (typeof wx !== 'undefined' &&
            wx.getLocation &&
            typeof uni === 'undefined');
    };
    FrameworkDetector.instance = new FrameworkDetector();
    return FrameworkDetector;
}());
exports.FrameworkDetector = FrameworkDetector;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(26)))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    MessageType["TEXT"] = "text";
    MessageType["IMAGE"] = "image";
    MessageType["FILE"] = "file";
    MessageType["VIDEO"] = "video";
    MessageType["AUDIO"] = "audio";
})(MessageType = exports.MessageType || (exports.MessageType = {}));


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.FileMessagePayload = void 0;
var AbstractMessagePayload_1 = __webpack_require__(23);
var FileMessagePayload = /** @class */ (function (_super) {
    __extends(FileMessagePayload, _super);
    function FileMessagePayload() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.contentType = "";
        _this.name = "";
        _this.size = 0;
        _this.url = "";
        return _this;
    }
    return FileMessagePayload;
}(AbstractMessagePayload_1.AbstractMessagePayload));
exports.FileMessagePayload = FileMessagePayload;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */

exports.encode = function (obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};

/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */

exports.decode = function(qs){
  var qry = {};
  var pairs = qs.split('&');
  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.IM_INTERNAL_EVENTS = void 0;
var IM_INTERNAL_EVENTS;
(function (IM_INTERNAL_EVENTS) {
    IM_INTERNAL_EVENTS["MESSAGE_SENDING"] = "IM_INTERNAL_MESSAGE_SENDING";
    IM_INTERNAL_EVENTS["MESSAGE_SEND_SUCCESS"] = "IM_INTERNAL_MESSAGE_SEND_SUCCESS";
    IM_INTERNAL_EVENTS["MESSAGE_RECEIVED"] = "IM_INTERNAL_MESSAGE_RECEIVED";
    IM_INTERNAL_EVENTS["MESSAGE_DELETED"] = "IM_INTERNAL_MESSAGE_DELETED";
})(IM_INTERNAL_EVENTS = exports.IM_INTERNAL_EVENTS || (exports.IM_INTERNAL_EVENTS = {}));


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.AbstractMessage = void 0;
var AbstractMessage = /** @class */ (function () {
    function AbstractMessage() {
    }
    AbstractMessage.prototype.clearUseLessAttribute = function () {
        delete this.buildOptions;
    };
    return AbstractMessage;
}());
exports.AbstractMessage = AbstractMessage;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.AbstractMessagePayload = void 0;
var AbstractMessagePayload = /** @class */ (function () {
    function AbstractMessagePayload() {
    }
    return AbstractMessagePayload;
}());
exports.AbstractMessagePayload = AbstractMessagePayload;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.Target = void 0;
var GoEasy_1 = __webpack_require__(5);
var IM_1 = __webpack_require__(7);
var utils_1 = __webpack_require__(6);
// import {MessageRecalledEvent} from "../conversations/recall/MessageRecalledEvent";
var Target = /** @class */ (function () {
    function Target(scene, id) {
        this.scene = scene;
        this.id = id;
    }
    Target.byScene = function (scene, targetId) {
        if (utils_1.calibrator.isNumber(targetId)) {
            return new Target(scene, targetId.toString());
        }
        return new Target(scene, targetId);
    };
    Target.byIds = function (userId, groupId) {
        var scene = GoEasy_1.Scene.PRIVATE;
        var targetId = userId;
        if (groupId) {
            scene = GoEasy_1.Scene.GROUP;
            targetId = groupId;
        }
        return Target.byScene(scene, targetId);
    };
    Target.byIMMessage = function (message) {
        var targetId;
        var scene = message.scene();
        if (scene === GoEasy_1.Scene.PRIVATE) {
            var senderId = message.senderId;
            var receiverId = message.targetId();
            targetId = IM_1.IM.userId === senderId ? receiverId : senderId;
        }
        else if (scene === GoEasy_1.Scene.GROUP) {
            targetId = message.targetId();
        }
        return new Target(scene, targetId);
    };
    Target.byMessageReadRemoteEvent = function (event) {
        var scene = event.scene;
        var receiverId = event.targetId;
        var markerId = event.markerId;
        var targetId;
        if (scene === GoEasy_1.Scene.PRIVATE) {
            targetId = IM_1.IM.userId === markerId ? receiverId : markerId;
        }
        else if (scene === GoEasy_1.Scene.GROUP) {
            targetId = receiverId;
        }
        return new Target(scene, targetId);
    };
    // static byMessageRecalledEvent(event: MessageRecalledEvent): Target {
    //     let targetId: string;
    //     let scene: Scene = event.type;
    //     if (scene === Scene.PRIVATE) {
    //         let recallerId = event.recallerId;
    //         targetId = IM.userId === recallerId ? event.targetId : recallerId;
    //     } else if (scene === Scene.GROUP) {
    //         targetId = event.targetId;
    //     }
    //     return new Target(scene, targetId);
    // }
    Target.byIMMessageDeletedEvent = function (event) {
        var scene = event.scene;
        var deleterId = event.deleterId;
        if (scene === GoEasy_1.Scene.PRIVATE) {
            var targetId = IM_1.IM.userId === deleterId ? event.targetId : deleterId;
            return new Target(scene, targetId);
        }
        else if (scene === GoEasy_1.Scene.GROUP) {
            return new Target(scene, event.targetId);
        }
        else if (scene === GoEasy_1.Scene.SYSTEM) {
            return null;
        }
    };
    return Target;
}());
exports.Target = Target;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */

var debug = __webpack_require__(8)('socket.io-parser');
var Emitter = __webpack_require__(14);
// var binary = require('./binary');
var isArray = __webpack_require__(41);
// var isBuf = require('./is-buffer');

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = 4;

/**
 * Packet types.
 *
 * @api public
 */

exports.types = ['CONNECT', 'DISCONNECT', 'EVENT', 'ACK', 'ERROR', 'BINARY_EVENT', 'BINARY_ACK'];

/**
 * Packet type `connect`.
 *
 * @api public
 */

exports.CONNECT = 0;

/**
 * Packet type `disconnect`.
 *
 * @api public
 */

exports.DISCONNECT = 1;

/**
 * Packet type `event`.
 *
 * @api public
 */

exports.EVENT = 2;

/**
 * Packet type `ack`.
 *
 * @api public
 */

exports.ACK = 3;

/**
 * Packet type `error`.
 *
 * @api public
 */

exports.ERROR = 4;

/**
 * Packet type 'binary event'
 *
 * @api public
 */

exports.BINARY_EVENT = 5;

/**
 * Packet type `binary ack`. For acks with binary arguments.
 *
 * @api public
 */

exports.BINARY_ACK = 6;

/**
 * Encoder constructor.
 *
 * @api public
 */

exports.Encoder = Encoder;

/**
 * Decoder constructor.
 *
 * @api public
 */

exports.Decoder = Decoder;

/**
 * A socket.io Encoder instance
 *
 * @api public
 */

function Encoder() {}

var ERROR_PACKET = exports.ERROR + '"encode error"';

/**
 * Encode a packet as a single string if non-binary, or as a
 * buffer sequence, depending on packet type.
 *
 * @param {Object} obj - packet object
 * @param {Function} callback - function to handle encodings (likely engine.write)
 * @return Calls callback with Array of encodings
 * @api public
 */

Encoder.prototype.encode = function (obj, callback) {
  // debug('encoding packet %j', obj);
  //
  // if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
  //   encodeAsBinary(obj, callback);
  // } else {
  var encoding = encodeAsString(obj);
  callback([encoding]);
  // }
};

/**
 * Encode packet as string.
 *
 * @param {Object} packet
 * @return {String} encoded
 * @api private
 */

function encodeAsString(obj) {

  // first is type
  var str = '' + obj.type;

  // attachments if we have them
  if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
    str += obj.attachments + '-';
  }

  // if we have a namespace other than `/`
  // we append it followed by a comma `,`
  if (obj.nsp && '/' !== obj.nsp) {
    str += obj.nsp + ',';
  }

  // immediately followed by the id
  if (null != obj.id) {
    str += obj.id;
  }

  // json data
  if (null != obj.data) {
    var payload = tryStringify(obj.data);
    if (payload !== false) {
      str += payload;
    } else {
      return ERROR_PACKET;
    }
  }

  debug('encoded %j as %s', obj, str);
  return str;
}

function tryStringify(str) {
  try {
    return JSON.stringify(str);
  } catch (e) {
    return false;
  }
}

/**
 * Encode packet as 'buffer sequence' by removing blobs, and
 * deconstructing packet into object with placeholders and
 * a list of buffers.
 *
 * @param {Object} packet
 * @return {Buffer} encoded
 * @api private
 */

// function encodeAsBinary(obj, callback) {
//
//   function writeEncoding(bloblessData) {
//     var deconstruction = binary.deconstructPacket(bloblessData);
//     var pack = encodeAsString(deconstruction.packet);
//     var buffers = deconstruction.buffers;
//
//     buffers.unshift(pack); // add packet info to beginning of data list
//     callback(buffers); // write all the buffers
//   }
//
//   binary.removeBlobs(obj, writeEncoding);
// }

/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 * @api public
 */

function Decoder() {
  this.reconstructor = null;
}

/**
 * Mix in `Emitter` with Decoder.
 */

Emitter(Decoder.prototype);

/**
 * Decodes an encoded packet string into packet JSON.
 *
 * @param {String} obj - encoded packet
 * @return {Object} packet
 * @api public
 */

Decoder.prototype.add = function (obj) {
  var packet;
  if (typeof obj === 'string') {
    packet = decodeString(obj);
    // if (exports.BINARY_EVENT === packet.type || exports.BINARY_ACK === packet.type) { // binary packet's json
    //   this.reconstructor = new BinaryReconstructor(packet);
    //
    //   // no attachments, labeled binary but no binary data to follow
    //   if (this.reconstructor.reconPack.attachments === 0) {
    //     this.emit('decoded', packet);
    //   }
    // } else { // non-binary full packet
    this.emit('decoded', packet);
    // }
  }
  // else if (isBuf(obj) || obj.base64) { // raw binary data
  //   if (!this.reconstructor) {
  //     throw new Error('got binary data when not reconstructing a packet');
  //   } else {
  //     packet = this.reconstructor.takeBinaryData(obj);
  //     if (packet) { // received final buffer
  //       this.reconstructor = null;
  //       this.emit('decoded', packet);
  //     }
  //   }
  // }
  else {
      throw new Error('Unknown type: ' + obj);
    }
};

/**
 * Decode a packet String (JSON data)
 *
 * @param {String} str
 * @return {Object} packet
 * @api private
 */

function decodeString(str) {
  var i = 0;
  // look up type
  var p = {
    type: Number(str.charAt(0))
  };

  if (null == exports.types[p.type]) {
    return error('unknown packet type ' + p.type);
  }

  // look up attachments if type binary
  if (exports.BINARY_EVENT === p.type || exports.BINARY_ACK === p.type) {
    var buf = '';
    while (str.charAt(++i) !== '-') {
      buf += str.charAt(i);
      if (i == str.length) break;
    }
    if (buf != Number(buf) || str.charAt(i) !== '-') {
      throw new Error('Illegal attachments');
    }
    p.attachments = Number(buf);
  }

  // look up namespace (if any)
  if ('/' === str.charAt(i + 1)) {
    p.nsp = '';
    while (++i) {
      var c = str.charAt(i);
      if (',' === c) break;
      p.nsp += c;
      if (i === str.length) break;
    }
  } else {
    p.nsp = '/';
  }

  // look up id
  var next = str.charAt(i + 1);
  if ('' !== next && Number(next) == next) {
    p.id = '';
    while (++i) {
      var c = str.charAt(i);
      if (null == c || Number(c) != c) {
        --i;
        break;
      }
      p.id += str.charAt(i);
      if (i === str.length) break;
    }
    p.id = Number(p.id);
  }

  // look up json data
  if (str.charAt(++i)) {
    var payload = tryParse(str.substr(i));
    var isPayloadValid = payload !== false && (p.type === exports.ERROR || isArray(payload));
    if (isPayloadValid) {
      p.data = payload;
    } else {
      return error('invalid payload');
    }
  }

  debug('decoded %s as %j', str, p);
  return p;
}

function tryParse(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return false;
  }
}

/**
 * Deallocates a parser's resources
 *
 * @api public
 */

Decoder.prototype.destroy = function () {
  if (this.reconstructor) {
    this.reconstructor.finishedReconstruction();
  }
};

/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 * @api private
 */

function BinaryReconstructor(packet) {
  this.reconPack = packet;
  this.buffers = [];
}

/**
 * Method to be called when binary data received from connection
 * after a BINARY_EVENT packet.
 *
 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
 * @return {null | Object} returns null if more binary data is expected or
 *   a reconstructed packet object if all buffers have been received.
 * @api private
 */

BinaryReconstructor.prototype.takeBinaryData = function (binData) {
  this.buffers.push(binData);
  if (this.buffers.length === this.reconPack.attachments) {
    // done with buffer list
    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
    this.finishedReconstruction();
    return packet;
  }
  return null;
};

/**
 * Cleans up binary packet reconstruction variables.
 *
 * @api private
 */

BinaryReconstructor.prototype.finishedReconstruction = function () {
  this.reconPack = null;
  this.buffers = [];
};

function error(msg) {
  return {
    type: exports.ERROR,
    data: 'parser error: ' + msg
  };
}

/***/ }),
/* 26 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */

var parser = __webpack_require__(15);
var Emitter = __webpack_require__(14);

/**
 * Module exports.
 */

module.exports = Transport;

/**
 * Transport abstract constructor.
 *
 * @param {Object} options.
 * @api private
 */

function Transport(opts) {
  this.path = opts.path;
  this.hostname = opts.hostname;
  this.port = opts.port;
  this.secure = opts.secure;
  this.query = opts.query;
  this.timestampParam = opts.timestampParam;
  this.timestampRequests = opts.timestampRequests;
  this.readyState = '';
  this.agent = opts.agent || false;
  this.socket = opts.socket;
  this.enablesXDR = opts.enablesXDR;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;
  this.forceNode = opts.forceNode;

  // results of ReactNative environment detection
  this.isReactNative = opts.isReactNative;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;
  this.localAddress = opts.localAddress;
}

/**
 * Mix in `Emitter`.
 */

Emitter(Transport.prototype);

/**
 * Emits an error.
 *
 * @param {String} str
 * @return {Transport} for chaining
 * @api public
 */

Transport.prototype.onError = function (msg, desc) {
  var err = new Error(msg);
  err.type = 'TransportError';
  err.description = desc;
  this.emit('error', err);
  return this;
};

/**
 * Opens the transport.
 *
 * @api public
 */

Transport.prototype.open = function () {
  if ('closed' === this.readyState || '' === this.readyState) {
    this.readyState = 'opening';
    this.doOpen();
  }

  return this;
};

/**
 * Closes the transport.
 *
 * @api private
 */

Transport.prototype.close = function () {
  if ('opening' === this.readyState || 'open' === this.readyState) {
    this.doClose();
    this.onClose();
  }

  return this;
};

/**
 * Sends multiple packets.
 *
 * @param {Array} packets
 * @api private
 */

Transport.prototype.send = function (packets) {
  if ('open' === this.readyState) {
    this.write(packets);
  } else {
    throw new Error('Transport not open');
  }
};

/**
 * Called upon open
 *
 * @api private
 */

Transport.prototype.onOpen = function () {
  this.readyState = 'open';
  this.writable = true;
  this.emit('open');
};

/**
 * Called with data.
 *
 * @param {String} data
 * @api private
 */

Transport.prototype.onData = function (data) {
  var packet = parser.decodePacket(data, this.socket.binaryType);
  this.onPacket(packet);
};

/**
 * Called with a decoded packet.
 */

Transport.prototype.onPacket = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon close.
 *
 * @api private
 */

Transport.prototype.onClose = function () {
  this.readyState = 'closed';
  this.emit('close');
};

/***/ }),
/* 28 */
/***/ (function(module, exports) {


module.exports = function(a, b){
  var fn = function(){};
  fn.prototype = b.prototype;
  a.prototype = new fn;
  a.prototype.constructor = a;
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.calibrator = void 0;
var Calibrator = /** @class */ (function () {
    function Calibrator() {
    }
    Calibrator.prototype.isDef = function (v) {
        return !this.isUndef(v);
    };
    Calibrator.prototype.isUndef = function (v) {
        return v === undefined || v === null;
    };
    Calibrator.prototype.isPrimitive = function (value) {
        return (typeof value === 'string' ||
            typeof value === 'number' ||
            typeof value === 'symbol' ||
            typeof value === 'boolean');
    };
    Calibrator.prototype.isObject = function (obj) {
        return obj !== null && typeof obj === 'object';
    };
    Calibrator.prototype.isPlainObject = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    };
    Calibrator.prototype.isRegExp = function (v) {
        return Object.prototype.toString.call(v) === '[object RegExp]';
    };
    Calibrator.prototype.isValidArrayIndex = function (val) {
        var n = parseFloat(String(val));
        return n >= 0 && Math.floor(n) === n && isFinite(val);
    };
    Calibrator.prototype.isString = function (v) {
        return typeof v === 'string';
    };
    Calibrator.prototype.isNumber = function (v) {
        return typeof v === 'number';
    };
    Calibrator.prototype.isStringOrNumber = function (v) {
        return this.isString(v) || this.isNumber(v);
    };
    Calibrator.prototype.isArray = function (v) {
        return Object.prototype.toString.call(v) === "[object Array]";
    };
    Calibrator.prototype.isEmpty = function (v) {
        if (this.isArray(v)) {
            return v.length == 0;
        }
        if (this.isObject(v)) {
            return !this.isDef(v);
        }
        if (this.isNumber(v)) {
            return false;
        }
        if (this.isString(v)) {
            return v.trim() == '';
        }
        return !this.isDef(v);
    };
    Calibrator.prototype.isNative = function (Ctor) {
        return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
    };
    Calibrator.prototype.isFunction = function (fn) {
        return typeof fn === 'function';
    };
    Calibrator.prototype.isBoolean = function (v) {
        return typeof v === 'boolean';
    };
    Calibrator.prototype.isTrue = function (v) {
        return v === true;
    };
    Calibrator.prototype.isFalse = function (v) {
        return v === false;
    };
    return Calibrator;
}());
var calibrator = new Calibrator();
exports.calibrator = calibrator;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.PlatformDetector = exports.Platform = void 0;
var Platform;
(function (Platform) {
    Platform["BROWSER"] = "BROWSER";
    Platform["UNKNOWN"] = "UNKNOWN";
    // 因为web版的app，只能是由特定厂商打出来的，在这个生态里只有厂商的环境，髌骨不是一个通用或者独立标准的APP概念，而是依附于技术平台的APP
    Platform["APP_IOS"] = "APP_IOS";
    Platform["APP_ANDROID"] = "APP_ANDROID";
    // 各个厂家小程序环境
    Platform["APPLET_WX"] = "APPLET_WX";
    Platform["APPLET_WX_GAME"] = "APPLET_WX_GAME";
    Platform["APPLET_ALIPAY"] = "APPLET_ALIPAY";
    Platform["APPLET_BYTEDANCE"] = "APPLET_BYTEDANCE";
    // UNI_APP = "Uni_App",  //用Uniapp开发的app，强调的是app
    // React_Native, : 'React-Native',//特指 react-native开发的app，RN不是框架的原因是因为他不能像taro和Uniapp为其他平台赋能，
    // WEIXIN_APPLET = "Weixin_Applet",
    // ALIPAY_APPLET = "Alipay_Applet",
    // BAIDU_APPLET = "Baidu_Applet",
    // BYTEDANCE_APPLET = "Bytedance_Applet",
    // QQ_APPLET = "QQ_Applet",
    // WEIXIN_GAME = "Weixin_Game",
    // _360_APPLET = "360_Applet",
    // BROWSER = "Browser",
    // UNKNOWN = "Unknown",
})(Platform = exports.Platform || (exports.Platform = {}));
var PlatformDetector = /** @class */ (function () {
    function PlatformDetector() {
        var _a, e_1, _b;
        this.platform = null;
        this.methods = (_a = {},
            _a[Platform.BROWSER] = this.isBrowser,
            _a[Platform.APP_IOS] = this.isAppiOS,
            _a[Platform.APP_ANDROID] = this.isAppAndroid,
            _a[Platform.APPLET_WX] = this.isWXApplet,
            _a[Platform.APPLET_WX_GAME] = this.isWXGameApplet,
            _a);
        var methods = this.methods;
        var keys = Object.keys(methods);
        try {
            for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                var key = keys_1_1.value;
                var method = methods[key];
                if (method()) {
                    this.platform = key;
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (keys_1_1 && !keys_1_1.done && (_b = keys_1["return"])) _b.call(keys_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.platform = this.platform || Platform.UNKNOWN;
        console.log('PlatformDetector constructor - ', this.platform);
    }
    PlatformDetector.currentPlatform = function () {
        return PlatformDetector.instance.platform;
    };
    /**************  detection plugin methods **************/
    PlatformDetector.prototype.isBrowser = function () {
        return (typeof navigator !== 'undefined' &&
            typeof document !== 'undefined' &&
            (document.getElementById ? true : false) &&
            typeof GameGlobal === 'undefined');
    };
    PlatformDetector.prototype.isAppiOS = function () {
        return (typeof uni === "object" &&
            (uni.getSystemInfoSync ? true : false) &&
            uni.getSystemInfoSync().platform === 'ios' &&
            typeof plus === 'object');
    };
    PlatformDetector.prototype.isAppAndroid = function () {
        return (typeof uni === "object" &&
            (uni.getSystemInfoSync ? true : false) &&
            uni.getSystemInfoSync().platform === 'android' &&
            typeof plus === 'object');
    };
    PlatformDetector.prototype.isWXApplet = function () {
        return (typeof wx === "object" &&
            (wx.getSystemInfoSync ? true : false) &&
            typeof WebSocket === 'undefined' &&
            typeof XMLHttpRequest === 'undefined' &&
            typeof plus === 'undefined');
    };
    PlatformDetector.prototype.isWXGameApplet = function () {
        return typeof GameGlobal === 'object';
    };
    PlatformDetector.prototype.isAlipayApplet = function () {
        return false;
    };
    PlatformDetector.prototype.isBytedanceApplet = function () {
        return false;
    };
    PlatformDetector.prototype.isQQApplet = function () {
        return false;
    };
    PlatformDetector.prototype.isBaiduApplet = function () {
        return false;
    };
    PlatformDetector.instance = new PlatformDetector();
    return PlatformDetector;
}());
exports.PlatformDetector = PlatformDetector;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var AbstractFileUploader = /** @class */ (function () {
    function AbstractFileUploader() {
    }
    AbstractFileUploader.prototype.upload = function (uploadRequest, onProgress) {
        throw Error('Not implementation yet.');
    };
    return AbstractFileUploader;
}());
exports["default"] = AbstractFileUploader;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.RemoteAbbrMessageBuilder = void 0;
var GoEasy_1 = __webpack_require__(5);
var PrivateMessage_1 = __webpack_require__(60);
var GroupMessage_1 = __webpack_require__(61);
var RemoteAbbrMessageBuilder = /** @class */ (function () {
    function RemoteAbbrMessageBuilder() {
    }
    RemoteAbbrMessageBuilder.prototype.build = function (remoteAbbrMessage) {
        var message;
        if (remoteAbbrMessage.t === GoEasy_1.Scene.PRIVATE) {
            message = new PrivateMessage_1.PrivateMessage();
            message.read = remoteAbbrMessage.rd;
            message.receiverId = remoteAbbrMessage.r;
        }
        else if (remoteAbbrMessage.t === GoEasy_1.Scene.GROUP) {
            message = new GroupMessage_1.GroupMessage();
            message.groupId = remoteAbbrMessage.r;
            message.senderData = remoteAbbrMessage.d ? JSON.parse(remoteAbbrMessage.d) : {};
        }
        message.senderId = remoteAbbrMessage.s;
        message.messageId = remoteAbbrMessage.i;
        message.timestamp = remoteAbbrMessage.ts;
        message.type = remoteAbbrMessage.mt;
        message.payload = JSON.parse(remoteAbbrMessage.p);
        // message.recalled = remoteAbbrMessage.rc;
        message.status = GoEasy_1.MessageStatus.SUCCESS;
        return message;
    };
    return RemoteAbbrMessageBuilder;
}());
exports.RemoteAbbrMessageBuilder = RemoteAbbrMessageBuilder;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.ImageMessagePayload = void 0;
var FileMessagePayload_1 = __webpack_require__(19);
var ImageMessagePayload = /** @class */ (function (_super) {
    __extends(ImageMessagePayload, _super);
    function ImageMessagePayload() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.width = 0;
        _this.height = 0;
        return _this;
    }
    return ImageMessagePayload;
}(FileMessagePayload_1.FileMessagePayload));
exports.ImageMessagePayload = ImageMessagePayload;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var AbstractPayloadBuilder_1 = __webpack_require__(10);
var FileMessagePayload_1 = __webpack_require__(19);
var utils_1 = __webpack_require__(0);
var WXFilePayloadBuilder = /** @class */ (function (_super) {
    __extends(WXFilePayloadBuilder, _super);
    function WXFilePayloadBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WXFilePayloadBuilder.prototype.create = function () {
        return new FileMessagePayload_1.FileMessagePayload();
    };
    WXFilePayloadBuilder.prototype.setPayload = function (buildOptions, payload) {
    };
    WXFilePayloadBuilder.prototype.validate = function (createOptions) {
        if (!utils_1.calibrator.isObject(createOptions)) {
            throw Error('it is an empty message.');
        }
        if (!utils_1.calibrator.isDef(createOptions.file)) {
            throw Error('file is empty.');
        }
    };
    return WXFilePayloadBuilder;
}(AbstractPayloadBuilder_1.AbstractPayloadBuilder));
exports["default"] = WXFilePayloadBuilder;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.AudioMessagePayload = void 0;
var FileMessagePayload_1 = __webpack_require__(19);
var AudioMessagePayload = /** @class */ (function (_super) {
    __extends(AudioMessagePayload, _super);
    function AudioMessagePayload() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.duration = 0;
        return _this;
    }
    return AudioMessagePayload;
}(FileMessagePayload_1.FileMessagePayload));
exports.AudioMessagePayload = AudioMessagePayload;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.VideoMessagePayload = void 0;
var AbstractMessagePayload_1 = __webpack_require__(23);
var VideoMessagePayload = /** @class */ (function (_super) {
    __extends(VideoMessagePayload, _super);
    function VideoMessagePayload() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.video = new GoEasyVideo();
        _this.thumbnail = new GoEasyThumbnail();
        return _this;
    }
    return VideoMessagePayload;
}(AbstractMessagePayload_1.AbstractMessagePayload));
exports.VideoMessagePayload = VideoMessagePayload;
var GoEasyThumbnail = /** @class */ (function () {
    function GoEasyThumbnail() {
        this.name = "";
        this.url = "";
        this.width = 0;
        this.height = 0;
        this.contentType = "";
    }
    return GoEasyThumbnail;
}());
var GoEasyVideo = /** @class */ (function () {
    function GoEasyVideo() {
        this.name = "";
        this.url = "";
        this.width = 0;
        this.height = 0;
        this.contentType = "";
        this.size = 0;
        this.duration = 0;
    }
    return GoEasyVideo;
}());


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var AbstractPayloadBuilder_1 = __webpack_require__(10);
var FileMessagePayload_1 = __webpack_require__(19);
var utils_1 = __webpack_require__(0);
var UniAppFilePayloadBuilder = /** @class */ (function (_super) {
    __extends(UniAppFilePayloadBuilder, _super);
    function UniAppFilePayloadBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UniAppFilePayloadBuilder.prototype.create = function () {
        return new FileMessagePayload_1.FileMessagePayload();
    };
    UniAppFilePayloadBuilder.prototype.setPayload = function (buildOptions, payload) {
        var filePayload = payload;
        var createOptions = buildOptions.createOptions;
        var file = createOptions.file;
        filePayload.url = file.fullPath;
        filePayload.name = file.name;
        filePayload.size = file.size;
        /****
         *  todo: 论证必要性 ，无法标准化，对用户来说也不是刚需
         *  因为只有h5拿到正确的contentType，小程序和ios/Android都不标准
         *  小程序中type: png、file，安卓有时能获取到正常的contentType有时不能
         */
        filePayload.contentType = file.type;
        console.log('filePayload file.type', file.type);
        buildOptions.complete = Promise.resolve();
    };
    UniAppFilePayloadBuilder.prototype.validate = function (createOptions) {
        if (!utils_1.calibrator.isObject(createOptions)) {
            throw Error('it is an empty message.');
        }
        if (!utils_1.calibrator.isDef(createOptions.file)) {
            throw Error('file is empty.');
        }
    };
    return UniAppFilePayloadBuilder;
}(AbstractPayloadBuilder_1.AbstractPayloadBuilder));
exports["default"] = UniAppFilePayloadBuilder;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var AbstractPayloadBuilder_1 = __webpack_require__(10);
var FileMessagePayload_1 = __webpack_require__(19);
var utils_1 = __webpack_require__(6);
var HTMLFilePayloadBuilder = /** @class */ (function (_super) {
    __extends(HTMLFilePayloadBuilder, _super);
    function HTMLFilePayloadBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HTMLFilePayloadBuilder.prototype.create = function () {
        return new FileMessagePayload_1.FileMessagePayload();
    };
    HTMLFilePayloadBuilder.prototype.setPayload = function (buildOptions, payload) {
        var filePayload = payload;
        var createOptions = buildOptions.createOptions;
        var file = createOptions.file;
        var url = window.URL || window.webkitURL;
        filePayload.url = url.createObjectURL(file);
        filePayload.name = file.name;
        filePayload.size = file.size;
        filePayload.contentType = file.type;
    };
    HTMLFilePayloadBuilder.prototype.validate = function (createOptions) {
        if (!utils_1.calibrator.isObject(createOptions)) {
            throw Error('it is an empty message.');
        }
        if (!(createOptions.file instanceof File)) {
            throw Error('wrong file type.');
        }
        if (createOptions.file.size == 0) {
            throw Error('File size is 0.');
        }
        if (createOptions.file.size > 30 * 1024 * 1024) {
            throw Error('message-length limit 30mib');
        }
    };
    return HTMLFilePayloadBuilder;
}(AbstractPayloadBuilder_1.AbstractPayloadBuilder));
exports["default"] = HTMLFilePayloadBuilder;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var NetworkStatus_1 = __webpack_require__(12);
var Permission_1 = __webpack_require__(1);
var Emitter_1 = __webpack_require__(65);
var io = __webpack_require__(66);
var utils_1 = __webpack_require__(0);
var AbstractSocket = /** @class */ (function () {
    function AbstractSocket() {
        this.io = io;
        this.status = NetworkStatus_1.NetworkStatus.DISCONNECTED;
        this.permissions = [Permission_1.Permission.NONE];
        this.connectedObservers = []; // todo: callback?
        this.disconnectedObservers = [];
        this.emitter = new Emitter_1.Emitter(this);
    }
    AbstractSocket.prototype.connect = function () {
        this.status = NetworkStatus_1.NetworkStatus.CONNECTING;
    };
    AbstractSocket.prototype.emit = function (rocket) {
        this.emitter.emit(rocket);
    };
    AbstractSocket.prototype.doEmit = function (name, params, ack) {
    };
    AbstractSocket.prototype.on = function (name, listener) {
        this.io.on(name, listener);
    };
    AbstractSocket.prototype.disconnect = function () {
        this.io.disconnect();
    };
    AbstractSocket.prototype.getStatus = function () {
        return this.status;
    };
    AbstractSocket.prototype.addConnectedObserver = function (callback) {
        if (!utils_1.calibrator.isFunction(callback))
            return;
        this.connectedObservers.push(callback);
    };
    AbstractSocket.prototype.addDisconnectedObserver = function (callback) {
        if (!utils_1.calibrator.isFunction(callback))
            return;
        this.disconnectedObservers.push(callback);
    };
    AbstractSocket.prototype.notify = function (list, response) {
        for (var i = 0; i < list.length; i++) {
            list[i](response);
        }
    };
    return AbstractSocket;
}());
exports["default"] = AbstractSocket;


/***/ }),
/* 40 */
/***/ (function(module, exports) {

/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];

module.exports = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
        uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }

    return uri;
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Module dependencies.
                                                                                                                                                                                                                                                                               */


var _UniApp = __webpack_require__(43);

var eio = __webpack_require__(68);
var Socket = __webpack_require__(49);
var Emitter = __webpack_require__(14);
var parser = __webpack_require__(25);
var on = __webpack_require__(50);
var bind = __webpack_require__(51);
var debug = __webpack_require__(8)('socket.io-client:manager');
var indexOf = __webpack_require__(48);
var Backoff = __webpack_require__(84);

var GoEasyDomainNumber = __webpack_require__(52).GoEasyDomainNumber;

/**
 * IE6+ hasOwnProperty
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Module exports
 */

module.exports = Manager;

/**
 * `Manager` constructor.
 *
 * @param {String} engine instance or engine uri/opts
 * @param {Object} options
 * @api public
 */

function Manager(uri, opts) {
  if (!(this instanceof Manager)) return new Manager(uri, opts);
  if (uri && 'object' === (typeof uri === 'undefined' ? 'undefined' : _typeof(uri))) {
    opts = uri;
    uri = undefined;
  }
  opts = opts || {};

  opts.path = opts.path || '/socket.io';
  this.nsps = {};
  this.subs = [];
  this.opts = opts;
  this.reconnection(opts.reconnection !== false);
  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
  this.reconnectionDelay(opts.reconnectionDelay || 1000);
  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
  this.randomizationFactor(opts.randomizationFactor || 0.5);
  this.backoff = new Backoff({
    min: this.reconnectionDelay(),
    max: this.reconnectionDelayMax(),
    jitter: this.randomizationFactor()
  });
  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
  this.readyState = 'closed';
  this.uri = uri;
  this.connecting = [];
  this.lastPing = null;
  this.encoding = false;
  this.packetBuffer = [];
  var _parser = opts.parser || parser;
  this.encoder = new _parser.Encoder();
  this.decoder = new _parser.Decoder();
  this.autoConnect = opts.autoConnect !== false;
  if (this.autoConnect) this.open();
}

/**
 * Propagate given event to sockets and emit on `this`
 *
 * @api private
 */

Manager.prototype.emitAll = function () {
  this.emit.apply(this, arguments);
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
    }
  }
};

/**
 * Update `socket.id` of all sockets
 *
 * @api private
 */

Manager.prototype.updateSocketIds = function () {
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].id = this.generateId(nsp);
    }
  }
};

/**
 * generate `socket.id` for the given `nsp`
 *
 * @param {String} nsp
 * @return {String}
 * @api private
 */

Manager.prototype.generateId = function (nsp) {
  return (nsp === '/' ? '' : nsp + '#') + this.engine.id;
};

/**
 * Mix in `Emitter`.
 */

Emitter(Manager.prototype);

/**
 * Sets the `reconnection` config.
 *
 * @param {Boolean} true/false if it should automatically reconnect
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnection = function (v) {
  if (!arguments.length) return this._reconnection;
  this._reconnection = !!v;
  return this;
};

/**
 * Sets the reconnection attempts config.
 *
 * @param {Number} max reconnection attempts before giving up
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionAttempts = function (v) {
  if (!arguments.length) return this._reconnectionAttempts;
  this._reconnectionAttempts = v;
  return this;
};

/**
 * Sets the delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelay = function (v) {
  if (!arguments.length) return this._reconnectionDelay;
  this._reconnectionDelay = v;
  this.backoff && this.backoff.setMin(v);
  return this;
};

Manager.prototype.randomizationFactor = function (v) {
  if (!arguments.length) return this._randomizationFactor;
  this._randomizationFactor = v;
  this.backoff && this.backoff.setJitter(v);
  return this;
};

/**
 * Sets the maximum delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelayMax = function (v) {
  if (!arguments.length) return this._reconnectionDelayMax;
  this._reconnectionDelayMax = v;
  this.backoff && this.backoff.setMax(v);
  return this;
};

/**
 * Sets the connection timeout. `false` to disable
 *
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.timeout = function (v) {
  if (!arguments.length) return this._timeout;
  this._timeout = v;
  return this;
};

/**
 * Starts trying to reconnect if reconnection is enabled and we have not
 * started reconnecting yet
 *
 * @api private
 */

Manager.prototype.maybeReconnectOnOpen = function () {
  // Only try to reconnect if it's the first time we're connecting
  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
    // keeps reconnection from firing twice for the same reconnection loop
    this.reconnect();
  }
};

/**
 * Sets the current transport `socket`.
 *
 * @param {Function} optional, callback
 * @return {Manager} self
 * @api public
 */

Manager.prototype.open = Manager.prototype.connect = function (fn, opts) {
  debug('readyState %s', this.readyState);
  if (~this.readyState.indexOf('open')) return this;

  debug('opening %s', this.uri);
  this.engine = eio(this.uri, this.opts);
  var socket = this.engine;
  var self = this;
  this.readyState = 'opening';
  this.skipReconnect = false;

  // emit `open`
  var openSub = on(socket, 'open', function () {
    self.onopen();
    fn && fn();
  });

  // emit `connect_error`
  var errorSub = on(socket, 'error', function (data) {

    if (typeof window !== 'undefined') {
      var reg = /[1-9][0-9]*/g;
      var index = parseInt(self.uri.match(reg)[0]);
      var nextIndex = GoEasyDomainNumber.refreshNumber();
      self.uri = self.uri.replace(index, nextIndex);
    }

    debug('connect_error');
    self.cleanup();
    self.readyState = 'closed';
    self.emitAll('connect_error', data);
    if (fn) {
      var err = new Error('Connection error');
      err.data = data;
      fn(err);
    } else {
      // Only do this if there is no fn to handle the error
      self.maybeReconnectOnOpen();
    }
  });

  // emit `connect_timeout`
  if (false !== this._timeout) {
    var timeout = this._timeout;
    debug('connect attempt will timeout after %d', timeout);

    // set timer
    var timer = setTimeout(function () {
      debug('connect attempt timed out after %d', timeout);
      openSub.destroy();
      socket.close();
      socket.emit('error', 'timeout');
      self.emitAll('connect_timeout', timeout);
    }, timeout);

    this.subs.push({
      destroy: function destroy() {
        clearTimeout(timer);
      }
    });
  }

  this.subs.push(openSub);
  this.subs.push(errorSub);

  return this;
};

/**
 * Called upon transport open.
 *
 * @api private
 */

Manager.prototype.onopen = function () {
  debug('open');

  // clear old subs
  this.cleanup();

  // mark as open
  this.readyState = 'open';
  this.emit('open');

  // add new subs
  var socket = this.engine;
  this.subs.push(on(socket, 'data', bind(this, 'ondata')));
  this.subs.push(on(socket, 'ping', bind(this, 'onping')));
  this.subs.push(on(socket, 'pong', bind(this, 'onpong')));
  this.subs.push(on(socket, 'error', bind(this, 'onerror')));
  this.subs.push(on(socket, 'close', bind(this, 'onclose')));
  this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
};

/**
 * Called upon a ping.
 *
 * @api private
 */

Manager.prototype.onping = function () {
  this.lastPing = new Date();
  this.emitAll('ping');
};

/**
 * Called upon a packet.
 *
 * @api private
 */

Manager.prototype.onpong = function () {
  this.emitAll('pong', new Date() - this.lastPing);
};

/**
 * Called with data.
 *
 * @api private
 */

Manager.prototype.ondata = function (data) {
  this.decoder.add(data);
};

/**
 * Called when parser fully decodes a packet.
 *
 * @api private
 */

Manager.prototype.ondecoded = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon socket error.
 *
 * @api private
 */

Manager.prototype.onerror = function (err) {
  debug('error', err);
  this.emitAll('error', err);
};

/**
 * Creates a new socket for the given `nsp`.
 *
 * @return {Socket}
 * @api public
 */

Manager.prototype.socket = function (nsp, opts) {
  var socket = this.nsps[nsp];
  if (!socket) {
    socket = new Socket(this, nsp, opts);
    this.nsps[nsp] = socket;
    var self = this;
    socket.on('connecting', onConnecting);
    socket.on('connect', function () {
      socket.id = self.generateId(nsp);
    });

    if (this.autoConnect) {
      // manually call here since connecting event is fired before listening
      onConnecting();
    }
  }

  function onConnecting() {
    if (!~indexOf(self.connecting, socket)) {
      self.connecting.push(socket);
    }
  }

  return socket;
};

/**
 * Called upon a socket close.
 *
 * @param {Socket} socket
 */

Manager.prototype.destroy = function (socket) {
  var index = indexOf(this.connecting, socket);
  if (~index) this.connecting.splice(index, 1);
  if (this.connecting.length) return;

  this.close();
};

/**
 * Writes a packet.
 *
 * @param {Object} packet
 * @api private
 */

Manager.prototype.packet = function (packet) {
  debug('writing packet %j', packet);
  var self = this;
  if (packet.query && packet.type === 0) packet.nsp += '?' + packet.query;

  if (!self.encoding) {
    // encode, then write to engine with result
    self.encoding = true;
    this.encoder.encode(packet, function (encodedPackets) {
      for (var i = 0; i < encodedPackets.length; i++) {
        self.engine.write(encodedPackets[i], packet.options);
      }
      self.encoding = false;
      self.processPacketQueue();
    });
  } else {
    // add packet to the queue
    self.packetBuffer.push(packet);
  }
};

/**
 * If packet buffer is non-empty, begins encoding the
 * next packet in line.
 *
 * @api private
 */

Manager.prototype.processPacketQueue = function () {
  if (this.packetBuffer.length > 0 && !this.encoding) {
    var pack = this.packetBuffer.shift();
    this.packet(pack);
  }
};

/**
 * Clean up transport subscriptions and packet buffer.
 *
 * @api private
 */

Manager.prototype.cleanup = function () {
  debug('cleanup');

  var subsLength = this.subs.length;
  for (var i = 0; i < subsLength; i++) {
    var sub = this.subs.shift();
    sub.destroy();
  }

  this.packetBuffer = [];
  this.encoding = false;
  this.lastPing = null;

  this.decoder.destroy();
};

/**
 * Close the current socket.
 *
 * @api private
 */

Manager.prototype.close = Manager.prototype.disconnect = function () {
  debug('disconnect');
  this.skipReconnect = true;
  this.reconnecting = false;
  if ('opening' === this.readyState) {
    // `onclose` will not fire because
    // an open event never happened
    this.cleanup();
  }
  this.backoff.reset();
  this.readyState = 'closed';
  if (this.engine) this.engine.close();
};

/**
 * Called upon engine close.
 *
 * @api private
 */

Manager.prototype.onclose = function (reason) {
  debug('onclose');

  this.cleanup();
  this.backoff.reset();
  this.readyState = 'closed';
  this.emit('close', reason);

  if (this._reconnection && !this.skipReconnect) {
    this.reconnect();
  }
};

/**
 * Attempt a reconnection.
 *
 * @api private
 */

function isUniRunningBackend() {
  var isUni = false;
  if ((typeof uni === 'undefined' ? 'undefined' : _typeof(uni)) === "object" && uni.getSystemInfo) {
    isUni = true;
  }
  return isUni && _UniApp.uniApp.runningBackend();
}

Manager.prototype.reconnect = function () {
  debug("isUniRunningBackend() :" + isUniRunningBackend());
  if (this.reconnecting || this.skipReconnect) return this;

  var self = this;

  if (this.backoff.attempts >= this._reconnectionAttempts) {
    debug('reconnect failed');
    this.backoff.reset();
    this.emitAll('reconnect_failed');
    this.reconnecting = false;
  } else {
    var delay = this.backoff.duration();
    debug('will wait %dms before reconnect attempt', delay);

    this.reconnecting = true;
    var timer = setTimeout(function () {
      if (self.skipReconnect) return;

      debug('attempting reconnect');
      self.emitAll('reconnect_attempt', self.backoff.attempts);
      self.emitAll('reconnecting', self.backoff.attempts);

      // check again for the case socket closed in above events
      if (self.skipReconnect) return;
      if (isUniRunningBackend()) {
        debug('Uniapp running backend, skipped reconnect...');
        self.reconnecting = false;
        self.reconnect();
        self.emitAll('reconnect_error', 'Uniapp running backend, skipped reconnect...');
      } else {
        self.open(function (err) {
          if (err) {
            debug('reconnect attempt error');
            self.reconnecting = false;
            self.reconnect();
            self.emitAll('reconnect_error', err.data);
          } else {
            debug('reconnect success');
            self.onreconnect();
          }
        });
      }
    }, delay);

    this.subs.push({
      destroy: function destroy() {
        clearTimeout(timer);
      }
    });
  }
};

/**
 * Called upon successful reconnect.
 *
 * @api private
 */

Manager.prototype.onreconnect = function () {
  var attempt = this.backoff.attempts;
  this.reconnecting = false;
  this.backoff.reset();
  this.updateSocketIds();
  this.emitAll('reconnect', attempt);
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.uniApp = void 0;
var framework_detector_1 = __webpack_require__(17);
/**
 * 监听app后台与前台切换
 */
var UniApp = /** @class */ (function () {
    function UniApp() {
        this.uniAppRunningBackend = false;
        this.listenAppRunning();
    }
    UniApp.prototype.listenAppRunning = function () {
        var _this = this;
        var currentFramework = framework_detector_1.FrameworkDetector.currentFramework();
        if (currentFramework === framework_detector_1.Framework.UNIAPP && typeof plus === "object") {
            plus.globalEvent.addEventListener("resume", function () {
                //从后台切换到前台
                _this.uniAppRunningBackend = false;
                console.log("app running frontend...:", _this.uniAppRunningBackend);
            }, false);
            plus.globalEvent.addEventListener("pause", function () {
                //从前台切换到后台
                _this.uniAppRunningBackend = true;
                console.log("app running background...:", _this.uniAppRunningBackend);
            }, false);
        }
    };
    UniApp.prototype.runningBackend = function () {
        return this.uniAppRunningBackend;
    };
    return UniApp;
}());
var uniApp = new UniApp();
exports.uniApp = uniApp;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies
 */

// var XMLHttpRequest = require('xmlhttprequest-ssl');
// var XHR = require('./polling-xhr');

var JSONP = __webpack_require__(70);
var websocket = __webpack_require__(81);

/**
 * Export transports.
 */

exports.polling = polling;
exports.websocket = websocket;

/**
 * Polling transport polymorphic constructor.
 * Decides on xhr vs jsonp based on feature detection.
 *
 * @api private
 */

function polling(opts) {
  var xhr;
  var xd = false;
  var xs = false;
  var jsonp = false !== opts.jsonp;

  if (typeof location !== 'undefined') {
    var isSSL = 'https:' === location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    xd = opts.hostname !== location.hostname || port !== opts.port;
    xs = opts.secure !== isSSL;
  }

  opts.xdomain = xd;
  opts.xscheme = xs;
  // xhr = new XMLHttpRequest(opts);
  //
  // if ('open' in xhr && !opts.forceJSONP) {
  //   return new XHR(opts);
  // } else {
  //   if (!jsonp) throw new Error('JSONP disabled');
  return new JSONP(opts);
  // }
}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/* global Blob File */

/*
 * Module requirements.
 */

var isArray = __webpack_require__(41);

var toString = Object.prototype.toString;
var withNativeBlob = typeof Blob === 'function' ||
                        typeof Blob !== 'undefined' && toString.call(Blob) === '[object BlobConstructor]';
var withNativeFile = typeof File === 'function' ||
                        typeof File !== 'undefined' && toString.call(File) === '[object FileConstructor]';

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Supports Buffer, ArrayBuffer, Blob and File.
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary (obj) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      if (hasBinary(obj[i])) {
        return true;
      }
    }
    return false;
  }

  if ((typeof Buffer === 'function' && Buffer.isBuffer && Buffer.isBuffer(obj)) ||
    (typeof ArrayBuffer === 'function' && obj instanceof ArrayBuffer) ||
    (withNativeBlob && obj instanceof Blob) ||
    (withNativeFile && obj instanceof File)
  ) {
    return true;
  }

  // see: https://github.com/Automattic/has-binary/pull/4
  if (obj.toJSON && typeof obj.toJSON === 'function' && arguments.length === 1) {
    return hasBinary(obj.toJSON(), true);
  }

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
      return true;
    }
  }

  return false;
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(46).Buffer))

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(73)
var ieee754 = __webpack_require__(74)
var isArray = __webpack_require__(75)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(26)))

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
  , length = 64
  , map = {}
  , seed = 0
  , i = 0
  , prev;

/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
  var encoded = '';

  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);

  return encoded;
}

/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
  var decoded = 0;

  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }

  return decoded;
}

/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
  var now = encode(+new Date());

  if (now !== prev) return seed = 0, prev = now;
  return now +'.'+ encode(seed++);
}

//
// Map each character to its index.
//
for (; i < length; i++) map[alphabet[i]] = i;

//
// Expose the `yeast`, `encode` and `decode` functions.
//
yeast.encode = encode;
yeast.decode = decode;
module.exports = yeast;


/***/ }),
/* 48 */
/***/ (function(module, exports) {


var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Module dependencies.
 */

var parser = __webpack_require__(25);
var Emitter = __webpack_require__(14);
var toArray = __webpack_require__(83);
var on = __webpack_require__(50);
var bind = __webpack_require__(51);
var debug = __webpack_require__(8)('socket.io-client:socket');
var parseqs = __webpack_require__(20);
var hasBin = __webpack_require__(45);

/**
 * Module exports.
 */

module.exports = exports = Socket;

/**
 * Internal events (blacklisted).
 * These events can't be emitted by the user.
 *
 * @api private
 */

var events = {
  connect: 1,
  connect_error: 1,
  connect_timeout: 1,
  connecting: 1,
  disconnect: 1,
  error: 1,
  reconnect: 1,
  reconnect_attempt: 1,
  reconnect_failed: 1,
  reconnect_error: 1,
  reconnecting: 1,
  ping: 1,
  pong: 1
};

/**
 * Shortcut to `Emitter#emit`.
 */

var emit = Emitter.prototype.emit;

/**
 * `Socket` constructor.
 *
 * @api public
 */

function Socket(io, nsp, opts) {
  this.io = io;
  this.nsp = nsp;
  this.json = this; // compat
  this.ids = 0;
  this.acks = {};
  this.receiveBuffer = [];
  this.sendBuffer = [];
  this.connected = false;
  this.disconnected = true;
  this.flags = {};
  if (opts && opts.query) {
    this.query = opts.query;
  }
  if (this.io.autoConnect) this.open();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Subscribe to open, close and packet events
 *
 * @api private
 */

Socket.prototype.subEvents = function () {
  if (this.subs) return;

  var io = this.io;
  this.subs = [on(io, 'open', bind(this, 'onopen')), on(io, 'packet', bind(this, 'onpacket')), on(io, 'close', bind(this, 'onclose'))];
};

/**
 * "Opens" the socket.
 *
 * @api public
 */

Socket.prototype.open = Socket.prototype.connect = function () {
  if (this.connected) return this;

  this.subEvents();
  this.io.open(); // ensure open
  if ('open' === this.io.readyState) this.onopen();
  this.emit('connecting');
  return this;
};

/**
 * Sends a `message` event.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.send = function () {
  var args = toArray(arguments);
  args.unshift('message');
  this.emit.apply(this, args);
  return this;
};

/**
 * Override `emit`.
 * If the event is in `events`, it's emitted normally.
 *
 * @param {String} event name
 * @return {Socket} self
 * @api public
 */

Socket.prototype.emit = function (ev) {
  if (events.hasOwnProperty(ev)) {
    emit.apply(this, arguments);
    return this;
  }

  var args = toArray(arguments);
  var packet = {
    type: (this.flags.binary !== undefined ? this.flags.binary : hasBin(args)) ? parser.BINARY_EVENT : parser.EVENT,
    data: args
  };

  packet.options = {};
  packet.options.compress = !this.flags || false !== this.flags.compress;

  // event ack callback
  if ('function' === typeof args[args.length - 1]) {
    debug('emitting packet with ack id %d', this.ids);
    this.acks[this.ids] = args.pop();
    packet.id = this.ids++;
  }

  if (this.connected) {
    this.packet(packet);
  } else {
    this.sendBuffer.push(packet);
  }

  this.flags = {};

  return this;
};

/**
 * Sends a packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.packet = function (packet) {
  packet.nsp = this.nsp;
  this.io.packet(packet);
};

/**
 * Called upon engine `open`.
 *
 * @api private
 */

Socket.prototype.onopen = function () {
  debug('transport is open - connecting');

  // write connect packet if necessary
  if ('/' !== this.nsp) {
    if (this.query) {
      var query = _typeof(this.query) === 'object' ? parseqs.encode(this.query) : this.query;
      debug('sending connect packet with query %s', query);
      this.packet({ type: parser.CONNECT, query: query });
    } else {
      this.packet({ type: parser.CONNECT });
    }
  }
};

/**
 * Called upon engine `close`.
 *
 * @param {String} reason
 * @api private
 */

Socket.prototype.onclose = function (reason) {
  debug('close (%s)', reason);
  this.connected = false;
  this.disconnected = true;
  delete this.id;
  this.emit('disconnect', reason);
};

/**
 * Called with socket packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onpacket = function (packet) {
  var sameNamespace = packet.nsp === this.nsp;
  var rootNamespaceError = packet.type === parser.ERROR && packet.nsp === '/';

  if (!sameNamespace && !rootNamespaceError) return;

  switch (packet.type) {
    case parser.CONNECT:
      this.onconnect();
      break;

    case parser.EVENT:
      this.onevent(packet);
      break;

    case parser.BINARY_EVENT:
      this.onevent(packet);
      break;

    case parser.ACK:
      this.onack(packet);
      break;

    case parser.BINARY_ACK:
      this.onack(packet);
      break;

    case parser.DISCONNECT:
      this.ondisconnect();
      break;

    case parser.ERROR:
      this.emit('error', packet.data);
      break;
  }
};

/**
 * Called upon a server event.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onevent = function (packet) {
  var args = packet.data || [];
  debug('emitting event %j', args);

  if (null != packet.id) {
    debug('attaching ack callback to event');
    args.push(this.ack(packet.id));
  }

  if (this.connected) {
    emit.apply(this, args);
  } else {
    this.receiveBuffer.push(args);
  }
};

/**
 * Produces an ack callback to emit with an event.
 *
 * @api private
 */

Socket.prototype.ack = function (id) {
  var self = this;
  var sent = false;
  return function () {
    // prevent double callbacks
    if (sent) return;
    sent = true;
    var args = toArray(arguments);
    debug('sending ack %j', args);

    self.packet({
      type: hasBin(args) ? parser.BINARY_ACK : parser.ACK,
      id: id,
      data: args
    });
  };
};

/**
 * Called upon a server acknowlegement.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onack = function (packet) {
  var ack = this.acks[packet.id];
  if ('function' === typeof ack) {
    debug('calling ack %s with %j', packet.id, packet.data);
    ack.apply(this, packet.data);
    delete this.acks[packet.id];
  } else {
    debug('bad ack %s', packet.id);
  }
};

/**
 * Called upon server connect.
 *
 * @api private
 */

Socket.prototype.onconnect = function () {
  this.connected = true;
  this.disconnected = false;
  this.emit('connect');
  this.emitBuffered();
};

/**
 * Emit buffered events (received and emitted).
 *
 * @api private
 */

Socket.prototype.emitBuffered = function () {
  var i;
  for (i = 0; i < this.receiveBuffer.length; i++) {
    emit.apply(this, this.receiveBuffer[i]);
  }
  this.receiveBuffer = [];

  for (i = 0; i < this.sendBuffer.length; i++) {
    this.packet(this.sendBuffer[i]);
  }
  this.sendBuffer = [];
};

/**
 * Called upon server disconnect.
 *
 * @api private
 */

Socket.prototype.ondisconnect = function () {
  debug('server disconnect (%s)', this.nsp);
  this.destroy();
  this.onclose('io server disconnect');
};

/**
 * Called upon forced client/server side disconnections,
 * this method ensures the manager stops tracking us and
 * that reconnections don't get triggered for this.
 *
 * @api private.
 */

Socket.prototype.destroy = function () {
  if (this.subs) {
    // clean subscriptions to avoid reconnections
    for (var i = 0; i < this.subs.length; i++) {
      this.subs[i].destroy();
    }
    this.subs = null;
  }

  this.io.destroy(this);
};

/**
 * Disconnects the socket manually.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.close = Socket.prototype.disconnect = function () {
  if (this.connected) {
    debug('performing disconnect (%s)', this.nsp);
    this.packet({ type: parser.DISCONNECT });
  }

  // remove socket from pool
  this.destroy();

  if (this.connected) {
    // fire events
    this.onclose('io client disconnect');
  }
  return this;
};

/**
 * Sets the compress flag.
 *
 * @param {Boolean} if `true`, compresses the sending data
 * @return {Socket} self
 * @api public
 */

Socket.prototype.compress = function (compress) {
  this.flags.compress = compress;
  return this;
};

/**
 * Sets the binary flag
 *
 * @param {Boolean} whether the emitted data contains binary
 * @return {Socket} self
 * @api public
 */

Socket.prototype.binary = function (binary) {
  this.flags.binary = binary;
  return this;
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module exports.
 */

module.exports = on;

/**
 * Helper for subscriptions.
 *
 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
 * @param {String} event name
 * @param {Function} callback
 * @api public
 */

function on(obj, ev, fn) {
  obj.on(ev, fn);
  return {
    destroy: function destroy() {
      obj.removeListener(ev, fn);
    }
  };
}

/***/ }),
/* 51 */
/***/ (function(module, exports) {

/**
 * Slice reference.
 */

var slice = [].slice;

/**
 * Bind `obj` to `fn`.
 *
 * @param {Object} obj
 * @param {Function|String} fn or string
 * @return {Function}
 * @api public
 */

module.exports = function(obj, fn){
  if ('string' == typeof fn) fn = obj[fn];
  if ('function' != typeof fn) throw new Error('bind() requires a function');
  var args = slice.call(arguments, 2);
  return function(){
    return fn.apply(obj, args.concat(slice.call(arguments)));
  }
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var config_1 = __webpack_require__(85);
var local_storage_dispatcher_1 = __webpack_require__(53);
var GoEasyDomainNumber = /** @class */ (function () {
    function GoEasyDomainNumber() {
    }
    GoEasyDomainNumber.prototype.refreshNumber = function () {
        var key = GoEasyDomainNumber.GOEASY_DOMAIN_NUMBER;
        var storage = local_storage_dispatcher_1.LocalStorageDispatcher.localStorage();
        var number = Math.floor(Math.random() * (config_1["default"].maxNumber - 1) + 1);
        if (storage !== null) {
            number = parseInt(storage.get(key)) || number;
        }
        if (number > 0 && number < config_1["default"].maxNumber) {
            number += 1;
        }
        else if (number === config_1["default"].maxNumber) {
            number = 1;
        }
        if (storage !== null) {
            storage.put(key, number);
        }
        return number;
    };
    GoEasyDomainNumber.GOEASY_DOMAIN_NUMBER = 'GOEASY_DOMAIN_NUMBER';
    return GoEasyDomainNumber;
}());
exports["default"] = new GoEasyDomainNumber();


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.LocalStorageDispatcher = void 0;
var cookie_1 = __webpack_require__(86);
var CookieStorage = /** @class */ (function () {
    function CookieStorage() {
        this.domain = null;
        var isDomain = /^(?:[A-za-z0-9-]+\.)+[A-za-z]{2,4}(?:[\/\?#][\/=\?%\-&~`@[\]\':+!\.#\w]*)?$/;
        this.domain = typeof location !== 'undefined' && isDomain.test(location.host) ? location.host.split('.').slice(-2).join('.') : null;
    }
    CookieStorage.prototype.get = function (key) {
        var result = cookie_1.Cookie.get(key) || null;
        return JSON.parse(result);
    };
    CookieStorage.prototype.put = function (key, data) {
        var expire = new Date(2030, 12, 31, 0, 0, 0, 0);
        var domain = this.domain;
        cookie_1.Cookie.set(key, JSON.stringify(data), expire, domain);
    };
    CookieStorage.prototype.remove = function (key) {
        var domain = this.domain;
        cookie_1.Cookie.remove(key, domain);
    };
    CookieStorage.prototype.support = function () {
        return typeof navigator !== 'undefined' && navigator.cookieEnabled === true;
    };
    return CookieStorage;
}());
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
    }
    LocalStorage.prototype.get = function (key) {
        var result = localStorage.getItem(key);
        return JSON.parse(result);
    };
    LocalStorage.prototype.put = function (key, data) {
        var result = localStorage.setItem(key, JSON.stringify(data));
        JSON.stringify(result);
    };
    LocalStorage.prototype.remove = function (key) {
        localStorage.removeItem(key);
    };
    LocalStorage.prototype.support = function () {
        return typeof GameGlobal === 'undefined' && typeof localStorage !== 'undefined' && localStorage.setItem ? true : false;
    };
    return LocalStorage;
}());
var UniappLocalStorage = /** @class */ (function () {
    function UniappLocalStorage() {
    }
    UniappLocalStorage.prototype.get = function (key) {
        var result = uni.getStorageSync(key) || null;
        return JSON.parse(result);
    };
    UniappLocalStorage.prototype.put = function (key, data) {
        uni.setStorageSync(key, JSON.stringify(data));
    };
    UniappLocalStorage.prototype.remove = function (key) {
        uni.removeStorageSync(key);
    };
    UniappLocalStorage.prototype.support = function () {
        return typeof uni === "object" && uni.getStorageSync ? true : false;
    };
    return UniappLocalStorage;
}());
var WXLocalStorage = /** @class */ (function () {
    function WXLocalStorage() {
    }
    WXLocalStorage.prototype.get = function (key) {
        var result = wx.getStorageSync(key) || null;
        return JSON.parse(result);
    };
    WXLocalStorage.prototype.put = function (key, data) {
        wx.setStorageSync(key, JSON.stringify(data));
    };
    WXLocalStorage.prototype.remove = function (key) {
        wx.removeStorageSync(key);
    };
    WXLocalStorage.prototype.support = function () {
        return typeof wx === "object" && wx.getStorageSync ? true : false;
    };
    return WXLocalStorage;
}());
var AlipayLocalStorage = /** @class */ (function () {
    function AlipayLocalStorage() {
    }
    AlipayLocalStorage.prototype.get = function (key) {
        var result = my.getStorageSync(key) || null;
        return JSON.parse(result);
    };
    AlipayLocalStorage.prototype.put = function (key, data) {
        my.setStorageSync(key, JSON.stringify(data));
    };
    AlipayLocalStorage.prototype.remove = function (key) {
        my.removeStorageSync(key);
    };
    AlipayLocalStorage.prototype.support = function () {
        return typeof my !== 'undefined' && my.getStorageSync ? true : false;
    };
    return AlipayLocalStorage;
}());
var QQLocalStorage = /** @class */ (function () {
    function QQLocalStorage() {
    }
    QQLocalStorage.prototype.get = function (key) {
        var result = qq.getStorageSync(key) || null;
        return JSON.parse(result);
    };
    QQLocalStorage.prototype.put = function (key, data) {
        qq.setStorageSync(key, JSON.stringify(data));
    };
    QQLocalStorage.prototype.remove = function (key) {
        qq.removeStorageSync(key);
    };
    QQLocalStorage.prototype.support = function () {
        return typeof qq !== 'undefined' && qq.getStorageSync ? true : false;
    };
    return QQLocalStorage;
}());
var BytedanceLocalStorage = /** @class */ (function () {
    function BytedanceLocalStorage() {
    }
    BytedanceLocalStorage.prototype.get = function (key) {
        var result = tt.getStorageSync(key) || null;
        return JSON.parse(result);
    };
    BytedanceLocalStorage.prototype.put = function (key, data) {
        tt.setStorageSync(key, JSON.stringify(data));
    };
    BytedanceLocalStorage.prototype.remove = function (key) {
        tt.removeStorageSync(key);
    };
    BytedanceLocalStorage.prototype.support = function () {
        return typeof tt === "object" && tt.getStorageSync ? true : false;
    };
    return BytedanceLocalStorage;
}());
var BaiduLocalStorage = /** @class */ (function () {
    function BaiduLocalStorage() {
    }
    BaiduLocalStorage.prototype.get = function (key) {
        var result = swan.getStorageSync(key) || null;
        return JSON.parse(result);
    };
    BaiduLocalStorage.prototype.put = function (key, data) {
        swan.setStorageSync(key, JSON.stringify(data));
    };
    BaiduLocalStorage.prototype.remove = function (key) {
        swan.removeStorageSync(key);
    };
    BaiduLocalStorage.prototype.support = function () {
        return typeof swan !== 'undefined' && swan.getStorageSync ? true : false;
    };
    return BaiduLocalStorage;
}());
var BrowserStorage = /** @class */ (function () {
    function BrowserStorage() {
        this.api = BrowserStorage.dispatch();
        console.log(this.api);
    }
    BrowserStorage.dispatch = function () {
        var local = new LocalStorage();
        var cookie = new CookieStorage();
        if (local.support()) {
            return local;
        }
        return cookie;
    };
    BrowserStorage.prototype.get = function (key) {
        var result = this.api.get(key);
        return result;
    };
    BrowserStorage.prototype.put = function (key, data) {
        this.api.put(key, data);
    };
    BrowserStorage.prototype.remove = function (key) {
        this.api.remove(key);
    };
    BrowserStorage.prototype.support = function () {
        return typeof localStorage !== 'undefined';
    };
    return BrowserStorage;
}());
var LocalStorageDispatcher = /** @class */ (function () {
    function LocalStorageDispatcher() {
        this.supportedStorage = null;
        var storages = LocalStorageDispatcher.storages;
        storages.push(new UniappLocalStorage());
        storages.push(new LocalStorage());
        storages.push(new WXLocalStorage());
        storages.push(new CookieStorage());
        this.dispatch();
        console.log('LocalStorageDispatcher constructor - ', this.supportedStorage);
    }
    LocalStorageDispatcher.localStorage = function () {
        return this.instance.supportedStorage;
    };
    LocalStorageDispatcher.prototype.dispatch = function () {
        var e_1, _a;
        try {
            for (var _b = __values(LocalStorageDispatcher.storages), _c = _b.next(); !_c.done; _c = _b.next()) {
                var storage = _c.value;
                if (storage.support()) {
                    this.supportedStorage = storage;
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    LocalStorageDispatcher.storages = new Array();
    LocalStorageDispatcher.instance = new LocalStorageDispatcher();
    return LocalStorageDispatcher;
}());
exports.LocalStorageDispatcher = LocalStorageDispatcher;


/***/ }),
/* 54 */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),
/* 55 */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]]
  ]).join('');
}

module.exports = bytesToUuid;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.GoEasyUploader = void 0;
var FileUploader_1 = __webpack_require__(97);
var RequestBuilder_1 = __webpack_require__(101);
var GoEasyUploader = /** @class */ (function () {
    function GoEasyUploader() {
        this.requestBuilder = null;
        this.fileUploader = FileUploader_1.fileUploader;
        this.requestBuilder = new RequestBuilder_1["default"]();
    }
    GoEasyUploader.prototype.upload = function (file, name, onProgress, messageType) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var promise = _this.requestBuilder.build(file, name, messageType);
            promise
                .then(function (uploadRequest) {
                resolve(_this.doUpload(uploadRequest, onProgress));
            })["catch"](function (e) {
                reject(e);
            });
        });
    };
    GoEasyUploader.prototype.customizeUpload = function (uploadRequest, onProgress) {
        this.doUpload(uploadRequest, onProgress);
    };
    GoEasyUploader.prototype.doUpload = function (uploadRequest, onProgress) {
        return this.fileUploader.upload(uploadRequest, onProgress);
    };
    return GoEasyUploader;
}());
exports.GoEasyUploader = GoEasyUploader;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var FileUploadRequest = /** @class */ (function () {
    function FileUploadRequest(host, headers, parameters, file, payload) {
        this.host = host;
        this.headers = headers;
        this.parameters = parameters;
        this.file = file;
        this.payload = payload;
    }
    return FileUploadRequest;
}());
exports["default"] = FileUploadRequest;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var AbstractOSSRequestBuilder = /** @class */ (function () {
    function AbstractOSSRequestBuilder() {
    }
    AbstractOSSRequestBuilder.prototype.build = function (token, file, messageType) {
    };
    AbstractOSSRequestBuilder.prototype.newFileName = function (token) {
        return token && token.newFilename || '';
    };
    return AbstractOSSRequestBuilder;
}());
exports["default"] = AbstractOSSRequestBuilder;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.SocketEvents = void 0;
/**
 * todo 为了讲im的receiver与im notification分离开,后续会删除
 */
var SocketEvents;
(function (SocketEvents) {
    SocketEvents["IM_MESSAGE_RECEIVED"] = "IM_MESSAGE_RECEIVED";
})(SocketEvents = exports.SocketEvents || (exports.SocketEvents = {}));


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.PrivateMessage = void 0;
var AbstractMessage_1 = __webpack_require__(22);
var GoEasy_1 = __webpack_require__(5);
var PrivateMessage = /** @class */ (function (_super) {
    __extends(PrivateMessage, _super);
    function PrivateMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PrivateMessage.prototype.scene = function () {
        return GoEasy_1.Scene.PRIVATE;
    };
    PrivateMessage.prototype.targetId = function () {
        return this.receiverId;
    };
    return PrivateMessage;
}(AbstractMessage_1.AbstractMessage));
exports.PrivateMessage = PrivateMessage;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.GroupMessage = void 0;
var AbstractMessage_1 = __webpack_require__(22);
var GoEasy_1 = __webpack_require__(5);
var GroupMessage = /** @class */ (function (_super) {
    __extends(GroupMessage, _super);
    function GroupMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroupMessage.prototype.scene = function () {
        return GoEasy_1.Scene.GROUP;
    };
    GroupMessage.prototype.targetId = function () {
        return this.groupId;
    };
    return GroupMessage;
}(AbstractMessage_1.AbstractMessage));
exports.GroupMessage = GroupMessage;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.FileMessagePayloadImprover = void 0;
var AbstractPayloadImprover_1 = __webpack_require__(134);
var GoEasyUploader_1 = __webpack_require__(56);
var MessageType_1 = __webpack_require__(18);
var FileMessagePayloadImprover = /** @class */ (function (_super) {
    __extends(FileMessagePayloadImprover, _super);
    function FileMessagePayloadImprover() {
        var _this = _super.call(this) || this;
        _this.goEasyUploader = new GoEasyUploader_1.GoEasyUploader();
        return _this;
    }
    FileMessagePayloadImprover.prototype.improve = function (options) {
        var _this = this;
        var message = options.message;
        return new Promise(function (resolve, reject) {
            var name;
            var payload;
            var buildOptions = message.buildOptions;
            var createOptions = buildOptions.createOptions;
            if (message.type === MessageType_1.MessageType.VIDEO) {
                payload = message.payload;
                name = payload.video.name;
            }
            else {
                payload = message.payload;
                name = payload.name;
            }
            var uploadPromise = _this.goEasyUploader.upload(createOptions.file, name, createOptions.onProgress, message.type);
            uploadPromise.then(function (uploadResponse) {
                _this.setPayload(uploadResponse, message);
                resolve();
            })["catch"](function (e) {
                reject(e);
            });
        });
    };
    FileMessagePayloadImprover.prototype.setPayload = function (uploadResponse, message) {
        var _a = uploadResponse.content, content = _a === void 0 ? {} : _a;
        var payload = message.payload;
        payload.url = content.url;
        payload.name = content.newFileName;
    };
    return FileMessagePayloadImprover;
}(AbstractPayloadImprover_1.AbstractPayloadImprover));
exports.FileMessagePayloadImprover = FileMessagePayloadImprover;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.PUBSUB_INTERNAL_EVENTS = void 0;
var PUBSUB_INTERNAL_EVENTS;
(function (PUBSUB_INTERNAL_EVENTS) {
    PUBSUB_INTERNAL_EVENTS["MESSAGE_RECEIVED"] = "PUBSUB_INTERNAL_MESSAGE_RECEIVED";
})(PUBSUB_INTERNAL_EVENTS = exports.PUBSUB_INTERNAL_EVENTS || (exports.PUBSUB_INTERNAL_EVENTS = {}));


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var AbstractSocket_1 = __webpack_require__(39);
var IOSocket_1 = __webpack_require__(92);
var Rocket_1 = __webpack_require__(2);
var Permission_1 = __webpack_require__(1);
var NetworkStatus_1 = __webpack_require__(12);
var MessageObserver_1 = __webpack_require__(93);
var utils_1 = __webpack_require__(0);
var SocketTimeout_1 = __webpack_require__(3);
var GoEasy_1 = __webpack_require__(5);
var platform_detector_1 = __webpack_require__(30);
var anonymous_user_id_repository_1 = __webpack_require__(94);
var ClientInfo_1 = __webpack_require__(95);
var RocketTypes_1 = __webpack_require__(4);
var GoEasySocket = /** @class */ (function (_super) {
    __extends(GoEasySocket, _super);
    function GoEasySocket(goEasyOptions, connectOptions) {
        var _this = _super.call(this) || this;
        _this.ioSocket = null;
        //连接参数
        _this.sid = null;
        _this.appKey = null;
        _this.anonymous = false;
        _this.userId = null;
        _this.userData = null;
        _this.otp = null;
        _this.artifactVersion = '0.0.0';
        // imVersion = '0.0.0';
        _this.uri = null;
        _this.ioOpts = null;
        // type = ''; //im or goeasy(pubsub)
        _this.allowNotification = false;
        //业务数据
        _this.reconnectingTimes = 0;
        //观察者
        _this.messageObservers = {};
        _this.connectFailedObservers = [];
        _this.connectingObservers = [];
        _this.expiredReconnectedObservers = [];
        _this.onConnectSuccess = utils_1.noop;
        _this.onConnectFailed = utils_1.noop;
        _this.onConnectProgress = utils_1.noop;
        _this.setUriAndOpts(goEasyOptions);
        _this.extendOptions(connectOptions);
        //初始化ioSocket 添加监听器
        _this.ioSocket = new IOSocket_1["default"]({
            onDisconnected: _this.onIoDisconnected.bind(_this),
            onReconnecting: _this.onIoReconnecting.bind(_this)
        });
        _this.ioSocket.addConnectedObserver(_this.onIoReconnected.bind(_this));
        //初始化连接参数
        _this.appKey = goEasyOptions.appkey;
        _this.allowNotification = goEasyOptions.allowNotification;
        _this.modules = goEasyOptions.modules;
        if (utils_1.calibrator.isEmpty(connectOptions.id)) {
            _this.anonymous = true;
            _this.userId = anonymous_user_id_repository_1.AnonymousUserIdRepository.get();
        }
        else {
            _this.userId = connectOptions.id;
        }
        _this.artifactVersion = GoEasy_1["default"].version;
        //注册监听器
        _this.addConnectedObserver(_this.onConnectSuccess);
        _this.addConnectFailedObserver(_this.onConnectFailed);
        _this.addConnectingObserver(_this.onConnectProgress);
        return _this;
    }
    GoEasySocket.prototype.extendOptions = function (options) {
        if (utils_1.calibrator.isFunction(options.onSuccess)) {
            this.onConnectSuccess = options.onSuccess;
        }
        if (utils_1.calibrator.isFunction(options.onFailed)) {
            this.onConnectFailed = options.onFailed;
        }
        if (utils_1.calibrator.isFunction(options.onProgress)) {
            this.onConnectProgress = options.onProgress;
        }
        if (utils_1.calibrator.isDef(options.data) && !utils_1.calibrator.isObject(options.data)) {
            throw ({
                code: 400,
                content: 'TypeError: data requires an object.'
            });
        }
        var len = utils_1.calibrator.isDef(options.data) ? String(options.data).length : 0;
        if (len > 300) {
            if (utils_1.calibrator.isObject(options) && utils_1.calibrator.isFunction(options.onFailed)) {
                throw ({
                    code: 400,
                    content: 'user.data-length limit 300 byte.'
                });
            }
        }
        else {
            this.userData = options.data;
        }
        this.otp = options.otp || null;
    };
    GoEasySocket.prototype.setUriAndOpts = function (options) {
        var supportTLS = true;
        if (platform_detector_1.PlatformDetector.currentPlatform() === platform_detector_1.Platform.BROWSER) {
            var host = '://' + utils_1.GoEasyDomainNumber.refreshNumber() + options.host;
            var transports = void 0;
            if (options.supportOldBrowser === true) {
                transports = ['polling', 'websocket'];
                supportTLS = false;
            }
            else {
                transports = ['websocket'];
            }
            if (options.forceTLS === false || !supportTLS) {
                this.uri = 'http' + host + ':80';
            }
            else {
                this.uri = 'https' + host + ':443';
            }
            this.ioOpts = { transports: transports, timeout: SocketTimeout_1.SocketTimeout.connect };
        }
        else {
            this.uri = 'https://wx-' + options.host + ':443';
            this.ioOpts = { transports: ['websocket'], reconnectionDelayMax: SocketTimeout_1.SocketTimeout.reconnectionDelayMax };
        }
    };
    GoEasySocket.prototype.onIoReconnected = function () {
        if (this.status === NetworkStatus_1.NetworkStatus.RECONNECTING) {
            this.authorize();
        }
    };
    GoEasySocket.prototype.emit = function (rocket) {
        _super.prototype.emit.call(this, rocket);
    };
    GoEasySocket.prototype.doEmit = function (name, params, ack) {
        params.sid = this.sid;
        this.ioSocket.doEmit(name, params, ack);
    };
    GoEasySocket.prototype.sendAck = function (name, data) {
        this.ioSocket.io.emit(name, data);
    };
    //连接
    GoEasySocket.prototype.connect = function (notification) {
        var _this = this;
        //触发 连接中
        _super.prototype.connect.call(this);
        this.onConnecting();
        this.ioSocket.connect({ uri: this.uri, opts: this.ioOpts, });
        if (notification && notification.supportNotification() && notification.getRegIdPromise()) {
            notification.getRegIdPromise()
                .then(function (result) {
                console.log('Reg id is resolved: ', result);
                _this.regId = result;
                _this.authorize();
            })["catch"](function (e) {
                console.warn("Failed to register the Manufacturers Push service：" + JSON.stringify(e));
                _this.authorize();
            });
        }
        else {
            this.authorize();
        }
    };
    //断连
    GoEasySocket.prototype.disconnect = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var success = function () {
                _this.status = NetworkStatus_1.NetworkStatus.DISCONNECTED;
                _this.ioSocket.disconnect();
                resolve();
            };
            if (_this.allowNotification) {
                var fail = function (e) {
                    reject(e);
                };
                var rocket = new Rocket_1["default"]({
                    name: RocketTypes_1.RocketTypes.manualDisconnect,
                    params: {},
                    permission: Permission_1.Permission.READ,
                    singleTimeout: SocketTimeout_1.SocketTimeout.commonInfiniteSingle,
                    totalTimeout: SocketTimeout_1.SocketTimeout.commonInfiniteTotal,
                    fail: fail,
                    success: success
                });
                _this.emit(rocket);
            }
            else {
                success();
            }
        });
    };
    //认证
    GoEasySocket.prototype.authorize = function () {
        var params = {
            appkey: this.appKey,
            userId: this.userId,
            userData: JSON.stringify(this.userData),
            otp: this.otp,
            artifactVersion: this.artifactVersion,
            // type: this.type,
            sid: this.sid,
            // imVersion : this.imVersion,
            allowNT: this.allowNotification,
            regId: this.regId,
            modules: this.modules,
            a: this.anonymous,
            z: ClientInfo_1.clientInfo.z
        };
        console.log("authorize params: ", JSON.stringify(params));
        var rocket = new Rocket_1["default"]({
            name: RocketTypes_1.RocketTypes.authorize,
            params: params,
            permission: Permission_1.Permission.NONE,
            singleTimeout: SocketTimeout_1.SocketTimeout.commonInfiniteSingle,
            totalTimeout: SocketTimeout_1.SocketTimeout.commonInfiniteTotal,
            success: this.onAuthorizeSuccess.bind(this),
            fail: this.onAuthorizeFailed.bind(this)
        });
        this.ioSocket.emit(rocket);
    };
    //连接中
    GoEasySocket.prototype.onConnecting = function () {
        this.notify(this.connectingObservers, this.reconnectingTimes);
    };
    //重连中
    GoEasySocket.prototype.onIoReconnecting = function () {
        this.reconnectingTimes++;
        if (this.status == NetworkStatus_1.NetworkStatus.CONNECTED || this.status == NetworkStatus_1.NetworkStatus.EXPIRED_RECONNECTED
            || this.status == NetworkStatus_1.NetworkStatus.RECONNECTING) {
            this.status = NetworkStatus_1.NetworkStatus.RECONNECTING;
        }
        else {
            this.status = NetworkStatus_1.NetworkStatus.CONNECTING;
        }
        this.onConnecting();
    };
    //断连
    GoEasySocket.prototype.onIoDisconnected = function () {
        if (this.status == NetworkStatus_1.NetworkStatus.DISCONNECTING) {
            this.status = NetworkStatus_1.NetworkStatus.DISCONNECTED;
            this.notify(this.disconnectedObservers);
        }
        //如果不是disconnecting的，我们就认为是断网重连，忽略掉
    };
    //连接成功
    GoEasySocket.prototype.onAuthorizeSuccess = function (authorizeAck) {
        if (this.anonymous === true && authorizeAck.u) {
            anonymous_user_id_repository_1.AnonymousUserIdRepository.put(authorizeAck.u);
            this.userId = authorizeAck.u;
        }
        if (this.status === NetworkStatus_1.NetworkStatus.RECONNECTING) {
            var expiredClient = this.sid !== authorizeAck.sid;
            if (expiredClient) {
                this.status = NetworkStatus_1.NetworkStatus.EXPIRED_RECONNECTED;
                this.notify(this.expiredReconnectedObservers);
            }
            else {
                this.status = NetworkStatus_1.NetworkStatus.RECONNECTED;
            }
        }
        else {
            this.status = NetworkStatus_1.NetworkStatus.CONNECTED;
            this.sid = authorizeAck.sid;
        }
        //设置权限
        if (authorizeAck.enablePublish) {
            if (!this.permissions.find(function (item) { return item == Permission_1.Permission.WRITE; })) {
                this.permissions.push(Permission_1.Permission.WRITE);
            }
        }
        if (authorizeAck.enableSubscribe) {
            if (!this.permissions.find(function (item) { return item == Permission_1.Permission.READ; })) {
                this.permissions.push(Permission_1.Permission.READ);
            }
        }
        this.reconnectingTimes = 0;
        this.notify(this.connectedObservers);
    };
    //连接失败
    GoEasySocket.prototype.onAuthorizeFailed = function (authorizeAck) {
        this.ioSocket.disconnect();
        this.status = NetworkStatus_1.NetworkStatus.CONNECT_FAILED;
        var response = {
            code: authorizeAck.resultCode || 408,
            content: authorizeAck.content || 'Host unreachable or timeout'
        };
        this.notify(this.connectFailedObservers, response);
    };
    GoEasySocket.prototype.addConnectingObserver = function (callback) {
        if (!utils_1.calibrator.isFunction(callback))
            return;
        this.connectingObservers.push(callback);
    };
    GoEasySocket.prototype.addConnectFailedObserver = function (callback) {
        if (!utils_1.calibrator.isFunction(callback))
            return;
        this.connectFailedObservers.push(callback);
    };
    GoEasySocket.prototype.addExpiredReconnectedObserver = function (callback) {
        if (!utils_1.calibrator.isFunction(callback))
            return;
        this.expiredReconnectedObservers.push(callback);
    };
    GoEasySocket.prototype.addMessageObserver = function (key, callback) {
        var _this = this;
        this.ioSocket.io.on(key, function (message) {
            _this.notifyMessageObservers(key, message);
        });
        if (!this.messageObservers[key]) {
            this.messageObservers[key] = [];
        }
        this.messageObservers[key].push(new MessageObserver_1.MessageObserver(callback));
    };
    GoEasySocket.prototype.notifyMessageObservers = function (key, message) {
        var observers = this.messageObservers[key];
        for (var i = 0; i < observers.length; i++) {
            observers[i].onMessage(key, message);
        }
    };
    return GoEasySocket;
}(AbstractSocket_1["default"]));
exports["default"] = GoEasySocket;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.Emitter = void 0;
var NetworkStatus_1 = __webpack_require__(12);
var Emitter = /** @class */ (function () {
    function Emitter(socket) {
        this.socket = socket;
    }
    Emitter.prototype.emit = function (rocket) {
        if (this.socket.status === NetworkStatus_1.NetworkStatus.CONNECT_FAILED
            || this.socket.status === NetworkStatus_1.NetworkStatus.DISCONNECTED) {
            rocket.fail({
                resultCode: '409',
                content: 'Please connect first'
            });
            return;
        }
        rocket.start();
        this.doEmit(rocket);
    };
    Emitter.prototype.doEmit = function (rocket) {
        var _this = this;
        if (rocket.isTimeout()) {
            rocket.fail({
                resultCode: 408,
                content: "Host unreachable or timeout"
            });
            return;
        }
        if (this.socket.status === NetworkStatus_1.NetworkStatus.CONNECT_FAILED) {
            rocket.fail({
                resultCode: 408,
                content: "Failed to connect GoEasy."
            });
            return;
        }
        if (this.authenticated()) {
            if (this.hasPermission(rocket)) {
                var status_1 = [NetworkStatus_1.NetworkStatus.CONNECTED, NetworkStatus_1.NetworkStatus.RECONNECTED, NetworkStatus_1.NetworkStatus.EXPIRED_RECONNECTED];
                if (status_1.includes(this.socket.status)) {
                    if (!rocket.complete) {
                        var timeout_1 = setTimeout(function () {
                            _this.doEmit(rocket);
                        }, rocket.singleTimeout);
                        if (rocket.unique) {
                            rocket.params.retried = rocket.retried;
                        }
                        this.socket.doEmit(rocket.name, rocket.params, function (ack) {
                            clearTimeout(timeout_1);
                            (ack.resultCode === 200 || ack.code == 200) ? rocket.success(ack) : rocket.fail(ack);
                        });
                        rocket.retried++;
                    }
                }
                else {
                    setTimeout(function () {
                        _this.doEmit(rocket);
                    }, 500);
                }
            }
            else {
                rocket.fail({
                    resultCode: 401,
                    content: 'No permission' //应用层要重新定义
                });
            }
        }
        else {
            setTimeout(function () {
                _this.doEmit(rocket);
            }, 500);
        }
    };
    Emitter.prototype.hasPermission = function (rocket) {
        return !!this.socket.permissions.find(function (item) { return item === rocket.permission; });
    };
    Emitter.prototype.authenticated = function () {
        var status = [NetworkStatus_1.NetworkStatus.CONNECTED, NetworkStatus_1.NetworkStatus.RECONNECTING, NetworkStatus_1.NetworkStatus.RECONNECTED, NetworkStatus_1.NetworkStatus.EXPIRED_RECONNECTED];
        return status.includes(this.socket.status);
    };
    return Emitter;
}());
exports.Emitter = Emitter;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Module dependencies.
 */

var url = __webpack_require__(67);
var parser = __webpack_require__(25);
var Manager = __webpack_require__(42);
var debug = __webpack_require__(8)('socket.io-client');

/**
 * Module exports.
 */

module.exports = exports = lookup;

/**
 * Managers cache.
 */

var cache = exports.managers = {};

/**
 * Looks up an existing `Manager` for multiplexing.
 * If the user summons:
 *
 *   `io('http://localhost/a');`
 *   `io('http://localhost/b');`
 *
 * We reuse the existing instance based on same scheme/port/host,
 * and we initialize sockets for each namespace.
 *
 * @api public
 */

function lookup(uri, opts) {
  if ((typeof uri === 'undefined' ? 'undefined' : _typeof(uri)) === 'object') {
    opts = uri;
    uri = undefined;
  }

  opts = opts || {};

  var parsed = url(uri);
  var source = parsed.source;
  var id = parsed.id;
  var path = parsed.path;
  var sameNamespace = cache[id] && path in cache[id].nsps;
  var newConnection = opts.forceNew || opts['force new connection'] || false === opts.multiplex || sameNamespace;

  var io;

  if (newConnection) {
    debug('ignoring socket cache for %s', source);
    io = Manager(source, opts);
  } else {
    if (!cache[id]) {
      debug('new io instance for %s', source);
      cache[id] = Manager(source, opts);
    }
    io = cache[id];
  }
  if (parsed.query && !opts.query) {
    opts.query = parsed.query;
  }
  return io.socket(parsed.path, opts);
}

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = parser.protocol;

/**
 * `connect`.
 *
 * @param {String} uri
 * @api public
 */

exports.connect = lookup;

/**
 * Expose constructors for standalone build.
 *
 * @api public
 */

exports.Manager = __webpack_require__(42);
exports.Socket = __webpack_require__(49);

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */

var parseuri = __webpack_require__(40);
var debug = __webpack_require__(8)('socket.io-client:url');

/**
 * Module exports.
 */

module.exports = url;

/**
 * URL parser.
 *
 * @param {String} url
 * @param {Object} An object meant to mimic window.location.
 *                 Defaults to window.location.
 * @api public
 */

function url(uri, loc) {
  var obj = uri;

  // default to window.location
  loc = loc || typeof location !== 'undefined' && location;
  if (null == uri) uri = loc.protocol + '//' + loc.host;

  // relative path support
  if ('string' === typeof uri) {
    if ('/' === uri.charAt(0)) {
      if ('/' === uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }

    if (!/^(https?|wss?):\/\//.test(uri)) {
      debug('protocol-less url %s', uri);
      if ('undefined' !== typeof loc) {
        uri = loc.protocol + '//' + uri;
      } else {
        uri = 'https://' + uri;
      }
    }

    // parse
    debug('parse %s', uri);
    obj = parseuri(uri);
  }

  // make sure we treat `localhost:80` and `localhost` equally
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = '80';
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = '443';
    }
  }

  obj.path = obj.path || '/';

  var ipv6 = obj.host.indexOf(':') !== -1;
  var host = ipv6 ? '[' + obj.host + ']' : obj.host;

  // define unique id
  obj.id = obj.protocol + '://' + host + ':' + obj.port;
  // define href
  obj.href = obj.protocol + '://' + host + (loc && loc.port === obj.port ? '' : ':' + obj.port);

  return obj;
}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(69);

/**
 * Exports parser
 *
 * @api public
 *
 */
module.exports.parser = __webpack_require__(15);

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Module dependencies.
 */

var transports = __webpack_require__(44);
var Emitter = __webpack_require__(14);
var debug = __webpack_require__(8)('engine.io-client:socket');
var index = __webpack_require__(48);
var parser = __webpack_require__(15);
var parseuri = __webpack_require__(40);
var parseqs = __webpack_require__(20);

/**
 * Module exports.
 */

module.exports = Socket;

/**
 * Socket constructor.
 *
 * @param {String|Object} uri or options
 * @param {Object} options
 * @api public
 */

function Socket(uri, opts) {
  if (!(this instanceof Socket)) return new Socket(uri, opts);

  opts = opts || {};

  if (uri && 'object' === (typeof uri === 'undefined' ? 'undefined' : _typeof(uri))) {
    opts = uri;
    uri = null;
  }

  if (uri) {
    uri = parseuri(uri);
    opts.hostname = uri.host;
    opts.secure = uri.protocol === 'https' || uri.protocol === 'wss';
    opts.port = uri.port;
    if (uri.query) opts.query = uri.query;
  } else if (opts.host) {
    opts.hostname = parseuri(opts.host).host;
  }

  this.secure = null != opts.secure ? opts.secure : typeof location !== 'undefined' && 'https:' === location.protocol;

  if (opts.hostname && !opts.port) {
    // if no port is specified manually, use the protocol default
    opts.port = this.secure ? '443' : '80';
  }

  this.agent = opts.agent || false;
  this.hostname = opts.hostname || (typeof location !== 'undefined' ? location.hostname : 'localhost');
  this.port = opts.port || (typeof location !== 'undefined' && location.port ? location.port : this.secure ? 443 : 80);
  this.query = opts.query || {};
  if ('string' === typeof this.query) this.query = parseqs.decode(this.query);
  this.upgrade = false !== opts.upgrade;
  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
  this.forceJSONP = !!opts.forceJSONP;
  this.jsonp = false !== opts.jsonp;
  this.forceBase64 = !!opts.forceBase64;
  this.enablesXDR = !!opts.enablesXDR;
  this.timestampParam = opts.timestampParam || 't';
  this.timestampRequests = opts.timestampRequests;
  this.transports = opts.transports || ['polling', 'websocket'];
  this.transportOptions = opts.transportOptions || {};
  this.readyState = '';
  this.writeBuffer = [];
  this.prevBufferLen = 0;
  this.policyPort = opts.policyPort || 843;
  this.rememberUpgrade = opts.rememberUpgrade || false;
  this.binaryType = null;
  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
  this.perMessageDeflate = false !== opts.perMessageDeflate ? opts.perMessageDeflate || {} : false;

  if (true === this.perMessageDeflate) this.perMessageDeflate = {};
  if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
    this.perMessageDeflate.threshold = 1024;
  }

  // SSL options for Node.js client
  this.pfx = opts.pfx || null;
  this.key = opts.key || null;
  this.passphrase = opts.passphrase || null;
  this.cert = opts.cert || null;
  this.ca = opts.ca || null;
  this.ciphers = opts.ciphers || null;
  this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? true : opts.rejectUnauthorized;
  this.forceNode = !!opts.forceNode;

  // detect ReactNative environment
  this.isReactNative = typeof navigator !== 'undefined' && typeof navigator.product === 'string' && navigator.product.toLowerCase() === 'reactnative';

  // other options for Node.js or ReactNative client
  if (typeof self === 'undefined' || this.isReactNative) {
    if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
      this.extraHeaders = opts.extraHeaders;
    }

    if (opts.localAddress) {
      this.localAddress = opts.localAddress;
    }
  }

  // set on handshake
  this.id = null;
  this.upgrades = null;
  this.pingInterval = null;
  this.pingTimeout = null;

  // set on heartbeat
  this.pingIntervalTimer = null;
  this.pingTimeoutTimer = null;

  this.open();
}

Socket.priorWebsocketSuccess = false;

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Protocol version.
 *
 * @api public
 */

Socket.protocol = parser.protocol; // this is an int

/**
 * Expose deps for legacy compatibility
 * and standalone browser access.
 */

Socket.Socket = Socket;
Socket.Transport = __webpack_require__(27);
Socket.transports = __webpack_require__(44);
Socket.parser = __webpack_require__(15);

/**
 * Creates transport of the given type.
 *
 * @param {String} transport name
 * @return {Transport}
 * @api private
 */

Socket.prototype.createTransport = function (name) {
  debug('creating transport "%s"', name);
  var query = clone(this.query);

  // append engine.io protocol identifier
  query.EIO = parser.protocol;

  // transport name
  query.transport = name;

  // per-transport options
  var options = this.transportOptions[name] || {};

  // session id if we already have one
  if (this.id) query.sid = this.id;

  var transport = new transports[name]({
    query: query,
    socket: this,
    agent: options.agent || this.agent,
    hostname: options.hostname || this.hostname,
    port: options.port || this.port,
    secure: options.secure || this.secure,
    path: options.path || this.path,
    forceJSONP: options.forceJSONP || this.forceJSONP,
    jsonp: options.jsonp || this.jsonp,
    forceBase64: options.forceBase64 || this.forceBase64,
    enablesXDR: options.enablesXDR || this.enablesXDR,
    timestampRequests: options.timestampRequests || this.timestampRequests,
    timestampParam: options.timestampParam || this.timestampParam,
    policyPort: options.policyPort || this.policyPort,
    pfx: options.pfx || this.pfx,
    key: options.key || this.key,
    passphrase: options.passphrase || this.passphrase,
    cert: options.cert || this.cert,
    ca: options.ca || this.ca,
    ciphers: options.ciphers || this.ciphers,
    rejectUnauthorized: options.rejectUnauthorized || this.rejectUnauthorized,
    perMessageDeflate: options.perMessageDeflate || this.perMessageDeflate,
    extraHeaders: options.extraHeaders || this.extraHeaders,
    forceNode: options.forceNode || this.forceNode,
    localAddress: options.localAddress || this.localAddress,
    requestTimeout: options.requestTimeout || this.requestTimeout,
    protocols: options.protocols || void 0,
    isReactNative: this.isReactNative
  });

  return transport;
};

function clone(obj) {
  var o = {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = obj[i];
    }
  }
  return o;
}

/**
 * Initializes transport to use and starts probe.
 *
 * @api private
 */
Socket.prototype.open = function () {
  var transport;
  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') !== -1) {
    transport = 'websocket';
  } else if (0 === this.transports.length) {
    // Emit error on next tick so it can be listened to
    var self = this;
    setTimeout(function () {
      self.emit('error', 'No transports available');
    }, 0);
    return;
  } else {
    transport = this.transports[0];
  }
  this.readyState = 'opening';

  // Retry with the next transport if the transport is disabled (jsonp: false)
  try {
    transport = this.createTransport(transport);
  } catch (e) {
    this.transports.shift();
    this.open();
    return;
  }

  transport.open();
  this.setTransport(transport);
};

/**
 * Sets the current transport. Disables the existing one (if any).
 *
 * @api private
 */

Socket.prototype.setTransport = function (transport) {
  debug('setting transport %s', transport.name);
  var self = this;

  if (this.transport) {
    debug('clearing existing transport %s', this.transport.name);
    this.transport.removeAllListeners();
  }

  // set up transport
  this.transport = transport;

  // set up transport listeners
  transport.on('drain', function () {
    self.onDrain();
  }).on('packet', function (packet) {
    self.onPacket(packet);
  }).on('error', function (e) {
    self.onError(e);
  }).on('close', function () {
    self.onClose('transport close');
  });
};

/**
 * Probes a transport.
 *
 * @param {String} transport name
 * @api private
 */

Socket.prototype.probe = function (name) {
  debug('probing transport "%s"', name);
  var transport = this.createTransport(name, { probe: 1 });
  var failed = false;
  var self = this;

  Socket.priorWebsocketSuccess = false;

  function onTransportOpen() {
    if (self.onlyBinaryUpgrades) {
      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
      failed = failed || upgradeLosesBinary;
    }
    if (failed) return;

    debug('probe transport "%s" opened', name);
    transport.send([{ type: 'ping', data: 'probe' }]);
    transport.once('packet', function (msg) {
      if (failed) return;
      if ('pong' === msg.type && 'probe' === msg.data) {
        debug('probe transport "%s" pong', name);
        self.upgrading = true;
        self.emit('upgrading', transport);
        if (!transport) return;
        Socket.priorWebsocketSuccess = 'websocket' === transport.name;

        debug('pausing current transport "%s"', self.transport.name);
        self.transport.pause(function () {
          if (failed) return;
          if ('closed' === self.readyState) return;
          debug('changing transport and sending upgrade packet');

          cleanup();

          self.setTransport(transport);
          transport.send([{ type: 'upgrade' }]);
          self.emit('upgrade', transport);
          transport = null;
          self.upgrading = false;
          self.flush();
        });
      } else {
        debug('probe transport "%s" failed', name);
        var err = new Error('probe error');
        err.transport = transport.name;
        self.emit('upgradeError', err);
      }
    });
  }

  function freezeTransport() {
    if (failed) return;

    // Any callback called by transport should be ignored since now
    failed = true;

    cleanup();

    transport.close();
    transport = null;
  }

  // Handle any error that happens while probing
  function onerror(err) {
    var error = new Error('probe error: ' + err);
    error.transport = transport.name;

    freezeTransport();

    debug('probe transport "%s" failed because of error: %s', name, err);

    self.emit('upgradeError', error);
  }

  function onTransportClose() {
    onerror('transport closed');
  }

  // When the socket is closed while we're probing
  function onclose() {
    onerror('socket closed');
  }

  // When the socket is upgraded while we're probing
  function onupgrade(to) {
    if (transport && to.name !== transport.name) {
      debug('"%s" works - aborting "%s"', to.name, transport.name);
      freezeTransport();
    }
  }

  // Remove all listeners on the transport and on self
  function cleanup() {
    transport.removeListener('open', onTransportOpen);
    transport.removeListener('error', onerror);
    transport.removeListener('close', onTransportClose);
    self.removeListener('close', onclose);
    self.removeListener('upgrading', onupgrade);
  }

  transport.once('open', onTransportOpen);
  transport.once('error', onerror);
  transport.once('close', onTransportClose);

  this.once('close', onclose);
  this.once('upgrading', onupgrade);

  transport.open();
};

/**
 * Called when connection is deemed open.
 *
 * @api public
 */

Socket.prototype.onOpen = function () {
  debug('socket open');
  this.readyState = 'open';
  Socket.priorWebsocketSuccess = 'websocket' === this.transport.name;
  this.emit('open');
  this.flush();

  // we check for `readyState` in case an `open`
  // listener already closed the socket
  if ('open' === this.readyState && this.upgrade && this.transport.pause) {
    debug('starting upgrade probes');
    for (var i = 0, l = this.upgrades.length; i < l; i++) {
      this.probe(this.upgrades[i]);
    }
  }
};

/**
 * Handles a packet.
 *
 * @api private
 */

Socket.prototype.onPacket = function (packet) {
  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

    this.emit('packet', packet);

    // Socket is live - any packet counts
    this.emit('heartbeat');

    switch (packet.type) {
      case 'open':
        this.onHandshake(JSON.parse(packet.data));
        break;

      case 'pong':
        this.setPing();
        this.emit('pong');
        break;

      case 'error':
        var err = new Error('server error');
        err.code = packet.data;
        this.onError(err);
        break;

      case 'message':
        this.emit('data', packet.data);
        this.emit('message', packet.data);
        break;
    }
  } else {
    debug('packet received with socket readyState "%s"', this.readyState);
  }
};

/**
 * Called upon handshake completion.
 *
 * @param {Object} handshake obj
 * @api private
 */

Socket.prototype.onHandshake = function (data) {
  this.emit('handshake', data);
  this.id = data.sid;
  this.transport.query.sid = data.sid;
  this.upgrades = this.filterUpgrades(data.upgrades);
  this.pingInterval = data.pingInterval;
  this.pingTimeout = data.pingTimeout;
  this.onOpen();
  // In case open handler closes socket
  if ('closed' === this.readyState) return;
  this.setPing();

  // Prolong liveness of socket on heartbeat
  this.removeListener('heartbeat', this.onHeartbeat);
  this.on('heartbeat', this.onHeartbeat);
};

/**
 * Resets ping timeout.
 *
 * @api private
 */

Socket.prototype.onHeartbeat = function (timeout) {
  clearTimeout(this.pingTimeoutTimer);
  var self = this;
  self.pingTimeoutTimer = setTimeout(function () {
    if ('closed' === self.readyState) return;
    self.onClose('ping timeout');
  }, timeout || self.pingInterval + self.pingTimeout);
};

/**
 * Pings server every `this.pingInterval` and expects response
 * within `this.pingTimeout` or closes connection.
 *
 * @api private
 */

Socket.prototype.setPing = function () {
  var self = this;
  clearTimeout(self.pingIntervalTimer);
  self.pingIntervalTimer = setTimeout(function () {
    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
    self.ping();
    self.onHeartbeat(self.pingTimeout);
  }, self.pingInterval);
};

/**
* Sends a ping packet.
*
* @api private
*/

Socket.prototype.ping = function () {
  var self = this;
  this.sendPacket('ping', function () {
    self.emit('ping');
  });
};

/**
 * Called on `drain` event
 *
 * @api private
 */

Socket.prototype.onDrain = function () {
  this.writeBuffer.splice(0, this.prevBufferLen);

  // setting prevBufferLen = 0 is very important
  // for example, when upgrading, upgrade packet is sent over,
  // and a nonzero prevBufferLen could cause problems on `drain`
  this.prevBufferLen = 0;

  if (0 === this.writeBuffer.length) {
    this.emit('drain');
  } else {
    this.flush();
  }
};

/**
 * Flush write buffers.
 *
 * @api private
 */

Socket.prototype.flush = function () {
  if ('closed' !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
    debug('flushing %d packets in socket', this.writeBuffer.length);
    this.transport.send(this.writeBuffer);
    // keep track of current length of writeBuffer
    // splice writeBuffer and callbackBuffer on `drain`
    this.prevBufferLen = this.writeBuffer.length;
    this.emit('flush');
  }
};

/**
 * Sends a message.
 *
 * @param {String} message.
 * @param {Function} callback function.
 * @param {Object} options.
 * @return {Socket} for chaining.
 * @api public
 */

Socket.prototype.write = Socket.prototype.send = function (msg, options, fn) {
  this.sendPacket('message', msg, options, fn);
  return this;
};

/**
 * Sends a packet.
 *
 * @param {String} packet type.
 * @param {String} data.
 * @param {Object} options.
 * @param {Function} callback function.
 * @api private
 */

Socket.prototype.sendPacket = function (type, data, options, fn) {
  if ('function' === typeof data) {
    fn = data;
    data = undefined;
  }

  if ('function' === typeof options) {
    fn = options;
    options = null;
  }

  if ('closing' === this.readyState || 'closed' === this.readyState) {
    return;
  }

  options = options || {};
  options.compress = false !== options.compress;

  var packet = {
    type: type,
    data: data,
    options: options
  };
  this.emit('packetCreate', packet);
  this.writeBuffer.push(packet);
  if (fn) this.once('flush', fn);
  this.flush();
};

/**
 * Closes the connection.
 *
 * @api private
 */

Socket.prototype.close = function () {
  if ('opening' === this.readyState || 'open' === this.readyState) {
    this.readyState = 'closing';

    var self = this;

    if (this.writeBuffer.length) {
      this.once('drain', function () {
        if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      });
    } else if (this.upgrading) {
      waitForUpgrade();
    } else {
      close();
    }
  }

  function close() {
    self.onClose('forced close');
    debug('socket closing - telling transport to close');
    self.transport.close();
  }

  function cleanupAndClose() {
    self.removeListener('upgrade', cleanupAndClose);
    self.removeListener('upgradeError', cleanupAndClose);
    close();
  }

  function waitForUpgrade() {
    // wait for upgrade to finish since we can't send packets while pausing a transport
    self.once('upgrade', cleanupAndClose);
    self.once('upgradeError', cleanupAndClose);
  }

  return this;
};

/**
 * Called upon transport error
 *
 * @api private
 */

Socket.prototype.onError = function (err) {
  debug('socket error %j', err);
  Socket.priorWebsocketSuccess = false;
  this.emit('error', err);
  this.onClose('transport error', err);
};

/**
 * Called upon transport close.
 *
 * @api private
 */

Socket.prototype.onClose = function (reason, desc) {
  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
    debug('socket close with reason: "%s"', reason);
    var self = this;

    // clear timers
    clearTimeout(this.pingIntervalTimer);
    clearTimeout(this.pingTimeoutTimer);

    // stop event from firing again for transport
    this.transport.removeAllListeners('close');

    // ensure transport won't stay open
    this.transport.close();

    // ignore further transport communication
    this.transport.removeAllListeners();

    // set ready state
    this.readyState = 'closed';

    // clear session id
    this.id = null;

    // emit close event
    this.emit('close', reason, desc);

    // clean buffers after, so users can still
    // grab the buffers on `close` event
    self.writeBuffer = [];
    self.prevBufferLen = 0;
  }
};

/**
 * Filters upgrades, returning only those matching client transports.
 *
 * @param {Array} server upgrades
 * @api private
 *
 */

Socket.prototype.filterUpgrades = function (upgrades) {
  var filteredUpgrades = [];
  for (var i = 0, j = upgrades.length; i < j; i++) {
    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
  }
  return filteredUpgrades;
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

/**
 * Module requirements.
 */

var Polling = __webpack_require__(71);
var inherit = __webpack_require__(28);

/**
 * Module exports.
 */

module.exports = JSONPPolling;

/**
 * Cached regular expressions.
 */

var rNewline = /\n/g;
var rEscapedNewline = /\\n/g;

/**
 * Global JSONP callbacks.
 */

var callbacks;

/**
 * Noop.
 */

function empty() {}

/**
 * Until https://github.com/tc39/proposal-global is shipped.
 */
function glob() {
  return typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};
}

/**
 * JSONP Polling constructor.
 *
 * @param {Object} opts.
 * @api public
 */

function JSONPPolling(opts) {
  Polling.call(this, opts);

  this.query = this.query || {};

  // define global callbacks array if not present
  // we do this here (lazily) to avoid unneeded global pollution
  if (!callbacks) {
    // we need to consider multiple engines in the same page
    var global = glob();
    callbacks = global.___eio = global.___eio || [];
  }

  // callback identifier
  this.index = callbacks.length;

  // add callback to jsonp global
  var self = this;
  callbacks.push(function (msg) {
    self.onData(msg);
  });

  // append to query string
  this.query.j = this.index;

  // prevent spurious errors from being emitted when the window is unloaded
  if (typeof addEventListener === 'function') {
    addEventListener('beforeunload', function () {
      if (self.script) self.script.onerror = empty;
    }, false);
  }
}

/**
 * Inherits from Polling.
 */

inherit(JSONPPolling, Polling);

/*
 * JSONP only supports binary as base64 encoded strings
 */

JSONPPolling.prototype.supportsBinary = false;

/**
 * Closes the socket.
 *
 * @api private
 */

JSONPPolling.prototype.doClose = function () {
  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  if (this.form) {
    this.form.parentNode.removeChild(this.form);
    this.form = null;
    this.iframe = null;
  }

  Polling.prototype.doClose.call(this);
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

JSONPPolling.prototype.doPoll = function () {
  var self = this;
  var script = document.createElement('script');

  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  script.async = true;
  script.src = this.uri();
  script.onerror = function (e) {
    self.onError('jsonp poll error', e);
  };

  var insertAt = document.getElementsByTagName('script')[0];
  if (insertAt) {
    insertAt.parentNode.insertBefore(script, insertAt);
  } else {
    (document.head || document.body).appendChild(script);
  }
  this.script = script;

  var isUAgecko = 'undefined' !== typeof navigator && /gecko/i.test(navigator.userAgent);

  if (isUAgecko) {
    setTimeout(function () {
      var iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      document.body.removeChild(iframe);
    }, 100);
  }
};

/**
 * Writes with a hidden iframe.
 *
 * @param {String} data to send
 * @param {Function} called upon flush.
 * @api private
 */

JSONPPolling.prototype.doWrite = function (data, fn) {
  var self = this;

  if (!this.form) {
    var form = document.createElement('form');
    var area = document.createElement('textarea');
    var id = this.iframeId = 'eio_iframe_' + this.index;
    var iframe;

    form.className = 'socketio';
    form.style.position = 'absolute';
    form.style.top = '-1000px';
    form.style.left = '-1000px';
    form.target = id;
    form.method = 'POST';
    form.setAttribute('accept-charset', 'utf-8');
    area.name = 'd';
    form.appendChild(area);
    document.body.appendChild(form);

    this.form = form;
    this.area = area;
  }

  this.form.action = this.uri();

  function complete() {
    initIframe();
    fn();
  }

  function initIframe() {
    if (self.iframe) {
      try {
        self.form.removeChild(self.iframe);
      } catch (e) {
        self.onError('jsonp polling iframe removal error', e);
      }
    }

    try {
      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
      var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
      iframe = document.createElement(html);
    } catch (e) {
      iframe = document.createElement('iframe');
      iframe.name = self.iframeId;
      iframe.src = 'javascript:0';
    }

    iframe.id = self.iframeId;

    self.form.appendChild(iframe);
    self.iframe = iframe;
  }

  initIframe();

  // escape \n to prevent it from being converted into \r\n by some UAs
  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
  data = data.replace(rEscapedNewline, '\\\n');
  this.area.value = data.replace(rNewline, '\\n');

  try {
    this.form.submit();
  } catch (e) {}

  if (this.iframe.attachEvent) {
    this.iframe.onreadystatechange = function () {
      if (self.iframe.readyState === 'complete') {
        complete();
      }
    };
  } else {
    this.iframe.onload = complete;
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(26)))

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */

var Transport = __webpack_require__(27);
var parseqs = __webpack_require__(20);
var parser = __webpack_require__(15);
var inherit = __webpack_require__(28);
var yeast = __webpack_require__(47);
var debug = __webpack_require__(8)('engine.io-client:polling');

/**
 * Module exports.
 */

module.exports = Polling;

/**
 * Is XHR2 supported?
 */

var hasXHR2 = function () {
  var XMLHttpRequest = __webpack_require__(79);
  var xhr = new XMLHttpRequest({ xdomain: false });
  return null != xhr.responseType;
}();

/**
 * Polling interface.
 *
 * @param {Object} opts
 * @api private
 */

function Polling(opts) {
  var forceBase64 = opts && opts.forceBase64;
  if (!hasXHR2 || forceBase64) {
    this.supportsBinary = false;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(Polling, Transport);

/**
 * Transport name.
 */

Polling.prototype.name = 'polling';

/**
 * Opens the socket (triggers polling). We write a PING message to determine
 * when the transport is open.
 *
 * @api private
 */

Polling.prototype.doOpen = function () {
  this.poll();
};

/**
 * Pauses polling.
 *
 * @param {Function} callback upon buffers are flushed and transport is paused
 * @api private
 */

Polling.prototype.pause = function (onPause) {
  var self = this;

  this.readyState = 'pausing';

  function pause() {
    debug('paused');
    self.readyState = 'paused';
    onPause();
  }

  if (this.polling || !this.writable) {
    var total = 0;

    if (this.polling) {
      debug('we are currently polling - waiting to pause');
      total++;
      this.once('pollComplete', function () {
        debug('pre-pause polling complete');
        --total || pause();
      });
    }

    if (!this.writable) {
      debug('we are currently writing - waiting to pause');
      total++;
      this.once('drain', function () {
        debug('pre-pause writing complete');
        --total || pause();
      });
    }
  } else {
    pause();
  }
};

/**
 * Starts polling cycle.
 *
 * @api public
 */

Polling.prototype.poll = function () {
  debug('polling');
  this.polling = true;
  this.doPoll();
  this.emit('poll');
};

/**
 * Overloads onData to detect payloads.
 *
 * @api private
 */

Polling.prototype.onData = function (data) {
  var self = this;
  debug('polling got data %s', data);
  var callback = function callback(packet, index, total) {
    // if its the first message we consider the transport open
    if ('opening' === self.readyState) {
      self.onOpen();
    }

    // if its a close packet, we close the ongoing requests
    if ('close' === packet.type) {
      self.onClose();
      return false;
    }

    // otherwise bypass onData and handle the message
    self.onPacket(packet);
  };

  // decode payload
  parser.decodePayload(data, this.socket.binaryType, callback);

  // if an event did not trigger closing
  if ('closed' !== this.readyState) {
    // if we got data we're not polling
    this.polling = false;
    this.emit('pollComplete');

    if ('open' === this.readyState) {
      this.poll();
    } else {
      debug('ignoring poll - transport state "%s"', this.readyState);
    }
  }
};

/**
 * For polling, send a close packet.
 *
 * @api private
 */

Polling.prototype.doClose = function () {
  var self = this;

  function close() {
    debug('writing close packet');
    self.write([{ type: 'close' }]);
  }

  if ('open' === this.readyState) {
    debug('transport open - closing');
    close();
  } else {
    // in case we're trying to close while
    // handshaking is in progress (GH-164)
    debug('transport not open - deferring close');
    this.once('open', close);
  }
};

/**
 * Writes a packets payload.
 *
 * @param {Array} data packets
 * @param {Function} drain callback
 * @api private
 */

Polling.prototype.write = function (packets) {
  var self = this;
  this.writable = false;
  var callbackfn = function callbackfn() {
    self.writable = true;
    self.emit('drain');
  };

  parser.encodePayload(packets, this.supportsBinary, function (data) {
    self.doWrite(data, callbackfn);
  });
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

Polling.prototype.uri = function () {
  var query = this.query || {};
  var schema = this.secure ? 'https' : 'http';
  var port = '';

  // cache busting is forced
  if (false !== this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  if (!this.supportsBinary && !query.sid) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // avoid port if default for schema
  if (this.port && ('https' === schema && Number(this.port) !== 443 || 'http' === schema && Number(this.port) !== 80)) {
    port = ':' + this.port;
  }

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Gets the keys for an object.
 *
 * @return {Array} keys
 * @api private
 */

module.exports = Object.keys || function keys(obj) {
  var arr = [];
  var has = Object.prototype.hasOwnProperty;

  for (var i in obj) {
    if (has.call(obj, i)) {
      arr.push(i);
    }
  }
  return arr;
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),
/* 74 */
/***/ (function(module, exports) {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 75 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = after

function after(count, callback, err_cb) {
    var bail = false
    err_cb = err_cb || noop
    proxy.count = count

    return (count === 0) ? callback() : proxy

    function proxy(err, result) {
        if (proxy.count <= 0) {
            throw new Error('after called too many times')
        }
        --proxy.count

        // after first error, rest are passed to err_cb
        if (err) {
            bail = true
            callback(err)
            // future error callbacks will go to error handler
            callback = err_cb
        } else if (proxy.count === 0 && !bail) {
            callback(null, result)
        }
    }
}

function noop() {}


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*! https://mths.be/utf8js v2.1.2 by @mathias */

var stringFromCharCode = String.fromCharCode;

// Taken from https://mths.be/punycode
function ucs2decode(string) {
	var output = [];
	var counter = 0;
	var length = string.length;
	var value;
	var extra;
	while (counter < length) {
		value = string.charCodeAt(counter++);
		if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
			// high surrogate, and there is a next character
			extra = string.charCodeAt(counter++);
			if ((extra & 0xFC00) == 0xDC00) {
				// low surrogate
				output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
			} else {
				// unmatched surrogate; only append this code unit, in case the next
				// code unit is the high surrogate of a surrogate pair
				output.push(value);
				counter--;
			}
		} else {
			output.push(value);
		}
	}
	return output;
}

// Taken from https://mths.be/punycode
function ucs2encode(array) {
	var length = array.length;
	var index = -1;
	var value;
	var output = '';
	while (++index < length) {
		value = array[index];
		if (value > 0xFFFF) {
			value -= 0x10000;
			output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
			value = 0xDC00 | value & 0x3FF;
		}
		output += stringFromCharCode(value);
	}
	return output;
}

function checkScalarValue(codePoint, strict) {
	if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
		if (strict) {
			throw Error('Lone surrogate U+' + codePoint.toString(16).toUpperCase() + ' is not a scalar value');
		}
		return false;
	}
	return true;
}
/*--------------------------------------------------------------------------*/

function createByte(codePoint, shift) {
	return stringFromCharCode(codePoint >> shift & 0x3F | 0x80);
}

function encodeCodePoint(codePoint, strict) {
	if ((codePoint & 0xFFFFFF80) == 0) {
		// 1-byte sequence
		return stringFromCharCode(codePoint);
	}
	var symbol = '';
	if ((codePoint & 0xFFFFF800) == 0) {
		// 2-byte sequence
		symbol = stringFromCharCode(codePoint >> 6 & 0x1F | 0xC0);
	} else if ((codePoint & 0xFFFF0000) == 0) {
		// 3-byte sequence
		if (!checkScalarValue(codePoint, strict)) {
			codePoint = 0xFFFD;
		}
		symbol = stringFromCharCode(codePoint >> 12 & 0x0F | 0xE0);
		symbol += createByte(codePoint, 6);
	} else if ((codePoint & 0xFFE00000) == 0) {
		// 4-byte sequence
		symbol = stringFromCharCode(codePoint >> 18 & 0x07 | 0xF0);
		symbol += createByte(codePoint, 12);
		symbol += createByte(codePoint, 6);
	}
	symbol += stringFromCharCode(codePoint & 0x3F | 0x80);
	return symbol;
}

function utf8encode(string, opts) {
	opts = opts || {};
	var strict = false !== opts.strict;

	var codePoints = ucs2decode(string);
	var length = codePoints.length;
	var index = -1;
	var codePoint;
	var byteString = '';
	while (++index < length) {
		codePoint = codePoints[index];
		byteString += encodeCodePoint(codePoint, strict);
	}
	return byteString;
}

/*--------------------------------------------------------------------------*/

function readContinuationByte() {
	if (byteIndex >= byteCount) {
		throw Error('Invalid byte index');
	}

	var continuationByte = byteArray[byteIndex] & 0xFF;
	byteIndex++;

	if ((continuationByte & 0xC0) == 0x80) {
		return continuationByte & 0x3F;
	}

	// If we end up here, it’s not a continuation byte
	throw Error('Invalid continuation byte');
}

function decodeSymbol(strict) {
	var byte1;
	var byte2;
	var byte3;
	var byte4;
	var codePoint;

	if (byteIndex > byteCount) {
		throw Error('Invalid byte index');
	}

	if (byteIndex == byteCount) {
		return false;
	}

	// Read first byte
	byte1 = byteArray[byteIndex] & 0xFF;
	byteIndex++;

	// 1-byte sequence (no continuation bytes)
	if ((byte1 & 0x80) == 0) {
		return byte1;
	}

	// 2-byte sequence
	if ((byte1 & 0xE0) == 0xC0) {
		byte2 = readContinuationByte();
		codePoint = (byte1 & 0x1F) << 6 | byte2;
		if (codePoint >= 0x80) {
			return codePoint;
		} else {
			throw Error('Invalid continuation byte');
		}
	}

	// 3-byte sequence (may include unpaired surrogates)
	if ((byte1 & 0xF0) == 0xE0) {
		byte2 = readContinuationByte();
		byte3 = readContinuationByte();
		codePoint = (byte1 & 0x0F) << 12 | byte2 << 6 | byte3;
		if (codePoint >= 0x0800) {
			return checkScalarValue(codePoint, strict) ? codePoint : 0xFFFD;
		} else {
			throw Error('Invalid continuation byte');
		}
	}

	// 4-byte sequence
	if ((byte1 & 0xF8) == 0xF0) {
		byte2 = readContinuationByte();
		byte3 = readContinuationByte();
		byte4 = readContinuationByte();
		codePoint = (byte1 & 0x07) << 0x12 | byte2 << 0x0C | byte3 << 0x06 | byte4;
		if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
			return codePoint;
		}
	}

	throw Error('Invalid UTF-8 detected');
}

var byteArray;
var byteCount;
var byteIndex;
function utf8decode(byteString, opts) {
	opts = opts || {};
	var strict = false !== opts.strict;

	byteArray = ucs2decode(byteString);
	byteCount = byteArray.length;
	byteIndex = 0;
	var codePoints = [];
	var tmp;
	while ((tmp = decodeSymbol(strict)) !== false) {
		codePoints.push(tmp);
	}
	return ucs2encode(codePoints);
}

module.exports = {
	version: '2.1.2',
	encode: utf8encode,
	decode: utf8decode
};

/***/ }),
/* 78 */
/***/ (function(module, exports) {

/**
 * Create a blob builder even when vendor prefixes exist
 */

var BlobBuilder = typeof BlobBuilder !== 'undefined' ? BlobBuilder :
  typeof WebKitBlobBuilder !== 'undefined' ? WebKitBlobBuilder :
  typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder :
  typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : 
  false;

/**
 * Check if Blob constructor is supported
 */

var blobSupported = (function() {
  try {
    var a = new Blob(['hi']);
    return a.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if Blob constructor supports ArrayBufferViews
 * Fails in Safari 6, so we need to map to ArrayBuffers there.
 */

var blobSupportsArrayBufferView = blobSupported && (function() {
  try {
    var b = new Blob([new Uint8Array([1,2])]);
    return b.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if BlobBuilder is supported
 */

var blobBuilderSupported = BlobBuilder
  && BlobBuilder.prototype.append
  && BlobBuilder.prototype.getBlob;

/**
 * Helper function that maps ArrayBufferViews to ArrayBuffers
 * Used by BlobBuilder constructor and old browsers that didn't
 * support it in the Blob constructor.
 */

function mapArrayBufferViews(ary) {
  return ary.map(function(chunk) {
    if (chunk.buffer instanceof ArrayBuffer) {
      var buf = chunk.buffer;

      // if this is a subarray, make a copy so we only
      // include the subarray region from the underlying buffer
      if (chunk.byteLength !== buf.byteLength) {
        var copy = new Uint8Array(chunk.byteLength);
        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
        buf = copy.buffer;
      }

      return buf;
    }

    return chunk;
  });
}

function BlobBuilderConstructor(ary, options) {
  options = options || {};

  var bb = new BlobBuilder();
  mapArrayBufferViews(ary).forEach(function(part) {
    bb.append(part);
  });

  return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
};

function BlobConstructor(ary, options) {
  return new Blob(mapArrayBufferViews(ary), options || {});
};

if (typeof Blob !== 'undefined') {
  BlobBuilderConstructor.prototype = Blob.prototype;
  BlobConstructor.prototype = Blob.prototype;
}

module.exports = (function() {
  if (blobSupported) {
    return blobSupportsArrayBufferView ? Blob : BlobConstructor;
  } else if (blobBuilderSupported) {
    return BlobBuilderConstructor;
  } else {
    return undefined;
  }
})();


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// browser shim for xmlhttprequest module

var hasCORS = __webpack_require__(80);

module.exports = function (opts) {
  var xdomain = opts.xdomain;

  // scheme must be same when usign XDomainRequest
  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
  var xscheme = opts.xscheme;

  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
  // https://github.com/Automattic/engine.io-client/pull/217
  var enablesXDR = opts.enablesXDR;

  // XMLHttpRequest can be disabled on IE
  try {
    if ('undefined' !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) {}

  // Use XDomainRequest for IE8 if enablesXDR is true
  // because loading bar keeps flashing when using jsonp-polling
  // https://github.com/yujiosaka/socke.io-ie8-loading-example
  try {
    if ('undefined' !== typeof XDomainRequest && !xscheme && enablesXDR) {
      return new XDomainRequest();
    }
  } catch (e) {}

  if (!xdomain) {
    try {
      return new self[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
    } catch (e) {}
  }
};

/***/ }),
/* 80 */
/***/ (function(module, exports) {


/**
 * Module exports.
 *
 * Logic borrowed from Modernizr:
 *
 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
 */

try {
  module.exports = typeof XMLHttpRequest !== 'undefined' &&
    'withCredentials' in new XMLHttpRequest();
} catch (err) {
  // if XMLHttp support is disabled in IE then it will throw
  // when trying to create
  module.exports = false;
}


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Module dependencies.
 */

var Transport = __webpack_require__(27);
var parser = __webpack_require__(15);
var parseqs = __webpack_require__(20);
var inherit = __webpack_require__(28);
var yeast = __webpack_require__(47);
var debug = __webpack_require__(8)('engine.io-client:websocket');

var BrowserWebSocket, NodeWebSocket;

if (typeof uni === "undefined" && typeof wx === "undefined" || typeof WebSocket !== "undefined") {
    if (typeof WebSocket !== 'undefined') {
        BrowserWebSocket = WebSocket;
    } else if (typeof self !== 'undefined') {
        BrowserWebSocket = self.WebSocket || self.MozWebSocket;
    } else {
        try {
            NodeWebSocket = __webpack_require__(82);
        } catch (e) {}
    }
}

/**
 * Get either the `WebSocket` or `MozWebSocket` globals
 * in the browser or try to resolve WebSocket-compatible
 * interface exposed by `ws` for Node-like environment.
 */

var WebSocketImpl = BrowserWebSocket || NodeWebSocket;

if ((typeof uni !== "undefined" || typeof wx !== "undefined") && typeof WebSocket === "undefined" || typeof GameGlobal !== "undefined") {
    WebSocketImpl = function WebSocket(uri) {
        var self = this;
        self.onopen = function () {};

        self.onclose = function () {};

        self.onmessage = function (data) {};

        self.onerror = function (e) {};
        if ((typeof tt === 'undefined' ? 'undefined' : _typeof(tt)) === "object" && tt.getSystemInfo) {
            var _socketTask = tt.connectSocket({ url: uri });
            self.send = function (data) {
                _socketTask.send({ data: data });
            };
            self.close = function () {
                _socketTask.close();
            };
            _socketTask.onOpen(function () {
                self.onopen();
            });
            _socketTask.onError(function (e) {
                self.onerror(e);
            });
            _socketTask.onMessage(function (res) {
                self.onmessage(res);
            });
            _socketTask.onClose(function () {
                self.onclose();
            });
        } else if (typeof uni !== "undefined") {

            var uniSocketTask = uni.connectSocket({ url: uri, complete: function complete() {} });
            self.send = function (data) {
                uniSocketTask.send({ data: data });
            };

            self.close = function () {
                uniSocketTask.close();
            };

            uniSocketTask.onOpen(function (res) {
                self.onopen();
            });
            uniSocketTask.onError(function (e) {
                self.onerror(e);
            });
            uniSocketTask.onMessage(function (res) {
                self.onmessage(res);
            });
            uniSocketTask.onClose(function (res) {
                self.onclose();
            });
        } else {
            var socketTask = wx.connectSocket({ url: uri });
            self.send = function (data) {
                socketTask.send({ data: data });
            };
            self.close = function (data) {
                socketTask.close({ code: 1000 });
            };
            socketTask.onOpen(function () {
                self.onopen();
            });
            socketTask.onError(function (e) {
                self.onerror(e);
            });
            socketTask.onMessage(function (res) {
                self.onmessage(res);
            });
            socketTask.onClose(function (e) {
                self.onclose(e);
            });
        }
    };
}

/**
 * Module exports.
 */

module.exports = WS;

/**
 * WebSocket transport constructor.
 *
 * @api {Object} connection options
 * @api public
 */

function WS(opts) {
    var forceBase64 = opts && opts.forceBase64;
    if (forceBase64) {
        this.supportsBinary = false;
    }
    if (typeof uni === "undefined" && typeof wx === "undefined" || typeof WebSocket !== "undefined") {
        this.perMessageDeflate = opts.perMessageDeflate;
        this.usingBrowserWebSocket = BrowserWebSocket && !opts.forceNode;
        this.protocols = opts.protocols;
        if (!this.usingBrowserWebSocket) {
            WebSocketImpl = NodeWebSocket;
        }
    }
    Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(WS, Transport);

/**
 * Transport name.
 *
 * @api public
 */

WS.prototype.name = 'websocket';

/*
 * WebSockets support binary
 */

WS.prototype.supportsBinary = false;

/**
 * Opens socket.
 *
 * @api private
 */

WS.prototype.doOpen = function () {
    if (!this.check()) {
        // let probe timeout
        return;
    }

    var uri = this.uri();

    var protocols;
    if (typeof uni === "undefined" && typeof wx === "undefined" || typeof WebSocket !== "undefined") {
        protocols = this.protocols;
    }
    var opts;
    if ((typeof uni !== "undefined" || typeof wx !== "undefined") && typeof WebSocket === "undefined") {
        opts = {
            agent: this.agent
        };
    } else {
        opts = {
            agent: this.agent,
            perMessageDeflate: this.perMessageDeflate
        };
    }

    // SSL options for Node.js client
    opts.pfx = this.pfx;
    opts.key = this.key;
    opts.passphrase = this.passphrase;
    opts.cert = this.cert;
    opts.ca = this.ca;
    opts.ciphers = this.ciphers;
    opts.rejectUnauthorized = this.rejectUnauthorized;
    if (this.extraHeaders) {
        opts.headers = this.extraHeaders;
    }
    if (this.localAddress) {
        opts.localAddress = this.localAddress;
    }

    try {
        if ((typeof uni !== "undefined" || typeof wx !== "undefined") && typeof WebSocket === "undefined") {
            this.ws = new WebSocketImpl(uri);
        } else {
            this.ws = this.usingBrowserWebSocket && !this.isReactNative ? protocols ? new WebSocketImpl(uri, protocols) : new WebSocketImpl(uri) : new WebSocketImpl(uri, protocols, opts);
        }
    } catch (err) {
        return this.emit('error', err);
    }

    if (this.ws.binaryType === undefined) {
        this.supportsBinary = false;
    }

    if (this.ws.supports && this.ws.supports.binary) {
        this.supportsBinary = true;
        this.ws.binaryType = 'nodebuffer';
    } else {
        this.ws.binaryType = 'arraybuffer';
    }

    this.addEventListeners();
};

/**
 * Adds event listeners to the socket
 *
 * @api private
 */

WS.prototype.addEventListeners = function () {
    var self = this;

    this.ws.onopen = function () {
        self.onOpen();
    };
    this.ws.onclose = function () {
        self.onClose();
    };
    this.ws.onmessage = function (ev) {
        self.onData(ev.data);
    };
    this.ws.onerror = function (e) {
        self.onError('websocket error', e);
    };
};

/**
 * Writes data to socket.
 *
 * @param {Array} array of packets.
 * @api private
 */

WS.prototype.write = function (packets) {
    var self = this;
    this.writable = false;

    // encodePacket efficient as it uses WS framing
    // no need for encodePayload
    var total = packets.length;
    for (var i = 0, l = total; i < l; i++) {
        (function (packet) {
            parser.encodePacket(packet, self.supportsBinary, function (data) {
                if ((typeof uni !== "undefined" || typeof wx !== "undefined") && typeof WebSocket === "undefined") {
                    try {
                        self.ws.send(data);
                    } catch (e) {
                        debug('websocket closed before onclose event');
                    }
                } else {
                    if (!self.usingBrowserWebSocket) {
                        // always create a new object (GH-437)
                        var opts = {};
                        if (packet.options) {
                            opts.compress = packet.options.compress;
                        }

                        if (self.perMessageDeflate) {
                            var len = 'string' === typeof data ? Buffer.byteLength(data) : data.length;
                            if (len < self.perMessageDeflate.threshold) {
                                opts.compress = false;
                            }
                        }
                    }

                    // Sometimes the websocket has already been closed but the browser didn't
                    // have a chance of informing us about it yet, in that case send will
                    // throw an error
                    try {
                        if (self.usingBrowserWebSocket) {
                            // TypeError is thrown when passing the second argument on Safari
                            self.ws.send(data);
                        } else {
                            self.ws.send(data, opts);
                        }
                    } catch (e) {
                        debug('websocket closed before onclose event');
                    }
                }
                --total || done();
            });
        })(packets[i]);
    }

    function done() {
        self.emit('flush');

        // fake drain
        // defer to next tick to allow Socket to clear writeBuffer
        setTimeout(function () {
            self.writable = true;
            self.emit('drain');
        }, 0);
    }
};

/**
 * Called upon close
 *
 * @api private
 */

WS.prototype.onClose = function () {
    Transport.prototype.onClose.call(this);
};

/**
 * Closes socket.
 *
 * @api private
 */

WS.prototype.doClose = function () {
    if (typeof this.ws !== 'undefined') {
        this.ws.close();
    }
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

WS.prototype.uri = function () {
    var query = this.query || {};
    var schema = this.secure ? 'wss' : 'ws';
    var port = '';

    // avoid port if default for schema
    if (this.port && ('wss' === schema && Number(this.port) !== 443 || 'ws' === schema && Number(this.port) !== 80)) {
        port = ':' + this.port;
    }

    // append timestamp to URI
    if (this.timestampRequests) {
        query[this.timestampParam] = yeast();
    }

    // communicate binary support capabilities
    if (!this.supportsBinary) {
        query.b64 = 1;
    }

    query = parseqs.encode(query);

    // prepend ? to query
    if (query.length) {
        query = '?' + query;
    }

    var ipv6 = this.hostname.indexOf(':') !== -1;
    return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

/**
 * Feature detection for WebSocket.
 *
 * @return {Boolean} whether this transport is available.
 * @api public
 */

WS.prototype.check = function () {
    return !!WebSocketImpl && !('__initialize' in WebSocketImpl && this.name === WS.prototype.name);
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(46).Buffer))

/***/ }),
/* 82 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = toArray

function toArray(list, index) {
    var array = []

    index = index || 0

    for (var i = index || 0; i < list.length; i++) {
        array[i - index] = list[i]
    }

    return array
}


/***/ }),
/* 84 */
/***/ (function(module, exports) {


/**
 * Expose `Backoff`.
 */

module.exports = Backoff;

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}

/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */

Backoff.prototype.duration = function(){
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand =  Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};

/**
 * Reset the number of attempts.
 *
 * @api public
 */

Backoff.prototype.reset = function(){
  this.attempts = 0;
};

/**
 * Set the minimum duration
 *
 * @api public
 */

Backoff.prototype.setMin = function(min){
  this.ms = min;
};

/**
 * Set the maximum duration
 *
 * @api public
 */

Backoff.prototype.setMax = function(max){
  this.max = max;
};

/**
 * Set the jitter
 *
 * @api public
 */

Backoff.prototype.setJitter = function(jitter){
  this.jitter = jitter;
};



/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports["default"] = {
    maxNumber: 5
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.Cookie = void 0;
var Cookie = /** @class */ (function () {
    function Cookie() {
    }
    Cookie.get = function (name) {
        var e_1, _a;
        var cookieName = encodeURIComponent(name) + '=';
        var cookies = document.cookie.split('; ');
        try {
            for (var cookies_1 = __values(cookies), cookies_1_1 = cookies_1.next(); !cookies_1_1.done; cookies_1_1 = cookies_1.next()) {
                var cookie = cookies_1_1.value;
                if (cookie.startsWith(cookieName)) {
                    return decodeURIComponent(cookie.substring(cookieName.length));
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (cookies_1_1 && !cookies_1_1.done && (_a = cookies_1["return"])) _a.call(cookies_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return null;
    };
    /**
     * @description 设置 Cookie
     * @param name 名字
     * @param value  值
     * @param expires 设置过期时间，不设置过期时间为 Session cookie 关闭浏览器失效
     * @param path 作用 path
     * @param domain  作用 path
     * @param secure    如果想在客户端即网页中通过 js 去设置Secure类型的 cookie，必须保证网页是https协议的。
     *     在http协议的网页中是无法设置secure类型cookie的。
     */
    Cookie.set = function (name, value, expires, domain, path, secure) {
        if (path === void 0) { path = '/'; }
        if (secure === void 0) { secure = false; }
        var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += '; expires=' + expires.toGMTString();
        }
        if (path) {
            cookieText += '; path=' + path;
        }
        if (domain) {
            cookieText += '; domain=' + domain;
        }
        if (secure) {
            cookieText += '; secure';
        }
        document.cookie = cookieText;
    };
    /**
     * @description 移除 Cookie，移除的时候 需要传递与设置时相同的 name/path/domain 才能移除成功
     */
    Cookie.remove = function (name, domain, path, secure) {
        if (path === void 0) { path = '/'; }
        if (secure === void 0) { secure = false; }
        Cookie.set(name, '', new Date(0), domain, path, secure);
    };
    return Cookie;
}());
exports.Cookie = Cookie;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.UUID = void 0;
var uuid = __webpack_require__(88);
var UUID = /** @class */ (function () {
    function UUID() {
    }
    UUID.get = function () {
        var guid = uuid.v1();
        return guid.replace(/-/g, "");
    };
    return UUID;
}());
exports.UUID = UUID;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(89);
var v4 = __webpack_require__(90);

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(54);
var bytesToUuid = __webpack_require__(55);

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(54);
var bytesToUuid = __webpack_require__(55);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.goEasyArray = void 0;
var GoEasyArray = /** @class */ (function (_super) {
    __extends(GoEasyArray, _super);
    function GoEasyArray() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GoEasyArray.prototype.deleteByKey = function (arr, key, value) {
        var index = arr.findIndex(function (item) { return item[key] == value; });
        if (index > -1) {
            arr.splice(index, 1);
        }
    };
    GoEasyArray.prototype.unshiftGuid = function (guid) {
        var contain = false;
        var index = this.findIndex(function (item) { return item == guid; });
        if (index > -1) {
            contain = true;
            this.splice(index, 1);
        }
        this.unshift(guid);
        while (this.length > 300) {
            this.pop();
        }
        return contain;
    };
    return GoEasyArray;
}(Array));
var goEasyArray = new GoEasyArray();
exports.goEasyArray = goEasyArray;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var AbstractSocket_1 = __webpack_require__(39);
var NetworkStatus_1 = __webpack_require__(12);
var IOSocket = /** @class */ (function (_super) {
    __extends(IOSocket, _super);
    function IOSocket(options) {
        var _this = _super.call(this) || this;
        _this.reconnectingObservers = []; // todo: event类型？
        _this.addReconnectingObserver(options.onReconnecting);
        _this.addDisconnectedObserver(options.onDisconnected);
        return _this;
    }
    IOSocket.prototype.connect = function (options) {
        _super.prototype.connect.call(this);
        //连接
        this.io = this.io.connect(options.uri, options.opts);
        this.initListener();
    };
    IOSocket.prototype.doEmit = function (name, params, ack) {
        this.io.emit(name, params, ack);
    };
    IOSocket.prototype.initListener = function () {
        var _this = this;
        //监听重连
        this.io.on('reconnecting', function (ack) {
            _this.status = NetworkStatus_1.NetworkStatus.CONNECTING;
            _this.notify(_this.reconnectingObservers, ack);
        });
        //连接成功
        this.io.on('connect', function () {
            _this.status = NetworkStatus_1.NetworkStatus.CONNECTED;
            _this.notify(_this.connectedObservers);
        });
        //断连
        this.io.on('disconnect', function () {
            _this.status = NetworkStatus_1.NetworkStatus.DISCONNECTED;
            _this.notify(_this.disconnectedObservers);
        });
        //连接错误
        this.io.on('connect_error', function (ack) {
            // todo: 暂时不用，因为这个错误，貌似在重连中也会出现，会影响使用
            // this.status = NetworkStatus.CONNECT_FAILED;
            // console.log(ack)
            //保留
        });
    };
    IOSocket.prototype.addReconnectingObserver = function (event) {
        this.reconnectingObservers.push(event);
    };
    return IOSocket;
}(AbstractSocket_1["default"]));
exports["default"] = IOSocket;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.MessageObserver = void 0;
var utils_1 = __webpack_require__(0);
var MessageObserver = /** @class */ (function () {
    function MessageObserver(callback) {
        this.callback = utils_1.noop;
        this.guidList = [];
        this.callback = callback;
    }
    MessageObserver.prototype.onMessage = function (key, message) {
        if (typeof message == "string") {
            message = JSON.parse(message);
        }
        if (message.i) {
            var index = this.guidList.findIndex(function (item) { return item === message.i; });
            if (index > -1) {
                return;
            }
            this.guidList.unshift(message.i);
            if (this.guidList.length > 300) {
                this.guidList.pop();
            }
        }
        this.callback(message);
    };
    return MessageObserver;
}());
exports.MessageObserver = MessageObserver;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.AnonymousUserIdRepository = void 0;
var utils_1 = __webpack_require__(0);
var local_storage_dispatcher_1 = __webpack_require__(53);
var AnonymousUserIdRepository = /** @class */ (function () {
    function AnonymousUserIdRepository() {
    }
    AnonymousUserIdRepository.get = function () {
        var storage = AnonymousUserIdRepository.storage;
        if (storage !== null) {
            var userId = storage.get(AnonymousUserIdRepository.ANONYMOUS_USER_ID_KEY);
            if (!utils_1.calibrator.isEmpty(userId)) {
                return userId;
            }
        }
        return null;
    };
    AnonymousUserIdRepository.put = function (userId) {
        var storage = AnonymousUserIdRepository.storage;
        if (storage !== null) {
            storage.put(AnonymousUserIdRepository.ANONYMOUS_USER_ID_KEY, userId);
        }
    };
    AnonymousUserIdRepository.storage = local_storage_dispatcher_1.LocalStorageDispatcher.localStorage();
    AnonymousUserIdRepository.ANONYMOUS_USER_ID_KEY = "goeasy-anonymous-user-id";
    return AnonymousUserIdRepository;
}());
exports.AnonymousUserIdRepository = AnonymousUserIdRepository;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.clientInfo = void 0;
var platform_detector_1 = __webpack_require__(30);
var framework_detector_1 = __webpack_require__(17);
var ClientInfo = /** @class */ (function () {
    function ClientInfo() {
        this.platform = platform_detector_1.PlatformDetector.currentPlatform();
        this.framework = framework_detector_1.FrameworkDetector.currentFramework();
        this.z = this.toZ();
    }
    ClientInfo.prototype.toZ = function () {
        var thisAsString = JSON.stringify({
            platform: this.platform,
            framework: this.framework
        });
        var z = "";
        for (var i = 0; i < thisAsString.length; i++) {
            var char = thisAsString.charCodeAt(i);
            z = z + String.fromCharCode(char + 5);
        }
        return z;
    };
    return ClientInfo;
}());
var clientInfo = new ClientInfo();
exports.clientInfo = clientInfo;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.ModuleTypes = void 0;
exports.ModuleTypes = {
    IM: 'IM',
    PUBSUB: 'PUBSUB'
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.fileUploader = exports.FileUploader = void 0;
var UniAppFileUploader_1 = __webpack_require__(98);
var WXFileUploader_1 = __webpack_require__(99);
var HtmlFileUploader_1 = __webpack_require__(100);
var framework_detector_1 = __webpack_require__(17);
var FileUploader = /** @class */ (function () {
    function FileUploader() {
        var _a;
        this.uploader = (_a = {},
            _a[framework_detector_1.Framework.UNIAPP] = UniAppFileUploader_1.uniAppFileUploader,
            _a[framework_detector_1.Framework.NATIVE_APPLET_WX] = WXFileUploader_1.wxFileUploader,
            _a[framework_detector_1.Framework.UNKNOWN] = HtmlFileUploader_1.htmlFileUploader,
            _a);
    }
    FileUploader.prototype.upload = function (uploadRequest, onProgress) {
        var framework = framework_detector_1.FrameworkDetector.currentFramework();
        console.log('upload', framework);
        return this.uploader[framework].upload(uploadRequest, onProgress);
    };
    return FileUploader;
}());
exports.FileUploader = FileUploader;
var fileUploader = new FileUploader();
exports.fileUploader = fileUploader;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.uniAppFileUploader = void 0;
var AbstractFileUploader_1 = __webpack_require__(31);
var UniAppFileUploader = /** @class */ (function (_super) {
    __extends(UniAppFileUploader, _super);
    function UniAppFileUploader() {
        return _super.call(this) || this;
    }
    UniAppFileUploader.prototype.upload = function (uploadRequest, onprogress) {
        var _this = this;
        try {
            return new Promise((function (resolve, reject) {
                var uploadTask = uni.uploadFile({
                    url: uploadRequest.host,
                    filePath: _this.getTempFilePath(uploadRequest),
                    name: 'file',
                    formData: uploadRequest.parameters,
                    success: function (res) {
                        if (res.statusCode === 200) {
                            var content = uploadRequest.payload;
                            content.message = res.errMsg;
                            resolve({
                                code: 200,
                                content: content
                            });
                        }
                        else {
                            reject({
                                code: res.statusCode,
                                content: res.errMsg
                            });
                        }
                    },
                    fail: function (err) {
                        reject({
                            code: 500,
                            content: err.errMsg
                        });
                    }
                });
                uploadTask.onProgressUpdate(function (res) {
                    onprogress && onprogress(res);
                });
            }));
        }
        catch (e) {
            return new Promise(function (resolve, reject) {
                reject({
                    code: 500,
                    content: e
                });
            });
        }
    };
    UniAppFileUploader.prototype.getTempFilePath = function (uploadRequest) {
        console.log('uploadRequest', uploadRequest);
        var file = uploadRequest.file;
        if (Array.isArray(file.tempFiles)) {
            return file.tempFiles[0].path; // 图片消息
        }
        //tempFilePath-->语音消息 fullPath-->安卓文件消息  path-->H5、wx文件消息
        var tempFilePath = file.tempFilePath || file.fullPath || file.path;
        return tempFilePath;
    };
    return UniAppFileUploader;
}(AbstractFileUploader_1["default"]));
var uniAppFileUploader = new UniAppFileUploader();
exports.uniAppFileUploader = uniAppFileUploader;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.wxFileUploader = void 0;
var AbstractFileUploader_1 = __webpack_require__(31);
var WXFileUploader = /** @class */ (function (_super) {
    __extends(WXFileUploader, _super);
    function WXFileUploader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WXFileUploader.prototype.upload = function (uploadRequest, onprogress) {
        var _this = this;
        try {
            return new Promise(function (resolve, reject) {
                var uploadTask = wx.uploadFile({
                    url: uploadRequest.host,
                    filePath: _this.getTempFilePath(uploadRequest),
                    name: 'file',
                    formData: uploadRequest.parameters,
                    success: function (res) {
                        if (res.statusCode === 200) {
                            var content = uploadRequest.payload;
                            content.message = res.errMsg;
                            resolve({
                                code: 200,
                                content: content
                            });
                        }
                        else {
                            reject({
                                code: res.statusCode,
                                content: res.errMsg
                            });
                        }
                    },
                    fail: function (err) {
                        reject({
                            code: 500,
                            content: err.errMsg
                        });
                    }
                });
                uploadTask.onProgressUpdate(function (res) {
                    onprogress && onprogress(res);
                });
            });
        }
        catch (e) {
            return new Promise(function (resolve, reject) {
                reject({
                    code: 500,
                    content: e
                });
            });
        }
    };
    WXFileUploader.prototype.getTempFilePath = function (uploadRequest) {
        var file = uploadRequest.file || uploadRequest.fileRes;
        if (Array.isArray(file.tempFiles)) {
            return file.tempFiles[0].path;
        }
        return file.tempFilePath;
    };
    return WXFileUploader;
}(AbstractFileUploader_1["default"]));
var wxFileUploader = new WXFileUploader();
exports.wxFileUploader = wxFileUploader;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.htmlFileUploader = void 0;
var AbstractFileUploader_1 = __webpack_require__(31);
var HtmlFileUploader = /** @class */ (function (_super) {
    __extends(HtmlFileUploader, _super);
    function HtmlFileUploader() {
        return _super.call(this) || this;
    }
    HtmlFileUploader.prototype.upload = function (uploadRequest, onprogress) {
        try {
            return new Promise((function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('post', uploadRequest.host, true);
                for (var key in uploadRequest.headers) {
                    xhr.setRequestHeader(key, uploadRequest.headers[key]);
                }
                xhr.upload.onprogress = function (progress) {
                    onprogress && onprogress(progress);
                };
                xhr.upload.onloadstart = function (progress) {
                    onprogress && onprogress(progress);
                };
                xhr.upload.onloadend = function (progress) {
                    onprogress && onprogress(progress);
                };
                //构建formData
                var formData = new FormData();
                for (var fd in uploadRequest.parameters) {
                    if (fd == 'fileRes') {
                        formData.append('file', uploadRequest.parameters[fd]);
                    }
                    else {
                        formData.append(fd, uploadRequest.parameters[fd]);
                    }
                }
                xhr.send(formData);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                            var content = uploadRequest.payload;
                            content.message = xhr.responseText;
                            resolve({
                                code: 200,
                                content: content
                            });
                        }
                        else {
                            reject({
                                code: xhr.status,
                                content: xhr.responseText
                            });
                        }
                    }
                };
            }));
        }
        catch (e) {
            return new Promise(function (resolve, reject) {
                reject({
                    code: 500,
                    content: e
                });
            });
        }
    };
    return HtmlFileUploader;
}(AbstractFileUploader_1["default"]));
var htmlFileUploader = new HtmlFileUploader();
exports.htmlFileUploader = htmlFileUploader;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var OSSRequestFactory_1 = __webpack_require__(102);
var UploadTokenResolver_1 = __webpack_require__(106);
var RequestBuilder = /** @class */ (function () {
    function RequestBuilder() {
        this.uploadTokenResolver = new UploadTokenResolver_1["default"]();
    }
    RequestBuilder.prototype.build = function (file, name, messageType) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.uploadTokenResolver.resolve(name)
                .then(function (result) {
                var token = result.content;
                resolve(new OSSRequestFactory_1.OSSRequestFactory(token.vendor).build(token, file, messageType));
            })["catch"](function (e) {
                reject(e);
            });
        });
    };
    return RequestBuilder;
}());
exports["default"] = RequestBuilder;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.OSSRequestFactory = void 0;
var OssType_1 = __webpack_require__(103);
var AliyunOSSRequestBuilder_1 = __webpack_require__(104);
var QiNiuYunOSSRequestBuilder_1 = __webpack_require__(105);
var OSSRequestFactory = /** @class */ (function () {
    function OSSRequestFactory(type) {
        if (type === OssType_1.OssType.aliYun) {
            return AliyunOSSRequestBuilder_1.aliYunOSSRequestBuilder;
        }
        else {
            return QiNiuYunOSSRequestBuilder_1.qiNiuYunOSSRequestBuilder;
        }
    }
    OSSRequestFactory.prototype.build = function (token, file, messageType) {
    };
    return OSSRequestFactory;
}());
exports.OSSRequestFactory = OSSRequestFactory;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.OssType = void 0;
var OssType;
(function (OssType) {
    OssType["aliYun"] = "ALI";
    OssType["qiNiu"] = "QN";
})(OssType = exports.OssType || (exports.OssType = {}));


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.aliYunOSSRequestBuilder = exports.AliYunOSSRequestBuilder = void 0;
var FileUploadRequest_1 = __webpack_require__(57);
var AbstractOSSRequestBuilder_1 = __webpack_require__(58);
var MessageType_1 = __webpack_require__(18);
var AliYunOSSRequestBuilder = /** @class */ (function (_super) {
    __extends(AliYunOSSRequestBuilder, _super);
    function AliYunOSSRequestBuilder() {
        return _super.call(this) || this;
    }
    AliYunOSSRequestBuilder.prototype.url = function (token) {
        return token.host + '/' + token.dir + '/' + this.newFileName(token);
    };
    AliYunOSSRequestBuilder.prototype.build = function (token, file, messageType) {
        var parameters;
        parameters = {
            key: token.dir + "/" + this.newFileName(token),
            'OSSAccessKeyId': token.accessKeyId,
            'policy': token.policy,
            'signature': token.signature,
            success_action_status: '200',
            fileRes: file
        };
        if (MessageType_1.MessageType.FILE === messageType) {
            parameters = {
                key: token.dir + "/" + this.newFileName(token),
                'OSSAccessKeyId': token.accessKeyId,
                'policy': token.policy,
                'signature': token.signature,
                success_action_status: '200',
                'Content-Disposition': 'attachment;filename=' + file.name,
                fileRes: file
            };
        }
        var payload = {
            newFileName: this.newFileName(token),
            url: this.url(token)
        };
        return new FileUploadRequest_1["default"](token.host, null, parameters, file, payload);
    };
    return AliYunOSSRequestBuilder;
}(AbstractOSSRequestBuilder_1["default"]));
exports.AliYunOSSRequestBuilder = AliYunOSSRequestBuilder;
var aliYunOSSRequestBuilder = new AliYunOSSRequestBuilder();
exports.aliYunOSSRequestBuilder = aliYunOSSRequestBuilder;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.qiNiuYunOSSRequestBuilder = void 0;
var AbstractOSSRequestBuilder_1 = __webpack_require__(58);
var FileUploadRequest_1 = __webpack_require__(57);
var QiNiuYunOSSRequestBuilder = /** @class */ (function (_super) {
    __extends(QiNiuYunOSSRequestBuilder, _super);
    function QiNiuYunOSSRequestBuilder() {
        return _super.call(this) || this;
    }
    QiNiuYunOSSRequestBuilder.prototype.url = function (token) {
        return token.downloadUrl;
    };
    QiNiuYunOSSRequestBuilder.prototype.build = function (token, file) {
        var parameters = {
            key: this.newFileName(token),
            token: token.token,
            file: file
        };
        var payload = {
            newFileName: this.newFileName(token),
            url: this.url(token)
        };
        return new FileUploadRequest_1["default"](token.host, null, parameters, file, payload);
    };
    return QiNiuYunOSSRequestBuilder;
}(AbstractOSSRequestBuilder_1["default"]));
var qiNiuYunOSSRequestBuilder = new QiNiuYunOSSRequestBuilder();
exports.qiNiuYunOSSRequestBuilder = qiNiuYunOSSRequestBuilder;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Rocket_1 = __webpack_require__(2);
var Permission_1 = __webpack_require__(1);
var SocketTimeout_1 = __webpack_require__(3);
var IM_1 = __webpack_require__(7);
var UploadTokenResolver = /** @class */ (function () {
    function UploadTokenResolver() {
    }
    UploadTokenResolver.prototype.resolve = function (name) {
        return new Promise(function (resolve, reject) {
            var rocket = new Rocket_1["default"]({
                name: 'uploadToken',
                params: {
                    filename: name
                },
                permission: Permission_1.Permission.WRITE,
                singleTimeout: SocketTimeout_1.SocketTimeout.commonRequestSingle,
                totalTimeout: SocketTimeout_1.SocketTimeout.commonRequestTotal,
                fail: function (e) {
                    reject(e);
                },
                success: function (result) {
                    if (result.code === 200) {
                        resolve(result);
                    }
                    else {
                        reject(result);
                    }
                }
            });
            IM_1.im['_goEasySocket'].emit(rocket);
        });
    };
    return UploadTokenResolver;
}());
exports["default"] = UploadTokenResolver;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Rocket_1 = __webpack_require__(2);
var Permission_1 = __webpack_require__(1);
var SocketTimeout_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(0);
var IM_1 = __webpack_require__(7);
var RocketTypes_1 = __webpack_require__(4);
var GroupMessageSubscriber = /** @class */ (function () {
    function GroupMessageSubscriber() {
    }
    GroupMessageSubscriber.prototype.subscribe = function (options) {
        var groupIds = options.groupIds;
        return new Promise((function (resolve, reject) {
            if (!Array.isArray(groupIds)
                || groupIds.length == 0) {
                reject({
                    code: 400,
                    content: 'TypeError: groups require array.'
                });
                return;
            }
            for (var i = 0; i < groupIds.length; i++) {
                if (!utils_1.calibrator.isStringOrNumber(groupIds[i])) {
                    reject({
                        code: 400,
                        content: 'TypeError: groups item require string or number.'
                    });
                    return;
                }
                if (utils_1.calibrator.isNumber(groupIds[i])) {
                    groupIds[i] = groupIds[i].toString();
                }
            }
            var rocket = new Rocket_1["default"]({
                name: RocketTypes_1.RocketTypes.subscribeGroups,
                params: {
                    groupIds: groupIds,
                    at: options.accessToken
                },
                permission: Permission_1.Permission.WRITE,
                singleTimeout: SocketTimeout_1.SocketTimeout.commonInfiniteSingle,
                totalTimeout: SocketTimeout_1.SocketTimeout.commonInfiniteTotal,
                success: function () {
                    resolve({
                        code: 200,
                        content: 'ok'
                    });
                },
                fail: function (e) {
                    reject({
                        code: e.resultCode || 408,
                        content: e.content || 'Failed to subscribe group message'
                    });
                }
            });
            IM_1.im._goEasySocket.emit(rocket);
        }));
    };
    GroupMessageSubscriber.prototype.unsubscribe = function (groupId) {
        return new Promise((function (resolve, reject) {
            if (!utils_1.calibrator.isStringOrNumber(groupId)) {
                reject({
                    code: 400,
                    content: 'TypeError: channel require string or number.'
                });
                return;
            }
            groupId = groupId.toString();
            var rocket = new Rocket_1["default"]({
                name: RocketTypes_1.RocketTypes.unsubscribeGroup,
                params: {
                    groupId: groupId
                },
                permission: Permission_1.Permission.READ,
                singleTimeout: SocketTimeout_1.SocketTimeout.commonRequestSingle,
                totalTimeout: SocketTimeout_1.SocketTimeout.commonRequestTotal,
                success: function () {
                    resolve({
                        code: 200,
                        content: 'ok'
                    });
                },
                fail: function (e) {
                    reject({
                        code: e.resultCode || 408,
                        content: e.content || 'Failed to unsubscribe group message'
                    });
                }
            });
            IM_1.im._goEasySocket.emit(rocket);
        }));
    };
    return GroupMessageSubscriber;
}());
exports["default"] = GroupMessageSubscriber;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Rocket_1 = __webpack_require__(2);
var Permission_1 = __webpack_require__(1);
var SocketTimeout_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(0);
var RocketTypes_1 = __webpack_require__(4);
var GroupOnlineCount = /** @class */ (function () {
    function GroupOnlineCount(im) {
        this.im = im;
    }
    GroupOnlineCount.prototype.get = function (groupId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!utils_1.calibrator.isStringOrNumber(groupId)) {
                reject({
                    code: 400,
                    content: 'TypeError: groupId require string or number.'
                });
                return;
            }
            if (utils_1.calibrator.isNumber(groupId)) {
                groupId = groupId.toString();
            }
            var rocket = new Rocket_1["default"]({
                name: RocketTypes_1.RocketTypes.imGroupOnlineCount,
                params: {
                    groupId: groupId
                },
                permission: Permission_1.Permission.READ,
                singleTimeout: SocketTimeout_1.SocketTimeout.commonQuerySingle,
                totalTimeout: SocketTimeout_1.SocketTimeout.commonQueryTotal,
                fail: function (e) {
                    reject(e || {
                        code: 408,
                        content: 'Failed to query online group users'
                    });
                },
                success: function (result) {
                    if (result.code == 200) {
                        resolve(result);
                    }
                    else {
                        reject(result);
                    }
                }
            });
            _this.im['_goEasySocket'].emit(rocket);
        });
    };
    return GroupOnlineCount;
}());
exports["default"] = GroupOnlineCount;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Rocket_1 = __webpack_require__(2);
var Permission_1 = __webpack_require__(1);
var SocketTimeout_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(0);
var RocketTypes_1 = __webpack_require__(4);
var RemoteEvents_1 = __webpack_require__(16);
var im_api_events_1 = __webpack_require__(9);
var GroupPresenceSubscribe = /** @class */ (function () {
    function GroupPresenceSubscribe(im) {
        this.im = im;
        im['_goEasySocket'].addMessageObserver(RemoteEvents_1.RemoteEvents.groupPresence, this.newMessageReceived.bind(this));
    }
    GroupPresenceSubscribe.prototype.presence = function (groupIds) {
        var _this = this;
        return new Promise((function (resolve, reject) {
            if (!Array.isArray(groupIds)
                || groupIds.length == 0) {
                reject({
                    code: 400,
                    content: 'TypeError: groupIds require array.'
                });
                return;
            }
            for (var i = 0; i < groupIds.length; i++) {
                if (!utils_1.calibrator.isStringOrNumber(groupIds[i])) {
                    reject({
                        code: 400,
                        content: 'TypeError: groupIds item require string or number.'
                    });
                    return;
                }
                if (utils_1.calibrator.isNumber(groupIds[i])) {
                    groupIds[i] = groupIds[i].toString();
                }
                if (groupIds[i].length == 0) {
                    reject({
                        code: 400,
                        content: 'TypeError: groupIds has empty item.'
                    });
                    return;
                }
            }
            var success = function () {
                resolve({
                    code: 200,
                    content: 'ok'
                });
            };
            var fail = function (e) {
                reject({
                    code: e.code || 408,
                    content: e.content || 'Failed to subscribe group message'
                });
            };
            var params = {
                groupIds: groupIds
            };
            _this.emitRocket(RocketTypes_1.RocketTypes.subscribeGroupPresence, params, success, fail, SocketTimeout_1.SocketTimeout.commonInfiniteSingle, SocketTimeout_1.SocketTimeout.commonInfiniteTotal);
        }));
    };
    GroupPresenceSubscribe.prototype.unPresence = function (groupId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!utils_1.calibrator.isStringOrNumber(groupId)) {
                reject({
                    code: 400,
                    content: 'TypeError: groupId require string or number.'
                });
                return;
            }
            if (utils_1.calibrator.isNumber(groupId)) {
                groupId = groupId.toString();
            }
            var success = function () {
                resolve({
                    code: 200,
                    content: 'ok'
                });
            };
            var fail = function (e) {
                reject({
                    code: e.code || 408,
                    content: e.content || 'Failed to unsubscribe presence'
                });
            };
            var params = {
                groupId: groupId
            };
            _this.emitRocket(RocketTypes_1.RocketTypes.unsubscribeGroupPresence, params, success, fail, SocketTimeout_1.SocketTimeout.commonRequestSingle, SocketTimeout_1.SocketTimeout.commonRequestTotal);
        });
    };
    GroupPresenceSubscribe.prototype.emitRocket = function (emitType, params, success, fail, singleTimeout, totalTimeout) {
        var rocket = new Rocket_1["default"]({
            name: emitType,
            params: params,
            singleTimeout: singleTimeout,
            totalTimeout: totalTimeout,
            permission: Permission_1.Permission.WRITE,
            success: success,
            fail: fail
        });
        this.im['_goEasySocket'].emit(rocket);
    };
    GroupPresenceSubscribe.prototype.newMessageReceived = function (message) {
        var _this = this;
        var content = null;
        if (message.c) {
            content = JSON.parse(message.c);
        }
        content && content.events && content.events.map(function (item) {
            var data = item.userData ? JSON.parse(item.userData) : {};
            var event = { time: item.time, action: item.action, groupOnlineCount: content.userAmount, groupId: content.groupId, id: item.userId, data: data };
            _this.im['_event'].notify(im_api_events_1.ImApiEvents.GROUP_PRESENCE, event);
        });
    };
    return GroupPresenceSubscribe;
}());
exports["default"] = GroupPresenceSubscribe;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Rocket_1 = __webpack_require__(2);
var Permission_1 = __webpack_require__(1);
var SocketTimeout_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(0);
var RocketTypes_1 = __webpack_require__(4);
var RemoteEvents_1 = __webpack_require__(16);
var im_api_events_1 = __webpack_require__(9);
var UserPresenceSubscriber = /** @class */ (function () {
    function UserPresenceSubscriber(im) {
        this.im = im;
        this.im['_goEasySocket'].addMessageObserver(RemoteEvents_1.RemoteEvents.userPresence, this.newMessageReceived.bind(this));
    }
    UserPresenceSubscriber.prototype.presence = function (userIds) {
        var _this = this;
        return new Promise((function (resolve, reject) {
            if (!Array.isArray(userIds) || userIds.length == 0) {
                reject({
                    code: 400,
                    content: 'TypeError: userIds require array.'
                });
                return;
            }
            for (var i = 0; i < userIds.length; i++) {
                if (!utils_1.calibrator.isStringOrNumber(userIds[i])) {
                    reject({
                        code: 400,
                        content: 'TypeError: userIds item require string or number.'
                    });
                    return;
                }
                if (utils_1.calibrator.isNumber(userIds[i])) {
                    userIds[i] = userIds[i].toString();
                }
                if (userIds[i].length == 0) {
                    reject({
                        code: 400,
                        content: 'TypeError: userIds has empty item.'
                    });
                    return;
                }
            }
            var success = function () {
                resolve({
                    code: 200,
                    content: 'ok'
                });
            };
            var fail = function (e) {
                reject({
                    code: e.code || 408,
                    content: e.content || 'Failed to subscribe group message'
                });
            };
            var params = {
                userIds: userIds
            };
            _this.emitRocket(RocketTypes_1.RocketTypes.subscribeUserPresence, params, success, fail, SocketTimeout_1.SocketTimeout.commonInfiniteSingle, SocketTimeout_1.SocketTimeout.commonInfiniteTotal);
        }));
    };
    UserPresenceSubscriber.prototype.unPresence = function (userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!utils_1.calibrator.isStringOrNumber(userId)) {
                reject({
                    code: 400,
                    content: 'TypeError: id require string or number.'
                });
                return;
            }
            if (utils_1.calibrator.isNumber(userId)) {
                userId = userId.toString();
            }
            var success = function () {
                resolve({
                    code: 200,
                    content: 'ok'
                });
            };
            var fail = function (e) {
                reject({
                    code: e.code || 408,
                    content: e.content || 'Failed to unsubscribe presence'
                });
            };
            var params = {
                userId: userId
            };
            _this.emitRocket(RocketTypes_1.RocketTypes.unsubscribeUserPresence, params, success, fail, SocketTimeout_1.SocketTimeout.commonRequestSingle, SocketTimeout_1.SocketTimeout.commonRequestTotal);
        });
    };
    UserPresenceSubscriber.prototype.emitRocket = function (emitType, params, success, fail, singleTimeout, totalTimeout) {
        var rocket = new Rocket_1["default"]({
            name: emitType,
            params: params,
            singleTimeout: singleTimeout,
            totalTimeout: totalTimeout,
            permission: Permission_1.Permission.WRITE,
            success: success,
            fail: fail
        });
        this.im['_goEasySocket'].emit(rocket);
    };
    UserPresenceSubscriber.prototype.newMessageReceived = function (message) {
        var _this = this;
        var events = [];
        if (message.c) {
            events = JSON.parse(message.c).events || [];
        }
        events.map(function (item) {
            var data = item.userData ? JSON.parse(item.userData) : {};
            var event = { time: item.time, action: item.action, id: item.userId, data: data };
            _this.im['_event'].notify(im_api_events_1.ImApiEvents.USER_PRESENCE, event);
        });
    };
    return UserPresenceSubscriber;
}());
exports["default"] = UserPresenceSubscriber;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Rocket_1 = __webpack_require__(2);
var Permission_1 = __webpack_require__(1);
var SocketTimeout_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(0);
var RocketTypes_1 = __webpack_require__(4);
var UserHereNow = /** @class */ (function () {
    function UserHereNow(im) {
        this.im = im;
    }
    UserHereNow.prototype.hereNow = function (options) {
        var _this = this;
        return new Promise((function (resolve, reject) {
            if (!options.userIds
                || !Array.isArray(options.userIds)
                || options.userIds.length == 0) {
                reject({
                    code: 400,
                    content: 'TypeError: userIds require array.'
                });
                return;
            }
            for (var i = 0; i < options.userIds.length; i++) {
                if (!utils_1.calibrator.isStringOrNumber(options.userIds[i])) {
                    reject({
                        code: 400,
                        content: 'TypeError: userIds item require string or number.'
                    });
                    return;
                }
                if (utils_1.calibrator.isNumber(options.userIds[i])) {
                    options.userIds[i] = options.userIds[i].toString();
                }
                if (options.userIds[i].length == 0) {
                    reject({
                        code: 400,
                        content: 'TypeError: userIds has empty item.'
                    });
                    return;
                }
            }
            var rocket = new Rocket_1["default"]({
                name: RocketTypes_1.RocketTypes.imHereNow,
                params: options,
                permission: Permission_1.Permission.READ,
                singleTimeout: SocketTimeout_1.SocketTimeout.commonQuerySingle,
                totalTimeout: SocketTimeout_1.SocketTimeout.commonQueryTotal,
                fail: function (e) {
                    reject({
                        code: e.resultCode || 408,
                        content: e.content || 'Failed to query online users'
                    });
                },
                success: function (result) {
                    if (result.code == 200) {
                        var content = result.content;
                        result.content = content.map(function (user) {
                            var data = user.userData ? JSON.parse(user.userData) : {};
                            return { id: user.userId, data: data };
                        });
                        resolve(result);
                    }
                    else {
                        reject(result);
                    }
                }
            });
            _this.im['_goEasySocket'].emit(rocket);
        }));
    };
    return UserHereNow;
}());
exports["default"] = UserHereNow;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Rocket_1 = __webpack_require__(2);
var Permission_1 = __webpack_require__(1);
var SocketTimeout_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(6);
var RocketTypes_1 = __webpack_require__(4);
var GroupHereNow = /** @class */ (function () {
    function GroupHereNow(im) {
        this.im = im;
    }
    GroupHereNow.prototype.hereNow = function (groupId) {
        var _this = this;
        return new Promise((function (resolve, reject) {
            if (!utils_1.calibrator.isStringOrNumber(groupId)) {
                reject({
                    code: 400,
                    content: 'TypeError: groupId require string or number.'
                });
                return;
            }
            if (utils_1.calibrator.isNumber(groupId)) {
                groupId = groupId.toString();
            }
            var rocket = new Rocket_1["default"]({
                name: RocketTypes_1.RocketTypes.imGroupHereNow,
                params: {
                    groupId: groupId
                },
                permission: Permission_1.Permission.READ,
                singleTimeout: SocketTimeout_1.SocketTimeout.commonQuerySingle,
                totalTimeout: SocketTimeout_1.SocketTimeout.commonQueryTotal,
                fail: function (e) {
                    reject({
                        code: e.resultCode || 408,
                        content: e.content || 'Failed to query online group users'
                    });
                },
                success: function (result) {
                    if (result.code == 200) {
                        var content = result.content;
                        result.content = content.map(function (user) {
                            var data = user.userData ? JSON.parse(user.userData) : {};
                            return { id: user.userId, data: data };
                        });
                        resolve(result);
                    }
                    else {
                        reject(result);
                    }
                }
            });
            _this.im._goEasySocket.emit(rocket);
        }));
    };
    return GroupHereNow;
}());
exports["default"] = GroupHereNow;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.str = void 0;
var Calibrator_1 = __webpack_require__(29);
var Str = /** @class */ (function () {
    function Str() {
    }
    Str.prototype.fileExtension = function (str, type) {
        if (!Calibrator_1.calibrator.isString(str))
            return;
        try {
            var strArr = str.split(type);
            return strArr[strArr.length - 1];
        }
        catch (e) {
            throw Error(e);
        }
    };
    return Str;
}());
var str = new Str();
exports.str = str;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var internal_events_1 = __webpack_require__(21);
var goeasy_event_center_1 = __webpack_require__(13);
var SocketEvents_1 = __webpack_require__(59);
var remote_abbr_message_builder_1 = __webpack_require__(32);
var RemoteEvents_1 = __webpack_require__(16);
var IMReceiver = /** @class */ (function () {
    function IMReceiver(im) {
        this.builder = new remote_abbr_message_builder_1.RemoteAbbrMessageBuilder();
        this.im = im;
        im['_goEasySocket'].addMessageObserver(RemoteEvents_1.RemoteEvents.imMessage, this.onMessageReceived.bind(this));
    }
    IMReceiver.prototype.onMessageReceived = function (message) {
        message.rd = false;
        console.log('IMReceiver -> onMessageReceived:', message);
        var receivedMessage = this.builder.build(message);
        this.sendAck(receivedMessage);
        goeasy_event_center_1.GoEasyEventCenter.fire(SocketEvents_1.SocketEvents.IM_MESSAGE_RECEIVED, message);
        goeasy_event_center_1.GoEasyEventCenter.fire(internal_events_1.IM_INTERNAL_EVENTS.MESSAGE_RECEIVED, receivedMessage);
    };
    IMReceiver.prototype.sendAck = function (message) {
        this.im['_goEasySocket'].sendAck('imAck', { "publishGuid": message.messageId });
    };
    return IMReceiver;
}());
exports["default"] = IMReceiver;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.EmitterEventDriver = void 0;
var Emitter = __webpack_require__(14);
var EmitterEventDriver = /** @class */ (function () {
    function EmitterEventDriver() {
        this.emitter = new Emitter();
    }
    EmitterEventDriver.prototype.on = function (name, callback) {
        this.emitter.on(name, callback);
        return this;
    };
    EmitterEventDriver.prototype.once = function (name, callback) {
        this.emitter.once(name, callback);
        return this;
    };
    EmitterEventDriver.prototype.off = function (name, callback) {
        this.emitter.off(name, callback);
        return this;
    };
    EmitterEventDriver.prototype.fire = function (name, data) {
        this.emitter.emit(name, data);
        return this;
    };
    return EmitterEventDriver;
}());
exports.EmitterEventDriver = EmitterEventDriver;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Rocket_1 = __webpack_require__(2);
var Permission_1 = __webpack_require__(1);
var SocketTimeout_1 = __webpack_require__(3);
var GoEasy_1 = __webpack_require__(5);
var RocketTypes_1 = __webpack_require__(4);
var IM_1 = __webpack_require__(7);
var utils_1 = __webpack_require__(6);
var DataCache = /** @class */ (function () {
    function DataCache(user) {
        this.userData = new Map();
        this.groupData = new Map();
        this.userData.set(user.id, user.data);
    }
    DataCache.prototype.putData = function (type, id, data) {
        if (!data) {
            data = {};
        }
        if (type === GoEasy_1.Scene.PRIVATE) {
            this.userData.set(id, data);
        }
        else {
            this.groupData.set(id, data);
        }
    };
    DataCache.prototype.loadData = function (id, scene) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = _this.loadLocalData(id, scene);
            if (utils_1.calibrator.isUndef(data)) {
                _this.loadServerData(id, scene).then(function (data) {
                    console.log('load data from server by id=' + id + ' scene= ' + scene + 'data :', JSON.stringify(data));
                    resolve(data);
                })["catch"](function (error) {
                    reject(error);
                });
            }
            else {
                console.log('load data from local Cache by id=' + id + ' scene= ' + scene + 'data :', JSON.stringify(data));
                resolve(data);
            }
        });
    };
    DataCache.prototype.loadLocalData = function (id, type) {
        if (GoEasy_1.Scene.PRIVATE === type) {
            return this.userData.get(id);
        }
        else {
            return this.groupData.get(id);
        }
    };
    DataCache.prototype.loadServerData = function (id, scene) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var params = {
                targetId: id,
                type: scene
            };
            var rocket = new Rocket_1["default"]({
                name: RocketTypes_1.RocketTypes.imData,
                params: params,
                permission: Permission_1.Permission.READ,
                singleTimeout: SocketTimeout_1.SocketTimeout.commonQuerySingle,
                totalTimeout: SocketTimeout_1.SocketTimeout.commonQueryTotal,
                success: function (result) {
                    if (result.code === 200) {
                        var data = JSON.parse(result.content);
                        _this.putData(scene, id, data);
                        resolve(data);
                    }
                    else {
                        reject(result);
                    }
                },
                fail: function (error) {
                    reject(error);
                }
            });
            IM_1.im['_goEasySocket'].emit(rocket);
        });
    };
    return DataCache;
}());
exports["default"] = DataCache;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.iMMessageBuilder = void 0;
var framework_detector_1 = __webpack_require__(17);
var WXImagePayloadBuilder_1 = __webpack_require__(118);
var WXFilePayloadBuilder_1 = __webpack_require__(34);
var WXAudioPayloadBuilder_1 = __webpack_require__(119);
var TextPayloadBuilder_1 = __webpack_require__(120);
var WXVideoPayloadBuilder_1 = __webpack_require__(122);
var UniAppImagePayloadBuilder_1 = __webpack_require__(123);
var UniAppFilePayloadBuilder_1 = __webpack_require__(37);
var UniAppAudioPayloadBuilder_1 = __webpack_require__(124);
var UniAppVideoPayloadBuilder_1 = __webpack_require__(125);
var HTMLImagePayloadBuilder_1 = __webpack_require__(126);
var HTMLFilePayloadBuilder_1 = __webpack_require__(38);
var HTMLAudioPayloadBuilder_1 = __webpack_require__(127);
var HTMLVideoPayloadBuilder_1 = __webpack_require__(128);
var CustomPayloadBuilder_1 = __webpack_require__(129);
var LocalIMMessageBuildOptions_1 = __webpack_require__(131);
var IM_1 = __webpack_require__(7);
var utils_1 = __webpack_require__(6);
var GoEasy_1 = __webpack_require__(5);
var GroupMessage_1 = __webpack_require__(61);
var PrivateMessage_1 = __webpack_require__(60);
var IMMessageBuilder = /** @class */ (function () {
    function IMMessageBuilder() {
        var _a;
        this.framework = framework_detector_1.FrameworkDetector.currentFramework();
        this.payloadBuilders = (_a = {},
            _a[framework_detector_1.Framework.UNIAPP] = {
                image: new UniAppImagePayloadBuilder_1["default"](),
                file: new UniAppFilePayloadBuilder_1["default"](),
                audio: new UniAppAudioPayloadBuilder_1["default"](),
                video: new UniAppVideoPayloadBuilder_1["default"](),
                text: new TextPayloadBuilder_1.TextPayloadBuilder()
            },
            _a[framework_detector_1.Framework.NATIVE_APPLET_WX] = {
                image: new WXImagePayloadBuilder_1["default"](),
                file: new WXFilePayloadBuilder_1["default"](),
                audio: new WXAudioPayloadBuilder_1["default"](),
                video: new WXVideoPayloadBuilder_1["default"](),
                text: new TextPayloadBuilder_1.TextPayloadBuilder()
            },
            _a[framework_detector_1.Framework.UNKNOWN] = {
                image: new HTMLImagePayloadBuilder_1["default"](),
                file: new HTMLFilePayloadBuilder_1["default"](),
                audio: new HTMLAudioPayloadBuilder_1["default"](),
                video: new HTMLVideoPayloadBuilder_1["default"](),
                text: new TextPayloadBuilder_1.TextPayloadBuilder()
            },
            _a);
    }
    IMMessageBuilder.prototype.buildMessage = function (type, createOptions) {
        var payloadBuilder = this.payloadBuilders[this.framework][type];
        var buildOptions = new LocalIMMessageBuildOptions_1.LocalIMMessageBuildOptions(type, createOptions);
        if (payloadBuilder) {
            var payload = payloadBuilder.build(buildOptions);
            buildOptions.payload = payload;
        }
        else {
            var customPayloadBuilder = new CustomPayloadBuilder_1.CustomPayloadBuilder();
            var payload = customPayloadBuilder.build(buildOptions);
            buildOptions.payload = payload.payload;
        }
        return this.build(buildOptions);
    };
    IMMessageBuilder.prototype.build = function (buildOptions) {
        var type = buildOptions.type;
        var payload = buildOptions.payload;
        var createOptions = buildOptions.createOptions;
        var to = createOptions.to;
        var notification = createOptions.notification;
        this.validate(notification);
        var message;
        if (to.type === GoEasy_1.Scene.GROUP) {
            message = new GroupMessage_1.GroupMessage();
            message.groupId = to.id;
            message.senderData = IM_1.IM.userData;
        }
        else if (to.type === GoEasy_1.Scene.PRIVATE) {
            message = new PrivateMessage_1.PrivateMessage();
            message.read = false;
            message.receiverId = to.id;
        }
        message.senderId = IM_1.IM.userId;
        message.messageId = utils_1.UUID.get();
        message.payload = payload;
        message.timestamp = Date.now();
        message.type = type;
        // message.recalled = false;
        message.status = GoEasy_1.MessageStatus.NEW;
        message.buildOptions = buildOptions;
        return message;
    };
    IMMessageBuilder.prototype.validate = function (notification) {
        var isUndef = utils_1.calibrator.isUndef(IM_1.IM.userId);
        if (isUndef) {
            throw Error('Please call connect() first.');
        }
        if (!notification) {
            return;
        }
        if (!utils_1.calibrator.isObject(notification)) {
            throw Error('notification require an object.');
        }
        if (utils_1.calibrator.isEmpty(notification.title)) {
            throw Error('notification\'s title is empty.');
        }
        if (utils_1.calibrator.isEmpty(notification.body)) {
            throw Error('notification\'s body is empty.');
        }
        if (notification.title.length > 32) {
            throw Error('notification\'s title over max length 32');
        }
        if (notification.body.length > 50) {
            throw Error('notification\'s body over max length 50');
        }
    };
    return IMMessageBuilder;
}());
var iMMessageBuilder = new IMMessageBuilder();
exports.iMMessageBuilder = iMMessageBuilder;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var utils_1 = __webpack_require__(6);
var utils_2 = __webpack_require__(0);
var ImageMessagePayload_1 = __webpack_require__(33);
var WXFilePayloadBuilder_1 = __webpack_require__(34);
var WXImagePayloadBuilder = /** @class */ (function (_super) {
    __extends(WXImagePayloadBuilder, _super);
    function WXImagePayloadBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WXImagePayloadBuilder.prototype.create = function () {
        return new ImageMessagePayload_1.ImageMessagePayload();
    };
    WXImagePayloadBuilder.prototype.setPayload = function (buildOptions, payload) {
        _super.prototype.setPayload.call(this, buildOptions, payload);
        var createOptions = buildOptions.createOptions;
        var file = createOptions.file;
        var messagePayload = payload;
        var filePath = file.errMsg === 'chooseMedia:ok' ? file.tempFiles[0].tempFilePath : file.tempFiles[0].path;
        file.tempFiles[0].path = filePath;
        var tempFile = file.tempFiles[0];
        var path = file.errMsg === 'chooseMedia:ok' ? tempFile.tempFilePath : tempFile.path;
        var namePath = (utils_2.calibrator.isEmpty(tempFile.name) || tempFile.name === undefined) ? path : tempFile.name;
        messagePayload.name = 'wx-image.' + utils_1.str.fileExtension(namePath, '.');
        messagePayload.contentType = 'image/' + utils_1.str.fileExtension(namePath, '.');
        messagePayload.url = path;
        messagePayload.size = tempFile.size;
        buildOptions.complete = new Promise(function (resolve, reject) {
            wx.getImageInfo({
                src: messagePayload.url,
                success: function (res) {
                    messagePayload.width = res.width;
                    messagePayload.height = res.height;
                    resolve();
                },
                fail: function (err) {
                    reject(err);
                }
            });
        });
    };
    WXImagePayloadBuilder.prototype.validate = function (createOptions) {
        _super.prototype.validate.call(this, createOptions);
        if (!utils_2.calibrator.isDef(createOptions.file.tempFiles) || createOptions.file.tempFiles[0].length == 0) {
            throw Error('tempFiles is empty.');
        }
    };
    return WXImagePayloadBuilder;
}(WXFilePayloadBuilder_1["default"]));
exports["default"] = WXImagePayloadBuilder;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var AudioMessagePayload_1 = __webpack_require__(35);
var utils_1 = __webpack_require__(0);
var utils_2 = __webpack_require__(6);
var WXFilePayloadBuilder_1 = __webpack_require__(34);
var WXAudioPayloadBuilder = /** @class */ (function (_super) {
    __extends(WXAudioPayloadBuilder, _super);
    function WXAudioPayloadBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WXAudioPayloadBuilder.prototype.create = function () {
        return new AudioMessagePayload_1.AudioMessagePayload();
    };
    WXAudioPayloadBuilder.prototype.setPayload = function (buildOptions, payload) {
        _super.prototype.setPayload.call(this, buildOptions, payload);
        var createOptions = buildOptions.createOptions;
        var file = createOptions.file;
        var audioPayload = payload;
        var path = file.tempFilePath;
        var namePath = (utils_1.calibrator.isEmpty(file.name) || file.name == undefined) ? path : file.name;
        var duration = file.duration;
        var size = file.fileSize;
        audioPayload.url = path;
        audioPayload.size = size;
        audioPayload.duration = duration / 1000;
        audioPayload.name = 'wx-audio.' + utils_2.str.fileExtension(namePath, '.');
        audioPayload.contentType = 'audio/' + utils_2.str.fileExtension(namePath, '.');
        buildOptions.complete = Promise.resolve();
    };
    WXAudioPayloadBuilder.prototype.validate = function (createOptions) {
        _super.prototype.validate.call(this, createOptions);
    };
    return WXAudioPayloadBuilder;
}(WXFilePayloadBuilder_1["default"]));
exports["default"] = WXAudioPayloadBuilder;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.TextPayloadBuilder = void 0;
var AbstractPayloadBuilder_1 = __webpack_require__(10);
var TextMessagePayload_1 = __webpack_require__(121);
var utils_1 = __webpack_require__(0);
var TextPayloadBuilder = /** @class */ (function (_super) {
    __extends(TextPayloadBuilder, _super);
    function TextPayloadBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextPayloadBuilder.prototype.create = function () {
        return new TextMessagePayload_1.TextMessagePayload();
    };
    TextPayloadBuilder.prototype.setPayload = function (buildOptions, payload) {
        var textPayload = payload;
        var createOptions = buildOptions.createOptions;
        textPayload.text = createOptions.text;
        buildOptions.complete = Promise.resolve();
    };
    TextPayloadBuilder.prototype.validate = function (createOptions) {
        if (utils_1.calibrator.isEmpty(createOptions.text)) {
            throw ({
                code: 400,
                content: "text is empty"
            });
        }
        if (utils_1.calibrator.isString(createOptions.text)) {
            if (createOptions.text.trim() === '') {
                throw ({
                    code: 400,
                    content: "text is empty"
                });
            }
        }
        else {
            throw ({
                code: 400,
                content: 'TypeError: text requires string.'
            });
        }
        if (createOptions.text.length > 2500) {
            throw ({
                code: 400,
                content: 'Message text over max length 2500'
            });
        }
    };
    return TextPayloadBuilder;
}(AbstractPayloadBuilder_1.AbstractPayloadBuilder));
exports.TextPayloadBuilder = TextPayloadBuilder;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.TextMessagePayload = void 0;
var AbstractMessagePayload_1 = __webpack_require__(23);
var TextMessagePayload = /** @class */ (function (_super) {
    __extends(TextMessagePayload, _super);
    function TextMessagePayload() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text = "";
        return _this;
    }
    return TextMessagePayload;
}(AbstractMessagePayload_1.AbstractMessagePayload));
exports.TextMessagePayload = TextMessagePayload;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var VideoMessagePayload_1 = __webpack_require__(36);
var utils_1 = __webpack_require__(0);
var utils_2 = __webpack_require__(6);
var AbstractPayloadBuilder_1 = __webpack_require__(10);
var WXVideoPayloadBuilder = /** @class */ (function (_super) {
    __extends(WXVideoPayloadBuilder, _super);
    function WXVideoPayloadBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WXVideoPayloadBuilder.prototype.create = function () {
        return new VideoMessagePayload_1.VideoMessagePayload();
    };
    WXVideoPayloadBuilder.prototype.setPayload = function (buildOptions, payload) {
        var createOptions = buildOptions.createOptions;
        var file = createOptions.file;
        var videoPayload = payload;
        var video = videoPayload.video;
        var thumbnail = videoPayload.thumbnail;
        var wxVideoRes = file.errMsg === 'chooseMedia:ok' ? file.tempFiles[0] : file;
        var duration = wxVideoRes.duration, height = wxVideoRes.height, size = wxVideoRes.size, tempFilePath = wxVideoRes.tempFilePath, thumbTempFilePath = wxVideoRes.thumbTempFilePath, width = wxVideoRes.width, _a = wxVideoRes.name, name = _a === void 0 ? '' : _a;
        var videoPath = utils_1.calibrator.isEmpty(name) ? tempFilePath : name;
        video.contentType = 'video/' + utils_2.str.fileExtension(videoPath, '.');
        video.name = 'wx-video.' + utils_2.str.fileExtension(videoPath, '.');
        video.url = tempFilePath;
        video.width = thumbnail.width = width;
        video.height = thumbnail.height = height;
        video.size = size;
        video.duration = duration;
        thumbnail.url = thumbTempFilePath;
        thumbnail.contentType = 'image/jpg';
        thumbnail.name = 'wx-thumbnail.jpg';
        buildOptions.complete = Promise.resolve();
    };
    WXVideoPayloadBuilder.prototype.validate = function (createOptions) {
        if (!utils_1.calibrator.isObject(createOptions)) {
            throw Error('it is an empty message.');
        }
        if (!utils_1.calibrator.isDef(createOptions.file)) {
            throw Error('file is empty.');
        }
    };
    return WXVideoPayloadBuilder;
}(AbstractPayloadBuilder_1.AbstractPayloadBuilder));
exports["default"] = WXVideoPayloadBuilder;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var utils_1 = __webpack_require__(6);
var utils_2 = __webpack_require__(0);
var ImageMessagePayload_1 = __webpack_require__(33);
var UniAppFilePayloadBuilder_1 = __webpack_require__(37);
var UniAppImagePayloadBuilder = /** @class */ (function (_super) {
    __extends(UniAppImagePayloadBuilder, _super);
    function UniAppImagePayloadBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UniAppImagePayloadBuilder.prototype.create = function () {
        return new ImageMessagePayload_1.ImageMessagePayload();
    };
    UniAppImagePayloadBuilder.prototype.setPayload = function (buildOptions, payload) {
        var imagePayload = payload;
        var createOptions = buildOptions.createOptions;
        var file = createOptions.file;
        var tempFile = file.tempFiles[0];
        imagePayload.url = tempFile.path;
        imagePayload.size = tempFile.size;
        var path = (utils_2.calibrator.isEmpty(tempFile.name) || tempFile.name === undefined) ? tempFile.path : tempFile.name;
        imagePayload.contentType = 'image/' + utils_1.str.fileExtension(path, '.');
        imagePayload.name = 'uni-image.' + utils_1.str.fileExtension(path, '.');
        buildOptions.complete = new Promise(function (resolve, reject) {
            uni.getImageInfo({
                src: tempFile.path,
                success: function (res) {
                    imagePayload.width = res.width;
                    imagePayload.height = res.height;
                    resolve();
                },
                fail: function (err) {
                    reject(err);
                }
            });
        });
    };
    UniAppImagePayloadBuilder.prototype.validate = function (createOptions) {
        _super.prototype.validate.call(this, createOptions);
    };
    return UniAppImagePayloadBuilder;
}(UniAppFilePayloadBuilder_1["default"]));
exports["default"] = UniAppImagePayloadBuilder;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var utils_1 = __webpack_require__(0);
var utils_2 = __webpack_require__(6);
var AudioMessagePayload_1 = __webpack_require__(35);
var UniAppFilePayloadBuilder_1 = __webpack_require__(37);
var UniAppAudioPayloadBuilder = /** @class */ (function (_super) {
    __extends(UniAppAudioPayloadBuilder, _super);
    function UniAppAudioPayloadBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UniAppAudioPayloadBuilder.prototype.create = function () {
        return new AudioMessagePayload_1.AudioMessagePayload();
    };
    UniAppAudioPayloadBuilder.prototype.setPayload = function (buildOptions, payload) {
        var createOptions = buildOptions.createOptions;
        var audioPayload = payload;
        var file = createOptions.file;
        var path = file.tempFilePath;
        var namePath = (utils_1.calibrator.isEmpty(file.name) || file.name == undefined) ? path : file.name;
        audioPayload.url = path;
        audioPayload.name = 'uni-audio.' + utils_2.str.fileExtension(namePath, '.');
        audioPayload.contentType = 'audio/' + utils_2.str.fileExtension(namePath, '.');
        buildOptions.complete = new Promise(function (resolve, reject) {
            uni.getFileInfo({
                filePath: path,
                success: function (res) {
                    var size = res.size;
                    audioPayload.size = size;
                    if (size === 0) {
                        // if res size is 0,innerAudioContext can't callback onCanplay method and onError method
                        resolve();
                    }
                    else {
                        if (utils_1.calibrator.isDef(createOptions.file.duration)) { //编译成微信小程序
                            audioPayload.duration = createOptions.file.duration / 1000;
                            resolve();
                        }
                        else { //app
                            var innerAudioContext_1 = uni.createInnerAudioContext();
                            innerAudioContext_1.src = path;
                            innerAudioContext_1.onCanplay(function (error) {
                                if (error.errCode) {
                                    innerAudioContext_1.destroy();
                                    reject(error);
                                }
                                else {
                                    audioPayload.duration = innerAudioContext_1.duration;
                                    innerAudioContext_1.destroy();
                                    resolve();
                                }
                            });
                            innerAudioContext_1.onError(function (error) {
                                innerAudioContext_1.destroy();
                                if (error.errCode === -99) {
                                    resolve();
                                }
                                else {
                                    reject(error);
                                }
                            });
                        }
                    }
                },
                fail: function (error) {
                    reject(error);
                }
            });
        });
    };
    UniAppAudioPayloadBuilder.prototype.validate = function (createOptions) {
        _super.prototype.validate.call(this, createOptions);
    };
    return UniAppAudioPayloadBuilder;
}(UniAppFilePayloadBuilder_1["default"]));
exports["default"] = UniAppAudioPayloadBuilder;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var utils_1 = __webpack_require__(0);
var utils_2 = __webpack_require__(6);
var VideoMessagePayload_1 = __webpack_require__(36);
var AbstractPayloadBuilder_1 = __webpack_require__(10);
var UniAppVideoPayloadBuilder = /** @class */ (function (_super) {
    __extends(UniAppVideoPayloadBuilder, _super);
    function UniAppVideoPayloadBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UniAppVideoPayloadBuilder.prototype.create = function () {
        return new VideoMessagePayload_1.VideoMessagePayload();
    };
    UniAppVideoPayloadBuilder.prototype.setPayload = function (buildOptions, payload) {
        var createOptions = buildOptions.createOptions;
        var file = createOptions.file;
        var videoPayload = payload;
        var video = videoPayload.video;
        var thumbnail = videoPayload.thumbnail;
        var duration = file.duration, height = file.height, size = file.size, tempFilePath = file.tempFilePath, width = file.width, _a = file.name, name = _a === void 0 ? '' : _a;
        var path = utils_1.calibrator.isEmpty(name) ? tempFilePath : name;
        video.size = size;
        video.width = width;
        video.height = height;
        video.url = tempFilePath;
        video.duration = duration;
        video.contentType = 'video/' + utils_2.str.fileExtension(path, '.');
        video.name = 'uni-video.' + utils_2.str.fileExtension(path, '.');
        thumbnail.url = tempFilePath;
        thumbnail.width = width;
        thumbnail.height = height;
        thumbnail.contentType = 'image/jpg';
        thumbnail.name = 'uni-thumbnail.jpg';
        buildOptions.complete = Promise.resolve();
    };
    UniAppVideoPayloadBuilder.prototype.validate = function (createOptions) {
        if (!utils_1.calibrator.isObject(createOptions)) {
            throw Error('it is an empty message.');
        }
        if (!utils_1.calibrator.isDef(createOptions.file)) {
            throw Error('file is empty.');
        }
    };
    return UniAppVideoPayloadBuilder;
}(AbstractPayloadBuilder_1.AbstractPayloadBuilder));
exports["default"] = UniAppVideoPayloadBuilder;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ImageMessagePayload_1 = __webpack_require__(33);
var HTMLFilePayloadBuilder_1 = __webpack_require__(38);
var HTMLImagePayloadBuilder = /** @class */ (function (_super) {
    __extends(HTMLImagePayloadBuilder, _super);
    function HTMLImagePayloadBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HTMLImagePayloadBuilder.prototype.create = function () {
        return new ImageMessagePayload_1.ImageMessagePayload();
    };
    HTMLImagePayloadBuilder.prototype.setPayload = function (buildOptions, payload) {
        _super.prototype.setPayload.call(this, buildOptions, payload);
        var createOptions = buildOptions.createOptions;
        var file = createOptions.file;
        var imagePayLoad = payload;
        var url = window.URL || window.webkitURL;
        var img = new Image();
        img.src = url.createObjectURL(file);
        buildOptions.complete = new Promise(function (resolve, reject) {
            img.onload = function () {
                imagePayLoad.width = img.width;
                imagePayLoad.height = img.height;
                url.revokeObjectURL(img.src);
                resolve();
            };
            img.onerror = function (error) {
                url.revokeObjectURL(img.src);
                reject(error);
            };
        });
    };
    HTMLImagePayloadBuilder.prototype.validate = function (createOptions) {
        _super.prototype.validate.call(this, createOptions);
        var supportTypes = ['gif', 'jpg', 'png', 'jpeg'];
        if (!supportTypes.find(function (item) { return item === createOptions.file.type.split('/')[1].toLowerCase(); })) {
            throw Error('Only ' + supportTypes.join(',') + " is supported image.");
        }
    };
    return HTMLImagePayloadBuilder;
}(HTMLFilePayloadBuilder_1["default"]));
exports["default"] = HTMLImagePayloadBuilder;


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var AudioMessagePayload_1 = __webpack_require__(35);
var HTMLFilePayloadBuilder_1 = __webpack_require__(38);
var HTMLAudioPayloadBuilder = /** @class */ (function (_super) {
    __extends(HTMLAudioPayloadBuilder, _super);
    function HTMLAudioPayloadBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HTMLAudioPayloadBuilder.prototype.create = function () {
        return new AudioMessagePayload_1.AudioMessagePayload();
    };
    HTMLAudioPayloadBuilder.prototype.setPayload = function (buildOptions, payload) {
        _super.prototype.setPayload.call(this, buildOptions, payload);
        var createOptions = buildOptions.createOptions;
        var file = createOptions.file;
        var audioPayLoad = payload;
        var url = window.URL || window.webkitURL;
        var audio = document.createElement('audio');
        audio.src = url.createObjectURL(file);
        buildOptions.complete = new Promise(function (resolve, reject) {
            audio.onloadedmetadata = function () {
                audioPayLoad.duration = audio.duration;
                url.revokeObjectURL(audio.src);
                resolve();
            };
            audio.onerror = function (error) {
                url.revokeObjectURL(audio.src);
                reject(error);
            };
        });
    };
    HTMLAudioPayloadBuilder.prototype.validate = function (createOptions) {
        _super.prototype.validate.call(this, createOptions);
        var supportTypes = ['mp3', 'ogg', 'wav', 'wma', 'ape', 'acc', 'mpeg'];
        if (!supportTypes.find(function (item) { return item === createOptions.file.type.split('/')[1].toLowerCase(); })) {
            throw Error('Only ' + supportTypes.join(',') + " is supported audio.");
        }
    };
    return HTMLAudioPayloadBuilder;
}(HTMLFilePayloadBuilder_1["default"]));
exports["default"] = HTMLAudioPayloadBuilder;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var VideoMessagePayload_1 = __webpack_require__(36);
var AbstractPayloadBuilder_1 = __webpack_require__(10);
var utils_1 = __webpack_require__(6);
var HTMLVideoPayloadBuilder = /** @class */ (function (_super) {
    __extends(HTMLVideoPayloadBuilder, _super);
    function HTMLVideoPayloadBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HTMLVideoPayloadBuilder.prototype.create = function () {
        return new VideoMessagePayload_1.VideoMessagePayload();
    };
    HTMLVideoPayloadBuilder.prototype.setPayload = function (buildOptions, payload) {
        var _this = this;
        var createOptions = buildOptions.createOptions;
        var file = createOptions.file;
        var videoPayLoad = payload;
        var video = videoPayLoad.video;
        var thumbnail = videoPayLoad.thumbnail;
        var url = window.URL || window.webkitURL;
        var videoElement = document.createElement('video');
        videoElement.src = url.createObjectURL(file);
        video.size = file.size;
        video.name = file.name;
        video.contentType = file.type;
        video.url = videoElement.src;
        thumbnail.name = file.name;
        thumbnail.contentType = 'image/jpg';
        buildOptions.complete = new Promise(function (resolve, reject) {
            videoElement.onloadedmetadata = function () {
                video.duration = videoElement.duration;
                video.width = videoElement.videoWidth;
                video.height = videoElement.videoHeight;
                thumbnail.width = videoElement.videoWidth;
                thumbnail.height = videoElement.videoHeight;
                thumbnail.url = _this.getThumbnailUrl(videoElement);
                url.revokeObjectURL(videoElement.src);
                resolve();
            };
            videoElement.onerror = function (error) {
                url.revokeObjectURL(videoElement.src);
                reject(error);
            };
        });
    };
    HTMLVideoPayloadBuilder.prototype.getThumbnailUrl = function (video) {
        var canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL("image/png");
    };
    HTMLVideoPayloadBuilder.prototype.validate = function (createOptions) {
        if (!utils_1.calibrator.isObject(createOptions)) {
            throw Error('it is an empty message.');
        }
        if (!(createOptions.file instanceof File)) {
            throw Error('wrong file type.');
        }
        if (createOptions.file.size == 0) {
            throw Error('File size is 0.');
        }
        if (createOptions.file.size > 30 * 1024 * 1024) {
            throw Error('message-length limit 30mib');
        }
        var supportTypes = ['avi', 'mov', 'rmvb', 'rm', 'flv', 'mp4', '3gp', 'quicktime'];
        if (!supportTypes.find(function (item) { return item === createOptions.file.type.split('/')[1].toLowerCase(); })) {
            throw Error('Only ' + supportTypes.join(',') + " is supported video.");
        }
    };
    return HTMLVideoPayloadBuilder;
}(AbstractPayloadBuilder_1.AbstractPayloadBuilder));
exports["default"] = HTMLVideoPayloadBuilder;


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.CustomPayloadBuilder = void 0;
var AbstractPayloadBuilder_1 = __webpack_require__(10);
var CustomMessagePayload_1 = __webpack_require__(130);
var utils_1 = __webpack_require__(0);
var CustomPayloadBuilder = /** @class */ (function (_super) {
    __extends(CustomPayloadBuilder, _super);
    function CustomPayloadBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomPayloadBuilder.prototype.create = function () {
        return new CustomMessagePayload_1["default"]();
    };
    CustomPayloadBuilder.prototype.setPayload = function (buildOptions, payload) {
        var customMessageOptions = buildOptions.createOptions;
        var customMessagePayLoad = payload;
        customMessagePayLoad.payload = customMessageOptions.payload;
        buildOptions.complete = Promise.resolve();
    };
    CustomPayloadBuilder.prototype.validate = function (createOptions) {
        var type = createOptions.type;
        var payload = createOptions.payload;
        if (utils_1.calibrator.isEmpty(type)) {
            throw Error('type is empty.');
        }
        if (!utils_1.calibrator.isString(type)) {
            throw Error('type require a string');
        }
        if (utils_1.calibrator.isEmpty(payload)) {
            throw Error('payload is empty.');
        }
        if (!utils_1.calibrator.isPlainObject(payload) && !utils_1.calibrator.isStringOrNumber(payload)) {
            throw Error('payload require object | string | number.');
        }
    };
    return CustomPayloadBuilder;
}(AbstractPayloadBuilder_1.AbstractPayloadBuilder));
exports.CustomPayloadBuilder = CustomPayloadBuilder;


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var AbstractMessagePayload_1 = __webpack_require__(23);
var CustomMessagePayload = /** @class */ (function (_super) {
    __extends(CustomMessagePayload, _super);
    function CustomMessagePayload() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CustomMessagePayload;
}(AbstractMessagePayload_1.AbstractMessagePayload));
exports["default"] = CustomMessagePayload;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.LocalIMMessageBuildOptions = void 0;
var LocalIMMessageBuildOptions = /** @class */ (function () {
    function LocalIMMessageBuildOptions(type, createOptions) {
        this.type = type;
        this.createOptions = createOptions;
    }
    return LocalIMMessageBuildOptions;
}());
exports.LocalIMMessageBuildOptions = LocalIMMessageBuildOptions;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Rocket_1 = __webpack_require__(2);
var Permission_1 = __webpack_require__(1);
var SocketTimeout_1 = __webpack_require__(3);
var PayloadImprover_1 = __webpack_require__(133);
var IM_1 = __webpack_require__(7);
var BulletMessage_1 = __webpack_require__(136);
var utils_1 = __webpack_require__(0);
var goeasy_event_center_1 = __webpack_require__(13);
var internal_events_1 = __webpack_require__(21);
var GoEasy_1 = __webpack_require__(5);
var AbstractMessage_1 = __webpack_require__(22);
var RocketTypes_1 = __webpack_require__(4);
var IMMessageSender = /** @class */ (function () {
    function IMMessageSender() {
        this.payloadImprover = new PayloadImprover_1.PayloadImprover();
    }
    IMMessageSender.prototype.send = function (sendOptions) {
        var _this = this;
        this.validate(sendOptions);
        var message = sendOptions.message;
        var accessToken = sendOptions.accessToken;
        var buildOptions = message.buildOptions;
        var createOptions = buildOptions.createOptions;
        var notification = createOptions.notification;
        var to = createOptions.to;
        if (!to.data) {
            to.data = {};
        }
        IM_1.im['_dataCache'].putData(to.type, to.id, to.data);
        message.status = GoEasy_1.MessageStatus.SENDING;
        var buildPromise = buildOptions.complete;
        var improvePromise = this.payloadImprover.improve(sendOptions);
        Promise.all([buildPromise, improvePromise]).then(function () {
            _this.doSend(message, to, notification, accessToken, sendOptions);
        })["catch"](function (error) {
            message.status = GoEasy_1.MessageStatus.FAIL;
            sendOptions.onFailed({
                code: error.code || 400,
                content: error.content || error
            });
        });
    };
    IMMessageSender.prototype.doSend = function (message, to, notification, accessToken, options) {
        var bulletMessage = new BulletMessage_1["default"](message, to, notification, accessToken);
        goeasy_event_center_1.GoEasyEventCenter.fire(internal_events_1.IM_INTERNAL_EVENTS.MESSAGE_SENDING, message);
        var rocket = new Rocket_1["default"]({
            name: RocketTypes_1.RocketTypes.publishIM,
            params: bulletMessage,
            unique: true,
            permission: Permission_1.Permission.WRITE,
            singleTimeout: SocketTimeout_1.SocketTimeout.commonRequestSingle,
            totalTimeout: SocketTimeout_1.SocketTimeout.commonRequestTotal,
            fail: function (error) {
                message.status = GoEasy_1.MessageStatus.FAIL;
                options.onFailed({
                    code: error.resultCode || 408,
                    content: error.content || 'Failed to send private message.'
                });
            },
            success: function (result) {
                if (result.resultCode == 200) {
                    message.status = GoEasy_1.MessageStatus.SUCCESS;
                    message.timestamp = result.content.timestamp;
                    message.clearUseLessAttribute();
                    goeasy_event_center_1.GoEasyEventCenter.fire(internal_events_1.IM_INTERNAL_EVENTS.MESSAGE_SEND_SUCCESS, message);
                    options.onSuccess(message);
                }
                else {
                    message.status = GoEasy_1.MessageStatus.FAIL;
                    options.onFailed(result);
                }
            }
        });
        IM_1.im['_goEasySocket'].emit(rocket);
    };
    IMMessageSender.prototype.validate = function (options) {
        var message = options.message;
        var buildOptions = message.buildOptions;
        var createOptions = buildOptions.createOptions;
        if (!(message instanceof AbstractMessage_1.AbstractMessage)) {
            throw new Error("it is invalid message");
        }
        if (message.status !== GoEasy_1.MessageStatus.NEW) {
            throw new Error("Please create a new message, a message can only be sent once");
        }
        var to = createOptions.to;
        if (!to) {
            throw new Error("message require property to.");
        }
        if (!to.type || (to.type != GoEasy_1.Scene.GROUP && to.type != GoEasy_1.Scene.PRIVATE)) {
            throw new Error("message require property to.type");
        }
        if (!to.id) {
            throw new Error("message require property to.id");
        }
        if (!utils_1.calibrator.isStringOrNumber(to.id)) {
            throw new Error("to.id should be a string or number.");
        }
        if (IM_1.IM.userId === to.id) {
            throw new Error("to.id can not be the same as your id.");
        }
        if (to.data && utils_1.calibrator.isFunction(to.data)) {
            throw new Error("to.data can not be function");
        }
        var notification = createOptions.notification;
        if (notification) {
            if (utils_1.calibrator.isObject(notification)) {
                if (utils_1.calibrator.isEmpty(notification.title)) {
                    throw new Error("notification title is required");
                }
                else if (!utils_1.calibrator.isString(notification.title)) {
                    throw new Error("notification title must be string");
                }
                if (utils_1.calibrator.isEmpty(notification.body)) {
                    throw new Error("notification body is required");
                }
                else if (!utils_1.calibrator.isString(notification.body)) {
                    throw new Error("notification body must be string");
                }
            }
            else if (utils_1.calibrator.isPrimitive(notification)) {
                throw new Error("notification must be an json object");
            }
        }
    };
    return IMMessageSender;
}());
exports["default"] = IMMessageSender;


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.PayloadImprover = void 0;
var FileMessagePayloadImprover_1 = __webpack_require__(62);
var VideoMessagePayloadImprover_1 = __webpack_require__(135);
var MessageType_1 = __webpack_require__(18);
var PayloadImprover = /** @class */ (function () {
    function PayloadImprover() {
        var _a;
        this.improvers = (_a = {},
            _a[MessageType_1.MessageType.FILE] = new FileMessagePayloadImprover_1.FileMessagePayloadImprover(),
            _a[MessageType_1.MessageType.AUDIO] = new FileMessagePayloadImprover_1.FileMessagePayloadImprover(),
            _a[MessageType_1.MessageType.IMAGE] = new FileMessagePayloadImprover_1.FileMessagePayloadImprover(),
            _a[MessageType_1.MessageType.VIDEO] = new VideoMessagePayloadImprover_1.VideoMessagePayloadImprover(),
            _a);
    }
    PayloadImprover.prototype.improve = function (options) {
        var payloadImprover = this.improvers[options.message.type];
        if (payloadImprover) {
            return payloadImprover.improve(options);
        }
        return Promise.resolve();
    };
    return PayloadImprover;
}());
exports.PayloadImprover = PayloadImprover;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.AbstractPayloadImprover = void 0;
var AbstractPayloadImprover = /** @class */ (function () {
    function AbstractPayloadImprover() {
    }
    return AbstractPayloadImprover;
}());
exports.AbstractPayloadImprover = AbstractPayloadImprover;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.VideoMessagePayloadImprover = void 0;
var FileMessagePayloadImprover_1 = __webpack_require__(62);
var VideoMessagePayloadImprover = /** @class */ (function (_super) {
    __extends(VideoMessagePayloadImprover, _super);
    function VideoMessagePayloadImprover() {
        return _super.call(this) || this;
    }
    VideoMessagePayloadImprover.prototype.setPayload = function (uploadResponse, message) {
        var _a = uploadResponse.content, content = _a === void 0 ? {} : _a;
        var payload = message.payload;
        var rule = '?x-oss-process=video/snapshot,t_0000,f_jpg,w_' + payload.video.width + ',m_fast,ar_auto';
        payload.video.url = uploadResponse.content.url;
        payload.thumbnail.url = uploadResponse.content.url + rule;
        payload.video.name = uploadResponse.content.newFileName;
    };
    return VideoMessagePayloadImprover;
}(FileMessagePayloadImprover_1.FileMessagePayloadImprover));
exports.VideoMessagePayloadImprover = VideoMessagePayloadImprover;


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var MessageType_1 = __webpack_require__(18);
var BulletMessage = /** @class */ (function () {
    function BulletMessage(message, to, notification, accessToken) {
        this.validate(message);
        this.mt = message.type;
        this.to = to.id;
        this.d = JSON.stringify(to.data);
        this.p = JSON.stringify(message.payload);
        if (notification) {
            this.nt = notification;
        }
        if (accessToken) {
            this.at = accessToken;
        }
        this.t = to.type;
        this.guid = message.messageId;
    }
    BulletMessage.prototype.validate = function (message) {
        if (message.type === MessageType_1.MessageType.TEXT) {
            var len = JSON.stringify(message.payload).length;
            if (len > 3 * 1024) {
                throw Error('message-length limit 3kb');
            }
        }
    };
    return BulletMessage;
}());
exports["default"] = BulletMessage;


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.eventCenter = void 0;
var utils_1 = __webpack_require__(0);
var im_api_events_1 = __webpack_require__(9);
var EventCenter = /** @class */ (function () {
    function EventCenter() {
        this.subs = null; // todo:event类型
        this.subs = Object.create(null);
    }
    EventCenter.prototype.on = function (event, fn) {
        if (!utils_1.calibrator.isString(event)) {
            throw Error('eventType require a string.');
        }
        if (!utils_1.calibrator.isDef(im_api_events_1.ImApiEvents[event])) {
            throw Error('event not found.');
        }
        if (!utils_1.calibrator.isFunction(fn)) {
            throw Error('event require a callback.');
        }
        this.subs[event] = fn;
    };
    EventCenter.prototype.notify = function (key, payload) {
        var cb = this.subs[key];
        cb && cb(payload);
    };
    return EventCenter;
}());
var eventCenter = new EventCenter();
exports.eventCenter = eventCenter;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Conversations_1 = __webpack_require__(139);
var goeasy_event_center_1 = __webpack_require__(13);
var internal_events_1 = __webpack_require__(21);
var IM_1 = __webpack_require__(7);
var RemoteEvents_1 = __webpack_require__(16);
var Target_1 = __webpack_require__(24);
var GoEasy_1 = __webpack_require__(5);
var ReadMessageMarker_1 = __webpack_require__(143);
var utils_1 = __webpack_require__(6);
var MessageDeleter_1 = __webpack_require__(145);
// import {MessageRecalledEvent} from "./recall/MessageRecalledEvent";
// import MessageRecaller from "./recall/MessageRecaller";
var callback_utils_1 = __webpack_require__(11);
var ConversationRemover_1 = __webpack_require__(147);
var ConversationTopper_1 = __webpack_require__(149);
var ConversationList = /** @class */ (function () {
    function ConversationList() {
        var _this = this;
        this.conversations = new Conversations_1.Conversations();
        this.readMessageMarker = new ReadMessageMarker_1["default"]();
        // recaller: MessageRecaller = new MessageRecaller();
        this.deleter = new MessageDeleter_1["default"]();
        this.topper = new ConversationTopper_1["default"](this.conversations);
        this.remover = new ConversationRemover_1["default"](this.conversations);
        IM_1.im['_goEasySocket'].addMessageObserver(RemoteEvents_1.RemoteEvents.IM_MSG_READ, this.onRemoteMarkRead.bind(this));
        IM_1.im['_goEasySocket'].addMessageObserver(RemoteEvents_1.RemoteEvents.IM_MSG_DELETED, this.onRemoteMessageDeleted.bind(this));
        // im['_goEasySocket'].addMessageObserver(RemoteEvents.IM_MSG_RECALLED, this.onRemoteMessageRecalled.bind(this));
        goeasy_event_center_1.GoEasyEventCenter.on(internal_events_1.IM_INTERNAL_EVENTS.MESSAGE_SENDING, function (message) { return _this.onMessageSending(message); });
        goeasy_event_center_1.GoEasyEventCenter.on(internal_events_1.IM_INTERNAL_EVENTS.MESSAGE_SEND_SUCCESS, function (message) { return _this.onMessageSendSuccess(message); });
        goeasy_event_center_1.GoEasyEventCenter.on(internal_events_1.IM_INTERNAL_EVENTS.MESSAGE_RECEIVED, function (message) { return _this.onMessageReceived(message); });
        goeasy_event_center_1.GoEasyEventCenter.on(internal_events_1.IM_INTERNAL_EVENTS.MESSAGE_DELETED, function (messages) { return _this.onLocalMessageDeleted(messages); });
    }
    ConversationList.prototype.latestConversations = function () {
        return this.conversations.latestConversations();
    };
    ConversationList.prototype.history = function (options) {
        var _this = this;
        this.transformOptions(options);
        var target = Target_1.Target.byIds(options.userId, options.groupId);
        var scene = target.scene;
        var targetId = target.id;
        var conversation = this.conversations.findOrCreateConversation(scene, targetId);
        var oldLstTimestamp = conversation.lastTimestamp();
        conversation.messageCache.loadHistory(options).then(function () {
            if (oldLstTimestamp !== conversation.lastTimestamp()) {
                _this.conversations.correctPosition(conversation);
                conversation.initialData().then(function () {
                    _this.conversations.onUpdated();
                });
            }
        })["catch"](function (error) {
            console.error("Failed to load history:", error);
        });
    };
    ConversationList.prototype.topPrivateConversation = function (options) {
        var success = this.topper.validateOptions(GoEasy_1.Scene.PRIVATE, options);
        if (!success) {
            return;
        }
        var target = Target_1.Target.byScene(GoEasy_1.Scene.PRIVATE, options.userId);
        var top = options.top;
        this.topper.top(target, top, options);
    };
    ConversationList.prototype.topGroupConversation = function (options) {
        var success = this.topper.validateOptions(GoEasy_1.Scene.GROUP, options);
        if (!success) {
            return;
        }
        var target = Target_1.Target.byScene(GoEasy_1.Scene.GROUP, options.groupId);
        var top = options.top;
        this.topper.top(target, top, options);
    };
    ConversationList.prototype.removePrivateConversation = function (options) {
        var success = this.remover.validateOptions(GoEasy_1.Scene.PRIVATE, options);
        if (!success) {
            return;
        }
        var target = Target_1.Target.byScene(GoEasy_1.Scene.PRIVATE, options.userId);
        this.remover.remove(target, options);
    };
    ConversationList.prototype.removeGroupConversation = function (options) {
        var success = this.remover.validateOptions(GoEasy_1.Scene.GROUP, options);
        if (!success) {
            return;
        }
        var target = Target_1.Target.byScene(GoEasy_1.Scene.GROUP, options.groupId);
        this.remover.remove(target, options);
    };
    ConversationList.prototype.onMessageSending = function (message) {
        var _this = this;
        var target = Target_1.Target.byIMMessage(message);
        var scene = target.scene;
        var targetId = target.id;
        var conversation = this.conversations.findOrCreateConversation(scene, targetId);
        conversation.messageCache.saveMessage(message);
        this.conversations.correctPosition(conversation);
        conversation.initialData().then(function () {
            _this.conversations.onUpdated();
        });
    };
    ConversationList.prototype.onMessageSendSuccess = function (message) {
        var target = Target_1.Target.byIMMessage(message);
        var scene = target.scene;
        var targetId = target.id;
        var conversation = this.conversations.findOrCreateConversation(scene, targetId);
        this.conversations.correctPosition(conversation);
        this.conversations.onUpdated();
    };
    ConversationList.prototype.onMessageReceived = function (message) {
        var _this = this;
        var target = Target_1.Target.byIMMessage(message);
        var scene = target.scene;
        var targetId = target.id;
        var conversation = this.conversations.findOrCreateConversation(scene, targetId);
        var success = conversation.messageCache.saveReceivedMessage(message);
        if (success) {
            this.conversations.correctPosition(conversation);
            conversation.initialData().then(function () {
                _this.conversations.onUpdated();
            });
        }
    };
    ConversationList.prototype.privateMarkAsRead = function (option) {
        this.readMessageMarker.validate(GoEasy_1.Scene.PRIVATE, option);
        var target = Target_1.Target.byScene(GoEasy_1.Scene.PRIVATE, option.userId);
        this.markAsRead(target, option);
    };
    ConversationList.prototype.groupMarkAsRead = function (option) {
        this.readMessageMarker.validate(GoEasy_1.Scene.GROUP, option);
        var target = Target_1.Target.byScene(GoEasy_1.Scene.GROUP, option.groupId);
        this.markAsRead(target, option);
    };
    ConversationList.prototype.markAsRead = function (target, markOption) {
        var conversation = this.conversations.findConversation(target.scene, target.id);
        if (utils_1.calibrator.isDef(conversation)) {
            this.readMessageMarker.mark(markOption, conversation, this.conversations);
        }
        else {
            callback_utils_1.CallbackUtils.onFailed(markOption, {
                code: 400,
                content: 'No unread message that could be marked.'
            });
        }
    };
    ConversationList.prototype.onRemoteMarkRead = function (event) {
        var target = Target_1.Target.byMessageReadRemoteEvent(event);
        var conversation = this.conversations.findConversation(target.scene, target.id);
        if (utils_1.calibrator.isDef(conversation)) {
            this.readMessageMarker.markByRemoteEvent(conversation, event);
            if (conversation.lastTimestamp() === event.time) {
                this.conversations.onUpdated();
            }
        }
    };
    // recallMessage(options: MessageRecallOptions): void {
    //     let success = this.recaller.validate(options);
    //     if (!success) {
    //         return;
    //     }
    //     let target = Target.byIMMessage(options.message as AbstractMessage);
    //     let conversation = this.conversations.findConversation(target.scene, target.id);
    //     if (calibrator.isDef(conversation)) {
    //         this.recaller.recall(this.conversations, conversation, options);
    //     } else {
    //         CallbackUtils.onFailed(options, {
    //             code: 400,
    //             content: 'No message that could be recalled'
    //         });
    //     }
    // }
    // onRemoteRecalled(event: MessageRecalledEvent): void {
    //     let target = Target.byMessageRecalledEvent(event);
    //     let conversation = this.conversations.findConversation(target.scene, target.id);
    //     if (calibrator.isDef(conversation)) {
    //         this.recaller.recallTheirMessage(this.conversations, conversation, event);
    //     }
    // }
    ConversationList.prototype.deleteMessage = function (options) {
        this.deleter.validate(options);
        var message = options.messages[0];
        var target = Target_1.Target.byIMMessage(message);
        var conversation = this.conversations.findConversation(target.scene, target.id);
        if (utils_1.calibrator.isDef(conversation)) {
            this.deleter["delete"](conversation, options);
        }
        else {
            throw {
                code: 400,
                content: 'No message that could be deleted'
            };
        }
    };
    ConversationList.prototype.onLocalMessageDeleted = function (messages) {
        this.conversations.updateByDeletedMessage(messages);
    };
    ConversationList.prototype.onRemoteMessageDeleted = function (event) {
        var target = Target_1.Target.byIMMessageDeletedEvent(event);
        var conversation = this.conversations.findConversation(target.scene, target.id);
        if (utils_1.calibrator.isDef(conversation)) {
            this.deleter.deleteMessageByRemoteEvent(conversation, event);
        }
    };
    ConversationList.prototype.transformOptions = function (options) {
        callback_utils_1.CallbackUtils.validateCallbackOptions(options);
        if (!utils_1.calibrator.isObject(options) || (!utils_1.calibrator.isDef(options.userId) && !utils_1.calibrator.isDef(options.groupId))) {
            throw ({
                code: 400,
                content: 'userId or groupId is required'
            });
        }
        if (utils_1.calibrator.isDef(options.userId) && utils_1.calibrator.isDef(options.groupId)) {
            throw {
                code: 400,
                content: "only contain userId or groupId"
            };
        }
        if (utils_1.calibrator.isUndef(options.limit)) {
            options.limit = 10;
        }
        if (options.limit > 30) {
            options.limit = 30;
        }
        if (utils_1.calibrator.isDef(options.userId)) {
            if (!utils_1.calibrator.isStringOrNumber(options.userId)) {
                callback_utils_1.CallbackUtils.onFailed(options, {
                    code: 400,
                    content: "Failed to query history: userId require string or number"
                });
            }
        }
        else {
            if (!utils_1.calibrator.isStringOrNumber(options.groupId)) {
                callback_utils_1.CallbackUtils.onFailed(options, {
                    code: 400,
                    content: "Failed to query history: groupId require string or number"
                });
            }
        }
    };
    return ConversationList;
}());
exports["default"] = ConversationList;


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Conversations = void 0;
var Conversation_1 = __webpack_require__(140);
var IM_1 = __webpack_require__(7);
var Rocket_1 = __webpack_require__(2);
var Permission_1 = __webpack_require__(1);
var SocketTimeout_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(0);
var GoEasy_1 = __webpack_require__(5);
var remote_abbr_message_builder_1 = __webpack_require__(32);
var RocketTypes_1 = __webpack_require__(4);
var im_api_events_1 = __webpack_require__(9);
var Target_1 = __webpack_require__(24);
var Conversations = /** @class */ (function () {
    function Conversations() {
        this.list = new Array();
        this.builder = new remote_abbr_message_builder_1.RemoteAbbrMessageBuilder();
    }
    /**
     * 通知更新会话列表
     * todo:每个地方要调用这个代码，要像history里update的地方，做个精准判断，的确需要的时候才update，不能总是频繁的调用
     *
     */
    Conversations.prototype.onUpdated = function () {
        this.loadLocalConversationsAsDtos().then(function (result) {
            IM_1.im['_event'].notify(im_api_events_1.ImApiEvents.CONVERSATIONS_UPDATED, {
                unreadTotal: result.content.unreadTotal,
                conversations: result.content.conversations
            });
        });
    };
    Conversations.prototype.latestConversations = function () {
        return this.synchronized ? this.loadLocalConversationsAsDtos() : this.loadServerConversations();
    };
    /**
     * todo ：所有查询考虑一段时间内的调用次数
     */
    Conversations.prototype.loadServerConversations = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var rocket = new Rocket_1["default"]({
                name: RocketTypes_1.RocketTypes.imLastConversations,
                params: {},
                permission: Permission_1.Permission.READ,
                singleTimeout: SocketTimeout_1.SocketTimeout.commonQuerySingle,
                totalTimeout: SocketTimeout_1.SocketTimeout.commonQueryTotal,
                fail: function (err) {
                    reject(err);
                },
                success: function (result) { return __awaiter(_this, void 0, void 0, function () {
                    var conversations, i, conversation, scene, top_1, data, targetId, localConversation, remoteAbbrMessage, message;
                    return __generator(this, function (_a) {
                        if (result.code === 200) {
                            conversations = result.content;
                            for (i = 0; i < conversations.length; i++) {
                                conversation = conversations[i];
                                scene = conversation.t;
                                top_1 = conversation.top;
                                data = conversation.d ? JSON.parse(conversation.d) : {};
                                targetId = scene === GoEasy_1.Scene.PRIVATE ? conversation.uid : conversation.g;
                                IM_1.im['_dataCache'].putData(scene, targetId, data);
                                localConversation = this.findOrCreateConversation(scene, targetId);
                                localConversation.top = top_1;
                                localConversation.data = data;
                                remoteAbbrMessage = conversation.lmsg;
                                remoteAbbrMessage.t = scene;
                                message = this.builder.build(remoteAbbrMessage);
                                localConversation.messageCache.initLastMessage(message, conversation.lcts);
                                this.correctPosition(localConversation);
                            }
                            this.synchronized = true;
                            this.loadLocalConversationsAsDtos().then(function (res) {
                                resolve(res);
                            });
                        }
                        else {
                            reject(result);
                        }
                        return [2 /*return*/];
                    });
                }); }
            });
            IM_1.im['_goEasySocket'].emit(rocket);
        });
    };
    Conversations.prototype.loadLocalConversationsAsDtos = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var conversationDTOs = new Array();
            var size = _this.list.length;
            for (var i = 0; i < size; i++) {
                var conversation = _this.list[i];
                if (conversation.messageCache.getLastMessage()) {
                    var conversationDTO = conversation.toDto();
                    conversationDTOs.push(conversationDTO);
                }
            }
            resolve({
                code: 200,
                content: {
                    unreadTotal: _this.getUnreadTotal(),
                    conversations: conversationDTOs
                }
            });
        });
    };
    /***
     * 新创建的conversation必须同步插入，否则会造成conversation的重复
     *
     *
     * @param scene
     * @param targetId
     */
    Conversations.prototype.findOrCreateConversation = function (scene, targetId) {
        var conversation = this.findConversation(scene, targetId);
        if (utils_1.calibrator.isUndef(conversation)) {
            conversation = new Conversation_1.Conversation(scene, targetId);
            this.insertOne(conversation);
        }
        return conversation;
    };
    Conversations.prototype.findConversationIndex = function (scene, targetId) {
        return this.list.findIndex(function (item) { return ((scene === GoEasy_1.Scene.GROUP && targetId === item.groupId)
            || (scene === GoEasy_1.Scene.PRIVATE && targetId === item.userId)); });
    };
    Conversations.prototype.findConversation = function (scene, targetId) {
        var index = this.findConversationIndex(scene, targetId);
        return this.list[index];
    };
    Conversations.prototype.removeLocalConversation = function (conversation) {
        var targetId = conversation.getTargetId();
        var scene = conversation.getScene();
        var index = this.findConversationIndex(scene, targetId);
        this.list.splice(index, 1);
    };
    Conversations.prototype.topLocalConversation = function (conversation, top) {
        conversation.top = top;
        this.correctPosition(conversation);
        this.onUpdated();
    };
    Conversations.prototype.getUnreadTotal = function () {
        var total = 0;
        this.list.forEach(function (conversation) {
            total += conversation.messageCache.unreadAmount();
        });
        return total;
    };
    Conversations.prototype.insertOne = function (conversation) {
        var pos = this.getPosIndex(conversation);
        this.list.splice(pos + 1, 0, conversation);
        if (this.list.length > Conversations.CONVERSATIONS_MAX_LENGTH) {
            this.list = this.list.slice(0, Conversations.CONVERSATIONS_MAX_LENGTH);
        }
    };
    Conversations.prototype.getPosIndex = function (conversation) {
        if (this.list.length == 0)
            return -1;
        var mpos, mvalConversation, spos = 0, epos = this.list.length;
        while (epos - spos > 1) {
            mpos = Math.floor((spos + epos) / 2);
            mvalConversation = this.list[mpos];
            var comp = this.compares(conversation, mvalConversation);
            if (comp == 0)
                return mpos;
            if (comp > 0)
                spos = mpos;
            else
                epos = mpos;
        }
        return (spos == 0 && this.compares(this.list[0], conversation) > 0) ? -1 : spos;
    };
    Conversations.prototype.compares = function (a, b) {
        var c;
        if (a.top == b.top) {
            var aLastTimestamp = a.lastTimestamp();
            var bLastTimestamp = b.lastTimestamp();
            c = bLastTimestamp - aLastTimestamp;
        }
        else {
            c = a.top ? -1 : 1;
        }
        return (c > 0) ? 1 : (c === 0) ? 0 : -1;
    };
    /**
     * todo: 其实应该判断删除的消息是最后一条消息,才应该更新会话李彪
     *
     * @param messages
     */
    Conversations.prototype.updateByDeletedMessage = function (messages) {
        var message = messages[0];
        var target = Target_1.Target.byIMMessage(message);
        var conversation = this.findConversation(target.scene, target.id);
        var lastMessage = conversation.messageCache.getLastMessage();
        if (messages.includes(lastMessage)) {
            this.correctPosition(conversation);
            this.onUpdated();
        }
    };
    Conversations.prototype.correctPosition = function (conversation) {
        this.removeLocalConversation(conversation);
        this.insertOne(conversation);
    };
    Conversations.CONVERSATIONS_MAX_LENGTH = 200;
    return Conversations;
}());
exports.Conversations = Conversations;


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Conversation = void 0;
var GoEasy_1 = __webpack_require__(5);
var MessageCache_1 = __webpack_require__(141);
var IM_1 = __webpack_require__(7);
var utils_1 = __webpack_require__(6);
var Conversation = /** @class */ (function () {
    function Conversation(scene, targetId) {
        this.top = false;
        this.data = {};
        this.messageCache = new MessageCache_1["default"]();
        this.type = scene;
        if (scene === GoEasy_1.Scene.PRIVATE) {
            this.userId = targetId;
        }
        else if (scene === GoEasy_1.Scene.GROUP) {
            this.groupId = targetId;
        }
    }
    Conversation.prototype.toDto = function () {
        var conversationDto = new GoEasy_1.ConversationDTO();
        conversationDto.type = this.type;
        if (this.type === GoEasy_1.Scene.PRIVATE) {
            conversationDto.userId = this.userId;
        }
        else if (this.type === GoEasy_1.Scene.GROUP) {
            conversationDto.groupId = this.groupId;
        }
        conversationDto.lastMessage = this.messageCache.getLastMessage();
        conversationDto.unread = this.messageCache.unreadAmount();
        conversationDto.top = this.top;
        conversationDto.data = this.data;
        return conversationDto;
    };
    Conversation.prototype.initialData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.getData()];
                    case 1:
                        _a.data = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Conversation.prototype.getData = function () {
        var targetId;
        if (this.type === GoEasy_1.Scene.PRIVATE) {
            targetId = this.userId;
        }
        else if (this.type === GoEasy_1.Scene.GROUP) {
            targetId = this.groupId;
        }
        return IM_1.im['_dataCache'].loadData(targetId, this.type);
    };
    Conversation.prototype.getTargetId = function () {
        if (this.type === GoEasy_1.Scene.PRIVATE) {
            return this.userId;
        }
        else if (this.type === GoEasy_1.Scene.GROUP) {
            return this.groupId;
        }
    };
    Conversation.prototype.getScene = function () {
        return this.type;
    };
    Conversation.prototype.lastTimestamp = function () {
        var lastMessage = this.messageCache.getLastMessage();
        if (utils_1.calibrator.isDef(lastMessage)) {
            return lastMessage.timestamp;
        }
        return 0;
    };
    return Conversation;
}());
exports.Conversation = Conversation;


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
var Rocket_1 = __webpack_require__(2);
var Permission_1 = __webpack_require__(1);
var SocketTimeout_1 = __webpack_require__(3);
var IM_1 = __webpack_require__(7);
var GoEasy_1 = __webpack_require__(5);
var remote_abbr_message_builder_1 = __webpack_require__(32);
var HistoryQueryRequest_1 = __webpack_require__(142);
var RocketTypes_1 = __webpack_require__(4);
var callback_utils_1 = __webpack_require__(11);
var utils_1 = __webpack_require__(6);
var im_api_events_1 = __webpack_require__(9);
var MessageCache = /** @class */ (function () {
    function MessageCache() {
        this.builder = new remote_abbr_message_builder_1.RemoteAbbrMessageBuilder();
        this.messages = new Array();
        this.lastConsumedTime = 0; //用于查询unreadAmount
        this.readMessageMarkingTime = 0; // 用于mark异步请求(是否多次mark)
        this.allLoaded = false; //是否已加载服务端的所有消息，如果已全部加载，就不要再向服务端发送请求
    }
    /**
     * todo 该方法插入可能会出现消息顺序问题，conversation的查询，新消息的接收，history的查询，三者的异步操作可能导致消息列表顺序混乱,后面线上出现问题再优化
     * @param message
     * @param lastConsumedTime
     */
    MessageCache.prototype.initLastMessage = function (message, lastConsumedTime) {
        if (!this.existsMessage(message.messageId)) {
            this.messages.push(message);
        }
        if (lastConsumedTime > this.lastConsumedTime) {
            this.lastConsumedTime = lastConsumedTime;
        }
        this.sliceOverlengthMessages();
    };
    MessageCache.prototype.saveReceivedMessage = function (message) {
        if (!this.existsMessage(message.messageId)) {
            this.saveMessage(message);
            var scene = message.scene();
            if (scene === GoEasy_1.Scene.PRIVATE) {
                IM_1.im['_event'].notify(im_api_events_1.ImApiEvents.PRIVATE_MESSAGE_RECEIVED, message);
            }
            else if (scene === GoEasy_1.Scene.GROUP) {
                IM_1.im['_event'].notify(im_api_events_1.ImApiEvents.GROUP_MESSAGE_RECEIVED, message);
            }
            return true;
        }
        return false;
    };
    MessageCache.prototype.saveMessage = function (message) {
        this.messages.push(message);
        this.updateLastConsumedTime(message);
        this.sliceOverlengthMessages();
    };
    MessageCache.prototype.sliceOverlengthMessages = function () {
        //确保不超过最大消息，防止内存溢出，尤其是发送消息
        if (this.messages.length > MessageCache.CACHE_MAX_LENGTH) {
            this.messages = this.messages.slice(-MessageCache.CACHE_MAX_LENGTH);
            if (this.allLoaded === true) {
                this.allLoaded = false;
            }
        }
    };
    /**
     lastConsumedTime值的更新注意事项：
         1.history接收消息时：
             a.收到别人发的消息
                1.如果lastConsumedTime为0，将lastConsumedTime的值设为该消息时间戳-1
                2.如果lastConsumedTime不为0，就比较，如果新消息的时间戳更小，将lastConsumedTime的值设为该消息时间戳-1
             b.收到的消息是自己发送的，就将时间戳直接设为该消息的时间戳
             c.发送消息，将lastConsumedTime设为该消息的时间戳
             d.根据conversation的lastMessage初始化消息，拿到服务端的lastConsumedTime
                如果服务端传来的lastConsumedTime更大，以服务端的为准，否则不更新
         2.history查询消息
            a.不维护lastConsumedTime
         3.history查询unreadAmount
            a.如果lastConsumedTime为0，直接返回0
     * @param message
     */
    MessageCache.prototype.updateLastConsumedTime = function (message) {
        if (message.senderId === IM_1.IM.userId) {
            // 自己发送的消息
            this.lastConsumedTime = message.timestamp;
        }
        else {
            // 其他人发送的消息
            var newMessageTimeStamp = message.timestamp;
            if (this.lastConsumedTime === 0) { //收到第一条消息
                this.lastConsumedTime = newMessageTimeStamp - 1;
            }
            else if (this.lastConsumedTime > newMessageTimeStamp) { //收到第二条消息
                // 消息补发的顺序出现问题时(时间最大的未读消息先补发,时间小的未读消息后补发)
                this.lastConsumedTime = newMessageTimeStamp - 1;
            }
        }
    };
    MessageCache.prototype.unreadAmount = function () {
        var e_1, _a;
        var unreadAmount = 0;
        if (this.lastConsumedTime === 0) {
            return unreadAmount;
        }
        try {
            for (var _b = __values(this.messages), _c = _b.next(); !_c.done; _c = _b.next()) {
                var message = _c.value;
                // if (message.senderId !== IM.userId && message.timestamp > this.lastConsumedTime && !message.recalled) {
                if (message.senderId !== IM_1.IM.userId && message.timestamp > this.lastConsumedTime) {
                    unreadAmount += 1;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return unreadAmount;
    };
    MessageCache.prototype.getLastMessage = function () {
        return this.messages[this.messages.length - 1];
    };
    MessageCache.prototype.loadHistory = function (queryOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var limit, lastTimestamp, messages, newLimit, newLastTimestamp, remoteHistoryOptions, serverMessages, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        limit = queryOptions.limit;
                        lastTimestamp = queryOptions.lastTimestamp;
                        messages = this.loadLocalMessages(limit, lastTimestamp);
                        if (!(this.allLoaded === false && messages.length !== limit)) return [3 /*break*/, 4];
                        newLimit = limit - messages.length;
                        newLastTimestamp = messages[0] ? messages[0].timestamp : lastTimestamp;
                        remoteHistoryOptions = {
                            userId: queryOptions.userId,
                            groupId: queryOptions.groupId,
                            lastTimestamp: newLastTimestamp,
                            limit: newLimit
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.loadServerMessages(remoteHistoryOptions)];
                    case 2:
                        serverMessages = _a.sent();
                        messages = serverMessages.concat(messages);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        callback_utils_1.CallbackUtils.onFailed(queryOptions, error_1);
                        return [3 /*break*/, 4];
                    case 4:
                        callback_utils_1.CallbackUtils.onSuccess(queryOptions, {
                            code: 200,
                            content: messages
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    MessageCache.prototype.loadLocalMessages = function (limit, lastTimestamp) {
        var localMessages = [];
        var totalSize = this.messages.length;
        if (lastTimestamp) {
            if (totalSize > 0) {
                var minTimestamp = this.messages[0].timestamp;
                var maxTimestamp = this.messages[totalSize - 1].timestamp;
                // 大于等于最小，小于等于最大
                var between = lastTimestamp >= minTimestamp && lastTimestamp <= maxTimestamp;
                if (between) {
                    for (var i = totalSize - 1; i >= 0; i--) {
                        var message = this.messages[i];
                        if (message.timestamp < lastTimestamp) {
                            if (localMessages.length < limit) {
                                localMessages.unshift(message);
                            }
                            else {
                                break;
                            }
                        }
                    }
                }
            }
        }
        else {
            localMessages = this.messages.slice(-limit);
        }
        return localMessages;
    };
    MessageCache.prototype.loadServerMessages = function (queryOptions) {
        var _this = this;
        var request = new HistoryQueryRequest_1["default"](queryOptions);
        return new Promise(function (resolve, reject) {
            var rocket = new Rocket_1["default"]({
                name: RocketTypes_1.RocketTypes.imHistory,
                params: request,
                permission: Permission_1.Permission.READ,
                singleTimeout: SocketTimeout_1.SocketTimeout.commonQuerySingle,
                totalTimeout: SocketTimeout_1.SocketTimeout.commonQueryTotal,
                fail: function (ack) {
                    reject({
                        code: ack.code || 408,
                        content: ack.content || 'Failed to query message'
                    });
                },
                success: function (result) {
                    if (result.code === 200) {
                        var serverMessages = _this.convertServerMessages(result, queryOptions);
                        if (_this.messages.length < MessageCache.CACHE_MAX_LENGTH) {
                            _this.cacheServerMessages(queryOptions, serverMessages);
                            if (serverMessages.length < queryOptions.limit) {
                                _this.allLoaded = true;
                            }
                        }
                        resolve(serverMessages);
                    }
                    else {
                        reject(result);
                    }
                }
            });
            IM_1.im['_goEasySocket'].emit(rocket);
        });
    };
    /**
     * 缓存条件：
     *  1.options.lastTimestamp为空
     *  2.本地的第一条消息的时间等于传入的options.lastTimestamp
     * 如果本地已经有消息，但是options.lastTimestamp不等于第一条消息，就丢掉
     */
    MessageCache.prototype.cacheServerMessages = function (options, serverMessages) {
        var firstMessage = this.messages[0];
        var totalSize = this.messages.length;
        if (!options.lastTimestamp || (totalSize > 0 && (firstMessage.timestamp === options.lastTimestamp))) {
            this.messages = serverMessages.concat(this.messages);
        }
    };
    MessageCache.prototype.findMessageById = function (messageId) {
        return this.messages.find(function (message) { return messageId === message.messageId; });
    };
    MessageCache.prototype.findMessagesByIds = function (messageIds) {
        var _this = this;
        var messages = new Array();
        messageIds.forEach(function (messageId) {
            var message = _this.findMessageById(messageId);
            if (utils_1.calibrator.isDef(message)) {
                messages.push(message);
            }
        });
        return messages;
    };
    MessageCache.prototype.existsMessage = function (messageId) {
        return this.findMessageIndexById(messageId) > -1;
    };
    MessageCache.prototype.findMessageIndexById = function (messageId) {
        return this.messages.findIndex(function (message) { return messageId === message.messageId; });
    };
    MessageCache.prototype.deleteMessage = function (message) {
        var index = this.findMessageIndexById(message.messageId); //服务端按照指令成功删除最关键，本地与服务端不一致，可以忽略
        if (index >= 0) {
            this.messages.splice(index, 1);
        }
    };
    MessageCache.prototype.isEmpty = function () {
        return this.messages.length === 0;
    };
    MessageCache.prototype.deleteMessages = function (messages) {
        var _this = this;
        messages.forEach(function (message) {
            _this.deleteMessage(message);
        });
    };
    MessageCache.prototype.convertServerMessages = function (res, options) {
        var _this = this;
        var messages = [];
        res.content.map(function (remoteAbbrMessage) {
            if (options.userId) {
                remoteAbbrMessage.t = GoEasy_1.Scene.PRIVATE;
                remoteAbbrMessage.r = remoteAbbrMessage.s === IM_1.IM.userId ? options.userId : IM_1.IM.userId;
            }
            else {
                remoteAbbrMessage.t = GoEasy_1.Scene.GROUP;
                remoteAbbrMessage.r = options.groupId;
            }
            var localMessage = _this.builder.build(remoteAbbrMessage);
            //todo:是否不应该在这里
            if (!_this.existsMessage(localMessage.messageId)) {
                messages.push(localMessage);
            }
        });
        return messages;
    };
    MessageCache.CACHE_MAX_LENGTH = 200;
    return MessageCache;
}());
exports["default"] = MessageCache;


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var HistoryQueryRequest = /** @class */ (function () {
    function HistoryQueryRequest(options) {
        this.friendId = options.userId;
        this.groupId = options.groupId;
        this.lastTimestamp = options.lastTimestamp;
        this.limit = options.limit;
    }
    return HistoryQueryRequest;
}());
exports["default"] = HistoryQueryRequest;


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var IM_1 = __webpack_require__(7);
var Rocket_1 = __webpack_require__(2);
var Permission_1 = __webpack_require__(1);
var SocketTimeout_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(0);
var GoEasy_1 = __webpack_require__(5);
var ReadMessageMarkRequest_1 = __webpack_require__(144);
var RocketTypes_1 = __webpack_require__(4);
var im_api_events_1 = __webpack_require__(9);
var callback_utils_1 = __webpack_require__(11);
var ReadMessageMarker = /** @class */ (function () {
    function ReadMessageMarker() {
    }
    ReadMessageMarker.prototype.mark = function (options, conversation, conversations) {
        var _this = this;
        var messageCache = conversation.messageCache;
        if (messageCache.isEmpty()) {
            callback_utils_1.CallbackUtils.onSuccess(options);
            return;
        }
        var readMessageMarkingTime = messageCache.getLastMessage().timestamp;
        messageCache.readMessageMarkingTime = readMessageMarkingTime;
        if (readMessageMarkingTime > messageCache.lastConsumedTime) {
            this.markServerMessage(conversation).then(function (res) {
                _this.markUnreadMessage(readMessageMarkingTime, conversation);
                callback_utils_1.CallbackUtils.onSuccess(options);
                if (readMessageMarkingTime === conversation.lastTimestamp()) {
                    conversations.onUpdated();
                }
            })["catch"](function (error) {
                callback_utils_1.CallbackUtils.onFailed(options, error);
            });
        }
        else {
            callback_utils_1.CallbackUtils.onSuccess(options);
        }
    };
    ReadMessageMarker.prototype.markByRemoteEvent = function (conversation, remoteEvent) {
        var messageCache = conversation.messageCache;
        var markingTimeStamp = remoteEvent.time;
        if (markingTimeStamp > messageCache.lastConsumedTime) {
            if (remoteEvent.markerId === IM_1.IM.userId) {
                messageCache.readMessageMarkingTime = markingTimeStamp;
                this.markUnreadMessage(markingTimeStamp, conversation);
            }
            else {
                this.markMySentMessageAsRead(conversation, remoteEvent);
            }
        }
        if (markingTimeStamp === messageCache.lastConsumedTime) {
            if (remoteEvent.markerId !== IM_1.IM.userId) {
                this.markMySentMessageAsRead(conversation, remoteEvent);
            }
        }
    };
    ReadMessageMarker.prototype.markUnreadMessage = function (readMessageMarkingTime, conversation) {
        var messageCache = conversation.messageCache;
        if (readMessageMarkingTime === messageCache.readMessageMarkingTime) {
            messageCache.lastConsumedTime = readMessageMarkingTime;
            if (conversation.type === GoEasy_1.Scene.PRIVATE) {
                messageCache.messages.forEach(function (message) {
                    if (message.senderId !== IM_1.IM.userId && message.timestamp <= readMessageMarkingTime) {
                        if (message.read) {
                            return;
                        }
                        else {
                            message.read = true;
                        }
                    }
                });
            }
        }
    };
    ReadMessageMarker.prototype.markMySentMessageAsRead = function (conversation, remoteEvent) {
        if (remoteEvent.scene === GoEasy_1.Scene.PRIVATE) {
            var readMessages_1 = new Array();
            conversation.messageCache.messages.forEach(function (message) {
                if (message.senderId === IM_1.IM.userId && message.timestamp <= remoteEvent.time) {
                    if (message.read) {
                        return;
                    }
                    else {
                        message.read = true;
                        readMessages_1.push(message);
                    }
                }
            });
            if (readMessages_1.length > 0) {
                IM_1.im['_event'].notify(im_api_events_1.ImApiEvents.PRIVATE_MESSAGE_READ, readMessages_1);
            }
        }
    };
    ReadMessageMarker.prototype.markServerMessage = function (conversation) {
        var messageCache = conversation.messageCache;
        var lastMessage = messageCache.getLastMessage();
        var request = new ReadMessageMarkRequest_1.ReadMessageMarkRequest();
        request.lastTimestamp = lastMessage.timestamp;
        request.lastConsumedTimestamp = messageCache.lastConsumedTime;
        var name = RocketTypes_1.RocketTypes.markGroupMessageAsRead;
        if (conversation.type === GoEasy_1.Scene.PRIVATE) {
            request.friendId = conversation.userId;
            name = RocketTypes_1.RocketTypes.markPrivateMessageAsRead;
        }
        else if (conversation.type === GoEasy_1.Scene.GROUP) {
            request.groupId = conversation.groupId;
        }
        return new Promise(function (resolve, reject) {
            var rocket = new Rocket_1["default"]({
                name: name,
                params: request,
                permission: Permission_1.Permission.WRITE,
                singleTimeout: SocketTimeout_1.SocketTimeout.commonRequestSingle,
                totalTimeout: SocketTimeout_1.SocketTimeout.commonRequestTotal,
                success: function (res) {
                    if (res.code === 200) {
                        resolve(res);
                    }
                    else {
                        reject(res);
                    }
                },
                fail: function (err) {
                    reject(err);
                }
            });
            IM_1.im._goEasySocket.emit(rocket);
        });
    };
    ReadMessageMarker.prototype.validate = function (scene, options) {
        callback_utils_1.CallbackUtils.validateCallbackOptions(options);
        var key = scene === GoEasy_1.Scene.PRIVATE ? 'userId' : 'groupId';
        var targetId = options[key];
        if (utils_1.calibrator.isUndef(targetId) || utils_1.calibrator.isEmpty(targetId) || !utils_1.calibrator.isStringOrNumber(targetId)) {
            throw {
                code: 400,
                content: key + " requires string or number"
            };
        }
    };
    return ReadMessageMarker;
}());
exports["default"] = ReadMessageMarker;


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.ReadMessageMarkRequest = void 0;
var ReadMessageMarkRequest = /** @class */ (function () {
    function ReadMessageMarkRequest() {
    }
    return ReadMessageMarkRequest;
}());
exports.ReadMessageMarkRequest = ReadMessageMarkRequest;


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var IM_1 = __webpack_require__(7);
var AbstractMessage_1 = __webpack_require__(22);
var utils_1 = __webpack_require__(0);
var GoEasy_1 = __webpack_require__(5);
var DeleteMessageRequest_1 = __webpack_require__(146);
var Rocket_1 = __webpack_require__(2);
var Permission_1 = __webpack_require__(1);
var SocketTimeout_1 = __webpack_require__(3);
var RocketTypes_1 = __webpack_require__(4);
var callback_utils_1 = __webpack_require__(11);
var im_api_events_1 = __webpack_require__(9);
var goeasy_event_center_1 = __webpack_require__(13);
var internal_events_1 = __webpack_require__(21);
var Target_1 = __webpack_require__(24);
var MessageDeleter = /** @class */ (function () {
    function MessageDeleter() {
    }
    MessageDeleter.prototype["delete"] = function (conversation, options) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.deleteServerMessages(options)];
                    case 1:
                        result = _a.sent();
                        this.deleteLocalMessages(conversation, options.messages);
                        callback_utils_1.CallbackUtils.onSuccess(options);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        callback_utils_1.CallbackUtils.onFailed(options, error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MessageDeleter.prototype.deleteServerMessages = function (options) {
        var request = new DeleteMessageRequest_1.DeleteMessageRequest(options);
        if (request.times.length < 0) {
            return Promise.resolve();
        }
        return new Promise(function (resolve, reject) {
            var rocket = new Rocket_1["default"]({
                name: RocketTypes_1.RocketTypes.IM_DELETE_MESSAGE,
                params: request,
                permission: Permission_1.Permission.WRITE,
                singleTimeout: SocketTimeout_1.SocketTimeout.commonQuerySingle,
                totalTimeout: SocketTimeout_1.SocketTimeout.commonQueryTotal,
                success: function (res) {
                    if (res.code === 200) {
                        resolve(res);
                    }
                    else {
                        reject(res);
                    }
                },
                fail: function (err) {
                    reject(err);
                }
            });
            IM_1.im['_goEasySocket'].emit(rocket);
        });
    };
    MessageDeleter.prototype.deleteMessageByRemoteEvent = function (conversation, event) {
        var messages = conversation.messageCache.findMessagesByIds(event.messageIds);
        if (messages.length > 0) {
            this.deleteLocalMessages(conversation, messages);
            IM_1.im['_event'].notify(im_api_events_1.ImApiEvents.MESSAGE_DELETED, messages);
        }
    };
    MessageDeleter.prototype.deleteLocalMessages = function (conversation, messages) {
        conversation.messageCache.deleteMessages(messages);
        goeasy_event_center_1.GoEasyEventCenter.fire(internal_events_1.IM_INTERNAL_EVENTS.MESSAGE_DELETED, messages); //要确保谦虚逻辑保证数组不为空
    };
    MessageDeleter.prototype.validate = function (options) {
        callback_utils_1.CallbackUtils.validateCallbackOptions(options);
        if (!utils_1.calibrator.isArray(options.messages) || utils_1.calibrator.isEmpty(options.messages)) {
            throw {
                code: 400,
                content: "messages requires non empty array"
            };
        }
        var messages = options.messages;
        if (messages.length > 50) {
            throw {
                code: 400,
                content: "a maximum of 50 messages can be deleted at a time"
            };
        }
        var firstTarget = Target_1.Target.byIMMessage(messages[0]);
        for (var i = 0; i < messages.length; i++) {
            var message = messages[i];
            if (!(message instanceof AbstractMessage_1.AbstractMessage)) {
                throw {
                    code: 400,
                    content: "message[" + i + "] is not a correct message"
                };
            }
            if (message.status === GoEasy_1.MessageStatus.SENDING) {
                throw {
                    code: 400,
                    content: "message[" + i + "] is '" + message.status + "' and cannot be deleted"
                };
            }
            if (i > 0) {
                var target = Target_1.Target.byIMMessage(message);
                if (target.scene !== firstTarget.scene || target.id !== firstTarget.id) {
                    throw {
                        code: 400,
                        content: "each message must be from the same friend or group"
                    };
                }
            }
        }
    };
    return MessageDeleter;
}());
exports["default"] = MessageDeleter;


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.DeleteMessageRequest = void 0;
var GoEasy_1 = __webpack_require__(5);
var Target_1 = __webpack_require__(24);
var DeleteMessageRequest = /** @class */ (function () {
    function DeleteMessageRequest(options) {
        var _this = this;
        this.times = new Array();
        var messages = options.messages;
        var message = messages[0];
        var target = Target_1.Target.byIMMessage(message);
        this.scene = target.scene;
        this.targetId = target.id;
        messages.forEach(function (message) {
            if (message.status === GoEasy_1.MessageStatus.SUCCESS) { //未成功的消息，不要发到服务端
                _this.times.push(message.timestamp);
            }
        });
        // 升序排列
        this.times.sort(function (x, y) {
            return (x < y) ? -1 : ((x == y) ? 0 : 1);
        });
    }
    return DeleteMessageRequest;
}());
exports.DeleteMessageRequest = DeleteMessageRequest;


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var GoEasy_1 = __webpack_require__(5);
var callback_utils_1 = __webpack_require__(11);
var utils_1 = __webpack_require__(6);
var RocketTypes_1 = __webpack_require__(4);
var Rocket_1 = __webpack_require__(2);
var Permission_1 = __webpack_require__(1);
var SocketTimeout_1 = __webpack_require__(3);
var IM_1 = __webpack_require__(7);
var RemoveConversationRequest_1 = __webpack_require__(148);
var ConversationRemover = /** @class */ (function () {
    function ConversationRemover(conversations) {
        this.conversations = conversations;
    }
    ConversationRemover.prototype.remove = function (target, options) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.removeServerConversation(target.scene, target.id)];
                    case 1:
                        result = _a.sent();
                        this.removeLocalConversation(target);
                        callback_utils_1.CallbackUtils.onSuccess(options);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        callback_utils_1.CallbackUtils.onFailed(options, err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConversationRemover.prototype.removeLocalConversation = function (target) {
        var scene = target.scene;
        var targetId = target.id;
        var conversation = this.conversations.findConversation(scene, targetId);
        if (utils_1.calibrator.isDef(conversation)) {
            this.conversations.removeLocalConversation(conversation);
            this.conversations.onUpdated();
        }
    };
    ConversationRemover.prototype.removeServerConversation = function (scene, targetId) {
        var request = new RemoveConversationRequest_1["default"](scene, targetId);
        return new Promise(function (resolve, reject) {
            var rocket = new Rocket_1["default"]({
                name: RocketTypes_1.RocketTypes.removeConversation,
                params: request,
                permission: Permission_1.Permission.WRITE,
                singleTimeout: SocketTimeout_1.SocketTimeout.commonRequestSingle,
                totalTimeout: SocketTimeout_1.SocketTimeout.commonRequestTotal,
                success: function (res) {
                    if (res.code == 200) {
                        resolve(res);
                    }
                    else {
                        reject(res);
                    }
                },
                fail: function (err) {
                    reject(err);
                }
            });
            IM_1.im['_goEasySocket'].emit(rocket);
        });
    };
    ConversationRemover.prototype.validateOptions = function (scene, options) {
        if (utils_1.calibrator.isUndef(options)) {
            throw ({
                code: 400,
                content: "Failed to remove conversation: bad parameters"
            });
        }
        if (!utils_1.calibrator.isObject(options)) {
            callback_utils_1.CallbackUtils.onFailed(options, {
                code: 400,
                content: "Failed to remove conversation: bad parameters"
            });
            return false;
        }
        var targetId;
        var errorMessage;
        if (scene === GoEasy_1.Scene.PRIVATE) {
            var removeOptions = options;
            targetId = removeOptions.userId;
            errorMessage = "Failed to remove conversation: userId requires string or number";
        }
        else {
            var removeOptions = options;
            targetId = removeOptions.groupId;
            errorMessage = "Failed to remove conversation: groupId requires string or number";
        }
        if (utils_1.calibrator.isUndef(targetId) || utils_1.calibrator.isEmpty(targetId) || !utils_1.calibrator.isStringOrNumber(targetId)) {
            callback_utils_1.CallbackUtils.onFailed(options, {
                code: 400,
                content: errorMessage
            });
            return false;
        }
        var conversation = this.conversations.findConversation(scene, targetId);
        if (utils_1.calibrator.isUndef(conversation)) {
            callback_utils_1.CallbackUtils.onFailed(options, {
                code: 400,
                content: 'Failed to remove conversation: conversation doesn not exists'
            });
            return false;
        }
        return true;
    };
    return ConversationRemover;
}());
exports["default"] = ConversationRemover;


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var RemoveConversationRequest = /** @class */ (function () {
    function RemoveConversationRequest(type, targetId) {
        this.type = type;
        this.targetId = targetId;
    }
    return RemoveConversationRequest;
}());
exports["default"] = RemoveConversationRequest;


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var GoEasy_1 = __webpack_require__(5);
var callback_utils_1 = __webpack_require__(11);
var utils_1 = __webpack_require__(6);
var RocketTypes_1 = __webpack_require__(4);
var Rocket_1 = __webpack_require__(2);
var Permission_1 = __webpack_require__(1);
var SocketTimeout_1 = __webpack_require__(3);
var IM_1 = __webpack_require__(7);
var TopConversationRequest_1 = __webpack_require__(150);
var ConversationTopper = /** @class */ (function () {
    function ConversationTopper(conversations) {
        this.conversations = conversations;
    }
    ConversationTopper.prototype.top = function (target, top, options) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.topServerConversation(target, top)];
                    case 1:
                        result = _a.sent();
                        this.topLocalConversation(target, top);
                        callback_utils_1.CallbackUtils.onSuccess(options);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        callback_utils_1.CallbackUtils.onFailed(options, err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConversationTopper.prototype.topLocalConversation = function (target, top) {
        var scene = target.scene;
        var targetId = target.id;
        var conversation = this.conversations.findConversation(scene, targetId);
        if (utils_1.calibrator.isDef(conversation)) {
            this.conversations.topLocalConversation(conversation, top);
        }
    };
    ConversationTopper.prototype.topServerConversation = function (target, top) {
        var request = new TopConversationRequest_1["default"](target.scene, top, target.id);
        return new Promise(function (resolve, reject) {
            var rocket = new Rocket_1["default"]({
                name: RocketTypes_1.RocketTypes.topConversation,
                params: request,
                permission: Permission_1.Permission.WRITE,
                singleTimeout: SocketTimeout_1.SocketTimeout.commonRequestSingle,
                totalTimeout: SocketTimeout_1.SocketTimeout.commonRequestTotal,
                success: function (res) {
                    if (res.code === 200) {
                        resolve(res);
                    }
                    else {
                        reject(res);
                    }
                },
                fail: function (err) {
                    reject(err);
                }
            });
            IM_1.im['_goEasySocket'].emit(rocket);
        });
    };
    ConversationTopper.prototype.validateOptions = function (scene, options) {
        if (utils_1.calibrator.isUndef(options)) {
            throw ({
                code: 400,
                content: "Failed to top conversation: bad parameters"
            });
        }
        if (!utils_1.calibrator.isObject(options)) {
            callback_utils_1.CallbackUtils.onFailed(options, {
                code: 400,
                content: "Failed to top conversation: bad parameters"
            });
            return false;
        }
        var top;
        var targetId;
        var errorMessage;
        if (scene === GoEasy_1.Scene.PRIVATE) {
            var topOptions = options;
            top = topOptions.top;
            targetId = topOptions.userId;
            errorMessage = "Failed to top conversation: userId requires string or number";
        }
        else {
            var topOptions = options;
            top = topOptions.top;
            targetId = topOptions.groupId;
            errorMessage = "Failed to top conversation: groupId requires string or number";
        }
        if (utils_1.calibrator.isUndef(targetId) || utils_1.calibrator.isEmpty(targetId) || !utils_1.calibrator.isStringOrNumber(targetId)) {
            callback_utils_1.CallbackUtils.onFailed(options, {
                code: 400,
                content: errorMessage
            });
            return false;
        }
        if (!utils_1.calibrator.isBoolean(top)) {
            callback_utils_1.CallbackUtils.onFailed(options, {
                code: 400,
                content: "Failed to top conversation: top requires boolean"
            });
            return false;
        }
        var conversation = this.conversations.findConversation(scene, targetId);
        if (utils_1.calibrator.isUndef(conversation)) {
            callback_utils_1.CallbackUtils.onFailed(options, {
                code: 400,
                content: 'Failed to top conversation: conversation does not exists'
            });
            return false;
        }
        else {
            if (conversation.top === top) {
                callback_utils_1.CallbackUtils.onFailed(options, {
                    code: 400,
                    content: 'Failed to top conversation: no change'
                });
                return false;
            }
        }
        return true;
    };
    return ConversationTopper;
}());
exports["default"] = ConversationTopper;


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var TopConversationRequest = /** @class */ (function () {
    function TopConversationRequest(type, top, targetId) {
        this.type = type;
        this.top = top;
        this.targetId = targetId;
    }
    return TopConversationRequest;
}());
exports["default"] = TopConversationRequest;


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.History = void 0;
var utils_1 = __webpack_require__(0);
var Rocket_1 = __webpack_require__(2);
var Permission_1 = __webpack_require__(1);
var SocketTimeout_1 = __webpack_require__(3);
var RocketTypes_1 = __webpack_require__(4);
var History = /** @class */ (function () {
    function History(pubSub) {
        this.pubSub = pubSub;
    }
    History.prototype.get = function (options) {
        if (!utils_1.calibrator.isFunction(options.onSuccess)) {
            options.onSuccess = utils_1.noop;
        }
        if (!utils_1.calibrator.isFunction(options.onFailed)) {
            options.onFailed = utils_1.noop;
        }
        if (!utils_1.calibrator.isDef(options.channel)) {
            options.onFailed({
                code: 400,
                content: "channel is required"
            });
            return;
        }
        if (utils_1.calibrator.isNumber(options.channel)) {
            options.channel = options.channel.toString();
        }
        var ackCallback = function (ack) {
            options.onSuccess({
                code: ack.resultCode || ack.code || 200,
                content: ack.content
            });
        };
        var failCallback = function (ack) {
            options.onFailed({
                code: ack.resultCode || ack.code,
                content: ack.content
            });
        };
        var rocket = new Rocket_1["default"]({
            name: RocketTypes_1.RocketTypes.historyMessages,
            permission: Permission_1.Permission.READ,
            params: options,
            singleTimeout: SocketTimeout_1.SocketTimeout.commonQuerySingle,
            totalTimeout: SocketTimeout_1.SocketTimeout.commonQueryTotal,
            success: ackCallback,
            fail: failCallback
        });
        this.pubSub.goEasySocket.emit(rocket);
    };
    return History;
}());
exports.History = History;


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.HereNow = void 0;
var utils_1 = __webpack_require__(0);
var Rocket_1 = __webpack_require__(2);
var Permission_1 = __webpack_require__(1);
var SocketTimeout_1 = __webpack_require__(3);
var RocketTypes_1 = __webpack_require__(4);
var HereNow = /** @class */ (function () {
    function HereNow(pubSub) {
        this.pubSub = pubSub;
    }
    HereNow.prototype.byChannel = function (options) {
        var params = {
            channels: [],
            includeUsers: false,
            distinct: false
        };
        if (!utils_1.calibrator.isFunction(options.onSuccess)) {
            options.onSuccess = utils_1.noop;
        }
        if (!utils_1.calibrator.isFunction(options.onFailed)) {
            options.onFailed = utils_1.noop;
        }
        if (Array.isArray(options.channels)) {
            for (var i = 0; i < options.channels.length; i++) {
                var channel = options.channels[i];
                if (utils_1.calibrator.isNumber(channel)) {
                    channel = channel.toString();
                }
                params.channels.push(channel);
            }
        }
        if (params.channels.length === 0) {
            options.onFailed({
                code: 408,
                content: 'channels is required.'
            });
            return;
        }
        if (options.includeUsers == true) {
            params.includeUsers = true;
        }
        if (options.distinct == true) {
            params.distinct = true;
        }
        var ackCallback = function (ack) {
            var content = ack.content;
            var channels = content.channels;
            for (var channel in channels) {
                if (channels.hasOwnProperty(channel)) {
                    var channelVal = channels[channel];
                    if (channelVal.users) {
                        channelVal.users = channelVal.users.map(function (user) {
                            user.data = user.data ? JSON.parse(user.data) : {};
                            return user;
                        });
                    }
                }
            }
            options.onSuccess({
                code: ack.resultCode || ack.code || 200,
                content: content
            });
        };
        var failCallback = function (ack) {
            options.onFailed({
                code: ack.resultCode || ack.code || 200,
                content: ack.content
            });
        };
        var rocket = new Rocket_1["default"]({
            name: RocketTypes_1.RocketTypes.hereNow,
            permission: Permission_1.Permission.READ,
            params: params,
            singleTimeout: SocketTimeout_1.SocketTimeout.commonQuerySingle,
            totalTimeout: SocketTimeout_1.SocketTimeout.commonQueryTotal,
            success: ackCallback,
            fail: failCallback
        });
        this.pubSub.goEasySocket.emit(rocket);
    };
    HereNow.prototype.byUserId = function (options) {
        var params = {
            userIds: [],
            distinct: true
        };
        if (!utils_1.calibrator.isFunction(options.onSuccess)) {
            options.onSuccess = utils_1.noop;
        }
        if (!utils_1.calibrator.isFunction(options.onFailed)) {
            options.onFailed = utils_1.noop;
        }
        if (utils_1.calibrator.isDef(options.userIds)) {
            params.userIds = options.userIds;
        }
        if (options.distinct == false) {
            params.distinct = false;
        }
        if (params.userIds.length === 0) {
            options.onFailed({ code: 400, content: "userIds is required" });
        }
        else if (params.userIds.length > 500) {
            options.onFailed({ code: 400, content: "userIds is over max length 500" });
        }
        else {
            var ackCallback = function (ack) {
                var content = ack.content;
                content = content.map(function (user) {
                    var newUser = {
                        id: user.userId,
                        data: user.userData ? JSON.parse(user.userData) : {}
                    };
                    return newUser;
                });
                options.onSuccess({
                    code: ack.resultCode || ack.code || 200,
                    content: content
                });
            };
            var failCallback = function (ack) {
                options.onFailed({
                    code: ack.resultCode || ack.code || 200,
                    content: ack.content
                });
            };
            var rocket = new Rocket_1["default"]({
                name: RocketTypes_1.RocketTypes.hereNowByUserIds,
                permission: Permission_1.Permission.READ,
                params: params,
                singleTimeout: SocketTimeout_1.SocketTimeout.commonQuerySingle,
                totalTimeout: SocketTimeout_1.SocketTimeout.commonQueryTotal,
                success: ackCallback,
                fail: failCallback
            });
            this.pubSub.goEasySocket.emit(rocket);
        }
    };
    return HereNow;
}());
exports.HereNow = HereNow;


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var utils_1 = __webpack_require__(0);
var Rocket_1 = __webpack_require__(2);
var Permission_1 = __webpack_require__(1);
var SocketTimeout_1 = __webpack_require__(3);
var RocketTypes_1 = __webpack_require__(4);
var Publisher = /** @class */ (function () {
    function Publisher(pubSub) {
        this.pubSub = pubSub;
    }
    Publisher.prototype.publish = function (options) {
        if (!utils_1.calibrator.isFunction(options.onFailed)) {
            options.onFailed = utils_1.noop;
        }
        if (!utils_1.calibrator.isFunction(options.onSuccess)) {
            options.onSuccess = utils_1.noop;
        }
        if (utils_1.calibrator.isEmpty(options.channel)) {
            throw ({
                code: 400,
                content: 'channel is required.'
            });
        }
        if (utils_1.calibrator.isNumber(options.channel)) {
            options.channel = options.channel.toString();
        }
        if (utils_1.calibrator.isEmpty(options.message)) {
            throw ({
                code: 400,
                content: 'message is required.'
            });
        }
        if (utils_1.calibrator.isNumber(options.message)) {
            options.message = options.message.toString();
        }
        if (!utils_1.calibrator.isString(options.message)) {
            throw ({
                code: 400,
                content: 'TypeError: message requires string.'
            });
        }
        else if (options.message.length > 2500) {
            throw ({
                code: 400,
                content: 'Message over max length 2500.'
            });
        }
        if (utils_1.calibrator.isObject(options.notification)) {
            if (utils_1.calibrator.isEmpty(options.notification.title)) {
                throw ({
                    code: 400,
                    content: 'notification.title is required.'
                });
            }
            else if (!utils_1.calibrator.isString(options.notification.title)) {
                throw ({
                    code: 400,
                    content: 'TypeError: notification.title requires string.'
                });
            }
            else if (options.notification.title.length > 32) {
                throw ({
                    code: 400,
                    content: 'TypeError: notification.title over max length 32.'
                });
            }
            if (utils_1.calibrator.isEmpty(options.notification.body)) {
                throw ({
                    code: 400,
                    content: 'notification.body is required.'
                });
            }
            else if (!utils_1.calibrator.isString(options.notification.body)) {
                throw ({
                    code: 400,
                    content: 'TypeError: notification.body must be string.'
                });
            }
            else if (options.notification.body.length > 50) {
                throw ({
                    code: 400,
                    content: 'notification.body over max length 50.'
                });
            }
        }
        else if (utils_1.calibrator.isPrimitive(options.notification)) {
            throw ({
                code: 400,
                content: 'TypeError: notification requires an object.'
            });
        }
        var params = {
            channel: options.channel,
            content: options.message,
            nt: options.notification,
            at: options.accessToken,
            guid: utils_1.UUID.get()
        };
        var success = function (ack) {
            options.onSuccess({
                code: 200,
                content: 'ok'
            });
        };
        var fail = function (ack) {
            options.onFailed({
                code: ack.resultCode,
                content: ack.content
            });
        };
        var rocket = new Rocket_1["default"]({
            name: RocketTypes_1.RocketTypes.publish,
            params: params,
            unique: true,
            singleTimeout: SocketTimeout_1.SocketTimeout.commonRequestSingle,
            totalTimeout: SocketTimeout_1.SocketTimeout.commonRequestTotal,
            permission: Permission_1.Permission.WRITE,
            success: success,
            fail: fail
        });
        this.pubSub.goEasySocket.emit(rocket);
    };
    return Publisher;
}());
exports["default"] = Publisher;


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.Subscriber = void 0;
var utils_1 = __webpack_require__(0);
var Rocket_1 = __webpack_require__(2);
var Permission_1 = __webpack_require__(1);
var Subscription_1 = __webpack_require__(155);
var SocketTimeout_1 = __webpack_require__(3);
var NetworkStatus_1 = __webpack_require__(12);
var goeasy_event_center_1 = __webpack_require__(13);
var internal_events_1 = __webpack_require__(63);
var RocketTypes_1 = __webpack_require__(4);
var RemoteEvents_1 = __webpack_require__(16);
var Subscriber = /** @class */ (function () {
    function Subscriber(pubSub) {
        this.subscriptions = [];
        this.pubSub = pubSub;
    }
    Subscriber.prototype.initialGoEasySocket = function () {
        var goEasySocket = this.pubSub.goEasySocket;
        goEasySocket.addMessageObserver(RemoteEvents_1.RemoteEvents.message, this.onNewMessage.bind(this));
        goEasySocket.addExpiredReconnectedObserver(this.onExpiredReconnected.bind(this));
        goEasySocket.addConnectedObserver(this.onReconnected.bind(this));
    };
    Subscriber.prototype.resubscribe = function () {
        var arr = this.subscriptions.slice(0);
        this.subscriptions = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].channels.length != 0) {
                this.subscribe(arr[i]);
            }
        }
    };
    Subscriber.prototype.onExpiredReconnected = function () {
        this.resubscribe();
    };
    Subscriber.prototype.onReconnected = function () {
        if (!this.pubSub.neverConnect && this.pubSub.goEasySocket.status != NetworkStatus_1.NetworkStatus.RECONNECTED) {
            //手动重连成功，自动重新订阅
            this.resubscribe();
        }
    };
    //收到消息分发
    Subscriber.prototype.onNewMessage = function (message) {
        //todo 临时处理方法，本应该在不同的消息中判断
        if (message.n.indexOf('_presence') > -1)
            return;
        console.log('Subscriber -> onNewMessage: ', message);
        //收到消息
        if (message.a) {
            this.pubSub.goEasySocket.sendAck('ack', { "publishGuid": message.i });
        }
        var neMessage = {
            time: message.t,
            channel: message.n,
            content: message.c
        };
        goeasy_event_center_1.GoEasyEventCenter.fire(internal_events_1.PUBSUB_INTERNAL_EVENTS.MESSAGE_RECEIVED, message);
        var subscription = this.findSubscriptionByChannel(neMessage.channel);
        subscription.onMessage(neMessage);
    };
    Subscriber.prototype.formatOptions = function (options) {
        var hasChannel = !utils_1.calibrator.isEmpty(options.channel);
        var hasChannels = !utils_1.calibrator.isEmpty(options.channels);
        this.formatCallback(options);
        if (!utils_1.calibrator.isFunction(options.onMessage)) {
            options.onMessage = utils_1.noop;
        }
        if (!hasChannel && !hasChannels) {
            options.onFailed({
                code: 400,
                content: 'channel is required'
            });
            return false;
        }
        if (hasChannel && hasChannels) {
            options.onFailed({
                code: 400,
                content: 'subscribe to either channel or channels, not both'
            });
            return;
        }
        if (hasChannel) {
            if (utils_1.calibrator.isNumber(options.channel)) {
                options.channel = options.channel.toString();
            }
            options.channels = [options.channel];
        }
        if (hasChannels) {
            if (!Array.isArray(options.channels) || options.channels.length == 0) {
                options.onFailed({
                    code: 400,
                    content: 'channels must be an array'
                });
                return;
            }
            if (options.channels.length > 500) {
                options.onFailed({
                    code: 400,
                    content: 'channels over max length:500'
                });
                return false;
            }
            for (var i = 0, len = options.channels.length; i < len; i++) {
                if (utils_1.calibrator.isNumber(options.channels[i])) {
                    options.channels[i] = options.channels[i].toString();
                }
                if (utils_1.calibrator.isEmpty(options.channels[i])) {
                    options.onFailed({
                        code: 400,
                        content: 'Channels array contains empty channel'
                    });
                    return false;
                }
            }
        }
        return true;
    };
    Subscriber.prototype.formatCallback = function (options) {
        if (!utils_1.calibrator.isFunction(options.onSuccess)) {
            options.onSuccess = utils_1.noop;
        }
        if (!utils_1.calibrator.isFunction(options.onFailed)) {
            options.onFailed = utils_1.noop;
        }
    };
    //订阅
    Subscriber.prototype.subscribe = function (options) {
        var _this = this;
        if (!this.formatOptions(options))
            return;
        var success = function () {
            var subscription = new Subscription_1.Subscription({
                channels: options.channels,
                accessToken: options.accessToken,
                onSuccess: options.onSuccess,
                onFailed: options.onFailed,
                onMessage: options.onMessage
            });
            _this.subscriptions.push(subscription);
            options.onSuccess({
                code: 200,
                content: 'ok'
            });
        };
        var fail = function (ack) {
            options.onFailed({
                code: ack.resultCode,
                content: ack.content
            });
        };
        var rocket = new Rocket_1["default"]({
            name: RocketTypes_1.RocketTypes.subscribe,
            permission: Permission_1.Permission.READ,
            singleTimeout: SocketTimeout_1.SocketTimeout.commonInfiniteSingle,
            totalTimeout: SocketTimeout_1.SocketTimeout.commonInfiniteTotal,
            params: {
                channels: options.channels,
                accessToken: options.accessToken
            },
            success: success,
            fail: fail
        });
        this.pubSub.goEasySocket.emit(rocket);
    };
    //取消订阅
    Subscriber.prototype.unsubscribe = function (options) {
        var _this = this;
        this.formatCallback(options);
        if (!utils_1.calibrator.isDef(options.channel)) {
            options.onFailed({
                code: 400,
                content: 'channel is required'
            });
            return;
        }
        if (utils_1.calibrator.isNumber(options.channel)) {
            options.channel = options.channel.toString();
        }
        if (!this.findSubscriptionByChannel(options.channel)) {
            options.onFailed({
                code: 400,
                content: 'channel[' + options.channel + '] is not subscribed'
            });
            return;
        }
        var success = function () {
            options.onSuccess({
                code: 200,
                content: 'ok'
            });
            _this.removeChannel(options.channel);
        };
        var fail = function (ack) {
            options.onFailed({
                code: ack.resultCode,
                content: ack.content
            });
        };
        var rocket = new Rocket_1["default"]({
            name: RocketTypes_1.RocketTypes.unsubscribe,
            params: {
                channel: options.channel
            },
            permission: Permission_1.Permission.READ,
            singleTimeout: SocketTimeout_1.SocketTimeout.commonRequestSingle,
            totalTimeout: SocketTimeout_1.SocketTimeout.commonRequestTotal,
            success: success,
            fail: fail
        });
        this.pubSub.goEasySocket.emit(rocket);
    };
    Subscriber.prototype.removeChannel = function (channel) {
        for (var i = 0; i < this.subscriptions.length; i++) {
            var channels = this.subscriptions[i].channels;
            for (var j = 0; j < channels.length; j++) {
                if (channels[j] == channel) {
                    this.subscriptions[i].channels.splice(j, 1);
                    break;
                }
            }
        }
    };
    Subscriber.prototype.findSubscriptionByChannel = function (channel) {
        var exist = false;
        var subscription = null;
        for (var i = this.subscriptions.length - 1; i >= 0; i--) {
            var channels = this.subscriptions[i].channels;
            for (var j = 0; j < channels.length; j++) {
                if (channels[j] == channel) {
                    exist = true;
                    subscription = this.subscriptions[i];
                    break;
                }
            }
            if (exist)
                break;
        }
        return subscription;
    };
    return Subscriber;
}());
exports.Subscriber = Subscriber;


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.Subscription = void 0;
var Subscription = /** @class */ (function () {
    function Subscription(options) {
        this.channels = options.channels;
        this.accessToken = options.accessToken;
        this.onSuccess = options.onSuccess;
        this.onFailed = options.onFailed;
        this.onMessage = options.onMessage;
    }
    Subscription.prototype.empty = function () { };
    return Subscription;
}());
exports.Subscription = Subscription;


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.PresenceSubscriber = void 0;
var utils_1 = __webpack_require__(0);
var Rocket_1 = __webpack_require__(2);
var Permission_1 = __webpack_require__(1);
var SocketTimeout_1 = __webpack_require__(3);
var PresenceSubscription_1 = __webpack_require__(157);
var NetworkStatus_1 = __webpack_require__(12);
var RocketTypes_1 = __webpack_require__(4);
var RemoteEvents_1 = __webpack_require__(16);
var PresenceSubscriber = /** @class */ (function () {
    function PresenceSubscriber(pubSub) {
        this.presenters = [];
        this.pubSub = pubSub;
    }
    PresenceSubscriber.prototype.initialGoEasySocket = function () {
        var goEasySocket = this.pubSub.goEasySocket;
        goEasySocket.addMessageObserver(RemoteEvents_1.RemoteEvents.message, this.onNewMessage.bind(this));
        goEasySocket.addExpiredReconnectedObserver(this.onExpiredReconnected.bind(this));
        goEasySocket.addConnectedObserver(this.onReconnected.bind(this));
    };
    PresenceSubscriber.prototype.resubscribe = function () {
        var arr = this.presenters.slice(0);
        this.presenters = [];
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr[i].channels.length; j++) {
                var channelSplitArr = arr[i].channels[j].split('_presence');
                arr[i].channels[j] = channelSplitArr[0];
            }
            if (arr[i].channels.length != 0) {
                this.subscribePresence(arr[i]);
            }
        }
    };
    PresenceSubscriber.prototype.onExpiredReconnected = function () {
        this.resubscribe();
    };
    PresenceSubscriber.prototype.onReconnected = function () {
        if (!this.pubSub.neverConnect && this.pubSub.goEasySocket.status != NetworkStatus_1.NetworkStatus.RECONNECTED) {
            this.resubscribe();
        }
    };
    //收到消息分发
    PresenceSubscriber.prototype.onNewMessage = function (message) {
        //todo 临时处理方法，本应该在不同的消息中判断
        if (message.n.indexOf('_presence') == -1)
            return;
        //收到消息 通知channel
        var presenceSubscription = this.findPresenceByChannel(message.n);
        if (presenceSubscription) {
            var content = JSON.parse(message.c);
            content.events = content.events.map(function (item) {
                var data = item.userData ? JSON.parse(item.userData) : {};
                return { time: item.time, action: item.action, id: item.userId, data: data };
            });
            presenceSubscription.onPresence(content);
        }
    };
    PresenceSubscriber.prototype.formatOptions = function (options) {
        var hasChannel = !utils_1.calibrator.isEmpty(options.channel);
        var hasChannels = !utils_1.calibrator.isEmpty(options.channels);
        this.formatCallback(options);
        if (!utils_1.calibrator.isFunction(options.onPresence)) {
            options.onPresence = utils_1.noop;
        }
        if (!hasChannel && !hasChannels) {
            options.onFailed({
                code: 400,
                content: 'channel is required'
            });
            return false;
        }
        if (hasChannel && hasChannels) {
            options.onFailed({
                code: 400,
                content: 'subscribe to either channel or channels, not both'
            });
            return;
        }
        if (hasChannel) {
            if (utils_1.calibrator.isNumber(options.channel)) {
                options.channel = options.channel.toString();
            }
            options.channels = [options.channel];
        }
        if (hasChannels) {
            if (!Array.isArray(options.channels) || options.channels.length == 0) {
                options.onFailed({
                    code: 400,
                    content: 'channels must be an array'
                });
                return;
            }
            if (options.channels.length > 500) {
                options.onFailed({
                    code: 400,
                    content: 'channels over max length:500'
                });
                return false;
            }
            for (var i = 0, len = options.channels.length; i < len; i++) {
                if (utils_1.calibrator.isNumber(options.channels[i])) {
                    options.channels[i] = options.channels[i].toString();
                }
                if (utils_1.calibrator.isEmpty(options.channels[i])) {
                    options.onFailed({
                        code: 400,
                        content: 'Channels array contains empty channel'
                    });
                    return false;
                }
            }
        }
        return true;
    };
    PresenceSubscriber.prototype.formatCallback = function (options) {
        if (!utils_1.calibrator.isFunction(options.onSuccess)) {
            options.onSuccess = utils_1.noop;
        }
        if (!utils_1.calibrator.isFunction(options.onFailed)) {
            options.onFailed = utils_1.noop;
        }
    };
    PresenceSubscriber.prototype.subscribePresence = function (options) {
        var _this = this;
        if (!this.formatOptions(options))
            return;
        if (Array.isArray(options.channels)) {
            options.channels = options.channels.map(function (item) {
                item += '_presence';
                return item;
            });
        }
        var success = function () {
            var presenter = new PresenceSubscription_1.PresenceSubscription({
                channels: options.channels,
                onSuccess: options.onSuccess,
                onFailed: options.onFailed,
                onPresence: options.onPresence
            });
            _this.presenters.push(presenter);
            options.onSuccess({
                code: 200,
                content: 'ok'
            });
        };
        var fail = function (ack) {
            options.onFailed({
                code: ack.resultCode,
                content: ack.content
            });
        };
        var rocket = new Rocket_1["default"]({
            name: RocketTypes_1.RocketTypes.subscribe,
            permission: Permission_1.Permission.READ,
            singleTimeout: SocketTimeout_1.SocketTimeout.commonInfiniteSingle,
            totalTimeout: SocketTimeout_1.SocketTimeout.commonInfiniteTotal,
            params: {
                channels: options.channels,
            },
            success: success,
            fail: fail
        });
        this.pubSub.goEasySocket.emit(rocket);
    };
    PresenceSubscriber.prototype.unsubscribePresence = function (options) {
        var _this = this;
        this.formatCallback(options);
        if (!utils_1.calibrator.isDef(options.channel)) {
            options.onFailed({
                code: 400,
                content: 'channel is required'
            });
            return;
        }
        options.channel += '_presence';
        if (!this.findPresenceByChannel(options.channel)) {
            options.onFailed({
                code: 400,
                content: 'channel[' + options.channel + '] is not subscribed'
            });
            return;
        }
        var rocket = new Rocket_1["default"]({
            name: RocketTypes_1.RocketTypes.unsubscribe,
            params: {
                channel: options.channel
            },
            permission: Permission_1.Permission.READ,
            singleTimeout: SocketTimeout_1.SocketTimeout.commonRequestSingle,
            totalTimeout: SocketTimeout_1.SocketTimeout.commonRequestTotal,
            success: function () {
                options.onSuccess({
                    code: 200,
                    content: 'ok'
                });
                _this.removeChannel(options.channel);
            },
            fail: function (ack) {
                options.onFailed({
                    code: ack.resultCode,
                    content: ack.content
                });
            }
        });
        this.pubSub.goEasySocket.emit(rocket);
    };
    PresenceSubscriber.prototype.removeChannel = function (channel) {
        for (var i = 0; i < this.presenters.length; i++) {
            var channels = this.presenters[i].channels;
            for (var j = 0; j < channels.length; j++) {
                if (channels[j] == channel) {
                    this.presenters[i].channels.splice(j, 1);
                    break;
                }
            }
        }
    };
    PresenceSubscriber.prototype.findPresenceByChannel = function (channel) {
        var exist = false;
        var presenceSubscription = null;
        for (var i = this.presenters.length - 1; i >= 0; i--) {
            var channels = this.presenters[i].channels;
            for (var j = 0; j < channels.length; j++) {
                if (channels[j] == channel) {
                    exist = true;
                    presenceSubscription = this.presenters[i];
                    break;
                }
            }
            if (exist)
                break;
        }
        return presenceSubscription;
    };
    return PresenceSubscriber;
}());
exports.PresenceSubscriber = PresenceSubscriber;


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.PresenceSubscription = void 0;
var PresenceSubscription = /** @class */ (function () {
    function PresenceSubscription(options) {
        this.channels = options.channels;
        this.onSuccess = options.onSuccess;
        this.onFailed = options.onFailed;
        this.onPresence = options.onPresence;
    }
    PresenceSubscription.prototype.empty = function () { };
    return PresenceSubscription;
}());
exports.PresenceSubscription = PresenceSubscription;


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
exports.GoEasyNotification = void 0;
var UniApp_1 = __webpack_require__(43);
var utils_1 = __webpack_require__(0);
var goeasy_event_center_1 = __webpack_require__(13);
var internal_events_1 = __webpack_require__(63);
var framework_detector_1 = __webpack_require__(17);
var platform_detector_1 = __webpack_require__(30);
var IM_1 = __webpack_require__(7);
var GoEasy_1 = __webpack_require__(5);
var SocketEvents_1 = __webpack_require__(59);
// TODO:
// 2. 各个事件类型是否应该集中生命诚常量或枚举？  DONE
//      TS化后老类没有删？会不会增加打包后的体积？
//      TS化后, goeasy.ts和Im.js有两个外层代码
// 1  增加日志分级机制
// 8. 如果客户也写了plus监听，会不会冲突
var GoEasyNotification = /** @class */ (function () {
    function GoEasyNotification(allowNotification) {
        this.uniappPlugin = null;
        this.regIdPromise = null;
        this.onClickNotificationCallback = null;
        this.allowNotification = allowNotification;
        if (this.supportNotification()) {
            this.uniappPlugin = uni.requireNativePlugin('GoEasy-Uniapp');
            if (this.uniappPlugin) {
                this.regIdPromise = this.askRegId();
            }
            else { //没有安装原生插件，plus的notification的click和create也可以让用户体验到手机notification
                console.warn('No GoEasy-Uniapp Native Plugin.');
            }
        }
    }
    GoEasyNotification.prototype.listenNewMessage = function () {
        var _this = this;
        if (this.supportNotification()) {
            goeasy_event_center_1.GoEasyEventCenter.on(SocketEvents_1.SocketEvents.IM_MESSAGE_RECEIVED, function (message) { return _this.onReceivedIMMessage(message); });
            goeasy_event_center_1.GoEasyEventCenter.on(internal_events_1.PUBSUB_INTERNAL_EVENTS.MESSAGE_RECEIVED, function (message) { return _this.onReceivedPubSubMessage(message); });
        }
    };
    GoEasyNotification.prototype.onReceivedIMMessage = function (message) {
        var _this = this;
        var notification = message.nt;
        if (!utils_1.calibrator.isObject(notification) || !UniApp_1.uniApp.runningBackend()) {
            return;
        }
        var messageId = message.i;
        var timestamp = message.ts;
        var type = message.mt;
        var senderId = message.s;
        var receiverId = message.r;
        var groupId = message.r;
        var scene = message.t;
        var notifyMsg = {
            id: messageId,
            tm: timestamp,
            t: type,
            sid: senderId,
            rid: receiverId,
            gid: groupId,
            tt: scene,
            nt: notification,
            sd: null,
            gd: null,
        };
        if (scene === GoEasy_1.Scene.PRIVATE) {
            IM_1.im._dataCache.loadData(senderId, scene).then(function (data) {
                console.log('senderData - ', data);
                notifyMsg.sd = JSON.stringify(data);
                _this.createLocalNotification(notifyMsg);
            })["catch"](function (e) {
                console.log('Failed to initial senderData of IM Notification.', e);
                _this.createLocalNotification(notifyMsg);
            });
        }
        else if (scene === GoEasy_1.Scene.GROUP) {
            Promise.all([
                IM_1.im._dataCache.loadData(senderId, GoEasy_1.Scene.PRIVATE),
                IM_1.im._dataCache.loadData(groupId, GoEasy_1.Scene.GROUP),
            ]).then(function (_a) {
                var _b = __read(_a, 2), senderData = _b[0], groupData = _b[1];
                console.log('senderData - ', senderData);
                console.log('groupData - ', groupData);
                notifyMsg.sd = JSON.stringify(senderData);
                notifyMsg.gd = JSON.stringify(groupData);
                _this.createLocalNotification(notifyMsg);
            })["catch"](function (e) {
                console.log('Failed to initial senderData of IM Notification.', e);
                _this.createLocalNotification(notifyMsg);
            });
        }
        else {
            this.createLocalNotification(notifyMsg);
        }
    };
    GoEasyNotification.prototype.onReceivedPubSubMessage = function (message) {
        if (!utils_1.calibrator.isObject(message.nt) || !UniApp_1.uniApp.runningBackend()) {
            return;
        }
        var notifyMsg = {
            tm: message.t,
            ch: message.n,
            ctt: message.c,
            nt: message.nt
        };
        console.log('Pubsub notifyMsg: ', notifyMsg);
        this.createLocalNotification(notifyMsg);
    };
    GoEasyNotification.prototype.createLocalNotification = function (message) {
        console.log("message string:" + JSON.stringify(message));
        var title = message.nt.t;
        var body = message.nt.c;
        console.log("title:" + title);
        console.log("body:" + body);
        var data = Object.assign({ title: title, body: body }, message, {
            g: 1, // Make sure it's goEasy push
        });
        console.log("data:" + JSON.stringify(data));
        delete data.nt;
        console.log('createLocalNotification notifyMsg: ', data);
        if (!utils_1.calibrator.isObject(data) || !data.body || !data.title) {
            console.warn('The notification message must contain the <title> and <body> fields');
            return;
        }
        if (typeof plus !== 'undefined') {
            plus.push.createMessage(data.body, JSON.stringify(data), { title: data.title });
        }
    };
    GoEasyNotification.prototype.askRegId = function () {
        var _this = this;
        var timerId = null;
        var repeatCount = 0;
        var askRegIdPromise = function () {
            return new Promise(function (resolve, reject) {
                _this.uniappPlugin.regId(function (result) {
                    console.log('askRegId - ', result);
                    resolve(result);
                }, function (e) {
                    /***
                     * 如果是魅族或苹果的网络不好，不会返回这里，不需要，也没有重试的机会
                     *来到这里，只有两种情况：
                     * 1. 网络问题超时(1000000)，3.5秒后再尝试， 失败5次后，放弃厂商推送，直接连接GoEasy
                     * 2. 网络问题以外的其他问题，这些情况，没必要重试，放弃厂商，直接连接GoEasy
                     */
                    console.log('askRegId error - ', e);
                    if (e.data.code === 1000000 && repeatCount <= 10) {
                        // clearTimeout(timerId); todo是不是不必要？
                        timerId = setTimeout(function () {
                            repeatCount++;
                            console.log('setTimeout askRegId - ', timerId);
                            _this.regIdPromise = askRegIdPromise();
                        }, 3500);
                    }
                    else { //不是网络问题，才会停止尝试
                        console.log('regId reject - ', e);
                        clearTimeout(timerId);
                        return reject(e);
                    }
                });
            });
        };
        var regIdPromise = askRegIdPromise();
        return regIdPromise;
    };
    GoEasyNotification.prototype.getRegIdPromise = function () {
        return this.regIdPromise;
    };
    GoEasyNotification.prototype.supportNotification = function () {
        var platform = platform_detector_1.PlatformDetector.currentPlatform();
        var framework = framework_detector_1.FrameworkDetector.currentFramework();
        return this.allowNotification
            && framework === framework_detector_1.Framework.UNIAPP
            && (platform === platform_detector_1.Platform.APP_ANDROID || platform === platform_detector_1.Platform.APP_IOS);
    };
    GoEasyNotification.prototype.parseMessage = function (message) {
        if (message.ch) {
            return {
                // pubsub fields
                channel: message.ch,
                content: message.ctt,
            };
        }
        else {
            return {
                // im fields
                messageId: message.id,
                timestamp: message.tm,
                type: message.t,
                senderId: message.sid,
                senderData: message.sd ? JSON.parse(message.sd) : undefined,
                toType: message.tt,
                groupId: message.gid,
                groupData: message.gd ? JSON.parse(message.gd) : undefined,
            };
        }
    };
    GoEasyNotification.prototype.listenPlusClickNotification = function () {
        var _this = this;
        console.log('push.addEventListener click');
        plus.push.addEventListener('click', function (message) {
            if (!message || !message.payload) {
                return;
            }
            try {
                var content = typeof message.payload === 'string' ? JSON.parse(message.payload) : message.payload;
                var parsedMessage = _this.parseMessage(content);
                console.log('push parsedMessage - ', parsedMessage);
                plus.push.clear();
                _this.onClickNotificationCallback(parsedMessage);
            }
            catch (e) {
                console.log('JSON parse error.', e);
            }
        });
    };
    GoEasyNotification.prototype.availableIntent = function (intent) {
        return intent && Object.keys(intent).length && intent.g && parseInt(intent.g) === 1;
    };
    GoEasyNotification.prototype.extactIntentIfXiaoMi = function (intent) {
        var xiaomiMsgReg = /content=\{(\{.*\})\},/;
        if (intent.key_message && xiaomiMsgReg.exec(intent.key_message)) {
            var matches = intent.key_message.match(xiaomiMsgReg);
            intent = matches.length ? JSON.parse(matches[1]) : null;
        }
        return intent;
    };
    /**
     * @description * 只在死进程首次被点击notification时使用，ios和android均需要
     */
    GoEasyNotification.prototype.getIntentData = function () {
        var _this = this;
        this.uniappPlugin.getIntentData(function (intentData) {
            console.log('getIntentData - ', intentData);
            if (!_this.availableIntent(intentData)) {
                return;
            }
            var parsedMessage = _this.parseMessage(intentData);
            var platform = platform_detector_1.PlatformDetector.currentPlatform();
            plus.push.clear();
            if (platform === platform_detector_1.Platform.APP_ANDROID) {
                _this.uniappPlugin.clearAll();
            }
            _this.onClickNotificationCallback(parsedMessage);
        });
    };
    /**
     * @description TODO: 注册多次，可能会导致多次触发
     * @param clickHandler
     */
    GoEasyNotification.prototype.onClickNotification = function (clickHandler) {
        if (!this.supportNotification()) {
            console.warn('The current environment doesn\'t support or allowNotification is false.');
            return;
        }
        if (!utils_1.calibrator.isFunction(clickHandler)) {
            throw new Error('The arguments must be a function.');
        }
        if (this.onClickNotificationCallback !== null) {
            console.warn('The onClickNotification event has been listened on. Please do not listen to it more than once.');
            return;
        }
        //只能监听一次，第一次为准
        this.onClickNotificationCallback = clickHandler;
        this.listenPlusClickNotification();
        if (this.uniappPlugin) {
            this.getIntentData();
        }
    };
    return GoEasyNotification;
}());
exports.GoEasyNotification = GoEasyNotification;


/***/ })
/******/ ])["default"];
});