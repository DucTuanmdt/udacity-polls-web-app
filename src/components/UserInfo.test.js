import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import UserInfo from "./UserInfo";

const defaultProps = {
  avatar: "https://i.pravatar.cc/150?img=1",
  name: "Peter",
};
describe("Snapshot test for UserInfo.jsx", () => {
  test("should render correctly", () => {
    const tree = renderer.create(<UserInfo {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("should render avatar and user's name", () => {
    render(<UserInfo {...defaultProps} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
  });
});
