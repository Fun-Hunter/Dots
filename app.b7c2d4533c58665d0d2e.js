/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "b7c2d4533c58665d0d2e";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "app";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/main.ts")(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
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
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "./src/behaviors/BehaviorManager.ts":
/*!******************************************!*\
  !*** ./src/behaviors/BehaviorManager.ts ***!
  \******************************************/
/*! exports provided: BehaviorManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BehaviorManager", function() { return BehaviorManager; });
var BehaviorManager = /** @class */ (function () {
    function BehaviorManager() {
    }
    BehaviorManager.add = function (entity) {
        this.forEachLayer(entity, function (layer, value) { return layer.add(value); });
        if ('onConnect' in entity) {
            entity.onConnect();
        }
    };
    BehaviorManager.delete = function (entity) {
        this.forEachLayer(entity, function (layer, value) { return layer.delete(value); });
    };
    BehaviorManager.Draw = function (ctx) {
        BehaviorManager._drawable.forEach(function (layer) {
            layer.forEach(function (entry) { return entry.Draw(ctx); });
        });
    };
    BehaviorManager.Update = function (deltaTick) {
        BehaviorManager._updatable.forEach(function (entry) { return entry.Update(deltaTick); });
    };
    BehaviorManager.forEachLayer = function (entity, callback) {
        if ('Draw' in entity) {
            var zIndex = entity.getZIndex();
            callback(BehaviorManager.getZLayer(zIndex), entity);
        }
        if ('Update' in entity) {
            callback(BehaviorManager._updatable, entity);
        }
    };
    BehaviorManager.getZLayer = function (zIndex) {
        var layer = BehaviorManager._drawable[zIndex];
        if (layer === undefined) {
            layer = new Set();
            BehaviorManager._drawable[zIndex] = layer;
        }
        return layer;
    };
    BehaviorManager._drawable = [];
    BehaviorManager._updatable = new Set();
    return BehaviorManager;
}());



/***/ }),

/***/ "./src/game/Background.ts":
/*!********************************!*\
  !*** ./src/game/Background.ts ***!
  \********************************/
/*! exports provided: Background */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Background", function() { return Background; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/scene */ "./src/scene/index.ts");
/* harmony import */ var _utils_vector2D__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/vector2D */ "./src/utils/vector2D.ts");
/* harmony import */ var _utils_Canvas__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/Canvas */ "./src/utils/Canvas.ts");
/* harmony import */ var _utils_CanvasLayer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/CanvasLayer */ "./src/utils/CanvasLayer.ts");
/* harmony import */ var _scene_SceneFov__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/scene/SceneFov */ "./src/scene/SceneFov.ts");






var Star = /** @class */ (function () {
    function Star() {
        this.cycle = 20 + Math.random() * 10;
        this.offset = Math.random() * this.cycle;
        this.position = new _utils_vector2D__WEBPACK_IMPORTED_MODULE_2__["Vector2D"](Math.random() * _utils_Canvas__WEBPACK_IMPORTED_MODULE_3__["Canvas"].size.x, Math.random() * _utils_Canvas__WEBPACK_IMPORTED_MODULE_3__["Canvas"].size.y);
        this.size = Math.random() * 2;
        this.shining = Math.floor(240 * Math.random() + 16);
    }
    return Star;
}());
var Background = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Background, _super);
    function Background() {
        var _this = _super.call(this) || this;
        _this._stars = [];
        for (var i = 0; i < 5000; i++) {
            _this._stars.push(new Star());
        }
        return _this;
    }
    Background.prototype.Update = function (deltaTick) {
        this._stars.forEach(function (star) {
            star.offset += deltaTick;
            if (star.offset > star.cycle) {
                star.offset = 0;
            }
        });
    };
    Background.prototype.Draw = function (ctx) {
        _scene_SceneFov__WEBPACK_IMPORTED_MODULE_5__["SceneFov"].instance.setNativeFov();
        ctx.fillStyle = '#00002d';
        ctx.shadowColor = '#ffa500';
        ctx.shadowBlur = 30;
        ctx.fillRect(0, 0, _utils_Canvas__WEBPACK_IMPORTED_MODULE_3__["Canvas"].size.x, _utils_Canvas__WEBPACK_IMPORTED_MODULE_3__["Canvas"].size.y);
        this._stars.forEach(function (star) {
            if (star.offset > 2) {
                return;
            }
            ctx.beginPath();
            ctx.arc(star.position.x, star.position.y, star.size * Math.sin(star.offset * Math.PI / 2), 0, Math.PI * 2);
            ctx.fillStyle = '#ffdb9c' + star.shining.toString(16);
            ctx.fill();
        });
        ctx.shadowBlur = 0;
        _scene_SceneFov__WEBPACK_IMPORTED_MODULE_5__["SceneFov"].instance.setLocalFov();
    };
    Background.prototype.getZIndex = function () {
        return _utils_CanvasLayer__WEBPACK_IMPORTED_MODULE_4__["CanvasLayer"].Background;
    };
    return Background;
}(_scene__WEBPACK_IMPORTED_MODULE_1__["SceneNode"]));



/***/ }),

/***/ "./src/game/EndScreen.ts":
/*!*******************************!*\
  !*** ./src/game/EndScreen.ts ***!
  \*******************************/
/*! exports provided: EndScreen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EndScreen", function() { return EndScreen; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/scene */ "./src/scene/index.ts");
/* harmony import */ var _utils_vector2D__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/vector2D */ "./src/utils/vector2D.ts");
/* harmony import */ var _utils_Canvas__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/Canvas */ "./src/utils/Canvas.ts");
/* harmony import */ var _utils_CanvasLayer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/CanvasLayer */ "./src/utils/CanvasLayer.ts");





var Star = /** @class */ (function () {
    function Star() {
        this.cycle = 2 + Math.random() * 4;
        this.offset = Math.random() * this.cycle;
        this.position = new _utils_vector2D__WEBPACK_IMPORTED_MODULE_2__["Vector2D"](Math.random() * _utils_Canvas__WEBPACK_IMPORTED_MODULE_3__["Canvas"].size.x, Math.random() * _utils_Canvas__WEBPACK_IMPORTED_MODULE_3__["Canvas"].size.y);
        this.size = Math.random() * (Math.random() * 5 + 2);
        this.shining = Math.floor(128 * Math.random() + 128);
    }
    return Star;
}());
var EndScreen = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(EndScreen, _super);
    function EndScreen(_message) {
        var _this = _super.call(this) || this;
        _this._message = _message;
        _this._stars = [];
        for (var i = 0; i < 1000; i++) {
            _this._stars.push(new Star());
        }
        return _this;
    }
    EndScreen.prototype.Update = function (deltaTick) {
        this._stars.forEach(function (star) {
            star.offset += deltaTick;
            if (star.offset > star.cycle) {
                star.offset = 0;
            }
        });
    };
    EndScreen.prototype.Draw = function (ctx) {
        ctx.fillStyle = '#00002d';
        ctx.shadowColor = '#ffa500';
        ctx.shadowBlur = 30;
        ctx.fillRect(0, 0, _utils_Canvas__WEBPACK_IMPORTED_MODULE_3__["Canvas"].size.x, _utils_Canvas__WEBPACK_IMPORTED_MODULE_3__["Canvas"].size.y);
        this._stars.forEach(function (star) {
            if (star.offset > 1) {
                return;
            }
            ctx.beginPath();
            ctx.arc(star.position.x, star.position.y, star.size * Math.sin(star.offset * Math.PI), 0, Math.PI * 2);
            ctx.fillStyle = '#ffdb9c' + star.shining.toString(16);
            ctx.fill();
        });
        ctx.font = '50px Lucida Handwriting';
        ctx.fillText(this._message, 400, 300);
        ctx.shadowBlur = 0;
    };
    EndScreen.prototype.getZIndex = function () {
        return _utils_CanvasLayer__WEBPACK_IMPORTED_MODULE_4__["CanvasLayer"].Background;
    };
    return EndScreen;
}(_scene__WEBPACK_IMPORTED_MODULE_1__["SceneNode"]));



