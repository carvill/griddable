"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _material = require("@mui/material");

var _styles = require("@mui/material/styles");

var GriddableRow = (0, _styles.styled)(_material.Grid)(function (_a) {
  var theme = _a.theme;
  return {
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
  };
});
var _default = GriddableRow;
exports.default = _default;