"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GriddableDetailContainer = (0, _styles.withStyles)(function (theme) {
  return {
    root: {
      borderTop: '1px dashed',
      borderTopColor: theme.palette.divider,
      padding: theme.spacing(1.5),
      marginTop: theme.spacing(0.5)
    }
  };
})(_core.Grid);

function GriddableRowDetail(props) {
  var item = props.item,
      expanded = props.expanded,
      detailMapper = props.detailMapper;
  return /*#__PURE__*/_react.default.createElement(_core.Hidden, {
    xsUp: !expanded,
    implementation: "js"
  }, /*#__PURE__*/_react.default.createElement(GriddableDetailContainer, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(_core.Collapse, {
    in: expanded
  }, detailMapper(item))));
}

var _default = GriddableRowDetail;
exports.default = _default;