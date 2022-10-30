"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _baseAPI = _interopRequireDefault(require("./baseAPI.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var baseURL = 'requestProduct';
var requestProdApi = {
  createReq: function createReq(data) {
    var res;
    return regeneratorRuntime.async(function createReq$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res = _baseAPI["default"].post("/".concat(baseURL, "/makeReq"), data)["catch"](function (err) {
              return err.response;
            });
            return _context.abrupt("return", res);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  createReqItem: function createReqItem(data) {
    var res = _baseAPI["default"].post("/".concat(baseURL, "/makeReqItem"), data)["catch"](function (err) {
      return err.response;
    });

    return res;
  },
  getReqToMine: function getReqToMine(branchId) {
    var res;
    return regeneratorRuntime.async(function getReqToMine$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            res = _baseAPI["default"].get("/".concat(baseURL, "/to/").concat(branchId))["catch"](function (err) {
              return err.response;
            });
            return _context2.abrupt("return", res);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  getReqFromMe: function getReqFromMe(branchId) {
    var res;
    return regeneratorRuntime.async(function getReqFromMe$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            res = _baseAPI["default"].get("/".concat(baseURL, "/from/").concat(branchId))["catch"](function (err) {
              return err.response;
            });
            return _context3.abrupt("return", res);

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  getReqById: function getReqById(reqId) {
    var res;
    return regeneratorRuntime.async(function getReqById$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            res = _baseAPI["default"].get("/".concat(baseURL, "/").concat(reqId))["catch"](function (err) {
              return err.response;
            });
            return _context4.abrupt("return", res);

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  updateReq: function updateReq(data) {
    var res;
    return regeneratorRuntime.async(function updateReq$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            res = _baseAPI["default"].put("/".concat(baseURL, "/").concat(data.requestId), data)["catch"](function (err) {
              return err.response;
            });
            return _context5.abrupt("return", res);

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    });
  },
  updateReqStatus: function updateReqStatus(data) {
    var res;
    return regeneratorRuntime.async(function updateReqStatus$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            res = _baseAPI["default"].put("/".concat(baseURL, "/update-prodReq-status/").concat(data.type), data)["catch"](function (err) {
              return err.response;
            });
            return _context6.abrupt("return", res);

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    });
  },
  doDistribution: function doDistribution(data) {
    var res;
    return regeneratorRuntime.async(function doDistribution$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            res = _baseAPI["default"].post("/".concat(baseURL, "/distribution"), data)["catch"](function (err) {
              return err.response;
            });
            return _context7.abrupt("return", res);

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    });
  },
  checkForDistAll: function checkForDistAll(amount) {
    var res;
    return regeneratorRuntime.async(function checkForDistAll$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            res = _baseAPI["default"].post("/".concat(baseURL, "/checkForDistAll"), amount)["catch"](function (err) {
              return err.message;
            });
            return _context8.abrupt("return", res);

          case 2:
          case "end":
            return _context8.stop();
        }
      }
    });
  }
};
var _default = requestProdApi;
exports["default"] = _default;