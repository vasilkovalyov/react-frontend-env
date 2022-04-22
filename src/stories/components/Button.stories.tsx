import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ButtonComponent from '../../components/Button';

export default {
    title: 'Components/Button',
    component: ButtonComponent,
    argTypes: {
        layout: {
            options: ['primary', 'secondary', 'base'],
            control: { type: 'select' },
        },
    },
} as ComponentMeta<typeof ButtonComponent>;

const Template: ComponentStory<typeof ButtonComponent> = (args) => <ButtonComponent {...args} />;

export const Button = Template.bind({});

Button.args = {
    text: 'Button'
}
