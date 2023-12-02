import { fireEvent, render, screen } from "@testing-library/react";
import AnswerCard from "./AnswerCard";

const mockOnClick = jest.fn();

const defaultProps = {
  value: "optionOne",
  content: "Study React",
  isLoading: false,
  onClick: mockOnClick,
};

describe("Verify AnswerCard.jsx", () => {
  test("vote button should be enabled by default", () => {
    render(<AnswerCard {...defaultProps} />);
    expect(screen.getByRole("button")).toBeEnabled();
  });

  test("vote button should be disabled when isLoading is set to true", () => {
    render(<AnswerCard {...defaultProps} isLoading />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("onClick callback should be called when user click vote button", () => {
    render(<AnswerCard {...defaultProps} />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockOnClick).toHaveBeenCalledWith("optionOne");
  });
});
