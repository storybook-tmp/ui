import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, waitFor } from 'storybook/test';
import { TreeSelect, TreeDataEntry } from './TreeSelect';

const sampleData: TreeDataEntry[] = [
  {
    title: 'Fruits',
    value: 'fruits',
    key: 'fruits',
    children: [
      { title: 'Apple', value: 'apple', key: 'apple' },
      { title: 'Banana', value: 'banana', key: 'banana' },
      { title: 'Cherry', value: 'cherry', key: 'cherry' },
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

const TreeSelectWrapper = ({
  tData,
  initialState = [],
  showControls = false,
}: {
  tData: TreeDataEntry[];
  initialState?: string[];
  showControls?: boolean;
}) => {
  const [state, setState] = useState<string[]>(initialState);
  return (
    <TreeSelect
      state={state}
      tData={tData}
      onChange={setState}
      onReset={showControls ? () => setState([]) : undefined}
      onFilter={showControls ? () => {} : undefined}
    />
  );
};

const meta = {
  component: TreeSelect,
  tags: ['ai-generated'],
  args: {
    state: [],
    tData: sampleData,
    onChange: fn(),
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TreeSelectWrapper tData={sampleData} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Fruits')).toBeVisible();
    await expect(canvas.getByText('Vegetables')).toBeVisible();
    await expect(canvas.getByText('Apple')).toBeVisible();
    await expect(canvas.getByText('Carrot')).toBeVisible();
  },
};

export const WithPreselection: Story = {
  render: () => (
    <TreeSelectWrapper
      tData={sampleData}
      initialState={['apple', 'banana']}
    />
  ),
  play: async ({ canvas }) => {
    const appleCheckbox = canvas.getByLabelText('Apple');
    const bananaCheckbox = canvas.getByLabelText('Banana');
    await expect(appleCheckbox).toBeChecked();
    await expect(bananaCheckbox).toBeChecked();
  },
};

export const WithFilterControls: Story = {
  render: () => (
    <TreeSelectWrapper tData={sampleData} showControls />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Reset')).toBeVisible();
    await expect(canvas.getByText('Filter')).toBeVisible();
  },
};

export const SelectItem: Story = {
  render: () => <TreeSelectWrapper tData={sampleData} />,
  play: async ({ canvas, userEvent }) => {
    const appleCheckbox = canvas.getByLabelText('Apple');
    await expect(appleCheckbox).not.toBeChecked();
    // Click the label text instead of the input (which has pointer-events: none)
    await userEvent.click(canvas.getByText('Apple'));
    await waitFor(() => {
      expect(canvas.getByLabelText('Apple')).toBeChecked();
    });
  },
};
