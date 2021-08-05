"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Red = exports.Default = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _UglyButton = _interopRequireDefault(require("./UglyButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  title: ':: UglyButton ::',
  component: _UglyButton.default,
  argTypes: {
    backgroundColor: {
      control: 'color'
    }
  }
};
exports.default = _default;

var Template = function Template(args) {
  return /*#__PURE__*/_react.default.createElement(_UglyButton.default, args);
};

var Default = Template.bind({});
exports.Default = Default;
Default.args = {
  label: 'My Button'
};
var Red = Template.bind({});
exports.Red = Red;
Red.args = {
  label: 'I am Red',
  backgroundColor: '#ff0000'
};