"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styles = require("@material-ui/core/styles");

var _GriddableRow = _interopRequireDefault(require("./GriddableRow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GriddableRowHeader = (0, _styles.withStyles)(function (theme) {
  return {
    root: {
      backgroundColor: theme.palette.grey[100]
    }
  };
})(_GriddableRow.default);
var _default = GriddableRowHeader;
exports.default = _default;