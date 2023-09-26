// Imports
import { render, screen } from "@testing-library/react";
// import user from "@testing-library/user-event";

// To Test
import App from "../App";

describe("Test App component", () => {
  //   test("should not find count content if count is 0", async () => {
  //     // Arrange
  //     render(<App />);

  //     // Act
  //     const buttonCount = await screen.findByRole("button");

  //     await user.click(buttonCount);
  //     await user.click(buttonCount);

  //     // Assert
  //     expect(buttonCount.innerHTML).toBe("count is: 2");
  //   });

  test("should properly set count text on button click", async () => {
    // Arrange
    render(<App />);

    // Act
    const codeCount = await screen.queryByText(/The count is now:/);

    // Assert
    expect(codeCount).not.toBeInTheDocument();
  });
});
