import Home from "@/app/page";
import { render, screen } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Home", () => {
  it("renders the main page", () => {
    render(<Home />);

    // Check for a main heading (adjust the text as needed)
    const heading = screen.getAllByText(
      "A Culinary Canvas - Share Your Recipes, Inspire the World"
    );
    expect(heading).toBeTruthy();

    // Check for the presence of a navigation element
    const nav = screen.getByRole("navigation");
    expect(nav).toBeTruthy();
  });
});
