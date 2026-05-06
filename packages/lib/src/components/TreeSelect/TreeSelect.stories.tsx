import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, waitFor } from 'storybook/test';
import { TreeSelect, TreeDataEntry } from './TreeSelect';

const sampleData: TreeDataEntry[] = [
  { title: 'All', value: 'all', key: 'all' },
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

const meta = {
  component: TreeSelect,
  tags: ['ai-generated'],
  args: {
    tData: sampleData,
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoneSelected: Story = {
  args: {
    state: [],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('All')).toBeVisible();
    await expect(canvas.getByText('Fruits')).toBeVisible();
    await expect(canvas.getByText('Vegetables')).toBeVisible();
    await expect(canvas.getByText('Apple')).toBeVisible();
    await expect(canvas.getByText('Carrot')).toBeVisible();
  },
};

export const SomeSelected: Story = {
  args: {
    state: ['apple', 'banana'],
  },
  play: async ({ canvas }) => {
    // The checkboxes for Apple and Banana should be checked
    const appleCheckbox = canvas.getByLabelText('Apple');
    const bananaCheckbox = canvas.getByLabelText('Banana');
    await expect(appleCheckbox).toBeChecked();
    await expect(bananaCheckbox).toBeChecked();

    // Cherry should not be checked
    const cherryCheckbox = canvas.getByLabelText('Cherry');
    await expect(cherryCheckbox).not.toBeChecked();
  },
};

export const ClickToSelect: Story = {
  render: (args) => {
    const [state, setState] = useState<string[]>([]);
    return <TreeSelect {...args} state={state} onChange={setState} />;
  },
  args: {
    state: [],
  },
  play: async ({ canvas, userEvent }) => {
    // LeafyGreen Checkbox input has pointer-events: none, click the label text instead
    const appleLabel = canvas.getByText('Apple');
    await userEvent.click(appleLabel);
    await waitFor(() => expect(canvas.getByLabelText('Apple')).toBeChecked());
  },
};
