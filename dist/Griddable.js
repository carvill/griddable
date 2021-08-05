"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _clsx = _interopRequireDefault(require("clsx"));

var _GriddableRow = require("./GriddableRow");

var _GriddableCell = _interopRequireDefault(require("./GriddableCell"));

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

  var onChange = function onChange(item) {
    var id = props.mapper(item);
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

  var onChangeAll = function onChangeAll(checked) {
    var ids, items;

    if (checked) {
      ids = props.items.map(function (item) {
        return props.mapper(item);
      });
      items = props.items;
    } else {
      ids = [];
      items = [];
    }

    setSelectedIds(ids);
    setSelectedItems(items);
  };

  var isSelected = function isSelected(item) {
    return !!props.selectable && !!props.mapper && selectedIds.indexOf(props.mapper(item)) >= 0;
  };

  (0, _react.useEffect)(function () {
    if (props.selectable && props.onChange) {
      props.onChange(selectedIds, selectedItems);
    } // eslint-disable-next-line

  }, [props.selectable, selectedIds, selectedItems]);

  var handleClick = function handleClick(item) {
    return function () {
      props.onClick(item);
    };
  };

  var gridableBody = function gridableBody() {
    if (props.loading) {
      return genericRow( /*#__PURE__*/_react.default.createElement(_core.CircularProgress, {
        size: "1rem",
        color: "secondary"
      }));
    }

    if (props.error) {
      return genericRow( /*#__PURE__*/_react.default.createElement(_core.Typography, {
        variant: "caption",
        color: "error"
      }, props.error));
    }

    if (props.items.length === 0 && props.empty) {
      return genericRow( /*#__PURE__*/_react.default.createElement(_core.Typography, {
        variant: "caption"
      }, props.empty));
    }

    return /*#__PURE__*/_react.default.createElement(_core.Grid, {
      item: true,
      xs: 12
    }, props.items.map(function (item, indexRow) {
      return /*#__PURE__*/_react.default.createElement(_GriddableRow.GriddableRow, {
        key: indexRow,
        container: true,
        onClick: props.onClick ? handleClick(item) : undefined,
        className: (0, _clsx.default)({
          GriddableRowClickable: !!props.onClick,
          GriddableRowSelected: isSelected(item)
        })
      }, props.columns.map(function (column, indexColumn) {
        return /*#__PURE__*/_react.default.createElement(_GriddableCell.default, {
          key: indexColumn,
          column: column,
          item: item,
          index: indexColumn,
          selectable: props.selectable && indexColumn === 0,
          mapper: props.mapper,
          total: props.items.length,
          selected: selectedIds,
          onChange: onChange,
          onChangeAll: onChangeAll
        });
      }));
    }));
  };

  var genericRow = function genericRow(child) {
    return /*#__PURE__*/_react.default.createElement(_core.Grid, {
      item: true,
      xs: 12
    }, /*#__PURE__*/_react.default.createElement(_GriddableRow.GriddableRow, {
      container: true,
      justifyContent: "center"
    }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
      item: true,
      xs: "auto"
    }, /*#__PURE__*/_react.default.createElement(_core.Box, {
      py: 1
    }, child))));
  };

  return /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(_GriddableRow.GriddableRowHeader, {
    container: true
  }, props.columns.map(function (column, index) {
    return /*#__PURE__*/_react.default.createElement(_GriddableCell.default, {
      key: index,
      column: column,
      index: index,
      selectable: props.selectable && index === 0,
      mapper: props.mapper,
      total: props.items.length,
      selected: selectedIds,
      onChange: onChange,
      onChangeAll: onChangeAll
    });
  }))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12
  }, gridableBody()));
}

var _default = Griddable;
exports.default = _default;