/***/ }),

/***/ "./src/game/Level1AI.ts":
/*!******************************!*\
  !*** ./src/game/Level1AI.ts ***!
  \******************************/
/*! exports provided: Level1AI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Level1AI", function() { return Level1AI; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/scene */ "./src/scene/index.ts");


var Level1AI = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Level1AI, _super);
    function Level1AI(_zone) {
        var _this = _super.call(this) || this;
        _this._zone = _zone;
        _this._rules = [];
        _this._rules.push(_this.tryCapture(4));
        _this._rules.push(_this.tryCapture(2));
        _this._rules.push(_this.tryCapture(3));
        _this._rules.push(_this.tryCapture(1));
        _this._rules.push(_this.tryCapture(0));
        _this._rules.push(_this.trySupply(3, 2));
        _this._rules.push(_this.trySupply(4, 2));
        return _this;
    }
    Level1AI.prototype.Update = function (deltaTick) {
        var e_1, _a;
        try {
            for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(this._rules), _c = _b.next(); !_c.done; _c = _b.next()) {
                var rule = _c.value;
                rule.Update(deltaTick);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Level1AI.prototype.tryCapture = function (targetIdx) {
        var target = this._zone[targetIdx];
        var sources = this.getLinked(target).map(function (link) { return link.invert(); });
        return {
            Update: function () {
                var e_2, _a, e_3, _b;
                if (target.owner == 2)
                    return;
                var expectedPower = 20;
                if (target.owner != 0)
                    expectedPower = target.value + target.maxShield + 15;
                var ownPower = 0;
                try {
                    for (var sources_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(sources), sources_1_1 = sources_1.next(); !sources_1_1.done; sources_1_1 = sources_1.next()) {
                        var src = sources_1_1.value;
                        if (src.from.owner == 2 && src.from.value > 20)
                            ownPower += src.from.value;
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (sources_1_1 && !sources_1_1.done && (_a = sources_1.return)) _a.call(sources_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                if (ownPower > expectedPower) {
                    try {
                        for (var sources_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(sources), sources_2_1 = sources_2.next(); !sources_2_1.done; sources_2_1 = sources_2.next()) {
                            var src = sources_2_1.value;
                            if (src.from.owner == 2)
                                src.from.fire(src, src.from.value);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (sources_2_1 && !sources_2_1.done && (_b = sources_2.return)) _b.call(sources_2);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
        };
    };
    Level1AI.prototype.trySupply = function (fromIdx, targetIdx) {
        var target = this._zone[targetIdx];
        var from = this._zone[fromIdx];
        var found = this.getLinked(from).find(function (e) { return e.to == target; });
        if (found === undefined)
            throw "Missing link " + fromIdx + " -> " + targetIdx;
        var link = found;
        return {
            Update: function () {
                if (target.owner != 2)
                    return;
                if (from.owner != 2)
                    return;
                if (from.value < 1)
                    return;
                from.fire(link, from.value);
            }
        };
    };
    Level1AI.prototype.getLinked = function (zone) {
        var e_4, _a;
        var result = [];
        try {
            for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(zone.links), _c = _b.next(); !_c.done; _c = _b.next()) {
                var link = _c.value;
                result.push(link.directedFrom(zone));
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return result;
    };
    return Level1AI;
}(_scene__WEBPACK_IMPORTED_MODULE_1__["SceneNode"]));



/***/ }),

/***/ "./src/game/PlayerTemplate.ts":
/*!************************************!*\
  !*** ./src/game/PlayerTemplate.ts ***!
  \************************************/
/*! exports provided: PlayerTemplates */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerTemplates", function() { return PlayerTemplates; });
var PlayerTemplates = /** @class */ (function () {
    function PlayerTemplates() {
    }
    PlayerTemplates.getTemplate = function (idx) {
        return this._templates[idx];
    };
    PlayerTemplates._templates = [{
            color: '#808080'
        }, {
            color: '#76b133'
        }, {
            color: '#b13333'
        }];
    return PlayerTemplates;
}());



/***/ }),

/***/ "./src/game/game.ts":
/*!**************************!*\
  !*** ./src/game/game.ts ***!
  \**************************/
/*! exports provided: Game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Game", function() { return Game; });
/* harmony import */ var _utils_Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/Canvas */ "./src/utils/Canvas.ts");
/* harmony import */ var _zone_Zone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/zone/Zone */ "./src/zone/Zone.ts");
/* harmony import */ var _behaviors_BehaviorManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/behaviors/BehaviorManager */ "./src/behaviors/BehaviorManager.ts");
/* harmony import */ var _utils_vector2D__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/vector2D */ "./src/utils/vector2D.ts");
/* harmony import */ var _zone_ZoneLink__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/zone/ZoneLink */ "./src/zone/ZoneLink.ts");
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/scene */ "./src/scene/index.ts");
/* harmony import */ var _game_Background__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/game/Background */ "./src/game/Background.ts");
/* harmony import */ var _input_InputHandler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/input/InputHandler */ "./src/input/InputHandler.ts");
/* harmony import */ var _game_Level1AI__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/game/Level1AI */ "./src/game/Level1AI.ts");









