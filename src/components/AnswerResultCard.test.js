import renderer from "react-test-renderer";
import AnswerResultCard from "./AnswerResultCard";

const defaultProps = {
  option: {
    votes: ["mtsamis", "sarahedo"],
    text: "Study React",
  },
  totalAnswers: 4,
  isSelected: false,
};

describe("Snapshot test for UserInfo.jsx", () => {
  test("should render unselected AnswerResultCard correctly", () => {
    const tree = renderer
      .create(<AnswerResultCard {...defaultProps} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("should render selected AnswerResultCard correctly", () => {
    const tree = renderer
      .create(<AnswerResultCard {...defaultProps} isSelected />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
