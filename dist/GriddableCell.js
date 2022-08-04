"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _material = require("@mui/material");

var _styles = require("@mui/material/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GriddableCellBox = (0, _styles.styled)(_material.Box)(function (_a) {
  var theme = _a.theme;
  return {
    width: '100%',
    minWidth: '100%',
    minHeight: theme.spacing(5),
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    justifyContent: 'flex-start'
  };
});

function GriddableCell(props) {
  var column = props.column,
      children = props.children;
  return /*#__PURE__*/_react.default.createElement(_material.Hidden, {
    xsDown: column.xs === false,
    smDown: column.sm === false,
    mdDown: column.md === false,
    lgDown: column.lg === false,
    xlDown: column.xl === false
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: column.xs,
    sm: column.sm,
    md: column.md,
    lg: column.lg,
    xl: column.xl
  }, /*#__PURE__*/_react.default.createElement(GriddableCellBox, null, children)));
}

var _default = GriddableCell;
exports.default = _default;