var Game = /** @class */ (function () {
    function Game() {
        this._lastTimestamp = 0;
    }
    Game.prototype.Start = function () {
        var _this = this;
        _scene__WEBPACK_IMPORTED_MODULE_5__["Scene"].instance.addNode(new _game_Background__WEBPACK_IMPORTED_MODULE_6__["Background"]());
        _scene__WEBPACK_IMPORTED_MODULE_5__["Scene"].instance.addNode(_input_InputHandler__WEBPACK_IMPORTED_MODULE_7__["InputHandler"].instance);
        this._zones = [
            new _zone_Zone__WEBPACK_IMPORTED_MODULE_1__["Zone"](new _utils_vector2D__WEBPACK_IMPORTED_MODULE_3__["Vector2D"](-200, -150), 1),
            new _zone_Zone__WEBPACK_IMPORTED_MODULE_1__["Zone"](new _utils_vector2D__WEBPACK_IMPORTED_MODULE_3__["Vector2D"](-100, 150), 0),
            new _zone_Zone__WEBPACK_IMPORTED_MODULE_1__["Zone"](new _utils_vector2D__WEBPACK_IMPORTED_MODULE_3__["Vector2D"](0, 0), 0),
            new _zone_Zone__WEBPACK_IMPORTED_MODULE_1__["Zone"](new _utils_vector2D__WEBPACK_IMPORTED_MODULE_3__["Vector2D"](200, 200), 2),
            new _zone_Zone__WEBPACK_IMPORTED_MODULE_1__["Zone"](new _utils_vector2D__WEBPACK_IMPORTED_MODULE_3__["Vector2D"](300, -50), 0),
        ];
        this._links = [
            new _zone_ZoneLink__WEBPACK_IMPORTED_MODULE_4__["ZoneLink"](this._zones[0], this._zones[1]),
            new _zone_ZoneLink__WEBPACK_IMPORTED_MODULE_4__["ZoneLink"](this._zones[0], this._zones[2]),
            new _zone_ZoneLink__WEBPACK_IMPORTED_MODULE_4__["ZoneLink"](this._zones[1], this._zones[2]),
            new _zone_ZoneLink__WEBPACK_IMPORTED_MODULE_4__["ZoneLink"](this._zones[2], this._zones[3]),
            new _zone_ZoneLink__WEBPACK_IMPORTED_MODULE_4__["ZoneLink"](this._zones[2], this._zones[4]),
            new _zone_ZoneLink__WEBPACK_IMPORTED_MODULE_4__["ZoneLink"](this._zones[3], this._zones[4]),
        ];
        var scene = _scene__WEBPACK_IMPORTED_MODULE_5__["Scene"].instance;
        this._zones.forEach(function (entry) { return scene.addNode(entry); });
        this._links.forEach(function (entry) { return scene.addNode(entry); });
        scene.addNode(new _game_Level1AI__WEBPACK_IMPORTED_MODULE_8__["Level1AI"](this._zones));
        window.requestAnimationFrame(function () {
            // set initial timestamp
            _this._lastTimestamp = Date.now();
            // start update loop
            _this.Update();
        });
    };
    Game.prototype.Update = function () {
        var _this = this;
        var deltaTime = (Date.now() - this._lastTimestamp) / 1000;
        this._lastTimestamp = Date.now();
        _utils_Canvas__WEBPACK_IMPORTED_MODULE_0__["Canvas"].fixDpi();
        _behaviors_BehaviorManager__WEBPACK_IMPORTED_MODULE_2__["BehaviorManager"].Update(deltaTime);
        _behaviors_BehaviorManager__WEBPACK_IMPORTED_MODULE_2__["BehaviorManager"].Draw(_utils_Canvas__WEBPACK_IMPORTED_MODULE_0__["Canvas"].ctx);
        // Invoke on next frame
        window.requestAnimationFrame(function () { return _this.Update(); });
    };
    return Game;
}());



/***/ }),

/***/ "./src/input/InputHandler.ts":
/*!***********************************!*\
  !*** ./src/input/InputHandler.ts ***!
  \***********************************/
/*! exports provided: InputHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputHandler", function() { return InputHandler; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/scene */ "./src/scene/index.ts");
/* harmony import */ var _utils_vector2D__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/vector2D */ "./src/utils/vector2D.ts");
/* harmony import */ var _zone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/zone */ "./src/zone/index.ts");
/* harmony import */ var _scene_SceneFov__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/scene/SceneFov */ "./src/scene/SceneFov.ts");





var MouseState;
(function (MouseState) {
    MouseState[MouseState["RELEASED"] = 0] = "RELEASED";
    MouseState[MouseState["PRESSED"] = 1] = "PRESSED";
    MouseState[MouseState["DRAGGED"] = 2] = "DRAGGED";
})(MouseState || (MouseState = {}));
var InputHandler = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(InputHandler, _super);
    function InputHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._mouseState = MouseState.RELEASED;
        return _this;
    }
    Object.defineProperty(InputHandler, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    InputHandler.prototype.onConnect = function () {
        var _this = this;
        this.onCanvasEvent('mousedown', function (e) {
            _this._dragStartLocation = new _utils_vector2D__WEBPACK_IMPORTED_MODULE_2__["Vector2D"](e.offsetX, e.offsetY);
            _this._mouseState = MouseState.PRESSED;
        });
        this.onCanvasEvent('mouseup', function (e) {
            if (_this._mouseState == MouseState.PRESSED) {
                var location_1 = _scene_SceneFov__WEBPACK_IMPORTED_MODULE_4__["SceneFov"].instance.screen2world(new _utils_vector2D__WEBPACK_IMPORTED_MODULE_2__["Vector2D"](e.offsetX, e.offsetY));
                _this.onClick(location_1);
            }
            _this._mouseState = MouseState.RELEASED;
        });
        this.onCanvasEvent('mousemove', function (e) {
            var _a;
            var screenPos = new _utils_vector2D__WEBPACK_IMPORTED_MODULE_2__["Vector2D"](e.offsetX, e.offsetY);
            if (_this._mouseState == MouseState.RELEASED) {
                (_a = _zone__WEBPACK_IMPORTED_MODULE_3__["ZoneSelectionManager"].selection) === null || _a === void 0 ? void 0 : _a.aim(_scene_SceneFov__WEBPACK_IMPORTED_MODULE_4__["SceneFov"].instance.screen2world(screenPos));
            }
            else if (_this._mouseState == MouseState.PRESSED) {
                if (screenPos.distance(_this._dragStartLocation) > 5) {
                    _this._mouseState = MouseState.DRAGGED;
                }
            }
            if (_this._mouseState == MouseState.DRAGGED) {
                var offset = screenPos.sub(_this._dragStartLocation);
                _this._dragStartLocation = screenPos;
                _scene_SceneFov__WEBPACK_IMPORTED_MODULE_4__["SceneFov"].instance.move(offset);
            }
        });
        this.onCanvasEvent('wheel', function (e) {
            var center = _scene_SceneFov__WEBPACK_IMPORTED_MODULE_4__["SceneFov"].instance.screen2world(new _utils_vector2D__WEBPACK_IMPORTED_MODULE_2__["Vector2D"](e.offsetX, e.offsetY));
            if (e.deltaY < 0)
                _scene_SceneFov__WEBPACK_IMPORTED_MODULE_4__["SceneFov"].instance.zoomIn(center);
            if (e.deltaY > 0)
                _scene_SceneFov__WEBPACK_IMPORTED_MODULE_4__["SceneFov"].instance.zoomOut(center);
        });
    };
    InputHandler.prototype.onClick = function (point) {
        var _a;
        var zone = this.findZone(point);
        if (zone) {
            this.addNode(new _zone__WEBPACK_IMPORTED_MODULE_3__["ZonePing"](zone));
            _zone__WEBPACK_IMPORTED_MODULE_3__["ZoneSelectionManager"].setTarget(zone);
            return;
        }
        if ((_a = _zone__WEBPACK_IMPORTED_MODULE_3__["ZoneSelectionManager"].selection) === null || _a === void 0 ? void 0 : _a.isAiming) {
            _zone__WEBPACK_IMPORTED_MODULE_3__["ZoneSelectionManager"].selection.fire();
            return;
        }
        _zone__WEBPACK_IMPORTED_MODULE_3__["ZoneSelectionManager"].setTarget(undefined);
    };
    InputHandler.prototype.findZone = function (point) {
        var e_1, _a;
        try {
            for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(_zone__WEBPACK_IMPORTED_MODULE_3__["ZoneSelectionManager"].zones), _c = _b.next(); !_c.done; _c = _b.next()) {
                var zone = _c.value;
                var radius = zone.radius;
                var distance = zone.position.distance(point);
                if (distance <= radius)
                    return zone;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    InputHandler._instance = new InputHandler();
    return InputHandler;
}(_scene__WEBPACK_IMPORTED_MODULE_1__["SceneNode"]));



/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/game/game */ "./src/game/game.ts");

new _game_game__WEBPACK_IMPORTED_MODULE_0__["Game"]().Start();


/***/ }),

/***/ "./src/scene/Scene.ts":
/*!****************************!*\
  !*** ./src/scene/Scene.ts ***!
  \****************************/
