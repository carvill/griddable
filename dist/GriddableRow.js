"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GriddableRowHeader = exports.GriddableRow = void 0;

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

var _colors = require("@material-ui/core/colors");

var GriddableRow = (0, _styles.withStyles)(function (theme) {
  return {
    root: {
      borderBottom: '1px solid',
      borderBottomColor: _colors.grey[100],
      minHeight: theme.spacing(5),
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
      '&:not(.GridableHeader):hover': {
        backgroundColor: _colors.grey[50]
      },
      '&:is(.GriddableRowClickable):not(.GridableHeader)': {
        cursor: 'pointer'
      },
      '&:is(.GriddableRowSelected):not(.GridableHeader)': {
        backgroundColor: _colors.green[50]
      }
    }
  };
})(_core.Grid);
exports.GriddableRow = GriddableRow;
var GriddableRowHeader = (0, _styles.withStyles)(function (theme) {
  return {
    root: {
      backgroundColor: _colors.grey[100]
    }
  };
})(GriddableRow);
exports.GriddableRowHeader = GriddableRowHeader;