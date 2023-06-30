
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/acdata1.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '059c9En5zlCdYDuYpxXoxZF', 'acdata1');
// scripts/acdata1.js

/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var $protobuf = require("./protobuf.js"); // Common aliases


var $Reader = $protobuf.Reader,
    $Writer = $protobuf.Writer,
    $util = $protobuf.util; // Exported root namespace

var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.AcWar = function () {
  /**
   * Namespace AcWar.
   * @exports AcWar
   * @namespace
   */
  var AcWar = {};

  AcWar.Agent = function () {
    /**
     * Properties of an Agent.
     * @memberof AcWar
     * @interface IAgent
     * @property {string} agentType Agent agentType
     * @property {number} mpx Agent mpx
     * @property {number} mpy Agent mpy
     * @property {number} life Agent life
     * @property {boolean} groupKill Agent groupKill
     * @property {boolean} isHero Agent isHero
     * @property {number} rot Agent rot
     * @property {number} attackDura Agent attackDura
     * @property {string} aid Agent aid
     * @property {string} innerId Agent innerId
     * @property {string} role Agent role
     * @property {number} objectId Agent objectId
     * @property {string} actType Agent actType
     * @property {number} size Agent size
     * @property {number} level Agent level
     * @property {number|null} [epx] Agent epx
     * @property {number|null} [epy] Agent epy
     * @property {string|null} [eid] Agent eid
     * @property {number|null} [esize] Agent esize
     * @property {number|null} [tpx] Agent tpx
     * @property {number|null} [tpy] Agent tpy
     * @property {string|null} [updown] Agent updown
     */

    /**
     * Constructs a new Agent.
     * @memberof AcWar
     * @classdesc Represents an Agent.
     * @implements IAgent
     * @constructor
     * @param {AcWar.IAgent=} [properties] Properties to set
     */
    function Agent(properties) {
      if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
      }
    }
    /**
     * Agent agentType.
     * @member {string} agentType
     * @memberof AcWar.Agent
     * @instance
     */


    Agent.prototype.agentType = "";
    /**
     * Agent mpx.
     * @member {number} mpx
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.mpx = 0;
    /**
     * Agent mpy.
     * @member {number} mpy
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.mpy = 0;
    /**
     * Agent life.
     * @member {number} life
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.life = 0;
    /**
     * Agent groupKill.
     * @member {boolean} groupKill
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.groupKill = false;
    /**
     * Agent isHero.
     * @member {boolean} isHero
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.isHero = false;
    /**
     * Agent rot.
     * @member {number} rot
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.rot = 0;
    /**
     * Agent attackDura.
     * @member {number} attackDura
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.attackDura = 0;
    /**
     * Agent aid.
     * @member {string} aid
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.aid = "";
    /**
     * Agent innerId.
     * @member {string} innerId
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.innerId = "";
    /**
     * Agent role.
     * @member {string} role
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.role = "";
    /**
     * Agent objectId.
     * @member {number} objectId
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.objectId = 0;
    /**
     * Agent actType.
     * @member {string} actType
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.actType = "";
    /**
     * Agent size.
     * @member {number} size
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.size = 0;
    /**
     * Agent level.
     * @member {number} level
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.level = 0;
    /**
     * Agent epx.
     * @member {number} epx
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.epx = 0;
    /**
     * Agent epy.
     * @member {number} epy
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.epy = 0;
    /**
     * Agent eid.
     * @member {string} eid
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.eid = "";
    /**
     * Agent esize.
     * @member {number} esize
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.esize = 0;
    /**
     * Agent tpx.
     * @member {number} tpx
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.tpx = 0;
    /**
     * Agent tpy.
     * @member {number} tpy
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.tpy = 0;
    /**
     * Agent updown.
     * @member {string} updown
     * @memberof AcWar.Agent
     * @instance
     */

    Agent.prototype.updown = "";
    /**
     * Creates a new Agent instance using the specified properties.
     * @function create
     * @memberof AcWar.Agent
     * @static
     * @param {AcWar.IAgent=} [properties] Properties to set
     * @returns {AcWar.Agent} Agent instance
     */

    Agent.create = function create(properties) {
      return new Agent(properties);
    };
    /**
     * Encodes the specified Agent message. Does not implicitly {@link AcWar.Agent.verify|verify} messages.
     * @function encode
     * @memberof AcWar.Agent
     * @static
     * @param {AcWar.IAgent} message Agent message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    Agent.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      writer.uint32(
      /* id 1, wireType 2 =*/
      10).string(message.agentType);
      writer.uint32(
      /* id 2, wireType 5 =*/
      21)["float"](message.mpx);
      writer.uint32(
      /* id 3, wireType 5 =*/
      29)["float"](message.mpy);
      writer.uint32(
      /* id 4, wireType 0 =*/
      32).int32(message.life);
      writer.uint32(
      /* id 5, wireType 0 =*/
      40).bool(message.groupKill);
      writer.uint32(
      /* id 6, wireType 0 =*/
      48).bool(message.isHero);
      writer.uint32(
      /* id 7, wireType 5 =*/
      61)["float"](message.rot);
      writer.uint32(
      /* id 8, wireType 5 =*/
      69)["float"](message.attackDura);
      writer.uint32(
      /* id 9, wireType 2 =*/
      74).string(message.aid);
      writer.uint32(
      /* id 10, wireType 2 =*/
      82).string(message.innerId);
      writer.uint32(
      /* id 11, wireType 2 =*/
      90).string(message.role);
      writer.uint32(
      /* id 12, wireType 0 =*/
      96).int32(message.objectId);
      writer.uint32(
      /* id 13, wireType 2 =*/
      106).string(message.actType);
      writer.uint32(
      /* id 14, wireType 5 =*/
      117)["float"](message.size);
      writer.uint32(
      /* id 15, wireType 0 =*/
      120).int32(message.level);
      if (message.epx != null && Object.hasOwnProperty.call(message, "epx")) writer.uint32(
      /* id 16, wireType 5 =*/
      133)["float"](message.epx);
      if (message.epy != null && Object.hasOwnProperty.call(message, "epy")) writer.uint32(
      /* id 17, wireType 5 =*/
      141)["float"](message.epy);
      if (message.eid != null && Object.hasOwnProperty.call(message, "eid")) writer.uint32(
      /* id 18, wireType 2 =*/
      146).string(message.eid);
      if (message.esize != null && Object.hasOwnProperty.call(message, "esize")) writer.uint32(
      /* id 19, wireType 5 =*/
      157)["float"](message.esize);
      if (message.tpx != null && Object.hasOwnProperty.call(message, "tpx")) writer.uint32(
      /* id 20, wireType 5 =*/
      165)["float"](message.tpx);
      if (message.tpy != null && Object.hasOwnProperty.call(message, "tpy")) writer.uint32(
      /* id 21, wireType 5 =*/
      173)["float"](message.tpy);
      if (message.updown != null && Object.hasOwnProperty.call(message, "updown")) writer.uint32(
      /* id 22, wireType 2 =*/
      178).string(message.updown);
      return writer;
    };
    /**
     * Encodes the specified Agent message, length delimited. Does not implicitly {@link AcWar.Agent.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AcWar.Agent
     * @static
     * @param {AcWar.IAgent} message Agent message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    Agent.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };
    /**
     * Decodes an Agent message from the specified reader or buffer.
     * @function decode
     * @memberof AcWar.Agent
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AcWar.Agent} Agent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    Agent.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.AcWar.Agent();

      while (reader.pos < end) {
        var tag = reader.uint32();

        switch (tag >>> 3) {
          case 1:
            message.agentType = reader.string();
            break;

          case 2:
            message.mpx = reader["float"]();
            break;

          case 3:
            message.mpy = reader["float"]();
            break;

          case 4:
            message.life = reader.int32();
            break;

          case 5:
            message.groupKill = reader.bool();
            break;

          case 6:
            message.isHero = reader.bool();
            break;

          case 7:
            message.rot = reader["float"]();
            break;

          case 8:
            message.attackDura = reader["float"]();
            break;

          case 9:
            message.aid = reader.string();
            break;

          case 10:
            message.innerId = reader.string();
            break;

          case 11:
            message.role = reader.string();
            break;

          case 12:
            message.objectId = reader.int32();
            break;

          case 13:
            message.actType = reader.string();
            break;

          case 14:
            message.size = reader["float"]();
            break;

          case 15:
            message.level = reader.int32();
            break;

          case 16:
            message.epx = reader["float"]();
            break;

          case 17:
            message.epy = reader["float"]();
            break;

          case 18:
            message.eid = reader.string();
            break;

          case 19:
            message.esize = reader["float"]();
            break;

          case 20:
            message.tpx = reader["float"]();
            break;

          case 21:
            message.tpy = reader["float"]();
            break;

          case 22:
            message.updown = reader.string();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      if (!message.hasOwnProperty("agentType")) throw $util.ProtocolError("missing required 'agentType'", {
        instance: message
      });
      if (!message.hasOwnProperty("mpx")) throw $util.ProtocolError("missing required 'mpx'", {
        instance: message
      });
      if (!message.hasOwnProperty("mpy")) throw $util.ProtocolError("missing required 'mpy'", {
        instance: message
      });
      if (!message.hasOwnProperty("life")) throw $util.ProtocolError("missing required 'life'", {
        instance: message
      });
      if (!message.hasOwnProperty("groupKill")) throw $util.ProtocolError("missing required 'groupKill'", {
        instance: message
      });
      if (!message.hasOwnProperty("isHero")) throw $util.ProtocolError("missing required 'isHero'", {
        instance: message
      });
      if (!message.hasOwnProperty("rot")) throw $util.ProtocolError("missing required 'rot'", {
        instance: message
      });
      if (!message.hasOwnProperty("attackDura")) throw $util.ProtocolError("missing required 'attackDura'", {
        instance: message
      });
      if (!message.hasOwnProperty("aid")) throw $util.ProtocolError("missing required 'aid'", {
        instance: message
      });
      if (!message.hasOwnProperty("innerId")) throw $util.ProtocolError("missing required 'innerId'", {
        instance: message
      });
      if (!message.hasOwnProperty("role")) throw $util.ProtocolError("missing required 'role'", {
        instance: message
      });
      if (!message.hasOwnProperty("objectId")) throw $util.ProtocolError("missing required 'objectId'", {
        instance: message
      });
      if (!message.hasOwnProperty("actType")) throw $util.ProtocolError("missing required 'actType'", {
        instance: message
      });
      if (!message.hasOwnProperty("size")) throw $util.ProtocolError("missing required 'size'", {
        instance: message
      });
      if (!message.hasOwnProperty("level")) throw $util.ProtocolError("missing required 'level'", {
        instance: message
      });
      return message;
    };
    /**
     * Decodes an Agent message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AcWar.Agent
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AcWar.Agent} Agent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    Agent.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };
    /**
     * Verifies an Agent message.
     * @function verify
     * @memberof AcWar.Agent
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */


    Agent.verify = function verify(message) {
      if (_typeof(message) !== "object" || message === null) return "object expected";
      if (!$util.isString(message.agentType)) return "agentType: string expected";
      if (typeof message.mpx !== "number") return "mpx: number expected";
      if (typeof message.mpy !== "number") return "mpy: number expected";
      if (!$util.isInteger(message.life)) return "life: integer expected";
      if (typeof message.groupKill !== "boolean") return "groupKill: boolean expected";
      if (typeof message.isHero !== "boolean") return "isHero: boolean expected";
      if (typeof message.rot !== "number") return "rot: number expected";
      if (typeof message.attackDura !== "number") return "attackDura: number expected";
      if (!$util.isString(message.aid)) return "aid: string expected";
      if (!$util.isString(message.innerId)) return "innerId: string expected";
      if (!$util.isString(message.role)) return "role: string expected";
      if (!$util.isInteger(message.objectId)) return "objectId: integer expected";
      if (!$util.isString(message.actType)) return "actType: string expected";
      if (typeof message.size !== "number") return "size: number expected";
      if (!$util.isInteger(message.level)) return "level: integer expected";
      if (message.epx != null && message.hasOwnProperty("epx")) if (typeof message.epx !== "number") return "epx: number expected";
      if (message.epy != null && message.hasOwnProperty("epy")) if (typeof message.epy !== "number") return "epy: number expected";
      if (message.eid != null && message.hasOwnProperty("eid")) if (!$util.isString(message.eid)) return "eid: string expected";
      if (message.esize != null && message.hasOwnProperty("esize")) if (typeof message.esize !== "number") return "esize: number expected";
      if (message.tpx != null && message.hasOwnProperty("tpx")) if (typeof message.tpx !== "number") return "tpx: number expected";
      if (message.tpy != null && message.hasOwnProperty("tpy")) if (typeof message.tpy !== "number") return "tpy: number expected";
      if (message.updown != null && message.hasOwnProperty("updown")) if (!$util.isString(message.updown)) return "updown: string expected";
      return null;
    };
    /**
     * Creates an Agent message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AcWar.Agent
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AcWar.Agent} Agent
     */


    Agent.fromObject = function fromObject(object) {
      if (object instanceof $root.AcWar.Agent) return object;
      var message = new $root.AcWar.Agent();
      if (object.agentType != null) message.agentType = String(object.agentType);
      if (object.mpx != null) message.mpx = Number(object.mpx);
      if (object.mpy != null) message.mpy = Number(object.mpy);
      if (object.life != null) message.life = object.life | 0;
      if (object.groupKill != null) message.groupKill = Boolean(object.groupKill);
      if (object.isHero != null) message.isHero = Boolean(object.isHero);
      if (object.rot != null) message.rot = Number(object.rot);
      if (object.attackDura != null) message.attackDura = Number(object.attackDura);
      if (object.aid != null) message.aid = String(object.aid);
      if (object.innerId != null) message.innerId = String(object.innerId);
      if (object.role != null) message.role = String(object.role);
      if (object.objectId != null) message.objectId = object.objectId | 0;
      if (object.actType != null) message.actType = String(object.actType);
      if (object.size != null) message.size = Number(object.size);
      if (object.level != null) message.level = object.level | 0;
      if (object.epx != null) message.epx = Number(object.epx);
      if (object.epy != null) message.epy = Number(object.epy);
      if (object.eid != null) message.eid = String(object.eid);
      if (object.esize != null) message.esize = Number(object.esize);
      if (object.tpx != null) message.tpx = Number(object.tpx);
      if (object.tpy != null) message.tpy = Number(object.tpy);
      if (object.updown != null) message.updown = String(object.updown);
      return message;
    };
    /**
     * Creates a plain object from an Agent message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AcWar.Agent
     * @static
     * @param {AcWar.Agent} message Agent
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */


    Agent.toObject = function toObject(message, options) {
      if (!options) options = {};
      var object = {};

      if (options.defaults) {
        object.agentType = "";
        object.mpx = 0;
        object.mpy = 0;
        object.life = 0;
        object.groupKill = false;
        object.isHero = false;
        object.rot = 0;
        object.attackDura = 0;
        object.aid = "";
        object.innerId = "";
        object.role = "";
        object.objectId = 0;
        object.actType = "";
        object.size = 0;
        object.level = 0;
        object.epx = 0;
        object.epy = 0;
        object.eid = "";
        object.esize = 0;
        object.tpx = 0;
        object.tpy = 0;
        object.updown = "";
      }

      if (message.agentType != null && message.hasOwnProperty("agentType")) object.agentType = message.agentType;
      if (message.mpx != null && message.hasOwnProperty("mpx")) object.mpx = options.json && !isFinite(message.mpx) ? String(message.mpx) : message.mpx;
      if (message.mpy != null && message.hasOwnProperty("mpy")) object.mpy = options.json && !isFinite(message.mpy) ? String(message.mpy) : message.mpy;
      if (message.life != null && message.hasOwnProperty("life")) object.life = message.life;
      if (message.groupKill != null && message.hasOwnProperty("groupKill")) object.groupKill = message.groupKill;
      if (message.isHero != null && message.hasOwnProperty("isHero")) object.isHero = message.isHero;
      if (message.rot != null && message.hasOwnProperty("rot")) object.rot = options.json && !isFinite(message.rot) ? String(message.rot) : message.rot;
      if (message.attackDura != null && message.hasOwnProperty("attackDura")) object.attackDura = options.json && !isFinite(message.attackDura) ? String(message.attackDura) : message.attackDura;
      if (message.aid != null && message.hasOwnProperty("aid")) object.aid = message.aid;
      if (message.innerId != null && message.hasOwnProperty("innerId")) object.innerId = message.innerId;
      if (message.role != null && message.hasOwnProperty("role")) object.role = message.role;
      if (message.objectId != null && message.hasOwnProperty("objectId")) object.objectId = message.objectId;
      if (message.actType != null && message.hasOwnProperty("actType")) object.actType = message.actType;
      if (message.size != null && message.hasOwnProperty("size")) object.size = options.json && !isFinite(message.size) ? String(message.size) : message.size;
      if (message.level != null && message.hasOwnProperty("level")) object.level = message.level;
      if (message.epx != null && message.hasOwnProperty("epx")) object.epx = options.json && !isFinite(message.epx) ? String(message.epx) : message.epx;
      if (message.epy != null && message.hasOwnProperty("epy")) object.epy = options.json && !isFinite(message.epy) ? String(message.epy) : message.epy;
      if (message.eid != null && message.hasOwnProperty("eid")) object.eid = message.eid;
      if (message.esize != null && message.hasOwnProperty("esize")) object.esize = options.json && !isFinite(message.esize) ? String(message.esize) : message.esize;
      if (message.tpx != null && message.hasOwnProperty("tpx")) object.tpx = options.json && !isFinite(message.tpx) ? String(message.tpx) : message.tpx;
      if (message.tpy != null && message.hasOwnProperty("tpy")) object.tpy = options.json && !isFinite(message.tpy) ? String(message.tpy) : message.tpy;
      if (message.updown != null && message.hasOwnProperty("updown")) object.updown = message.updown;
      return object;
    };
    /**
     * Converts this Agent to JSON.
     * @function toJSON
     * @memberof AcWar.Agent
     * @instance
     * @returns {Object.<string,*>} JSON object
     */


    Agent.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Agent;
  }();

  AcWar.Info = function () {
    /**
     * Properties of an Info.
     * @memberof AcWar
     * @interface IInfo
     * @property {Array.<AcWar.IAgent>|null} [base] Info base
     * @property {Array.<AcWar.IAgent>|null} [fort] Info fort
     * @property {Array.<AcWar.IAgent>|null} [agent] Info agent
     * @property {Array.<AcWar.IAgent>|null} [bullet] Info bullet
     * @property {Array.<AcWar.IAgent>|null} [rollLog] Info rollLog
     */

    /**
     * Constructs a new Info.
     * @memberof AcWar
     * @classdesc Represents an Info.
     * @implements IInfo
     * @constructor
     * @param {AcWar.IInfo=} [properties] Properties to set
     */
    function Info(properties) {
      this.base = [];
      this.fort = [];
      this.agent = [];
      this.bullet = [];
      this.rollLog = [];
      if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
      }
    }
    /**
     * Info base.
     * @member {Array.<AcWar.IAgent>} base
     * @memberof AcWar.Info
     * @instance
     */


    Info.prototype.base = $util.emptyArray;
    /**
     * Info fort.
     * @member {Array.<AcWar.IAgent>} fort
     * @memberof AcWar.Info
     * @instance
     */

    Info.prototype.fort = $util.emptyArray;
    /**
     * Info agent.
     * @member {Array.<AcWar.IAgent>} agent
     * @memberof AcWar.Info
     * @instance
     */

    Info.prototype.agent = $util.emptyArray;
    /**
     * Info bullet.
     * @member {Array.<AcWar.IAgent>} bullet
     * @memberof AcWar.Info
     * @instance
     */

    Info.prototype.bullet = $util.emptyArray;
    /**
     * Info rollLog.
     * @member {Array.<AcWar.IAgent>} rollLog
     * @memberof AcWar.Info
     * @instance
     */

    Info.prototype.rollLog = $util.emptyArray;
    /**
     * Creates a new Info instance using the specified properties.
     * @function create
     * @memberof AcWar.Info
     * @static
     * @param {AcWar.IInfo=} [properties] Properties to set
     * @returns {AcWar.Info} Info instance
     */

    Info.create = function create(properties) {
      return new Info(properties);
    };
    /**
     * Encodes the specified Info message. Does not implicitly {@link AcWar.Info.verify|verify} messages.
     * @function encode
     * @memberof AcWar.Info
     * @static
     * @param {AcWar.IInfo} message Info message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    Info.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (message.base != null && message.base.length) for (var i = 0; i < message.base.length; ++i) {
        $root.AcWar.Agent.encode(message.base[i], writer.uint32(
        /* id 1, wireType 2 =*/
        10).fork()).ldelim();
      }
      if (message.fort != null && message.fort.length) for (var i = 0; i < message.fort.length; ++i) {
        $root.AcWar.Agent.encode(message.fort[i], writer.uint32(
        /* id 2, wireType 2 =*/
        18).fork()).ldelim();
      }
      if (message.agent != null && message.agent.length) for (var i = 0; i < message.agent.length; ++i) {
        $root.AcWar.Agent.encode(message.agent[i], writer.uint32(
        /* id 3, wireType 2 =*/
        26).fork()).ldelim();
      }
      if (message.bullet != null && message.bullet.length) for (var i = 0; i < message.bullet.length; ++i) {
        $root.AcWar.Agent.encode(message.bullet[i], writer.uint32(
        /* id 4, wireType 2 =*/
        34).fork()).ldelim();
      }
      if (message.rollLog != null && message.rollLog.length) for (var i = 0; i < message.rollLog.length; ++i) {
        $root.AcWar.Agent.encode(message.rollLog[i], writer.uint32(
        /* id 5, wireType 2 =*/
        42).fork()).ldelim();
      }
      return writer;
    };
    /**
     * Encodes the specified Info message, length delimited. Does not implicitly {@link AcWar.Info.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AcWar.Info
     * @static
     * @param {AcWar.IInfo} message Info message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    Info.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };
    /**
     * Decodes an Info message from the specified reader or buffer.
     * @function decode
     * @memberof AcWar.Info
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AcWar.Info} Info
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    Info.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      var end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.AcWar.Info();

      while (reader.pos < end) {
        var tag = reader.uint32();

        switch (tag >>> 3) {
          case 1:
            if (!(message.base && message.base.length)) message.base = [];
            message.base.push($root.AcWar.Agent.decode(reader, reader.uint32()));
            break;

          case 2:
            if (!(message.fort && message.fort.length)) message.fort = [];
            message.fort.push($root.AcWar.Agent.decode(reader, reader.uint32()));
            break;

          case 3:
            if (!(message.agent && message.agent.length)) message.agent = [];
            message.agent.push($root.AcWar.Agent.decode(reader, reader.uint32()));
            break;

          case 4:
            if (!(message.bullet && message.bullet.length)) message.bullet = [];
            message.bullet.push($root.AcWar.Agent.decode(reader, reader.uint32()));
            break;

          case 5:
            if (!(message.rollLog && message.rollLog.length)) message.rollLog = [];
            message.rollLog.push($root.AcWar.Agent.decode(reader, reader.uint32()));
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    };
    /**
     * Decodes an Info message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AcWar.Info
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AcWar.Info} Info
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    Info.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };
    /**
     * Verifies an Info message.
     * @function verify
     * @memberof AcWar.Info
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */


    Info.verify = function verify(message) {
      if (_typeof(message) !== "object" || message === null) return "object expected";

      if (message.base != null && message.hasOwnProperty("base")) {
        if (!Array.isArray(message.base)) return "base: array expected";

        for (var i = 0; i < message.base.length; ++i) {
          var error = $root.AcWar.Agent.verify(message.base[i]);
          if (error) return "base." + error;
        }
      }

      if (message.fort != null && message.hasOwnProperty("fort")) {
        if (!Array.isArray(message.fort)) return "fort: array expected";

        for (var i = 0; i < message.fort.length; ++i) {
          var error = $root.AcWar.Agent.verify(message.fort[i]);
          if (error) return "fort." + error;
        }
      }

      if (message.agent != null && message.hasOwnProperty("agent")) {
        if (!Array.isArray(message.agent)) return "agent: array expected";

        for (var i = 0; i < message.agent.length; ++i) {
          var error = $root.AcWar.Agent.verify(message.agent[i]);
          if (error) return "agent." + error;
        }
      }

      if (message.bullet != null && message.hasOwnProperty("bullet")) {
        if (!Array.isArray(message.bullet)) return "bullet: array expected";

        for (var i = 0; i < message.bullet.length; ++i) {
          var error = $root.AcWar.Agent.verify(message.bullet[i]);
          if (error) return "bullet." + error;
        }
      }

      if (message.rollLog != null && message.hasOwnProperty("rollLog")) {
        if (!Array.isArray(message.rollLog)) return "rollLog: array expected";

        for (var i = 0; i < message.rollLog.length; ++i) {
          var error = $root.AcWar.Agent.verify(message.rollLog[i]);
          if (error) return "rollLog." + error;
        }
      }

      return null;
    };
    /**
     * Creates an Info message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AcWar.Info
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AcWar.Info} Info
     */


    Info.fromObject = function fromObject(object) {
      if (object instanceof $root.AcWar.Info) return object;
      var message = new $root.AcWar.Info();

      if (object.base) {
        if (!Array.isArray(object.base)) throw TypeError(".AcWar.Info.base: array expected");
        message.base = [];

        for (var i = 0; i < object.base.length; ++i) {
          if (_typeof(object.base[i]) !== "object") throw TypeError(".AcWar.Info.base: object expected");
          message.base[i] = $root.AcWar.Agent.fromObject(object.base[i]);
        }
      }

      if (object.fort) {
        if (!Array.isArray(object.fort)) throw TypeError(".AcWar.Info.fort: array expected");
        message.fort = [];

        for (var i = 0; i < object.fort.length; ++i) {
          if (_typeof(object.fort[i]) !== "object") throw TypeError(".AcWar.Info.fort: object expected");
          message.fort[i] = $root.AcWar.Agent.fromObject(object.fort[i]);
        }
      }

      if (object.agent) {
        if (!Array.isArray(object.agent)) throw TypeError(".AcWar.Info.agent: array expected");
        message.agent = [];

        for (var i = 0; i < object.agent.length; ++i) {
          if (_typeof(object.agent[i]) !== "object") throw TypeError(".AcWar.Info.agent: object expected");
          message.agent[i] = $root.AcWar.Agent.fromObject(object.agent[i]);
        }
      }

      if (object.bullet) {
        if (!Array.isArray(object.bullet)) throw TypeError(".AcWar.Info.bullet: array expected");
        message.bullet = [];

        for (var i = 0; i < object.bullet.length; ++i) {
          if (_typeof(object.bullet[i]) !== "object") throw TypeError(".AcWar.Info.bullet: object expected");
          message.bullet[i] = $root.AcWar.Agent.fromObject(object.bullet[i]);
        }
      }

      if (object.rollLog) {
        if (!Array.isArray(object.rollLog)) throw TypeError(".AcWar.Info.rollLog: array expected");
        message.rollLog = [];

        for (var i = 0; i < object.rollLog.length; ++i) {
          if (_typeof(object.rollLog[i]) !== "object") throw TypeError(".AcWar.Info.rollLog: object expected");
          message.rollLog[i] = $root.AcWar.Agent.fromObject(object.rollLog[i]);
        }
      }

      return message;
    };
    /**
     * Creates a plain object from an Info message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AcWar.Info
     * @static
     * @param {AcWar.Info} message Info
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */


    Info.toObject = function toObject(message, options) {
      if (!options) options = {};
      var object = {};

      if (options.arrays || options.defaults) {
        object.base = [];
        object.fort = [];
        object.agent = [];
        object.bullet = [];
        object.rollLog = [];
      }

      if (message.base && message.base.length) {
        object.base = [];

        for (var j = 0; j < message.base.length; ++j) {
          object.base[j] = $root.AcWar.Agent.toObject(message.base[j], options);
        }
      }

      if (message.fort && message.fort.length) {
        object.fort = [];

        for (var j = 0; j < message.fort.length; ++j) {
          object.fort[j] = $root.AcWar.Agent.toObject(message.fort[j], options);
        }
      }

      if (message.agent && message.agent.length) {
        object.agent = [];

        for (var j = 0; j < message.agent.length; ++j) {
          object.agent[j] = $root.AcWar.Agent.toObject(message.agent[j], options);
        }
      }

      if (message.bullet && message.bullet.length) {
        object.bullet = [];

        for (var j = 0; j < message.bullet.length; ++j) {
          object.bullet[j] = $root.AcWar.Agent.toObject(message.bullet[j], options);
        }
      }

      if (message.rollLog && message.rollLog.length) {
        object.rollLog = [];

        for (var j = 0; j < message.rollLog.length; ++j) {
          object.rollLog[j] = $root.AcWar.Agent.toObject(message.rollLog[j], options);
        }
      }

      return object;
    };
    /**
     * Converts this Info to JSON.
     * @function toJSON
     * @memberof AcWar.Info
     * @instance
     * @returns {Object.<string,*>} JSON object
     */


    Info.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Info;
  }();

  return AcWar;
}();