/*! exports provided: Scene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Scene", function() { return Scene; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/scene */ "./src/scene/index.ts");
/* harmony import */ var _behaviors_BehaviorManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/behaviors/BehaviorManager */ "./src/behaviors/BehaviorManager.ts");



var Scene = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Scene, _super);
    function Scene() {
        var _this = _super.call(this) || this;
        _this.descendantAddedEvent.subscribe(function (descendant) {
            _this.forEachChildren(descendant, function (node) {
                _this.addToScene(node);
            });
        });
        _this.descendantRemovedEvent.subscribe(function (descendant) {
            _this.forEachChildren(descendant, function (node) {
                _this.delFromScene(node);
            });
        });
        return _this;
    }
    Object.defineProperty(Scene, "instance", {
        get: function () {
            return Scene._instance;
        },
        enumerable: false,
        configurable: true
    });
    Scene.prototype.forEachChildren = function (node, callback) {
        var _this = this;
        callback(node);
        var childrens = node.childrens;
        childrens.forEach(function (child) {
            _this.forEachChildren(child, callback);
        });
    };
    Scene.prototype.addToScene = function (node) {
        _behaviors_BehaviorManager__WEBPACK_IMPORTED_MODULE_2__["BehaviorManager"].add(node);
    };
    Scene.prototype.delFromScene = function (node) {
        _behaviors_BehaviorManager__WEBPACK_IMPORTED_MODULE_2__["BehaviorManager"].delete(node);
    };
    Scene._instance = new Scene();
    return Scene;
}(_scene__WEBPACK_IMPORTED_MODULE_1__["SceneNode"]));



/***/ }),

/***/ "./src/scene/SceneFov.ts":
/*!*******************************!*\
  !*** ./src/scene/SceneFov.ts ***!
  \*******************************/
/*! exports provided: SceneFov */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SceneFov", function() { return SceneFov; });
/* harmony import */ var _utils_Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/Canvas */ "./src/utils/Canvas.ts");
/* harmony import */ var _utils_vector2D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/vector2D */ "./src/utils/vector2D.ts");


var SceneFov = /** @class */ (function () {
    function SceneFov() {
        this._scale = 1;
        this._translation = new _utils_vector2D__WEBPACK_IMPORTED_MODULE_1__["Vector2D"](_utils_Canvas__WEBPACK_IMPORTED_MODULE_0__["Canvas"].size.x / 2, _utils_Canvas__WEBPACK_IMPORTED_MODULE_0__["Canvas"].size.y / 2);
    }
    Object.defineProperty(SceneFov, "instance", {
        get: function () {
            return SceneFov._instance;
        },
        enumerable: false,
        configurable: true
    });
    SceneFov.prototype.move = function (offset) {
        this._translation = this._translation.add(offset);
    };
    SceneFov.prototype.zoomIn = function (center) {
        this.setScale(center, this._scale * 1.1);
    };
    SceneFov.prototype.zoomOut = function (center) {
        this.setScale(center, this._scale / 1.1);
    };
    SceneFov.prototype.setScale = function (center, newScale) {
        this._translation = this._translation.add(center.mul(this._scale - newScale));
        this._scale = newScale;
    };
    SceneFov.prototype.setNativeFov = function () {
        _utils_Canvas__WEBPACK_IMPORTED_MODULE_0__["Canvas"].ctx.setTransform(1, 0, 0, 1, 0, 0);
    };
    SceneFov.prototype.setLocalFov = function () {
        _utils_Canvas__WEBPACK_IMPORTED_MODULE_0__["Canvas"].ctx.setTransform(this._scale, 0, 0, this._scale, this._translation.x, this._translation.y);
    };
    SceneFov.prototype.screen2world = function (location) {
        return new _utils_vector2D__WEBPACK_IMPORTED_MODULE_1__["Vector2D"]((location.x - this._translation.x) / this._scale, (location.y - this._translation.y) / this._scale);
    };
    SceneFov._instance = new SceneFov();
    return SceneFov;
}());



/***/ }),

/***/ "./src/scene/SceneNode.ts":
/*!********************************!*\
  !*** ./src/scene/SceneNode.ts ***!
  \********************************/
/*! exports provided: SceneNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SceneNode", function() { return SceneNode; });
/* harmony import */ var _utils_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/events */ "./src/utils/events/index.ts");
/* harmony import */ var _utils_Canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/Canvas */ "./src/utils/Canvas.ts");


