import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextInputWithGlyph } from './index';
import Icon from '../Icon';

const meta = {
  title: 'AI Generated/Medium/TextInputWithGlyph',
  component: TextInputWithGlyph,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TextInputWithGlyph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Type to search',
    icon: <Icon glyph="MagnifyingGlass" />,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled input',
    placeholder: 'Cannot type here',
    disabled: true,
  },
};