module.exports = $root;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2FjZGF0YTEuanMiXSwibmFtZXMiOlsiJHByb3RvYnVmIiwicmVxdWlyZSIsIiRSZWFkZXIiLCJSZWFkZXIiLCIkV3JpdGVyIiwiV3JpdGVyIiwiJHV0aWwiLCJ1dGlsIiwiJHJvb3QiLCJyb290cyIsIkFjV2FyIiwiQWdlbnQiLCJwcm9wZXJ0aWVzIiwia2V5cyIsIk9iamVjdCIsImkiLCJsZW5ndGgiLCJwcm90b3R5cGUiLCJhZ2VudFR5cGUiLCJtcHgiLCJtcHkiLCJsaWZlIiwiZ3JvdXBLaWxsIiwiaXNIZXJvIiwicm90IiwiYXR0YWNrRHVyYSIsImFpZCIsImlubmVySWQiLCJyb2xlIiwib2JqZWN0SWQiLCJhY3RUeXBlIiwic2l6ZSIsImxldmVsIiwiZXB4IiwiZXB5IiwiZWlkIiwiZXNpemUiLCJ0cHgiLCJ0cHkiLCJ1cGRvd24iLCJjcmVhdGUiLCJlbmNvZGUiLCJtZXNzYWdlIiwid3JpdGVyIiwidWludDMyIiwic3RyaW5nIiwiaW50MzIiLCJib29sIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiZW5jb2RlRGVsaW1pdGVkIiwibGRlbGltIiwiZGVjb2RlIiwicmVhZGVyIiwiZW5kIiwidW5kZWZpbmVkIiwibGVuIiwicG9zIiwidGFnIiwic2tpcFR5cGUiLCJQcm90b2NvbEVycm9yIiwiaW5zdGFuY2UiLCJkZWNvZGVEZWxpbWl0ZWQiLCJ2ZXJpZnkiLCJpc1N0cmluZyIsImlzSW50ZWdlciIsImZyb21PYmplY3QiLCJvYmplY3QiLCJTdHJpbmciLCJOdW1iZXIiLCJCb29sZWFuIiwidG9PYmplY3QiLCJvcHRpb25zIiwiZGVmYXVsdHMiLCJqc29uIiwiaXNGaW5pdGUiLCJ0b0pTT04iLCJjb25zdHJ1Y3RvciIsInRvSlNPTk9wdGlvbnMiLCJJbmZvIiwiYmFzZSIsImZvcnQiLCJhZ2VudCIsImJ1bGxldCIsInJvbGxMb2ciLCJlbXB0eUFycmF5IiwiZm9yayIsInB1c2giLCJBcnJheSIsImlzQXJyYXkiLCJlcnJv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LENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUduRCxPQUFPLENBQUMwQyxPQUFSLENBQWdCcEUsTUFBcEMsRUFBNEMsRUFBRTZFLENBQTlDO0FBQ0kxQixVQUFBQSxNQUFNLENBQUNpQixPQUFQLENBQWVTLENBQWYsSUFBb0JyRixLQUFLLENBQUNFLEtBQU4sQ0FBWUMsS0FBWixDQUFrQjRELFFBQWxCLENBQTJCN0IsT0FBTyxDQUFDMEMsT0FBUixDQUFnQlMsQ0FBaEIsQ0FBM0IsRUFBK0NyQixPQUEvQyxDQUFwQjtBQURKO0FBRUg7O0FBQ0QsYUFBT0wsTUFBUDtBQUNILEtBckNEO0FBdUNBOzs7Ozs7Ozs7QUFPQVksSUFBQUEsSUFBSSxDQUFDOUQsU0FBTCxDQUFlMkQsTUFBZixHQUF3QixTQUFTQSxNQUFULEdBQWtCO0FBQ3RDLGFBQU8sS0FBS0MsV0FBTCxDQUFpQk4sUUFBakIsQ0FBMEIsSUFBMUIsRUFBZ0N2RSxTQUFTLENBQUNPLElBQVYsQ0FBZXVFLGFBQS9DLENBQVA7QUFDSCxLQUZEOztBQUlBLFdBQU9DLElBQVA7QUFDSCxHQTNYWSxFQUFiOztBQTZYQSxTQUFPckUsS0FBUDtBQUNILENBamhDYSxFQUFkOztBQW1oQ0FvRixNQUFNLENBQUNDLE9BQVAsR0FBaUJ2RixLQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyplc2xpbnQtZGlzYWJsZSBibG9jay1zY29wZWQtdmFyLCBpZC1sZW5ndGgsIG5vLWNvbnRyb2wtcmVnZXgsIG5vLW1hZ2ljLW51bWJlcnMsIG5vLXByb3RvdHlwZS1idWlsdGlucywgbm8tcmVkZWNsYXJlLCBuby1zaGFkb3csIG5vLXZhciwgc29ydC12YXJzKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIgJHByb3RvYnVmID0gcmVxdWlyZShcIi4vcHJvdG9idWYuanNcIik7XG5cbi8vIENvbW1vbiBhbGlhc2VzXG52YXIgJFJlYWRlciA9ICRwcm90b2J1Zi5SZWFkZXIsICRXcml0ZXIgPSAkcHJvdG9idWYuV3JpdGVyLCAkdXRpbCA9ICRwcm90b2J1Zi51dGlsO1xuXG4vLyBFeHBvcnRlZCByb290IG5hbWVzcGFjZVxudmFyICRyb290ID0gJHByb3RvYnVmLnJvb3RzW1wiZGVmYXVsdFwiXSB8fCAoJHByb3RvYnVmLnJvb3RzW1wiZGVmYXVsdFwiXSA9IHt9KTtcblxuJHJvb3QuQWNXYXIgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAvKipcbiAgICAgKiBOYW1lc3BhY2UgQWNXYXIuXG4gICAgICogQGV4cG9ydHMgQWNXYXJcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICovXG4gICAgdmFyIEFjV2FyID0ge307XG5cbiAgICBBY1dhci5BZ2VudCA9IChmdW5jdGlvbigpIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUHJvcGVydGllcyBvZiBhbiBBZ2VudC5cbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyXG4gICAgICAgICAqIEBpbnRlcmZhY2UgSUFnZW50XG4gICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBhZ2VudFR5cGUgQWdlbnQgYWdlbnRUeXBlXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBtcHggQWdlbnQgbXB4XG4gICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBtcHkgQWdlbnQgbXB5XG4gICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBsaWZlIEFnZW50IGxpZmVcbiAgICAgICAgICogQHByb3BlcnR5IHtib29sZWFufSBncm91cEtpbGwgQWdlbnQgZ3JvdXBLaWxsXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNIZXJvIEFnZW50IGlzSGVyb1xuICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcn0gcm90IEFnZW50IHJvdFxuICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcn0gYXR0YWNrRHVyYSBBZ2VudCBhdHRhY2tEdXJhXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBhaWQgQWdlbnQgYWlkXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpbm5lcklkIEFnZW50IGlubmVySWRcbiAgICAgICAgICogQHByb3BlcnR5IHtzdHJpbmd9IHJvbGUgQWdlbnQgcm9sZVxuICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcn0gb2JqZWN0SWQgQWdlbnQgb2JqZWN0SWRcbiAgICAgICAgICogQHByb3BlcnR5IHtzdHJpbmd9IGFjdFR5cGUgQWdlbnQgYWN0VHlwZVxuICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcn0gc2l6ZSBBZ2VudCBzaXplXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBsZXZlbCBBZ2VudCBsZXZlbFxuICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcnxudWxsfSBbZXB4XSBBZ2VudCBlcHhcbiAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ8bnVsbH0gW2VweV0gQWdlbnQgZXB5XG4gICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfG51bGx9IFtlaWRdIEFnZW50IGVpZFxuICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcnxudWxsfSBbZXNpemVdIEFnZW50IGVzaXplXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfG51bGx9IFt0cHhdIEFnZW50IHRweFxuICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcnxudWxsfSBbdHB5XSBBZ2VudCB0cHlcbiAgICAgICAgICogQHByb3BlcnR5IHtzdHJpbmd8bnVsbH0gW3VwZG93bl0gQWdlbnQgdXBkb3duXG4gICAgICAgICAqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IEFnZW50LlxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXJcbiAgICAgICAgICogQGNsYXNzZGVzYyBSZXByZXNlbnRzIGFuIEFnZW50LlxuICAgICAgICAgKiBAaW1wbGVtZW50cyBJQWdlbnRcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXG4gICAgICAgICAqIEBwYXJhbSB7QWNXYXIuSUFnZW50PX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBBZ2VudChwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICBpZiAocHJvcGVydGllcylcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXNba2V5c1tpXV0gIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5c1tpXV0gPSBwcm9wZXJ0aWVzW2tleXNbaV1dO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFnZW50IGFnZW50VHlwZS5cbiAgICAgICAgICogQG1lbWJlciB7c3RyaW5nfSBhZ2VudFR5cGVcbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkFnZW50XG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgQWdlbnQucHJvdG90eXBlLmFnZW50VHlwZSA9IFwiXCI7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFnZW50IG1weC5cbiAgICAgICAgICogQG1lbWJlciB7bnVtYmVyfSBtcHhcbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkFnZW50XG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgQWdlbnQucHJvdG90eXBlLm1weCA9IDA7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFnZW50IG1weS5cbiAgICAgICAgICogQG1lbWJlciB7bnVtYmVyfSBtcHlcbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkFnZW50XG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgQWdlbnQucHJvdG90eXBlLm1weSA9IDA7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFnZW50IGxpZmUuXG4gICAgICAgICAqIEBtZW1iZXIge251bWJlcn0gbGlmZVxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXIuQWdlbnRcbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBBZ2VudC5wcm90b3R5cGUubGlmZSA9IDA7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFnZW50IGdyb3VwS2lsbC5cbiAgICAgICAgICogQG1lbWJlciB7Ym9vbGVhbn0gZ3JvdXBLaWxsXG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5BZ2VudFxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIEFnZW50LnByb3RvdHlwZS5ncm91cEtpbGwgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWdlbnQgaXNIZXJvLlxuICAgICAgICAgKiBAbWVtYmVyIHtib29sZWFufSBpc0hlcm9cbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkFnZW50XG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgQWdlbnQucHJvdG90eXBlLmlzSGVybyA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZ2VudCByb3QuXG4gICAgICAgICAqIEBtZW1iZXIge251bWJlcn0gcm90XG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5BZ2VudFxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIEFnZW50LnByb3RvdHlwZS5yb3QgPSAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZ2VudCBhdHRhY2tEdXJhLlxuICAgICAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IGF0dGFja0R1cmFcbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkFnZW50XG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgQWdlbnQucHJvdG90eXBlLmF0dGFja0R1cmEgPSAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZ2VudCBhaWQuXG4gICAgICAgICAqIEBtZW1iZXIge3N0cmluZ30gYWlkXG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5BZ2VudFxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIEFnZW50LnByb3RvdHlwZS5haWQgPSBcIlwiO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZ2VudCBpbm5lcklkLlxuICAgICAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IGlubmVySWRcbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkFnZW50XG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgQWdlbnQucHJvdG90eXBlLmlubmVySWQgPSBcIlwiO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZ2VudCByb2xlLlxuICAgICAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IHJvbGVcbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkFnZW50XG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgQWdlbnQucHJvdG90eXBlLnJvbGUgPSBcIlwiO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZ2VudCBvYmplY3RJZC5cbiAgICAgICAgICogQG1lbWJlciB7bnVtYmVyfSBvYmplY3RJZFxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXIuQWdlbnRcbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBBZ2VudC5wcm90b3R5cGUub2JqZWN0SWQgPSAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZ2VudCBhY3RUeXBlLlxuICAgICAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IGFjdFR5cGVcbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkFnZW50XG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgQWdlbnQucHJvdG90eXBlLmFjdFR5cGUgPSBcIlwiO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZ2VudCBzaXplLlxuICAgICAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IHNpemVcbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkFnZW50XG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgQWdlbnQucHJvdG90eXBlLnNpemUgPSAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZ2VudCBsZXZlbC5cbiAgICAgICAgICogQG1lbWJlciB7bnVtYmVyfSBsZXZlbFxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXIuQWdlbnRcbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBBZ2VudC5wcm90b3R5cGUubGV2ZWwgPSAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZ2VudCBlcHguXG4gICAgICAgICAqIEBtZW1iZXIge251bWJlcn0gZXB4XG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5BZ2VudFxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIEFnZW50LnByb3RvdHlwZS5lcHggPSAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZ2VudCBlcHkuXG4gICAgICAgICAqIEBtZW1iZXIge251bWJlcn0gZXB5XG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5BZ2VudFxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIEFnZW50LnByb3RvdHlwZS5lcHkgPSAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZ2VudCBlaWQuXG4gICAgICAgICAqIEBtZW1iZXIge3N0cmluZ30gZWlkXG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5BZ2VudFxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIEFnZW50LnByb3RvdHlwZS5laWQgPSBcIlwiO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZ2VudCBlc2l6ZS5cbiAgICAgICAgICogQG1lbWJlciB7bnVtYmVyfSBlc2l6ZVxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXIuQWdlbnRcbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBBZ2VudC5wcm90b3R5cGUuZXNpemUgPSAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZ2VudCB0cHguXG4gICAgICAgICAqIEBtZW1iZXIge251bWJlcn0gdHB4XG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5BZ2VudFxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIEFnZW50LnByb3RvdHlwZS50cHggPSAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZ2VudCB0cHkuXG4gICAgICAgICAqIEBtZW1iZXIge251bWJlcn0gdHB5XG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5BZ2VudFxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIEFnZW50LnByb3RvdHlwZS50cHkgPSAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZ2VudCB1cGRvd24uXG4gICAgICAgICAqIEBtZW1iZXIge3N0cmluZ30gdXBkb3duXG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5BZ2VudFxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIEFnZW50LnByb3RvdHlwZS51cGRvd24gPSBcIlwiO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IEFnZW50IGluc3RhbmNlIHVzaW5nIHRoZSBzcGVjaWZpZWQgcHJvcGVydGllcy5cbiAgICAgICAgICogQGZ1bmN0aW9uIGNyZWF0ZVxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXIuQWdlbnRcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge0FjV2FyLklBZ2VudD19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxuICAgICAgICAgKiBAcmV0dXJucyB7QWNXYXIuQWdlbnR9IEFnZW50IGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBBZ2VudC5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUocHJvcGVydGllcykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBBZ2VudChwcm9wZXJ0aWVzKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIEFnZW50IG1lc3NhZ2UuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIEFjV2FyLkFnZW50LnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxuICAgICAgICAgKiBAZnVuY3Rpb24gZW5jb2RlXG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5BZ2VudFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7QWNXYXIuSUFnZW50fSBtZXNzYWdlIEFnZW50IG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cbiAgICAgICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxuICAgICAgICAgKi9cbiAgICAgICAgQWdlbnQuZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICAgICAgaWYgKCF3cml0ZXIpXG4gICAgICAgICAgICAgICAgd3JpdGVyID0gJFdyaXRlci5jcmVhdGUoKTtcbiAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMSwgd2lyZVR5cGUgMiA9Ki8xMCkuc3RyaW5nKG1lc3NhZ2UuYWdlbnRUeXBlKTtcbiAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMiwgd2lyZVR5cGUgNSA9Ki8yMSkuZmxvYXQobWVzc2FnZS5tcHgpO1xuICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAzLCB3aXJlVHlwZSA1ID0qLzI5KS5mbG9hdChtZXNzYWdlLm1weSk7XG4gICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDQsIHdpcmVUeXBlIDAgPSovMzIpLmludDMyKG1lc3NhZ2UubGlmZSk7XG4gICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDUsIHdpcmVUeXBlIDAgPSovNDApLmJvb2wobWVzc2FnZS5ncm91cEtpbGwpO1xuICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCA2LCB3aXJlVHlwZSAwID0qLzQ4KS5ib29sKG1lc3NhZ2UuaXNIZXJvKTtcbiAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgNywgd2lyZVR5cGUgNSA9Ki82MSkuZmxvYXQobWVzc2FnZS5yb3QpO1xuICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCA4LCB3aXJlVHlwZSA1ID0qLzY5KS5mbG9hdChtZXNzYWdlLmF0dGFja0R1cmEpO1xuICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCA5LCB3aXJlVHlwZSAyID0qLzc0KS5zdHJpbmcobWVzc2FnZS5haWQpO1xuICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAxMCwgd2lyZVR5cGUgMiA9Ki84Mikuc3RyaW5nKG1lc3NhZ2UuaW5uZXJJZCk7XG4gICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDExLCB3aXJlVHlwZSAyID0qLzkwKS5zdHJpbmcobWVzc2FnZS5yb2xlKTtcbiAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMTIsIHdpcmVUeXBlIDAgPSovOTYpLmludDMyKG1lc3NhZ2Uub2JqZWN0SWQpO1xuICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAxMywgd2lyZVR5cGUgMiA9Ki8xMDYpLnN0cmluZyhtZXNzYWdlLmFjdFR5cGUpO1xuICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAxNCwgd2lyZVR5cGUgNSA9Ki8xMTcpLmZsb2F0KG1lc3NhZ2Uuc2l6ZSk7XG4gICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDE1LCB3aXJlVHlwZSAwID0qLzEyMCkuaW50MzIobWVzc2FnZS5sZXZlbCk7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5lcHggIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcImVweFwiKSlcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDE2LCB3aXJlVHlwZSA1ID0qLzEzMykuZmxvYXQobWVzc2FnZS5lcHgpO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuZXB5ICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJlcHlcIikpXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAxNywgd2lyZVR5cGUgNSA9Ki8xNDEpLmZsb2F0KG1lc3NhZ2UuZXB5KTtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmVpZCAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwiZWlkXCIpKVxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMTgsIHdpcmVUeXBlIDIgPSovMTQ2KS5zdHJpbmcobWVzc2FnZS5laWQpO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuZXNpemUgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcImVzaXplXCIpKVxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMTksIHdpcmVUeXBlIDUgPSovMTU3KS5mbG9hdChtZXNzYWdlLmVzaXplKTtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnRweCAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwidHB4XCIpKVxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMjAsIHdpcmVUeXBlIDUgPSovMTY1KS5mbG9hdChtZXNzYWdlLnRweCk7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS50cHkgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcInRweVwiKSlcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDIxLCB3aXJlVHlwZSA1ID0qLzE3MykuZmxvYXQobWVzc2FnZS50cHkpO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UudXBkb3duICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJ1cGRvd25cIikpXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAyMiwgd2lyZVR5cGUgMiA9Ki8xNzgpLnN0cmluZyhtZXNzYWdlLnVwZG93bik7XG4gICAgICAgICAgICByZXR1cm4gd3JpdGVyO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgQWdlbnQgbWVzc2FnZSwgbGVuZ3RoIGRlbGltaXRlZC4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgQWNXYXIuQWdlbnQudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXG4gICAgICAgICAqIEBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWRcbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkFnZW50XG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtBY1dhci5JQWdlbnR9IG1lc3NhZ2UgQWdlbnQgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXG4gICAgICAgICAqL1xuICAgICAgICBBZ2VudC5lbmNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWQobWVzc2FnZSwgd3JpdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGUobWVzc2FnZSwgd3JpdGVyKS5sZGVsaW0oKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGVjb2RlcyBhbiBBZ2VudCBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLlxuICAgICAgICAgKiBAZnVuY3Rpb24gZGVjb2RlXG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5BZ2VudFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aF0gTWVzc2FnZSBsZW5ndGggaWYga25vd24gYmVmb3JlaGFuZFxuICAgICAgICAgKiBAcmV0dXJucyB7QWNXYXIuQWdlbnR9IEFnZW50XG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXG4gICAgICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAgICAgKi9cbiAgICAgICAgQWdlbnQuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHJlYWRlciwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcbiAgICAgICAgICAgICAgICByZWFkZXIgPSAkUmVhZGVyLmNyZWF0ZShyZWFkZXIpO1xuICAgICAgICAgICAgdmFyIGVuZCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gcmVhZGVyLmxlbiA6IHJlYWRlci5wb3MgKyBsZW5ndGgsIG1lc3NhZ2UgPSBuZXcgJHJvb3QuQWNXYXIuQWdlbnQoKTtcbiAgICAgICAgICAgIHdoaWxlIChyZWFkZXIucG9zIDwgZW5kKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhZyA9IHJlYWRlci51aW50MzIoKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRhZyA+Pj4gMykge1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5hZ2VudFR5cGUgPSByZWFkZXIuc3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5tcHggPSByZWFkZXIuZmxvYXQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLm1weSA9IHJlYWRlci5mbG9hdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UubGlmZSA9IHJlYWRlci5pbnQzMigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuZ3JvdXBLaWxsID0gcmVhZGVyLmJvb2woKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmlzSGVybyA9IHJlYWRlci5ib29sKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5yb3QgPSByZWFkZXIuZmxvYXQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmF0dGFja0R1cmEgPSByZWFkZXIuZmxvYXQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmFpZCA9IHJlYWRlci5zdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5pbm5lcklkID0gcmVhZGVyLnN0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDExOlxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnJvbGUgPSByZWFkZXIuc3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2Uub2JqZWN0SWQgPSByZWFkZXIuaW50MzIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5hY3RUeXBlID0gcmVhZGVyLnN0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDE0OlxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnNpemUgPSByZWFkZXIuZmxvYXQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxNTpcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5sZXZlbCA9IHJlYWRlci5pbnQzMigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDE2OlxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmVweCA9IHJlYWRlci5mbG9hdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDE3OlxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmVweSA9IHJlYWRlci5mbG9hdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDE4OlxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmVpZCA9IHJlYWRlci5zdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxOTpcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5lc2l6ZSA9IHJlYWRlci5mbG9hdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDIwOlxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnRweCA9IHJlYWRlci5mbG9hdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDIxOlxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnRweSA9IHJlYWRlci5mbG9hdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDIyOlxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnVwZG93biA9IHJlYWRlci5zdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnNraXBUeXBlKHRhZyAmIDcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJhZ2VudFR5cGVcIikpXG4gICAgICAgICAgICAgICAgdGhyb3cgJHV0aWwuUHJvdG9jb2xFcnJvcihcIm1pc3NpbmcgcmVxdWlyZWQgJ2FnZW50VHlwZSdcIiwgeyBpbnN0YW5jZTogbWVzc2FnZSB9KTtcbiAgICAgICAgICAgIGlmICghbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIm1weFwiKSlcbiAgICAgICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAnbXB4J1wiLCB7IGluc3RhbmNlOiBtZXNzYWdlIH0pO1xuICAgICAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwibXB5XCIpKVxuICAgICAgICAgICAgICAgIHRocm93ICR1dGlsLlByb3RvY29sRXJyb3IoXCJtaXNzaW5nIHJlcXVpcmVkICdtcHknXCIsIHsgaW5zdGFuY2U6IG1lc3NhZ2UgfSk7XG4gICAgICAgICAgICBpZiAoIW1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJsaWZlXCIpKVxuICAgICAgICAgICAgICAgIHRocm93ICR1dGlsLlByb3RvY29sRXJyb3IoXCJtaXNzaW5nIHJlcXVpcmVkICdsaWZlJ1wiLCB7IGluc3RhbmNlOiBtZXNzYWdlIH0pO1xuICAgICAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwiZ3JvdXBLaWxsXCIpKVxuICAgICAgICAgICAgICAgIHRocm93ICR1dGlsLlByb3RvY29sRXJyb3IoXCJtaXNzaW5nIHJlcXVpcmVkICdncm91cEtpbGwnXCIsIHsgaW5zdGFuY2U6IG1lc3NhZ2UgfSk7XG4gICAgICAgICAgICBpZiAoIW1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJpc0hlcm9cIikpXG4gICAgICAgICAgICAgICAgdGhyb3cgJHV0aWwuUHJvdG9jb2xFcnJvcihcIm1pc3NpbmcgcmVxdWlyZWQgJ2lzSGVybydcIiwgeyBpbnN0YW5jZTogbWVzc2FnZSB9KTtcbiAgICAgICAgICAgIGlmICghbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInJvdFwiKSlcbiAgICAgICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAncm90J1wiLCB7IGluc3RhbmNlOiBtZXNzYWdlIH0pO1xuICAgICAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwiYXR0YWNrRHVyYVwiKSlcbiAgICAgICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAnYXR0YWNrRHVyYSdcIiwgeyBpbnN0YW5jZTogbWVzc2FnZSB9KTtcbiAgICAgICAgICAgIGlmICghbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImFpZFwiKSlcbiAgICAgICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAnYWlkJ1wiLCB7IGluc3RhbmNlOiBtZXNzYWdlIH0pO1xuICAgICAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwiaW5uZXJJZFwiKSlcbiAgICAgICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAnaW5uZXJJZCdcIiwgeyBpbnN0YW5jZTogbWVzc2FnZSB9KTtcbiAgICAgICAgICAgIGlmICghbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInJvbGVcIikpXG4gICAgICAgICAgICAgICAgdGhyb3cgJHV0aWwuUHJvdG9jb2xFcnJvcihcIm1pc3NpbmcgcmVxdWlyZWQgJ3JvbGUnXCIsIHsgaW5zdGFuY2U6IG1lc3NhZ2UgfSk7XG4gICAgICAgICAgICBpZiAoIW1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJvYmplY3RJZFwiKSlcbiAgICAgICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAnb2JqZWN0SWQnXCIsIHsgaW5zdGFuY2U6IG1lc3NhZ2UgfSk7XG4gICAgICAgICAgICBpZiAoIW1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJhY3RUeXBlXCIpKVxuICAgICAgICAgICAgICAgIHRocm93ICR1dGlsLlByb3RvY29sRXJyb3IoXCJtaXNzaW5nIHJlcXVpcmVkICdhY3RUeXBlJ1wiLCB7IGluc3RhbmNlOiBtZXNzYWdlIH0pO1xuICAgICAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwic2l6ZVwiKSlcbiAgICAgICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAnc2l6ZSdcIiwgeyBpbnN0YW5jZTogbWVzc2FnZSB9KTtcbiAgICAgICAgICAgIGlmICghbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImxldmVsXCIpKVxuICAgICAgICAgICAgICAgIHRocm93ICR1dGlsLlByb3RvY29sRXJyb3IoXCJtaXNzaW5nIHJlcXVpcmVkICdsZXZlbCdcIiwgeyBpbnN0YW5jZTogbWVzc2FnZSB9KTtcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWNvZGVzIGFuIEFnZW50IG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIsIGxlbmd0aCBkZWxpbWl0ZWQuXG4gICAgICAgICAqIEBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWRcbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkFnZW50XG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICAgICAqIEByZXR1cm5zIHtBY1dhci5BZ2VudH0gQWdlbnRcbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcbiAgICAgICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXG4gICAgICAgICAqL1xuICAgICAgICBBZ2VudC5kZWNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWQocmVhZGVyKSB7XG4gICAgICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcbiAgICAgICAgICAgICAgICByZWFkZXIgPSBuZXcgJFJlYWRlcihyZWFkZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVmVyaWZpZXMgYW4gQWdlbnQgbWVzc2FnZS5cbiAgICAgICAgICogQGZ1bmN0aW9uIHZlcmlmeVxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXIuQWdlbnRcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIFBsYWluIG9iamVjdCB0byB2ZXJpZnlcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ3xudWxsfSBgbnVsbGAgaWYgdmFsaWQsIG90aGVyd2lzZSB0aGUgcmVhc29uIHdoeSBpdCBpcyBub3RcbiAgICAgICAgICovXG4gICAgICAgIEFnZW50LnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeShtZXNzYWdlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09IFwib2JqZWN0XCIgfHwgbWVzc2FnZSA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJvYmplY3QgZXhwZWN0ZWRcIjtcbiAgICAgICAgICAgIGlmICghJHV0aWwuaXNTdHJpbmcobWVzc2FnZS5hZ2VudFR5cGUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcImFnZW50VHlwZTogc3RyaW5nIGV4cGVjdGVkXCI7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UubXB4ICE9PSBcIm51bWJlclwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIm1weDogbnVtYmVyIGV4cGVjdGVkXCI7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UubXB5ICE9PSBcIm51bWJlclwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIm1weTogbnVtYmVyIGV4cGVjdGVkXCI7XG4gICAgICAgICAgICBpZiAoISR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLmxpZmUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcImxpZmU6IGludGVnZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZS5ncm91cEtpbGwgIT09IFwiYm9vbGVhblwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBcImdyb3VwS2lsbDogYm9vbGVhbiBleHBlY3RlZFwiO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlLmlzSGVybyAhPT0gXCJib29sZWFuXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiaXNIZXJvOiBib29sZWFuIGV4cGVjdGVkXCI7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2Uucm90ICE9PSBcIm51bWJlclwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBcInJvdDogbnVtYmVyIGV4cGVjdGVkXCI7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UuYXR0YWNrRHVyYSAhPT0gXCJudW1iZXJcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJhdHRhY2tEdXJhOiBudW1iZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgICAgIGlmICghJHV0aWwuaXNTdHJpbmcobWVzc2FnZS5haWQpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcImFpZDogc3RyaW5nIGV4cGVjdGVkXCI7XG4gICAgICAgICAgICBpZiAoISR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UuaW5uZXJJZCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiaW5uZXJJZDogc3RyaW5nIGV4cGVjdGVkXCI7XG4gICAgICAgICAgICBpZiAoISR1dGlsLmlzU3RyaW5nKG1lc3NhZ2Uucm9sZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwicm9sZTogc3RyaW5nIGV4cGVjdGVkXCI7XG4gICAgICAgICAgICBpZiAoISR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLm9iamVjdElkKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJvYmplY3RJZDogaW50ZWdlciBleHBlY3RlZFwiO1xuICAgICAgICAgICAgaWYgKCEkdXRpbC5pc1N0cmluZyhtZXNzYWdlLmFjdFR5cGUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcImFjdFR5cGU6IHN0cmluZyBleHBlY3RlZFwiO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlLnNpemUgIT09IFwibnVtYmVyXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic2l6ZTogbnVtYmVyIGV4cGVjdGVkXCI7XG4gICAgICAgICAgICBpZiAoISR1dGlsLmlzSW50ZWdlcihtZXNzYWdlLmxldmVsKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJsZXZlbDogaW50ZWdlciBleHBlY3RlZFwiO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuZXB4ICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImVweFwiKSlcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UuZXB4ICE9PSBcIm51bWJlclwiKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJlcHg6IG51bWJlciBleHBlY3RlZFwiO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuZXB5ICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImVweVwiKSlcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UuZXB5ICE9PSBcIm51bWJlclwiKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJlcHk6IG51bWJlciBleHBlY3RlZFwiO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuZWlkICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImVpZFwiKSlcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UuZWlkKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiZWlkOiBzdHJpbmcgZXhwZWN0ZWRcIjtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmVzaXplICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImVzaXplXCIpKVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZS5lc2l6ZSAhPT0gXCJudW1iZXJcIilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiZXNpemU6IG51bWJlciBleHBlY3RlZFwiO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UudHB4ICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInRweFwiKSlcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UudHB4ICE9PSBcIm51bWJlclwiKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ0cHg6IG51bWJlciBleHBlY3RlZFwiO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UudHB5ICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInRweVwiKSlcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UudHB5ICE9PSBcIm51bWJlclwiKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ0cHk6IG51bWJlciBleHBlY3RlZFwiO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UudXBkb3duICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInVwZG93blwiKSlcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UudXBkb3duKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidXBkb3duOiBzdHJpbmcgZXhwZWN0ZWRcIjtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGVzIGFuIEFnZW50IG1lc3NhZ2UgZnJvbSBhIHBsYWluIG9iamVjdC4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gdGhlaXIgcmVzcGVjdGl2ZSBpbnRlcm5hbCB0eXBlcy5cbiAgICAgICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkFnZW50XG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gb2JqZWN0IFBsYWluIG9iamVjdFxuICAgICAgICAgKiBAcmV0dXJucyB7QWNXYXIuQWdlbnR9IEFnZW50XG4gICAgICAgICAqL1xuICAgICAgICBBZ2VudC5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICAgICAgICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiAkcm9vdC5BY1dhci5BZ2VudClcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgJHJvb3QuQWNXYXIuQWdlbnQoKTtcbiAgICAgICAgICAgIGlmIChvYmplY3QuYWdlbnRUeXBlICE9IG51bGwpXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5hZ2VudFR5cGUgPSBTdHJpbmcob2JqZWN0LmFnZW50VHlwZSk7XG4gICAgICAgICAgICBpZiAob2JqZWN0Lm1weCAhPSBudWxsKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UubXB4ID0gTnVtYmVyKG9iamVjdC5tcHgpO1xuICAgICAgICAgICAgaWYgKG9iamVjdC5tcHkgIT0gbnVsbClcbiAgICAgICAgICAgICAgICBtZXNzYWdlLm1weSA9IE51bWJlcihvYmplY3QubXB5KTtcbiAgICAgICAgICAgIGlmIChvYmplY3QubGlmZSAhPSBudWxsKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UubGlmZSA9IG9iamVjdC5saWZlIHwgMDtcbiAgICAgICAgICAgIGlmIChvYmplY3QuZ3JvdXBLaWxsICE9IG51bGwpXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5ncm91cEtpbGwgPSBCb29sZWFuKG9iamVjdC5ncm91cEtpbGwpO1xuICAgICAgICAgICAgaWYgKG9iamVjdC5pc0hlcm8gIT0gbnVsbClcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmlzSGVybyA9IEJvb2xlYW4ob2JqZWN0LmlzSGVybyk7XG4gICAgICAgICAgICBpZiAob2JqZWN0LnJvdCAhPSBudWxsKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2Uucm90ID0gTnVtYmVyKG9iamVjdC5yb3QpO1xuICAgICAgICAgICAgaWYgKG9iamVjdC5hdHRhY2tEdXJhICE9IG51bGwpXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5hdHRhY2tEdXJhID0gTnVtYmVyKG9iamVjdC5hdHRhY2tEdXJhKTtcbiAgICAgICAgICAgIGlmIChvYmplY3QuYWlkICE9IG51bGwpXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5haWQgPSBTdHJpbmcob2JqZWN0LmFpZCk7XG4gICAgICAgICAgICBpZiAob2JqZWN0LmlubmVySWQgIT0gbnVsbClcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmlubmVySWQgPSBTdHJpbmcob2JqZWN0LmlubmVySWQpO1xuICAgICAgICAgICAgaWYgKG9iamVjdC5yb2xlICE9IG51bGwpXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5yb2xlID0gU3RyaW5nKG9iamVjdC5yb2xlKTtcbiAgICAgICAgICAgIGlmIChvYmplY3Qub2JqZWN0SWQgIT0gbnVsbClcbiAgICAgICAgICAgICAgICBtZXNzYWdlLm9iamVjdElkID0gb2JqZWN0Lm9iamVjdElkIHwgMDtcbiAgICAgICAgICAgIGlmIChvYmplY3QuYWN0VHlwZSAhPSBudWxsKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuYWN0VHlwZSA9IFN0cmluZyhvYmplY3QuYWN0VHlwZSk7XG4gICAgICAgICAgICBpZiAob2JqZWN0LnNpemUgIT0gbnVsbClcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnNpemUgPSBOdW1iZXIob2JqZWN0LnNpemUpO1xuICAgICAgICAgICAgaWYgKG9iamVjdC5sZXZlbCAhPSBudWxsKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UubGV2ZWwgPSBvYmplY3QubGV2ZWwgfCAwO1xuICAgICAgICAgICAgaWYgKG9iamVjdC5lcHggIT0gbnVsbClcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmVweCA9IE51bWJlcihvYmplY3QuZXB4KTtcbiAgICAgICAgICAgIGlmIChvYmplY3QuZXB5ICE9IG51bGwpXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5lcHkgPSBOdW1iZXIob2JqZWN0LmVweSk7XG4gICAgICAgICAgICBpZiAob2JqZWN0LmVpZCAhPSBudWxsKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuZWlkID0gU3RyaW5nKG9iamVjdC5laWQpO1xuICAgICAgICAgICAgaWYgKG9iamVjdC5lc2l6ZSAhPSBudWxsKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuZXNpemUgPSBOdW1iZXIob2JqZWN0LmVzaXplKTtcbiAgICAgICAgICAgIGlmIChvYmplY3QudHB4ICE9IG51bGwpXG4gICAgICAgICAgICAgICAgbWVzc2FnZS50cHggPSBOdW1iZXIob2JqZWN0LnRweCk7XG4gICAgICAgICAgICBpZiAob2JqZWN0LnRweSAhPSBudWxsKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UudHB5ID0gTnVtYmVyKG9iamVjdC50cHkpO1xuICAgICAgICAgICAgaWYgKG9iamVjdC51cGRvd24gIT0gbnVsbClcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnVwZG93biA9IFN0cmluZyhvYmplY3QudXBkb3duKTtcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGVzIGEgcGxhaW4gb2JqZWN0IGZyb20gYW4gQWdlbnQgbWVzc2FnZS4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gb3RoZXIgdHlwZXMgaWYgc3BlY2lmaWVkLlxuICAgICAgICAgKiBAZnVuY3Rpb24gdG9PYmplY3RcbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkFnZW50XG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtBY1dhci5BZ2VudH0gbWVzc2FnZSBBZ2VudFxuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5JQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcbiAgICAgICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBQbGFpbiBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIEFnZW50LnRvT2JqZWN0ID0gZnVuY3Rpb24gdG9PYmplY3QobWVzc2FnZSwgb3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zKVxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgICAgIHZhciBvYmplY3QgPSB7fTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRzKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0LmFnZW50VHlwZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgb2JqZWN0Lm1weCA9IDA7XG4gICAgICAgICAgICAgICAgb2JqZWN0Lm1weSA9IDA7XG4gICAgICAgICAgICAgICAgb2JqZWN0LmxpZmUgPSAwO1xuICAgICAgICAgICAgICAgIG9iamVjdC5ncm91cEtpbGwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBvYmplY3QuaXNIZXJvID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgb2JqZWN0LnJvdCA9IDA7XG4gICAgICAgICAgICAgICAgb2JqZWN0LmF0dGFja0R1cmEgPSAwO1xuICAgICAgICAgICAgICAgIG9iamVjdC5haWQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIG9iamVjdC5pbm5lcklkID0gXCJcIjtcbiAgICAgICAgICAgICAgICBvYmplY3Qucm9sZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgb2JqZWN0Lm9iamVjdElkID0gMDtcbiAgICAgICAgICAgICAgICBvYmplY3QuYWN0VHlwZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgb2JqZWN0LnNpemUgPSAwO1xuICAgICAgICAgICAgICAgIG9iamVjdC5sZXZlbCA9IDA7XG4gICAgICAgICAgICAgICAgb2JqZWN0LmVweCA9IDA7XG4gICAgICAgICAgICAgICAgb2JqZWN0LmVweSA9IDA7XG4gICAgICAgICAgICAgICAgb2JqZWN0LmVpZCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgb2JqZWN0LmVzaXplID0gMDtcbiAgICAgICAgICAgICAgICBvYmplY3QudHB4ID0gMDtcbiAgICAgICAgICAgICAgICBvYmplY3QudHB5ID0gMDtcbiAgICAgICAgICAgICAgICBvYmplY3QudXBkb3duID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmFnZW50VHlwZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJhZ2VudFR5cGVcIikpXG4gICAgICAgICAgICAgICAgb2JqZWN0LmFnZW50VHlwZSA9IG1lc3NhZ2UuYWdlbnRUeXBlO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UubXB4ICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIm1weFwiKSlcbiAgICAgICAgICAgICAgICBvYmplY3QubXB4ID0gb3B0aW9ucy5qc29uICYmICFpc0Zpbml0ZShtZXNzYWdlLm1weCkgPyBTdHJpbmcobWVzc2FnZS5tcHgpIDogbWVzc2FnZS5tcHg7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5tcHkgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwibXB5XCIpKVxuICAgICAgICAgICAgICAgIG9iamVjdC5tcHkgPSBvcHRpb25zLmpzb24gJiYgIWlzRmluaXRlKG1lc3NhZ2UubXB5KSA/IFN0cmluZyhtZXNzYWdlLm1weSkgOiBtZXNzYWdlLm1weTtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmxpZmUgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwibGlmZVwiKSlcbiAgICAgICAgICAgICAgICBvYmplY3QubGlmZSA9IG1lc3NhZ2UubGlmZTtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmdyb3VwS2lsbCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJncm91cEtpbGxcIikpXG4gICAgICAgICAgICAgICAgb2JqZWN0Lmdyb3VwS2lsbCA9IG1lc3NhZ2UuZ3JvdXBLaWxsO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuaXNIZXJvICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImlzSGVyb1wiKSlcbiAgICAgICAgICAgICAgICBvYmplY3QuaXNIZXJvID0gbWVzc2FnZS5pc0hlcm87XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5yb3QgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwicm90XCIpKVxuICAgICAgICAgICAgICAgIG9iamVjdC5yb3QgPSBvcHRpb25zLmpzb24gJiYgIWlzRmluaXRlKG1lc3NhZ2Uucm90KSA/IFN0cmluZyhtZXNzYWdlLnJvdCkgOiBtZXNzYWdlLnJvdDtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmF0dGFja0R1cmEgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiYXR0YWNrRHVyYVwiKSlcbiAgICAgICAgICAgICAgICBvYmplY3QuYXR0YWNrRHVyYSA9IG9wdGlvbnMuanNvbiAmJiAhaXNGaW5pdGUobWVzc2FnZS5hdHRhY2tEdXJhKSA/IFN0cmluZyhtZXNzYWdlLmF0dGFja0R1cmEpIDogbWVzc2FnZS5hdHRhY2tEdXJhO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuYWlkICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImFpZFwiKSlcbiAgICAgICAgICAgICAgICBvYmplY3QuYWlkID0gbWVzc2FnZS5haWQ7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5pbm5lcklkICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImlubmVySWRcIikpXG4gICAgICAgICAgICAgICAgb2JqZWN0LmlubmVySWQgPSBtZXNzYWdlLmlubmVySWQ7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5yb2xlICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInJvbGVcIikpXG4gICAgICAgICAgICAgICAgb2JqZWN0LnJvbGUgPSBtZXNzYWdlLnJvbGU7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5vYmplY3RJZCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJvYmplY3RJZFwiKSlcbiAgICAgICAgICAgICAgICBvYmplY3Qub2JqZWN0SWQgPSBtZXNzYWdlLm9iamVjdElkO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuYWN0VHlwZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJhY3RUeXBlXCIpKVxuICAgICAgICAgICAgICAgIG9iamVjdC5hY3RUeXBlID0gbWVzc2FnZS5hY3RUeXBlO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2Uuc2l6ZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJzaXplXCIpKVxuICAgICAgICAgICAgICAgIG9iamVjdC5zaXplID0gb3B0aW9ucy5qc29uICYmICFpc0Zpbml0ZShtZXNzYWdlLnNpemUpID8gU3RyaW5nKG1lc3NhZ2Uuc2l6ZSkgOiBtZXNzYWdlLnNpemU7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5sZXZlbCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJsZXZlbFwiKSlcbiAgICAgICAgICAgICAgICBvYmplY3QubGV2ZWwgPSBtZXNzYWdlLmxldmVsO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuZXB4ICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImVweFwiKSlcbiAgICAgICAgICAgICAgICBvYmplY3QuZXB4ID0gb3B0aW9ucy5qc29uICYmICFpc0Zpbml0ZShtZXNzYWdlLmVweCkgPyBTdHJpbmcobWVzc2FnZS5lcHgpIDogbWVzc2FnZS5lcHg7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5lcHkgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiZXB5XCIpKVxuICAgICAgICAgICAgICAgIG9iamVjdC5lcHkgPSBvcHRpb25zLmpzb24gJiYgIWlzRmluaXRlKG1lc3NhZ2UuZXB5KSA/IFN0cmluZyhtZXNzYWdlLmVweSkgOiBtZXNzYWdlLmVweTtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmVpZCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJlaWRcIikpXG4gICAgICAgICAgICAgICAgb2JqZWN0LmVpZCA9IG1lc3NhZ2UuZWlkO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuZXNpemUgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiZXNpemVcIikpXG4gICAgICAgICAgICAgICAgb2JqZWN0LmVzaXplID0gb3B0aW9ucy5qc29uICYmICFpc0Zpbml0ZShtZXNzYWdlLmVzaXplKSA/IFN0cmluZyhtZXNzYWdlLmVzaXplKSA6IG1lc3NhZ2UuZXNpemU7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS50cHggIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwidHB4XCIpKVxuICAgICAgICAgICAgICAgIG9iamVjdC50cHggPSBvcHRpb25zLmpzb24gJiYgIWlzRmluaXRlKG1lc3NhZ2UudHB4KSA/IFN0cmluZyhtZXNzYWdlLnRweCkgOiBtZXNzYWdlLnRweDtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnRweSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ0cHlcIikpXG4gICAgICAgICAgICAgICAgb2JqZWN0LnRweSA9IG9wdGlvbnMuanNvbiAmJiAhaXNGaW5pdGUobWVzc2FnZS50cHkpID8gU3RyaW5nKG1lc3NhZ2UudHB5KSA6IG1lc3NhZ2UudHB5O1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UudXBkb3duICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInVwZG93blwiKSlcbiAgICAgICAgICAgICAgICBvYmplY3QudXBkb3duID0gbWVzc2FnZS51cGRvd247XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyB0aGlzIEFnZW50IHRvIEpTT04uXG4gICAgICAgICAqIEBmdW5jdGlvbiB0b0pTT05cbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkFnZW50XG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IEpTT04gb2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICBBZ2VudC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IudG9PYmplY3QodGhpcywgJHByb3RvYnVmLnV0aWwudG9KU09OT3B0aW9ucyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIEFnZW50O1xuICAgIH0pKCk7XG5cbiAgICBBY1dhci5JbmZvID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQcm9wZXJ0aWVzIG9mIGFuIEluZm8uXG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhclxuICAgICAgICAgKiBAaW50ZXJmYWNlIElJbmZvXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7QXJyYXkuPEFjV2FyLklBZ2VudD58bnVsbH0gW2Jhc2VdIEluZm8gYmFzZVxuICAgICAgICAgKiBAcHJvcGVydHkge0FycmF5LjxBY1dhci5JQWdlbnQ+fG51bGx9IFtmb3J0XSBJbmZvIGZvcnRcbiAgICAgICAgICogQHByb3BlcnR5IHtBcnJheS48QWNXYXIuSUFnZW50PnxudWxsfSBbYWdlbnRdIEluZm8gYWdlbnRcbiAgICAgICAgICogQHByb3BlcnR5IHtBcnJheS48QWNXYXIuSUFnZW50PnxudWxsfSBbYnVsbGV0XSBJbmZvIGJ1bGxldFxuICAgICAgICAgKiBAcHJvcGVydHkge0FycmF5LjxBY1dhci5JQWdlbnQ+fG51bGx9IFtyb2xsTG9nXSBJbmZvIHJvbGxMb2dcbiAgICAgICAgICovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnN0cnVjdHMgYSBuZXcgSW5mby5cbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyXG4gICAgICAgICAqIEBjbGFzc2Rlc2MgUmVwcmVzZW50cyBhbiBJbmZvLlxuICAgICAgICAgKiBAaW1wbGVtZW50cyBJSW5mb1xuICAgICAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgICAgICogQHBhcmFtIHtBY1dhci5JSW5mbz19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gSW5mbyhwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICB0aGlzLmJhc2UgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuZm9ydCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5hZ2VudCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5idWxsZXQgPSBbXTtcbiAgICAgICAgICAgIHRoaXMucm9sbExvZyA9IFtdO1xuICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMpXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzW2tleXNbaV1dICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleXNbaV1dID0gcHJvcGVydGllc1trZXlzW2ldXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbmZvIGJhc2UuXG4gICAgICAgICAqIEBtZW1iZXIge0FycmF5LjxBY1dhci5JQWdlbnQ+fSBiYXNlXG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5JbmZvXG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgSW5mby5wcm90b3R5cGUuYmFzZSA9ICR1dGlsLmVtcHR5QXJyYXk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluZm8gZm9ydC5cbiAgICAgICAgICogQG1lbWJlciB7QXJyYXkuPEFjV2FyLklBZ2VudD59IGZvcnRcbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkluZm9cbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBJbmZvLnByb3RvdHlwZS5mb3J0ID0gJHV0aWwuZW1wdHlBcnJheTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSW5mbyBhZ2VudC5cbiAgICAgICAgICogQG1lbWJlciB7QXJyYXkuPEFjV2FyLklBZ2VudD59IGFnZW50XG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5JbmZvXG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgSW5mby5wcm90b3R5cGUuYWdlbnQgPSAkdXRpbC5lbXB0eUFycmF5O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbmZvIGJ1bGxldC5cbiAgICAgICAgICogQG1lbWJlciB7QXJyYXkuPEFjV2FyLklBZ2VudD59IGJ1bGxldFxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXIuSW5mb1xuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIEluZm8ucHJvdG90eXBlLmJ1bGxldCA9ICR1dGlsLmVtcHR5QXJyYXk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluZm8gcm9sbExvZy5cbiAgICAgICAgICogQG1lbWJlciB7QXJyYXkuPEFjV2FyLklBZ2VudD59IHJvbGxMb2dcbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkluZm9cbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBJbmZvLnByb3RvdHlwZS5yb2xsTG9nID0gJHV0aWwuZW1wdHlBcnJheTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBhIG5ldyBJbmZvIGluc3RhbmNlIHVzaW5nIHRoZSBzcGVjaWZpZWQgcHJvcGVydGllcy5cbiAgICAgICAgICogQGZ1bmN0aW9uIGNyZWF0ZVxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXIuSW5mb1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7QWNXYXIuSUluZm89fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcbiAgICAgICAgICogQHJldHVybnMge0FjV2FyLkluZm99IEluZm8gaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIEluZm8uY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSW5mbyhwcm9wZXJ0aWVzKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIEluZm8gbWVzc2FnZS4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgQWNXYXIuSW5mby52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgICAgICogQGZ1bmN0aW9uIGVuY29kZVxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXIuSW5mb1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7QWNXYXIuSUluZm99IG1lc3NhZ2UgSW5mbyBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXG4gICAgICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgICAgICovXG4gICAgICAgIEluZm8uZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICAgICAgaWYgKCF3cml0ZXIpXG4gICAgICAgICAgICAgICAgd3JpdGVyID0gJFdyaXRlci5jcmVhdGUoKTtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmJhc2UgIT0gbnVsbCAmJiBtZXNzYWdlLmJhc2UubGVuZ3RoKVxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWVzc2FnZS5iYXNlLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgICAgICAkcm9vdC5BY1dhci5BZ2VudC5lbmNvZGUobWVzc2FnZS5iYXNlW2ldLCB3cml0ZXIudWludDMyKC8qIGlkIDEsIHdpcmVUeXBlIDIgPSovMTApLmZvcmsoKSkubGRlbGltKCk7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5mb3J0ICE9IG51bGwgJiYgbWVzc2FnZS5mb3J0Lmxlbmd0aClcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1lc3NhZ2UuZm9ydC5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICAgICAgJHJvb3QuQWNXYXIuQWdlbnQuZW5jb2RlKG1lc3NhZ2UuZm9ydFtpXSwgd3JpdGVyLnVpbnQzMigvKiBpZCAyLCB3aXJlVHlwZSAyID0qLzE4KS5mb3JrKCkpLmxkZWxpbSgpO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuYWdlbnQgIT0gbnVsbCAmJiBtZXNzYWdlLmFnZW50Lmxlbmd0aClcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1lc3NhZ2UuYWdlbnQubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgICAgICRyb290LkFjV2FyLkFnZW50LmVuY29kZShtZXNzYWdlLmFnZW50W2ldLCB3cml0ZXIudWludDMyKC8qIGlkIDMsIHdpcmVUeXBlIDIgPSovMjYpLmZvcmsoKSkubGRlbGltKCk7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5idWxsZXQgIT0gbnVsbCAmJiBtZXNzYWdlLmJ1bGxldC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXNzYWdlLmJ1bGxldC5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICAgICAgJHJvb3QuQWNXYXIuQWdlbnQuZW5jb2RlKG1lc3NhZ2UuYnVsbGV0W2ldLCB3cml0ZXIudWludDMyKC8qIGlkIDQsIHdpcmVUeXBlIDIgPSovMzQpLmZvcmsoKSkubGRlbGltKCk7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5yb2xsTG9nICE9IG51bGwgJiYgbWVzc2FnZS5yb2xsTG9nLmxlbmd0aClcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1lc3NhZ2Uucm9sbExvZy5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICAgICAgJHJvb3QuQWNXYXIuQWdlbnQuZW5jb2RlKG1lc3NhZ2Uucm9sbExvZ1tpXSwgd3JpdGVyLnVpbnQzMigvKiBpZCA1LCB3aXJlVHlwZSAyID0qLzQyKS5mb3JrKCkpLmxkZWxpbSgpO1xuICAgICAgICAgICAgcmV0dXJuIHdyaXRlcjtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIEluZm8gbWVzc2FnZSwgbGVuZ3RoIGRlbGltaXRlZC4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgQWNXYXIuSW5mby52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgICAgICogQGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZFxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXIuSW5mb1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwYXJhbSB7QWNXYXIuSUluZm99IG1lc3NhZ2UgSW5mbyBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXG4gICAgICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgICAgICovXG4gICAgICAgIEluZm8uZW5jb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikubGRlbGltKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlY29kZXMgYW4gSW5mbyBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLlxuICAgICAgICAgKiBAZnVuY3Rpb24gZGVjb2RlXG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5JbmZvXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXSBNZXNzYWdlIGxlbmd0aCBpZiBrbm93biBiZWZvcmVoYW5kXG4gICAgICAgICAqIEByZXR1cm5zIHtBY1dhci5JbmZvfSBJbmZvXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXG4gICAgICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAgICAgKi9cbiAgICAgICAgSW5mby5kZWNvZGUgPSBmdW5jdGlvbiBkZWNvZGUocmVhZGVyLCBsZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxuICAgICAgICAgICAgICAgIHJlYWRlciA9ICRSZWFkZXIuY3JlYXRlKHJlYWRlcik7XG4gICAgICAgICAgICB2YXIgZW5kID0gbGVuZ3RoID09PSB1bmRlZmluZWQgPyByZWFkZXIubGVuIDogcmVhZGVyLnBvcyArIGxlbmd0aCwgbWVzc2FnZSA9IG5ldyAkcm9vdC5BY1dhci5JbmZvKCk7XG4gICAgICAgICAgICB3aGlsZSAocmVhZGVyLnBvcyA8IGVuZCkge1xuICAgICAgICAgICAgICAgIHZhciB0YWcgPSByZWFkZXIudWludDMyKCk7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0YWcgPj4+IDMpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKG1lc3NhZ2UuYmFzZSAmJiBtZXNzYWdlLmJhc2UubGVuZ3RoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuYmFzZSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmJhc2UucHVzaCgkcm9vdC5BY1dhci5BZ2VudC5kZWNvZGUocmVhZGVyLCByZWFkZXIudWludDMyKCkpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIShtZXNzYWdlLmZvcnQgJiYgbWVzc2FnZS5mb3J0Lmxlbmd0aCkpXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmZvcnQgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5mb3J0LnB1c2goJHJvb3QuQWNXYXIuQWdlbnQuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEobWVzc2FnZS5hZ2VudCAmJiBtZXNzYWdlLmFnZW50Lmxlbmd0aCkpXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmFnZW50ID0gW107XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuYWdlbnQucHVzaCgkcm9vdC5BY1dhci5BZ2VudC5kZWNvZGUocmVhZGVyLCByZWFkZXIudWludDMyKCkpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoIShtZXNzYWdlLmJ1bGxldCAmJiBtZXNzYWdlLmJ1bGxldC5sZW5ndGgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5idWxsZXQgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5idWxsZXQucHVzaCgkcm9vdC5BY1dhci5BZ2VudC5kZWNvZGUocmVhZGVyLCByZWFkZXIudWludDMyKCkpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICBpZiAoIShtZXNzYWdlLnJvbGxMb2cgJiYgbWVzc2FnZS5yb2xsTG9nLmxlbmd0aCkpXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnJvbGxMb2cgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5yb2xsTG9nLnB1c2goJHJvb3QuQWNXYXIuQWdlbnQuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5za2lwVHlwZSh0YWcgJiA3KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlY29kZXMgYW4gSW5mbyBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLCBsZW5ndGggZGVsaW1pdGVkLlxuICAgICAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5JbmZvXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICAgICAqIEByZXR1cm5zIHtBY1dhci5JbmZvfSBJbmZvXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXG4gICAgICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAgICAgKi9cbiAgICAgICAgSW5mby5kZWNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWQocmVhZGVyKSB7XG4gICAgICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcbiAgICAgICAgICAgICAgICByZWFkZXIgPSBuZXcgJFJlYWRlcihyZWFkZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVmVyaWZpZXMgYW4gSW5mbyBtZXNzYWdlLlxuICAgICAgICAgKiBAZnVuY3Rpb24gdmVyaWZ5XG4gICAgICAgICAqIEBtZW1iZXJvZiBBY1dhci5JbmZvXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gbWVzc2FnZSBQbGFpbiBvYmplY3QgdG8gdmVyaWZ5XG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gYG51bGxgIGlmIHZhbGlkLCBvdGhlcndpc2UgdGhlIHJlYXNvbiB3aHkgaXQgaXMgbm90XG4gICAgICAgICAqL1xuICAgICAgICBJbmZvLnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeShtZXNzYWdlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09IFwib2JqZWN0XCIgfHwgbWVzc2FnZSA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJvYmplY3QgZXhwZWN0ZWRcIjtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmJhc2UgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiYmFzZVwiKSkge1xuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShtZXNzYWdlLmJhc2UpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJiYXNlOiBhcnJheSBleHBlY3RlZFwiO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWVzc2FnZS5iYXNlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9ICRyb290LkFjV2FyLkFnZW50LnZlcmlmeShtZXNzYWdlLmJhc2VbaV0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJiYXNlLlwiICsgZXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuZm9ydCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJmb3J0XCIpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG1lc3NhZ2UuZm9ydCkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcImZvcnQ6IGFycmF5IGV4cGVjdGVkXCI7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXNzYWdlLmZvcnQubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gJHJvb3QuQWNXYXIuQWdlbnQudmVyaWZ5KG1lc3NhZ2UuZm9ydFtpXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImZvcnQuXCIgKyBlcnJvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5hZ2VudCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJhZ2VudFwiKSkge1xuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShtZXNzYWdlLmFnZW50KSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiYWdlbnQ6IGFycmF5IGV4cGVjdGVkXCI7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXNzYWdlLmFnZW50Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9ICRyb290LkFjV2FyLkFnZW50LnZlcmlmeShtZXNzYWdlLmFnZW50W2ldKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiYWdlbnQuXCIgKyBlcnJvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5idWxsZXQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiYnVsbGV0XCIpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG1lc3NhZ2UuYnVsbGV0KSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiYnVsbGV0OiBhcnJheSBleHBlY3RlZFwiO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWVzc2FnZS5idWxsZXQubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gJHJvb3QuQWNXYXIuQWdlbnQudmVyaWZ5KG1lc3NhZ2UuYnVsbGV0W2ldKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiYnVsbGV0LlwiICsgZXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1lc3NhZ2Uucm9sbExvZyAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJyb2xsTG9nXCIpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG1lc3NhZ2Uucm9sbExvZykpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInJvbGxMb2c6IGFycmF5IGV4cGVjdGVkXCI7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXNzYWdlLnJvbGxMb2cubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gJHJvb3QuQWNXYXIuQWdlbnQudmVyaWZ5KG1lc3NhZ2Uucm9sbExvZ1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInJvbGxMb2cuXCIgKyBlcnJvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBhbiBJbmZvIG1lc3NhZ2UgZnJvbSBhIHBsYWluIG9iamVjdC4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gdGhlaXIgcmVzcGVjdGl2ZSBpbnRlcm5hbCB0eXBlcy5cbiAgICAgICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkluZm9cbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBvYmplY3QgUGxhaW4gb2JqZWN0XG4gICAgICAgICAqIEByZXR1cm5zIHtBY1dhci5JbmZvfSBJbmZvXG4gICAgICAgICAqL1xuICAgICAgICBJbmZvLmZyb21PYmplY3QgPSBmdW5jdGlvbiBmcm9tT2JqZWN0KG9iamVjdCkge1xuICAgICAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mICRyb290LkFjV2FyLkluZm8pXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gbmV3ICRyb290LkFjV2FyLkluZm8oKTtcbiAgICAgICAgICAgIGlmIChvYmplY3QuYmFzZSkge1xuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShvYmplY3QuYmFzZSkpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIi5BY1dhci5JbmZvLmJhc2U6IGFycmF5IGV4cGVjdGVkXCIpO1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UuYmFzZSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0LmJhc2UubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QuYmFzZVtpXSAhPT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIi5BY1dhci5JbmZvLmJhc2U6IG9iamVjdCBleHBlY3RlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5iYXNlW2ldID0gJHJvb3QuQWNXYXIuQWdlbnQuZnJvbU9iamVjdChvYmplY3QuYmFzZVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9iamVjdC5mb3J0KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG9iamVjdC5mb3J0KSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiLkFjV2FyLkluZm8uZm9ydDogYXJyYXkgZXhwZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgbWVzc2FnZS5mb3J0ID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3QuZm9ydC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdC5mb3J0W2ldICE9PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiLkFjV2FyLkluZm8uZm9ydDogb2JqZWN0IGV4cGVjdGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmZvcnRbaV0gPSAkcm9vdC5BY1dhci5BZ2VudC5mcm9tT2JqZWN0KG9iamVjdC5mb3J0W2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob2JqZWN0LmFnZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG9iamVjdC5hZ2VudCkpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIi5BY1dhci5JbmZvLmFnZW50OiBhcnJheSBleHBlY3RlZFwiKTtcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmFnZW50ID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3QuYWdlbnQubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QuYWdlbnRbaV0gIT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCIuQWNXYXIuSW5mby5hZ2VudDogb2JqZWN0IGV4cGVjdGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmFnZW50W2ldID0gJHJvb3QuQWNXYXIuQWdlbnQuZnJvbU9iamVjdChvYmplY3QuYWdlbnRbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvYmplY3QuYnVsbGV0KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG9iamVjdC5idWxsZXQpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCIuQWNXYXIuSW5mby5idWxsZXQ6IGFycmF5IGV4cGVjdGVkXCIpO1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UuYnVsbGV0ID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3QuYnVsbGV0Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0LmJ1bGxldFtpXSAhPT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIi5BY1dhci5JbmZvLmJ1bGxldDogb2JqZWN0IGV4cGVjdGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmJ1bGxldFtpXSA9ICRyb290LkFjV2FyLkFnZW50LmZyb21PYmplY3Qob2JqZWN0LmJ1bGxldFtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9iamVjdC5yb2xsTG9nKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG9iamVjdC5yb2xsTG9nKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiLkFjV2FyLkluZm8ucm9sbExvZzogYXJyYXkgZXhwZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgbWVzc2FnZS5yb2xsTG9nID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3Qucm9sbExvZy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdC5yb2xsTG9nW2ldICE9PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiLkFjV2FyLkluZm8ucm9sbExvZzogb2JqZWN0IGV4cGVjdGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnJvbGxMb2dbaV0gPSAkcm9vdC5BY1dhci5BZ2VudC5mcm9tT2JqZWN0KG9iamVjdC5yb2xsTG9nW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGFuIEluZm8gbWVzc2FnZS4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gb3RoZXIgdHlwZXMgaWYgc3BlY2lmaWVkLlxuICAgICAgICAgKiBAZnVuY3Rpb24gdG9PYmplY3RcbiAgICAgICAgICogQG1lbWJlcm9mIEFjV2FyLkluZm9cbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcGFyYW0ge0FjV2FyLkluZm99IG1lc3NhZ2UgSW5mb1xuICAgICAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5JQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcbiAgICAgICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBQbGFpbiBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIEluZm8udG9PYmplY3QgPSBmdW5jdGlvbiB0b09iamVjdChtZXNzYWdlLCBvcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMpXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICAgICAgdmFyIG9iamVjdCA9IHt9O1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuYXJyYXlzIHx8IG9wdGlvbnMuZGVmYXVsdHMpIHtcbiAgICAgICAgICAgICAgICBvYmplY3QuYmFzZSA9IFtdO1xuICAgICAgICAgICAgICAgIG9iamVjdC5mb3J0ID0gW107XG4gICAgICAgICAgICAgICAgb2JqZWN0LmFnZW50ID0gW107XG4gICAgICAgICAgICAgICAgb2JqZWN0LmJ1bGxldCA9IFtdO1xuICAgICAgICAgICAgICAgIG9iamVjdC5yb2xsTG9nID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5iYXNlICYmIG1lc3NhZ2UuYmFzZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBvYmplY3QuYmFzZSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbWVzc2FnZS5iYXNlLmxlbmd0aDsgKytqKVxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuYmFzZVtqXSA9ICRyb290LkFjV2FyLkFnZW50LnRvT2JqZWN0KG1lc3NhZ2UuYmFzZVtqXSwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5mb3J0ICYmIG1lc3NhZ2UuZm9ydC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBvYmplY3QuZm9ydCA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbWVzc2FnZS5mb3J0Lmxlbmd0aDsgKytqKVxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuZm9ydFtqXSA9ICRyb290LkFjV2FyLkFnZW50LnRvT2JqZWN0KG1lc3NhZ2UuZm9ydFtqXSwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5hZ2VudCAmJiBtZXNzYWdlLmFnZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIG9iamVjdC5hZ2VudCA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbWVzc2FnZS5hZ2VudC5sZW5ndGg7ICsrailcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LmFnZW50W2pdID0gJHJvb3QuQWNXYXIuQWdlbnQudG9PYmplY3QobWVzc2FnZS5hZ2VudFtqXSwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5idWxsZXQgJiYgbWVzc2FnZS5idWxsZXQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0LmJ1bGxldCA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbWVzc2FnZS5idWxsZXQubGVuZ3RoOyArK2opXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5idWxsZXRbal0gPSAkcm9vdC5BY1dhci5BZ2VudC50b09iamVjdChtZXNzYWdlLmJ1bGxldFtqXSwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5yb2xsTG9nICYmIG1lc3NhZ2Uucm9sbExvZy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBvYmplY3Qucm9sbExvZyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbWVzc2FnZS5yb2xsTG9nLmxlbmd0aDsgKytqKVxuICAgICAgICAgICAgICAgICAgICBvYmplY3Qucm9sbExvZ1tqXSA9ICRyb290LkFjV2FyLkFnZW50LnRvT2JqZWN0KG1lc3NhZ2Uucm9sbExvZ1tqXSwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyB0aGlzIEluZm8gdG8gSlNPTi5cbiAgICAgICAgICogQGZ1bmN0aW9uIHRvSlNPTlxuICAgICAgICAgKiBAbWVtYmVyb2YgQWNXYXIuSW5mb1xuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBKU09OIG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgSW5mby5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IudG9PYmplY3QodGhpcywgJHByb3RvYnVmLnV0aWwudG9KU09OT3B0aW9ucyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIEluZm87XG4gICAgfSkoKTtcblxuICAgIHJldHVybiBBY1dhcjtcbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gJHJvb3Q7XG4iXX0=