var SceneNode = /** @class */ (function () {
    function SceneNode() {
        this._childrens = new Set();
        this._childrenAdded = new _utils_events__WEBPACK_IMPORTED_MODULE_0__["DeferredEvent"]();
        this._childrenRemoved = new _utils_events__WEBPACK_IMPORTED_MODULE_0__["DeferredEvent"]();
        this._descendantAdded = new _utils_events__WEBPACK_IMPORTED_MODULE_0__["DeferredEvent"]();
        this._descendantRemoved = new _utils_events__WEBPACK_IMPORTED_MODULE_0__["DeferredEvent"]();
        this._nodeDisconnected = new _utils_events__WEBPACK_IMPORTED_MODULE_0__["DeferredEvent"]();
    }
    Object.defineProperty(SceneNode.prototype, "childrens", {
        get: function () {
            return this._childrens;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SceneNode.prototype, "childrenAddedEvent", {
        get: function () {
            return this._childrenAdded;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SceneNode.prototype, "childrenRemovedEvent", {
        get: function () {
            return this._childrenRemoved;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SceneNode.prototype, "descendantAddedEvent", {
        get: function () {
            return this._descendantAdded;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SceneNode.prototype, "descendantRemovedEvent", {
        get: function () {
            return this._descendantRemoved;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SceneNode.prototype, "nodeDisconnectedEvent", {
        get: function () {
            return this._nodeDisconnected;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SceneNode.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        set: function (parent) {
            if (this._parent === parent)
                return;
            if (this._parent != undefined) {
                this._parent.removeInternally(this);
                this._parent = undefined;
                this._nodeDisconnected.fire(this);
            }
            if (parent != undefined) {
                this._parent = parent;
                this._parent.addInternally(this);
            }
        },
        enumerable: false,
        configurable: true
    });
    SceneNode.prototype.addNode = function (node) {
        if (node._parent !== this)
            node.parent = this;
    };
    SceneNode.prototype.removeNode = function (node) {
        if (node._parent === this)
            node.parent = undefined;
    };
    SceneNode.prototype.onCanvasEvent = function (type, listener, options) {
        var canvasSubscription = _utils_Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"].onCanvasEvent(type, listener, options);
        var disconnectSubscription = this._nodeDisconnected.subscribe(function () {
            canvasSubscription.stop();
        });
        return {
            stop: function () {
                disconnectSubscription.stop();
                canvasSubscription.stop();
            }
        };
    };
    SceneNode.prototype.addInternally = function (node) {
        if (this._childrens.add(node)) {
            this._childrenAdded.fire(node);
            this._descendantAdded.fire(node);
            var owner = this._parent;
            while (owner != undefined) {
                owner._descendantAdded.fire(node);
                owner = owner._parent;
            }
        }
    };
    SceneNode.prototype.removeInternally = function (node) {
        if (this._childrens.delete(node)) {
            this._childrenRemoved.fire(node);
            this._descendantRemoved.fire(node);
            var owner = this._parent;
            while (owner != undefined) {
                owner._descendantRemoved.fire(node);
                owner = owner._parent;
            }
        }
    };
    return SceneNode;
}());



/***/ }),

/***/ "./src/scene/index.ts":
/*!****************************!*\
  !*** ./src/scene/index.ts ***!
  \****************************/
/*! exports provided: SceneNode, Scene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SceneNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SceneNode */ "./src/scene/SceneNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SceneNode", function() { return _SceneNode__WEBPACK_IMPORTED_MODULE_0__["SceneNode"]; });

/* harmony import */ var _Scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Scene */ "./src/scene/Scene.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Scene", function() { return _Scene__WEBPACK_IMPORTED_MODULE_1__["Scene"]; });





/***/ }),

/***/ "./src/utils/Canvas.ts":
/*!*****************************!*\
  !*** ./src/utils/Canvas.ts ***!
  \*****************************/
/*! exports provided: Canvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Canvas", function() { return Canvas; });
/* harmony import */ var _utils_vector2D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/vector2D */ "./src/utils/vector2D.ts");

var Canvas = /** @class */ (function () {
    function Canvas() {
    }
    Object.defineProperty(Canvas, "size", {
        get: function () {
            return Canvas._size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Canvas, "ctx", {
        get: function () {
            return Canvas._ctx;
        },
        enumerable: false,
        configurable: true
    });
    Canvas.fixDpi = function () {
        var computedStyle = getComputedStyle(Canvas._elm);
        Canvas._size.x = parseInt(computedStyle.width);
        Canvas._size.y = parseInt(computedStyle.height);
        Canvas._elm.setAttribute('width', computedStyle.width);
        Canvas._elm.setAttribute('height', computedStyle.height);
    };
    Canvas.onCanvasEvent = function (type, listener, options) {
        Canvas._elm.addEventListener(type, listener, options);
        return {
            stop: function () {
                Canvas._elm.removeEventListener(type, listener, options);
            }
        };
    };
    Canvas._size = new _utils_vector2D__WEBPACK_IMPORTED_MODULE_0__["Vector2D"](1920, 1080);
    Canvas._initialize = (function () {
        var canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        Canvas._elm = canvas;
        var ctx = Canvas._elm.getContext('2d');
        if (!ctx) {
            throw new Error('Context identifier is not supported');
        }
        Canvas._ctx = ctx;
        Canvas.fixDpi();
    })();
    return Canvas;
}());



/***/ }),

/***/ "./src/utils/CanvasLayer.ts":
/*!**********************************!*\
  !*** ./src/utils/CanvasLayer.ts ***!
  \**********************************/
/*! exports provided: CanvasLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasLayer", function() { return CanvasLayer; });
var CanvasLayer;
(function (CanvasLayer) {
    CanvasLayer[CanvasLayer["Background"] = 0] = "Background";
    CanvasLayer[CanvasLayer["ZoneLinks"] = 1] = "ZoneLinks";
    CanvasLayer[CanvasLayer["ZoneSelection"] = 2] = "ZoneSelection";
    CanvasLayer[CanvasLayer["Projectiles"] = 3] = "Projectiles";
    CanvasLayer[CanvasLayer["Zones"] = 4] = "Zones";
    CanvasLayer[CanvasLayer["Ping"] = 5] = "Ping";
})(CanvasLayer || (CanvasLayer = {}));


/***/ }),

/***/ "./src/utils/events/DeferredEvent.ts":
/*!*******************************************!*\
  !*** ./src/utils/events/DeferredEvent.ts ***!
  \*******************************************/
/*! exports provided: DeferredEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeferredEvent", function() { return DeferredEvent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _utils_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/events */ "./src/utils/events/index.ts");


var DeferredEvent = /** @class */ (function () {
    function DeferredEvent() {
        this._subscriptions = new _utils_events__WEBPACK_IMPORTED_MODULE_1__["SubscriptionList"]();
    }
    DeferredEvent.prototype.subscribe = function (handler) {
        return this._subscriptions.addEntry(handler);
    };
    DeferredEvent.prototype.fire = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._subscriptions.forEach(function (handler) {
            handler.apply(void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(args));
        });
    };
    return DeferredEvent;
}());



/***/ }),

/***/ "./src/utils/events/GameEvent.ts":
/*!***************************************!*\
  !*** ./src/utils/events/GameEvent.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/utils/events/Subscription.ts":
/*!******************************************!*\
  !*** ./src/utils/events/Subscription.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/utils/events/SubscriptionList.ts":
/*!**********************************************!*\
  !*** ./src/utils/events/SubscriptionList.ts ***!
  \**********************************************/
/*! exports provided: SubscriptionList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubscriptionList", function() { return SubscriptionList; });
var SubscriptionList = /** @class */ (function () {
    function SubscriptionList() {
        this.entries = new Set();
    }
    SubscriptionList.prototype.addEntry = function (entry) {
        var entries = this.entries;
        entries.add(entry);
        return {
            stop: function () {
                entries.delete(entry);
            }
        };
    };
    SubscriptionList.prototype.forEach = function (callback) {
        this.entries.forEach(callback);
    };
    return SubscriptionList;
}());



/***/ }),

/***/ "./src/utils/events/index.ts":
/*!***********************************!*\
  !*** ./src/utils/events/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Subscription */ "./src/utils/events/Subscription.ts");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Subscription__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Subscription__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Subscription__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _SubscriptionList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SubscriptionList */ "./src/utils/events/SubscriptionList.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SubscriptionList", function() { return _SubscriptionList__WEBPACK_IMPORTED_MODULE_1__["SubscriptionList"]; });

/* harmony import */ var _GameEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameEvent */ "./src/utils/events/GameEvent.ts");
/* harmony import */ var _GameEvent__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_GameEvent__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _GameEvent__WEBPACK_IMPORTED_MODULE_2__) if(["SubscriptionList","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _GameEvent__WEBPACK_IMPORTED_MODULE_2__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _DeferredEvent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DeferredEvent */ "./src/utils/events/DeferredEvent.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeferredEvent", function() { return _DeferredEvent__WEBPACK_IMPORTED_MODULE_3__["DeferredEvent"]; });







/***/ }),

/***/ "./src/utils/vector2D.ts":
/*!*******************************!*\
  !*** ./src/utils/vector2D.ts ***!
  \*******************************/
/*! exports provided: Vector2D */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector2D", function() { return Vector2D; });
var Vector2D = /** @class */ (function () {
    function Vector2D(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2D.prototype.add = function (other) {
        return new Vector2D(this.x + other.x, this.y + other.y);
    };
    Vector2D.prototype.sub = function (other) {
        return new Vector2D(this.x - other.x, this.y - other.y);
    };
    Vector2D.prototype.mul = function (scale) {
        return new Vector2D(this.x * scale, this.y * scale);
    };
    Vector2D.prototype.orthogonal = function () {
        return new Vector2D(this.y, -this.x);
    };
    Vector2D.prototype.normalize = function () {
        var l = this.length();
        return new Vector2D(this.x / l, this.y / l);
    };
    Vector2D.prototype.length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Vector2D.prototype.distance = function (other) {
        return this.sub(other).length();
    };
    return Vector2D;
}());



/***/ }),

/***/ "./src/zone/DirectedLink.ts":
/*!**********************************!*\
  !*** ./src/zone/DirectedLink.ts ***!
  \**********************************/
/*! exports provided: DirectedLink */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DirectedLink", function() { return DirectedLink; });
var DirectedLink = /** @class */ (function () {
    function DirectedLink(link, from, to) {
        this.link = link;
        this.from = from;
        this.to = to;
    }
    DirectedLink.prototype.invert = function () {
        return new DirectedLink(this.link, this.to, this.from);
    };
    DirectedLink.prototype.isForward = function () {
        return this.link.to === this.to;
    };
    return DirectedLink;
}());



