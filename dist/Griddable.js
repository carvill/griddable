"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _material = require("@mui/material");

var _styles = require("@mui/material/styles");

var _ExpandLess = _interopRequireDefault(require("@mui/icons-material/ExpandLess"));

var _ExpandMore = _interopRequireDefault(require("@mui/icons-material/ExpandMore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __spreadArray = void 0 && (void 0).__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

function Griddable(props) {
  var clickable = props.clickable,
      expandable = props.expandable,
      selectable = props.selectable,
      items = props.items;

  var _a = (0, _react.useState)(false),
      disableAll = _a[0],
      setDisableAll = _a[1];

  var onLocalChange = function onLocalChange(item) {
    var id = selectable.mapper(item);
    var index = selectable.selected.indexOf(id);
    var ids;

    if (index < 0) {
      ids = __spreadArray(__spreadArray([], selectable.selected, true), [id], false);
    } else {
      ids = selectable.selected.filter(function (el, i) {
        return i !== index;
      });
    }

    inform(ids);
  };

  var onLocalChangeAll = function onLocalChangeAll(checked) {
    var ids;

    if (checked) {
      ids = items.map(function (item) {
        return selectable.mapper(item);
      });
    } else {
      ids = selectable.fixed || [];
    }

    inform(ids);
  };

  var inform = function inform(ids) {
    if (!selectable) return;
    var selectedItems = items.filter(function (el) {
      return ids.indexOf(selectable.mapper(el)) >= 0;
    });
    selectable.onChange(ids, selectedItems);
  };

  (0, _react.useEffect)(function () {
    if (selectable) {
      var ids = items.map(selectable.mapper);
      var notFixed = selectable.fixed ? ids.filter(function (el) {
        return selectable.fixed.indexOf(el) < 0;
      }) : [];
      setDisableAll(notFixed.length === 0);
    } else {
      setDisableAll(false);
    }
  }, [selectable, items]);

  var gridableBody = function gridableBody() {
    if (props.loading) {
      return /*#__PURE__*/_react.default.createElement(GriddableRowGeneric, null, /*#__PURE__*/_react.default.createElement(_material.CircularProgress, {
        size: "1rem",
        color: "secondary"
      }));
    }

    if (props.error) {
      return /*#__PURE__*/_react.default.createElement(GriddableRowGeneric, null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
        variant: "caption",
        color: "error"
      }, props.error));
    }

    if (items.length === 0 && props.empty) {
      return /*#__PURE__*/_react.default.createElement(GriddableRowGeneric, null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
        variant: "caption"
      }, props.empty));
    }

    return /*#__PURE__*/_react.default.createElement(_material.Grid, {
      item: true,
      xs: 12
    }, items.map(function (item, indexRow) {
      return /*#__PURE__*/_react.default.createElement(GriddableRowBody, {
        key: indexRow,
        index: indexRow,
        item: item,
        total: items.length,
        columns: props.columns,
        onLocalChange: onLocalChange,
        onLocalChangeAll: onLocalChangeAll,
        selectable: !!selectable,
        selectedIds: (selectable === null || selectable === void 0 ? void 0 : selectable.selected) || [],
        fixedIds: (selectable === null || selectable === void 0 ? void 0 : selectable.fixed) || [],
        mapper: selectable === null || selectable === void 0 ? void 0 : selectable.mapper,
        clickable: clickable,
        expandable: expandable
      });
    }));
  };

  return /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(GriddableRowHeader, {
    className: "GridableHeader",
    container: true
  }, props.columns.map(function (column, index) {
    return /*#__PURE__*/_react.default.createElement(GriddableCellTitle, {
      key: index,
      column: column,
      selectable: selectable && index === 0,
      disabled: disableAll,
      total: items.length,
      selected: (selectable === null || selectable === void 0 ? void 0 : selectable.selected) || [],
      onChangeAll: onLocalChangeAll
    });
  }))), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12
  }, gridableBody()));
}

