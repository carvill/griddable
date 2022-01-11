"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

var _GriddableCellTitle = _interopRequireDefault(require("./GriddableCellTitle"));

var _GriddableCellValue = _interopRequireDefault(require("./GriddableCellValue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var GriddableCellBox = (0, _styles.withStyles)(function (theme) {
  return {
    root: {
      width: '100%',
      minWidth: '100%',
      minHeight: theme.spacing(5),
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5),
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      justifyContent: 'flex-start'
    }
  };
})(_core.Box);

function GriddableCell(props) {
  var item = props.item,
      column = props.column;
  return /*#__PURE__*/_react.default.createElement(_core.Hidden, {
    xsDown: column.xs === false,
    smDown: column.sm === false,
    mdDown: column.md === false,
    lgDown: column.lg === false,
    xlDown: column.xl === false
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: column.xs,
    sm: column.sm,
    md: column.md,
    lg: column.lg,
    xl: column.xl
  }, /*#__PURE__*/_react.default.createElement(GriddableCellBox, null, item && /*#__PURE__*/_react.default.createElement(_GriddableCellValue.default, __assign({
    item: item
  }, props)), !item && /*#__PURE__*/_react.default.createElement(_GriddableCellTitle.default, __assign({}, props)))));
}

var _default = GriddableCell;
exports.default = _default;