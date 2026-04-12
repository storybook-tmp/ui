import styled from "@emotion/styled";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { FullPageLoad } from ".";

const meta = {
  component: FullPageLoad,
} satisfies Meta<typeof FullPageLoad>;

export default meta;

type Story = StoryObj<typeof meta>;

const FramedStory = styled.div`
  border: 1px solid #e8edeb;
  min-height: 280px;
`;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("LOADING...")).toBeVisible();
  },
};

export const Framed: Story = {
  render: () => (
    <FramedStory>
      <FullPageLoad />
    </FramedStory>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("LOADING...")).toBeVisible();
  },
};

export const Repeated: Story = {
  render: () => (
    <>
      <FullPageLoad />
      <FullPageLoad />
    </>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByText("LOADING...")).toHaveLength(2);
  },
};
