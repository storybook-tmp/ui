import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Disclaimer } from "@leafygreen-ui/typography";
import { useLocation } from "react-router-dom";
import { expect } from "storybook/test";
import Pagination from ".";

const meta = {
  args: {
    currentPage: 0,
    pageSize: 5,
    totalResults: 10,
  },
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

const LocationSearch: React.FC = () => {
  const location = useLocation();

  return <Disclaimer>{location.search || "no-search"}</Disclaimer>;
};

const ControlledPagination: React.FC<{
  totalResults: number;
  pageSize: number;
}> = ({ pageSize, totalResults }) => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <>
      <Pagination
        currentPage={currentPage}
        onChange={setCurrentPage}
        pageSize={pageSize}
        totalResults={totalResults}
      />
      <Disclaimer>{`selected-page:${currentPage}`}</Disclaimer>
    </>
  );
};

export const Default: Story = {
  render: (args) => (
    <>
      <Pagination {...args} />
      <LocationSearch />
    </>
  ),
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText("1 / 2")).toBeVisible();
    await expect(canvas.getByText("no-search")).toBeVisible();

    await userEvent.click(canvas.getAllByRole("button")[1]);

    await expect(canvas.getByText("?page=1")).toBeVisible();
  },
};

export const CountLimited: Story = {
  args: {
    countLimit: 100,
    pageSize: 10,
    totalResults: 100,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("1 / many")).toBeVisible();
    await expect(canvas.getAllByRole("button")).toHaveLength(2);
  },
};

export const Controlled: Story = {
  render: () => <ControlledPagination pageSize={5} totalResults={15} />,
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText("selected-page:0")).toBeVisible();

    await userEvent.click(canvas.getAllByRole("button")[1]);

    await expect(canvas.getByText("selected-page:1")).toBeVisible();
    await expect(canvas.getByText("2 / 3")).toBeVisible();
  },
};
