"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _GriddableRowHeader = _interopRequireDefault(require("./GriddableRowHeader"));

var _GriddableRowGeneric = _interopRequireDefault(require("./GriddableRowGeneric"));

var _GriddableCell = _interopRequireDefault(require("./GriddableCell"));

var _GriddableRowBody = _interopRequireDefault(require("./GriddableRowBody"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Griddable(props) {
  var _a = (0, _react.useState)([]),
      selectedIds = _a[0],
      setSelectedIds = _a[1];

  var _b = (0, _react.useState)([]),
      selectedItems = _b[0],
      setSelectedItems = _b[1];

  var selectable = props.selectable,
      onChange = props.onChange,
      onClick = props.onClick,
      mapper = props.mapper;

  var onLocalChange = function onLocalChange(item) {
    var id = mapper(item);
    var ids = selectedIds.length === 0 ? [] : selectedIds.join(',').split(',');
    var items = selectedItems.map(function (item) {
      return item;
    });
    var index = selectedIds.indexOf(id);

    if (index < 0) {
      ids.push(id);
      items.push(item);
    } else {
      ids.splice(index, 1);
      items.splice(index, 1);
    }

    setSelectedIds(ids);
    setSelectedItems(items);
  };

  var onLocalChangeAll = function onLocalChangeAll(checked) {
    var ids, items;

    if (checked) {
      ids = props.items.map(function (item) {
        return mapper(item);
      });
      items = props.items;
    } else {
      ids = [];
      items = [];
    }

    setSelectedIds(ids);
    setSelectedItems(items);
  };

  (0, _react.useEffect)(function () {
    if (selectable && onChange) {
      onChange(selectedIds, selectedItems);
    }
  }, [selectable, onChange, selectedIds, selectedItems]);

  var gridableBody = function gridableBody() {
    if (props.loading) {
      return /*#__PURE__*/_react.default.createElement(_GriddableRowGeneric.default, null, /*#__PURE__*/_react.default.createElement(_core.CircularProgress, {
        size: "1rem",
        color: "secondary"
      }));
    }

    if (props.error) {
      return /*#__PURE__*/_react.default.createElement(_GriddableRowGeneric.default, null, /*#__PURE__*/_react.default.createElement(_core.Typography, {
        variant: "caption",
        color: "error"
      }, props.error));
    }

    if (props.items.length === 0 && props.empty) {
      return /*#__PURE__*/_react.default.createElement(_GriddableRowGeneric.default, null, /*#__PURE__*/_react.default.createElement(_core.Typography, {
        variant: "caption"
      }, props.empty));
    }

    return /*#__PURE__*/_react.default.createElement(_core.Grid, {
      item: true,
      xs: 12
    }, props.items.map(function (item, indexRow) {
      return /*#__PURE__*/_react.default.createElement(_GriddableRowBody.default, {
        key: indexRow,
        item: item,
        total: props.items.length,
        selectable: props.selectable,
        expandable: props.expandable,
        columns: props.columns,
        selectedIds: selectedIds,
        onLocalChange: onLocalChange,
        onLocalChangeAll: onLocalChangeAll,
        onClick: onClick,
        mapper: mapper,
        detailMapper: props.detailMapper
      });
    }));
  };

  return /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(_GriddableRowHeader.default, {
    container: true
  }, props.columns.map(function (column, index) {
    return /*#__PURE__*/_react.default.createElement(_GriddableCell.default, {
      key: index,
      column: column,
      index: index,
      selectable: selectable && index === 0,
      mapper: mapper,
      total: props.items.length,
      selected: selectedIds,
      onChange: onLocalChange,
      onChangeAll: onLocalChangeAll
    });
  }))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12
  }, gridableBody()));
}

var _default = Griddable;
exports.default = _default;