/***/ }),

/***/ "./src/zone/Projectile.ts":
/*!********************************!*\
  !*** ./src/zone/Projectile.ts ***!
  \********************************/
/*! exports provided: Projectile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Projectile", function() { return Projectile; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/scene */ "./src/scene/index.ts");
/* harmony import */ var _utils_CanvasLayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/CanvasLayer */ "./src/utils/CanvasLayer.ts");



var Projectile = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Projectile, _super);
    function Projectile(link, _power) {
        var _this = _super.call(this) || this;
        _this.link = link;
        _this._power = _power;
        _this._speed = 50;
        _this._offset = 0;
        _this._owner = link.from.owner;
        _this._color = link.from.color;
        _this._position = link.from.position;
        _this._direction = link.to.position.sub(link.from.position).normalize();
        _this._offset = link.from.radius;
        _this._totalDistance = link.to.position.sub(link.from.position).length();
        _this.getProjectileSet().add(_this);
        return _this;
    }
    Object.defineProperty(Projectile.prototype, "power", {
        get: function () {
            return this._power;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Projectile.prototype, "owner", {
        get: function () {
            return this._owner;
        },
        enumerable: false,
        configurable: true
    });
    Projectile.prototype.Update = function (deltaTick) {
        var e_1, _a;
        this._offset += deltaTick * this._speed;
        try {
            for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(this.getOpositeProjectileSet()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var other = _c.value;
                if (this._offset < this._totalDistance - other._offset)
                    continue;
                if (this._owner == other._owner)
                    continue;
                var powerDiff = this._power - other._power;
                if (powerDiff > 0) {
                    this._power = powerDiff;
                    other.unlink();
                }
                else {
                    other._power = -powerDiff;
                    this.unlink();
                    return;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (this._offset > this._totalDistance - this.link.to.radius) {
            this.link.to.onHit(this);
            this.unlink();
        }
        else {
            this._position = this.link.from.position.add(this._direction.mul(this._offset));
        }
    };
    Projectile.prototype.getProjectileSet = function () {
        return this.link.link.getProjectileSet(this.link.isForward());
    };
    Projectile.prototype.getOpositeProjectileSet = function () {
        return this.link.link.getProjectileSet(!this.link.isForward());
    };
    Projectile.prototype.unlink = function () {
        this.getProjectileSet().delete(this);
        this.parent = undefined;
    };
    Projectile.prototype.getZIndex = function () {
        return _utils_CanvasLayer__WEBPACK_IMPORTED_MODULE_2__["CanvasLayer"].Projectiles;
    };
    Projectile.prototype.Draw = function (ctx) {
        ctx.fillStyle = this._color;
        ctx.shadowColor = '#ffffff50';
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(this._position.x, this._position.y, Math.log2(this._power + 2), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    };
    return Projectile;
}(_scene__WEBPACK_IMPORTED_MODULE_1__["SceneNode"]));



/***/ }),

/***/ "./src/zone/Zone.ts":
/*!**************************!*\
  !*** ./src/zone/Zone.ts ***!
  \**************************/
/*! exports provided: Zone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Zone", function() { return Zone; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/scene */ "./src/scene/index.ts");
/* harmony import */ var _zone_ZoneSelectionManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/zone/ZoneSelectionManager */ "./src/zone/ZoneSelectionManager.ts");
/* harmony import */ var _utils_CanvasLayer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/CanvasLayer */ "./src/utils/CanvasLayer.ts");
/* harmony import */ var _zone_Projectile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/zone/Projectile */ "./src/zone/Projectile.ts");
/* harmony import */ var _game_PlayerTemplate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/game/PlayerTemplate */ "./src/game/PlayerTemplate.ts");
/* harmony import */ var _game_EndScreen__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/game/EndScreen */ "./src/game/EndScreen.ts");







