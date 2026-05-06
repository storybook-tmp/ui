import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TreeSelect, TreeDataEntry, ALL_VALUE } from './TreeSelect';

const sampleData: TreeDataEntry[] = [
  { title: 'All', value: ALL_VALUE, key: 'all' },
  {
    title: 'Fruits',
    value: 'fruits',
    key: 'fruits',
    children: [
      { title: 'Apple', value: 'apple', key: 'apple' },
      { title: 'Banana', value: 'banana', key: 'banana' },
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

const TreeSelectWithState = ({ defaultState = [] }: { defaultState?: string[] }) => {
  const [state, setState] = useState<string[]>(defaultState);
  return <TreeSelect onChange={setState} state={state} tData={sampleData} />;
};

const meta = {
  component: TreeSelect,
  tags: ['ai-generated'],
  args: {
    onChange: () => {},
    state: [],
    tData: sampleData,
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TreeSelectWithState />,
  play: async ({ canvas, userEvent }) => {
    // LeafyGreen Checkbox hides the native input; click the label text instead
    const appleLabel = canvas.getByText('Apple');
    await userEvent.click(appleLabel);
    const appleCheckbox = canvas.getByLabelText('Apple');
    await expect(appleCheckbox).toBeChecked();
  },
};

export const WithPreselectedValues: Story = {
  render: () => <TreeSelectWithState defaultState={['apple', 'banana', 'fruits']} />,
};

export const AllSelected: Story = {
  render: () => (
    <TreeSelectWithState
      defaultState={[ALL_VALUE, 'fruits', 'apple', 'banana', 'vegetables', 'carrot', 'broccoli']}
    />
  ),
};
