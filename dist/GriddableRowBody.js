"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _GriddableRowDetail = _interopRequireDefault(require("./GriddableRowDetail"));

var _GriddableRow = _interopRequireDefault(require("./GriddableRow"));

var _GriddableCellValue = _interopRequireDefault(require("./GriddableCellValue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function GriddableRowBody(props) {
  var item = props.item,
      selectable = props.selectable,
      clickable = props.clickable,
      expandable = props.expandable,
      selectedIds = props.selectedIds,
      fixedIds = props.fixedIds,
      mapper = props.mapper;

  var _a = (0, _react.useState)(''),
      id = _a[0],
      setId = _a[1];

  var _b = (0, _react.useState)(false),
      expanded = _b[0],
      setExpanded = _b[1];

  var _c = (0, _react.useState)(false),
      selected = _c[0],
      setSelected = _c[1];

  var _d = (0, _react.useState)(false),
      disabled = _d[0],
      setDisabled = _d[1];

  (0, _react.useEffect)(function () {
    if (selectable && mapper) {
      var id_1 = mapper(item);
      setId(id_1);
      setSelected(selectedIds.indexOf(id_1) >= 0);
      setDisabled(fixedIds ? fixedIds.indexOf(id_1) >= 0 : false);
    } else {
      setId('');
      setSelected(false);
      setDisabled(false);
    }
  }, [item, selectable, selectedIds, fixedIds, mapper]);

  var onExpand = function onExpand(event) {
    event.stopPropagation();
    setExpanded(!expanded);
  };

  return /*#__PURE__*/_react.default.createElement(_GriddableRow.default, {
    container: true,
    onClick: function onClick() {
      return clickable === null || clickable === void 0 ? void 0 : clickable.onClick(item);
    },
    className: (0, _clsx.default)({
      GriddableRowClickable: clickable,
      GriddableRowSelected: selected
    })
  }, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, props.columns.map(function (column, indexColumn) {
    return /*#__PURE__*/_react.default.createElement(_GriddableCellValue.default, {
      key: indexColumn,
      id: id,
      column: column,
      item: item,
      index: indexColumn,
      selected: selected,
      selectable: selectable && indexColumn === 0,
      disabled: disabled,
      onChange: props.onLocalChange,
      expandable: props.expandable && indexColumn === 0,
      expanded: expanded,
      onExpand: onExpand
    });
  }), (expandable === null || expandable === void 0 ? void 0 : expandable.mapper) && /*#__PURE__*/_react.default.createElement(_GriddableRowDetail.default, {
    item: item,
    expanded: expanded,
    mapper: expandable.mapper
  })));
}

var _default = GriddableRowBody;
exports.default = _default;