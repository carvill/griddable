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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function GriddableCellValue(props) {
  var column = props.column,
      item = props.item,
      index = props.index,
      selected = props.selected,
      mapper = props.mapper;
  var title = column.title,
      textAlign = column.textAlign,
      converter = column.converter;

  var _a = (0, _react.useState)(''),
      id = _a[0],
      setId = _a[1];

  var _b = (0, _react.useState)(false),
      checked = _b[0],
      setChecked = _b[1];

  var _c = (0, _react.useState)(),
      valueNode = _c[0],
      setValueNode = _c[1];

  (0, _react.useEffect)(function () {
    if (mapper) {
      var id_1 = mapper(item);
      setId(id_1);
      setChecked(selected.indexOf(id_1) >= 0);
    } else {
      setId('');
      setChecked(false);
    }
  }, [item, selected, mapper]);
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

  var handleSelection = function handleSelection(event) {
    props.onChange(item);
  };

  return /*#__PURE__*/_react.default.createElement(_core.Grid, {
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
    checked: checked,
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
  }, valueNode));
}

var _default = GriddableCellValue;
exports.default = _default;