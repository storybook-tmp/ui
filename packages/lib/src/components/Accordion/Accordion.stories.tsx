import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Accordion from './index';

const meta = {
  title: 'AI Generated/Complex/Accordion',
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  args: {
    title: 'Click to expand',
    children: 'This is the accordion content that appears when expanded.',
    defaultOpen: false,
  },
};

export const Open: Story = {
  args: {
    title: 'Click to collapse',
    children: 'This accordion is initially open and shows the content.',
    defaultOpen: true,
  },
};
