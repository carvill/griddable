import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import UglyButton, { UglyButtonProps } from './UglyButton';

export default {
    title: ':: UglyButton ::',
    component: UglyButton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof UglyButton>;

const Template: ComponentStory<typeof UglyButton> = (args: UglyButtonProps) => <UglyButton {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'My Button',
};

export const Red = Template.bind({});
Red.args = {
    label: 'I am Red',
    backgroundColor: '#ff0000'
};
