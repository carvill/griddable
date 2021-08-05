"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GriddableCellBox = (0, _styles.withStyles)(function (theme) {
  return {
    root: {
      width: '100%',
      minHeight: '100%',
      minWidth: '100%',
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5),
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      justifyContent: 'flex-start'
    }
  };
})(_core.Box);
var GriddableCheckbox = (0, _styles.withStyles)(function (theme) {
  return {
    root: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      zIndex: 1
    }
  };
})(_core.Checkbox);

function GriddableCell(props) {
  var handleAllCheckboxs = function handleAllCheckboxs(event, checked) {
    props.onChangeAll(checked);
  };

  var handleSelection = function handleSelection(event) {
    props.onChange(props.item);
  };

  var convert = function convert(item, index) {
    var value = props.column.converter(item, props.index);

    if (props.column.textAlign && (typeof value === 'string' || typeof value === 'number')) {
      return /*#__PURE__*/_react.default.createElement(_core.Typography, {
        variant: "body2",
        component: "h6",
        align: props.column.textAlign
      }, value);
    }

    return value;
  };

  var value = function value(item) {
    var id = props.mapper ? props.mapper(item) : '';
    return /*#__PURE__*/_react.default.createElement(_core.Grid, {
      container: true,
      justifyContent: "flex-start",
      alignItems: "center",
      alignContent: "center",
      spacing: 1
    }, props.selectable && /*#__PURE__*/_react.default.createElement(_core.Grid, {
      item: true,
      xs: "auto"
    }, /*#__PURE__*/_react.default.createElement(GriddableCheckbox, {
      id: id,
      name: id,
      value: id,
      checked: props.selected.indexOf(id) >= 0,
      onChange: handleSelection,
      onClick: function onClick(event) {
        return event.stopPropagation();
      }
    })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
      item: true,
      xs: true
    }, convert(item, props.index)));
  };

  var titleValue = function titleValue() {
    if (typeof props.column.title !== 'string') {
      return props.column.title;
    }

    if (props.column.textAlign) {
      return /*#__PURE__*/_react.default.createElement(_core.Typography, {
        variant: "body2",
        component: "h6",
        align: props.column.textAlign
      }, /*#__PURE__*/_react.default.createElement("strong", null, props.column.title));
    }

    return /*#__PURE__*/_react.default.createElement("strong", null, props.column.title);
  };

  var title = function title() {
    return /*#__PURE__*/_react.default.createElement(_core.Grid, {
      container: true,
      justifyContent: "flex-start",
      alignItems: "center",
      alignContent: "center",
      spacing: 1
    }, props.selectable && /*#__PURE__*/_react.default.createElement(_core.Grid, {
      item: true,
      xs: "auto"
    }, /*#__PURE__*/_react.default.createElement(GriddableCheckbox, {
      id: "gridable-all",
      name: "gridable-all",
      checked: props.selected.length > 0 && props.selected.length === props.total,
      indeterminate: props.selected.length > 0 && props.selected.length < props.total,
      onChange: handleAllCheckboxs,
      disabled: props.total === 0
    })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
      item: true,
      xs: true
    }, titleValue()));
  };

  var content = function content() {
    if (props.item) {
      return value(props.item);
    }

    return title();
  };

  return /*#__PURE__*/_react.default.createElement(_core.Hidden, {
    xsDown: props.column.xs === false,
    smDown: props.column.sm === false,
    mdDown: props.column.md === false,
    lgDown: props.column.lg === false,
    xlDown: props.column.xl === false
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: props.column.xs,
    sm: props.column.sm,
    md: props.column.md,
    lg: props.column.lg,
    xl: props.column.xl
  }, /*#__PURE__*/_react.default.createElement(GriddableCellBox, null, content())));
}

var _default = GriddableCell;
exports.default = _default;