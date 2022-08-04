"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _material = require("@mui/material");

var _styles = require("@mui/material/styles");

var GriddableCheckbox = (0, _styles.styled)(_material.Checkbox)(function (_a) {
  var theme = _a.theme;
  return {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    zIndex: 1
  };
});
var _default = GriddableCheckbox;
exports.default = _default;