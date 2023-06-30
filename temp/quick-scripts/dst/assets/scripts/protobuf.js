
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/protobuf.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f28ba3pGVlLR6xnGfV2Gugq', 'protobuf');
// scripts/protobuf.js

"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * protobuf.js v6.8.6 (c) 2016, daniel wirtz
 * compiled mon, 26 feb 2018 11:35:34 utc
 * licensed under the bsd-3-clause license
 * see: https://github.com/dcodeio/protobuf.js for details
 */
(function (global, undefined) {
  "use strict";

  (function prelude(modules, cache, entries) {
    // This is the prelude used to bundle protobuf.js for the browser. Wraps up the CommonJS
    // sources through a conflict-free require shim and is again wrapped within an iife that
    // provides a unified `global` and a minification-friendly `undefined` var plus a global
    // "use strict" directive so that minification can remove the directives of each module.
    function $require(name) {
      var $module = cache[name];
      if (!$module) modules[name][0].call($module = cache[name] = {
        exports: {}
      }, $require, $module, $module.exports);
      return $module.exports;
    } // Expose globally


    var protobuf = global.protobuf = $require(entries[0]); // Be nice to AMD

    if (typeof define === "function" && define.amd) define(["long"], function (Long) {
      if (Long && Long.isLong) {
        protobuf.util.Long = Long;
        protobuf.configure();
      }

      return protobuf;
    }); // Be nice to CommonJS

    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module && module.exports) module.exports = protobuf;
  })(
  /* end of prelude */
  {
    1: [function (require, module, exports) {
      "use strict";

      module.exports = asPromise;
      /**
       * Callback as used by {@link util.asPromise}.
       * @typedef asPromiseCallback
       * @type {function}
       * @param {Error|null} error Error, if any
       * @param {...*} params Additional arguments
       * @returns {undefined}
       */

      /**
       * Returns a promise from a node-style callback function.
       * @memberof util
       * @param {asPromiseCallback} fn Function to call
       * @param {*} ctx Function context
       * @param {...*} params Function arguments
       * @returns {Promise<*>} Promisified function
       */

      function asPromise(fn, ctx
      /*, varargs */
      ) {
        var params = new Array(arguments.length - 1),
            offset = 0,
            index = 2,
            pending = true;

        while (index < arguments.length) {
          params[offset++] = arguments[index++];
        }

        return new Promise(function executor(resolve, reject) {
          params[offset] = function callback(err
          /*, varargs */
          ) {
            if (pending) {
              pending = false;
              if (err) reject(err);else {
                var params = new Array(arguments.length - 1),
                    offset = 0;

                while (offset < params.length) {
                  params[offset++] = arguments[offset];
                }

                resolve.apply(null, params);
              }
            }
          };

          try {
            fn.apply(ctx || null, params);
          } catch (err) {
            if (pending) {
              pending = false;
              reject(err);
            }
          }
        });
      }
    }, {}],
    2: [function (require, module, exports) {
      "use strict";
      /**
       * A minimal base64 implementation for number arrays.
       * @memberof util
       * @namespace
       */

      var base64 = exports;
      /**
       * Calculates the byte length of a base64 encoded string.
       * @param {string} string Base64 encoded string
       * @returns {number} Byte length
       */

      base64.length = function length(string) {
        var p = string.length;
        if (!p) return 0;
        var n = 0;

        while (--p % 4 > 1 && string.charAt(p) === "=") {
          ++n;
        }

        return Math.ceil(string.length * 3) / 4 - n;
      }; // Base64 encoding table


      var b64 = new Array(64); // Base64 decoding table

      var s64 = new Array(123); // 65..90, 97..122, 48..57, 43, 47

      for (var i = 0; i < 64;) {
        s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
      }
      /**
       * Encodes a buffer to a base64 encoded string.
       * @param {Uint8Array} buffer Source buffer
       * @param {number} start Source start
       * @param {number} end Source end
       * @returns {string} Base64 encoded string
       */


      base64.encode = function encode(buffer, start, end) {
        var parts = null,
            chunk = [];
        var i = 0,
            // output index
        j = 0,
            // goto index
        t; // temporary

        while (start < end) {
          var b = buffer[start++];

          switch (j) {
            case 0:
              chunk[i++] = b64[b >> 2];
              t = (b & 3) << 4;
              j = 1;
              break;

            case 1:
              chunk[i++] = b64[t | b >> 4];
              t = (b & 15) << 2;
              j = 2;
              break;

            case 2:
              chunk[i++] = b64[t | b >> 6];
              chunk[i++] = b64[b & 63];
              j = 0;
              break;
          }

          if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
          }
        }

        if (j) {
          chunk[i++] = b64[t];
          chunk[i++] = 61;
          if (j === 1) chunk[i++] = 61;
        }

        if (parts) {
          if (i) parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
          return parts.join("");
        }

        return String.fromCharCode.apply(String, chunk.slice(0, i));
      };

      var invalidEncoding = "invalid encoding";
      /**
       * Decodes a base64 encoded string to a buffer.
       * @param {string} string Source string
       * @param {Uint8Array} buffer Destination buffer
       * @param {number} offset Destination offset
       * @returns {number} Number of bytes written
       * @throws {Error} If encoding is invalid
       */

      base64.decode = function decode(string, buffer, offset) {
        var start = offset;
        var j = 0,
            // goto index
        t; // temporary

        for (var i = 0; i < string.length;) {
          var c = string.charCodeAt(i++);
          if (c === 61 && j > 1) break;
          if ((c = s64[c]) === undefined) throw Error(invalidEncoding);

          switch (j) {
            case 0:
              t = c;
              j = 1;
              break;

            case 1:
              buffer[offset++] = t << 2 | (c & 48) >> 4;
              t = c;
              j = 2;
              break;

            case 2:
              buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
              t = c;
              j = 3;
              break;

            case 3:
              buffer[offset++] = (t & 3) << 6 | c;
              j = 0;
              break;
          }
        }

        if (j === 1) throw Error(invalidEncoding);
        return offset - start;
      };
      /**
       * Tests if the specified string appears to be base64 encoded.
       * @param {string} string String to test
       * @returns {boolean} `true` if probably base64 encoded, otherwise false
       */


      base64.test = function test(string) {
        return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
      };
    }, {}],
    3: [function (require, module, exports) {
      "use strict";

      module.exports = codegen;
      /**
       * Begins generating a function.
       * @memberof util
       * @param {string[]} functionParams Function parameter names
       * @param {string} [functionName] Function name if not anonymous
       * @returns {Codegen} Appender that appends code to the function's body
       */

      function codegen(functionParams, functionName) {
        /* istanbul ignore if */
        if (typeof functionParams === "string") {
          functionName = functionParams;
          functionParams = undefined;
        }

        var body = [];
        /**
         * Appends code to the function's body or finishes generation.
         * @typedef Codegen
         * @type {function}
         * @param {string|Object.<string,*>} [formatStringOrScope] Format string or, to finish the function, an object of additional scope variables, if any
         * @param {...*} [formatParams] Format parameters
         * @returns {Codegen|Function} Itself or the generated function if finished
         * @throws {Error} If format parameter counts do not match
         */

        function Codegen(formatStringOrScope) {
          // note that explicit array handling below makes this ~50% faster
          // finish the function
          if (typeof formatStringOrScope !== "string") {
            var source = toString();
            if (codegen.verbose) console.log("codegen: " + source); // eslint-disable-line no-console

            source = "return " + source;

            if (formatStringOrScope) {
              var scopeKeys = Object.keys(formatStringOrScope),
                  scopeParams = new Array(scopeKeys.length + 1),
                  scopeValues = new Array(scopeKeys.length),
                  scopeOffset = 0;

              while (scopeOffset < scopeKeys.length) {
                scopeParams[scopeOffset] = scopeKeys[scopeOffset];
                scopeValues[scopeOffset] = formatStringOrScope[scopeKeys[scopeOffset++]];
              }

              scopeParams[scopeOffset] = source;
              return Function.apply(null, scopeParams).apply(null, scopeValues); // eslint-disable-line no-new-func
            }

            return Function(source)(); // eslint-disable-line no-new-func
          } // otherwise append to body


          var formatParams = new Array(arguments.length - 1),
              formatOffset = 0;

          while (formatOffset < formatParams.length) {
            formatParams[formatOffset] = arguments[++formatOffset];
          }

          formatOffset = 0;
          formatStringOrScope = formatStringOrScope.replace(/%([%dfijs])/g, function replace($0, $1) {
            var value = formatParams[formatOffset++];

            switch ($1) {
              case "d":
              case "f":
                return String(Number(value));

              case "i":
                return String(Math.floor(value));

              case "j":
                return JSON.stringify(value);

              case "s":
                return String(value);
            }

            return "%";
          });
          if (formatOffset !== formatParams.length) throw Error("parameter count mismatch");
          body.push(formatStringOrScope);
          return Codegen;
        }

        function toString(functionNameOverride) {
          return "function " + (functionNameOverride || functionName || "") + "(" + (functionParams && functionParams.join(",") || "") + "){\n  " + body.join("\n  ") + "\n}";
        }

        Codegen.toString = toString;
        return Codegen;
      }
      /**
       * Begins generating a function.
       * @memberof util
       * @function codegen
       * @param {string} [functionName] Function name if not anonymous
       * @returns {Codegen} Appender that appends code to the function's body
       * @variation 2
       */

      /**
       * When set to `true`, codegen will log generated code to console. Useful for debugging.
       * @name util.codegen.verbose
       * @type {boolean}
       */


      codegen.verbose = false;
    }, {}],
    4: [function (require, module, exports) {
      "use strict";

      module.exports = EventEmitter;
      /**
       * Constructs a new event emitter instance.
       * @classdesc A minimal event emitter.
       * @memberof util
       * @constructor
       */

      function EventEmitter() {
        /**
         * Registered listeners.
         * @type {Object.<string,*>}
         * @private
         */
        this._listeners = {};
      }
      /**
       * Registers an event listener.
       * @param {string} evt Event name
       * @param {function} fn Listener
       * @param {*} [ctx] Listener context
       * @returns {util.EventEmitter} `this`
       */


      EventEmitter.prototype.on = function on(evt, fn, ctx) {
        (this._listeners[evt] || (this._listeners[evt] = [])).push({
          fn: fn,
          ctx: ctx || this
        });
        return this;
      };
      /**
       * Removes an event listener or any matching listeners if arguments are omitted.
       * @param {string} [evt] Event name. Removes all listeners if omitted.
       * @param {function} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
       * @returns {util.EventEmitter} `this`
       */


      EventEmitter.prototype.off = function off(evt, fn) {
        if (evt === undefined) this._listeners = {};else {
          if (fn === undefined) this._listeners[evt] = [];else {
            var listeners = this._listeners[evt];

            for (var i = 0; i < listeners.length;) {
              if (listeners[i].fn === fn) listeners.splice(i, 1);else ++i;
            }
          }
        }
        return this;
      };
      /**
       * Emits an event by calling its listeners with the specified arguments.
       * @param {string} evt Event name
       * @param {...*} args Arguments
       * @returns {util.EventEmitter} `this`
       */


      EventEmitter.prototype.emit = function emit(evt) {
        var listeners = this._listeners[evt];

        if (listeners) {
          var args = [],
              i = 1;

          for (; i < arguments.length;) {
            args.push(arguments[i++]);
          }

          for (i = 0; i < listeners.length;) {
            listeners[i].fn.apply(listeners[i++].ctx, args);
          }
        }

        return this;
      };
    }, {}],
    5: [function (require, module, exports) {
      "use strict";

      module.exports = fetch;

      var asPromise = require(1),
          inquire = require(7);

      var fs = inquire("fs");
      /**
       * Node-style callback as used by {@link util.fetch}.
       * @typedef FetchCallback
       * @type {function}
       * @param {?Error} error Error, if any, otherwise `null`
       * @param {string} [contents] File contents, if there hasn't been an error
       * @returns {undefined}
       */

      /**
       * Options as used by {@link util.fetch}.
       * @typedef FetchOptions
       * @type {Object}
       * @property {boolean} [binary=false] Whether expecting a binary response
       * @property {boolean} [xhr=false] If `true`, forces the use of XMLHttpRequest
       */

      /**
       * Fetches the contents of a file.
       * @memberof util
       * @param {string} filename File path or url
       * @param {FetchOptions} options Fetch options
       * @param {FetchCallback} callback Callback function
       * @returns {undefined}
       */

      function fetch(filename, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = {};
        } else if (!options) options = {};

        if (!callback) return asPromise(fetch, this, filename, options); // eslint-disable-line no-invalid-this
        // if a node-like filesystem is present, try it first but fall back to XHR if nothing is found.

        if (!options.xhr && fs && fs.readFile) return fs.readFile(filename, function fetchReadFileCallback(err, contents) {
          return err && typeof XMLHttpRequest !== "undefined" ? fetch.xhr(filename, options, callback) : err ? callback(err) : callback(null, options.binary ? contents : contents.toString("utf8"));
        }); // use the XHR version otherwise.

        return fetch.xhr(filename, options, callback);
      }

      function fetch1(filename, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = {};
        } else if (!options) options = {};

        if (!callback) return asPromise(fetch, this, filename, options); // eslint-disable-line no-invalid-this

        if (typeof cc !== "undefined") {
          //判断是否是cocos项目
          if (cc.sys.isNative) {
            //native
            var content = jsb.fileUtils.getStringFromFile(filename); //对于一些新版的creator(作者creator2.3.2)来说，他会把资源混淆在不同的目录下，所以这里是没办法找到该文件的,直接使用cc.loader的loadRes方法尝试加载一次。

            if (content === "") {
              cc.loader.loadRes(filename, cc.TextAsset, function (error, result) {
                cc.log("error1=" + error + ",result = " + result + ",type=" + _typeof(result));

                if (error) {
                  callback(Error("status " + error));
                } else {
                  //callback(null, result);//creator1.9及以下版本使用此行
                  callback(null, result.text); //新版creator可放心运行
                }
              });
            } else {
              callback(content === "" ? Error(filename + " not exits") : null, content);
            }
          } else {
            //cc.log("cc.loader load 1 filename=" + filename);
            //这里可以加载一个url图片 : "Host"+filename
            // cc.loader.load(filename, function (error, result) {
            //     cc.log("error1=" + error + ",result = " + result + ",type=" + typeof result);
            //     // callback(null, result);
            // });
            //cc.log("cc.loader load 2");
            // 这里h5会去加载resources目录下的文件 : "resources/"+ filename
            // 这里filename一般不用指定扩展名,当然你也可以强制指定
            cc.loader.loadRes(filename, cc.TextAsset, function (error, result) {
              //cc.log("error2=" + error + ",result = " + result + ",type=" + typeof result);
              if (error) {
                callback(Error("status " + error));
              } else {
                //callback(null, result);//creator1.9及以下版本使用此行
                callback(null, result.text); //新版creator可放心运行
              }
            }); //cc.log("cc.loader load 3");
          }

          return;
        } // if a node-like filesystem is present, try it first but fall back to XHR if nothing is found.


        if (!options.xhr && fs && fs.readFile) return fs.readFile(filename, function fetchReadFileCallback(err, contents) {
          return err && typeof XMLHttpRequest !== "undefined" ? fetch.xhr(filename, options, callback) : err ? callback(err) : callback(null, options.binary ? contents : contents.toString("utf8"));
        }); // use the XHR version otherwise.

        return fetch.xhr(filename, options, callback);
      }
      /**
       * Fetches the contents of a file.
       * @name util.fetch
       * @function
       * @param {string} path File path or url
       * @param {FetchCallback} callback Callback function
       * @returns {undefined}
       * @variation 2
       */

      /**
       * Fetches the contents of a file.
       * @name util.fetch
       * @function
       * @param {string} path File path or url
       * @param {FetchOptions} [options] Fetch options
       * @returns {Promise<string|Uint8Array>} Promise
       * @variation 3
       */

      /**/


      fetch.xhr = function fetch_xhr(filename, options, callback) {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange
        /* works everywhere */
        = function fetchOnReadyStateChange() {
          if (xhr.readyState !== 4) return undefined; // local cors security errors return status 0 / empty string, too. afaik this cannot be
          // reliably distinguished from an actually empty file for security reasons. feel free
          // to send a pull request if you are aware of a solution.

          if (xhr.status !== 0 && xhr.status !== 200) return callback(Error("status " + xhr.status)); // if binary data is expected, make sure that some sort of array is returned, even if
          // ArrayBuffers are not supported. the binary string fallback, however, is unsafe.

          if (options.binary) {
            var buffer = xhr.response;

            if (!buffer) {
              buffer = [];

              for (var i = 0; i < xhr.responseText.length; ++i) {
                buffer.push(xhr.responseText.charCodeAt(i) & 255);
              }
            }

            return callback(null, typeof Uint8Array !== "undefined" ? new Uint8Array(buffer) : buffer);
          }

          return callback(null, xhr.responseText);
        };

        if (options.binary) {
          // ref: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data#Receiving_binary_data_in_older_browsers
          if ("overrideMimeType" in xhr) xhr.overrideMimeType("text/plain; charset=x-user-defined");
          xhr.responseType = "arraybuffer";
        }

        xhr.open("GET", filename);
        xhr.send();
      };
    }, {
      "1": 1,
      "7": 7
    }],
    6: [function (require, module, exports) {
      "use strict";

      module.exports = factory(factory);
      /**
       * Reads / writes floats / doubles from / to buffers.
       * @name util.float
       * @namespace
       */

      /**
       * Writes a 32 bit float to a buffer using little endian byte order.
       * @name util.float.writeFloatLE
       * @function
       * @param {number} val Value to write
       * @param {Uint8Array} buf Target buffer
       * @param {number} pos Target buffer offset
       * @returns {undefined}
       */

      /**
       * Writes a 32 bit float to a buffer using big endian byte order.
       * @name util.float.writeFloatBE
       * @function
       * @param {number} val Value to write
       * @param {Uint8Array} buf Target buffer
       * @param {number} pos Target buffer offset
       * @returns {undefined}
       */

      /**
       * Reads a 32 bit float from a buffer using little endian byte order.
       * @name util.float.readFloatLE
       * @function
       * @param {Uint8Array} buf Source buffer
       * @param {number} pos Source buffer offset
       * @returns {number} Value read
       */

      /**
       * Reads a 32 bit float from a buffer using big endian byte order.
       * @name util.float.readFloatBE
       * @function
       * @param {Uint8Array} buf Source buffer
       * @param {number} pos Source buffer offset
       * @returns {number} Value read
       */

      /**
       * Writes a 64 bit double to a buffer using little endian byte order.
       * @name util.float.writeDoubleLE
       * @function
       * @param {number} val Value to write
       * @param {Uint8Array} buf Target buffer
       * @param {number} pos Target buffer offset
       * @returns {undefined}
       */

      /**
       * Writes a 64 bit double to a buffer using big endian byte order.
       * @name util.float.writeDoubleBE
       * @function
       * @param {number} val Value to write
       * @param {Uint8Array} buf Target buffer
       * @param {number} pos Target buffer offset
       * @returns {undefined}
       */

      /**
       * Reads a 64 bit double from a buffer using little endian byte order.
       * @name util.float.readDoubleLE
       * @function
       * @param {Uint8Array} buf Source buffer
       * @param {number} pos Source buffer offset
       * @returns {number} Value read
       */

      /**
       * Reads a 64 bit double from a buffer using big endian byte order.
       * @name util.float.readDoubleBE
       * @function
       * @param {Uint8Array} buf Source buffer
       * @param {number} pos Source buffer offset
       * @returns {number} Value read
       */
      // Factory function for the purpose of node-based testing in modified global environments

      function factory(exports) {
        // float: typed array
        if (typeof Float32Array !== "undefined") (function () {
          var f32 = new Float32Array([-0]),
              f8b = new Uint8Array(f32.buffer),
              le = f8b[3] === 128;

          function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
          }

          function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
          }
          /* istanbul ignore next */


          exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
          /* istanbul ignore next */

          exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;

          function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
          }

          function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
          }
          /* istanbul ignore next */


          exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
          /* istanbul ignore next */

          exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy; // float: ieee754
        })();else (function () {
          function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign) val = -val;
            if (val === 0) writeUint(1 / val > 0 ?
            /* positive */
            0 :
            /* negative 0 */
            2147483648, buf, pos);else if (isNaN(val)) writeUint(2143289344, buf, pos);else if (val > 3.4028234663852886e+38) // +-Infinity
              writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);else if (val < 1.1754943508222875e-38) // denormal
              writeUint((sign << 31 | Math.round(val / 1.401298464324817e-45)) >>> 0, buf, pos);else {
              var exponent = Math.floor(Math.log(val) / Math.LN2),
                  mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
              writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
          }

          exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
          exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);

          function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos),
                sign = (uint >> 31) * 2 + 1,
                exponent = uint >>> 23 & 255,
                mantissa = uint & 8388607;
            return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 // denormal
            ? sign * 1.401298464324817e-45 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
          }

          exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
          exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
        })(); // double: typed array

        if (typeof Float64Array !== "undefined") (function () {
          var f64 = new Float64Array([-0]),
              f8b = new Uint8Array(f64.buffer),
              le = f8b[7] === 128;

          function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
          }

          function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
          }
          /* istanbul ignore next */


          exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
          /* istanbul ignore next */

          exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;

          function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
          }

          function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
          }
          /* istanbul ignore next */


          exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
          /* istanbul ignore next */

          exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy; // double: ieee754
        })();else (function () {
          function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign) val = -val;

            if (val === 0) {
              writeUint(0, buf, pos + off0);
              writeUint(1 / val > 0 ?
              /* positive */
              0 :
              /* negative 0 */
              2147483648, buf, pos + off1);
            } else if (isNaN(val)) {
              writeUint(0, buf, pos + off0);
              writeUint(2146959360, buf, pos + off1);
            } else if (val > 1.7976931348623157e+308) {
              // +-Infinity
              writeUint(0, buf, pos + off0);
              writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
              var mantissa;

              if (val < 2.2250738585072014e-308) {
                // denormal
                mantissa = val / 5e-324;
                writeUint(mantissa >>> 0, buf, pos + off0);
                writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
              } else {
                var exponent = Math.floor(Math.log(val) / Math.LN2);
                if (exponent === 1024) exponent = 1023;
                mantissa = val * Math.pow(2, -exponent);
                writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
              }
            }
          }

          exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
          exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);

          function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0),
                hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1,
                exponent = hi >>> 20 & 2047,
                mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 // denormal
            ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
          }

          exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
          exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
        })();
        return exports;
      } // uint helpers


      function writeUintLE(val, buf, pos) {
        buf[pos] = val & 255;
        buf[pos + 1] = val >>> 8 & 255;
        buf[pos + 2] = val >>> 16 & 255;
        buf[pos + 3] = val >>> 24;
      }

      function writeUintBE(val, buf, pos) {
        buf[pos] = val >>> 24;
        buf[pos + 1] = val >>> 16 & 255;
        buf[pos + 2] = val >>> 8 & 255;
        buf[pos + 3] = val & 255;
      }

      function readUintLE(buf, pos) {
        return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
      }

      function readUintBE(buf, pos) {
        return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
      }
    }, {}],
    7: [function (require, module, exports) {
      "use strict";

      module.exports = inquire;
      /**
       * Requires a module only if available.
       * @memberof util
       * @param {string} moduleName Module to require
       * @returns {?Object} Required module if available and not empty, otherwise `null`
       */

      function inquire(moduleName) {
        try {
          var mod = eval("quire".replace(/^/, "re"))(moduleName); // eslint-disable-line no-eval

          if (mod && (mod.length || Object.keys(mod).length)) return mod;
        } catch (e) {} // eslint-disable-line no-empty


        return null;
      }
    }, {}],
    8: [function (require, module, exports) {
      "use strict";
      /**
       * A minimal path module to resolve Unix, Windows and URL paths alike.
       * @memberof util
       * @namespace
       */

      var path = exports;

      var isAbsolute =
      /**
       * Tests if the specified path is absolute.
       * @param {string} path Path to test
       * @returns {boolean} `true` if path is absolute
       */
      path.isAbsolute = function isAbsolute(path) {
        return /^(?:\/|\w+:)/.test(path);
      };

      var normalize =
      /**
       * Normalizes the specified path.
       * @param {string} path Path to normalize
       * @returns {string} Normalized path
       */
      path.normalize = function normalize(path) {
        path = path.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
        var parts = path.split("/"),
            absolute = isAbsolute(path),
            prefix = "";
        if (absolute) prefix = parts.shift() + "/";

        for (var i = 0; i < parts.length;) {
          if (parts[i] === "..") {
            if (i > 0 && parts[i - 1] !== "..") parts.splice(--i, 2);else if (absolute) parts.splice(i, 1);else ++i;
          } else if (parts[i] === ".") parts.splice(i, 1);else ++i;
        }

        return prefix + parts.join("/");
      };
      /**
       * Resolves the specified include path against the specified origin path.
       * @param {string} originPath Path to the origin file
       * @param {string} includePath Include path relative to origin path
       * @param {boolean} [alreadyNormalized=false] `true` if both paths are already known to be normalized
       * @returns {string} Path to the include file
       */


      path.resolve = function resolve(originPath, includePath, alreadyNormalized) {
        if (!alreadyNormalized) includePath = normalize(includePath);
        if (isAbsolute(includePath)) return includePath;
        if (!alreadyNormalized) originPath = normalize(originPath);
        return (originPath = originPath.replace(/(?:\/|^)[^/]+$/, "")).length ? normalize(originPath + "/" + includePath) : includePath;
      };
    }, {}],
    9: [function (require, module, exports) {
      "use strict";

      module.exports = pool;
      /**
       * An allocator as used by {@link util.pool}.
       * @typedef PoolAllocator
       * @type {function}
       * @param {number} size Buffer size
       * @returns {Uint8Array} Buffer
       */

      /**
       * A slicer as used by {@link util.pool}.
       * @typedef PoolSlicer
       * @type {function}
       * @param {number} start Start offset
       * @param {number} end End offset
       * @returns {Uint8Array} Buffer slice
       * @this {Uint8Array}
       */

      /**
       * A general purpose buffer pool.
       * @memberof util
       * @function
       * @param {PoolAllocator} alloc Allocator
       * @param {PoolSlicer} slice Slicer
       * @param {number} [size=8192] Slab size
       * @returns {PoolAllocator} Pooled allocator
       */

      function pool(alloc, slice, size) {
        var SIZE = size || 8192;
        var MAX = SIZE >>> 1;
        var slab = null;
        var offset = SIZE;
        return function pool_alloc(size) {
          if (size < 1 || size > MAX) return alloc(size);

          if (offset + size > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
          }

          var buf = slice.call(slab, offset, offset += size);
          if (offset & 7) // align to 32 bit
            offset = (offset | 7) + 1;
          return buf;
        };
      }
    }, {}],
    10: [function (require, module, exports) {
      "use strict";
      /**
       * A minimal UTF8 implementation for number arrays.
       * @memberof util
       * @namespace
       */

      var utf8 = exports;
      /**
       * Calculates the UTF8 byte length of a string.
       * @param {string} string String
       * @returns {number} Byte length
       */

      utf8.length = function utf8_length(string) {
        var len = 0,
            c = 0;

        for (var i = 0; i < string.length; ++i) {
          c = string.charCodeAt(i);
          if (c < 128) len += 1;else if (c < 2048) len += 2;else if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
            ++i;
            len += 4;
          } else len += 3;
        }

        return len;
      };
      /**
       * Reads UTF8 bytes as a string.
       * @param {Uint8Array} buffer Source buffer
       * @param {number} start Source start
       * @param {number} end Source end
       * @returns {string} String read
       */


      utf8.read = function utf8_read(buffer, start, end) {
        var len = end - start;
        if (len < 1) return "";
        var parts = null,
            chunk = [],
            i = 0,
            // char offset
        t; // temporary

        while (start < end) {
          t = buffer[start++];
          if (t < 128) chunk[i++] = t;else if (t > 191 && t < 224) chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;else if (t > 239 && t < 365) {
            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000;
            chunk[i++] = 0xD800 + (t >> 10);
            chunk[i++] = 0xDC00 + (t & 1023);
          } else chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;

          if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
          }
        }

        if (parts) {
          if (i) parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
          return parts.join("");
        }

        return String.fromCharCode.apply(String, chunk.slice(0, i));
      };
      /**
       * Writes a string as UTF8 bytes.
       * @param {string} string Source string
       * @param {Uint8Array} buffer Destination buffer
       * @param {number} offset Destination offset
       * @returns {number} Bytes written
       */


      utf8.write = function utf8_write(string, buffer, offset) {
        var start = offset,
            c1,
            // character 1
        c2; // character 2

        for (var i = 0; i < string.length; ++i) {
          c1 = string.charCodeAt(i);

          if (c1 < 128) {
            buffer[offset++] = c1;
          } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6 | 192;
            buffer[offset++] = c1 & 63 | 128;
          } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
            c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
            ++i;
            buffer[offset++] = c1 >> 18 | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
          } else {
            buffer[offset++] = c1 >> 12 | 224;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
          }
        }

        return offset - start;
      };
    }, {}],
    11: [function (require, module, exports) {
      "use strict";

      module.exports = common;
      var commonRe = /\/|\./;
      /**
       * Provides common type definitions.
       * Can also be used to provide additional google types or your own custom types.
       * @param {string} name Short name as in `google/protobuf/[name].proto` or full file name
       * @param {Object.<string,*>} json JSON definition within `google.protobuf` if a short name, otherwise the file's root definition
       * @returns {undefined}
       * @property {INamespace} google/protobuf/any.proto Any
       * @property {INamespace} google/protobuf/duration.proto Duration
       * @property {INamespace} google/protobuf/empty.proto Empty
       * @property {INamespace} google/protobuf/field_mask.proto FieldMask
       * @property {INamespace} google/protobuf/struct.proto Struct, Value, NullValue and ListValue
       * @property {INamespace} google/protobuf/timestamp.proto Timestamp
       * @property {INamespace} google/protobuf/wrappers.proto Wrappers
       * @example
       * // manually provides descriptor.proto (assumes google/protobuf/ namespace and .proto extension)
       * protobuf.common("descriptor", descriptorJson);
       *
       * // manually provides a custom definition (uses my.foo namespace)
       * protobuf.common("my/foo/bar.proto", myFooBarJson);
       */

      function common(name, json) {
        if (!commonRe.test(name)) {
          name = "google/protobuf/" + name + ".proto";
          json = {
            nested: {
              google: {
                nested: {
                  protobuf: {
                    nested: json
                  }
                }
              }
            }
          };
        }

        common[name] = json;
      } // Not provided because of limited use (feel free to discuss or to provide yourself):
      //
      // google/protobuf/descriptor.proto
      // google/protobuf/source_context.proto
      // google/protobuf/type.proto
      //
      // Stripped and pre-parsed versions of these non-bundled files are instead available as part of
      // the repository or package within the google/protobuf directory.


      common("any", {
        /**
         * Properties of a google.protobuf.Any message.
         * @interface IAny
         * @type {Object}
         * @property {string} [typeUrl]
         * @property {Uint8Array} [bytes]
         * @memberof common
         */
        Any: {
          fields: {
            type_url: {
              type: "string",
              id: 1
            },
            value: {
              type: "bytes",
              id: 2
            }
          }
        }
      });
      var timeType;
      common("duration", {
        /**
         * Properties of a google.protobuf.Duration message.
         * @interface IDuration
         * @type {Object}
         * @property {number|Long} [seconds]
         * @property {number} [nanos]
         * @memberof common
         */
        Duration: timeType = {
          fields: {
            seconds: {
              type: "int64",
              id: 1
            },
            nanos: {
              type: "int32",
              id: 2
            }
          }
        }
      });
      common("timestamp", {
        /**
         * Properties of a google.protobuf.Timestamp message.
         * @interface ITimestamp
         * @type {Object}
         * @property {number|Long} [seconds]
         * @property {number} [nanos]
         * @memberof common
         */
        Timestamp: timeType
      });
      common("empty", {
        /**
         * Properties of a google.protobuf.Empty message.
         * @interface IEmpty
         * @memberof common
         */
        Empty: {
          fields: {}
        }
      });
      common("struct", {
        /**
         * Properties of a google.protobuf.Struct message.
         * @interface IStruct
         * @type {Object}
         * @property {Object.<string,IValue>} [fields]
         * @memberof common
         */
        Struct: {
          fields: {
            fields: {
              keyType: "string",
              type: "Value",
              id: 1
            }
          }
        },

        /**
         * Properties of a google.protobuf.Value message.
         * @interface IValue
         * @type {Object}
         * @property {string} [kind]
         * @property {0} [nullValue]
         * @property {number} [numberValue]
         * @property {string} [stringValue]
         * @property {boolean} [boolValue]
         * @property {IStruct} [structValue]
         * @property {IListValue} [listValue]
         * @memberof common
         */
        Value: {
          oneofs: {
            kind: {
              oneof: ["nullValue", "numberValue", "stringValue", "boolValue", "structValue", "listValue"]
            }
          },
          fields: {
            nullValue: {
              type: "NullValue",
              id: 1
            },
            numberValue: {
              type: "double",
              id: 2
            },
            stringValue: {
              type: "string",
              id: 3
            },
            boolValue: {
              type: "bool",
              id: 4
            },
            structValue: {
              type: "Struct",
              id: 5
            },
            listValue: {
              type: "ListValue",
              id: 6
            }
          }
        },
        NullValue: {
          values: {
            NULL_VALUE: 0
          }
        },

        /**
         * Properties of a google.protobuf.ListValue message.
         * @interface IListValue
         * @type {Object}
         * @property {Array.<IValue>} [values]
         * @memberof common
         */
        ListValue: {
          fields: {
            values: {
              rule: "repeated",
              type: "Value",
              id: 1
            }
          }
        }
      });
      common("wrappers", {
        /**
         * Properties of a google.protobuf.DoubleValue message.
         * @interface IDoubleValue
         * @type {Object}
         * @property {number} [value]
         * @memberof common
         */
        DoubleValue: {
          fields: {
            value: {
              type: "double",
              id: 1
            }
          }
        },

        /**
         * Properties of a google.protobuf.FloatValue message.
         * @interface IFloatValue
         * @type {Object}
         * @property {number} [value]
         * @memberof common
         */
        FloatValue: {
          fields: {
            value: {
              type: "float",
              id: 1
            }
          }
        },

        /**
         * Properties of a google.protobuf.Int64Value message.
         * @interface IInt64Value
         * @type {Object}
         * @property {number|Long} [value]
         * @memberof common
         */
        Int64Value: {
          fields: {
            value: {
              type: "int64",
              id: 1
            }
          }
        },

        /**
         * Properties of a google.protobuf.UInt64Value message.
         * @interface IUInt64Value
         * @type {Object}
         * @property {number|Long} [value]
         * @memberof common
         */
        UInt64Value: {
          fields: {
            value: {
              type: "uint64",
              id: 1
            }
          }
        },

        /**
         * Properties of a google.protobuf.Int32Value message.
         * @interface IInt32Value
         * @type {Object}
         * @property {number} [value]
         * @memberof common
         */
        Int32Value: {
          fields: {
            value: {
              type: "int32",
              id: 1
            }
          }
        },

        /**
         * Properties of a google.protobuf.UInt32Value message.
         * @interface IUInt32Value
         * @type {Object}
         * @property {number} [value]
         * @memberof common
         */
        UInt32Value: {
          fields: {
            value: {
              type: "uint32",
              id: 1
            }
          }
        },

        /**
         * Properties of a google.protobuf.BoolValue message.
         * @interface IBoolValue
         * @type {Object}
         * @property {boolean} [value]
         * @memberof common
         */
        BoolValue: {
          fields: {
            value: {
              type: "bool",
              id: 1
            }
          }
        },

        /**
         * Properties of a google.protobuf.StringValue message.
         * @interface IStringValue
         * @type {Object}
         * @property {string} [value]
         * @memberof common
         */
        StringValue: {
          fields: {
            value: {
              type: "string",
              id: 1
            }
          }
        },

        /**
         * Properties of a google.protobuf.BytesValue message.
         * @interface IBytesValue
         * @type {Object}
         * @property {Uint8Array} [value]
         * @memberof common
         */
        BytesValue: {
          fields: {
            value: {
              type: "bytes",
              id: 1
            }
          }
        }
      });
      common("field_mask", {
        /**
         * Properties of a google.protobuf.FieldMask message.
         * @interface IDoubleValue
         * @type {Object}
         * @property {number} [value]
         * @memberof common
         */
        FieldMask: {
          fields: {
            paths: {
              rule: "repeated",
              type: "string",
              id: 1
            }
          }
        }
      });
      /**
       * Gets the root definition of the specified common proto file.
       *
       * Bundled definitions are:
       * - google/protobuf/any.proto
       * - google/protobuf/duration.proto
       * - google/protobuf/empty.proto
       * - google/protobuf/field_mask.proto
       * - google/protobuf/struct.proto
       * - google/protobuf/timestamp.proto
       * - google/protobuf/wrappers.proto
       *
       * @param {string} file Proto file name
       * @returns {INamespace|null} Root definition or `null` if not defined
       */

      common.get = function get(file) {
        return common[file] || null;
      };
    }, {}],
    12: [function (require, module, exports) {
      "use strict";
      /**
       * Runtime message from/to plain object converters.
       * @namespace
       */

      var converter = exports;

      var Enum = require(15),
          util = require(37);
      /**
       * Generates a partial value fromObject conveter.
       * @param {Codegen} gen Codegen instance
       * @param {Field} field Reflected field
       * @param {number} fieldIndex Field index
       * @param {string} prop Property reference
       * @returns {Codegen} Codegen instance
       * @ignore
       */


      function genValuePartial_fromObject(gen, field, fieldIndex, prop) {
        /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
        if (field.resolvedType) {
          if (field.resolvedType instanceof Enum) {
            gen("switch(d%s){", prop);

            for (var values = field.resolvedType.values, keys = Object.keys(values), i = 0; i < keys.length; ++i) {
              if (field.repeated && values[keys[i]] === field.typeDefault) gen("default:");
              gen("case%j:", keys[i])("case %i:", values[keys[i]])("m%s=%j", prop, values[keys[i]])("break");
            }

            gen("}");
          } else gen("if(typeof d%s!==\"object\")", prop)("throw TypeError(%j)", field.fullName + ": object expected")("m%s=types[%i].fromObject(d%s)", prop, fieldIndex, prop);
        } else {
          var isUnsigned = false;

          switch (field.type) {
            case "double":
            case "float":
              gen("m%s=Number(d%s)", prop, prop); // also catches "NaN", "Infinity"

              break;

            case "uint32":
            case "fixed32":
              gen("m%s=d%s>>>0", prop, prop);
              break;

            case "int32":
            case "sint32":
            case "sfixed32":
              gen("m%s=d%s|0", prop, prop);
              break;

            case "uint64":
              isUnsigned = true;
            // eslint-disable-line no-fallthrough

            case "int64":
            case "sint64":
            case "fixed64":
            case "sfixed64":
              gen("if(util.Long)")("(m%s=util.Long.fromValue(d%s)).unsigned=%j", prop, prop, isUnsigned)("else if(typeof d%s===\"string\")", prop)("m%s=parseInt(d%s,10)", prop, prop)("else if(typeof d%s===\"number\")", prop)("m%s=d%s", prop, prop)("else if(typeof d%s===\"object\")", prop)("m%s=new util.LongBits(d%s.low>>>0,d%s.high>>>0).toNumber(%s)", prop, prop, prop, isUnsigned ? "true" : "");
              break;

            case "bytes":
              gen("if(typeof d%s===\"string\")", prop)("util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)", prop, prop, prop)("else if(d%s.length)", prop)("m%s=d%s", prop, prop);
              break;

            case "string":
              gen("m%s=String(d%s)", prop, prop);
              break;

            case "bool":
              gen("m%s=Boolean(d%s)", prop, prop);
              break;

            /* default: gen
                ("m%s=d%s", prop, prop);
                break; */
          }
        }

        return gen;
        /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
      }
      /**
       * Generates a plain object to runtime message converter specific to the specified message type.
       * @param {Type} mtype Message type
       * @returns {Codegen} Codegen instance
       */


      converter.fromObject = function fromObject(mtype) {
        /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
        var fields = mtype.fieldsArray;
        var gen = util.codegen(["d"], mtype.name + "$fromObject")("if(d instanceof this.ctor)")("return d");
        if (!fields.length) return gen("return new this.ctor");
        gen("var m=new this.ctor");

        for (var i = 0; i < fields.length; ++i) {
          var field = fields[i].resolve(),
              prop = util.safeProp(field.name); // Map fields

          if (field.map) {
            gen("if(d%s){", prop)("if(typeof d%s!==\"object\")", prop)("throw TypeError(%j)", field.fullName + ": object expected")("m%s={}", prop)("for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){", prop);
            genValuePartial_fromObject(gen, field,
            /* not sorted */
            i, prop + "[ks[i]]")("}")("}"); // Repeated fields
          } else if (field.repeated) {
            gen("if(d%s){", prop)("if(!Array.isArray(d%s))", prop)("throw TypeError(%j)", field.fullName + ": array expected")("m%s=[]", prop)("for(var i=0;i<d%s.length;++i){", prop);
            genValuePartial_fromObject(gen, field,
            /* not sorted */
            i, prop + "[i]")("}")("}"); // Non-repeated fields
          } else {
            if (!(field.resolvedType instanceof Enum)) gen // no need to test for null/undefined if an enum (uses switch)
            ("if(d%s!=null){", prop); // !== undefined && !== null

            genValuePartial_fromObject(gen, field,
            /* not sorted */
            i, prop);
            if (!(field.resolvedType instanceof Enum)) gen("}");
          }
        }

        return gen("return m");
        /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
      };
      /**
       * Generates a partial value toObject converter.
       * @param {Codegen} gen Codegen instance
       * @param {Field} field Reflected field
       * @param {number} fieldIndex Field index
       * @param {string} prop Property reference
       * @returns {Codegen} Codegen instance
       * @ignore
       */


      function genValuePartial_toObject(gen, field, fieldIndex, prop) {
        /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
        if (field.resolvedType) {
          if (field.resolvedType instanceof Enum) gen("d%s=o.enums===String?types[%i].values[m%s]:m%s", prop, fieldIndex, prop, prop);else gen("d%s=types[%i].toObject(m%s,o)", prop, fieldIndex, prop);
        } else {
          var isUnsigned = false;

          switch (field.type) {
            case "double":
            case "float":
              gen("d%s=o.json&&!isFinite(m%s)?String(m%s):m%s", prop, prop, prop, prop);
              break;

            case "uint64":
              isUnsigned = true;
            // eslint-disable-line no-fallthrough

            case "int64":
            case "sint64":
            case "fixed64":
            case "sfixed64":
              gen("if(typeof m%s===\"number\")", prop)("d%s=o.longs===String?String(m%s):m%s", prop, prop, prop)("else") // Long-like
              ("d%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low>>>0,m%s.high>>>0).toNumber(%s):m%s", prop, prop, prop, prop, isUnsigned ? "true" : "", prop);
              break;

            case "bytes":
              gen("d%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s", prop, prop, prop, prop, prop);
              break;

            default:
              gen("d%s=m%s", prop, prop);
              break;
          }
        }

        return gen;
        /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
      }
      /**
       * Generates a runtime message to plain object converter specific to the specified message type.
       * @param {Type} mtype Message type
       * @returns {Codegen} Codegen instance
       */


      converter.toObject = function toObject(mtype) {
        /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
        var fields = mtype.fieldsArray.slice().sort(util.compareFieldsById);
        if (!fields.length) return util.codegen()("return {}");
        var gen = util.codegen(["m", "o"], mtype.name + "$toObject")("if(!o)")("o={}")("var d={}");
        var repeatedFields = [],
            mapFields = [],
            normalFields = [],
            i = 0;

        for (; i < fields.length; ++i) {
          if (!fields[i].partOf) (fields[i].resolve().repeated ? repeatedFields : fields[i].map ? mapFields : normalFields).push(fields[i]);
        }

        if (repeatedFields.length) {
          gen("if(o.arrays||o.defaults){");

          for (i = 0; i < repeatedFields.length; ++i) {
            gen("d%s=[]", util.safeProp(repeatedFields[i].name));
          }

          gen("}");
        }

        if (mapFields.length) {
          gen("if(o.objects||o.defaults){");

          for (i = 0; i < mapFields.length; ++i) {
            gen("d%s={}", util.safeProp(mapFields[i].name));
          }

          gen("}");
        }

        if (normalFields.length) {
          gen("if(o.defaults){");

          for (i = 0; i < normalFields.length; ++i) {
            var field = normalFields[i],
                prop = util.safeProp(field.name);
            if (field.resolvedType instanceof Enum) gen("d%s=o.enums===String?%j:%j", prop, field.resolvedType.valuesById[field.typeDefault], field.typeDefault);else if (field["long"]) gen("if(util.Long){")("var n=new util.Long(%i,%i,%j)", field.typeDefault.low, field.typeDefault.high, field.typeDefault.unsigned)("d%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():n", prop)("}else")("d%s=o.longs===String?%j:%i", prop, field.typeDefault.toString(), field.typeDefault.toNumber());else if (field.bytes) gen("d%s=o.bytes===String?%j:%s", prop, String.fromCharCode.apply(String, field.typeDefault), "[" + Array.prototype.slice.call(field.typeDefault).join(",") + "]");else gen("d%s=%j", prop, field.typeDefault); // also messages (=null)
          }

          gen("}");
        }

        var hasKs2 = false;

        for (i = 0; i < fields.length; ++i) {
          var field = fields[i],
              index = mtype._fieldsArray.indexOf(field),
              prop = util.safeProp(field.name);

          if (field.map) {
            if (!hasKs2) {
              hasKs2 = true;
              gen("var ks2");
            }

            gen("if(m%s&&(ks2=Object.keys(m%s)).length){", prop, prop)("d%s={}", prop)("for(var j=0;j<ks2.length;++j){");
            genValuePartial_toObject(gen, field,
            /* sorted */
            index, prop + "[ks2[j]]")("}");
          } else if (field.repeated) {
            gen("if(m%s&&m%s.length){", prop, prop)("d%s=[]", prop)("for(var j=0;j<m%s.length;++j){", prop);
            genValuePartial_toObject(gen, field,
            /* sorted */
            index, prop + "[j]")("}");
          } else {
            gen("if(m%s!=null&&m.hasOwnProperty(%j)){", prop, field.name); // !== undefined && !== null

            genValuePartial_toObject(gen, field,
            /* sorted */
            index, prop);
            if (field.partOf) gen("if(o.oneofs)")("d%s=%j", util.safeProp(field.partOf.name), field.name);
          }

          gen("}");
        }

        return gen("return d");
        /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
      };
    }, {
      "15": 15,
      "37": 37
    }],
    13: [function (require, module, exports) {
      "use strict";

      module.exports = decoder;

      var Enum = require(15),
          types = require(36),
          util = require(37);

      function missing(field) {
        return "missing required '" + field.name + "'";
      }
      /**
       * Generates a decoder specific to the specified message type.
       * @param {Type} mtype Message type
       * @returns {Codegen} Codegen instance
       */


      function decoder(mtype) {
        /* eslint-disable no-unexpected-multiline */
        var gen = util.codegen(["r", "l"], mtype.name + "$decode")("if(!(r instanceof Reader))")("r=Reader.create(r)")("var c=l===undefined?r.len:r.pos+l,m=new this.ctor" + (mtype.fieldsArray.filter(function (field) {
          return field.map;
        }).length ? ",k" : ""))("while(r.pos<c){")("var t=r.uint32()");
        if (mtype.group) gen("if((t&7)===4)")("break");
        gen("switch(t>>>3){");
        var i = 0;

        for (; i <
        /* initializes */
        mtype.fieldsArray.length; ++i) {
          var field = mtype._fieldsArray[i].resolve(),
              type = field.resolvedType instanceof Enum ? "int32" : field.type,
              ref = "m" + util.safeProp(field.name);

          gen("case %i:", field.id); // Map fields

          if (field.map) {
            gen("r.skip().pos++") // assumes id 1 + key wireType
            ("if(%s===util.emptyObject)", ref)("%s={}", ref)("k=r.%s()", field.keyType)("r.pos++"); // assumes id 2 + value wireType

            if (types["long"][field.keyType] !== undefined) {
              if (types.basic[type] === undefined) gen("%s[typeof k===\"object\"?util.longToHash(k):k]=types[%i].decode(r,r.uint32())", ref, i); // can't be groups
              else gen("%s[typeof k===\"object\"?util.longToHash(k):k]=r.%s()", ref, type);
            } else {
              if (types.basic[type] === undefined) gen("%s[k]=types[%i].decode(r,r.uint32())", ref, i); // can't be groups
              else gen("%s[k]=r.%s()", ref, type);
            } // Repeated fields

          } else if (field.repeated) {
            gen("if(!(%s&&%s.length))", ref, ref)("%s=[]", ref); // Packable (always check for forward and backward compatiblity)

            if (types.packed[type] !== undefined) gen("if((t&7)===2){")("var c2=r.uint32()+r.pos")("while(r.pos<c2)")("%s.push(r.%s())", ref, type)("}else"); // Non-packed

            if (types.basic[type] === undefined) gen(field.resolvedType.group ? "%s.push(types[%i].decode(r))" : "%s.push(types[%i].decode(r,r.uint32()))", ref, i);else gen("%s.push(r.%s())", ref, type); // Non-repeated
          } else if (types.basic[type] === undefined) gen(field.resolvedType.group ? "%s=types[%i].decode(r)" : "%s=types[%i].decode(r,r.uint32())", ref, i);else gen("%s=r.%s()", ref, type);

          gen("break"); // Unknown fields
        }

        gen("default:")("r.skipType(t&7)")("break")("}")("}"); // Field presence

        for (i = 0; i < mtype._fieldsArray.length; ++i) {
          var rfield = mtype._fieldsArray[i];
          if (rfield.required) gen("if(!m.hasOwnProperty(%j))", rfield.name)("throw util.ProtocolError(%j,{instance:m})", missing(rfield));
        }

        return gen("return m");
        /* eslint-enable no-unexpected-multiline */
      }
    }, {
      "15": 15,
      "36": 36,
      "37": 37
    }],
    14: [function (require, module, exports) {
      "use strict";

      module.exports = encoder;

      var Enum = require(15),
          types = require(36),
          util = require(37);
      /**
       * Generates a partial message type encoder.
       * @param {Codegen} gen Codegen instance
       * @param {Field} field Reflected field
       * @param {number} fieldIndex Field index
       * @param {string} ref Variable reference
       * @returns {Codegen} Codegen instance
       * @ignore
       */


      function genTypePartial(gen, field, fieldIndex, ref) {
        return field.resolvedType.group ? gen("types[%i].encode(%s,w.uint32(%i)).uint32(%i)", fieldIndex, ref, (field.id << 3 | 3) >>> 0, (field.id << 3 | 4) >>> 0) : gen("types[%i].encode(%s,w.uint32(%i).fork()).ldelim()", fieldIndex, ref, (field.id << 3 | 2) >>> 0);
      }
      /**
       * Generates an encoder specific to the specified message type.
       * @param {Type} mtype Message type
       * @returns {Codegen} Codegen instance
       */


      function encoder(mtype) {
        /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
        var gen = util.codegen(["m", "w"], mtype.name + "$encode")("if(!w)")("w=Writer.create()");
        var i, ref; // "when a message is serialized its known fields should be written sequentially by field number"

        var fields =
        /* initializes */
        mtype.fieldsArray.slice().sort(util.compareFieldsById);

        for (var i = 0; i < fields.length; ++i) {
          var field = fields[i].resolve(),
              index = mtype._fieldsArray.indexOf(field),
              type = field.resolvedType instanceof Enum ? "int32" : field.type,
              wireType = types.basic[type];

          ref = "m" + util.safeProp(field.name); // Map fields

          if (field.map) {
            gen("if(%s!=null&&m.hasOwnProperty(%j)){", ref, field.name) // !== undefined && !== null
            ("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){", ref)("w.uint32(%i).fork().uint32(%i).%s(ks[i])", (field.id << 3 | 2) >>> 0, 8 | types.mapKey[field.keyType], field.keyType);
            if (wireType === undefined) gen("types[%i].encode(%s[ks[i]],w.uint32(18).fork()).ldelim().ldelim()", index, ref); // can't be groups
            else gen(".uint32(%i).%s(%s[ks[i]]).ldelim()", 16 | wireType, type, ref);
            gen("}")("}"); // Repeated fields
          } else if (field.repeated) {
            gen("if(%s!=null&&%s.length){", ref, ref); // !== undefined && !== null
            // Packed repeated

            if (field.packed && types.packed[type] !== undefined) {
              gen("w.uint32(%i).fork()", (field.id << 3 | 2) >>> 0)("for(var i=0;i<%s.length;++i)", ref)("w.%s(%s[i])", type, ref)("w.ldelim()"); // Non-packed
            } else {
              gen("for(var i=0;i<%s.length;++i)", ref);
              if (wireType === undefined) genTypePartial(gen, field, index, ref + "[i]");else gen("w.uint32(%i).%s(%s[i])", (field.id << 3 | wireType) >>> 0, type, ref);
            }

            gen("}"); // Non-repeated
          } else {
            if (field.optional) gen("if(%s!=null&&m.hasOwnProperty(%j))", ref, field.name); // !== undefined && !== null

            if (wireType === undefined) genTypePartial(gen, field, index, ref);else gen("w.uint32(%i).%s(%s)", (field.id << 3 | wireType) >>> 0, type, ref);
          }
        }

        return gen("return w");
        /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
      }
    }, {
      "15": 15,
      "36": 36,
      "37": 37
    }],
    15: [function (require, module, exports) {
      "use strict";

      module.exports = Enum; // extends ReflectionObject

      var ReflectionObject = require(24);

      ((Enum.prototype = Object.create(ReflectionObject.prototype)).constructor = Enum).className = "Enum";

      var Namespace = require(23),
          util = require(37);
      /**
       * Constructs a new enum instance.
       * @classdesc Reflected enum.
       * @extends ReflectionObject
       * @constructor
       * @param {string} name Unique name within its namespace
       * @param {Object.<string,number>} [values] Enum values as an object, by name
       * @param {Object.<string,*>} [options] Declared options
       * @param {string} [comment] The comment for this enum
       * @param {Object.<string,string>} [comments] The value comments for this enum
       */


      function Enum(name, values, options, comment, comments) {
        ReflectionObject.call(this, name, options);
        if (values && _typeof(values) !== "object") throw TypeError("values must be an object");
        /**
         * Enum values by id.
         * @type {Object.<number,string>}
         */

        this.valuesById = {};
        /**
         * Enum values by name.
         * @type {Object.<string,number>}
         */

        this.values = Object.create(this.valuesById); // toJSON, marker

        /**
         * Enum comment text.
         * @type {string|null}
         */

        this.comment = comment;
        /**
         * Value comment texts, if any.
         * @type {Object.<string,string>}
         */

        this.comments = comments || {};
        /**
         * Reserved ranges, if any.
         * @type {Array.<number[]|string>}
         */

        this.reserved = undefined; // toJSON
        // Note that values inherit valuesById on their prototype which makes them a TypeScript-
        // compatible enum. This is used by pbts to write actual enum definitions that work for
        // static and reflection code alike instead of emitting generic object definitions.

        if (values) for (var keys = Object.keys(values), i = 0; i < keys.length; ++i) {
          if (typeof values[keys[i]] === "number") // use forward entries only
            this.valuesById[this.values[keys[i]] = values[keys[i]]] = keys[i];
        }
      }
      /**
       * Enum descriptor.
       * @interface IEnum
       * @property {Object.<string,number>} values Enum values
       * @property {Object.<string,*>} [options] Enum options
       */

      /**
       * Constructs an enum from an enum descriptor.
       * @param {string} name Enum name
       * @param {IEnum} json Enum descriptor
       * @returns {Enum} Created enum
       * @throws {TypeError} If arguments are invalid
       */


      Enum.fromJSON = function fromJSON(name, json) {
        var enm = new Enum(name, json.values, json.options, json.comment, json.comments);
        enm.reserved = json.reserved;
        return enm;
      };
      /**
       * Converts this enum to an enum descriptor.
       * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
       * @returns {IEnum} Enum descriptor
       */


      Enum.prototype.toJSON = function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject(["options", this.options, "values", this.values, "reserved", this.reserved && this.reserved.length ? this.reserved : undefined, "comment", keepComments ? this.comment : undefined, "comments", keepComments ? this.comments : undefined]);
      };
      /**
       * Adds a value to this enum.
       * @param {string} name Value name
       * @param {number} id Value id
       * @param {string} [comment] Comment, if any
       * @returns {Enum} `this`
       * @throws {TypeError} If arguments are invalid
       * @throws {Error} If there is already a value with this name or id
       */


      Enum.prototype.add = function add(name, id, comment) {
        // utilized by the parser but not by .fromJSON
        if (!util.isString(name)) throw TypeError("name must be a string");
        if (!util.isInteger(id)) throw TypeError("id must be an integer");
        if (this.values[name] !== undefined) throw Error("duplicate name '" + name + "' in " + this);
        if (this.isReservedId(id)) throw Error("id " + id + " is reserved in " + this);
        if (this.isReservedName(name)) throw Error("name '" + name + "' is reserved in " + this);

        if (this.valuesById[id] !== undefined) {
          if (!(this.options && this.options.allow_alias)) throw Error("duplicate id " + id + " in " + this);
          this.values[name] = id;
        } else this.valuesById[this.values[name] = id] = name;

        this.comments[name] = comment || null;
        return this;
      };
      /**
       * Removes a value from this enum
       * @param {string} name Value name
       * @returns {Enum} `this`
       * @throws {TypeError} If arguments are invalid
       * @throws {Error} If `name` is not a name of this enum
       */


      Enum.prototype.remove = function remove(name) {
        if (!util.isString(name)) throw TypeError("name must be a string");
        var val = this.values[name];
        if (val == null) throw Error("name '" + name + "' does not exist in " + this);
        delete this.valuesById[val];
        delete this.values[name];
        delete this.comments[name];
        return this;
      };
      /**
       * Tests if the specified id is reserved.
       * @param {number} id Id to test
       * @returns {boolean} `true` if reserved, otherwise `false`
       */


      Enum.prototype.isReservedId = function isReservedId(id) {
        return Namespace.isReservedId(this.reserved, id);
      };
      /**
       * Tests if the specified name is reserved.
       * @param {string} name Name to test
       * @returns {boolean} `true` if reserved, otherwise `false`
       */


      Enum.prototype.isReservedName = function isReservedName(name) {
        return Namespace.isReservedName(this.reserved, name);
      };
    }, {
      "23": 23,
      "24": 24,
      "37": 37
    }],
    16: [function (require, module, exports) {
      "use strict";

      module.exports = Field; // extends ReflectionObject

      var ReflectionObject = require(24);

      ((Field.prototype = Object.create(ReflectionObject.prototype)).constructor = Field).className = "Field";

      var Enum = require(15),
          types = require(36),
          util = require(37);

      var Type; // cyclic

      var ruleRe = /^required|optional|repeated$/;
      /**
       * Constructs a new message field instance. Note that {@link MapField|map fields} have their own class.
       * @name Field
       * @classdesc Reflected message field.
       * @extends FieldBase
       * @constructor
       * @param {string} name Unique name within its namespace
       * @param {number} id Unique id within its namespace
       * @param {string} type Value type
       * @param {string|Object.<string,*>} [rule="optional"] Field rule
       * @param {string|Object.<string,*>} [extend] Extended type if different from parent
       * @param {Object.<string,*>} [options] Declared options
       */

      /**
       * Constructs a field from a field descriptor.
       * @param {string} name Field name
       * @param {IField} json Field descriptor
       * @returns {Field} Created field
       * @throws {TypeError} If arguments are invalid
       */

      Field.fromJSON = function fromJSON(name, json) {
        return new Field(name, json.id, json.type, json.rule, json.extend, json.options, json.comment);
      };
      /**
       * Not an actual constructor. Use {@link Field} instead.
       * @classdesc Base class of all reflected message fields. This is not an actual class but here for the sake of having consistent type definitions.
       * @exports FieldBase
       * @extends ReflectionObject
       * @constructor
       * @param {string} name Unique name within its namespace
       * @param {number} id Unique id within its namespace
       * @param {string} type Value type
       * @param {string|Object.<string,*>} [rule="optional"] Field rule
       * @param {string|Object.<string,*>} [extend] Extended type if different from parent
       * @param {Object.<string,*>} [options] Declared options
       * @param {string} [comment] Comment associated with this field
       */


      function Field(name, id, type, rule, extend, options, comment) {
        if (util.isObject(rule)) {
          comment = extend;
          options = rule;
          rule = extend = undefined;
        } else if (util.isObject(extend)) {
          comment = options;
          options = extend;
          extend = undefined;
        }

        ReflectionObject.call(this, name, options);
        if (!util.isInteger(id) || id < 0) throw TypeError("id must be a non-negative integer");
        if (!util.isString(type)) throw TypeError("type must be a string");
        if (rule !== undefined && !ruleRe.test(rule = rule.toString().toLowerCase())) throw TypeError("rule must be a string rule");
        if (extend !== undefined && !util.isString(extend)) throw TypeError("extend must be a string");
        /**
         * Field rule, if any.
         * @type {string|undefined}
         */

        this.rule = rule && rule !== "optional" ? rule : undefined; // toJSON

        /**
         * Field type.
         * @type {string}
         */

        this.type = type; // toJSON

        /**
         * Unique field id.
         * @type {number}
         */

        this.id = id; // toJSON, marker

        /**
         * Extended type if different from parent.
         * @type {string|undefined}
         */

        this.extend = extend || undefined; // toJSON

        /**
         * Whether this field is required.
         * @type {boolean}
         */

        this.required = rule === "required";
        /**
         * Whether this field is optional.
         * @type {boolean}
         */

        this.optional = !this.required;
        /**
         * Whether this field is repeated.
         * @type {boolean}
         */

        this.repeated = rule === "repeated";
        /**
         * Whether this field is a map or not.
         * @type {boolean}
         */

        this.map = false;
        /**
         * Message this field belongs to.
         * @type {Type|null}
         */

        this.message = null;
        /**
         * OneOf this field belongs to, if any,
         * @type {OneOf|null}
         */

        this.partOf = null;
        /**
         * The field type's default value.
         * @type {*}
         */

        this.typeDefault = null;
        /**
         * The field's default value on prototypes.
         * @type {*}
         */

        this.defaultValue = null;
        /**
         * Whether this field's value should be treated as a long.
         * @type {boolean}
         */

        this["long"] = util.Long ? types["long"][type] !== undefined :
        /* istanbul ignore next */
        false;
        /**
         * Whether this field's value is a buffer.
         * @type {boolean}
         */

        this.bytes = type === "bytes";
        /**
         * Resolved type if not a basic type.
         * @type {Type|Enum|null}
         */

        this.resolvedType = null;
        /**
         * Sister-field within the extended type if a declaring extension field.
         * @type {Field|null}
         */

        this.extensionField = null;
        /**
         * Sister-field within the declaring namespace if an extended field.
         * @type {Field|null}
         */

        this.declaringField = null;
        /**
         * Internally remembers whether this field is packed.
         * @type {boolean|null}
         * @private
         */

        this._packed = null;
        /**
         * Comment for this field.
         * @type {string|null}
         */

        this.comment = comment;
      }
      /**
       * Determines whether this field is packed. Only relevant when repeated and working with proto2.
       * @name Field#packed
       * @type {boolean}
       * @readonly
       */


      Object.defineProperty(Field.prototype, "packed", {
        get: function get() {
          // defaults to packed=true if not explicity set to false
          if (this._packed === null) this._packed = this.getOption("packed") !== false;
          return this._packed;
        }
      });
      /**
       * @override
       */

      Field.prototype.setOption = function setOption(name, value, ifNotSet) {
        if (name === "packed") // clear cached before setting
          this._packed = null;
        return ReflectionObject.prototype.setOption.call(this, name, value, ifNotSet);
      };
      /**
       * Field descriptor.
       * @interface IField
       * @property {string} [rule="optional"] Field rule
       * @property {string} type Field type
       * @property {number} id Field id
       * @property {Object.<string,*>} [options] Field options
       */

      /**
       * Extension field descriptor.
       * @interface IExtensionField
       * @extends IField
       * @property {string} extend Extended type
       */

      /**
       * Converts this field to a field descriptor.
       * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
       * @returns {IField} Field descriptor
       */


      Field.prototype.toJSON = function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject(["rule", this.rule !== "optional" && this.rule || undefined, "type", this.type, "id", this.id, "extend", this.extend, "options", this.options, "comment", keepComments ? this.comment : undefined]);
      };
      /**
       * Resolves this field's type references.
       * @returns {Field} `this`
       * @throws {Error} If any reference cannot be resolved
       */


      Field.prototype.resolve = function resolve() {
        if (this.resolved) return this;

        if ((this.typeDefault = types.defaults[this.type]) === undefined) {
          // if not a basic type, resolve it
          this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type);
          if (this.resolvedType instanceof Type) this.typeDefault = null;else // instanceof Enum
            this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]]; // first defined
        } // use explicitly set default value if present


        if (this.options && this.options["default"] != null) {
          this.typeDefault = this.options["default"];
          if (this.resolvedType instanceof Enum && typeof this.typeDefault === "string") this.typeDefault = this.resolvedType.values[this.typeDefault];
        } // remove unnecessary options


        if (this.options) {
          if (this.options.packed === true || this.options.packed !== undefined && this.resolvedType && !(this.resolvedType instanceof Enum)) delete this.options.packed;
          if (!Object.keys(this.options).length) this.options = undefined;
        } // convert to internal data type if necesssary


        if (this["long"]) {
          this.typeDefault = util.Long.fromNumber(this.typeDefault, this.type.charAt(0) === "u");
          /* istanbul ignore else */

          if (Object.freeze) Object.freeze(this.typeDefault); // long instances are meant to be immutable anyway (i.e. use small int cache that even requires it)
        } else if (this.bytes && typeof this.typeDefault === "string") {
          var buf;
          if (util.base64.test(this.typeDefault)) util.base64.decode(this.typeDefault, buf = util.newBuffer(util.base64.length(this.typeDefault)), 0);else util.utf8.write(this.typeDefault, buf = util.newBuffer(util.utf8.length(this.typeDefault)), 0);
          this.typeDefault = buf;
        } // take special care of maps and repeated fields


        if (this.map) this.defaultValue = util.emptyObject;else if (this.repeated) this.defaultValue = util.emptyArray;else this.defaultValue = this.typeDefault; // ensure proper value on prototype

        if (this.parent instanceof Type) this.parent.ctor.prototype[this.name] = this.defaultValue;
        return ReflectionObject.prototype.resolve.call(this);
      };
      /**
       * Decorator function as returned by {@link Field.d} and {@link MapField.d} (TypeScript).
       * @typedef FieldDecorator
       * @type {function}
       * @param {Object} prototype Target prototype
       * @param {string} fieldName Field name
       * @returns {undefined}
       */

      /**
       * Field decorator (TypeScript).
       * @name Field.d
       * @function
       * @param {number} fieldId Field id
       * @param {"double"|"float"|"int32"|"uint32"|"sint32"|"fixed32"|"sfixed32"|"int64"|"uint64"|"sint64"|"fixed64"|"sfixed64"|"string"|"bool"|"bytes"|Object} fieldType Field type
       * @param {"optional"|"required"|"repeated"} [fieldRule="optional"] Field rule
       * @param {T} [defaultValue] Default value
       * @returns {FieldDecorator} Decorator function
       * @template T extends number | number[] | Long | Long[] | string | string[] | boolean | boolean[] | Uint8Array | Uint8Array[] | Buffer | Buffer[]
       */


      Field.d = function decorateField(fieldId, fieldType, fieldRule, defaultValue) {
        // submessage: decorate the submessage and use its name as the type
        if (typeof fieldType === "function") fieldType = util.decorateType(fieldType).name; // enum reference: create a reflected copy of the enum and keep reuseing it
        else if (fieldType && _typeof(fieldType) === "object") fieldType = util.decorateEnum(fieldType).name;
        return function fieldDecorator(prototype, fieldName) {
          util.decorateType(prototype.constructor).add(new Field(fieldName, fieldId, fieldType, fieldRule, {
            "default": defaultValue
          }));
        };
      };
      /**
       * Field decorator (TypeScript).
       * @name Field.d
       * @function
       * @param {number} fieldId Field id
       * @param {Constructor<T>|string} fieldType Field type
       * @param {"optional"|"required"|"repeated"} [fieldRule="optional"] Field rule
       * @returns {FieldDecorator} Decorator function
       * @template T extends Message<T>
       * @variation 2
       */
      // like Field.d but without a default value


      Field._configure = function configure(Type_) {
        Type = Type_;
      };
    }, {
      "15": 15,
      "24": 24,
      "36": 36,
      "37": 37
    }],
    17: [function (require, module, exports) {
      "use strict";

      var protobuf = module.exports = require(18);

      protobuf.build = "light";
      /**
       * A node-style callback as used by {@link load} and {@link Root#load}.
       * @typedef LoadCallback
       * @type {function}
       * @param {Error|null} error Error, if any, otherwise `null`
       * @param {Root} [root] Root, if there hasn't been an error
       * @returns {undefined}
       */

      /**
       * Loads one or multiple .proto or preprocessed .json files into a common root namespace and calls the callback.
       * @param {string|string[]} filename One or multiple files to load
       * @param {Root} root Root namespace, defaults to create a new one if omitted.
       * @param {LoadCallback} callback Callback function
       * @returns {undefined}
       * @see {@link Root#load}
       */

      function load(filename, root, callback) {
        if (typeof root === "function") {
          callback = root;
          root = new protobuf.Root();
        } else if (!root) root = new protobuf.Root();

        return root.load(filename, callback);
      }
      /**
       * Loads one or multiple .proto or preprocessed .json files into a common root namespace and calls the callback.
       * @name load
       * @function
       * @param {string|string[]} filename One or multiple files to load
       * @param {LoadCallback} callback Callback function
       * @returns {undefined}
       * @see {@link Root#load}
       * @variation 2
       */
      // function load(filename:string, callback:LoadCallback):undefined

      /**
       * Loads one or multiple .proto or preprocessed .json files into a common root namespace and returns a promise.
       * @name load
       * @function
       * @param {string|string[]} filename One or multiple files to load
       * @param {Root} [root] Root namespace, defaults to create a new one if omitted.
       * @returns {Promise<Root>} Promise
       * @see {@link Root#load}
       * @variation 3
       */
      // function load(filename:string, [root:Root]):Promise<Root>


      protobuf.load = load;
      /**
       * Synchronously loads one or multiple .proto or preprocessed .json files into a common root namespace (node only).
       * @param {string|string[]} filename One or multiple files to load
       * @param {Root} [root] Root namespace, defaults to create a new one if omitted.
       * @returns {Root} Root namespace
       * @throws {Error} If synchronous fetching is not supported (i.e. in browsers) or if a file's syntax is invalid
       * @see {@link Root#loadSync}
       */

      function loadSync(filename, root) {
        if (!root) root = new protobuf.Root();
        return root.loadSync(filename);
      }

      protobuf.loadSync = loadSync; // Serialization

      protobuf.encoder = require(14);
      protobuf.decoder = require(13);
      protobuf.verifier = require(40);
      protobuf.converter = require(12); // Reflection

      protobuf.ReflectionObject = require(24);
      protobuf.Namespace = require(23);
      protobuf.Root = require(29);
      protobuf.Enum = require(15);
      protobuf.Type = require(35);
      protobuf.Field = require(16);
      protobuf.OneOf = require(25);
      protobuf.MapField = require(20);
      protobuf.Service = require(33);
      protobuf.Method = require(22); // Runtime

      protobuf.Message = require(21);
      protobuf.wrappers = require(41); // Utility

      protobuf.types = require(36);
      protobuf.util = require(37); // Configure reflection

      protobuf.ReflectionObject._configure(protobuf.Root);

      protobuf.Namespace._configure(protobuf.Type, protobuf.Service);

      protobuf.Root._configure(protobuf.Type);

      protobuf.Field._configure(protobuf.Type);
    }, {
      "12": 12,
      "13": 13,
      "14": 14,
      "15": 15,
      "16": 16,
      "18": 18,
      "20": 20,
      "21": 21,
      "22": 22,
      "23": 23,
      "24": 24,
      "25": 25,
      "29": 29,
      "33": 33,
      "35": 35,
      "36": 36,
      "37": 37,
      "40": 40,
      "41": 41
    }],
    18: [function (require, module, exports) {
      "use strict";

      var protobuf = exports;
      /**
       * Build type, one of `"full"`, `"light"` or `"minimal"`.
       * @name build
       * @type {string}
       * @const
       */

      protobuf.build = "minimal"; // Serialization

      protobuf.Writer = require(42);
      protobuf.BufferWriter = require(43);
      protobuf.Reader = require(27);
      protobuf.BufferReader = require(28); // Utility

      protobuf.util = require(39);
      protobuf.rpc = require(31);
      protobuf.roots = require(30);
      protobuf.configure = configure;
      /* istanbul ignore next */

      /**
       * Reconfigures the library according to the environment.
       * @returns {undefined}
       */

      function configure() {
        protobuf.Reader._configure(protobuf.BufferReader);

        protobuf.util._configure();
      } // Configure serialization


      protobuf.Writer._configure(protobuf.BufferWriter);

      configure();
    }, {
      "27": 27,
      "28": 28,
      "30": 30,
      "31": 31,
      "39": 39,
      "42": 42,
      "43": 43
    }],
    19: [function (require, module, exports) {
      "use strict";

      var protobuf = module.exports = require(17);

      protobuf.build = "full"; // Parser

      protobuf.tokenize = require(34);
      protobuf.parse = require(26);
      protobuf.common = require(11); // Configure parser

      protobuf.Root._configure(protobuf.Type, protobuf.parse, protobuf.common);
    }, {
      "11": 11,
      "17": 17,
      "26": 26,
      "34": 34
    }],
    20: [function (require, module, exports) {
      "use strict";

      module.exports = MapField; // extends Field

      var Field = require(16);

      ((MapField.prototype = Object.create(Field.prototype)).constructor = MapField).className = "MapField";

      var types = require(36),
          util = require(37);
      /**
       * Constructs a new map field instance.
       * @classdesc Reflected map field.
       * @extends FieldBase
       * @constructor
       * @param {string} name Unique name within its namespace
       * @param {number} id Unique id within its namespace
       * @param {string} keyType Key type
       * @param {string} type Value type
       * @param {Object.<string,*>} [options] Declared options
       * @param {string} [comment] Comment associated with this field
       */


      function MapField(name, id, keyType, type, options, comment) {
        Field.call(this, name, id, type, undefined, undefined, options, comment);
        /* istanbul ignore if */

        if (!util.isString(keyType)) throw TypeError("keyType must be a string");
        /**
         * Key type.
         * @type {string}
         */

        this.keyType = keyType; // toJSON, marker

        /**
         * Resolved key type if not a basic type.
         * @type {ReflectionObject|null}
         */

        this.resolvedKeyType = null; // Overrides Field#map

        this.map = true;
      }
      /**
       * Map field descriptor.
       * @interface IMapField
       * @extends {IField}
       * @property {string} keyType Key type
       */

      /**
       * Extension map field descriptor.
       * @interface IExtensionMapField
       * @extends IMapField
       * @property {string} extend Extended type
       */

      /**
       * Constructs a map field from a map field descriptor.
       * @param {string} name Field name
       * @param {IMapField} json Map field descriptor
       * @returns {MapField} Created map field
       * @throws {TypeError} If arguments are invalid
       */


      MapField.fromJSON = function fromJSON(name, json) {
        return new MapField(name, json.id, json.keyType, json.type, json.options, json.comment);
      };
      /**
       * Converts this map field to a map field descriptor.
       * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
       * @returns {IMapField} Map field descriptor
       */


      MapField.prototype.toJSON = function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject(["keyType", this.keyType, "type", this.type, "id", this.id, "extend", this.extend, "options", this.options, "comment", keepComments ? this.comment : undefined]);
      };
      /**
       * @override
       */


      MapField.prototype.resolve = function resolve() {
        if (this.resolved) return this; // Besides a value type, map fields have a key type that may be "any scalar type except for floating point types and bytes"

        if (types.mapKey[this.keyType] === undefined) throw Error("invalid key type: " + this.keyType);
        return Field.prototype.resolve.call(this);
      };
      /**
       * Map field decorator (TypeScript).
       * @name MapField.d
       * @function
       * @param {number} fieldId Field id
       * @param {"int32"|"uint32"|"sint32"|"fixed32"|"sfixed32"|"int64"|"uint64"|"sint64"|"fixed64"|"sfixed64"|"bool"|"string"} fieldKeyType Field key type
       * @param {"double"|"float"|"int32"|"uint32"|"sint32"|"fixed32"|"sfixed32"|"int64"|"uint64"|"sint64"|"fixed64"|"sfixed64"|"bool"|"string"|"bytes"|Object|Constructor<{}>} fieldValueType Field value type
       * @returns {FieldDecorator} Decorator function
       * @template T extends { [key: string]: number | Long | string | boolean | Uint8Array | Buffer | number[] | Message<{}> }
       */


      MapField.d = function decorateMapField(fieldId, fieldKeyType, fieldValueType) {
        // submessage value: decorate the submessage and use its name as the type
        if (typeof fieldValueType === "function") fieldValueType = util.decorateType(fieldValueType).name; // enum reference value: create a reflected copy of the enum and keep reuseing it
        else if (fieldValueType && _typeof(fieldValueType) === "object") fieldValueType = util.decorateEnum(fieldValueType).name;
        return function mapFieldDecorator(prototype, fieldName) {
          util.decorateType(prototype.constructor).add(new MapField(fieldName, fieldId, fieldKeyType, fieldValueType));
        };
      };
    }, {
      "16": 16,
      "36": 36,
      "37": 37
    }],
    21: [function (require, module, exports) {
      "use strict";

      module.exports = Message;

      var util = require(39);
      /**
       * Constructs a new message instance.
       * @classdesc Abstract runtime message.
       * @constructor
       * @param {Properties<T>} [properties] Properties to set
       * @template T extends object
       */


      function Message(properties) {
        // not used internally
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
          this[keys[i]] = properties[keys[i]];
        }
      }
      /**
       * Reference to the reflected type.
       * @name Message.$type
       * @type {Type}
       * @readonly
       */

      /**
       * Reference to the reflected type.
       * @name Message#$type
       * @type {Type}
       * @readonly
       */

      /*eslint-disable valid-jsdoc*/

      /**
       * Creates a new message of this type using the specified properties.
       * @param {Object.<string,*>} [properties] Properties to set
       * @returns {Message<T>} Message instance
       * @template T extends Message<T>
       * @this Constructor<T>
       */


      Message.create = function create(properties) {
        return this.$type.create(properties);
      };
      /**
       * Encodes a message of this type.
       * @param {T|Object.<string,*>} message Message to encode
       * @param {Writer} [writer] Writer to use
       * @returns {Writer} Writer
       * @template T extends Message<T>
       * @this Constructor<T>
       */


      Message.encode = function encode(message, writer) {
        return this.$type.encode(message, writer);
      };
      /**
       * Encodes a message of this type preceeded by its length as a varint.
       * @param {T|Object.<string,*>} message Message to encode
       * @param {Writer} [writer] Writer to use
       * @returns {Writer} Writer
       * @template T extends Message<T>
       * @this Constructor<T>
       */


      Message.encodeDelimited = function encodeDelimited(message, writer) {
        return this.$type.encodeDelimited(message, writer);
      };
      /**
       * Decodes a message of this type.
       * @name Message.decode
       * @function
       * @param {Reader|Uint8Array} reader Reader or buffer to decode
       * @returns {T} Decoded message
       * @template T extends Message<T>
       * @this Constructor<T>
       */


      Message.decode = function decode(reader) {
        return this.$type.decode(reader);
      };
      /**
       * Decodes a message of this type preceeded by its length as a varint.
       * @name Message.decodeDelimited
       * @function
       * @param {Reader|Uint8Array} reader Reader or buffer to decode
       * @returns {T} Decoded message
       * @template T extends Message<T>
       * @this Constructor<T>
       */


      Message.decodeDelimited = function decodeDelimited(reader) {
        return this.$type.decodeDelimited(reader);
      };
      /**
       * Verifies a message of this type.
       * @name Message.verify
       * @function
       * @param {Object.<string,*>} message Plain object to verify
       * @returns {string|null} `null` if valid, otherwise the reason why it is not
       */


      Message.verify = function verify(message) {
        return this.$type.verify(message);
      };
      /**
       * Creates a new message of this type from a plain object. Also converts values to their respective internal types.
       * @param {Object.<string,*>} object Plain object
       * @returns {T} Message instance
       * @template T extends Message<T>
       * @this Constructor<T>
       */


      Message.fromObject = function fromObject(object) {
        return this.$type.fromObject(object);
      };
      /**
       * Creates a plain object from a message of this type. Also converts values to other types if specified.
       * @param {T} message Message instance
       * @param {IConversionOptions} [options] Conversion options
       * @returns {Object.<string,*>} Plain object
       * @template T extends Message<T>
       * @this Constructor<T>
       */


      Message.toObject = function toObject(message, options) {
        return this.$type.toObject(message, options);
      };
      /**
       * Converts this message to JSON.
       * @returns {Object.<string,*>} JSON object
       */


      Message.prototype.toJSON = function toJSON() {
        return this.$type.toObject(this, util.toJSONOptions);
      };
      /*eslint-enable valid-jsdoc*/

    }, {
      "39": 39
    }],
    22: [function (require, module, exports) {
      "use strict";

      module.exports = Method; // extends ReflectionObject

      var ReflectionObject = require(24);

      ((Method.prototype = Object.create(ReflectionObject.prototype)).constructor = Method).className = "Method";

      var util = require(37);
      /**
       * Constructs a new service method instance.
       * @classdesc Reflected service method.
       * @extends ReflectionObject
       * @constructor
       * @param {string} name Method name
       * @param {string|undefined} type Method type, usually `"rpc"`
       * @param {string} requestType Request message type
       * @param {string} responseType Response message type
       * @param {boolean|Object.<string,*>} [requestStream] Whether the request is streamed
       * @param {boolean|Object.<string,*>} [responseStream] Whether the response is streamed
       * @param {Object.<string,*>} [options] Declared options
       * @param {string} [comment] The comment for this method
       */


      function Method(name, type, requestType, responseType, requestStream, responseStream, options, comment) {
        /* istanbul ignore next */
        if (util.isObject(requestStream)) {
          options = requestStream;
          requestStream = responseStream = undefined;
        } else if (util.isObject(responseStream)) {
          options = responseStream;
          responseStream = undefined;
        }
        /* istanbul ignore if */


        if (!(type === undefined || util.isString(type))) throw TypeError("type must be a string");
        /* istanbul ignore if */

        if (!util.isString(requestType)) throw TypeError("requestType must be a string");
        /* istanbul ignore if */

        if (!util.isString(responseType)) throw TypeError("responseType must be a string");
        ReflectionObject.call(this, name, options);
        /**
         * Method type.
         * @type {string}
         */

        this.type = type || "rpc"; // toJSON

        /**
         * Request type.
         * @type {string}
         */

        this.requestType = requestType; // toJSON, marker

        /**
         * Whether requests are streamed or not.
         * @type {boolean|undefined}
         */

        this.requestStream = requestStream ? true : undefined; // toJSON

        /**
         * Response type.
         * @type {string}
         */

        this.responseType = responseType; // toJSON

        /**
         * Whether responses are streamed or not.
         * @type {boolean|undefined}
         */

        this.responseStream = responseStream ? true : undefined; // toJSON

        /**
         * Resolved request type.
         * @type {Type|null}
         */

        this.resolvedRequestType = null;
        /**
         * Resolved response type.
         * @type {Type|null}
         */

        this.resolvedResponseType = null;
        /**
         * Comment for this method
         * @type {string|null}
         */

        this.comment = comment;
      }
      /**
       * Method descriptor.
       * @interface IMethod
       * @property {string} [type="rpc"] Method type
       * @property {string} requestType Request type
       * @property {string} responseType Response type
       * @property {boolean} [requestStream=false] Whether requests are streamed
       * @property {boolean} [responseStream=false] Whether responses are streamed
       * @property {Object.<string,*>} [options] Method options
       */

      /**
       * Constructs a method from a method descriptor.
       * @param {string} name Method name
       * @param {IMethod} json Method descriptor
       * @returns {Method} Created method
       * @throws {TypeError} If arguments are invalid
       */


      Method.fromJSON = function fromJSON(name, json) {
        return new Method(name, json.type, json.requestType, json.responseType, json.requestStream, json.responseStream, json.options, json.comment);
      };
      /**
       * Converts this method to a method descriptor.
       * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
       * @returns {IMethod} Method descriptor
       */


      Method.prototype.toJSON = function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject(["type", this.type !== "rpc" &&
        /* istanbul ignore next */
        this.type || undefined, "requestType", this.requestType, "requestStream", this.requestStream, "responseType", this.responseType, "responseStream", this.responseStream, "options", this.options, "comment", keepComments ? this.comment : undefined]);
      };
      /**
       * @override
       */


      Method.prototype.resolve = function resolve() {
        /* istanbul ignore if */
        if (this.resolved) return this;
        this.resolvedRequestType = this.parent.lookupType(this.requestType);
        this.resolvedResponseType = this.parent.lookupType(this.responseType);
        return ReflectionObject.prototype.resolve.call(this);
      };
    }, {
      "24": 24,
      "37": 37
    }],
    23: [function (require, module, exports) {
      "use strict";

      module.exports = Namespace; // extends ReflectionObject

      var ReflectionObject = require(24);

      ((Namespace.prototype = Object.create(ReflectionObject.prototype)).constructor = Namespace).className = "Namespace";

      var Enum = require(15),
          Field = require(16),
          util = require(37);

      var Type, // cyclic
      Service; // "

      /**
       * Constructs a new namespace instance.
       * @name Namespace
       * @classdesc Reflected namespace.
       * @extends NamespaceBase
       * @constructor
       * @param {string} name Namespace name
       * @param {Object.<string,*>} [options] Declared options
       */

      /**
       * Constructs a namespace from JSON.
       * @memberof Namespace
       * @function
       * @param {string} name Namespace name
       * @param {Object.<string,*>} json JSON object
       * @returns {Namespace} Created namespace
       * @throws {TypeError} If arguments are invalid
       */

      Namespace.fromJSON = function fromJSON(name, json) {
        return new Namespace(name, json.options).addJSON(json.nested);
      };
      /**
       * Converts an array of reflection objects to JSON.
       * @memberof Namespace
       * @param {ReflectionObject[]} array Object array
       * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
       * @returns {Object.<string,*>|undefined} JSON object or `undefined` when array is empty
       */


      function arrayToJSON(array, toJSONOptions) {
        if (!(array && array.length)) return undefined;
        var obj = {};

        for (var i = 0; i < array.length; ++i) {
          obj[array[i].name] = array[i].toJSON(toJSONOptions);
        }

        return obj;
      }

      Namespace.arrayToJSON = arrayToJSON;
      /**
       * Tests if the specified id is reserved.
       * @param {Array.<number[]|string>|undefined} reserved Array of reserved ranges and names
       * @param {number} id Id to test
       * @returns {boolean} `true` if reserved, otherwise `false`
       */

      Namespace.isReservedId = function isReservedId(reserved, id) {
        if (reserved) for (var i = 0; i < reserved.length; ++i) {
          if (typeof reserved[i] !== "string" && reserved[i][0] <= id && reserved[i][1] >= id) return true;
        }
        return false;
      };
      /**
       * Tests if the specified name is reserved.
       * @param {Array.<number[]|string>|undefined} reserved Array of reserved ranges and names
       * @param {string} name Name to test
       * @returns {boolean} `true` if reserved, otherwise `false`
       */


      Namespace.isReservedName = function isReservedName(reserved, name) {
        if (reserved) for (var i = 0; i < reserved.length; ++i) {
          if (reserved[i] === name) return true;
        }
        return false;
      };
      /**
       * Not an actual constructor. Use {@link Namespace} instead.
       * @classdesc Base class of all reflection objects containing nested objects. This is not an actual class but here for the sake of having consistent type definitions.
       * @exports NamespaceBase
       * @extends ReflectionObject
       * @abstract
       * @constructor
       * @param {string} name Namespace name
       * @param {Object.<string,*>} [options] Declared options
       * @see {@link Namespace}
       */


      function Namespace(name, options) {
        ReflectionObject.call(this, name, options);
        /**
         * Nested objects by name.
         * @type {Object.<string,ReflectionObject>|undefined}
         */

        this.nested = undefined; // toJSON

        /**
         * Cached nested objects as an array.
         * @type {ReflectionObject[]|null}
         * @private
         */

        this._nestedArray = null;
      }

      function clearCache(namespace) {
        namespace._nestedArray = null;
        return namespace;
      }
      /**
       * Nested objects of this namespace as an array for iteration.
       * @name NamespaceBase#nestedArray
       * @type {ReflectionObject[]}
       * @readonly
       */


      Object.defineProperty(Namespace.prototype, "nestedArray", {
        get: function get() {
          return this._nestedArray || (this._nestedArray = util.toArray(this.nested));
        }
      });
      /**
       * Namespace descriptor.
       * @interface INamespace
       * @property {Object.<string,*>} [options] Namespace options
       * @property {Object.<string,AnyNestedObject>} [nested] Nested object descriptors
       */

      /**
       * Any extension field descriptor.
       * @typedef AnyExtensionField
       * @type {IExtensionField|IExtensionMapField}
       */

      /**
       * Any nested object descriptor.
       * @typedef AnyNestedObject
       * @type {IEnum|IType|IService|AnyExtensionField|INamespace}
       */
      // ^ BEWARE: VSCode hangs forever when using more than 5 types (that's why AnyExtensionField exists in the first place)

      /**
       * Converts this namespace to a namespace descriptor.
       * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
       * @returns {INamespace} Namespace descriptor
       */

      Namespace.prototype.toJSON = function toJSON(toJSONOptions) {
        return util.toObject(["options", this.options, "nested", arrayToJSON(this.nestedArray, toJSONOptions)]);
      };
      /**
       * Adds nested objects to this namespace from nested object descriptors.
       * @param {Object.<string,AnyNestedObject>} nestedJson Any nested object descriptors
       * @returns {Namespace} `this`
       */


      Namespace.prototype.addJSON = function addJSON(nestedJson) {
        var ns = this;
        /* istanbul ignore else */

        if (nestedJson) {
          for (var names = Object.keys(nestedJson), i = 0, nested; i < names.length; ++i) {
            nested = nestedJson[names[i]];
            ns.add( // most to least likely
            (nested.fields !== undefined ? Type.fromJSON : nested.values !== undefined ? Enum.fromJSON : nested.methods !== undefined ? Service.fromJSON : nested.id !== undefined ? Field.fromJSON : Namespace.fromJSON)(names[i], nested));
          }
        }

        return this;
      };
      /**
       * Gets the nested object of the specified name.
       * @param {string} name Nested object name
       * @returns {ReflectionObject|null} The reflection object or `null` if it doesn't exist
       */


      Namespace.prototype.get = function get(name) {
        return this.nested && this.nested[name] || null;
      };
      /**
       * Gets the values of the nested {@link Enum|enum} of the specified name.
       * This methods differs from {@link Namespace#get|get} in that it returns an enum's values directly and throws instead of returning `null`.
       * @param {string} name Nested enum name
       * @returns {Object.<string,number>} Enum values
       * @throws {Error} If there is no such enum
       */


      Namespace.prototype.getEnum = function getEnum(name) {
        if (this.nested && this.nested[name] instanceof Enum) return this.nested[name].values;
        throw Error("no such enum: " + name);
      };
      /**
       * Adds a nested object to this namespace.
       * @param {ReflectionObject} object Nested object to add
       * @returns {Namespace} `this`
       * @throws {TypeError} If arguments are invalid
       * @throws {Error} If there is already a nested object with this name
       */


      Namespace.prototype.add = function add(object) {
        if (!(object instanceof Field && object.extend !== undefined || object instanceof Type || object instanceof Enum || object instanceof Service || object instanceof Namespace)) throw TypeError("object must be a valid nested object");
        if (!this.nested) this.nested = {};else {
          var prev = this.get(object.name);

          if (prev) {
            if (prev instanceof Namespace && object instanceof Namespace && !(prev instanceof Type || prev instanceof Service)) {
              // replace plain namespace but keep existing nested elements and options
              var nested = prev.nestedArray;

              for (var i = 0; i < nested.length; ++i) {
                object.add(nested[i]);
              }

              this.remove(prev);
              if (!this.nested) this.nested = {};
              object.setOptions(prev.options, true);
            } else throw Error("duplicate name '" + object.name + "' in " + this);
          }
        }
        this.nested[object.name] = object;
        object.onAdd(this);
        return clearCache(this);
      };
      /**
       * Removes a nested object from this namespace.
       * @param {ReflectionObject} object Nested object to remove
       * @returns {Namespace} `this`
       * @throws {TypeError} If arguments are invalid
       * @throws {Error} If `object` is not a member of this namespace
       */


      Namespace.prototype.remove = function remove(object) {
        if (!(object instanceof ReflectionObject)) throw TypeError("object must be a ReflectionObject");
        if (object.parent !== this) throw Error(object + " is not a member of " + this);
        delete this.nested[object.name];
        if (!Object.keys(this.nested).length) this.nested = undefined;
        object.onRemove(this);
        return clearCache(this);
      };
      /**
       * Defines additial namespaces within this one if not yet existing.
       * @param {string|string[]} path Path to create
       * @param {*} [json] Nested types to create from JSON
       * @returns {Namespace} Pointer to the last namespace created or `this` if path is empty
       */


      Namespace.prototype.define = function define(path, json) {
        if (util.isString(path)) path = path.split(".");else if (!Array.isArray(path)) throw TypeError("illegal path");
        if (path && path.length && path[0] === "") throw Error("path must be relative");
        var ptr = this;

        while (path.length > 0) {
          var part = path.shift();

          if (ptr.nested && ptr.nested[part]) {
            ptr = ptr.nested[part];
            if (!(ptr instanceof Namespace)) throw Error("path conflicts with non-namespace objects");
          } else ptr.add(ptr = new Namespace(part));
        }

        if (json) ptr.addJSON(json);
        return ptr;
      };
      /**
       * Resolves this namespace's and all its nested objects' type references. Useful to validate a reflection tree, but comes at a cost.
       * @returns {Namespace} `this`
       */


      Namespace.prototype.resolveAll = function resolveAll() {
        var nested = this.nestedArray,
            i = 0;

        while (i < nested.length) {
          if (nested[i] instanceof Namespace) nested[i++].resolveAll();else nested[i++].resolve();
        }

        return this.resolve();
      };
      /**
       * Recursively looks up the reflection object matching the specified path in the scope of this namespace.
       * @param {string|string[]} path Path to look up
       * @param {*|Array.<*>} filterTypes Filter types, any combination of the constructors of `protobuf.Type`, `protobuf.Enum`, `protobuf.Service` etc.
       * @param {boolean} [parentAlreadyChecked=false] If known, whether the parent has already been checked
       * @returns {ReflectionObject|null} Looked up object or `null` if none could be found
       */


      Namespace.prototype.lookup = function lookup(path, filterTypes, parentAlreadyChecked) {
        /* istanbul ignore next */
        if (typeof filterTypes === "boolean") {
          parentAlreadyChecked = filterTypes;
          filterTypes = undefined;
        } else if (filterTypes && !Array.isArray(filterTypes)) filterTypes = [filterTypes];

        if (util.isString(path) && path.length) {
          if (path === ".") return this.root;
          path = path.split(".");
        } else if (!path.length) return this; // Start at root if path is absolute


        if (path[0] === "") return this.root.lookup(path.slice(1), filterTypes); // Test if the first part matches any nested object, and if so, traverse if path contains more

        var found = this.get(path[0]);

        if (found) {
          if (path.length === 1) {
            if (!filterTypes || filterTypes.indexOf(found.constructor) > -1) return found;
          } else if (found instanceof Namespace && (found = found.lookup(path.slice(1), filterTypes, true))) return found; // Otherwise try each nested namespace

        } else for (var i = 0; i < this.nestedArray.length; ++i) {
          if (this._nestedArray[i] instanceof Namespace && (found = this._nestedArray[i].lookup(path, filterTypes, true))) return found;
        } // If there hasn't been a match, try again at the parent


        if (this.parent === null || parentAlreadyChecked) return null;
        return this.parent.lookup(path, filterTypes);
      };
      /**
       * Looks up the reflection object at the specified path, relative to this namespace.
       * @name NamespaceBase#lookup
       * @function
       * @param {string|string[]} path Path to look up
       * @param {boolean} [parentAlreadyChecked=false] Whether the parent has already been checked
       * @returns {ReflectionObject|null} Looked up object or `null` if none could be found
       * @variation 2
       */
      // lookup(path: string, [parentAlreadyChecked: boolean])

      /**
       * Looks up the {@link Type|type} at the specified path, relative to this namespace.
       * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
       * @param {string|string[]} path Path to look up
       * @returns {Type} Looked up type
       * @throws {Error} If `path` does not point to a type
       */


      Namespace.prototype.lookupType = function lookupType(path) {
        var found = this.lookup(path, [Type]);
        if (!found) throw Error("no such type: " + path);
        return found;
      };
      /**
       * Looks up the values of the {@link Enum|enum} at the specified path, relative to this namespace.
       * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
       * @param {string|string[]} path Path to look up
       * @returns {Enum} Looked up enum
       * @throws {Error} If `path` does not point to an enum
       */


      Namespace.prototype.lookupEnum = function lookupEnum(path) {
        var found = this.lookup(path, [Enum]);
        if (!found) throw Error("no such Enum '" + path + "' in " + this);
        return found;
      };
      /**
       * Looks up the {@link Type|type} or {@link Enum|enum} at the specified path, relative to this namespace.
       * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
       * @param {string|string[]} path Path to look up
       * @returns {Type} Looked up type or enum
       * @throws {Error} If `path` does not point to a type or enum
       */


      Namespace.prototype.lookupTypeOrEnum = function lookupTypeOrEnum(path) {
        var found = this.lookup(path, [Type, Enum]);
        if (!found) throw Error("no such Type or Enum '" + path + "' in " + this);
        return found;
      };
      /**
       * Looks up the {@link Service|service} at the specified path, relative to this namespace.
       * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
       * @param {string|string[]} path Path to look up
       * @returns {Service} Looked up service
       * @throws {Error} If `path` does not point to a service
       */


      Namespace.prototype.lookupService = function lookupService(path) {
        var found = this.lookup(path, [Service]);
        if (!found) throw Error("no such Service '" + path + "' in " + this);
        return found;
      };

      Namespace._configure = function (Type_, Service_) {
        Type = Type_;
        Service = Service_;
      };
    }, {
      "15": 15,
      "16": 16,
      "24": 24,
      "37": 37
    }],
    24: [function (require, module, exports) {
      "use strict";

      module.exports = ReflectionObject;
      ReflectionObject.className = "ReflectionObject";

      var util = require(37);

      var Root; // cyclic

      /**
       * Constructs a new reflection object instance.
       * @classdesc Base class of all reflection objects.
       * @constructor
       * @param {string} name Object name
       * @param {Object.<string,*>} [options] Declared options
       * @abstract
       */

      function ReflectionObject(name, options) {
        if (!util.isString(name)) throw TypeError("name must be a string");
        if (options && !util.isObject(options)) throw TypeError("options must be an object");
        /**
         * Options.
         * @type {Object.<string,*>|undefined}
         */

        this.options = options; // toJSON

        /**
         * Unique name within its namespace.
         * @type {string}
         */

        this.name = name;
        /**
         * Parent namespace.
         * @type {Namespace|null}
         */

        this.parent = null;
        /**
         * Whether already resolved or not.
         * @type {boolean}
         */

        this.resolved = false;
        /**
         * Comment text, if any.
         * @type {string|null}
         */

        this.comment = null;
        /**
         * Defining file name.
         * @type {string|null}
         */

        this.filename = null;
      }

      Object.defineProperties(ReflectionObject.prototype, {
        /**
         * Reference to the root namespace.
         * @name ReflectionObject#root
         * @type {Root}
         * @readonly
         */
        root: {
          get: function get() {
            var ptr = this;

            while (ptr.parent !== null) {
              ptr = ptr.parent;
            }

            return ptr;
          }
        },

        /**
         * Full name including leading dot.
         * @name ReflectionObject#fullName
         * @type {string}
         * @readonly
         */
        fullName: {
          get: function get() {
            var path = [this.name],
                ptr = this.parent;

            while (ptr) {
              path.unshift(ptr.name);
              ptr = ptr.parent;
            }

            return path.join(".");
          }
        }
      });
      /**
       * Converts this reflection object to its descriptor representation.
       * @returns {Object.<string,*>} Descriptor
       * @abstract
       */

      ReflectionObject.prototype.toJSON =
      /* istanbul ignore next */
      function toJSON() {
        throw Error(); // not implemented, shouldn't happen
      };
      /**
       * Called when this object is added to a parent.
       * @param {ReflectionObject} parent Parent added to
       * @returns {undefined}
       */


      ReflectionObject.prototype.onAdd = function onAdd(parent) {
        if (this.parent && this.parent !== parent) this.parent.remove(this);
        this.parent = parent;
        this.resolved = false;
        var root = parent.root;
        if (root instanceof Root) root._handleAdd(this);
      };
      /**
       * Called when this object is removed from a parent.
       * @param {ReflectionObject} parent Parent removed from
       * @returns {undefined}
       */


      ReflectionObject.prototype.onRemove = function onRemove(parent) {
        var root = parent.root;
        if (root instanceof Root) root._handleRemove(this);
        this.parent = null;
        this.resolved = false;
      };
      /**
       * Resolves this objects type references.
       * @returns {ReflectionObject} `this`
       */


      ReflectionObject.prototype.resolve = function resolve() {
        if (this.resolved) return this;
        if (this.root instanceof Root) this.resolved = true; // only if part of a root

        return this;
      };
      /**
       * Gets an option value.
       * @param {string} name Option name
       * @returns {*} Option value or `undefined` if not set
       */


      ReflectionObject.prototype.getOption = function getOption(name) {
        if (this.options) return this.options[name];
        return undefined;
      };
      /**
       * Sets an option.
       * @param {string} name Option name
       * @param {*} value Option value
       * @param {boolean} [ifNotSet] Sets the option only if it isn't currently set
       * @returns {ReflectionObject} `this`
       */


      ReflectionObject.prototype.setOption = function setOption(name, value, ifNotSet) {
        if (!ifNotSet || !this.options || this.options[name] === undefined) (this.options || (this.options = {}))[name] = value;
        return this;
      };
      /**
       * Sets multiple options.
       * @param {Object.<string,*>} options Options to set
       * @param {boolean} [ifNotSet] Sets an option only if it isn't currently set
       * @returns {ReflectionObject} `this`
       */


      ReflectionObject.prototype.setOptions = function setOptions(options, ifNotSet) {
        if (options) for (var keys = Object.keys(options), i = 0; i < keys.length; ++i) {
          this.setOption(keys[i], options[keys[i]], ifNotSet);
        }
        return this;
      };
      /**
       * Converts this instance to its string representation.
       * @returns {string} Class name[, space, full name]
       */


      ReflectionObject.prototype.toString = function toString() {
        var className = this.constructor.className,
            fullName = this.fullName;
        if (fullName.length) return className + " " + fullName;
        return className;
      };

      ReflectionObject._configure = function (Root_) {
        Root = Root_;
      };
    }, {
      "37": 37
    }],
    25: [function (require, module, exports) {
      "use strict";

      module.exports = OneOf; // extends ReflectionObject

      var ReflectionObject = require(24);

      ((OneOf.prototype = Object.create(ReflectionObject.prototype)).constructor = OneOf).className = "OneOf";

      var Field = require(16),
          util = require(37);
      /**
       * Constructs a new oneof instance.
       * @classdesc Reflected oneof.
       * @extends ReflectionObject
       * @constructor
       * @param {string} name Oneof name
       * @param {string[]|Object.<string,*>} [fieldNames] Field names
       * @param {Object.<string,*>} [options] Declared options
       * @param {string} [comment] Comment associated with this field
       */


      function OneOf(name, fieldNames, options, comment) {
        if (!Array.isArray(fieldNames)) {
          options = fieldNames;
          fieldNames = undefined;
        }

        ReflectionObject.call(this, name, options);
        /* istanbul ignore if */

        if (!(fieldNames === undefined || Array.isArray(fieldNames))) throw TypeError("fieldNames must be an Array");
        /**
         * Field names that belong to this oneof.
         * @type {string[]}
         */

        this.oneof = fieldNames || []; // toJSON, marker

        /**
         * Fields that belong to this oneof as an array for iteration.
         * @type {Field[]}
         * @readonly
         */

        this.fieldsArray = []; // declared readonly for conformance, possibly not yet added to parent

        /**
         * Comment for this field.
         * @type {string|null}
         */

        this.comment = comment;
      }
      /**
       * Oneof descriptor.
       * @interface IOneOf
       * @property {Array.<string>} oneof Oneof field names
       * @property {Object.<string,*>} [options] Oneof options
       */

      /**
       * Constructs a oneof from a oneof descriptor.
       * @param {string} name Oneof name
       * @param {IOneOf} json Oneof descriptor
       * @returns {OneOf} Created oneof
       * @throws {TypeError} If arguments are invalid
       */


      OneOf.fromJSON = function fromJSON(name, json) {
        return new OneOf(name, json.oneof, json.options, json.comment);
      };
      /**
       * Converts this oneof to a oneof descriptor.
       * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
       * @returns {IOneOf} Oneof descriptor
       */


      OneOf.prototype.toJSON = function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject(["options", this.options, "oneof", this.oneof, "comment", keepComments ? this.comment : undefined]);
      };
      /**
       * Adds the fields of the specified oneof to the parent if not already done so.
       * @param {OneOf} oneof The oneof
       * @returns {undefined}
       * @inner
       * @ignore
       */


      function addFieldsToParent(oneof) {
        if (oneof.parent) for (var i = 0; i < oneof.fieldsArray.length; ++i) {
          if (!oneof.fieldsArray[i].parent) oneof.parent.add(oneof.fieldsArray[i]);
        }
      }
      /**
       * Adds a field to this oneof and removes it from its current parent, if any.
       * @param {Field} field Field to add
       * @returns {OneOf} `this`
       */


      OneOf.prototype.add = function add(field) {
        /* istanbul ignore if */
        if (!(field instanceof Field)) throw TypeError("field must be a Field");
        if (field.parent && field.parent !== this.parent) field.parent.remove(field);
        this.oneof.push(field.name);
        this.fieldsArray.push(field);
        field.partOf = this; // field.parent remains null

        addFieldsToParent(this);
        return this;
      };
      /**
       * Removes a field from this oneof and puts it back to the oneof's parent.
       * @param {Field} field Field to remove
       * @returns {OneOf} `this`
       */


      OneOf.prototype.remove = function remove(field) {
        /* istanbul ignore if */
        if (!(field instanceof Field)) throw TypeError("field must be a Field");
        var index = this.fieldsArray.indexOf(field);
        /* istanbul ignore if */

        if (index < 0) throw Error(field + " is not a member of " + this);
        this.fieldsArray.splice(index, 1);
        index = this.oneof.indexOf(field.name);
        /* istanbul ignore else */

        if (index > -1) // theoretical
          this.oneof.splice(index, 1);
        field.partOf = null;
        return this;
      };
      /**
       * @override
       */


      OneOf.prototype.onAdd = function onAdd(parent) {
        ReflectionObject.prototype.onAdd.call(this, parent);
        var self = this; // Collect present fields

        for (var i = 0; i < this.oneof.length; ++i) {
          var field = parent.get(this.oneof[i]);

          if (field && !field.partOf) {
            field.partOf = self;
            self.fieldsArray.push(field);
          }
        } // Add not yet present fields


        addFieldsToParent(this);
      };
      /**
       * @override
       */


      OneOf.prototype.onRemove = function onRemove(parent) {
        for (var i = 0, field; i < this.fieldsArray.length; ++i) {
          if ((field = this.fieldsArray[i]).parent) field.parent.remove(field);
        }

        ReflectionObject.prototype.onRemove.call(this, parent);
      };
      /**
       * Decorator function as returned by {@link OneOf.d} (TypeScript).
       * @typedef OneOfDecorator
       * @type {function}
       * @param {Object} prototype Target prototype
       * @param {string} oneofName OneOf name
       * @returns {undefined}
       */

      /**
       * OneOf decorator (TypeScript).
       * @function
       * @param {...string} fieldNames Field names
       * @returns {OneOfDecorator} Decorator function
       * @template T extends string
       */


      OneOf.d = function decorateOneOf() {
        var fieldNames = new Array(arguments.length),
            index = 0;

        while (index < arguments.length) {
          fieldNames[index] = arguments[index++];
        }

        return function oneOfDecorator(prototype, oneofName) {
          util.decorateType(prototype.constructor).add(new OneOf(oneofName, fieldNames));
          Object.defineProperty(prototype, oneofName, {
            get: util.oneOfGetter(fieldNames),
            set: util.oneOfSetter(fieldNames)
          });
        };
      };
    }, {
      "16": 16,
      "24": 24,
      "37": 37
    }],
    26: [function (require, module, exports) {
      "use strict";

      module.exports = parse;
      parse.filename = null;
      parse.defaults = {
        keepCase: false
      };

      var tokenize = require(34),
          Root = require(29),
          Type = require(35),
          Field = require(16),
          MapField = require(20),
          OneOf = require(25),
          Enum = require(15),
          Service = require(33),
          Method = require(22),
          types = require(36),
          util = require(37);

      var base10Re = /^[1-9][0-9]*$/,
          base10NegRe = /^-?[1-9][0-9]*$/,
          base16Re = /^0[x][0-9a-fA-F]+$/,
          base16NegRe = /^-?0[x][0-9a-fA-F]+$/,
          base8Re = /^0[0-7]+$/,
          base8NegRe = /^-?0[0-7]+$/,
          numberRe = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/,
          nameRe = /^[a-zA-Z_][a-zA-Z_0-9]*$/,
          typeRefRe = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)(?:\.[a-zA-Z_][a-zA-Z_0-9]*)*$/,
          fqTypeRefRe = /^(?:\.[a-zA-Z_][a-zA-Z_0-9]*)+$/;
      /**
       * Result object returned from {@link parse}.
       * @interface IParserResult
       * @property {string|undefined} package Package name, if declared
       * @property {string[]|undefined} imports Imports, if any
       * @property {string[]|undefined} weakImports Weak imports, if any
       * @property {string|undefined} syntax Syntax, if specified (either `"proto2"` or `"proto3"`)
       * @property {Root} root Populated root instance
       */

      /**
       * Options modifying the behavior of {@link parse}.
       * @interface IParseOptions
       * @property {boolean} [keepCase=false] Keeps field casing instead of converting to camel case
       * @property {boolean} [alternateCommentMode=false] Recognize double-slash comments in addition to doc-block comments.
       */

      /**
       * Options modifying the behavior of JSON serialization.
       * @interface IToJSONOptions
       * @property {boolean} [keepComments=false] Serializes comments.
       */

      /**
       * Parses the given .proto source and returns an object with the parsed contents.
       * @param {string} source Source contents
       * @param {Root} root Root to populate
       * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
       * @returns {IParserResult} Parser result
       * @property {string} filename=null Currently processing file name for error reporting, if known
       * @property {IParseOptions} defaults Default {@link IParseOptions}
       */

      function parse(source, root, options) {
        /* eslint-disable callback-return */
        if (!(root instanceof Root)) {
          options = root;
          root = new Root();
        }

        if (!options) options = parse.defaults;
        var tn = tokenize(source, options.alternateCommentMode || false),
            next = tn.next,
            push = tn.push,
            peek = tn.peek,
            skip = tn.skip,
            cmnt = tn.cmnt;
        var head = true,
            pkg,
            imports,
            weakImports,
            syntax,
            isProto3 = false;
        var ptr = root;
        var applyCase = options.keepCase ? function (name) {
          return name;
        } : util.camelCase;
        /* istanbul ignore next */

        function illegal(token, name, insideTryCatch) {
          var filename = parse.filename;
          if (!insideTryCatch) parse.filename = null;
          return Error("illegal " + (name || "token") + " '" + token + "' (" + (filename ? filename + ", " : "") + "line " + tn.line + ")");
        }

        function readString() {
          var values = [],
              token;

          do {
            /* istanbul ignore if */
            if ((token = next()) !== "\"" && token !== "'") throw illegal(token);
            values.push(next());
            skip(token);
            token = peek();
          } while (token === "\"" || token === "'");

          return values.join("");
        }

        function readValue(acceptTypeRef) {
          var token = next();

          switch (token) {
            case "'":
            case "\"":
              push(token);
              return readString();

            case "true":
            case "TRUE":
              return true;

            case "false":
            case "FALSE":
              return false;
          }

          try {
            return parseNumber(token,
            /* insideTryCatch */
            true);
          } catch (e) {
            /* istanbul ignore else */
            if (acceptTypeRef && typeRefRe.test(token)) return token;
            /* istanbul ignore next */

            throw illegal(token, "value");
          }
        }

        function readRanges(target, acceptStrings) {
          var token, start;

          do {
            if (acceptStrings && ((token = peek()) === "\"" || token === "'")) target.push(readString());else target.push([start = parseId(next()), skip("to", true) ? parseId(next()) : start]);
          } while (skip(",", true));

          skip(";");
        }

        function parseNumber(token, insideTryCatch) {
          var sign = 1;

          if (token.charAt(0) === "-") {
            sign = -1;
            token = token.substring(1);
          }

          switch (token) {
            case "inf":
            case "INF":
            case "Inf":
              return sign * Infinity;

            case "nan":
            case "NAN":
            case "Nan":
            case "NaN":
              return NaN;

            case "0":
              return 0;
          }

          if (base10Re.test(token)) return sign * parseInt(token, 10);
          if (base16Re.test(token)) return sign * parseInt(token, 16);
          if (base8Re.test(token)) return sign * parseInt(token, 8);
          /* istanbul ignore else */

          if (numberRe.test(token)) return sign * parseFloat(token);
          /* istanbul ignore next */

          throw illegal(token, "number", insideTryCatch);
        }

        function parseId(token, acceptNegative) {
          switch (token) {
            case "max":
            case "MAX":
            case "Max":
              return 536870911;

            case "0":
              return 0;
          }
          /* istanbul ignore if */


          if (!acceptNegative && token.charAt(0) === "-") throw illegal(token, "id");
          if (base10NegRe.test(token)) return parseInt(token, 10);
          if (base16NegRe.test(token)) return parseInt(token, 16);
          /* istanbul ignore else */

          if (base8NegRe.test(token)) return parseInt(token, 8);
          /* istanbul ignore next */

          throw illegal(token, "id");
        }

        function parsePackage() {
          /* istanbul ignore if */
          if (pkg !== undefined) throw illegal("package");
          pkg = next();
          /* istanbul ignore if */

          if (!typeRefRe.test(pkg)) throw illegal(pkg, "name");
          ptr = ptr.define(pkg);
          skip(";");
        }

        function parseImport() {
          var token = peek();
          var whichImports;

          switch (token) {
            case "weak":
              whichImports = weakImports || (weakImports = []);
              next();
              break;

            case "public":
              next();
            // eslint-disable-line no-fallthrough

            default:
              whichImports = imports || (imports = []);
              break;
          }

          token = readString();
          skip(";");
          whichImports.push(token);
        }

        function parseSyntax() {
          skip("=");
          syntax = readString();
          isProto3 = syntax === "proto3";
          /* istanbul ignore if */

          if (!isProto3 && syntax !== "proto2") throw illegal(syntax, "syntax");
          skip(";");
        }

        function parseCommon(parent, token) {
          switch (token) {
            case "option":
              parseOption(parent, token);
              skip(";");
              return true;

            case "message":
              parseType(parent, token);
              return true;

            case "enum":
              parseEnum(parent, token);
              return true;

            case "service":
              parseService(parent, token);
              return true;

            case "extend":
              parseExtension(parent, token);
              return true;
          }

          return false;
        }

        function ifBlock(obj, fnIf, fnElse) {
          var trailingLine = tn.line;

          if (obj) {
            obj.comment = cmnt(); // try block-type comment

            obj.filename = parse.filename;
          }

          if (skip("{", true)) {
            var token;

            while ((token = next()) !== "}") {
              fnIf(token);
            }

            skip(";", true);
          } else {
            if (fnElse) fnElse();
            skip(";");
            if (obj && typeof obj.comment !== "string") obj.comment = cmnt(trailingLine); // try line-type comment if no block
          }
        }

        function parseType(parent, token) {
          /* istanbul ignore if */
          if (!nameRe.test(token = next())) throw illegal(token, "type name");
          var type = new Type(token);
          ifBlock(type, function parseType_block(token) {
            if (parseCommon(type, token)) return;

            switch (token) {
              case "map":
                parseMapField(type, token);
                break;

              case "required":
              case "optional":
              case "repeated":
                parseField(type, token);
                break;

              case "oneof":
                parseOneOf(type, token);
                break;

              case "extensions":
                readRanges(type.extensions || (type.extensions = []));
                break;

              case "reserved":
                readRanges(type.reserved || (type.reserved = []), true);
                break;

              default:
                /* istanbul ignore if */
                if (!isProto3 || !typeRefRe.test(token)) throw illegal(token);
                push(token);
                parseField(type, "optional");
                break;
            }
          });
          parent.add(type);
        }

        function parseField(parent, rule, extend) {
          var type = next();

          if (type === "group") {
            parseGroup(parent, rule);
            return;
          }
          /* istanbul ignore if */


          if (!typeRefRe.test(type)) throw illegal(type, "type");
          var name = next();
          /* istanbul ignore if */

          if (!nameRe.test(name)) throw illegal(name, "name");
          name = applyCase(name);
          skip("=");
          var field = new Field(name, parseId(next()), type, rule, extend);
          ifBlock(field, function parseField_block(token) {
            /* istanbul ignore else */
            if (token === "option") {
              parseOption(field, token);
              skip(";");
            } else throw illegal(token);
          }, function parseField_line() {
            parseInlineOptions(field);
          });
          parent.add(field); // JSON defaults to packed=true if not set so we have to set packed=false explicity when
          // parsing proto2 descriptors without the option, where applicable. This must be done for
          // all known packable types and anything that could be an enum (= is not a basic type).

          if (!isProto3 && field.repeated && (types.packed[type] !== undefined || types.basic[type] === undefined)) field.setOption("packed", false,
          /* ifNotSet */
          true);
        }

        function parseGroup(parent, rule) {
          var name = next();
          /* istanbul ignore if */

          if (!nameRe.test(name)) throw illegal(name, "name");
          var fieldName = util.lcFirst(name);
          if (name === fieldName) name = util.ucFirst(name);
          skip("=");
          var id = parseId(next());
          var type = new Type(name);
          type.group = true;
          var field = new Field(fieldName, id, name, rule);
          field.filename = parse.filename;
          ifBlock(type, function parseGroup_block(token) {
            switch (token) {
              case "option":
                parseOption(type, token);
                skip(";");
                break;

              case "required":
              case "optional":
              case "repeated":
                parseField(type, token);
                break;

              /* istanbul ignore next */

              default:
                throw illegal(token);
              // there are no groups with proto3 semantics
            }
          });
          parent.add(type).add(field);
        }

        function parseMapField(parent) {
          skip("<");
          var keyType = next();
          /* istanbul ignore if */

          if (types.mapKey[keyType] === undefined) throw illegal(keyType, "type");
          skip(",");
          var valueType = next();
          /* istanbul ignore if */

          if (!typeRefRe.test(valueType)) throw illegal(valueType, "type");
          skip(">");
          var name = next();
          /* istanbul ignore if */

          if (!nameRe.test(name)) throw illegal(name, "name");
          skip("=");
          var field = new MapField(applyCase(name), parseId(next()), keyType, valueType);
          ifBlock(field, function parseMapField_block(token) {
            /* istanbul ignore else */
            if (token === "option") {
              parseOption(field, token);
              skip(";");
            } else throw illegal(token);
          }, function parseMapField_line() {
            parseInlineOptions(field);
          });
          parent.add(field);
        }

        function parseOneOf(parent, token) {
          /* istanbul ignore if */
          if (!nameRe.test(token = next())) throw illegal(token, "name");
          var oneof = new OneOf(applyCase(token));
          ifBlock(oneof, function parseOneOf_block(token) {
            if (token === "option") {
              parseOption(oneof, token);
              skip(";");
            } else {
              push(token);
              parseField(oneof, "optional");
            }
          });
          parent.add(oneof);
        }

        function parseEnum(parent, token) {
          /* istanbul ignore if */
          if (!nameRe.test(token = next())) throw illegal(token, "name");
          var enm = new Enum(token);
          ifBlock(enm, function parseEnum_block(token) {
            switch (token) {
              case "option":
                parseOption(enm, token);
                skip(";");
                break;

              case "reserved":
                readRanges(enm.reserved || (enm.reserved = []), true);
                break;

              default:
                parseEnumValue(enm, token);
            }
          });
          parent.add(enm);
        }

        function parseEnumValue(parent, token) {
          /* istanbul ignore if */
          if (!nameRe.test(token)) throw illegal(token, "name");
          skip("=");
          var value = parseId(next(), true),
              dummy = {};
          ifBlock(dummy, function parseEnumValue_block(token) {
            /* istanbul ignore else */
            if (token === "option") {
              parseOption(dummy, token); // skip

              skip(";");
            } else throw illegal(token);
          }, function parseEnumValue_line() {
            parseInlineOptions(dummy); // skip
          });
          parent.add(token, value, dummy.comment);
        }

        function parseOption(parent, token) {
          var isCustom = skip("(", true);
          /* istanbul ignore if */

          if (!typeRefRe.test(token = next())) throw illegal(token, "name");
          var name = token;

          if (isCustom) {
            skip(")");
            name = "(" + name + ")";
            token = peek();

            if (fqTypeRefRe.test(token)) {
              name += token;
              next();
            }
          }

          skip("=");
          parseOptionValue(parent, name);
        }

        function parseOptionValue(parent, name) {
          if (skip("{", true)) {
            // { a: "foo" b { c: "bar" } }
            do {
              /* istanbul ignore if */
              if (!nameRe.test(token = next())) throw illegal(token, "name");
              if (peek() === "{") parseOptionValue(parent, name + "." + token);else {
                skip(":");
                if (peek() === "{") parseOptionValue(parent, name + "." + token);else setOption(parent, name + "." + token, readValue(true));
              }
            } while (!skip("}", true));
          } else setOption(parent, name, readValue(true)); // Does not enforce a delimiter to be universal

        }

        function setOption(parent, name, value) {
          if (parent.setOption) parent.setOption(name, value);
        }

        function parseInlineOptions(parent) {
          if (skip("[", true)) {
            do {
              parseOption(parent, "option");
            } while (skip(",", true));

            skip("]");
          }

          return parent;
        }

        function parseService(parent, token) {
          /* istanbul ignore if */
          if (!nameRe.test(token = next())) throw illegal(token, "service name");
          var service = new Service(token);
          ifBlock(service, function parseService_block(token) {
            if (parseCommon(service, token)) return;
            /* istanbul ignore else */

            if (token === "rpc") parseMethod(service, token);else throw illegal(token);
          });
          parent.add(service);
        }

        function parseMethod(parent, token) {
          var type = token;
          /* istanbul ignore if */

          if (!nameRe.test(token = next())) throw illegal(token, "name");
          var name = token,
              requestType,
              requestStream,
              responseType,
              responseStream;
          skip("(");
          if (skip("stream", true)) requestStream = true;
          /* istanbul ignore if */

          if (!typeRefRe.test(token = next())) throw illegal(token);
          requestType = token;
          skip(")");
          skip("returns");
          skip("(");
          if (skip("stream", true)) responseStream = true;
          /* istanbul ignore if */

          if (!typeRefRe.test(token = next())) throw illegal(token);
          responseType = token;
          skip(")");
          var method = new Method(name, type, requestType, responseType, requestStream, responseStream);
          ifBlock(method, function parseMethod_block(token) {
            /* istanbul ignore else */
            if (token === "option") {
              parseOption(method, token);
              skip(";");
            } else throw illegal(token);
          });
          parent.add(method);
        }

        function parseExtension(parent, token) {
          /* istanbul ignore if */
          if (!typeRefRe.test(token = next())) throw illegal(token, "reference");
          var reference = token;
          ifBlock(null, function parseExtension_block(token) {
            switch (token) {
              case "required":
              case "repeated":
              case "optional":
                parseField(parent, token, reference);
                break;

              default:
                /* istanbul ignore if */
                if (!isProto3 || !typeRefRe.test(token)) throw illegal(token);
                push(token);
                parseField(parent, "optional", reference);
                break;
            }
          });
        }

        var token;

        while ((token = next()) !== null) {
          switch (token) {
            case "package":
              /* istanbul ignore if */
              if (!head) throw illegal(token);
              parsePackage();
              break;

            case "import":
              /* istanbul ignore if */
              if (!head) throw illegal(token);
              parseImport();
              break;

            case "syntax":
              /* istanbul ignore if */
              if (!head) throw illegal(token);
              parseSyntax();
              break;

            case "option":
              /* istanbul ignore if */
              if (!head) throw illegal(token);
              parseOption(ptr, token);
              skip(";");
              break;

            default:
              /* istanbul ignore else */
              if (parseCommon(ptr, token)) {
                head = false;
                continue;
              }
              /* istanbul ignore next */


              throw illegal(token);
          }
        }

        parse.filename = null;
        return {
          "package": pkg,
          "imports": imports,
          weakImports: weakImports,
          syntax: syntax,
          root: root
        };
      }
      /**
       * Parses the given .proto source and returns an object with the parsed contents.
       * @name parse
       * @function
       * @param {string} source Source contents
       * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
       * @returns {IParserResult} Parser result
       * @property {string} filename=null Currently processing file name for error reporting, if known
       * @property {IParseOptions} defaults Default {@link IParseOptions}
       * @variation 2
       */

    }, {
      "15": 15,
      "16": 16,
      "20": 20,
      "22": 22,
      "25": 25,
      "29": 29,
      "33": 33,
      "34": 34,
      "35": 35,
      "36": 36,
      "37": 37
    }],
    27: [function (require, module, exports) {
      "use strict";

      module.exports = Reader;

      var util = require(39);

      var BufferReader; // cyclic

      var LongBits = util.LongBits,
          utf8 = util.utf8;
      /* istanbul ignore next */

      function indexOutOfRange(reader, writeLength) {
        return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
      }
      /**
       * Constructs a new reader instance using the specified buffer.
       * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
       * @constructor
       * @param {Uint8Array} buffer Buffer to read from
       */


      function Reader(buffer) {
        /**
         * Read buffer.
         * @type {Uint8Array}
         */
        this.buf = buffer;
        /**
         * Read buffer position.
         * @type {number}
         */

        this.pos = 0;
        /**
         * Read buffer length.
         * @type {number}
         */

        this.len = buffer.length;
      }

      var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
        if (buffer instanceof Uint8Array || Array.isArray(buffer)) return new Reader(buffer);
        throw Error("illegal buffer");
      }
      /* istanbul ignore next */
      : function create_array(buffer) {
        if (Array.isArray(buffer)) return new Reader(buffer);
        throw Error("illegal buffer");
      };
      /**
       * Creates a new reader using the specified buffer.
       * @function
       * @param {Uint8Array|Buffer} buffer Buffer to read from
       * @returns {Reader|BufferReader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
       * @throws {Error} If `buffer` is not a valid buffer
       */

      Reader.create = util.Buffer ? function create_buffer_setup(buffer) {
        return (Reader.create = function create_buffer(buffer) {
          return util.Buffer.isBuffer(buffer) ? new BufferReader(buffer)
          /* istanbul ignore next */
          : create_array(buffer);
        })(buffer);
      }
      /* istanbul ignore next */
      : create_array;
      Reader.prototype._slice = util.Array.prototype.subarray ||
      /* istanbul ignore next */
      util.Array.prototype.slice;
      /**
       * Reads a varint as an unsigned 32 bit value.
       * @function
       * @returns {number} Value read
       */

      Reader.prototype.uint32 = function read_uint32_setup() {
        var value = 4294967295; // optimizer type-hint, tends to deopt otherwise (?!)

        return function read_uint32() {
          value = (this.buf[this.pos] & 127) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          /* istanbul ignore if */

          if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
          }

          return value;
        };
      }();
      /**
       * Reads a varint as a signed 32 bit value.
       * @returns {number} Value read
       */


      Reader.prototype.int32 = function read_int32() {
        return this.uint32() | 0;
      };
      /**
       * Reads a zig-zag encoded varint as a signed 32 bit value.
       * @returns {number} Value read
       */


      Reader.prototype.sint32 = function read_sint32() {
        var value = this.uint32();
        return value >>> 1 ^ -(value & 1) | 0;
      };
      /* eslint-disable no-invalid-this */


      function readLongVarint() {
        // tends to deopt with local vars for octet etc.
        var bits = new LongBits(0, 0);
        var i = 0;

        if (this.len - this.pos > 4) {
          // fast route (lo)
          for (; i < 4; ++i) {
            // 1st..4th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
          } // 5th


          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
          if (this.buf[this.pos++] < 128) return bits;
          i = 0;
        } else {
          for (; i < 3; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len) throw indexOutOfRange(this); // 1st..3th

            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
          } // 4th


          bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
          return bits;
        }

        if (this.len - this.pos > 4) {
          // fast route (hi)
          for (; i < 5; ++i) {
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
          }
        } else {
          for (; i < 5; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len) throw indexOutOfRange(this); // 6th..10th

            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
          }
        }
        /* istanbul ignore next */


        throw Error("invalid varint encoding");
      }
      /* eslint-enable no-invalid-this */

      /**
       * Reads a varint as a signed 64 bit value.
       * @name Reader#int64
       * @function
       * @returns {Long} Value read
       */

      /**
       * Reads a varint as an unsigned 64 bit value.
       * @name Reader#uint64
       * @function
       * @returns {Long} Value read
       */

      /**
       * Reads a zig-zag encoded varint as a signed 64 bit value.
       * @name Reader#sint64
       * @function
       * @returns {Long} Value read
       */

      /**
       * Reads a varint as a boolean.
       * @returns {boolean} Value read
       */


      Reader.prototype.bool = function read_bool() {
        return this.uint32() !== 0;
      };

      function readFixed32_end(buf, end) {
        // note that this uses `end`, not `pos`
        return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
      }
      /**
       * Reads fixed 32 bits as an unsigned 32 bit integer.
       * @returns {number} Value read
       */


      Reader.prototype.fixed32 = function read_fixed32() {
        /* istanbul ignore if */
        if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
        return readFixed32_end(this.buf, this.pos += 4);
      };
      /**
       * Reads fixed 32 bits as a signed 32 bit integer.
       * @returns {number} Value read
       */


      Reader.prototype.sfixed32 = function read_sfixed32() {
        /* istanbul ignore if */
        if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
        return readFixed32_end(this.buf, this.pos += 4) | 0;
      };
      /* eslint-disable no-invalid-this */


      function readFixed64()
      /* this: Reader */
      {
        /* istanbul ignore if */
        if (this.pos + 8 > this.len) throw indexOutOfRange(this, 8);
        return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
      }
      /* eslint-enable no-invalid-this */

      /**
       * Reads fixed 64 bits.
       * @name Reader#fixed64
       * @function
       * @returns {Long} Value read
       */

      /**
       * Reads zig-zag encoded fixed 64 bits.
       * @name Reader#sfixed64
       * @function
       * @returns {Long} Value read
       */

      /**
       * Reads a float (32 bit) as a number.
       * @function
       * @returns {number} Value read
       */


      Reader.prototype["float"] = function read_float() {
        /* istanbul ignore if */
        if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
        var value = util["float"].readFloatLE(this.buf, this.pos);
        this.pos += 4;
        return value;
      };
      /**
       * Reads a double (64 bit float) as a number.
       * @function
       * @returns {number} Value read
       */


      Reader.prototype["double"] = function read_double() {
        /* istanbul ignore if */
        if (this.pos + 8 > this.len) throw indexOutOfRange(this, 4);
        var value = util["float"].readDoubleLE(this.buf, this.pos);
        this.pos += 8;
        return value;
      };
      /**
       * Reads a sequence of bytes preceeded by its length as a varint.
       * @returns {Uint8Array} Value read
       */


      Reader.prototype.bytes = function read_bytes() {
        var length = this.uint32(),
            start = this.pos,
            end = this.pos + length;
        /* istanbul ignore if */

        if (end > this.len) throw indexOutOfRange(this, length);
        this.pos += length;
        if (Array.isArray(this.buf)) // plain array
          return this.buf.slice(start, end);
        return start === end // fix for IE 10/Win8 and others' subarray returning array of size 1
        ? new this.buf.constructor(0) : this._slice.call(this.buf, start, end);
      };
      /**
       * Reads a string preceeded by its byte length as a varint.
       * @returns {string} Value read
       */


      Reader.prototype.string = function read_string() {
        var bytes = this.bytes();
        return utf8.read(bytes, 0, bytes.length);
      };
      /**
       * Skips the specified number of bytes if specified, otherwise skips a varint.
       * @param {number} [length] Length if known, otherwise a varint is assumed
       * @returns {Reader} `this`
       */


      Reader.prototype.skip = function skip(length) {
        if (typeof length === "number") {
          /* istanbul ignore if */
          if (this.pos + length > this.len) throw indexOutOfRange(this, length);
          this.pos += length;
        } else {
          do {
            /* istanbul ignore if */
            if (this.pos >= this.len) throw indexOutOfRange(this);
          } while (this.buf[this.pos++] & 128);
        }

        return this;
      };
      /**
       * Skips the next element of the specified wire type.
       * @param {number} wireType Wire type received
       * @returns {Reader} `this`
       */


      Reader.prototype.skipType = function (wireType) {
        switch (wireType) {
          case 0:
            this.skip();
            break;

          case 1:
            this.skip(8);
            break;

          case 2:
            this.skip(this.uint32());
            break;

          case 3:
            do {
              // eslint-disable-line no-constant-condition
              if ((wireType = this.uint32() & 7) === 4) break;
              this.skipType(wireType);
            } while (true);

            break;

          case 5:
            this.skip(4);
            break;

          /* istanbul ignore next */

          default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
        }

        return this;
      };

      Reader._configure = function (BufferReader_) {
        BufferReader = BufferReader_;
        var fn = util.Long ? "toLong" :
        /* istanbul ignore next */
        "toNumber";
        util.merge(Reader.prototype, {
          int64: function read_int64() {
            return readLongVarint.call(this)[fn](false);
          },
          uint64: function read_uint64() {
            return readLongVarint.call(this)[fn](true);
          },
          sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
          },
          fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn](true);
          },
          sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
          }
        });
      };
    }, {
      "39": 39
    }],
    28: [function (require, module, exports) {
      "use strict";

      module.exports = BufferReader; // extends Reader

      var Reader = require(27);

      (BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;

      var util = require(39);
      /**
       * Constructs a new buffer reader instance.
       * @classdesc Wire format reader using node buffers.
       * @extends Reader
       * @constructor
       * @param {Buffer} buffer Buffer to read from
       */


      function BufferReader(buffer) {
        Reader.call(this, buffer);
        /**
         * Read buffer.
         * @name BufferReader#buf
         * @type {Buffer}
         */
      }
      /* istanbul ignore else */


      if (util.Buffer) BufferReader.prototype._slice = util.Buffer.prototype.slice;
      /**
       * @override
       */

      BufferReader.prototype.string = function read_string_buffer() {
        var len = this.uint32(); // modifies pos

        return this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len));
      };
      /**
       * Reads a sequence of bytes preceeded by its length as a varint.
       * @name BufferReader#bytes
       * @function
       * @returns {Buffer} Value read
       */

    }, {
      "27": 27,
      "39": 39
    }],
    29: [function (require, module, exports) {
      "use strict";

      module.exports = Root; // extends Namespace

      var Namespace = require(23);

      ((Root.prototype = Object.create(Namespace.prototype)).constructor = Root).className = "Root";

      var Field = require(16),
          Enum = require(15),
          OneOf = require(25),
          util = require(37);

      var Type, // cyclic
      parse, // might be excluded
      common; // "

      /**
       * Constructs a new root namespace instance.
       * @classdesc Root namespace wrapping all types, enums, services, sub-namespaces etc. that belong together.
       * @extends NamespaceBase
       * @constructor
       * @param {Object.<string,*>} [options] Top level options
       */

      function Root(options) {
        Namespace.call(this, "", options);
        /**
         * Deferred extension fields.
         * @type {Field[]}
         */

        this.deferred = [];
        /**
         * Resolved file names of loaded files.
         * @type {string[]}
         */

        this.files = [];
      }
      /**
       * Loads a namespace descriptor into a root namespace.
       * @param {INamespace} json Nameespace descriptor
       * @param {Root} [root] Root namespace, defaults to create a new one if omitted
       * @returns {Root} Root namespace
       */


      Root.fromJSON = function fromJSON(json, root) {
        if (!root) root = new Root();
        if (json.options) root.setOptions(json.options);
        return root.addJSON(json.nested);
      };
      /**
       * Resolves the path of an imported file, relative to the importing origin.
       * This method exists so you can override it with your own logic in case your imports are scattered over multiple directories.
       * @function
       * @param {string} origin The file name of the importing file
       * @param {string} target The file name being imported
       * @returns {string|null} Resolved path to `target` or `null` to skip the file
       */


      Root.prototype.resolvePath = util.path.resolve; // A symbol-like function to safely signal synchronous loading

      /* istanbul ignore next */

      function SYNC() {} // eslint-disable-line no-empty-function

      /**
       * Loads one or multiple .proto or preprocessed .json files into this root namespace and calls the callback.
       * @param {string|string[]} filename Names of one or multiple files to load
       * @param {IParseOptions} options Parse options
       * @param {LoadCallback} callback Callback function
       * @returns {undefined}
       */


      Root.prototype.load = function load(filename, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = undefined;
        }

        var self = this;
        if (!callback) return util.asPromise(load, self, filename, options);
        var sync = callback === SYNC; // undocumented
        // Finishes loading by calling the callback (exactly once)

        function finish(err, root) {
          /* istanbul ignore if */
          if (!callback) return;
          var cb = callback;
          callback = null;
          if (sync) throw err;
          cb(err, root);
        } // Processes a single file


        function process(filename, source) {
          try {
            if (util.isString(source) && source.charAt(0) === "{") source = JSON.parse(source);
            if (!util.isString(source)) self.setOptions(source.options).addJSON(source.nested);else {
              parse.filename = filename;
              var parsed = parse(source, self, options),
                  resolved,
                  i = 0;
              if (parsed.imports) for (; i < parsed.imports.length; ++i) {
                if (resolved = self.resolvePath(filename, parsed.imports[i])) fetch(resolved);
              }
              if (parsed.weakImports) for (i = 0; i < parsed.weakImports.length; ++i) {
                if (resolved = self.resolvePath(filename, parsed.weakImports[i])) fetch(resolved, true);
              }
            }
          } catch (err) {
            finish(err);
          }

          if (!sync && !queued) finish(null, self); // only once anyway
        } // Fetches a single file


        function fetch(filename, weak) {
          // Strip path if this file references a bundled definition
          var idx = filename.lastIndexOf("google/protobuf/");

          if (idx > -1) {
            var altname = filename.substring(idx);
            if (altname in common) filename = altname;
          } // Skip if already loaded / attempted


          if (self.files.indexOf(filename) > -1) return;
          self.files.push(filename); // Shortcut bundled definitions

          if (filename in common) {
            if (sync) process(filename, common[filename]);else {
              ++queued;
              setTimeout(function () {
                --queued;
                process(filename, common[filename]);
              });
            }
            return;
          } // Otherwise fetch from disk or network


          if (sync) {
            var source;

            try {
              source = util.fs.readFileSync(filename).toString("utf8");
            } catch (err) {
              if (!weak) finish(err);
              return;
            }

            process(filename, source);
          } else {
            ++queued;
            util.fetch(filename, function (err, source) {
              --queued;
              /* istanbul ignore if */

              if (!callback) return; // terminated meanwhile

              if (err) {
                /* istanbul ignore else */
                if (!weak) finish(err);else if (!queued) // can't be covered reliably
                  finish(null, self);
                return;
              }

              process(filename, source);
            });
          }
        }

        var queued = 0; // Assembling the root namespace doesn't require working type
        // references anymore, so we can load everything in parallel

        if (util.isString(filename)) filename = [filename];

        for (var i = 0, resolved; i < filename.length; ++i) {
          if (resolved = self.resolvePath("", filename[i])) fetch(resolved);
        }

        if (sync) return self;
        if (!queued) finish(null, self);
        return undefined;
      }; // function load(filename:string, options:IParseOptions, callback:LoadCallback):undefined

      /**
       * Loads one or multiple .proto or preprocessed .json files into this root namespace and calls the callback.
       * @function Root#load
       * @param {string|string[]} filename Names of one or multiple files to load
       * @param {LoadCallback} callback Callback function
       * @returns {undefined}
       * @variation 2
       */
      // function load(filename:string, callback:LoadCallback):undefined

      /**
       * Loads one or multiple .proto or preprocessed .json files into this root namespace and returns a promise.
       * @function Root#load
       * @param {string|string[]} filename Names of one or multiple files to load
       * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
       * @returns {Promise<Root>} Promise
       * @variation 3
       */
      // function load(filename:string, [options:IParseOptions]):Promise<Root>

      /**
       * Synchronously loads one or multiple .proto or preprocessed .json files into this root namespace (node only).
       * @function Root#loadSync
       * @param {string|string[]} filename Names of one or multiple files to load
       * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
       * @returns {Root} Root namespace
       * @throws {Error} If synchronous fetching is not supported (i.e. in browsers) or if a file's syntax is invalid
       */


      Root.prototype.loadSync = function loadSync(filename, options) {
        if (!util.isNode) throw Error("not supported");
        return this.load(filename, options, SYNC);
      };
      /**
       * @override
       */


      Root.prototype.resolveAll = function resolveAll() {
        if (this.deferred.length) throw Error("unresolvable extensions: " + this.deferred.map(function (field) {
          return "'extend " + field.extend + "' in " + field.parent.fullName;
        }).join(", "));
        return Namespace.prototype.resolveAll.call(this);
      }; // only uppercased (and thus conflict-free) children are exposed, see below


      var exposeRe = /^[A-Z]/;
      /**
       * Handles a deferred declaring extension field by creating a sister field to represent it within its extended type.
       * @param {Root} root Root instance
       * @param {Field} field Declaring extension field witin the declaring type
       * @returns {boolean} `true` if successfully added to the extended type, `false` otherwise
       * @inner
       * @ignore
       */

      function tryHandleExtension(root, field) {
        var extendedType = field.parent.lookup(field.extend);

        if (extendedType) {
          var sisterField = new Field(field.fullName, field.id, field.type, field.rule, undefined, field.options);
          sisterField.declaringField = field;
          field.extensionField = sisterField;
          extendedType.add(sisterField);
          return true;
        }

        return false;
      }
      /**
       * Called when any object is added to this root or its sub-namespaces.
       * @param {ReflectionObject} object Object added
       * @returns {undefined}
       * @private
       */


      Root.prototype._handleAdd = function _handleAdd(object) {
        if (object instanceof Field) {
          if (
          /* an extension field (implies not part of a oneof) */
          object.extend !== undefined &&
          /* not already handled */
          !object.extensionField) if (!tryHandleExtension(this, object)) this.deferred.push(object);
        } else if (object instanceof Enum) {
          if (exposeRe.test(object.name)) object.parent[object.name] = object.values; // expose enum values as property of its parent
        } else if (!(object instanceof OneOf))
          /* everything else is a namespace */
          {
            if (object instanceof Type) // Try to handle any deferred extensions
              for (var i = 0; i < this.deferred.length;) {
                if (tryHandleExtension(this, this.deferred[i])) this.deferred.splice(i, 1);else ++i;
              }

            for (var j = 0; j <
            /* initializes */
            object.nestedArray.length; ++j) {
              // recurse into the namespace
              this._handleAdd(object._nestedArray[j]);
            }

            if (exposeRe.test(object.name)) object.parent[object.name] = object; // expose namespace as property of its parent
          } // The above also adds uppercased (and thus conflict-free) nested types, services and enums as
        // properties of namespaces just like static code does. This allows using a .d.ts generated for
        // a static module with reflection-based solutions where the condition is met.

      };
      /**
       * Called when any object is removed from this root or its sub-namespaces.
       * @param {ReflectionObject} object Object removed
       * @returns {undefined}
       * @private
       */


      Root.prototype._handleRemove = function _handleRemove(object) {
        if (object instanceof Field) {
          if (
          /* an extension field */
          object.extend !== undefined) {
            if (
            /* already handled */
            object.extensionField) {
              // remove its sister field
              object.extensionField.parent.remove(object.extensionField);
              object.extensionField = null;
            } else {
              // cancel the extension
              var index = this.deferred.indexOf(object);
              /* istanbul ignore else */

              if (index > -1) this.deferred.splice(index, 1);
            }
          }
        } else if (object instanceof Enum) {
          if (exposeRe.test(object.name)) delete object.parent[object.name]; // unexpose enum values
        } else if (object instanceof Namespace) {
          for (var i = 0; i <
          /* initializes */
          object.nestedArray.length; ++i) {
            // recurse into the namespace
            this._handleRemove(object._nestedArray[i]);
          }

          if (exposeRe.test(object.name)) delete object.parent[object.name]; // unexpose namespaces
        }
      };

      Root._configure = function (Type_, parse_, common_) {
        Type = Type_;
        parse = parse_;
        common = common_;
      };
    }, {
      "15": 15,
      "16": 16,
      "23": 23,
      "25": 25,
      "37": 37
    }],
    30: [function (require, module, exports) {
      "use strict";

      module.exports = {};
      /**
       * Named roots.
       * This is where pbjs stores generated structures (the option `-r, --root` specifies a name).
       * Can also be used manually to make roots available accross modules.
       * @name roots
       * @type {Object.<string,Root>}
       * @example
       * // pbjs -r myroot -o compiled.js ...
       *
       * // in another module:
       * require("./compiled.js");
       *
       * // in any subsequent module:
       * var root = protobuf.roots["myroot"];
       */
    }, {}],
    31: [function (require, module, exports) {
      "use strict";
      /**
       * Streaming RPC helpers.
       * @namespace
       */

      var rpc = exports;
      /**
       * RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
       * @typedef RPCImpl
       * @type {function}
       * @param {Method|rpc.ServiceMethod<Message<{}>,Message<{}>>} method Reflected or static method being called
       * @param {Uint8Array} requestData Request data
       * @param {RPCImplCallback} callback Callback function
       * @returns {undefined}
       * @example
       * function rpcImpl(method, requestData, callback) {
       *     if (protobuf.util.lcFirst(method.name) !== "myMethod") // compatible with static code
       *         throw Error("no such method");
       *     asynchronouslyObtainAResponse(requestData, function(err, responseData) {
       *         callback(err, responseData);
       *     });
       * }
       */

      /**
       * Node-style callback as used by {@link RPCImpl}.
       * @typedef RPCImplCallback
       * @type {function}
       * @param {Error|null} error Error, if any, otherwise `null`
       * @param {Uint8Array|null} [response] Response data or `null` to signal end of stream, if there hasn't been an error
       * @returns {undefined}
       */

      rpc.Service = require(32);
    }, {
      "32": 32
    }],
    32: [function (require, module, exports) {
      "use strict";

      module.exports = Service;

      var util = require(39); // Extends EventEmitter


      (Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;
      /**
       * A service method callback as used by {@link rpc.ServiceMethod|ServiceMethod}.
       *
       * Differs from {@link RPCImplCallback} in that it is an actual callback of a service method which may not return `response = null`.
       * @typedef rpc.ServiceMethodCallback
       * @template TRes extends Message<TRes>
       * @type {function}
       * @param {Error|null} error Error, if any
       * @param {TRes} [response] Response message
       * @returns {undefined}
       */

      /**
       * A service method part of a {@link rpc.Service} as created by {@link Service.create}.
       * @typedef rpc.ServiceMethod
       * @template TReq extends Message<TReq>
       * @template TRes extends Message<TRes>
       * @type {function}
       * @param {TReq|Properties<TReq>} request Request message or plain object
       * @param {rpc.ServiceMethodCallback<TRes>} [callback] Node-style callback called with the error, if any, and the response message
       * @returns {Promise<Message<TRes>>} Promise if `callback` has been omitted, otherwise `undefined`
       */

      /**
       * Constructs a new RPC service instance.
       * @classdesc An RPC service as returned by {@link Service#create}.
       * @exports rpc.Service
       * @extends util.EventEmitter
       * @constructor
       * @param {RPCImpl} rpcImpl RPC implementation
       * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
       * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
       */

      function Service(rpcImpl, requestDelimited, responseDelimited) {
        if (typeof rpcImpl !== "function") throw TypeError("rpcImpl must be a function");
        util.EventEmitter.call(this);
        /**
         * RPC implementation. Becomes `null` once the service is ended.
         * @type {RPCImpl|null}
         */

        this.rpcImpl = rpcImpl;
        /**
         * Whether requests are length-delimited.
         * @type {boolean}
         */

        this.requestDelimited = Boolean(requestDelimited);
        /**
         * Whether responses are length-delimited.
         * @type {boolean}
         */

        this.responseDelimited = Boolean(responseDelimited);
      }
      /**
       * Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.
       * @param {Method|rpc.ServiceMethod<TReq,TRes>} method Reflected or static method
       * @param {Constructor<TReq>} requestCtor Request constructor
       * @param {Constructor<TRes>} responseCtor Response constructor
       * @param {TReq|Properties<TReq>} request Request message or plain object
       * @param {rpc.ServiceMethodCallback<TRes>} callback Service callback
       * @returns {undefined}
       * @template TReq extends Message<TReq>
       * @template TRes extends Message<TRes>
       */


      Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
        if (!request) throw TypeError("request must be specified");
        var self = this;
        if (!callback) return util.asPromise(rpcCall, self, method, requestCtor, responseCtor, request);

        if (!self.rpcImpl) {
          setTimeout(function () {
            callback(Error("already ended"));
          }, 0);
          return undefined;
        }

        try {
          return self.rpcImpl(method, requestCtor[self.requestDelimited ? "encodeDelimited" : "encode"](request).finish(), function rpcCallback(err, response) {
            if (err) {
              self.emit("error", err, method);
              return callback(err);
            }

            if (response === null) {
              self.end(
              /* endedByRPC */
              true);
              return undefined;
            }

            if (!(response instanceof responseCtor)) {
              try {
                response = responseCtor[self.responseDelimited ? "decodeDelimited" : "decode"](response);
              } catch (err) {
                self.emit("error", err, method);
                return callback(err);
              }
            }

            self.emit("data", response, method);
            return callback(null, response);
          });
        } catch (err) {
          self.emit("error", err, method);
          setTimeout(function () {
            callback(err);
          }, 0);
          return undefined;
        }
      };
      /**
       * Ends this service and emits the `end` event.
       * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
       * @returns {rpc.Service} `this`
       */


      Service.prototype.end = function end(endedByRPC) {
        if (this.rpcImpl) {
          if (!endedByRPC) // signal end to rpcImpl
            this.rpcImpl(null, null, null);
          this.rpcImpl = null;
          this.emit("end").off();
        }

        return this;
      };
    }, {
      "39": 39
    }],
    33: [function (require, module, exports) {
      "use strict";

      module.exports = Service; // extends Namespace

      var Namespace = require(23);

      ((Service.prototype = Object.create(Namespace.prototype)).constructor = Service).className = "Service";

      var Method = require(22),
          util = require(37),
          rpc = require(31);
      /**
       * Constructs a new service instance.
       * @classdesc Reflected service.
       * @extends NamespaceBase
       * @constructor
       * @param {string} name Service name
       * @param {Object.<string,*>} [options] Service options
       * @throws {TypeError} If arguments are invalid
       */


      function Service(name, options) {
        Namespace.call(this, name, options);
        /**
         * Service methods.
         * @type {Object.<string,Method>}
         */

        this.methods = {}; // toJSON, marker

        /**
         * Cached methods as an array.
         * @type {Method[]|null}
         * @private
         */

        this._methodsArray = null;
      }
      /**
       * Service descriptor.
       * @interface IService
       * @extends INamespace
       * @property {Object.<string,IMethod>} methods Method descriptors
       */

      /**
       * Constructs a service from a service descriptor.
       * @param {string} name Service name
       * @param {IService} json Service descriptor
       * @returns {Service} Created service
       * @throws {TypeError} If arguments are invalid
       */


      Service.fromJSON = function fromJSON(name, json) {
        var service = new Service(name, json.options);
        /* istanbul ignore else */

        if (json.methods) for (var names = Object.keys(json.methods), i = 0; i < names.length; ++i) {
          service.add(Method.fromJSON(names[i], json.methods[names[i]]));
        }
        if (json.nested) service.addJSON(json.nested);
        service.comment = json.comment;
        return service;
      };
      /**
       * Converts this service to a service descriptor.
       * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
       * @returns {IService} Service descriptor
       */


      Service.prototype.toJSON = function toJSON(toJSONOptions) {
        var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject(["options", inherited && inherited.options || undefined, "methods", Namespace.arrayToJSON(this.methodsArray, toJSONOptions) ||
        /* istanbul ignore next */
        {}, "nested", inherited && inherited.nested || undefined, "comment", keepComments ? this.comment : undefined]);
      };
      /**
       * Methods of this service as an array for iteration.
       * @name Service#methodsArray
       * @type {Method[]}
       * @readonly
       */


      Object.defineProperty(Service.prototype, "methodsArray", {
        get: function get() {
          return this._methodsArray || (this._methodsArray = util.toArray(this.methods));
        }
      });

      function clearCache(service) {
        service._methodsArray = null;
        return service;
      }
      /**
       * @override
       */


      Service.prototype.get = function get(name) {
        return this.methods[name] || Namespace.prototype.get.call(this, name);
      };
      /**
       * @override
       */


      Service.prototype.resolveAll = function resolveAll() {
        var methods = this.methodsArray;

        for (var i = 0; i < methods.length; ++i) {
          methods[i].resolve();
        }

        return Namespace.prototype.resolve.call(this);
      };
      /**
       * @override
       */


      Service.prototype.add = function add(object) {
        /* istanbul ignore if */
        if (this.get(object.name)) throw Error("duplicate name '" + object.name + "' in " + this);

        if (object instanceof Method) {
          this.methods[object.name] = object;
          object.parent = this;
          return clearCache(this);
        }

        return Namespace.prototype.add.call(this, object);
      };
      /**
       * @override
       */


      Service.prototype.remove = function remove(object) {
        if (object instanceof Method) {
          /* istanbul ignore if */
          if (this.methods[object.name] !== object) throw Error(object + " is not a member of " + this);
          delete this.methods[object.name];
          object.parent = null;
          return clearCache(this);
        }

        return Namespace.prototype.remove.call(this, object);
      };
      /**
       * Creates a runtime service using the specified rpc implementation.
       * @param {RPCImpl} rpcImpl RPC implementation
       * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
       * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
       * @returns {rpc.Service} RPC service. Useful where requests and/or responses are streamed.
       */


      Service.prototype.create = function create(rpcImpl, requestDelimited, responseDelimited) {
        var rpcService = new rpc.Service(rpcImpl, requestDelimited, responseDelimited);

        for (var i = 0, method; i <
        /* initializes */
        this.methodsArray.length; ++i) {
          var methodName = util.lcFirst((method = this._methodsArray[i]).resolve().name).replace(/[^$\w_]/g, "");
          rpcService[methodName] = util.codegen(["r", "c"], util.isReserved(methodName) ? methodName + "_" : methodName)("return this.rpcCall(m,q,s,r,c)")({
            m: method,
            q: method.resolvedRequestType.ctor,
            s: method.resolvedResponseType.ctor
          });
        }

        return rpcService;
      };
    }, {
      "22": 22,
      "23": 23,
      "31": 31,
      "37": 37
    }],
    34: [function (require, module, exports) {
      "use strict";

      module.exports = tokenize;
      var delimRe = /[\s{}=;:[\],'"()<>]/g,
          stringDoubleRe = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
          stringSingleRe = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g;
      var setCommentRe = /^ *[*/]+ */,
          setCommentAltRe = /^\s*\*?\/*/,
          setCommentSplitRe = /\n/g,
          whitespaceRe = /\s/,
          unescapeRe = /\\(.?)/g;
      var unescapeMap = {
        "0": "\0",
        "r": "\r",
        "n": "\n",
        "t": "\t"
      };
      /**
       * Unescapes a string.
       * @param {string} str String to unescape
       * @returns {string} Unescaped string
       * @property {Object.<string,string>} map Special characters map
       * @memberof tokenize
       */

      function unescape(str) {
        return str.replace(unescapeRe, function ($0, $1) {
          switch ($1) {
            case "\\":
            case "":
              return $1;

            default:
              return unescapeMap[$1] || "";
          }
        });
      }

      tokenize.unescape = unescape;
      /**
       * Gets the next token and advances.
       * @typedef TokenizerHandleNext
       * @type {function}
       * @returns {string|null} Next token or `null` on eof
       */

      /**
       * Peeks for the next token.
       * @typedef TokenizerHandlePeek
       * @type {function}
       * @returns {string|null} Next token or `null` on eof
       */

      /**
       * Pushes a token back to the stack.
       * @typedef TokenizerHandlePush
       * @type {function}
       * @param {string} token Token
       * @returns {undefined}
       */

      /**
       * Skips the next token.
       * @typedef TokenizerHandleSkip
       * @type {function}
       * @param {string} expected Expected token
       * @param {boolean} [optional=false] If optional
       * @returns {boolean} Whether the token matched
       * @throws {Error} If the token didn't match and is not optional
       */

      /**
       * Gets the comment on the previous line or, alternatively, the line comment on the specified line.
       * @typedef TokenizerHandleCmnt
       * @type {function}
       * @param {number} [line] Line number
       * @returns {string|null} Comment text or `null` if none
       */

      /**
       * Handle object returned from {@link tokenize}.
       * @interface ITokenizerHandle
       * @property {TokenizerHandleNext} next Gets the next token and advances (`null` on eof)
       * @property {TokenizerHandlePeek} peek Peeks for the next token (`null` on eof)
       * @property {TokenizerHandlePush} push Pushes a token back to the stack
       * @property {TokenizerHandleSkip} skip Skips a token, returns its presence and advances or, if non-optional and not present, throws
       * @property {TokenizerHandleCmnt} cmnt Gets the comment on the previous line or the line comment on the specified line, if any
       * @property {number} line Current line number
       */

      /**
       * Tokenizes the given .proto source and returns an object with useful utility functions.
       * @param {string} source Source contents
       * @param {boolean} alternateCommentMode Whether we should activate alternate comment parsing mode.
       * @returns {ITokenizerHandle} Tokenizer handle
       */

      function tokenize(source, alternateCommentMode) {
        /* eslint-disable callback-return */
        source = source.toString();
        var offset = 0,
            length = source.length,
            line = 1,
            commentType = null,
            commentText = null,
            commentLine = 0,
            commentLineEmpty = false;
        var stack = [];
        var stringDelim = null;
        /* istanbul ignore next */

        /**
         * Creates an error for illegal syntax.
         * @param {string} subject Subject
         * @returns {Error} Error created
         * @inner
         */

        function illegal(subject) {
          return Error("illegal " + subject + " (line " + line + ")");
        }
        /**
         * Reads a string till its end.
         * @returns {string} String read
         * @inner
         */


        function readString() {
          var re = stringDelim === "'" ? stringSingleRe : stringDoubleRe;
          re.lastIndex = offset - 1;
          var match = re.exec(source);
          if (!match) throw illegal("string");
          offset = re.lastIndex;
          push(stringDelim);
          stringDelim = null;
          return unescape(match[1]);
        }
        /**
         * Gets the character at `pos` within the source.
         * @param {number} pos Position
         * @returns {string} Character
         * @inner
         */


        function charAt(pos) {
          return source.charAt(pos);
        }
        /**
         * Sets the current comment text.
         * @param {number} start Start offset
         * @param {number} end End offset
         * @returns {undefined}
         * @inner
         */


        function setComment(start, end) {
          commentType = source.charAt(start++);
          commentLine = line;
          commentLineEmpty = false;
          var lookback;

          if (alternateCommentMode) {
            lookback = 2; // alternate comment parsing: "//" or "/*"
          } else {
            lookback = 3; // "///" or "/**"
          }

          var commentOffset = start - lookback,
              c;

          do {
            if (--commentOffset < 0 || (c = source.charAt(commentOffset)) === "\n") {
              commentLineEmpty = true;
              break;
            }
          } while (c === " " || c === "\t");

          var lines = source.substring(start, end).split(setCommentSplitRe);

          for (var i = 0; i < lines.length; ++i) {
            lines[i] = lines[i].replace(alternateCommentMode ? setCommentAltRe : setCommentRe, "").trim();
          }

          commentText = lines.join("\n").trim();
        }

        function isDoubleSlashCommentLine(startOffset) {
          var endOffset = findEndOfLine(startOffset); // see if remaining line matches comment pattern

          var lineText = source.substring(startOffset, endOffset); // look for 1 or 2 slashes since startOffset would already point past
          // the first slash that started the comment.

          var isComment = /^\s*\/{1,2}/.test(lineText);
          return isComment;
        }

        function findEndOfLine(cursor) {
          // find end of cursor's line
          var endOffset = cursor;

          while (endOffset < length && charAt(endOffset) !== "\n") {
            endOffset++;
          }

          return endOffset;
        }
        /**
         * Obtains the next token.
         * @returns {string|null} Next token or `null` on eof
         * @inner
         */


        function next() {
          if (stack.length > 0) return stack.shift();
          if (stringDelim) return readString();
          var repeat, prev, curr, start, isDoc;

          do {
            if (offset === length) return null;
            repeat = false;

            while (whitespaceRe.test(curr = charAt(offset))) {
              if (curr === "\n") ++line;
              if (++offset === length) return null;
            }

            if (charAt(offset) === "/") {
              if (++offset === length) {
                throw illegal("comment");
              }

              if (charAt(offset) === "/") {
                // Line
                if (!alternateCommentMode) {
                  // check for triple-slash comment
                  isDoc = charAt(start = offset + 1) === "/";

                  while (charAt(++offset) !== "\n") {
                    if (offset === length) {
                      return null;
                    }
                  }

                  ++offset;

                  if (isDoc) {
                    setComment(start, offset - 1);
                  }

                  ++line;
                  repeat = true;
                } else {
                  // check for double-slash comments, consolidating consecutive lines
                  start = offset;
                  isDoc = false;

                  if (isDoubleSlashCommentLine(offset)) {
                    isDoc = true;

                    do {
                      offset = findEndOfLine(offset);

                      if (offset === length) {
                        break;
                      }

                      offset++;
                    } while (isDoubleSlashCommentLine(offset));
                  } else {
                    offset = Math.min(length, findEndOfLine(offset) + 1);
                  }

                  if (isDoc) {
                    setComment(start, offset);
                  }

                  line++;
                  repeat = true;
                }
              } else if ((curr = charAt(offset)) === "*") {
                /* Block */
                // check for /** (regular comment mode) or /* (alternate comment mode)
                start = offset + 1;
                isDoc = alternateCommentMode || charAt(start) === "*";

                do {
                  if (curr === "\n") {
                    ++line;
                  }

                  if (++offset === length) {
                    throw illegal("comment");
                  }

                  prev = curr;
                  curr = charAt(offset);
                } while (prev !== "*" || curr !== "/");

                ++offset;

                if (isDoc) {
                  setComment(start, offset - 2);
                }

                repeat = true;
              } else {
                return "/";
              }
            }
          } while (repeat); // offset !== length if we got here


          var end = offset;
          delimRe.lastIndex = 0;
          var delim = delimRe.test(charAt(end++));
          if (!delim) while (end < length && !delimRe.test(charAt(end))) {
            ++end;
          }
          var token = source.substring(offset, offset = end);
          if (token === "\"" || token === "'") stringDelim = token;
          return token;
        }
        /**
         * Pushes a token back to the stack.
         * @param {string} token Token
         * @returns {undefined}
         * @inner
         */


        function push(token) {
          stack.push(token);
        }
        /**
         * Peeks for the next token.
         * @returns {string|null} Token or `null` on eof
         * @inner
         */


        function peek() {
          if (!stack.length) {
            var token = next();
            if (token === null) return null;
            push(token);
          }

          return stack[0];
        }
        /**
         * Skips a token.
         * @param {string} expected Expected token
         * @param {boolean} [optional=false] Whether the token is optional
         * @returns {boolean} `true` when skipped, `false` if not
         * @throws {Error} When a required token is not present
         * @inner
         */


        function skip(expected, optional) {
          var actual = peek(),
              equals = actual === expected;

          if (equals) {
            next();
            return true;
          }

          if (!optional) throw illegal("token '" + actual + "', '" + expected + "' expected");
          return false;
        }
        /**
         * Gets a comment.
         * @param {number} [trailingLine] Line number if looking for a trailing comment
         * @returns {string|null} Comment text
         * @inner
         */


        function cmnt(trailingLine) {
          var ret = null;

          if (trailingLine === undefined) {
            if (commentLine === line - 1 && (alternateCommentMode || commentType === "*" || commentLineEmpty)) {
              ret = commentText;
            }
          } else {
            /* istanbul ignore else */
            if (commentLine < trailingLine) {
              peek();
            }

            if (commentLine === trailingLine && !commentLineEmpty && (alternateCommentMode || commentType === "/")) {
              ret = commentText;
            }
          }

          return ret;
        }

        return Object.defineProperty({
          next: next,
          peek: peek,
          push: push,
          skip: skip,
          cmnt: cmnt
        }, "line", {
          get: function get() {
            return line;
          }
        });
        /* eslint-enable callback-return */
      }
    }, {}],
    35: [function (require, module, exports) {
      "use strict";

      module.exports = Type; // extends Namespace

      var Namespace = require(23);

      ((Type.prototype = Object.create(Namespace.prototype)).constructor = Type).className = "Type";

      var Enum = require(15),
          OneOf = require(25),
          Field = require(16),
          MapField = require(20),
          Service = require(33),
          Message = require(21),
          Reader = require(27),
          Writer = require(42),
          util = require(37),
          encoder = require(14),
          decoder = require(13),
          verifier = require(40),
          converter = require(12),
          wrappers = require(41);
      /**
       * Constructs a new reflected message type instance.
       * @classdesc Reflected message type.
       * @extends NamespaceBase
       * @constructor
       * @param {string} name Message name
       * @param {Object.<string,*>} [options] Declared options
       */


      function Type(name, options) {
        Namespace.call(this, name, options);
        /**
         * Message fields.
         * @type {Object.<string,Field>}
         */

        this.fields = {}; // toJSON, marker

        /**
         * Oneofs declared within this namespace, if any.
         * @type {Object.<string,OneOf>}
         */

        this.oneofs = undefined; // toJSON

        /**
         * Extension ranges, if any.
         * @type {number[][]}
         */

        this.extensions = undefined; // toJSON

        /**
         * Reserved ranges, if any.
         * @type {Array.<number[]|string>}
         */

        this.reserved = undefined; // toJSON

        /*?
         * Whether this type is a legacy group.
         * @type {boolean|undefined}
         */

        this.group = undefined; // toJSON

        /**
         * Cached fields by id.
         * @type {Object.<number,Field>|null}
         * @private
         */

        this._fieldsById = null;
        /**
         * Cached fields as an array.
         * @type {Field[]|null}
         * @private
         */

        this._fieldsArray = null;
        /**
         * Cached oneofs as an array.
         * @type {OneOf[]|null}
         * @private
         */

        this._oneofsArray = null;
        /**
         * Cached constructor.
         * @type {Constructor<{}>}
         * @private
         */

        this._ctor = null;
      }

      Object.defineProperties(Type.prototype, {
        /**
         * Message fields by id.
         * @name Type#fieldsById
         * @type {Object.<number,Field>}
         * @readonly
         */
        fieldsById: {
          get: function get() {
            /* istanbul ignore if */
            if (this._fieldsById) return this._fieldsById;
            this._fieldsById = {};

            for (var names = Object.keys(this.fields), i = 0; i < names.length; ++i) {
              var field = this.fields[names[i]],
                  id = field.id;
              /* istanbul ignore if */

              if (this._fieldsById[id]) throw Error("duplicate id " + id + " in " + this);
              this._fieldsById[id] = field;
            }

            return this._fieldsById;
          }
        },

        /**
         * Fields of this message as an array for iteration.
         * @name Type#fieldsArray
         * @type {Field[]}
         * @readonly
         */
        fieldsArray: {
          get: function get() {
            return this._fieldsArray || (this._fieldsArray = util.toArray(this.fields));
          }
        },

        /**
         * Oneofs of this message as an array for iteration.
         * @name Type#oneofsArray
         * @type {OneOf[]}
         * @readonly
         */
        oneofsArray: {
          get: function get() {
            return this._oneofsArray || (this._oneofsArray = util.toArray(this.oneofs));
          }
        },

        /**
         * The registered constructor, if any registered, otherwise a generic constructor.
         * Assigning a function replaces the internal constructor. If the function does not extend {@link Message} yet, its prototype will be setup accordingly and static methods will be populated. If it already extends {@link Message}, it will just replace the internal constructor.
         * @name Type#ctor
         * @type {Constructor<{}>}
         */
        ctor: {
          get: function get() {
            return this._ctor || (this.ctor = Type.generateConstructor(this)());
          },
          set: function set(ctor) {
            // Ensure proper prototype
            var prototype = ctor.prototype;

            if (!(prototype instanceof Message)) {
              (ctor.prototype = new Message()).constructor = ctor;
              util.merge(ctor.prototype, prototype);
            } // Classes and messages reference their reflected type


            ctor.$type = ctor.prototype.$type = this; // Mix in static methods

            util.merge(ctor, Message, true);
            this._ctor = ctor; // Messages have non-enumerable default values on their prototype

            var i = 0;

            for (; i <
            /* initializes */
            this.fieldsArray.length; ++i) {
              this._fieldsArray[i].resolve();
            } // ensures a proper value
            // Messages have non-enumerable getters and setters for each virtual oneof field


            var ctorProperties = {};

            for (i = 0; i <
            /* initializes */
            this.oneofsArray.length; ++i) {
              ctorProperties[this._oneofsArray[i].resolve().name] = {
                get: util.oneOfGetter(this._oneofsArray[i].oneof),
                set: util.oneOfSetter(this._oneofsArray[i].oneof)
              };
            }

            if (i) Object.defineProperties(ctor.prototype, ctorProperties);
          }
        }
      });
      /**
       * Generates a constructor function for the specified type.
       * @param {Type} mtype Message type
       * @returns {Codegen} Codegen instance
       */

      Type.generateConstructor = function generateConstructor(mtype) {
        /* eslint-disable no-unexpected-multiline */
        var gen = util.codegen(["p"], mtype.name); // explicitly initialize mutable object/array fields so that these aren't just inherited from the prototype

        for (var i = 0, field; i < mtype.fieldsArray.length; ++i) {
          if ((field = mtype._fieldsArray[i]).map) gen("this%s={}", util.safeProp(field.name));else if (field.repeated) gen("this%s=[]", util.safeProp(field.name));
        }

        return gen("if(p)for(var ks=Object.keys(p),i=0;i<ks.length;++i)if(p[ks[i]]!=null)") // omit undefined or null
        ("this[ks[i]]=p[ks[i]]");
        /* eslint-enable no-unexpected-multiline */
      };

      function clearCache(type) {
        type._fieldsById = type._fieldsArray = type._oneofsArray = null;
        delete type.encode;
        delete type.decode;
        delete type.verify;
        return type;
      }
      /**
       * Message type descriptor.
       * @interface IType
       * @extends INamespace
       * @property {Object.<string,IOneOf>} [oneofs] Oneof descriptors
       * @property {Object.<string,IField>} fields Field descriptors
       * @property {number[][]} [extensions] Extension ranges
       * @property {number[][]} [reserved] Reserved ranges
       * @property {boolean} [group=false] Whether a legacy group or not
       */

      /**
       * Creates a message type from a message type descriptor.
       * @param {string} name Message name
       * @param {IType} json Message type descriptor
       * @returns {Type} Created message type
       */


      Type.fromJSON = function fromJSON(name, json) {
        var type = new Type(name, json.options);
        type.extensions = json.extensions;
        type.reserved = json.reserved;
        var names = Object.keys(json.fields),
            i = 0;

        for (; i < names.length; ++i) {
          type.add((typeof json.fields[names[i]].keyType !== "undefined" ? MapField.fromJSON : Field.fromJSON)(names[i], json.fields[names[i]]));
        }

        if (json.oneofs) for (names = Object.keys(json.oneofs), i = 0; i < names.length; ++i) {
          type.add(OneOf.fromJSON(names[i], json.oneofs[names[i]]));
        }
        if (json.nested) for (names = Object.keys(json.nested), i = 0; i < names.length; ++i) {
          var nested = json.nested[names[i]];
          type.add( // most to least likely
          (nested.id !== undefined ? Field.fromJSON : nested.fields !== undefined ? Type.fromJSON : nested.values !== undefined ? Enum.fromJSON : nested.methods !== undefined ? Service.fromJSON : Namespace.fromJSON)(names[i], nested));
        }
        if (json.extensions && json.extensions.length) type.extensions = json.extensions;
        if (json.reserved && json.reserved.length) type.reserved = json.reserved;
        if (json.group) type.group = true;
        if (json.comment) type.comment = json.comment;
        return type;
      };
      /**
       * Converts this message type to a message type descriptor.
       * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
       * @returns {IType} Message type descriptor
       */


      Type.prototype.toJSON = function toJSON(toJSONOptions) {
        var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject(["options", inherited && inherited.options || undefined, "oneofs", Namespace.arrayToJSON(this.oneofsArray, toJSONOptions), "fields", Namespace.arrayToJSON(this.fieldsArray.filter(function (obj) {
          return !obj.declaringField;
        }), toJSONOptions) || {}, "extensions", this.extensions && this.extensions.length ? this.extensions : undefined, "reserved", this.reserved && this.reserved.length ? this.reserved : undefined, "group", this.group || undefined, "nested", inherited && inherited.nested || undefined, "comment", keepComments ? this.comment : undefined]);
      };
      /**
       * @override
       */


      Type.prototype.resolveAll = function resolveAll() {
        var fields = this.fieldsArray,
            i = 0;

        while (i < fields.length) {
          fields[i++].resolve();
        }

        var oneofs = this.oneofsArray;
        i = 0;

        while (i < oneofs.length) {
          oneofs[i++].resolve();
        }

        return Namespace.prototype.resolveAll.call(this);
      };
      /**
       * @override
       */


      Type.prototype.get = function get(name) {
        return this.fields[name] || this.oneofs && this.oneofs[name] || this.nested && this.nested[name] || null;
      };
      /**
       * Adds a nested object to this type.
       * @param {ReflectionObject} object Nested object to add
       * @returns {Type} `this`
       * @throws {TypeError} If arguments are invalid
       * @throws {Error} If there is already a nested object with this name or, if a field, when there is already a field with this id
       */


      Type.prototype.add = function add(object) {
        if (this.get(object.name)) throw Error("duplicate name '" + object.name + "' in " + this);

        if (object instanceof Field && object.extend === undefined) {
          // NOTE: Extension fields aren't actual fields on the declaring type, but nested objects.
          // The root object takes care of adding distinct sister-fields to the respective extended
          // type instead.
          // avoids calling the getter if not absolutely necessary because it's called quite frequently
          if (this._fieldsById ?
          /* istanbul ignore next */
          this._fieldsById[object.id] : this.fieldsById[object.id]) throw Error("duplicate id " + object.id + " in " + this);
          if (this.isReservedId(object.id)) throw Error("id " + object.id + " is reserved in " + this);
          if (this.isReservedName(object.name)) throw Error("name '" + object.name + "' is reserved in " + this);
          if (object.parent) object.parent.remove(object);
          this.fields[object.name] = object;
          object.message = this;
          object.onAdd(this);
          return clearCache(this);
        }

        if (object instanceof OneOf) {
          if (!this.oneofs) this.oneofs = {};
          this.oneofs[object.name] = object;
          object.onAdd(this);
          return clearCache(this);
        }

        return Namespace.prototype.add.call(this, object);
      };
      /**
       * Removes a nested object from this type.
       * @param {ReflectionObject} object Nested object to remove
       * @returns {Type} `this`
       * @throws {TypeError} If arguments are invalid
       * @throws {Error} If `object` is not a member of this type
       */


      Type.prototype.remove = function remove(object) {
        if (object instanceof Field && object.extend === undefined) {
          // See Type#add for the reason why extension fields are excluded here.

          /* istanbul ignore if */
          if (!this.fields || this.fields[object.name] !== object) throw Error(object + " is not a member of " + this);
          delete this.fields[object.name];
          object.parent = null;
          object.onRemove(this);
          return clearCache(this);
        }

        if (object instanceof OneOf) {
          /* istanbul ignore if */
          if (!this.oneofs || this.oneofs[object.name] !== object) throw Error(object + " is not a member of " + this);
          delete this.oneofs[object.name];
          object.parent = null;
          object.onRemove(this);
          return clearCache(this);
        }

        return Namespace.prototype.remove.call(this, object);
      };
      /**
       * Tests if the specified id is reserved.
       * @param {number} id Id to test
       * @returns {boolean} `true` if reserved, otherwise `false`
       */


      Type.prototype.isReservedId = function isReservedId(id) {
        return Namespace.isReservedId(this.reserved, id);
      };
      /**
       * Tests if the specified name is reserved.
       * @param {string} name Name to test
       * @returns {boolean} `true` if reserved, otherwise `false`
       */


      Type.prototype.isReservedName = function isReservedName(name) {
        return Namespace.isReservedName(this.reserved, name);
      };
      /**
       * Creates a new message of this type using the specified properties.
       * @param {Object.<string,*>} [properties] Properties to set
       * @returns {Message<{}>} Message instance
       */


      Type.prototype.create = function create(properties) {
        return new this.ctor(properties);
      };
      /**
       * Sets up {@link Type#encode|encode}, {@link Type#decode|decode} and {@link Type#verify|verify}.
       * @returns {Type} `this`
       */


      Type.prototype.setup = function setup() {
        // Sets up everything at once so that the prototype chain does not have to be re-evaluated
        // multiple times (V8, soft-deopt prototype-check).
        var fullName = this.fullName,
            types = [];

        for (var i = 0; i <
        /* initializes */
        this.fieldsArray.length; ++i) {
          types.push(this._fieldsArray[i].resolve().resolvedType);
        } // Replace setup methods with type-specific generated functions


        this.encode = encoder(this)({
          Writer: Writer,
          types: types,
          util: util
        });
        this.decode = decoder(this)({
          Reader: Reader,
          types: types,
          util: util
        });
        this.verify = verifier(this)({
          types: types,
          util: util
        });
        this.fromObject = converter.fromObject(this)({
          types: types,
          util: util
        });
        this.toObject = converter.toObject(this)({
          types: types,
          util: util
        }); // Inject custom wrappers for common types

        var wrapper = wrappers[fullName];

        if (wrapper) {
          var originalThis = Object.create(this); // if (wrapper.fromObject) {

          originalThis.fromObject = this.fromObject;
          this.fromObject = wrapper.fromObject.bind(originalThis); // }
          // if (wrapper.toObject) {

          originalThis.toObject = this.toObject;
          this.toObject = wrapper.toObject.bind(originalThis); // }
        }

        return this;
      };
      /**
       * Encodes a message of this type. Does not implicitly {@link Type#verify|verify} messages.
       * @param {Message<{}>|Object.<string,*>} message Message instance or plain object
       * @param {Writer} [writer] Writer to encode to
       * @returns {Writer} writer
       */


      Type.prototype.encode = function encode_setup(message, writer) {
        return this.setup().encode(message, writer); // overrides this method
      };
      /**
       * Encodes a message of this type preceeded by its byte length as a varint. Does not implicitly {@link Type#verify|verify} messages.
       * @param {Message<{}>|Object.<string,*>} message Message instance or plain object
       * @param {Writer} [writer] Writer to encode to
       * @returns {Writer} writer
       */


      Type.prototype.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
      };
      /**
       * Decodes a message of this type.
       * @param {Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Length of the message, if known beforehand
       * @returns {Message<{}>} Decoded message
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {util.ProtocolError<{}>} If required fields are missing
       */


      Type.prototype.decode = function decode_setup(reader, length) {
        return this.setup().decode(reader, length); // overrides this method
      };
      /**
       * Decodes a message of this type preceeded by its byte length as a varint.
       * @param {Reader|Uint8Array} reader Reader or buffer to decode from
       * @returns {Message<{}>} Decoded message
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {util.ProtocolError} If required fields are missing
       */


      Type.prototype.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof Reader)) reader = Reader.create(reader);
        return this.decode(reader, reader.uint32());
      };
      /**
       * Verifies that field values are valid and that required fields are present.
       * @param {Object.<string,*>} message Plain object to verify
       * @returns {null|string} `null` if valid, otherwise the reason why it is not
       */


      Type.prototype.verify = function verify_setup(message) {
        return this.setup().verify(message); // overrides this method
      };
      /**
       * Creates a new message of this type from a plain object. Also converts values to their respective internal types.
       * @param {Object.<string,*>} object Plain object to convert
       * @returns {Message<{}>} Message instance
       */


      Type.prototype.fromObject = function fromObject(object) {
        return this.setup().fromObject(object);
      };
      /**
       * Conversion options as used by {@link Type#toObject} and {@link Message.toObject}.
       * @interface IConversionOptions
       * @property {Function} [longs] Long conversion type.
       * Valid values are `String` and `Number` (the global types).
       * Defaults to copy the present value, which is a possibly unsafe number without and a {@link Long} with a long library.
       * @property {Function} [enums] Enum value conversion type.
       * Only valid value is `String` (the global type).
       * Defaults to copy the present value, which is the numeric id.
       * @property {Function} [bytes] Bytes value conversion type.
       * Valid values are `Array` and (a base64 encoded) `String` (the global types).
       * Defaults to copy the present value, which usually is a Buffer under node and an Uint8Array in the browser.
       * @property {boolean} [defaults=false] Also sets default values on the resulting object
       * @property {boolean} [arrays=false] Sets empty arrays for missing repeated fields even if `defaults=false`
       * @property {boolean} [objects=false] Sets empty objects for missing map fields even if `defaults=false`
       * @property {boolean} [oneofs=false] Includes virtual oneof properties set to the present field's name, if any
       * @property {boolean} [json=false] Performs additional JSON compatibility conversions, i.e. NaN and Infinity to strings
       */

      /**
       * Creates a plain object from a message of this type. Also converts values to other types if specified.
       * @param {Message<{}>} message Message instance
       * @param {IConversionOptions} [options] Conversion options
       * @returns {Object.<string,*>} Plain object
       */


      Type.prototype.toObject = function toObject(message, options) {
        return this.setup().toObject(message, options);
      };
      /**
       * Decorator function as returned by {@link Type.d} (TypeScript).
       * @typedef TypeDecorator
       * @type {function}
       * @param {Constructor<T>} target Target constructor
       * @returns {undefined}
       * @template T extends Message<T>
       */

      /**
       * Type decorator (TypeScript).
       * @param {string} [typeName] Type name, defaults to the constructor's name
       * @returns {TypeDecorator<T>} Decorator function
       * @template T extends Message<T>
       */


      Type.d = function decorateType(typeName) {
        return function typeDecorator(target) {
          util.decorateType(target, typeName);
        };
      };
    }, {
      "12": 12,
      "13": 13,
      "14": 14,
      "15": 15,
      "16": 16,
      "20": 20,
      "21": 21,
      "23": 23,
      "25": 25,
      "27": 27,
      "33": 33,
      "37": 37,
      "40": 40,
      "41": 41,
      "42": 42
    }],
    36: [function (require, module, exports) {
      "use strict";
      /**
       * Common type constants.
       * @namespace
       */

      var types = exports;

      var util = require(37);

      var s = ["double", // 0
      "float", // 1
      "int32", // 2
      "uint32", // 3
      "sint32", // 4
      "fixed32", // 5
      "sfixed32", // 6
      "int64", // 7
      "uint64", // 8
      "sint64", // 9
      "fixed64", // 10
      "sfixed64", // 11
      "bool", // 12
      "string", // 13
      "bytes" // 14
      ];

      function bake(values, offset) {
        var i = 0,
            o = {};
        offset |= 0;

        while (i < values.length) {
          o[s[i + offset]] = values[i++];
        }

        return o;
      }
      /**
       * Basic type wire types.
       * @type {Object.<string,number>}
       * @const
       * @property {number} double=1 Fixed64 wire type
       * @property {number} float=5 Fixed32 wire type
       * @property {number} int32=0 Varint wire type
       * @property {number} uint32=0 Varint wire type
       * @property {number} sint32=0 Varint wire type
       * @property {number} fixed32=5 Fixed32 wire type
       * @property {number} sfixed32=5 Fixed32 wire type
       * @property {number} int64=0 Varint wire type
       * @property {number} uint64=0 Varint wire type
       * @property {number} sint64=0 Varint wire type
       * @property {number} fixed64=1 Fixed64 wire type
       * @property {number} sfixed64=1 Fixed64 wire type
       * @property {number} bool=0 Varint wire type
       * @property {number} string=2 Ldelim wire type
       * @property {number} bytes=2 Ldelim wire type
       */


      types.basic = bake([
      /* double   */
      1,
      /* float    */
      5,
      /* int32    */
      0,
      /* uint32   */
      0,
      /* sint32   */
      0,
      /* fixed32  */
      5,
      /* sfixed32 */
      5,
      /* int64    */
      0,
      /* uint64   */
      0,
      /* sint64   */
      0,
      /* fixed64  */
      1,
      /* sfixed64 */
      1,
      /* bool     */
      0,
      /* string   */
      2,
      /* bytes    */
      2]);
      /**
       * Basic type defaults.
       * @type {Object.<string,*>}
       * @const
       * @property {number} double=0 Double default
       * @property {number} float=0 Float default
       * @property {number} int32=0 Int32 default
       * @property {number} uint32=0 Uint32 default
       * @property {number} sint32=0 Sint32 default
       * @property {number} fixed32=0 Fixed32 default
       * @property {number} sfixed32=0 Sfixed32 default
       * @property {number} int64=0 Int64 default
       * @property {number} uint64=0 Uint64 default
       * @property {number} sint64=0 Sint32 default
       * @property {number} fixed64=0 Fixed64 default
       * @property {number} sfixed64=0 Sfixed64 default
       * @property {boolean} bool=false Bool default
       * @property {string} string="" String default
       * @property {Array.<number>} bytes=Array(0) Bytes default
       * @property {null} message=null Message default
       */

      types.defaults = bake([
      /* double   */
      0,
      /* float    */
      0,
      /* int32    */
      0,
      /* uint32   */
      0,
      /* sint32   */
      0,
      /* fixed32  */
      0,
      /* sfixed32 */
      0,
      /* int64    */
      0,
      /* uint64   */
      0,
      /* sint64   */
      0,
      /* fixed64  */
      0,
      /* sfixed64 */
      0,
      /* bool     */
      false,
      /* string   */
      "",
      /* bytes    */
      util.emptyArray,
      /* message  */
      null]);
      /**
       * Basic long type wire types.
       * @type {Object.<string,number>}
       * @const
       * @property {number} int64=0 Varint wire type
       * @property {number} uint64=0 Varint wire type
       * @property {number} sint64=0 Varint wire type
       * @property {number} fixed64=1 Fixed64 wire type
       * @property {number} sfixed64=1 Fixed64 wire type
       */

      types["long"] = bake([
      /* int64    */
      0,
      /* uint64   */
      0,
      /* sint64   */
      0,
      /* fixed64  */
      1,
      /* sfixed64 */
      1], 7);
      /**
       * Allowed types for map keys with their associated wire type.
       * @type {Object.<string,number>}
       * @const
       * @property {number} int32=0 Varint wire type
       * @property {number} uint32=0 Varint wire type
       * @property {number} sint32=0 Varint wire type
       * @property {number} fixed32=5 Fixed32 wire type
       * @property {number} sfixed32=5 Fixed32 wire type
       * @property {number} int64=0 Varint wire type
       * @property {number} uint64=0 Varint wire type
       * @property {number} sint64=0 Varint wire type
       * @property {number} fixed64=1 Fixed64 wire type
       * @property {number} sfixed64=1 Fixed64 wire type
       * @property {number} bool=0 Varint wire type
       * @property {number} string=2 Ldelim wire type
       */

      types.mapKey = bake([
      /* int32    */
      0,
      /* uint32   */
      0,
      /* sint32   */
      0,
      /* fixed32  */
      5,
      /* sfixed32 */
      5,
      /* int64    */
      0,
      /* uint64   */
      0,
      /* sint64   */
      0,
      /* fixed64  */
      1,
      /* sfixed64 */
      1,
      /* bool     */
      0,
      /* string   */
      2], 2);
      /**
       * Allowed types for packed repeated fields with their associated wire type.
       * @type {Object.<string,number>}
       * @const
       * @property {number} double=1 Fixed64 wire type
       * @property {number} float=5 Fixed32 wire type
       * @property {number} int32=0 Varint wire type
       * @property {number} uint32=0 Varint wire type
       * @property {number} sint32=0 Varint wire type
       * @property {number} fixed32=5 Fixed32 wire type
       * @property {number} sfixed32=5 Fixed32 wire type
       * @property {number} int64=0 Varint wire type
       * @property {number} uint64=0 Varint wire type
       * @property {number} sint64=0 Varint wire type
       * @property {number} fixed64=1 Fixed64 wire type
       * @property {number} sfixed64=1 Fixed64 wire type
       * @property {number} bool=0 Varint wire type
       */

      types.packed = bake([
      /* double   */
      1,
      /* float    */
      5,
      /* int32    */
      0,
      /* uint32   */
      0,
      /* sint32   */
      0,
      /* fixed32  */
      5,
      /* sfixed32 */
      5,
      /* int64    */
      0,
      /* uint64   */
      0,
      /* sint64   */
      0,
      /* fixed64  */
      1,
      /* sfixed64 */
      1,
      /* bool     */
      0]);
    }, {
      "37": 37
    }],
    37: [function (require, module, exports) {
      "use strict";
      /**
       * Various utility functions.
       * @namespace
       */

      var util = module.exports = require(39);

      var roots = require(30);

      var Type, // cyclic
      Enum;
      util.codegen = require(3);
      util.fetch = require(5);
      util.path = require(8);
      /**
       * Node's fs module if available.
       * @type {Object.<string,*>}
       */

      util.fs = util.inquire("fs");
      /**
       * Converts an object's values to an array.
       * @param {Object.<string,*>} object Object to convert
       * @returns {Array.<*>} Converted array
       */

      util.toArray = function toArray(object) {
        if (object) {
          var keys = Object.keys(object),
              array = new Array(keys.length),
              index = 0;

          while (index < keys.length) {
            array[index] = object[keys[index++]];
          }

          return array;
        }

        return [];
      };
      /**
       * Converts an array of keys immediately followed by their respective value to an object, omitting undefined values.
       * @param {Array.<*>} array Array to convert
       * @returns {Object.<string,*>} Converted object
       */


      util.toObject = function toObject(array) {
        var object = {},
            index = 0;

        while (index < array.length) {
          var key = array[index++],
              val = array[index++];
          if (val !== undefined) object[key] = val;
        }

        return object;
      };

      var safePropBackslashRe = /\\/g,
          safePropQuoteRe = /"/g;
      /**
       * Tests whether the specified name is a reserved word in JS.
       * @param {string} name Name to test
       * @returns {boolean} `true` if reserved, otherwise `false`
       */

      util.isReserved = function isReserved(name) {
        return /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(name);
      };
      /**
       * Returns a safe property accessor for the specified property name.
       * @param {string} prop Property name
       * @returns {string} Safe accessor
       */


      util.safeProp = function safeProp(prop) {
        if (!/^[$\w_]+$/.test(prop) || util.isReserved(prop)) return "[\"" + prop.replace(safePropBackslashRe, "\\\\").replace(safePropQuoteRe, "\\\"") + "\"]";
        return "." + prop;
      };
      /**
       * Converts the first character of a string to upper case.
       * @param {string} str String to convert
       * @returns {string} Converted string
       */


      util.ucFirst = function ucFirst(str) {
        return str.charAt(0).toUpperCase() + str.substring(1);
      };

      var camelCaseRe = /_([a-z])/g;
      /**
       * Converts a string to camel case.
       * @param {string} str String to convert
       * @returns {string} Converted string
       */

      util.camelCase = function camelCase(str) {
        return str.substring(0, 1) + str.substring(1).replace(camelCaseRe, function ($0, $1) {
          return $1.toUpperCase();
        });
      };
      /**
       * Compares reflected fields by id.
       * @param {Field} a First field
       * @param {Field} b Second field
       * @returns {number} Comparison value
       */


      util.compareFieldsById = function compareFieldsById(a, b) {
        return a.id - b.id;
      };
      /**
       * Decorator helper for types (TypeScript).
       * @param {Constructor<T>} ctor Constructor function
       * @param {string} [typeName] Type name, defaults to the constructor's name
       * @returns {Type} Reflected type
       * @template T extends Message<T>
       * @property {Root} root Decorators root
       */


      util.decorateType = function decorateType(ctor, typeName) {
        /* istanbul ignore if */
        if (ctor.$type) {
          if (typeName && ctor.$type.name !== typeName) {
            util.decorateRoot.remove(ctor.$type);
            ctor.$type.name = typeName;
            util.decorateRoot.add(ctor.$type);
          }

          return ctor.$type;
        }
        /* istanbul ignore next */


        if (!Type) Type = require(35);
        var type = new Type(typeName || ctor.name);
        util.decorateRoot.add(type);
        type.ctor = ctor; // sets up .encode, .decode etc.

        Object.defineProperty(ctor, "$type", {
          value: type,
          enumerable: false
        });
        Object.defineProperty(ctor.prototype, "$type", {
          value: type,
          enumerable: false
        });
        return type;
      };

      var decorateEnumIndex = 0;
      /**
       * Decorator helper for enums (TypeScript).
       * @param {Object} object Enum object
       * @returns {Enum} Reflected enum
       */

      util.decorateEnum = function decorateEnum(object) {
        /* istanbul ignore if */
        if (object.$type) return object.$type;
        /* istanbul ignore next */

        if (!Enum) Enum = require(15);
        var enm = new Enum("Enum" + decorateEnumIndex++, object);
        util.decorateRoot.add(enm);
        Object.defineProperty(object, "$type", {
          value: enm,
          enumerable: false
        });
        return enm;
      };
      /**
       * Decorator root (TypeScript).
       * @name util.decorateRoot
       * @type {Root}
       * @readonly
       */


      Object.defineProperty(util, "decorateRoot", {
        get: function get() {
          return roots["decorated"] || (roots["decorated"] = new (require(29))());
        }
      });
    }, {
      "15": 15,
      "29": 29,
      "3": 3,
      "30": 30,
      "35": 35,
      "39": 39,
      "5": 5,
      "8": 8
    }],
    38: [function (require, module, exports) {
      "use strict";

      module.exports = LongBits;

      var util = require(39);
      /**
       * Constructs new long bits.
       * @classdesc Helper class for working with the low and high bits of a 64 bit value.
       * @memberof util
       * @constructor
       * @param {number} lo Low 32 bits, unsigned
       * @param {number} hi High 32 bits, unsigned
       */


      function LongBits(lo, hi) {
        // note that the casts below are theoretically unnecessary as of today, but older statically
        // generated converter code might still call the ctor with signed 32bits. kept for compat.

        /**
         * Low bits.
         * @type {number}
         */
        this.lo = lo >>> 0;
        /**
         * High bits.
         * @type {number}
         */

        this.hi = hi >>> 0;
      }
      /**
       * Zero bits.
       * @memberof util.LongBits
       * @type {util.LongBits}
       */


      var zero = LongBits.zero = new LongBits(0, 0);

      zero.toNumber = function () {
        return 0;
      };

      zero.zzEncode = zero.zzDecode = function () {
        return this;
      };

      zero.length = function () {
        return 1;
      };
      /**
       * Zero hash.
       * @memberof util.LongBits
       * @type {string}
       */


      var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
      /**
       * Constructs new long bits from the specified number.
       * @param {number} value Value
       * @returns {util.LongBits} Instance
       */

      LongBits.fromNumber = function fromNumber(value) {
        if (value === 0) return zero;
        var sign = value < 0;
        if (sign) value = -value;
        var lo = value >>> 0,
            hi = (value - lo) / 4294967296 >>> 0;

        if (sign) {
          hi = ~hi >>> 0;
          lo = ~lo >>> 0;

          if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295) hi = 0;
          }
        }

        return new LongBits(lo, hi);
      };
      /**
       * Constructs new long bits from a number, long or string.
       * @param {Long|number|string} value Value
       * @returns {util.LongBits} Instance
       */


      LongBits.from = function from(value) {
        if (typeof value === "number") return LongBits.fromNumber(value);

        if (util.isString(value)) {
          /* istanbul ignore else */
          if (util.Long) value = util.Long.fromString(value);else return LongBits.fromNumber(parseInt(value, 10));
        }

        return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
      };
      /**
       * Converts this long bits to a possibly unsafe JavaScript number.
       * @param {boolean} [unsigned=false] Whether unsigned or not
       * @returns {number} Possibly unsafe number
       */


      LongBits.prototype.toNumber = function toNumber(unsigned) {
        if (!unsigned && this.hi >>> 31) {
          var lo = ~this.lo + 1 >>> 0,
              hi = ~this.hi >>> 0;
          if (!lo) hi = hi + 1 >>> 0;
          return -(lo + hi * 4294967296);
        }

        return this.lo + this.hi * 4294967296;
      };
      /**
       * Converts this long bits to a long.
       * @param {boolean} [unsigned=false] Whether unsigned or not
       * @returns {Long} Long
       */


      LongBits.prototype.toLong = function toLong(unsigned) {
        return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned))
        /* istanbul ignore next */
        : {
          low: this.lo | 0,
          high: this.hi | 0,
          unsigned: Boolean(unsigned)
        };
      };

      var charCodeAt = String.prototype.charCodeAt;
      /**
       * Constructs new long bits from the specified 8 characters long hash.
       * @param {string} hash Hash
       * @returns {util.LongBits} Bits
       */

      LongBits.fromHash = function fromHash(hash) {
        if (hash === zeroHash) return zero;
        return new LongBits((charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0, (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0);
      };
      /**
       * Converts this long bits to a 8 characters long hash.
       * @returns {string} Hash
       */


      LongBits.prototype.toHash = function toHash() {
        return String.fromCharCode(this.lo & 255, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, this.hi & 255, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
      };
      /**
       * Zig-zag encodes this long bits.
       * @returns {util.LongBits} `this`
       */


      LongBits.prototype.zzEncode = function zzEncode() {
        var mask = this.hi >> 31;
        this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
        this.lo = (this.lo << 1 ^ mask) >>> 0;
        return this;
      };
      /**
       * Zig-zag decodes this long bits.
       * @returns {util.LongBits} `this`
       */


      LongBits.prototype.zzDecode = function zzDecode() {
        var mask = -(this.lo & 1);
        this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
        this.hi = (this.hi >>> 1 ^ mask) >>> 0;
        return this;
      };
      /**
       * Calculates the length of this longbits when encoded as a varint.
       * @returns {number} Length
       */


      LongBits.prototype.length = function length() {
        var part0 = this.lo,
            part1 = (this.lo >>> 28 | this.hi << 4) >>> 0,
            part2 = this.hi >>> 24;
        return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
      };
    }, {
      "39": 39
    }],
    39: [function (require, module, exports) {
      "use strict";

      var util = exports; // used to return a Promise where callback is omitted

      util.asPromise = require(1); // converts to / from base64 encoded strings

      util.base64 = require(2); // base class of rpc.Service

      util.EventEmitter = require(4); // float handling accross browsers

      util["float"] = require(6); // requires modules optionally and hides the call from bundlers

      util.inquire = require(7); // converts to / from utf8 encoded strings

      util.utf8 = require(10); // provides a node-like buffer pool in the browser

      util.pool = require(9); // utility to work with the low and high bits of a 64 bit value

      util.LongBits = require(38);
      /**
       * An immuable empty array.
       * @memberof util
       * @type {Array.<*>}
       * @const
       */

      util.emptyArray = Object.freeze ? Object.freeze([]) :
      /* istanbul ignore next */
      []; // used on prototypes

      /**
       * An immutable empty object.
       * @type {Object}
       * @const
       */

      util.emptyObject = Object.freeze ? Object.freeze({}) :
      /* istanbul ignore next */
      {}; // used on prototypes

      /**
       * Whether running within node or not.
       * @memberof util
       * @type {boolean}
       * @const
       */

      util.isNode = Boolean(global.process && global.process.versions && global.process.versions.node);
      /**
       * Tests if the specified value is an integer.
       * @function
       * @param {*} value Value to test
       * @returns {boolean} `true` if the value is an integer
       */

      util.isInteger = Number.isInteger ||
      /* istanbul ignore next */
      function isInteger(value) {
        return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
      };
      /**
       * Tests if the specified value is a string.
       * @param {*} value Value to test
       * @returns {boolean} `true` if the value is a string
       */


      util.isString = function isString(value) {
        return typeof value === "string" || value instanceof String;
      };
      /**
       * Tests if the specified value is a non-null object.
       * @param {*} value Value to test
       * @returns {boolean} `true` if the value is a non-null object
       */


      util.isObject = function isObject(value) {
        return value && _typeof(value) === "object";
      };
      /**
       * Checks if a property on a message is considered to be present.
       * This is an alias of {@link util.isSet}.
       * @function
       * @param {Object} obj Plain object or message instance
       * @param {string} prop Property name
       * @returns {boolean} `true` if considered to be present, otherwise `false`
       */


      util.isset =
      /**
       * Checks if a property on a message is considered to be present.
       * @param {Object} obj Plain object or message instance
       * @param {string} prop Property name
       * @returns {boolean} `true` if considered to be present, otherwise `false`
       */
      util.isSet = function isSet(obj, prop) {
        var value = obj[prop];
        if (value != null && obj.hasOwnProperty(prop)) // eslint-disable-line eqeqeq, no-prototype-builtins
          return _typeof(value) !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
        return false;
      };
      /**
       * Any compatible Buffer instance.
       * This is a minimal stand-alone definition of a Buffer instance. The actual type is that exported by node's typings.
       * @interface Buffer
       * @extends Uint8Array
       */

      /**
       * Node's Buffer class if available.
       * @type {Constructor<Buffer>}
       */


      util.Buffer = function () {
        try {
          var Buffer = util.inquire("buffer").Buffer; // refuse to use non-node buffers if not explicitly assigned (perf reasons):

          return Buffer.prototype.utf8Write ? Buffer :
          /* istanbul ignore next */
          null;
        } catch (e) {
          /* istanbul ignore next */
          return null;
        }
      }(); // Internal alias of or polyfull for Buffer.from.


      util._Buffer_from = null; // Internal alias of or polyfill for Buffer.allocUnsafe.

      util._Buffer_allocUnsafe = null;
      /**
       * Creates a new buffer of whatever type supported by the environment.
       * @param {number|number[]} [sizeOrArray=0] Buffer size or number array
       * @returns {Uint8Array|Buffer} Buffer
       */

      util.newBuffer = function newBuffer(sizeOrArray) {
        /* istanbul ignore next */
        return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
      };
      /**
       * Array implementation used in the browser. `Uint8Array` if supported, otherwise `Array`.
       * @type {Constructor<Uint8Array>}
       */


      util.Array = typeof Uint8Array !== "undefined" ? Uint8Array
      /* istanbul ignore next */
      : Array;
      /**
       * Any compatible Long instance.
       * This is a minimal stand-alone definition of a Long instance. The actual type is that exported by long.js.
       * @interface Long
       * @property {number} low Low bits
       * @property {number} high High bits
       * @property {boolean} unsigned Whether unsigned or not
       */

      /**
       * Long.js's Long class if available.
       * @type {Constructor<Long>}
       */

      util.Long =
      /* istanbul ignore next */
      global.dcodeIO &&
      /* istanbul ignore next */
      global.dcodeIO.Long || util.inquire("long");
      /**
       * Regular expression used to verify 2 bit (`bool`) map keys.
       * @type {RegExp}
       * @const
       */

      util.key2Re = /^true|false|0|1$/;
      /**
       * Regular expression used to verify 32 bit (`int32` etc.) map keys.
       * @type {RegExp}
       * @const
       */

      util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
      /**
       * Regular expression used to verify 64 bit (`int64` etc.) map keys.
       * @type {RegExp}
       * @const
       */

      util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
      /**
       * Converts a number or long to an 8 characters long hash string.
       * @param {Long|number} value Value to convert
       * @returns {string} Hash
       */

      util.longToHash = function longToHash(value) {
        return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
      };
      /**
       * Converts an 8 characters long hash string to a long or number.
       * @param {string} hash Hash
       * @param {boolean} [unsigned=false] Whether unsigned or not
       * @returns {Long|number} Original value
       */


      util.longFromHash = function longFromHash(hash, unsigned) {
        var bits = util.LongBits.fromHash(hash);
        if (util.Long) return util.Long.fromBits(bits.lo, bits.hi, unsigned);
        return bits.toNumber(Boolean(unsigned));
      };
      /**
       * Merges the properties of the source object into the destination object.
       * @memberof util
       * @param {Object.<string,*>} dst Destination object
       * @param {Object.<string,*>} src Source object
       * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
       * @returns {Object.<string,*>} Destination object
       */


      function merge(dst, src, ifNotSet) {
        // used by converters
        for (var keys = Object.keys(src), i = 0; i < keys.length; ++i) {
          if (dst[keys[i]] === undefined || !ifNotSet) dst[keys[i]] = src[keys[i]];
        }

        return dst;
      }

      util.merge = merge;
      /**
       * Converts the first character of a string to lower case.
       * @param {string} str String to convert
       * @returns {string} Converted string
       */

      util.lcFirst = function lcFirst(str) {
        return str.charAt(0).toLowerCase() + str.substring(1);
      };
      /**
       * Creates a custom error constructor.
       * @memberof util
       * @param {string} name Error name
       * @returns {Constructor<Error>} Custom error constructor
       */


      function newError(name) {
        function CustomError(message, properties) {
          if (!(this instanceof CustomError)) return new CustomError(message, properties); // Error.call(this, message);
          // ^ just returns a new error instance because the ctor can be called as a function

          Object.defineProperty(this, "message", {
            get: function get() {
              return message;
            }
          });
          /* istanbul ignore next */

          if (Error.captureStackTrace) // node
            Error.captureStackTrace(this, CustomError);else Object.defineProperty(this, "stack", {
            value: new Error().stack || ""
          });
          if (properties) merge(this, properties);
        }

        (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;
        Object.defineProperty(CustomError.prototype, "name", {
          get: function get() {
            return name;
          }
        });

        CustomError.prototype.toString = function toString() {
          return this.name + ": " + this.message;
        };

        return CustomError;
      }

      util.newError = newError;
      /**
       * Constructs a new protocol error.
       * @classdesc Error subclass indicating a protocol specifc error.
       * @memberof util
       * @extends Error
       * @template T extends Message<T>
       * @constructor
       * @param {string} message Error message
       * @param {Object.<string,*>} [properties] Additional properties
       * @example
       * try {
       *     MyMessage.decode(someBuffer); // throws if required fields are missing
       * } catch (e) {
       *     if (e instanceof ProtocolError && e.instance)
       *         console.log("decoded so far: " + JSON.stringify(e.instance));
       * }
       */

      util.ProtocolError = newError("ProtocolError");
      /**
       * So far decoded message instance.
       * @name util.ProtocolError#instance
       * @type {Message<T>}
       */

      /**
       * A OneOf getter as returned by {@link util.oneOfGetter}.
       * @typedef OneOfGetter
       * @type {function}
       * @returns {string|undefined} Set field name, if any
       */

      /**
       * Builds a getter for a oneof's present field name.
       * @param {string[]} fieldNames Field names
       * @returns {OneOfGetter} Unbound getter
       */

      util.oneOfGetter = function getOneOf(fieldNames) {
        var fieldMap = {};

        for (var i = 0; i < fieldNames.length; ++i) {
          fieldMap[fieldNames[i]] = 1;
        }
        /**
         * @returns {string|undefined} Set field name, if any
         * @this Object
         * @ignore
         */


        return function () {
          // eslint-disable-line consistent-return
          for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i) {
            if (fieldMap[keys[i]] === 1 && this[keys[i]] !== undefined && this[keys[i]] !== null) return keys[i];
          }
        };
      };
      /**
       * A OneOf setter as returned by {@link util.oneOfSetter}.
       * @typedef OneOfSetter
       * @type {function}
       * @param {string|undefined} value Field name
       * @returns {undefined}
       */

      /**
       * Builds a setter for a oneof's present field name.
       * @param {string[]} fieldNames Field names
       * @returns {OneOfSetter} Unbound setter
       */


      util.oneOfSetter = function setOneOf(fieldNames) {
        /**
         * @param {string} name Field name
         * @returns {undefined}
         * @this Object
         * @ignore
         */
        return function (name) {
          for (var i = 0; i < fieldNames.length; ++i) {
            if (fieldNames[i] !== name) delete this[fieldNames[i]];
          }
        };
      };
      /**
       * Default conversion options used for {@link Message#toJSON} implementations.
       *
       * These options are close to proto3's JSON mapping with the exception that internal types like Any are handled just like messages. More precisely:
       *
       * - Longs become strings
       * - Enums become string keys
       * - Bytes become base64 encoded strings
       * - (Sub-)Messages become plain objects
       * - Maps become plain objects with all string keys
       * - Repeated fields become arrays
       * - NaN and Infinity for float and double fields become strings
       *
       * @type {IConversionOptions}
       * @see https://developers.google.com/protocol-buffers/docs/proto3?hl=en#json
       */


      util.toJSONOptions = {
        longs: String,
        enums: String,
        bytes: String,
        json: true
      };

      util._configure = function () {
        var Buffer = util.Buffer;
        /* istanbul ignore if */

        if (!Buffer) {
          util._Buffer_from = util._Buffer_allocUnsafe = null;
          return;
        } // because node 4.x buffers are incompatible & immutable
        // see: https://github.com/dcodeIO/protobuf.js/pull/665


        util._Buffer_from = Buffer.from !== Uint8Array.from && Buffer.from ||
        /* istanbul ignore next */
        function Buffer_from(value, encoding) {
          return new Buffer(value, encoding);
        };

        util._Buffer_allocUnsafe = Buffer.allocUnsafe ||
        /* istanbul ignore next */
        function Buffer_allocUnsafe(size) {
          return new Buffer(size);
        };
      };
    }, {
      "1": 1,
      "10": 10,
      "2": 2,
      "38": 38,
      "4": 4,
      "6": 6,
      "7": 7,
      "9": 9
    }],
    40: [function (require, module, exports) {
      "use strict";

      module.exports = verifier;

      var Enum = require(15),
          util = require(37);

      function invalid(field, expected) {
        return field.name + ": " + expected + (field.repeated && expected !== "array" ? "[]" : field.map && expected !== "object" ? "{k:" + field.keyType + "}" : "") + " expected";
      }
      /**
       * Generates a partial value verifier.
       * @param {Codegen} gen Codegen instance
       * @param {Field} field Reflected field
       * @param {number} fieldIndex Field index
       * @param {string} ref Variable reference
       * @returns {Codegen} Codegen instance
       * @ignore
       */


      function genVerifyValue(gen, field, fieldIndex, ref) {
        /* eslint-disable no-unexpected-multiline */
        if (field.resolvedType) {
          if (field.resolvedType instanceof Enum) {
            gen("switch(%s){", ref)("default:")("return%j", invalid(field, "enum value"));

            for (var keys = Object.keys(field.resolvedType.values), j = 0; j < keys.length; ++j) {
              gen("case %i:", field.resolvedType.values[keys[j]]);
            }

            gen("break")("}");
          } else {
            gen("{")("var e=types[%i].verify(%s);", fieldIndex, ref)("if(e)")("return%j+e", field.name + ".")("}");
          }
        } else {
          switch (field.type) {
            case "int32":
            case "uint32":
            case "sint32":
            case "fixed32":
            case "sfixed32":
              gen("if(!util.isInteger(%s))", ref)("return%j", invalid(field, "integer"));
              break;

            case "int64":
            case "uint64":
            case "sint64":
            case "fixed64":
            case "sfixed64":
              gen("if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))", ref, ref, ref, ref)("return%j", invalid(field, "integer|Long"));
              break;

            case "float":
            case "double":
              gen("if(typeof %s!==\"number\")", ref)("return%j", invalid(field, "number"));
              break;

            case "bool":
              gen("if(typeof %s!==\"boolean\")", ref)("return%j", invalid(field, "boolean"));
              break;

            case "string":
              gen("if(!util.isString(%s))", ref)("return%j", invalid(field, "string"));
              break;

            case "bytes":
              gen("if(!(%s&&typeof %s.length===\"number\"||util.isString(%s)))", ref, ref, ref)("return%j", invalid(field, "buffer"));
              break;
          }
        }

        return gen;
        /* eslint-enable no-unexpected-multiline */
      }
      /**
       * Generates a partial key verifier.
       * @param {Codegen} gen Codegen instance
       * @param {Field} field Reflected field
       * @param {string} ref Variable reference
       * @returns {Codegen} Codegen instance
       * @ignore
       */


      function genVerifyKey(gen, field, ref) {
        /* eslint-disable no-unexpected-multiline */
        switch (field.keyType) {
          case "int32":
          case "uint32":
          case "sint32":
          case "fixed32":
          case "sfixed32":
            gen("if(!util.key32Re.test(%s))", ref)("return%j", invalid(field, "integer key"));
            break;

          case "int64":
          case "uint64":
          case "sint64":
          case "fixed64":
          case "sfixed64":
            gen("if(!util.key64Re.test(%s))", ref) // see comment above: x is ok, d is not
            ("return%j", invalid(field, "integer|Long key"));
            break;

          case "bool":
            gen("if(!util.key2Re.test(%s))", ref)("return%j", invalid(field, "boolean key"));
            break;
        }

        return gen;
        /* eslint-enable no-unexpected-multiline */
      }
      /**
       * Generates a verifier specific to the specified message type.
       * @param {Type} mtype Message type
       * @returns {Codegen} Codegen instance
       */


      function verifier(mtype) {
        /* eslint-disable no-unexpected-multiline */
        var gen = util.codegen(["m"], mtype.name + "$verify")("if(typeof m!==\"object\"||m===null)")("return%j", "object expected");
        var oneofs = mtype.oneofsArray,
            seenFirstField = {};
        if (oneofs.length) gen("var p={}");

        for (var i = 0; i <
        /* initializes */
        mtype.fieldsArray.length; ++i) {
          var field = mtype._fieldsArray[i].resolve(),
              ref = "m" + util.safeProp(field.name);

          if (field.optional) gen("if(%s!=null&&m.hasOwnProperty(%j)){", ref, field.name); // !== undefined && !== null
          // map fields

          if (field.map) {
            gen("if(!util.isObject(%s))", ref)("return%j", invalid(field, "object"))("var k=Object.keys(%s)", ref)("for(var i=0;i<k.length;++i){");
            genVerifyKey(gen, field, "k[i]");
            genVerifyValue(gen, field, i, ref + "[k[i]]")("}"); // repeated fields
          } else if (field.repeated) {
            gen("if(!Array.isArray(%s))", ref)("return%j", invalid(field, "array"))("for(var i=0;i<%s.length;++i){", ref);
            genVerifyValue(gen, field, i, ref + "[i]")("}"); // required or present fields
          } else {
            if (field.partOf) {
              var oneofProp = util.safeProp(field.partOf.name);
              if (seenFirstField[field.partOf.name] === 1) gen("if(p%s===1)", oneofProp)("return%j", field.partOf.name + ": multiple values");
              seenFirstField[field.partOf.name] = 1;
              gen("p%s=1", oneofProp);
            }

            genVerifyValue(gen, field, i, ref);
          }

          if (field.optional) gen("}");
        }

        return gen("return null");
        /* eslint-enable no-unexpected-multiline */
      }
    }, {
      "15": 15,
      "37": 37
    }],
    41: [function (require, module, exports) {
      "use strict";
      /**
       * Wrappers for common types.
       * @type {Object.<string,IWrapper>}
       * @const
       */

      var wrappers = exports;

      var Message = require(21);
      /**
       * From object converter part of an {@link IWrapper}.
       * @typedef WrapperFromObjectConverter
       * @type {function}
       * @param {Object.<string,*>} object Plain object
       * @returns {Message<{}>} Message instance
       * @this Type
       */

      /**
       * To object converter part of an {@link IWrapper}.
       * @typedef WrapperToObjectConverter
       * @type {function}
       * @param {Message<{}>} message Message instance
       * @param {IConversionOptions} [options] Conversion options
       * @returns {Object.<string,*>} Plain object
       * @this Type
       */

      /**
       * Common type wrapper part of {@link wrappers}.
       * @interface IWrapper
       * @property {WrapperFromObjectConverter} [fromObject] From object converter
       * @property {WrapperToObjectConverter} [toObject] To object converter
       */
      // Custom wrapper for Any


      wrappers[".google.protobuf.Any"] = {
        fromObject: function fromObject(object) {
          // unwrap value type if mapped
          if (object && object["@type"]) {
            var type = this.lookup(object["@type"]);
            /* istanbul ignore else */

            if (type) {
              // type_url does not accept leading "."
              var type_url = object["@type"].charAt(0) === "." ? object["@type"].substr(1) : object["@type"]; // type_url prefix is optional, but path seperator is required

              return this.create({
                type_url: "/" + type_url,
                value: type.encode(type.fromObject(object)).finish()
              });
            }
          }

          return this.fromObject(object);
        },
        toObject: function toObject(message, options) {
          // decode value if requested and unmapped
          if (options && options.json && message.type_url && message.value) {
            // Only use fully qualified type name after the last '/'
            var name = message.type_url.substring(message.type_url.lastIndexOf("/") + 1);
            var type = this.lookup(name);
            /* istanbul ignore else */

            if (type) message = type.decode(message.value);
          } // wrap value if unmapped


          if (!(message instanceof this.ctor) && message instanceof Message) {
            var object = message.$type.toObject(message, options);
            object["@type"] = message.$type.fullName;
            return object;
          }

          return this.toObject(message, options);
        }
      };
    }, {
      "21": 21
    }],
    42: [function (require, module, exports) {
      "use strict";

      module.exports = Writer;

      var util = require(39);

      var BufferWriter; // cyclic

      var LongBits = util.LongBits,
          base64 = util.base64,
          utf8 = util.utf8;
      /**
       * Constructs a new writer operation instance.
       * @classdesc Scheduled writer operation.
       * @constructor
       * @param {function(*, Uint8Array, number)} fn Function to call
       * @param {number} len Value byte length
       * @param {*} val Value to write
       * @ignore
       */

      function Op(fn, len, val) {
        /**
         * Function to call.
         * @type {function(Uint8Array, number, *)}
         */
        this.fn = fn;
        /**
         * Value byte length.
         * @type {number}
         */

        this.len = len;
        /**
         * Next operation.
         * @type {Writer.Op|undefined}
         */

        this.next = undefined;
        /**
         * Value to write.
         * @type {*}
         */

        this.val = val; // type varies
      }
      /* istanbul ignore next */


      function noop() {} // eslint-disable-line no-empty-function

      /**
       * Constructs a new writer state instance.
       * @classdesc Copied writer state.
       * @memberof Writer
       * @constructor
       * @param {Writer} writer Writer to copy state from
       * @ignore
       */


      function State(writer) {
        /**
         * Current head.
         * @type {Writer.Op}
         */
        this.head = writer.head;
        /**
         * Current tail.
         * @type {Writer.Op}
         */

        this.tail = writer.tail;
        /**
         * Current buffer length.
         * @type {number}
         */

        this.len = writer.len;
        /**
         * Next state.
         * @type {State|null}
         */

        this.next = writer.states;
      }
      /**
       * Constructs a new writer instance.
       * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
       * @constructor
       */


      function Writer() {
        /**
         * Current length.
         * @type {number}
         */
        this.len = 0;
        /**
         * Operations head.
         * @type {Object}
         */

        this.head = new Op(noop, 0, 0);
        /**
         * Operations tail
         * @type {Object}
         */

        this.tail = this.head;
        /**
         * Linked forked states.
         * @type {Object|null}
         */

        this.states = null; // When a value is written, the writer calculates its byte length and puts it into a linked
        // list of operations to perform when finish() is called. This both allows us to allocate
        // buffers of the exact required size and reduces the amount of work we have to do compared
        // to first calculating over objects and then encoding over objects. In our case, the encoding
        // part is just a linked list walk calling operations with already prepared values.
      }
      /**
       * Creates a new writer.
       * @function
       * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
       */


      Writer.create = util.Buffer ? function create_buffer_setup() {
        return (Writer.create = function create_buffer() {
          return new BufferWriter();
        })();
      }
      /* istanbul ignore next */
      : function create_array() {
        return new Writer();
      };
      /**
       * Allocates a buffer of the specified size.
       * @param {number} size Buffer size
       * @returns {Uint8Array} Buffer
       */

      Writer.alloc = function alloc(size) {
        return new util.Array(size);
      }; // Use Uint8Array buffer pool in the browser, just like node does with buffers

      /* istanbul ignore else */


      if (util.Array !== Array) Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
      /**
       * Pushes a new operation to the queue.
       * @param {function(Uint8Array, number, *)} fn Function to call
       * @param {number} len Value byte length
       * @param {number} val Value to write
       * @returns {Writer} `this`
       * @private
       */

      Writer.prototype._push = function push(fn, len, val) {
        this.tail = this.tail.next = new Op(fn, len, val);
        this.len += len;
        return this;
      };

      function writeByte(val, buf, pos) {
        buf[pos] = val & 255;
      }

      function writeVarint32(val, buf, pos) {
        while (val > 127) {
          buf[pos++] = val & 127 | 128;
          val >>>= 7;
        }

        buf[pos] = val;
      }
      /**
       * Constructs a new varint writer operation instance.
       * @classdesc Scheduled varint writer operation.
       * @extends Op
       * @constructor
       * @param {number} len Value byte length
       * @param {number} val Value to write
       * @ignore
       */


      function VarintOp(len, val) {
        this.len = len;
        this.next = undefined;
        this.val = val;
      }

      VarintOp.prototype = Object.create(Op.prototype);
      VarintOp.prototype.fn = writeVarint32;
      /**
       * Writes an unsigned 32 bit value as a varint.
       * @param {number} value Value to write
       * @returns {Writer} `this`
       */

      Writer.prototype.uint32 = function write_uint32(value) {
        // here, the call to this.push has been inlined and a varint specific Op subclass is used.
        // uint32 is by far the most frequently used operation and benefits significantly from this.
        this.len += (this.tail = this.tail.next = new VarintOp((value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5, value)).len;
        return this;
      };
      /**
       * Writes a signed 32 bit value as a varint.
       * @function
       * @param {number} value Value to write
       * @returns {Writer} `this`
       */


      Writer.prototype.int32 = function write_int32(value) {
        return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) // 10 bytes per spec
        : this.uint32(value);
      };
      /**
       * Writes a 32 bit value as a varint, zig-zag encoded.
       * @param {number} value Value to write
       * @returns {Writer} `this`
       */


      Writer.prototype.sint32 = function write_sint32(value) {
        return this.uint32((value << 1 ^ value >> 31) >>> 0);
      };

      function writeVarint64(val, buf, pos) {
        while (val.hi) {
          buf[pos++] = val.lo & 127 | 128;
          val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
          val.hi >>>= 7;
        }

        while (val.lo > 127) {
          buf[pos++] = val.lo & 127 | 128;
          val.lo = val.lo >>> 7;
        }

        buf[pos++] = val.lo;
      }
      /**
       * Writes an unsigned 64 bit value as a varint.
       * @param {Long|number|string} value Value to write
       * @returns {Writer} `this`
       * @throws {TypeError} If `value` is a string and no long library is present.
       */


      Writer.prototype.uint64 = function write_uint64(value) {
        var bits = LongBits.from(value);
        return this._push(writeVarint64, bits.length(), bits);
      };
      /**
       * Writes a signed 64 bit value as a varint.
       * @function
       * @param {Long|number|string} value Value to write
       * @returns {Writer} `this`
       * @throws {TypeError} If `value` is a string and no long library is present.
       */


      Writer.prototype.int64 = Writer.prototype.uint64;
      /**
       * Writes a signed 64 bit value as a varint, zig-zag encoded.
       * @param {Long|number|string} value Value to write
       * @returns {Writer} `this`
       * @throws {TypeError} If `value` is a string and no long library is present.
       */

      Writer.prototype.sint64 = function write_sint64(value) {
        var bits = LongBits.from(value).zzEncode();
        return this._push(writeVarint64, bits.length(), bits);
      };
      /**
       * Writes a boolish value as a varint.
       * @param {boolean} value Value to write
       * @returns {Writer} `this`
       */


      Writer.prototype.bool = function write_bool(value) {
        return this._push(writeByte, 1, value ? 1 : 0);
      };

      function writeFixed32(val, buf, pos) {
        buf[pos] = val & 255;
        buf[pos + 1] = val >>> 8 & 255;
        buf[pos + 2] = val >>> 16 & 255;
        buf[pos + 3] = val >>> 24;
      }
      /**
       * Writes an unsigned 32 bit value as fixed 32 bits.
       * @param {number} value Value to write
       * @returns {Writer} `this`
       */


      Writer.prototype.fixed32 = function write_fixed32(value) {
        return this._push(writeFixed32, 4, value >>> 0);
      };
      /**
       * Writes a signed 32 bit value as fixed 32 bits.
       * @function
       * @param {number} value Value to write
       * @returns {Writer} `this`
       */


      Writer.prototype.sfixed32 = Writer.prototype.fixed32;
      /**
       * Writes an unsigned 64 bit value as fixed 64 bits.
       * @param {Long|number|string} value Value to write
       * @returns {Writer} `this`
       * @throws {TypeError} If `value` is a string and no long library is present.
       */

      Writer.prototype.fixed64 = function write_fixed64(value) {
        var bits = LongBits.from(value);
        return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
      };
      /**
       * Writes a signed 64 bit value as fixed 64 bits.
       * @function
       * @param {Long|number|string} value Value to write
       * @returns {Writer} `this`
       * @throws {TypeError} If `value` is a string and no long library is present.
       */


      Writer.prototype.sfixed64 = Writer.prototype.fixed64;
      /**
       * Writes a float (32 bit).
       * @function
       * @param {number} value Value to write
       * @returns {Writer} `this`
       */

      Writer.prototype["float"] = function write_float(value) {
        return this._push(util["float"].writeFloatLE, 4, value);
      };
      /**
       * Writes a double (64 bit float).
       * @function
       * @param {number} value Value to write
       * @returns {Writer} `this`
       */


      Writer.prototype["double"] = function write_double(value) {
        return this._push(util["float"].writeDoubleLE, 8, value);
      };

      var writeBytes = util.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
        buf.set(val, pos); // also works for plain array values
      }
      /* istanbul ignore next */
      : function writeBytes_for(val, buf, pos) {
        for (var i = 0; i < val.length; ++i) {
          buf[pos + i] = val[i];
        }
      };
      /**
       * Writes a sequence of bytes.
       * @param {Uint8Array|string} value Buffer or base64 encoded string to write
       * @returns {Writer} `this`
       */

      Writer.prototype.bytes = function write_bytes(value) {
        var len = value.length >>> 0;
        if (!len) return this._push(writeByte, 1, 0);

        if (util.isString(value)) {
          var buf = Writer.alloc(len = base64.length(value));
          base64.decode(value, buf, 0);
          value = buf;
        }

        return this.uint32(len)._push(writeBytes, len, value);
      };
      /**
       * Writes a string.
       * @param {string} value Value to write
       * @returns {Writer} `this`
       */


      Writer.prototype.string = function write_string(value) {
        var len = utf8.length(value);
        return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
      };
      /**
       * Forks this writer's state by pushing it to a stack.
       * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
       * @returns {Writer} `this`
       */


      Writer.prototype.fork = function fork() {
        this.states = new State(this);
        this.head = this.tail = new Op(noop, 0, 0);
        this.len = 0;
        return this;
      };
      /**
       * Resets this instance to the last state.
       * @returns {Writer} `this`
       */


      Writer.prototype.reset = function reset() {
        if (this.states) {
          this.head = this.states.head;
          this.tail = this.states.tail;
          this.len = this.states.len;
          this.states = this.states.next;
        } else {
          this.head = this.tail = new Op(noop, 0, 0);
          this.len = 0;
        }

        return this;
      };
      /**
       * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
       * @returns {Writer} `this`
       */


      Writer.prototype.ldelim = function ldelim() {
        var head = this.head,
            tail = this.tail,
            len = this.len;
        this.reset().uint32(len);

        if (len) {
          this.tail.next = head.next; // skip noop

          this.tail = tail;
          this.len += len;
        }

        return this;
      };
      /**
       * Finishes the write operation.
       * @returns {Uint8Array} Finished buffer
       */


      Writer.prototype.finish = function finish() {
        var head = this.head.next,
            // skip noop
        buf = this.constructor.alloc(this.len),
            pos = 0;

        while (head) {
          head.fn(head.val, buf, pos);
          pos += head.len;
          head = head.next;
        } // this.head = this.tail = null;


        return buf;
      };

      Writer._configure = function (BufferWriter_) {
        BufferWriter = BufferWriter_;
      };
    }, {
      "39": 39
    }],
    43: [function (require, module, exports) {
      "use strict";

      module.exports = BufferWriter; // extends Writer

      var Writer = require(42);

      (BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;

      var util = require(39);

      var Buffer = util.Buffer;
      /**
       * Constructs a new buffer writer instance.
       * @classdesc Wire format writer using node buffers.
       * @extends Writer
       * @constructor
       */

      function BufferWriter() {
        Writer.call(this);
      }
      /**
       * Allocates a buffer of the specified size.
       * @param {number} size Buffer size
       * @returns {Buffer} Buffer
       */


      BufferWriter.alloc = function alloc_buffer(size) {
        return (BufferWriter.alloc = util._Buffer_allocUnsafe)(size);
      };

      var writeBytesBuffer = Buffer && Buffer.prototype instanceof Uint8Array && Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
        buf.set(val, pos); // faster than copy (requires node >= 4 where Buffers extend Uint8Array and set is properly inherited)
        // also works for plain array values
      }
      /* istanbul ignore next */
      : function writeBytesBuffer_copy(val, buf, pos) {
        if (val.copy) // Buffer values
          val.copy(buf, pos, 0, val.length);else for (var i = 0; i < val.length;) {
          // plain array values
          buf[pos++] = val[i++];
        }
      };
      /**
       * @override
       */

      BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
        if (util.isString(value)) value = util._Buffer_from(value, "base64");
        var len = value.length >>> 0;
        this.uint32(len);
        if (len) this._push(writeBytesBuffer, len, value);
        return this;
      };

      function writeStringBuffer(val, buf, pos) {
        if (val.length < 40) // plain js is faster for short strings (probably due to redundant assertions)
          util.utf8.write(val, buf, pos);else buf.utf8Write(val, pos);
      }
      /**
       * @override
       */


      BufferWriter.prototype.string = function write_string_buffer(value) {
        var len = Buffer.byteLength(value);
        this.uint32(len);
        if (len) this._push(writeStringBuffer, len, value);
        return this;
      };
      /**
       * Finishes the write operation.
       * @name BufferWriter#finish
       * @function
       * @returns {Buffer} Finished buffer
       */

    }, {
      "39": 39,
      "42": 42
    }]
  }, {}, [19]);
})((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && window || (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" && self || void 0); //# sourceMappingURL=protobuf.js.map

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3Byb3RvYnVmLmpzIl0sIm5hbWVzIjpbImdsb2JhbCIsInVuZGVmaW5lZCIsInByZWx1ZGUiLCJtb2R1bGVzIiwiY2FjaGUiLCJlbnRyaWVzIiwiJHJlcXVpcmUiLCJuYW1lIiwiJG1vZHVsZSIsImNhbGwiLCJleHBvcnRzIiwicHJvdG9idWYiLCJkZWZpbmUiLCJhbWQiLCJMb25nIiwiaXNMb25nIiwidXRpbCIsImNvbmZpZ3VyZSIsIm1vZHVsZSIsInJlcXVpcmUiLCJhc1Byb21pc2UiLCJmbiIsImN0eCIsInBhcmFtcyIsIkFycmF5IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwib2Zmc2V0IiwiaW5kZXgiLCJwZW5kaW5nIiwiUHJvbWlzZSIsImV4ZWN1dG9yIiwicmVzb2x2ZSIsInJlamVjdCIsImNhbGxiYWNrIiwiZXJyIiwiYXBwbHkiLCJiYXNlNjQiLCJzdHJpbmciLCJwIiwibiIsImNoYXJBdCIsIk1hdGgiLCJjZWlsIiwiYjY0IiwiczY0IiwiaSIsImVuY29kZSIsImJ1ZmZlciIsInN0YXJ0IiwiZW5kIiwicGFydHMiLCJjaHVuayIsImoiLCJ0IiwiYiIsInB1c2giLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJzbGljZSIsImpvaW4iLCJpbnZhbGlkRW5jb2RpbmciLCJkZWNvZGUiLCJjIiwiY2hhckNvZGVBdCIsIkVycm9yIiwidGVzdCIsImNvZGVnZW4iLCJmdW5jdGlvblBhcmFtcyIsImZ1bmN0aW9uTmFtZSIsImJvZHkiLCJDb2RlZ2VuIiwiZm9ybWF0U3RyaW5nT3JTY29wZSIsInNvdXJjZSIsInRvU3RyaW5nIiwidmVyYm9zZSIsImNvbnNvbGUiLCJsb2ciLCJzY29wZUtleXMiLCJPYmplY3QiLCJrZXlzIiwic2NvcGVQYXJhbXMiLCJzY29wZVZhbHVlcyIsInNjb3BlT2Zmc2V0IiwiRnVuY3Rpb24iLCJmb3JtYXRQYXJhbXMiLCJmb3JtYXRPZmZzZXQiLCJyZXBsYWNlIiwiJDAiLCIkMSIsInZhbHVlIiwiTnVtYmVyIiwiZmxvb3IiLCJKU09OIiwic3RyaW5naWZ5IiwiZnVuY3Rpb25OYW1lT3ZlcnJpZGUiLCJFdmVudEVtaXR0ZXIiLCJfbGlzdGVuZXJzIiwicHJvdG90eXBlIiwib24iLCJldnQiLCJvZmYiLCJsaXN0ZW5lcnMiLCJzcGxpY2UiLCJlbWl0IiwiYXJncyIsImZldGNoIiwiaW5xdWlyZSIsImZzIiwiZmlsZW5hbWUiLCJvcHRpb25zIiwieGhyIiwicmVhZEZpbGUiLCJmZXRjaFJlYWRGaWxlQ2FsbGJhY2siLCJjb250ZW50cyIsIlhNTEh0dHBSZXF1ZXN0IiwiYmluYXJ5IiwiZmV0Y2gxIiwiY2MiLCJzeXMiLCJpc05hdGl2ZSIsImNvbnRlbnQiLCJqc2IiLCJmaWxlVXRpbHMiLCJnZXRTdHJpbmdGcm9tRmlsZSIsImxvYWRlciIsImxvYWRSZXMiLCJUZXh0QXNzZXQiLCJlcnJvciIsInJlc3VsdCIsInRleHQiLCJmZXRjaF94aHIiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJmZXRjaE9uUmVhZHlTdGF0ZUNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZSIsInJlc3BvbnNlVGV4dCIsIlVpbnQ4QXJyYXkiLCJvdmVycmlkZU1pbWVUeXBlIiwicmVzcG9uc2VUeXBlIiwib3BlbiIsInNlbmQiLCJmYWN0b3J5IiwiRmxvYXQzMkFycmF5IiwiZjMyIiwiZjhiIiwibGUiLCJ3cml0ZUZsb2F0X2YzMl9jcHkiLCJ2YWwiLCJidWYiLCJwb3MiLCJ3cml0ZUZsb2F0X2YzMl9yZXYiLCJ3cml0ZUZsb2F0TEUiLCJ3cml0ZUZsb2F0QkUiLCJyZWFkRmxvYXRfZjMyX2NweSIsInJlYWRGbG9hdF9mMzJfcmV2IiwicmVhZEZsb2F0TEUiLCJyZWFkRmxvYXRCRSIsIndyaXRlRmxvYXRfaWVlZTc1NCIsIndyaXRlVWludCIsInNpZ24iLCJpc05hTiIsInJvdW5kIiwiZXhwb25lbnQiLCJMTjIiLCJtYW50aXNzYSIsInBvdyIsImJpbmQiLCJ3cml0ZVVpbnRMRSIsIndyaXRlVWludEJFIiwicmVhZEZsb2F0X2llZWU3NTQiLCJyZWFkVWludCIsInVpbnQiLCJOYU4iLCJJbmZpbml0eSIsInJlYWRVaW50TEUiLCJyZWFkVWludEJFIiwiRmxvYXQ2NEFycmF5IiwiZjY0Iiwid3JpdGVEb3VibGVfZjY0X2NweSIsIndyaXRlRG91YmxlX2Y2NF9yZXYiLCJ3cml0ZURvdWJsZUxFIiwid3JpdGVEb3VibGVCRSIsInJlYWREb3VibGVfZjY0X2NweSIsInJlYWREb3VibGVfZjY0X3JldiIsInJlYWREb3VibGVMRSIsInJlYWREb3VibGVCRSIsIndyaXRlRG91YmxlX2llZWU3NTQiLCJvZmYwIiwib2ZmMSIsInJlYWREb3VibGVfaWVlZTc1NCIsImxvIiwiaGkiLCJtb2R1bGVOYW1lIiwibW9kIiwiZXZhbCIsImUiLCJwYXRoIiwiaXNBYnNvbHV0ZSIsIm5vcm1hbGl6ZSIsInNwbGl0IiwiYWJzb2x1dGUiLCJwcmVmaXgiLCJzaGlmdCIsIm9yaWdpblBhdGgiLCJpbmNsdWRlUGF0aCIsImFscmVhZHlOb3JtYWxpemVkIiwicG9vbCIsImFsbG9jIiwic2l6ZSIsIlNJWkUiLCJNQVgiLCJzbGFiIiwicG9vbF9hbGxvYyIsInV0ZjgiLCJ1dGY4X2xlbmd0aCIsImxlbiIsInJlYWQiLCJ1dGY4X3JlYWQiLCJ3cml0ZSIsInV0Zjhfd3JpdGUiLCJjMSIsImMyIiwiY29tbW9uIiwiY29tbW9uUmUiLCJqc29uIiwibmVzdGVkIiwiZ29vZ2xlIiwiQW55IiwiZmllbGRzIiwidHlwZV91cmwiLCJ0eXBlIiwiaWQiLCJ0aW1lVHlwZSIsIkR1cmF0aW9uIiwic2Vjb25kcyIsIm5hbm9zIiwiVGltZXN0YW1wIiwiRW1wdHkiLCJTdHJ1Y3QiLCJrZXlUeXBlIiwiVmFsdWUiLCJvbmVvZnMiLCJraW5kIiwib25lb2YiLCJudWxsVmFsdWUiLCJudW1iZXJWYWx1ZSIsInN0cmluZ1ZhbHVlIiwiYm9vbFZhbHVlIiwic3RydWN0VmFsdWUiLCJsaXN0VmFsdWUiLCJOdWxsVmFsdWUiLCJ2YWx1ZXMiLCJOVUxMX1ZBTFVFIiwiTGlzdFZhbHVlIiwicnVsZSIsIkRvdWJsZVZhbHVlIiwiRmxvYXRWYWx1ZSIsIkludDY0VmFsdWUiLCJVSW50NjRWYWx1ZSIsIkludDMyVmFsdWUiLCJVSW50MzJWYWx1ZSIsIkJvb2xWYWx1ZSIsIlN0cmluZ1ZhbHVlIiwiQnl0ZXNWYWx1ZSIsIkZpZWxkTWFzayIsInBhdGhzIiwiZ2V0IiwiZmlsZSIsImNvbnZlcnRlciIsIkVudW0iLCJnZW5WYWx1ZVBhcnRpYWxfZnJvbU9iamVjdCIsImdlbiIsImZpZWxkIiwiZmllbGRJbmRleCIsInByb3AiLCJyZXNvbHZlZFR5cGUiLCJyZXBlYXRlZCIsInR5cGVEZWZhdWx0IiwiZnVsbE5hbWUiLCJpc1Vuc2lnbmVkIiwiZnJvbU9iamVjdCIsIm10eXBlIiwiZmllbGRzQXJyYXkiLCJzYWZlUHJvcCIsIm1hcCIsImdlblZhbHVlUGFydGlhbF90b09iamVjdCIsInRvT2JqZWN0Iiwic29ydCIsImNvbXBhcmVGaWVsZHNCeUlkIiwicmVwZWF0ZWRGaWVsZHMiLCJtYXBGaWVsZHMiLCJub3JtYWxGaWVsZHMiLCJwYXJ0T2YiLCJ2YWx1ZXNCeUlkIiwibG93IiwiaGlnaCIsInVuc2lnbmVkIiwidG9OdW1iZXIiLCJieXRlcyIsImhhc0tzMiIsIl9maWVsZHNBcnJheSIsImluZGV4T2YiLCJkZWNvZGVyIiwidHlwZXMiLCJtaXNzaW5nIiwiZmlsdGVyIiwiZ3JvdXAiLCJyZWYiLCJiYXNpYyIsInBhY2tlZCIsInJmaWVsZCIsInJlcXVpcmVkIiwiZW5jb2RlciIsImdlblR5cGVQYXJ0aWFsIiwid2lyZVR5cGUiLCJtYXBLZXkiLCJvcHRpb25hbCIsIlJlZmxlY3Rpb25PYmplY3QiLCJjcmVhdGUiLCJjb25zdHJ1Y3RvciIsImNsYXNzTmFtZSIsIk5hbWVzcGFjZSIsImNvbW1lbnQiLCJjb21tZW50cyIsIlR5cGVFcnJvciIsInJlc2VydmVkIiwiZnJvbUpTT04iLCJlbm0iLCJ0b0pTT04iLCJ0b0pTT05PcHRpb25zIiwia2VlcENvbW1lbnRzIiwiQm9vbGVhbiIsImFkZCIsImlzU3RyaW5nIiwiaXNJbnRlZ2VyIiwiaXNSZXNlcnZlZElkIiwiaXNSZXNlcnZlZE5hbWUiLCJhbGxvd19hbGlhcyIsInJlbW92ZSIsIkZpZWxkIiwiVHlwZSIsInJ1bGVSZSIsImV4dGVuZCIsImlzT2JqZWN0IiwidG9Mb3dlckNhc2UiLCJtZXNzYWdlIiwiZGVmYXVsdFZhbHVlIiwiZXh0ZW5zaW9uRmllbGQiLCJkZWNsYXJpbmdGaWVsZCIsIl9wYWNrZWQiLCJkZWZpbmVQcm9wZXJ0eSIsImdldE9wdGlvbiIsInNldE9wdGlvbiIsImlmTm90U2V0IiwicmVzb2x2ZWQiLCJkZWZhdWx0cyIsInBhcmVudCIsImxvb2t1cFR5cGVPckVudW0iLCJmcm9tTnVtYmVyIiwiZnJlZXplIiwibmV3QnVmZmVyIiwiZW1wdHlPYmplY3QiLCJlbXB0eUFycmF5IiwiY3RvciIsImQiLCJkZWNvcmF0ZUZpZWxkIiwiZmllbGRJZCIsImZpZWxkVHlwZSIsImZpZWxkUnVsZSIsImRlY29yYXRlVHlwZSIsImRlY29yYXRlRW51bSIsImZpZWxkRGVjb3JhdG9yIiwiZmllbGROYW1lIiwiX2NvbmZpZ3VyZSIsIlR5cGVfIiwiYnVpbGQiLCJsb2FkIiwicm9vdCIsIlJvb3QiLCJsb2FkU3luYyIsInZlcmlmaWVyIiwiT25lT2YiLCJNYXBGaWVsZCIsIlNlcnZpY2UiLCJNZXRob2QiLCJNZXNzYWdlIiwid3JhcHBlcnMiLCJXcml0ZXIiLCJCdWZmZXJXcml0ZXIiLCJSZWFkZXIiLCJCdWZmZXJSZWFkZXIiLCJycGMiLCJyb290cyIsInRva2VuaXplIiwicGFyc2UiLCJyZXNvbHZlZEtleVR5cGUiLCJkZWNvcmF0ZU1hcEZpZWxkIiwiZmllbGRLZXlUeXBlIiwiZmllbGRWYWx1ZVR5cGUiLCJtYXBGaWVsZERlY29yYXRvciIsInByb3BlcnRpZXMiLCIkdHlwZSIsIndyaXRlciIsImVuY29kZURlbGltaXRlZCIsInJlYWRlciIsImRlY29kZURlbGltaXRlZCIsInZlcmlmeSIsIm9iamVjdCIsInJlcXVlc3RUeXBlIiwicmVxdWVzdFN0cmVhbSIsInJlc3BvbnNlU3RyZWFtIiwicmVzb2x2ZWRSZXF1ZXN0VHlwZSIsInJlc29sdmVkUmVzcG9uc2VUeXBlIiwibG9va3VwVHlwZSIsImFkZEpTT04iLCJhcnJheVRvSlNPTiIsImFycmF5Iiwib2JqIiwiX25lc3RlZEFycmF5IiwiY2xlYXJDYWNoZSIsIm5hbWVzcGFjZSIsInRvQXJyYXkiLCJuZXN0ZWRBcnJheSIsIm5lc3RlZEpzb24iLCJucyIsIm5hbWVzIiwibWV0aG9kcyIsImdldEVudW0iLCJwcmV2Iiwic2V0T3B0aW9ucyIsIm9uQWRkIiwib25SZW1vdmUiLCJpc0FycmF5IiwicHRyIiwicGFydCIsInJlc29sdmVBbGwiLCJsb29rdXAiLCJmaWx0ZXJUeXBlcyIsInBhcmVudEFscmVhZHlDaGVja2VkIiwiZm91bmQiLCJsb29rdXBFbnVtIiwibG9va3VwU2VydmljZSIsIlNlcnZpY2VfIiwiZGVmaW5lUHJvcGVydGllcyIsInVuc2hpZnQiLCJfaGFuZGxlQWRkIiwiX2hhbmRsZVJlbW92ZSIsIlJvb3RfIiwiZmllbGROYW1lcyIsImFkZEZpZWxkc1RvUGFyZW50Iiwic2VsZiIsImRlY29yYXRlT25lT2YiLCJvbmVPZkRlY29yYXRvciIsIm9uZW9mTmFtZSIsIm9uZU9mR2V0dGVyIiwic2V0Iiwib25lT2ZTZXR0ZXIiLCJrZWVwQ2FzZSIsImJhc2UxMFJlIiwiYmFzZTEwTmVnUmUiLCJiYXNlMTZSZSIsImJhc2UxNk5lZ1JlIiwiYmFzZThSZSIsImJhc2U4TmVnUmUiLCJudW1iZXJSZSIsIm5hbWVSZSIsInR5cGVSZWZSZSIsImZxVHlwZVJlZlJlIiwidG4iLCJhbHRlcm5hdGVDb21tZW50TW9kZSIsIm5leHQiLCJwZWVrIiwic2tpcCIsImNtbnQiLCJoZWFkIiwicGtnIiwiaW1wb3J0cyIsIndlYWtJbXBvcnRzIiwic3ludGF4IiwiaXNQcm90bzMiLCJhcHBseUNhc2UiLCJjYW1lbENhc2UiLCJpbGxlZ2FsIiwidG9rZW4iLCJpbnNpZGVUcnlDYXRjaCIsImxpbmUiLCJyZWFkU3RyaW5nIiwicmVhZFZhbHVlIiwiYWNjZXB0VHlwZVJlZiIsInBhcnNlTnVtYmVyIiwicmVhZFJhbmdlcyIsInRhcmdldCIsImFjY2VwdFN0cmluZ3MiLCJwYXJzZUlkIiwic3Vic3RyaW5nIiwicGFyc2VJbnQiLCJwYXJzZUZsb2F0IiwiYWNjZXB0TmVnYXRpdmUiLCJwYXJzZVBhY2thZ2UiLCJwYXJzZUltcG9ydCIsIndoaWNoSW1wb3J0cyIsInBhcnNlU3ludGF4IiwicGFyc2VDb21tb24iLCJwYXJzZU9wdGlvbiIsInBhcnNlVHlwZSIsInBhcnNlRW51bSIsInBhcnNlU2VydmljZSIsInBhcnNlRXh0ZW5zaW9uIiwiaWZCbG9jayIsImZuSWYiLCJmbkVsc2UiLCJ0cmFpbGluZ0xpbmUiLCJwYXJzZVR5cGVfYmxvY2siLCJwYXJzZU1hcEZpZWxkIiwicGFyc2VGaWVsZCIsInBhcnNlT25lT2YiLCJleHRlbnNpb25zIiwicGFyc2VHcm91cCIsInBhcnNlRmllbGRfYmxvY2siLCJwYXJzZUZpZWxkX2xpbmUiLCJwYXJzZUlubGluZU9wdGlvbnMiLCJsY0ZpcnN0IiwidWNGaXJzdCIsInBhcnNlR3JvdXBfYmxvY2siLCJ2YWx1ZVR5cGUiLCJwYXJzZU1hcEZpZWxkX2Jsb2NrIiwicGFyc2VNYXBGaWVsZF9saW5lIiwicGFyc2VPbmVPZl9ibG9jayIsInBhcnNlRW51bV9ibG9jayIsInBhcnNlRW51bVZhbHVlIiwiZHVtbXkiLCJwYXJzZUVudW1WYWx1ZV9ibG9jayIsInBhcnNlRW51bVZhbHVlX2xpbmUiLCJpc0N1c3RvbSIsInBhcnNlT3B0aW9uVmFsdWUiLCJzZXJ2aWNlIiwicGFyc2VTZXJ2aWNlX2Jsb2NrIiwicGFyc2VNZXRob2QiLCJtZXRob2QiLCJwYXJzZU1ldGhvZF9ibG9jayIsInJlZmVyZW5jZSIsInBhcnNlRXh0ZW5zaW9uX2Jsb2NrIiwiTG9uZ0JpdHMiLCJpbmRleE91dE9mUmFuZ2UiLCJ3cml0ZUxlbmd0aCIsIlJhbmdlRXJyb3IiLCJjcmVhdGVfYXJyYXkiLCJjcmVhdGVfdHlwZWRfYXJyYXkiLCJCdWZmZXIiLCJjcmVhdGVfYnVmZmVyX3NldHVwIiwiY3JlYXRlX2J1ZmZlciIsImlzQnVmZmVyIiwiX3NsaWNlIiwic3ViYXJyYXkiLCJ1aW50MzIiLCJyZWFkX3VpbnQzMl9zZXR1cCIsInJlYWRfdWludDMyIiwiaW50MzIiLCJyZWFkX2ludDMyIiwic2ludDMyIiwicmVhZF9zaW50MzIiLCJyZWFkTG9uZ1ZhcmludCIsImJpdHMiLCJib29sIiwicmVhZF9ib29sIiwicmVhZEZpeGVkMzJfZW5kIiwiZml4ZWQzMiIsInJlYWRfZml4ZWQzMiIsInNmaXhlZDMyIiwicmVhZF9zZml4ZWQzMiIsInJlYWRGaXhlZDY0IiwicmVhZF9mbG9hdCIsInJlYWRfZG91YmxlIiwicmVhZF9ieXRlcyIsInJlYWRfc3RyaW5nIiwic2tpcFR5cGUiLCJCdWZmZXJSZWFkZXJfIiwibWVyZ2UiLCJpbnQ2NCIsInJlYWRfaW50NjQiLCJ1aW50NjQiLCJyZWFkX3VpbnQ2NCIsInNpbnQ2NCIsInJlYWRfc2ludDY0IiwienpEZWNvZGUiLCJmaXhlZDY0IiwicmVhZF9maXhlZDY0Iiwic2ZpeGVkNjQiLCJyZWFkX3NmaXhlZDY0IiwicmVhZF9zdHJpbmdfYnVmZmVyIiwidXRmOFNsaWNlIiwibWluIiwiZGVmZXJyZWQiLCJmaWxlcyIsInJlc29sdmVQYXRoIiwiU1lOQyIsInN5bmMiLCJmaW5pc2giLCJjYiIsInByb2Nlc3MiLCJwYXJzZWQiLCJxdWV1ZWQiLCJ3ZWFrIiwiaWR4IiwibGFzdEluZGV4T2YiLCJhbHRuYW1lIiwic2V0VGltZW91dCIsInJlYWRGaWxlU3luYyIsImlzTm9kZSIsImV4cG9zZVJlIiwidHJ5SGFuZGxlRXh0ZW5zaW9uIiwiZXh0ZW5kZWRUeXBlIiwic2lzdGVyRmllbGQiLCJwYXJzZV8iLCJjb21tb25fIiwicnBjSW1wbCIsInJlcXVlc3REZWxpbWl0ZWQiLCJyZXNwb25zZURlbGltaXRlZCIsInJwY0NhbGwiLCJyZXF1ZXN0Q3RvciIsInJlc3BvbnNlQ3RvciIsInJlcXVlc3QiLCJycGNDYWxsYmFjayIsImVuZGVkQnlSUEMiLCJfbWV0aG9kc0FycmF5IiwiaW5oZXJpdGVkIiwibWV0aG9kc0FycmF5IiwicnBjU2VydmljZSIsIm1ldGhvZE5hbWUiLCJpc1Jlc2VydmVkIiwibSIsInEiLCJzIiwiZGVsaW1SZSIsInN0cmluZ0RvdWJsZVJlIiwic3RyaW5nU2luZ2xlUmUiLCJzZXRDb21tZW50UmUiLCJzZXRDb21tZW50QWx0UmUiLCJzZXRDb21tZW50U3BsaXRSZSIsIndoaXRlc3BhY2VSZSIsInVuZXNjYXBlUmUiLCJ1bmVzY2FwZU1hcCIsInVuZXNjYXBlIiwic3RyIiwiY29tbWVudFR5cGUiLCJjb21tZW50VGV4dCIsImNvbW1lbnRMaW5lIiwiY29tbWVudExpbmVFbXB0eSIsInN0YWNrIiwic3RyaW5nRGVsaW0iLCJzdWJqZWN0IiwicmUiLCJsYXN0SW5kZXgiLCJtYXRjaCIsImV4ZWMiLCJzZXRDb21tZW50IiwibG9va2JhY2siLCJjb21tZW50T2Zmc2V0IiwibGluZXMiLCJ0cmltIiwiaXNEb3VibGVTbGFzaENvbW1lbnRMaW5lIiwic3RhcnRPZmZzZXQiLCJlbmRPZmZzZXQiLCJmaW5kRW5kT2ZMaW5lIiwibGluZVRleHQiLCJpc0NvbW1lbnQiLCJjdXJzb3IiLCJyZXBlYXQiLCJjdXJyIiwiaXNEb2MiLCJkZWxpbSIsImV4cGVjdGVkIiwiYWN0dWFsIiwiZXF1YWxzIiwicmV0IiwiX2ZpZWxkc0J5SWQiLCJfb25lb2ZzQXJyYXkiLCJfY3RvciIsImZpZWxkc0J5SWQiLCJvbmVvZnNBcnJheSIsImdlbmVyYXRlQ29uc3RydWN0b3IiLCJjdG9yUHJvcGVydGllcyIsInNldHVwIiwid3JhcHBlciIsIm9yaWdpbmFsVGhpcyIsImVuY29kZV9zZXR1cCIsImZvcmsiLCJsZGVsaW0iLCJkZWNvZGVfc2V0dXAiLCJ2ZXJpZnlfc2V0dXAiLCJ0eXBlTmFtZSIsInR5cGVEZWNvcmF0b3IiLCJiYWtlIiwibyIsImtleSIsInNhZmVQcm9wQmFja3NsYXNoUmUiLCJzYWZlUHJvcFF1b3RlUmUiLCJ0b1VwcGVyQ2FzZSIsImNhbWVsQ2FzZVJlIiwiYSIsImRlY29yYXRlUm9vdCIsImVudW1lcmFibGUiLCJkZWNvcmF0ZUVudW1JbmRleCIsInplcm8iLCJ6ekVuY29kZSIsInplcm9IYXNoIiwiZnJvbSIsImZyb21TdHJpbmciLCJ0b0xvbmciLCJmcm9tSGFzaCIsImhhc2giLCJ0b0hhc2giLCJtYXNrIiwicGFydDAiLCJwYXJ0MSIsInBhcnQyIiwidmVyc2lvbnMiLCJub2RlIiwiaXNGaW5pdGUiLCJpc3NldCIsImlzU2V0IiwiaGFzT3duUHJvcGVydHkiLCJ1dGY4V3JpdGUiLCJfQnVmZmVyX2Zyb20iLCJfQnVmZmVyX2FsbG9jVW5zYWZlIiwic2l6ZU9yQXJyYXkiLCJkY29kZUlPIiwia2V5MlJlIiwia2V5MzJSZSIsImtleTY0UmUiLCJsb25nVG9IYXNoIiwibG9uZ0Zyb21IYXNoIiwiZnJvbUJpdHMiLCJkc3QiLCJzcmMiLCJuZXdFcnJvciIsIkN1c3RvbUVycm9yIiwiY2FwdHVyZVN0YWNrVHJhY2UiLCJQcm90b2NvbEVycm9yIiwiZ2V0T25lT2YiLCJmaWVsZE1hcCIsInNldE9uZU9mIiwibG9uZ3MiLCJlbnVtcyIsIkJ1ZmZlcl9mcm9tIiwiZW5jb2RpbmciLCJhbGxvY1Vuc2FmZSIsIkJ1ZmZlcl9hbGxvY1Vuc2FmZSIsImludmFsaWQiLCJnZW5WZXJpZnlWYWx1ZSIsImdlblZlcmlmeUtleSIsInNlZW5GaXJzdEZpZWxkIiwib25lb2ZQcm9wIiwic3Vic3RyIiwiT3AiLCJub29wIiwiU3RhdGUiLCJ0YWlsIiwic3RhdGVzIiwiX3B1c2giLCJ3cml0ZUJ5dGUiLCJ3cml0ZVZhcmludDMyIiwiVmFyaW50T3AiLCJ3cml0ZV91aW50MzIiLCJ3cml0ZV9pbnQzMiIsIndyaXRlVmFyaW50NjQiLCJ3cml0ZV9zaW50MzIiLCJ3cml0ZV91aW50NjQiLCJ3cml0ZV9zaW50NjQiLCJ3cml0ZV9ib29sIiwid3JpdGVGaXhlZDMyIiwid3JpdGVfZml4ZWQzMiIsIndyaXRlX2ZpeGVkNjQiLCJ3cml0ZV9mbG9hdCIsIndyaXRlX2RvdWJsZSIsIndyaXRlQnl0ZXMiLCJ3cml0ZUJ5dGVzX3NldCIsIndyaXRlQnl0ZXNfZm9yIiwid3JpdGVfYnl0ZXMiLCJ3cml0ZV9zdHJpbmciLCJyZXNldCIsIkJ1ZmZlcldyaXRlcl8iLCJhbGxvY19idWZmZXIiLCJ3cml0ZUJ5dGVzQnVmZmVyIiwid3JpdGVCeXRlc0J1ZmZlcl9zZXQiLCJ3cml0ZUJ5dGVzQnVmZmVyX2NvcHkiLCJjb3B5Iiwid3JpdGVfYnl0ZXNfYnVmZmVyIiwid3JpdGVTdHJpbmdCdWZmZXIiLCJ3cml0ZV9zdHJpbmdfYnVmZmVyIiwiYnl0ZUxlbmd0aCIsIndpbmRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFNQSxDQUFDLFVBQVNBLE1BQVQsRUFBZ0JDLFNBQWhCLEVBQTBCO0FBQUM7O0FBQWEsR0FBQyxTQUFTQyxPQUFULENBQWlCQyxPQUFqQixFQUEwQkMsS0FBMUIsRUFBaUNDLE9BQWpDLEVBQTBDO0FBRWhGO0FBQ0E7QUFDQTtBQUNBO0FBRUEsYUFBU0MsUUFBVCxDQUFrQkMsSUFBbEIsRUFBd0I7QUFDcEIsVUFBSUMsT0FBTyxHQUFHSixLQUFLLENBQUNHLElBQUQsQ0FBbkI7QUFDQSxVQUFJLENBQUNDLE9BQUwsRUFDSUwsT0FBTyxDQUFDSSxJQUFELENBQVAsQ0FBYyxDQUFkLEVBQWlCRSxJQUFqQixDQUFzQkQsT0FBTyxHQUFHSixLQUFLLENBQUNHLElBQUQsQ0FBTCxHQUFjO0FBQUVHLFFBQUFBLE9BQU8sRUFBRTtBQUFYLE9BQTlDLEVBQStESixRQUEvRCxFQUF5RUUsT0FBekUsRUFBa0ZBLE9BQU8sQ0FBQ0UsT0FBMUY7QUFDSixhQUFPRixPQUFPLENBQUNFLE9BQWY7QUFDSCxLQVorRSxDQWNoRjs7O0FBQ0EsUUFBSUMsUUFBUSxHQUFHWCxNQUFNLENBQUNXLFFBQVAsR0FBa0JMLFFBQVEsQ0FBQ0QsT0FBTyxDQUFDLENBQUQsQ0FBUixDQUF6QyxDQWZnRixDQWlC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VixJQUFQLHlDQUFPQSxJQUFQLE9BQWMsUUFBZCxJQUF3QkEsSUFBMUQsVUEvalJILEdBZ2tSQSIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyohXHJcbiAqIHByb3RvYnVmLmpzIHY2LjguNiAoYykgMjAxNiwgZGFuaWVsIHdpcnR6XHJcbiAqIGNvbXBpbGVkIG1vbiwgMjYgZmViIDIwMTggMTE6MzU6MzQgdXRjXHJcbiAqIGxpY2Vuc2VkIHVuZGVyIHRoZSBic2QtMy1jbGF1c2UgbGljZW5zZVxyXG4gKiBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kY29kZWlvL3Byb3RvYnVmLmpzIGZvciBkZXRhaWxzXHJcbiAqL1xyXG4oZnVuY3Rpb24oZ2xvYmFsLHVuZGVmaW5lZCl7XCJ1c2Ugc3RyaWN0XCI7KGZ1bmN0aW9uIHByZWx1ZGUobW9kdWxlcywgY2FjaGUsIGVudHJpZXMpIHtcclxuXHJcbiAgICAvLyBUaGlzIGlzIHRoZSBwcmVsdWRlIHVzZWQgdG8gYnVuZGxlIHByb3RvYnVmLmpzIGZvciB0aGUgYnJvd3Nlci4gV3JhcHMgdXAgdGhlIENvbW1vbkpTXHJcbiAgICAvLyBzb3VyY2VzIHRocm91Z2ggYSBjb25mbGljdC1mcmVlIHJlcXVpcmUgc2hpbSBhbmQgaXMgYWdhaW4gd3JhcHBlZCB3aXRoaW4gYW4gaWlmZSB0aGF0XHJcbiAgICAvLyBwcm92aWRlcyBhIHVuaWZpZWQgYGdsb2JhbGAgYW5kIGEgbWluaWZpY2F0aW9uLWZyaWVuZGx5IGB1bmRlZmluZWRgIHZhciBwbHVzIGEgZ2xvYmFsXHJcbiAgICAvLyBcInVzZSBzdHJpY3RcIiBkaXJlY3RpdmUgc28gdGhhdCBtaW5pZmljYXRpb24gY2FuIHJlbW92ZSB0aGUgZGlyZWN0aXZlcyBvZiBlYWNoIG1vZHVsZS5cclxuXHJcbiAgICBmdW5jdGlvbiAkcmVxdWlyZShuYW1lKSB7XHJcbiAgICAgICAgdmFyICRtb2R1bGUgPSBjYWNoZVtuYW1lXTtcclxuICAgICAgICBpZiAoISRtb2R1bGUpXHJcbiAgICAgICAgICAgIG1vZHVsZXNbbmFtZV1bMF0uY2FsbCgkbW9kdWxlID0gY2FjaGVbbmFtZV0gPSB7IGV4cG9ydHM6IHt9IH0sICRyZXF1aXJlLCAkbW9kdWxlLCAkbW9kdWxlLmV4cG9ydHMpO1xyXG4gICAgICAgIHJldHVybiAkbW9kdWxlLmV4cG9ydHM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRXhwb3NlIGdsb2JhbGx5XHJcbiAgICB2YXIgcHJvdG9idWYgPSBnbG9iYWwucHJvdG9idWYgPSAkcmVxdWlyZShlbnRyaWVzWzBdKTtcclxuXHJcbiAgICAvLyBCZSBuaWNlIHRvIEFNRFxyXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKVxyXG4gICAgICAgIGRlZmluZShbXCJsb25nXCJdLCBmdW5jdGlvbihMb25nKSB7XHJcbiAgICAgICAgICAgIGlmIChMb25nICYmIExvbmcuaXNMb25nKSB7XHJcbiAgICAgICAgICAgICAgICBwcm90b2J1Zi51dGlsLkxvbmcgPSBMb25nO1xyXG4gICAgICAgICAgICAgICAgcHJvdG9idWYuY29uZmlndXJlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHByb3RvYnVmO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIEJlIG5pY2UgdG8gQ29tbW9uSlNcclxuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cylcclxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHByb3RvYnVmO1xyXG5cclxufSkvKiBlbmQgb2YgcHJlbHVkZSAqLyh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGFzUHJvbWlzZTtcclxuXHJcbi8qKlxyXG4gKiBDYWxsYmFjayBhcyB1c2VkIGJ5IHtAbGluayB1dGlsLmFzUHJvbWlzZX0uXHJcbiAqIEB0eXBlZGVmIGFzUHJvbWlzZUNhbGxiYWNrXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICogQHBhcmFtIHtFcnJvcnxudWxsfSBlcnJvciBFcnJvciwgaWYgYW55XHJcbiAqIEBwYXJhbSB7Li4uKn0gcGFyYW1zIEFkZGl0aW9uYWwgYXJndW1lbnRzXHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSBwcm9taXNlIGZyb20gYSBub2RlLXN0eWxlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAcGFyYW0ge2FzUHJvbWlzZUNhbGxiYWNrfSBmbiBGdW5jdGlvbiB0byBjYWxsXHJcbiAqIEBwYXJhbSB7Kn0gY3R4IEZ1bmN0aW9uIGNvbnRleHRcclxuICogQHBhcmFtIHsuLi4qfSBwYXJhbXMgRnVuY3Rpb24gYXJndW1lbnRzXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPCo+fSBQcm9taXNpZmllZCBmdW5jdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gYXNQcm9taXNlKGZuLCBjdHgvKiwgdmFyYXJncyAqLykge1xyXG4gICAgdmFyIHBhcmFtcyAgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpLFxyXG4gICAgICAgIG9mZnNldCAgPSAwLFxyXG4gICAgICAgIGluZGV4ICAgPSAyLFxyXG4gICAgICAgIHBlbmRpbmcgPSB0cnVlO1xyXG4gICAgd2hpbGUgKGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aClcclxuICAgICAgICBwYXJhbXNbb2Zmc2V0KytdID0gYXJndW1lbnRzW2luZGV4KytdO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGV4ZWN1dG9yKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHBhcmFtc1tvZmZzZXRdID0gZnVuY3Rpb24gY2FsbGJhY2soZXJyLyosIHZhcmFyZ3MgKi8pIHtcclxuICAgICAgICAgICAgaWYgKHBlbmRpbmcpIHtcclxuICAgICAgICAgICAgICAgIHBlbmRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYW1zID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAob2Zmc2V0IDwgcGFyYW1zLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zW29mZnNldCsrXSA9IGFyZ3VtZW50c1tvZmZzZXRdO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUuYXBwbHkobnVsbCwgcGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZm4uYXBwbHkoY3R4IHx8IG51bGwsIHBhcmFtcyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGlmIChwZW5kaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBwZW5kaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG59LHt9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKipcclxuICogQSBtaW5pbWFsIGJhc2U2NCBpbXBsZW1lbnRhdGlvbiBmb3IgbnVtYmVyIGFycmF5cy5cclxuICogQG1lbWJlcm9mIHV0aWxcclxuICogQG5hbWVzcGFjZVxyXG4gKi9cclxudmFyIGJhc2U2NCA9IGV4cG9ydHM7XHJcblxyXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgYnl0ZSBsZW5ndGggb2YgYSBiYXNlNjQgZW5jb2RlZCBzdHJpbmcuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgQmFzZTY0IGVuY29kZWQgc3RyaW5nXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IEJ5dGUgbGVuZ3RoXHJcbiAqL1xyXG5iYXNlNjQubGVuZ3RoID0gZnVuY3Rpb24gbGVuZ3RoKHN0cmluZykge1xyXG4gICAgdmFyIHAgPSBzdHJpbmcubGVuZ3RoO1xyXG4gICAgaWYgKCFwKVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgdmFyIG4gPSAwO1xyXG4gICAgd2hpbGUgKC0tcCAlIDQgPiAxICYmIHN0cmluZy5jaGFyQXQocCkgPT09IFwiPVwiKVxyXG4gICAgICAgICsrbjtcclxuICAgIHJldHVybiBNYXRoLmNlaWwoc3RyaW5nLmxlbmd0aCAqIDMpIC8gNCAtIG47XHJcbn07XHJcblxyXG4vLyBCYXNlNjQgZW5jb2RpbmcgdGFibGVcclxudmFyIGI2NCA9IG5ldyBBcnJheSg2NCk7XHJcblxyXG4vLyBCYXNlNjQgZGVjb2RpbmcgdGFibGVcclxudmFyIHM2NCA9IG5ldyBBcnJheSgxMjMpO1xyXG5cclxuLy8gNjUuLjkwLCA5Ny4uMTIyLCA0OC4uNTcsIDQzLCA0N1xyXG5mb3IgKHZhciBpID0gMDsgaSA8IDY0OylcclxuICAgIHM2NFtiNjRbaV0gPSBpIDwgMjYgPyBpICsgNjUgOiBpIDwgNTIgPyBpICsgNzEgOiBpIDwgNjIgPyBpIC0gNCA6IGkgLSA1OSB8IDQzXSA9IGkrKztcclxuXHJcbi8qKlxyXG4gKiBFbmNvZGVzIGEgYnVmZmVyIHRvIGEgYmFzZTY0IGVuY29kZWQgc3RyaW5nLlxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZmZlciBTb3VyY2UgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBTb3VyY2Ugc3RhcnRcclxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBTb3VyY2UgZW5kXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEJhc2U2NCBlbmNvZGVkIHN0cmluZ1xyXG4gKi9cclxuYmFzZTY0LmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShidWZmZXIsIHN0YXJ0LCBlbmQpIHtcclxuICAgIHZhciBwYXJ0cyA9IG51bGwsXHJcbiAgICAgICAgY2h1bmsgPSBbXTtcclxuICAgIHZhciBpID0gMCwgLy8gb3V0cHV0IGluZGV4XHJcbiAgICAgICAgaiA9IDAsIC8vIGdvdG8gaW5kZXhcclxuICAgICAgICB0OyAgICAgLy8gdGVtcG9yYXJ5XHJcbiAgICB3aGlsZSAoc3RhcnQgPCBlbmQpIHtcclxuICAgICAgICB2YXIgYiA9IGJ1ZmZlcltzdGFydCsrXTtcclxuICAgICAgICBzd2l0Y2ggKGopIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgY2h1bmtbaSsrXSA9IGI2NFtiID4+IDJdO1xyXG4gICAgICAgICAgICAgICAgdCA9IChiICYgMykgPDwgNDtcclxuICAgICAgICAgICAgICAgIGogPSAxO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGNodW5rW2krK10gPSBiNjRbdCB8IGIgPj4gNF07XHJcbiAgICAgICAgICAgICAgICB0ID0gKGIgJiAxNSkgPDwgMjtcclxuICAgICAgICAgICAgICAgIGogPSAyO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIGNodW5rW2krK10gPSBiNjRbdCB8IGIgPj4gNl07XHJcbiAgICAgICAgICAgICAgICBjaHVua1tpKytdID0gYjY0W2IgJiA2M107XHJcbiAgICAgICAgICAgICAgICBqID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaSA+IDgxOTEpIHtcclxuICAgICAgICAgICAgKHBhcnRzIHx8IChwYXJ0cyA9IFtdKSkucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY2h1bmspKTtcclxuICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGopIHtcclxuICAgICAgICBjaHVua1tpKytdID0gYjY0W3RdO1xyXG4gICAgICAgIGNodW5rW2krK10gPSA2MTtcclxuICAgICAgICBpZiAoaiA9PT0gMSlcclxuICAgICAgICAgICAgY2h1bmtbaSsrXSA9IDYxO1xyXG4gICAgfVxyXG4gICAgaWYgKHBhcnRzKSB7XHJcbiAgICAgICAgaWYgKGkpXHJcbiAgICAgICAgICAgIHBhcnRzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNodW5rLnNsaWNlKDAsIGkpKSk7XHJcbiAgICAgICAgcmV0dXJuIHBhcnRzLmpvaW4oXCJcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNodW5rLnNsaWNlKDAsIGkpKTtcclxufTtcclxuXHJcbnZhciBpbnZhbGlkRW5jb2RpbmcgPSBcImludmFsaWQgZW5jb2RpbmdcIjtcclxuXHJcbi8qKlxyXG4gKiBEZWNvZGVzIGEgYmFzZTY0IGVuY29kZWQgc3RyaW5nIHRvIGEgYnVmZmVyLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFNvdXJjZSBzdHJpbmdcclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWZmZXIgRGVzdGluYXRpb24gYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgRGVzdGluYXRpb24gb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IE51bWJlciBvZiBieXRlcyB3cml0dGVuXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiBlbmNvZGluZyBpcyBpbnZhbGlkXHJcbiAqL1xyXG5iYXNlNjQuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHN0cmluZywgYnVmZmVyLCBvZmZzZXQpIHtcclxuICAgIHZhciBzdGFydCA9IG9mZnNldDtcclxuICAgIHZhciBqID0gMCwgLy8gZ290byBpbmRleFxyXG4gICAgICAgIHQ7ICAgICAvLyB0ZW1wb3JhcnlcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDspIHtcclxuICAgICAgICB2YXIgYyA9IHN0cmluZy5jaGFyQ29kZUF0KGkrKyk7XHJcbiAgICAgICAgaWYgKGMgPT09IDYxICYmIGogPiAxKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBpZiAoKGMgPSBzNjRbY10pID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKGludmFsaWRFbmNvZGluZyk7XHJcbiAgICAgICAgc3dpdGNoIChqKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIHQgPSBjO1xyXG4gICAgICAgICAgICAgICAgaiA9IDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IHQgPDwgMiB8IChjICYgNDgpID4+IDQ7XHJcbiAgICAgICAgICAgICAgICB0ID0gYztcclxuICAgICAgICAgICAgICAgIGogPSAyO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSAodCAmIDE1KSA8PCA0IHwgKGMgJiA2MCkgPj4gMjtcclxuICAgICAgICAgICAgICAgIHQgPSBjO1xyXG4gICAgICAgICAgICAgICAgaiA9IDM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9ICh0ICYgMykgPDwgNiB8IGM7XHJcbiAgICAgICAgICAgICAgICBqID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChqID09PSAxKVxyXG4gICAgICAgIHRocm93IEVycm9yKGludmFsaWRFbmNvZGluZyk7XHJcbiAgICByZXR1cm4gb2Zmc2V0IC0gc3RhcnQ7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhlIHNwZWNpZmllZCBzdHJpbmcgYXBwZWFycyB0byBiZSBiYXNlNjQgZW5jb2RlZC5cclxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBTdHJpbmcgdG8gdGVzdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHByb2JhYmx5IGJhc2U2NCBlbmNvZGVkLCBvdGhlcndpc2UgZmFsc2VcclxuICovXHJcbmJhc2U2NC50ZXN0ID0gZnVuY3Rpb24gdGVzdChzdHJpbmcpIHtcclxuICAgIHJldHVybiAvXig/OltBLVphLXowLTkrL117NH0pKig/OltBLVphLXowLTkrL117Mn09PXxbQS1aYS16MC05Ky9dezN9PSk/JC8udGVzdChzdHJpbmcpO1xyXG59O1xyXG5cclxufSx7fV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGNvZGVnZW47XHJcblxyXG4vKipcclxuICogQmVnaW5zIGdlbmVyYXRpbmcgYSBmdW5jdGlvbi5cclxuICogQG1lbWJlcm9mIHV0aWxcclxuICogQHBhcmFtIHtzdHJpbmdbXX0gZnVuY3Rpb25QYXJhbXMgRnVuY3Rpb24gcGFyYW1ldGVyIG5hbWVzXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbZnVuY3Rpb25OYW1lXSBGdW5jdGlvbiBuYW1lIGlmIG5vdCBhbm9ueW1vdXNcclxuICogQHJldHVybnMge0NvZGVnZW59IEFwcGVuZGVyIHRoYXQgYXBwZW5kcyBjb2RlIHRvIHRoZSBmdW5jdGlvbidzIGJvZHlcclxuICovXHJcbmZ1bmN0aW9uIGNvZGVnZW4oZnVuY3Rpb25QYXJhbXMsIGZ1bmN0aW9uTmFtZSkge1xyXG5cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgaWYgKHR5cGVvZiBmdW5jdGlvblBhcmFtcyA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIGZ1bmN0aW9uTmFtZSA9IGZ1bmN0aW9uUGFyYW1zO1xyXG4gICAgICAgIGZ1bmN0aW9uUGFyYW1zID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBib2R5ID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcHBlbmRzIGNvZGUgdG8gdGhlIGZ1bmN0aW9uJ3MgYm9keSBvciBmaW5pc2hlcyBnZW5lcmF0aW9uLlxyXG4gICAgICogQHR5cGVkZWYgQ29kZWdlblxyXG4gICAgICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd8T2JqZWN0LjxzdHJpbmcsKj59IFtmb3JtYXRTdHJpbmdPclNjb3BlXSBGb3JtYXQgc3RyaW5nIG9yLCB0byBmaW5pc2ggdGhlIGZ1bmN0aW9uLCBhbiBvYmplY3Qgb2YgYWRkaXRpb25hbCBzY29wZSB2YXJpYWJsZXMsIGlmIGFueVxyXG4gICAgICogQHBhcmFtIHsuLi4qfSBbZm9ybWF0UGFyYW1zXSBGb3JtYXQgcGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybnMge0NvZGVnZW58RnVuY3Rpb259IEl0c2VsZiBvciB0aGUgZ2VuZXJhdGVkIGZ1bmN0aW9uIGlmIGZpbmlzaGVkXHJcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgZm9ybWF0IHBhcmFtZXRlciBjb3VudHMgZG8gbm90IG1hdGNoXHJcbiAgICAgKi9cclxuXHJcbiAgICBmdW5jdGlvbiBDb2RlZ2VuKGZvcm1hdFN0cmluZ09yU2NvcGUpIHtcclxuICAgICAgICAvLyBub3RlIHRoYXQgZXhwbGljaXQgYXJyYXkgaGFuZGxpbmcgYmVsb3cgbWFrZXMgdGhpcyB+NTAlIGZhc3RlclxyXG5cclxuICAgICAgICAvLyBmaW5pc2ggdGhlIGZ1bmN0aW9uXHJcbiAgICAgICAgaWYgKHR5cGVvZiBmb3JtYXRTdHJpbmdPclNjb3BlICE9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSB0b1N0cmluZygpO1xyXG4gICAgICAgICAgICBpZiAoY29kZWdlbi52ZXJib3NlKVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb2RlZ2VuOiBcIiArIHNvdXJjZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxyXG4gICAgICAgICAgICBzb3VyY2UgPSBcInJldHVybiBcIiArIHNvdXJjZTtcclxuICAgICAgICAgICAgaWYgKGZvcm1hdFN0cmluZ09yU2NvcGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzY29wZUtleXMgICA9IE9iamVjdC5rZXlzKGZvcm1hdFN0cmluZ09yU2NvcGUpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlUGFyYW1zID0gbmV3IEFycmF5KHNjb3BlS2V5cy5sZW5ndGggKyAxKSxcclxuICAgICAgICAgICAgICAgICAgICBzY29wZVZhbHVlcyA9IG5ldyBBcnJheShzY29wZUtleXMubGVuZ3RoKSxcclxuICAgICAgICAgICAgICAgICAgICBzY29wZU9mZnNldCA9IDA7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoc2NvcGVPZmZzZXQgPCBzY29wZUtleXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGVQYXJhbXNbc2NvcGVPZmZzZXRdID0gc2NvcGVLZXlzW3Njb3BlT2Zmc2V0XTtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZVZhbHVlc1tzY29wZU9mZnNldF0gPSBmb3JtYXRTdHJpbmdPclNjb3BlW3Njb3BlS2V5c1tzY29wZU9mZnNldCsrXV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzY29wZVBhcmFtc1tzY29wZU9mZnNldF0gPSBzb3VyY2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRnVuY3Rpb24uYXBwbHkobnVsbCwgc2NvcGVQYXJhbXMpLmFwcGx5KG51bGwsIHNjb3BlVmFsdWVzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctZnVuY1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBGdW5jdGlvbihzb3VyY2UpKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LWZ1bmNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG90aGVyd2lzZSBhcHBlbmQgdG8gYm9keVxyXG4gICAgICAgIHZhciBmb3JtYXRQYXJhbXMgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpLFxyXG4gICAgICAgICAgICBmb3JtYXRPZmZzZXQgPSAwO1xyXG4gICAgICAgIHdoaWxlIChmb3JtYXRPZmZzZXQgPCBmb3JtYXRQYXJhbXMubGVuZ3RoKVxyXG4gICAgICAgICAgICBmb3JtYXRQYXJhbXNbZm9ybWF0T2Zmc2V0XSA9IGFyZ3VtZW50c1srK2Zvcm1hdE9mZnNldF07XHJcbiAgICAgICAgZm9ybWF0T2Zmc2V0ID0gMDtcclxuICAgICAgICBmb3JtYXRTdHJpbmdPclNjb3BlID0gZm9ybWF0U3RyaW5nT3JTY29wZS5yZXBsYWNlKC8lKFslZGZpanNdKS9nLCBmdW5jdGlvbiByZXBsYWNlKCQwLCAkMSkge1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBmb3JtYXRQYXJhbXNbZm9ybWF0T2Zmc2V0KytdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKCQxKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiZFwiOiBjYXNlIFwiZlwiOiByZXR1cm4gU3RyaW5nKE51bWJlcih2YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImlcIjogcmV0dXJuIFN0cmluZyhNYXRoLmZsb29yKHZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwialwiOiByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInNcIjogcmV0dXJuIFN0cmluZyh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFwiJVwiO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChmb3JtYXRPZmZzZXQgIT09IGZvcm1hdFBhcmFtcy5sZW5ndGgpXHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwicGFyYW1ldGVyIGNvdW50IG1pc21hdGNoXCIpO1xyXG4gICAgICAgIGJvZHkucHVzaChmb3JtYXRTdHJpbmdPclNjb3BlKTtcclxuICAgICAgICByZXR1cm4gQ29kZWdlbjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0b1N0cmluZyhmdW5jdGlvbk5hbWVPdmVycmlkZSkge1xyXG4gICAgICAgIHJldHVybiBcImZ1bmN0aW9uIFwiICsgKGZ1bmN0aW9uTmFtZU92ZXJyaWRlIHx8IGZ1bmN0aW9uTmFtZSB8fCBcIlwiKSArIFwiKFwiICsgKGZ1bmN0aW9uUGFyYW1zICYmIGZ1bmN0aW9uUGFyYW1zLmpvaW4oXCIsXCIpIHx8IFwiXCIpICsgXCIpe1xcbiAgXCIgKyBib2R5LmpvaW4oXCJcXG4gIFwiKSArIFwiXFxufVwiO1xyXG4gICAgfVxyXG5cclxuICAgIENvZGVnZW4udG9TdHJpbmcgPSB0b1N0cmluZztcclxuICAgIHJldHVybiBDb2RlZ2VuO1xyXG59XHJcblxyXG4vKipcclxuICogQmVnaW5zIGdlbmVyYXRpbmcgYSBmdW5jdGlvbi5cclxuICogQG1lbWJlcm9mIHV0aWxcclxuICogQGZ1bmN0aW9uIGNvZGVnZW5cclxuICogQHBhcmFtIHtzdHJpbmd9IFtmdW5jdGlvbk5hbWVdIEZ1bmN0aW9uIG5hbWUgaWYgbm90IGFub255bW91c1xyXG4gKiBAcmV0dXJucyB7Q29kZWdlbn0gQXBwZW5kZXIgdGhhdCBhcHBlbmRzIGNvZGUgdG8gdGhlIGZ1bmN0aW9uJ3MgYm9keVxyXG4gKiBAdmFyaWF0aW9uIDJcclxuICovXHJcblxyXG4vKipcclxuICogV2hlbiBzZXQgdG8gYHRydWVgLCBjb2RlZ2VuIHdpbGwgbG9nIGdlbmVyYXRlZCBjb2RlIHRvIGNvbnNvbGUuIFVzZWZ1bCBmb3IgZGVidWdnaW5nLlxyXG4gKiBAbmFtZSB1dGlsLmNvZGVnZW4udmVyYm9zZVxyXG4gKiBAdHlwZSB7Ym9vbGVhbn1cclxuICovXHJcbmNvZGVnZW4udmVyYm9zZSA9IGZhbHNlO1xyXG5cclxufSx7fV0sNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IGV2ZW50IGVtaXR0ZXIgaW5zdGFuY2UuXHJcbiAqIEBjbGFzc2Rlc2MgQSBtaW5pbWFsIGV2ZW50IGVtaXR0ZXIuXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXJlZCBsaXN0ZW5lcnMuXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0LjxzdHJpbmcsKj59XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lci5cclxuICogQHBhcmFtIHtzdHJpbmd9IGV2dCBFdmVudCBuYW1lXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuIExpc3RlbmVyXHJcbiAqIEBwYXJhbSB7Kn0gW2N0eF0gTGlzdGVuZXIgY29udGV4dFxyXG4gKiBAcmV0dXJucyB7dXRpbC5FdmVudEVtaXR0ZXJ9IGB0aGlzYFxyXG4gKi9cclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKGV2dCwgZm4sIGN0eCkge1xyXG4gICAgKHRoaXMuX2xpc3RlbmVyc1tldnRdIHx8ICh0aGlzLl9saXN0ZW5lcnNbZXZ0XSA9IFtdKSkucHVzaCh7XHJcbiAgICAgICAgZm4gIDogZm4sXHJcbiAgICAgICAgY3R4IDogY3R4IHx8IHRoaXNcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBhbiBldmVudCBsaXN0ZW5lciBvciBhbnkgbWF0Y2hpbmcgbGlzdGVuZXJzIGlmIGFyZ3VtZW50cyBhcmUgb21pdHRlZC5cclxuICogQHBhcmFtIHtzdHJpbmd9IFtldnRdIEV2ZW50IG5hbWUuIFJlbW92ZXMgYWxsIGxpc3RlbmVycyBpZiBvbWl0dGVkLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBbZm5dIExpc3RlbmVyIHRvIHJlbW92ZS4gUmVtb3ZlcyBhbGwgbGlzdGVuZXJzIG9mIGBldnRgIGlmIG9taXR0ZWQuXHJcbiAqIEByZXR1cm5zIHt1dGlsLkV2ZW50RW1pdHRlcn0gYHRoaXNgXHJcbiAqL1xyXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIG9mZihldnQsIGZuKSB7XHJcbiAgICBpZiAoZXZ0ID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0ge307XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpZiAoZm4gPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzW2V2dF0gPSBbXTtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVyc1tldnRdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7KVxyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyc1tpXS5mbiA9PT0gZm4pXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICArK2k7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogRW1pdHMgYW4gZXZlbnQgYnkgY2FsbGluZyBpdHMgbGlzdGVuZXJzIHdpdGggdGhlIHNwZWNpZmllZCBhcmd1bWVudHMuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBldnQgRXZlbnQgbmFtZVxyXG4gKiBAcGFyYW0gey4uLip9IGFyZ3MgQXJndW1lbnRzXHJcbiAqIEByZXR1cm5zIHt1dGlsLkV2ZW50RW1pdHRlcn0gYHRoaXNgXHJcbiAqL1xyXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KGV2dCkge1xyXG4gICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVyc1tldnRdO1xyXG4gICAgaWYgKGxpc3RlbmVycykge1xyXG4gICAgICAgIHZhciBhcmdzID0gW10sXHJcbiAgICAgICAgICAgIGkgPSAxO1xyXG4gICAgICAgIGZvciAoOyBpIDwgYXJndW1lbnRzLmxlbmd0aDspXHJcbiAgICAgICAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7KVxyXG4gICAgICAgICAgICBsaXN0ZW5lcnNbaV0uZm4uYXBwbHkobGlzdGVuZXJzW2krK10uY3R4LCBhcmdzKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxufSx7fV0sNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZldGNoO1xyXG5cclxudmFyIGFzUHJvbWlzZSA9IHJlcXVpcmUoMSksXHJcbiAgICBpbnF1aXJlICAgPSByZXF1aXJlKDcpO1xyXG5cclxudmFyIGZzID0gaW5xdWlyZShcImZzXCIpO1xyXG5cclxuLyoqXHJcbiAqIE5vZGUtc3R5bGUgY2FsbGJhY2sgYXMgdXNlZCBieSB7QGxpbmsgdXRpbC5mZXRjaH0uXHJcbiAqIEB0eXBlZGVmIEZldGNoQ2FsbGJhY2tcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKiBAcGFyYW0gez9FcnJvcn0gZXJyb3IgRXJyb3IsIGlmIGFueSwgb3RoZXJ3aXNlIGBudWxsYFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvbnRlbnRzXSBGaWxlIGNvbnRlbnRzLCBpZiB0aGVyZSBoYXNuJ3QgYmVlbiBhbiBlcnJvclxyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBPcHRpb25zIGFzIHVzZWQgYnkge0BsaW5rIHV0aWwuZmV0Y2h9LlxyXG4gKiBAdHlwZWRlZiBGZXRjaE9wdGlvbnNcclxuICogQHR5cGUge09iamVjdH1cclxuICogQHByb3BlcnR5IHtib29sZWFufSBbYmluYXJ5PWZhbHNlXSBXaGV0aGVyIGV4cGVjdGluZyBhIGJpbmFyeSByZXNwb25zZVxyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFt4aHI9ZmFsc2VdIElmIGB0cnVlYCwgZm9yY2VzIHRoZSB1c2Ugb2YgWE1MSHR0cFJlcXVlc3RcclxuICovXHJcblxyXG4vKipcclxuICogRmV0Y2hlcyB0aGUgY29udGVudHMgb2YgYSBmaWxlLlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZW5hbWUgRmlsZSBwYXRoIG9yIHVybFxyXG4gKiBAcGFyYW0ge0ZldGNoT3B0aW9uc30gb3B0aW9ucyBGZXRjaCBvcHRpb25zXHJcbiAqIEBwYXJhbSB7RmV0Y2hDYWxsYmFja30gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb25cclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcbmZ1bmN0aW9uIGZldGNoKGZpbGVuYW1lLCBvcHRpb25zLCBjYWxsYmFjaykge1xyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICBjYWxsYmFjayA9IG9wdGlvbnM7XHJcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xyXG4gICAgfSBlbHNlIGlmICghb3B0aW9ucylcclxuICAgICAgICBvcHRpb25zID0ge307XHJcblxyXG4gICAgaWYgKCFjYWxsYmFjaylcclxuICAgICAgICByZXR1cm4gYXNQcm9taXNlKGZldGNoLCB0aGlzLCBmaWxlbmFtZSwgb3B0aW9ucyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8taW52YWxpZC10aGlzXHJcblxyXG4gICAgLy8gaWYgYSBub2RlLWxpa2UgZmlsZXN5c3RlbSBpcyBwcmVzZW50LCB0cnkgaXQgZmlyc3QgYnV0IGZhbGwgYmFjayB0byBYSFIgaWYgbm90aGluZyBpcyBmb3VuZC5cclxuICAgIGlmICghb3B0aW9ucy54aHIgJiYgZnMgJiYgZnMucmVhZEZpbGUpXHJcbiAgICAgICAgcmV0dXJuIGZzLnJlYWRGaWxlKGZpbGVuYW1lLCBmdW5jdGlvbiBmZXRjaFJlYWRGaWxlQ2FsbGJhY2soZXJyLCBjb250ZW50cykge1xyXG4gICAgICAgICAgICByZXR1cm4gZXJyICYmIHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gXCJ1bmRlZmluZWRcIlxyXG4gICAgICAgICAgICAgICAgPyBmZXRjaC54aHIoZmlsZW5hbWUsIG9wdGlvbnMsIGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgOiBlcnJcclxuICAgICAgICAgICAgICAgID8gY2FsbGJhY2soZXJyKVxyXG4gICAgICAgICAgICAgICAgOiBjYWxsYmFjayhudWxsLCBvcHRpb25zLmJpbmFyeSA/IGNvbnRlbnRzIDogY29udGVudHMudG9TdHJpbmcoXCJ1dGY4XCIpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyB1c2UgdGhlIFhIUiB2ZXJzaW9uIG90aGVyd2lzZS5cclxuICAgIHJldHVybiBmZXRjaC54aHIoZmlsZW5hbWUsIG9wdGlvbnMsIGNhbGxiYWNrKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmV0Y2gxKGZpbGVuYW1lLCBvcHRpb25zLCBjYWxsYmFjaykge1xyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICBjYWxsYmFjayA9IG9wdGlvbnM7XHJcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xyXG4gICAgfSBlbHNlIGlmICghb3B0aW9ucylcclxuICAgICAgICBvcHRpb25zID0ge307XHJcblxyXG4gICAgaWYgKCFjYWxsYmFjaylcclxuICAgICAgICByZXR1cm4gYXNQcm9taXNlKGZldGNoLCB0aGlzLCBmaWxlbmFtZSwgb3B0aW9ucyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8taW52YWxpZC10aGlzXHJcblxyXG4gICAgaWYgKHR5cGVvZiBjYyAhPT0gXCJ1bmRlZmluZWRcIikgey8v5Yik5pat5piv5ZCm5pivY29jb3Ppobnnm65cclxuXHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkgey8vbmF0aXZlXHJcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0ganNiLmZpbGVVdGlscy5nZXRTdHJpbmdGcm9tRmlsZShmaWxlbmFtZSk7XHJcbiAgICAgICAgICAgIC8v5a+55LqO5LiA5Lqb5paw54mI55qEY3JlYXRvcijkvZzogIVjcmVhdG9yMi4zLjIp5p2l6K+077yM5LuW5Lya5oqK6LWE5rqQ5re35reG5Zyo5LiN5ZCM55qE55uu5b2V5LiL77yM5omA5Lul6L+Z6YeM5piv5rKh5Yqe5rOV5om+5Yiw6K+l5paH5Lu255qELOebtOaOpeS9v+eUqGNjLmxvYWRlcueahGxvYWRSZXPmlrnms5XlsJ3or5XliqDovb3kuIDmrKHjgIJcclxuICAgICAgICAgICAgaWYoY29udGVudCA9PT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhmaWxlbmFtZSwgY2MuVGV4dEFzc2V0LCBmdW5jdGlvbiAoZXJyb3IsIHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcImVycm9yMT1cIiArIGVycm9yICsgXCIscmVzdWx0ID0gXCIgKyByZXN1bHQgKyBcIix0eXBlPVwiICsgdHlwZW9mIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKEVycm9yKFwic3RhdHVzIFwiICsgZXJyb3IpKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2FsbGJhY2sobnVsbCwgcmVzdWx0KTsvL2NyZWF0b3IxLjnlj4rku6XkuIvniYjmnKzkvb/nlKjmraTooYxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdWx0LnRleHQpOy8v5paw54mIY3JlYXRvcuWPr+aUvuW/g+i/kOihjFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soY29udGVudCA9PT0gXCJcIiA/IEVycm9yKGZpbGVuYW1lICsgXCIgbm90IGV4aXRzXCIpIDogbnVsbCwgY29udGVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL2NjLmxvZyhcImNjLmxvYWRlciBsb2FkIDEgZmlsZW5hbWU9XCIgKyBmaWxlbmFtZSk7XHJcbiAgICAgICAgICAgIC8v6L+Z6YeM5Y+v5Lul5Yqg6L295LiA5LiqdXJs5Zu+54mHIDogXCJIb3N0XCIrZmlsZW5hbWVcclxuICAgICAgICAgICAgLy8gY2MubG9hZGVyLmxvYWQoZmlsZW5hbWUsIGZ1bmN0aW9uIChlcnJvciwgcmVzdWx0KSB7XHJcbiAgICAgICAgICAgIC8vICAgICBjYy5sb2coXCJlcnJvcjE9XCIgKyBlcnJvciArIFwiLHJlc3VsdCA9IFwiICsgcmVzdWx0ICsgXCIsdHlwZT1cIiArIHR5cGVvZiByZXN1bHQpO1xyXG4gICAgICAgICAgICAvLyAgICAgLy8gY2FsbGJhY2sobnVsbCwgcmVzdWx0KTtcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIC8vY2MubG9nKFwiY2MubG9hZGVyIGxvYWQgMlwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIOi/memHjGg15Lya5Y675Yqg6L29cmVzb3VyY2Vz55uu5b2V5LiL55qE5paH5Lu2IDogXCJyZXNvdXJjZXMvXCIrIGZpbGVuYW1lXHJcbiAgICAgICAgICAgIC8vIOi/memHjGZpbGVuYW1l5LiA6Iis5LiN55So5oyH5a6a5omp5bGV5ZCNLOW9k+eEtuS9oOS5n+WPr+S7peW8uuWItuaMh+WumlxyXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhmaWxlbmFtZSwgY2MuVGV4dEFzc2V0LCBmdW5jdGlvbiAoZXJyb3IsIHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgLy9jYy5sb2coXCJlcnJvcjI9XCIgKyBlcnJvciArIFwiLHJlc3VsdCA9IFwiICsgcmVzdWx0ICsgXCIsdHlwZT1cIiArIHR5cGVvZiByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soRXJyb3IoXCJzdGF0dXMgXCIgKyBlcnJvcikpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY2FsbGJhY2sobnVsbCwgcmVzdWx0KTsvL2NyZWF0b3IxLjnlj4rku6XkuIvniYjmnKzkvb/nlKjmraTooYxcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXN1bHQudGV4dCk7Ly/mlrDniYhjcmVhdG9y5Y+v5pS+5b+D6L+Q6KGMXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL2NjLmxvZyhcImNjLmxvYWRlciBsb2FkIDNcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgYSBub2RlLWxpa2UgZmlsZXN5c3RlbSBpcyBwcmVzZW50LCB0cnkgaXQgZmlyc3QgYnV0IGZhbGwgYmFjayB0byBYSFIgaWYgbm90aGluZyBpcyBmb3VuZC5cclxuICAgIGlmICghb3B0aW9ucy54aHIgJiYgZnMgJiYgZnMucmVhZEZpbGUpXHJcbiAgICAgICAgcmV0dXJuIGZzLnJlYWRGaWxlKGZpbGVuYW1lLCBmdW5jdGlvbiBmZXRjaFJlYWRGaWxlQ2FsbGJhY2soZXJyLCBjb250ZW50cykge1xyXG4gICAgICAgICAgICByZXR1cm4gZXJyICYmIHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gXCJ1bmRlZmluZWRcIlxyXG4gICAgICAgICAgICAgICAgPyBmZXRjaC54aHIoZmlsZW5hbWUsIG9wdGlvbnMsIGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgOiBlcnJcclxuICAgICAgICAgICAgICAgICAgICA/IGNhbGxiYWNrKGVycilcclxuICAgICAgICAgICAgICAgICAgICA6IGNhbGxiYWNrKG51bGwsIG9wdGlvbnMuYmluYXJ5ID8gY29udGVudHMgOiBjb250ZW50cy50b1N0cmluZyhcInV0ZjhcIikpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIHVzZSB0aGUgWEhSIHZlcnNpb24gb3RoZXJ3aXNlLlxyXG4gICAgcmV0dXJuIGZldGNoLnhocihmaWxlbmFtZSwgb3B0aW9ucywgY2FsbGJhY2spO1xyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBGZXRjaGVzIHRoZSBjb250ZW50cyBvZiBhIGZpbGUuXHJcbiAqIEBuYW1lIHV0aWwuZmV0Y2hcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIEZpbGUgcGF0aCBvciB1cmxcclxuICogQHBhcmFtIHtGZXRjaENhbGxiYWNrfSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvblxyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKiBAdmFyaWF0aW9uIDJcclxuICovXHJcblxyXG4vKipcclxuICogRmV0Y2hlcyB0aGUgY29udGVudHMgb2YgYSBmaWxlLlxyXG4gKiBAbmFtZSB1dGlsLmZldGNoXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBGaWxlIHBhdGggb3IgdXJsXHJcbiAqIEBwYXJhbSB7RmV0Y2hPcHRpb25zfSBbb3B0aW9uc10gRmV0Y2ggb3B0aW9uc1xyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmd8VWludDhBcnJheT59IFByb21pc2VcclxuICogQHZhcmlhdGlvbiAzXHJcbiAqL1xyXG5cclxuLyoqL1xyXG5mZXRjaC54aHIgPSBmdW5jdGlvbiBmZXRjaF94aHIoZmlsZW5hbWUsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XHJcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlIC8qIHdvcmtzIGV2ZXJ5d2hlcmUgKi8gPSBmdW5jdGlvbiBmZXRjaE9uUmVhZHlTdGF0ZUNoYW5nZSgpIHtcclxuXHJcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlICE9PSA0KVxyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAvLyBsb2NhbCBjb3JzIHNlY3VyaXR5IGVycm9ycyByZXR1cm4gc3RhdHVzIDAgLyBlbXB0eSBzdHJpbmcsIHRvby4gYWZhaWsgdGhpcyBjYW5ub3QgYmVcclxuICAgICAgICAvLyByZWxpYWJseSBkaXN0aW5ndWlzaGVkIGZyb20gYW4gYWN0dWFsbHkgZW1wdHkgZmlsZSBmb3Igc2VjdXJpdHkgcmVhc29ucy4gZmVlbCBmcmVlXHJcbiAgICAgICAgLy8gdG8gc2VuZCBhIHB1bGwgcmVxdWVzdCBpZiB5b3UgYXJlIGF3YXJlIG9mIGEgc29sdXRpb24uXHJcbiAgICAgICAgaWYgKHhoci5zdGF0dXMgIT09IDAgJiYgeGhyLnN0YXR1cyAhPT0gMjAwKVxyXG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soRXJyb3IoXCJzdGF0dXMgXCIgKyB4aHIuc3RhdHVzKSk7XHJcblxyXG4gICAgICAgIC8vIGlmIGJpbmFyeSBkYXRhIGlzIGV4cGVjdGVkLCBtYWtlIHN1cmUgdGhhdCBzb21lIHNvcnQgb2YgYXJyYXkgaXMgcmV0dXJuZWQsIGV2ZW4gaWZcclxuICAgICAgICAvLyBBcnJheUJ1ZmZlcnMgYXJlIG5vdCBzdXBwb3J0ZWQuIHRoZSBiaW5hcnkgc3RyaW5nIGZhbGxiYWNrLCBob3dldmVyLCBpcyB1bnNhZmUuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuYmluYXJ5KSB7XHJcbiAgICAgICAgICAgIHZhciBidWZmZXIgPSB4aHIucmVzcG9uc2U7XHJcbiAgICAgICAgICAgIGlmICghYnVmZmVyKSB7XHJcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeGhyLnJlc3BvbnNlVGV4dC5sZW5ndGg7ICsraSlcclxuICAgICAgICAgICAgICAgICAgICBidWZmZXIucHVzaCh4aHIucmVzcG9uc2VUZXh0LmNoYXJDb2RlQXQoaSkgJiAyNTUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCB0eXBlb2YgVWludDhBcnJheSAhPT0gXCJ1bmRlZmluZWRcIiA/IG5ldyBVaW50OEFycmF5KGJ1ZmZlcikgOiBidWZmZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChvcHRpb25zLmJpbmFyeSkge1xyXG4gICAgICAgIC8vIHJlZjogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1hNTEh0dHBSZXF1ZXN0L1NlbmRpbmdfYW5kX1JlY2VpdmluZ19CaW5hcnlfRGF0YSNSZWNlaXZpbmdfYmluYXJ5X2RhdGFfaW5fb2xkZXJfYnJvd3NlcnNcclxuICAgICAgICBpZiAoXCJvdmVycmlkZU1pbWVUeXBlXCIgaW4geGhyKVxyXG4gICAgICAgICAgICB4aHIub3ZlcnJpZGVNaW1lVHlwZShcInRleHQvcGxhaW47IGNoYXJzZXQ9eC11c2VyLWRlZmluZWRcIik7XHJcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcclxuICAgIH1cclxuXHJcbiAgICB4aHIub3BlbihcIkdFVFwiLCBmaWxlbmFtZSk7XHJcbiAgICB4aHIuc2VuZCgpO1xyXG59O1xyXG5cclxufSx7XCIxXCI6MSxcIjdcIjo3fV0sNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KGZhY3RvcnkpO1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIC8gd3JpdGVzIGZsb2F0cyAvIGRvdWJsZXMgZnJvbSAvIHRvIGJ1ZmZlcnMuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXRcclxuICogQG5hbWVzcGFjZVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYSAzMiBiaXQgZmxvYXQgdG8gYSBidWZmZXIgdXNpbmcgbGl0dGxlIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LndyaXRlRmxvYXRMRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbCBWYWx1ZSB0byB3cml0ZVxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBUYXJnZXQgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgVGFyZ2V0IGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblxyXG4vKipcclxuICogV3JpdGVzIGEgMzIgYml0IGZsb2F0IHRvIGEgYnVmZmVyIHVzaW5nIGJpZyBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC53cml0ZUZsb2F0QkVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgVmFsdWUgdG8gd3JpdGVcclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgVGFyZ2V0IGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFRhcmdldCBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIGEgMzIgYml0IGZsb2F0IGZyb20gYSBidWZmZXIgdXNpbmcgbGl0dGxlIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LnJlYWRGbG9hdExFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBTb3VyY2UgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgU291cmNlIGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBhIDMyIGJpdCBmbG9hdCBmcm9tIGEgYnVmZmVyIHVzaW5nIGJpZyBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC5yZWFkRmxvYXRCRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgU291cmNlIGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFNvdXJjZSBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcclxuICovXHJcblxyXG4vKipcclxuICogV3JpdGVzIGEgNjQgYml0IGRvdWJsZSB0byBhIGJ1ZmZlciB1c2luZyBsaXR0bGUgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQud3JpdGVEb3VibGVMRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbCBWYWx1ZSB0byB3cml0ZVxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBUYXJnZXQgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgVGFyZ2V0IGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblxyXG4vKipcclxuICogV3JpdGVzIGEgNjQgYml0IGRvdWJsZSB0byBhIGJ1ZmZlciB1c2luZyBiaWcgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQud3JpdGVEb3VibGVCRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbCBWYWx1ZSB0byB3cml0ZVxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBUYXJnZXQgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgVGFyZ2V0IGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblxyXG4vKipcclxuICogUmVhZHMgYSA2NCBiaXQgZG91YmxlIGZyb20gYSBidWZmZXIgdXNpbmcgbGl0dGxlIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LnJlYWREb3VibGVMRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgU291cmNlIGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFNvdXJjZSBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcclxuICovXHJcblxyXG4vKipcclxuICogUmVhZHMgYSA2NCBiaXQgZG91YmxlIGZyb20gYSBidWZmZXIgdXNpbmcgYmlnIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LnJlYWREb3VibGVCRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgU291cmNlIGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFNvdXJjZSBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcclxuICovXHJcblxyXG4vLyBGYWN0b3J5IGZ1bmN0aW9uIGZvciB0aGUgcHVycG9zZSBvZiBub2RlLWJhc2VkIHRlc3RpbmcgaW4gbW9kaWZpZWQgZ2xvYmFsIGVudmlyb25tZW50c1xyXG5mdW5jdGlvbiBmYWN0b3J5KGV4cG9ydHMpIHtcclxuXHJcbiAgICAvLyBmbG9hdDogdHlwZWQgYXJyYXlcclxuICAgIGlmICh0eXBlb2YgRmxvYXQzMkFycmF5ICE9PSBcInVuZGVmaW5lZFwiKSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHZhciBmMzIgPSBuZXcgRmxvYXQzMkFycmF5KFsgLTAgXSksXHJcbiAgICAgICAgICAgIGY4YiA9IG5ldyBVaW50OEFycmF5KGYzMi5idWZmZXIpLFxyXG4gICAgICAgICAgICBsZSAgPSBmOGJbM10gPT09IDEyODtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd3JpdGVGbG9hdF9mMzJfY3B5KHZhbCwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjMyWzBdID0gdmFsO1xyXG4gICAgICAgICAgICBidWZbcG9zICAgIF0gPSBmOGJbMF07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAxXSA9IGY4YlsxXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDJdID0gZjhiWzJdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgM10gPSBmOGJbM107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB3cml0ZUZsb2F0X2YzMl9yZXYodmFsLCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmMzJbMF0gPSB2YWw7XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgICAgXSA9IGY4YlszXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDFdID0gZjhiWzJdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMl0gPSBmOGJbMV07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAzXSA9IGY4YlswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy53cml0ZUZsb2F0TEUgPSBsZSA/IHdyaXRlRmxvYXRfZjMyX2NweSA6IHdyaXRlRmxvYXRfZjMyX3JldjtcclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMud3JpdGVGbG9hdEJFID0gbGUgPyB3cml0ZUZsb2F0X2YzMl9yZXYgOiB3cml0ZUZsb2F0X2YzMl9jcHk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlYWRGbG9hdF9mMzJfY3B5KGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGY4YlswXSA9IGJ1Zltwb3MgICAgXTtcclxuICAgICAgICAgICAgZjhiWzFdID0gYnVmW3BvcyArIDFdO1xyXG4gICAgICAgICAgICBmOGJbMl0gPSBidWZbcG9zICsgMl07XHJcbiAgICAgICAgICAgIGY4YlszXSA9IGJ1Zltwb3MgKyAzXTtcclxuICAgICAgICAgICAgcmV0dXJuIGYzMlswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlYWRGbG9hdF9mMzJfcmV2KGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGY4YlszXSA9IGJ1Zltwb3MgICAgXTtcclxuICAgICAgICAgICAgZjhiWzJdID0gYnVmW3BvcyArIDFdO1xyXG4gICAgICAgICAgICBmOGJbMV0gPSBidWZbcG9zICsgMl07XHJcbiAgICAgICAgICAgIGY4YlswXSA9IGJ1Zltwb3MgKyAzXTtcclxuICAgICAgICAgICAgcmV0dXJuIGYzMlswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRmxvYXRMRSA9IGxlID8gcmVhZEZsb2F0X2YzMl9jcHkgOiByZWFkRmxvYXRfZjMyX3JldjtcclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMucmVhZEZsb2F0QkUgPSBsZSA/IHJlYWRGbG9hdF9mMzJfcmV2IDogcmVhZEZsb2F0X2YzMl9jcHk7XHJcblxyXG4gICAgLy8gZmxvYXQ6IGllZWU3NTRcclxuICAgIH0pKCk7IGVsc2UgKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB3cml0ZUZsb2F0X2llZWU3NTQod3JpdGVVaW50LCB2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIHZhciBzaWduID0gdmFsIDwgMCA/IDEgOiAwO1xyXG4gICAgICAgICAgICBpZiAoc2lnbilcclxuICAgICAgICAgICAgICAgIHZhbCA9IC12YWw7XHJcbiAgICAgICAgICAgIGlmICh2YWwgPT09IDApXHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoMSAvIHZhbCA+IDAgPyAvKiBwb3NpdGl2ZSAqLyAwIDogLyogbmVnYXRpdmUgMCAqLyAyMTQ3NDgzNjQ4LCBidWYsIHBvcyk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGlzTmFOKHZhbCkpXHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoMjE0MzI4OTM0NCwgYnVmLCBwb3MpO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh2YWwgPiAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KSAvLyArLUluZmluaXR5XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoKHNpZ24gPDwgMzEgfCAyMTM5MDk1MDQwKSA+Pj4gMCwgYnVmLCBwb3MpO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh2YWwgPCAxLjE3NTQ5NDM1MDgyMjI4NzVlLTM4KSAvLyBkZW5vcm1hbFxyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KChzaWduIDw8IDMxIHwgTWF0aC5yb3VuZCh2YWwgLyAxLjQwMTI5ODQ2NDMyNDgxN2UtNDUpKSA+Pj4gMCwgYnVmLCBwb3MpO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBleHBvbmVudCA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsKSAvIE1hdGguTE4yKSxcclxuICAgICAgICAgICAgICAgICAgICBtYW50aXNzYSA9IE1hdGgucm91bmQodmFsICogTWF0aC5wb3coMiwgLWV4cG9uZW50KSAqIDgzODg2MDgpICYgODM4ODYwNztcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgoc2lnbiA8PCAzMSB8IGV4cG9uZW50ICsgMTI3IDw8IDIzIHwgbWFudGlzc2EpID4+PiAwLCBidWYsIHBvcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4cG9ydHMud3JpdGVGbG9hdExFID0gd3JpdGVGbG9hdF9pZWVlNzU0LmJpbmQobnVsbCwgd3JpdGVVaW50TEUpO1xyXG4gICAgICAgIGV4cG9ydHMud3JpdGVGbG9hdEJFID0gd3JpdGVGbG9hdF9pZWVlNzU0LmJpbmQobnVsbCwgd3JpdGVVaW50QkUpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWFkRmxvYXRfaWVlZTc1NChyZWFkVWludCwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgdmFyIHVpbnQgPSByZWFkVWludChidWYsIHBvcyksXHJcbiAgICAgICAgICAgICAgICBzaWduID0gKHVpbnQgPj4gMzEpICogMiArIDEsXHJcbiAgICAgICAgICAgICAgICBleHBvbmVudCA9IHVpbnQgPj4+IDIzICYgMjU1LFxyXG4gICAgICAgICAgICAgICAgbWFudGlzc2EgPSB1aW50ICYgODM4ODYwNztcclxuICAgICAgICAgICAgcmV0dXJuIGV4cG9uZW50ID09PSAyNTVcclxuICAgICAgICAgICAgICAgID8gbWFudGlzc2FcclxuICAgICAgICAgICAgICAgID8gTmFOXHJcbiAgICAgICAgICAgICAgICA6IHNpZ24gKiBJbmZpbml0eVxyXG4gICAgICAgICAgICAgICAgOiBleHBvbmVudCA9PT0gMCAvLyBkZW5vcm1hbFxyXG4gICAgICAgICAgICAgICAgPyBzaWduICogMS40MDEyOTg0NjQzMjQ4MTdlLTQ1ICogbWFudGlzc2FcclxuICAgICAgICAgICAgICAgIDogc2lnbiAqIE1hdGgucG93KDIsIGV4cG9uZW50IC0gMTUwKSAqIChtYW50aXNzYSArIDgzODg2MDgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRmxvYXRMRSA9IHJlYWRGbG9hdF9pZWVlNzU0LmJpbmQobnVsbCwgcmVhZFVpbnRMRSk7XHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRmxvYXRCRSA9IHJlYWRGbG9hdF9pZWVlNzU0LmJpbmQobnVsbCwgcmVhZFVpbnRCRSk7XHJcblxyXG4gICAgfSkoKTtcclxuXHJcbiAgICAvLyBkb3VibGU6IHR5cGVkIGFycmF5XHJcbiAgICBpZiAodHlwZW9mIEZsb2F0NjRBcnJheSAhPT0gXCJ1bmRlZmluZWRcIikgKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgZjY0ID0gbmV3IEZsb2F0NjRBcnJheShbLTBdKSxcclxuICAgICAgICAgICAgZjhiID0gbmV3IFVpbnQ4QXJyYXkoZjY0LmJ1ZmZlciksXHJcbiAgICAgICAgICAgIGxlICA9IGY4Yls3XSA9PT0gMTI4O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB3cml0ZURvdWJsZV9mNjRfY3B5KHZhbCwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjY0WzBdID0gdmFsO1xyXG4gICAgICAgICAgICBidWZbcG9zICAgIF0gPSBmOGJbMF07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAxXSA9IGY4YlsxXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDJdID0gZjhiWzJdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgM10gPSBmOGJbM107XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA0XSA9IGY4Yls0XTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDVdID0gZjhiWzVdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgNl0gPSBmOGJbNl07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA3XSA9IGY4Yls3XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlRG91YmxlX2Y2NF9yZXYodmFsLCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmNjRbMF0gPSB2YWw7XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgICAgXSA9IGY4Yls3XTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDFdID0gZjhiWzZdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMl0gPSBmOGJbNV07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAzXSA9IGY4Yls0XTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDRdID0gZjhiWzNdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgNV0gPSBmOGJbMl07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA2XSA9IGY4YlsxXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDddID0gZjhiWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLndyaXRlRG91YmxlTEUgPSBsZSA/IHdyaXRlRG91YmxlX2Y2NF9jcHkgOiB3cml0ZURvdWJsZV9mNjRfcmV2O1xyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy53cml0ZURvdWJsZUJFID0gbGUgPyB3cml0ZURvdWJsZV9mNjRfcmV2IDogd3JpdGVEb3VibGVfZjY0X2NweTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVhZERvdWJsZV9mNjRfY3B5KGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGY4YlswXSA9IGJ1Zltwb3MgICAgXTtcclxuICAgICAgICAgICAgZjhiWzFdID0gYnVmW3BvcyArIDFdO1xyXG4gICAgICAgICAgICBmOGJbMl0gPSBidWZbcG9zICsgMl07XHJcbiAgICAgICAgICAgIGY4YlszXSA9IGJ1Zltwb3MgKyAzXTtcclxuICAgICAgICAgICAgZjhiWzRdID0gYnVmW3BvcyArIDRdO1xyXG4gICAgICAgICAgICBmOGJbNV0gPSBidWZbcG9zICsgNV07XHJcbiAgICAgICAgICAgIGY4Yls2XSA9IGJ1Zltwb3MgKyA2XTtcclxuICAgICAgICAgICAgZjhiWzddID0gYnVmW3BvcyArIDddO1xyXG4gICAgICAgICAgICByZXR1cm4gZjY0WzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVhZERvdWJsZV9mNjRfcmV2KGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGY4Yls3XSA9IGJ1Zltwb3MgICAgXTtcclxuICAgICAgICAgICAgZjhiWzZdID0gYnVmW3BvcyArIDFdO1xyXG4gICAgICAgICAgICBmOGJbNV0gPSBidWZbcG9zICsgMl07XHJcbiAgICAgICAgICAgIGY4Yls0XSA9IGJ1Zltwb3MgKyAzXTtcclxuICAgICAgICAgICAgZjhiWzNdID0gYnVmW3BvcyArIDRdO1xyXG4gICAgICAgICAgICBmOGJbMl0gPSBidWZbcG9zICsgNV07XHJcbiAgICAgICAgICAgIGY4YlsxXSA9IGJ1Zltwb3MgKyA2XTtcclxuICAgICAgICAgICAgZjhiWzBdID0gYnVmW3BvcyArIDddO1xyXG4gICAgICAgICAgICByZXR1cm4gZjY0WzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLnJlYWREb3VibGVMRSA9IGxlID8gcmVhZERvdWJsZV9mNjRfY3B5IDogcmVhZERvdWJsZV9mNjRfcmV2O1xyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRG91YmxlQkUgPSBsZSA/IHJlYWREb3VibGVfZjY0X3JldiA6IHJlYWREb3VibGVfZjY0X2NweTtcclxuXHJcbiAgICAvLyBkb3VibGU6IGllZWU3NTRcclxuICAgIH0pKCk7IGVsc2UgKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB3cml0ZURvdWJsZV9pZWVlNzU0KHdyaXRlVWludCwgb2ZmMCwgb2ZmMSwgdmFsLCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICB2YXIgc2lnbiA9IHZhbCA8IDAgPyAxIDogMDtcclxuICAgICAgICAgICAgaWYgKHNpZ24pXHJcbiAgICAgICAgICAgICAgICB2YWwgPSAtdmFsO1xyXG4gICAgICAgICAgICBpZiAodmFsID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoMCwgYnVmLCBwb3MgKyBvZmYwKTtcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgxIC8gdmFsID4gMCA/IC8qIHBvc2l0aXZlICovIDAgOiAvKiBuZWdhdGl2ZSAwICovIDIxNDc0ODM2NDgsIGJ1ZiwgcG9zICsgb2ZmMSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNOYU4odmFsKSkge1xyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KDAsIGJ1ZiwgcG9zICsgb2ZmMCk7XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoMjE0Njk1OTM2MCwgYnVmLCBwb3MgKyBvZmYxKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWwgPiAxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCkgeyAvLyArLUluZmluaXR5XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoMCwgYnVmLCBwb3MgKyBvZmYwKTtcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgoc2lnbiA8PCAzMSB8IDIxNDY0MzUwNzIpID4+PiAwLCBidWYsIHBvcyArIG9mZjEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1hbnRpc3NhO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbCA8IDIuMjI1MDczODU4NTA3MjAxNGUtMzA4KSB7IC8vIGRlbm9ybWFsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFudGlzc2EgPSB2YWwgLyA1ZS0zMjQ7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVVaW50KG1hbnRpc3NhID4+PiAwLCBidWYsIHBvcyArIG9mZjApO1xyXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlVWludCgoc2lnbiA8PCAzMSB8IG1hbnRpc3NhIC8gNDI5NDk2NzI5NikgPj4+IDAsIGJ1ZiwgcG9zICsgb2ZmMSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBleHBvbmVudCA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsKSAvIE1hdGguTE4yKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXhwb25lbnQgPT09IDEwMjQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cG9uZW50ID0gMTAyMztcclxuICAgICAgICAgICAgICAgICAgICBtYW50aXNzYSA9IHZhbCAqIE1hdGgucG93KDIsIC1leHBvbmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVVaW50KG1hbnRpc3NhICogNDUwMzU5OTYyNzM3MDQ5NiA+Pj4gMCwgYnVmLCBwb3MgKyBvZmYwKTtcclxuICAgICAgICAgICAgICAgICAgICB3cml0ZVVpbnQoKHNpZ24gPDwgMzEgfCBleHBvbmVudCArIDEwMjMgPDwgMjAgfCBtYW50aXNzYSAqIDEwNDg1NzYgJiAxMDQ4NTc1KSA+Pj4gMCwgYnVmLCBwb3MgKyBvZmYxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhwb3J0cy53cml0ZURvdWJsZUxFID0gd3JpdGVEb3VibGVfaWVlZTc1NC5iaW5kKG51bGwsIHdyaXRlVWludExFLCAwLCA0KTtcclxuICAgICAgICBleHBvcnRzLndyaXRlRG91YmxlQkUgPSB3cml0ZURvdWJsZV9pZWVlNzU0LmJpbmQobnVsbCwgd3JpdGVVaW50QkUsIDQsIDApO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWFkRG91YmxlX2llZWU3NTQocmVhZFVpbnQsIG9mZjAsIG9mZjEsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIHZhciBsbyA9IHJlYWRVaW50KGJ1ZiwgcG9zICsgb2ZmMCksXHJcbiAgICAgICAgICAgICAgICBoaSA9IHJlYWRVaW50KGJ1ZiwgcG9zICsgb2ZmMSk7XHJcbiAgICAgICAgICAgIHZhciBzaWduID0gKGhpID4+IDMxKSAqIDIgKyAxLFxyXG4gICAgICAgICAgICAgICAgZXhwb25lbnQgPSBoaSA+Pj4gMjAgJiAyMDQ3LFxyXG4gICAgICAgICAgICAgICAgbWFudGlzc2EgPSA0Mjk0OTY3Mjk2ICogKGhpICYgMTA0ODU3NSkgKyBsbztcclxuICAgICAgICAgICAgcmV0dXJuIGV4cG9uZW50ID09PSAyMDQ3XHJcbiAgICAgICAgICAgICAgICA/IG1hbnRpc3NhXHJcbiAgICAgICAgICAgICAgICA/IE5hTlxyXG4gICAgICAgICAgICAgICAgOiBzaWduICogSW5maW5pdHlcclxuICAgICAgICAgICAgICAgIDogZXhwb25lbnQgPT09IDAgLy8gZGVub3JtYWxcclxuICAgICAgICAgICAgICAgID8gc2lnbiAqIDVlLTMyNCAqIG1hbnRpc3NhXHJcbiAgICAgICAgICAgICAgICA6IHNpZ24gKiBNYXRoLnBvdygyLCBleHBvbmVudCAtIDEwNzUpICogKG1hbnRpc3NhICsgNDUwMzU5OTYyNzM3MDQ5Nik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleHBvcnRzLnJlYWREb3VibGVMRSA9IHJlYWREb3VibGVfaWVlZTc1NC5iaW5kKG51bGwsIHJlYWRVaW50TEUsIDAsIDQpO1xyXG4gICAgICAgIGV4cG9ydHMucmVhZERvdWJsZUJFID0gcmVhZERvdWJsZV9pZWVlNzU0LmJpbmQobnVsbCwgcmVhZFVpbnRCRSwgNCwgMCk7XHJcblxyXG4gICAgfSkoKTtcclxuXHJcbiAgICByZXR1cm4gZXhwb3J0cztcclxufVxyXG5cclxuLy8gdWludCBoZWxwZXJzXHJcblxyXG5mdW5jdGlvbiB3cml0ZVVpbnRMRSh2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICBidWZbcG9zICAgIF0gPSAgdmFsICAgICAgICAmIDI1NTtcclxuICAgIGJ1Zltwb3MgKyAxXSA9ICB2YWwgPj4+IDggICYgMjU1O1xyXG4gICAgYnVmW3BvcyArIDJdID0gIHZhbCA+Pj4gMTYgJiAyNTU7XHJcbiAgICBidWZbcG9zICsgM10gPSAgdmFsID4+PiAyNDtcclxufVxyXG5cclxuZnVuY3Rpb24gd3JpdGVVaW50QkUodmFsLCBidWYsIHBvcykge1xyXG4gICAgYnVmW3BvcyAgICBdID0gIHZhbCA+Pj4gMjQ7XHJcbiAgICBidWZbcG9zICsgMV0gPSAgdmFsID4+PiAxNiAmIDI1NTtcclxuICAgIGJ1Zltwb3MgKyAyXSA9ICB2YWwgPj4+IDggICYgMjU1O1xyXG4gICAgYnVmW3BvcyArIDNdID0gIHZhbCAgICAgICAgJiAyNTU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlYWRVaW50TEUoYnVmLCBwb3MpIHtcclxuICAgIHJldHVybiAoYnVmW3BvcyAgICBdXHJcbiAgICAgICAgICB8IGJ1Zltwb3MgKyAxXSA8PCA4XHJcbiAgICAgICAgICB8IGJ1Zltwb3MgKyAyXSA8PCAxNlxyXG4gICAgICAgICAgfCBidWZbcG9zICsgM10gPDwgMjQpID4+PiAwO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWFkVWludEJFKGJ1ZiwgcG9zKSB7XHJcbiAgICByZXR1cm4gKGJ1Zltwb3MgICAgXSA8PCAyNFxyXG4gICAgICAgICAgfCBidWZbcG9zICsgMV0gPDwgMTZcclxuICAgICAgICAgIHwgYnVmW3BvcyArIDJdIDw8IDhcclxuICAgICAgICAgIHwgYnVmW3BvcyArIDNdKSA+Pj4gMDtcclxufVxyXG5cclxufSx7fV0sNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGlucXVpcmU7XHJcblxyXG4vKipcclxuICogUmVxdWlyZXMgYSBtb2R1bGUgb25seSBpZiBhdmFpbGFibGUuXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2R1bGVOYW1lIE1vZHVsZSB0byByZXF1aXJlXHJcbiAqIEByZXR1cm5zIHs/T2JqZWN0fSBSZXF1aXJlZCBtb2R1bGUgaWYgYXZhaWxhYmxlIGFuZCBub3QgZW1wdHksIG90aGVyd2lzZSBgbnVsbGBcclxuICovXHJcbmZ1bmN0aW9uIGlucXVpcmUobW9kdWxlTmFtZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB2YXIgbW9kID0gZXZhbChcInF1aXJlXCIucmVwbGFjZSgvXi8sXCJyZVwiKSkobW9kdWxlTmFtZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZXZhbFxyXG4gICAgICAgIGlmIChtb2QgJiYgKG1vZC5sZW5ndGggfHwgT2JqZWN0LmtleXMobW9kKS5sZW5ndGgpKVxyXG4gICAgICAgICAgICByZXR1cm4gbW9kO1xyXG4gICAgfSBjYXRjaCAoZSkge30gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1lbXB0eVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbn0se31dLDg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qKlxyXG4gKiBBIG1pbmltYWwgcGF0aCBtb2R1bGUgdG8gcmVzb2x2ZSBVbml4LCBXaW5kb3dzIGFuZCBVUkwgcGF0aHMgYWxpa2UuXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBuYW1lc3BhY2VcclxuICovXHJcbnZhciBwYXRoID0gZXhwb3J0cztcclxuXHJcbnZhciBpc0Fic29sdXRlID1cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoZSBzcGVjaWZpZWQgcGF0aCBpcyBhYnNvbHV0ZS5cclxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggUGF0aCB0byB0ZXN0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgcGF0aCBpcyBhYnNvbHV0ZVxyXG4gKi9cclxucGF0aC5pc0Fic29sdXRlID0gZnVuY3Rpb24gaXNBYnNvbHV0ZShwYXRoKSB7XHJcbiAgICByZXR1cm4gL14oPzpcXC98XFx3KzopLy50ZXN0KHBhdGgpO1xyXG59O1xyXG5cclxudmFyIG5vcm1hbGl6ZSA9XHJcbi8qKlxyXG4gKiBOb3JtYWxpemVzIHRoZSBzcGVjaWZpZWQgcGF0aC5cclxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggUGF0aCB0byBub3JtYWxpemVcclxuICogQHJldHVybnMge3N0cmluZ30gTm9ybWFsaXplZCBwYXRoXHJcbiAqL1xyXG5wYXRoLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uIG5vcm1hbGl6ZShwYXRoKSB7XHJcbiAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC9cXFxcL2csIFwiL1wiKVxyXG4gICAgICAgICAgICAgICAucmVwbGFjZSgvXFwvezIsfS9nLCBcIi9cIik7XHJcbiAgICB2YXIgcGFydHMgICAgPSBwYXRoLnNwbGl0KFwiL1wiKSxcclxuICAgICAgICBhYnNvbHV0ZSA9IGlzQWJzb2x1dGUocGF0aCksXHJcbiAgICAgICAgcHJlZml4ICAgPSBcIlwiO1xyXG4gICAgaWYgKGFic29sdXRlKVxyXG4gICAgICAgIHByZWZpeCA9IHBhcnRzLnNoaWZ0KCkgKyBcIi9cIjtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOykge1xyXG4gICAgICAgIGlmIChwYXJ0c1tpXSA9PT0gXCIuLlwiKSB7XHJcbiAgICAgICAgICAgIGlmIChpID4gMCAmJiBwYXJ0c1tpIC0gMV0gIT09IFwiLi5cIilcclxuICAgICAgICAgICAgICAgIHBhcnRzLnNwbGljZSgtLWksIDIpO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChhYnNvbHV0ZSlcclxuICAgICAgICAgICAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgKytpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGFydHNbaV0gPT09IFwiLlwiKVxyXG4gICAgICAgICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICArK2k7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJlZml4ICsgcGFydHMuam9pbihcIi9cIik7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVzb2x2ZXMgdGhlIHNwZWNpZmllZCBpbmNsdWRlIHBhdGggYWdhaW5zdCB0aGUgc3BlY2lmaWVkIG9yaWdpbiBwYXRoLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gb3JpZ2luUGF0aCBQYXRoIHRvIHRoZSBvcmlnaW4gZmlsZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gaW5jbHVkZVBhdGggSW5jbHVkZSBwYXRoIHJlbGF0aXZlIHRvIG9yaWdpbiBwYXRoXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FscmVhZHlOb3JtYWxpemVkPWZhbHNlXSBgdHJ1ZWAgaWYgYm90aCBwYXRocyBhcmUgYWxyZWFkeSBrbm93biB0byBiZSBub3JtYWxpemVkXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFBhdGggdG8gdGhlIGluY2x1ZGUgZmlsZVxyXG4gKi9cclxucGF0aC5yZXNvbHZlID0gZnVuY3Rpb24gcmVzb2x2ZShvcmlnaW5QYXRoLCBpbmNsdWRlUGF0aCwgYWxyZWFkeU5vcm1hbGl6ZWQpIHtcclxuICAgIGlmICghYWxyZWFkeU5vcm1hbGl6ZWQpXHJcbiAgICAgICAgaW5jbHVkZVBhdGggPSBub3JtYWxpemUoaW5jbHVkZVBhdGgpO1xyXG4gICAgaWYgKGlzQWJzb2x1dGUoaW5jbHVkZVBhdGgpKVxyXG4gICAgICAgIHJldHVybiBpbmNsdWRlUGF0aDtcclxuICAgIGlmICghYWxyZWFkeU5vcm1hbGl6ZWQpXHJcbiAgICAgICAgb3JpZ2luUGF0aCA9IG5vcm1hbGl6ZShvcmlnaW5QYXRoKTtcclxuICAgIHJldHVybiAob3JpZ2luUGF0aCA9IG9yaWdpblBhdGgucmVwbGFjZSgvKD86XFwvfF4pW14vXSskLywgXCJcIikpLmxlbmd0aCA/IG5vcm1hbGl6ZShvcmlnaW5QYXRoICsgXCIvXCIgKyBpbmNsdWRlUGF0aCkgOiBpbmNsdWRlUGF0aDtcclxufTtcclxuXHJcbn0se31dLDk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBwb29sO1xyXG5cclxuLyoqXHJcbiAqIEFuIGFsbG9jYXRvciBhcyB1c2VkIGJ5IHtAbGluayB1dGlsLnBvb2x9LlxyXG4gKiBAdHlwZWRlZiBQb29sQWxsb2NhdG9yXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICogQHBhcmFtIHtudW1iZXJ9IHNpemUgQnVmZmVyIHNpemVcclxuICogQHJldHVybnMge1VpbnQ4QXJyYXl9IEJ1ZmZlclxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBBIHNsaWNlciBhcyB1c2VkIGJ5IHtAbGluayB1dGlsLnBvb2x9LlxyXG4gKiBAdHlwZWRlZiBQb29sU2xpY2VyXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFN0YXJ0IG9mZnNldFxyXG4gKiBAcGFyYW0ge251bWJlcn0gZW5kIEVuZCBvZmZzZXRcclxuICogQHJldHVybnMge1VpbnQ4QXJyYXl9IEJ1ZmZlciBzbGljZVxyXG4gKiBAdGhpcyB7VWludDhBcnJheX1cclxuICovXHJcblxyXG4vKipcclxuICogQSBnZW5lcmFsIHB1cnBvc2UgYnVmZmVyIHBvb2wuXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge1Bvb2xBbGxvY2F0b3J9IGFsbG9jIEFsbG9jYXRvclxyXG4gKiBAcGFyYW0ge1Bvb2xTbGljZXJ9IHNsaWNlIFNsaWNlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gW3NpemU9ODE5Ml0gU2xhYiBzaXplXHJcbiAqIEByZXR1cm5zIHtQb29sQWxsb2NhdG9yfSBQb29sZWQgYWxsb2NhdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBwb29sKGFsbG9jLCBzbGljZSwgc2l6ZSkge1xyXG4gICAgdmFyIFNJWkUgICA9IHNpemUgfHwgODE5MjtcclxuICAgIHZhciBNQVggICAgPSBTSVpFID4+PiAxO1xyXG4gICAgdmFyIHNsYWIgICA9IG51bGw7XHJcbiAgICB2YXIgb2Zmc2V0ID0gU0laRTtcclxuICAgIHJldHVybiBmdW5jdGlvbiBwb29sX2FsbG9jKHNpemUpIHtcclxuICAgICAgICBpZiAoc2l6ZSA8IDEgfHwgc2l6ZSA+IE1BWClcclxuICAgICAgICAgICAgcmV0dXJuIGFsbG9jKHNpemUpO1xyXG4gICAgICAgIGlmIChvZmZzZXQgKyBzaXplID4gU0laRSkge1xyXG4gICAgICAgICAgICBzbGFiID0gYWxsb2MoU0laRSk7XHJcbiAgICAgICAgICAgIG9mZnNldCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBidWYgPSBzbGljZS5jYWxsKHNsYWIsIG9mZnNldCwgb2Zmc2V0ICs9IHNpemUpO1xyXG4gICAgICAgIGlmIChvZmZzZXQgJiA3KSAvLyBhbGlnbiB0byAzMiBiaXRcclxuICAgICAgICAgICAgb2Zmc2V0ID0gKG9mZnNldCB8IDcpICsgMTtcclxuICAgICAgICByZXR1cm4gYnVmO1xyXG4gICAgfTtcclxufVxyXG5cclxufSx7fV0sMTA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qKlxyXG4gKiBBIG1pbmltYWwgVVRGOCBpbXBsZW1lbnRhdGlvbiBmb3IgbnVtYmVyIGFycmF5cy5cclxuICogQG1lbWJlcm9mIHV0aWxcclxuICogQG5hbWVzcGFjZVxyXG4gKi9cclxudmFyIHV0ZjggPSBleHBvcnRzO1xyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIFVURjggYnl0ZSBsZW5ndGggb2YgYSBzdHJpbmcuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgU3RyaW5nXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IEJ5dGUgbGVuZ3RoXHJcbiAqL1xyXG51dGY4Lmxlbmd0aCA9IGZ1bmN0aW9uIHV0ZjhfbGVuZ3RoKHN0cmluZykge1xyXG4gICAgdmFyIGxlbiA9IDAsXHJcbiAgICAgICAgYyA9IDA7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGMgPSBzdHJpbmcuY2hhckNvZGVBdChpKTtcclxuICAgICAgICBpZiAoYyA8IDEyOClcclxuICAgICAgICAgICAgbGVuICs9IDE7XHJcbiAgICAgICAgZWxzZSBpZiAoYyA8IDIwNDgpXHJcbiAgICAgICAgICAgIGxlbiArPSAyO1xyXG4gICAgICAgIGVsc2UgaWYgKChjICYgMHhGQzAwKSA9PT0gMHhEODAwICYmIChzdHJpbmcuY2hhckNvZGVBdChpICsgMSkgJiAweEZDMDApID09PSAweERDMDApIHtcclxuICAgICAgICAgICAgKytpO1xyXG4gICAgICAgICAgICBsZW4gKz0gNDtcclxuICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgbGVuICs9IDM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGVuO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIFVURjggYnl0ZXMgYXMgYSBzdHJpbmcuXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmZmVyIFNvdXJjZSBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFNvdXJjZSBzdGFydFxyXG4gKiBAcGFyYW0ge251bWJlcn0gZW5kIFNvdXJjZSBlbmRcclxuICogQHJldHVybnMge3N0cmluZ30gU3RyaW5nIHJlYWRcclxuICovXHJcbnV0ZjgucmVhZCA9IGZ1bmN0aW9uIHV0ZjhfcmVhZChidWZmZXIsIHN0YXJ0LCBlbmQpIHtcclxuICAgIHZhciBsZW4gPSBlbmQgLSBzdGFydDtcclxuICAgIGlmIChsZW4gPCAxKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgdmFyIHBhcnRzID0gbnVsbCxcclxuICAgICAgICBjaHVuayA9IFtdLFxyXG4gICAgICAgIGkgPSAwLCAvLyBjaGFyIG9mZnNldFxyXG4gICAgICAgIHQ7ICAgICAvLyB0ZW1wb3JhcnlcclxuICAgIHdoaWxlIChzdGFydCA8IGVuZCkge1xyXG4gICAgICAgIHQgPSBidWZmZXJbc3RhcnQrK107XHJcbiAgICAgICAgaWYgKHQgPCAxMjgpXHJcbiAgICAgICAgICAgIGNodW5rW2krK10gPSB0O1xyXG4gICAgICAgIGVsc2UgaWYgKHQgPiAxOTEgJiYgdCA8IDIyNClcclxuICAgICAgICAgICAgY2h1bmtbaSsrXSA9ICh0ICYgMzEpIDw8IDYgfCBidWZmZXJbc3RhcnQrK10gJiA2MztcclxuICAgICAgICBlbHNlIGlmICh0ID4gMjM5ICYmIHQgPCAzNjUpIHtcclxuICAgICAgICAgICAgdCA9ICgodCAmIDcpIDw8IDE4IHwgKGJ1ZmZlcltzdGFydCsrXSAmIDYzKSA8PCAxMiB8IChidWZmZXJbc3RhcnQrK10gJiA2MykgPDwgNiB8IGJ1ZmZlcltzdGFydCsrXSAmIDYzKSAtIDB4MTAwMDA7XHJcbiAgICAgICAgICAgIGNodW5rW2krK10gPSAweEQ4MDAgKyAodCA+PiAxMCk7XHJcbiAgICAgICAgICAgIGNodW5rW2krK10gPSAweERDMDAgKyAodCAmIDEwMjMpO1xyXG4gICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICBjaHVua1tpKytdID0gKHQgJiAxNSkgPDwgMTIgfCAoYnVmZmVyW3N0YXJ0KytdICYgNjMpIDw8IDYgfCBidWZmZXJbc3RhcnQrK10gJiA2MztcclxuICAgICAgICBpZiAoaSA+IDgxOTEpIHtcclxuICAgICAgICAgICAgKHBhcnRzIHx8IChwYXJ0cyA9IFtdKSkucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY2h1bmspKTtcclxuICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHBhcnRzKSB7XHJcbiAgICAgICAgaWYgKGkpXHJcbiAgICAgICAgICAgIHBhcnRzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNodW5rLnNsaWNlKDAsIGkpKSk7XHJcbiAgICAgICAgcmV0dXJuIHBhcnRzLmpvaW4oXCJcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNodW5rLnNsaWNlKDAsIGkpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYSBzdHJpbmcgYXMgVVRGOCBieXRlcy5cclxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBTb3VyY2Ugc3RyaW5nXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmZmVyIERlc3RpbmF0aW9uIGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IERlc3RpbmF0aW9uIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBCeXRlcyB3cml0dGVuXHJcbiAqL1xyXG51dGY4LndyaXRlID0gZnVuY3Rpb24gdXRmOF93cml0ZShzdHJpbmcsIGJ1ZmZlciwgb2Zmc2V0KSB7XHJcbiAgICB2YXIgc3RhcnQgPSBvZmZzZXQsXHJcbiAgICAgICAgYzEsIC8vIGNoYXJhY3RlciAxXHJcbiAgICAgICAgYzI7IC8vIGNoYXJhY3RlciAyXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGMxID0gc3RyaW5nLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgaWYgKGMxIDwgMTI4KSB7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMTtcclxuICAgICAgICB9IGVsc2UgaWYgKGMxIDwgMjA0OCkge1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgPj4gNiAgICAgICB8IDE5MjtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxICAgICAgICYgNjMgfCAxMjg7XHJcbiAgICAgICAgfSBlbHNlIGlmICgoYzEgJiAweEZDMDApID09PSAweEQ4MDAgJiYgKChjMiA9IHN0cmluZy5jaGFyQ29kZUF0KGkgKyAxKSkgJiAweEZDMDApID09PSAweERDMDApIHtcclxuICAgICAgICAgICAgYzEgPSAweDEwMDAwICsgKChjMSAmIDB4MDNGRikgPDwgMTApICsgKGMyICYgMHgwM0ZGKTtcclxuICAgICAgICAgICAgKytpO1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgPj4gMTggICAgICB8IDI0MDtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxID4+IDEyICYgNjMgfCAxMjg7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSA+PiA2ICAmIDYzIHwgMTI4O1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgICAgICAgJiA2MyB8IDEyODtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgPj4gMTIgICAgICB8IDIyNDtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxID4+IDYgICYgNjMgfCAxMjg7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSAgICAgICAmIDYzIHwgMTI4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvZmZzZXQgLSBzdGFydDtcclxufTtcclxuXHJcbn0se31dLDExOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gY29tbW9uO1xyXG5cclxudmFyIGNvbW1vblJlID0gL1xcL3xcXC4vO1xyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGVzIGNvbW1vbiB0eXBlIGRlZmluaXRpb25zLlxyXG4gKiBDYW4gYWxzbyBiZSB1c2VkIHRvIHByb3ZpZGUgYWRkaXRpb25hbCBnb29nbGUgdHlwZXMgb3IgeW91ciBvd24gY3VzdG9tIHR5cGVzLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBTaG9ydCBuYW1lIGFzIGluIGBnb29nbGUvcHJvdG9idWYvW25hbWVdLnByb3RvYCBvciBmdWxsIGZpbGUgbmFtZVxyXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBqc29uIEpTT04gZGVmaW5pdGlvbiB3aXRoaW4gYGdvb2dsZS5wcm90b2J1ZmAgaWYgYSBzaG9ydCBuYW1lLCBvdGhlcndpc2UgdGhlIGZpbGUncyByb290IGRlZmluaXRpb25cclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICogQHByb3BlcnR5IHtJTmFtZXNwYWNlfSBnb29nbGUvcHJvdG9idWYvYW55LnByb3RvIEFueVxyXG4gKiBAcHJvcGVydHkge0lOYW1lc3BhY2V9IGdvb2dsZS9wcm90b2J1Zi9kdXJhdGlvbi5wcm90byBEdXJhdGlvblxyXG4gKiBAcHJvcGVydHkge0lOYW1lc3BhY2V9IGdvb2dsZS9wcm90b2J1Zi9lbXB0eS5wcm90byBFbXB0eVxyXG4gKiBAcHJvcGVydHkge0lOYW1lc3BhY2V9IGdvb2dsZS9wcm90b2J1Zi9maWVsZF9tYXNrLnByb3RvIEZpZWxkTWFza1xyXG4gKiBAcHJvcGVydHkge0lOYW1lc3BhY2V9IGdvb2dsZS9wcm90b2J1Zi9zdHJ1Y3QucHJvdG8gU3RydWN0LCBWYWx1ZSwgTnVsbFZhbHVlIGFuZCBMaXN0VmFsdWVcclxuICogQHByb3BlcnR5IHtJTmFtZXNwYWNlfSBnb29nbGUvcHJvdG9idWYvdGltZXN0YW1wLnByb3RvIFRpbWVzdGFtcFxyXG4gKiBAcHJvcGVydHkge0lOYW1lc3BhY2V9IGdvb2dsZS9wcm90b2J1Zi93cmFwcGVycy5wcm90byBXcmFwcGVyc1xyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBtYW51YWxseSBwcm92aWRlcyBkZXNjcmlwdG9yLnByb3RvIChhc3N1bWVzIGdvb2dsZS9wcm90b2J1Zi8gbmFtZXNwYWNlIGFuZCAucHJvdG8gZXh0ZW5zaW9uKVxyXG4gKiBwcm90b2J1Zi5jb21tb24oXCJkZXNjcmlwdG9yXCIsIGRlc2NyaXB0b3JKc29uKTtcclxuICpcclxuICogLy8gbWFudWFsbHkgcHJvdmlkZXMgYSBjdXN0b20gZGVmaW5pdGlvbiAodXNlcyBteS5mb28gbmFtZXNwYWNlKVxyXG4gKiBwcm90b2J1Zi5jb21tb24oXCJteS9mb28vYmFyLnByb3RvXCIsIG15Rm9vQmFySnNvbik7XHJcbiAqL1xyXG5mdW5jdGlvbiBjb21tb24obmFtZSwganNvbikge1xyXG4gICAgaWYgKCFjb21tb25SZS50ZXN0KG5hbWUpKSB7XHJcbiAgICAgICAgbmFtZSA9IFwiZ29vZ2xlL3Byb3RvYnVmL1wiICsgbmFtZSArIFwiLnByb3RvXCI7XHJcbiAgICAgICAganNvbiA9IHsgbmVzdGVkOiB7IGdvb2dsZTogeyBuZXN0ZWQ6IHsgcHJvdG9idWY6IHsgbmVzdGVkOiBqc29uIH0gfSB9IH0gfTtcclxuICAgIH1cclxuICAgIGNvbW1vbltuYW1lXSA9IGpzb247XHJcbn1cclxuXHJcbi8vIE5vdCBwcm92aWRlZCBiZWNhdXNlIG9mIGxpbWl0ZWQgdXNlIChmZWVsIGZyZWUgdG8gZGlzY3VzcyBvciB0byBwcm92aWRlIHlvdXJzZWxmKTpcclxuLy9cclxuLy8gZ29vZ2xlL3Byb3RvYnVmL2Rlc2NyaXB0b3IucHJvdG9cclxuLy8gZ29vZ2xlL3Byb3RvYnVmL3NvdXJjZV9jb250ZXh0LnByb3RvXHJcbi8vIGdvb2dsZS9wcm90b2J1Zi90eXBlLnByb3RvXHJcbi8vXHJcbi8vIFN0cmlwcGVkIGFuZCBwcmUtcGFyc2VkIHZlcnNpb25zIG9mIHRoZXNlIG5vbi1idW5kbGVkIGZpbGVzIGFyZSBpbnN0ZWFkIGF2YWlsYWJsZSBhcyBwYXJ0IG9mXHJcbi8vIHRoZSByZXBvc2l0b3J5IG9yIHBhY2thZ2Ugd2l0aGluIHRoZSBnb29nbGUvcHJvdG9idWYgZGlyZWN0b3J5LlxyXG5cclxuY29tbW9uKFwiYW55XCIsIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3BlcnRpZXMgb2YgYSBnb29nbGUucHJvdG9idWYuQW55IG1lc3NhZ2UuXHJcbiAgICAgKiBAaW50ZXJmYWNlIElBbnlcclxuICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgKiBAcHJvcGVydHkge3N0cmluZ30gW3R5cGVVcmxdXHJcbiAgICAgKiBAcHJvcGVydHkge1VpbnQ4QXJyYXl9IFtieXRlc11cclxuICAgICAqIEBtZW1iZXJvZiBjb21tb25cclxuICAgICAqL1xyXG4gICAgQW55OiB7XHJcbiAgICAgICAgZmllbGRzOiB7XHJcbiAgICAgICAgICAgIHR5cGVfdXJsOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IDFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdmFsdWU6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiYnl0ZXNcIixcclxuICAgICAgICAgICAgICAgIGlkOiAyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxudmFyIHRpbWVUeXBlO1xyXG5cclxuY29tbW9uKFwiZHVyYXRpb25cIiwge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvcGVydGllcyBvZiBhIGdvb2dsZS5wcm90b2J1Zi5EdXJhdGlvbiBtZXNzYWdlLlxyXG4gICAgICogQGludGVyZmFjZSBJRHVyYXRpb25cclxuICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcnxMb25nfSBbc2Vjb25kc11cclxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbbmFub3NdXHJcbiAgICAgKiBAbWVtYmVyb2YgY29tbW9uXHJcbiAgICAgKi9cclxuICAgIER1cmF0aW9uOiB0aW1lVHlwZSA9IHtcclxuICAgICAgICBmaWVsZHM6IHtcclxuICAgICAgICAgICAgc2Vjb25kczoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJpbnQ2NFwiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IDFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmFub3M6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiaW50MzJcIixcclxuICAgICAgICAgICAgICAgIGlkOiAyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuY29tbW9uKFwidGltZXN0YW1wXCIsIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3BlcnRpZXMgb2YgYSBnb29nbGUucHJvdG9idWYuVGltZXN0YW1wIG1lc3NhZ2UuXHJcbiAgICAgKiBAaW50ZXJmYWNlIElUaW1lc3RhbXBcclxuICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcnxMb25nfSBbc2Vjb25kc11cclxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbbmFub3NdXHJcbiAgICAgKiBAbWVtYmVyb2YgY29tbW9uXHJcbiAgICAgKi9cclxuICAgIFRpbWVzdGFtcDogdGltZVR5cGVcclxufSk7XHJcblxyXG5jb21tb24oXCJlbXB0eVwiLCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm9wZXJ0aWVzIG9mIGEgZ29vZ2xlLnByb3RvYnVmLkVtcHR5IG1lc3NhZ2UuXHJcbiAgICAgKiBAaW50ZXJmYWNlIElFbXB0eVxyXG4gICAgICogQG1lbWJlcm9mIGNvbW1vblxyXG4gICAgICovXHJcbiAgICBFbXB0eToge1xyXG4gICAgICAgIGZpZWxkczoge31cclxuICAgIH1cclxufSk7XHJcblxyXG5jb21tb24oXCJzdHJ1Y3RcIiwge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvcGVydGllcyBvZiBhIGdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3QgbWVzc2FnZS5cclxuICAgICAqIEBpbnRlcmZhY2UgSVN0cnVjdFxyXG4gICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAqIEBwcm9wZXJ0eSB7T2JqZWN0LjxzdHJpbmcsSVZhbHVlPn0gW2ZpZWxkc11cclxuICAgICAqIEBtZW1iZXJvZiBjb21tb25cclxuICAgICAqL1xyXG4gICAgU3RydWN0OiB7XHJcbiAgICAgICAgZmllbGRzOiB7XHJcbiAgICAgICAgICAgIGZpZWxkczoge1xyXG4gICAgICAgICAgICAgICAga2V5VHlwZTogXCJzdHJpbmdcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiVmFsdWVcIixcclxuICAgICAgICAgICAgICAgIGlkOiAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvcGVydGllcyBvZiBhIGdvb2dsZS5wcm90b2J1Zi5WYWx1ZSBtZXNzYWdlLlxyXG4gICAgICogQGludGVyZmFjZSBJVmFsdWVcclxuICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgKiBAcHJvcGVydHkge3N0cmluZ30gW2tpbmRdXHJcbiAgICAgKiBAcHJvcGVydHkgezB9IFtudWxsVmFsdWVdXHJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gW251bWJlclZhbHVlXVxyXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9IFtzdHJpbmdWYWx1ZV1cclxuICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2Jvb2xWYWx1ZV1cclxuICAgICAqIEBwcm9wZXJ0eSB7SVN0cnVjdH0gW3N0cnVjdFZhbHVlXVxyXG4gICAgICogQHByb3BlcnR5IHtJTGlzdFZhbHVlfSBbbGlzdFZhbHVlXVxyXG4gICAgICogQG1lbWJlcm9mIGNvbW1vblxyXG4gICAgICovXHJcbiAgICBWYWx1ZToge1xyXG4gICAgICAgIG9uZW9mczoge1xyXG4gICAgICAgICAgICBraW5kOiB7XHJcbiAgICAgICAgICAgICAgICBvbmVvZjogW1xyXG4gICAgICAgICAgICAgICAgICAgIFwibnVsbFZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJudW1iZXJWYWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3RyaW5nVmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICBcImJvb2xWYWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3RydWN0VmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICBcImxpc3RWYWx1ZVwiXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGZpZWxkczoge1xyXG4gICAgICAgICAgICBudWxsVmFsdWU6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiTnVsbFZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICBpZDogMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBudW1iZXJWYWx1ZToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJkb3VibGVcIixcclxuICAgICAgICAgICAgICAgIGlkOiAyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN0cmluZ1ZhbHVlOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IDNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9vbFZhbHVlOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImJvb2xcIixcclxuICAgICAgICAgICAgICAgIGlkOiA0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN0cnVjdFZhbHVlOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlN0cnVjdFwiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IDVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGlzdFZhbHVlOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkxpc3RWYWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IDZcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgTnVsbFZhbHVlOiB7XHJcbiAgICAgICAgdmFsdWVzOiB7XHJcbiAgICAgICAgICAgIE5VTExfVkFMVUU6IDBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvcGVydGllcyBvZiBhIGdvb2dsZS5wcm90b2J1Zi5MaXN0VmFsdWUgbWVzc2FnZS5cclxuICAgICAqIEBpbnRlcmZhY2UgSUxpc3RWYWx1ZVxyXG4gICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAqIEBwcm9wZXJ0eSB7QXJyYXkuPElWYWx1ZT59IFt2YWx1ZXNdXHJcbiAgICAgKiBAbWVtYmVyb2YgY29tbW9uXHJcbiAgICAgKi9cclxuICAgIExpc3RWYWx1ZToge1xyXG4gICAgICAgIGZpZWxkczoge1xyXG4gICAgICAgICAgICB2YWx1ZXM6IHtcclxuICAgICAgICAgICAgICAgIHJ1bGU6IFwicmVwZWF0ZWRcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiVmFsdWVcIixcclxuICAgICAgICAgICAgICAgIGlkOiAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuY29tbW9uKFwid3JhcHBlcnNcIiwge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvcGVydGllcyBvZiBhIGdvb2dsZS5wcm90b2J1Zi5Eb3VibGVWYWx1ZSBtZXNzYWdlLlxyXG4gICAgICogQGludGVyZmFjZSBJRG91YmxlVmFsdWVcclxuICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gW3ZhbHVlXVxyXG4gICAgICogQG1lbWJlcm9mIGNvbW1vblxyXG4gICAgICovXHJcbiAgICBEb3VibGVWYWx1ZToge1xyXG4gICAgICAgIGZpZWxkczoge1xyXG4gICAgICAgICAgICB2YWx1ZToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJkb3VibGVcIixcclxuICAgICAgICAgICAgICAgIGlkOiAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvcGVydGllcyBvZiBhIGdvb2dsZS5wcm90b2J1Zi5GbG9hdFZhbHVlIG1lc3NhZ2UuXHJcbiAgICAgKiBAaW50ZXJmYWNlIElGbG9hdFZhbHVlXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IFt2YWx1ZV1cclxuICAgICAqIEBtZW1iZXJvZiBjb21tb25cclxuICAgICAqL1xyXG4gICAgRmxvYXRWYWx1ZToge1xyXG4gICAgICAgIGZpZWxkczoge1xyXG4gICAgICAgICAgICB2YWx1ZToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJmbG9hdFwiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm9wZXJ0aWVzIG9mIGEgZ29vZ2xlLnByb3RvYnVmLkludDY0VmFsdWUgbWVzc2FnZS5cclxuICAgICAqIEBpbnRlcmZhY2UgSUludDY0VmFsdWVcclxuICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcnxMb25nfSBbdmFsdWVdXHJcbiAgICAgKiBAbWVtYmVyb2YgY29tbW9uXHJcbiAgICAgKi9cclxuICAgIEludDY0VmFsdWU6IHtcclxuICAgICAgICBmaWVsZHM6IHtcclxuICAgICAgICAgICAgdmFsdWU6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiaW50NjRcIixcclxuICAgICAgICAgICAgICAgIGlkOiAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvcGVydGllcyBvZiBhIGdvb2dsZS5wcm90b2J1Zi5VSW50NjRWYWx1ZSBtZXNzYWdlLlxyXG4gICAgICogQGludGVyZmFjZSBJVUludDY0VmFsdWVcclxuICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcnxMb25nfSBbdmFsdWVdXHJcbiAgICAgKiBAbWVtYmVyb2YgY29tbW9uXHJcbiAgICAgKi9cclxuICAgIFVJbnQ2NFZhbHVlOiB7XHJcbiAgICAgICAgZmllbGRzOiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInVpbnQ2NFwiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm9wZXJ0aWVzIG9mIGEgZ29vZ2xlLnByb3RvYnVmLkludDMyVmFsdWUgbWVzc2FnZS5cclxuICAgICAqIEBpbnRlcmZhY2UgSUludDMyVmFsdWVcclxuICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gW3ZhbHVlXVxyXG4gICAgICogQG1lbWJlcm9mIGNvbW1vblxyXG4gICAgICovXHJcbiAgICBJbnQzMlZhbHVlOiB7XHJcbiAgICAgICAgZmllbGRzOiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImludDMyXCIsXHJcbiAgICAgICAgICAgICAgICBpZDogMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3BlcnRpZXMgb2YgYSBnb29nbGUucHJvdG9idWYuVUludDMyVmFsdWUgbWVzc2FnZS5cclxuICAgICAqIEBpbnRlcmZhY2UgSVVJbnQzMlZhbHVlXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IFt2YWx1ZV1cclxuICAgICAqIEBtZW1iZXJvZiBjb21tb25cclxuICAgICAqL1xyXG4gICAgVUludDMyVmFsdWU6IHtcclxuICAgICAgICBmaWVsZHM6IHtcclxuICAgICAgICAgICAgdmFsdWU6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwidWludDMyXCIsXHJcbiAgICAgICAgICAgICAgICBpZDogMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3BlcnRpZXMgb2YgYSBnb29nbGUucHJvdG9idWYuQm9vbFZhbHVlIG1lc3NhZ2UuXHJcbiAgICAgKiBAaW50ZXJmYWNlIElCb29sVmFsdWVcclxuICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IFt2YWx1ZV1cclxuICAgICAqIEBtZW1iZXJvZiBjb21tb25cclxuICAgICAqL1xyXG4gICAgQm9vbFZhbHVlOiB7XHJcbiAgICAgICAgZmllbGRzOiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImJvb2xcIixcclxuICAgICAgICAgICAgICAgIGlkOiAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvcGVydGllcyBvZiBhIGdvb2dsZS5wcm90b2J1Zi5TdHJpbmdWYWx1ZSBtZXNzYWdlLlxyXG4gICAgICogQGludGVyZmFjZSBJU3RyaW5nVmFsdWVcclxuICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgKiBAcHJvcGVydHkge3N0cmluZ30gW3ZhbHVlXVxyXG4gICAgICogQG1lbWJlcm9mIGNvbW1vblxyXG4gICAgICovXHJcbiAgICBTdHJpbmdWYWx1ZToge1xyXG4gICAgICAgIGZpZWxkczoge1xyXG4gICAgICAgICAgICB2YWx1ZToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcclxuICAgICAgICAgICAgICAgIGlkOiAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvcGVydGllcyBvZiBhIGdvb2dsZS5wcm90b2J1Zi5CeXRlc1ZhbHVlIG1lc3NhZ2UuXHJcbiAgICAgKiBAaW50ZXJmYWNlIElCeXRlc1ZhbHVlXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICogQHByb3BlcnR5IHtVaW50OEFycmF5fSBbdmFsdWVdXHJcbiAgICAgKiBAbWVtYmVyb2YgY29tbW9uXHJcbiAgICAgKi9cclxuICAgIEJ5dGVzVmFsdWU6IHtcclxuICAgICAgICBmaWVsZHM6IHtcclxuICAgICAgICAgICAgdmFsdWU6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiYnl0ZXNcIixcclxuICAgICAgICAgICAgICAgIGlkOiAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuY29tbW9uKFwiZmllbGRfbWFza1wiLCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm9wZXJ0aWVzIG9mIGEgZ29vZ2xlLnByb3RvYnVmLkZpZWxkTWFzayBtZXNzYWdlLlxyXG4gICAgICogQGludGVyZmFjZSBJRG91YmxlVmFsdWVcclxuICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gW3ZhbHVlXVxyXG4gICAgICogQG1lbWJlcm9mIGNvbW1vblxyXG4gICAgICovXHJcbiAgICBGaWVsZE1hc2s6IHtcclxuICAgICAgICBmaWVsZHM6IHtcclxuICAgICAgICAgICAgcGF0aHM6IHtcclxuICAgICAgICAgICAgICAgIHJ1bGU6IFwicmVwZWF0ZWRcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXHJcbiAgICAgICAgICAgICAgICBpZDogMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSByb290IGRlZmluaXRpb24gb2YgdGhlIHNwZWNpZmllZCBjb21tb24gcHJvdG8gZmlsZS5cclxuICpcclxuICogQnVuZGxlZCBkZWZpbml0aW9ucyBhcmU6XHJcbiAqIC0gZ29vZ2xlL3Byb3RvYnVmL2FueS5wcm90b1xyXG4gKiAtIGdvb2dsZS9wcm90b2J1Zi9kdXJhdGlvbi5wcm90b1xyXG4gKiAtIGdvb2dsZS9wcm90b2J1Zi9lbXB0eS5wcm90b1xyXG4gKiAtIGdvb2dsZS9wcm90b2J1Zi9maWVsZF9tYXNrLnByb3RvXHJcbiAqIC0gZ29vZ2xlL3Byb3RvYnVmL3N0cnVjdC5wcm90b1xyXG4gKiAtIGdvb2dsZS9wcm90b2J1Zi90aW1lc3RhbXAucHJvdG9cclxuICogLSBnb29nbGUvcHJvdG9idWYvd3JhcHBlcnMucHJvdG9cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGZpbGUgUHJvdG8gZmlsZSBuYW1lXHJcbiAqIEByZXR1cm5zIHtJTmFtZXNwYWNlfG51bGx9IFJvb3QgZGVmaW5pdGlvbiBvciBgbnVsbGAgaWYgbm90IGRlZmluZWRcclxuICovXHJcbmNvbW1vbi5nZXQgPSBmdW5jdGlvbiBnZXQoZmlsZSkge1xyXG4gICAgcmV0dXJuIGNvbW1vbltmaWxlXSB8fCBudWxsO1xyXG59O1xyXG5cclxufSx7fV0sMTI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxuLyoqXHJcbiAqIFJ1bnRpbWUgbWVzc2FnZSBmcm9tL3RvIHBsYWluIG9iamVjdCBjb252ZXJ0ZXJzLlxyXG4gKiBAbmFtZXNwYWNlXHJcbiAqL1xyXG52YXIgY29udmVydGVyID0gZXhwb3J0cztcclxuXHJcbnZhciBFbnVtID0gcmVxdWlyZSgxNSksXHJcbiAgICB1dGlsID0gcmVxdWlyZSgzNyk7XHJcblxyXG4vKipcclxuICogR2VuZXJhdGVzIGEgcGFydGlhbCB2YWx1ZSBmcm9tT2JqZWN0IGNvbnZldGVyLlxyXG4gKiBAcGFyYW0ge0NvZGVnZW59IGdlbiBDb2RlZ2VuIGluc3RhbmNlXHJcbiAqIEBwYXJhbSB7RmllbGR9IGZpZWxkIFJlZmxlY3RlZCBmaWVsZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gZmllbGRJbmRleCBGaWVsZCBpbmRleFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcCBQcm9wZXJ0eSByZWZlcmVuY2VcclxuICogQHJldHVybnMge0NvZGVnZW59IENvZGVnZW4gaW5zdGFuY2VcclxuICogQGlnbm9yZVxyXG4gKi9cclxuZnVuY3Rpb24gZ2VuVmFsdWVQYXJ0aWFsX2Zyb21PYmplY3QoZ2VuLCBmaWVsZCwgZmllbGRJbmRleCwgcHJvcCkge1xyXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW5leHBlY3RlZC1tdWx0aWxpbmUsIGJsb2NrLXNjb3BlZC12YXIsIG5vLXJlZGVjbGFyZSAqL1xyXG4gICAgaWYgKGZpZWxkLnJlc29sdmVkVHlwZSkge1xyXG4gICAgICAgIGlmIChmaWVsZC5yZXNvbHZlZFR5cGUgaW5zdGFuY2VvZiBFbnVtKSB7IGdlblxyXG4gICAgICAgICAgICAoXCJzd2l0Y2goZCVzKXtcIiwgcHJvcCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHZhbHVlcyA9IGZpZWxkLnJlc29sdmVkVHlwZS52YWx1ZXMsIGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZXMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGlmIChmaWVsZC5yZXBlYXRlZCAmJiB2YWx1ZXNba2V5c1tpXV0gPT09IGZpZWxkLnR5cGVEZWZhdWx0KSBnZW5cclxuICAgICAgICAgICAgICAgIChcImRlZmF1bHQ6XCIpO1xyXG4gICAgICAgICAgICAgICAgZ2VuXHJcbiAgICAgICAgICAgICAgICAoXCJjYXNlJWo6XCIsIGtleXNbaV0pXHJcbiAgICAgICAgICAgICAgICAoXCJjYXNlICVpOlwiLCB2YWx1ZXNba2V5c1tpXV0pXHJcbiAgICAgICAgICAgICAgICAgICAgKFwibSVzPSVqXCIsIHByb3AsIHZhbHVlc1trZXlzW2ldXSlcclxuICAgICAgICAgICAgICAgICAgICAoXCJicmVha1wiKTtcclxuICAgICAgICAgICAgfSBnZW5cclxuICAgICAgICAgICAgKFwifVwiKTtcclxuICAgICAgICB9IGVsc2UgZ2VuXHJcbiAgICAgICAgICAgIChcImlmKHR5cGVvZiBkJXMhPT1cXFwib2JqZWN0XFxcIilcIiwgcHJvcClcclxuICAgICAgICAgICAgICAgIChcInRocm93IFR5cGVFcnJvciglailcIiwgZmllbGQuZnVsbE5hbWUgKyBcIjogb2JqZWN0IGV4cGVjdGVkXCIpXHJcbiAgICAgICAgICAgIChcIm0lcz10eXBlc1slaV0uZnJvbU9iamVjdChkJXMpXCIsIHByb3AsIGZpZWxkSW5kZXgsIHByb3ApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgaXNVbnNpZ25lZCA9IGZhbHNlO1xyXG4gICAgICAgIHN3aXRjaCAoZmllbGQudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiZG91YmxlXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJmbG9hdFwiOiBnZW5cclxuICAgICAgICAgICAgICAgIChcIm0lcz1OdW1iZXIoZCVzKVwiLCBwcm9wLCBwcm9wKTsgLy8gYWxzbyBjYXRjaGVzIFwiTmFOXCIsIFwiSW5maW5pdHlcIlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ1aW50MzJcIjpcclxuICAgICAgICAgICAgY2FzZSBcImZpeGVkMzJcIjogZ2VuXHJcbiAgICAgICAgICAgICAgICAoXCJtJXM9ZCVzPj4+MFwiLCBwcm9wLCBwcm9wKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiaW50MzJcIjpcclxuICAgICAgICAgICAgY2FzZSBcInNpbnQzMlwiOlxyXG4gICAgICAgICAgICBjYXNlIFwic2ZpeGVkMzJcIjogZ2VuXHJcbiAgICAgICAgICAgICAgICAoXCJtJXM9ZCVzfDBcIiwgcHJvcCwgcHJvcCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInVpbnQ2NFwiOlxyXG4gICAgICAgICAgICAgICAgaXNVbnNpZ25lZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWZhbGx0aHJvdWdoXHJcbiAgICAgICAgICAgIGNhc2UgXCJpbnQ2NFwiOlxyXG4gICAgICAgICAgICBjYXNlIFwic2ludDY0XCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJmaXhlZDY0XCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJzZml4ZWQ2NFwiOiBnZW5cclxuICAgICAgICAgICAgICAgIChcImlmKHV0aWwuTG9uZylcIilcclxuICAgICAgICAgICAgICAgICAgICAoXCIobSVzPXV0aWwuTG9uZy5mcm9tVmFsdWUoZCVzKSkudW5zaWduZWQ9JWpcIiwgcHJvcCwgcHJvcCwgaXNVbnNpZ25lZClcclxuICAgICAgICAgICAgICAgIChcImVsc2UgaWYodHlwZW9mIGQlcz09PVxcXCJzdHJpbmdcXFwiKVwiLCBwcm9wKVxyXG4gICAgICAgICAgICAgICAgICAgIChcIm0lcz1wYXJzZUludChkJXMsMTApXCIsIHByb3AsIHByb3ApXHJcbiAgICAgICAgICAgICAgICAoXCJlbHNlIGlmKHR5cGVvZiBkJXM9PT1cXFwibnVtYmVyXFxcIilcIiwgcHJvcClcclxuICAgICAgICAgICAgICAgICAgICAoXCJtJXM9ZCVzXCIsIHByb3AsIHByb3ApXHJcbiAgICAgICAgICAgICAgICAoXCJlbHNlIGlmKHR5cGVvZiBkJXM9PT1cXFwib2JqZWN0XFxcIilcIiwgcHJvcClcclxuICAgICAgICAgICAgICAgICAgICAoXCJtJXM9bmV3IHV0aWwuTG9uZ0JpdHMoZCVzLmxvdz4+PjAsZCVzLmhpZ2g+Pj4wKS50b051bWJlciglcylcIiwgcHJvcCwgcHJvcCwgcHJvcCwgaXNVbnNpZ25lZCA/IFwidHJ1ZVwiIDogXCJcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ5dGVzXCI6IGdlblxyXG4gICAgICAgICAgICAgICAgKFwiaWYodHlwZW9mIGQlcz09PVxcXCJzdHJpbmdcXFwiKVwiLCBwcm9wKVxyXG4gICAgICAgICAgICAgICAgICAgIChcInV0aWwuYmFzZTY0LmRlY29kZShkJXMsbSVzPXV0aWwubmV3QnVmZmVyKHV0aWwuYmFzZTY0Lmxlbmd0aChkJXMpKSwwKVwiLCBwcm9wLCBwcm9wLCBwcm9wKVxyXG4gICAgICAgICAgICAgICAgKFwiZWxzZSBpZihkJXMubGVuZ3RoKVwiLCBwcm9wKVxyXG4gICAgICAgICAgICAgICAgICAgIChcIm0lcz1kJXNcIiwgcHJvcCwgcHJvcCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOiBnZW5cclxuICAgICAgICAgICAgICAgIChcIm0lcz1TdHJpbmcoZCVzKVwiLCBwcm9wLCBwcm9wKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYm9vbFwiOiBnZW5cclxuICAgICAgICAgICAgICAgIChcIm0lcz1Cb29sZWFuKGQlcylcIiwgcHJvcCwgcHJvcCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLyogZGVmYXVsdDogZ2VuXHJcbiAgICAgICAgICAgICAgICAoXCJtJXM9ZCVzXCIsIHByb3AsIHByb3ApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7ICovXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdlbjtcclxuICAgIC8qIGVzbGludC1lbmFibGUgbm8tdW5leHBlY3RlZC1tdWx0aWxpbmUsIGJsb2NrLXNjb3BlZC12YXIsIG5vLXJlZGVjbGFyZSAqL1xyXG59XHJcblxyXG4vKipcclxuICogR2VuZXJhdGVzIGEgcGxhaW4gb2JqZWN0IHRvIHJ1bnRpbWUgbWVzc2FnZSBjb252ZXJ0ZXIgc3BlY2lmaWMgdG8gdGhlIHNwZWNpZmllZCBtZXNzYWdlIHR5cGUuXHJcbiAqIEBwYXJhbSB7VHlwZX0gbXR5cGUgTWVzc2FnZSB0eXBlXHJcbiAqIEByZXR1cm5zIHtDb2RlZ2VufSBDb2RlZ2VuIGluc3RhbmNlXHJcbiAqL1xyXG5jb252ZXJ0ZXIuZnJvbU9iamVjdCA9IGZ1bmN0aW9uIGZyb21PYmplY3QobXR5cGUpIHtcclxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZXhwZWN0ZWQtbXVsdGlsaW5lLCBibG9jay1zY29wZWQtdmFyLCBuby1yZWRlY2xhcmUgKi9cclxuICAgIHZhciBmaWVsZHMgPSBtdHlwZS5maWVsZHNBcnJheTtcclxuICAgIHZhciBnZW4gPSB1dGlsLmNvZGVnZW4oW1wiZFwiXSwgbXR5cGUubmFtZSArIFwiJGZyb21PYmplY3RcIilcclxuICAgIChcImlmKGQgaW5zdGFuY2VvZiB0aGlzLmN0b3IpXCIpXHJcbiAgICAgICAgKFwicmV0dXJuIGRcIik7XHJcbiAgICBpZiAoIWZpZWxkcy5sZW5ndGgpIHJldHVybiBnZW5cclxuICAgIChcInJldHVybiBuZXcgdGhpcy5jdG9yXCIpO1xyXG4gICAgZ2VuXHJcbiAgICAoXCJ2YXIgbT1uZXcgdGhpcy5jdG9yXCIpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICB2YXIgZmllbGQgID0gZmllbGRzW2ldLnJlc29sdmUoKSxcclxuICAgICAgICAgICAgcHJvcCAgID0gdXRpbC5zYWZlUHJvcChmaWVsZC5uYW1lKTtcclxuXHJcbiAgICAgICAgLy8gTWFwIGZpZWxkc1xyXG4gICAgICAgIGlmIChmaWVsZC5tYXApIHsgZ2VuXHJcbiAgICAoXCJpZihkJXMpe1wiLCBwcm9wKVxyXG4gICAgICAgIChcImlmKHR5cGVvZiBkJXMhPT1cXFwib2JqZWN0XFxcIilcIiwgcHJvcClcclxuICAgICAgICAgICAgKFwidGhyb3cgVHlwZUVycm9yKCVqKVwiLCBmaWVsZC5mdWxsTmFtZSArIFwiOiBvYmplY3QgZXhwZWN0ZWRcIilcclxuICAgICAgICAoXCJtJXM9e31cIiwgcHJvcClcclxuICAgICAgICAoXCJmb3IodmFyIGtzPU9iamVjdC5rZXlzKGQlcyksaT0wO2k8a3MubGVuZ3RoOysraSl7XCIsIHByb3ApO1xyXG4gICAgICAgICAgICBnZW5WYWx1ZVBhcnRpYWxfZnJvbU9iamVjdChnZW4sIGZpZWxkLCAvKiBub3Qgc29ydGVkICovIGksIHByb3AgKyBcIltrc1tpXV1cIilcclxuICAgICAgICAoXCJ9XCIpXHJcbiAgICAoXCJ9XCIpO1xyXG5cclxuICAgICAgICAvLyBSZXBlYXRlZCBmaWVsZHNcclxuICAgICAgICB9IGVsc2UgaWYgKGZpZWxkLnJlcGVhdGVkKSB7IGdlblxyXG4gICAgKFwiaWYoZCVzKXtcIiwgcHJvcClcclxuICAgICAgICAoXCJpZighQXJyYXkuaXNBcnJheShkJXMpKVwiLCBwcm9wKVxyXG4gICAgICAgICAgICAoXCJ0aHJvdyBUeXBlRXJyb3IoJWopXCIsIGZpZWxkLmZ1bGxOYW1lICsgXCI6IGFycmF5IGV4cGVjdGVkXCIpXHJcbiAgICAgICAgKFwibSVzPVtdXCIsIHByb3ApXHJcbiAgICAgICAgKFwiZm9yKHZhciBpPTA7aTxkJXMubGVuZ3RoOysraSl7XCIsIHByb3ApO1xyXG4gICAgICAgICAgICBnZW5WYWx1ZVBhcnRpYWxfZnJvbU9iamVjdChnZW4sIGZpZWxkLCAvKiBub3Qgc29ydGVkICovIGksIHByb3AgKyBcIltpXVwiKVxyXG4gICAgICAgIChcIn1cIilcclxuICAgIChcIn1cIik7XHJcblxyXG4gICAgICAgIC8vIE5vbi1yZXBlYXRlZCBmaWVsZHNcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIShmaWVsZC5yZXNvbHZlZFR5cGUgaW5zdGFuY2VvZiBFbnVtKSkgZ2VuIC8vIG5vIG5lZWQgdG8gdGVzdCBmb3IgbnVsbC91bmRlZmluZWQgaWYgYW4gZW51bSAodXNlcyBzd2l0Y2gpXHJcbiAgICAoXCJpZihkJXMhPW51bGwpe1wiLCBwcm9wKTsgLy8gIT09IHVuZGVmaW5lZCAmJiAhPT0gbnVsbFxyXG4gICAgICAgIGdlblZhbHVlUGFydGlhbF9mcm9tT2JqZWN0KGdlbiwgZmllbGQsIC8qIG5vdCBzb3J0ZWQgKi8gaSwgcHJvcCk7XHJcbiAgICAgICAgICAgIGlmICghKGZpZWxkLnJlc29sdmVkVHlwZSBpbnN0YW5jZW9mIEVudW0pKSBnZW5cclxuICAgIChcIn1cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSByZXR1cm4gZ2VuXHJcbiAgICAoXCJyZXR1cm4gbVwiKTtcclxuICAgIC8qIGVzbGludC1lbmFibGUgbm8tdW5leHBlY3RlZC1tdWx0aWxpbmUsIGJsb2NrLXNjb3BlZC12YXIsIG5vLXJlZGVjbGFyZSAqL1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIHBhcnRpYWwgdmFsdWUgdG9PYmplY3QgY29udmVydGVyLlxyXG4gKiBAcGFyYW0ge0NvZGVnZW59IGdlbiBDb2RlZ2VuIGluc3RhbmNlXHJcbiAqIEBwYXJhbSB7RmllbGR9IGZpZWxkIFJlZmxlY3RlZCBmaWVsZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gZmllbGRJbmRleCBGaWVsZCBpbmRleFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcCBQcm9wZXJ0eSByZWZlcmVuY2VcclxuICogQHJldHVybnMge0NvZGVnZW59IENvZGVnZW4gaW5zdGFuY2VcclxuICogQGlnbm9yZVxyXG4gKi9cclxuZnVuY3Rpb24gZ2VuVmFsdWVQYXJ0aWFsX3RvT2JqZWN0KGdlbiwgZmllbGQsIGZpZWxkSW5kZXgsIHByb3ApIHtcclxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZXhwZWN0ZWQtbXVsdGlsaW5lLCBibG9jay1zY29wZWQtdmFyLCBuby1yZWRlY2xhcmUgKi9cclxuICAgIGlmIChmaWVsZC5yZXNvbHZlZFR5cGUpIHtcclxuICAgICAgICBpZiAoZmllbGQucmVzb2x2ZWRUeXBlIGluc3RhbmNlb2YgRW51bSkgZ2VuXHJcbiAgICAgICAgICAgIChcImQlcz1vLmVudW1zPT09U3RyaW5nP3R5cGVzWyVpXS52YWx1ZXNbbSVzXTptJXNcIiwgcHJvcCwgZmllbGRJbmRleCwgcHJvcCwgcHJvcCk7XHJcbiAgICAgICAgZWxzZSBnZW5cclxuICAgICAgICAgICAgKFwiZCVzPXR5cGVzWyVpXS50b09iamVjdChtJXMsbylcIiwgcHJvcCwgZmllbGRJbmRleCwgcHJvcCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBpc1Vuc2lnbmVkID0gZmFsc2U7XHJcbiAgICAgICAgc3dpdGNoIChmaWVsZC50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJkb3VibGVcIjpcclxuICAgICAgICAgICAgY2FzZSBcImZsb2F0XCI6IGdlblxyXG4gICAgICAgICAgICAoXCJkJXM9by5qc29uJiYhaXNGaW5pdGUobSVzKT9TdHJpbmcobSVzKTptJXNcIiwgcHJvcCwgcHJvcCwgcHJvcCwgcHJvcCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInVpbnQ2NFwiOlxyXG4gICAgICAgICAgICAgICAgaXNVbnNpZ25lZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWZhbGx0aHJvdWdoXHJcbiAgICAgICAgICAgIGNhc2UgXCJpbnQ2NFwiOlxyXG4gICAgICAgICAgICBjYXNlIFwic2ludDY0XCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJmaXhlZDY0XCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJzZml4ZWQ2NFwiOiBnZW5cclxuICAgICAgICAgICAgKFwiaWYodHlwZW9mIG0lcz09PVxcXCJudW1iZXJcXFwiKVwiLCBwcm9wKVxyXG4gICAgICAgICAgICAgICAgKFwiZCVzPW8ubG9uZ3M9PT1TdHJpbmc/U3RyaW5nKG0lcyk6bSVzXCIsIHByb3AsIHByb3AsIHByb3ApXHJcbiAgICAgICAgICAgIChcImVsc2VcIikgLy8gTG9uZy1saWtlXHJcbiAgICAgICAgICAgICAgICAoXCJkJXM9by5sb25ncz09PVN0cmluZz91dGlsLkxvbmcucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobSVzKTpvLmxvbmdzPT09TnVtYmVyP25ldyB1dGlsLkxvbmdCaXRzKG0lcy5sb3c+Pj4wLG0lcy5oaWdoPj4+MCkudG9OdW1iZXIoJXMpOm0lc1wiLCBwcm9wLCBwcm9wLCBwcm9wLCBwcm9wLCBpc1Vuc2lnbmVkID8gXCJ0cnVlXCI6IFwiXCIsIHByb3ApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJieXRlc1wiOiBnZW5cclxuICAgICAgICAgICAgKFwiZCVzPW8uYnl0ZXM9PT1TdHJpbmc/dXRpbC5iYXNlNjQuZW5jb2RlKG0lcywwLG0lcy5sZW5ndGgpOm8uYnl0ZXM9PT1BcnJheT9BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChtJXMpOm0lc1wiLCBwcm9wLCBwcm9wLCBwcm9wLCBwcm9wLCBwcm9wKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBnZW5cclxuICAgICAgICAgICAgKFwiZCVzPW0lc1wiLCBwcm9wLCBwcm9wKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBnZW47XHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXVuZXhwZWN0ZWQtbXVsdGlsaW5lLCBibG9jay1zY29wZWQtdmFyLCBuby1yZWRlY2xhcmUgKi9cclxufVxyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIHJ1bnRpbWUgbWVzc2FnZSB0byBwbGFpbiBvYmplY3QgY29udmVydGVyIHNwZWNpZmljIHRvIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSB0eXBlLlxyXG4gKiBAcGFyYW0ge1R5cGV9IG10eXBlIE1lc3NhZ2UgdHlwZVxyXG4gKiBAcmV0dXJucyB7Q29kZWdlbn0gQ29kZWdlbiBpbnN0YW5jZVxyXG4gKi9cclxuY29udmVydGVyLnRvT2JqZWN0ID0gZnVuY3Rpb24gdG9PYmplY3QobXR5cGUpIHtcclxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZXhwZWN0ZWQtbXVsdGlsaW5lLCBibG9jay1zY29wZWQtdmFyLCBuby1yZWRlY2xhcmUgKi9cclxuICAgIHZhciBmaWVsZHMgPSBtdHlwZS5maWVsZHNBcnJheS5zbGljZSgpLnNvcnQodXRpbC5jb21wYXJlRmllbGRzQnlJZCk7XHJcbiAgICBpZiAoIWZpZWxkcy5sZW5ndGgpXHJcbiAgICAgICAgcmV0dXJuIHV0aWwuY29kZWdlbigpKFwicmV0dXJuIHt9XCIpO1xyXG4gICAgdmFyIGdlbiA9IHV0aWwuY29kZWdlbihbXCJtXCIsIFwib1wiXSwgbXR5cGUubmFtZSArIFwiJHRvT2JqZWN0XCIpXHJcbiAgICAoXCJpZighbylcIilcclxuICAgICAgICAoXCJvPXt9XCIpXHJcbiAgICAoXCJ2YXIgZD17fVwiKTtcclxuXHJcbiAgICB2YXIgcmVwZWF0ZWRGaWVsZHMgPSBbXSxcclxuICAgICAgICBtYXBGaWVsZHMgPSBbXSxcclxuICAgICAgICBub3JtYWxGaWVsZHMgPSBbXSxcclxuICAgICAgICBpID0gMDtcclxuICAgIGZvciAoOyBpIDwgZmllbGRzLmxlbmd0aDsgKytpKVxyXG4gICAgICAgIGlmICghZmllbGRzW2ldLnBhcnRPZilcclxuICAgICAgICAgICAgKCBmaWVsZHNbaV0ucmVzb2x2ZSgpLnJlcGVhdGVkID8gcmVwZWF0ZWRGaWVsZHNcclxuICAgICAgICAgICAgOiBmaWVsZHNbaV0ubWFwID8gbWFwRmllbGRzXHJcbiAgICAgICAgICAgIDogbm9ybWFsRmllbGRzKS5wdXNoKGZpZWxkc1tpXSk7XHJcblxyXG4gICAgaWYgKHJlcGVhdGVkRmllbGRzLmxlbmd0aCkgeyBnZW5cclxuICAgIChcImlmKG8uYXJyYXlzfHxvLmRlZmF1bHRzKXtcIik7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHJlcGVhdGVkRmllbGRzLmxlbmd0aDsgKytpKSBnZW5cclxuICAgICAgICAoXCJkJXM9W11cIiwgdXRpbC5zYWZlUHJvcChyZXBlYXRlZEZpZWxkc1tpXS5uYW1lKSk7XHJcbiAgICAgICAgZ2VuXHJcbiAgICAoXCJ9XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtYXBGaWVsZHMubGVuZ3RoKSB7IGdlblxyXG4gICAgKFwiaWYoby5vYmplY3RzfHxvLmRlZmF1bHRzKXtcIik7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG1hcEZpZWxkcy5sZW5ndGg7ICsraSkgZ2VuXHJcbiAgICAgICAgKFwiZCVzPXt9XCIsIHV0aWwuc2FmZVByb3AobWFwRmllbGRzW2ldLm5hbWUpKTtcclxuICAgICAgICBnZW5cclxuICAgIChcIn1cIik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5vcm1hbEZpZWxkcy5sZW5ndGgpIHsgZ2VuXHJcbiAgICAoXCJpZihvLmRlZmF1bHRzKXtcIik7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG5vcm1hbEZpZWxkcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICB2YXIgZmllbGQgPSBub3JtYWxGaWVsZHNbaV0sXHJcbiAgICAgICAgICAgICAgICBwcm9wICA9IHV0aWwuc2FmZVByb3AoZmllbGQubmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChmaWVsZC5yZXNvbHZlZFR5cGUgaW5zdGFuY2VvZiBFbnVtKSBnZW5cclxuICAgICAgICAoXCJkJXM9by5lbnVtcz09PVN0cmluZz8lajolalwiLCBwcm9wLCBmaWVsZC5yZXNvbHZlZFR5cGUudmFsdWVzQnlJZFtmaWVsZC50eXBlRGVmYXVsdF0sIGZpZWxkLnR5cGVEZWZhdWx0KTtcclxuICAgICAgICAgICAgZWxzZSBpZiAoZmllbGQubG9uZykgZ2VuXHJcbiAgICAgICAgKFwiaWYodXRpbC5Mb25nKXtcIilcclxuICAgICAgICAgICAgKFwidmFyIG49bmV3IHV0aWwuTG9uZyglaSwlaSwlailcIiwgZmllbGQudHlwZURlZmF1bHQubG93LCBmaWVsZC50eXBlRGVmYXVsdC5oaWdoLCBmaWVsZC50eXBlRGVmYXVsdC51bnNpZ25lZClcclxuICAgICAgICAgICAgKFwiZCVzPW8ubG9uZ3M9PT1TdHJpbmc/bi50b1N0cmluZygpOm8ubG9uZ3M9PT1OdW1iZXI/bi50b051bWJlcigpOm5cIiwgcHJvcClcclxuICAgICAgICAoXCJ9ZWxzZVwiKVxyXG4gICAgICAgICAgICAoXCJkJXM9by5sb25ncz09PVN0cmluZz8lajolaVwiLCBwcm9wLCBmaWVsZC50eXBlRGVmYXVsdC50b1N0cmluZygpLCBmaWVsZC50eXBlRGVmYXVsdC50b051bWJlcigpKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAoZmllbGQuYnl0ZXMpIGdlblxyXG4gICAgICAgIChcImQlcz1vLmJ5dGVzPT09U3RyaW5nPyVqOiVzXCIsIHByb3AsIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBmaWVsZC50eXBlRGVmYXVsdCksIFwiW1wiICsgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZmllbGQudHlwZURlZmF1bHQpLmpvaW4oXCIsXCIpICsgXCJdXCIpO1xyXG4gICAgICAgICAgICBlbHNlIGdlblxyXG4gICAgICAgIChcImQlcz0lalwiLCBwcm9wLCBmaWVsZC50eXBlRGVmYXVsdCk7IC8vIGFsc28gbWVzc2FnZXMgKD1udWxsKVxyXG4gICAgICAgIH0gZ2VuXHJcbiAgICAoXCJ9XCIpO1xyXG4gICAgfVxyXG4gICAgdmFyIGhhc0tzMiA9IGZhbHNlO1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGZpZWxkcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIHZhciBmaWVsZCA9IGZpZWxkc1tpXSxcclxuICAgICAgICAgICAgaW5kZXggPSBtdHlwZS5fZmllbGRzQXJyYXkuaW5kZXhPZihmaWVsZCksXHJcbiAgICAgICAgICAgIHByb3AgID0gdXRpbC5zYWZlUHJvcChmaWVsZC5uYW1lKTtcclxuICAgICAgICBpZiAoZmllbGQubWFwKSB7XHJcbiAgICAgICAgICAgIGlmICghaGFzS3MyKSB7IGhhc0tzMiA9IHRydWU7IGdlblxyXG4gICAgKFwidmFyIGtzMlwiKTtcclxuICAgICAgICAgICAgfSBnZW5cclxuICAgIChcImlmKG0lcyYmKGtzMj1PYmplY3Qua2V5cyhtJXMpKS5sZW5ndGgpe1wiLCBwcm9wLCBwcm9wKVxyXG4gICAgICAgIChcImQlcz17fVwiLCBwcm9wKVxyXG4gICAgICAgIChcImZvcih2YXIgaj0wO2o8a3MyLmxlbmd0aDsrK2ope1wiKTtcclxuICAgICAgICAgICAgZ2VuVmFsdWVQYXJ0aWFsX3RvT2JqZWN0KGdlbiwgZmllbGQsIC8qIHNvcnRlZCAqLyBpbmRleCwgcHJvcCArIFwiW2tzMltqXV1cIilcclxuICAgICAgICAoXCJ9XCIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZmllbGQucmVwZWF0ZWQpIHsgZ2VuXHJcbiAgICAoXCJpZihtJXMmJm0lcy5sZW5ndGgpe1wiLCBwcm9wLCBwcm9wKVxyXG4gICAgICAgIChcImQlcz1bXVwiLCBwcm9wKVxyXG4gICAgICAgIChcImZvcih2YXIgaj0wO2o8bSVzLmxlbmd0aDsrK2ope1wiLCBwcm9wKTtcclxuICAgICAgICAgICAgZ2VuVmFsdWVQYXJ0aWFsX3RvT2JqZWN0KGdlbiwgZmllbGQsIC8qIHNvcnRlZCAqLyBpbmRleCwgcHJvcCArIFwiW2pdXCIpXHJcbiAgICAgICAgKFwifVwiKTtcclxuICAgICAgICB9IGVsc2UgeyBnZW5cclxuICAgIChcImlmKG0lcyE9bnVsbCYmbS5oYXNPd25Qcm9wZXJ0eSglaikpe1wiLCBwcm9wLCBmaWVsZC5uYW1lKTsgLy8gIT09IHVuZGVmaW5lZCAmJiAhPT0gbnVsbFxyXG4gICAgICAgIGdlblZhbHVlUGFydGlhbF90b09iamVjdChnZW4sIGZpZWxkLCAvKiBzb3J0ZWQgKi8gaW5kZXgsIHByb3ApO1xyXG4gICAgICAgIGlmIChmaWVsZC5wYXJ0T2YpIGdlblxyXG4gICAgICAgIChcImlmKG8ub25lb2ZzKVwiKVxyXG4gICAgICAgICAgICAoXCJkJXM9JWpcIiwgdXRpbC5zYWZlUHJvcChmaWVsZC5wYXJ0T2YubmFtZSksIGZpZWxkLm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZW5cclxuICAgIChcIn1cIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ2VuXHJcbiAgICAoXCJyZXR1cm4gZFwiKTtcclxuICAgIC8qIGVzbGludC1lbmFibGUgbm8tdW5leHBlY3RlZC1tdWx0aWxpbmUsIGJsb2NrLXNjb3BlZC12YXIsIG5vLXJlZGVjbGFyZSAqL1xyXG59O1xyXG5cclxufSx7XCIxNVwiOjE1LFwiMzdcIjozN31dLDEzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gZGVjb2RlcjtcclxuXHJcbnZhciBFbnVtICAgID0gcmVxdWlyZSgxNSksXHJcbiAgICB0eXBlcyAgID0gcmVxdWlyZSgzNiksXHJcbiAgICB1dGlsICAgID0gcmVxdWlyZSgzNyk7XHJcblxyXG5mdW5jdGlvbiBtaXNzaW5nKGZpZWxkKSB7XHJcbiAgICByZXR1cm4gXCJtaXNzaW5nIHJlcXVpcmVkICdcIiArIGZpZWxkLm5hbWUgKyBcIidcIjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIGRlY29kZXIgc3BlY2lmaWMgdG8gdGhlIHNwZWNpZmllZCBtZXNzYWdlIHR5cGUuXHJcbiAqIEBwYXJhbSB7VHlwZX0gbXR5cGUgTWVzc2FnZSB0eXBlXHJcbiAqIEByZXR1cm5zIHtDb2RlZ2VufSBDb2RlZ2VuIGluc3RhbmNlXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWNvZGVyKG10eXBlKSB7XHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmV4cGVjdGVkLW11bHRpbGluZSAqL1xyXG4gICAgdmFyIGdlbiA9IHV0aWwuY29kZWdlbihbXCJyXCIsIFwibFwiXSwgbXR5cGUubmFtZSArIFwiJGRlY29kZVwiKVxyXG4gICAgKFwiaWYoIShyIGluc3RhbmNlb2YgUmVhZGVyKSlcIilcclxuICAgICAgICAoXCJyPVJlYWRlci5jcmVhdGUocilcIilcclxuICAgIChcInZhciBjPWw9PT11bmRlZmluZWQ/ci5sZW46ci5wb3MrbCxtPW5ldyB0aGlzLmN0b3JcIiArIChtdHlwZS5maWVsZHNBcnJheS5maWx0ZXIoZnVuY3Rpb24oZmllbGQpIHsgcmV0dXJuIGZpZWxkLm1hcDsgfSkubGVuZ3RoID8gXCIsa1wiIDogXCJcIikpXHJcbiAgICAoXCJ3aGlsZShyLnBvczxjKXtcIilcclxuICAgICAgICAoXCJ2YXIgdD1yLnVpbnQzMigpXCIpO1xyXG4gICAgaWYgKG10eXBlLmdyb3VwKSBnZW5cclxuICAgICAgICAoXCJpZigodCY3KT09PTQpXCIpXHJcbiAgICAgICAgICAgIChcImJyZWFrXCIpO1xyXG4gICAgZ2VuXHJcbiAgICAgICAgKFwic3dpdGNoKHQ+Pj4zKXtcIik7XHJcblxyXG4gICAgdmFyIGkgPSAwO1xyXG4gICAgZm9yICg7IGkgPCAvKiBpbml0aWFsaXplcyAqLyBtdHlwZS5maWVsZHNBcnJheS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIHZhciBmaWVsZCA9IG10eXBlLl9maWVsZHNBcnJheVtpXS5yZXNvbHZlKCksXHJcbiAgICAgICAgICAgIHR5cGUgID0gZmllbGQucmVzb2x2ZWRUeXBlIGluc3RhbmNlb2YgRW51bSA/IFwiaW50MzJcIiA6IGZpZWxkLnR5cGUsXHJcbiAgICAgICAgICAgIHJlZiAgID0gXCJtXCIgKyB1dGlsLnNhZmVQcm9wKGZpZWxkLm5hbWUpOyBnZW5cclxuICAgICAgICAgICAgKFwiY2FzZSAlaTpcIiwgZmllbGQuaWQpO1xyXG5cclxuICAgICAgICAvLyBNYXAgZmllbGRzXHJcbiAgICAgICAgaWYgKGZpZWxkLm1hcCkgeyBnZW5cclxuICAgICAgICAgICAgICAgIChcInIuc2tpcCgpLnBvcysrXCIpIC8vIGFzc3VtZXMgaWQgMSArIGtleSB3aXJlVHlwZVxyXG4gICAgICAgICAgICAgICAgKFwiaWYoJXM9PT11dGlsLmVtcHR5T2JqZWN0KVwiLCByZWYpXHJcbiAgICAgICAgICAgICAgICAgICAgKFwiJXM9e31cIiwgcmVmKVxyXG4gICAgICAgICAgICAgICAgKFwiaz1yLiVzKClcIiwgZmllbGQua2V5VHlwZSlcclxuICAgICAgICAgICAgICAgIChcInIucG9zKytcIik7IC8vIGFzc3VtZXMgaWQgMiArIHZhbHVlIHdpcmVUeXBlXHJcbiAgICAgICAgICAgIGlmICh0eXBlcy5sb25nW2ZpZWxkLmtleVR5cGVdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlcy5iYXNpY1t0eXBlXSA9PT0gdW5kZWZpbmVkKSBnZW5cclxuICAgICAgICAgICAgICAgIChcIiVzW3R5cGVvZiBrPT09XFxcIm9iamVjdFxcXCI/dXRpbC5sb25nVG9IYXNoKGspOmtdPXR5cGVzWyVpXS5kZWNvZGUocixyLnVpbnQzMigpKVwiLCByZWYsIGkpOyAvLyBjYW4ndCBiZSBncm91cHNcclxuICAgICAgICAgICAgICAgIGVsc2UgZ2VuXHJcbiAgICAgICAgICAgICAgICAoXCIlc1t0eXBlb2Ygaz09PVxcXCJvYmplY3RcXFwiP3V0aWwubG9uZ1RvSGFzaChrKTprXT1yLiVzKClcIiwgcmVmLCB0eXBlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlcy5iYXNpY1t0eXBlXSA9PT0gdW5kZWZpbmVkKSBnZW5cclxuICAgICAgICAgICAgICAgIChcIiVzW2tdPXR5cGVzWyVpXS5kZWNvZGUocixyLnVpbnQzMigpKVwiLCByZWYsIGkpOyAvLyBjYW4ndCBiZSBncm91cHNcclxuICAgICAgICAgICAgICAgIGVsc2UgZ2VuXHJcbiAgICAgICAgICAgICAgICAoXCIlc1trXT1yLiVzKClcIiwgcmVmLCB0eXBlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXBlYXRlZCBmaWVsZHNcclxuICAgICAgICB9IGVsc2UgaWYgKGZpZWxkLnJlcGVhdGVkKSB7IGdlblxyXG5cclxuICAgICAgICAgICAgICAgIChcImlmKCEoJXMmJiVzLmxlbmd0aCkpXCIsIHJlZiwgcmVmKVxyXG4gICAgICAgICAgICAgICAgICAgIChcIiVzPVtdXCIsIHJlZik7XHJcblxyXG4gICAgICAgICAgICAvLyBQYWNrYWJsZSAoYWx3YXlzIGNoZWNrIGZvciBmb3J3YXJkIGFuZCBiYWNrd2FyZCBjb21wYXRpYmxpdHkpXHJcbiAgICAgICAgICAgIGlmICh0eXBlcy5wYWNrZWRbdHlwZV0gIT09IHVuZGVmaW5lZCkgZ2VuXHJcbiAgICAgICAgICAgICAgICAoXCJpZigodCY3KT09PTIpe1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIChcInZhciBjMj1yLnVpbnQzMigpK3IucG9zXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgKFwid2hpbGUoci5wb3M8YzIpXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIiVzLnB1c2goci4lcygpKVwiLCByZWYsIHR5cGUpXHJcbiAgICAgICAgICAgICAgICAoXCJ9ZWxzZVwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE5vbi1wYWNrZWRcclxuICAgICAgICAgICAgaWYgKHR5cGVzLmJhc2ljW3R5cGVdID09PSB1bmRlZmluZWQpIGdlbihmaWVsZC5yZXNvbHZlZFR5cGUuZ3JvdXBcclxuICAgICAgICAgICAgICAgICAgICA/IFwiJXMucHVzaCh0eXBlc1slaV0uZGVjb2RlKHIpKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgOiBcIiVzLnB1c2godHlwZXNbJWldLmRlY29kZShyLHIudWludDMyKCkpKVwiLCByZWYsIGkpO1xyXG4gICAgICAgICAgICBlbHNlIGdlblxyXG4gICAgICAgICAgICAgICAgICAgIChcIiVzLnB1c2goci4lcygpKVwiLCByZWYsIHR5cGUpO1xyXG5cclxuICAgICAgICAvLyBOb24tcmVwZWF0ZWRcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVzLmJhc2ljW3R5cGVdID09PSB1bmRlZmluZWQpIGdlbihmaWVsZC5yZXNvbHZlZFR5cGUuZ3JvdXBcclxuICAgICAgICAgICAgICAgID8gXCIlcz10eXBlc1slaV0uZGVjb2RlKHIpXCJcclxuICAgICAgICAgICAgICAgIDogXCIlcz10eXBlc1slaV0uZGVjb2RlKHIsci51aW50MzIoKSlcIiwgcmVmLCBpKTtcclxuICAgICAgICBlbHNlIGdlblxyXG4gICAgICAgICAgICAgICAgKFwiJXM9ci4lcygpXCIsIHJlZiwgdHlwZSk7XHJcbiAgICAgICAgZ2VuXHJcbiAgICAgICAgICAgICAgICAoXCJicmVha1wiKTtcclxuICAgIC8vIFVua25vd24gZmllbGRzXHJcbiAgICB9IGdlblxyXG4gICAgICAgICAgICAoXCJkZWZhdWx0OlwiKVxyXG4gICAgICAgICAgICAgICAgKFwici5za2lwVHlwZSh0JjcpXCIpXHJcbiAgICAgICAgICAgICAgICAoXCJicmVha1wiKVxyXG5cclxuICAgICAgICAoXCJ9XCIpXHJcbiAgICAoXCJ9XCIpO1xyXG5cclxuICAgIC8vIEZpZWxkIHByZXNlbmNlXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbXR5cGUuX2ZpZWxkc0FycmF5Lmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgdmFyIHJmaWVsZCA9IG10eXBlLl9maWVsZHNBcnJheVtpXTtcclxuICAgICAgICBpZiAocmZpZWxkLnJlcXVpcmVkKSBnZW5cclxuICAgIChcImlmKCFtLmhhc093blByb3BlcnR5KCVqKSlcIiwgcmZpZWxkLm5hbWUpXHJcbiAgICAgICAgKFwidGhyb3cgdXRpbC5Qcm90b2NvbEVycm9yKCVqLHtpbnN0YW5jZTptfSlcIiwgbWlzc2luZyhyZmllbGQpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZ2VuXHJcbiAgICAoXCJyZXR1cm4gbVwiKTtcclxuICAgIC8qIGVzbGludC1lbmFibGUgbm8tdW5leHBlY3RlZC1tdWx0aWxpbmUgKi9cclxufVxyXG5cclxufSx7XCIxNVwiOjE1LFwiMzZcIjozNixcIjM3XCI6Mzd9XSwxNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGVuY29kZXI7XHJcblxyXG52YXIgRW51bSAgICAgPSByZXF1aXJlKDE1KSxcclxuICAgIHR5cGVzICAgID0gcmVxdWlyZSgzNiksXHJcbiAgICB1dGlsICAgICA9IHJlcXVpcmUoMzcpO1xyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIHBhcnRpYWwgbWVzc2FnZSB0eXBlIGVuY29kZXIuXHJcbiAqIEBwYXJhbSB7Q29kZWdlbn0gZ2VuIENvZGVnZW4gaW5zdGFuY2VcclxuICogQHBhcmFtIHtGaWVsZH0gZmllbGQgUmVmbGVjdGVkIGZpZWxkXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBmaWVsZEluZGV4IEZpZWxkIGluZGV4XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWYgVmFyaWFibGUgcmVmZXJlbmNlXHJcbiAqIEByZXR1cm5zIHtDb2RlZ2VufSBDb2RlZ2VuIGluc3RhbmNlXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmZ1bmN0aW9uIGdlblR5cGVQYXJ0aWFsKGdlbiwgZmllbGQsIGZpZWxkSW5kZXgsIHJlZikge1xyXG4gICAgcmV0dXJuIGZpZWxkLnJlc29sdmVkVHlwZS5ncm91cFxyXG4gICAgICAgID8gZ2VuKFwidHlwZXNbJWldLmVuY29kZSglcyx3LnVpbnQzMiglaSkpLnVpbnQzMiglaSlcIiwgZmllbGRJbmRleCwgcmVmLCAoZmllbGQuaWQgPDwgMyB8IDMpID4+PiAwLCAoZmllbGQuaWQgPDwgMyB8IDQpID4+PiAwKVxyXG4gICAgICAgIDogZ2VuKFwidHlwZXNbJWldLmVuY29kZSglcyx3LnVpbnQzMiglaSkuZm9yaygpKS5sZGVsaW0oKVwiLCBmaWVsZEluZGV4LCByZWYsIChmaWVsZC5pZCA8PCAzIHwgMikgPj4+IDApO1xyXG59XHJcblxyXG4vKipcclxuICogR2VuZXJhdGVzIGFuIGVuY29kZXIgc3BlY2lmaWMgdG8gdGhlIHNwZWNpZmllZCBtZXNzYWdlIHR5cGUuXHJcbiAqIEBwYXJhbSB7VHlwZX0gbXR5cGUgTWVzc2FnZSB0eXBlXHJcbiAqIEByZXR1cm5zIHtDb2RlZ2VufSBDb2RlZ2VuIGluc3RhbmNlXHJcbiAqL1xyXG5mdW5jdGlvbiBlbmNvZGVyKG10eXBlKSB7XHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmV4cGVjdGVkLW11bHRpbGluZSwgYmxvY2stc2NvcGVkLXZhciwgbm8tcmVkZWNsYXJlICovXHJcbiAgICB2YXIgZ2VuID0gdXRpbC5jb2RlZ2VuKFtcIm1cIiwgXCJ3XCJdLCBtdHlwZS5uYW1lICsgXCIkZW5jb2RlXCIpXHJcbiAgICAoXCJpZighdylcIilcclxuICAgICAgICAoXCJ3PVdyaXRlci5jcmVhdGUoKVwiKTtcclxuXHJcbiAgICB2YXIgaSwgcmVmO1xyXG5cclxuICAgIC8vIFwid2hlbiBhIG1lc3NhZ2UgaXMgc2VyaWFsaXplZCBpdHMga25vd24gZmllbGRzIHNob3VsZCBiZSB3cml0dGVuIHNlcXVlbnRpYWxseSBieSBmaWVsZCBudW1iZXJcIlxyXG4gICAgdmFyIGZpZWxkcyA9IC8qIGluaXRpYWxpemVzICovIG10eXBlLmZpZWxkc0FycmF5LnNsaWNlKCkuc29ydCh1dGlsLmNvbXBhcmVGaWVsZHNCeUlkKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIHZhciBmaWVsZCAgICA9IGZpZWxkc1tpXS5yZXNvbHZlKCksXHJcbiAgICAgICAgICAgIGluZGV4ICAgID0gbXR5cGUuX2ZpZWxkc0FycmF5LmluZGV4T2YoZmllbGQpLFxyXG4gICAgICAgICAgICB0eXBlICAgICA9IGZpZWxkLnJlc29sdmVkVHlwZSBpbnN0YW5jZW9mIEVudW0gPyBcImludDMyXCIgOiBmaWVsZC50eXBlLFxyXG4gICAgICAgICAgICB3aXJlVHlwZSA9IHR5cGVzLmJhc2ljW3R5cGVdO1xyXG4gICAgICAgICAgICByZWYgICAgICA9IFwibVwiICsgdXRpbC5zYWZlUHJvcChmaWVsZC5uYW1lKTtcclxuXHJcbiAgICAgICAgLy8gTWFwIGZpZWxkc1xyXG4gICAgICAgIGlmIChmaWVsZC5tYXApIHtcclxuICAgICAgICAgICAgZ2VuXHJcbiAgICAoXCJpZiglcyE9bnVsbCYmbS5oYXNPd25Qcm9wZXJ0eSglaikpe1wiLCByZWYsIGZpZWxkLm5hbWUpIC8vICE9PSB1bmRlZmluZWQgJiYgIT09IG51bGxcclxuICAgICAgICAoXCJmb3IodmFyIGtzPU9iamVjdC5rZXlzKCVzKSxpPTA7aTxrcy5sZW5ndGg7KytpKXtcIiwgcmVmKVxyXG4gICAgICAgICAgICAoXCJ3LnVpbnQzMiglaSkuZm9yaygpLnVpbnQzMiglaSkuJXMoa3NbaV0pXCIsIChmaWVsZC5pZCA8PCAzIHwgMikgPj4+IDAsIDggfCB0eXBlcy5tYXBLZXlbZmllbGQua2V5VHlwZV0sIGZpZWxkLmtleVR5cGUpO1xyXG4gICAgICAgICAgICBpZiAod2lyZVR5cGUgPT09IHVuZGVmaW5lZCkgZ2VuXHJcbiAgICAgICAgICAgIChcInR5cGVzWyVpXS5lbmNvZGUoJXNba3NbaV1dLHcudWludDMyKDE4KS5mb3JrKCkpLmxkZWxpbSgpLmxkZWxpbSgpXCIsIGluZGV4LCByZWYpOyAvLyBjYW4ndCBiZSBncm91cHNcclxuICAgICAgICAgICAgZWxzZSBnZW5cclxuICAgICAgICAgICAgKFwiLnVpbnQzMiglaSkuJXMoJXNba3NbaV1dKS5sZGVsaW0oKVwiLCAxNiB8IHdpcmVUeXBlLCB0eXBlLCByZWYpO1xyXG4gICAgICAgICAgICBnZW5cclxuICAgICAgICAoXCJ9XCIpXHJcbiAgICAoXCJ9XCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVwZWF0ZWQgZmllbGRzXHJcbiAgICAgICAgfSBlbHNlIGlmIChmaWVsZC5yZXBlYXRlZCkgeyBnZW5cclxuICAgIChcImlmKCVzIT1udWxsJiYlcy5sZW5ndGgpe1wiLCByZWYsIHJlZik7IC8vICE9PSB1bmRlZmluZWQgJiYgIT09IG51bGxcclxuXHJcbiAgICAgICAgICAgIC8vIFBhY2tlZCByZXBlYXRlZFxyXG4gICAgICAgICAgICBpZiAoZmllbGQucGFja2VkICYmIHR5cGVzLnBhY2tlZFt0eXBlXSAhPT0gdW5kZWZpbmVkKSB7IGdlblxyXG5cclxuICAgICAgICAoXCJ3LnVpbnQzMiglaSkuZm9yaygpXCIsIChmaWVsZC5pZCA8PCAzIHwgMikgPj4+IDApXHJcbiAgICAgICAgKFwiZm9yKHZhciBpPTA7aTwlcy5sZW5ndGg7KytpKVwiLCByZWYpXHJcbiAgICAgICAgICAgIChcIncuJXMoJXNbaV0pXCIsIHR5cGUsIHJlZilcclxuICAgICAgICAoXCJ3LmxkZWxpbSgpXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gTm9uLXBhY2tlZFxyXG4gICAgICAgICAgICB9IGVsc2UgeyBnZW5cclxuXHJcbiAgICAgICAgKFwiZm9yKHZhciBpPTA7aTwlcy5sZW5ndGg7KytpKVwiLCByZWYpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHdpcmVUeXBlID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIGdlblR5cGVQYXJ0aWFsKGdlbiwgZmllbGQsIGluZGV4LCByZWYgKyBcIltpXVwiKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgZ2VuXHJcbiAgICAgICAgICAgIChcIncudWludDMyKCVpKS4lcyglc1tpXSlcIiwgKGZpZWxkLmlkIDw8IDMgfCB3aXJlVHlwZSkgPj4+IDAsIHR5cGUsIHJlZik7XHJcblxyXG4gICAgICAgICAgICB9IGdlblxyXG4gICAgKFwifVwiKTtcclxuXHJcbiAgICAgICAgLy8gTm9uLXJlcGVhdGVkXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGZpZWxkLm9wdGlvbmFsKSBnZW5cclxuICAgIChcImlmKCVzIT1udWxsJiZtLmhhc093blByb3BlcnR5KCVqKSlcIiwgcmVmLCBmaWVsZC5uYW1lKTsgLy8gIT09IHVuZGVmaW5lZCAmJiAhPT0gbnVsbFxyXG5cclxuICAgICAgICAgICAgaWYgKHdpcmVUeXBlID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgZ2VuVHlwZVBhcnRpYWwoZ2VuLCBmaWVsZCwgaW5kZXgsIHJlZik7XHJcbiAgICAgICAgICAgIGVsc2UgZ2VuXHJcbiAgICAgICAgKFwidy51aW50MzIoJWkpLiVzKCVzKVwiLCAoZmllbGQuaWQgPDwgMyB8IHdpcmVUeXBlKSA+Pj4gMCwgdHlwZSwgcmVmKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBnZW5cclxuICAgIChcInJldHVybiB3XCIpO1xyXG4gICAgLyogZXNsaW50LWVuYWJsZSBuby11bmV4cGVjdGVkLW11bHRpbGluZSwgYmxvY2stc2NvcGVkLXZhciwgbm8tcmVkZWNsYXJlICovXHJcbn1cclxufSx7XCIxNVwiOjE1LFwiMzZcIjozNixcIjM3XCI6Mzd9XSwxNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IEVudW07XHJcblxyXG4vLyBleHRlbmRzIFJlZmxlY3Rpb25PYmplY3RcclxudmFyIFJlZmxlY3Rpb25PYmplY3QgPSByZXF1aXJlKDI0KTtcclxuKChFbnVtLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUmVmbGVjdGlvbk9iamVjdC5wcm90b3R5cGUpKS5jb25zdHJ1Y3RvciA9IEVudW0pLmNsYXNzTmFtZSA9IFwiRW51bVwiO1xyXG5cclxudmFyIE5hbWVzcGFjZSA9IHJlcXVpcmUoMjMpLFxyXG4gICAgdXRpbCA9IHJlcXVpcmUoMzcpO1xyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgYSBuZXcgZW51bSBpbnN0YW5jZS5cclxuICogQGNsYXNzZGVzYyBSZWZsZWN0ZWQgZW51bS5cclxuICogQGV4dGVuZHMgUmVmbGVjdGlvbk9iamVjdFxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVW5pcXVlIG5hbWUgd2l0aGluIGl0cyBuYW1lc3BhY2VcclxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZyxudW1iZXI+fSBbdmFsdWVzXSBFbnVtIHZhbHVlcyBhcyBhbiBvYmplY3QsIGJ5IG5hbWVcclxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gW29wdGlvbnNdIERlY2xhcmVkIG9wdGlvbnNcclxuICogQHBhcmFtIHtzdHJpbmd9IFtjb21tZW50XSBUaGUgY29tbWVudCBmb3IgdGhpcyBlbnVtXHJcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsc3RyaW5nPn0gW2NvbW1lbnRzXSBUaGUgdmFsdWUgY29tbWVudHMgZm9yIHRoaXMgZW51bVxyXG4gKi9cclxuZnVuY3Rpb24gRW51bShuYW1lLCB2YWx1ZXMsIG9wdGlvbnMsIGNvbW1lbnQsIGNvbW1lbnRzKSB7XHJcbiAgICBSZWZsZWN0aW9uT2JqZWN0LmNhbGwodGhpcywgbmFtZSwgb3B0aW9ucyk7XHJcblxyXG4gICAgaWYgKHZhbHVlcyAmJiB0eXBlb2YgdmFsdWVzICE9PSBcIm9iamVjdFwiKVxyXG4gICAgICAgIHRocm93IFR5cGVFcnJvcihcInZhbHVlcyBtdXN0IGJlIGFuIG9iamVjdFwiKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEVudW0gdmFsdWVzIGJ5IGlkLlxyXG4gICAgICogQHR5cGUge09iamVjdC48bnVtYmVyLHN0cmluZz59XHJcbiAgICAgKi9cclxuICAgIHRoaXMudmFsdWVzQnlJZCA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW51bSB2YWx1ZXMgYnkgbmFtZS5cclxuICAgICAqIEB0eXBlIHtPYmplY3QuPHN0cmluZyxudW1iZXI+fVxyXG4gICAgICovXHJcbiAgICB0aGlzLnZhbHVlcyA9IE9iamVjdC5jcmVhdGUodGhpcy52YWx1ZXNCeUlkKTsgLy8gdG9KU09OLCBtYXJrZXJcclxuXHJcbiAgICAvKipcclxuICAgICAqIEVudW0gY29tbWVudCB0ZXh0LlxyXG4gICAgICogQHR5cGUge3N0cmluZ3xudWxsfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmNvbW1lbnQgPSBjb21tZW50O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVmFsdWUgY29tbWVudCB0ZXh0cywgaWYgYW55LlxyXG4gICAgICogQHR5cGUge09iamVjdC48c3RyaW5nLHN0cmluZz59XHJcbiAgICAgKi9cclxuICAgIHRoaXMuY29tbWVudHMgPSBjb21tZW50cyB8fCB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2VydmVkIHJhbmdlcywgaWYgYW55LlxyXG4gICAgICogQHR5cGUge0FycmF5LjxudW1iZXJbXXxzdHJpbmc+fVxyXG4gICAgICovXHJcbiAgICB0aGlzLnJlc2VydmVkID0gdW5kZWZpbmVkOyAvLyB0b0pTT05cclxuXHJcbiAgICAvLyBOb3RlIHRoYXQgdmFsdWVzIGluaGVyaXQgdmFsdWVzQnlJZCBvbiB0aGVpciBwcm90b3R5cGUgd2hpY2ggbWFrZXMgdGhlbSBhIFR5cGVTY3JpcHQtXHJcbiAgICAvLyBjb21wYXRpYmxlIGVudW0uIFRoaXMgaXMgdXNlZCBieSBwYnRzIHRvIHdyaXRlIGFjdHVhbCBlbnVtIGRlZmluaXRpb25zIHRoYXQgd29yayBmb3JcclxuICAgIC8vIHN0YXRpYyBhbmQgcmVmbGVjdGlvbiBjb2RlIGFsaWtlIGluc3RlYWQgb2YgZW1pdHRpbmcgZ2VuZXJpYyBvYmplY3QgZGVmaW5pdGlvbnMuXHJcblxyXG4gICAgaWYgKHZhbHVlcylcclxuICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXModmFsdWVzKSwgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlc1trZXlzW2ldXSA9PT0gXCJudW1iZXJcIikgLy8gdXNlIGZvcndhcmQgZW50cmllcyBvbmx5XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlc0J5SWRbIHRoaXMudmFsdWVzW2tleXNbaV1dID0gdmFsdWVzW2tleXNbaV1dIF0gPSBrZXlzW2ldO1xyXG59XHJcblxyXG4vKipcclxuICogRW51bSBkZXNjcmlwdG9yLlxyXG4gKiBAaW50ZXJmYWNlIElFbnVtXHJcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0LjxzdHJpbmcsbnVtYmVyPn0gdmFsdWVzIEVudW0gdmFsdWVzXHJcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0LjxzdHJpbmcsKj59IFtvcHRpb25zXSBFbnVtIG9wdGlvbnNcclxuICovXHJcblxyXG4vKipcclxuICogQ29uc3RydWN0cyBhbiBlbnVtIGZyb20gYW4gZW51bSBkZXNjcmlwdG9yLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBFbnVtIG5hbWVcclxuICogQHBhcmFtIHtJRW51bX0ganNvbiBFbnVtIGRlc2NyaXB0b3JcclxuICogQHJldHVybnMge0VudW19IENyZWF0ZWQgZW51bVxyXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGFyZ3VtZW50cyBhcmUgaW52YWxpZFxyXG4gKi9cclxuRW51bS5mcm9tSlNPTiA9IGZ1bmN0aW9uIGZyb21KU09OKG5hbWUsIGpzb24pIHtcclxuICAgIHZhciBlbm0gPSBuZXcgRW51bShuYW1lLCBqc29uLnZhbHVlcywganNvbi5vcHRpb25zLCBqc29uLmNvbW1lbnQsIGpzb24uY29tbWVudHMpO1xyXG4gICAgZW5tLnJlc2VydmVkID0ganNvbi5yZXNlcnZlZDtcclxuICAgIHJldHVybiBlbm07XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhpcyBlbnVtIHRvIGFuIGVudW0gZGVzY3JpcHRvci5cclxuICogQHBhcmFtIHtJVG9KU09OT3B0aW9uc30gW3RvSlNPTk9wdGlvbnNdIEpTT04gY29udmVyc2lvbiBvcHRpb25zXHJcbiAqIEByZXR1cm5zIHtJRW51bX0gRW51bSBkZXNjcmlwdG9yXHJcbiAqL1xyXG5FbnVtLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04odG9KU09OT3B0aW9ucykge1xyXG4gICAgdmFyIGtlZXBDb21tZW50cyA9IHRvSlNPTk9wdGlvbnMgPyBCb29sZWFuKHRvSlNPTk9wdGlvbnMua2VlcENvbW1lbnRzKSA6IGZhbHNlO1xyXG4gICAgcmV0dXJuIHV0aWwudG9PYmplY3QoW1xyXG4gICAgICAgIFwib3B0aW9uc1wiICAsIHRoaXMub3B0aW9ucyxcclxuICAgICAgICBcInZhbHVlc1wiICAgLCB0aGlzLnZhbHVlcyxcclxuICAgICAgICBcInJlc2VydmVkXCIgLCB0aGlzLnJlc2VydmVkICYmIHRoaXMucmVzZXJ2ZWQubGVuZ3RoID8gdGhpcy5yZXNlcnZlZCA6IHVuZGVmaW5lZCxcclxuICAgICAgICBcImNvbW1lbnRcIiAgLCBrZWVwQ29tbWVudHMgPyB0aGlzLmNvbW1lbnQgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgXCJjb21tZW50c1wiICwga2VlcENvbW1lbnRzID8gdGhpcy5jb21tZW50cyA6IHVuZGVmaW5lZFxyXG4gICAgXSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkcyBhIHZhbHVlIHRvIHRoaXMgZW51bS5cclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVmFsdWUgbmFtZVxyXG4gKiBAcGFyYW0ge251bWJlcn0gaWQgVmFsdWUgaWRcclxuICogQHBhcmFtIHtzdHJpbmd9IFtjb21tZW50XSBDb21tZW50LCBpZiBhbnlcclxuICogQHJldHVybnMge0VudW19IGB0aGlzYFxyXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGFyZ3VtZW50cyBhcmUgaW52YWxpZFxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlcmUgaXMgYWxyZWFkeSBhIHZhbHVlIHdpdGggdGhpcyBuYW1lIG9yIGlkXHJcbiAqL1xyXG5FbnVtLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBhZGQobmFtZSwgaWQsIGNvbW1lbnQpIHtcclxuICAgIC8vIHV0aWxpemVkIGJ5IHRoZSBwYXJzZXIgYnV0IG5vdCBieSAuZnJvbUpTT05cclxuXHJcbiAgICBpZiAoIXV0aWwuaXNTdHJpbmcobmFtZSkpXHJcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwibmFtZSBtdXN0IGJlIGEgc3RyaW5nXCIpO1xyXG5cclxuICAgIGlmICghdXRpbC5pc0ludGVnZXIoaWQpKVxyXG4gICAgICAgIHRocm93IFR5cGVFcnJvcihcImlkIG11c3QgYmUgYW4gaW50ZWdlclwiKTtcclxuXHJcbiAgICBpZiAodGhpcy52YWx1ZXNbbmFtZV0gIT09IHVuZGVmaW5lZClcclxuICAgICAgICB0aHJvdyBFcnJvcihcImR1cGxpY2F0ZSBuYW1lICdcIiArIG5hbWUgKyBcIicgaW4gXCIgKyB0aGlzKTtcclxuXHJcbiAgICBpZiAodGhpcy5pc1Jlc2VydmVkSWQoaWQpKVxyXG4gICAgICAgIHRocm93IEVycm9yKFwiaWQgXCIgKyBpZCArIFwiIGlzIHJlc2VydmVkIGluIFwiICsgdGhpcyk7XHJcblxyXG4gICAgaWYgKHRoaXMuaXNSZXNlcnZlZE5hbWUobmFtZSkpXHJcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJuYW1lICdcIiArIG5hbWUgKyBcIicgaXMgcmVzZXJ2ZWQgaW4gXCIgKyB0aGlzKTtcclxuXHJcbiAgICBpZiAodGhpcy52YWx1ZXNCeUlkW2lkXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKCEodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5hbGxvd19hbGlhcykpXHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiZHVwbGljYXRlIGlkIFwiICsgaWQgKyBcIiBpbiBcIiArIHRoaXMpO1xyXG4gICAgICAgIHRoaXMudmFsdWVzW25hbWVdID0gaWQ7XHJcbiAgICB9IGVsc2VcclxuICAgICAgICB0aGlzLnZhbHVlc0J5SWRbdGhpcy52YWx1ZXNbbmFtZV0gPSBpZF0gPSBuYW1lO1xyXG5cclxuICAgIHRoaXMuY29tbWVudHNbbmFtZV0gPSBjb21tZW50IHx8IG51bGw7XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGEgdmFsdWUgZnJvbSB0aGlzIGVudW1cclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVmFsdWUgbmFtZVxyXG4gKiBAcmV0dXJucyB7RW51bX0gYHRoaXNgXHJcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYXJndW1lbnRzIGFyZSBpbnZhbGlkXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiBgbmFtZWAgaXMgbm90IGEgbmFtZSBvZiB0aGlzIGVudW1cclxuICovXHJcbkVudW0ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XHJcblxyXG4gICAgaWYgKCF1dGlsLmlzU3RyaW5nKG5hbWUpKVxyXG4gICAgICAgIHRocm93IFR5cGVFcnJvcihcIm5hbWUgbXVzdCBiZSBhIHN0cmluZ1wiKTtcclxuXHJcbiAgICB2YXIgdmFsID0gdGhpcy52YWx1ZXNbbmFtZV07XHJcbiAgICBpZiAodmFsID09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJuYW1lICdcIiArIG5hbWUgKyBcIicgZG9lcyBub3QgZXhpc3QgaW4gXCIgKyB0aGlzKTtcclxuXHJcbiAgICBkZWxldGUgdGhpcy52YWx1ZXNCeUlkW3ZhbF07XHJcbiAgICBkZWxldGUgdGhpcy52YWx1ZXNbbmFtZV07XHJcbiAgICBkZWxldGUgdGhpcy5jb21tZW50c1tuYW1lXTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGUgc3BlY2lmaWVkIGlkIGlzIHJlc2VydmVkLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gaWQgSWQgdG8gdGVzdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHJlc2VydmVkLCBvdGhlcndpc2UgYGZhbHNlYFxyXG4gKi9cclxuRW51bS5wcm90b3R5cGUuaXNSZXNlcnZlZElkID0gZnVuY3Rpb24gaXNSZXNlcnZlZElkKGlkKSB7XHJcbiAgICByZXR1cm4gTmFtZXNwYWNlLmlzUmVzZXJ2ZWRJZCh0aGlzLnJlc2VydmVkLCBpZCk7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhlIHNwZWNpZmllZCBuYW1lIGlzIHJlc2VydmVkLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBOYW1lIHRvIHRlc3RcclxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiByZXNlcnZlZCwgb3RoZXJ3aXNlIGBmYWxzZWBcclxuICovXHJcbkVudW0ucHJvdG90eXBlLmlzUmVzZXJ2ZWROYW1lID0gZnVuY3Rpb24gaXNSZXNlcnZlZE5hbWUobmFtZSkge1xyXG4gICAgcmV0dXJuIE5hbWVzcGFjZS5pc1Jlc2VydmVkTmFtZSh0aGlzLnJlc2VydmVkLCBuYW1lKTtcclxufTtcclxuXHJcbn0se1wiMjNcIjoyMyxcIjI0XCI6MjQsXCIzN1wiOjM3fV0sMTY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBGaWVsZDtcclxuXHJcbi8vIGV4dGVuZHMgUmVmbGVjdGlvbk9iamVjdFxyXG52YXIgUmVmbGVjdGlvbk9iamVjdCA9IHJlcXVpcmUoMjQpO1xyXG4oKEZpZWxkLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUmVmbGVjdGlvbk9iamVjdC5wcm90b3R5cGUpKS5jb25zdHJ1Y3RvciA9IEZpZWxkKS5jbGFzc05hbWUgPSBcIkZpZWxkXCI7XHJcblxyXG52YXIgRW51bSAgPSByZXF1aXJlKDE1KSxcclxuICAgIHR5cGVzID0gcmVxdWlyZSgzNiksXHJcbiAgICB1dGlsICA9IHJlcXVpcmUoMzcpO1xyXG5cclxudmFyIFR5cGU7IC8vIGN5Y2xpY1xyXG5cclxudmFyIHJ1bGVSZSA9IC9ecmVxdWlyZWR8b3B0aW9uYWx8cmVwZWF0ZWQkLztcclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IG1lc3NhZ2UgZmllbGQgaW5zdGFuY2UuIE5vdGUgdGhhdCB7QGxpbmsgTWFwRmllbGR8bWFwIGZpZWxkc30gaGF2ZSB0aGVpciBvd24gY2xhc3MuXHJcbiAqIEBuYW1lIEZpZWxkXHJcbiAqIEBjbGFzc2Rlc2MgUmVmbGVjdGVkIG1lc3NhZ2UgZmllbGQuXHJcbiAqIEBleHRlbmRzIEZpZWxkQmFzZVxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVW5pcXVlIG5hbWUgd2l0aGluIGl0cyBuYW1lc3BhY2VcclxuICogQHBhcmFtIHtudW1iZXJ9IGlkIFVuaXF1ZSBpZCB3aXRoaW4gaXRzIG5hbWVzcGFjZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBWYWx1ZSB0eXBlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfE9iamVjdC48c3RyaW5nLCo+fSBbcnVsZT1cIm9wdGlvbmFsXCJdIEZpZWxkIHJ1bGVcclxuICogQHBhcmFtIHtzdHJpbmd8T2JqZWN0LjxzdHJpbmcsKj59IFtleHRlbmRdIEV4dGVuZGVkIHR5cGUgaWYgZGlmZmVyZW50IGZyb20gcGFyZW50XHJcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IFtvcHRpb25zXSBEZWNsYXJlZCBvcHRpb25zXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgYSBmaWVsZCBmcm9tIGEgZmllbGQgZGVzY3JpcHRvci5cclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgRmllbGQgbmFtZVxyXG4gKiBAcGFyYW0ge0lGaWVsZH0ganNvbiBGaWVsZCBkZXNjcmlwdG9yXHJcbiAqIEByZXR1cm5zIHtGaWVsZH0gQ3JlYXRlZCBmaWVsZFxyXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGFyZ3VtZW50cyBhcmUgaW52YWxpZFxyXG4gKi9cclxuRmllbGQuZnJvbUpTT04gPSBmdW5jdGlvbiBmcm9tSlNPTihuYW1lLCBqc29uKSB7XHJcbiAgICByZXR1cm4gbmV3IEZpZWxkKG5hbWUsIGpzb24uaWQsIGpzb24udHlwZSwganNvbi5ydWxlLCBqc29uLmV4dGVuZCwganNvbi5vcHRpb25zLCBqc29uLmNvbW1lbnQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE5vdCBhbiBhY3R1YWwgY29uc3RydWN0b3IuIFVzZSB7QGxpbmsgRmllbGR9IGluc3RlYWQuXHJcbiAqIEBjbGFzc2Rlc2MgQmFzZSBjbGFzcyBvZiBhbGwgcmVmbGVjdGVkIG1lc3NhZ2UgZmllbGRzLiBUaGlzIGlzIG5vdCBhbiBhY3R1YWwgY2xhc3MgYnV0IGhlcmUgZm9yIHRoZSBzYWtlIG9mIGhhdmluZyBjb25zaXN0ZW50IHR5cGUgZGVmaW5pdGlvbnMuXHJcbiAqIEBleHBvcnRzIEZpZWxkQmFzZVxyXG4gKiBAZXh0ZW5kcyBSZWZsZWN0aW9uT2JqZWN0XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBVbmlxdWUgbmFtZSB3aXRoaW4gaXRzIG5hbWVzcGFjZVxyXG4gKiBAcGFyYW0ge251bWJlcn0gaWQgVW5pcXVlIGlkIHdpdGhpbiBpdHMgbmFtZXNwYWNlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFZhbHVlIHR5cGVcclxuICogQHBhcmFtIHtzdHJpbmd8T2JqZWN0LjxzdHJpbmcsKj59IFtydWxlPVwib3B0aW9uYWxcIl0gRmllbGQgcnVsZVxyXG4gKiBAcGFyYW0ge3N0cmluZ3xPYmplY3QuPHN0cmluZywqPn0gW2V4dGVuZF0gRXh0ZW5kZWQgdHlwZSBpZiBkaWZmZXJlbnQgZnJvbSBwYXJlbnRcclxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gW29wdGlvbnNdIERlY2xhcmVkIG9wdGlvbnNcclxuICogQHBhcmFtIHtzdHJpbmd9IFtjb21tZW50XSBDb21tZW50IGFzc29jaWF0ZWQgd2l0aCB0aGlzIGZpZWxkXHJcbiAqL1xyXG5mdW5jdGlvbiBGaWVsZChuYW1lLCBpZCwgdHlwZSwgcnVsZSwgZXh0ZW5kLCBvcHRpb25zLCBjb21tZW50KSB7XHJcblxyXG4gICAgaWYgKHV0aWwuaXNPYmplY3QocnVsZSkpIHtcclxuICAgICAgICBjb21tZW50ID0gZXh0ZW5kO1xyXG4gICAgICAgIG9wdGlvbnMgPSBydWxlO1xyXG4gICAgICAgIHJ1bGUgPSBleHRlbmQgPSB1bmRlZmluZWQ7XHJcbiAgICB9IGVsc2UgaWYgKHV0aWwuaXNPYmplY3QoZXh0ZW5kKSkge1xyXG4gICAgICAgIGNvbW1lbnQgPSBvcHRpb25zO1xyXG4gICAgICAgIG9wdGlvbnMgPSBleHRlbmQ7XHJcbiAgICAgICAgZXh0ZW5kID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIFJlZmxlY3Rpb25PYmplY3QuY2FsbCh0aGlzLCBuYW1lLCBvcHRpb25zKTtcclxuXHJcbiAgICBpZiAoIXV0aWwuaXNJbnRlZ2VyKGlkKSB8fCBpZCA8IDApXHJcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiaWQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyXCIpO1xyXG5cclxuICAgIGlmICghdXRpbC5pc1N0cmluZyh0eXBlKSlcclxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJ0eXBlIG11c3QgYmUgYSBzdHJpbmdcIik7XHJcblxyXG4gICAgaWYgKHJ1bGUgIT09IHVuZGVmaW5lZCAmJiAhcnVsZVJlLnRlc3QocnVsZSA9IHJ1bGUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpKSlcclxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJydWxlIG11c3QgYmUgYSBzdHJpbmcgcnVsZVwiKTtcclxuXHJcbiAgICBpZiAoZXh0ZW5kICE9PSB1bmRlZmluZWQgJiYgIXV0aWwuaXNTdHJpbmcoZXh0ZW5kKSlcclxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJleHRlbmQgbXVzdCBiZSBhIHN0cmluZ1wiKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpZWxkIHJ1bGUsIGlmIGFueS5cclxuICAgICAqIEB0eXBlIHtzdHJpbmd8dW5kZWZpbmVkfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnJ1bGUgPSBydWxlICYmIHJ1bGUgIT09IFwib3B0aW9uYWxcIiA/IHJ1bGUgOiB1bmRlZmluZWQ7IC8vIHRvSlNPTlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmllbGQgdHlwZS5cclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHRoaXMudHlwZSA9IHR5cGU7IC8vIHRvSlNPTlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVW5pcXVlIGZpZWxkIGlkLlxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5pZCA9IGlkOyAvLyB0b0pTT04sIG1hcmtlclxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXh0ZW5kZWQgdHlwZSBpZiBkaWZmZXJlbnQgZnJvbSBwYXJlbnQuXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfHVuZGVmaW5lZH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5leHRlbmQgPSBleHRlbmQgfHwgdW5kZWZpbmVkOyAvLyB0b0pTT05cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgdGhpcyBmaWVsZCBpcyByZXF1aXJlZC5cclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICB0aGlzLnJlcXVpcmVkID0gcnVsZSA9PT0gXCJyZXF1aXJlZFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciB0aGlzIGZpZWxkIGlzIG9wdGlvbmFsLlxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHRoaXMub3B0aW9uYWwgPSAhdGhpcy5yZXF1aXJlZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgdGhpcyBmaWVsZCBpcyByZXBlYXRlZC5cclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICB0aGlzLnJlcGVhdGVkID0gcnVsZSA9PT0gXCJyZXBlYXRlZFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciB0aGlzIGZpZWxkIGlzIGEgbWFwIG9yIG5vdC5cclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICB0aGlzLm1hcCA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWVzc2FnZSB0aGlzIGZpZWxkIGJlbG9uZ3MgdG8uXHJcbiAgICAgKiBAdHlwZSB7VHlwZXxudWxsfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm1lc3NhZ2UgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogT25lT2YgdGhpcyBmaWVsZCBiZWxvbmdzIHRvLCBpZiBhbnksXHJcbiAgICAgKiBAdHlwZSB7T25lT2Z8bnVsbH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5wYXJ0T2YgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGZpZWxkIHR5cGUncyBkZWZhdWx0IHZhbHVlLlxyXG4gICAgICogQHR5cGUgeyp9XHJcbiAgICAgKi9cclxuICAgIHRoaXMudHlwZURlZmF1bHQgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGZpZWxkJ3MgZGVmYXVsdCB2YWx1ZSBvbiBwcm90b3R5cGVzLlxyXG4gICAgICogQHR5cGUgeyp9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZGVmYXVsdFZhbHVlID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgdGhpcyBmaWVsZCdzIHZhbHVlIHNob3VsZCBiZSB0cmVhdGVkIGFzIGEgbG9uZy5cclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICB0aGlzLmxvbmcgPSB1dGlsLkxvbmcgPyB0eXBlcy5sb25nW3R5cGVdICE9PSB1bmRlZmluZWQgOiAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgdGhpcyBmaWVsZCdzIHZhbHVlIGlzIGEgYnVmZmVyLlxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHRoaXMuYnl0ZXMgPSB0eXBlID09PSBcImJ5dGVzXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNvbHZlZCB0eXBlIGlmIG5vdCBhIGJhc2ljIHR5cGUuXHJcbiAgICAgKiBAdHlwZSB7VHlwZXxFbnVtfG51bGx9XHJcbiAgICAgKi9cclxuICAgIHRoaXMucmVzb2x2ZWRUeXBlID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNpc3Rlci1maWVsZCB3aXRoaW4gdGhlIGV4dGVuZGVkIHR5cGUgaWYgYSBkZWNsYXJpbmcgZXh0ZW5zaW9uIGZpZWxkLlxyXG4gICAgICogQHR5cGUge0ZpZWxkfG51bGx9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZXh0ZW5zaW9uRmllbGQgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2lzdGVyLWZpZWxkIHdpdGhpbiB0aGUgZGVjbGFyaW5nIG5hbWVzcGFjZSBpZiBhbiBleHRlbmRlZCBmaWVsZC5cclxuICAgICAqIEB0eXBlIHtGaWVsZHxudWxsfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmRlY2xhcmluZ0ZpZWxkID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEludGVybmFsbHkgcmVtZW1iZXJzIHdoZXRoZXIgdGhpcyBmaWVsZCBpcyBwYWNrZWQuXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbnxudWxsfVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgdGhpcy5fcGFja2VkID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbW1lbnQgZm9yIHRoaXMgZmllbGQuXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfG51bGx9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuY29tbWVudCA9IGNvbW1lbnQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhpcyBmaWVsZCBpcyBwYWNrZWQuIE9ubHkgcmVsZXZhbnQgd2hlbiByZXBlYXRlZCBhbmQgd29ya2luZyB3aXRoIHByb3RvMi5cclxuICogQG5hbWUgRmllbGQjcGFja2VkXHJcbiAqIEB0eXBlIHtib29sZWFufVxyXG4gKiBAcmVhZG9ubHlcclxuICovXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShGaWVsZC5wcm90b3R5cGUsIFwicGFja2VkXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gZGVmYXVsdHMgdG8gcGFja2VkPXRydWUgaWYgbm90IGV4cGxpY2l0eSBzZXQgdG8gZmFsc2VcclxuICAgICAgICBpZiAodGhpcy5fcGFja2VkID09PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9wYWNrZWQgPSB0aGlzLmdldE9wdGlvbihcInBhY2tlZFwiKSAhPT0gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhY2tlZDtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICogQG92ZXJyaWRlXHJcbiAqL1xyXG5GaWVsZC5wcm90b3R5cGUuc2V0T3B0aW9uID0gZnVuY3Rpb24gc2V0T3B0aW9uKG5hbWUsIHZhbHVlLCBpZk5vdFNldCkge1xyXG4gICAgaWYgKG5hbWUgPT09IFwicGFja2VkXCIpIC8vIGNsZWFyIGNhY2hlZCBiZWZvcmUgc2V0dGluZ1xyXG4gICAgICAgIHRoaXMuX3BhY2tlZCA9IG51bGw7XHJcbiAgICByZXR1cm4gUmVmbGVjdGlvbk9iamVjdC5wcm90b3R5cGUuc2V0T3B0aW9uLmNhbGwodGhpcywgbmFtZSwgdmFsdWUsIGlmTm90U2V0KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBGaWVsZCBkZXNjcmlwdG9yLlxyXG4gKiBAaW50ZXJmYWNlIElGaWVsZFxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3J1bGU9XCJvcHRpb25hbFwiXSBGaWVsZCBydWxlXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0eXBlIEZpZWxkIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IGlkIEZpZWxkIGlkXHJcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0LjxzdHJpbmcsKj59IFtvcHRpb25zXSBGaWVsZCBvcHRpb25zXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEV4dGVuc2lvbiBmaWVsZCBkZXNjcmlwdG9yLlxyXG4gKiBAaW50ZXJmYWNlIElFeHRlbnNpb25GaWVsZFxyXG4gKiBAZXh0ZW5kcyBJRmllbGRcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGV4dGVuZCBFeHRlbmRlZCB0eXBlXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoaXMgZmllbGQgdG8gYSBmaWVsZCBkZXNjcmlwdG9yLlxyXG4gKiBAcGFyYW0ge0lUb0pTT05PcHRpb25zfSBbdG9KU09OT3B0aW9uc10gSlNPTiBjb252ZXJzaW9uIG9wdGlvbnNcclxuICogQHJldHVybnMge0lGaWVsZH0gRmllbGQgZGVzY3JpcHRvclxyXG4gKi9cclxuRmllbGQucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTih0b0pTT05PcHRpb25zKSB7XHJcbiAgICB2YXIga2VlcENvbW1lbnRzID0gdG9KU09OT3B0aW9ucyA/IEJvb2xlYW4odG9KU09OT3B0aW9ucy5rZWVwQ29tbWVudHMpIDogZmFsc2U7XHJcbiAgICByZXR1cm4gdXRpbC50b09iamVjdChbXHJcbiAgICAgICAgXCJydWxlXCIgICAgLCB0aGlzLnJ1bGUgIT09IFwib3B0aW9uYWxcIiAmJiB0aGlzLnJ1bGUgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgIFwidHlwZVwiICAgICwgdGhpcy50eXBlLFxyXG4gICAgICAgIFwiaWRcIiAgICAgICwgdGhpcy5pZCxcclxuICAgICAgICBcImV4dGVuZFwiICAsIHRoaXMuZXh0ZW5kLFxyXG4gICAgICAgIFwib3B0aW9uc1wiICwgdGhpcy5vcHRpb25zLFxyXG4gICAgICAgIFwiY29tbWVudFwiICwga2VlcENvbW1lbnRzID8gdGhpcy5jb21tZW50IDogdW5kZWZpbmVkXHJcbiAgICBdKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXNvbHZlcyB0aGlzIGZpZWxkJ3MgdHlwZSByZWZlcmVuY2VzLlxyXG4gKiBAcmV0dXJucyB7RmllbGR9IGB0aGlzYFxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgYW55IHJlZmVyZW5jZSBjYW5ub3QgYmUgcmVzb2x2ZWRcclxuICovXHJcbkZpZWxkLnByb3RvdHlwZS5yZXNvbHZlID0gZnVuY3Rpb24gcmVzb2x2ZSgpIHtcclxuXHJcbiAgICBpZiAodGhpcy5yZXNvbHZlZClcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICBpZiAoKHRoaXMudHlwZURlZmF1bHQgPSB0eXBlcy5kZWZhdWx0c1t0aGlzLnR5cGVdKSA9PT0gdW5kZWZpbmVkKSB7IC8vIGlmIG5vdCBhIGJhc2ljIHR5cGUsIHJlc29sdmUgaXRcclxuICAgICAgICB0aGlzLnJlc29sdmVkVHlwZSA9ICh0aGlzLmRlY2xhcmluZ0ZpZWxkID8gdGhpcy5kZWNsYXJpbmdGaWVsZC5wYXJlbnQgOiB0aGlzLnBhcmVudCkubG9va3VwVHlwZU9yRW51bSh0aGlzLnR5cGUpO1xyXG4gICAgICAgIGlmICh0aGlzLnJlc29sdmVkVHlwZSBpbnN0YW5jZW9mIFR5cGUpXHJcbiAgICAgICAgICAgIHRoaXMudHlwZURlZmF1bHQgPSBudWxsO1xyXG4gICAgICAgIGVsc2UgLy8gaW5zdGFuY2VvZiBFbnVtXHJcbiAgICAgICAgICAgIHRoaXMudHlwZURlZmF1bHQgPSB0aGlzLnJlc29sdmVkVHlwZS52YWx1ZXNbT2JqZWN0LmtleXModGhpcy5yZXNvbHZlZFR5cGUudmFsdWVzKVswXV07IC8vIGZpcnN0IGRlZmluZWRcclxuICAgIH1cclxuXHJcbiAgICAvLyB1c2UgZXhwbGljaXRseSBzZXQgZGVmYXVsdCB2YWx1ZSBpZiBwcmVzZW50XHJcbiAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9uc1tcImRlZmF1bHRcIl0gIT0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMudHlwZURlZmF1bHQgPSB0aGlzLm9wdGlvbnNbXCJkZWZhdWx0XCJdO1xyXG4gICAgICAgIGlmICh0aGlzLnJlc29sdmVkVHlwZSBpbnN0YW5jZW9mIEVudW0gJiYgdHlwZW9mIHRoaXMudHlwZURlZmF1bHQgPT09IFwic3RyaW5nXCIpXHJcbiAgICAgICAgICAgIHRoaXMudHlwZURlZmF1bHQgPSB0aGlzLnJlc29sdmVkVHlwZS52YWx1ZXNbdGhpcy50eXBlRGVmYXVsdF07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmVtb3ZlIHVubmVjZXNzYXJ5IG9wdGlvbnNcclxuICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnBhY2tlZCA9PT0gdHJ1ZSB8fCB0aGlzLm9wdGlvbnMucGFja2VkICE9PSB1bmRlZmluZWQgJiYgdGhpcy5yZXNvbHZlZFR5cGUgJiYgISh0aGlzLnJlc29sdmVkVHlwZSBpbnN0YW5jZW9mIEVudW0pKVxyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5vcHRpb25zLnBhY2tlZDtcclxuICAgICAgICBpZiAoIU9iamVjdC5rZXlzKHRoaXMub3B0aW9ucykubGVuZ3RoKVxyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29udmVydCB0byBpbnRlcm5hbCBkYXRhIHR5cGUgaWYgbmVjZXNzc2FyeVxyXG4gICAgaWYgKHRoaXMubG9uZykge1xyXG4gICAgICAgIHRoaXMudHlwZURlZmF1bHQgPSB1dGlsLkxvbmcuZnJvbU51bWJlcih0aGlzLnR5cGVEZWZhdWx0LCB0aGlzLnR5cGUuY2hhckF0KDApID09PSBcInVcIik7XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXHJcbiAgICAgICAgaWYgKE9iamVjdC5mcmVlemUpXHJcbiAgICAgICAgICAgIE9iamVjdC5mcmVlemUodGhpcy50eXBlRGVmYXVsdCk7IC8vIGxvbmcgaW5zdGFuY2VzIGFyZSBtZWFudCB0byBiZSBpbW11dGFibGUgYW55d2F5IChpLmUuIHVzZSBzbWFsbCBpbnQgY2FjaGUgdGhhdCBldmVuIHJlcXVpcmVzIGl0KVxyXG5cclxuICAgIH0gZWxzZSBpZiAodGhpcy5ieXRlcyAmJiB0eXBlb2YgdGhpcy50eXBlRGVmYXVsdCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIHZhciBidWY7XHJcbiAgICAgICAgaWYgKHV0aWwuYmFzZTY0LnRlc3QodGhpcy50eXBlRGVmYXVsdCkpXHJcbiAgICAgICAgICAgIHV0aWwuYmFzZTY0LmRlY29kZSh0aGlzLnR5cGVEZWZhdWx0LCBidWYgPSB1dGlsLm5ld0J1ZmZlcih1dGlsLmJhc2U2NC5sZW5ndGgodGhpcy50eXBlRGVmYXVsdCkpLCAwKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHV0aWwudXRmOC53cml0ZSh0aGlzLnR5cGVEZWZhdWx0LCBidWYgPSB1dGlsLm5ld0J1ZmZlcih1dGlsLnV0ZjgubGVuZ3RoKHRoaXMudHlwZURlZmF1bHQpKSwgMCk7XHJcbiAgICAgICAgdGhpcy50eXBlRGVmYXVsdCA9IGJ1ZjtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0YWtlIHNwZWNpYWwgY2FyZSBvZiBtYXBzIGFuZCByZXBlYXRlZCBmaWVsZHNcclxuICAgIGlmICh0aGlzLm1hcClcclxuICAgICAgICB0aGlzLmRlZmF1bHRWYWx1ZSA9IHV0aWwuZW1wdHlPYmplY3Q7XHJcbiAgICBlbHNlIGlmICh0aGlzLnJlcGVhdGVkKVxyXG4gICAgICAgIHRoaXMuZGVmYXVsdFZhbHVlID0gdXRpbC5lbXB0eUFycmF5O1xyXG4gICAgZWxzZVxyXG4gICAgICAgIHRoaXMuZGVmYXVsdFZhbHVlID0gdGhpcy50eXBlRGVmYXVsdDtcclxuXHJcbiAgICAvLyBlbnN1cmUgcHJvcGVyIHZhbHVlIG9uIHByb3RvdHlwZVxyXG4gICAgaWYgKHRoaXMucGFyZW50IGluc3RhbmNlb2YgVHlwZSlcclxuICAgICAgICB0aGlzLnBhcmVudC5jdG9yLnByb3RvdHlwZVt0aGlzLm5hbWVdID0gdGhpcy5kZWZhdWx0VmFsdWU7XHJcblxyXG4gICAgcmV0dXJuIFJlZmxlY3Rpb25PYmplY3QucHJvdG90eXBlLnJlc29sdmUuY2FsbCh0aGlzKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEZWNvcmF0b3IgZnVuY3Rpb24gYXMgcmV0dXJuZWQgYnkge0BsaW5rIEZpZWxkLmR9IGFuZCB7QGxpbmsgTWFwRmllbGQuZH0gKFR5cGVTY3JpcHQpLlxyXG4gKiBAdHlwZWRlZiBGaWVsZERlY29yYXRvclxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm90b3R5cGUgVGFyZ2V0IHByb3RvdHlwZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lIEZpZWxkIG5hbWVcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblxyXG4vKipcclxuICogRmllbGQgZGVjb3JhdG9yIChUeXBlU2NyaXB0KS5cclxuICogQG5hbWUgRmllbGQuZFxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IGZpZWxkSWQgRmllbGQgaWRcclxuICogQHBhcmFtIHtcImRvdWJsZVwifFwiZmxvYXRcInxcImludDMyXCJ8XCJ1aW50MzJcInxcInNpbnQzMlwifFwiZml4ZWQzMlwifFwic2ZpeGVkMzJcInxcImludDY0XCJ8XCJ1aW50NjRcInxcInNpbnQ2NFwifFwiZml4ZWQ2NFwifFwic2ZpeGVkNjRcInxcInN0cmluZ1wifFwiYm9vbFwifFwiYnl0ZXNcInxPYmplY3R9IGZpZWxkVHlwZSBGaWVsZCB0eXBlXHJcbiAqIEBwYXJhbSB7XCJvcHRpb25hbFwifFwicmVxdWlyZWRcInxcInJlcGVhdGVkXCJ9IFtmaWVsZFJ1bGU9XCJvcHRpb25hbFwiXSBGaWVsZCBydWxlXHJcbiAqIEBwYXJhbSB7VH0gW2RlZmF1bHRWYWx1ZV0gRGVmYXVsdCB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7RmllbGREZWNvcmF0b3J9IERlY29yYXRvciBmdW5jdGlvblxyXG4gKiBAdGVtcGxhdGUgVCBleHRlbmRzIG51bWJlciB8IG51bWJlcltdIHwgTG9uZyB8IExvbmdbXSB8IHN0cmluZyB8IHN0cmluZ1tdIHwgYm9vbGVhbiB8IGJvb2xlYW5bXSB8IFVpbnQ4QXJyYXkgfCBVaW50OEFycmF5W10gfCBCdWZmZXIgfCBCdWZmZXJbXVxyXG4gKi9cclxuRmllbGQuZCA9IGZ1bmN0aW9uIGRlY29yYXRlRmllbGQoZmllbGRJZCwgZmllbGRUeXBlLCBmaWVsZFJ1bGUsIGRlZmF1bHRWYWx1ZSkge1xyXG5cclxuICAgIC8vIHN1Ym1lc3NhZ2U6IGRlY29yYXRlIHRoZSBzdWJtZXNzYWdlIGFuZCB1c2UgaXRzIG5hbWUgYXMgdGhlIHR5cGVcclxuICAgIGlmICh0eXBlb2YgZmllbGRUeXBlID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZmllbGRUeXBlID0gdXRpbC5kZWNvcmF0ZVR5cGUoZmllbGRUeXBlKS5uYW1lO1xyXG5cclxuICAgIC8vIGVudW0gcmVmZXJlbmNlOiBjcmVhdGUgYSByZWZsZWN0ZWQgY29weSBvZiB0aGUgZW51bSBhbmQga2VlcCByZXVzZWluZyBpdFxyXG4gICAgZWxzZSBpZiAoZmllbGRUeXBlICYmIHR5cGVvZiBmaWVsZFR5cGUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgZmllbGRUeXBlID0gdXRpbC5kZWNvcmF0ZUVudW0oZmllbGRUeXBlKS5uYW1lO1xyXG5cclxuICAgIHJldHVybiBmdW5jdGlvbiBmaWVsZERlY29yYXRvcihwcm90b3R5cGUsIGZpZWxkTmFtZSkge1xyXG4gICAgICAgIHV0aWwuZGVjb3JhdGVUeXBlKHByb3RvdHlwZS5jb25zdHJ1Y3RvcilcclxuICAgICAgICAgICAgLmFkZChuZXcgRmllbGQoZmllbGROYW1lLCBmaWVsZElkLCBmaWVsZFR5cGUsIGZpZWxkUnVsZSwgeyBcImRlZmF1bHRcIjogZGVmYXVsdFZhbHVlIH0pKTtcclxuICAgIH07XHJcbn07XHJcblxyXG4vKipcclxuICogRmllbGQgZGVjb3JhdG9yIChUeXBlU2NyaXB0KS5cclxuICogQG5hbWUgRmllbGQuZFxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IGZpZWxkSWQgRmllbGQgaWRcclxuICogQHBhcmFtIHtDb25zdHJ1Y3RvcjxUPnxzdHJpbmd9IGZpZWxkVHlwZSBGaWVsZCB0eXBlXHJcbiAqIEBwYXJhbSB7XCJvcHRpb25hbFwifFwicmVxdWlyZWRcInxcInJlcGVhdGVkXCJ9IFtmaWVsZFJ1bGU9XCJvcHRpb25hbFwiXSBGaWVsZCBydWxlXHJcbiAqIEByZXR1cm5zIHtGaWVsZERlY29yYXRvcn0gRGVjb3JhdG9yIGZ1bmN0aW9uXHJcbiAqIEB0ZW1wbGF0ZSBUIGV4dGVuZHMgTWVzc2FnZTxUPlxyXG4gKiBAdmFyaWF0aW9uIDJcclxuICovXHJcbi8vIGxpa2UgRmllbGQuZCBidXQgd2l0aG91dCBhIGRlZmF1bHQgdmFsdWVcclxuXHJcbkZpZWxkLl9jb25maWd1cmUgPSBmdW5jdGlvbiBjb25maWd1cmUoVHlwZV8pIHtcclxuICAgIFR5cGUgPSBUeXBlXztcclxufTtcclxuXHJcbn0se1wiMTVcIjoxNSxcIjI0XCI6MjQsXCIzNlwiOjM2LFwiMzdcIjozN31dLDE3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBwcm90b2J1ZiA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgxOCk7XHJcblxyXG5wcm90b2J1Zi5idWlsZCA9IFwibGlnaHRcIjtcclxuXHJcbi8qKlxyXG4gKiBBIG5vZGUtc3R5bGUgY2FsbGJhY2sgYXMgdXNlZCBieSB7QGxpbmsgbG9hZH0gYW5kIHtAbGluayBSb290I2xvYWR9LlxyXG4gKiBAdHlwZWRlZiBMb2FkQ2FsbGJhY2tcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKiBAcGFyYW0ge0Vycm9yfG51bGx9IGVycm9yIEVycm9yLCBpZiBhbnksIG90aGVyd2lzZSBgbnVsbGBcclxuICogQHBhcmFtIHtSb290fSBbcm9vdF0gUm9vdCwgaWYgdGhlcmUgaGFzbid0IGJlZW4gYW4gZXJyb3JcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblxyXG4vKipcclxuICogTG9hZHMgb25lIG9yIG11bHRpcGxlIC5wcm90byBvciBwcmVwcm9jZXNzZWQgLmpzb24gZmlsZXMgaW50byBhIGNvbW1vbiByb290IG5hbWVzcGFjZSBhbmQgY2FsbHMgdGhlIGNhbGxiYWNrLlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gZmlsZW5hbWUgT25lIG9yIG11bHRpcGxlIGZpbGVzIHRvIGxvYWRcclxuICogQHBhcmFtIHtSb290fSByb290IFJvb3QgbmFtZXNwYWNlLCBkZWZhdWx0cyB0byBjcmVhdGUgYSBuZXcgb25lIGlmIG9taXR0ZWQuXHJcbiAqIEBwYXJhbSB7TG9hZENhbGxiYWNrfSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvblxyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKiBAc2VlIHtAbGluayBSb290I2xvYWR9XHJcbiAqL1xyXG5mdW5jdGlvbiBsb2FkKGZpbGVuYW1lLCByb290LCBjYWxsYmFjaykge1xyXG4gICAgaWYgKHR5cGVvZiByb290ID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICBjYWxsYmFjayA9IHJvb3Q7XHJcbiAgICAgICAgcm9vdCA9IG5ldyBwcm90b2J1Zi5Sb290KCk7XHJcbiAgICB9IGVsc2UgaWYgKCFyb290KVxyXG4gICAgICAgIHJvb3QgPSBuZXcgcHJvdG9idWYuUm9vdCgpO1xyXG4gICAgcmV0dXJuIHJvb3QubG9hZChmaWxlbmFtZSwgY2FsbGJhY2spO1xyXG59XHJcblxyXG4vKipcclxuICogTG9hZHMgb25lIG9yIG11bHRpcGxlIC5wcm90byBvciBwcmVwcm9jZXNzZWQgLmpzb24gZmlsZXMgaW50byBhIGNvbW1vbiByb290IG5hbWVzcGFjZSBhbmQgY2FsbHMgdGhlIGNhbGxiYWNrLlxyXG4gKiBAbmFtZSBsb2FkXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gZmlsZW5hbWUgT25lIG9yIG11bHRpcGxlIGZpbGVzIHRvIGxvYWRcclxuICogQHBhcmFtIHtMb2FkQ2FsbGJhY2t9IGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uXHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqIEBzZWUge0BsaW5rIFJvb3QjbG9hZH1cclxuICogQHZhcmlhdGlvbiAyXHJcbiAqL1xyXG4vLyBmdW5jdGlvbiBsb2FkKGZpbGVuYW1lOnN0cmluZywgY2FsbGJhY2s6TG9hZENhbGxiYWNrKTp1bmRlZmluZWRcclxuXHJcbi8qKlxyXG4gKiBMb2FkcyBvbmUgb3IgbXVsdGlwbGUgLnByb3RvIG9yIHByZXByb2Nlc3NlZCAuanNvbiBmaWxlcyBpbnRvIGEgY29tbW9uIHJvb3QgbmFtZXNwYWNlIGFuZCByZXR1cm5zIGEgcHJvbWlzZS5cclxuICogQG5hbWUgbG9hZFxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IGZpbGVuYW1lIE9uZSBvciBtdWx0aXBsZSBmaWxlcyB0byBsb2FkXHJcbiAqIEBwYXJhbSB7Um9vdH0gW3Jvb3RdIFJvb3QgbmFtZXNwYWNlLCBkZWZhdWx0cyB0byBjcmVhdGUgYSBuZXcgb25lIGlmIG9taXR0ZWQuXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPFJvb3Q+fSBQcm9taXNlXHJcbiAqIEBzZWUge0BsaW5rIFJvb3QjbG9hZH1cclxuICogQHZhcmlhdGlvbiAzXHJcbiAqL1xyXG4vLyBmdW5jdGlvbiBsb2FkKGZpbGVuYW1lOnN0cmluZywgW3Jvb3Q6Um9vdF0pOlByb21pc2U8Um9vdD5cclxuXHJcbnByb3RvYnVmLmxvYWQgPSBsb2FkO1xyXG5cclxuLyoqXHJcbiAqIFN5bmNocm9ub3VzbHkgbG9hZHMgb25lIG9yIG11bHRpcGxlIC5wcm90byBvciBwcmVwcm9jZXNzZWQgLmpzb24gZmlsZXMgaW50byBhIGNvbW1vbiByb290IG5hbWVzcGFjZSAobm9kZSBvbmx5KS5cclxuICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IGZpbGVuYW1lIE9uZSBvciBtdWx0aXBsZSBmaWxlcyB0byBsb2FkXHJcbiAqIEBwYXJhbSB7Um9vdH0gW3Jvb3RdIFJvb3QgbmFtZXNwYWNlLCBkZWZhdWx0cyB0byBjcmVhdGUgYSBuZXcgb25lIGlmIG9taXR0ZWQuXHJcbiAqIEByZXR1cm5zIHtSb290fSBSb290IG5hbWVzcGFjZVxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgc3luY2hyb25vdXMgZmV0Y2hpbmcgaXMgbm90IHN1cHBvcnRlZCAoaS5lLiBpbiBicm93c2Vycykgb3IgaWYgYSBmaWxlJ3Mgc3ludGF4IGlzIGludmFsaWRcclxuICogQHNlZSB7QGxpbmsgUm9vdCNsb2FkU3luY31cclxuICovXHJcbmZ1bmN0aW9uIGxvYWRTeW5jKGZpbGVuYW1lLCByb290KSB7XHJcbiAgICBpZiAoIXJvb3QpXHJcbiAgICAgICAgcm9vdCA9IG5ldyBwcm90b2J1Zi5Sb290KCk7XHJcbiAgICByZXR1cm4gcm9vdC5sb2FkU3luYyhmaWxlbmFtZSk7XHJcbn1cclxuXHJcbnByb3RvYnVmLmxvYWRTeW5jID0gbG9hZFN5bmM7XHJcblxyXG4vLyBTZXJpYWxpemF0aW9uXHJcbnByb3RvYnVmLmVuY29kZXIgICAgICAgICAgPSByZXF1aXJlKDE0KTtcclxucHJvdG9idWYuZGVjb2RlciAgICAgICAgICA9IHJlcXVpcmUoMTMpO1xyXG5wcm90b2J1Zi52ZXJpZmllciAgICAgICAgID0gcmVxdWlyZSg0MCk7XHJcbnByb3RvYnVmLmNvbnZlcnRlciAgICAgICAgPSByZXF1aXJlKDEyKTtcclxuXHJcbi8vIFJlZmxlY3Rpb25cclxucHJvdG9idWYuUmVmbGVjdGlvbk9iamVjdCA9IHJlcXVpcmUoMjQpO1xyXG5wcm90b2J1Zi5OYW1lc3BhY2UgICAgICAgID0gcmVxdWlyZSgyMyk7XHJcbnByb3RvYnVmLlJvb3QgICAgICAgICAgICAgPSByZXF1aXJlKDI5KTtcclxucHJvdG9idWYuRW51bSAgICAgICAgICAgICA9IHJlcXVpcmUoMTUpO1xyXG5wcm90b2J1Zi5UeXBlICAgICAgICAgICAgID0gcmVxdWlyZSgzNSk7XHJcbnByb3RvYnVmLkZpZWxkICAgICAgICAgICAgPSByZXF1aXJlKDE2KTtcclxucHJvdG9idWYuT25lT2YgICAgICAgICAgICA9IHJlcXVpcmUoMjUpO1xyXG5wcm90b2J1Zi5NYXBGaWVsZCAgICAgICAgID0gcmVxdWlyZSgyMCk7XHJcbnByb3RvYnVmLlNlcnZpY2UgICAgICAgICAgPSByZXF1aXJlKDMzKTtcclxucHJvdG9idWYuTWV0aG9kICAgICAgICAgICA9IHJlcXVpcmUoMjIpO1xyXG5cclxuLy8gUnVudGltZVxyXG5wcm90b2J1Zi5NZXNzYWdlICAgICAgICAgID0gcmVxdWlyZSgyMSk7XHJcbnByb3RvYnVmLndyYXBwZXJzICAgICAgICAgPSByZXF1aXJlKDQxKTtcclxuXHJcbi8vIFV0aWxpdHlcclxucHJvdG9idWYudHlwZXMgICAgICAgICAgICA9IHJlcXVpcmUoMzYpO1xyXG5wcm90b2J1Zi51dGlsICAgICAgICAgICAgID0gcmVxdWlyZSgzNyk7XHJcblxyXG4vLyBDb25maWd1cmUgcmVmbGVjdGlvblxyXG5wcm90b2J1Zi5SZWZsZWN0aW9uT2JqZWN0Ll9jb25maWd1cmUocHJvdG9idWYuUm9vdCk7XHJcbnByb3RvYnVmLk5hbWVzcGFjZS5fY29uZmlndXJlKHByb3RvYnVmLlR5cGUsIHByb3RvYnVmLlNlcnZpY2UpO1xyXG5wcm90b2J1Zi5Sb290Ll9jb25maWd1cmUocHJvdG9idWYuVHlwZSk7XHJcbnByb3RvYnVmLkZpZWxkLl9jb25maWd1cmUocHJvdG9idWYuVHlwZSk7XHJcblxyXG59LHtcIjEyXCI6MTIsXCIxM1wiOjEzLFwiMTRcIjoxNCxcIjE1XCI6MTUsXCIxNlwiOjE2LFwiMThcIjoxOCxcIjIwXCI6MjAsXCIyMVwiOjIxLFwiMjJcIjoyMixcIjIzXCI6MjMsXCIyNFwiOjI0LFwiMjVcIjoyNSxcIjI5XCI6MjksXCIzM1wiOjMzLFwiMzVcIjozNSxcIjM2XCI6MzYsXCIzN1wiOjM3LFwiNDBcIjo0MCxcIjQxXCI6NDF9XSwxODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG52YXIgcHJvdG9idWYgPSBleHBvcnRzO1xyXG5cclxuLyoqXHJcbiAqIEJ1aWxkIHR5cGUsIG9uZSBvZiBgXCJmdWxsXCJgLCBgXCJsaWdodFwiYCBvciBgXCJtaW5pbWFsXCJgLlxyXG4gKiBAbmFtZSBidWlsZFxyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKiBAY29uc3RcclxuICovXHJcbnByb3RvYnVmLmJ1aWxkID0gXCJtaW5pbWFsXCI7XHJcblxyXG4vLyBTZXJpYWxpemF0aW9uXHJcbnByb3RvYnVmLldyaXRlciAgICAgICA9IHJlcXVpcmUoNDIpO1xyXG5wcm90b2J1Zi5CdWZmZXJXcml0ZXIgPSByZXF1aXJlKDQzKTtcclxucHJvdG9idWYuUmVhZGVyICAgICAgID0gcmVxdWlyZSgyNyk7XHJcbnByb3RvYnVmLkJ1ZmZlclJlYWRlciA9IHJlcXVpcmUoMjgpO1xyXG5cclxuLy8gVXRpbGl0eVxyXG5wcm90b2J1Zi51dGlsICAgICAgICAgPSByZXF1aXJlKDM5KTtcclxucHJvdG9idWYucnBjICAgICAgICAgID0gcmVxdWlyZSgzMSk7XHJcbnByb3RvYnVmLnJvb3RzICAgICAgICA9IHJlcXVpcmUoMzApO1xyXG5wcm90b2J1Zi5jb25maWd1cmUgICAgPSBjb25maWd1cmU7XHJcblxyXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4vKipcclxuICogUmVjb25maWd1cmVzIHRoZSBsaWJyYXJ5IGFjY29yZGluZyB0byB0aGUgZW52aXJvbm1lbnQuXHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5mdW5jdGlvbiBjb25maWd1cmUoKSB7XHJcbiAgICBwcm90b2J1Zi5SZWFkZXIuX2NvbmZpZ3VyZShwcm90b2J1Zi5CdWZmZXJSZWFkZXIpO1xyXG4gICAgcHJvdG9idWYudXRpbC5fY29uZmlndXJlKCk7XHJcbn1cclxuXHJcbi8vIENvbmZpZ3VyZSBzZXJpYWxpemF0aW9uXHJcbnByb3RvYnVmLldyaXRlci5fY29uZmlndXJlKHByb3RvYnVmLkJ1ZmZlcldyaXRlcik7XHJcbmNvbmZpZ3VyZSgpO1xyXG5cclxufSx7XCIyN1wiOjI3LFwiMjhcIjoyOCxcIjMwXCI6MzAsXCIzMVwiOjMxLFwiMzlcIjozOSxcIjQyXCI6NDIsXCI0M1wiOjQzfV0sMTk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxudmFyIHByb3RvYnVmID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKDE3KTtcclxuXHJcbnByb3RvYnVmLmJ1aWxkID0gXCJmdWxsXCI7XHJcblxyXG4vLyBQYXJzZXJcclxucHJvdG9idWYudG9rZW5pemUgICAgICAgICA9IHJlcXVpcmUoMzQpO1xyXG5wcm90b2J1Zi5wYXJzZSAgICAgICAgICAgID0gcmVxdWlyZSgyNik7XHJcbnByb3RvYnVmLmNvbW1vbiAgICAgICAgICAgPSByZXF1aXJlKDExKTtcclxuXHJcbi8vIENvbmZpZ3VyZSBwYXJzZXJcclxucHJvdG9idWYuUm9vdC5fY29uZmlndXJlKHByb3RvYnVmLlR5cGUsIHByb3RvYnVmLnBhcnNlLCBwcm90b2J1Zi5jb21tb24pO1xyXG5cclxufSx7XCIxMVwiOjExLFwiMTdcIjoxNyxcIjI2XCI6MjYsXCIzNFwiOjM0fV0sMjA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBNYXBGaWVsZDtcclxuXHJcbi8vIGV4dGVuZHMgRmllbGRcclxudmFyIEZpZWxkID0gcmVxdWlyZSgxNik7XHJcbigoTWFwRmllbGQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShGaWVsZC5wcm90b3R5cGUpKS5jb25zdHJ1Y3RvciA9IE1hcEZpZWxkKS5jbGFzc05hbWUgPSBcIk1hcEZpZWxkXCI7XHJcblxyXG52YXIgdHlwZXMgICA9IHJlcXVpcmUoMzYpLFxyXG4gICAgdXRpbCAgICA9IHJlcXVpcmUoMzcpO1xyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgYSBuZXcgbWFwIGZpZWxkIGluc3RhbmNlLlxyXG4gKiBAY2xhc3NkZXNjIFJlZmxlY3RlZCBtYXAgZmllbGQuXHJcbiAqIEBleHRlbmRzIEZpZWxkQmFzZVxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVW5pcXVlIG5hbWUgd2l0aGluIGl0cyBuYW1lc3BhY2VcclxuICogQHBhcmFtIHtudW1iZXJ9IGlkIFVuaXF1ZSBpZCB3aXRoaW4gaXRzIG5hbWVzcGFjZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5VHlwZSBLZXkgdHlwZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBWYWx1ZSB0eXBlXHJcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IFtvcHRpb25zXSBEZWNsYXJlZCBvcHRpb25zXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29tbWVudF0gQ29tbWVudCBhc3NvY2lhdGVkIHdpdGggdGhpcyBmaWVsZFxyXG4gKi9cclxuZnVuY3Rpb24gTWFwRmllbGQobmFtZSwgaWQsIGtleVR5cGUsIHR5cGUsIG9wdGlvbnMsIGNvbW1lbnQpIHtcclxuICAgIEZpZWxkLmNhbGwodGhpcywgbmFtZSwgaWQsIHR5cGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBvcHRpb25zLCBjb21tZW50KTtcclxuXHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgIGlmICghdXRpbC5pc1N0cmluZyhrZXlUeXBlKSlcclxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJrZXlUeXBlIG11c3QgYmUgYSBzdHJpbmdcIik7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBLZXkgdHlwZS5cclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHRoaXMua2V5VHlwZSA9IGtleVR5cGU7IC8vIHRvSlNPTiwgbWFya2VyXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNvbHZlZCBrZXkgdHlwZSBpZiBub3QgYSBiYXNpYyB0eXBlLlxyXG4gICAgICogQHR5cGUge1JlZmxlY3Rpb25PYmplY3R8bnVsbH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5yZXNvbHZlZEtleVR5cGUgPSBudWxsO1xyXG5cclxuICAgIC8vIE92ZXJyaWRlcyBGaWVsZCNtYXBcclxuICAgIHRoaXMubWFwID0gdHJ1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIE1hcCBmaWVsZCBkZXNjcmlwdG9yLlxyXG4gKiBAaW50ZXJmYWNlIElNYXBGaWVsZFxyXG4gKiBAZXh0ZW5kcyB7SUZpZWxkfVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30ga2V5VHlwZSBLZXkgdHlwZVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBFeHRlbnNpb24gbWFwIGZpZWxkIGRlc2NyaXB0b3IuXHJcbiAqIEBpbnRlcmZhY2UgSUV4dGVuc2lvbk1hcEZpZWxkXHJcbiAqIEBleHRlbmRzIElNYXBGaWVsZFxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZXh0ZW5kIEV4dGVuZGVkIHR5cGVcclxuICovXHJcblxyXG4vKipcclxuICogQ29uc3RydWN0cyBhIG1hcCBmaWVsZCBmcm9tIGEgbWFwIGZpZWxkIGRlc2NyaXB0b3IuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIEZpZWxkIG5hbWVcclxuICogQHBhcmFtIHtJTWFwRmllbGR9IGpzb24gTWFwIGZpZWxkIGRlc2NyaXB0b3JcclxuICogQHJldHVybnMge01hcEZpZWxkfSBDcmVhdGVkIG1hcCBmaWVsZFxyXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGFyZ3VtZW50cyBhcmUgaW52YWxpZFxyXG4gKi9cclxuTWFwRmllbGQuZnJvbUpTT04gPSBmdW5jdGlvbiBmcm9tSlNPTihuYW1lLCBqc29uKSB7XHJcbiAgICByZXR1cm4gbmV3IE1hcEZpZWxkKG5hbWUsIGpzb24uaWQsIGpzb24ua2V5VHlwZSwganNvbi50eXBlLCBqc29uLm9wdGlvbnMsIGpzb24uY29tbWVudCk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhpcyBtYXAgZmllbGQgdG8gYSBtYXAgZmllbGQgZGVzY3JpcHRvci5cclxuICogQHBhcmFtIHtJVG9KU09OT3B0aW9uc30gW3RvSlNPTk9wdGlvbnNdIEpTT04gY29udmVyc2lvbiBvcHRpb25zXHJcbiAqIEByZXR1cm5zIHtJTWFwRmllbGR9IE1hcCBmaWVsZCBkZXNjcmlwdG9yXHJcbiAqL1xyXG5NYXBGaWVsZC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OKHRvSlNPTk9wdGlvbnMpIHtcclxuICAgIHZhciBrZWVwQ29tbWVudHMgPSB0b0pTT05PcHRpb25zID8gQm9vbGVhbih0b0pTT05PcHRpb25zLmtlZXBDb21tZW50cykgOiBmYWxzZTtcclxuICAgIHJldHVybiB1dGlsLnRvT2JqZWN0KFtcclxuICAgICAgICBcImtleVR5cGVcIiAsIHRoaXMua2V5VHlwZSxcclxuICAgICAgICBcInR5cGVcIiAgICAsIHRoaXMudHlwZSxcclxuICAgICAgICBcImlkXCIgICAgICAsIHRoaXMuaWQsXHJcbiAgICAgICAgXCJleHRlbmRcIiAgLCB0aGlzLmV4dGVuZCxcclxuICAgICAgICBcIm9wdGlvbnNcIiAsIHRoaXMub3B0aW9ucyxcclxuICAgICAgICBcImNvbW1lbnRcIiAsIGtlZXBDb21tZW50cyA/IHRoaXMuY29tbWVudCA6IHVuZGVmaW5lZFxyXG4gICAgXSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQG92ZXJyaWRlXHJcbiAqL1xyXG5NYXBGaWVsZC5wcm90b3R5cGUucmVzb2x2ZSA9IGZ1bmN0aW9uIHJlc29sdmUoKSB7XHJcbiAgICBpZiAodGhpcy5yZXNvbHZlZClcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICAvLyBCZXNpZGVzIGEgdmFsdWUgdHlwZSwgbWFwIGZpZWxkcyBoYXZlIGEga2V5IHR5cGUgdGhhdCBtYXkgYmUgXCJhbnkgc2NhbGFyIHR5cGUgZXhjZXB0IGZvciBmbG9hdGluZyBwb2ludCB0eXBlcyBhbmQgYnl0ZXNcIlxyXG4gICAgaWYgKHR5cGVzLm1hcEtleVt0aGlzLmtleVR5cGVdID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJpbnZhbGlkIGtleSB0eXBlOiBcIiArIHRoaXMua2V5VHlwZSk7XHJcblxyXG4gICAgcmV0dXJuIEZpZWxkLnByb3RvdHlwZS5yZXNvbHZlLmNhbGwodGhpcyk7XHJcbn07XHJcblxyXG4vKipcclxuICogTWFwIGZpZWxkIGRlY29yYXRvciAoVHlwZVNjcmlwdCkuXHJcbiAqIEBuYW1lIE1hcEZpZWxkLmRcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBmaWVsZElkIEZpZWxkIGlkXHJcbiAqIEBwYXJhbSB7XCJpbnQzMlwifFwidWludDMyXCJ8XCJzaW50MzJcInxcImZpeGVkMzJcInxcInNmaXhlZDMyXCJ8XCJpbnQ2NFwifFwidWludDY0XCJ8XCJzaW50NjRcInxcImZpeGVkNjRcInxcInNmaXhlZDY0XCJ8XCJib29sXCJ8XCJzdHJpbmdcIn0gZmllbGRLZXlUeXBlIEZpZWxkIGtleSB0eXBlXHJcbiAqIEBwYXJhbSB7XCJkb3VibGVcInxcImZsb2F0XCJ8XCJpbnQzMlwifFwidWludDMyXCJ8XCJzaW50MzJcInxcImZpeGVkMzJcInxcInNmaXhlZDMyXCJ8XCJpbnQ2NFwifFwidWludDY0XCJ8XCJzaW50NjRcInxcImZpeGVkNjRcInxcInNmaXhlZDY0XCJ8XCJib29sXCJ8XCJzdHJpbmdcInxcImJ5dGVzXCJ8T2JqZWN0fENvbnN0cnVjdG9yPHt9Pn0gZmllbGRWYWx1ZVR5cGUgRmllbGQgdmFsdWUgdHlwZVxyXG4gKiBAcmV0dXJucyB7RmllbGREZWNvcmF0b3J9IERlY29yYXRvciBmdW5jdGlvblxyXG4gKiBAdGVtcGxhdGUgVCBleHRlbmRzIHsgW2tleTogc3RyaW5nXTogbnVtYmVyIHwgTG9uZyB8IHN0cmluZyB8IGJvb2xlYW4gfCBVaW50OEFycmF5IHwgQnVmZmVyIHwgbnVtYmVyW10gfCBNZXNzYWdlPHt9PiB9XHJcbiAqL1xyXG5NYXBGaWVsZC5kID0gZnVuY3Rpb24gZGVjb3JhdGVNYXBGaWVsZChmaWVsZElkLCBmaWVsZEtleVR5cGUsIGZpZWxkVmFsdWVUeXBlKSB7XHJcblxyXG4gICAgLy8gc3VibWVzc2FnZSB2YWx1ZTogZGVjb3JhdGUgdGhlIHN1Ym1lc3NhZ2UgYW5kIHVzZSBpdHMgbmFtZSBhcyB0aGUgdHlwZVxyXG4gICAgaWYgKHR5cGVvZiBmaWVsZFZhbHVlVHlwZSA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZpZWxkVmFsdWVUeXBlID0gdXRpbC5kZWNvcmF0ZVR5cGUoZmllbGRWYWx1ZVR5cGUpLm5hbWU7XHJcblxyXG4gICAgLy8gZW51bSByZWZlcmVuY2UgdmFsdWU6IGNyZWF0ZSBhIHJlZmxlY3RlZCBjb3B5IG9mIHRoZSBlbnVtIGFuZCBrZWVwIHJldXNlaW5nIGl0XHJcbiAgICBlbHNlIGlmIChmaWVsZFZhbHVlVHlwZSAmJiB0eXBlb2YgZmllbGRWYWx1ZVR5cGUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgZmllbGRWYWx1ZVR5cGUgPSB1dGlsLmRlY29yYXRlRW51bShmaWVsZFZhbHVlVHlwZSkubmFtZTtcclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gbWFwRmllbGREZWNvcmF0b3IocHJvdG90eXBlLCBmaWVsZE5hbWUpIHtcclxuICAgICAgICB1dGlsLmRlY29yYXRlVHlwZShwcm90b3R5cGUuY29uc3RydWN0b3IpXHJcbiAgICAgICAgICAgIC5hZGQobmV3IE1hcEZpZWxkKGZpZWxkTmFtZSwgZmllbGRJZCwgZmllbGRLZXlUeXBlLCBmaWVsZFZhbHVlVHlwZSkpO1xyXG4gICAgfTtcclxufTtcclxuXHJcbn0se1wiMTZcIjoxNixcIjM2XCI6MzYsXCIzN1wiOjM3fV0sMjE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBNZXNzYWdlO1xyXG5cclxudmFyIHV0aWwgPSByZXF1aXJlKDM5KTtcclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IG1lc3NhZ2UgaW5zdGFuY2UuXHJcbiAqIEBjbGFzc2Rlc2MgQWJzdHJhY3QgcnVudGltZSBtZXNzYWdlLlxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtQcm9wZXJ0aWVzPFQ+fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcclxuICogQHRlbXBsYXRlIFQgZXh0ZW5kcyBvYmplY3RcclxuICovXHJcbmZ1bmN0aW9uIE1lc3NhZ2UocHJvcGVydGllcykge1xyXG4gICAgLy8gbm90IHVzZWQgaW50ZXJuYWxseVxyXG4gICAgaWYgKHByb3BlcnRpZXMpXHJcbiAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgIHRoaXNba2V5c1tpXV0gPSBwcm9wZXJ0aWVzW2tleXNbaV1dO1xyXG59XHJcblxyXG4vKipcclxuICogUmVmZXJlbmNlIHRvIHRoZSByZWZsZWN0ZWQgdHlwZS5cclxuICogQG5hbWUgTWVzc2FnZS4kdHlwZVxyXG4gKiBAdHlwZSB7VHlwZX1cclxuICogQHJlYWRvbmx5XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFJlZmVyZW5jZSB0byB0aGUgcmVmbGVjdGVkIHR5cGUuXHJcbiAqIEBuYW1lIE1lc3NhZ2UjJHR5cGVcclxuICogQHR5cGUge1R5cGV9XHJcbiAqIEByZWFkb25seVxyXG4gKi9cclxuXHJcbi8qZXNsaW50LWRpc2FibGUgdmFsaWQtanNkb2MqL1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcgbWVzc2FnZSBvZiB0aGlzIHR5cGUgdXNpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxyXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcclxuICogQHJldHVybnMge01lc3NhZ2U8VD59IE1lc3NhZ2UgaW5zdGFuY2VcclxuICogQHRlbXBsYXRlIFQgZXh0ZW5kcyBNZXNzYWdlPFQ+XHJcbiAqIEB0aGlzIENvbnN0cnVjdG9yPFQ+XHJcbiAqL1xyXG5NZXNzYWdlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwcm9wZXJ0aWVzKSB7XHJcbiAgICByZXR1cm4gdGhpcy4kdHlwZS5jcmVhdGUocHJvcGVydGllcyk7XHJcbn07XHJcblxyXG4vKipcclxuICogRW5jb2RlcyBhIG1lc3NhZ2Ugb2YgdGhpcyB0eXBlLlxyXG4gKiBAcGFyYW0ge1R8T2JqZWN0LjxzdHJpbmcsKj59IG1lc3NhZ2UgTWVzc2FnZSB0byBlbmNvZGVcclxuICogQHBhcmFtIHtXcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byB1c2VcclxuICogQHJldHVybnMge1dyaXRlcn0gV3JpdGVyXHJcbiAqIEB0ZW1wbGF0ZSBUIGV4dGVuZHMgTWVzc2FnZTxUPlxyXG4gKiBAdGhpcyBDb25zdHJ1Y3RvcjxUPlxyXG4gKi9cclxuTWVzc2FnZS5lbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUobWVzc2FnZSwgd3JpdGVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy4kdHlwZS5lbmNvZGUobWVzc2FnZSwgd3JpdGVyKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFbmNvZGVzIGEgbWVzc2FnZSBvZiB0aGlzIHR5cGUgcHJlY2VlZGVkIGJ5IGl0cyBsZW5ndGggYXMgYSB2YXJpbnQuXHJcbiAqIEBwYXJhbSB7VHxPYmplY3QuPHN0cmluZywqPn0gbWVzc2FnZSBNZXNzYWdlIHRvIGVuY29kZVxyXG4gKiBAcGFyYW0ge1dyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIHVzZVxyXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBXcml0ZXJcclxuICogQHRlbXBsYXRlIFQgZXh0ZW5kcyBNZXNzYWdlPFQ+XHJcbiAqIEB0aGlzIENvbnN0cnVjdG9yPFQ+XHJcbiAqL1xyXG5NZXNzYWdlLmVuY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZChtZXNzYWdlLCB3cml0ZXIpIHtcclxuICAgIHJldHVybiB0aGlzLiR0eXBlLmVuY29kZURlbGltaXRlZChtZXNzYWdlLCB3cml0ZXIpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERlY29kZXMgYSBtZXNzYWdlIG9mIHRoaXMgdHlwZS5cclxuICogQG5hbWUgTWVzc2FnZS5kZWNvZGVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7UmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZVxyXG4gKiBAcmV0dXJucyB7VH0gRGVjb2RlZCBtZXNzYWdlXHJcbiAqIEB0ZW1wbGF0ZSBUIGV4dGVuZHMgTWVzc2FnZTxUPlxyXG4gKiBAdGhpcyBDb25zdHJ1Y3RvcjxUPlxyXG4gKi9cclxuTWVzc2FnZS5kZWNvZGUgPSBmdW5jdGlvbiBkZWNvZGUocmVhZGVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy4kdHlwZS5kZWNvZGUocmVhZGVyKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEZWNvZGVzIGEgbWVzc2FnZSBvZiB0aGlzIHR5cGUgcHJlY2VlZGVkIGJ5IGl0cyBsZW5ndGggYXMgYSB2YXJpbnQuXHJcbiAqIEBuYW1lIE1lc3NhZ2UuZGVjb2RlRGVsaW1pdGVkXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge1JlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGVcclxuICogQHJldHVybnMge1R9IERlY29kZWQgbWVzc2FnZVxyXG4gKiBAdGVtcGxhdGUgVCBleHRlbmRzIE1lc3NhZ2U8VD5cclxuICogQHRoaXMgQ29uc3RydWN0b3I8VD5cclxuICovXHJcbk1lc3NhZ2UuZGVjb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkKHJlYWRlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuJHR5cGUuZGVjb2RlRGVsaW1pdGVkKHJlYWRlcik7XHJcbn07XHJcblxyXG4vKipcclxuICogVmVyaWZpZXMgYSBtZXNzYWdlIG9mIHRoaXMgdHlwZS5cclxuICogQG5hbWUgTWVzc2FnZS52ZXJpZnlcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG1lc3NhZ2UgUGxhaW4gb2JqZWN0IHRvIHZlcmlmeVxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IGBudWxsYCBpZiB2YWxpZCwgb3RoZXJ3aXNlIHRoZSByZWFzb24gd2h5IGl0IGlzIG5vdFxyXG4gKi9cclxuTWVzc2FnZS52ZXJpZnkgPSBmdW5jdGlvbiB2ZXJpZnkobWVzc2FnZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuJHR5cGUudmVyaWZ5KG1lc3NhZ2UpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcgbWVzc2FnZSBvZiB0aGlzIHR5cGUgZnJvbSBhIHBsYWluIG9iamVjdC4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gdGhlaXIgcmVzcGVjdGl2ZSBpbnRlcm5hbCB0eXBlcy5cclxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gb2JqZWN0IFBsYWluIG9iamVjdFxyXG4gKiBAcmV0dXJucyB7VH0gTWVzc2FnZSBpbnN0YW5jZVxyXG4gKiBAdGVtcGxhdGUgVCBleHRlbmRzIE1lc3NhZ2U8VD5cclxuICogQHRoaXMgQ29uc3RydWN0b3I8VD5cclxuICovXHJcbk1lc3NhZ2UuZnJvbU9iamVjdCA9IGZ1bmN0aW9uIGZyb21PYmplY3Qob2JqZWN0KSB7XHJcbiAgICByZXR1cm4gdGhpcy4kdHlwZS5mcm9tT2JqZWN0KG9iamVjdCk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGEgbWVzc2FnZSBvZiB0aGlzIHR5cGUuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIG90aGVyIHR5cGVzIGlmIHNwZWNpZmllZC5cclxuICogQHBhcmFtIHtUfSBtZXNzYWdlIE1lc3NhZ2UgaW5zdGFuY2VcclxuICogQHBhcmFtIHtJQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcclxuICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBQbGFpbiBvYmplY3RcclxuICogQHRlbXBsYXRlIFQgZXh0ZW5kcyBNZXNzYWdlPFQ+XHJcbiAqIEB0aGlzIENvbnN0cnVjdG9yPFQ+XHJcbiAqL1xyXG5NZXNzYWdlLnRvT2JqZWN0ID0gZnVuY3Rpb24gdG9PYmplY3QobWVzc2FnZSwgb3B0aW9ucykge1xyXG4gICAgcmV0dXJuIHRoaXMuJHR5cGUudG9PYmplY3QobWVzc2FnZSwgb3B0aW9ucyk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhpcyBtZXNzYWdlIHRvIEpTT04uXHJcbiAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gSlNPTiBvYmplY3RcclxuICovXHJcbk1lc3NhZ2UucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcclxuICAgIHJldHVybiB0aGlzLiR0eXBlLnRvT2JqZWN0KHRoaXMsIHV0aWwudG9KU09OT3B0aW9ucyk7XHJcbn07XHJcblxyXG4vKmVzbGludC1lbmFibGUgdmFsaWQtanNkb2MqL1xyXG59LHtcIjM5XCI6Mzl9XSwyMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IE1ldGhvZDtcclxuXHJcbi8vIGV4dGVuZHMgUmVmbGVjdGlvbk9iamVjdFxyXG52YXIgUmVmbGVjdGlvbk9iamVjdCA9IHJlcXVpcmUoMjQpO1xyXG4oKE1ldGhvZC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFJlZmxlY3Rpb25PYmplY3QucHJvdG90eXBlKSkuY29uc3RydWN0b3IgPSBNZXRob2QpLmNsYXNzTmFtZSA9IFwiTWV0aG9kXCI7XHJcblxyXG52YXIgdXRpbCA9IHJlcXVpcmUoMzcpO1xyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgYSBuZXcgc2VydmljZSBtZXRob2QgaW5zdGFuY2UuXHJcbiAqIEBjbGFzc2Rlc2MgUmVmbGVjdGVkIHNlcnZpY2UgbWV0aG9kLlxyXG4gKiBAZXh0ZW5kcyBSZWZsZWN0aW9uT2JqZWN0XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBNZXRob2QgbmFtZVxyXG4gKiBAcGFyYW0ge3N0cmluZ3x1bmRlZmluZWR9IHR5cGUgTWV0aG9kIHR5cGUsIHVzdWFsbHkgYFwicnBjXCJgXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0VHlwZSBSZXF1ZXN0IG1lc3NhZ2UgdHlwZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVzcG9uc2VUeXBlIFJlc3BvbnNlIG1lc3NhZ2UgdHlwZVxyXG4gKiBAcGFyYW0ge2Jvb2xlYW58T2JqZWN0LjxzdHJpbmcsKj59IFtyZXF1ZXN0U3RyZWFtXSBXaGV0aGVyIHRoZSByZXF1ZXN0IGlzIHN0cmVhbWVkXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbnxPYmplY3QuPHN0cmluZywqPn0gW3Jlc3BvbnNlU3RyZWFtXSBXaGV0aGVyIHRoZSByZXNwb25zZSBpcyBzdHJlYW1lZFxyXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBbb3B0aW9uc10gRGVjbGFyZWQgb3B0aW9uc1xyXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvbW1lbnRdIFRoZSBjb21tZW50IGZvciB0aGlzIG1ldGhvZFxyXG4gKi9cclxuZnVuY3Rpb24gTWV0aG9kKG5hbWUsIHR5cGUsIHJlcXVlc3RUeXBlLCByZXNwb25zZVR5cGUsIHJlcXVlc3RTdHJlYW0sIHJlc3BvbnNlU3RyZWFtLCBvcHRpb25zLCBjb21tZW50KSB7XHJcblxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgIGlmICh1dGlsLmlzT2JqZWN0KHJlcXVlc3RTdHJlYW0pKSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IHJlcXVlc3RTdHJlYW07XHJcbiAgICAgICAgcmVxdWVzdFN0cmVhbSA9IHJlc3BvbnNlU3RyZWFtID0gdW5kZWZpbmVkO1xyXG4gICAgfSBlbHNlIGlmICh1dGlsLmlzT2JqZWN0KHJlc3BvbnNlU3RyZWFtKSkge1xyXG4gICAgICAgIG9wdGlvbnMgPSByZXNwb25zZVN0cmVhbTtcclxuICAgICAgICByZXNwb25zZVN0cmVhbSA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgIGlmICghKHR5cGUgPT09IHVuZGVmaW5lZCB8fCB1dGlsLmlzU3RyaW5nKHR5cGUpKSlcclxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJ0eXBlIG11c3QgYmUgYSBzdHJpbmdcIik7XHJcblxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICBpZiAoIXV0aWwuaXNTdHJpbmcocmVxdWVzdFR5cGUpKVxyXG4gICAgICAgIHRocm93IFR5cGVFcnJvcihcInJlcXVlc3RUeXBlIG11c3QgYmUgYSBzdHJpbmdcIik7XHJcblxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICBpZiAoIXV0aWwuaXNTdHJpbmcocmVzcG9uc2VUeXBlKSlcclxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJyZXNwb25zZVR5cGUgbXVzdCBiZSBhIHN0cmluZ1wiKTtcclxuXHJcbiAgICBSZWZsZWN0aW9uT2JqZWN0LmNhbGwodGhpcywgbmFtZSwgb3B0aW9ucyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRob2QgdHlwZS5cclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHRoaXMudHlwZSA9IHR5cGUgfHwgXCJycGNcIjsgLy8gdG9KU09OXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXF1ZXN0IHR5cGUuXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnJlcXVlc3RUeXBlID0gcmVxdWVzdFR5cGU7IC8vIHRvSlNPTiwgbWFya2VyXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHJlcXVlc3RzIGFyZSBzdHJlYW1lZCBvciBub3QuXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbnx1bmRlZmluZWR9XHJcbiAgICAgKi9cclxuICAgIHRoaXMucmVxdWVzdFN0cmVhbSA9IHJlcXVlc3RTdHJlYW0gPyB0cnVlIDogdW5kZWZpbmVkOyAvLyB0b0pTT05cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc3BvbnNlIHR5cGUuXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZTsgLy8gdG9KU09OXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHJlc3BvbnNlcyBhcmUgc3RyZWFtZWQgb3Igbm90LlxyXG4gICAgICogQHR5cGUge2Jvb2xlYW58dW5kZWZpbmVkfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnJlc3BvbnNlU3RyZWFtID0gcmVzcG9uc2VTdHJlYW0gPyB0cnVlIDogdW5kZWZpbmVkOyAvLyB0b0pTT05cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc29sdmVkIHJlcXVlc3QgdHlwZS5cclxuICAgICAqIEB0eXBlIHtUeXBlfG51bGx9XHJcbiAgICAgKi9cclxuICAgIHRoaXMucmVzb2x2ZWRSZXF1ZXN0VHlwZSA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNvbHZlZCByZXNwb25zZSB0eXBlLlxyXG4gICAgICogQHR5cGUge1R5cGV8bnVsbH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5yZXNvbHZlZFJlc3BvbnNlVHlwZSA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb21tZW50IGZvciB0aGlzIG1ldGhvZFxyXG4gICAgICogQHR5cGUge3N0cmluZ3xudWxsfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmNvbW1lbnQgPSBjb21tZW50O1xyXG59XHJcblxyXG4vKipcclxuICogTWV0aG9kIGRlc2NyaXB0b3IuXHJcbiAqIEBpbnRlcmZhY2UgSU1ldGhvZFxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3R5cGU9XCJycGNcIl0gTWV0aG9kIHR5cGVcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IHJlcXVlc3RUeXBlIFJlcXVlc3QgdHlwZVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcmVzcG9uc2VUeXBlIFJlc3BvbnNlIHR5cGVcclxuICogQHByb3BlcnR5IHtib29sZWFufSBbcmVxdWVzdFN0cmVhbT1mYWxzZV0gV2hldGhlciByZXF1ZXN0cyBhcmUgc3RyZWFtZWRcclxuICogQHByb3BlcnR5IHtib29sZWFufSBbcmVzcG9uc2VTdHJlYW09ZmFsc2VdIFdoZXRoZXIgcmVzcG9uc2VzIGFyZSBzdHJlYW1lZFxyXG4gKiBAcHJvcGVydHkge09iamVjdC48c3RyaW5nLCo+fSBbb3B0aW9uc10gTWV0aG9kIG9wdGlvbnNcclxuICovXHJcblxyXG4vKipcclxuICogQ29uc3RydWN0cyBhIG1ldGhvZCBmcm9tIGEgbWV0aG9kIGRlc2NyaXB0b3IuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIE1ldGhvZCBuYW1lXHJcbiAqIEBwYXJhbSB7SU1ldGhvZH0ganNvbiBNZXRob2QgZGVzY3JpcHRvclxyXG4gKiBAcmV0dXJucyB7TWV0aG9kfSBDcmVhdGVkIG1ldGhvZFxyXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGFyZ3VtZW50cyBhcmUgaW52YWxpZFxyXG4gKi9cclxuTWV0aG9kLmZyb21KU09OID0gZnVuY3Rpb24gZnJvbUpTT04obmFtZSwganNvbikge1xyXG4gICAgcmV0dXJuIG5ldyBNZXRob2QobmFtZSwganNvbi50eXBlLCBqc29uLnJlcXVlc3RUeXBlLCBqc29uLnJlc3BvbnNlVHlwZSwganNvbi5yZXF1ZXN0U3RyZWFtLCBqc29uLnJlc3BvbnNlU3RyZWFtLCBqc29uLm9wdGlvbnMsIGpzb24uY29tbWVudCk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhpcyBtZXRob2QgdG8gYSBtZXRob2QgZGVzY3JpcHRvci5cclxuICogQHBhcmFtIHtJVG9KU09OT3B0aW9uc30gW3RvSlNPTk9wdGlvbnNdIEpTT04gY29udmVyc2lvbiBvcHRpb25zXHJcbiAqIEByZXR1cm5zIHtJTWV0aG9kfSBNZXRob2QgZGVzY3JpcHRvclxyXG4gKi9cclxuTWV0aG9kLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04odG9KU09OT3B0aW9ucykge1xyXG4gICAgdmFyIGtlZXBDb21tZW50cyA9IHRvSlNPTk9wdGlvbnMgPyBCb29sZWFuKHRvSlNPTk9wdGlvbnMua2VlcENvbW1lbnRzKSA6IGZhbHNlO1xyXG4gICAgcmV0dXJuIHV0aWwudG9PYmplY3QoW1xyXG4gICAgICAgIFwidHlwZVwiICAgICAgICAgICAsIHRoaXMudHlwZSAhPT0gXCJycGNcIiAmJiAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyB0aGlzLnR5cGUgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgIFwicmVxdWVzdFR5cGVcIiAgICAsIHRoaXMucmVxdWVzdFR5cGUsXHJcbiAgICAgICAgXCJyZXF1ZXN0U3RyZWFtXCIgICwgdGhpcy5yZXF1ZXN0U3RyZWFtLFxyXG4gICAgICAgIFwicmVzcG9uc2VUeXBlXCIgICAsIHRoaXMucmVzcG9uc2VUeXBlLFxyXG4gICAgICAgIFwicmVzcG9uc2VTdHJlYW1cIiAsIHRoaXMucmVzcG9uc2VTdHJlYW0sXHJcbiAgICAgICAgXCJvcHRpb25zXCIgICAgICAgICwgdGhpcy5vcHRpb25zLFxyXG4gICAgICAgIFwiY29tbWVudFwiICAgICAgICAsIGtlZXBDb21tZW50cyA/IHRoaXMuY29tbWVudCA6IHVuZGVmaW5lZFxyXG4gICAgXSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQG92ZXJyaWRlXHJcbiAqL1xyXG5NZXRob2QucHJvdG90eXBlLnJlc29sdmUgPSBmdW5jdGlvbiByZXNvbHZlKCkge1xyXG5cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgaWYgKHRoaXMucmVzb2x2ZWQpXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgdGhpcy5yZXNvbHZlZFJlcXVlc3RUeXBlID0gdGhpcy5wYXJlbnQubG9va3VwVHlwZSh0aGlzLnJlcXVlc3RUeXBlKTtcclxuICAgIHRoaXMucmVzb2x2ZWRSZXNwb25zZVR5cGUgPSB0aGlzLnBhcmVudC5sb29rdXBUeXBlKHRoaXMucmVzcG9uc2VUeXBlKTtcclxuXHJcbiAgICByZXR1cm4gUmVmbGVjdGlvbk9iamVjdC5wcm90b3R5cGUucmVzb2x2ZS5jYWxsKHRoaXMpO1xyXG59O1xyXG5cclxufSx7XCIyNFwiOjI0LFwiMzdcIjozN31dLDIzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gTmFtZXNwYWNlO1xyXG5cclxuLy8gZXh0ZW5kcyBSZWZsZWN0aW9uT2JqZWN0XHJcbnZhciBSZWZsZWN0aW9uT2JqZWN0ID0gcmVxdWlyZSgyNCk7XHJcbigoTmFtZXNwYWNlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUmVmbGVjdGlvbk9iamVjdC5wcm90b3R5cGUpKS5jb25zdHJ1Y3RvciA9IE5hbWVzcGFjZSkuY2xhc3NOYW1lID0gXCJOYW1lc3BhY2VcIjtcclxuXHJcbnZhciBFbnVtICAgICA9IHJlcXVpcmUoMTUpLFxyXG4gICAgRmllbGQgICAgPSByZXF1aXJlKDE2KSxcclxuICAgIHV0aWwgICAgID0gcmVxdWlyZSgzNyk7XHJcblxyXG52YXIgVHlwZSwgICAgLy8gY3ljbGljXHJcbiAgICBTZXJ2aWNlOyAvLyBcIlxyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgYSBuZXcgbmFtZXNwYWNlIGluc3RhbmNlLlxyXG4gKiBAbmFtZSBOYW1lc3BhY2VcclxuICogQGNsYXNzZGVzYyBSZWZsZWN0ZWQgbmFtZXNwYWNlLlxyXG4gKiBAZXh0ZW5kcyBOYW1lc3BhY2VCYXNlXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBOYW1lc3BhY2UgbmFtZVxyXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBbb3B0aW9uc10gRGVjbGFyZWQgb3B0aW9uc1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIGEgbmFtZXNwYWNlIGZyb20gSlNPTi5cclxuICogQG1lbWJlcm9mIE5hbWVzcGFjZVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgTmFtZXNwYWNlIG5hbWVcclxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0ganNvbiBKU09OIG9iamVjdFxyXG4gKiBAcmV0dXJucyB7TmFtZXNwYWNlfSBDcmVhdGVkIG5hbWVzcGFjZVxyXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGFyZ3VtZW50cyBhcmUgaW52YWxpZFxyXG4gKi9cclxuTmFtZXNwYWNlLmZyb21KU09OID0gZnVuY3Rpb24gZnJvbUpTT04obmFtZSwganNvbikge1xyXG4gICAgcmV0dXJuIG5ldyBOYW1lc3BhY2UobmFtZSwganNvbi5vcHRpb25zKS5hZGRKU09OKGpzb24ubmVzdGVkKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBhbiBhcnJheSBvZiByZWZsZWN0aW9uIG9iamVjdHMgdG8gSlNPTi5cclxuICogQG1lbWJlcm9mIE5hbWVzcGFjZVxyXG4gKiBAcGFyYW0ge1JlZmxlY3Rpb25PYmplY3RbXX0gYXJyYXkgT2JqZWN0IGFycmF5XHJcbiAqIEBwYXJhbSB7SVRvSlNPTk9wdGlvbnN9IFt0b0pTT05PcHRpb25zXSBKU09OIGNvbnZlcnNpb24gb3B0aW9uc1xyXG4gKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj58dW5kZWZpbmVkfSBKU09OIG9iamVjdCBvciBgdW5kZWZpbmVkYCB3aGVuIGFycmF5IGlzIGVtcHR5XHJcbiAqL1xyXG5mdW5jdGlvbiBhcnJheVRvSlNPTihhcnJheSwgdG9KU09OT3B0aW9ucykge1xyXG4gICAgaWYgKCEoYXJyYXkgJiYgYXJyYXkubGVuZ3RoKSlcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgdmFyIG9iaiA9IHt9O1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7ICsraSlcclxuICAgICAgICBvYmpbYXJyYXlbaV0ubmFtZV0gPSBhcnJheVtpXS50b0pTT04odG9KU09OT3B0aW9ucyk7XHJcbiAgICByZXR1cm4gb2JqO1xyXG59XHJcblxyXG5OYW1lc3BhY2UuYXJyYXlUb0pTT04gPSBhcnJheVRvSlNPTjtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGUgc3BlY2lmaWVkIGlkIGlzIHJlc2VydmVkLlxyXG4gKiBAcGFyYW0ge0FycmF5LjxudW1iZXJbXXxzdHJpbmc+fHVuZGVmaW5lZH0gcmVzZXJ2ZWQgQXJyYXkgb2YgcmVzZXJ2ZWQgcmFuZ2VzIGFuZCBuYW1lc1xyXG4gKiBAcGFyYW0ge251bWJlcn0gaWQgSWQgdG8gdGVzdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHJlc2VydmVkLCBvdGhlcndpc2UgYGZhbHNlYFxyXG4gKi9cclxuTmFtZXNwYWNlLmlzUmVzZXJ2ZWRJZCA9IGZ1bmN0aW9uIGlzUmVzZXJ2ZWRJZChyZXNlcnZlZCwgaWQpIHtcclxuICAgIGlmIChyZXNlcnZlZClcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc2VydmVkLmxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlc2VydmVkW2ldICE9PSBcInN0cmluZ1wiICYmIHJlc2VydmVkW2ldWzBdIDw9IGlkICYmIHJlc2VydmVkW2ldWzFdID49IGlkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhlIHNwZWNpZmllZCBuYW1lIGlzIHJlc2VydmVkLlxyXG4gKiBAcGFyYW0ge0FycmF5LjxudW1iZXJbXXxzdHJpbmc+fHVuZGVmaW5lZH0gcmVzZXJ2ZWQgQXJyYXkgb2YgcmVzZXJ2ZWQgcmFuZ2VzIGFuZCBuYW1lc1xyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBOYW1lIHRvIHRlc3RcclxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiByZXNlcnZlZCwgb3RoZXJ3aXNlIGBmYWxzZWBcclxuICovXHJcbk5hbWVzcGFjZS5pc1Jlc2VydmVkTmFtZSA9IGZ1bmN0aW9uIGlzUmVzZXJ2ZWROYW1lKHJlc2VydmVkLCBuYW1lKSB7XHJcbiAgICBpZiAocmVzZXJ2ZWQpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXNlcnZlZC5sZW5ndGg7ICsraSlcclxuICAgICAgICAgICAgaWYgKHJlc2VydmVkW2ldID09PSBuYW1lKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG4vKipcclxuICogTm90IGFuIGFjdHVhbCBjb25zdHJ1Y3Rvci4gVXNlIHtAbGluayBOYW1lc3BhY2V9IGluc3RlYWQuXHJcbiAqIEBjbGFzc2Rlc2MgQmFzZSBjbGFzcyBvZiBhbGwgcmVmbGVjdGlvbiBvYmplY3RzIGNvbnRhaW5pbmcgbmVzdGVkIG9iamVjdHMuIFRoaXMgaXMgbm90IGFuIGFjdHVhbCBjbGFzcyBidXQgaGVyZSBmb3IgdGhlIHNha2Ugb2YgaGF2aW5nIGNvbnNpc3RlbnQgdHlwZSBkZWZpbml0aW9ucy5cclxuICogQGV4cG9ydHMgTmFtZXNwYWNlQmFzZVxyXG4gKiBAZXh0ZW5kcyBSZWZsZWN0aW9uT2JqZWN0XHJcbiAqIEBhYnN0cmFjdFxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgTmFtZXNwYWNlIG5hbWVcclxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gW29wdGlvbnNdIERlY2xhcmVkIG9wdGlvbnNcclxuICogQHNlZSB7QGxpbmsgTmFtZXNwYWNlfVxyXG4gKi9cclxuZnVuY3Rpb24gTmFtZXNwYWNlKG5hbWUsIG9wdGlvbnMpIHtcclxuICAgIFJlZmxlY3Rpb25PYmplY3QuY2FsbCh0aGlzLCBuYW1lLCBvcHRpb25zKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5lc3RlZCBvYmplY3RzIGJ5IG5hbWUuXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0LjxzdHJpbmcsUmVmbGVjdGlvbk9iamVjdD58dW5kZWZpbmVkfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm5lc3RlZCA9IHVuZGVmaW5lZDsgLy8gdG9KU09OXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWNoZWQgbmVzdGVkIG9iamVjdHMgYXMgYW4gYXJyYXkuXHJcbiAgICAgKiBAdHlwZSB7UmVmbGVjdGlvbk9iamVjdFtdfG51bGx9XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICB0aGlzLl9uZXN0ZWRBcnJheSA9IG51bGw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyQ2FjaGUobmFtZXNwYWNlKSB7XHJcbiAgICBuYW1lc3BhY2UuX25lc3RlZEFycmF5ID0gbnVsbDtcclxuICAgIHJldHVybiBuYW1lc3BhY2U7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBOZXN0ZWQgb2JqZWN0cyBvZiB0aGlzIG5hbWVzcGFjZSBhcyBhbiBhcnJheSBmb3IgaXRlcmF0aW9uLlxyXG4gKiBAbmFtZSBOYW1lc3BhY2VCYXNlI25lc3RlZEFycmF5XHJcbiAqIEB0eXBlIHtSZWZsZWN0aW9uT2JqZWN0W119XHJcbiAqIEByZWFkb25seVxyXG4gKi9cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KE5hbWVzcGFjZS5wcm90b3R5cGUsIFwibmVzdGVkQXJyYXlcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmVzdGVkQXJyYXkgfHwgKHRoaXMuX25lc3RlZEFycmF5ID0gdXRpbC50b0FycmF5KHRoaXMubmVzdGVkKSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIE5hbWVzcGFjZSBkZXNjcmlwdG9yLlxyXG4gKiBAaW50ZXJmYWNlIElOYW1lc3BhY2VcclxuICogQHByb3BlcnR5IHtPYmplY3QuPHN0cmluZywqPn0gW29wdGlvbnNdIE5hbWVzcGFjZSBvcHRpb25zXHJcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0LjxzdHJpbmcsQW55TmVzdGVkT2JqZWN0Pn0gW25lc3RlZF0gTmVzdGVkIG9iamVjdCBkZXNjcmlwdG9yc1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBBbnkgZXh0ZW5zaW9uIGZpZWxkIGRlc2NyaXB0b3IuXHJcbiAqIEB0eXBlZGVmIEFueUV4dGVuc2lvbkZpZWxkXHJcbiAqIEB0eXBlIHtJRXh0ZW5zaW9uRmllbGR8SUV4dGVuc2lvbk1hcEZpZWxkfVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBBbnkgbmVzdGVkIG9iamVjdCBkZXNjcmlwdG9yLlxyXG4gKiBAdHlwZWRlZiBBbnlOZXN0ZWRPYmplY3RcclxuICogQHR5cGUge0lFbnVtfElUeXBlfElTZXJ2aWNlfEFueUV4dGVuc2lvbkZpZWxkfElOYW1lc3BhY2V9XHJcbiAqL1xyXG4vLyBeIEJFV0FSRTogVlNDb2RlIGhhbmdzIGZvcmV2ZXIgd2hlbiB1c2luZyBtb3JlIHRoYW4gNSB0eXBlcyAodGhhdCdzIHdoeSBBbnlFeHRlbnNpb25GaWVsZCBleGlzdHMgaW4gdGhlIGZpcnN0IHBsYWNlKVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoaXMgbmFtZXNwYWNlIHRvIGEgbmFtZXNwYWNlIGRlc2NyaXB0b3IuXHJcbiAqIEBwYXJhbSB7SVRvSlNPTk9wdGlvbnN9IFt0b0pTT05PcHRpb25zXSBKU09OIGNvbnZlcnNpb24gb3B0aW9uc1xyXG4gKiBAcmV0dXJucyB7SU5hbWVzcGFjZX0gTmFtZXNwYWNlIGRlc2NyaXB0b3JcclxuICovXHJcbk5hbWVzcGFjZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OKHRvSlNPTk9wdGlvbnMpIHtcclxuICAgIHJldHVybiB1dGlsLnRvT2JqZWN0KFtcclxuICAgICAgICBcIm9wdGlvbnNcIiAsIHRoaXMub3B0aW9ucyxcclxuICAgICAgICBcIm5lc3RlZFwiICAsIGFycmF5VG9KU09OKHRoaXMubmVzdGVkQXJyYXksIHRvSlNPTk9wdGlvbnMpXHJcbiAgICBdKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGRzIG5lc3RlZCBvYmplY3RzIHRvIHRoaXMgbmFtZXNwYWNlIGZyb20gbmVzdGVkIG9iamVjdCBkZXNjcmlwdG9ycy5cclxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZyxBbnlOZXN0ZWRPYmplY3Q+fSBuZXN0ZWRKc29uIEFueSBuZXN0ZWQgb2JqZWN0IGRlc2NyaXB0b3JzXHJcbiAqIEByZXR1cm5zIHtOYW1lc3BhY2V9IGB0aGlzYFxyXG4gKi9cclxuTmFtZXNwYWNlLnByb3RvdHlwZS5hZGRKU09OID0gZnVuY3Rpb24gYWRkSlNPTihuZXN0ZWRKc29uKSB7XHJcbiAgICB2YXIgbnMgPSB0aGlzO1xyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cclxuICAgIGlmIChuZXN0ZWRKc29uKSB7XHJcbiAgICAgICAgZm9yICh2YXIgbmFtZXMgPSBPYmplY3Qua2V5cyhuZXN0ZWRKc29uKSwgaSA9IDAsIG5lc3RlZDsgaSA8IG5hbWVzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIG5lc3RlZCA9IG5lc3RlZEpzb25bbmFtZXNbaV1dO1xyXG4gICAgICAgICAgICBucy5hZGQoIC8vIG1vc3QgdG8gbGVhc3QgbGlrZWx5XHJcbiAgICAgICAgICAgICAgICAoIG5lc3RlZC5maWVsZHMgIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgPyBUeXBlLmZyb21KU09OXHJcbiAgICAgICAgICAgICAgICA6IG5lc3RlZC52YWx1ZXMgIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgPyBFbnVtLmZyb21KU09OXHJcbiAgICAgICAgICAgICAgICA6IG5lc3RlZC5tZXRob2RzICE9PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgID8gU2VydmljZS5mcm9tSlNPTlxyXG4gICAgICAgICAgICAgICAgOiBuZXN0ZWQuaWQgIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgPyBGaWVsZC5mcm9tSlNPTlxyXG4gICAgICAgICAgICAgICAgOiBOYW1lc3BhY2UuZnJvbUpTT04gKShuYW1lc1tpXSwgbmVzdGVkKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIG5lc3RlZCBvYmplY3Qgb2YgdGhlIHNwZWNpZmllZCBuYW1lLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBOZXN0ZWQgb2JqZWN0IG5hbWVcclxuICogQHJldHVybnMge1JlZmxlY3Rpb25PYmplY3R8bnVsbH0gVGhlIHJlZmxlY3Rpb24gb2JqZWN0IG9yIGBudWxsYCBpZiBpdCBkb2Vzbid0IGV4aXN0XHJcbiAqL1xyXG5OYW1lc3BhY2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldChuYW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5uZXN0ZWQgJiYgdGhpcy5uZXN0ZWRbbmFtZV1cclxuICAgICAgICB8fCBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHZhbHVlcyBvZiB0aGUgbmVzdGVkIHtAbGluayBFbnVtfGVudW19IG9mIHRoZSBzcGVjaWZpZWQgbmFtZS5cclxuICogVGhpcyBtZXRob2RzIGRpZmZlcnMgZnJvbSB7QGxpbmsgTmFtZXNwYWNlI2dldHxnZXR9IGluIHRoYXQgaXQgcmV0dXJucyBhbiBlbnVtJ3MgdmFsdWVzIGRpcmVjdGx5IGFuZCB0aHJvd3MgaW5zdGVhZCBvZiByZXR1cm5pbmcgYG51bGxgLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBOZXN0ZWQgZW51bSBuYW1lXHJcbiAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZyxudW1iZXI+fSBFbnVtIHZhbHVlc1xyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlcmUgaXMgbm8gc3VjaCBlbnVtXHJcbiAqL1xyXG5OYW1lc3BhY2UucHJvdG90eXBlLmdldEVudW0gPSBmdW5jdGlvbiBnZXRFbnVtKG5hbWUpIHtcclxuICAgIGlmICh0aGlzLm5lc3RlZCAmJiB0aGlzLm5lc3RlZFtuYW1lXSBpbnN0YW5jZW9mIEVudW0pXHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmVzdGVkW25hbWVdLnZhbHVlcztcclxuICAgIHRocm93IEVycm9yKFwibm8gc3VjaCBlbnVtOiBcIiArIG5hbWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgYSBuZXN0ZWQgb2JqZWN0IHRvIHRoaXMgbmFtZXNwYWNlLlxyXG4gKiBAcGFyYW0ge1JlZmxlY3Rpb25PYmplY3R9IG9iamVjdCBOZXN0ZWQgb2JqZWN0IHRvIGFkZFxyXG4gKiBAcmV0dXJucyB7TmFtZXNwYWNlfSBgdGhpc2BcclxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBhcmd1bWVudHMgYXJlIGludmFsaWRcclxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZXJlIGlzIGFscmVhZHkgYSBuZXN0ZWQgb2JqZWN0IHdpdGggdGhpcyBuYW1lXHJcbiAqL1xyXG5OYW1lc3BhY2UucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZChvYmplY3QpIHtcclxuXHJcbiAgICBpZiAoIShvYmplY3QgaW5zdGFuY2VvZiBGaWVsZCAmJiBvYmplY3QuZXh0ZW5kICE9PSB1bmRlZmluZWQgfHwgb2JqZWN0IGluc3RhbmNlb2YgVHlwZSB8fCBvYmplY3QgaW5zdGFuY2VvZiBFbnVtIHx8IG9iamVjdCBpbnN0YW5jZW9mIFNlcnZpY2UgfHwgb2JqZWN0IGluc3RhbmNlb2YgTmFtZXNwYWNlKSlcclxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJvYmplY3QgbXVzdCBiZSBhIHZhbGlkIG5lc3RlZCBvYmplY3RcIik7XHJcblxyXG4gICAgaWYgKCF0aGlzLm5lc3RlZClcclxuICAgICAgICB0aGlzLm5lc3RlZCA9IHt9O1xyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIHByZXYgPSB0aGlzLmdldChvYmplY3QubmFtZSk7XHJcbiAgICAgICAgaWYgKHByZXYpIHtcclxuICAgICAgICAgICAgaWYgKHByZXYgaW5zdGFuY2VvZiBOYW1lc3BhY2UgJiYgb2JqZWN0IGluc3RhbmNlb2YgTmFtZXNwYWNlICYmICEocHJldiBpbnN0YW5jZW9mIFR5cGUgfHwgcHJldiBpbnN0YW5jZW9mIFNlcnZpY2UpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyByZXBsYWNlIHBsYWluIG5hbWVzcGFjZSBidXQga2VlcCBleGlzdGluZyBuZXN0ZWQgZWxlbWVudHMgYW5kIG9wdGlvbnNcclxuICAgICAgICAgICAgICAgIHZhciBuZXN0ZWQgPSBwcmV2Lm5lc3RlZEFycmF5O1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZXN0ZWQubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LmFkZChuZXN0ZWRbaV0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUocHJldik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubmVzdGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmVzdGVkID0ge307XHJcbiAgICAgICAgICAgICAgICBvYmplY3Quc2V0T3B0aW9ucyhwcmV2Lm9wdGlvbnMsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcImR1cGxpY2F0ZSBuYW1lICdcIiArIG9iamVjdC5uYW1lICsgXCInIGluIFwiICsgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5uZXN0ZWRbb2JqZWN0Lm5hbWVdID0gb2JqZWN0O1xyXG4gICAgb2JqZWN0Lm9uQWRkKHRoaXMpO1xyXG4gICAgcmV0dXJuIGNsZWFyQ2FjaGUodGhpcyk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBhIG5lc3RlZCBvYmplY3QgZnJvbSB0aGlzIG5hbWVzcGFjZS5cclxuICogQHBhcmFtIHtSZWZsZWN0aW9uT2JqZWN0fSBvYmplY3QgTmVzdGVkIG9iamVjdCB0byByZW1vdmVcclxuICogQHJldHVybnMge05hbWVzcGFjZX0gYHRoaXNgXHJcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYXJndW1lbnRzIGFyZSBpbnZhbGlkXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiBgb2JqZWN0YCBpcyBub3QgYSBtZW1iZXIgb2YgdGhpcyBuYW1lc3BhY2VcclxuICovXHJcbk5hbWVzcGFjZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlKG9iamVjdCkge1xyXG5cclxuICAgIGlmICghKG9iamVjdCBpbnN0YW5jZW9mIFJlZmxlY3Rpb25PYmplY3QpKVxyXG4gICAgICAgIHRocm93IFR5cGVFcnJvcihcIm9iamVjdCBtdXN0IGJlIGEgUmVmbGVjdGlvbk9iamVjdFwiKTtcclxuICAgIGlmIChvYmplY3QucGFyZW50ICE9PSB0aGlzKVxyXG4gICAgICAgIHRocm93IEVycm9yKG9iamVjdCArIFwiIGlzIG5vdCBhIG1lbWJlciBvZiBcIiArIHRoaXMpO1xyXG5cclxuICAgIGRlbGV0ZSB0aGlzLm5lc3RlZFtvYmplY3QubmFtZV07XHJcbiAgICBpZiAoIU9iamVjdC5rZXlzKHRoaXMubmVzdGVkKS5sZW5ndGgpXHJcbiAgICAgICAgdGhpcy5uZXN0ZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgb2JqZWN0Lm9uUmVtb3ZlKHRoaXMpO1xyXG4gICAgcmV0dXJuIGNsZWFyQ2FjaGUodGhpcyk7XHJcbn07XHJcblxyXG4vKipcclxuICogRGVmaW5lcyBhZGRpdGlhbCBuYW1lc3BhY2VzIHdpdGhpbiB0aGlzIG9uZSBpZiBub3QgeWV0IGV4aXN0aW5nLlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gcGF0aCBQYXRoIHRvIGNyZWF0ZVxyXG4gKiBAcGFyYW0geyp9IFtqc29uXSBOZXN0ZWQgdHlwZXMgdG8gY3JlYXRlIGZyb20gSlNPTlxyXG4gKiBAcmV0dXJucyB7TmFtZXNwYWNlfSBQb2ludGVyIHRvIHRoZSBsYXN0IG5hbWVzcGFjZSBjcmVhdGVkIG9yIGB0aGlzYCBpZiBwYXRoIGlzIGVtcHR5XHJcbiAqL1xyXG5OYW1lc3BhY2UucHJvdG90eXBlLmRlZmluZSA9IGZ1bmN0aW9uIGRlZmluZShwYXRoLCBqc29uKSB7XHJcblxyXG4gICAgaWYgKHV0aWwuaXNTdHJpbmcocGF0aCkpXHJcbiAgICAgICAgcGF0aCA9IHBhdGguc3BsaXQoXCIuXCIpO1xyXG4gICAgZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkocGF0aCkpXHJcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiaWxsZWdhbCBwYXRoXCIpO1xyXG4gICAgaWYgKHBhdGggJiYgcGF0aC5sZW5ndGggJiYgcGF0aFswXSA9PT0gXCJcIilcclxuICAgICAgICB0aHJvdyBFcnJvcihcInBhdGggbXVzdCBiZSByZWxhdGl2ZVwiKTtcclxuXHJcbiAgICB2YXIgcHRyID0gdGhpcztcclxuICAgIHdoaWxlIChwYXRoLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB2YXIgcGFydCA9IHBhdGguc2hpZnQoKTtcclxuICAgICAgICBpZiAocHRyLm5lc3RlZCAmJiBwdHIubmVzdGVkW3BhcnRdKSB7XHJcbiAgICAgICAgICAgIHB0ciA9IHB0ci5uZXN0ZWRbcGFydF07XHJcbiAgICAgICAgICAgIGlmICghKHB0ciBpbnN0YW5jZW9mIE5hbWVzcGFjZSkpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcInBhdGggY29uZmxpY3RzIHdpdGggbm9uLW5hbWVzcGFjZSBvYmplY3RzXCIpO1xyXG4gICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICBwdHIuYWRkKHB0ciA9IG5ldyBOYW1lc3BhY2UocGFydCkpO1xyXG4gICAgfVxyXG4gICAgaWYgKGpzb24pXHJcbiAgICAgICAgcHRyLmFkZEpTT04oanNvbik7XHJcbiAgICByZXR1cm4gcHRyO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlc29sdmVzIHRoaXMgbmFtZXNwYWNlJ3MgYW5kIGFsbCBpdHMgbmVzdGVkIG9iamVjdHMnIHR5cGUgcmVmZXJlbmNlcy4gVXNlZnVsIHRvIHZhbGlkYXRlIGEgcmVmbGVjdGlvbiB0cmVlLCBidXQgY29tZXMgYXQgYSBjb3N0LlxyXG4gKiBAcmV0dXJucyB7TmFtZXNwYWNlfSBgdGhpc2BcclxuICovXHJcbk5hbWVzcGFjZS5wcm90b3R5cGUucmVzb2x2ZUFsbCA9IGZ1bmN0aW9uIHJlc29sdmVBbGwoKSB7XHJcbiAgICB2YXIgbmVzdGVkID0gdGhpcy5uZXN0ZWRBcnJheSwgaSA9IDA7XHJcbiAgICB3aGlsZSAoaSA8IG5lc3RlZC5sZW5ndGgpXHJcbiAgICAgICAgaWYgKG5lc3RlZFtpXSBpbnN0YW5jZW9mIE5hbWVzcGFjZSlcclxuICAgICAgICAgICAgbmVzdGVkW2krK10ucmVzb2x2ZUFsbCgpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgbmVzdGVkW2krK10ucmVzb2x2ZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMucmVzb2x2ZSgpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlY3Vyc2l2ZWx5IGxvb2tzIHVwIHRoZSByZWZsZWN0aW9uIG9iamVjdCBtYXRjaGluZyB0aGUgc3BlY2lmaWVkIHBhdGggaW4gdGhlIHNjb3BlIG9mIHRoaXMgbmFtZXNwYWNlLlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gcGF0aCBQYXRoIHRvIGxvb2sgdXBcclxuICogQHBhcmFtIHsqfEFycmF5LjwqPn0gZmlsdGVyVHlwZXMgRmlsdGVyIHR5cGVzLCBhbnkgY29tYmluYXRpb24gb2YgdGhlIGNvbnN0cnVjdG9ycyBvZiBgcHJvdG9idWYuVHlwZWAsIGBwcm90b2J1Zi5FbnVtYCwgYHByb3RvYnVmLlNlcnZpY2VgIGV0Yy5cclxuICogQHBhcmFtIHtib29sZWFufSBbcGFyZW50QWxyZWFkeUNoZWNrZWQ9ZmFsc2VdIElmIGtub3duLCB3aGV0aGVyIHRoZSBwYXJlbnQgaGFzIGFscmVhZHkgYmVlbiBjaGVja2VkXHJcbiAqIEByZXR1cm5zIHtSZWZsZWN0aW9uT2JqZWN0fG51bGx9IExvb2tlZCB1cCBvYmplY3Qgb3IgYG51bGxgIGlmIG5vbmUgY291bGQgYmUgZm91bmRcclxuICovXHJcbk5hbWVzcGFjZS5wcm90b3R5cGUubG9va3VwID0gZnVuY3Rpb24gbG9va3VwKHBhdGgsIGZpbHRlclR5cGVzLCBwYXJlbnRBbHJlYWR5Q2hlY2tlZCkge1xyXG5cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICBpZiAodHlwZW9mIGZpbHRlclR5cGVzID09PSBcImJvb2xlYW5cIikge1xyXG4gICAgICAgIHBhcmVudEFscmVhZHlDaGVja2VkID0gZmlsdGVyVHlwZXM7XHJcbiAgICAgICAgZmlsdGVyVHlwZXMgPSB1bmRlZmluZWQ7XHJcbiAgICB9IGVsc2UgaWYgKGZpbHRlclR5cGVzICYmICFBcnJheS5pc0FycmF5KGZpbHRlclR5cGVzKSlcclxuICAgICAgICBmaWx0ZXJUeXBlcyA9IFsgZmlsdGVyVHlwZXMgXTtcclxuXHJcbiAgICBpZiAodXRpbC5pc1N0cmluZyhwYXRoKSAmJiBwYXRoLmxlbmd0aCkge1xyXG4gICAgICAgIGlmIChwYXRoID09PSBcIi5cIilcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdDtcclxuICAgICAgICBwYXRoID0gcGF0aC5zcGxpdChcIi5cIik7XHJcbiAgICB9IGVsc2UgaWYgKCFwYXRoLmxlbmd0aClcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICAvLyBTdGFydCBhdCByb290IGlmIHBhdGggaXMgYWJzb2x1dGVcclxuICAgIGlmIChwYXRoWzBdID09PSBcIlwiKVxyXG4gICAgICAgIHJldHVybiB0aGlzLnJvb3QubG9va3VwKHBhdGguc2xpY2UoMSksIGZpbHRlclR5cGVzKTtcclxuXHJcbiAgICAvLyBUZXN0IGlmIHRoZSBmaXJzdCBwYXJ0IG1hdGNoZXMgYW55IG5lc3RlZCBvYmplY3QsIGFuZCBpZiBzbywgdHJhdmVyc2UgaWYgcGF0aCBjb250YWlucyBtb3JlXHJcbiAgICB2YXIgZm91bmQgPSB0aGlzLmdldChwYXRoWzBdKTtcclxuICAgIGlmIChmb3VuZCkge1xyXG4gICAgICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICBpZiAoIWZpbHRlclR5cGVzIHx8IGZpbHRlclR5cGVzLmluZGV4T2YoZm91bmQuY29uc3RydWN0b3IpID4gLTEpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChmb3VuZCBpbnN0YW5jZW9mIE5hbWVzcGFjZSAmJiAoZm91bmQgPSBmb3VuZC5sb29rdXAocGF0aC5zbGljZSgxKSwgZmlsdGVyVHlwZXMsIHRydWUpKSlcclxuICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xyXG5cclxuICAgIC8vIE90aGVyd2lzZSB0cnkgZWFjaCBuZXN0ZWQgbmFtZXNwYWNlXHJcbiAgICB9IGVsc2VcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubmVzdGVkQXJyYXkubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9uZXN0ZWRBcnJheVtpXSBpbnN0YW5jZW9mIE5hbWVzcGFjZSAmJiAoZm91bmQgPSB0aGlzLl9uZXN0ZWRBcnJheVtpXS5sb29rdXAocGF0aCwgZmlsdGVyVHlwZXMsIHRydWUpKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmb3VuZDtcclxuXHJcbiAgICAvLyBJZiB0aGVyZSBoYXNuJ3QgYmVlbiBhIG1hdGNoLCB0cnkgYWdhaW4gYXQgdGhlIHBhcmVudFxyXG4gICAgaWYgKHRoaXMucGFyZW50ID09PSBudWxsIHx8IHBhcmVudEFscmVhZHlDaGVja2VkKVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIHRoaXMucGFyZW50Lmxvb2t1cChwYXRoLCBmaWx0ZXJUeXBlcyk7XHJcbn07XHJcblxyXG4vKipcclxuICogTG9va3MgdXAgdGhlIHJlZmxlY3Rpb24gb2JqZWN0IGF0IHRoZSBzcGVjaWZpZWQgcGF0aCwgcmVsYXRpdmUgdG8gdGhpcyBuYW1lc3BhY2UuXHJcbiAqIEBuYW1lIE5hbWVzcGFjZUJhc2UjbG9va3VwXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gcGF0aCBQYXRoIHRvIGxvb2sgdXBcclxuICogQHBhcmFtIHtib29sZWFufSBbcGFyZW50QWxyZWFkeUNoZWNrZWQ9ZmFsc2VdIFdoZXRoZXIgdGhlIHBhcmVudCBoYXMgYWxyZWFkeSBiZWVuIGNoZWNrZWRcclxuICogQHJldHVybnMge1JlZmxlY3Rpb25PYmplY3R8bnVsbH0gTG9va2VkIHVwIG9iamVjdCBvciBgbnVsbGAgaWYgbm9uZSBjb3VsZCBiZSBmb3VuZFxyXG4gKiBAdmFyaWF0aW9uIDJcclxuICovXHJcbi8vIGxvb2t1cChwYXRoOiBzdHJpbmcsIFtwYXJlbnRBbHJlYWR5Q2hlY2tlZDogYm9vbGVhbl0pXHJcblxyXG4vKipcclxuICogTG9va3MgdXAgdGhlIHtAbGluayBUeXBlfHR5cGV9IGF0IHRoZSBzcGVjaWZpZWQgcGF0aCwgcmVsYXRpdmUgdG8gdGhpcyBuYW1lc3BhY2UuXHJcbiAqIEJlc2lkZXMgaXRzIHNpZ25hdHVyZSwgdGhpcyBtZXRob2RzIGRpZmZlcnMgZnJvbSB7QGxpbmsgTmFtZXNwYWNlI2xvb2t1cHxsb29rdXB9IGluIHRoYXQgaXQgdGhyb3dzIGluc3RlYWQgb2YgcmV0dXJuaW5nIGBudWxsYC5cclxuICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IHBhdGggUGF0aCB0byBsb29rIHVwXHJcbiAqIEByZXR1cm5zIHtUeXBlfSBMb29rZWQgdXAgdHlwZVxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgYHBhdGhgIGRvZXMgbm90IHBvaW50IHRvIGEgdHlwZVxyXG4gKi9cclxuTmFtZXNwYWNlLnByb3RvdHlwZS5sb29rdXBUeXBlID0gZnVuY3Rpb24gbG9va3VwVHlwZShwYXRoKSB7XHJcbiAgICB2YXIgZm91bmQgPSB0aGlzLmxvb2t1cChwYXRoLCBbIFR5cGUgXSk7XHJcbiAgICBpZiAoIWZvdW5kKVxyXG4gICAgICAgIHRocm93IEVycm9yKFwibm8gc3VjaCB0eXBlOiBcIiArIHBhdGgpO1xyXG4gICAgcmV0dXJuIGZvdW5kO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIExvb2tzIHVwIHRoZSB2YWx1ZXMgb2YgdGhlIHtAbGluayBFbnVtfGVudW19IGF0IHRoZSBzcGVjaWZpZWQgcGF0aCwgcmVsYXRpdmUgdG8gdGhpcyBuYW1lc3BhY2UuXHJcbiAqIEJlc2lkZXMgaXRzIHNpZ25hdHVyZSwgdGhpcyBtZXRob2RzIGRpZmZlcnMgZnJvbSB7QGxpbmsgTmFtZXNwYWNlI2xvb2t1cHxsb29rdXB9IGluIHRoYXQgaXQgdGhyb3dzIGluc3RlYWQgb2YgcmV0dXJuaW5nIGBudWxsYC5cclxuICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IHBhdGggUGF0aCB0byBsb29rIHVwXHJcbiAqIEByZXR1cm5zIHtFbnVtfSBMb29rZWQgdXAgZW51bVxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgYHBhdGhgIGRvZXMgbm90IHBvaW50IHRvIGFuIGVudW1cclxuICovXHJcbk5hbWVzcGFjZS5wcm90b3R5cGUubG9va3VwRW51bSA9IGZ1bmN0aW9uIGxvb2t1cEVudW0ocGF0aCkge1xyXG4gICAgdmFyIGZvdW5kID0gdGhpcy5sb29rdXAocGF0aCwgWyBFbnVtIF0pO1xyXG4gICAgaWYgKCFmb3VuZClcclxuICAgICAgICB0aHJvdyBFcnJvcihcIm5vIHN1Y2ggRW51bSAnXCIgKyBwYXRoICsgXCInIGluIFwiICsgdGhpcyk7XHJcbiAgICByZXR1cm4gZm91bmQ7XHJcbn07XHJcblxyXG4vKipcclxuICogTG9va3MgdXAgdGhlIHtAbGluayBUeXBlfHR5cGV9IG9yIHtAbGluayBFbnVtfGVudW19IGF0IHRoZSBzcGVjaWZpZWQgcGF0aCwgcmVsYXRpdmUgdG8gdGhpcyBuYW1lc3BhY2UuXHJcbiAqIEJlc2lkZXMgaXRzIHNpZ25hdHVyZSwgdGhpcyBtZXRob2RzIGRpZmZlcnMgZnJvbSB7QGxpbmsgTmFtZXNwYWNlI2xvb2t1cHxsb29rdXB9IGluIHRoYXQgaXQgdGhyb3dzIGluc3RlYWQgb2YgcmV0dXJuaW5nIGBudWxsYC5cclxuICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IHBhdGggUGF0aCB0byBsb29rIHVwXHJcbiAqIEByZXR1cm5zIHtUeXBlfSBMb29rZWQgdXAgdHlwZSBvciBlbnVtXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiBgcGF0aGAgZG9lcyBub3QgcG9pbnQgdG8gYSB0eXBlIG9yIGVudW1cclxuICovXHJcbk5hbWVzcGFjZS5wcm90b3R5cGUubG9va3VwVHlwZU9yRW51bSA9IGZ1bmN0aW9uIGxvb2t1cFR5cGVPckVudW0ocGF0aCkge1xyXG4gICAgdmFyIGZvdW5kID0gdGhpcy5sb29rdXAocGF0aCwgWyBUeXBlLCBFbnVtIF0pO1xyXG4gICAgaWYgKCFmb3VuZClcclxuICAgICAgICB0aHJvdyBFcnJvcihcIm5vIHN1Y2ggVHlwZSBvciBFbnVtICdcIiArIHBhdGggKyBcIicgaW4gXCIgKyB0aGlzKTtcclxuICAgIHJldHVybiBmb3VuZDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBMb29rcyB1cCB0aGUge0BsaW5rIFNlcnZpY2V8c2VydmljZX0gYXQgdGhlIHNwZWNpZmllZCBwYXRoLCByZWxhdGl2ZSB0byB0aGlzIG5hbWVzcGFjZS5cclxuICogQmVzaWRlcyBpdHMgc2lnbmF0dXJlLCB0aGlzIG1ldGhvZHMgZGlmZmVycyBmcm9tIHtAbGluayBOYW1lc3BhY2UjbG9va3VwfGxvb2t1cH0gaW4gdGhhdCBpdCB0aHJvd3MgaW5zdGVhZCBvZiByZXR1cm5pbmcgYG51bGxgLlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gcGF0aCBQYXRoIHRvIGxvb2sgdXBcclxuICogQHJldHVybnMge1NlcnZpY2V9IExvb2tlZCB1cCBzZXJ2aWNlXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiBgcGF0aGAgZG9lcyBub3QgcG9pbnQgdG8gYSBzZXJ2aWNlXHJcbiAqL1xyXG5OYW1lc3BhY2UucHJvdG90eXBlLmxvb2t1cFNlcnZpY2UgPSBmdW5jdGlvbiBsb29rdXBTZXJ2aWNlKHBhdGgpIHtcclxuICAgIHZhciBmb3VuZCA9IHRoaXMubG9va3VwKHBhdGgsIFsgU2VydmljZSBdKTtcclxuICAgIGlmICghZm91bmQpXHJcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJubyBzdWNoIFNlcnZpY2UgJ1wiICsgcGF0aCArIFwiJyBpbiBcIiArIHRoaXMpO1xyXG4gICAgcmV0dXJuIGZvdW5kO1xyXG59O1xyXG5cclxuTmFtZXNwYWNlLl9jb25maWd1cmUgPSBmdW5jdGlvbihUeXBlXywgU2VydmljZV8pIHtcclxuICAgIFR5cGUgICAgPSBUeXBlXztcclxuICAgIFNlcnZpY2UgPSBTZXJ2aWNlXztcclxufTtcclxuXHJcbn0se1wiMTVcIjoxNSxcIjE2XCI6MTYsXCIyNFwiOjI0LFwiMzdcIjozN31dLDI0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gUmVmbGVjdGlvbk9iamVjdDtcclxuXHJcblJlZmxlY3Rpb25PYmplY3QuY2xhc3NOYW1lID0gXCJSZWZsZWN0aW9uT2JqZWN0XCI7XHJcblxyXG52YXIgdXRpbCA9IHJlcXVpcmUoMzcpO1xyXG5cclxudmFyIFJvb3Q7IC8vIGN5Y2xpY1xyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgYSBuZXcgcmVmbGVjdGlvbiBvYmplY3QgaW5zdGFuY2UuXHJcbiAqIEBjbGFzc2Rlc2MgQmFzZSBjbGFzcyBvZiBhbGwgcmVmbGVjdGlvbiBvYmplY3RzLlxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgT2JqZWN0IG5hbWVcclxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gW29wdGlvbnNdIERlY2xhcmVkIG9wdGlvbnNcclxuICogQGFic3RyYWN0XHJcbiAqL1xyXG5mdW5jdGlvbiBSZWZsZWN0aW9uT2JqZWN0KG5hbWUsIG9wdGlvbnMpIHtcclxuXHJcbiAgICBpZiAoIXV0aWwuaXNTdHJpbmcobmFtZSkpXHJcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwibmFtZSBtdXN0IGJlIGEgc3RyaW5nXCIpO1xyXG5cclxuICAgIGlmIChvcHRpb25zICYmICF1dGlsLmlzT2JqZWN0KG9wdGlvbnMpKVxyXG4gICAgICAgIHRocm93IFR5cGVFcnJvcihcIm9wdGlvbnMgbXVzdCBiZSBhbiBvYmplY3RcIik7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPcHRpb25zLlxyXG4gICAgICogQHR5cGUge09iamVjdC48c3RyaW5nLCo+fHVuZGVmaW5lZH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uczsgLy8gdG9KU09OXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVbmlxdWUgbmFtZSB3aXRoaW4gaXRzIG5hbWVzcGFjZS5cclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJlbnQgbmFtZXNwYWNlLlxyXG4gICAgICogQHR5cGUge05hbWVzcGFjZXxudWxsfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIGFscmVhZHkgcmVzb2x2ZWQgb3Igbm90LlxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHRoaXMucmVzb2x2ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbW1lbnQgdGV4dCwgaWYgYW55LlxyXG4gICAgICogQHR5cGUge3N0cmluZ3xudWxsfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmNvbW1lbnQgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5pbmcgZmlsZSBuYW1lLlxyXG4gICAgICogQHR5cGUge3N0cmluZ3xudWxsfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmZpbGVuYW1lID0gbnVsbDtcclxufVxyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoUmVmbGVjdGlvbk9iamVjdC5wcm90b3R5cGUsIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZmVyZW5jZSB0byB0aGUgcm9vdCBuYW1lc3BhY2UuXHJcbiAgICAgKiBAbmFtZSBSZWZsZWN0aW9uT2JqZWN0I3Jvb3RcclxuICAgICAqIEB0eXBlIHtSb290fVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIHJvb3Q6IHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgcHRyID0gdGhpcztcclxuICAgICAgICAgICAgd2hpbGUgKHB0ci5wYXJlbnQgIT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICBwdHIgPSBwdHIucGFyZW50O1xyXG4gICAgICAgICAgICByZXR1cm4gcHRyO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdWxsIG5hbWUgaW5jbHVkaW5nIGxlYWRpbmcgZG90LlxyXG4gICAgICogQG5hbWUgUmVmbGVjdGlvbk9iamVjdCNmdWxsTmFtZVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBmdWxsTmFtZToge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXRoID0gWyB0aGlzLm5hbWUgXSxcclxuICAgICAgICAgICAgICAgIHB0ciA9IHRoaXMucGFyZW50O1xyXG4gICAgICAgICAgICB3aGlsZSAocHRyKSB7XHJcbiAgICAgICAgICAgICAgICBwYXRoLnVuc2hpZnQocHRyLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgcHRyID0gcHRyLnBhcmVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcGF0aC5qb2luKFwiLlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoaXMgcmVmbGVjdGlvbiBvYmplY3QgdG8gaXRzIGRlc2NyaXB0b3IgcmVwcmVzZW50YXRpb24uXHJcbiAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gRGVzY3JpcHRvclxyXG4gKiBAYWJzdHJhY3RcclxuICovXHJcblJlZmxlY3Rpb25PYmplY3QucHJvdG90eXBlLnRvSlNPTiA9IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIGZ1bmN0aW9uIHRvSlNPTigpIHtcclxuICAgIHRocm93IEVycm9yKCk7IC8vIG5vdCBpbXBsZW1lbnRlZCwgc2hvdWxkbid0IGhhcHBlblxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENhbGxlZCB3aGVuIHRoaXMgb2JqZWN0IGlzIGFkZGVkIHRvIGEgcGFyZW50LlxyXG4gKiBAcGFyYW0ge1JlZmxlY3Rpb25PYmplY3R9IHBhcmVudCBQYXJlbnQgYWRkZWQgdG9cclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblJlZmxlY3Rpb25PYmplY3QucHJvdG90eXBlLm9uQWRkID0gZnVuY3Rpb24gb25BZGQocGFyZW50KSB7XHJcbiAgICBpZiAodGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQgIT09IHBhcmVudClcclxuICAgICAgICB0aGlzLnBhcmVudC5yZW1vdmUodGhpcyk7XHJcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcclxuICAgIHRoaXMucmVzb2x2ZWQgPSBmYWxzZTtcclxuICAgIHZhciByb290ID0gcGFyZW50LnJvb3Q7XHJcbiAgICBpZiAocm9vdCBpbnN0YW5jZW9mIFJvb3QpXHJcbiAgICAgICAgcm9vdC5faGFuZGxlQWRkKHRoaXMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENhbGxlZCB3aGVuIHRoaXMgb2JqZWN0IGlzIHJlbW92ZWQgZnJvbSBhIHBhcmVudC5cclxuICogQHBhcmFtIHtSZWZsZWN0aW9uT2JqZWN0fSBwYXJlbnQgUGFyZW50IHJlbW92ZWQgZnJvbVxyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKi9cclxuUmVmbGVjdGlvbk9iamVjdC5wcm90b3R5cGUub25SZW1vdmUgPSBmdW5jdGlvbiBvblJlbW92ZShwYXJlbnQpIHtcclxuICAgIHZhciByb290ID0gcGFyZW50LnJvb3Q7XHJcbiAgICBpZiAocm9vdCBpbnN0YW5jZW9mIFJvb3QpXHJcbiAgICAgICAgcm9vdC5faGFuZGxlUmVtb3ZlKHRoaXMpO1xyXG4gICAgdGhpcy5wYXJlbnQgPSBudWxsO1xyXG4gICAgdGhpcy5yZXNvbHZlZCA9IGZhbHNlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlc29sdmVzIHRoaXMgb2JqZWN0cyB0eXBlIHJlZmVyZW5jZXMuXHJcbiAqIEByZXR1cm5zIHtSZWZsZWN0aW9uT2JqZWN0fSBgdGhpc2BcclxuICovXHJcblJlZmxlY3Rpb25PYmplY3QucHJvdG90eXBlLnJlc29sdmUgPSBmdW5jdGlvbiByZXNvbHZlKCkge1xyXG4gICAgaWYgKHRoaXMucmVzb2x2ZWQpXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICBpZiAodGhpcy5yb290IGluc3RhbmNlb2YgUm9vdClcclxuICAgICAgICB0aGlzLnJlc29sdmVkID0gdHJ1ZTsgLy8gb25seSBpZiBwYXJ0IG9mIGEgcm9vdFxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyBhbiBvcHRpb24gdmFsdWUuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIE9wdGlvbiBuYW1lXHJcbiAqIEByZXR1cm5zIHsqfSBPcHRpb24gdmFsdWUgb3IgYHVuZGVmaW5lZGAgaWYgbm90IHNldFxyXG4gKi9cclxuUmVmbGVjdGlvbk9iamVjdC5wcm90b3R5cGUuZ2V0T3B0aW9uID0gZnVuY3Rpb24gZ2V0T3B0aW9uKG5hbWUpIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMpXHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uc1tuYW1lXTtcclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0cyBhbiBvcHRpb24uXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIE9wdGlvbiBuYW1lXHJcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgT3B0aW9uIHZhbHVlXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lmTm90U2V0XSBTZXRzIHRoZSBvcHRpb24gb25seSBpZiBpdCBpc24ndCBjdXJyZW50bHkgc2V0XHJcbiAqIEByZXR1cm5zIHtSZWZsZWN0aW9uT2JqZWN0fSBgdGhpc2BcclxuICovXHJcblJlZmxlY3Rpb25PYmplY3QucHJvdG90eXBlLnNldE9wdGlvbiA9IGZ1bmN0aW9uIHNldE9wdGlvbihuYW1lLCB2YWx1ZSwgaWZOb3RTZXQpIHtcclxuICAgIGlmICghaWZOb3RTZXQgfHwgIXRoaXMub3B0aW9ucyB8fCB0aGlzLm9wdGlvbnNbbmFtZV0gPT09IHVuZGVmaW5lZClcclxuICAgICAgICAodGhpcy5vcHRpb25zIHx8ICh0aGlzLm9wdGlvbnMgPSB7fSkpW25hbWVdID0gdmFsdWU7XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXRzIG11bHRpcGxlIG9wdGlvbnMuXHJcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG9wdGlvbnMgT3B0aW9ucyB0byBzZXRcclxuICogQHBhcmFtIHtib29sZWFufSBbaWZOb3RTZXRdIFNldHMgYW4gb3B0aW9uIG9ubHkgaWYgaXQgaXNuJ3QgY3VycmVudGx5IHNldFxyXG4gKiBAcmV0dXJucyB7UmVmbGVjdGlvbk9iamVjdH0gYHRoaXNgXHJcbiAqL1xyXG5SZWZsZWN0aW9uT2JqZWN0LnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zLCBpZk5vdFNldCkge1xyXG4gICAgaWYgKG9wdGlvbnMpXHJcbiAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9wdGlvbnMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uKGtleXNbaV0sIG9wdGlvbnNba2V5c1tpXV0sIGlmTm90U2V0KTtcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoaXMgaW5zdGFuY2UgdG8gaXRzIHN0cmluZyByZXByZXNlbnRhdGlvbi5cclxuICogQHJldHVybnMge3N0cmluZ30gQ2xhc3MgbmFtZVssIHNwYWNlLCBmdWxsIG5hbWVdXHJcbiAqL1xyXG5SZWZsZWN0aW9uT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG4gICAgdmFyIGNsYXNzTmFtZSA9IHRoaXMuY29uc3RydWN0b3IuY2xhc3NOYW1lLFxyXG4gICAgICAgIGZ1bGxOYW1lICA9IHRoaXMuZnVsbE5hbWU7XHJcbiAgICBpZiAoZnVsbE5hbWUubGVuZ3RoKVxyXG4gICAgICAgIHJldHVybiBjbGFzc05hbWUgKyBcIiBcIiArIGZ1bGxOYW1lO1xyXG4gICAgcmV0dXJuIGNsYXNzTmFtZTtcclxufTtcclxuXHJcblJlZmxlY3Rpb25PYmplY3QuX2NvbmZpZ3VyZSA9IGZ1bmN0aW9uKFJvb3RfKSB7XHJcbiAgICBSb290ID0gUm9vdF87XHJcbn07XHJcblxyXG59LHtcIjM3XCI6Mzd9XSwyNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IE9uZU9mO1xyXG5cclxuLy8gZXh0ZW5kcyBSZWZsZWN0aW9uT2JqZWN0XHJcbnZhciBSZWZsZWN0aW9uT2JqZWN0ID0gcmVxdWlyZSgyNCk7XHJcbigoT25lT2YucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShSZWZsZWN0aW9uT2JqZWN0LnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yID0gT25lT2YpLmNsYXNzTmFtZSA9IFwiT25lT2ZcIjtcclxuXHJcbnZhciBGaWVsZCA9IHJlcXVpcmUoMTYpLFxyXG4gICAgdXRpbCAgPSByZXF1aXJlKDM3KTtcclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IG9uZW9mIGluc3RhbmNlLlxyXG4gKiBAY2xhc3NkZXNjIFJlZmxlY3RlZCBvbmVvZi5cclxuICogQGV4dGVuZHMgUmVmbGVjdGlvbk9iamVjdFxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgT25lb2YgbmFtZVxyXG4gKiBAcGFyYW0ge3N0cmluZ1tdfE9iamVjdC48c3RyaW5nLCo+fSBbZmllbGROYW1lc10gRmllbGQgbmFtZXNcclxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gW29wdGlvbnNdIERlY2xhcmVkIG9wdGlvbnNcclxuICogQHBhcmFtIHtzdHJpbmd9IFtjb21tZW50XSBDb21tZW50IGFzc29jaWF0ZWQgd2l0aCB0aGlzIGZpZWxkXHJcbiAqL1xyXG5mdW5jdGlvbiBPbmVPZihuYW1lLCBmaWVsZE5hbWVzLCBvcHRpb25zLCBjb21tZW50KSB7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZmllbGROYW1lcykpIHtcclxuICAgICAgICBvcHRpb25zID0gZmllbGROYW1lcztcclxuICAgICAgICBmaWVsZE5hbWVzID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgUmVmbGVjdGlvbk9iamVjdC5jYWxsKHRoaXMsIG5hbWUsIG9wdGlvbnMpO1xyXG5cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgaWYgKCEoZmllbGROYW1lcyA9PT0gdW5kZWZpbmVkIHx8IEFycmF5LmlzQXJyYXkoZmllbGROYW1lcykpKVxyXG4gICAgICAgIHRocm93IFR5cGVFcnJvcihcImZpZWxkTmFtZXMgbXVzdCBiZSBhbiBBcnJheVwiKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpZWxkIG5hbWVzIHRoYXQgYmVsb25nIHRvIHRoaXMgb25lb2YuXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nW119XHJcbiAgICAgKi9cclxuICAgIHRoaXMub25lb2YgPSBmaWVsZE5hbWVzIHx8IFtdOyAvLyB0b0pTT04sIG1hcmtlclxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmllbGRzIHRoYXQgYmVsb25nIHRvIHRoaXMgb25lb2YgYXMgYW4gYXJyYXkgZm9yIGl0ZXJhdGlvbi5cclxuICAgICAqIEB0eXBlIHtGaWVsZFtdfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZmllbGRzQXJyYXkgPSBbXTsgLy8gZGVjbGFyZWQgcmVhZG9ubHkgZm9yIGNvbmZvcm1hbmNlLCBwb3NzaWJseSBub3QgeWV0IGFkZGVkIHRvIHBhcmVudFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29tbWVudCBmb3IgdGhpcyBmaWVsZC5cclxuICAgICAqIEB0eXBlIHtzdHJpbmd8bnVsbH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5jb21tZW50ID0gY29tbWVudDtcclxufVxyXG5cclxuLyoqXHJcbiAqIE9uZW9mIGRlc2NyaXB0b3IuXHJcbiAqIEBpbnRlcmZhY2UgSU9uZU9mXHJcbiAqIEBwcm9wZXJ0eSB7QXJyYXkuPHN0cmluZz59IG9uZW9mIE9uZW9mIGZpZWxkIG5hbWVzXHJcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0LjxzdHJpbmcsKj59IFtvcHRpb25zXSBPbmVvZiBvcHRpb25zXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgYSBvbmVvZiBmcm9tIGEgb25lb2YgZGVzY3JpcHRvci5cclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgT25lb2YgbmFtZVxyXG4gKiBAcGFyYW0ge0lPbmVPZn0ganNvbiBPbmVvZiBkZXNjcmlwdG9yXHJcbiAqIEByZXR1cm5zIHtPbmVPZn0gQ3JlYXRlZCBvbmVvZlxyXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGFyZ3VtZW50cyBhcmUgaW52YWxpZFxyXG4gKi9cclxuT25lT2YuZnJvbUpTT04gPSBmdW5jdGlvbiBmcm9tSlNPTihuYW1lLCBqc29uKSB7XHJcbiAgICByZXR1cm4gbmV3IE9uZU9mKG5hbWUsIGpzb24ub25lb2YsIGpzb24ub3B0aW9ucywganNvbi5jb21tZW50KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGlzIG9uZW9mIHRvIGEgb25lb2YgZGVzY3JpcHRvci5cclxuICogQHBhcmFtIHtJVG9KU09OT3B0aW9uc30gW3RvSlNPTk9wdGlvbnNdIEpTT04gY29udmVyc2lvbiBvcHRpb25zXHJcbiAqIEByZXR1cm5zIHtJT25lT2Z9IE9uZW9mIGRlc2NyaXB0b3JcclxuICovXHJcbk9uZU9mLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04odG9KU09OT3B0aW9ucykge1xyXG4gICAgdmFyIGtlZXBDb21tZW50cyA9IHRvSlNPTk9wdGlvbnMgPyBCb29sZWFuKHRvSlNPTk9wdGlvbnMua2VlcENvbW1lbnRzKSA6IGZhbHNlO1xyXG4gICAgcmV0dXJuIHV0aWwudG9PYmplY3QoW1xyXG4gICAgICAgIFwib3B0aW9uc1wiICwgdGhpcy5vcHRpb25zLFxyXG4gICAgICAgIFwib25lb2ZcIiAgICwgdGhpcy5vbmVvZixcclxuICAgICAgICBcImNvbW1lbnRcIiAsIGtlZXBDb21tZW50cyA/IHRoaXMuY29tbWVudCA6IHVuZGVmaW5lZFxyXG4gICAgXSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkcyB0aGUgZmllbGRzIG9mIHRoZSBzcGVjaWZpZWQgb25lb2YgdG8gdGhlIHBhcmVudCBpZiBub3QgYWxyZWFkeSBkb25lIHNvLlxyXG4gKiBAcGFyYW0ge09uZU9mfSBvbmVvZiBUaGUgb25lb2ZcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICogQGlubmVyXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmZ1bmN0aW9uIGFkZEZpZWxkc1RvUGFyZW50KG9uZW9mKSB7XHJcbiAgICBpZiAob25lb2YucGFyZW50KVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb25lb2YuZmllbGRzQXJyYXkubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgIGlmICghb25lb2YuZmllbGRzQXJyYXlbaV0ucGFyZW50KVxyXG4gICAgICAgICAgICAgICAgb25lb2YucGFyZW50LmFkZChvbmVvZi5maWVsZHNBcnJheVtpXSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBZGRzIGEgZmllbGQgdG8gdGhpcyBvbmVvZiBhbmQgcmVtb3ZlcyBpdCBmcm9tIGl0cyBjdXJyZW50IHBhcmVudCwgaWYgYW55LlxyXG4gKiBAcGFyYW0ge0ZpZWxkfSBmaWVsZCBGaWVsZCB0byBhZGRcclxuICogQHJldHVybnMge09uZU9mfSBgdGhpc2BcclxuICovXHJcbk9uZU9mLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBhZGQoZmllbGQpIHtcclxuXHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgIGlmICghKGZpZWxkIGluc3RhbmNlb2YgRmllbGQpKVxyXG4gICAgICAgIHRocm93IFR5cGVFcnJvcihcImZpZWxkIG11c3QgYmUgYSBGaWVsZFwiKTtcclxuXHJcbiAgICBpZiAoZmllbGQucGFyZW50ICYmIGZpZWxkLnBhcmVudCAhPT0gdGhpcy5wYXJlbnQpXHJcbiAgICAgICAgZmllbGQucGFyZW50LnJlbW92ZShmaWVsZCk7XHJcbiAgICB0aGlzLm9uZW9mLnB1c2goZmllbGQubmFtZSk7XHJcbiAgICB0aGlzLmZpZWxkc0FycmF5LnB1c2goZmllbGQpO1xyXG4gICAgZmllbGQucGFydE9mID0gdGhpczsgLy8gZmllbGQucGFyZW50IHJlbWFpbnMgbnVsbFxyXG4gICAgYWRkRmllbGRzVG9QYXJlbnQodGhpcyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGEgZmllbGQgZnJvbSB0aGlzIG9uZW9mIGFuZCBwdXRzIGl0IGJhY2sgdG8gdGhlIG9uZW9mJ3MgcGFyZW50LlxyXG4gKiBAcGFyYW0ge0ZpZWxkfSBmaWVsZCBGaWVsZCB0byByZW1vdmVcclxuICogQHJldHVybnMge09uZU9mfSBgdGhpc2BcclxuICovXHJcbk9uZU9mLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUoZmllbGQpIHtcclxuXHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgIGlmICghKGZpZWxkIGluc3RhbmNlb2YgRmllbGQpKVxyXG4gICAgICAgIHRocm93IFR5cGVFcnJvcihcImZpZWxkIG11c3QgYmUgYSBGaWVsZFwiKTtcclxuXHJcbiAgICB2YXIgaW5kZXggPSB0aGlzLmZpZWxkc0FycmF5LmluZGV4T2YoZmllbGQpO1xyXG5cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgaWYgKGluZGV4IDwgMClcclxuICAgICAgICB0aHJvdyBFcnJvcihmaWVsZCArIFwiIGlzIG5vdCBhIG1lbWJlciBvZiBcIiArIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuZmllbGRzQXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIGluZGV4ID0gdGhpcy5vbmVvZi5pbmRleE9mKGZpZWxkLm5hbWUpO1xyXG5cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXHJcbiAgICBpZiAoaW5kZXggPiAtMSkgLy8gdGhlb3JldGljYWxcclxuICAgICAgICB0aGlzLm9uZW9mLnNwbGljZShpbmRleCwgMSk7XHJcblxyXG4gICAgZmllbGQucGFydE9mID0gbnVsbDtcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBvdmVycmlkZVxyXG4gKi9cclxuT25lT2YucHJvdG90eXBlLm9uQWRkID0gZnVuY3Rpb24gb25BZGQocGFyZW50KSB7XHJcbiAgICBSZWZsZWN0aW9uT2JqZWN0LnByb3RvdHlwZS5vbkFkZC5jYWxsKHRoaXMsIHBhcmVudCk7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAvLyBDb2xsZWN0IHByZXNlbnQgZmllbGRzXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMub25lb2YubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICB2YXIgZmllbGQgPSBwYXJlbnQuZ2V0KHRoaXMub25lb2ZbaV0pO1xyXG4gICAgICAgIGlmIChmaWVsZCAmJiAhZmllbGQucGFydE9mKSB7XHJcbiAgICAgICAgICAgIGZpZWxkLnBhcnRPZiA9IHNlbGY7XHJcbiAgICAgICAgICAgIHNlbGYuZmllbGRzQXJyYXkucHVzaChmaWVsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gQWRkIG5vdCB5ZXQgcHJlc2VudCBmaWVsZHNcclxuICAgIGFkZEZpZWxkc1RvUGFyZW50KHRoaXMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBvdmVycmlkZVxyXG4gKi9cclxuT25lT2YucHJvdG90eXBlLm9uUmVtb3ZlID0gZnVuY3Rpb24gb25SZW1vdmUocGFyZW50KSB7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgZmllbGQ7IGkgPCB0aGlzLmZpZWxkc0FycmF5Lmxlbmd0aDsgKytpKVxyXG4gICAgICAgIGlmICgoZmllbGQgPSB0aGlzLmZpZWxkc0FycmF5W2ldKS5wYXJlbnQpXHJcbiAgICAgICAgICAgIGZpZWxkLnBhcmVudC5yZW1vdmUoZmllbGQpO1xyXG4gICAgUmVmbGVjdGlvbk9iamVjdC5wcm90b3R5cGUub25SZW1vdmUuY2FsbCh0aGlzLCBwYXJlbnQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERlY29yYXRvciBmdW5jdGlvbiBhcyByZXR1cm5lZCBieSB7QGxpbmsgT25lT2YuZH0gKFR5cGVTY3JpcHQpLlxyXG4gKiBAdHlwZWRlZiBPbmVPZkRlY29yYXRvclxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm90b3R5cGUgVGFyZ2V0IHByb3RvdHlwZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gb25lb2ZOYW1lIE9uZU9mIG5hbWVcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblxyXG4vKipcclxuICogT25lT2YgZGVjb3JhdG9yIChUeXBlU2NyaXB0KS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7Li4uc3RyaW5nfSBmaWVsZE5hbWVzIEZpZWxkIG5hbWVzXHJcbiAqIEByZXR1cm5zIHtPbmVPZkRlY29yYXRvcn0gRGVjb3JhdG9yIGZ1bmN0aW9uXHJcbiAqIEB0ZW1wbGF0ZSBUIGV4dGVuZHMgc3RyaW5nXHJcbiAqL1xyXG5PbmVPZi5kID0gZnVuY3Rpb24gZGVjb3JhdGVPbmVPZigpIHtcclxuICAgIHZhciBmaWVsZE5hbWVzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpLFxyXG4gICAgICAgIGluZGV4ID0gMDtcclxuICAgIHdoaWxlIChpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGgpXHJcbiAgICAgICAgZmllbGROYW1lc1tpbmRleF0gPSBhcmd1bWVudHNbaW5kZXgrK107XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gb25lT2ZEZWNvcmF0b3IocHJvdG90eXBlLCBvbmVvZk5hbWUpIHtcclxuICAgICAgICB1dGlsLmRlY29yYXRlVHlwZShwcm90b3R5cGUuY29uc3RydWN0b3IpXHJcbiAgICAgICAgICAgIC5hZGQobmV3IE9uZU9mKG9uZW9mTmFtZSwgZmllbGROYW1lcykpO1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90b3R5cGUsIG9uZW9mTmFtZSwge1xyXG4gICAgICAgICAgICBnZXQ6IHV0aWwub25lT2ZHZXR0ZXIoZmllbGROYW1lcyksXHJcbiAgICAgICAgICAgIHNldDogdXRpbC5vbmVPZlNldHRlcihmaWVsZE5hbWVzKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxufTtcclxuXHJcbn0se1wiMTZcIjoxNixcIjI0XCI6MjQsXCIzN1wiOjM3fV0sMjY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZTtcclxuXHJcbnBhcnNlLmZpbGVuYW1lID0gbnVsbDtcclxucGFyc2UuZGVmYXVsdHMgPSB7IGtlZXBDYXNlOiBmYWxzZSB9O1xyXG5cclxudmFyIHRva2VuaXplICA9IHJlcXVpcmUoMzQpLFxyXG4gICAgUm9vdCAgICAgID0gcmVxdWlyZSgyOSksXHJcbiAgICBUeXBlICAgICAgPSByZXF1aXJlKDM1KSxcclxuICAgIEZpZWxkICAgICA9IHJlcXVpcmUoMTYpLFxyXG4gICAgTWFwRmllbGQgID0gcmVxdWlyZSgyMCksXHJcbiAgICBPbmVPZiAgICAgPSByZXF1aXJlKDI1KSxcclxuICAgIEVudW0gICAgICA9IHJlcXVpcmUoMTUpLFxyXG4gICAgU2VydmljZSAgID0gcmVxdWlyZSgzMyksXHJcbiAgICBNZXRob2QgICAgPSByZXF1aXJlKDIyKSxcclxuICAgIHR5cGVzICAgICA9IHJlcXVpcmUoMzYpLFxyXG4gICAgdXRpbCAgICAgID0gcmVxdWlyZSgzNyk7XHJcblxyXG52YXIgYmFzZTEwUmUgICAgPSAvXlsxLTldWzAtOV0qJC8sXHJcbiAgICBiYXNlMTBOZWdSZSA9IC9eLT9bMS05XVswLTldKiQvLFxyXG4gICAgYmFzZTE2UmUgICAgPSAvXjBbeF1bMC05YS1mQS1GXSskLyxcclxuICAgIGJhc2UxNk5lZ1JlID0gL14tPzBbeF1bMC05YS1mQS1GXSskLyxcclxuICAgIGJhc2U4UmUgICAgID0gL14wWzAtN10rJC8sXHJcbiAgICBiYXNlOE5lZ1JlICA9IC9eLT8wWzAtN10rJC8sXHJcbiAgICBudW1iZXJSZSAgICA9IC9eKD8hW2VFXSlbMC05XSooPzpcXC5bMC05XSopPyg/OltlRV1bKy1dP1swLTldKyk/JC8sXHJcbiAgICBuYW1lUmUgICAgICA9IC9eW2EtekEtWl9dW2EtekEtWl8wLTldKiQvLFxyXG4gICAgdHlwZVJlZlJlICAgPSAvXig/OlxcLj9bYS16QS1aX11bYS16QS1aXzAtOV0qKSg/OlxcLlthLXpBLVpfXVthLXpBLVpfMC05XSopKiQvLFxyXG4gICAgZnFUeXBlUmVmUmUgPSAvXig/OlxcLlthLXpBLVpfXVthLXpBLVpfMC05XSopKyQvO1xyXG5cclxuLyoqXHJcbiAqIFJlc3VsdCBvYmplY3QgcmV0dXJuZWQgZnJvbSB7QGxpbmsgcGFyc2V9LlxyXG4gKiBAaW50ZXJmYWNlIElQYXJzZXJSZXN1bHRcclxuICogQHByb3BlcnR5IHtzdHJpbmd8dW5kZWZpbmVkfSBwYWNrYWdlIFBhY2thZ2UgbmFtZSwgaWYgZGVjbGFyZWRcclxuICogQHByb3BlcnR5IHtzdHJpbmdbXXx1bmRlZmluZWR9IGltcG9ydHMgSW1wb3J0cywgaWYgYW55XHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW118dW5kZWZpbmVkfSB3ZWFrSW1wb3J0cyBXZWFrIGltcG9ydHMsIGlmIGFueVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ3x1bmRlZmluZWR9IHN5bnRheCBTeW50YXgsIGlmIHNwZWNpZmllZCAoZWl0aGVyIGBcInByb3RvMlwiYCBvciBgXCJwcm90bzNcImApXHJcbiAqIEBwcm9wZXJ0eSB7Um9vdH0gcm9vdCBQb3B1bGF0ZWQgcm9vdCBpbnN0YW5jZVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBPcHRpb25zIG1vZGlmeWluZyB0aGUgYmVoYXZpb3Igb2Yge0BsaW5rIHBhcnNlfS5cclxuICogQGludGVyZmFjZSBJUGFyc2VPcHRpb25zXHJcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2tlZXBDYXNlPWZhbHNlXSBLZWVwcyBmaWVsZCBjYXNpbmcgaW5zdGVhZCBvZiBjb252ZXJ0aW5nIHRvIGNhbWVsIGNhc2VcclxuICogQHByb3BlcnR5IHtib29sZWFufSBbYWx0ZXJuYXRlQ29tbWVudE1vZGU9ZmFsc2VdIFJlY29nbml6ZSBkb3VibGUtc2xhc2ggY29tbWVudHMgaW4gYWRkaXRpb24gdG8gZG9jLWJsb2NrIGNvbW1lbnRzLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBPcHRpb25zIG1vZGlmeWluZyB0aGUgYmVoYXZpb3Igb2YgSlNPTiBzZXJpYWxpemF0aW9uLlxyXG4gKiBAaW50ZXJmYWNlIElUb0pTT05PcHRpb25zXHJcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2tlZXBDb21tZW50cz1mYWxzZV0gU2VyaWFsaXplcyBjb21tZW50cy5cclxuICovXHJcblxyXG4vKipcclxuICogUGFyc2VzIHRoZSBnaXZlbiAucHJvdG8gc291cmNlIGFuZCByZXR1cm5zIGFuIG9iamVjdCB3aXRoIHRoZSBwYXJzZWQgY29udGVudHMuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzb3VyY2UgU291cmNlIGNvbnRlbnRzXHJcbiAqIEBwYXJhbSB7Um9vdH0gcm9vdCBSb290IHRvIHBvcHVsYXRlXHJcbiAqIEBwYXJhbSB7SVBhcnNlT3B0aW9uc30gW29wdGlvbnNdIFBhcnNlIG9wdGlvbnMuIERlZmF1bHRzIHRvIHtAbGluayBwYXJzZS5kZWZhdWx0c30gd2hlbiBvbWl0dGVkLlxyXG4gKiBAcmV0dXJucyB7SVBhcnNlclJlc3VsdH0gUGFyc2VyIHJlc3VsdFxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZmlsZW5hbWU9bnVsbCBDdXJyZW50bHkgcHJvY2Vzc2luZyBmaWxlIG5hbWUgZm9yIGVycm9yIHJlcG9ydGluZywgaWYga25vd25cclxuICogQHByb3BlcnR5IHtJUGFyc2VPcHRpb25zfSBkZWZhdWx0cyBEZWZhdWx0IHtAbGluayBJUGFyc2VPcHRpb25zfVxyXG4gKi9cclxuZnVuY3Rpb24gcGFyc2Uoc291cmNlLCByb290LCBvcHRpb25zKSB7XHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBjYWxsYmFjay1yZXR1cm4gKi9cclxuICAgIGlmICghKHJvb3QgaW5zdGFuY2VvZiBSb290KSkge1xyXG4gICAgICAgIG9wdGlvbnMgPSByb290O1xyXG4gICAgICAgIHJvb3QgPSBuZXcgUm9vdCgpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFvcHRpb25zKVxyXG4gICAgICAgIG9wdGlvbnMgPSBwYXJzZS5kZWZhdWx0cztcclxuXHJcbiAgICB2YXIgdG4gPSB0b2tlbml6ZShzb3VyY2UsIG9wdGlvbnMuYWx0ZXJuYXRlQ29tbWVudE1vZGUgfHwgZmFsc2UpLFxyXG4gICAgICAgIG5leHQgPSB0bi5uZXh0LFxyXG4gICAgICAgIHB1c2ggPSB0bi5wdXNoLFxyXG4gICAgICAgIHBlZWsgPSB0bi5wZWVrLFxyXG4gICAgICAgIHNraXAgPSB0bi5za2lwLFxyXG4gICAgICAgIGNtbnQgPSB0bi5jbW50O1xyXG5cclxuICAgIHZhciBoZWFkID0gdHJ1ZSxcclxuICAgICAgICBwa2csXHJcbiAgICAgICAgaW1wb3J0cyxcclxuICAgICAgICB3ZWFrSW1wb3J0cyxcclxuICAgICAgICBzeW50YXgsXHJcbiAgICAgICAgaXNQcm90bzMgPSBmYWxzZTtcclxuXHJcbiAgICB2YXIgcHRyID0gcm9vdDtcclxuXHJcbiAgICB2YXIgYXBwbHlDYXNlID0gb3B0aW9ucy5rZWVwQ2FzZSA/IGZ1bmN0aW9uKG5hbWUpIHsgcmV0dXJuIG5hbWU7IH0gOiB1dGlsLmNhbWVsQ2FzZTtcclxuXHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgZnVuY3Rpb24gaWxsZWdhbCh0b2tlbiwgbmFtZSwgaW5zaWRlVHJ5Q2F0Y2gpIHtcclxuICAgICAgICB2YXIgZmlsZW5hbWUgPSBwYXJzZS5maWxlbmFtZTtcclxuICAgICAgICBpZiAoIWluc2lkZVRyeUNhdGNoKVxyXG4gICAgICAgICAgICBwYXJzZS5maWxlbmFtZSA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIEVycm9yKFwiaWxsZWdhbCBcIiArIChuYW1lIHx8IFwidG9rZW5cIikgKyBcIiAnXCIgKyB0b2tlbiArIFwiJyAoXCIgKyAoZmlsZW5hbWUgPyBmaWxlbmFtZSArIFwiLCBcIiA6IFwiXCIpICsgXCJsaW5lIFwiICsgdG4ubGluZSArIFwiKVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZWFkU3RyaW5nKCkge1xyXG4gICAgICAgIHZhciB2YWx1ZXMgPSBbXSxcclxuICAgICAgICAgICAgdG9rZW47XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICAgICAgaWYgKCh0b2tlbiA9IG5leHQoKSkgIT09IFwiXFxcIlwiICYmIHRva2VuICE9PSBcIidcIilcclxuICAgICAgICAgICAgICAgIHRocm93IGlsbGVnYWwodG9rZW4pO1xyXG5cclxuICAgICAgICAgICAgdmFsdWVzLnB1c2gobmV4dCgpKTtcclxuICAgICAgICAgICAgc2tpcCh0b2tlbik7XHJcbiAgICAgICAgICAgIHRva2VuID0gcGVlaygpO1xyXG4gICAgICAgIH0gd2hpbGUgKHRva2VuID09PSBcIlxcXCJcIiB8fCB0b2tlbiA9PT0gXCInXCIpO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZXMuam9pbihcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZWFkVmFsdWUoYWNjZXB0VHlwZVJlZikge1xyXG4gICAgICAgIHZhciB0b2tlbiA9IG5leHQoKTtcclxuICAgICAgICBzd2l0Y2ggKHRva2VuKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCInXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJcXFwiXCI6XHJcbiAgICAgICAgICAgICAgICBwdXNoKHRva2VuKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWFkU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ0cnVlXCI6IGNhc2UgXCJUUlVFXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgY2FzZSBcImZhbHNlXCI6IGNhc2UgXCJGQUxTRVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VOdW1iZXIodG9rZW4sIC8qIGluc2lkZVRyeUNhdGNoICovIHRydWUpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuXHJcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXHJcbiAgICAgICAgICAgIGlmIChhY2NlcHRUeXBlUmVmICYmIHR5cGVSZWZSZS50ZXN0KHRva2VuKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcclxuXHJcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgICAgIHRocm93IGlsbGVnYWwodG9rZW4sIFwidmFsdWVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlYWRSYW5nZXModGFyZ2V0LCBhY2NlcHRTdHJpbmdzKSB7XHJcbiAgICAgICAgdmFyIHRva2VuLCBzdGFydDtcclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIGlmIChhY2NlcHRTdHJpbmdzICYmICgodG9rZW4gPSBwZWVrKCkpID09PSBcIlxcXCJcIiB8fCB0b2tlbiA9PT0gXCInXCIpKVxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnB1c2gocmVhZFN0cmluZygpKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnB1c2goWyBzdGFydCA9IHBhcnNlSWQobmV4dCgpKSwgc2tpcChcInRvXCIsIHRydWUpID8gcGFyc2VJZChuZXh0KCkpIDogc3RhcnQgXSk7XHJcbiAgICAgICAgfSB3aGlsZSAoc2tpcChcIixcIiwgdHJ1ZSkpO1xyXG4gICAgICAgIHNraXAoXCI7XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBhcnNlTnVtYmVyKHRva2VuLCBpbnNpZGVUcnlDYXRjaCkge1xyXG4gICAgICAgIHZhciBzaWduID0gMTtcclxuICAgICAgICBpZiAodG9rZW4uY2hhckF0KDApID09PSBcIi1cIikge1xyXG4gICAgICAgICAgICBzaWduID0gLTE7XHJcbiAgICAgICAgICAgIHRva2VuID0gdG9rZW4uc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKHRva2VuKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJpbmZcIjogY2FzZSBcIklORlwiOiBjYXNlIFwiSW5mXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2lnbiAqIEluZmluaXR5O1xyXG4gICAgICAgICAgICBjYXNlIFwibmFuXCI6IGNhc2UgXCJOQU5cIjogY2FzZSBcIk5hblwiOiBjYXNlIFwiTmFOXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTmFOO1xyXG4gICAgICAgICAgICBjYXNlIFwiMFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChiYXNlMTBSZS50ZXN0KHRva2VuKSlcclxuICAgICAgICAgICAgcmV0dXJuIHNpZ24gKiBwYXJzZUludCh0b2tlbiwgMTApO1xyXG4gICAgICAgIGlmIChiYXNlMTZSZS50ZXN0KHRva2VuKSlcclxuICAgICAgICAgICAgcmV0dXJuIHNpZ24gKiBwYXJzZUludCh0b2tlbiwgMTYpO1xyXG4gICAgICAgIGlmIChiYXNlOFJlLnRlc3QodG9rZW4pKVxyXG4gICAgICAgICAgICByZXR1cm4gc2lnbiAqIHBhcnNlSW50KHRva2VuLCA4KTtcclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cclxuICAgICAgICBpZiAobnVtYmVyUmUudGVzdCh0b2tlbikpXHJcbiAgICAgICAgICAgIHJldHVybiBzaWduICogcGFyc2VGbG9hdCh0b2tlbik7XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgdGhyb3cgaWxsZWdhbCh0b2tlbiwgXCJudW1iZXJcIiwgaW5zaWRlVHJ5Q2F0Y2gpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBhcnNlSWQodG9rZW4sIGFjY2VwdE5lZ2F0aXZlKSB7XHJcbiAgICAgICAgc3dpdGNoICh0b2tlbikge1xyXG4gICAgICAgICAgICBjYXNlIFwibWF4XCI6IGNhc2UgXCJNQVhcIjogY2FzZSBcIk1heFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDUzNjg3MDkxMTtcclxuICAgICAgICAgICAgY2FzZSBcIjBcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKCFhY2NlcHROZWdhdGl2ZSAmJiB0b2tlbi5jaGFyQXQoMCkgPT09IFwiLVwiKVxyXG4gICAgICAgICAgICB0aHJvdyBpbGxlZ2FsKHRva2VuLCBcImlkXCIpO1xyXG5cclxuICAgICAgICBpZiAoYmFzZTEwTmVnUmUudGVzdCh0b2tlbikpXHJcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludCh0b2tlbiwgMTApO1xyXG4gICAgICAgIGlmIChiYXNlMTZOZWdSZS50ZXN0KHRva2VuKSlcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRva2VuLCAxNik7XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXHJcbiAgICAgICAgaWYgKGJhc2U4TmVnUmUudGVzdCh0b2tlbikpXHJcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludCh0b2tlbiwgOCk7XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgdGhyb3cgaWxsZWdhbCh0b2tlbiwgXCJpZFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwYXJzZVBhY2thZ2UoKSB7XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmIChwa2cgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgdGhyb3cgaWxsZWdhbChcInBhY2thZ2VcIik7XHJcblxyXG4gICAgICAgIHBrZyA9IG5leHQoKTtcclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKCF0eXBlUmVmUmUudGVzdChwa2cpKVxyXG4gICAgICAgICAgICB0aHJvdyBpbGxlZ2FsKHBrZywgXCJuYW1lXCIpO1xyXG5cclxuICAgICAgICBwdHIgPSBwdHIuZGVmaW5lKHBrZyk7XHJcbiAgICAgICAgc2tpcChcIjtcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcGFyc2VJbXBvcnQoKSB7XHJcbiAgICAgICAgdmFyIHRva2VuID0gcGVlaygpO1xyXG4gICAgICAgIHZhciB3aGljaEltcG9ydHM7XHJcbiAgICAgICAgc3dpdGNoICh0b2tlbikge1xyXG4gICAgICAgICAgICBjYXNlIFwid2Vha1wiOlxyXG4gICAgICAgICAgICAgICAgd2hpY2hJbXBvcnRzID0gd2Vha0ltcG9ydHMgfHwgKHdlYWtJbXBvcnRzID0gW10pO1xyXG4gICAgICAgICAgICAgICAgbmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJwdWJsaWNcIjpcclxuICAgICAgICAgICAgICAgIG5leHQoKTtcclxuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZmFsbHRocm91Z2hcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHdoaWNoSW1wb3J0cyA9IGltcG9ydHMgfHwgKGltcG9ydHMgPSBbXSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdG9rZW4gPSByZWFkU3RyaW5nKCk7XHJcbiAgICAgICAgc2tpcChcIjtcIik7XHJcbiAgICAgICAgd2hpY2hJbXBvcnRzLnB1c2godG9rZW4pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBhcnNlU3ludGF4KCkge1xyXG4gICAgICAgIHNraXAoXCI9XCIpO1xyXG4gICAgICAgIHN5bnRheCA9IHJlYWRTdHJpbmcoKTtcclxuICAgICAgICBpc1Byb3RvMyA9IHN5bnRheCA9PT0gXCJwcm90bzNcIjtcclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKCFpc1Byb3RvMyAmJiBzeW50YXggIT09IFwicHJvdG8yXCIpXHJcbiAgICAgICAgICAgIHRocm93IGlsbGVnYWwoc3ludGF4LCBcInN5bnRheFwiKTtcclxuXHJcbiAgICAgICAgc2tpcChcIjtcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcGFyc2VDb21tb24ocGFyZW50LCB0b2tlbikge1xyXG4gICAgICAgIHN3aXRjaCAodG9rZW4pIHtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgXCJvcHRpb25cIjpcclxuICAgICAgICAgICAgICAgIHBhcnNlT3B0aW9uKHBhcmVudCwgdG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgc2tpcChcIjtcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgXCJtZXNzYWdlXCI6XHJcbiAgICAgICAgICAgICAgICBwYXJzZVR5cGUocGFyZW50LCB0b2tlbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgXCJlbnVtXCI6XHJcbiAgICAgICAgICAgICAgICBwYXJzZUVudW0ocGFyZW50LCB0b2tlbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgXCJzZXJ2aWNlXCI6XHJcbiAgICAgICAgICAgICAgICBwYXJzZVNlcnZpY2UocGFyZW50LCB0b2tlbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgXCJleHRlbmRcIjpcclxuICAgICAgICAgICAgICAgIHBhcnNlRXh0ZW5zaW9uKHBhcmVudCwgdG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpZkJsb2NrKG9iaiwgZm5JZiwgZm5FbHNlKSB7XHJcbiAgICAgICAgdmFyIHRyYWlsaW5nTGluZSA9IHRuLmxpbmU7XHJcbiAgICAgICAgaWYgKG9iaikge1xyXG4gICAgICAgICAgICBvYmouY29tbWVudCA9IGNtbnQoKTsgLy8gdHJ5IGJsb2NrLXR5cGUgY29tbWVudFxyXG4gICAgICAgICAgICBvYmouZmlsZW5hbWUgPSBwYXJzZS5maWxlbmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNraXAoXCJ7XCIsIHRydWUpKSB7XHJcbiAgICAgICAgICAgIHZhciB0b2tlbjtcclxuICAgICAgICAgICAgd2hpbGUgKCh0b2tlbiA9IG5leHQoKSkgIT09IFwifVwiKVxyXG4gICAgICAgICAgICAgICAgZm5JZih0b2tlbik7XHJcbiAgICAgICAgICAgIHNraXAoXCI7XCIsIHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChmbkVsc2UpXHJcbiAgICAgICAgICAgICAgICBmbkVsc2UoKTtcclxuICAgICAgICAgICAgc2tpcChcIjtcIik7XHJcbiAgICAgICAgICAgIGlmIChvYmogJiYgdHlwZW9mIG9iai5jb21tZW50ICE9PSBcInN0cmluZ1wiKVxyXG4gICAgICAgICAgICAgICAgb2JqLmNvbW1lbnQgPSBjbW50KHRyYWlsaW5nTGluZSk7IC8vIHRyeSBsaW5lLXR5cGUgY29tbWVudCBpZiBubyBibG9ja1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwYXJzZVR5cGUocGFyZW50LCB0b2tlbikge1xyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICBpZiAoIW5hbWVSZS50ZXN0KHRva2VuID0gbmV4dCgpKSlcclxuICAgICAgICAgICAgdGhyb3cgaWxsZWdhbCh0b2tlbiwgXCJ0eXBlIG5hbWVcIik7XHJcblxyXG4gICAgICAgIHZhciB0eXBlID0gbmV3IFR5cGUodG9rZW4pO1xyXG4gICAgICAgIGlmQmxvY2sodHlwZSwgZnVuY3Rpb24gcGFyc2VUeXBlX2Jsb2NrKHRva2VuKSB7XHJcbiAgICAgICAgICAgIGlmIChwYXJzZUNvbW1vbih0eXBlLCB0b2tlbikpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKHRva2VuKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm1hcFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlTWFwRmllbGQodHlwZSwgdG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgXCJyZXF1aXJlZFwiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm9wdGlvbmFsXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwicmVwZWF0ZWRcIjpcclxuICAgICAgICAgICAgICAgICAgICBwYXJzZUZpZWxkKHR5cGUsIHRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlIFwib25lb2ZcIjpcclxuICAgICAgICAgICAgICAgICAgICBwYXJzZU9uZU9mKHR5cGUsIHRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiZXh0ZW5zaW9uc1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRSYW5nZXModHlwZS5leHRlbnNpb25zIHx8ICh0eXBlLmV4dGVuc2lvbnMgPSBbXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgXCJyZXNlcnZlZFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRSYW5nZXModHlwZS5yZXNlcnZlZCB8fCAodHlwZS5yZXNlcnZlZCA9IFtdKSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzUHJvdG8zIHx8ICF0eXBlUmVmUmUudGVzdCh0b2tlbikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGlsbGVnYWwodG9rZW4pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBwdXNoKHRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICBwYXJzZUZpZWxkKHR5cGUsIFwib3B0aW9uYWxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBwYXJlbnQuYWRkKHR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBhcnNlRmllbGQocGFyZW50LCBydWxlLCBleHRlbmQpIHtcclxuICAgICAgICB2YXIgdHlwZSA9IG5leHQoKTtcclxuICAgICAgICBpZiAodHlwZSA9PT0gXCJncm91cFwiKSB7XHJcbiAgICAgICAgICAgIHBhcnNlR3JvdXAocGFyZW50LCBydWxlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKCF0eXBlUmVmUmUudGVzdCh0eXBlKSlcclxuICAgICAgICAgICAgdGhyb3cgaWxsZWdhbCh0eXBlLCBcInR5cGVcIik7XHJcblxyXG4gICAgICAgIHZhciBuYW1lID0gbmV4dCgpO1xyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICBpZiAoIW5hbWVSZS50ZXN0KG5hbWUpKVxyXG4gICAgICAgICAgICB0aHJvdyBpbGxlZ2FsKG5hbWUsIFwibmFtZVwiKTtcclxuXHJcbiAgICAgICAgbmFtZSA9IGFwcGx5Q2FzZShuYW1lKTtcclxuICAgICAgICBza2lwKFwiPVwiKTtcclxuXHJcbiAgICAgICAgdmFyIGZpZWxkID0gbmV3IEZpZWxkKG5hbWUsIHBhcnNlSWQobmV4dCgpKSwgdHlwZSwgcnVsZSwgZXh0ZW5kKTtcclxuICAgICAgICBpZkJsb2NrKGZpZWxkLCBmdW5jdGlvbiBwYXJzZUZpZWxkX2Jsb2NrKHRva2VuKSB7XHJcblxyXG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xyXG4gICAgICAgICAgICBpZiAodG9rZW4gPT09IFwib3B0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgIHBhcnNlT3B0aW9uKGZpZWxkLCB0b2tlbik7XHJcbiAgICAgICAgICAgICAgICBza2lwKFwiO1wiKTtcclxuICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBpbGxlZ2FsKHRva2VuKTtcclxuXHJcbiAgICAgICAgfSwgZnVuY3Rpb24gcGFyc2VGaWVsZF9saW5lKCkge1xyXG4gICAgICAgICAgICBwYXJzZUlubGluZU9wdGlvbnMoZmllbGQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBhcmVudC5hZGQoZmllbGQpO1xyXG5cclxuICAgICAgICAvLyBKU09OIGRlZmF1bHRzIHRvIHBhY2tlZD10cnVlIGlmIG5vdCBzZXQgc28gd2UgaGF2ZSB0byBzZXQgcGFja2VkPWZhbHNlIGV4cGxpY2l0eSB3aGVuXHJcbiAgICAgICAgLy8gcGFyc2luZyBwcm90bzIgZGVzY3JpcHRvcnMgd2l0aG91dCB0aGUgb3B0aW9uLCB3aGVyZSBhcHBsaWNhYmxlLiBUaGlzIG11c3QgYmUgZG9uZSBmb3JcclxuICAgICAgICAvLyBhbGwga25vd24gcGFja2FibGUgdHlwZXMgYW5kIGFueXRoaW5nIHRoYXQgY291bGQgYmUgYW4gZW51bSAoPSBpcyBub3QgYSBiYXNpYyB0eXBlKS5cclxuICAgICAgICBpZiAoIWlzUHJvdG8zICYmIGZpZWxkLnJlcGVhdGVkICYmICh0eXBlcy5wYWNrZWRbdHlwZV0gIT09IHVuZGVmaW5lZCB8fCB0eXBlcy5iYXNpY1t0eXBlXSA9PT0gdW5kZWZpbmVkKSlcclxuICAgICAgICAgICAgZmllbGQuc2V0T3B0aW9uKFwicGFja2VkXCIsIGZhbHNlLCAvKiBpZk5vdFNldCAqLyB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwYXJzZUdyb3VwKHBhcmVudCwgcnVsZSkge1xyXG4gICAgICAgIHZhciBuYW1lID0gbmV4dCgpO1xyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICBpZiAoIW5hbWVSZS50ZXN0KG5hbWUpKVxyXG4gICAgICAgICAgICB0aHJvdyBpbGxlZ2FsKG5hbWUsIFwibmFtZVwiKTtcclxuXHJcbiAgICAgICAgdmFyIGZpZWxkTmFtZSA9IHV0aWwubGNGaXJzdChuYW1lKTtcclxuICAgICAgICBpZiAobmFtZSA9PT0gZmllbGROYW1lKVxyXG4gICAgICAgICAgICBuYW1lID0gdXRpbC51Y0ZpcnN0KG5hbWUpO1xyXG4gICAgICAgIHNraXAoXCI9XCIpO1xyXG4gICAgICAgIHZhciBpZCA9IHBhcnNlSWQobmV4dCgpKTtcclxuICAgICAgICB2YXIgdHlwZSA9IG5ldyBUeXBlKG5hbWUpO1xyXG4gICAgICAgIHR5cGUuZ3JvdXAgPSB0cnVlO1xyXG4gICAgICAgIHZhciBmaWVsZCA9IG5ldyBGaWVsZChmaWVsZE5hbWUsIGlkLCBuYW1lLCBydWxlKTtcclxuICAgICAgICBmaWVsZC5maWxlbmFtZSA9IHBhcnNlLmZpbGVuYW1lO1xyXG4gICAgICAgIGlmQmxvY2sodHlwZSwgZnVuY3Rpb24gcGFyc2VHcm91cF9ibG9jayh0b2tlbikge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRva2VuKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm9wdGlvblwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlT3B0aW9uKHR5cGUsIHRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICBza2lwKFwiO1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlIFwicmVxdWlyZWRcIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJvcHRpb25hbFwiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcInJlcGVhdGVkXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VGaWVsZCh0eXBlLCB0b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgaWxsZWdhbCh0b2tlbik7IC8vIHRoZXJlIGFyZSBubyBncm91cHMgd2l0aCBwcm90bzMgc2VtYW50aWNzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBwYXJlbnQuYWRkKHR5cGUpXHJcbiAgICAgICAgICAgICAgLmFkZChmaWVsZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcGFyc2VNYXBGaWVsZChwYXJlbnQpIHtcclxuICAgICAgICBza2lwKFwiPFwiKTtcclxuICAgICAgICB2YXIga2V5VHlwZSA9IG5leHQoKTtcclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKHR5cGVzLm1hcEtleVtrZXlUeXBlXSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB0aHJvdyBpbGxlZ2FsKGtleVR5cGUsIFwidHlwZVwiKTtcclxuXHJcbiAgICAgICAgc2tpcChcIixcIik7XHJcbiAgICAgICAgdmFyIHZhbHVlVHlwZSA9IG5leHQoKTtcclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKCF0eXBlUmVmUmUudGVzdCh2YWx1ZVR5cGUpKVxyXG4gICAgICAgICAgICB0aHJvdyBpbGxlZ2FsKHZhbHVlVHlwZSwgXCJ0eXBlXCIpO1xyXG5cclxuICAgICAgICBza2lwKFwiPlwiKTtcclxuICAgICAgICB2YXIgbmFtZSA9IG5leHQoKTtcclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKCFuYW1lUmUudGVzdChuYW1lKSlcclxuICAgICAgICAgICAgdGhyb3cgaWxsZWdhbChuYW1lLCBcIm5hbWVcIik7XHJcblxyXG4gICAgICAgIHNraXAoXCI9XCIpO1xyXG4gICAgICAgIHZhciBmaWVsZCA9IG5ldyBNYXBGaWVsZChhcHBseUNhc2UobmFtZSksIHBhcnNlSWQobmV4dCgpKSwga2V5VHlwZSwgdmFsdWVUeXBlKTtcclxuICAgICAgICBpZkJsb2NrKGZpZWxkLCBmdW5jdGlvbiBwYXJzZU1hcEZpZWxkX2Jsb2NrKHRva2VuKSB7XHJcblxyXG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xyXG4gICAgICAgICAgICBpZiAodG9rZW4gPT09IFwib3B0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgIHBhcnNlT3B0aW9uKGZpZWxkLCB0b2tlbik7XHJcbiAgICAgICAgICAgICAgICBza2lwKFwiO1wiKTtcclxuICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBpbGxlZ2FsKHRva2VuKTtcclxuXHJcbiAgICAgICAgfSwgZnVuY3Rpb24gcGFyc2VNYXBGaWVsZF9saW5lKCkge1xyXG4gICAgICAgICAgICBwYXJzZUlubGluZU9wdGlvbnMoZmllbGQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBhcmVudC5hZGQoZmllbGQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBhcnNlT25lT2YocGFyZW50LCB0b2tlbikge1xyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICBpZiAoIW5hbWVSZS50ZXN0KHRva2VuID0gbmV4dCgpKSlcclxuICAgICAgICAgICAgdGhyb3cgaWxsZWdhbCh0b2tlbiwgXCJuYW1lXCIpO1xyXG5cclxuICAgICAgICB2YXIgb25lb2YgPSBuZXcgT25lT2YoYXBwbHlDYXNlKHRva2VuKSk7XHJcbiAgICAgICAgaWZCbG9jayhvbmVvZiwgZnVuY3Rpb24gcGFyc2VPbmVPZl9ibG9jayh0b2tlbikge1xyXG4gICAgICAgICAgICBpZiAodG9rZW4gPT09IFwib3B0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgIHBhcnNlT3B0aW9uKG9uZW9mLCB0b2tlbik7XHJcbiAgICAgICAgICAgICAgICBza2lwKFwiO1wiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHB1c2godG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgcGFyc2VGaWVsZChvbmVvZiwgXCJvcHRpb25hbFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBhcmVudC5hZGQob25lb2YpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBhcnNlRW51bShwYXJlbnQsIHRva2VuKSB7XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmICghbmFtZVJlLnRlc3QodG9rZW4gPSBuZXh0KCkpKVxyXG4gICAgICAgICAgICB0aHJvdyBpbGxlZ2FsKHRva2VuLCBcIm5hbWVcIik7XHJcblxyXG4gICAgICAgIHZhciBlbm0gPSBuZXcgRW51bSh0b2tlbik7XHJcbiAgICAgICAgaWZCbG9jayhlbm0sIGZ1bmN0aW9uIHBhcnNlRW51bV9ibG9jayh0b2tlbikge1xyXG4gICAgICAgICAgc3dpdGNoKHRva2VuKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJvcHRpb25cIjpcclxuICAgICAgICAgICAgICBwYXJzZU9wdGlvbihlbm0sIHRva2VuKTtcclxuICAgICAgICAgICAgICBza2lwKFwiO1wiKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgXCJyZXNlcnZlZFwiOlxyXG4gICAgICAgICAgICAgIHJlYWRSYW5nZXMoZW5tLnJlc2VydmVkIHx8IChlbm0ucmVzZXJ2ZWQgPSBbXSksIHRydWUpO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICBwYXJzZUVudW1WYWx1ZShlbm0sIHRva2VuKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBwYXJlbnQuYWRkKGVubSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcGFyc2VFbnVtVmFsdWUocGFyZW50LCB0b2tlbikge1xyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICBpZiAoIW5hbWVSZS50ZXN0KHRva2VuKSlcclxuICAgICAgICAgICAgdGhyb3cgaWxsZWdhbCh0b2tlbiwgXCJuYW1lXCIpO1xyXG5cclxuICAgICAgICBza2lwKFwiPVwiKTtcclxuICAgICAgICB2YXIgdmFsdWUgPSBwYXJzZUlkKG5leHQoKSwgdHJ1ZSksXHJcbiAgICAgICAgICAgIGR1bW15ID0ge307XHJcbiAgICAgICAgaWZCbG9jayhkdW1teSwgZnVuY3Rpb24gcGFyc2VFbnVtVmFsdWVfYmxvY2sodG9rZW4pIHtcclxuXHJcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXHJcbiAgICAgICAgICAgIGlmICh0b2tlbiA9PT0gXCJvcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgcGFyc2VPcHRpb24oZHVtbXksIHRva2VuKTsgLy8gc2tpcFxyXG4gICAgICAgICAgICAgICAgc2tpcChcIjtcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgaWxsZWdhbCh0b2tlbik7XHJcblxyXG4gICAgICAgIH0sIGZ1bmN0aW9uIHBhcnNlRW51bVZhbHVlX2xpbmUoKSB7XHJcbiAgICAgICAgICAgIHBhcnNlSW5saW5lT3B0aW9ucyhkdW1teSk7IC8vIHNraXBcclxuICAgICAgICB9KTtcclxuICAgICAgICBwYXJlbnQuYWRkKHRva2VuLCB2YWx1ZSwgZHVtbXkuY29tbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcGFyc2VPcHRpb24ocGFyZW50LCB0b2tlbikge1xyXG4gICAgICAgIHZhciBpc0N1c3RvbSA9IHNraXAoXCIoXCIsIHRydWUpO1xyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICBpZiAoIXR5cGVSZWZSZS50ZXN0KHRva2VuID0gbmV4dCgpKSlcclxuICAgICAgICAgICAgdGhyb3cgaWxsZWdhbCh0b2tlbiwgXCJuYW1lXCIpO1xyXG5cclxuICAgICAgICB2YXIgbmFtZSA9IHRva2VuO1xyXG4gICAgICAgIGlmIChpc0N1c3RvbSkge1xyXG4gICAgICAgICAgICBza2lwKFwiKVwiKTtcclxuICAgICAgICAgICAgbmFtZSA9IFwiKFwiICsgbmFtZSArIFwiKVwiO1xyXG4gICAgICAgICAgICB0b2tlbiA9IHBlZWsoKTtcclxuICAgICAgICAgICAgaWYgKGZxVHlwZVJlZlJlLnRlc3QodG9rZW4pKSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lICs9IHRva2VuO1xyXG4gICAgICAgICAgICAgICAgbmV4dCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNraXAoXCI9XCIpO1xyXG4gICAgICAgIHBhcnNlT3B0aW9uVmFsdWUocGFyZW50LCBuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwYXJzZU9wdGlvblZhbHVlKHBhcmVudCwgbmFtZSkge1xyXG4gICAgICAgIGlmIChza2lwKFwie1wiLCB0cnVlKSkgeyAvLyB7IGE6IFwiZm9vXCIgYiB7IGM6IFwiYmFyXCIgfSB9XHJcbiAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgICAgICAgICAgaWYgKCFuYW1lUmUudGVzdCh0b2tlbiA9IG5leHQoKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgaWxsZWdhbCh0b2tlbiwgXCJuYW1lXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwZWVrKCkgPT09IFwie1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlT3B0aW9uVmFsdWUocGFyZW50LCBuYW1lICsgXCIuXCIgKyB0b2tlbik7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBza2lwKFwiOlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGVlaygpID09PSBcIntcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VPcHRpb25WYWx1ZShwYXJlbnQsIG5hbWUgKyBcIi5cIiArIHRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldE9wdGlvbihwYXJlbnQsIG5hbWUgKyBcIi5cIiArIHRva2VuLCByZWFkVmFsdWUodHJ1ZSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IHdoaWxlICghc2tpcChcIn1cIiwgdHJ1ZSkpO1xyXG4gICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICBzZXRPcHRpb24ocGFyZW50LCBuYW1lLCByZWFkVmFsdWUodHJ1ZSkpO1xyXG4gICAgICAgIC8vIERvZXMgbm90IGVuZm9yY2UgYSBkZWxpbWl0ZXIgdG8gYmUgdW5pdmVyc2FsXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0T3B0aW9uKHBhcmVudCwgbmFtZSwgdmFsdWUpIHtcclxuICAgICAgICBpZiAocGFyZW50LnNldE9wdGlvbilcclxuICAgICAgICAgICAgcGFyZW50LnNldE9wdGlvbihuYW1lLCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcGFyc2VJbmxpbmVPcHRpb25zKHBhcmVudCkge1xyXG4gICAgICAgIGlmIChza2lwKFwiW1wiLCB0cnVlKSkge1xyXG4gICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICBwYXJzZU9wdGlvbihwYXJlbnQsIFwib3B0aW9uXCIpO1xyXG4gICAgICAgICAgICB9IHdoaWxlIChza2lwKFwiLFwiLCB0cnVlKSk7XHJcbiAgICAgICAgICAgIHNraXAoXCJdXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGFyZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBhcnNlU2VydmljZShwYXJlbnQsIHRva2VuKSB7XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmICghbmFtZVJlLnRlc3QodG9rZW4gPSBuZXh0KCkpKVxyXG4gICAgICAgICAgICB0aHJvdyBpbGxlZ2FsKHRva2VuLCBcInNlcnZpY2UgbmFtZVwiKTtcclxuXHJcbiAgICAgICAgdmFyIHNlcnZpY2UgPSBuZXcgU2VydmljZSh0b2tlbik7XHJcbiAgICAgICAgaWZCbG9jayhzZXJ2aWNlLCBmdW5jdGlvbiBwYXJzZVNlcnZpY2VfYmxvY2sodG9rZW4pIHtcclxuICAgICAgICAgICAgaWYgKHBhcnNlQ29tbW9uKHNlcnZpY2UsIHRva2VuKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXHJcbiAgICAgICAgICAgIGlmICh0b2tlbiA9PT0gXCJycGNcIilcclxuICAgICAgICAgICAgICAgIHBhcnNlTWV0aG9kKHNlcnZpY2UsIHRva2VuKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgaWxsZWdhbCh0b2tlbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGFyZW50LmFkZChzZXJ2aWNlKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwYXJzZU1ldGhvZChwYXJlbnQsIHRva2VuKSB7XHJcbiAgICAgICAgdmFyIHR5cGUgPSB0b2tlbjtcclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKCFuYW1lUmUudGVzdCh0b2tlbiA9IG5leHQoKSkpXHJcbiAgICAgICAgICAgIHRocm93IGlsbGVnYWwodG9rZW4sIFwibmFtZVwiKTtcclxuXHJcbiAgICAgICAgdmFyIG5hbWUgPSB0b2tlbixcclxuICAgICAgICAgICAgcmVxdWVzdFR5cGUsIHJlcXVlc3RTdHJlYW0sXHJcbiAgICAgICAgICAgIHJlc3BvbnNlVHlwZSwgcmVzcG9uc2VTdHJlYW07XHJcblxyXG4gICAgICAgIHNraXAoXCIoXCIpO1xyXG4gICAgICAgIGlmIChza2lwKFwic3RyZWFtXCIsIHRydWUpKVxyXG4gICAgICAgICAgICByZXF1ZXN0U3RyZWFtID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKCF0eXBlUmVmUmUudGVzdCh0b2tlbiA9IG5leHQoKSkpXHJcbiAgICAgICAgICAgIHRocm93IGlsbGVnYWwodG9rZW4pO1xyXG5cclxuICAgICAgICByZXF1ZXN0VHlwZSA9IHRva2VuO1xyXG4gICAgICAgIHNraXAoXCIpXCIpOyBza2lwKFwicmV0dXJuc1wiKTsgc2tpcChcIihcIik7XHJcbiAgICAgICAgaWYgKHNraXAoXCJzdHJlYW1cIiwgdHJ1ZSkpXHJcbiAgICAgICAgICAgIHJlc3BvbnNlU3RyZWFtID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKCF0eXBlUmVmUmUudGVzdCh0b2tlbiA9IG5leHQoKSkpXHJcbiAgICAgICAgICAgIHRocm93IGlsbGVnYWwodG9rZW4pO1xyXG5cclxuICAgICAgICByZXNwb25zZVR5cGUgPSB0b2tlbjtcclxuICAgICAgICBza2lwKFwiKVwiKTtcclxuXHJcbiAgICAgICAgdmFyIG1ldGhvZCA9IG5ldyBNZXRob2QobmFtZSwgdHlwZSwgcmVxdWVzdFR5cGUsIHJlc3BvbnNlVHlwZSwgcmVxdWVzdFN0cmVhbSwgcmVzcG9uc2VTdHJlYW0pO1xyXG4gICAgICAgIGlmQmxvY2sobWV0aG9kLCBmdW5jdGlvbiBwYXJzZU1ldGhvZF9ibG9jayh0b2tlbikge1xyXG5cclxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cclxuICAgICAgICAgICAgaWYgKHRva2VuID09PSBcIm9wdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJzZU9wdGlvbihtZXRob2QsIHRva2VuKTtcclxuICAgICAgICAgICAgICAgIHNraXAoXCI7XCIpO1xyXG4gICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgIHRocm93IGlsbGVnYWwodG9rZW4pO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICBwYXJlbnQuYWRkKG1ldGhvZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcGFyc2VFeHRlbnNpb24ocGFyZW50LCB0b2tlbikge1xyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICBpZiAoIXR5cGVSZWZSZS50ZXN0KHRva2VuID0gbmV4dCgpKSlcclxuICAgICAgICAgICAgdGhyb3cgaWxsZWdhbCh0b2tlbiwgXCJyZWZlcmVuY2VcIik7XHJcblxyXG4gICAgICAgIHZhciByZWZlcmVuY2UgPSB0b2tlbjtcclxuICAgICAgICBpZkJsb2NrKG51bGwsIGZ1bmN0aW9uIHBhcnNlRXh0ZW5zaW9uX2Jsb2NrKHRva2VuKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodG9rZW4pIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlIFwicmVxdWlyZWRcIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJyZXBlYXRlZFwiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm9wdGlvbmFsXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VGaWVsZChwYXJlbnQsIHRva2VuLCByZWZlcmVuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1Byb3RvMyB8fCAhdHlwZVJlZlJlLnRlc3QodG9rZW4pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBpbGxlZ2FsKHRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICBwdXNoKHRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICBwYXJzZUZpZWxkKHBhcmVudCwgXCJvcHRpb25hbFwiLCByZWZlcmVuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHRva2VuO1xyXG4gICAgd2hpbGUgKCh0b2tlbiA9IG5leHQoKSkgIT09IG51bGwpIHtcclxuICAgICAgICBzd2l0Y2ggKHRva2VuKSB7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFwicGFja2FnZVwiOlxyXG5cclxuICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgICAgICAgICAgaWYgKCFoZWFkKVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGlsbGVnYWwodG9rZW4pO1xyXG5cclxuICAgICAgICAgICAgICAgIHBhcnNlUGFja2FnZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFwiaW1wb3J0XCI6XHJcblxyXG4gICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgICAgICAgICBpZiAoIWhlYWQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgaWxsZWdhbCh0b2tlbik7XHJcblxyXG4gICAgICAgICAgICAgICAgcGFyc2VJbXBvcnQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBcInN5bnRheFwiOlxyXG5cclxuICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgICAgICAgICAgaWYgKCFoZWFkKVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGlsbGVnYWwodG9rZW4pO1xyXG5cclxuICAgICAgICAgICAgICAgIHBhcnNlU3ludGF4KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgXCJvcHRpb25cIjpcclxuXHJcbiAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICAgICAgICAgIGlmICghaGVhZClcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBpbGxlZ2FsKHRva2VuKTtcclxuXHJcbiAgICAgICAgICAgICAgICBwYXJzZU9wdGlvbihwdHIsIHRva2VuKTtcclxuICAgICAgICAgICAgICAgIHNraXAoXCI7XCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG5cclxuICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VDb21tb24ocHRyLCB0b2tlbikpIHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICAgICAgICAgIHRocm93IGlsbGVnYWwodG9rZW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwYXJzZS5maWxlbmFtZSA9IG51bGw7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIFwicGFja2FnZVwiICAgICA6IHBrZyxcclxuICAgICAgICBcImltcG9ydHNcIiAgICAgOiBpbXBvcnRzLFxyXG4gICAgICAgICB3ZWFrSW1wb3J0cyAgOiB3ZWFrSW1wb3J0cyxcclxuICAgICAgICAgc3ludGF4ICAgICAgIDogc3ludGF4LFxyXG4gICAgICAgICByb290ICAgICAgICAgOiByb290XHJcbiAgICB9O1xyXG59XHJcblxyXG4vKipcclxuICogUGFyc2VzIHRoZSBnaXZlbiAucHJvdG8gc291cmNlIGFuZCByZXR1cm5zIGFuIG9iamVjdCB3aXRoIHRoZSBwYXJzZWQgY29udGVudHMuXHJcbiAqIEBuYW1lIHBhcnNlXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc291cmNlIFNvdXJjZSBjb250ZW50c1xyXG4gKiBAcGFyYW0ge0lQYXJzZU9wdGlvbnN9IFtvcHRpb25zXSBQYXJzZSBvcHRpb25zLiBEZWZhdWx0cyB0byB7QGxpbmsgcGFyc2UuZGVmYXVsdHN9IHdoZW4gb21pdHRlZC5cclxuICogQHJldHVybnMge0lQYXJzZXJSZXN1bHR9IFBhcnNlciByZXN1bHRcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGZpbGVuYW1lPW51bGwgQ3VycmVudGx5IHByb2Nlc3NpbmcgZmlsZSBuYW1lIGZvciBlcnJvciByZXBvcnRpbmcsIGlmIGtub3duXHJcbiAqIEBwcm9wZXJ0eSB7SVBhcnNlT3B0aW9uc30gZGVmYXVsdHMgRGVmYXVsdCB7QGxpbmsgSVBhcnNlT3B0aW9uc31cclxuICogQHZhcmlhdGlvbiAyXHJcbiAqL1xyXG5cclxufSx7XCIxNVwiOjE1LFwiMTZcIjoxNixcIjIwXCI6MjAsXCIyMlwiOjIyLFwiMjVcIjoyNSxcIjI5XCI6MjksXCIzM1wiOjMzLFwiMzRcIjozNCxcIjM1XCI6MzUsXCIzNlwiOjM2LFwiMzdcIjozN31dLDI3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gUmVhZGVyO1xyXG5cclxudmFyIHV0aWwgICAgICA9IHJlcXVpcmUoMzkpO1xyXG5cclxudmFyIEJ1ZmZlclJlYWRlcjsgLy8gY3ljbGljXHJcblxyXG52YXIgTG9uZ0JpdHMgID0gdXRpbC5Mb25nQml0cyxcclxuICAgIHV0ZjggICAgICA9IHV0aWwudXRmODtcclxuXHJcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbmZ1bmN0aW9uIGluZGV4T3V0T2ZSYW5nZShyZWFkZXIsIHdyaXRlTGVuZ3RoKSB7XHJcbiAgICByZXR1cm4gUmFuZ2VFcnJvcihcImluZGV4IG91dCBvZiByYW5nZTogXCIgKyByZWFkZXIucG9zICsgXCIgKyBcIiArICh3cml0ZUxlbmd0aCB8fCAxKSArIFwiID4gXCIgKyByZWFkZXIubGVuKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgYSBuZXcgcmVhZGVyIGluc3RhbmNlIHVzaW5nIHRoZSBzcGVjaWZpZWQgYnVmZmVyLlxyXG4gKiBAY2xhc3NkZXNjIFdpcmUgZm9ybWF0IHJlYWRlciB1c2luZyBgVWludDhBcnJheWAgaWYgYXZhaWxhYmxlLCBvdGhlcndpc2UgYEFycmF5YC5cclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmZmVyIEJ1ZmZlciB0byByZWFkIGZyb21cclxuICovXHJcbmZ1bmN0aW9uIFJlYWRlcihidWZmZXIpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWQgYnVmZmVyLlxyXG4gICAgICogQHR5cGUge1VpbnQ4QXJyYXl9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuYnVmID0gYnVmZmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZCBidWZmZXIgcG9zaXRpb24uXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnBvcyA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkIGJ1ZmZlciBsZW5ndGguXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmxlbiA9IGJ1ZmZlci5sZW5ndGg7XHJcbn1cclxuXHJcbnZhciBjcmVhdGVfYXJyYXkgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gXCJ1bmRlZmluZWRcIlxyXG4gICAgPyBmdW5jdGlvbiBjcmVhdGVfdHlwZWRfYXJyYXkoYnVmZmVyKSB7XHJcbiAgICAgICAgaWYgKGJ1ZmZlciBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkgfHwgQXJyYXkuaXNBcnJheShidWZmZXIpKVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlYWRlcihidWZmZXIpO1xyXG4gICAgICAgIHRocm93IEVycm9yKFwiaWxsZWdhbCBidWZmZXJcIik7XHJcbiAgICB9XHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgOiBmdW5jdGlvbiBjcmVhdGVfYXJyYXkoYnVmZmVyKSB7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYnVmZmVyKSlcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWFkZXIoYnVmZmVyKTtcclxuICAgICAgICB0aHJvdyBFcnJvcihcImlsbGVnYWwgYnVmZmVyXCIpO1xyXG4gICAgfTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3IHJlYWRlciB1c2luZyB0aGUgc3BlY2lmaWVkIGJ1ZmZlci5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheXxCdWZmZXJ9IGJ1ZmZlciBCdWZmZXIgdG8gcmVhZCBmcm9tXHJcbiAqIEByZXR1cm5zIHtSZWFkZXJ8QnVmZmVyUmVhZGVyfSBBIHtAbGluayBCdWZmZXJSZWFkZXJ9IGlmIGBidWZmZXJgIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgYSB7QGxpbmsgUmVhZGVyfVxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgYGJ1ZmZlcmAgaXMgbm90IGEgdmFsaWQgYnVmZmVyXHJcbiAqL1xyXG5SZWFkZXIuY3JlYXRlID0gdXRpbC5CdWZmZXJcclxuICAgID8gZnVuY3Rpb24gY3JlYXRlX2J1ZmZlcl9zZXR1cChidWZmZXIpIHtcclxuICAgICAgICByZXR1cm4gKFJlYWRlci5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGVfYnVmZmVyKGJ1ZmZlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdXRpbC5CdWZmZXIuaXNCdWZmZXIoYnVmZmVyKVxyXG4gICAgICAgICAgICAgICAgPyBuZXcgQnVmZmVyUmVhZGVyKGJ1ZmZlcilcclxuICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgICAgICAgICA6IGNyZWF0ZV9hcnJheShidWZmZXIpO1xyXG4gICAgICAgIH0pKGJ1ZmZlcik7XHJcbiAgICB9XHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgOiBjcmVhdGVfYXJyYXk7XHJcblxyXG5SZWFkZXIucHJvdG90eXBlLl9zbGljZSA9IHV0aWwuQXJyYXkucHJvdG90eXBlLnN1YmFycmF5IHx8IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIHV0aWwuQXJyYXkucHJvdG90eXBlLnNsaWNlO1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIGEgdmFyaW50IGFzIGFuIHVuc2lnbmVkIDMyIGJpdCB2YWx1ZS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcclxuICovXHJcblJlYWRlci5wcm90b3R5cGUudWludDMyID0gKGZ1bmN0aW9uIHJlYWRfdWludDMyX3NldHVwKCkge1xyXG4gICAgdmFyIHZhbHVlID0gNDI5NDk2NzI5NTsgLy8gb3B0aW1pemVyIHR5cGUtaGludCwgdGVuZHMgdG8gZGVvcHQgb3RoZXJ3aXNlICg/ISlcclxuICAgIHJldHVybiBmdW5jdGlvbiByZWFkX3VpbnQzMigpIHtcclxuICAgICAgICB2YWx1ZSA9ICggICAgICAgICB0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcgICAgICAgKSA+Pj4gMDsgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KSByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgdmFsdWUgPSAodmFsdWUgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCAgNykgPj4+IDA7IGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOCkgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIHZhbHVlID0gKHZhbHVlIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPDwgMTQpID4+PiAwOyBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB2YWx1ZSA9ICh2YWx1ZSB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IDIxKSA+Pj4gMDsgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KSByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgdmFsdWUgPSAodmFsdWUgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgIDE1KSA8PCAyOCkgPj4+IDA7IGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOCkgcmV0dXJuIHZhbHVlO1xyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICBpZiAoKHRoaXMucG9zICs9IDUpID4gdGhpcy5sZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5wb3MgPSB0aGlzLmxlbjtcclxuICAgICAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIDEwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBhIHZhcmludCBhcyBhIHNpZ25lZCAzMiBiaXQgdmFsdWUuXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcclxuICovXHJcblJlYWRlci5wcm90b3R5cGUuaW50MzIgPSBmdW5jdGlvbiByZWFkX2ludDMyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudWludDMyKCkgfCAwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIGEgemlnLXphZyBlbmNvZGVkIHZhcmludCBhcyBhIHNpZ25lZCAzMiBiaXQgdmFsdWUuXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcclxuICovXHJcblJlYWRlci5wcm90b3R5cGUuc2ludDMyID0gZnVuY3Rpb24gcmVhZF9zaW50MzIoKSB7XHJcbiAgICB2YXIgdmFsdWUgPSB0aGlzLnVpbnQzMigpO1xyXG4gICAgcmV0dXJuIHZhbHVlID4+PiAxIF4gLSh2YWx1ZSAmIDEpIHwgMDtcclxufTtcclxuXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLWludmFsaWQtdGhpcyAqL1xyXG5cclxuZnVuY3Rpb24gcmVhZExvbmdWYXJpbnQoKSB7XHJcbiAgICAvLyB0ZW5kcyB0byBkZW9wdCB3aXRoIGxvY2FsIHZhcnMgZm9yIG9jdGV0IGV0Yy5cclxuICAgIHZhciBiaXRzID0gbmV3IExvbmdCaXRzKDAsIDApO1xyXG4gICAgdmFyIGkgPSAwO1xyXG4gICAgaWYgKHRoaXMubGVuIC0gdGhpcy5wb3MgPiA0KSB7IC8vIGZhc3Qgcm91dGUgKGxvKVxyXG4gICAgICAgIGZvciAoOyBpIDwgNDsgKytpKSB7XHJcbiAgICAgICAgICAgIC8vIDFzdC4uNHRoXHJcbiAgICAgICAgICAgIGJpdHMubG8gPSAoYml0cy5sbyB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IGkgKiA3KSA+Pj4gMDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpdHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDV0aFxyXG4gICAgICAgIGJpdHMubG8gPSAoYml0cy5sbyB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IDI4KSA+Pj4gMDtcclxuICAgICAgICBiaXRzLmhpID0gKGJpdHMuaGkgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA+PiAgNCkgPj4+IDA7XHJcbiAgICAgICAgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KVxyXG4gICAgICAgICAgICByZXR1cm4gYml0cztcclxuICAgICAgICBpID0gMDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yICg7IGkgPCAzOyArK2kpIHtcclxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBvcyA+PSB0aGlzLmxlbilcclxuICAgICAgICAgICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzKTtcclxuICAgICAgICAgICAgLy8gMXN0Li4zdGhcclxuICAgICAgICAgICAgYml0cy5sbyA9IChiaXRzLmxvIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPDwgaSAqIDcpID4+PiAwO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYml0cztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gNHRoXHJcbiAgICAgICAgYml0cy5sbyA9IChiaXRzLmxvIHwgKHRoaXMuYnVmW3RoaXMucG9zKytdICYgMTI3KSA8PCBpICogNykgPj4+IDA7XHJcbiAgICAgICAgcmV0dXJuIGJpdHM7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5sZW4gLSB0aGlzLnBvcyA+IDQpIHsgLy8gZmFzdCByb3V0ZSAoaGkpXHJcbiAgICAgICAgZm9yICg7IGkgPCA1OyArK2kpIHtcclxuICAgICAgICAgICAgLy8gNnRoLi4xMHRoXHJcbiAgICAgICAgICAgIGJpdHMuaGkgPSAoYml0cy5oaSB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IGkgKiA3ICsgMykgPj4+IDA7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOClcclxuICAgICAgICAgICAgICAgIHJldHVybiBiaXRzO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yICg7IGkgPCA1OyArK2kpIHtcclxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBvcyA+PSB0aGlzLmxlbilcclxuICAgICAgICAgICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzKTtcclxuICAgICAgICAgICAgLy8gNnRoLi4xMHRoXHJcbiAgICAgICAgICAgIGJpdHMuaGkgPSAoYml0cy5oaSB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IGkgKiA3ICsgMykgPj4+IDA7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOClcclxuICAgICAgICAgICAgICAgIHJldHVybiBiaXRzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICB0aHJvdyBFcnJvcihcImludmFsaWQgdmFyaW50IGVuY29kaW5nXCIpO1xyXG59XHJcblxyXG4vKiBlc2xpbnQtZW5hYmxlIG5vLWludmFsaWQtdGhpcyAqL1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIGEgdmFyaW50IGFzIGEgc2lnbmVkIDY0IGJpdCB2YWx1ZS5cclxuICogQG5hbWUgUmVhZGVyI2ludDY0XHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcmV0dXJucyB7TG9uZ30gVmFsdWUgcmVhZFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBhIHZhcmludCBhcyBhbiB1bnNpZ25lZCA2NCBiaXQgdmFsdWUuXHJcbiAqIEBuYW1lIFJlYWRlciN1aW50NjRcclxuICogQGZ1bmN0aW9uXHJcbiAqIEByZXR1cm5zIHtMb25nfSBWYWx1ZSByZWFkXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIGEgemlnLXphZyBlbmNvZGVkIHZhcmludCBhcyBhIHNpZ25lZCA2NCBiaXQgdmFsdWUuXHJcbiAqIEBuYW1lIFJlYWRlciNzaW50NjRcclxuICogQGZ1bmN0aW9uXHJcbiAqIEByZXR1cm5zIHtMb25nfSBWYWx1ZSByZWFkXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIGEgdmFyaW50IGFzIGEgYm9vbGVhbi5cclxuICogQHJldHVybnMge2Jvb2xlYW59IFZhbHVlIHJlYWRcclxuICovXHJcblJlYWRlci5wcm90b3R5cGUuYm9vbCA9IGZ1bmN0aW9uIHJlYWRfYm9vbCgpIHtcclxuICAgIHJldHVybiB0aGlzLnVpbnQzMigpICE9PSAwO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gcmVhZEZpeGVkMzJfZW5kKGJ1ZiwgZW5kKSB7IC8vIG5vdGUgdGhhdCB0aGlzIHVzZXMgYGVuZGAsIG5vdCBgcG9zYFxyXG4gICAgcmV0dXJuIChidWZbZW5kIC0gNF1cclxuICAgICAgICAgIHwgYnVmW2VuZCAtIDNdIDw8IDhcclxuICAgICAgICAgIHwgYnVmW2VuZCAtIDJdIDw8IDE2XHJcbiAgICAgICAgICB8IGJ1ZltlbmQgLSAxXSA8PCAyNCkgPj4+IDA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBmaXhlZCAzMiBiaXRzIGFzIGFuIHVuc2lnbmVkIDMyIGJpdCBpbnRlZ2VyLlxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXHJcbiAqL1xyXG5SZWFkZXIucHJvdG90eXBlLmZpeGVkMzIgPSBmdW5jdGlvbiByZWFkX2ZpeGVkMzIoKSB7XHJcblxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICBpZiAodGhpcy5wb3MgKyA0ID4gdGhpcy5sZW4pXHJcbiAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIDQpO1xyXG5cclxuICAgIHJldHVybiByZWFkRml4ZWQzMl9lbmQodGhpcy5idWYsIHRoaXMucG9zICs9IDQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIGZpeGVkIDMyIGJpdHMgYXMgYSBzaWduZWQgMzIgYml0IGludGVnZXIuXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcclxuICovXHJcblJlYWRlci5wcm90b3R5cGUuc2ZpeGVkMzIgPSBmdW5jdGlvbiByZWFkX3NmaXhlZDMyKCkge1xyXG5cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgaWYgKHRoaXMucG9zICsgNCA+IHRoaXMubGVuKVxyXG4gICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCA0KTtcclxuXHJcbiAgICByZXR1cm4gcmVhZEZpeGVkMzJfZW5kKHRoaXMuYnVmLCB0aGlzLnBvcyArPSA0KSB8IDA7XHJcbn07XHJcblxyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1pbnZhbGlkLXRoaXMgKi9cclxuXHJcbmZ1bmN0aW9uIHJlYWRGaXhlZDY0KC8qIHRoaXM6IFJlYWRlciAqLykge1xyXG5cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgaWYgKHRoaXMucG9zICsgOCA+IHRoaXMubGVuKVxyXG4gICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCA4KTtcclxuXHJcbiAgICByZXR1cm4gbmV3IExvbmdCaXRzKHJlYWRGaXhlZDMyX2VuZCh0aGlzLmJ1ZiwgdGhpcy5wb3MgKz0gNCksIHJlYWRGaXhlZDMyX2VuZCh0aGlzLmJ1ZiwgdGhpcy5wb3MgKz0gNCkpO1xyXG59XHJcblxyXG4vKiBlc2xpbnQtZW5hYmxlIG5vLWludmFsaWQtdGhpcyAqL1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIGZpeGVkIDY0IGJpdHMuXHJcbiAqIEBuYW1lIFJlYWRlciNmaXhlZDY0XHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcmV0dXJucyB7TG9uZ30gVmFsdWUgcmVhZFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBSZWFkcyB6aWctemFnIGVuY29kZWQgZml4ZWQgNjQgYml0cy5cclxuICogQG5hbWUgUmVhZGVyI3NmaXhlZDY0XHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcmV0dXJucyB7TG9uZ30gVmFsdWUgcmVhZFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBhIGZsb2F0ICgzMiBiaXQpIGFzIGEgbnVtYmVyLlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxyXG4gKi9cclxuUmVhZGVyLnByb3RvdHlwZS5mbG9hdCA9IGZ1bmN0aW9uIHJlYWRfZmxvYXQoKSB7XHJcblxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICBpZiAodGhpcy5wb3MgKyA0ID4gdGhpcy5sZW4pXHJcbiAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIDQpO1xyXG5cclxuICAgIHZhciB2YWx1ZSA9IHV0aWwuZmxvYXQucmVhZEZsb2F0TEUodGhpcy5idWYsIHRoaXMucG9zKTtcclxuICAgIHRoaXMucG9zICs9IDQ7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVhZHMgYSBkb3VibGUgKDY0IGJpdCBmbG9hdCkgYXMgYSBudW1iZXIuXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXHJcbiAqL1xyXG5SZWFkZXIucHJvdG90eXBlLmRvdWJsZSA9IGZ1bmN0aW9uIHJlYWRfZG91YmxlKCkge1xyXG5cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgaWYgKHRoaXMucG9zICsgOCA+IHRoaXMubGVuKVxyXG4gICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCA0KTtcclxuXHJcbiAgICB2YXIgdmFsdWUgPSB1dGlsLmZsb2F0LnJlYWREb3VibGVMRSh0aGlzLmJ1ZiwgdGhpcy5wb3MpO1xyXG4gICAgdGhpcy5wb3MgKz0gODtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBhIHNlcXVlbmNlIG9mIGJ5dGVzIHByZWNlZWRlZCBieSBpdHMgbGVuZ3RoIGFzIGEgdmFyaW50LlxyXG4gKiBAcmV0dXJucyB7VWludDhBcnJheX0gVmFsdWUgcmVhZFxyXG4gKi9cclxuUmVhZGVyLnByb3RvdHlwZS5ieXRlcyA9IGZ1bmN0aW9uIHJlYWRfYnl0ZXMoKSB7XHJcbiAgICB2YXIgbGVuZ3RoID0gdGhpcy51aW50MzIoKSxcclxuICAgICAgICBzdGFydCAgPSB0aGlzLnBvcyxcclxuICAgICAgICBlbmQgICAgPSB0aGlzLnBvcyArIGxlbmd0aDtcclxuXHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgIGlmIChlbmQgPiB0aGlzLmxlbilcclxuICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgbGVuZ3RoKTtcclxuXHJcbiAgICB0aGlzLnBvcyArPSBsZW5ndGg7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmJ1ZikpIC8vIHBsYWluIGFycmF5XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVmLnNsaWNlKHN0YXJ0LCBlbmQpO1xyXG4gICAgcmV0dXJuIHN0YXJ0ID09PSBlbmQgLy8gZml4IGZvciBJRSAxMC9XaW44IGFuZCBvdGhlcnMnIHN1YmFycmF5IHJldHVybmluZyBhcnJheSBvZiBzaXplIDFcclxuICAgICAgICA/IG5ldyB0aGlzLmJ1Zi5jb25zdHJ1Y3RvcigwKVxyXG4gICAgICAgIDogdGhpcy5fc2xpY2UuY2FsbCh0aGlzLmJ1Ziwgc3RhcnQsIGVuZCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVhZHMgYSBzdHJpbmcgcHJlY2VlZGVkIGJ5IGl0cyBieXRlIGxlbmd0aCBhcyBhIHZhcmludC5cclxuICogQHJldHVybnMge3N0cmluZ30gVmFsdWUgcmVhZFxyXG4gKi9cclxuUmVhZGVyLnByb3RvdHlwZS5zdHJpbmcgPSBmdW5jdGlvbiByZWFkX3N0cmluZygpIHtcclxuICAgIHZhciBieXRlcyA9IHRoaXMuYnl0ZXMoKTtcclxuICAgIHJldHVybiB1dGY4LnJlYWQoYnl0ZXMsIDAsIGJ5dGVzLmxlbmd0aCk7XHJcbn07XHJcblxyXG4vKipcclxuICogU2tpcHMgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgYnl0ZXMgaWYgc3BlY2lmaWVkLCBvdGhlcndpc2Ugc2tpcHMgYSB2YXJpbnQuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXSBMZW5ndGggaWYga25vd24sIG90aGVyd2lzZSBhIHZhcmludCBpcyBhc3N1bWVkXHJcbiAqIEByZXR1cm5zIHtSZWFkZXJ9IGB0aGlzYFxyXG4gKi9cclxuUmVhZGVyLnByb3RvdHlwZS5za2lwID0gZnVuY3Rpb24gc2tpcChsZW5ndGgpIHtcclxuICAgIGlmICh0eXBlb2YgbGVuZ3RoID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKHRoaXMucG9zICsgbGVuZ3RoID4gdGhpcy5sZW4pXHJcbiAgICAgICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCBsZW5ndGgpO1xyXG4gICAgICAgIHRoaXMucG9zICs9IGxlbmd0aDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICAgICAgaWYgKHRoaXMucG9zID49IHRoaXMubGVuKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMpO1xyXG4gICAgICAgIH0gd2hpbGUgKHRoaXMuYnVmW3RoaXMucG9zKytdICYgMTI4KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNraXBzIHRoZSBuZXh0IGVsZW1lbnQgb2YgdGhlIHNwZWNpZmllZCB3aXJlIHR5cGUuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB3aXJlVHlwZSBXaXJlIHR5cGUgcmVjZWl2ZWRcclxuICogQHJldHVybnMge1JlYWRlcn0gYHRoaXNgXHJcbiAqL1xyXG5SZWFkZXIucHJvdG90eXBlLnNraXBUeXBlID0gZnVuY3Rpb24od2lyZVR5cGUpIHtcclxuICAgIHN3aXRjaCAod2lyZVR5cGUpIHtcclxuICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgIHRoaXMuc2tpcCgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgIHRoaXMuc2tpcCg4KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICB0aGlzLnNraXAodGhpcy51aW50MzIoKSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgZG8geyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnN0YW50LWNvbmRpdGlvblxyXG4gICAgICAgICAgICAgICAgaWYgKCh3aXJlVHlwZSA9IHRoaXMudWludDMyKCkgJiA3KSA9PT0gNClcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpcFR5cGUod2lyZVR5cGUpO1xyXG4gICAgICAgICAgICB9IHdoaWxlICh0cnVlKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICB0aGlzLnNraXAoNCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiaW52YWxpZCB3aXJlIHR5cGUgXCIgKyB3aXJlVHlwZSArIFwiIGF0IG9mZnNldCBcIiArIHRoaXMucG9zKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuUmVhZGVyLl9jb25maWd1cmUgPSBmdW5jdGlvbihCdWZmZXJSZWFkZXJfKSB7XHJcbiAgICBCdWZmZXJSZWFkZXIgPSBCdWZmZXJSZWFkZXJfO1xyXG5cclxuICAgIHZhciBmbiA9IHV0aWwuTG9uZyA/IFwidG9Mb25nXCIgOiAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyBcInRvTnVtYmVyXCI7XHJcbiAgICB1dGlsLm1lcmdlKFJlYWRlci5wcm90b3R5cGUsIHtcclxuXHJcbiAgICAgICAgaW50NjQ6IGZ1bmN0aW9uIHJlYWRfaW50NjQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZWFkTG9uZ1ZhcmludC5jYWxsKHRoaXMpW2ZuXShmYWxzZSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdWludDY0OiBmdW5jdGlvbiByZWFkX3VpbnQ2NCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlYWRMb25nVmFyaW50LmNhbGwodGhpcylbZm5dKHRydWUpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNpbnQ2NDogZnVuY3Rpb24gcmVhZF9zaW50NjQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZWFkTG9uZ1ZhcmludC5jYWxsKHRoaXMpLnp6RGVjb2RlKClbZm5dKGZhbHNlKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmaXhlZDY0OiBmdW5jdGlvbiByZWFkX2ZpeGVkNjQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZWFkRml4ZWQ2NC5jYWxsKHRoaXMpW2ZuXSh0cnVlKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZml4ZWQ2NDogZnVuY3Rpb24gcmVhZF9zZml4ZWQ2NCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlYWRGaXhlZDY0LmNhbGwodGhpcylbZm5dKGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG59LHtcIjM5XCI6Mzl9XSwyODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IEJ1ZmZlclJlYWRlcjtcclxuXHJcbi8vIGV4dGVuZHMgUmVhZGVyXHJcbnZhciBSZWFkZXIgPSByZXF1aXJlKDI3KTtcclxuKEJ1ZmZlclJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFJlYWRlci5wcm90b3R5cGUpKS5jb25zdHJ1Y3RvciA9IEJ1ZmZlclJlYWRlcjtcclxuXHJcbnZhciB1dGlsID0gcmVxdWlyZSgzOSk7XHJcblxyXG4vKipcclxuICogQ29uc3RydWN0cyBhIG5ldyBidWZmZXIgcmVhZGVyIGluc3RhbmNlLlxyXG4gKiBAY2xhc3NkZXNjIFdpcmUgZm9ybWF0IHJlYWRlciB1c2luZyBub2RlIGJ1ZmZlcnMuXHJcbiAqIEBleHRlbmRzIFJlYWRlclxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZmZlciBCdWZmZXIgdG8gcmVhZCBmcm9tXHJcbiAqL1xyXG5mdW5jdGlvbiBCdWZmZXJSZWFkZXIoYnVmZmVyKSB7XHJcbiAgICBSZWFkZXIuY2FsbCh0aGlzLCBidWZmZXIpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZCBidWZmZXIuXHJcbiAgICAgKiBAbmFtZSBCdWZmZXJSZWFkZXIjYnVmXHJcbiAgICAgKiBAdHlwZSB7QnVmZmVyfVxyXG4gICAgICovXHJcbn1cclxuXHJcbi8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXHJcbmlmICh1dGlsLkJ1ZmZlcilcclxuICAgIEJ1ZmZlclJlYWRlci5wcm90b3R5cGUuX3NsaWNlID0gdXRpbC5CdWZmZXIucHJvdG90eXBlLnNsaWNlO1xyXG5cclxuLyoqXHJcbiAqIEBvdmVycmlkZVxyXG4gKi9cclxuQnVmZmVyUmVhZGVyLnByb3RvdHlwZS5zdHJpbmcgPSBmdW5jdGlvbiByZWFkX3N0cmluZ19idWZmZXIoKSB7XHJcbiAgICB2YXIgbGVuID0gdGhpcy51aW50MzIoKTsgLy8gbW9kaWZpZXMgcG9zXHJcbiAgICByZXR1cm4gdGhpcy5idWYudXRmOFNsaWNlKHRoaXMucG9zLCB0aGlzLnBvcyA9IE1hdGgubWluKHRoaXMucG9zICsgbGVuLCB0aGlzLmxlbikpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIGEgc2VxdWVuY2Ugb2YgYnl0ZXMgcHJlY2VlZGVkIGJ5IGl0cyBsZW5ndGggYXMgYSB2YXJpbnQuXHJcbiAqIEBuYW1lIEJ1ZmZlclJlYWRlciNieXRlc1xyXG4gKiBAZnVuY3Rpb25cclxuICogQHJldHVybnMge0J1ZmZlcn0gVmFsdWUgcmVhZFxyXG4gKi9cclxuXHJcbn0se1wiMjdcIjoyNyxcIjM5XCI6Mzl9XSwyOTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IFJvb3Q7XHJcblxyXG4vLyBleHRlbmRzIE5hbWVzcGFjZVxyXG52YXIgTmFtZXNwYWNlID0gcmVxdWlyZSgyMyk7XHJcbigoUm9vdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE5hbWVzcGFjZS5wcm90b3R5cGUpKS5jb25zdHJ1Y3RvciA9IFJvb3QpLmNsYXNzTmFtZSA9IFwiUm9vdFwiO1xyXG5cclxudmFyIEZpZWxkICAgPSByZXF1aXJlKDE2KSxcclxuICAgIEVudW0gICAgPSByZXF1aXJlKDE1KSxcclxuICAgIE9uZU9mICAgPSByZXF1aXJlKDI1KSxcclxuICAgIHV0aWwgICAgPSByZXF1aXJlKDM3KTtcclxuXHJcbnZhciBUeXBlLCAgIC8vIGN5Y2xpY1xyXG4gICAgcGFyc2UsICAvLyBtaWdodCBiZSBleGNsdWRlZFxyXG4gICAgY29tbW9uOyAvLyBcIlxyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgYSBuZXcgcm9vdCBuYW1lc3BhY2UgaW5zdGFuY2UuXHJcbiAqIEBjbGFzc2Rlc2MgUm9vdCBuYW1lc3BhY2Ugd3JhcHBpbmcgYWxsIHR5cGVzLCBlbnVtcywgc2VydmljZXMsIHN1Yi1uYW1lc3BhY2VzIGV0Yy4gdGhhdCBiZWxvbmcgdG9nZXRoZXIuXHJcbiAqIEBleHRlbmRzIE5hbWVzcGFjZUJhc2VcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IFtvcHRpb25zXSBUb3AgbGV2ZWwgb3B0aW9uc1xyXG4gKi9cclxuZnVuY3Rpb24gUm9vdChvcHRpb25zKSB7XHJcbiAgICBOYW1lc3BhY2UuY2FsbCh0aGlzLCBcIlwiLCBvcHRpb25zKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmVycmVkIGV4dGVuc2lvbiBmaWVsZHMuXHJcbiAgICAgKiBAdHlwZSB7RmllbGRbXX1cclxuICAgICAqL1xyXG4gICAgdGhpcy5kZWZlcnJlZCA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzb2x2ZWQgZmlsZSBuYW1lcyBvZiBsb2FkZWQgZmlsZXMuXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nW119XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZmlsZXMgPSBbXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIExvYWRzIGEgbmFtZXNwYWNlIGRlc2NyaXB0b3IgaW50byBhIHJvb3QgbmFtZXNwYWNlLlxyXG4gKiBAcGFyYW0ge0lOYW1lc3BhY2V9IGpzb24gTmFtZWVzcGFjZSBkZXNjcmlwdG9yXHJcbiAqIEBwYXJhbSB7Um9vdH0gW3Jvb3RdIFJvb3QgbmFtZXNwYWNlLCBkZWZhdWx0cyB0byBjcmVhdGUgYSBuZXcgb25lIGlmIG9taXR0ZWRcclxuICogQHJldHVybnMge1Jvb3R9IFJvb3QgbmFtZXNwYWNlXHJcbiAqL1xyXG5Sb290LmZyb21KU09OID0gZnVuY3Rpb24gZnJvbUpTT04oanNvbiwgcm9vdCkge1xyXG4gICAgaWYgKCFyb290KVxyXG4gICAgICAgIHJvb3QgPSBuZXcgUm9vdCgpO1xyXG4gICAgaWYgKGpzb24ub3B0aW9ucylcclxuICAgICAgICByb290LnNldE9wdGlvbnMoanNvbi5vcHRpb25zKTtcclxuICAgIHJldHVybiByb290LmFkZEpTT04oanNvbi5uZXN0ZWQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlc29sdmVzIHRoZSBwYXRoIG9mIGFuIGltcG9ydGVkIGZpbGUsIHJlbGF0aXZlIHRvIHRoZSBpbXBvcnRpbmcgb3JpZ2luLlxyXG4gKiBUaGlzIG1ldGhvZCBleGlzdHMgc28geW91IGNhbiBvdmVycmlkZSBpdCB3aXRoIHlvdXIgb3duIGxvZ2ljIGluIGNhc2UgeW91ciBpbXBvcnRzIGFyZSBzY2F0dGVyZWQgb3ZlciBtdWx0aXBsZSBkaXJlY3Rvcmllcy5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcmlnaW4gVGhlIGZpbGUgbmFtZSBvZiB0aGUgaW1wb3J0aW5nIGZpbGVcclxuICogQHBhcmFtIHtzdHJpbmd9IHRhcmdldCBUaGUgZmlsZSBuYW1lIGJlaW5nIGltcG9ydGVkXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gUmVzb2x2ZWQgcGF0aCB0byBgdGFyZ2V0YCBvciBgbnVsbGAgdG8gc2tpcCB0aGUgZmlsZVxyXG4gKi9cclxuUm9vdC5wcm90b3R5cGUucmVzb2x2ZVBhdGggPSB1dGlsLnBhdGgucmVzb2x2ZTtcclxuXHJcbi8vIEEgc3ltYm9sLWxpa2UgZnVuY3Rpb24gdG8gc2FmZWx5IHNpZ25hbCBzeW5jaHJvbm91cyBsb2FkaW5nXHJcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbmZ1bmN0aW9uIFNZTkMoKSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWVtcHR5LWZ1bmN0aW9uXHJcblxyXG4vKipcclxuICogTG9hZHMgb25lIG9yIG11bHRpcGxlIC5wcm90byBvciBwcmVwcm9jZXNzZWQgLmpzb24gZmlsZXMgaW50byB0aGlzIHJvb3QgbmFtZXNwYWNlIGFuZCBjYWxscyB0aGUgY2FsbGJhY2suXHJcbiAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBmaWxlbmFtZSBOYW1lcyBvZiBvbmUgb3IgbXVsdGlwbGUgZmlsZXMgdG8gbG9hZFxyXG4gKiBAcGFyYW0ge0lQYXJzZU9wdGlvbnN9IG9wdGlvbnMgUGFyc2Ugb3B0aW9uc1xyXG4gKiBAcGFyYW0ge0xvYWRDYWxsYmFja30gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb25cclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblJvb3QucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiBsb2FkKGZpbGVuYW1lLCBvcHRpb25zLCBjYWxsYmFjaykge1xyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICBjYWxsYmFjayA9IG9wdGlvbnM7XHJcbiAgICAgICAgb3B0aW9ucyA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIGlmICghY2FsbGJhY2spXHJcbiAgICAgICAgcmV0dXJuIHV0aWwuYXNQcm9taXNlKGxvYWQsIHNlbGYsIGZpbGVuYW1lLCBvcHRpb25zKTtcclxuXHJcbiAgICB2YXIgc3luYyA9IGNhbGxiYWNrID09PSBTWU5DOyAvLyB1bmRvY3VtZW50ZWRcclxuXHJcbiAgICAvLyBGaW5pc2hlcyBsb2FkaW5nIGJ5IGNhbGxpbmcgdGhlIGNhbGxiYWNrIChleGFjdGx5IG9uY2UpXHJcbiAgICBmdW5jdGlvbiBmaW5pc2goZXJyLCByb290KSB7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKCFjYWxsYmFjaylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHZhciBjYiA9IGNhbGxiYWNrO1xyXG4gICAgICAgIGNhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICBpZiAoc3luYylcclxuICAgICAgICAgICAgdGhyb3cgZXJyO1xyXG4gICAgICAgIGNiKGVyciwgcm9vdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUHJvY2Vzc2VzIGEgc2luZ2xlIGZpbGVcclxuICAgIGZ1bmN0aW9uIHByb2Nlc3MoZmlsZW5hbWUsIHNvdXJjZSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmICh1dGlsLmlzU3RyaW5nKHNvdXJjZSkgJiYgc291cmNlLmNoYXJBdCgwKSA9PT0gXCJ7XCIpXHJcbiAgICAgICAgICAgICAgICBzb3VyY2UgPSBKU09OLnBhcnNlKHNvdXJjZSk7XHJcbiAgICAgICAgICAgIGlmICghdXRpbC5pc1N0cmluZyhzb3VyY2UpKVxyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRPcHRpb25zKHNvdXJjZS5vcHRpb25zKS5hZGRKU09OKHNvdXJjZS5uZXN0ZWQpO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBhcnNlLmZpbGVuYW1lID0gZmlsZW5hbWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyc2VkID0gcGFyc2Uoc291cmNlLCBzZWxmLCBvcHRpb25zKSxcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlZCxcclxuICAgICAgICAgICAgICAgICAgICBpID0gMDtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJzZWQuaW1wb3J0cylcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKDsgaSA8IHBhcnNlZC5pbXBvcnRzLmxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzb2x2ZWQgPSBzZWxmLnJlc29sdmVQYXRoKGZpbGVuYW1lLCBwYXJzZWQuaW1wb3J0c1tpXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZXRjaChyZXNvbHZlZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VkLndlYWtJbXBvcnRzKVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYXJzZWQud2Vha0ltcG9ydHMubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNvbHZlZCA9IHNlbGYucmVzb2x2ZVBhdGgoZmlsZW5hbWUsIHBhcnNlZC53ZWFrSW1wb3J0c1tpXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZXRjaChyZXNvbHZlZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgZmluaXNoKGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghc3luYyAmJiAhcXVldWVkKVxyXG4gICAgICAgICAgICBmaW5pc2gobnVsbCwgc2VsZik7IC8vIG9ubHkgb25jZSBhbnl3YXlcclxuICAgIH1cclxuXHJcbiAgICAvLyBGZXRjaGVzIGEgc2luZ2xlIGZpbGVcclxuICAgIGZ1bmN0aW9uIGZldGNoKGZpbGVuYW1lLCB3ZWFrKSB7XHJcblxyXG4gICAgICAgIC8vIFN0cmlwIHBhdGggaWYgdGhpcyBmaWxlIHJlZmVyZW5jZXMgYSBidW5kbGVkIGRlZmluaXRpb25cclxuICAgICAgICB2YXIgaWR4ID0gZmlsZW5hbWUubGFzdEluZGV4T2YoXCJnb29nbGUvcHJvdG9idWYvXCIpO1xyXG4gICAgICAgIGlmIChpZHggPiAtMSkge1xyXG4gICAgICAgICAgICB2YXIgYWx0bmFtZSA9IGZpbGVuYW1lLnN1YnN0cmluZyhpZHgpO1xyXG4gICAgICAgICAgICBpZiAoYWx0bmFtZSBpbiBjb21tb24pXHJcbiAgICAgICAgICAgICAgICBmaWxlbmFtZSA9IGFsdG5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTa2lwIGlmIGFscmVhZHkgbG9hZGVkIC8gYXR0ZW1wdGVkXHJcbiAgICAgICAgaWYgKHNlbGYuZmlsZXMuaW5kZXhPZihmaWxlbmFtZSkgPiAtMSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHNlbGYuZmlsZXMucHVzaChmaWxlbmFtZSk7XHJcblxyXG4gICAgICAgIC8vIFNob3J0Y3V0IGJ1bmRsZWQgZGVmaW5pdGlvbnNcclxuICAgICAgICBpZiAoZmlsZW5hbWUgaW4gY29tbW9uKSB7XHJcbiAgICAgICAgICAgIGlmIChzeW5jKVxyXG4gICAgICAgICAgICAgICAgcHJvY2VzcyhmaWxlbmFtZSwgY29tbW9uW2ZpbGVuYW1lXSk7XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgKytxdWV1ZWQ7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC0tcXVldWVkO1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3MoZmlsZW5hbWUsIGNvbW1vbltmaWxlbmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gT3RoZXJ3aXNlIGZldGNoIGZyb20gZGlzayBvciBuZXR3b3JrXHJcbiAgICAgICAgaWYgKHN5bmMpIHtcclxuICAgICAgICAgICAgdmFyIHNvdXJjZTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZSA9IHV0aWwuZnMucmVhZEZpbGVTeW5jKGZpbGVuYW1lKS50b1N0cmluZyhcInV0ZjhcIik7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF3ZWFrKVxyXG4gICAgICAgICAgICAgICAgICAgIGZpbmlzaChlcnIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHByb2Nlc3MoZmlsZW5hbWUsIHNvdXJjZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgKytxdWV1ZWQ7XHJcbiAgICAgICAgICAgIHV0aWwuZmV0Y2goZmlsZW5hbWUsIGZ1bmN0aW9uKGVyciwgc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAtLXF1ZXVlZDtcclxuICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47IC8vIHRlcm1pbmF0ZWQgbWVhbndoaWxlXHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXdlYWspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmlzaChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFxdWV1ZWQpIC8vIGNhbid0IGJlIGNvdmVyZWQgcmVsaWFibHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluaXNoKG51bGwsIHNlbGYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHByb2Nlc3MoZmlsZW5hbWUsIHNvdXJjZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHZhciBxdWV1ZWQgPSAwO1xyXG5cclxuICAgIC8vIEFzc2VtYmxpbmcgdGhlIHJvb3QgbmFtZXNwYWNlIGRvZXNuJ3QgcmVxdWlyZSB3b3JraW5nIHR5cGVcclxuICAgIC8vIHJlZmVyZW5jZXMgYW55bW9yZSwgc28gd2UgY2FuIGxvYWQgZXZlcnl0aGluZyBpbiBwYXJhbGxlbFxyXG4gICAgaWYgKHV0aWwuaXNTdHJpbmcoZmlsZW5hbWUpKVxyXG4gICAgICAgIGZpbGVuYW1lID0gWyBmaWxlbmFtZSBdO1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIHJlc29sdmVkOyBpIDwgZmlsZW5hbWUubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgaWYgKHJlc29sdmVkID0gc2VsZi5yZXNvbHZlUGF0aChcIlwiLCBmaWxlbmFtZVtpXSkpXHJcbiAgICAgICAgICAgIGZldGNoKHJlc29sdmVkKTtcclxuXHJcbiAgICBpZiAoc3luYylcclxuICAgICAgICByZXR1cm4gc2VsZjtcclxuICAgIGlmICghcXVldWVkKVxyXG4gICAgICAgIGZpbmlzaChudWxsLCBzZWxmKTtcclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbn07XHJcbi8vIGZ1bmN0aW9uIGxvYWQoZmlsZW5hbWU6c3RyaW5nLCBvcHRpb25zOklQYXJzZU9wdGlvbnMsIGNhbGxiYWNrOkxvYWRDYWxsYmFjayk6dW5kZWZpbmVkXHJcblxyXG4vKipcclxuICogTG9hZHMgb25lIG9yIG11bHRpcGxlIC5wcm90byBvciBwcmVwcm9jZXNzZWQgLmpzb24gZmlsZXMgaW50byB0aGlzIHJvb3QgbmFtZXNwYWNlIGFuZCBjYWxscyB0aGUgY2FsbGJhY2suXHJcbiAqIEBmdW5jdGlvbiBSb290I2xvYWRcclxuICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IGZpbGVuYW1lIE5hbWVzIG9mIG9uZSBvciBtdWx0aXBsZSBmaWxlcyB0byBsb2FkXHJcbiAqIEBwYXJhbSB7TG9hZENhbGxiYWNrfSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvblxyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKiBAdmFyaWF0aW9uIDJcclxuICovXHJcbi8vIGZ1bmN0aW9uIGxvYWQoZmlsZW5hbWU6c3RyaW5nLCBjYWxsYmFjazpMb2FkQ2FsbGJhY2spOnVuZGVmaW5lZFxyXG5cclxuLyoqXHJcbiAqIExvYWRzIG9uZSBvciBtdWx0aXBsZSAucHJvdG8gb3IgcHJlcHJvY2Vzc2VkIC5qc29uIGZpbGVzIGludG8gdGhpcyByb290IG5hbWVzcGFjZSBhbmQgcmV0dXJucyBhIHByb21pc2UuXHJcbiAqIEBmdW5jdGlvbiBSb290I2xvYWRcclxuICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IGZpbGVuYW1lIE5hbWVzIG9mIG9uZSBvciBtdWx0aXBsZSBmaWxlcyB0byBsb2FkXHJcbiAqIEBwYXJhbSB7SVBhcnNlT3B0aW9uc30gW29wdGlvbnNdIFBhcnNlIG9wdGlvbnMuIERlZmF1bHRzIHRvIHtAbGluayBwYXJzZS5kZWZhdWx0c30gd2hlbiBvbWl0dGVkLlxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxSb290Pn0gUHJvbWlzZVxyXG4gKiBAdmFyaWF0aW9uIDNcclxuICovXHJcbi8vIGZ1bmN0aW9uIGxvYWQoZmlsZW5hbWU6c3RyaW5nLCBbb3B0aW9uczpJUGFyc2VPcHRpb25zXSk6UHJvbWlzZTxSb290PlxyXG5cclxuLyoqXHJcbiAqIFN5bmNocm9ub3VzbHkgbG9hZHMgb25lIG9yIG11bHRpcGxlIC5wcm90byBvciBwcmVwcm9jZXNzZWQgLmpzb24gZmlsZXMgaW50byB0aGlzIHJvb3QgbmFtZXNwYWNlIChub2RlIG9ubHkpLlxyXG4gKiBAZnVuY3Rpb24gUm9vdCNsb2FkU3luY1xyXG4gKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gZmlsZW5hbWUgTmFtZXMgb2Ygb25lIG9yIG11bHRpcGxlIGZpbGVzIHRvIGxvYWRcclxuICogQHBhcmFtIHtJUGFyc2VPcHRpb25zfSBbb3B0aW9uc10gUGFyc2Ugb3B0aW9ucy4gRGVmYXVsdHMgdG8ge0BsaW5rIHBhcnNlLmRlZmF1bHRzfSB3aGVuIG9taXR0ZWQuXHJcbiAqIEByZXR1cm5zIHtSb290fSBSb290IG5hbWVzcGFjZVxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgc3luY2hyb25vdXMgZmV0Y2hpbmcgaXMgbm90IHN1cHBvcnRlZCAoaS5lLiBpbiBicm93c2Vycykgb3IgaWYgYSBmaWxlJ3Mgc3ludGF4IGlzIGludmFsaWRcclxuICovXHJcblJvb3QucHJvdG90eXBlLmxvYWRTeW5jID0gZnVuY3Rpb24gbG9hZFN5bmMoZmlsZW5hbWUsIG9wdGlvbnMpIHtcclxuICAgIGlmICghdXRpbC5pc05vZGUpXHJcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJub3Qgc3VwcG9ydGVkXCIpO1xyXG4gICAgcmV0dXJuIHRoaXMubG9hZChmaWxlbmFtZSwgb3B0aW9ucywgU1lOQyk7XHJcbn07XHJcblxyXG4vKipcclxuICogQG92ZXJyaWRlXHJcbiAqL1xyXG5Sb290LnByb3RvdHlwZS5yZXNvbHZlQWxsID0gZnVuY3Rpb24gcmVzb2x2ZUFsbCgpIHtcclxuICAgIGlmICh0aGlzLmRlZmVycmVkLmxlbmd0aClcclxuICAgICAgICB0aHJvdyBFcnJvcihcInVucmVzb2x2YWJsZSBleHRlbnNpb25zOiBcIiArIHRoaXMuZGVmZXJyZWQubWFwKGZ1bmN0aW9uKGZpZWxkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIidleHRlbmQgXCIgKyBmaWVsZC5leHRlbmQgKyBcIicgaW4gXCIgKyBmaWVsZC5wYXJlbnQuZnVsbE5hbWU7XHJcbiAgICAgICAgfSkuam9pbihcIiwgXCIpKTtcclxuICAgIHJldHVybiBOYW1lc3BhY2UucHJvdG90eXBlLnJlc29sdmVBbGwuY2FsbCh0aGlzKTtcclxufTtcclxuXHJcbi8vIG9ubHkgdXBwZXJjYXNlZCAoYW5kIHRodXMgY29uZmxpY3QtZnJlZSkgY2hpbGRyZW4gYXJlIGV4cG9zZWQsIHNlZSBiZWxvd1xyXG52YXIgZXhwb3NlUmUgPSAvXltBLVpdLztcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGVzIGEgZGVmZXJyZWQgZGVjbGFyaW5nIGV4dGVuc2lvbiBmaWVsZCBieSBjcmVhdGluZyBhIHNpc3RlciBmaWVsZCB0byByZXByZXNlbnQgaXQgd2l0aGluIGl0cyBleHRlbmRlZCB0eXBlLlxyXG4gKiBAcGFyYW0ge1Jvb3R9IHJvb3QgUm9vdCBpbnN0YW5jZVxyXG4gKiBAcGFyYW0ge0ZpZWxkfSBmaWVsZCBEZWNsYXJpbmcgZXh0ZW5zaW9uIGZpZWxkIHdpdGluIHRoZSBkZWNsYXJpbmcgdHlwZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHN1Y2Nlc3NmdWxseSBhZGRlZCB0byB0aGUgZXh0ZW5kZWQgdHlwZSwgYGZhbHNlYCBvdGhlcndpc2VcclxuICogQGlubmVyXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmZ1bmN0aW9uIHRyeUhhbmRsZUV4dGVuc2lvbihyb290LCBmaWVsZCkge1xyXG4gICAgdmFyIGV4dGVuZGVkVHlwZSA9IGZpZWxkLnBhcmVudC5sb29rdXAoZmllbGQuZXh0ZW5kKTtcclxuICAgIGlmIChleHRlbmRlZFR5cGUpIHtcclxuICAgICAgICB2YXIgc2lzdGVyRmllbGQgPSBuZXcgRmllbGQoZmllbGQuZnVsbE5hbWUsIGZpZWxkLmlkLCBmaWVsZC50eXBlLCBmaWVsZC5ydWxlLCB1bmRlZmluZWQsIGZpZWxkLm9wdGlvbnMpO1xyXG4gICAgICAgIHNpc3RlckZpZWxkLmRlY2xhcmluZ0ZpZWxkID0gZmllbGQ7XHJcbiAgICAgICAgZmllbGQuZXh0ZW5zaW9uRmllbGQgPSBzaXN0ZXJGaWVsZDtcclxuICAgICAgICBleHRlbmRlZFR5cGUuYWRkKHNpc3RlckZpZWxkKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGxlZCB3aGVuIGFueSBvYmplY3QgaXMgYWRkZWQgdG8gdGhpcyByb290IG9yIGl0cyBzdWItbmFtZXNwYWNlcy5cclxuICogQHBhcmFtIHtSZWZsZWN0aW9uT2JqZWN0fSBvYmplY3QgT2JqZWN0IGFkZGVkXHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5Sb290LnByb3RvdHlwZS5faGFuZGxlQWRkID0gZnVuY3Rpb24gX2hhbmRsZUFkZChvYmplY3QpIHtcclxuICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBGaWVsZCkge1xyXG5cclxuICAgICAgICBpZiAoLyogYW4gZXh0ZW5zaW9uIGZpZWxkIChpbXBsaWVzIG5vdCBwYXJ0IG9mIGEgb25lb2YpICovIG9iamVjdC5leHRlbmQgIT09IHVuZGVmaW5lZCAmJiAvKiBub3QgYWxyZWFkeSBoYW5kbGVkICovICFvYmplY3QuZXh0ZW5zaW9uRmllbGQpXHJcbiAgICAgICAgICAgIGlmICghdHJ5SGFuZGxlRXh0ZW5zaW9uKHRoaXMsIG9iamVjdCkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmVycmVkLnB1c2gob2JqZWN0KTtcclxuXHJcbiAgICB9IGVsc2UgaWYgKG9iamVjdCBpbnN0YW5jZW9mIEVudW0pIHtcclxuXHJcbiAgICAgICAgaWYgKGV4cG9zZVJlLnRlc3Qob2JqZWN0Lm5hbWUpKVxyXG4gICAgICAgICAgICBvYmplY3QucGFyZW50W29iamVjdC5uYW1lXSA9IG9iamVjdC52YWx1ZXM7IC8vIGV4cG9zZSBlbnVtIHZhbHVlcyBhcyBwcm9wZXJ0eSBvZiBpdHMgcGFyZW50XHJcblxyXG4gICAgfSBlbHNlIGlmICghKG9iamVjdCBpbnN0YW5jZW9mIE9uZU9mKSkgLyogZXZlcnl0aGluZyBlbHNlIGlzIGEgbmFtZXNwYWNlICovIHtcclxuXHJcbiAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIFR5cGUpIC8vIFRyeSB0byBoYW5kbGUgYW55IGRlZmVycmVkIGV4dGVuc2lvbnNcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmRlZmVycmVkLmxlbmd0aDspXHJcbiAgICAgICAgICAgICAgICBpZiAodHJ5SGFuZGxlRXh0ZW5zaW9uKHRoaXMsIHRoaXMuZGVmZXJyZWRbaV0pKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmZXJyZWQuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICsraTtcclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IC8qIGluaXRpYWxpemVzICovIG9iamVjdC5uZXN0ZWRBcnJheS5sZW5ndGg7ICsraikgLy8gcmVjdXJzZSBpbnRvIHRoZSBuYW1lc3BhY2VcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlQWRkKG9iamVjdC5fbmVzdGVkQXJyYXlbal0pO1xyXG4gICAgICAgIGlmIChleHBvc2VSZS50ZXN0KG9iamVjdC5uYW1lKSlcclxuICAgICAgICAgICAgb2JqZWN0LnBhcmVudFtvYmplY3QubmFtZV0gPSBvYmplY3Q7IC8vIGV4cG9zZSBuYW1lc3BhY2UgYXMgcHJvcGVydHkgb2YgaXRzIHBhcmVudFxyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoZSBhYm92ZSBhbHNvIGFkZHMgdXBwZXJjYXNlZCAoYW5kIHRodXMgY29uZmxpY3QtZnJlZSkgbmVzdGVkIHR5cGVzLCBzZXJ2aWNlcyBhbmQgZW51bXMgYXNcclxuICAgIC8vIHByb3BlcnRpZXMgb2YgbmFtZXNwYWNlcyBqdXN0IGxpa2Ugc3RhdGljIGNvZGUgZG9lcy4gVGhpcyBhbGxvd3MgdXNpbmcgYSAuZC50cyBnZW5lcmF0ZWQgZm9yXHJcbiAgICAvLyBhIHN0YXRpYyBtb2R1bGUgd2l0aCByZWZsZWN0aW9uLWJhc2VkIHNvbHV0aW9ucyB3aGVyZSB0aGUgY29uZGl0aW9uIGlzIG1ldC5cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDYWxsZWQgd2hlbiBhbnkgb2JqZWN0IGlzIHJlbW92ZWQgZnJvbSB0aGlzIHJvb3Qgb3IgaXRzIHN1Yi1uYW1lc3BhY2VzLlxyXG4gKiBAcGFyYW0ge1JlZmxlY3Rpb25PYmplY3R9IG9iamVjdCBPYmplY3QgcmVtb3ZlZFxyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuUm9vdC5wcm90b3R5cGUuX2hhbmRsZVJlbW92ZSA9IGZ1bmN0aW9uIF9oYW5kbGVSZW1vdmUob2JqZWN0KSB7XHJcbiAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgRmllbGQpIHtcclxuXHJcbiAgICAgICAgaWYgKC8qIGFuIGV4dGVuc2lvbiBmaWVsZCAqLyBvYmplY3QuZXh0ZW5kICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKC8qIGFscmVhZHkgaGFuZGxlZCAqLyBvYmplY3QuZXh0ZW5zaW9uRmllbGQpIHsgLy8gcmVtb3ZlIGl0cyBzaXN0ZXIgZmllbGRcclxuICAgICAgICAgICAgICAgIG9iamVjdC5leHRlbnNpb25GaWVsZC5wYXJlbnQucmVtb3ZlKG9iamVjdC5leHRlbnNpb25GaWVsZCk7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QuZXh0ZW5zaW9uRmllbGQgPSBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2UgeyAvLyBjYW5jZWwgdGhlIGV4dGVuc2lvblxyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5kZWZlcnJlZC5pbmRleE9mKG9iamVjdCk7XHJcbiAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZlcnJlZC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0gZWxzZSBpZiAob2JqZWN0IGluc3RhbmNlb2YgRW51bSkge1xyXG5cclxuICAgICAgICBpZiAoZXhwb3NlUmUudGVzdChvYmplY3QubmFtZSkpXHJcbiAgICAgICAgICAgIGRlbGV0ZSBvYmplY3QucGFyZW50W29iamVjdC5uYW1lXTsgLy8gdW5leHBvc2UgZW51bSB2YWx1ZXNcclxuXHJcbiAgICB9IGVsc2UgaWYgKG9iamVjdCBpbnN0YW5jZW9mIE5hbWVzcGFjZSkge1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IC8qIGluaXRpYWxpemVzICovIG9iamVjdC5uZXN0ZWRBcnJheS5sZW5ndGg7ICsraSkgLy8gcmVjdXJzZSBpbnRvIHRoZSBuYW1lc3BhY2VcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlUmVtb3ZlKG9iamVjdC5fbmVzdGVkQXJyYXlbaV0pO1xyXG5cclxuICAgICAgICBpZiAoZXhwb3NlUmUudGVzdChvYmplY3QubmFtZSkpXHJcbiAgICAgICAgICAgIGRlbGV0ZSBvYmplY3QucGFyZW50W29iamVjdC5uYW1lXTsgLy8gdW5leHBvc2UgbmFtZXNwYWNlc1xyXG5cclxuICAgIH1cclxufTtcclxuXHJcblJvb3QuX2NvbmZpZ3VyZSA9IGZ1bmN0aW9uKFR5cGVfLCBwYXJzZV8sIGNvbW1vbl8pIHtcclxuICAgIFR5cGUgPSBUeXBlXztcclxuICAgIHBhcnNlID0gcGFyc2VfO1xyXG4gICAgY29tbW9uID0gY29tbW9uXztcclxufTtcclxuXHJcbn0se1wiMTVcIjoxNSxcIjE2XCI6MTYsXCIyM1wiOjIzLFwiMjVcIjoyNSxcIjM3XCI6Mzd9XSwzMDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xyXG5cclxuLyoqXHJcbiAqIE5hbWVkIHJvb3RzLlxyXG4gKiBUaGlzIGlzIHdoZXJlIHBianMgc3RvcmVzIGdlbmVyYXRlZCBzdHJ1Y3R1cmVzICh0aGUgb3B0aW9uIGAtciwgLS1yb290YCBzcGVjaWZpZXMgYSBuYW1lKS5cclxuICogQ2FuIGFsc28gYmUgdXNlZCBtYW51YWxseSB0byBtYWtlIHJvb3RzIGF2YWlsYWJsZSBhY2Nyb3NzIG1vZHVsZXMuXHJcbiAqIEBuYW1lIHJvb3RzXHJcbiAqIEB0eXBlIHtPYmplY3QuPHN0cmluZyxSb290Pn1cclxuICogQGV4YW1wbGVcclxuICogLy8gcGJqcyAtciBteXJvb3QgLW8gY29tcGlsZWQuanMgLi4uXHJcbiAqXHJcbiAqIC8vIGluIGFub3RoZXIgbW9kdWxlOlxyXG4gKiByZXF1aXJlKFwiLi9jb21waWxlZC5qc1wiKTtcclxuICpcclxuICogLy8gaW4gYW55IHN1YnNlcXVlbnQgbW9kdWxlOlxyXG4gKiB2YXIgcm9vdCA9IHByb3RvYnVmLnJvb3RzW1wibXlyb290XCJdO1xyXG4gKi9cclxuXHJcbn0se31dLDMxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKipcclxuICogU3RyZWFtaW5nIFJQQyBoZWxwZXJzLlxyXG4gKiBAbmFtZXNwYWNlXHJcbiAqL1xyXG52YXIgcnBjID0gZXhwb3J0cztcclxuXHJcbi8qKlxyXG4gKiBSUEMgaW1wbGVtZW50YXRpb24gcGFzc2VkIHRvIHtAbGluayBTZXJ2aWNlI2NyZWF0ZX0gcGVyZm9ybWluZyBhIHNlcnZpY2UgcmVxdWVzdCBvbiBuZXR3b3JrIGxldmVsLCBpLmUuIGJ5IHV0aWxpemluZyBodHRwIHJlcXVlc3RzIG9yIHdlYnNvY2tldHMuXHJcbiAqIEB0eXBlZGVmIFJQQ0ltcGxcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKiBAcGFyYW0ge01ldGhvZHxycGMuU2VydmljZU1ldGhvZDxNZXNzYWdlPHt9PixNZXNzYWdlPHt9Pj59IG1ldGhvZCBSZWZsZWN0ZWQgb3Igc3RhdGljIG1ldGhvZCBiZWluZyBjYWxsZWRcclxuICogQHBhcmFtIHtVaW50OEFycmF5fSByZXF1ZXN0RGF0YSBSZXF1ZXN0IGRhdGFcclxuICogQHBhcmFtIHtSUENJbXBsQ2FsbGJhY2t9IGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uXHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqIEBleGFtcGxlXHJcbiAqIGZ1bmN0aW9uIHJwY0ltcGwobWV0aG9kLCByZXF1ZXN0RGF0YSwgY2FsbGJhY2spIHtcclxuICogICAgIGlmIChwcm90b2J1Zi51dGlsLmxjRmlyc3QobWV0aG9kLm5hbWUpICE9PSBcIm15TWV0aG9kXCIpIC8vIGNvbXBhdGlibGUgd2l0aCBzdGF0aWMgY29kZVxyXG4gKiAgICAgICAgIHRocm93IEVycm9yKFwibm8gc3VjaCBtZXRob2RcIik7XHJcbiAqICAgICBhc3luY2hyb25vdXNseU9idGFpbkFSZXNwb25zZShyZXF1ZXN0RGF0YSwgZnVuY3Rpb24oZXJyLCByZXNwb25zZURhdGEpIHtcclxuICogICAgICAgICBjYWxsYmFjayhlcnIsIHJlc3BvbnNlRGF0YSk7XHJcbiAqICAgICB9KTtcclxuICogfVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBOb2RlLXN0eWxlIGNhbGxiYWNrIGFzIHVzZWQgYnkge0BsaW5rIFJQQ0ltcGx9LlxyXG4gKiBAdHlwZWRlZiBSUENJbXBsQ2FsbGJhY2tcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKiBAcGFyYW0ge0Vycm9yfG51bGx9IGVycm9yIEVycm9yLCBpZiBhbnksIG90aGVyd2lzZSBgbnVsbGBcclxuICogQHBhcmFtIHtVaW50OEFycmF5fG51bGx9IFtyZXNwb25zZV0gUmVzcG9uc2UgZGF0YSBvciBgbnVsbGAgdG8gc2lnbmFsIGVuZCBvZiBzdHJlYW0sIGlmIHRoZXJlIGhhc24ndCBiZWVuIGFuIGVycm9yXHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5cclxucnBjLlNlcnZpY2UgPSByZXF1aXJlKDMyKTtcclxuXHJcbn0se1wiMzJcIjozMn1dLDMyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gU2VydmljZTtcclxuXHJcbnZhciB1dGlsID0gcmVxdWlyZSgzOSk7XHJcblxyXG4vLyBFeHRlbmRzIEV2ZW50RW1pdHRlclxyXG4oU2VydmljZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHV0aWwuRXZlbnRFbWl0dGVyLnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yID0gU2VydmljZTtcclxuXHJcbi8qKlxyXG4gKiBBIHNlcnZpY2UgbWV0aG9kIGNhbGxiYWNrIGFzIHVzZWQgYnkge0BsaW5rIHJwYy5TZXJ2aWNlTWV0aG9kfFNlcnZpY2VNZXRob2R9LlxyXG4gKlxyXG4gKiBEaWZmZXJzIGZyb20ge0BsaW5rIFJQQ0ltcGxDYWxsYmFja30gaW4gdGhhdCBpdCBpcyBhbiBhY3R1YWwgY2FsbGJhY2sgb2YgYSBzZXJ2aWNlIG1ldGhvZCB3aGljaCBtYXkgbm90IHJldHVybiBgcmVzcG9uc2UgPSBudWxsYC5cclxuICogQHR5cGVkZWYgcnBjLlNlcnZpY2VNZXRob2RDYWxsYmFja1xyXG4gKiBAdGVtcGxhdGUgVFJlcyBleHRlbmRzIE1lc3NhZ2U8VFJlcz5cclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKiBAcGFyYW0ge0Vycm9yfG51bGx9IGVycm9yIEVycm9yLCBpZiBhbnlcclxuICogQHBhcmFtIHtUUmVzfSBbcmVzcG9uc2VdIFJlc3BvbnNlIG1lc3NhZ2VcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblxyXG4vKipcclxuICogQSBzZXJ2aWNlIG1ldGhvZCBwYXJ0IG9mIGEge0BsaW5rIHJwYy5TZXJ2aWNlfSBhcyBjcmVhdGVkIGJ5IHtAbGluayBTZXJ2aWNlLmNyZWF0ZX0uXHJcbiAqIEB0eXBlZGVmIHJwYy5TZXJ2aWNlTWV0aG9kXHJcbiAqIEB0ZW1wbGF0ZSBUUmVxIGV4dGVuZHMgTWVzc2FnZTxUUmVxPlxyXG4gKiBAdGVtcGxhdGUgVFJlcyBleHRlbmRzIE1lc3NhZ2U8VFJlcz5cclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKiBAcGFyYW0ge1RSZXF8UHJvcGVydGllczxUUmVxPn0gcmVxdWVzdCBSZXF1ZXN0IG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0XHJcbiAqIEBwYXJhbSB7cnBjLlNlcnZpY2VNZXRob2RDYWxsYmFjazxUUmVzPn0gW2NhbGxiYWNrXSBOb2RlLXN0eWxlIGNhbGxiYWNrIGNhbGxlZCB3aXRoIHRoZSBlcnJvciwgaWYgYW55LCBhbmQgdGhlIHJlc3BvbnNlIG1lc3NhZ2VcclxuICogQHJldHVybnMge1Byb21pc2U8TWVzc2FnZTxUUmVzPj59IFByb21pc2UgaWYgYGNhbGxiYWNrYCBoYXMgYmVlbiBvbWl0dGVkLCBvdGhlcndpc2UgYHVuZGVmaW5lZGBcclxuICovXHJcblxyXG4vKipcclxuICogQ29uc3RydWN0cyBhIG5ldyBSUEMgc2VydmljZSBpbnN0YW5jZS5cclxuICogQGNsYXNzZGVzYyBBbiBSUEMgc2VydmljZSBhcyByZXR1cm5lZCBieSB7QGxpbmsgU2VydmljZSNjcmVhdGV9LlxyXG4gKiBAZXhwb3J0cyBycGMuU2VydmljZVxyXG4gKiBAZXh0ZW5kcyB1dGlsLkV2ZW50RW1pdHRlclxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtSUENJbXBsfSBycGNJbXBsIFJQQyBpbXBsZW1lbnRhdGlvblxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXF1ZXN0RGVsaW1pdGVkPWZhbHNlXSBXaGV0aGVyIHJlcXVlc3RzIGFyZSBsZW5ndGgtZGVsaW1pdGVkXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Jlc3BvbnNlRGVsaW1pdGVkPWZhbHNlXSBXaGV0aGVyIHJlc3BvbnNlcyBhcmUgbGVuZ3RoLWRlbGltaXRlZFxyXG4gKi9cclxuZnVuY3Rpb24gU2VydmljZShycGNJbXBsLCByZXF1ZXN0RGVsaW1pdGVkLCByZXNwb25zZURlbGltaXRlZCkge1xyXG5cclxuICAgIGlmICh0eXBlb2YgcnBjSW1wbCAhPT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIHRocm93IFR5cGVFcnJvcihcInJwY0ltcGwgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xyXG5cclxuICAgIHV0aWwuRXZlbnRFbWl0dGVyLmNhbGwodGhpcyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSUEMgaW1wbGVtZW50YXRpb24uIEJlY29tZXMgYG51bGxgIG9uY2UgdGhlIHNlcnZpY2UgaXMgZW5kZWQuXHJcbiAgICAgKiBAdHlwZSB7UlBDSW1wbHxudWxsfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnJwY0ltcGwgPSBycGNJbXBsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciByZXF1ZXN0cyBhcmUgbGVuZ3RoLWRlbGltaXRlZC5cclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICB0aGlzLnJlcXVlc3REZWxpbWl0ZWQgPSBCb29sZWFuKHJlcXVlc3REZWxpbWl0ZWQpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciByZXNwb25zZXMgYXJlIGxlbmd0aC1kZWxpbWl0ZWQuXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5yZXNwb25zZURlbGltaXRlZCA9IEJvb2xlYW4ocmVzcG9uc2VEZWxpbWl0ZWQpO1xyXG59XHJcblxyXG4vKipcclxuICogQ2FsbHMgYSBzZXJ2aWNlIG1ldGhvZCB0aHJvdWdoIHtAbGluayBycGMuU2VydmljZSNycGNJbXBsfHJwY0ltcGx9LlxyXG4gKiBAcGFyYW0ge01ldGhvZHxycGMuU2VydmljZU1ldGhvZDxUUmVxLFRSZXM+fSBtZXRob2QgUmVmbGVjdGVkIG9yIHN0YXRpYyBtZXRob2RcclxuICogQHBhcmFtIHtDb25zdHJ1Y3RvcjxUUmVxPn0gcmVxdWVzdEN0b3IgUmVxdWVzdCBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge0NvbnN0cnVjdG9yPFRSZXM+fSByZXNwb25zZUN0b3IgUmVzcG9uc2UgY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtUUmVxfFByb3BlcnRpZXM8VFJlcT59IHJlcXVlc3QgUmVxdWVzdCBtZXNzYWdlIG9yIHBsYWluIG9iamVjdFxyXG4gKiBAcGFyYW0ge3JwYy5TZXJ2aWNlTWV0aG9kQ2FsbGJhY2s8VFJlcz59IGNhbGxiYWNrIFNlcnZpY2UgY2FsbGJhY2tcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICogQHRlbXBsYXRlIFRSZXEgZXh0ZW5kcyBNZXNzYWdlPFRSZXE+XHJcbiAqIEB0ZW1wbGF0ZSBUUmVzIGV4dGVuZHMgTWVzc2FnZTxUUmVzPlxyXG4gKi9cclxuU2VydmljZS5wcm90b3R5cGUucnBjQ2FsbCA9IGZ1bmN0aW9uIHJwY0NhbGwobWV0aG9kLCByZXF1ZXN0Q3RvciwgcmVzcG9uc2VDdG9yLCByZXF1ZXN0LCBjYWxsYmFjaykge1xyXG5cclxuICAgIGlmICghcmVxdWVzdClcclxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJyZXF1ZXN0IG11c3QgYmUgc3BlY2lmaWVkXCIpO1xyXG5cclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIGlmICghY2FsbGJhY2spXHJcbiAgICAgICAgcmV0dXJuIHV0aWwuYXNQcm9taXNlKHJwY0NhbGwsIHNlbGYsIG1ldGhvZCwgcmVxdWVzdEN0b3IsIHJlc3BvbnNlQ3RvciwgcmVxdWVzdCk7XHJcblxyXG4gICAgaWYgKCFzZWxmLnJwY0ltcGwpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBjYWxsYmFjayhFcnJvcihcImFscmVhZHkgZW5kZWRcIikpOyB9LCAwKTtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIHNlbGYucnBjSW1wbChcclxuICAgICAgICAgICAgbWV0aG9kLFxyXG4gICAgICAgICAgICByZXF1ZXN0Q3RvcltzZWxmLnJlcXVlc3REZWxpbWl0ZWQgPyBcImVuY29kZURlbGltaXRlZFwiIDogXCJlbmNvZGVcIl0ocmVxdWVzdCkuZmluaXNoKCksXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHJwY0NhbGxiYWNrKGVyciwgcmVzcG9uc2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbWl0KFwiZXJyb3JcIiwgZXJyLCBtZXRob2QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZW5kKC8qIGVuZGVkQnlSUEMgKi8gdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIShyZXNwb25zZSBpbnN0YW5jZW9mIHJlc3BvbnNlQ3RvcikpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IHJlc3BvbnNlQ3RvcltzZWxmLnJlc3BvbnNlRGVsaW1pdGVkID8gXCJkZWNvZGVEZWxpbWl0ZWRcIiA6IFwiZGVjb2RlXCJdKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5lbWl0KFwiZXJyb3JcIiwgZXJyLCBtZXRob2QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5lbWl0KFwiZGF0YVwiLCByZXNwb25zZSwgbWV0aG9kKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgc2VsZi5lbWl0KFwiZXJyb3JcIiwgZXJyLCBtZXRob2QpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNhbGxiYWNrKGVycik7IH0sIDApO1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogRW5kcyB0aGlzIHNlcnZpY2UgYW5kIGVtaXRzIHRoZSBgZW5kYCBldmVudC5cclxuICogQHBhcmFtIHtib29sZWFufSBbZW5kZWRCeVJQQz1mYWxzZV0gV2hldGhlciB0aGUgc2VydmljZSBoYXMgYmVlbiBlbmRlZCBieSB0aGUgUlBDIGltcGxlbWVudGF0aW9uLlxyXG4gKiBAcmV0dXJucyB7cnBjLlNlcnZpY2V9IGB0aGlzYFxyXG4gKi9cclxuU2VydmljZS5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gZW5kKGVuZGVkQnlSUEMpIHtcclxuICAgIGlmICh0aGlzLnJwY0ltcGwpIHtcclxuICAgICAgICBpZiAoIWVuZGVkQnlSUEMpIC8vIHNpZ25hbCBlbmQgdG8gcnBjSW1wbFxyXG4gICAgICAgICAgICB0aGlzLnJwY0ltcGwobnVsbCwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgdGhpcy5ycGNJbXBsID0gbnVsbDtcclxuICAgICAgICB0aGlzLmVtaXQoXCJlbmRcIikub2ZmKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbn0se1wiMzlcIjozOX1dLDMzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gU2VydmljZTtcclxuXHJcbi8vIGV4dGVuZHMgTmFtZXNwYWNlXHJcbnZhciBOYW1lc3BhY2UgPSByZXF1aXJlKDIzKTtcclxuKChTZXJ2aWNlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoTmFtZXNwYWNlLnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yID0gU2VydmljZSkuY2xhc3NOYW1lID0gXCJTZXJ2aWNlXCI7XHJcblxyXG52YXIgTWV0aG9kID0gcmVxdWlyZSgyMiksXHJcbiAgICB1dGlsICAgPSByZXF1aXJlKDM3KSxcclxuICAgIHJwYyAgICA9IHJlcXVpcmUoMzEpO1xyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgYSBuZXcgc2VydmljZSBpbnN0YW5jZS5cclxuICogQGNsYXNzZGVzYyBSZWZsZWN0ZWQgc2VydmljZS5cclxuICogQGV4dGVuZHMgTmFtZXNwYWNlQmFzZVxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgU2VydmljZSBuYW1lXHJcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IFtvcHRpb25zXSBTZXJ2aWNlIG9wdGlvbnNcclxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBhcmd1bWVudHMgYXJlIGludmFsaWRcclxuICovXHJcbmZ1bmN0aW9uIFNlcnZpY2UobmFtZSwgb3B0aW9ucykge1xyXG4gICAgTmFtZXNwYWNlLmNhbGwodGhpcywgbmFtZSwgb3B0aW9ucyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXJ2aWNlIG1ldGhvZHMuXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0LjxzdHJpbmcsTWV0aG9kPn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5tZXRob2RzID0ge307IC8vIHRvSlNPTiwgbWFya2VyXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWNoZWQgbWV0aG9kcyBhcyBhbiBhcnJheS5cclxuICAgICAqIEB0eXBlIHtNZXRob2RbXXxudWxsfVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgdGhpcy5fbWV0aG9kc0FycmF5ID0gbnVsbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNlcnZpY2UgZGVzY3JpcHRvci5cclxuICogQGludGVyZmFjZSBJU2VydmljZVxyXG4gKiBAZXh0ZW5kcyBJTmFtZXNwYWNlXHJcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0LjxzdHJpbmcsSU1ldGhvZD59IG1ldGhvZHMgTWV0aG9kIGRlc2NyaXB0b3JzXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgYSBzZXJ2aWNlIGZyb20gYSBzZXJ2aWNlIGRlc2NyaXB0b3IuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFNlcnZpY2UgbmFtZVxyXG4gKiBAcGFyYW0ge0lTZXJ2aWNlfSBqc29uIFNlcnZpY2UgZGVzY3JpcHRvclxyXG4gKiBAcmV0dXJucyB7U2VydmljZX0gQ3JlYXRlZCBzZXJ2aWNlXHJcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYXJndW1lbnRzIGFyZSBpbnZhbGlkXHJcbiAqL1xyXG5TZXJ2aWNlLmZyb21KU09OID0gZnVuY3Rpb24gZnJvbUpTT04obmFtZSwganNvbikge1xyXG4gICAgdmFyIHNlcnZpY2UgPSBuZXcgU2VydmljZShuYW1lLCBqc29uLm9wdGlvbnMpO1xyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cclxuICAgIGlmIChqc29uLm1ldGhvZHMpXHJcbiAgICAgICAgZm9yICh2YXIgbmFtZXMgPSBPYmplY3Qua2V5cyhqc29uLm1ldGhvZHMpLCBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgICBzZXJ2aWNlLmFkZChNZXRob2QuZnJvbUpTT04obmFtZXNbaV0sIGpzb24ubWV0aG9kc1tuYW1lc1tpXV0pKTtcclxuICAgIGlmIChqc29uLm5lc3RlZClcclxuICAgICAgICBzZXJ2aWNlLmFkZEpTT04oanNvbi5uZXN0ZWQpO1xyXG4gICAgc2VydmljZS5jb21tZW50ID0ganNvbi5jb21tZW50O1xyXG4gICAgcmV0dXJuIHNlcnZpY2U7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhpcyBzZXJ2aWNlIHRvIGEgc2VydmljZSBkZXNjcmlwdG9yLlxyXG4gKiBAcGFyYW0ge0lUb0pTT05PcHRpb25zfSBbdG9KU09OT3B0aW9uc10gSlNPTiBjb252ZXJzaW9uIG9wdGlvbnNcclxuICogQHJldHVybnMge0lTZXJ2aWNlfSBTZXJ2aWNlIGRlc2NyaXB0b3JcclxuICovXHJcblNlcnZpY2UucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTih0b0pTT05PcHRpb25zKSB7XHJcbiAgICB2YXIgaW5oZXJpdGVkID0gTmFtZXNwYWNlLnByb3RvdHlwZS50b0pTT04uY2FsbCh0aGlzLCB0b0pTT05PcHRpb25zKTtcclxuICAgIHZhciBrZWVwQ29tbWVudHMgPSB0b0pTT05PcHRpb25zID8gQm9vbGVhbih0b0pTT05PcHRpb25zLmtlZXBDb21tZW50cykgOiBmYWxzZTtcclxuICAgIHJldHVybiB1dGlsLnRvT2JqZWN0KFtcclxuICAgICAgICBcIm9wdGlvbnNcIiAsIGluaGVyaXRlZCAmJiBpbmhlcml0ZWQub3B0aW9ucyB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgXCJtZXRob2RzXCIgLCBOYW1lc3BhY2UuYXJyYXlUb0pTT04odGhpcy5tZXRob2RzQXJyYXksIHRvSlNPTk9wdGlvbnMpIHx8IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIHt9LFxyXG4gICAgICAgIFwibmVzdGVkXCIgICwgaW5oZXJpdGVkICYmIGluaGVyaXRlZC5uZXN0ZWQgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgIFwiY29tbWVudFwiICwga2VlcENvbW1lbnRzID8gdGhpcy5jb21tZW50IDogdW5kZWZpbmVkXHJcbiAgICBdKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBNZXRob2RzIG9mIHRoaXMgc2VydmljZSBhcyBhbiBhcnJheSBmb3IgaXRlcmF0aW9uLlxyXG4gKiBAbmFtZSBTZXJ2aWNlI21ldGhvZHNBcnJheVxyXG4gKiBAdHlwZSB7TWV0aG9kW119XHJcbiAqIEByZWFkb25seVxyXG4gKi9cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlcnZpY2UucHJvdG90eXBlLCBcIm1ldGhvZHNBcnJheVwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRob2RzQXJyYXkgfHwgKHRoaXMuX21ldGhvZHNBcnJheSA9IHV0aWwudG9BcnJheSh0aGlzLm1ldGhvZHMpKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5mdW5jdGlvbiBjbGVhckNhY2hlKHNlcnZpY2UpIHtcclxuICAgIHNlcnZpY2UuX21ldGhvZHNBcnJheSA9IG51bGw7XHJcbiAgICByZXR1cm4gc2VydmljZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBvdmVycmlkZVxyXG4gKi9cclxuU2VydmljZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KG5hbWUpIHtcclxuICAgIHJldHVybiB0aGlzLm1ldGhvZHNbbmFtZV1cclxuICAgICAgICB8fCBOYW1lc3BhY2UucHJvdG90eXBlLmdldC5jYWxsKHRoaXMsIG5hbWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBvdmVycmlkZVxyXG4gKi9cclxuU2VydmljZS5wcm90b3R5cGUucmVzb2x2ZUFsbCA9IGZ1bmN0aW9uIHJlc29sdmVBbGwoKSB7XHJcbiAgICB2YXIgbWV0aG9kcyA9IHRoaXMubWV0aG9kc0FycmF5O1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXRob2RzLmxlbmd0aDsgKytpKVxyXG4gICAgICAgIG1ldGhvZHNbaV0ucmVzb2x2ZSgpO1xyXG4gICAgcmV0dXJuIE5hbWVzcGFjZS5wcm90b3R5cGUucmVzb2x2ZS5jYWxsKHRoaXMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBvdmVycmlkZVxyXG4gKi9cclxuU2VydmljZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkKG9iamVjdCkge1xyXG5cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgaWYgKHRoaXMuZ2V0KG9iamVjdC5uYW1lKSlcclxuICAgICAgICB0aHJvdyBFcnJvcihcImR1cGxpY2F0ZSBuYW1lICdcIiArIG9iamVjdC5uYW1lICsgXCInIGluIFwiICsgdGhpcyk7XHJcblxyXG4gICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIE1ldGhvZCkge1xyXG4gICAgICAgIHRoaXMubWV0aG9kc1tvYmplY3QubmFtZV0gPSBvYmplY3Q7XHJcbiAgICAgICAgb2JqZWN0LnBhcmVudCA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIGNsZWFyQ2FjaGUodGhpcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gTmFtZXNwYWNlLnByb3RvdHlwZS5hZGQuY2FsbCh0aGlzLCBvYmplY3QpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBvdmVycmlkZVxyXG4gKi9cclxuU2VydmljZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlKG9iamVjdCkge1xyXG4gICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIE1ldGhvZCkge1xyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICBpZiAodGhpcy5tZXRob2RzW29iamVjdC5uYW1lXSAhPT0gb2JqZWN0KVxyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihvYmplY3QgKyBcIiBpcyBub3QgYSBtZW1iZXIgb2YgXCIgKyB0aGlzKTtcclxuXHJcbiAgICAgICAgZGVsZXRlIHRoaXMubWV0aG9kc1tvYmplY3QubmFtZV07XHJcbiAgICAgICAgb2JqZWN0LnBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIGNsZWFyQ2FjaGUodGhpcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gTmFtZXNwYWNlLnByb3RvdHlwZS5yZW1vdmUuY2FsbCh0aGlzLCBvYmplY3QpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBydW50aW1lIHNlcnZpY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBycGMgaW1wbGVtZW50YXRpb24uXHJcbiAqIEBwYXJhbSB7UlBDSW1wbH0gcnBjSW1wbCBSUEMgaW1wbGVtZW50YXRpb25cclxuICogQHBhcmFtIHtib29sZWFufSBbcmVxdWVzdERlbGltaXRlZD1mYWxzZV0gV2hldGhlciByZXF1ZXN0cyBhcmUgbGVuZ3RoLWRlbGltaXRlZFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXNwb25zZURlbGltaXRlZD1mYWxzZV0gV2hldGhlciByZXNwb25zZXMgYXJlIGxlbmd0aC1kZWxpbWl0ZWRcclxuICogQHJldHVybnMge3JwYy5TZXJ2aWNlfSBSUEMgc2VydmljZS4gVXNlZnVsIHdoZXJlIHJlcXVlc3RzIGFuZC9vciByZXNwb25zZXMgYXJlIHN0cmVhbWVkLlxyXG4gKi9cclxuU2VydmljZS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKHJwY0ltcGwsIHJlcXVlc3REZWxpbWl0ZWQsIHJlc3BvbnNlRGVsaW1pdGVkKSB7XHJcbiAgICB2YXIgcnBjU2VydmljZSA9IG5ldyBycGMuU2VydmljZShycGNJbXBsLCByZXF1ZXN0RGVsaW1pdGVkLCByZXNwb25zZURlbGltaXRlZCk7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbWV0aG9kOyBpIDwgLyogaW5pdGlhbGl6ZXMgKi8gdGhpcy5tZXRob2RzQXJyYXkubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICB2YXIgbWV0aG9kTmFtZSA9IHV0aWwubGNGaXJzdCgobWV0aG9kID0gdGhpcy5fbWV0aG9kc0FycmF5W2ldKS5yZXNvbHZlKCkubmFtZSkucmVwbGFjZSgvW14kXFx3X10vZywgXCJcIik7XHJcbiAgICAgICAgcnBjU2VydmljZVttZXRob2ROYW1lXSA9IHV0aWwuY29kZWdlbihbXCJyXCIsXCJjXCJdLCB1dGlsLmlzUmVzZXJ2ZWQobWV0aG9kTmFtZSkgPyBtZXRob2ROYW1lICsgXCJfXCIgOiBtZXRob2ROYW1lKShcInJldHVybiB0aGlzLnJwY0NhbGwobSxxLHMscixjKVwiKSh7XHJcbiAgICAgICAgICAgIG06IG1ldGhvZCxcclxuICAgICAgICAgICAgcTogbWV0aG9kLnJlc29sdmVkUmVxdWVzdFR5cGUuY3RvcixcclxuICAgICAgICAgICAgczogbWV0aG9kLnJlc29sdmVkUmVzcG9uc2VUeXBlLmN0b3JcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBycGNTZXJ2aWNlO1xyXG59O1xyXG5cclxufSx7XCIyMlwiOjIyLFwiMjNcIjoyMyxcIjMxXCI6MzEsXCIzN1wiOjM3fV0sMzQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSB0b2tlbml6ZTtcclxuXHJcbnZhciBkZWxpbVJlICAgICAgICA9IC9bXFxze309OzpbXFxdLCdcIigpPD5dL2csXHJcbiAgICBzdHJpbmdEb3VibGVSZSA9IC8oPzpcIihbXlwiXFxcXF0qKD86XFxcXC5bXlwiXFxcXF0qKSopXCIpL2csXHJcbiAgICBzdHJpbmdTaW5nbGVSZSA9IC8oPzonKFteJ1xcXFxdKig/OlxcXFwuW14nXFxcXF0qKSopJykvZztcclxuXHJcbnZhciBzZXRDb21tZW50UmUgPSAvXiAqWyovXSsgKi8sXHJcbiAgICBzZXRDb21tZW50QWx0UmUgPSAvXlxccypcXCo/XFwvKi8sXHJcbiAgICBzZXRDb21tZW50U3BsaXRSZSA9IC9cXG4vZyxcclxuICAgIHdoaXRlc3BhY2VSZSA9IC9cXHMvLFxyXG4gICAgdW5lc2NhcGVSZSA9IC9cXFxcKC4/KS9nO1xyXG5cclxudmFyIHVuZXNjYXBlTWFwID0ge1xyXG4gICAgXCIwXCI6IFwiXFwwXCIsXHJcbiAgICBcInJcIjogXCJcXHJcIixcclxuICAgIFwiblwiOiBcIlxcblwiLFxyXG4gICAgXCJ0XCI6IFwiXFx0XCJcclxufTtcclxuXHJcbi8qKlxyXG4gKiBVbmVzY2FwZXMgYSBzdHJpbmcuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgU3RyaW5nIHRvIHVuZXNjYXBlXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFVuZXNjYXBlZCBzdHJpbmdcclxuICogQHByb3BlcnR5IHtPYmplY3QuPHN0cmluZyxzdHJpbmc+fSBtYXAgU3BlY2lhbCBjaGFyYWN0ZXJzIG1hcFxyXG4gKiBAbWVtYmVyb2YgdG9rZW5pemVcclxuICovXHJcbmZ1bmN0aW9uIHVuZXNjYXBlKHN0cikge1xyXG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKHVuZXNjYXBlUmUsIGZ1bmN0aW9uKCQwLCAkMSkge1xyXG4gICAgICAgIHN3aXRjaCAoJDEpIHtcclxuICAgICAgICAgICAgY2FzZSBcIlxcXFxcIjpcclxuICAgICAgICAgICAgY2FzZSBcIlwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQxO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZXNjYXBlTWFwWyQxXSB8fCBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG50b2tlbml6ZS51bmVzY2FwZSA9IHVuZXNjYXBlO1xyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIG5leHQgdG9rZW4gYW5kIGFkdmFuY2VzLlxyXG4gKiBAdHlwZWRlZiBUb2tlbml6ZXJIYW5kbGVOZXh0XHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICogQHJldHVybnMge3N0cmluZ3xudWxsfSBOZXh0IHRva2VuIG9yIGBudWxsYCBvbiBlb2ZcclxuICovXHJcblxyXG4vKipcclxuICogUGVla3MgZm9yIHRoZSBuZXh0IHRva2VuLlxyXG4gKiBAdHlwZWRlZiBUb2tlbml6ZXJIYW5kbGVQZWVrXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICogQHJldHVybnMge3N0cmluZ3xudWxsfSBOZXh0IHRva2VuIG9yIGBudWxsYCBvbiBlb2ZcclxuICovXHJcblxyXG4vKipcclxuICogUHVzaGVzIGEgdG9rZW4gYmFjayB0byB0aGUgc3RhY2suXHJcbiAqIEB0eXBlZGVmIFRva2VuaXplckhhbmRsZVB1c2hcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdG9rZW4gVG9rZW5cclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblxyXG4vKipcclxuICogU2tpcHMgdGhlIG5leHQgdG9rZW4uXHJcbiAqIEB0eXBlZGVmIFRva2VuaXplckhhbmRsZVNraXBcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZXhwZWN0ZWQgRXhwZWN0ZWQgdG9rZW5cclxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9uYWw9ZmFsc2VdIElmIG9wdGlvbmFsXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIHRoZSB0b2tlbiBtYXRjaGVkXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgdG9rZW4gZGlkbid0IG1hdGNoIGFuZCBpcyBub3Qgb3B0aW9uYWxcclxuICovXHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgY29tbWVudCBvbiB0aGUgcHJldmlvdXMgbGluZSBvciwgYWx0ZXJuYXRpdmVseSwgdGhlIGxpbmUgY29tbWVudCBvbiB0aGUgc3BlY2lmaWVkIGxpbmUuXHJcbiAqIEB0eXBlZGVmIFRva2VuaXplckhhbmRsZUNtbnRcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKiBAcGFyYW0ge251bWJlcn0gW2xpbmVdIExpbmUgbnVtYmVyXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gQ29tbWVudCB0ZXh0IG9yIGBudWxsYCBpZiBub25lXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEhhbmRsZSBvYmplY3QgcmV0dXJuZWQgZnJvbSB7QGxpbmsgdG9rZW5pemV9LlxyXG4gKiBAaW50ZXJmYWNlIElUb2tlbml6ZXJIYW5kbGVcclxuICogQHByb3BlcnR5IHtUb2tlbml6ZXJIYW5kbGVOZXh0fSBuZXh0IEdldHMgdGhlIG5leHQgdG9rZW4gYW5kIGFkdmFuY2VzIChgbnVsbGAgb24gZW9mKVxyXG4gKiBAcHJvcGVydHkge1Rva2VuaXplckhhbmRsZVBlZWt9IHBlZWsgUGVla3MgZm9yIHRoZSBuZXh0IHRva2VuIChgbnVsbGAgb24gZW9mKVxyXG4gKiBAcHJvcGVydHkge1Rva2VuaXplckhhbmRsZVB1c2h9IHB1c2ggUHVzaGVzIGEgdG9rZW4gYmFjayB0byB0aGUgc3RhY2tcclxuICogQHByb3BlcnR5IHtUb2tlbml6ZXJIYW5kbGVTa2lwfSBza2lwIFNraXBzIGEgdG9rZW4sIHJldHVybnMgaXRzIHByZXNlbmNlIGFuZCBhZHZhbmNlcyBvciwgaWYgbm9uLW9wdGlvbmFsIGFuZCBub3QgcHJlc2VudCwgdGhyb3dzXHJcbiAqIEBwcm9wZXJ0eSB7VG9rZW5pemVySGFuZGxlQ21udH0gY21udCBHZXRzIHRoZSBjb21tZW50IG9uIHRoZSBwcmV2aW91cyBsaW5lIG9yIHRoZSBsaW5lIGNvbW1lbnQgb24gdGhlIHNwZWNpZmllZCBsaW5lLCBpZiBhbnlcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IGxpbmUgQ3VycmVudCBsaW5lIG51bWJlclxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBUb2tlbml6ZXMgdGhlIGdpdmVuIC5wcm90byBzb3VyY2UgYW5kIHJldHVybnMgYW4gb2JqZWN0IHdpdGggdXNlZnVsIHV0aWxpdHkgZnVuY3Rpb25zLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc291cmNlIFNvdXJjZSBjb250ZW50c1xyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGFsdGVybmF0ZUNvbW1lbnRNb2RlIFdoZXRoZXIgd2Ugc2hvdWxkIGFjdGl2YXRlIGFsdGVybmF0ZSBjb21tZW50IHBhcnNpbmcgbW9kZS5cclxuICogQHJldHVybnMge0lUb2tlbml6ZXJIYW5kbGV9IFRva2VuaXplciBoYW5kbGVcclxuICovXHJcbmZ1bmN0aW9uIHRva2VuaXplKHNvdXJjZSwgYWx0ZXJuYXRlQ29tbWVudE1vZGUpIHtcclxuICAgIC8qIGVzbGludC1kaXNhYmxlIGNhbGxiYWNrLXJldHVybiAqL1xyXG4gICAgc291cmNlID0gc291cmNlLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgdmFyIG9mZnNldCA9IDAsXHJcbiAgICAgICAgbGVuZ3RoID0gc291cmNlLmxlbmd0aCxcclxuICAgICAgICBsaW5lID0gMSxcclxuICAgICAgICBjb21tZW50VHlwZSA9IG51bGwsXHJcbiAgICAgICAgY29tbWVudFRleHQgPSBudWxsLFxyXG4gICAgICAgIGNvbW1lbnRMaW5lID0gMCxcclxuICAgICAgICBjb21tZW50TGluZUVtcHR5ID0gZmFsc2U7XHJcblxyXG4gICAgdmFyIHN0YWNrID0gW107XHJcblxyXG4gICAgdmFyIHN0cmluZ0RlbGltID0gbnVsbDtcclxuXHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGVycm9yIGZvciBpbGxlZ2FsIHN5bnRheC5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdWJqZWN0IFN1YmplY3RcclxuICAgICAqIEByZXR1cm5zIHtFcnJvcn0gRXJyb3IgY3JlYXRlZFxyXG4gICAgICogQGlubmVyXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlsbGVnYWwoc3ViamVjdCkge1xyXG4gICAgICAgIHJldHVybiBFcnJvcihcImlsbGVnYWwgXCIgKyBzdWJqZWN0ICsgXCIgKGxpbmUgXCIgKyBsaW5lICsgXCIpXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZHMgYSBzdHJpbmcgdGlsbCBpdHMgZW5kLlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ30gU3RyaW5nIHJlYWRcclxuICAgICAqIEBpbm5lclxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiByZWFkU3RyaW5nKCkge1xyXG4gICAgICAgIHZhciByZSA9IHN0cmluZ0RlbGltID09PSBcIidcIiA/IHN0cmluZ1NpbmdsZVJlIDogc3RyaW5nRG91YmxlUmU7XHJcbiAgICAgICAgcmUubGFzdEluZGV4ID0gb2Zmc2V0IC0gMTtcclxuICAgICAgICB2YXIgbWF0Y2ggPSByZS5leGVjKHNvdXJjZSk7XHJcbiAgICAgICAgaWYgKCFtYXRjaClcclxuICAgICAgICAgICAgdGhyb3cgaWxsZWdhbChcInN0cmluZ1wiKTtcclxuICAgICAgICBvZmZzZXQgPSByZS5sYXN0SW5kZXg7XHJcbiAgICAgICAgcHVzaChzdHJpbmdEZWxpbSk7XHJcbiAgICAgICAgc3RyaW5nRGVsaW0gPSBudWxsO1xyXG4gICAgICAgIHJldHVybiB1bmVzY2FwZShtYXRjaFsxXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjaGFyYWN0ZXIgYXQgYHBvc2Agd2l0aGluIHRoZSBzb3VyY2UuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcG9zIFBvc2l0aW9uXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBDaGFyYWN0ZXJcclxuICAgICAqIEBpbm5lclxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjaGFyQXQocG9zKSB7XHJcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5jaGFyQXQocG9zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGN1cnJlbnQgY29tbWVudCB0ZXh0LlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFN0YXJ0IG9mZnNldFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGVuZCBFbmQgb2Zmc2V0XHJcbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gICAgICogQGlubmVyXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHNldENvbW1lbnQoc3RhcnQsIGVuZCkge1xyXG4gICAgICAgIGNvbW1lbnRUeXBlID0gc291cmNlLmNoYXJBdChzdGFydCsrKTtcclxuICAgICAgICBjb21tZW50TGluZSA9IGxpbmU7XHJcbiAgICAgICAgY29tbWVudExpbmVFbXB0eSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBsb29rYmFjaztcclxuICAgICAgICBpZiAoYWx0ZXJuYXRlQ29tbWVudE1vZGUpIHtcclxuICAgICAgICAgICAgbG9va2JhY2sgPSAyOyAgLy8gYWx0ZXJuYXRlIGNvbW1lbnQgcGFyc2luZzogXCIvL1wiIG9yIFwiLypcIlxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxvb2tiYWNrID0gMzsgIC8vIFwiLy8vXCIgb3IgXCIvKipcIlxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY29tbWVudE9mZnNldCA9IHN0YXJ0IC0gbG9va2JhY2ssXHJcbiAgICAgICAgICAgIGM7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBpZiAoLS1jb21tZW50T2Zmc2V0IDwgMCB8fFxyXG4gICAgICAgICAgICAgICAgICAgIChjID0gc291cmNlLmNoYXJBdChjb21tZW50T2Zmc2V0KSkgPT09IFwiXFxuXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbW1lbnRMaW5lRW1wdHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IHdoaWxlIChjID09PSBcIiBcIiB8fCBjID09PSBcIlxcdFwiKTtcclxuICAgICAgICB2YXIgbGluZXMgPSBzb3VyY2VcclxuICAgICAgICAgICAgLnN1YnN0cmluZyhzdGFydCwgZW5kKVxyXG4gICAgICAgICAgICAuc3BsaXQoc2V0Q29tbWVudFNwbGl0UmUpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgIGxpbmVzW2ldID0gbGluZXNbaV1cclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKGFsdGVybmF0ZUNvbW1lbnRNb2RlID8gc2V0Q29tbWVudEFsdFJlIDogc2V0Q29tbWVudFJlLCBcIlwiKVxyXG4gICAgICAgICAgICAgICAgLnRyaW0oKTtcclxuICAgICAgICBjb21tZW50VGV4dCA9IGxpbmVzXHJcbiAgICAgICAgICAgIC5qb2luKFwiXFxuXCIpXHJcbiAgICAgICAgICAgIC50cmltKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNEb3VibGVTbGFzaENvbW1lbnRMaW5lKHN0YXJ0T2Zmc2V0KSB7XHJcbiAgICAgICAgdmFyIGVuZE9mZnNldCA9IGZpbmRFbmRPZkxpbmUoc3RhcnRPZmZzZXQpO1xyXG5cclxuICAgICAgICAvLyBzZWUgaWYgcmVtYWluaW5nIGxpbmUgbWF0Y2hlcyBjb21tZW50IHBhdHRlcm5cclxuICAgICAgICB2YXIgbGluZVRleHQgPSBzb3VyY2Uuc3Vic3RyaW5nKHN0YXJ0T2Zmc2V0LCBlbmRPZmZzZXQpO1xyXG4gICAgICAgIC8vIGxvb2sgZm9yIDEgb3IgMiBzbGFzaGVzIHNpbmNlIHN0YXJ0T2Zmc2V0IHdvdWxkIGFscmVhZHkgcG9pbnQgcGFzdFxyXG4gICAgICAgIC8vIHRoZSBmaXJzdCBzbGFzaCB0aGF0IHN0YXJ0ZWQgdGhlIGNvbW1lbnQuXHJcbiAgICAgICAgdmFyIGlzQ29tbWVudCA9IC9eXFxzKlxcL3sxLDJ9Ly50ZXN0KGxpbmVUZXh0KTtcclxuICAgICAgICByZXR1cm4gaXNDb21tZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGZpbmRFbmRPZkxpbmUoY3Vyc29yKSB7XHJcbiAgICAgICAgLy8gZmluZCBlbmQgb2YgY3Vyc29yJ3MgbGluZVxyXG4gICAgICAgIHZhciBlbmRPZmZzZXQgPSBjdXJzb3I7XHJcbiAgICAgICAgd2hpbGUgKGVuZE9mZnNldCA8IGxlbmd0aCAmJiBjaGFyQXQoZW5kT2Zmc2V0KSAhPT0gXCJcXG5cIikge1xyXG4gICAgICAgICAgICBlbmRPZmZzZXQrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVuZE9mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9idGFpbnMgdGhlIG5leHQgdG9rZW4uXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IE5leHQgdG9rZW4gb3IgYG51bGxgIG9uIGVvZlxyXG4gICAgICogQGlubmVyXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICAgICAgaWYgKHN0YWNrLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgIHJldHVybiBzdGFjay5zaGlmdCgpO1xyXG4gICAgICAgIGlmIChzdHJpbmdEZWxpbSlcclxuICAgICAgICAgICAgcmV0dXJuIHJlYWRTdHJpbmcoKTtcclxuICAgICAgICB2YXIgcmVwZWF0LFxyXG4gICAgICAgICAgICBwcmV2LFxyXG4gICAgICAgICAgICBjdXJyLFxyXG4gICAgICAgICAgICBzdGFydCxcclxuICAgICAgICAgICAgaXNEb2M7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBpZiAob2Zmc2V0ID09PSBsZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgcmVwZWF0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHdoaWxlICh3aGl0ZXNwYWNlUmUudGVzdChjdXJyID0gY2hhckF0KG9mZnNldCkpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VyciA9PT0gXCJcXG5cIilcclxuICAgICAgICAgICAgICAgICAgICArK2xpbmU7XHJcbiAgICAgICAgICAgICAgICBpZiAoKytvZmZzZXQgPT09IGxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNoYXJBdChvZmZzZXQpID09PSBcIi9cIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKCsrb2Zmc2V0ID09PSBsZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBpbGxlZ2FsKFwiY29tbWVudFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjaGFyQXQob2Zmc2V0KSA9PT0gXCIvXCIpIHsgLy8gTGluZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYWx0ZXJuYXRlQ29tbWVudE1vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgZm9yIHRyaXBsZS1zbGFzaCBjb21tZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRG9jID0gY2hhckF0KHN0YXJ0ID0gb2Zmc2V0ICsgMSkgPT09IFwiL1wiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGNoYXJBdCgrK29mZnNldCkgIT09IFwiXFxuXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPT09IGxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsrb2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNEb2MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldENvbW1lbnQoc3RhcnQsIG9mZnNldCAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsrbGluZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwZWF0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBmb3IgZG91YmxlLXNsYXNoIGNvbW1lbnRzLCBjb25zb2xpZGF0aW5nIGNvbnNlY3V0aXZlIGxpbmVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gb2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0RvYyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNEb3VibGVTbGFzaENvbW1lbnRMaW5lKG9mZnNldCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRG9jID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBmaW5kRW5kT2ZMaW5lKG9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9mZnNldCA9PT0gbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKGlzRG91YmxlU2xhc2hDb21tZW50TGluZShvZmZzZXQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IE1hdGgubWluKGxlbmd0aCwgZmluZEVuZE9mTGluZShvZmZzZXQpICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRG9jKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRDb21tZW50KHN0YXJ0LCBvZmZzZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwZWF0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKChjdXJyID0gY2hhckF0KG9mZnNldCkpID09PSBcIipcIikgeyAvKiBCbG9jayAqL1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGZvciAvKiogKHJlZ3VsYXIgY29tbWVudCBtb2RlKSBvciAvKiAoYWx0ZXJuYXRlIGNvbW1lbnQgbW9kZSlcclxuICAgICAgICAgICAgICAgICAgICBzdGFydCA9IG9mZnNldCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNEb2MgPSBhbHRlcm5hdGVDb21tZW50TW9kZSB8fCBjaGFyQXQoc3RhcnQpID09PSBcIipcIjtcclxuICAgICAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyID09PSBcIlxcblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArK2xpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCsrb2Zmc2V0ID09PSBsZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGlsbGVnYWwoXCJjb21tZW50XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXYgPSBjdXJyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyID0gY2hhckF0KG9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSB3aGlsZSAocHJldiAhPT0gXCIqXCIgfHwgY3VyciAhPT0gXCIvXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICsrb2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0RvYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRDb21tZW50KHN0YXJ0LCBvZmZzZXQgLSAyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwZWF0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiL1wiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSB3aGlsZSAocmVwZWF0KTtcclxuXHJcbiAgICAgICAgLy8gb2Zmc2V0ICE9PSBsZW5ndGggaWYgd2UgZ290IGhlcmVcclxuXHJcbiAgICAgICAgdmFyIGVuZCA9IG9mZnNldDtcclxuICAgICAgICBkZWxpbVJlLmxhc3RJbmRleCA9IDA7XHJcbiAgICAgICAgdmFyIGRlbGltID0gZGVsaW1SZS50ZXN0KGNoYXJBdChlbmQrKykpO1xyXG4gICAgICAgIGlmICghZGVsaW0pXHJcbiAgICAgICAgICAgIHdoaWxlIChlbmQgPCBsZW5ndGggJiYgIWRlbGltUmUudGVzdChjaGFyQXQoZW5kKSkpXHJcbiAgICAgICAgICAgICAgICArK2VuZDtcclxuICAgICAgICB2YXIgdG9rZW4gPSBzb3VyY2Uuc3Vic3RyaW5nKG9mZnNldCwgb2Zmc2V0ID0gZW5kKTtcclxuICAgICAgICBpZiAodG9rZW4gPT09IFwiXFxcIlwiIHx8IHRva2VuID09PSBcIidcIilcclxuICAgICAgICAgICAgc3RyaW5nRGVsaW0gPSB0b2tlbjtcclxuICAgICAgICByZXR1cm4gdG9rZW47XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQdXNoZXMgYSB0b2tlbiBiYWNrIHRvIHRoZSBzdGFjay5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0b2tlbiBUb2tlblxyXG4gICAgICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICAgICAqIEBpbm5lclxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBwdXNoKHRva2VuKSB7XHJcbiAgICAgICAgc3RhY2sucHVzaCh0b2tlbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQZWVrcyBmb3IgdGhlIG5leHQgdG9rZW4uXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IFRva2VuIG9yIGBudWxsYCBvbiBlb2ZcclxuICAgICAqIEBpbm5lclxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBwZWVrKCkge1xyXG4gICAgICAgIGlmICghc3RhY2subGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IG5leHQoKTtcclxuICAgICAgICAgICAgaWYgKHRva2VuID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIHB1c2godG9rZW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RhY2tbMF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTa2lwcyBhIHRva2VuLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV4cGVjdGVkIEV4cGVjdGVkIHRva2VuXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25hbD1mYWxzZV0gV2hldGhlciB0aGUgdG9rZW4gaXMgb3B0aW9uYWxcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgd2hlbiBza2lwcGVkLCBgZmFsc2VgIGlmIG5vdFxyXG4gICAgICogQHRocm93cyB7RXJyb3J9IFdoZW4gYSByZXF1aXJlZCB0b2tlbiBpcyBub3QgcHJlc2VudFxyXG4gICAgICogQGlubmVyXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHNraXAoZXhwZWN0ZWQsIG9wdGlvbmFsKSB7XHJcbiAgICAgICAgdmFyIGFjdHVhbCA9IHBlZWsoKSxcclxuICAgICAgICAgICAgZXF1YWxzID0gYWN0dWFsID09PSBleHBlY3RlZDtcclxuICAgICAgICBpZiAoZXF1YWxzKSB7XHJcbiAgICAgICAgICAgIG5leHQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghb3B0aW9uYWwpXHJcbiAgICAgICAgICAgIHRocm93IGlsbGVnYWwoXCJ0b2tlbiAnXCIgKyBhY3R1YWwgKyBcIicsICdcIiArIGV4cGVjdGVkICsgXCInIGV4cGVjdGVkXCIpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgYSBjb21tZW50LlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFt0cmFpbGluZ0xpbmVdIExpbmUgbnVtYmVyIGlmIGxvb2tpbmcgZm9yIGEgdHJhaWxpbmcgY29tbWVudFxyXG4gICAgICogQHJldHVybnMge3N0cmluZ3xudWxsfSBDb21tZW50IHRleHRcclxuICAgICAqIEBpbm5lclxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjbW50KHRyYWlsaW5nTGluZSkge1xyXG4gICAgICAgIHZhciByZXQgPSBudWxsO1xyXG4gICAgICAgIGlmICh0cmFpbGluZ0xpbmUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAoY29tbWVudExpbmUgPT09IGxpbmUgLSAxICYmIChhbHRlcm5hdGVDb21tZW50TW9kZSB8fCBjb21tZW50VHlwZSA9PT0gXCIqXCIgfHwgY29tbWVudExpbmVFbXB0eSkpIHtcclxuICAgICAgICAgICAgICAgIHJldCA9IGNvbW1lbnRUZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cclxuICAgICAgICAgICAgaWYgKGNvbW1lbnRMaW5lIDwgdHJhaWxpbmdMaW5lKSB7XHJcbiAgICAgICAgICAgICAgICBwZWVrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbW1lbnRMaW5lID09PSB0cmFpbGluZ0xpbmUgJiYgIWNvbW1lbnRMaW5lRW1wdHkgJiYgKGFsdGVybmF0ZUNvbW1lbnRNb2RlIHx8IGNvbW1lbnRUeXBlID09PSBcIi9cIikpIHtcclxuICAgICAgICAgICAgICAgIHJldCA9IGNvbW1lbnRUZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7XHJcbiAgICAgICAgbmV4dDogbmV4dCxcclxuICAgICAgICBwZWVrOiBwZWVrLFxyXG4gICAgICAgIHB1c2g6IHB1c2gsXHJcbiAgICAgICAgc2tpcDogc2tpcCxcclxuICAgICAgICBjbW50OiBjbW50XHJcbiAgICB9LCBcImxpbmVcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBsaW5lOyB9XHJcbiAgICB9KTtcclxuICAgIC8qIGVzbGludC1lbmFibGUgY2FsbGJhY2stcmV0dXJuICovXHJcbn1cclxuXHJcbn0se31dLDM1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gVHlwZTtcclxuXHJcbi8vIGV4dGVuZHMgTmFtZXNwYWNlXHJcbnZhciBOYW1lc3BhY2UgPSByZXF1aXJlKDIzKTtcclxuKChUeXBlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoTmFtZXNwYWNlLnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yID0gVHlwZSkuY2xhc3NOYW1lID0gXCJUeXBlXCI7XHJcblxyXG52YXIgRW51bSAgICAgID0gcmVxdWlyZSgxNSksXHJcbiAgICBPbmVPZiAgICAgPSByZXF1aXJlKDI1KSxcclxuICAgIEZpZWxkICAgICA9IHJlcXVpcmUoMTYpLFxyXG4gICAgTWFwRmllbGQgID0gcmVxdWlyZSgyMCksXHJcbiAgICBTZXJ2aWNlICAgPSByZXF1aXJlKDMzKSxcclxuICAgIE1lc3NhZ2UgICA9IHJlcXVpcmUoMjEpLFxyXG4gICAgUmVhZGVyICAgID0gcmVxdWlyZSgyNyksXHJcbiAgICBXcml0ZXIgICAgPSByZXF1aXJlKDQyKSxcclxuICAgIHV0aWwgICAgICA9IHJlcXVpcmUoMzcpLFxyXG4gICAgZW5jb2RlciAgID0gcmVxdWlyZSgxNCksXHJcbiAgICBkZWNvZGVyICAgPSByZXF1aXJlKDEzKSxcclxuICAgIHZlcmlmaWVyICA9IHJlcXVpcmUoNDApLFxyXG4gICAgY29udmVydGVyID0gcmVxdWlyZSgxMiksXHJcbiAgICB3cmFwcGVycyAgPSByZXF1aXJlKDQxKTtcclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHJlZmxlY3RlZCBtZXNzYWdlIHR5cGUgaW5zdGFuY2UuXHJcbiAqIEBjbGFzc2Rlc2MgUmVmbGVjdGVkIG1lc3NhZ2UgdHlwZS5cclxuICogQGV4dGVuZHMgTmFtZXNwYWNlQmFzZVxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgTWVzc2FnZSBuYW1lXHJcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IFtvcHRpb25zXSBEZWNsYXJlZCBvcHRpb25zXHJcbiAqL1xyXG5mdW5jdGlvbiBUeXBlKG5hbWUsIG9wdGlvbnMpIHtcclxuICAgIE5hbWVzcGFjZS5jYWxsKHRoaXMsIG5hbWUsIG9wdGlvbnMpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWVzc2FnZSBmaWVsZHMuXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0LjxzdHJpbmcsRmllbGQ+fVxyXG4gICAgICovXHJcbiAgICB0aGlzLmZpZWxkcyA9IHt9OyAgLy8gdG9KU09OLCBtYXJrZXJcclxuXHJcbiAgICAvKipcclxuICAgICAqIE9uZW9mcyBkZWNsYXJlZCB3aXRoaW4gdGhpcyBuYW1lc3BhY2UsIGlmIGFueS5cclxuICAgICAqIEB0eXBlIHtPYmplY3QuPHN0cmluZyxPbmVPZj59XHJcbiAgICAgKi9cclxuICAgIHRoaXMub25lb2ZzID0gdW5kZWZpbmVkOyAvLyB0b0pTT05cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4dGVuc2lvbiByYW5nZXMsIGlmIGFueS5cclxuICAgICAqIEB0eXBlIHtudW1iZXJbXVtdfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmV4dGVuc2lvbnMgPSB1bmRlZmluZWQ7IC8vIHRvSlNPTlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzZXJ2ZWQgcmFuZ2VzLCBpZiBhbnkuXHJcbiAgICAgKiBAdHlwZSB7QXJyYXkuPG51bWJlcltdfHN0cmluZz59XHJcbiAgICAgKi9cclxuICAgIHRoaXMucmVzZXJ2ZWQgPSB1bmRlZmluZWQ7IC8vIHRvSlNPTlxyXG5cclxuICAgIC8qP1xyXG4gICAgICogV2hldGhlciB0aGlzIHR5cGUgaXMgYSBsZWdhY3kgZ3JvdXAuXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbnx1bmRlZmluZWR9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZ3JvdXAgPSB1bmRlZmluZWQ7IC8vIHRvSlNPTlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FjaGVkIGZpZWxkcyBieSBpZC5cclxuICAgICAqIEB0eXBlIHtPYmplY3QuPG51bWJlcixGaWVsZD58bnVsbH1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHRoaXMuX2ZpZWxkc0J5SWQgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FjaGVkIGZpZWxkcyBhcyBhbiBhcnJheS5cclxuICAgICAqIEB0eXBlIHtGaWVsZFtdfG51bGx9XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICB0aGlzLl9maWVsZHNBcnJheSA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWNoZWQgb25lb2ZzIGFzIGFuIGFycmF5LlxyXG4gICAgICogQHR5cGUge09uZU9mW118bnVsbH1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHRoaXMuX29uZW9mc0FycmF5ID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhY2hlZCBjb25zdHJ1Y3Rvci5cclxuICAgICAqIEB0eXBlIHtDb25zdHJ1Y3Rvcjx7fT59XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICB0aGlzLl9jdG9yID0gbnVsbDtcclxufVxyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoVHlwZS5wcm90b3R5cGUsIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1lc3NhZ2UgZmllbGRzIGJ5IGlkLlxyXG4gICAgICogQG5hbWUgVHlwZSNmaWVsZHNCeUlkXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0LjxudW1iZXIsRmllbGQ+fVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIGZpZWxkc0J5SWQ6IHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9maWVsZHNCeUlkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZpZWxkc0J5SWQ7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9maWVsZHNCeUlkID0ge307XHJcbiAgICAgICAgICAgIGZvciAodmFyIG5hbWVzID0gT2JqZWN0LmtleXModGhpcy5maWVsZHMpLCBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmllbGQgPSB0aGlzLmZpZWxkc1tuYW1lc1tpXV0sXHJcbiAgICAgICAgICAgICAgICAgICAgaWQgPSBmaWVsZC5pZDtcclxuXHJcbiAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9maWVsZHNCeUlkW2lkXSlcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcImR1cGxpY2F0ZSBpZCBcIiArIGlkICsgXCIgaW4gXCIgKyB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9maWVsZHNCeUlkW2lkXSA9IGZpZWxkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9maWVsZHNCeUlkO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaWVsZHMgb2YgdGhpcyBtZXNzYWdlIGFzIGFuIGFycmF5IGZvciBpdGVyYXRpb24uXHJcbiAgICAgKiBAbmFtZSBUeXBlI2ZpZWxkc0FycmF5XHJcbiAgICAgKiBAdHlwZSB7RmllbGRbXX1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBmaWVsZHNBcnJheToge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9maWVsZHNBcnJheSB8fCAodGhpcy5fZmllbGRzQXJyYXkgPSB1dGlsLnRvQXJyYXkodGhpcy5maWVsZHMpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT25lb2ZzIG9mIHRoaXMgbWVzc2FnZSBhcyBhbiBhcnJheSBmb3IgaXRlcmF0aW9uLlxyXG4gICAgICogQG5hbWUgVHlwZSNvbmVvZnNBcnJheVxyXG4gICAgICogQHR5cGUge09uZU9mW119XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgb25lb2ZzQXJyYXk6IHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fb25lb2ZzQXJyYXkgfHwgKHRoaXMuX29uZW9mc0FycmF5ID0gdXRpbC50b0FycmF5KHRoaXMub25lb2ZzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSByZWdpc3RlcmVkIGNvbnN0cnVjdG9yLCBpZiBhbnkgcmVnaXN0ZXJlZCwgb3RoZXJ3aXNlIGEgZ2VuZXJpYyBjb25zdHJ1Y3Rvci5cclxuICAgICAqIEFzc2lnbmluZyBhIGZ1bmN0aW9uIHJlcGxhY2VzIHRoZSBpbnRlcm5hbCBjb25zdHJ1Y3Rvci4gSWYgdGhlIGZ1bmN0aW9uIGRvZXMgbm90IGV4dGVuZCB7QGxpbmsgTWVzc2FnZX0geWV0LCBpdHMgcHJvdG90eXBlIHdpbGwgYmUgc2V0dXAgYWNjb3JkaW5nbHkgYW5kIHN0YXRpYyBtZXRob2RzIHdpbGwgYmUgcG9wdWxhdGVkLiBJZiBpdCBhbHJlYWR5IGV4dGVuZHMge0BsaW5rIE1lc3NhZ2V9LCBpdCB3aWxsIGp1c3QgcmVwbGFjZSB0aGUgaW50ZXJuYWwgY29uc3RydWN0b3IuXHJcbiAgICAgKiBAbmFtZSBUeXBlI2N0b3JcclxuICAgICAqIEB0eXBlIHtDb25zdHJ1Y3Rvcjx7fT59XHJcbiAgICAgKi9cclxuICAgIGN0b3I6IHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3RvciB8fCAodGhpcy5jdG9yID0gVHlwZS5nZW5lcmF0ZUNvbnN0cnVjdG9yKHRoaXMpKCkpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbihjdG9yKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBFbnN1cmUgcHJvcGVyIHByb3RvdHlwZVxyXG4gICAgICAgICAgICB2YXIgcHJvdG90eXBlID0gY3Rvci5wcm90b3R5cGU7XHJcbiAgICAgICAgICAgIGlmICghKHByb3RvdHlwZSBpbnN0YW5jZW9mIE1lc3NhZ2UpKSB7XHJcbiAgICAgICAgICAgICAgICAoY3Rvci5wcm90b3R5cGUgPSBuZXcgTWVzc2FnZSgpKS5jb25zdHJ1Y3RvciA9IGN0b3I7XHJcbiAgICAgICAgICAgICAgICB1dGlsLm1lcmdlKGN0b3IucHJvdG90eXBlLCBwcm90b3R5cGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDbGFzc2VzIGFuZCBtZXNzYWdlcyByZWZlcmVuY2UgdGhlaXIgcmVmbGVjdGVkIHR5cGVcclxuICAgICAgICAgICAgY3Rvci4kdHlwZSA9IGN0b3IucHJvdG90eXBlLiR0eXBlID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIE1peCBpbiBzdGF0aWMgbWV0aG9kc1xyXG4gICAgICAgICAgICB1dGlsLm1lcmdlKGN0b3IsIE1lc3NhZ2UsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fY3RvciA9IGN0b3I7XHJcblxyXG4gICAgICAgICAgICAvLyBNZXNzYWdlcyBoYXZlIG5vbi1lbnVtZXJhYmxlIGRlZmF1bHQgdmFsdWVzIG9uIHRoZWlyIHByb3RvdHlwZVxyXG4gICAgICAgICAgICB2YXIgaSA9IDA7XHJcbiAgICAgICAgICAgIGZvciAoOyBpIDwgLyogaW5pdGlhbGl6ZXMgKi8gdGhpcy5maWVsZHNBcnJheS5sZW5ndGg7ICsraSlcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpZWxkc0FycmF5W2ldLnJlc29sdmUoKTsgLy8gZW5zdXJlcyBhIHByb3BlciB2YWx1ZVxyXG5cclxuICAgICAgICAgICAgLy8gTWVzc2FnZXMgaGF2ZSBub24tZW51bWVyYWJsZSBnZXR0ZXJzIGFuZCBzZXR0ZXJzIGZvciBlYWNoIHZpcnR1YWwgb25lb2YgZmllbGRcclxuICAgICAgICAgICAgdmFyIGN0b3JQcm9wZXJ0aWVzID0ge307XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCAvKiBpbml0aWFsaXplcyAqLyB0aGlzLm9uZW9mc0FycmF5Lmxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgICAgICAgY3RvclByb3BlcnRpZXNbdGhpcy5fb25lb2ZzQXJyYXlbaV0ucmVzb2x2ZSgpLm5hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGdldDogdXRpbC5vbmVPZkdldHRlcih0aGlzLl9vbmVvZnNBcnJheVtpXS5vbmVvZiksXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0OiB1dGlsLm9uZU9mU2V0dGVyKHRoaXMuX29uZW9mc0FycmF5W2ldLm9uZW9mKVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKGkpXHJcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhjdG9yLnByb3RvdHlwZSwgY3RvclByb3BlcnRpZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICogR2VuZXJhdGVzIGEgY29uc3RydWN0b3IgZnVuY3Rpb24gZm9yIHRoZSBzcGVjaWZpZWQgdHlwZS5cclxuICogQHBhcmFtIHtUeXBlfSBtdHlwZSBNZXNzYWdlIHR5cGVcclxuICogQHJldHVybnMge0NvZGVnZW59IENvZGVnZW4gaW5zdGFuY2VcclxuICovXHJcblR5cGUuZ2VuZXJhdGVDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIGdlbmVyYXRlQ29uc3RydWN0b3IobXR5cGUpIHtcclxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZXhwZWN0ZWQtbXVsdGlsaW5lICovXHJcbiAgICB2YXIgZ2VuID0gdXRpbC5jb2RlZ2VuKFtcInBcIl0sIG10eXBlLm5hbWUpO1xyXG4gICAgLy8gZXhwbGljaXRseSBpbml0aWFsaXplIG11dGFibGUgb2JqZWN0L2FycmF5IGZpZWxkcyBzbyB0aGF0IHRoZXNlIGFyZW4ndCBqdXN0IGluaGVyaXRlZCBmcm9tIHRoZSBwcm90b3R5cGVcclxuICAgIGZvciAodmFyIGkgPSAwLCBmaWVsZDsgaSA8IG10eXBlLmZpZWxkc0FycmF5Lmxlbmd0aDsgKytpKVxyXG4gICAgICAgIGlmICgoZmllbGQgPSBtdHlwZS5fZmllbGRzQXJyYXlbaV0pLm1hcCkgZ2VuXHJcbiAgICAgICAgICAgIChcInRoaXMlcz17fVwiLCB1dGlsLnNhZmVQcm9wKGZpZWxkLm5hbWUpKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZC5yZXBlYXRlZCkgZ2VuXHJcbiAgICAgICAgICAgIChcInRoaXMlcz1bXVwiLCB1dGlsLnNhZmVQcm9wKGZpZWxkLm5hbWUpKTtcclxuICAgIHJldHVybiBnZW5cclxuICAgIChcImlmKHApZm9yKHZhciBrcz1PYmplY3Qua2V5cyhwKSxpPTA7aTxrcy5sZW5ndGg7KytpKWlmKHBba3NbaV1dIT1udWxsKVwiKSAvLyBvbWl0IHVuZGVmaW5lZCBvciBudWxsXHJcbiAgICAgICAgKFwidGhpc1trc1tpXV09cFtrc1tpXV1cIik7XHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXVuZXhwZWN0ZWQtbXVsdGlsaW5lICovXHJcbn07XHJcblxyXG5mdW5jdGlvbiBjbGVhckNhY2hlKHR5cGUpIHtcclxuICAgIHR5cGUuX2ZpZWxkc0J5SWQgPSB0eXBlLl9maWVsZHNBcnJheSA9IHR5cGUuX29uZW9mc0FycmF5ID0gbnVsbDtcclxuICAgIGRlbGV0ZSB0eXBlLmVuY29kZTtcclxuICAgIGRlbGV0ZSB0eXBlLmRlY29kZTtcclxuICAgIGRlbGV0ZSB0eXBlLnZlcmlmeTtcclxuICAgIHJldHVybiB0eXBlO1xyXG59XHJcblxyXG4vKipcclxuICogTWVzc2FnZSB0eXBlIGRlc2NyaXB0b3IuXHJcbiAqIEBpbnRlcmZhY2UgSVR5cGVcclxuICogQGV4dGVuZHMgSU5hbWVzcGFjZVxyXG4gKiBAcHJvcGVydHkge09iamVjdC48c3RyaW5nLElPbmVPZj59IFtvbmVvZnNdIE9uZW9mIGRlc2NyaXB0b3JzXHJcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0LjxzdHJpbmcsSUZpZWxkPn0gZmllbGRzIEZpZWxkIGRlc2NyaXB0b3JzXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyW11bXX0gW2V4dGVuc2lvbnNdIEV4dGVuc2lvbiByYW5nZXNcclxuICogQHByb3BlcnR5IHtudW1iZXJbXVtdfSBbcmVzZXJ2ZWRdIFJlc2VydmVkIHJhbmdlc1xyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtncm91cD1mYWxzZV0gV2hldGhlciBhIGxlZ2FjeSBncm91cCBvciBub3RcclxuICovXHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIG1lc3NhZ2UgdHlwZSBmcm9tIGEgbWVzc2FnZSB0eXBlIGRlc2NyaXB0b3IuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIE1lc3NhZ2UgbmFtZVxyXG4gKiBAcGFyYW0ge0lUeXBlfSBqc29uIE1lc3NhZ2UgdHlwZSBkZXNjcmlwdG9yXHJcbiAqIEByZXR1cm5zIHtUeXBlfSBDcmVhdGVkIG1lc3NhZ2UgdHlwZVxyXG4gKi9cclxuVHlwZS5mcm9tSlNPTiA9IGZ1bmN0aW9uIGZyb21KU09OKG5hbWUsIGpzb24pIHtcclxuICAgIHZhciB0eXBlID0gbmV3IFR5cGUobmFtZSwganNvbi5vcHRpb25zKTtcclxuICAgIHR5cGUuZXh0ZW5zaW9ucyA9IGpzb24uZXh0ZW5zaW9ucztcclxuICAgIHR5cGUucmVzZXJ2ZWQgPSBqc29uLnJlc2VydmVkO1xyXG4gICAgdmFyIG5hbWVzID0gT2JqZWN0LmtleXMoanNvbi5maWVsZHMpLFxyXG4gICAgICAgIGkgPSAwO1xyXG4gICAgZm9yICg7IGkgPCBuYW1lcy5sZW5ndGg7ICsraSlcclxuICAgICAgICB0eXBlLmFkZChcclxuICAgICAgICAgICAgKCB0eXBlb2YganNvbi5maWVsZHNbbmFtZXNbaV1dLmtleVR5cGUgIT09IFwidW5kZWZpbmVkXCJcclxuICAgICAgICAgICAgPyBNYXBGaWVsZC5mcm9tSlNPTlxyXG4gICAgICAgICAgICA6IEZpZWxkLmZyb21KU09OICkobmFtZXNbaV0sIGpzb24uZmllbGRzW25hbWVzW2ldXSlcclxuICAgICAgICApO1xyXG4gICAgaWYgKGpzb24ub25lb2ZzKVxyXG4gICAgICAgIGZvciAobmFtZXMgPSBPYmplY3Qua2V5cyhqc29uLm9uZW9mcyksIGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgIHR5cGUuYWRkKE9uZU9mLmZyb21KU09OKG5hbWVzW2ldLCBqc29uLm9uZW9mc1tuYW1lc1tpXV0pKTtcclxuICAgIGlmIChqc29uLm5lc3RlZClcclxuICAgICAgICBmb3IgKG5hbWVzID0gT2JqZWN0LmtleXMoanNvbi5uZXN0ZWQpLCBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHZhciBuZXN0ZWQgPSBqc29uLm5lc3RlZFtuYW1lc1tpXV07XHJcbiAgICAgICAgICAgIHR5cGUuYWRkKCAvLyBtb3N0IHRvIGxlYXN0IGxpa2VseVxyXG4gICAgICAgICAgICAgICAgKCBuZXN0ZWQuaWQgIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgPyBGaWVsZC5mcm9tSlNPTlxyXG4gICAgICAgICAgICAgICAgOiBuZXN0ZWQuZmllbGRzICE9PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgID8gVHlwZS5mcm9tSlNPTlxyXG4gICAgICAgICAgICAgICAgOiBuZXN0ZWQudmFsdWVzICE9PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgID8gRW51bS5mcm9tSlNPTlxyXG4gICAgICAgICAgICAgICAgOiBuZXN0ZWQubWV0aG9kcyAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICA/IFNlcnZpY2UuZnJvbUpTT05cclxuICAgICAgICAgICAgICAgIDogTmFtZXNwYWNlLmZyb21KU09OICkobmFtZXNbaV0sIG5lc3RlZClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICBpZiAoanNvbi5leHRlbnNpb25zICYmIGpzb24uZXh0ZW5zaW9ucy5sZW5ndGgpXHJcbiAgICAgICAgdHlwZS5leHRlbnNpb25zID0ganNvbi5leHRlbnNpb25zO1xyXG4gICAgaWYgKGpzb24ucmVzZXJ2ZWQgJiYganNvbi5yZXNlcnZlZC5sZW5ndGgpXHJcbiAgICAgICAgdHlwZS5yZXNlcnZlZCA9IGpzb24ucmVzZXJ2ZWQ7XHJcbiAgICBpZiAoanNvbi5ncm91cClcclxuICAgICAgICB0eXBlLmdyb3VwID0gdHJ1ZTtcclxuICAgIGlmIChqc29uLmNvbW1lbnQpXHJcbiAgICAgICAgdHlwZS5jb21tZW50ID0ganNvbi5jb21tZW50O1xyXG4gICAgcmV0dXJuIHR5cGU7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhpcyBtZXNzYWdlIHR5cGUgdG8gYSBtZXNzYWdlIHR5cGUgZGVzY3JpcHRvci5cclxuICogQHBhcmFtIHtJVG9KU09OT3B0aW9uc30gW3RvSlNPTk9wdGlvbnNdIEpTT04gY29udmVyc2lvbiBvcHRpb25zXHJcbiAqIEByZXR1cm5zIHtJVHlwZX0gTWVzc2FnZSB0eXBlIGRlc2NyaXB0b3JcclxuICovXHJcblR5cGUucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTih0b0pTT05PcHRpb25zKSB7XHJcbiAgICB2YXIgaW5oZXJpdGVkID0gTmFtZXNwYWNlLnByb3RvdHlwZS50b0pTT04uY2FsbCh0aGlzLCB0b0pTT05PcHRpb25zKTtcclxuICAgIHZhciBrZWVwQ29tbWVudHMgPSB0b0pTT05PcHRpb25zID8gQm9vbGVhbih0b0pTT05PcHRpb25zLmtlZXBDb21tZW50cykgOiBmYWxzZTtcclxuICAgIHJldHVybiB1dGlsLnRvT2JqZWN0KFtcclxuICAgICAgICBcIm9wdGlvbnNcIiAgICAsIGluaGVyaXRlZCAmJiBpbmhlcml0ZWQub3B0aW9ucyB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgXCJvbmVvZnNcIiAgICAgLCBOYW1lc3BhY2UuYXJyYXlUb0pTT04odGhpcy5vbmVvZnNBcnJheSwgdG9KU09OT3B0aW9ucyksXHJcbiAgICAgICAgXCJmaWVsZHNcIiAgICAgLCBOYW1lc3BhY2UuYXJyYXlUb0pTT04odGhpcy5maWVsZHNBcnJheS5maWx0ZXIoZnVuY3Rpb24ob2JqKSB7IHJldHVybiAhb2JqLmRlY2xhcmluZ0ZpZWxkOyB9KSwgdG9KU09OT3B0aW9ucykgfHwge30sXHJcbiAgICAgICAgXCJleHRlbnNpb25zXCIgLCB0aGlzLmV4dGVuc2lvbnMgJiYgdGhpcy5leHRlbnNpb25zLmxlbmd0aCA/IHRoaXMuZXh0ZW5zaW9ucyA6IHVuZGVmaW5lZCxcclxuICAgICAgICBcInJlc2VydmVkXCIgICAsIHRoaXMucmVzZXJ2ZWQgJiYgdGhpcy5yZXNlcnZlZC5sZW5ndGggPyB0aGlzLnJlc2VydmVkIDogdW5kZWZpbmVkLFxyXG4gICAgICAgIFwiZ3JvdXBcIiAgICAgICwgdGhpcy5ncm91cCB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgXCJuZXN0ZWRcIiAgICAgLCBpbmhlcml0ZWQgJiYgaW5oZXJpdGVkLm5lc3RlZCB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgXCJjb21tZW50XCIgICAgLCBrZWVwQ29tbWVudHMgPyB0aGlzLmNvbW1lbnQgOiB1bmRlZmluZWRcclxuICAgIF0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBvdmVycmlkZVxyXG4gKi9cclxuVHlwZS5wcm90b3R5cGUucmVzb2x2ZUFsbCA9IGZ1bmN0aW9uIHJlc29sdmVBbGwoKSB7XHJcbiAgICB2YXIgZmllbGRzID0gdGhpcy5maWVsZHNBcnJheSwgaSA9IDA7XHJcbiAgICB3aGlsZSAoaSA8IGZpZWxkcy5sZW5ndGgpXHJcbiAgICAgICAgZmllbGRzW2krK10ucmVzb2x2ZSgpO1xyXG4gICAgdmFyIG9uZW9mcyA9IHRoaXMub25lb2ZzQXJyYXk7IGkgPSAwO1xyXG4gICAgd2hpbGUgKGkgPCBvbmVvZnMubGVuZ3RoKVxyXG4gICAgICAgIG9uZW9mc1tpKytdLnJlc29sdmUoKTtcclxuICAgIHJldHVybiBOYW1lc3BhY2UucHJvdG90eXBlLnJlc29sdmVBbGwuY2FsbCh0aGlzKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAb3ZlcnJpZGVcclxuICovXHJcblR5cGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldChuYW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maWVsZHNbbmFtZV1cclxuICAgICAgICB8fCB0aGlzLm9uZW9mcyAmJiB0aGlzLm9uZW9mc1tuYW1lXVxyXG4gICAgICAgIHx8IHRoaXMubmVzdGVkICYmIHRoaXMubmVzdGVkW25hbWVdXHJcbiAgICAgICAgfHwgbnVsbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGRzIGEgbmVzdGVkIG9iamVjdCB0byB0aGlzIHR5cGUuXHJcbiAqIEBwYXJhbSB7UmVmbGVjdGlvbk9iamVjdH0gb2JqZWN0IE5lc3RlZCBvYmplY3QgdG8gYWRkXHJcbiAqIEByZXR1cm5zIHtUeXBlfSBgdGhpc2BcclxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBhcmd1bWVudHMgYXJlIGludmFsaWRcclxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZXJlIGlzIGFscmVhZHkgYSBuZXN0ZWQgb2JqZWN0IHdpdGggdGhpcyBuYW1lIG9yLCBpZiBhIGZpZWxkLCB3aGVuIHRoZXJlIGlzIGFscmVhZHkgYSBmaWVsZCB3aXRoIHRoaXMgaWRcclxuICovXHJcblR5cGUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZChvYmplY3QpIHtcclxuXHJcbiAgICBpZiAodGhpcy5nZXQob2JqZWN0Lm5hbWUpKVxyXG4gICAgICAgIHRocm93IEVycm9yKFwiZHVwbGljYXRlIG5hbWUgJ1wiICsgb2JqZWN0Lm5hbWUgKyBcIicgaW4gXCIgKyB0aGlzKTtcclxuXHJcbiAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgRmllbGQgJiYgb2JqZWN0LmV4dGVuZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgLy8gTk9URTogRXh0ZW5zaW9uIGZpZWxkcyBhcmVuJ3QgYWN0dWFsIGZpZWxkcyBvbiB0aGUgZGVjbGFyaW5nIHR5cGUsIGJ1dCBuZXN0ZWQgb2JqZWN0cy5cclxuICAgICAgICAvLyBUaGUgcm9vdCBvYmplY3QgdGFrZXMgY2FyZSBvZiBhZGRpbmcgZGlzdGluY3Qgc2lzdGVyLWZpZWxkcyB0byB0aGUgcmVzcGVjdGl2ZSBleHRlbmRlZFxyXG4gICAgICAgIC8vIHR5cGUgaW5zdGVhZC5cclxuXHJcbiAgICAgICAgLy8gYXZvaWRzIGNhbGxpbmcgdGhlIGdldHRlciBpZiBub3QgYWJzb2x1dGVseSBuZWNlc3NhcnkgYmVjYXVzZSBpdCdzIGNhbGxlZCBxdWl0ZSBmcmVxdWVudGx5XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZpZWxkc0J5SWQgPyAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyB0aGlzLl9maWVsZHNCeUlkW29iamVjdC5pZF0gOiB0aGlzLmZpZWxkc0J5SWRbb2JqZWN0LmlkXSlcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJkdXBsaWNhdGUgaWQgXCIgKyBvYmplY3QuaWQgKyBcIiBpbiBcIiArIHRoaXMpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzUmVzZXJ2ZWRJZChvYmplY3QuaWQpKVxyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcImlkIFwiICsgb2JqZWN0LmlkICsgXCIgaXMgcmVzZXJ2ZWQgaW4gXCIgKyB0aGlzKTtcclxuICAgICAgICBpZiAodGhpcy5pc1Jlc2VydmVkTmFtZShvYmplY3QubmFtZSkpXHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwibmFtZSAnXCIgKyBvYmplY3QubmFtZSArIFwiJyBpcyByZXNlcnZlZCBpbiBcIiArIHRoaXMpO1xyXG5cclxuICAgICAgICBpZiAob2JqZWN0LnBhcmVudClcclxuICAgICAgICAgICAgb2JqZWN0LnBhcmVudC5yZW1vdmUob2JqZWN0KTtcclxuICAgICAgICB0aGlzLmZpZWxkc1tvYmplY3QubmFtZV0gPSBvYmplY3Q7XHJcbiAgICAgICAgb2JqZWN0Lm1lc3NhZ2UgPSB0aGlzO1xyXG4gICAgICAgIG9iamVjdC5vbkFkZCh0aGlzKTtcclxuICAgICAgICByZXR1cm4gY2xlYXJDYWNoZSh0aGlzKTtcclxuICAgIH1cclxuICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBPbmVPZikge1xyXG4gICAgICAgIGlmICghdGhpcy5vbmVvZnMpXHJcbiAgICAgICAgICAgIHRoaXMub25lb2ZzID0ge307XHJcbiAgICAgICAgdGhpcy5vbmVvZnNbb2JqZWN0Lm5hbWVdID0gb2JqZWN0O1xyXG4gICAgICAgIG9iamVjdC5vbkFkZCh0aGlzKTtcclxuICAgICAgICByZXR1cm4gY2xlYXJDYWNoZSh0aGlzKTtcclxuICAgIH1cclxuICAgIHJldHVybiBOYW1lc3BhY2UucHJvdG90eXBlLmFkZC5jYWxsKHRoaXMsIG9iamVjdCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBhIG5lc3RlZCBvYmplY3QgZnJvbSB0aGlzIHR5cGUuXHJcbiAqIEBwYXJhbSB7UmVmbGVjdGlvbk9iamVjdH0gb2JqZWN0IE5lc3RlZCBvYmplY3QgdG8gcmVtb3ZlXHJcbiAqIEByZXR1cm5zIHtUeXBlfSBgdGhpc2BcclxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBhcmd1bWVudHMgYXJlIGludmFsaWRcclxuICogQHRocm93cyB7RXJyb3J9IElmIGBvYmplY3RgIGlzIG5vdCBhIG1lbWJlciBvZiB0aGlzIHR5cGVcclxuICovXHJcblR5cGUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZShvYmplY3QpIHtcclxuICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBGaWVsZCAmJiBvYmplY3QuZXh0ZW5kID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAvLyBTZWUgVHlwZSNhZGQgZm9yIHRoZSByZWFzb24gd2h5IGV4dGVuc2lvbiBmaWVsZHMgYXJlIGV4Y2x1ZGVkIGhlcmUuXHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmICghdGhpcy5maWVsZHMgfHwgdGhpcy5maWVsZHNbb2JqZWN0Lm5hbWVdICE9PSBvYmplY3QpXHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKG9iamVjdCArIFwiIGlzIG5vdCBhIG1lbWJlciBvZiBcIiArIHRoaXMpO1xyXG5cclxuICAgICAgICBkZWxldGUgdGhpcy5maWVsZHNbb2JqZWN0Lm5hbWVdO1xyXG4gICAgICAgIG9iamVjdC5wYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIG9iamVjdC5vblJlbW92ZSh0aGlzKTtcclxuICAgICAgICByZXR1cm4gY2xlYXJDYWNoZSh0aGlzKTtcclxuICAgIH1cclxuICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBPbmVPZikge1xyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICBpZiAoIXRoaXMub25lb2ZzIHx8IHRoaXMub25lb2ZzW29iamVjdC5uYW1lXSAhPT0gb2JqZWN0KVxyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihvYmplY3QgKyBcIiBpcyBub3QgYSBtZW1iZXIgb2YgXCIgKyB0aGlzKTtcclxuXHJcbiAgICAgICAgZGVsZXRlIHRoaXMub25lb2ZzW29iamVjdC5uYW1lXTtcclxuICAgICAgICBvYmplY3QucGFyZW50ID0gbnVsbDtcclxuICAgICAgICBvYmplY3Qub25SZW1vdmUodGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIGNsZWFyQ2FjaGUodGhpcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gTmFtZXNwYWNlLnByb3RvdHlwZS5yZW1vdmUuY2FsbCh0aGlzLCBvYmplY3QpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoZSBzcGVjaWZpZWQgaWQgaXMgcmVzZXJ2ZWQuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpZCBJZCB0byB0ZXN0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgcmVzZXJ2ZWQsIG90aGVyd2lzZSBgZmFsc2VgXHJcbiAqL1xyXG5UeXBlLnByb3RvdHlwZS5pc1Jlc2VydmVkSWQgPSBmdW5jdGlvbiBpc1Jlc2VydmVkSWQoaWQpIHtcclxuICAgIHJldHVybiBOYW1lc3BhY2UuaXNSZXNlcnZlZElkKHRoaXMucmVzZXJ2ZWQsIGlkKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGUgc3BlY2lmaWVkIG5hbWUgaXMgcmVzZXJ2ZWQuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIE5hbWUgdG8gdGVzdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHJlc2VydmVkLCBvdGhlcndpc2UgYGZhbHNlYFxyXG4gKi9cclxuVHlwZS5wcm90b3R5cGUuaXNSZXNlcnZlZE5hbWUgPSBmdW5jdGlvbiBpc1Jlc2VydmVkTmFtZShuYW1lKSB7XHJcbiAgICByZXR1cm4gTmFtZXNwYWNlLmlzUmVzZXJ2ZWROYW1lKHRoaXMucmVzZXJ2ZWQsIG5hbWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcgbWVzc2FnZSBvZiB0aGlzIHR5cGUgdXNpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxyXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcclxuICogQHJldHVybnMge01lc3NhZ2U8e30+fSBNZXNzYWdlIGluc3RhbmNlXHJcbiAqL1xyXG5UeXBlLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUocHJvcGVydGllcykge1xyXG4gICAgcmV0dXJuIG5ldyB0aGlzLmN0b3IocHJvcGVydGllcyk7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0cyB1cCB7QGxpbmsgVHlwZSNlbmNvZGV8ZW5jb2RlfSwge0BsaW5rIFR5cGUjZGVjb2RlfGRlY29kZX0gYW5kIHtAbGluayBUeXBlI3ZlcmlmeXx2ZXJpZnl9LlxyXG4gKiBAcmV0dXJucyB7VHlwZX0gYHRoaXNgXHJcbiAqL1xyXG5UeXBlLnByb3RvdHlwZS5zZXR1cCA9IGZ1bmN0aW9uIHNldHVwKCkge1xyXG4gICAgLy8gU2V0cyB1cCBldmVyeXRoaW5nIGF0IG9uY2Ugc28gdGhhdCB0aGUgcHJvdG90eXBlIGNoYWluIGRvZXMgbm90IGhhdmUgdG8gYmUgcmUtZXZhbHVhdGVkXHJcbiAgICAvLyBtdWx0aXBsZSB0aW1lcyAoVjgsIHNvZnQtZGVvcHQgcHJvdG90eXBlLWNoZWNrKS5cclxuXHJcbiAgICB2YXIgZnVsbE5hbWUgPSB0aGlzLmZ1bGxOYW1lLFxyXG4gICAgICAgIHR5cGVzICAgID0gW107XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IC8qIGluaXRpYWxpemVzICovIHRoaXMuZmllbGRzQXJyYXkubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgdHlwZXMucHVzaCh0aGlzLl9maWVsZHNBcnJheVtpXS5yZXNvbHZlKCkucmVzb2x2ZWRUeXBlKTtcclxuXHJcbiAgICAvLyBSZXBsYWNlIHNldHVwIG1ldGhvZHMgd2l0aCB0eXBlLXNwZWNpZmljIGdlbmVyYXRlZCBmdW5jdGlvbnNcclxuICAgIHRoaXMuZW5jb2RlID0gZW5jb2Rlcih0aGlzKSh7XHJcbiAgICAgICAgV3JpdGVyIDogV3JpdGVyLFxyXG4gICAgICAgIHR5cGVzICA6IHR5cGVzLFxyXG4gICAgICAgIHV0aWwgICA6IHV0aWxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5kZWNvZGUgPSBkZWNvZGVyKHRoaXMpKHtcclxuICAgICAgICBSZWFkZXIgOiBSZWFkZXIsXHJcbiAgICAgICAgdHlwZXMgIDogdHlwZXMsXHJcbiAgICAgICAgdXRpbCAgIDogdXRpbFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnZlcmlmeSA9IHZlcmlmaWVyKHRoaXMpKHtcclxuICAgICAgICB0eXBlcyA6IHR5cGVzLFxyXG4gICAgICAgIHV0aWwgIDogdXRpbFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmZyb21PYmplY3QgPSBjb252ZXJ0ZXIuZnJvbU9iamVjdCh0aGlzKSh7XHJcbiAgICAgICAgdHlwZXMgOiB0eXBlcyxcclxuICAgICAgICB1dGlsICA6IHV0aWxcclxuICAgIH0pO1xyXG4gICAgdGhpcy50b09iamVjdCA9IGNvbnZlcnRlci50b09iamVjdCh0aGlzKSh7XHJcbiAgICAgICAgdHlwZXMgOiB0eXBlcyxcclxuICAgICAgICB1dGlsICA6IHV0aWxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEluamVjdCBjdXN0b20gd3JhcHBlcnMgZm9yIGNvbW1vbiB0eXBlc1xyXG4gICAgdmFyIHdyYXBwZXIgPSB3cmFwcGVyc1tmdWxsTmFtZV07XHJcbiAgICBpZiAod3JhcHBlcikge1xyXG4gICAgICAgIHZhciBvcmlnaW5hbFRoaXMgPSBPYmplY3QuY3JlYXRlKHRoaXMpO1xyXG4gICAgICAgIC8vIGlmICh3cmFwcGVyLmZyb21PYmplY3QpIHtcclxuICAgICAgICAgICAgb3JpZ2luYWxUaGlzLmZyb21PYmplY3QgPSB0aGlzLmZyb21PYmplY3Q7XHJcbiAgICAgICAgICAgIHRoaXMuZnJvbU9iamVjdCA9IHdyYXBwZXIuZnJvbU9iamVjdC5iaW5kKG9yaWdpbmFsVGhpcyk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGlmICh3cmFwcGVyLnRvT2JqZWN0KSB7XHJcbiAgICAgICAgICAgIG9yaWdpbmFsVGhpcy50b09iamVjdCA9IHRoaXMudG9PYmplY3Q7XHJcbiAgICAgICAgICAgIHRoaXMudG9PYmplY3QgPSB3cmFwcGVyLnRvT2JqZWN0LmJpbmQob3JpZ2luYWxUaGlzKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogRW5jb2RlcyBhIG1lc3NhZ2Ugb2YgdGhpcyB0eXBlLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBUeXBlI3ZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxyXG4gKiBAcGFyYW0ge01lc3NhZ2U8e30+fE9iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIE1lc3NhZ2UgaW5zdGFuY2Ugb3IgcGxhaW4gb2JqZWN0XHJcbiAqIEBwYXJhbSB7V3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXHJcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IHdyaXRlclxyXG4gKi9cclxuVHlwZS5wcm90b3R5cGUuZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlX3NldHVwKG1lc3NhZ2UsIHdyaXRlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuc2V0dXAoKS5lbmNvZGUobWVzc2FnZSwgd3JpdGVyKTsgLy8gb3ZlcnJpZGVzIHRoaXMgbWV0aG9kXHJcbn07XHJcblxyXG4vKipcclxuICogRW5jb2RlcyBhIG1lc3NhZ2Ugb2YgdGhpcyB0eXBlIHByZWNlZWRlZCBieSBpdHMgYnl0ZSBsZW5ndGggYXMgYSB2YXJpbnQuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIFR5cGUjdmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXHJcbiAqIEBwYXJhbSB7TWVzc2FnZTx7fT58T2JqZWN0LjxzdHJpbmcsKj59IG1lc3NhZ2UgTWVzc2FnZSBpbnN0YW5jZSBvciBwbGFpbiBvYmplY3RcclxuICogQHBhcmFtIHtXcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cclxuICogQHJldHVybnMge1dyaXRlcn0gd3JpdGVyXHJcbiAqL1xyXG5UeXBlLnByb3RvdHlwZS5lbmNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWQobWVzc2FnZSwgd3JpdGVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbmNvZGUobWVzc2FnZSwgd3JpdGVyICYmIHdyaXRlci5sZW4gPyB3cml0ZXIuZm9yaygpIDogd3JpdGVyKS5sZGVsaW0oKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEZWNvZGVzIGEgbWVzc2FnZSBvZiB0aGlzIHR5cGUuXHJcbiAqIEBwYXJhbSB7UmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXSBMZW5ndGggb2YgdGhlIG1lc3NhZ2UsIGlmIGtub3duIGJlZm9yZWhhbmRcclxuICogQHJldHVybnMge01lc3NhZ2U8e30+fSBEZWNvZGVkIG1lc3NhZ2VcclxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcclxuICogQHRocm93cyB7dXRpbC5Qcm90b2NvbEVycm9yPHt9Pn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXHJcbiAqL1xyXG5UeXBlLnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbiBkZWNvZGVfc2V0dXAocmVhZGVyLCBsZW5ndGgpIHtcclxuICAgIHJldHVybiB0aGlzLnNldHVwKCkuZGVjb2RlKHJlYWRlciwgbGVuZ3RoKTsgLy8gb3ZlcnJpZGVzIHRoaXMgbWV0aG9kXHJcbn07XHJcblxyXG4vKipcclxuICogRGVjb2RlcyBhIG1lc3NhZ2Ugb2YgdGhpcyB0eXBlIHByZWNlZWRlZCBieSBpdHMgYnl0ZSBsZW5ndGggYXMgYSB2YXJpbnQuXHJcbiAqIEBwYXJhbSB7UmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXHJcbiAqIEByZXR1cm5zIHtNZXNzYWdlPHt9Pn0gRGVjb2RlZCBtZXNzYWdlXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXHJcbiAqIEB0aHJvd3Mge3V0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXHJcbiAqL1xyXG5UeXBlLnByb3RvdHlwZS5kZWNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWQocmVhZGVyKSB7XHJcbiAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiBSZWFkZXIpKVxyXG4gICAgICAgIHJlYWRlciA9IFJlYWRlci5jcmVhdGUocmVhZGVyKTtcclxuICAgIHJldHVybiB0aGlzLmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogVmVyaWZpZXMgdGhhdCBmaWVsZCB2YWx1ZXMgYXJlIHZhbGlkIGFuZCB0aGF0IHJlcXVpcmVkIGZpZWxkcyBhcmUgcHJlc2VudC5cclxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gbWVzc2FnZSBQbGFpbiBvYmplY3QgdG8gdmVyaWZ5XHJcbiAqIEByZXR1cm5zIHtudWxsfHN0cmluZ30gYG51bGxgIGlmIHZhbGlkLCBvdGhlcndpc2UgdGhlIHJlYXNvbiB3aHkgaXQgaXMgbm90XHJcbiAqL1xyXG5UeXBlLnByb3RvdHlwZS52ZXJpZnkgPSBmdW5jdGlvbiB2ZXJpZnlfc2V0dXAobWVzc2FnZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2V0dXAoKS52ZXJpZnkobWVzc2FnZSk7IC8vIG92ZXJyaWRlcyB0aGlzIG1ldGhvZFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcgbWVzc2FnZSBvZiB0aGlzIHR5cGUgZnJvbSBhIHBsYWluIG9iamVjdC4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gdGhlaXIgcmVzcGVjdGl2ZSBpbnRlcm5hbCB0eXBlcy5cclxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gb2JqZWN0IFBsYWluIG9iamVjdCB0byBjb252ZXJ0XHJcbiAqIEByZXR1cm5zIHtNZXNzYWdlPHt9Pn0gTWVzc2FnZSBpbnN0YW5jZVxyXG4gKi9cclxuVHlwZS5wcm90b3R5cGUuZnJvbU9iamVjdCA9IGZ1bmN0aW9uIGZyb21PYmplY3Qob2JqZWN0KSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXR1cCgpLmZyb21PYmplY3Qob2JqZWN0KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJzaW9uIG9wdGlvbnMgYXMgdXNlZCBieSB7QGxpbmsgVHlwZSN0b09iamVjdH0gYW5kIHtAbGluayBNZXNzYWdlLnRvT2JqZWN0fS5cclxuICogQGludGVyZmFjZSBJQ29udmVyc2lvbk9wdGlvbnNcclxuICogQHByb3BlcnR5IHtGdW5jdGlvbn0gW2xvbmdzXSBMb25nIGNvbnZlcnNpb24gdHlwZS5cclxuICogVmFsaWQgdmFsdWVzIGFyZSBgU3RyaW5nYCBhbmQgYE51bWJlcmAgKHRoZSBnbG9iYWwgdHlwZXMpLlxyXG4gKiBEZWZhdWx0cyB0byBjb3B5IHRoZSBwcmVzZW50IHZhbHVlLCB3aGljaCBpcyBhIHBvc3NpYmx5IHVuc2FmZSBudW1iZXIgd2l0aG91dCBhbmQgYSB7QGxpbmsgTG9uZ30gd2l0aCBhIGxvbmcgbGlicmFyeS5cclxuICogQHByb3BlcnR5IHtGdW5jdGlvbn0gW2VudW1zXSBFbnVtIHZhbHVlIGNvbnZlcnNpb24gdHlwZS5cclxuICogT25seSB2YWxpZCB2YWx1ZSBpcyBgU3RyaW5nYCAodGhlIGdsb2JhbCB0eXBlKS5cclxuICogRGVmYXVsdHMgdG8gY29weSB0aGUgcHJlc2VudCB2YWx1ZSwgd2hpY2ggaXMgdGhlIG51bWVyaWMgaWQuXHJcbiAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IFtieXRlc10gQnl0ZXMgdmFsdWUgY29udmVyc2lvbiB0eXBlLlxyXG4gKiBWYWxpZCB2YWx1ZXMgYXJlIGBBcnJheWAgYW5kIChhIGJhc2U2NCBlbmNvZGVkKSBgU3RyaW5nYCAodGhlIGdsb2JhbCB0eXBlcykuXHJcbiAqIERlZmF1bHRzIHRvIGNvcHkgdGhlIHByZXNlbnQgdmFsdWUsIHdoaWNoIHVzdWFsbHkgaXMgYSBCdWZmZXIgdW5kZXIgbm9kZSBhbmQgYW4gVWludDhBcnJheSBpbiB0aGUgYnJvd3Nlci5cclxuICogQHByb3BlcnR5IHtib29sZWFufSBbZGVmYXVsdHM9ZmFsc2VdIEFsc28gc2V0cyBkZWZhdWx0IHZhbHVlcyBvbiB0aGUgcmVzdWx0aW5nIG9iamVjdFxyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFthcnJheXM9ZmFsc2VdIFNldHMgZW1wdHkgYXJyYXlzIGZvciBtaXNzaW5nIHJlcGVhdGVkIGZpZWxkcyBldmVuIGlmIGBkZWZhdWx0cz1mYWxzZWBcclxuICogQHByb3BlcnR5IHtib29sZWFufSBbb2JqZWN0cz1mYWxzZV0gU2V0cyBlbXB0eSBvYmplY3RzIGZvciBtaXNzaW5nIG1hcCBmaWVsZHMgZXZlbiBpZiBgZGVmYXVsdHM9ZmFsc2VgXHJcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW29uZW9mcz1mYWxzZV0gSW5jbHVkZXMgdmlydHVhbCBvbmVvZiBwcm9wZXJ0aWVzIHNldCB0byB0aGUgcHJlc2VudCBmaWVsZCdzIG5hbWUsIGlmIGFueVxyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtqc29uPWZhbHNlXSBQZXJmb3JtcyBhZGRpdGlvbmFsIEpTT04gY29tcGF0aWJpbGl0eSBjb252ZXJzaW9ucywgaS5lLiBOYU4gYW5kIEluZmluaXR5IHRvIHN0cmluZ3NcclxuICovXHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGEgbWVzc2FnZSBvZiB0aGlzIHR5cGUuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIG90aGVyIHR5cGVzIGlmIHNwZWNpZmllZC5cclxuICogQHBhcmFtIHtNZXNzYWdlPHt9Pn0gbWVzc2FnZSBNZXNzYWdlIGluc3RhbmNlXHJcbiAqIEBwYXJhbSB7SUNvbnZlcnNpb25PcHRpb25zfSBbb3B0aW9uc10gQ29udmVyc2lvbiBvcHRpb25zXHJcbiAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gUGxhaW4gb2JqZWN0XHJcbiAqL1xyXG5UeXBlLnByb3RvdHlwZS50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcclxuICAgIHJldHVybiB0aGlzLnNldHVwKCkudG9PYmplY3QobWVzc2FnZSwgb3B0aW9ucyk7XHJcbn07XHJcblxyXG4vKipcclxuICogRGVjb3JhdG9yIGZ1bmN0aW9uIGFzIHJldHVybmVkIGJ5IHtAbGluayBUeXBlLmR9IChUeXBlU2NyaXB0KS5cclxuICogQHR5cGVkZWYgVHlwZURlY29yYXRvclxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqIEBwYXJhbSB7Q29uc3RydWN0b3I8VD59IHRhcmdldCBUYXJnZXQgY29uc3RydWN0b3JcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICogQHRlbXBsYXRlIFQgZXh0ZW5kcyBNZXNzYWdlPFQ+XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFR5cGUgZGVjb3JhdG9yIChUeXBlU2NyaXB0KS5cclxuICogQHBhcmFtIHtzdHJpbmd9IFt0eXBlTmFtZV0gVHlwZSBuYW1lLCBkZWZhdWx0cyB0byB0aGUgY29uc3RydWN0b3IncyBuYW1lXHJcbiAqIEByZXR1cm5zIHtUeXBlRGVjb3JhdG9yPFQ+fSBEZWNvcmF0b3IgZnVuY3Rpb25cclxuICogQHRlbXBsYXRlIFQgZXh0ZW5kcyBNZXNzYWdlPFQ+XHJcbiAqL1xyXG5UeXBlLmQgPSBmdW5jdGlvbiBkZWNvcmF0ZVR5cGUodHlwZU5hbWUpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiB0eXBlRGVjb3JhdG9yKHRhcmdldCkge1xyXG4gICAgICAgIHV0aWwuZGVjb3JhdGVUeXBlKHRhcmdldCwgdHlwZU5hbWUpO1xyXG4gICAgfTtcclxufTtcclxuXHJcbn0se1wiMTJcIjoxMixcIjEzXCI6MTMsXCIxNFwiOjE0LFwiMTVcIjoxNSxcIjE2XCI6MTYsXCIyMFwiOjIwLFwiMjFcIjoyMSxcIjIzXCI6MjMsXCIyNVwiOjI1LFwiMjdcIjoyNyxcIjMzXCI6MzMsXCIzN1wiOjM3LFwiNDBcIjo0MCxcIjQxXCI6NDEsXCI0MlwiOjQyfV0sMzY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qKlxyXG4gKiBDb21tb24gdHlwZSBjb25zdGFudHMuXHJcbiAqIEBuYW1lc3BhY2VcclxuICovXHJcbnZhciB0eXBlcyA9IGV4cG9ydHM7XHJcblxyXG52YXIgdXRpbCA9IHJlcXVpcmUoMzcpO1xyXG5cclxudmFyIHMgPSBbXHJcbiAgICBcImRvdWJsZVwiLCAgIC8vIDBcclxuICAgIFwiZmxvYXRcIiwgICAgLy8gMVxyXG4gICAgXCJpbnQzMlwiLCAgICAvLyAyXHJcbiAgICBcInVpbnQzMlwiLCAgIC8vIDNcclxuICAgIFwic2ludDMyXCIsICAgLy8gNFxyXG4gICAgXCJmaXhlZDMyXCIsICAvLyA1XHJcbiAgICBcInNmaXhlZDMyXCIsIC8vIDZcclxuICAgIFwiaW50NjRcIiwgICAgLy8gN1xyXG4gICAgXCJ1aW50NjRcIiwgICAvLyA4XHJcbiAgICBcInNpbnQ2NFwiLCAgIC8vIDlcclxuICAgIFwiZml4ZWQ2NFwiLCAgLy8gMTBcclxuICAgIFwic2ZpeGVkNjRcIiwgLy8gMTFcclxuICAgIFwiYm9vbFwiLCAgICAgLy8gMTJcclxuICAgIFwic3RyaW5nXCIsICAgLy8gMTNcclxuICAgIFwiYnl0ZXNcIiAgICAgLy8gMTRcclxuXTtcclxuXHJcbmZ1bmN0aW9uIGJha2UodmFsdWVzLCBvZmZzZXQpIHtcclxuICAgIHZhciBpID0gMCwgbyA9IHt9O1xyXG4gICAgb2Zmc2V0IHw9IDA7XHJcbiAgICB3aGlsZSAoaSA8IHZhbHVlcy5sZW5ndGgpIG9bc1tpICsgb2Zmc2V0XV0gPSB2YWx1ZXNbaSsrXTtcclxuICAgIHJldHVybiBvO1xyXG59XHJcblxyXG4vKipcclxuICogQmFzaWMgdHlwZSB3aXJlIHR5cGVzLlxyXG4gKiBAdHlwZSB7T2JqZWN0LjxzdHJpbmcsbnVtYmVyPn1cclxuICogQGNvbnN0XHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkb3VibGU9MSBGaXhlZDY0IHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gZmxvYXQ9NSBGaXhlZDMyIHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gaW50MzI9MCBWYXJpbnQgd2lyZSB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB1aW50MzI9MCBWYXJpbnQgd2lyZSB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzaW50MzI9MCBWYXJpbnQgd2lyZSB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBmaXhlZDMyPTUgRml4ZWQzMiB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHNmaXhlZDMyPTUgRml4ZWQzMiB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IGludDY0PTAgVmFyaW50IHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gdWludDY0PTAgVmFyaW50IHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gc2ludDY0PTAgVmFyaW50IHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gZml4ZWQ2ND0xIEZpeGVkNjQgd2lyZSB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzZml4ZWQ2ND0xIEZpeGVkNjQgd2lyZSB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBib29sPTAgVmFyaW50IHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gc3RyaW5nPTIgTGRlbGltIHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gYnl0ZXM9MiBMZGVsaW0gd2lyZSB0eXBlXHJcbiAqL1xyXG50eXBlcy5iYXNpYyA9IGJha2UoW1xyXG4gICAgLyogZG91YmxlICAgKi8gMSxcclxuICAgIC8qIGZsb2F0ICAgICovIDUsXHJcbiAgICAvKiBpbnQzMiAgICAqLyAwLFxyXG4gICAgLyogdWludDMyICAgKi8gMCxcclxuICAgIC8qIHNpbnQzMiAgICovIDAsXHJcbiAgICAvKiBmaXhlZDMyICAqLyA1LFxyXG4gICAgLyogc2ZpeGVkMzIgKi8gNSxcclxuICAgIC8qIGludDY0ICAgICovIDAsXHJcbiAgICAvKiB1aW50NjQgICAqLyAwLFxyXG4gICAgLyogc2ludDY0ICAgKi8gMCxcclxuICAgIC8qIGZpeGVkNjQgICovIDEsXHJcbiAgICAvKiBzZml4ZWQ2NCAqLyAxLFxyXG4gICAgLyogYm9vbCAgICAgKi8gMCxcclxuICAgIC8qIHN0cmluZyAgICovIDIsXHJcbiAgICAvKiBieXRlcyAgICAqLyAyXHJcbl0pO1xyXG5cclxuLyoqXHJcbiAqIEJhc2ljIHR5cGUgZGVmYXVsdHMuXHJcbiAqIEB0eXBlIHtPYmplY3QuPHN0cmluZywqPn1cclxuICogQGNvbnN0XHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkb3VibGU9MCBEb3VibGUgZGVmYXVsdFxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gZmxvYXQ9MCBGbG9hdCBkZWZhdWx0XHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBpbnQzMj0wIEludDMyIGRlZmF1bHRcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHVpbnQzMj0wIFVpbnQzMiBkZWZhdWx0XHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzaW50MzI9MCBTaW50MzIgZGVmYXVsdFxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gZml4ZWQzMj0wIEZpeGVkMzIgZGVmYXVsdFxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gc2ZpeGVkMzI9MCBTZml4ZWQzMiBkZWZhdWx0XHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBpbnQ2ND0wIEludDY0IGRlZmF1bHRcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHVpbnQ2ND0wIFVpbnQ2NCBkZWZhdWx0XHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzaW50NjQ9MCBTaW50MzIgZGVmYXVsdFxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gZml4ZWQ2ND0wIEZpeGVkNjQgZGVmYXVsdFxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gc2ZpeGVkNjQ9MCBTZml4ZWQ2NCBkZWZhdWx0XHJcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gYm9vbD1mYWxzZSBCb29sIGRlZmF1bHRcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IHN0cmluZz1cIlwiIFN0cmluZyBkZWZhdWx0XHJcbiAqIEBwcm9wZXJ0eSB7QXJyYXkuPG51bWJlcj59IGJ5dGVzPUFycmF5KDApIEJ5dGVzIGRlZmF1bHRcclxuICogQHByb3BlcnR5IHtudWxsfSBtZXNzYWdlPW51bGwgTWVzc2FnZSBkZWZhdWx0XHJcbiAqL1xyXG50eXBlcy5kZWZhdWx0cyA9IGJha2UoW1xyXG4gICAgLyogZG91YmxlICAgKi8gMCxcclxuICAgIC8qIGZsb2F0ICAgICovIDAsXHJcbiAgICAvKiBpbnQzMiAgICAqLyAwLFxyXG4gICAgLyogdWludDMyICAgKi8gMCxcclxuICAgIC8qIHNpbnQzMiAgICovIDAsXHJcbiAgICAvKiBmaXhlZDMyICAqLyAwLFxyXG4gICAgLyogc2ZpeGVkMzIgKi8gMCxcclxuICAgIC8qIGludDY0ICAgICovIDAsXHJcbiAgICAvKiB1aW50NjQgICAqLyAwLFxyXG4gICAgLyogc2ludDY0ICAgKi8gMCxcclxuICAgIC8qIGZpeGVkNjQgICovIDAsXHJcbiAgICAvKiBzZml4ZWQ2NCAqLyAwLFxyXG4gICAgLyogYm9vbCAgICAgKi8gZmFsc2UsXHJcbiAgICAvKiBzdHJpbmcgICAqLyBcIlwiLFxyXG4gICAgLyogYnl0ZXMgICAgKi8gdXRpbC5lbXB0eUFycmF5LFxyXG4gICAgLyogbWVzc2FnZSAgKi8gbnVsbFxyXG5dKTtcclxuXHJcbi8qKlxyXG4gKiBCYXNpYyBsb25nIHR5cGUgd2lyZSB0eXBlcy5cclxuICogQHR5cGUge09iamVjdC48c3RyaW5nLG51bWJlcj59XHJcbiAqIEBjb25zdFxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gaW50NjQ9MCBWYXJpbnQgd2lyZSB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB1aW50NjQ9MCBWYXJpbnQgd2lyZSB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzaW50NjQ9MCBWYXJpbnQgd2lyZSB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBmaXhlZDY0PTEgRml4ZWQ2NCB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHNmaXhlZDY0PTEgRml4ZWQ2NCB3aXJlIHR5cGVcclxuICovXHJcbnR5cGVzLmxvbmcgPSBiYWtlKFtcclxuICAgIC8qIGludDY0ICAgICovIDAsXHJcbiAgICAvKiB1aW50NjQgICAqLyAwLFxyXG4gICAgLyogc2ludDY0ICAgKi8gMCxcclxuICAgIC8qIGZpeGVkNjQgICovIDEsXHJcbiAgICAvKiBzZml4ZWQ2NCAqLyAxXHJcbl0sIDcpO1xyXG5cclxuLyoqXHJcbiAqIEFsbG93ZWQgdHlwZXMgZm9yIG1hcCBrZXlzIHdpdGggdGhlaXIgYXNzb2NpYXRlZCB3aXJlIHR5cGUuXHJcbiAqIEB0eXBlIHtPYmplY3QuPHN0cmluZyxudW1iZXI+fVxyXG4gKiBAY29uc3RcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IGludDMyPTAgVmFyaW50IHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gdWludDMyPTAgVmFyaW50IHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gc2ludDMyPTAgVmFyaW50IHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gZml4ZWQzMj01IEZpeGVkMzIgd2lyZSB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzZml4ZWQzMj01IEZpeGVkMzIgd2lyZSB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBpbnQ2ND0wIFZhcmludCB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHVpbnQ2ND0wIFZhcmludCB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHNpbnQ2ND0wIFZhcmludCB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IGZpeGVkNjQ9MSBGaXhlZDY0IHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gc2ZpeGVkNjQ9MSBGaXhlZDY0IHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gYm9vbD0wIFZhcmludCB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHN0cmluZz0yIExkZWxpbSB3aXJlIHR5cGVcclxuICovXHJcbnR5cGVzLm1hcEtleSA9IGJha2UoW1xyXG4gICAgLyogaW50MzIgICAgKi8gMCxcclxuICAgIC8qIHVpbnQzMiAgICovIDAsXHJcbiAgICAvKiBzaW50MzIgICAqLyAwLFxyXG4gICAgLyogZml4ZWQzMiAgKi8gNSxcclxuICAgIC8qIHNmaXhlZDMyICovIDUsXHJcbiAgICAvKiBpbnQ2NCAgICAqLyAwLFxyXG4gICAgLyogdWludDY0ICAgKi8gMCxcclxuICAgIC8qIHNpbnQ2NCAgICovIDAsXHJcbiAgICAvKiBmaXhlZDY0ICAqLyAxLFxyXG4gICAgLyogc2ZpeGVkNjQgKi8gMSxcclxuICAgIC8qIGJvb2wgICAgICovIDAsXHJcbiAgICAvKiBzdHJpbmcgICAqLyAyXHJcbl0sIDIpO1xyXG5cclxuLyoqXHJcbiAqIEFsbG93ZWQgdHlwZXMgZm9yIHBhY2tlZCByZXBlYXRlZCBmaWVsZHMgd2l0aCB0aGVpciBhc3NvY2lhdGVkIHdpcmUgdHlwZS5cclxuICogQHR5cGUge09iamVjdC48c3RyaW5nLG51bWJlcj59XHJcbiAqIEBjb25zdFxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gZG91YmxlPTEgRml4ZWQ2NCB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IGZsb2F0PTUgRml4ZWQzMiB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IGludDMyPTAgVmFyaW50IHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gdWludDMyPTAgVmFyaW50IHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gc2ludDMyPTAgVmFyaW50IHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gZml4ZWQzMj01IEZpeGVkMzIgd2lyZSB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzZml4ZWQzMj01IEZpeGVkMzIgd2lyZSB0eXBlXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBpbnQ2ND0wIFZhcmludCB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHVpbnQ2ND0wIFZhcmludCB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHNpbnQ2ND0wIFZhcmludCB3aXJlIHR5cGVcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IGZpeGVkNjQ9MSBGaXhlZDY0IHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gc2ZpeGVkNjQ9MSBGaXhlZDY0IHdpcmUgdHlwZVxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gYm9vbD0wIFZhcmludCB3aXJlIHR5cGVcclxuICovXHJcbnR5cGVzLnBhY2tlZCA9IGJha2UoW1xyXG4gICAgLyogZG91YmxlICAgKi8gMSxcclxuICAgIC8qIGZsb2F0ICAgICovIDUsXHJcbiAgICAvKiBpbnQzMiAgICAqLyAwLFxyXG4gICAgLyogdWludDMyICAgKi8gMCxcclxuICAgIC8qIHNpbnQzMiAgICovIDAsXHJcbiAgICAvKiBmaXhlZDMyICAqLyA1LFxyXG4gICAgLyogc2ZpeGVkMzIgKi8gNSxcclxuICAgIC8qIGludDY0ICAgICovIDAsXHJcbiAgICAvKiB1aW50NjQgICAqLyAwLFxyXG4gICAgLyogc2ludDY0ICAgKi8gMCxcclxuICAgIC8qIGZpeGVkNjQgICovIDEsXHJcbiAgICAvKiBzZml4ZWQ2NCAqLyAxLFxyXG4gICAgLyogYm9vbCAgICAgKi8gMFxyXG5dKTtcclxuXHJcbn0se1wiMzdcIjozN31dLDM3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKipcclxuICogVmFyaW91cyB1dGlsaXR5IGZ1bmN0aW9ucy5cclxuICogQG5hbWVzcGFjZVxyXG4gKi9cclxudmFyIHV0aWwgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoMzkpO1xyXG5cclxudmFyIHJvb3RzID0gcmVxdWlyZSgzMCk7XHJcblxyXG52YXIgVHlwZSwgLy8gY3ljbGljXHJcbiAgICBFbnVtO1xyXG5cclxudXRpbC5jb2RlZ2VuID0gcmVxdWlyZSgzKTtcclxudXRpbC5mZXRjaCAgID0gcmVxdWlyZSg1KTtcclxudXRpbC5wYXRoICAgID0gcmVxdWlyZSg4KTtcclxuXHJcbi8qKlxyXG4gKiBOb2RlJ3MgZnMgbW9kdWxlIGlmIGF2YWlsYWJsZS5cclxuICogQHR5cGUge09iamVjdC48c3RyaW5nLCo+fVxyXG4gKi9cclxudXRpbC5mcyA9IHV0aWwuaW5xdWlyZShcImZzXCIpO1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIGFuIG9iamVjdCdzIHZhbHVlcyB0byBhbiBhcnJheS5cclxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gb2JqZWN0IE9iamVjdCB0byBjb252ZXJ0XHJcbiAqIEByZXR1cm5zIHtBcnJheS48Kj59IENvbnZlcnRlZCBhcnJheVxyXG4gKi9cclxudXRpbC50b0FycmF5ID0gZnVuY3Rpb24gdG9BcnJheShvYmplY3QpIHtcclxuICAgIGlmIChvYmplY3QpIHtcclxuICAgICAgICB2YXIga2V5cyAgPSBPYmplY3Qua2V5cyhvYmplY3QpLFxyXG4gICAgICAgICAgICBhcnJheSA9IG5ldyBBcnJheShrZXlzLmxlbmd0aCksXHJcbiAgICAgICAgICAgIGluZGV4ID0gMDtcclxuICAgICAgICB3aGlsZSAoaW5kZXggPCBrZXlzLmxlbmd0aClcclxuICAgICAgICAgICAgYXJyYXlbaW5kZXhdID0gb2JqZWN0W2tleXNbaW5kZXgrK11dO1xyXG4gICAgICAgIHJldHVybiBhcnJheTtcclxuICAgIH1cclxuICAgIHJldHVybiBbXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBhbiBhcnJheSBvZiBrZXlzIGltbWVkaWF0ZWx5IGZvbGxvd2VkIGJ5IHRoZWlyIHJlc3BlY3RpdmUgdmFsdWUgdG8gYW4gb2JqZWN0LCBvbWl0dGluZyB1bmRlZmluZWQgdmFsdWVzLlxyXG4gKiBAcGFyYW0ge0FycmF5LjwqPn0gYXJyYXkgQXJyYXkgdG8gY29udmVydFxyXG4gKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IENvbnZlcnRlZCBvYmplY3RcclxuICovXHJcbnV0aWwudG9PYmplY3QgPSBmdW5jdGlvbiB0b09iamVjdChhcnJheSkge1xyXG4gICAgdmFyIG9iamVjdCA9IHt9LFxyXG4gICAgICAgIGluZGV4ICA9IDA7XHJcbiAgICB3aGlsZSAoaW5kZXggPCBhcnJheS5sZW5ndGgpIHtcclxuICAgICAgICB2YXIga2V5ID0gYXJyYXlbaW5kZXgrK10sXHJcbiAgICAgICAgICAgIHZhbCA9IGFycmF5W2luZGV4KytdO1xyXG4gICAgICAgIGlmICh2YWwgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgb2JqZWN0W2tleV0gPSB2YWw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2JqZWN0O1xyXG59O1xyXG5cclxudmFyIHNhZmVQcm9wQmFja3NsYXNoUmUgPSAvXFxcXC9nLFxyXG4gICAgc2FmZVByb3BRdW90ZVJlICAgICA9IC9cIi9nO1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBuYW1lIGlzIGEgcmVzZXJ2ZWQgd29yZCBpbiBKUy5cclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgTmFtZSB0byB0ZXN0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgcmVzZXJ2ZWQsIG90aGVyd2lzZSBgZmFsc2VgXHJcbiAqL1xyXG51dGlsLmlzUmVzZXJ2ZWQgPSBmdW5jdGlvbiBpc1Jlc2VydmVkKG5hbWUpIHtcclxuICAgIHJldHVybiAvXig/OmRvfGlmfGlufGZvcnxsZXR8bmV3fHRyeXx2YXJ8Y2FzZXxlbHNlfGVudW18ZXZhbHxmYWxzZXxudWxsfHRoaXN8dHJ1ZXx2b2lkfHdpdGh8YnJlYWt8Y2F0Y2h8Y2xhc3N8Y29uc3R8c3VwZXJ8dGhyb3d8d2hpbGV8eWllbGR8ZGVsZXRlfGV4cG9ydHxpbXBvcnR8cHVibGljfHJldHVybnxzdGF0aWN8c3dpdGNofHR5cGVvZnxkZWZhdWx0fGV4dGVuZHN8ZmluYWxseXxwYWNrYWdlfHByaXZhdGV8Y29udGludWV8ZGVidWdnZXJ8ZnVuY3Rpb258YXJndW1lbnRzfGludGVyZmFjZXxwcm90ZWN0ZWR8aW1wbGVtZW50c3xpbnN0YW5jZW9mKSQvLnRlc3QobmFtZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIHNhZmUgcHJvcGVydHkgYWNjZXNzb3IgZm9yIHRoZSBzcGVjaWZpZWQgcHJvcGVydHkgbmFtZS5cclxuICogQHBhcmFtIHtzdHJpbmd9IHByb3AgUHJvcGVydHkgbmFtZVxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBTYWZlIGFjY2Vzc29yXHJcbiAqL1xyXG51dGlsLnNhZmVQcm9wID0gZnVuY3Rpb24gc2FmZVByb3AocHJvcCkge1xyXG4gICAgaWYgKCEvXlskXFx3X10rJC8udGVzdChwcm9wKSB8fCB1dGlsLmlzUmVzZXJ2ZWQocHJvcCkpXHJcbiAgICAgICAgcmV0dXJuIFwiW1xcXCJcIiArIHByb3AucmVwbGFjZShzYWZlUHJvcEJhY2tzbGFzaFJlLCBcIlxcXFxcXFxcXCIpLnJlcGxhY2Uoc2FmZVByb3BRdW90ZVJlLCBcIlxcXFxcXFwiXCIpICsgXCJcXFwiXVwiO1xyXG4gICAgcmV0dXJuIFwiLlwiICsgcHJvcDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGUgZmlyc3QgY2hhcmFjdGVyIG9mIGEgc3RyaW5nIHRvIHVwcGVyIGNhc2UuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgU3RyaW5nIHRvIGNvbnZlcnRcclxuICogQHJldHVybnMge3N0cmluZ30gQ29udmVydGVkIHN0cmluZ1xyXG4gKi9cclxudXRpbC51Y0ZpcnN0ID0gZnVuY3Rpb24gdWNGaXJzdChzdHIpIHtcclxuICAgIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc3Vic3RyaW5nKDEpO1xyXG59O1xyXG5cclxudmFyIGNhbWVsQ2FzZVJlID0gL18oW2Etel0pL2c7XHJcblxyXG4vKipcclxuICogQ29udmVydHMgYSBzdHJpbmcgdG8gY2FtZWwgY2FzZS5cclxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBTdHJpbmcgdG8gY29udmVydFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBDb252ZXJ0ZWQgc3RyaW5nXHJcbiAqL1xyXG51dGlsLmNhbWVsQ2FzZSA9IGZ1bmN0aW9uIGNhbWVsQ2FzZShzdHIpIHtcclxuICAgIHJldHVybiBzdHIuc3Vic3RyaW5nKDAsIDEpXHJcbiAgICAgICAgICsgc3RyLnN1YnN0cmluZygxKVxyXG4gICAgICAgICAgICAgICAucmVwbGFjZShjYW1lbENhc2VSZSwgZnVuY3Rpb24oJDAsICQxKSB7IHJldHVybiAkMS50b1VwcGVyQ2FzZSgpOyB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb21wYXJlcyByZWZsZWN0ZWQgZmllbGRzIGJ5IGlkLlxyXG4gKiBAcGFyYW0ge0ZpZWxkfSBhIEZpcnN0IGZpZWxkXHJcbiAqIEBwYXJhbSB7RmllbGR9IGIgU2Vjb25kIGZpZWxkXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IENvbXBhcmlzb24gdmFsdWVcclxuICovXHJcbnV0aWwuY29tcGFyZUZpZWxkc0J5SWQgPSBmdW5jdGlvbiBjb21wYXJlRmllbGRzQnlJZChhLCBiKSB7XHJcbiAgICByZXR1cm4gYS5pZCAtIGIuaWQ7XHJcbn07XHJcblxyXG4vKipcclxuICogRGVjb3JhdG9yIGhlbHBlciBmb3IgdHlwZXMgKFR5cGVTY3JpcHQpLlxyXG4gKiBAcGFyYW0ge0NvbnN0cnVjdG9yPFQ+fSBjdG9yIENvbnN0cnVjdG9yIGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZU5hbWVdIFR5cGUgbmFtZSwgZGVmYXVsdHMgdG8gdGhlIGNvbnN0cnVjdG9yJ3MgbmFtZVxyXG4gKiBAcmV0dXJucyB7VHlwZX0gUmVmbGVjdGVkIHR5cGVcclxuICogQHRlbXBsYXRlIFQgZXh0ZW5kcyBNZXNzYWdlPFQ+XHJcbiAqIEBwcm9wZXJ0eSB7Um9vdH0gcm9vdCBEZWNvcmF0b3JzIHJvb3RcclxuICovXHJcbnV0aWwuZGVjb3JhdGVUeXBlID0gZnVuY3Rpb24gZGVjb3JhdGVUeXBlKGN0b3IsIHR5cGVOYW1lKSB7XHJcblxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICBpZiAoY3Rvci4kdHlwZSkge1xyXG4gICAgICAgIGlmICh0eXBlTmFtZSAmJiBjdG9yLiR0eXBlLm5hbWUgIT09IHR5cGVOYW1lKSB7XHJcbiAgICAgICAgICAgIHV0aWwuZGVjb3JhdGVSb290LnJlbW92ZShjdG9yLiR0eXBlKTtcclxuICAgICAgICAgICAgY3Rvci4kdHlwZS5uYW1lID0gdHlwZU5hbWU7XHJcbiAgICAgICAgICAgIHV0aWwuZGVjb3JhdGVSb290LmFkZChjdG9yLiR0eXBlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGN0b3IuJHR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgIGlmICghVHlwZSlcclxuICAgICAgICBUeXBlID0gcmVxdWlyZSgzNSk7XHJcblxyXG4gICAgdmFyIHR5cGUgPSBuZXcgVHlwZSh0eXBlTmFtZSB8fCBjdG9yLm5hbWUpO1xyXG4gICAgdXRpbC5kZWNvcmF0ZVJvb3QuYWRkKHR5cGUpO1xyXG4gICAgdHlwZS5jdG9yID0gY3RvcjsgLy8gc2V0cyB1cCAuZW5jb2RlLCAuZGVjb2RlIGV0Yy5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdG9yLCBcIiR0eXBlXCIsIHsgdmFsdWU6IHR5cGUsIGVudW1lcmFibGU6IGZhbHNlIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN0b3IucHJvdG90eXBlLCBcIiR0eXBlXCIsIHsgdmFsdWU6IHR5cGUsIGVudW1lcmFibGU6IGZhbHNlIH0pO1xyXG4gICAgcmV0dXJuIHR5cGU7XHJcbn07XHJcblxyXG52YXIgZGVjb3JhdGVFbnVtSW5kZXggPSAwO1xyXG5cclxuLyoqXHJcbiAqIERlY29yYXRvciBoZWxwZXIgZm9yIGVudW1zIChUeXBlU2NyaXB0KS5cclxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBFbnVtIG9iamVjdFxyXG4gKiBAcmV0dXJucyB7RW51bX0gUmVmbGVjdGVkIGVudW1cclxuICovXHJcbnV0aWwuZGVjb3JhdGVFbnVtID0gZnVuY3Rpb24gZGVjb3JhdGVFbnVtKG9iamVjdCkge1xyXG5cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgaWYgKG9iamVjdC4kdHlwZSlcclxuICAgICAgICByZXR1cm4gb2JqZWN0LiR0eXBlO1xyXG5cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICBpZiAoIUVudW0pXHJcbiAgICAgICAgRW51bSA9IHJlcXVpcmUoMTUpO1xyXG5cclxuICAgIHZhciBlbm0gPSBuZXcgRW51bShcIkVudW1cIiArIGRlY29yYXRlRW51bUluZGV4KyssIG9iamVjdCk7XHJcbiAgICB1dGlsLmRlY29yYXRlUm9vdC5hZGQoZW5tKTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIFwiJHR5cGVcIiwgeyB2YWx1ZTogZW5tLCBlbnVtZXJhYmxlOiBmYWxzZSB9KTtcclxuICAgIHJldHVybiBlbm07XHJcbn07XHJcblxyXG4vKipcclxuICogRGVjb3JhdG9yIHJvb3QgKFR5cGVTY3JpcHQpLlxyXG4gKiBAbmFtZSB1dGlsLmRlY29yYXRlUm9vdFxyXG4gKiBAdHlwZSB7Um9vdH1cclxuICogQHJlYWRvbmx5XHJcbiAqL1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkodXRpbCwgXCJkZWNvcmF0ZVJvb3RcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gcm9vdHNbXCJkZWNvcmF0ZWRcIl0gfHwgKHJvb3RzW1wiZGVjb3JhdGVkXCJdID0gbmV3IChyZXF1aXJlKDI5KSkoKSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxufSx7XCIxNVwiOjE1LFwiMjlcIjoyOSxcIjNcIjozLFwiMzBcIjozMCxcIjM1XCI6MzUsXCIzOVwiOjM5LFwiNVwiOjUsXCI4XCI6OH1dLDM4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gTG9uZ0JpdHM7XHJcblxyXG52YXIgdXRpbCA9IHJlcXVpcmUoMzkpO1xyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgbmV3IGxvbmcgYml0cy5cclxuICogQGNsYXNzZGVzYyBIZWxwZXIgY2xhc3MgZm9yIHdvcmtpbmcgd2l0aCB0aGUgbG93IGFuZCBoaWdoIGJpdHMgb2YgYSA2NCBiaXQgdmFsdWUuXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge251bWJlcn0gbG8gTG93IDMyIGJpdHMsIHVuc2lnbmVkXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBoaSBIaWdoIDMyIGJpdHMsIHVuc2lnbmVkXHJcbiAqL1xyXG5mdW5jdGlvbiBMb25nQml0cyhsbywgaGkpIHtcclxuXHJcbiAgICAvLyBub3RlIHRoYXQgdGhlIGNhc3RzIGJlbG93IGFyZSB0aGVvcmV0aWNhbGx5IHVubmVjZXNzYXJ5IGFzIG9mIHRvZGF5LCBidXQgb2xkZXIgc3RhdGljYWxseVxyXG4gICAgLy8gZ2VuZXJhdGVkIGNvbnZlcnRlciBjb2RlIG1pZ2h0IHN0aWxsIGNhbGwgdGhlIGN0b3Igd2l0aCBzaWduZWQgMzJiaXRzLiBrZXB0IGZvciBjb21wYXQuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb3cgYml0cy5cclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMubG8gPSBsbyA+Pj4gMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhpZ2ggYml0cy5cclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuaGkgPSBoaSA+Pj4gMDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFplcm8gYml0cy5cclxuICogQG1lbWJlcm9mIHV0aWwuTG9uZ0JpdHNcclxuICogQHR5cGUge3V0aWwuTG9uZ0JpdHN9XHJcbiAqL1xyXG52YXIgemVybyA9IExvbmdCaXRzLnplcm8gPSBuZXcgTG9uZ0JpdHMoMCwgMCk7XHJcblxyXG56ZXJvLnRvTnVtYmVyID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xyXG56ZXJvLnp6RW5jb2RlID0gemVyby56ekRlY29kZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfTtcclxuemVyby5sZW5ndGggPSBmdW5jdGlvbigpIHsgcmV0dXJuIDE7IH07XHJcblxyXG4vKipcclxuICogWmVybyBoYXNoLlxyXG4gKiBAbWVtYmVyb2YgdXRpbC5Mb25nQml0c1xyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKi9cclxudmFyIHplcm9IYXNoID0gTG9uZ0JpdHMuemVyb0hhc2ggPSBcIlxcMFxcMFxcMFxcMFxcMFxcMFxcMFxcMFwiO1xyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgbmV3IGxvbmcgYml0cyBmcm9tIHRoZSBzcGVjaWZpZWQgbnVtYmVyLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWVcclxuICogQHJldHVybnMge3V0aWwuTG9uZ0JpdHN9IEluc3RhbmNlXHJcbiAqL1xyXG5Mb25nQml0cy5mcm9tTnVtYmVyID0gZnVuY3Rpb24gZnJvbU51bWJlcih2YWx1ZSkge1xyXG4gICAgaWYgKHZhbHVlID09PSAwKVxyXG4gICAgICAgIHJldHVybiB6ZXJvO1xyXG4gICAgdmFyIHNpZ24gPSB2YWx1ZSA8IDA7XHJcbiAgICBpZiAoc2lnbilcclxuICAgICAgICB2YWx1ZSA9IC12YWx1ZTtcclxuICAgIHZhciBsbyA9IHZhbHVlID4+PiAwLFxyXG4gICAgICAgIGhpID0gKHZhbHVlIC0gbG8pIC8gNDI5NDk2NzI5NiA+Pj4gMDtcclxuICAgIGlmIChzaWduKSB7XHJcbiAgICAgICAgaGkgPSB+aGkgPj4+IDA7XHJcbiAgICAgICAgbG8gPSB+bG8gPj4+IDA7XHJcbiAgICAgICAgaWYgKCsrbG8gPiA0Mjk0OTY3Mjk1KSB7XHJcbiAgICAgICAgICAgIGxvID0gMDtcclxuICAgICAgICAgICAgaWYgKCsraGkgPiA0Mjk0OTY3Mjk1KVxyXG4gICAgICAgICAgICAgICAgaGkgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgTG9uZ0JpdHMobG8sIGhpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIG5ldyBsb25nIGJpdHMgZnJvbSBhIG51bWJlciwgbG9uZyBvciBzdHJpbmcuXHJcbiAqIEBwYXJhbSB7TG9uZ3xudW1iZXJ8c3RyaW5nfSB2YWx1ZSBWYWx1ZVxyXG4gKiBAcmV0dXJucyB7dXRpbC5Mb25nQml0c30gSW5zdGFuY2VcclxuICovXHJcbkxvbmdCaXRzLmZyb20gPSBmdW5jdGlvbiBmcm9tKHZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKVxyXG4gICAgICAgIHJldHVybiBMb25nQml0cy5mcm9tTnVtYmVyKHZhbHVlKTtcclxuICAgIGlmICh1dGlsLmlzU3RyaW5nKHZhbHVlKSkge1xyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXHJcbiAgICAgICAgaWYgKHV0aWwuTG9uZylcclxuICAgICAgICAgICAgdmFsdWUgPSB1dGlsLkxvbmcuZnJvbVN0cmluZyh2YWx1ZSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gTG9uZ0JpdHMuZnJvbU51bWJlcihwYXJzZUludCh2YWx1ZSwgMTApKTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZS5sb3cgfHwgdmFsdWUuaGlnaCA/IG5ldyBMb25nQml0cyh2YWx1ZS5sb3cgPj4+IDAsIHZhbHVlLmhpZ2ggPj4+IDApIDogemVybztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGlzIGxvbmcgYml0cyB0byBhIHBvc3NpYmx5IHVuc2FmZSBKYXZhU2NyaXB0IG51bWJlci5cclxuICogQHBhcmFtIHtib29sZWFufSBbdW5zaWduZWQ9ZmFsc2VdIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFBvc3NpYmx5IHVuc2FmZSBudW1iZXJcclxuICovXHJcbkxvbmdCaXRzLnByb3RvdHlwZS50b051bWJlciA9IGZ1bmN0aW9uIHRvTnVtYmVyKHVuc2lnbmVkKSB7XHJcbiAgICBpZiAoIXVuc2lnbmVkICYmIHRoaXMuaGkgPj4+IDMxKSB7XHJcbiAgICAgICAgdmFyIGxvID0gfnRoaXMubG8gKyAxID4+PiAwLFxyXG4gICAgICAgICAgICBoaSA9IH50aGlzLmhpICAgICA+Pj4gMDtcclxuICAgICAgICBpZiAoIWxvKVxyXG4gICAgICAgICAgICBoaSA9IGhpICsgMSA+Pj4gMDtcclxuICAgICAgICByZXR1cm4gLShsbyArIGhpICogNDI5NDk2NzI5Nik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5sbyArIHRoaXMuaGkgKiA0Mjk0OTY3Mjk2O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoaXMgbG9uZyBiaXRzIHRvIGEgbG9uZy5cclxuICogQHBhcmFtIHtib29sZWFufSBbdW5zaWduZWQ9ZmFsc2VdIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90XHJcbiAqIEByZXR1cm5zIHtMb25nfSBMb25nXHJcbiAqL1xyXG5Mb25nQml0cy5wcm90b3R5cGUudG9Mb25nID0gZnVuY3Rpb24gdG9Mb25nKHVuc2lnbmVkKSB7XHJcbiAgICByZXR1cm4gdXRpbC5Mb25nXHJcbiAgICAgICAgPyBuZXcgdXRpbC5Mb25nKHRoaXMubG8gfCAwLCB0aGlzLmhpIHwgMCwgQm9vbGVhbih1bnNpZ25lZCkpXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICA6IHsgbG93OiB0aGlzLmxvIHwgMCwgaGlnaDogdGhpcy5oaSB8IDAsIHVuc2lnbmVkOiBCb29sZWFuKHVuc2lnbmVkKSB9O1xyXG59O1xyXG5cclxudmFyIGNoYXJDb2RlQXQgPSBTdHJpbmcucHJvdG90eXBlLmNoYXJDb2RlQXQ7XHJcblxyXG4vKipcclxuICogQ29uc3RydWN0cyBuZXcgbG9uZyBiaXRzIGZyb20gdGhlIHNwZWNpZmllZCA4IGNoYXJhY3RlcnMgbG9uZyBoYXNoLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gaGFzaCBIYXNoXHJcbiAqIEByZXR1cm5zIHt1dGlsLkxvbmdCaXRzfSBCaXRzXHJcbiAqL1xyXG5Mb25nQml0cy5mcm9tSGFzaCA9IGZ1bmN0aW9uIGZyb21IYXNoKGhhc2gpIHtcclxuICAgIGlmIChoYXNoID09PSB6ZXJvSGFzaClcclxuICAgICAgICByZXR1cm4gemVybztcclxuICAgIHJldHVybiBuZXcgTG9uZ0JpdHMoXHJcbiAgICAgICAgKCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgMClcclxuICAgICAgICB8IGNoYXJDb2RlQXQuY2FsbChoYXNoLCAxKSA8PCA4XHJcbiAgICAgICAgfCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgMikgPDwgMTZcclxuICAgICAgICB8IGNoYXJDb2RlQXQuY2FsbChoYXNoLCAzKSA8PCAyNCkgPj4+IDBcclxuICAgICxcclxuICAgICAgICAoIGNoYXJDb2RlQXQuY2FsbChoYXNoLCA0KVxyXG4gICAgICAgIHwgY2hhckNvZGVBdC5jYWxsKGhhc2gsIDUpIDw8IDhcclxuICAgICAgICB8IGNoYXJDb2RlQXQuY2FsbChoYXNoLCA2KSA8PCAxNlxyXG4gICAgICAgIHwgY2hhckNvZGVBdC5jYWxsKGhhc2gsIDcpIDw8IDI0KSA+Pj4gMFxyXG4gICAgKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGlzIGxvbmcgYml0cyB0byBhIDggY2hhcmFjdGVycyBsb25nIGhhc2guXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEhhc2hcclxuICovXHJcbkxvbmdCaXRzLnByb3RvdHlwZS50b0hhc2ggPSBmdW5jdGlvbiB0b0hhc2goKSB7XHJcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShcclxuICAgICAgICB0aGlzLmxvICAgICAgICAmIDI1NSxcclxuICAgICAgICB0aGlzLmxvID4+PiA4ICAmIDI1NSxcclxuICAgICAgICB0aGlzLmxvID4+PiAxNiAmIDI1NSxcclxuICAgICAgICB0aGlzLmxvID4+PiAyNCAgICAgICxcclxuICAgICAgICB0aGlzLmhpICAgICAgICAmIDI1NSxcclxuICAgICAgICB0aGlzLmhpID4+PiA4ICAmIDI1NSxcclxuICAgICAgICB0aGlzLmhpID4+PiAxNiAmIDI1NSxcclxuICAgICAgICB0aGlzLmhpID4+PiAyNFxyXG4gICAgKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBaaWctemFnIGVuY29kZXMgdGhpcyBsb25nIGJpdHMuXHJcbiAqIEByZXR1cm5zIHt1dGlsLkxvbmdCaXRzfSBgdGhpc2BcclxuICovXHJcbkxvbmdCaXRzLnByb3RvdHlwZS56ekVuY29kZSA9IGZ1bmN0aW9uIHp6RW5jb2RlKCkge1xyXG4gICAgdmFyIG1hc2sgPSAgIHRoaXMuaGkgPj4gMzE7XHJcbiAgICB0aGlzLmhpICA9ICgodGhpcy5oaSA8PCAxIHwgdGhpcy5sbyA+Pj4gMzEpIF4gbWFzaykgPj4+IDA7XHJcbiAgICB0aGlzLmxvICA9ICggdGhpcy5sbyA8PCAxICAgICAgICAgICAgICAgICAgIF4gbWFzaykgPj4+IDA7XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBaaWctemFnIGRlY29kZXMgdGhpcyBsb25nIGJpdHMuXHJcbiAqIEByZXR1cm5zIHt1dGlsLkxvbmdCaXRzfSBgdGhpc2BcclxuICovXHJcbkxvbmdCaXRzLnByb3RvdHlwZS56ekRlY29kZSA9IGZ1bmN0aW9uIHp6RGVjb2RlKCkge1xyXG4gICAgdmFyIG1hc2sgPSAtKHRoaXMubG8gJiAxKTtcclxuICAgIHRoaXMubG8gID0gKCh0aGlzLmxvID4+PiAxIHwgdGhpcy5oaSA8PCAzMSkgXiBtYXNrKSA+Pj4gMDtcclxuICAgIHRoaXMuaGkgID0gKCB0aGlzLmhpID4+PiAxICAgICAgICAgICAgICAgICAgXiBtYXNrKSA+Pj4gMDtcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCBvZiB0aGlzIGxvbmdiaXRzIHdoZW4gZW5jb2RlZCBhcyBhIHZhcmludC5cclxuICogQHJldHVybnMge251bWJlcn0gTGVuZ3RoXHJcbiAqL1xyXG5Mb25nQml0cy5wcm90b3R5cGUubGVuZ3RoID0gZnVuY3Rpb24gbGVuZ3RoKCkge1xyXG4gICAgdmFyIHBhcnQwID0gIHRoaXMubG8sXHJcbiAgICAgICAgcGFydDEgPSAodGhpcy5sbyA+Pj4gMjggfCB0aGlzLmhpIDw8IDQpID4+PiAwLFxyXG4gICAgICAgIHBhcnQyID0gIHRoaXMuaGkgPj4+IDI0O1xyXG4gICAgcmV0dXJuIHBhcnQyID09PSAwXHJcbiAgICAgICAgID8gcGFydDEgPT09IDBcclxuICAgICAgICAgICA/IHBhcnQwIDwgMTYzODRcclxuICAgICAgICAgICAgID8gcGFydDAgPCAxMjggPyAxIDogMlxyXG4gICAgICAgICAgICAgOiBwYXJ0MCA8IDIwOTcxNTIgPyAzIDogNFxyXG4gICAgICAgICAgIDogcGFydDEgPCAxNjM4NFxyXG4gICAgICAgICAgICAgPyBwYXJ0MSA8IDEyOCA/IDUgOiA2XHJcbiAgICAgICAgICAgICA6IHBhcnQxIDwgMjA5NzE1MiA/IDcgOiA4XHJcbiAgICAgICAgIDogcGFydDIgPCAxMjggPyA5IDogMTA7XHJcbn07XHJcblxyXG59LHtcIjM5XCI6Mzl9XSwzOTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG52YXIgdXRpbCA9IGV4cG9ydHM7XHJcblxyXG4vLyB1c2VkIHRvIHJldHVybiBhIFByb21pc2Ugd2hlcmUgY2FsbGJhY2sgaXMgb21pdHRlZFxyXG51dGlsLmFzUHJvbWlzZSA9IHJlcXVpcmUoMSk7XHJcblxyXG4vLyBjb252ZXJ0cyB0byAvIGZyb20gYmFzZTY0IGVuY29kZWQgc3RyaW5nc1xyXG51dGlsLmJhc2U2NCA9IHJlcXVpcmUoMik7XHJcblxyXG4vLyBiYXNlIGNsYXNzIG9mIHJwYy5TZXJ2aWNlXHJcbnV0aWwuRXZlbnRFbWl0dGVyID0gcmVxdWlyZSg0KTtcclxuXHJcbi8vIGZsb2F0IGhhbmRsaW5nIGFjY3Jvc3MgYnJvd3NlcnNcclxudXRpbC5mbG9hdCA9IHJlcXVpcmUoNik7XHJcblxyXG4vLyByZXF1aXJlcyBtb2R1bGVzIG9wdGlvbmFsbHkgYW5kIGhpZGVzIHRoZSBjYWxsIGZyb20gYnVuZGxlcnNcclxudXRpbC5pbnF1aXJlID0gcmVxdWlyZSg3KTtcclxuXHJcbi8vIGNvbnZlcnRzIHRvIC8gZnJvbSB1dGY4IGVuY29kZWQgc3RyaW5nc1xyXG51dGlsLnV0ZjggPSByZXF1aXJlKDEwKTtcclxuXHJcbi8vIHByb3ZpZGVzIGEgbm9kZS1saWtlIGJ1ZmZlciBwb29sIGluIHRoZSBicm93c2VyXHJcbnV0aWwucG9vbCA9IHJlcXVpcmUoOSk7XHJcblxyXG4vLyB1dGlsaXR5IHRvIHdvcmsgd2l0aCB0aGUgbG93IGFuZCBoaWdoIGJpdHMgb2YgYSA2NCBiaXQgdmFsdWVcclxudXRpbC5Mb25nQml0cyA9IHJlcXVpcmUoMzgpO1xyXG5cclxuLyoqXHJcbiAqIEFuIGltbXVhYmxlIGVtcHR5IGFycmF5LlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAdHlwZSB7QXJyYXkuPCo+fVxyXG4gKiBAY29uc3RcclxuICovXHJcbnV0aWwuZW1wdHlBcnJheSA9IE9iamVjdC5mcmVlemUgPyBPYmplY3QuZnJlZXplKFtdKSA6IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIFtdOyAvLyB1c2VkIG9uIHByb3RvdHlwZXNcclxuXHJcbi8qKlxyXG4gKiBBbiBpbW11dGFibGUgZW1wdHkgb2JqZWN0LlxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKiBAY29uc3RcclxuICovXHJcbnV0aWwuZW1wdHlPYmplY3QgPSBPYmplY3QuZnJlZXplID8gT2JqZWN0LmZyZWV6ZSh7fSkgOiAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyB7fTsgLy8gdXNlZCBvbiBwcm90b3R5cGVzXHJcblxyXG4vKipcclxuICogV2hldGhlciBydW5uaW5nIHdpdGhpbiBub2RlIG9yIG5vdC5cclxuICogQG1lbWJlcm9mIHV0aWxcclxuICogQHR5cGUge2Jvb2xlYW59XHJcbiAqIEBjb25zdFxyXG4gKi9cclxudXRpbC5pc05vZGUgPSBCb29sZWFuKGdsb2JhbC5wcm9jZXNzICYmIGdsb2JhbC5wcm9jZXNzLnZlcnNpb25zICYmIGdsb2JhbC5wcm9jZXNzLnZlcnNpb25zLm5vZGUpO1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYW4gaW50ZWdlci5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgdG8gdGVzdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyXHJcbiAqL1xyXG51dGlsLmlzSW50ZWdlciA9IE51bWJlci5pc0ludGVnZXIgfHwgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmIGlzRmluaXRlKHZhbHVlKSAmJiBNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWU7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhIHN0cmluZy5cclxuICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byB0ZXN0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nXHJcbiAqL1xyXG51dGlsLmlzU3RyaW5nID0gZnVuY3Rpb24gaXNTdHJpbmcodmFsdWUpIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdmFsdWUgaW5zdGFuY2VvZiBTdHJpbmc7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhIG5vbi1udWxsIG9iamVjdC5cclxuICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byB0ZXN0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgdGhlIHZhbHVlIGlzIGEgbm9uLW51bGwgb2JqZWN0XHJcbiAqL1xyXG51dGlsLmlzT2JqZWN0ID0gZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcclxuICAgIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIGEgcHJvcGVydHkgb24gYSBtZXNzYWdlIGlzIGNvbnNpZGVyZWQgdG8gYmUgcHJlc2VudC5cclxuICogVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgdXRpbC5pc1NldH0uXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFBsYWluIG9iamVjdCBvciBtZXNzYWdlIGluc3RhbmNlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wIFByb3BlcnR5IG5hbWVcclxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiBjb25zaWRlcmVkIHRvIGJlIHByZXNlbnQsIG90aGVyd2lzZSBgZmFsc2VgXHJcbiAqL1xyXG51dGlsLmlzc2V0ID1cclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgYSBwcm9wZXJ0eSBvbiBhIG1lc3NhZ2UgaXMgY29uc2lkZXJlZCB0byBiZSBwcmVzZW50LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFBsYWluIG9iamVjdCBvciBtZXNzYWdlIGluc3RhbmNlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wIFByb3BlcnR5IG5hbWVcclxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiBjb25zaWRlcmVkIHRvIGJlIHByZXNlbnQsIG90aGVyd2lzZSBgZmFsc2VgXHJcbiAqL1xyXG51dGlsLmlzU2V0ID0gZnVuY3Rpb24gaXNTZXQob2JqLCBwcm9wKSB7XHJcbiAgICB2YXIgdmFsdWUgPSBvYmpbcHJvcF07XHJcbiAgICBpZiAodmFsdWUgIT0gbnVsbCAmJiBvYmouaGFzT3duUHJvcGVydHkocHJvcCkpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZXFlcWVxLCBuby1wcm90b3R5cGUtYnVpbHRpbnNcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiIHx8IChBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmxlbmd0aCA6IE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGgpID4gMDtcclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBbnkgY29tcGF0aWJsZSBCdWZmZXIgaW5zdGFuY2UuXHJcbiAqIFRoaXMgaXMgYSBtaW5pbWFsIHN0YW5kLWFsb25lIGRlZmluaXRpb24gb2YgYSBCdWZmZXIgaW5zdGFuY2UuIFRoZSBhY3R1YWwgdHlwZSBpcyB0aGF0IGV4cG9ydGVkIGJ5IG5vZGUncyB0eXBpbmdzLlxyXG4gKiBAaW50ZXJmYWNlIEJ1ZmZlclxyXG4gKiBAZXh0ZW5kcyBVaW50OEFycmF5XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIE5vZGUncyBCdWZmZXIgY2xhc3MgaWYgYXZhaWxhYmxlLlxyXG4gKiBAdHlwZSB7Q29uc3RydWN0b3I8QnVmZmVyPn1cclxuICovXHJcbnV0aWwuQnVmZmVyID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB2YXIgQnVmZmVyID0gdXRpbC5pbnF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcjtcclxuICAgICAgICAvLyByZWZ1c2UgdG8gdXNlIG5vbi1ub2RlIGJ1ZmZlcnMgaWYgbm90IGV4cGxpY2l0bHkgYXNzaWduZWQgKHBlcmYgcmVhc29ucyk6XHJcbiAgICAgICAgcmV0dXJuIEJ1ZmZlci5wcm90b3R5cGUudXRmOFdyaXRlID8gQnVmZmVyIDogLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gbnVsbDtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59KSgpO1xyXG5cclxuLy8gSW50ZXJuYWwgYWxpYXMgb2Ygb3IgcG9seWZ1bGwgZm9yIEJ1ZmZlci5mcm9tLlxyXG51dGlsLl9CdWZmZXJfZnJvbSA9IG51bGw7XHJcblxyXG4vLyBJbnRlcm5hbCBhbGlhcyBvZiBvciBwb2x5ZmlsbCBmb3IgQnVmZmVyLmFsbG9jVW5zYWZlLlxyXG51dGlsLl9CdWZmZXJfYWxsb2NVbnNhZmUgPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcgYnVmZmVyIG9mIHdoYXRldmVyIHR5cGUgc3VwcG9ydGVkIGJ5IHRoZSBlbnZpcm9ubWVudC5cclxuICogQHBhcmFtIHtudW1iZXJ8bnVtYmVyW119IFtzaXplT3JBcnJheT0wXSBCdWZmZXIgc2l6ZSBvciBudW1iZXIgYXJyYXlcclxuICogQHJldHVybnMge1VpbnQ4QXJyYXl8QnVmZmVyfSBCdWZmZXJcclxuICovXHJcbnV0aWwubmV3QnVmZmVyID0gZnVuY3Rpb24gbmV3QnVmZmVyKHNpemVPckFycmF5KSB7XHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgcmV0dXJuIHR5cGVvZiBzaXplT3JBcnJheSA9PT0gXCJudW1iZXJcIlxyXG4gICAgICAgID8gdXRpbC5CdWZmZXJcclxuICAgICAgICAgICAgPyB1dGlsLl9CdWZmZXJfYWxsb2NVbnNhZmUoc2l6ZU9yQXJyYXkpXHJcbiAgICAgICAgICAgIDogbmV3IHV0aWwuQXJyYXkoc2l6ZU9yQXJyYXkpXHJcbiAgICAgICAgOiB1dGlsLkJ1ZmZlclxyXG4gICAgICAgICAgICA/IHV0aWwuX0J1ZmZlcl9mcm9tKHNpemVPckFycmF5KVxyXG4gICAgICAgICAgICA6IHR5cGVvZiBVaW50OEFycmF5ID09PSBcInVuZGVmaW5lZFwiXHJcbiAgICAgICAgICAgICAgICA/IHNpemVPckFycmF5XHJcbiAgICAgICAgICAgICAgICA6IG5ldyBVaW50OEFycmF5KHNpemVPckFycmF5KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBcnJheSBpbXBsZW1lbnRhdGlvbiB1c2VkIGluIHRoZSBicm93c2VyLiBgVWludDhBcnJheWAgaWYgc3VwcG9ydGVkLCBvdGhlcndpc2UgYEFycmF5YC5cclxuICogQHR5cGUge0NvbnN0cnVjdG9yPFVpbnQ4QXJyYXk+fVxyXG4gKi9cclxudXRpbC5BcnJheSA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSBcInVuZGVmaW5lZFwiID8gVWludDhBcnJheSAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyA6IEFycmF5O1xyXG5cclxuLyoqXHJcbiAqIEFueSBjb21wYXRpYmxlIExvbmcgaW5zdGFuY2UuXHJcbiAqIFRoaXMgaXMgYSBtaW5pbWFsIHN0YW5kLWFsb25lIGRlZmluaXRpb24gb2YgYSBMb25nIGluc3RhbmNlLiBUaGUgYWN0dWFsIHR5cGUgaXMgdGhhdCBleHBvcnRlZCBieSBsb25nLmpzLlxyXG4gKiBAaW50ZXJmYWNlIExvbmdcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IGxvdyBMb3cgYml0c1xyXG4gKiBAcHJvcGVydHkge251bWJlcn0gaGlnaCBIaWdoIGJpdHNcclxuICogQHByb3BlcnR5IHtib29sZWFufSB1bnNpZ25lZCBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBMb25nLmpzJ3MgTG9uZyBjbGFzcyBpZiBhdmFpbGFibGUuXHJcbiAqIEB0eXBlIHtDb25zdHJ1Y3RvcjxMb25nPn1cclxuICovXHJcbnV0aWwuTG9uZyA9IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIGdsb2JhbC5kY29kZUlPICYmIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIGdsb2JhbC5kY29kZUlPLkxvbmcgfHwgdXRpbC5pbnF1aXJlKFwibG9uZ1wiKTtcclxuXHJcbi8qKlxyXG4gKiBSZWd1bGFyIGV4cHJlc3Npb24gdXNlZCB0byB2ZXJpZnkgMiBiaXQgKGBib29sYCkgbWFwIGtleXMuXHJcbiAqIEB0eXBlIHtSZWdFeHB9XHJcbiAqIEBjb25zdFxyXG4gKi9cclxudXRpbC5rZXkyUmUgPSAvXnRydWV8ZmFsc2V8MHwxJC87XHJcblxyXG4vKipcclxuICogUmVndWxhciBleHByZXNzaW9uIHVzZWQgdG8gdmVyaWZ5IDMyIGJpdCAoYGludDMyYCBldGMuKSBtYXAga2V5cy5cclxuICogQHR5cGUge1JlZ0V4cH1cclxuICogQGNvbnN0XHJcbiAqL1xyXG51dGlsLmtleTMyUmUgPSAvXi0/KD86MHxbMS05XVswLTldKikkLztcclxuXHJcbi8qKlxyXG4gKiBSZWd1bGFyIGV4cHJlc3Npb24gdXNlZCB0byB2ZXJpZnkgNjQgYml0IChgaW50NjRgIGV0Yy4pIG1hcCBrZXlzLlxyXG4gKiBAdHlwZSB7UmVnRXhwfVxyXG4gKiBAY29uc3RcclxuICovXHJcbnV0aWwua2V5NjRSZSA9IC9eKD86W1xcXFx4MDAtXFxcXHhmZl17OH18LT8oPzowfFsxLTldWzAtOV0qKSkkLztcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBhIG51bWJlciBvciBsb25nIHRvIGFuIDggY2hhcmFjdGVycyBsb25nIGhhc2ggc3RyaW5nLlxyXG4gKiBAcGFyYW0ge0xvbmd8bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byBjb252ZXJ0XHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEhhc2hcclxuICovXHJcbnV0aWwubG9uZ1RvSGFzaCA9IGZ1bmN0aW9uIGxvbmdUb0hhc2godmFsdWUpIHtcclxuICAgIHJldHVybiB2YWx1ZVxyXG4gICAgICAgID8gdXRpbC5Mb25nQml0cy5mcm9tKHZhbHVlKS50b0hhc2goKVxyXG4gICAgICAgIDogdXRpbC5Mb25nQml0cy56ZXJvSGFzaDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBhbiA4IGNoYXJhY3RlcnMgbG9uZyBoYXNoIHN0cmluZyB0byBhIGxvbmcgb3IgbnVtYmVyLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gaGFzaCBIYXNoXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Vuc2lnbmVkPWZhbHNlXSBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdFxyXG4gKiBAcmV0dXJucyB7TG9uZ3xudW1iZXJ9IE9yaWdpbmFsIHZhbHVlXHJcbiAqL1xyXG51dGlsLmxvbmdGcm9tSGFzaCA9IGZ1bmN0aW9uIGxvbmdGcm9tSGFzaChoYXNoLCB1bnNpZ25lZCkge1xyXG4gICAgdmFyIGJpdHMgPSB1dGlsLkxvbmdCaXRzLmZyb21IYXNoKGhhc2gpO1xyXG4gICAgaWYgKHV0aWwuTG9uZylcclxuICAgICAgICByZXR1cm4gdXRpbC5Mb25nLmZyb21CaXRzKGJpdHMubG8sIGJpdHMuaGksIHVuc2lnbmVkKTtcclxuICAgIHJldHVybiBiaXRzLnRvTnVtYmVyKEJvb2xlYW4odW5zaWduZWQpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBNZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgdGhlIHNvdXJjZSBvYmplY3QgaW50byB0aGUgZGVzdGluYXRpb24gb2JqZWN0LlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBkc3QgRGVzdGluYXRpb24gb2JqZWN0XHJcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IHNyYyBTb3VyY2Ugb2JqZWN0XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lmTm90U2V0PWZhbHNlXSBNZXJnZXMgb25seSBpZiB0aGUga2V5IGlzIG5vdCBhbHJlYWR5IHNldFxyXG4gKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IERlc3RpbmF0aW9uIG9iamVjdFxyXG4gKi9cclxuZnVuY3Rpb24gbWVyZ2UoZHN0LCBzcmMsIGlmTm90U2V0KSB7IC8vIHVzZWQgYnkgY29udmVydGVyc1xyXG4gICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHNyYyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcclxuICAgICAgICBpZiAoZHN0W2tleXNbaV1dID09PSB1bmRlZmluZWQgfHwgIWlmTm90U2V0KVxyXG4gICAgICAgICAgICBkc3Rba2V5c1tpXV0gPSBzcmNba2V5c1tpXV07XHJcbiAgICByZXR1cm4gZHN0O1xyXG59XHJcblxyXG51dGlsLm1lcmdlID0gbWVyZ2U7XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhlIGZpcnN0IGNoYXJhY3RlciBvZiBhIHN0cmluZyB0byBsb3dlciBjYXNlLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFN0cmluZyB0byBjb252ZXJ0XHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IENvbnZlcnRlZCBzdHJpbmdcclxuICovXHJcbnV0aWwubGNGaXJzdCA9IGZ1bmN0aW9uIGxjRmlyc3Qoc3RyKSB7XHJcbiAgICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgc3RyLnN1YnN0cmluZygxKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgY3VzdG9tIGVycm9yIGNvbnN0cnVjdG9yLlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBFcnJvciBuYW1lXHJcbiAqIEByZXR1cm5zIHtDb25zdHJ1Y3RvcjxFcnJvcj59IEN1c3RvbSBlcnJvciBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gbmV3RXJyb3IobmFtZSkge1xyXG5cclxuICAgIGZ1bmN0aW9uIEN1c3RvbUVycm9yKG1lc3NhZ2UsIHByb3BlcnRpZXMpIHtcclxuXHJcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEN1c3RvbUVycm9yKSlcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDdXN0b21FcnJvcihtZXNzYWdlLCBwcm9wZXJ0aWVzKTtcclxuXHJcbiAgICAgICAgLy8gRXJyb3IuY2FsbCh0aGlzLCBtZXNzYWdlKTtcclxuICAgICAgICAvLyBeIGp1c3QgcmV0dXJucyBhIG5ldyBlcnJvciBpbnN0YW5jZSBiZWNhdXNlIHRoZSBjdG9yIGNhbiBiZSBjYWxsZWQgYXMgYSBmdW5jdGlvblxyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJtZXNzYWdlXCIsIHsgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1lc3NhZ2U7IH0gfSk7XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSAvLyBub2RlXHJcbiAgICAgICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIEN1c3RvbUVycm9yKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInN0YWNrXCIsIHsgdmFsdWU6IChuZXcgRXJyb3IoKSkuc3RhY2sgfHwgXCJcIiB9KTtcclxuXHJcbiAgICAgICAgaWYgKHByb3BlcnRpZXMpXHJcbiAgICAgICAgICAgIG1lcmdlKHRoaXMsIHByb3BlcnRpZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIChDdXN0b21FcnJvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yID0gQ3VzdG9tRXJyb3I7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEN1c3RvbUVycm9yLnByb3RvdHlwZSwgXCJuYW1lXCIsIHsgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG5hbWU7IH0gfSk7XHJcblxyXG4gICAgQ3VzdG9tRXJyb3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZSArIFwiOiBcIiArIHRoaXMubWVzc2FnZTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIEN1c3RvbUVycm9yO1xyXG59XHJcblxyXG51dGlsLm5ld0Vycm9yID0gbmV3RXJyb3I7XHJcblxyXG4vKipcclxuICogQ29uc3RydWN0cyBhIG5ldyBwcm90b2NvbCBlcnJvci5cclxuICogQGNsYXNzZGVzYyBFcnJvciBzdWJjbGFzcyBpbmRpY2F0aW5nIGEgcHJvdG9jb2wgc3BlY2lmYyBlcnJvci5cclxuICogQG1lbWJlcm9mIHV0aWxcclxuICogQGV4dGVuZHMgRXJyb3JcclxuICogQHRlbXBsYXRlIFQgZXh0ZW5kcyBNZXNzYWdlPFQ+XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBFcnJvciBtZXNzYWdlXHJcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IFtwcm9wZXJ0aWVzXSBBZGRpdGlvbmFsIHByb3BlcnRpZXNcclxuICogQGV4YW1wbGVcclxuICogdHJ5IHtcclxuICogICAgIE15TWVzc2FnZS5kZWNvZGUoc29tZUJ1ZmZlcik7IC8vIHRocm93cyBpZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcclxuICogfSBjYXRjaCAoZSkge1xyXG4gKiAgICAgaWYgKGUgaW5zdGFuY2VvZiBQcm90b2NvbEVycm9yICYmIGUuaW5zdGFuY2UpXHJcbiAqICAgICAgICAgY29uc29sZS5sb2coXCJkZWNvZGVkIHNvIGZhcjogXCIgKyBKU09OLnN0cmluZ2lmeShlLmluc3RhbmNlKSk7XHJcbiAqIH1cclxuICovXHJcbnV0aWwuUHJvdG9jb2xFcnJvciA9IG5ld0Vycm9yKFwiUHJvdG9jb2xFcnJvclwiKTtcclxuXHJcbi8qKlxyXG4gKiBTbyBmYXIgZGVjb2RlZCBtZXNzYWdlIGluc3RhbmNlLlxyXG4gKiBAbmFtZSB1dGlsLlByb3RvY29sRXJyb3IjaW5zdGFuY2VcclxuICogQHR5cGUge01lc3NhZ2U8VD59XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEEgT25lT2YgZ2V0dGVyIGFzIHJldHVybmVkIGJ5IHtAbGluayB1dGlsLm9uZU9mR2V0dGVyfS5cclxuICogQHR5cGVkZWYgT25lT2ZHZXR0ZXJcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfHVuZGVmaW5lZH0gU2V0IGZpZWxkIG5hbWUsIGlmIGFueVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBCdWlsZHMgYSBnZXR0ZXIgZm9yIGEgb25lb2YncyBwcmVzZW50IGZpZWxkIG5hbWUuXHJcbiAqIEBwYXJhbSB7c3RyaW5nW119IGZpZWxkTmFtZXMgRmllbGQgbmFtZXNcclxuICogQHJldHVybnMge09uZU9mR2V0dGVyfSBVbmJvdW5kIGdldHRlclxyXG4gKi9cclxudXRpbC5vbmVPZkdldHRlciA9IGZ1bmN0aW9uIGdldE9uZU9mKGZpZWxkTmFtZXMpIHtcclxuICAgIHZhciBmaWVsZE1hcCA9IHt9O1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZE5hbWVzLmxlbmd0aDsgKytpKVxyXG4gICAgICAgIGZpZWxkTWFwW2ZpZWxkTmFtZXNbaV1dID0gMTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8dW5kZWZpbmVkfSBTZXQgZmllbGQgbmFtZSwgaWYgYW55XHJcbiAgICAgKiBAdGhpcyBPYmplY3RcclxuICAgICAqIEBpZ25vcmVcclxuICAgICAqL1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXHJcbiAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpLCBpID0ga2V5cy5sZW5ndGggLSAxOyBpID4gLTE7IC0taSlcclxuICAgICAgICAgICAgaWYgKGZpZWxkTWFwW2tleXNbaV1dID09PSAxICYmIHRoaXNba2V5c1tpXV0gIT09IHVuZGVmaW5lZCAmJiB0aGlzW2tleXNbaV1dICE9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleXNbaV07XHJcbiAgICB9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEEgT25lT2Ygc2V0dGVyIGFzIHJldHVybmVkIGJ5IHtAbGluayB1dGlsLm9uZU9mU2V0dGVyfS5cclxuICogQHR5cGVkZWYgT25lT2ZTZXR0ZXJcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKiBAcGFyYW0ge3N0cmluZ3x1bmRlZmluZWR9IHZhbHVlIEZpZWxkIG5hbWVcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblxyXG4vKipcclxuICogQnVpbGRzIGEgc2V0dGVyIGZvciBhIG9uZW9mJ3MgcHJlc2VudCBmaWVsZCBuYW1lLlxyXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBmaWVsZE5hbWVzIEZpZWxkIG5hbWVzXHJcbiAqIEByZXR1cm5zIHtPbmVPZlNldHRlcn0gVW5ib3VuZCBzZXR0ZXJcclxuICovXHJcbnV0aWwub25lT2ZTZXR0ZXIgPSBmdW5jdGlvbiBzZXRPbmVPZihmaWVsZE5hbWVzKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBGaWVsZCBuYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gICAgICogQHRoaXMgT2JqZWN0XHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKi9cclxuICAgIHJldHVybiBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZE5hbWVzLmxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgICBpZiAoZmllbGROYW1lc1tpXSAhPT0gbmFtZSlcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzW2ZpZWxkTmFtZXNbaV1dO1xyXG4gICAgfTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEZWZhdWx0IGNvbnZlcnNpb24gb3B0aW9ucyB1c2VkIGZvciB7QGxpbmsgTWVzc2FnZSN0b0pTT059IGltcGxlbWVudGF0aW9ucy5cclxuICpcclxuICogVGhlc2Ugb3B0aW9ucyBhcmUgY2xvc2UgdG8gcHJvdG8zJ3MgSlNPTiBtYXBwaW5nIHdpdGggdGhlIGV4Y2VwdGlvbiB0aGF0IGludGVybmFsIHR5cGVzIGxpa2UgQW55IGFyZSBoYW5kbGVkIGp1c3QgbGlrZSBtZXNzYWdlcy4gTW9yZSBwcmVjaXNlbHk6XHJcbiAqXHJcbiAqIC0gTG9uZ3MgYmVjb21lIHN0cmluZ3NcclxuICogLSBFbnVtcyBiZWNvbWUgc3RyaW5nIGtleXNcclxuICogLSBCeXRlcyBiZWNvbWUgYmFzZTY0IGVuY29kZWQgc3RyaW5nc1xyXG4gKiAtIChTdWItKU1lc3NhZ2VzIGJlY29tZSBwbGFpbiBvYmplY3RzXHJcbiAqIC0gTWFwcyBiZWNvbWUgcGxhaW4gb2JqZWN0cyB3aXRoIGFsbCBzdHJpbmcga2V5c1xyXG4gKiAtIFJlcGVhdGVkIGZpZWxkcyBiZWNvbWUgYXJyYXlzXHJcbiAqIC0gTmFOIGFuZCBJbmZpbml0eSBmb3IgZmxvYXQgYW5kIGRvdWJsZSBmaWVsZHMgYmVjb21lIHN0cmluZ3NcclxuICpcclxuICogQHR5cGUge0lDb252ZXJzaW9uT3B0aW9uc31cclxuICogQHNlZSBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9wcm90b2NvbC1idWZmZXJzL2RvY3MvcHJvdG8zP2hsPWVuI2pzb25cclxuICovXHJcbnV0aWwudG9KU09OT3B0aW9ucyA9IHtcclxuICAgIGxvbmdzOiBTdHJpbmcsXHJcbiAgICBlbnVtczogU3RyaW5nLFxyXG4gICAgYnl0ZXM6IFN0cmluZyxcclxuICAgIGpzb246IHRydWVcclxufTtcclxuXHJcbnV0aWwuX2NvbmZpZ3VyZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIEJ1ZmZlciA9IHV0aWwuQnVmZmVyO1xyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICBpZiAoIUJ1ZmZlcikge1xyXG4gICAgICAgIHV0aWwuX0J1ZmZlcl9mcm9tID0gdXRpbC5fQnVmZmVyX2FsbG9jVW5zYWZlID0gbnVsbDtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICAvLyBiZWNhdXNlIG5vZGUgNC54IGJ1ZmZlcnMgYXJlIGluY29tcGF0aWJsZSAmIGltbXV0YWJsZVxyXG4gICAgLy8gc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGNvZGVJTy9wcm90b2J1Zi5qcy9wdWxsLzY2NVxyXG4gICAgdXRpbC5fQnVmZmVyX2Zyb20gPSBCdWZmZXIuZnJvbSAhPT0gVWludDhBcnJheS5mcm9tICYmIEJ1ZmZlci5mcm9tIHx8XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBmdW5jdGlvbiBCdWZmZXJfZnJvbSh2YWx1ZSwgZW5jb2RpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBCdWZmZXIodmFsdWUsIGVuY29kaW5nKTtcclxuICAgICAgICB9O1xyXG4gICAgdXRpbC5fQnVmZmVyX2FsbG9jVW5zYWZlID0gQnVmZmVyLmFsbG9jVW5zYWZlIHx8XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBmdW5jdGlvbiBCdWZmZXJfYWxsb2NVbnNhZmUoc2l6ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEJ1ZmZlcihzaXplKTtcclxuICAgICAgICB9O1xyXG59O1xyXG5cclxufSx7XCIxXCI6MSxcIjEwXCI6MTAsXCIyXCI6MixcIjM4XCI6MzgsXCI0XCI6NCxcIjZcIjo2LFwiN1wiOjcsXCI5XCI6OX1dLDQwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gdmVyaWZpZXI7XHJcblxyXG52YXIgRW51bSAgICAgID0gcmVxdWlyZSgxNSksXHJcbiAgICB1dGlsICAgICAgPSByZXF1aXJlKDM3KTtcclxuXHJcbmZ1bmN0aW9uIGludmFsaWQoZmllbGQsIGV4cGVjdGVkKSB7XHJcbiAgICByZXR1cm4gZmllbGQubmFtZSArIFwiOiBcIiArIGV4cGVjdGVkICsgKGZpZWxkLnJlcGVhdGVkICYmIGV4cGVjdGVkICE9PSBcImFycmF5XCIgPyBcIltdXCIgOiBmaWVsZC5tYXAgJiYgZXhwZWN0ZWQgIT09IFwib2JqZWN0XCIgPyBcIntrOlwiK2ZpZWxkLmtleVR5cGUrXCJ9XCIgOiBcIlwiKSArIFwiIGV4cGVjdGVkXCI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYSBwYXJ0aWFsIHZhbHVlIHZlcmlmaWVyLlxyXG4gKiBAcGFyYW0ge0NvZGVnZW59IGdlbiBDb2RlZ2VuIGluc3RhbmNlXHJcbiAqIEBwYXJhbSB7RmllbGR9IGZpZWxkIFJlZmxlY3RlZCBmaWVsZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gZmllbGRJbmRleCBGaWVsZCBpbmRleFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVmIFZhcmlhYmxlIHJlZmVyZW5jZVxyXG4gKiBAcmV0dXJucyB7Q29kZWdlbn0gQ29kZWdlbiBpbnN0YW5jZVxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5mdW5jdGlvbiBnZW5WZXJpZnlWYWx1ZShnZW4sIGZpZWxkLCBmaWVsZEluZGV4LCByZWYpIHtcclxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZXhwZWN0ZWQtbXVsdGlsaW5lICovXHJcbiAgICBpZiAoZmllbGQucmVzb2x2ZWRUeXBlKSB7XHJcbiAgICAgICAgaWYgKGZpZWxkLnJlc29sdmVkVHlwZSBpbnN0YW5jZW9mIEVudW0pIHsgZ2VuXHJcbiAgICAgICAgICAgIChcInN3aXRjaCglcyl7XCIsIHJlZilcclxuICAgICAgICAgICAgICAgIChcImRlZmF1bHQ6XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgKFwicmV0dXJuJWpcIiwgaW52YWxpZChmaWVsZCwgXCJlbnVtIHZhbHVlXCIpKTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKGZpZWxkLnJlc29sdmVkVHlwZS52YWx1ZXMpLCBqID0gMDsgaiA8IGtleXMubGVuZ3RoOyArK2opIGdlblxyXG4gICAgICAgICAgICAgICAgKFwiY2FzZSAlaTpcIiwgZmllbGQucmVzb2x2ZWRUeXBlLnZhbHVlc1trZXlzW2pdXSk7XHJcbiAgICAgICAgICAgIGdlblxyXG4gICAgICAgICAgICAgICAgICAgIChcImJyZWFrXCIpXHJcbiAgICAgICAgICAgIChcIn1cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ2VuXHJcbiAgICAgICAgICAgIChcIntcIilcclxuICAgICAgICAgICAgICAgIChcInZhciBlPXR5cGVzWyVpXS52ZXJpZnkoJXMpO1wiLCBmaWVsZEluZGV4LCByZWYpXHJcbiAgICAgICAgICAgICAgICAoXCJpZihlKVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIChcInJldHVybiVqK2VcIiwgZmllbGQubmFtZSArIFwiLlwiKVxyXG4gICAgICAgICAgICAoXCJ9XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3dpdGNoIChmaWVsZC50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJpbnQzMlwiOlxyXG4gICAgICAgICAgICBjYXNlIFwidWludDMyXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJzaW50MzJcIjpcclxuICAgICAgICAgICAgY2FzZSBcImZpeGVkMzJcIjpcclxuICAgICAgICAgICAgY2FzZSBcInNmaXhlZDMyXCI6IGdlblxyXG4gICAgICAgICAgICAgICAgKFwiaWYoIXV0aWwuaXNJbnRlZ2VyKCVzKSlcIiwgcmVmKVxyXG4gICAgICAgICAgICAgICAgICAgIChcInJldHVybiVqXCIsIGludmFsaWQoZmllbGQsIFwiaW50ZWdlclwiKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImludDY0XCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJ1aW50NjRcIjpcclxuICAgICAgICAgICAgY2FzZSBcInNpbnQ2NFwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiZml4ZWQ2NFwiOlxyXG4gICAgICAgICAgICBjYXNlIFwic2ZpeGVkNjRcIjogZ2VuXHJcbiAgICAgICAgICAgICAgICAoXCJpZighdXRpbC5pc0ludGVnZXIoJXMpJiYhKCVzJiZ1dGlsLmlzSW50ZWdlciglcy5sb3cpJiZ1dGlsLmlzSW50ZWdlciglcy5oaWdoKSkpXCIsIHJlZiwgcmVmLCByZWYsIHJlZilcclxuICAgICAgICAgICAgICAgICAgICAoXCJyZXR1cm4lalwiLCBpbnZhbGlkKGZpZWxkLCBcImludGVnZXJ8TG9uZ1wiKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImZsb2F0XCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJkb3VibGVcIjogZ2VuXHJcbiAgICAgICAgICAgICAgICAoXCJpZih0eXBlb2YgJXMhPT1cXFwibnVtYmVyXFxcIilcIiwgcmVmKVxyXG4gICAgICAgICAgICAgICAgICAgIChcInJldHVybiVqXCIsIGludmFsaWQoZmllbGQsIFwibnVtYmVyXCIpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYm9vbFwiOiBnZW5cclxuICAgICAgICAgICAgICAgIChcImlmKHR5cGVvZiAlcyE9PVxcXCJib29sZWFuXFxcIilcIiwgcmVmKVxyXG4gICAgICAgICAgICAgICAgICAgIChcInJldHVybiVqXCIsIGludmFsaWQoZmllbGQsIFwiYm9vbGVhblwiKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOiBnZW5cclxuICAgICAgICAgICAgICAgIChcImlmKCF1dGlsLmlzU3RyaW5nKCVzKSlcIiwgcmVmKVxyXG4gICAgICAgICAgICAgICAgICAgIChcInJldHVybiVqXCIsIGludmFsaWQoZmllbGQsIFwic3RyaW5nXCIpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnl0ZXNcIjogZ2VuXHJcbiAgICAgICAgICAgICAgICAoXCJpZighKCVzJiZ0eXBlb2YgJXMubGVuZ3RoPT09XFxcIm51bWJlclxcXCJ8fHV0aWwuaXNTdHJpbmcoJXMpKSlcIiwgcmVmLCByZWYsIHJlZilcclxuICAgICAgICAgICAgICAgICAgICAoXCJyZXR1cm4lalwiLCBpbnZhbGlkKGZpZWxkLCBcImJ1ZmZlclwiKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ2VuO1xyXG4gICAgLyogZXNsaW50LWVuYWJsZSBuby11bmV4cGVjdGVkLW11bHRpbGluZSAqL1xyXG59XHJcblxyXG4vKipcclxuICogR2VuZXJhdGVzIGEgcGFydGlhbCBrZXkgdmVyaWZpZXIuXHJcbiAqIEBwYXJhbSB7Q29kZWdlbn0gZ2VuIENvZGVnZW4gaW5zdGFuY2VcclxuICogQHBhcmFtIHtGaWVsZH0gZmllbGQgUmVmbGVjdGVkIGZpZWxkXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWYgVmFyaWFibGUgcmVmZXJlbmNlXHJcbiAqIEByZXR1cm5zIHtDb2RlZ2VufSBDb2RlZ2VuIGluc3RhbmNlXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmZ1bmN0aW9uIGdlblZlcmlmeUtleShnZW4sIGZpZWxkLCByZWYpIHtcclxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZXhwZWN0ZWQtbXVsdGlsaW5lICovXHJcbiAgICBzd2l0Y2ggKGZpZWxkLmtleVR5cGUpIHtcclxuICAgICAgICBjYXNlIFwiaW50MzJcIjpcclxuICAgICAgICBjYXNlIFwidWludDMyXCI6XHJcbiAgICAgICAgY2FzZSBcInNpbnQzMlwiOlxyXG4gICAgICAgIGNhc2UgXCJmaXhlZDMyXCI6XHJcbiAgICAgICAgY2FzZSBcInNmaXhlZDMyXCI6IGdlblxyXG4gICAgICAgICAgICAoXCJpZighdXRpbC5rZXkzMlJlLnRlc3QoJXMpKVwiLCByZWYpXHJcbiAgICAgICAgICAgICAgICAoXCJyZXR1cm4lalwiLCBpbnZhbGlkKGZpZWxkLCBcImludGVnZXIga2V5XCIpKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImludDY0XCI6XHJcbiAgICAgICAgY2FzZSBcInVpbnQ2NFwiOlxyXG4gICAgICAgIGNhc2UgXCJzaW50NjRcIjpcclxuICAgICAgICBjYXNlIFwiZml4ZWQ2NFwiOlxyXG4gICAgICAgIGNhc2UgXCJzZml4ZWQ2NFwiOiBnZW5cclxuICAgICAgICAgICAgKFwiaWYoIXV0aWwua2V5NjRSZS50ZXN0KCVzKSlcIiwgcmVmKSAvLyBzZWUgY29tbWVudCBhYm92ZTogeCBpcyBvaywgZCBpcyBub3RcclxuICAgICAgICAgICAgICAgIChcInJldHVybiVqXCIsIGludmFsaWQoZmllbGQsIFwiaW50ZWdlcnxMb25nIGtleVwiKSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJib29sXCI6IGdlblxyXG4gICAgICAgICAgICAoXCJpZighdXRpbC5rZXkyUmUudGVzdCglcykpXCIsIHJlZilcclxuICAgICAgICAgICAgICAgIChcInJldHVybiVqXCIsIGludmFsaWQoZmllbGQsIFwiYm9vbGVhbiBrZXlcIikpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHJldHVybiBnZW47XHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXVuZXhwZWN0ZWQtbXVsdGlsaW5lICovXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYSB2ZXJpZmllciBzcGVjaWZpYyB0byB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UgdHlwZS5cclxuICogQHBhcmFtIHtUeXBlfSBtdHlwZSBNZXNzYWdlIHR5cGVcclxuICogQHJldHVybnMge0NvZGVnZW59IENvZGVnZW4gaW5zdGFuY2VcclxuICovXHJcbmZ1bmN0aW9uIHZlcmlmaWVyKG10eXBlKSB7XHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmV4cGVjdGVkLW11bHRpbGluZSAqL1xyXG5cclxuICAgIHZhciBnZW4gPSB1dGlsLmNvZGVnZW4oW1wibVwiXSwgbXR5cGUubmFtZSArIFwiJHZlcmlmeVwiKVxyXG4gICAgKFwiaWYodHlwZW9mIG0hPT1cXFwib2JqZWN0XFxcInx8bT09PW51bGwpXCIpXHJcbiAgICAgICAgKFwicmV0dXJuJWpcIiwgXCJvYmplY3QgZXhwZWN0ZWRcIik7XHJcbiAgICB2YXIgb25lb2ZzID0gbXR5cGUub25lb2ZzQXJyYXksXHJcbiAgICAgICAgc2VlbkZpcnN0RmllbGQgPSB7fTtcclxuICAgIGlmIChvbmVvZnMubGVuZ3RoKSBnZW5cclxuICAgIChcInZhciBwPXt9XCIpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgLyogaW5pdGlhbGl6ZXMgKi8gbXR5cGUuZmllbGRzQXJyYXkubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICB2YXIgZmllbGQgPSBtdHlwZS5fZmllbGRzQXJyYXlbaV0ucmVzb2x2ZSgpLFxyXG4gICAgICAgICAgICByZWYgICA9IFwibVwiICsgdXRpbC5zYWZlUHJvcChmaWVsZC5uYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKGZpZWxkLm9wdGlvbmFsKSBnZW5cclxuICAgICAgICAoXCJpZiglcyE9bnVsbCYmbS5oYXNPd25Qcm9wZXJ0eSglaikpe1wiLCByZWYsIGZpZWxkLm5hbWUpOyAvLyAhPT0gdW5kZWZpbmVkICYmICE9PSBudWxsXHJcblxyXG4gICAgICAgIC8vIG1hcCBmaWVsZHNcclxuICAgICAgICBpZiAoZmllbGQubWFwKSB7IGdlblxyXG4gICAgICAgICAgICAoXCJpZighdXRpbC5pc09iamVjdCglcykpXCIsIHJlZilcclxuICAgICAgICAgICAgICAgIChcInJldHVybiVqXCIsIGludmFsaWQoZmllbGQsIFwib2JqZWN0XCIpKVxyXG4gICAgICAgICAgICAoXCJ2YXIgaz1PYmplY3Qua2V5cyglcylcIiwgcmVmKVxyXG4gICAgICAgICAgICAoXCJmb3IodmFyIGk9MDtpPGsubGVuZ3RoOysraSl7XCIpO1xyXG4gICAgICAgICAgICAgICAgZ2VuVmVyaWZ5S2V5KGdlbiwgZmllbGQsIFwia1tpXVwiKTtcclxuICAgICAgICAgICAgICAgIGdlblZlcmlmeVZhbHVlKGdlbiwgZmllbGQsIGksIHJlZiArIFwiW2tbaV1dXCIpXHJcbiAgICAgICAgICAgIChcIn1cIik7XHJcblxyXG4gICAgICAgIC8vIHJlcGVhdGVkIGZpZWxkc1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZmllbGQucmVwZWF0ZWQpIHsgZ2VuXHJcbiAgICAgICAgICAgIChcImlmKCFBcnJheS5pc0FycmF5KCVzKSlcIiwgcmVmKVxyXG4gICAgICAgICAgICAgICAgKFwicmV0dXJuJWpcIiwgaW52YWxpZChmaWVsZCwgXCJhcnJheVwiKSlcclxuICAgICAgICAgICAgKFwiZm9yKHZhciBpPTA7aTwlcy5sZW5ndGg7KytpKXtcIiwgcmVmKTtcclxuICAgICAgICAgICAgICAgIGdlblZlcmlmeVZhbHVlKGdlbiwgZmllbGQsIGksIHJlZiArIFwiW2ldXCIpXHJcbiAgICAgICAgICAgIChcIn1cIik7XHJcblxyXG4gICAgICAgIC8vIHJlcXVpcmVkIG9yIHByZXNlbnQgZmllbGRzXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGZpZWxkLnBhcnRPZikge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9uZW9mUHJvcCA9IHV0aWwuc2FmZVByb3AoZmllbGQucGFydE9mLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlZW5GaXJzdEZpZWxkW2ZpZWxkLnBhcnRPZi5uYW1lXSA9PT0gMSkgZ2VuXHJcbiAgICAgICAgICAgIChcImlmKHAlcz09PTEpXCIsIG9uZW9mUHJvcClcclxuICAgICAgICAgICAgICAgIChcInJldHVybiVqXCIsIGZpZWxkLnBhcnRPZi5uYW1lICsgXCI6IG11bHRpcGxlIHZhbHVlc1wiKTtcclxuICAgICAgICAgICAgICAgIHNlZW5GaXJzdEZpZWxkW2ZpZWxkLnBhcnRPZi5uYW1lXSA9IDE7XHJcbiAgICAgICAgICAgICAgICBnZW5cclxuICAgICAgICAgICAgKFwicCVzPTFcIiwgb25lb2ZQcm9wKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZW5WZXJpZnlWYWx1ZShnZW4sIGZpZWxkLCBpLCByZWYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZmllbGQub3B0aW9uYWwpIGdlblxyXG4gICAgICAgIChcIn1cIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ2VuXHJcbiAgICAoXCJyZXR1cm4gbnVsbFwiKTtcclxuICAgIC8qIGVzbGludC1lbmFibGUgbm8tdW5leHBlY3RlZC1tdWx0aWxpbmUgKi9cclxufVxyXG59LHtcIjE1XCI6MTUsXCIzN1wiOjM3fV0sNDE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qKlxyXG4gKiBXcmFwcGVycyBmb3IgY29tbW9uIHR5cGVzLlxyXG4gKiBAdHlwZSB7T2JqZWN0LjxzdHJpbmcsSVdyYXBwZXI+fVxyXG4gKiBAY29uc3RcclxuICovXHJcbnZhciB3cmFwcGVycyA9IGV4cG9ydHM7XHJcblxyXG52YXIgTWVzc2FnZSA9IHJlcXVpcmUoMjEpO1xyXG5cclxuLyoqXHJcbiAqIEZyb20gb2JqZWN0IGNvbnZlcnRlciBwYXJ0IG9mIGFuIHtAbGluayBJV3JhcHBlcn0uXHJcbiAqIEB0eXBlZGVmIFdyYXBwZXJGcm9tT2JqZWN0Q29udmVydGVyXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gb2JqZWN0IFBsYWluIG9iamVjdFxyXG4gKiBAcmV0dXJucyB7TWVzc2FnZTx7fT59IE1lc3NhZ2UgaW5zdGFuY2VcclxuICogQHRoaXMgVHlwZVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBUbyBvYmplY3QgY29udmVydGVyIHBhcnQgb2YgYW4ge0BsaW5rIElXcmFwcGVyfS5cclxuICogQHR5cGVkZWYgV3JhcHBlclRvT2JqZWN0Q29udmVydGVyXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICogQHBhcmFtIHtNZXNzYWdlPHt9Pn0gbWVzc2FnZSBNZXNzYWdlIGluc3RhbmNlXHJcbiAqIEBwYXJhbSB7SUNvbnZlcnNpb25PcHRpb25zfSBbb3B0aW9uc10gQ29udmVyc2lvbiBvcHRpb25zXHJcbiAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gUGxhaW4gb2JqZWN0XHJcbiAqIEB0aGlzIFR5cGVcclxuICovXHJcblxyXG4vKipcclxuICogQ29tbW9uIHR5cGUgd3JhcHBlciBwYXJ0IG9mIHtAbGluayB3cmFwcGVyc30uXHJcbiAqIEBpbnRlcmZhY2UgSVdyYXBwZXJcclxuICogQHByb3BlcnR5IHtXcmFwcGVyRnJvbU9iamVjdENvbnZlcnRlcn0gW2Zyb21PYmplY3RdIEZyb20gb2JqZWN0IGNvbnZlcnRlclxyXG4gKiBAcHJvcGVydHkge1dyYXBwZXJUb09iamVjdENvbnZlcnRlcn0gW3RvT2JqZWN0XSBUbyBvYmplY3QgY29udmVydGVyXHJcbiAqL1xyXG5cclxuLy8gQ3VzdG9tIHdyYXBwZXIgZm9yIEFueVxyXG53cmFwcGVyc1tcIi5nb29nbGUucHJvdG9idWYuQW55XCJdID0ge1xyXG5cclxuICAgIGZyb21PYmplY3Q6IGZ1bmN0aW9uKG9iamVjdCkge1xyXG5cclxuICAgICAgICAvLyB1bndyYXAgdmFsdWUgdHlwZSBpZiBtYXBwZWRcclxuICAgICAgICBpZiAob2JqZWN0ICYmIG9iamVjdFtcIkB0eXBlXCJdKSB7XHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gdGhpcy5sb29rdXAob2JqZWN0W1wiQHR5cGVcIl0pO1xyXG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xyXG4gICAgICAgICAgICBpZiAodHlwZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gdHlwZV91cmwgZG9lcyBub3QgYWNjZXB0IGxlYWRpbmcgXCIuXCJcclxuICAgICAgICAgICAgICAgIHZhciB0eXBlX3VybCA9IG9iamVjdFtcIkB0eXBlXCJdLmNoYXJBdCgwKSA9PT0gXCIuXCIgP1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFtcIkB0eXBlXCJdLnN1YnN0cigxKSA6IG9iamVjdFtcIkB0eXBlXCJdO1xyXG4gICAgICAgICAgICAgICAgLy8gdHlwZV91cmwgcHJlZml4IGlzIG9wdGlvbmFsLCBidXQgcGF0aCBzZXBlcmF0b3IgaXMgcmVxdWlyZWRcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZV91cmw6IFwiL1wiICsgdHlwZV91cmwsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHR5cGUuZW5jb2RlKHR5cGUuZnJvbU9iamVjdChvYmplY3QpKS5maW5pc2goKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmZyb21PYmplY3Qob2JqZWN0KTtcclxuICAgIH0sXHJcblxyXG4gICAgdG9PYmplY3Q6IGZ1bmN0aW9uKG1lc3NhZ2UsIG9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgLy8gZGVjb2RlIHZhbHVlIGlmIHJlcXVlc3RlZCBhbmQgdW5tYXBwZWRcclxuICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmpzb24gJiYgbWVzc2FnZS50eXBlX3VybCAmJiBtZXNzYWdlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIC8vIE9ubHkgdXNlIGZ1bGx5IHF1YWxpZmllZCB0eXBlIG5hbWUgYWZ0ZXIgdGhlIGxhc3QgJy8nXHJcbiAgICAgICAgICAgIHZhciBuYW1lID0gbWVzc2FnZS50eXBlX3VybC5zdWJzdHJpbmcobWVzc2FnZS50eXBlX3VybC5sYXN0SW5kZXhPZihcIi9cIikgKyAxKTtcclxuICAgICAgICAgICAgdmFyIHR5cGUgPSB0aGlzLmxvb2t1cChuYW1lKTtcclxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cclxuICAgICAgICAgICAgaWYgKHR5cGUpXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gdHlwZS5kZWNvZGUobWVzc2FnZS52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB3cmFwIHZhbHVlIGlmIHVubWFwcGVkXHJcbiAgICAgICAgaWYgKCEobWVzc2FnZSBpbnN0YW5jZW9mIHRoaXMuY3RvcikgJiYgbWVzc2FnZSBpbnN0YW5jZW9mIE1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgdmFyIG9iamVjdCA9IG1lc3NhZ2UuJHR5cGUudG9PYmplY3QobWVzc2FnZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIG9iamVjdFtcIkB0eXBlXCJdID0gbWVzc2FnZS4kdHlwZS5mdWxsTmFtZTtcclxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG59O1xyXG5cclxufSx7XCIyMVwiOjIxfV0sNDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBXcml0ZXI7XHJcblxyXG52YXIgdXRpbCAgICAgID0gcmVxdWlyZSgzOSk7XHJcblxyXG52YXIgQnVmZmVyV3JpdGVyOyAvLyBjeWNsaWNcclxuXHJcbnZhciBMb25nQml0cyAgPSB1dGlsLkxvbmdCaXRzLFxyXG4gICAgYmFzZTY0ICAgID0gdXRpbC5iYXNlNjQsXHJcbiAgICB1dGY4ICAgICAgPSB1dGlsLnV0Zjg7XHJcblxyXG4vKipcclxuICogQ29uc3RydWN0cyBhIG5ldyB3cml0ZXIgb3BlcmF0aW9uIGluc3RhbmNlLlxyXG4gKiBAY2xhc3NkZXNjIFNjaGVkdWxlZCB3cml0ZXIgb3BlcmF0aW9uLlxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtmdW5jdGlvbigqLCBVaW50OEFycmF5LCBudW1iZXIpfSBmbiBGdW5jdGlvbiB0byBjYWxsXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW4gVmFsdWUgYnl0ZSBsZW5ndGhcclxuICogQHBhcmFtIHsqfSB2YWwgVmFsdWUgdG8gd3JpdGVcclxuICogQGlnbm9yZVxyXG4gKi9cclxuZnVuY3Rpb24gT3AoZm4sIGxlbiwgdmFsKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0byBjYWxsLlxyXG4gICAgICogQHR5cGUge2Z1bmN0aW9uKFVpbnQ4QXJyYXksIG51bWJlciwgKil9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZm4gPSBmbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFZhbHVlIGJ5dGUgbGVuZ3RoLlxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5sZW4gPSBsZW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOZXh0IG9wZXJhdGlvbi5cclxuICAgICAqIEB0eXBlIHtXcml0ZXIuT3B8dW5kZWZpbmVkfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm5leHQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWYWx1ZSB0byB3cml0ZS5cclxuICAgICAqIEB0eXBlIHsqfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnZhbCA9IHZhbDsgLy8gdHlwZSB2YXJpZXNcclxufVxyXG5cclxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuZnVuY3Rpb24gbm9vcCgpIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZW1wdHktZnVuY3Rpb25cclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHdyaXRlciBzdGF0ZSBpbnN0YW5jZS5cclxuICogQGNsYXNzZGVzYyBDb3BpZWQgd3JpdGVyIHN0YXRlLlxyXG4gKiBAbWVtYmVyb2YgV3JpdGVyXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge1dyaXRlcn0gd3JpdGVyIFdyaXRlciB0byBjb3B5IHN0YXRlIGZyb21cclxuICogQGlnbm9yZVxyXG4gKi9cclxuZnVuY3Rpb24gU3RhdGUod3JpdGVyKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDdXJyZW50IGhlYWQuXHJcbiAgICAgKiBAdHlwZSB7V3JpdGVyLk9wfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmhlYWQgPSB3cml0ZXIuaGVhZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEN1cnJlbnQgdGFpbC5cclxuICAgICAqIEB0eXBlIHtXcml0ZXIuT3B9XHJcbiAgICAgKi9cclxuICAgIHRoaXMudGFpbCA9IHdyaXRlci50YWlsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3VycmVudCBidWZmZXIgbGVuZ3RoLlxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5sZW4gPSB3cml0ZXIubGVuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTmV4dCBzdGF0ZS5cclxuICAgICAqIEB0eXBlIHtTdGF0ZXxudWxsfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm5leHQgPSB3cml0ZXIuc3RhdGVzO1xyXG59XHJcblxyXG4vKipcclxuICogQ29uc3RydWN0cyBhIG5ldyB3cml0ZXIgaW5zdGFuY2UuXHJcbiAqIEBjbGFzc2Rlc2MgV2lyZSBmb3JtYXQgd3JpdGVyIHVzaW5nIGBVaW50OEFycmF5YCBpZiBhdmFpbGFibGUsIG90aGVyd2lzZSBgQXJyYXlgLlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFdyaXRlcigpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEN1cnJlbnQgbGVuZ3RoLlxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5sZW4gPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3BlcmF0aW9ucyBoZWFkLlxyXG4gICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5oZWFkID0gbmV3IE9wKG5vb3AsIDAsIDApO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3BlcmF0aW9ucyB0YWlsXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICovXHJcbiAgICB0aGlzLnRhaWwgPSB0aGlzLmhlYWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMaW5rZWQgZm9ya2VkIHN0YXRlcy5cclxuICAgICAqIEB0eXBlIHtPYmplY3R8bnVsbH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5zdGF0ZXMgPSBudWxsO1xyXG5cclxuICAgIC8vIFdoZW4gYSB2YWx1ZSBpcyB3cml0dGVuLCB0aGUgd3JpdGVyIGNhbGN1bGF0ZXMgaXRzIGJ5dGUgbGVuZ3RoIGFuZCBwdXRzIGl0IGludG8gYSBsaW5rZWRcclxuICAgIC8vIGxpc3Qgb2Ygb3BlcmF0aW9ucyB0byBwZXJmb3JtIHdoZW4gZmluaXNoKCkgaXMgY2FsbGVkLiBUaGlzIGJvdGggYWxsb3dzIHVzIHRvIGFsbG9jYXRlXHJcbiAgICAvLyBidWZmZXJzIG9mIHRoZSBleGFjdCByZXF1aXJlZCBzaXplIGFuZCByZWR1Y2VzIHRoZSBhbW91bnQgb2Ygd29yayB3ZSBoYXZlIHRvIGRvIGNvbXBhcmVkXHJcbiAgICAvLyB0byBmaXJzdCBjYWxjdWxhdGluZyBvdmVyIG9iamVjdHMgYW5kIHRoZW4gZW5jb2Rpbmcgb3ZlciBvYmplY3RzLiBJbiBvdXIgY2FzZSwgdGhlIGVuY29kaW5nXHJcbiAgICAvLyBwYXJ0IGlzIGp1c3QgYSBsaW5rZWQgbGlzdCB3YWxrIGNhbGxpbmcgb3BlcmF0aW9ucyB3aXRoIGFscmVhZHkgcHJlcGFyZWQgdmFsdWVzLlxyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIG5ldyB3cml0ZXIuXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcmV0dXJucyB7QnVmZmVyV3JpdGVyfFdyaXRlcn0gQSB7QGxpbmsgQnVmZmVyV3JpdGVyfSB3aGVuIEJ1ZmZlcnMgYXJlIHN1cHBvcnRlZCwgb3RoZXJ3aXNlIGEge0BsaW5rIFdyaXRlcn1cclxuICovXHJcbldyaXRlci5jcmVhdGUgPSB1dGlsLkJ1ZmZlclxyXG4gICAgPyBmdW5jdGlvbiBjcmVhdGVfYnVmZmVyX3NldHVwKCkge1xyXG4gICAgICAgIHJldHVybiAoV3JpdGVyLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZV9idWZmZXIoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQnVmZmVyV3JpdGVyKCk7XHJcbiAgICAgICAgfSkoKTtcclxuICAgIH1cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICA6IGZ1bmN0aW9uIGNyZWF0ZV9hcnJheSgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFdyaXRlcigpO1xyXG4gICAgfTtcclxuXHJcbi8qKlxyXG4gKiBBbGxvY2F0ZXMgYSBidWZmZXIgb2YgdGhlIHNwZWNpZmllZCBzaXplLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gc2l6ZSBCdWZmZXIgc2l6ZVxyXG4gKiBAcmV0dXJucyB7VWludDhBcnJheX0gQnVmZmVyXHJcbiAqL1xyXG5Xcml0ZXIuYWxsb2MgPSBmdW5jdGlvbiBhbGxvYyhzaXplKSB7XHJcbiAgICByZXR1cm4gbmV3IHV0aWwuQXJyYXkoc2l6ZSk7XHJcbn07XHJcblxyXG4vLyBVc2UgVWludDhBcnJheSBidWZmZXIgcG9vbCBpbiB0aGUgYnJvd3NlciwganVzdCBsaWtlIG5vZGUgZG9lcyB3aXRoIGJ1ZmZlcnNcclxuLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cclxuaWYgKHV0aWwuQXJyYXkgIT09IEFycmF5KVxyXG4gICAgV3JpdGVyLmFsbG9jID0gdXRpbC5wb29sKFdyaXRlci5hbGxvYywgdXRpbC5BcnJheS5wcm90b3R5cGUuc3ViYXJyYXkpO1xyXG5cclxuLyoqXHJcbiAqIFB1c2hlcyBhIG5ldyBvcGVyYXRpb24gdG8gdGhlIHF1ZXVlLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKFVpbnQ4QXJyYXksIG51bWJlciwgKil9IGZuIEZ1bmN0aW9uIHRvIGNhbGxcclxuICogQHBhcmFtIHtudW1iZXJ9IGxlbiBWYWx1ZSBieXRlIGxlbmd0aFxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuV3JpdGVyLnByb3RvdHlwZS5fcHVzaCA9IGZ1bmN0aW9uIHB1c2goZm4sIGxlbiwgdmFsKSB7XHJcbiAgICB0aGlzLnRhaWwgPSB0aGlzLnRhaWwubmV4dCA9IG5ldyBPcChmbiwgbGVuLCB2YWwpO1xyXG4gICAgdGhpcy5sZW4gKz0gbGVuO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5mdW5jdGlvbiB3cml0ZUJ5dGUodmFsLCBidWYsIHBvcykge1xyXG4gICAgYnVmW3Bvc10gPSB2YWwgJiAyNTU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdyaXRlVmFyaW50MzIodmFsLCBidWYsIHBvcykge1xyXG4gICAgd2hpbGUgKHZhbCA+IDEyNykge1xyXG4gICAgICAgIGJ1Zltwb3MrK10gPSB2YWwgJiAxMjcgfCAxMjg7XHJcbiAgICAgICAgdmFsID4+Pj0gNztcclxuICAgIH1cclxuICAgIGJ1Zltwb3NdID0gdmFsO1xyXG59XHJcblxyXG4vKipcclxuICogQ29uc3RydWN0cyBhIG5ldyB2YXJpbnQgd3JpdGVyIG9wZXJhdGlvbiBpbnN0YW5jZS5cclxuICogQGNsYXNzZGVzYyBTY2hlZHVsZWQgdmFyaW50IHdyaXRlciBvcGVyYXRpb24uXHJcbiAqIEBleHRlbmRzIE9wXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuIFZhbHVlIGJ5dGUgbGVuZ3RoXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgVmFsdWUgdG8gd3JpdGVcclxuICogQGlnbm9yZVxyXG4gKi9cclxuZnVuY3Rpb24gVmFyaW50T3AobGVuLCB2YWwpIHtcclxuICAgIHRoaXMubGVuID0gbGVuO1xyXG4gICAgdGhpcy5uZXh0ID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy52YWwgPSB2YWw7XHJcbn1cclxuXHJcblZhcmludE9wLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoT3AucHJvdG90eXBlKTtcclxuVmFyaW50T3AucHJvdG90eXBlLmZuID0gd3JpdGVWYXJpbnQzMjtcclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYW4gdW5zaWduZWQgMzIgYml0IHZhbHVlIGFzIGEgdmFyaW50LlxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcclxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXHJcbiAqL1xyXG5Xcml0ZXIucHJvdG90eXBlLnVpbnQzMiA9IGZ1bmN0aW9uIHdyaXRlX3VpbnQzMih2YWx1ZSkge1xyXG4gICAgLy8gaGVyZSwgdGhlIGNhbGwgdG8gdGhpcy5wdXNoIGhhcyBiZWVuIGlubGluZWQgYW5kIGEgdmFyaW50IHNwZWNpZmljIE9wIHN1YmNsYXNzIGlzIHVzZWQuXHJcbiAgICAvLyB1aW50MzIgaXMgYnkgZmFyIHRoZSBtb3N0IGZyZXF1ZW50bHkgdXNlZCBvcGVyYXRpb24gYW5kIGJlbmVmaXRzIHNpZ25pZmljYW50bHkgZnJvbSB0aGlzLlxyXG4gICAgdGhpcy5sZW4gKz0gKHRoaXMudGFpbCA9IHRoaXMudGFpbC5uZXh0ID0gbmV3IFZhcmludE9wKFxyXG4gICAgICAgICh2YWx1ZSA9IHZhbHVlID4+PiAwKVxyXG4gICAgICAgICAgICAgICAgPCAxMjggICAgICAgPyAxXHJcbiAgICAgICAgOiB2YWx1ZSA8IDE2Mzg0ICAgICA/IDJcclxuICAgICAgICA6IHZhbHVlIDwgMjA5NzE1MiAgID8gM1xyXG4gICAgICAgIDogdmFsdWUgPCAyNjg0MzU0NTYgPyA0XHJcbiAgICAgICAgOiAgICAgICAgICAgICAgICAgICAgIDUsXHJcbiAgICB2YWx1ZSkpLmxlbjtcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlcyBhIHNpZ25lZCAzMiBiaXQgdmFsdWUgYXMgYSB2YXJpbnQuXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcclxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXHJcbiAqL1xyXG5Xcml0ZXIucHJvdG90eXBlLmludDMyID0gZnVuY3Rpb24gd3JpdGVfaW50MzIodmFsdWUpIHtcclxuICAgIHJldHVybiB2YWx1ZSA8IDBcclxuICAgICAgICA/IHRoaXMuX3B1c2god3JpdGVWYXJpbnQ2NCwgMTAsIExvbmdCaXRzLmZyb21OdW1iZXIodmFsdWUpKSAvLyAxMCBieXRlcyBwZXIgc3BlY1xyXG4gICAgICAgIDogdGhpcy51aW50MzIodmFsdWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlcyBhIDMyIGJpdCB2YWx1ZSBhcyBhIHZhcmludCwgemlnLXphZyBlbmNvZGVkLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcclxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXHJcbiAqL1xyXG5Xcml0ZXIucHJvdG90eXBlLnNpbnQzMiA9IGZ1bmN0aW9uIHdyaXRlX3NpbnQzMih2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHRoaXMudWludDMyKCh2YWx1ZSA8PCAxIF4gdmFsdWUgPj4gMzEpID4+PiAwKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIHdyaXRlVmFyaW50NjQodmFsLCBidWYsIHBvcykge1xyXG4gICAgd2hpbGUgKHZhbC5oaSkge1xyXG4gICAgICAgIGJ1Zltwb3MrK10gPSB2YWwubG8gJiAxMjcgfCAxMjg7XHJcbiAgICAgICAgdmFsLmxvID0gKHZhbC5sbyA+Pj4gNyB8IHZhbC5oaSA8PCAyNSkgPj4+IDA7XHJcbiAgICAgICAgdmFsLmhpID4+Pj0gNztcclxuICAgIH1cclxuICAgIHdoaWxlICh2YWwubG8gPiAxMjcpIHtcclxuICAgICAgICBidWZbcG9zKytdID0gdmFsLmxvICYgMTI3IHwgMTI4O1xyXG4gICAgICAgIHZhbC5sbyA9IHZhbC5sbyA+Pj4gNztcclxuICAgIH1cclxuICAgIGJ1Zltwb3MrK10gPSB2YWwubG87XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYW4gdW5zaWduZWQgNjQgYml0IHZhbHVlIGFzIGEgdmFyaW50LlxyXG4gKiBAcGFyYW0ge0xvbmd8bnVtYmVyfHN0cmluZ30gdmFsdWUgVmFsdWUgdG8gd3JpdGVcclxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXHJcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYHZhbHVlYCBpcyBhIHN0cmluZyBhbmQgbm8gbG9uZyBsaWJyYXJ5IGlzIHByZXNlbnQuXHJcbiAqL1xyXG5Xcml0ZXIucHJvdG90eXBlLnVpbnQ2NCA9IGZ1bmN0aW9uIHdyaXRlX3VpbnQ2NCh2YWx1ZSkge1xyXG4gICAgdmFyIGJpdHMgPSBMb25nQml0cy5mcm9tKHZhbHVlKTtcclxuICAgIHJldHVybiB0aGlzLl9wdXNoKHdyaXRlVmFyaW50NjQsIGJpdHMubGVuZ3RoKCksIGJpdHMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlcyBhIHNpZ25lZCA2NCBiaXQgdmFsdWUgYXMgYSB2YXJpbnQuXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge0xvbmd8bnVtYmVyfHN0cmluZ30gdmFsdWUgVmFsdWUgdG8gd3JpdGVcclxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXHJcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYHZhbHVlYCBpcyBhIHN0cmluZyBhbmQgbm8gbG9uZyBsaWJyYXJ5IGlzIHByZXNlbnQuXHJcbiAqL1xyXG5Xcml0ZXIucHJvdG90eXBlLmludDY0ID0gV3JpdGVyLnByb3RvdHlwZS51aW50NjQ7XHJcblxyXG4vKipcclxuICogV3JpdGVzIGEgc2lnbmVkIDY0IGJpdCB2YWx1ZSBhcyBhIHZhcmludCwgemlnLXphZyBlbmNvZGVkLlxyXG4gKiBAcGFyYW0ge0xvbmd8bnVtYmVyfHN0cmluZ30gdmFsdWUgVmFsdWUgdG8gd3JpdGVcclxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXHJcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYHZhbHVlYCBpcyBhIHN0cmluZyBhbmQgbm8gbG9uZyBsaWJyYXJ5IGlzIHByZXNlbnQuXHJcbiAqL1xyXG5Xcml0ZXIucHJvdG90eXBlLnNpbnQ2NCA9IGZ1bmN0aW9uIHdyaXRlX3NpbnQ2NCh2YWx1ZSkge1xyXG4gICAgdmFyIGJpdHMgPSBMb25nQml0cy5mcm9tKHZhbHVlKS56ekVuY29kZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMuX3B1c2god3JpdGVWYXJpbnQ2NCwgYml0cy5sZW5ndGgoKSwgYml0cyk7XHJcbn07XHJcblxyXG4vKipcclxuICogV3JpdGVzIGEgYm9vbGlzaCB2YWx1ZSBhcyBhIHZhcmludC5cclxuICogQHBhcmFtIHtib29sZWFufSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxyXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcclxuICovXHJcbldyaXRlci5wcm90b3R5cGUuYm9vbCA9IGZ1bmN0aW9uIHdyaXRlX2Jvb2wodmFsdWUpIHtcclxuICAgIHJldHVybiB0aGlzLl9wdXNoKHdyaXRlQnl0ZSwgMSwgdmFsdWUgPyAxIDogMCk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiB3cml0ZUZpeGVkMzIodmFsLCBidWYsIHBvcykge1xyXG4gICAgYnVmW3BvcyAgICBdID0gIHZhbCAgICAgICAgICYgMjU1O1xyXG4gICAgYnVmW3BvcyArIDFdID0gIHZhbCA+Pj4gOCAgICYgMjU1O1xyXG4gICAgYnVmW3BvcyArIDJdID0gIHZhbCA+Pj4gMTYgICYgMjU1O1xyXG4gICAgYnVmW3BvcyArIDNdID0gIHZhbCA+Pj4gMjQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYW4gdW5zaWduZWQgMzIgYml0IHZhbHVlIGFzIGZpeGVkIDMyIGJpdHMuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxyXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcclxuICovXHJcbldyaXRlci5wcm90b3R5cGUuZml4ZWQzMiA9IGZ1bmN0aW9uIHdyaXRlX2ZpeGVkMzIodmFsdWUpIHtcclxuICAgIHJldHVybiB0aGlzLl9wdXNoKHdyaXRlRml4ZWQzMiwgNCwgdmFsdWUgPj4+IDApO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlcyBhIHNpZ25lZCAzMiBiaXQgdmFsdWUgYXMgZml4ZWQgMzIgYml0cy5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxyXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcclxuICovXHJcbldyaXRlci5wcm90b3R5cGUuc2ZpeGVkMzIgPSBXcml0ZXIucHJvdG90eXBlLmZpeGVkMzI7XHJcblxyXG4vKipcclxuICogV3JpdGVzIGFuIHVuc2lnbmVkIDY0IGJpdCB2YWx1ZSBhcyBmaXhlZCA2NCBiaXRzLlxyXG4gKiBAcGFyYW0ge0xvbmd8bnVtYmVyfHN0cmluZ30gdmFsdWUgVmFsdWUgdG8gd3JpdGVcclxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXHJcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYHZhbHVlYCBpcyBhIHN0cmluZyBhbmQgbm8gbG9uZyBsaWJyYXJ5IGlzIHByZXNlbnQuXHJcbiAqL1xyXG5Xcml0ZXIucHJvdG90eXBlLmZpeGVkNjQgPSBmdW5jdGlvbiB3cml0ZV9maXhlZDY0KHZhbHVlKSB7XHJcbiAgICB2YXIgYml0cyA9IExvbmdCaXRzLmZyb20odmFsdWUpO1xyXG4gICAgcmV0dXJuIHRoaXMuX3B1c2god3JpdGVGaXhlZDMyLCA0LCBiaXRzLmxvKS5fcHVzaCh3cml0ZUZpeGVkMzIsIDQsIGJpdHMuaGkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlcyBhIHNpZ25lZCA2NCBiaXQgdmFsdWUgYXMgZml4ZWQgNjQgYml0cy5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7TG9uZ3xudW1iZXJ8c3RyaW5nfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxyXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcclxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBgdmFsdWVgIGlzIGEgc3RyaW5nIGFuZCBubyBsb25nIGxpYnJhcnkgaXMgcHJlc2VudC5cclxuICovXHJcbldyaXRlci5wcm90b3R5cGUuc2ZpeGVkNjQgPSBXcml0ZXIucHJvdG90eXBlLmZpeGVkNjQ7XHJcblxyXG4vKipcclxuICogV3JpdGVzIGEgZmxvYXQgKDMyIGJpdCkuXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcclxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXHJcbiAqL1xyXG5Xcml0ZXIucHJvdG90eXBlLmZsb2F0ID0gZnVuY3Rpb24gd3JpdGVfZmxvYXQodmFsdWUpIHtcclxuICAgIHJldHVybiB0aGlzLl9wdXNoKHV0aWwuZmxvYXQud3JpdGVGbG9hdExFLCA0LCB2YWx1ZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogV3JpdGVzIGEgZG91YmxlICg2NCBiaXQgZmxvYXQpLlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxyXG4gKi9cclxuV3JpdGVyLnByb3RvdHlwZS5kb3VibGUgPSBmdW5jdGlvbiB3cml0ZV9kb3VibGUodmFsdWUpIHtcclxuICAgIHJldHVybiB0aGlzLl9wdXNoKHV0aWwuZmxvYXQud3JpdGVEb3VibGVMRSwgOCwgdmFsdWUpO1xyXG59O1xyXG5cclxudmFyIHdyaXRlQnl0ZXMgPSB1dGlsLkFycmF5LnByb3RvdHlwZS5zZXRcclxuICAgID8gZnVuY3Rpb24gd3JpdGVCeXRlc19zZXQodmFsLCBidWYsIHBvcykge1xyXG4gICAgICAgIGJ1Zi5zZXQodmFsLCBwb3MpOyAvLyBhbHNvIHdvcmtzIGZvciBwbGFpbiBhcnJheSB2YWx1ZXNcclxuICAgIH1cclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICA6IGZ1bmN0aW9uIHdyaXRlQnl0ZXNfZm9yKHZhbCwgYnVmLCBwb3MpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbC5sZW5ndGg7ICsraSlcclxuICAgICAgICAgICAgYnVmW3BvcyArIGldID0gdmFsW2ldO1xyXG4gICAgfTtcclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYSBzZXF1ZW5jZSBvZiBieXRlcy5cclxuICogQHBhcmFtIHtVaW50OEFycmF5fHN0cmluZ30gdmFsdWUgQnVmZmVyIG9yIGJhc2U2NCBlbmNvZGVkIHN0cmluZyB0byB3cml0ZVxyXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcclxuICovXHJcbldyaXRlci5wcm90b3R5cGUuYnl0ZXMgPSBmdW5jdGlvbiB3cml0ZV9ieXRlcyh2YWx1ZSkge1xyXG4gICAgdmFyIGxlbiA9IHZhbHVlLmxlbmd0aCA+Pj4gMDtcclxuICAgIGlmICghbGVuKVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9wdXNoKHdyaXRlQnl0ZSwgMSwgMCk7XHJcbiAgICBpZiAodXRpbC5pc1N0cmluZyh2YWx1ZSkpIHtcclxuICAgICAgICB2YXIgYnVmID0gV3JpdGVyLmFsbG9jKGxlbiA9IGJhc2U2NC5sZW5ndGgodmFsdWUpKTtcclxuICAgICAgICBiYXNlNjQuZGVjb2RlKHZhbHVlLCBidWYsIDApO1xyXG4gICAgICAgIHZhbHVlID0gYnVmO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMudWludDMyKGxlbikuX3B1c2god3JpdGVCeXRlcywgbGVuLCB2YWx1ZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogV3JpdGVzIGEgc3RyaW5nLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgVmFsdWUgdG8gd3JpdGVcclxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXHJcbiAqL1xyXG5Xcml0ZXIucHJvdG90eXBlLnN0cmluZyA9IGZ1bmN0aW9uIHdyaXRlX3N0cmluZyh2YWx1ZSkge1xyXG4gICAgdmFyIGxlbiA9IHV0ZjgubGVuZ3RoKHZhbHVlKTtcclxuICAgIHJldHVybiBsZW5cclxuICAgICAgICA/IHRoaXMudWludDMyKGxlbikuX3B1c2godXRmOC53cml0ZSwgbGVuLCB2YWx1ZSlcclxuICAgICAgICA6IHRoaXMuX3B1c2god3JpdGVCeXRlLCAxLCAwKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBGb3JrcyB0aGlzIHdyaXRlcidzIHN0YXRlIGJ5IHB1c2hpbmcgaXQgdG8gYSBzdGFjay5cclxuICogQ2FsbGluZyB7QGxpbmsgV3JpdGVyI3Jlc2V0fHJlc2V0fSBvciB7QGxpbmsgV3JpdGVyI2xkZWxpbXxsZGVsaW19IHJlc2V0cyB0aGUgd3JpdGVyIHRvIHRoZSBwcmV2aW91cyBzdGF0ZS5cclxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXHJcbiAqL1xyXG5Xcml0ZXIucHJvdG90eXBlLmZvcmsgPSBmdW5jdGlvbiBmb3JrKCkge1xyXG4gICAgdGhpcy5zdGF0ZXMgPSBuZXcgU3RhdGUodGhpcyk7XHJcbiAgICB0aGlzLmhlYWQgPSB0aGlzLnRhaWwgPSBuZXcgT3Aobm9vcCwgMCwgMCk7XHJcbiAgICB0aGlzLmxlbiA9IDA7XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXNldHMgdGhpcyBpbnN0YW5jZSB0byB0aGUgbGFzdCBzdGF0ZS5cclxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXHJcbiAqL1xyXG5Xcml0ZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZXMpIHtcclxuICAgICAgICB0aGlzLmhlYWQgICA9IHRoaXMuc3RhdGVzLmhlYWQ7XHJcbiAgICAgICAgdGhpcy50YWlsICAgPSB0aGlzLnN0YXRlcy50YWlsO1xyXG4gICAgICAgIHRoaXMubGVuICAgID0gdGhpcy5zdGF0ZXMubGVuO1xyXG4gICAgICAgIHRoaXMuc3RhdGVzID0gdGhpcy5zdGF0ZXMubmV4dDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5oZWFkID0gdGhpcy50YWlsID0gbmV3IE9wKG5vb3AsIDAsIDApO1xyXG4gICAgICAgIHRoaXMubGVuICA9IDA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXNldHMgdG8gdGhlIGxhc3Qgc3RhdGUgYW5kIGFwcGVuZHMgdGhlIGZvcmsgc3RhdGUncyBjdXJyZW50IHdyaXRlIGxlbmd0aCBhcyBhIHZhcmludCBmb2xsb3dlZCBieSBpdHMgb3BlcmF0aW9ucy5cclxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXHJcbiAqL1xyXG5Xcml0ZXIucHJvdG90eXBlLmxkZWxpbSA9IGZ1bmN0aW9uIGxkZWxpbSgpIHtcclxuICAgIHZhciBoZWFkID0gdGhpcy5oZWFkLFxyXG4gICAgICAgIHRhaWwgPSB0aGlzLnRhaWwsXHJcbiAgICAgICAgbGVuICA9IHRoaXMubGVuO1xyXG4gICAgdGhpcy5yZXNldCgpLnVpbnQzMihsZW4pO1xyXG4gICAgaWYgKGxlbikge1xyXG4gICAgICAgIHRoaXMudGFpbC5uZXh0ID0gaGVhZC5uZXh0OyAvLyBza2lwIG5vb3BcclxuICAgICAgICB0aGlzLnRhaWwgPSB0YWlsO1xyXG4gICAgICAgIHRoaXMubGVuICs9IGxlbjtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZpbmlzaGVzIHRoZSB3cml0ZSBvcGVyYXRpb24uXHJcbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fSBGaW5pc2hlZCBidWZmZXJcclxuICovXHJcbldyaXRlci5wcm90b3R5cGUuZmluaXNoID0gZnVuY3Rpb24gZmluaXNoKCkge1xyXG4gICAgdmFyIGhlYWQgPSB0aGlzLmhlYWQubmV4dCwgLy8gc2tpcCBub29wXHJcbiAgICAgICAgYnVmICA9IHRoaXMuY29uc3RydWN0b3IuYWxsb2ModGhpcy5sZW4pLFxyXG4gICAgICAgIHBvcyAgPSAwO1xyXG4gICAgd2hpbGUgKGhlYWQpIHtcclxuICAgICAgICBoZWFkLmZuKGhlYWQudmFsLCBidWYsIHBvcyk7XHJcbiAgICAgICAgcG9zICs9IGhlYWQubGVuO1xyXG4gICAgICAgIGhlYWQgPSBoZWFkLm5leHQ7XHJcbiAgICB9XHJcbiAgICAvLyB0aGlzLmhlYWQgPSB0aGlzLnRhaWwgPSBudWxsO1xyXG4gICAgcmV0dXJuIGJ1ZjtcclxufTtcclxuXHJcbldyaXRlci5fY29uZmlndXJlID0gZnVuY3Rpb24oQnVmZmVyV3JpdGVyXykge1xyXG4gICAgQnVmZmVyV3JpdGVyID0gQnVmZmVyV3JpdGVyXztcclxufTtcclxuXHJcbn0se1wiMzlcIjozOX1dLDQzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gQnVmZmVyV3JpdGVyO1xyXG5cclxuLy8gZXh0ZW5kcyBXcml0ZXJcclxudmFyIFdyaXRlciA9IHJlcXVpcmUoNDIpO1xyXG4oQnVmZmVyV3JpdGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoV3JpdGVyLnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yID0gQnVmZmVyV3JpdGVyO1xyXG5cclxudmFyIHV0aWwgPSByZXF1aXJlKDM5KTtcclxuXHJcbnZhciBCdWZmZXIgPSB1dGlsLkJ1ZmZlcjtcclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IGJ1ZmZlciB3cml0ZXIgaW5zdGFuY2UuXHJcbiAqIEBjbGFzc2Rlc2MgV2lyZSBmb3JtYXQgd3JpdGVyIHVzaW5nIG5vZGUgYnVmZmVycy5cclxuICogQGV4dGVuZHMgV3JpdGVyXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gQnVmZmVyV3JpdGVyKCkge1xyXG4gICAgV3JpdGVyLmNhbGwodGhpcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBbGxvY2F0ZXMgYSBidWZmZXIgb2YgdGhlIHNwZWNpZmllZCBzaXplLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gc2l6ZSBCdWZmZXIgc2l6ZVxyXG4gKiBAcmV0dXJucyB7QnVmZmVyfSBCdWZmZXJcclxuICovXHJcbkJ1ZmZlcldyaXRlci5hbGxvYyA9IGZ1bmN0aW9uIGFsbG9jX2J1ZmZlcihzaXplKSB7XHJcbiAgICByZXR1cm4gKEJ1ZmZlcldyaXRlci5hbGxvYyA9IHV0aWwuX0J1ZmZlcl9hbGxvY1Vuc2FmZSkoc2l6ZSk7XHJcbn07XHJcblxyXG52YXIgd3JpdGVCeXRlc0J1ZmZlciA9IEJ1ZmZlciAmJiBCdWZmZXIucHJvdG90eXBlIGluc3RhbmNlb2YgVWludDhBcnJheSAmJiBCdWZmZXIucHJvdG90eXBlLnNldC5uYW1lID09PSBcInNldFwiXHJcbiAgICA/IGZ1bmN0aW9uIHdyaXRlQnl0ZXNCdWZmZXJfc2V0KHZhbCwgYnVmLCBwb3MpIHtcclxuICAgICAgICBidWYuc2V0KHZhbCwgcG9zKTsgLy8gZmFzdGVyIHRoYW4gY29weSAocmVxdWlyZXMgbm9kZSA+PSA0IHdoZXJlIEJ1ZmZlcnMgZXh0ZW5kIFVpbnQ4QXJyYXkgYW5kIHNldCBpcyBwcm9wZXJseSBpbmhlcml0ZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFsc28gd29ya3MgZm9yIHBsYWluIGFycmF5IHZhbHVlc1xyXG4gICAgfVxyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgIDogZnVuY3Rpb24gd3JpdGVCeXRlc0J1ZmZlcl9jb3B5KHZhbCwgYnVmLCBwb3MpIHtcclxuICAgICAgICBpZiAodmFsLmNvcHkpIC8vIEJ1ZmZlciB2YWx1ZXNcclxuICAgICAgICAgICAgdmFsLmNvcHkoYnVmLCBwb3MsIDAsIHZhbC5sZW5ndGgpO1xyXG4gICAgICAgIGVsc2UgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOykgLy8gcGxhaW4gYXJyYXkgdmFsdWVzXHJcbiAgICAgICAgICAgIGJ1Zltwb3MrK10gPSB2YWxbaSsrXTtcclxuICAgIH07XHJcblxyXG4vKipcclxuICogQG92ZXJyaWRlXHJcbiAqL1xyXG5CdWZmZXJXcml0ZXIucHJvdG90eXBlLmJ5dGVzID0gZnVuY3Rpb24gd3JpdGVfYnl0ZXNfYnVmZmVyKHZhbHVlKSB7XHJcbiAgICBpZiAodXRpbC5pc1N0cmluZyh2YWx1ZSkpXHJcbiAgICAgICAgdmFsdWUgPSB1dGlsLl9CdWZmZXJfZnJvbSh2YWx1ZSwgXCJiYXNlNjRcIik7XHJcbiAgICB2YXIgbGVuID0gdmFsdWUubGVuZ3RoID4+PiAwO1xyXG4gICAgdGhpcy51aW50MzIobGVuKTtcclxuICAgIGlmIChsZW4pXHJcbiAgICAgICAgdGhpcy5fcHVzaCh3cml0ZUJ5dGVzQnVmZmVyLCBsZW4sIHZhbHVlKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gd3JpdGVTdHJpbmdCdWZmZXIodmFsLCBidWYsIHBvcykge1xyXG4gICAgaWYgKHZhbC5sZW5ndGggPCA0MCkgLy8gcGxhaW4ganMgaXMgZmFzdGVyIGZvciBzaG9ydCBzdHJpbmdzIChwcm9iYWJseSBkdWUgdG8gcmVkdW5kYW50IGFzc2VydGlvbnMpXHJcbiAgICAgICAgdXRpbC51dGY4LndyaXRlKHZhbCwgYnVmLCBwb3MpO1xyXG4gICAgZWxzZVxyXG4gICAgICAgIGJ1Zi51dGY4V3JpdGUodmFsLCBwb3MpO1xyXG59XHJcblxyXG4vKipcclxuICogQG92ZXJyaWRlXHJcbiAqL1xyXG5CdWZmZXJXcml0ZXIucHJvdG90eXBlLnN0cmluZyA9IGZ1bmN0aW9uIHdyaXRlX3N0cmluZ19idWZmZXIodmFsdWUpIHtcclxuICAgIHZhciBsZW4gPSBCdWZmZXIuYnl0ZUxlbmd0aCh2YWx1ZSk7XHJcbiAgICB0aGlzLnVpbnQzMihsZW4pO1xyXG4gICAgaWYgKGxlbilcclxuICAgICAgICB0aGlzLl9wdXNoKHdyaXRlU3RyaW5nQnVmZmVyLCBsZW4sIHZhbHVlKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBGaW5pc2hlcyB0aGUgd3JpdGUgb3BlcmF0aW9uLlxyXG4gKiBAbmFtZSBCdWZmZXJXcml0ZXIjZmluaXNoXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcmV0dXJucyB7QnVmZmVyfSBGaW5pc2hlZCBidWZmZXJcclxuICovXHJcblxyXG59LHtcIjM5XCI6MzksXCI0MlwiOjQyfV19LHt9LFsxOV0pXHJcblxyXG59KSh0eXBlb2Ygd2luZG93PT09XCJvYmplY3RcIiYmd2luZG93fHx0eXBlb2Ygc2VsZj09PVwib2JqZWN0XCImJnNlbGZ8fHRoaXMpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcm90b2J1Zi5qcy5tYXBcclxuIl19