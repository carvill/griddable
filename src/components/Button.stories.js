import React from 'react';

import Button from './Button';

export default {
    title: ':: Button ::',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'My Button',
};

export const Red = Template.bind({});
Red.args = {
    label: "I'm Red",
    backgroundColor: '#ff0000'
}