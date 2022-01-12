"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _GriddableCheckbox = _interopRequireDefault(require("./GriddableCheckbox"));

var _GriddableCell = _interopRequireDefault(require("./GriddableCell"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function GriddableCellTitle(props) {
  var column = props.column,
      total = props.total,
      selected = props.selected,
      selectable = props.selectable;
  var title = column.title,
      textAlign = column.textAlign;

  var _a = (0, _react.useState)(),
      titleNode = _a[0],
      setTitleNode = _a[1];

  var _b = (0, _react.useState)(false),
      checked = _b[0],
      setChecked = _b[1];

  var _c = (0, _react.useState)(false),
      indeterminate = _c[0],
      setIndeterminate = _c[1];

  var _d = (0, _react.useState)(false),
      disabled = _d[0],
      setDisabled = _d[1];

  (0, _react.useEffect)(function () {
    setChecked(selected.length > 0 && selected.length === total);
    setIndeterminate(selected.length > 0 && selected.length < total);
    setDisabled(props.disabled || total === 0);
  }, [total, selected, props.disabled]);
  (0, _react.useEffect)(function () {
    if (typeof title !== 'string') {
      setTitleNode(title);
    } else if (textAlign) {
      setTitleNode( /*#__PURE__*/_react.default.createElement(_core.Typography, {
        variant: "body2",
        component: "h6",
        align: textAlign
      }, /*#__PURE__*/_react.default.createElement("strong", null, title)));
    } else {
      setTitleNode( /*#__PURE__*/_react.default.createElement("strong", null, title));
    }
  }, [title, textAlign]);

  var handleAllCheckboxs = function handleAllCheckboxs(event, checked) {
    props.onChangeAll(checked);
  };

  return /*#__PURE__*/_react.default.createElement(_GriddableCell.default, {
    column: column
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
    spacing: 1
  }, selectable && /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: "auto"
  }, /*#__PURE__*/_react.default.createElement(_GriddableCheckbox.default, {
    size: "small",
    id: "gridable-all",
    name: "gridable-all",
    checked: checked,
    indeterminate: indeterminate,
    onChange: handleAllCheckboxs,
    disabled: disabled
  })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: true
  }, titleNode)));
}

var _default = GriddableCellTitle;
exports.default = _default;