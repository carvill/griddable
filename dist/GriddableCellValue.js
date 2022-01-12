"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _ExpandLess = _interopRequireDefault(require("@material-ui/icons/ExpandLess"));

var _ExpandMore = _interopRequireDefault(require("@material-ui/icons/ExpandMore"));

var _GriddableCheckbox = _interopRequireDefault(require("./GriddableCheckbox"));

var _GriddableCell = _interopRequireDefault(require("./GriddableCell"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function GriddableCellValue(props) {
  var column = props.column,
      item = props.item,
      id = props.id,
      selected = props.selected,
      disabled = props.disabled,
      index = props.index,
      onChange = props.onChange;
  var title = column.title,
      textAlign = column.textAlign,
      converter = column.converter;

  var _a = (0, _react.useState)(),
      valueNode = _a[0],
      setValueNode = _a[1];

  (0, _react.useEffect)(function () {
    var value = converter(item, index);

    var type = _typeof(value);

    if (textAlign && (type === 'string' || type === 'number')) {
      setValueNode( /*#__PURE__*/_react.default.createElement(_core.Typography, {
        variant: "body2",
        component: "h6",
        align: textAlign
      }, value));
    } else {
      setValueNode(value);
    }
  }, [item, index, title, textAlign, converter]);

  var handleSelection = function handleSelection(event, checked) {
    onChange(item);
  };

  return /*#__PURE__*/_react.default.createElement(_GriddableCell.default, {
    column: column
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
    spacing: 1
  }, props.selectable && /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: "auto"
  }, /*#__PURE__*/_react.default.createElement(_GriddableCheckbox.default, {
    size: "small",
    id: id,
    name: id,
    value: id,
    checked: selected,
    disabled: disabled,
    onChange: handleSelection,
    onClick: function onClick(event) {
      return event.stopPropagation();
    }
  })), props.expandable && /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: "auto"
  }, /*#__PURE__*/_react.default.createElement(_core.IconButton, {
    size: "small",
    onClick: props.onExpand
  }, props.expanded ? /*#__PURE__*/_react.default.createElement(_ExpandLess.default, {
    fontSize: "small"
  }) : /*#__PURE__*/_react.default.createElement(_ExpandMore.default, {
    fontSize: "small"
  }))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: true
  }, valueNode)));
}

var _default = GriddableCellValue;
exports.default = _default;