var GriddableRow = (0, _styles.styled)(_material.Grid)(function (_a) {
  var theme = _a.theme;
  return {
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.divider,
    minHeight: theme.spacing(6),
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    '&:not(.GridableHeader):hover': {
      backgroundColor: theme.palette.grey[50]
    },
    '&:is(.GriddableRowClickable):not(.GridableHeader)': {
      cursor: 'pointer'
    },
    '&:is(.GriddableRowSelected):not(.GridableHeader)': {
      backgroundColor: theme.palette.grey[200]
    }
  };
});
var GriddableRowHeader = (0, _styles.styled)(GriddableRow)(function (_a) {
  var theme = _a.theme;
  return {
    backgroundColor: theme.palette.grey[100]
  };
});
var GriddableDetailContainer = (0, _styles.styled)(_material.Grid)(function (_a) {
  var theme = _a.theme;
  return {
    borderTop: '1px dashed',
    borderTopColor: theme.palette.divider,
    padding: theme.spacing(1.5),
    marginTop: theme.spacing(0.5)
  };
});
var GriddableCheckbox = (0, _styles.styled)(_material.Checkbox)(function (_a) {
  var theme = _a.theme;
  return {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    zIndex: 1
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

var GriddableCellBox = (0, _styles.styled)(_material.Box)(function (_a) {
  var theme = _a.theme;
  return {
    width: '100%',
    minWidth: '100%',
    minHeight: theme.spacing(5),
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    justifyContent: 'flex-start'
  };
});

function GriddableCell(props) {
  var column = props.column,
      children = props.children;
  return /*#__PURE__*/_react.default.createElement(_material.Hidden, {
    xsDown: column.xs === false,
    smDown: column.sm === false,
    mdDown: column.md === false,
    lgDown: column.lg === false,
    xlDown: column.xl === false
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: column.xs,
    sm: column.sm,
    md: column.md,
    lg: column.lg,
    xl: column.xl
  }, /*#__PURE__*/_react.default.createElement(GriddableCellBox, null, children)));
}

function GriddableCellValue(props) {
  var column = props.column,
      item = props.item,
      id = props.id,
      selected = props.selected,
      disabled = props.disabled,
      indexColumn = props.indexColumn,
      indexRow = props.indexRow,
      onChange = props.onChange;
  var title = column.title,
      textAlign = column.textAlign,
      converter = column.converter;

  var _a = (0, _react.useState)(),
      valueNode = _a[0],
      setValueNode = _a[1];

  (0, _react.useEffect)(function () {
    var value = converter(item, indexColumn, indexRow);

    var type = _typeof(value);

    if (type === 'string' || type === 'number') {
      setValueNode( /*#__PURE__*/_react.default.createElement(_material.Typography, {
        variant: "body2",
        component: "h6",
        align: textAlign
      }, value));
    } else {
      setValueNode(value);
    }
  }, [item, indexColumn, indexRow, title, textAlign, converter]);

  var handleSelection = function handleSelection(event, checked) {
    onChange(item);
  };

  return /*#__PURE__*/_react.default.createElement(GriddableCell, {
    column: column
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
    spacing: 1
  }, props.selectable && /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: "auto"
  }, /*#__PURE__*/_react.default.createElement(GriddableCheckbox, {
    size: "small",
    id: id,
    name: id,
    value: id,
    checked: selected,
    disabled: disabled,
    onChange: handleSelection
  })), props.expandable && /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: "auto"
  }, /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    size: "small",
    onClick: props.onExpand
  }, props.expanded ? /*#__PURE__*/_react.default.createElement(_ExpandLess.default, {
    fontSize: "small"
  }) : /*#__PURE__*/_react.default.createElement(_ExpandMore.default, {
    fontSize: "small"
  }))), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: true
  }, valueNode)));
}

function GriddableRowBody(props) {
  var index = props.index,
      item = props.item,
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

  return /*#__PURE__*/_react.default.createElement(GriddableRow, {
    container: true,
    onClick: function onClick() {
      return clickable === null || clickable === void 0 ? void 0 : clickable.onClick(item);
    },
    className: (0, _clsx.default)({
      GriddableRowClickable: clickable,
      GriddableRowSelected: selected
    })
  }, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, props.columns.map(function (column, indexColumn) {
    return /*#__PURE__*/_react.default.createElement(GriddableCellValue, {
      key: indexColumn,
      id: id,
      column: column,
      item: item,
      indexRow: index,
      indexColumn: indexColumn,
      selected: selected,
      selectable: selectable && indexColumn === 0,
      disabled: disabled,
      onChange: props.onLocalChange,
      expandable: props.expandable && indexColumn === 0,
      expanded: expanded,
      onExpand: onExpand
    });
  }), (expandable === null || expandable === void 0 ? void 0 : expandable.mapper) && /*#__PURE__*/_react.default.createElement(GriddableRowDetail, {
    item: item,
    expanded: expanded,
    mapper: expandable.mapper
  })));
}

var GriddableRowGeneric = function GriddableRowGeneric(props) {
  return /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(GriddableRow, {
    container: true,
    justifyContent: "center"
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: "auto"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    py: 1
  }, props.children))));
};

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
    } else {
      setTitleNode( /*#__PURE__*/_react.default.createElement(_material.Typography, {
        variant: "body2",
        component: "h6",
        align: textAlign
      }, /*#__PURE__*/_react.default.createElement("strong", null, title)));
    }
  }, [title, textAlign]);

  var handleAllCheckboxs = function handleAllCheckboxs(event, checked) {
    props.onChangeAll(checked);
  };

  return /*#__PURE__*/_react.default.createElement(GriddableCell, {
    column: column
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
    spacing: 1
  }, selectable && /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: "auto"
  }, /*#__PURE__*/_react.default.createElement(GriddableCheckbox, {
    size: "small",
    id: "gridable-all",
    name: "gridable-all",
    checked: checked,
    indeterminate: indeterminate,
    onChange: handleAllCheckboxs,
    disabled: disabled
  })), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: true
  }, titleNode)));
}

var _default = Griddable;
exports.default = _default;