import React from 'react';

import UglyButton from './UglyButton';

export default {
    title: ':: UglyButton ::',
    component: UglyButton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
};

const Template = (args) => <UglyButton {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'My Button',
};

export const Red = Template.bind({});
Red.args = {
    label: 'I am Red',
    backgroundColor: '#ff0000'
}