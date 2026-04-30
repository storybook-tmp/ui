import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { useState } from 'react';
import PageSizeSelector from './index';

const meta = {
  component: PageSizeSelector,
  title: 'Components/PageSizeSelector',
} satisfies Meta<typeof PageSizeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

const PageSizeSelectorWithState = ({ initialSize = 10 }) => {
  const [pageSize, setPageSize] = useState(initialSize);
  return (
    <div>
      <PageSizeSelector value={pageSize} onChange={setPageSize} />
      <p style={{ marginTop: '16px' }}>Selected: {pageSize} / page</p>
    </div>
  );
};

export const Default: Story = {
  render: () => <PageSizeSelectorWithState initialSize={10} />,
  play: async (context) => {
    const canvas = context.canvas;
    await expect(await canvas.findByRole('button')).toBeVisible();
    await expect(canvas.getByText('Selected: 10 / page')).toBeVisible();
  },
};

export const LargeSize: Story = {
  render: () => <PageSizeSelectorWithState initialSize={100} />,
  play: async (context) => {
    const canvas = context.canvas;
    await expect(canvas.getByText('Selected: 100 / page')).toBeVisible();
  },
};

export const MediumSize: Story = {
  render: () => <PageSizeSelectorWithState initialSize={50} />,
  play: async (context) => {
    const canvas = context.canvas;
    await expect(canvas.getByText('Selected: 50 / page')).toBeVisible();
  },
};

export const Disabled: Story = {
  render: () => (
    <div>
      <PageSizeSelector value={20} onChange={() => {}} disabled={true} />
      <p style={{ marginTop: '16px' }}>This selector is disabled</p>
    </div>
  ),
  play: async (context) => {
    const canvas = context.canvas;
    const button = await canvas.findByRole('button');
    await expect(button).toBeDisabled();
  },
};

export const WithSelection: Story = {
  render: () => <PageSizeSelectorWithState initialSize={20} />,
  play: async (context) => {
    const canvas = context.canvas;
    const userEvent = context.userEvent;

    // Initial state
    await expect(canvas.getByText('Selected: 20 / page')).toBeVisible();

    // Open dropdown
    const button = await canvas.findByRole('button');
    await userEvent.click(button);

    // Select a different size
    const option50 = canvas.getByText('50 / page');
    await userEvent.click(option50);

    // Verify selection changed
    await expect(canvas.getByText('Selected: 50 / page')).toBeVisible();
  },
};
