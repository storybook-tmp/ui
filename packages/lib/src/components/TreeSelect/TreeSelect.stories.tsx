import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TreeSelect, ALL_VALUE, TreeDataEntry } from './TreeSelect';

const sampleData: TreeDataEntry[] = [
  { title: 'All', value: ALL_VALUE, key: ALL_VALUE },
  {
    title: 'Fruits',
    value: 'fruits',
    key: 'fruits',
    children: [
      { title: 'Apple', value: 'apple', key: 'apple' },
      { title: 'Banana', value: 'banana', key: 'banana' },
      { title: 'Orange', value: 'orange', key: 'orange' },
    ],
  },
  {
    title: 'Vegetables',
    value: 'vegetables',
    key: 'vegetables',
    children: [
      { title: 'Carrot', value: 'carrot', key: 'carrot' },
      { title: 'Broccoli', value: 'broccoli', key: 'broccoli' },
    ],
  },
];

const allValues = [
  ALL_VALUE,
  'fruits',
  'apple',
  'banana',
  'orange',
  'vegetables',
  'carrot',
  'broccoli',
];

const meta = {
  component: TreeSelect,
  tags: ['ai-generated'],
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    state: [],
    tData: sampleData,
    onChange: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('All')).toBeVisible();
    await expect(canvas.getByText('Fruits')).toBeVisible();
    await expect(canvas.getByText('Apple')).toBeVisible();
    await expect(canvas.getByText('Vegetables')).toBeVisible();
  },
};

export const WithPreselected: Story = {
  args: {
    state: ['apple', 'banana'],
    tData: sampleData,
    onChange: () => {},
  },
  play: async ({ canvas }) => {
    const appleCheckbox = canvas.getByLabelText('Apple');
    const bananaCheckbox = canvas.getByLabelText('Banana');
    await expect(appleCheckbox).toBeChecked();
    await expect(bananaCheckbox).toBeChecked();
    // Orange should not be checked
    const orangeCheckbox = canvas.getByLabelText('Orange');
    await expect(orangeCheckbox).not.toBeChecked();
  },
};

export const AllSelected: Story = {
  args: {
    state: allValues,
    tData: sampleData,
    onChange: () => {},
  },
  play: async ({ canvas }) => {
    const allCheckbox = canvas.getByLabelText('All');
    await expect(allCheckbox).toBeChecked();
    const fruitsCheckbox = canvas.getByLabelText('Fruits');
    await expect(fruitsCheckbox).toBeChecked();
  },
};
