"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _GriddableRow = _interopRequireDefault(require("./GriddableRow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GriddableRowGeneric = function GriddableRowGeneric(props) {
  return /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(_GriddableRow.default, {
    container: true,
    justifyContent: "center"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: "auto"
  }, /*#__PURE__*/_react.default.createElement(_core.Box, {
    py: 1
  }, props.children))));
};

var _default = GriddableRowGeneric;
exports.default = _default;