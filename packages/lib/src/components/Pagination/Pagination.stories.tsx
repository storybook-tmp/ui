import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { useLocation } from "react-router-dom";
import Pagination from ".";

const meta = {
  args: {
    currentPage: 0,
    pageSize: 10,
    totalResults: 10,
  },
  component: Pagination,
  title: "Components/Pagination",
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

const PaginationWithLocation: React.FC<React.ComponentProps<typeof Pagination>> = (
  props,
) => {
  const location = useLocation();

  return (
    <>
      <Pagination {...props} />
      <div>Current search: {location.search || "none"}</div>
    </>
  );
};

export const FirstPage: Story = {
  play: async ({ mount }) => {
    const canvas = await mount(
      <Pagination currentPage={0} pageSize={10} totalResults={40} />,
    );
    const [prevButton] = await canvas.findAllByRole("button");

    await expect(await canvas.findByText("1 / 4")).toBeVisible();
    await expect(prevButton).toHaveAttribute("aria-disabled", "true");
  },
};

export const LastPage: Story = {
  play: async ({ mount }) => {
    const canvas = await mount(
      <Pagination currentPage={3} pageSize={10} totalResults={40} />,
    );
    const buttons = await canvas.findAllByRole("button");
    const nextButton = buttons[1];

    await expect(await canvas.findByText("4 / 4")).toBeVisible();
    await expect(nextButton).toHaveAttribute("aria-disabled", "true");
  },
};

export const UpdatesQueryParam: Story = {
  play: async ({ mount, userEvent }) => {
    const canvas = await mount(
      <PaginationWithLocation currentPage={0} pageSize={10} totalResults={40} />,
    );
    const buttons = await canvas.findAllByRole("button");
    const nextButton = buttons[1];

    await userEvent.click(nextButton);
    await expect(await canvas.findByText("Current search: ?page=1")).toBeVisible();
  },
};
