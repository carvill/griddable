"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _material = require("@mui/material");

var _styles = require("@mui/material/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GriddableDetailContainer = (0, _styles.styled)(_material.Grid)(function (_a) {
  var theme = _a.theme;
  return {
    borderTop: '1px dashed',
    borderTopColor: theme.palette.divider,
    padding: theme.spacing(1.5),
    marginTop: theme.spacing(0.5)
  };
});

function GriddableRowDetail(props) {
  var item = props.item,
      expanded = props.expanded,
      mapper = props.mapper;
  return /*#__PURE__*/_react.default.createElement(_material.Hidden, {
    xsUp: !expanded,
    implementation: "js"
  }, /*#__PURE__*/_react.default.createElement(GriddableDetailContainer, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(_material.Collapse, {
    in: expanded
  }, mapper(item))));
}

var _default = GriddableRowDetail;
exports.default = _default;