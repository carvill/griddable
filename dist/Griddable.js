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

var _GriddableRowBody = _interopRequireDefault(require("./GriddableRowBody"));

var _GriddableCellTitle = _interopRequireDefault(require("./GriddableCellTitle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __spreadArray = void 0 && (void 0).__spreadArray || function (to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) {
    to[j] = from[i];
  }

  return to;
};

function Griddable(props) {
  var clickable = props.clickable,
      expandable = props.expandable,
      selectable = props.selectable,
      items = props.items;
  var fixedIds = (0, _react.useRef)((selectable === null || selectable === void 0 ? void 0 : selectable.fixed) || []);

  var _a = (0, _react.useState)((selectable === null || selectable === void 0 ? void 0 : selectable.selected) || []),
      selectedIds = _a[0],
      setSelectedIds = _a[1];

  var _b = (0, _react.useState)(false),
      disableAll = _b[0],
      setDisableAll = _b[1];

  var onLocalChange = function onLocalChange(item) {
    var id = selectable.mapper(item);
    var index = selectedIds.indexOf(id);

    if (index < 0) {
      setSelectedIds(__spreadArray(__spreadArray([], selectedIds), [id]));
    } else {
      setSelectedIds(selectedIds.filter(function (el, i) {
        return i !== index;
      }));
    }
  };

  var onLocalChangeAll = function onLocalChangeAll(checked) {
    if (checked) {
      setSelectedIds(items.map(function (item) {
        return selectable.mapper(item);
      }));
    } else {
      setSelectedIds(fixedIds.current);
    }
  };

  (0, _react.useEffect)(function () {
    if (selectable) {
      var ids = items.map(selectable.mapper);
      var notFixed = ids.filter(function (el) {
        return fixedIds.current.indexOf(el) < 0;
      });
      setDisableAll(notFixed.length === 0);
      setSelectedIds(selectable.selected || []);
    } else {
      setSelectedIds([]);
    }
  }, [selectable, items]);
  (0, _react.useEffect)(function () {
    if (!selectable) return;
    var selectedItems = items.filter(function (el) {
      return selectedIds.indexOf(selectable.mapper(el)) >= 0;
    });
    selectable.onChange(selectedIds, selectedItems);
  }, [selectable, items, selectedIds]);

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

    if (items.length === 0 && props.empty) {
      return /*#__PURE__*/_react.default.createElement(_GriddableRowGeneric.default, null, /*#__PURE__*/_react.default.createElement(_core.Typography, {
        variant: "caption"
      }, props.empty));
    }

    return /*#__PURE__*/_react.default.createElement(_core.Grid, {
      item: true,
      xs: 12
    }, items.map(function (item, indexRow) {
      return /*#__PURE__*/_react.default.createElement(_GriddableRowBody.default, {
        key: indexRow,
        item: item,
        total: items.length,
        columns: props.columns,
        onLocalChange: onLocalChange,
        onLocalChangeAll: onLocalChangeAll,
        selectedIds: selectedIds,
        fixedIds: fixedIds.current,
        selectable: !!selectable,
        mapper: selectable === null || selectable === void 0 ? void 0 : selectable.mapper,
        clickable: clickable,
        expandable: expandable
      });
    }));
  };

  return /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(_GriddableRowHeader.default, {
    className: "GridableHeader",
    container: true
  }, props.columns.map(function (column, index) {
    return /*#__PURE__*/_react.default.createElement(_GriddableCellTitle.default, {
      key: index,
      column: column,
      selectable: selectable && index === 0,
      disabled: disableAll,
      total: items.length,
      selected: selectedIds,
      onChangeAll: onLocalChangeAll
    });
  }))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12
  }, gridableBody()));
}

var _default = Griddable;
exports.default = _default;