"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

var GriddableCheckbox = (0, _styles.withStyles)(function (theme) {
  return {
    root: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      zIndex: 1
    }
  };
})(_core.Checkbox);
var _default = GriddableCheckbox;
exports.default = _default;