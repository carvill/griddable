"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _GriddableCell = _interopRequireDefault(require("./GriddableCell"));

var _GriddableRowDetail = _interopRequireDefault(require("./GriddableRowDetail"));

var _GriddableRow = _interopRequireDefault(require("./GriddableRow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function GriddableRowBody(props) {
  var item = props.item,
      selectable = props.selectable,
      selectedIds = props.selectedIds,
      onClick = props.onClick,
      mapper = props.mapper;

  var _a = (0, _react.useState)(false),
      expanded = _a[0],
      setExpanded = _a[1];

  var _b = (0, _react.useState)(false),
      selected = _b[0],
      setSelected = _b[1];

  var _c = (0, _react.useState)(false),
      clickable = _c[0],
      setClickable = _c[1];

  (0, _react.useEffect)(function () {
    if (selectable && mapper) {
      var id = mapper(item);
      setSelected(selectedIds.indexOf(id) >= 0);
    } else {
      setSelected(false);
    }
  }, [item, selectable, selectedIds, mapper]);
  (0, _react.useEffect)(function () {
    setClickable(!!onClick);
  }, [onClick]);

  var handleClick = function handleClick() {
    if (onClick) {
      onClick(item);
    }
  };

  var onExpand = function onExpand(event) {
    event.stopPropagation();
    setExpanded(!expanded);
  };

  return /*#__PURE__*/_react.default.createElement(_GriddableRow.default, {
    container: true,
    onClick: clickable ? handleClick : undefined,
    className: (0, _clsx.default)({
      GriddableRowClickable: clickable,
      GriddableRowSelected: selected
    })
  }, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, props.columns.map(function (column, indexColumn) {
    return /*#__PURE__*/_react.default.createElement(_GriddableCell.default, {
      key: indexColumn,
      column: column,
      item: item,
      index: indexColumn,
      selectable: selectable && indexColumn === 0,
      expandable: props.expandable && indexColumn === 0,
      expanded: expanded,
      mapper: mapper,
      total: props.total,
      selected: selectedIds,
      onChange: props.onLocalChange,
      onChangeAll: props.onLocalChangeAll,
      onExpand: onExpand
    });
  }), props.expandable && props.detailMapper && /*#__PURE__*/_react.default.createElement(_GriddableRowDetail.default, {
    expanded: expanded,
    item: item,
    detailMapper: props.detailMapper
  })));
}

var _default = GriddableRowBody;
exports.default = _default;