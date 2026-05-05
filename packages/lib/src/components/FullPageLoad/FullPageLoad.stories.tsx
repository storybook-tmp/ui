import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { FullPageLoad } from './index';

const meta = {
  component: FullPageLoad,
  title: 'Components/FullPageLoad',
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: '100%', height: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FullPageLoad>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <FullPageLoad />,
  play: async (context) => {
    const canvas = context.canvas;
    const loader = canvas.getByTestId('loading-page');
    await expect(loader).toBeVisible();
    await expect(canvas.getByText('LOADING...')).toBeInTheDocument();
  },
};

export const InContainer: Story = {
  render: () => <FullPageLoad />,
  play: async (context) => {
    const canvas = context.canvas;
    const text = canvas.getByText('LOADING...');
    await expect(text).toBeVisible();
  },
};
