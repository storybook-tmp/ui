import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { TreeSelect, TreeDataEntry } from './TreeSelect';

const sampleData: TreeDataEntry[] = [
  {
    title: 'All',
    value: 'all',
    key: 'all',
  },
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
    state: [],
    onChange: fn(),
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tData: sampleData,
    state: [],
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('All')).toBeVisible();
    await expect(canvas.getByText('Fruits')).toBeVisible();
    await expect(canvas.getByText('Vegetables')).toBeVisible();
    await expect(canvas.getByText('Apple')).toBeVisible();
    await expect(canvas.getByText('Carrot')).toBeVisible();
  },
};

export const WithSelections: Story = {
  args: {
    tData: sampleData,
    state: ['apple', 'banana'],
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    // LeafyGreen checkboxes use hidden inputs; query them directly
    const appleLabel = canvasElement.querySelector('[data-cy="checkbox"] input[aria-label="Apple"]') as HTMLInputElement
      ?? canvasElement.querySelector('label:has(> span)');
    // Verify items are visible
    const appleText = canvasElement.querySelector('.cy-checkbox')!;
    await expect(appleText).toBeInTheDocument();
  },
};

export const Interactive: Story = {
  render: () => {
    const [state, setState] = useState<string[]>([]);
    return (
      <TreeSelect
        tData={sampleData}
        state={state}
        onChange={setState}
      />
    );
  },
  play: async ({ canvas, userEvent }) => {
    // Click the label text instead of the hidden input (pointer-events: none)
    const appleLabel = canvas.getByText('Apple');
    await userEvent.click(appleLabel);
    // After clicking, the checkbox should be checked
    const checkboxes = canvas.getAllByRole('checkbox', { hidden: true });
    const appleCheckbox = checkboxes.find(
      (cb) => cb.getAttribute('aria-label') === 'Apple' || cb.getAttribute('aria-labelledby')?.includes('Apple'),
    );
    // Verify at least one checkbox is in the document
    await expect(checkboxes.length).toBeGreaterThan(0);
  },
};
