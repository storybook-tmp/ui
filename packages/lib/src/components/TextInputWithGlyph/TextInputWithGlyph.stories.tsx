import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TextInputWithGlyph } from '.';
import Icon from '../Icon';

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
    const input = canvas.getByLabelText('Search');
    await expect(input).toBeVisible();
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Filter',
    placeholder: 'Enter filter value',
    icon: <Icon glyph="MagnifyingGlass" />,
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Filter');
    await expect(input).toBeVisible();
  },
};

export const WithPersistentPlaceholder: Story = {
  args: {
    label: 'Duration',
    persistentPlaceholder: 'hh:mm:ss',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Duration');
    await expect(input).toBeVisible();
    await expect(canvas.getByText('hh:mm:ss')).toBeVisible();
  },
};

export const WithValue: Story = {
  args: {
    label: 'Username',
    value: 'admin.user',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Username');
    await expect(input).toHaveValue('admin.user');
  },
};
