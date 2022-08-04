"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styles = require("@mui/material/styles");

var _GriddableRow = _interopRequireDefault(require("./GriddableRow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GriddableRowHeader = (0, _styles.styled)(_GriddableRow.default)(function (_a) {
  var theme = _a.theme;
  return {
    backgroundColor: theme.palette.grey[100]
  };
});
var _default = GriddableRowHeader;
exports.default = _default;