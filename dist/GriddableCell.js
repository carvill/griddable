"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  var column = props.column,
      children = props.children;
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
  }, /*#__PURE__*/_react.default.createElement(GriddableCellBox, null, children)));
}

var _default = GriddableCell;
exports.default = _default;