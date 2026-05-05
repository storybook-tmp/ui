import type { Meta, StoryObj } from '@storybook/react';
import ErrorBoundary from './index';

const meta = {
  title: 'AI Generated/Complex/ErrorBoundary',
  component: ErrorBoundary,
} satisfies Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

const WorkingComponent = () => <div>This component works fine</div>;

const BrokenComponent = () => {
  throw new Error('This component has crashed');
};

export const WithWorkingChild: Story = {
  args: {
    homeURL: '/',
    children: <WorkingComponent />,
  },
};

export const WithBrokenChild: Story = {
  args: {
    homeURL: '/',
    children: <BrokenComponent />,
  },
};

export const CustomHomeURL: Story = {
  args: {
    homeURL: '/dashboard',
    children: <WorkingComponent />,
  },
};