var Zone = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Zone, _super);
    function Zone(_position, _owner) {
        var _a;
        var _this = _super.call(this) || this;
        _this._position = _position;
        _this._links = new Set();
        _this.setOwner(_owner);
        _this._maxValue = 150;
        _this._value = (_owner == 0) ? 10 : 0;
        _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])([10, 0], 2), _this._maxShield = _a[0], _this._shield = _a[1];
        return _this;
    }
    Zone.prototype.onConnect = function () {
        var _this = this;
        _zone_ZoneSelectionManager__WEBPACK_IMPORTED_MODULE_2__["ZoneSelectionManager"].zones.add(this);
        this.nodeDisconnectedEvent.subscribe(function () {
            _zone_ZoneSelectionManager__WEBPACK_IMPORTED_MODULE_2__["ZoneSelectionManager"].zones.delete(_this);
        });
    };
    Object.defineProperty(Zone.prototype, "owner", {
        get: function () {
            return this._owner;
        },
        enumerable: false,
        configurable: true
    });
    Zone.prototype.setOwner = function (newOwner) {
        this._owner = newOwner;
        this._color = _game_PlayerTemplate__WEBPACK_IMPORTED_MODULE_5__["PlayerTemplates"].getTemplate(newOwner).color;
    };
    Object.defineProperty(Zone.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Zone.prototype, "shield", {
        get: function () {
            return this._shield;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Zone.prototype, "maxShield", {
        get: function () {
            return this._maxShield;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Zone.prototype, "position", {
        get: function () {
            return this._position;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Zone.prototype, "color", {
        get: function () {
            return this._color;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Zone.prototype, "links", {
        get: function () {
            return this._links;
        },
        enumerable: false,
        configurable: true
    });
    Zone.prototype.addLink = function (link) {
        this._links.add(link);
    };
    Zone.prototype.Update = function (deltaTime) {
        if (this._owner != 0) {
            this._value += deltaTime * 2;
            if (this._value > this._maxValue) {
                this._value = this._maxValue;
            }
        }
        this._shield += deltaTime * 3;
        if (this._shield > this._maxShield) {
            this._shield = this._maxShield;
        }
    };
    Object.defineProperty(Zone.prototype, "radius", {
        get: function () {
            return 18 + this._value / 5;
        },
        enumerable: false,
        configurable: true
    });
    Zone.prototype.getZIndex = function () {
        return _utils_CanvasLayer__WEBPACK_IMPORTED_MODULE_3__["CanvasLayer"].Zones;
    };
    Zone.prototype.fire = function (link, power) {
        _scene__WEBPACK_IMPORTED_MODULE_1__["Scene"].instance.addNode(new _zone_Projectile__WEBPACK_IMPORTED_MODULE_4__["Projectile"](link, power));
        this._value -= power;
    };
    Zone.prototype.onHit = function (projectile) {
        var friendly = projectile.owner == this.owner;
        if (friendly) {
            this._value += projectile.power;
        }
        else {
            this._shield -= projectile.power;
            if (this._shield < 0) {
                this._value += this._shield;
                this._shield = 0;
                if (this._value < 0) {
                    this.setOwner(projectile.owner);
                    this._value = -this.value;
                    this.checkWinCondition();
                }
            }
        }
    };
    Zone.prototype.checkWinCondition = function () {
        var e_1, _a;
        var lastPlayerRemaining = this.lastPlayerRemaining();
        if (!lastPlayerRemaining)
            return;
        try {
            for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(_scene__WEBPACK_IMPORTED_MODULE_1__["Scene"].instance.childrens), _c = _b.next(); !_c.done; _c = _b.next()) {
                var node = _c.value;
                node.parent = undefined;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        _scene__WEBPACK_IMPORTED_MODULE_1__["Scene"].instance.addNode(new _game_EndScreen__WEBPACK_IMPORTED_MODULE_6__["EndScreen"]((lastPlayerRemaining == 1) ? 'WIN' : 'LOST'));
    };
    Zone.prototype.lastPlayerRemaining = function () {
        var e_2, _a;
        var remainingOwner = undefined;
        try {
            for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(_zone_ZoneSelectionManager__WEBPACK_IMPORTED_MODULE_2__["ZoneSelectionManager"].zones), _c = _b.next(); !_c.done; _c = _b.next()) {
                var zone = _c.value;
                if (zone.owner == 0)
                    continue;
                if (zone.owner == remainingOwner)
                    continue;
                if (remainingOwner != undefined)
                    return undefined;
                remainingOwner = zone.owner;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return remainingOwner;
    };
    Zone.prototype.Draw = function (ctx) {
        var radius = this.radius;
        ctx.beginPath();
        ctx.arc(this._position.x, this._position.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.fillStyle = this._color + '90';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this._position.x, this._position.y, radius - 2, 0, Math.PI * 2);
        ctx.lineWidth = 5;
        ctx.setLineDash([]);
        ctx.strokeStyle = this._color + '20';
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this._position.x, this._position.y, radius - 4, 0, Math.PI * 2);
        ctx.lineWidth = 7;
        ctx.setLineDash([]);
        ctx.strokeStyle = this._color + '20';
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this._position.x, this._position.y, radius, 0, Math.PI * 2);
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.strokeStyle = this._color;
        ctx.stroke();
        // const shieldRadius = radius + 4
        // ctx.beginPath()
        // ctx.arc(this._position.x, this._position.y, shieldRadius, 0, Math.PI * 2)
        // ctx.strokeStyle = this._color
        // ctx.lineWidth = 4
        // ctx.setLineDash([Math.PI * shieldRadius / Math.log2(this._value)])
        // ctx.stroke()
        var shieldRadius = radius - 6;
        ctx.beginPath();
        ctx.arc(this._position.x, this._position.y, shieldRadius, 0, Math.PI * 2 * this._shield / this._maxShield);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.setLineDash([0, Math.PI * shieldRadius * 2 / this._maxShield]);
        ctx.stroke();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#1a1805';
        ctx.font = '20px serif';
        ctx.fillText(Math.floor(this._value).toString(), this._position.x, this._position.y + 2);
    };
    return Zone;
}(_scene__WEBPACK_IMPORTED_MODULE_1__["SceneNode"]));



/***/ }),

/***/ "./src/zone/ZoneLink.ts":
/*!******************************!*\
  !*** ./src/zone/ZoneLink.ts ***!
  \******************************/
/*! exports provided: ZoneLink */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZoneLink", function() { return ZoneLink; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/scene */ "./src/scene/index.ts");
/* harmony import */ var _utils_CanvasLayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/CanvasLayer */ "./src/utils/CanvasLayer.ts");
/* harmony import */ var _zone_DirectedLink__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/zone/DirectedLink */ "./src/zone/DirectedLink.ts");




var ZoneLink = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ZoneLink, _super);
    function ZoneLink(_from, _to) {
        var _this = _super.call(this) || this;
        _this._from = _from;
        _this._to = _to;
        _this.projectilesForward = new Set();
        _this.projectilesBackward = new Set();
        _from.addLink(_this);
        _to.addLink(_this);
        return _this;
    }
    Object.defineProperty(ZoneLink.prototype, "from", {
        get: function () {
            return this._from;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ZoneLink.prototype, "to", {
        get: function () {
            return this._to;
        },
        enumerable: false,
        configurable: true
    });
    ZoneLink.prototype.directedFrom = function (zone) {
        if (this._from == zone)
            return new _zone_DirectedLink__WEBPACK_IMPORTED_MODULE_3__["DirectedLink"](this, this._from, this._to);
        else
            return new _zone_DirectedLink__WEBPACK_IMPORTED_MODULE_3__["DirectedLink"](this, this._to, this._from);
    };
    ZoneLink.prototype.getProjectileSet = function (forward) {
        return forward ? this.projectilesForward : this.projectilesBackward;
    };
    ZoneLink.prototype.getZIndex = function () {
        return _utils_CanvasLayer__WEBPACK_IMPORTED_MODULE_2__["CanvasLayer"].ZoneLinks;
    };
    ZoneLink.prototype.Draw = function (ctx) {
        ctx.beginPath();
        ctx.lineWidth = 1.3;
        ctx.setLineDash([8]);
        ctx.lineTo(this._from.position.x, this._from.position.y);
        ctx.lineTo(this._to.position.x, this._to.position.y);
        ctx.strokeStyle = '#434349' + '80';
        ctx.stroke();
        var v = this._to.position.sub(this._from.position).orthogonal().normalize();
        ctx.beginPath();
        ctx.lineWidth = 0.2;
        ctx.setLineDash([]);
        ctx.lineTo(this._from.position.x + v.x * 2, this._from.position.y + v.y * 2);
        ctx.lineTo(this._to.position.x + v.x * 2, this._to.position.y + v.y * 2);
        ctx.strokeStyle = '#7d7f8d' + '50';
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 0.2;
        ctx.setLineDash([]);
        ctx.lineTo(this._from.position.x - v.x * 2, this._from.position.y - v.y * 2);
        ctx.lineTo(this._to.position.x - v.x * 2, this._to.position.y - v.y * 2);
        ctx.strokeStyle = '#7d7f8d' + '50';
        ctx.stroke();
    };
    return ZoneLink;
}(_scene__WEBPACK_IMPORTED_MODULE_1__["SceneNode"]));



/***/ }),

/***/ "./src/zone/ZonePing.ts":
/*!******************************!*\
  !*** ./src/zone/ZonePing.ts ***!
  \******************************/
/*! exports provided: ZonePing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZonePing", function() { return ZonePing; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/scene */ "./src/scene/index.ts");
/* harmony import */ var _utils_CanvasLayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/CanvasLayer */ "./src/utils/CanvasLayer.ts");



var ZonePing = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ZonePing, _super);
    function ZonePing(_target) {
        var _this = _super.call(this) || this;
        _this._target = _target;
        _this._phase = 0;
        _this._size = 0;
        return _this;
    }
    ZonePing.prototype.getZIndex = function () {
        return _utils_CanvasLayer__WEBPACK_IMPORTED_MODULE_2__["CanvasLayer"].ZoneSelection;
    };
    ZonePing.prototype.Update = function (deltaTick) {
        this._phase += deltaTick;
        this._size = this._target.radius - this._phase * (this._phase - ZonePing._INTERVAL) / ZonePing._SCALE;
        // if (this._phase>ZonePing._INTERVAL) {
        //   this.parent = undefined
        // }
        if (this._size < 0) {
            this.parent = undefined;
        }
    };
    ZonePing.prototype.Draw = function (ctx) {
        ctx.beginPath();
        ctx.arc(this._target.position.x, this._target.position.y, this._size, 0, Math.PI * 2);
        ctx.fillStyle = this._target.color + '80';
        ctx.fill();
    };
    ZonePing._INTERVAL = 0.5;
    ZonePing._SCALE = ZonePing._INTERVAL * ZonePing._INTERVAL / (4 * 20);
    return ZonePing;
}(_scene__WEBPACK_IMPORTED_MODULE_1__["SceneNode"]));



