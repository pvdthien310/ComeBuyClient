"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestSlice = exports.doDistribution = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _requestProductAPI = _interopRequireDefault(require("../../api/requestProductAPI"));

var _extraReducers;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var doDistribution = (0, _toolkit.createAsyncThunk)('request/doDistribution', function _callee(data, _ref) {
  var rejectedWithValue, response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          rejectedWithValue = _ref.rejectedWithValue;
          _context.next = 3;
          return regeneratorRuntime.awrap(_requestProductAPI["default"].doDistribution(data));

        case 3:
          response = _context.sent;

          if (response) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", rejectedWithValue('Distribution failed'));

        case 6:
          return _context.abrupt("return", response.data);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.doDistribution = doDistribution;
var requestSlice = (0, _toolkit.createSlice)({
  name: 'request',
  initialState: {
    requestList: [],
    loading: false
  },
  extraReducers: (_extraReducers = {}, _defineProperty(_extraReducers, doDistribution.pending, function (state) {
    state.loading = true;
  }), _defineProperty(_extraReducers, doDistribution.fulfilled, function (state, action) {
    state.loading = false;
    state.branchList = action.payload;
  }), _defineProperty(_extraReducers, doDistribution.rejected, function (state) {
    state.loading = false;
  }), _extraReducers)
});
exports.requestSlice = requestSlice;