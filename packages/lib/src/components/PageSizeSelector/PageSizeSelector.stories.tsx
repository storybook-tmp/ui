import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import PageSizeSelector from './index';

const meta = {
  component: PageSizeSelector,
  tags: ['ai-generated'],
} satisfies Meta<typeof PageSizeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 10,
    onChange: () => {},
  },
  play: async ({ canvas }) => {
    // The select should show "10 / page"
    await expect(canvas.getByText('10 / page')).toBeVisible();
  },
};

export const LargePageSize: Story = {
  args: {
    value: 100,
    onChange: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('100 / page')).toBeVisible();
  },
};

export const Disabled: Story = {
  args: {
    value: 20,
    disabled: true,
    onChange: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('20 / page')).toBeVisible();
  },
};