/***/ }),

/***/ "./src/zone/ZoneSelectionManager.ts":
/*!******************************************!*\
  !*** ./src/zone/ZoneSelectionManager.ts ***!
  \******************************************/
/*! exports provided: ZoneSelection, ZoneSelectionManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZoneSelection", function() { return ZoneSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZoneSelectionManager", function() { return ZoneSelectionManager; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/scene */ "./src/scene/index.ts");
/* harmony import */ var _utils_CanvasLayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/CanvasLayer */ "./src/utils/CanvasLayer.ts");



var AimProjection = /** @class */ (function () {
    function AimProjection(projectedTarget, projectedDistance, projectedLength, link) {
        this.projectedTarget = projectedTarget;
        this.projectedDistance = projectedDistance;
        this.projectedLength = projectedLength;
        this.link = link;
    }
    return AimProjection;
}());
var ZoneSelection = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ZoneSelection, _super);
    function ZoneSelection(_target) {
        var _this = _super.call(this) || this;
        _this._target = _target;
        return _this;
    }
    ZoneSelection.prototype.getZIndex = function () {
        return _utils_CanvasLayer__WEBPACK_IMPORTED_MODULE_2__["CanvasLayer"].ZoneSelection;
    };
    Object.defineProperty(ZoneSelection.prototype, "isAiming", {
        get: function () {
            return this._aimTarget !== undefined;
        },
        enumerable: false,
        configurable: true
    });
    ZoneSelection.prototype.fire = function () {
        if (this._aimTarget === undefined) {
            return;
        }
        var power = Math.floor(this._aimTarget.projectedLength * this._target.value);
        if (power > 0)
            this._target.fire(this._aimTarget.link, power);
    };
    ZoneSelection.prototype.Draw = function (ctx) {
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(this._target.position.x, this._target.position.y, this._target.radius + 10, 0, Math.PI * 2);
        ctx.lineWidth = 5;
        ctx.strokeStyle = this._target.color + '40';
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this._target.position.x, this._target.position.y, this._target.radius + 12, 0, Math.PI * 2);
        ctx.lineWidth = 1;
        ctx.strokeStyle = this._target.color + '80';
        ctx.stroke();
        if (this._aimTarget) {
            ctx.beginPath();
            ctx.lineTo(this._target.position.x, this._target.position.y);
            ctx.lineTo(this._aimTarget.projectedTarget.x, this._aimTarget.projectedTarget.y);
            ctx.lineWidth = 6;
            ctx.setLineDash([]);
            ctx.lineCap = 'round';
            ctx.strokeStyle = this._target.color + '90';
            ctx.stroke();
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#fff6c0';
            ctx.font = '14px serif';
            ctx.fillText(Math.floor(this._aimTarget.projectedLength * this._target.value).toString(), this._aimTarget.projectedTarget.x + 10, this._aimTarget.projectedTarget.y - 10);
        }
    };
    ZoneSelection.prototype.aim = function (point) {
        var _this = this;
        this._aimTarget = undefined;
        if (this._target.owner != 1)
            return;
        this._target.links.forEach(function (link) {
            var projection = _this.project(point, link);
            if (!projection)
                return;
            if (!_this._aimTarget || projection.projectedDistance < _this._aimTarget.projectedDistance)
                _this._aimTarget = projection;
        });
        if (this._aimTarget !== undefined) {
            var _aimTarget = this._aimTarget;
            if (_aimTarget.projectedDistance > 50) {
                this._aimTarget = undefined;
            }
        }
    };
    ZoneSelection.prototype.project = function (point, link) {
        var directedLink = link.directedFrom(this._target);
        var pStart = this._target.position;
        var pEnd = directedLink.to.position;
        var vLink = pEnd.sub(pStart);
        var vOrtho = vLink.orthogonal().normalize();
        var vD = point.sub(pStart);
        var W = vLink.x * vOrtho.y - vLink.y * vOrtho.x;
        var Wa = vD.x * vOrtho.y - vD.y * vOrtho.x;
        var Wb = vLink.x * vD.y - vLink.y * vD.x;
        var a = Wa / W;
        var b = Wb / W;
        if (a < 0 || a > 1)
            return undefined;
        var distance = vLink.length();
        var deadZoneSize = 20;
        var fromDeadZone = (this._target.radius + deadZoneSize) / distance;
        var toDeadZone = (directedLink.to.radius + deadZoneSize) / distance;
        var limitedPower = a;
        if (limitedPower < fromDeadZone)
            limitedPower = fromDeadZone;
        if (limitedPower > 1 - toDeadZone)
            limitedPower = 1 - toDeadZone;
        var scaledPower = (limitedPower - fromDeadZone) / (1 - fromDeadZone - toDeadZone);
        return new AimProjection(pStart.add(vLink.mul(limitedPower)), Math.abs(b), scaledPower, directedLink);
    };
    return ZoneSelection;
}(_scene__WEBPACK_IMPORTED_MODULE_1__["SceneNode"]));

var ZoneSelectionManager = /** @class */ (function () {
    function ZoneSelectionManager() {
    }
    Object.defineProperty(ZoneSelectionManager, "zones", {
        get: function () {
            return this._zones;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ZoneSelectionManager, "selection", {
        get: function () {
            return this._selection;
        },
        enumerable: false,
        configurable: true
    });
    ZoneSelectionManager.setTarget = function (target) {
        if (ZoneSelectionManager._selection !== undefined) {
            ZoneSelectionManager._selection.parent = undefined;
            ZoneSelectionManager._selection = undefined;
        }
        if (target !== undefined) {
            ZoneSelectionManager._selection = new ZoneSelection(target);
            _scene__WEBPACK_IMPORTED_MODULE_1__["Scene"].instance.addNode(ZoneSelectionManager._selection);
        }
    };
    ZoneSelectionManager._zones = new Set();
    return ZoneSelectionManager;
}());



/***/ }),

/***/ "./src/zone/index.ts":
/*!***************************!*\
  !*** ./src/zone/index.ts ***!
  \***************************/
/*! exports provided: Zone, ZoneLink, DirectedLink, ZonePing, ZoneSelection, ZoneSelectionManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Zone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Zone */ "./src/zone/Zone.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Zone", function() { return _Zone__WEBPACK_IMPORTED_MODULE_0__["Zone"]; });

/* harmony import */ var _ZoneLink__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ZoneLink */ "./src/zone/ZoneLink.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ZoneLink", function() { return _ZoneLink__WEBPACK_IMPORTED_MODULE_1__["ZoneLink"]; });

/* harmony import */ var _DirectedLink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DirectedLink */ "./src/zone/DirectedLink.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DirectedLink", function() { return _DirectedLink__WEBPACK_IMPORTED_MODULE_2__["DirectedLink"]; });

/* harmony import */ var _ZonePing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ZonePing */ "./src/zone/ZonePing.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ZonePing", function() { return _ZonePing__WEBPACK_IMPORTED_MODULE_3__["ZonePing"]; });

/* harmony import */ var _ZoneSelectionManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ZoneSelectionManager */ "./src/zone/ZoneSelectionManager.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ZoneSelection", function() { return _ZoneSelectionManager__WEBPACK_IMPORTED_MODULE_4__["ZoneSelection"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ZoneSelectionManager", function() { return _ZoneSelectionManager__WEBPACK_IMPORTED_MODULE_4__["ZoneSelectionManager"]; });








/***/ })

/******/ });
//# sourceMappingURL=app.b7c2d4533c58665d0d2e.js.map