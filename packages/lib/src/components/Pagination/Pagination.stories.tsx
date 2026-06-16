import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Pagination from './index';

const meta = {
  title: 'AI Generated/Medium/Pagination',
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(0);
    return (
      <Pagination
        currentPage={currentPage}
        onChange={setCurrentPage}
        totalResults={100}
        pageSize={10}
      />
    );
  },
};

export const LastPage: Story = {
  render: () => (
    <Pagination
      currentPage={9}
      onChange={() => {}}
      totalResults={100}
      pageSize={10}
    />
  ),
};
