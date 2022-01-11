"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

var GriddableRow = (0, _styles.withStyles)(function (theme) {
  return {
    root: {
      borderBottom: '1px solid',
      borderBottomColor: theme.palette.divider,
      minHeight: theme.spacing(6),
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
      '&:not(.GridableHeader):hover': {
        backgroundColor: theme.palette.grey[50]
      },
      '&:is(.GriddableRowClickable):not(.GridableHeader)': {
        cursor: 'pointer'
      },
      '&:is(.GriddableRowSelected):not(.GridableHeader)': {
        backgroundColor: theme.palette.grey[200]
      }
    }
  };
})(_core.Grid);
var _default = GriddableRow;
exports.default = _default;