import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TextInputWithGlyph } from './index';

const meta = {
  component: TextInputWithGlyph,
  tags: ['ai-generated'],
} satisfies Meta<typeof TextInputWithGlyph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Search',
    placeholder: 'Type to search...',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Search')).toBeVisible();
  },
};

export const WithValue: Story = {
  args: {
    label: 'Filter',
    value: 'active tasks',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('Filter');
    await expect(input).toBeVisible();
    await expect(input).toHaveValue('active tasks');
  },
};

export const WithPersistentPlaceholder: Story = {
  args: {
    label: 'Duration',
    persistentPlaceholder: <span>hours</span>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Duration')).toBeVisible();
    await expect(canvas.getByText('hours')).toBeVisible();
  },
};
