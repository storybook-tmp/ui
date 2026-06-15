import type { Meta, StoryObj } from '@storybook/react-vite';
import { FullPageLoad } from './index';

const meta = {
  title: 'AI Generated/Simple/FullPageLoad',
  component: FullPageLoad,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FullPageLoad>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InsideContainer: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 400, height: 300, position: 'relative', border: '1px solid #ccc' }}>
        <Story />
      </div>
    ),
  ],
};
