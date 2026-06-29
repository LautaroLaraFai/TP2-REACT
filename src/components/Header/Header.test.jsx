import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import Header from "./Header.jsx";

const props = {
  clearInput: false,
  setClearInput: vi.fn(),
  setSearchActive: vi.fn(),
  setFilteredGames: vi.fn(),
  setIsLoading: vi.fn()
};

const mockLogout = vi.fn();

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      language: "es",
      changeLanguage: vi.fn(),
    },
  }),
}));

vi.mock("../../context/AuthContext.jsx", () => ({
  useAuth: vi.fn(),
}));

vi.mock("../LanguageSwitcher/LanguageSwitcher", () => ({
  default: () => <div>LanguageSwitcher</div>,
}));

vi.mock("../SearchBar/SearchBar", () => ({
  default: () => <div>SearchBar</div>,
}));

vi.mock("../../assets/Logo.svg", () => ({
  default: "logo.svg",
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Header component", () => {

  it("Renders correctly", async () => {
    const { useAuth } = await import("../../context/AuthContext.jsx");

    useAuth.mockReturnValue({
      isAuthenticated: false,
      logout: mockLogout,
      user: null,
    });

    render(
      <MemoryRouter>
        <Header {...props} />
      </MemoryRouter>
    );

    const header = document.querySelector("header");
    expect(header).toBeInTheDocument();
  });

  it("Should render favorite and logout when authenticated", async () => {
    const { useAuth } = await import("../../context/AuthContext.jsx");

    useAuth.mockReturnValue({
      isAuthenticated: true,
      logout: mockLogout,
      user: { name: "Lucas" },
    });

    render(
      <MemoryRouter>
        <Header {...props} />
      </MemoryRouter>
    );

    expect(screen.getByText("header.favText")).toBeInTheDocument();
    expect(screen.getByText("header.logoutText")).toBeInTheDocument();
  });

  it("Should render login when not authenticated", async () => {
    const { useAuth } = await import("../../context/AuthContext.jsx");

    useAuth.mockReturnValue({
      isAuthenticated: false,
      logout: mockLogout,
      user: null,
    });

    render(
      <MemoryRouter>
        <Header {...props} />
      </MemoryRouter>
    );

    expect(screen.getByText("header.loginText")).toBeInTheDocument();
  });

  it("Should call logout when clicking logout button", async () => {
    const { useAuth } = await import("../../context/AuthContext.jsx");

    useAuth.mockReturnValue({
      isAuthenticated: true,
      logout: mockLogout,
      user: { name: "Lucas" },
    });

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Header {...props} />
      </MemoryRouter>
    );

    await user.click(screen.getByText("header.logoutText"));

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it("Should open language switcher when clicking language button", async () => {
    const { useAuth } = await import("../../context/AuthContext.jsx");

    useAuth.mockReturnValue({
      isAuthenticated: false,
      logout: mockLogout,
      user: null,
    });

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Header {...props} />
      </MemoryRouter>
    );

    await user.click(screen.getByText("header.langText"));

    expect(screen.getByText("LanguageSwitcher")).toBeInTheDocument();
  });

  it("Should execute reset functions when clicking on the logo", async () => {
    const { useAuth } = await import("../../context/AuthContext.jsx");

    useAuth.mockReturnValue({
      isAuthenticated: false,
      logout: mockLogout,
      user: null,
    });

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Header {...props} />
      </MemoryRouter>
    );

    const trigger = screen.getByLabelText("to home");
    await user.click(trigger);

    expect(props.setClearInput).toHaveBeenCalledWith(true);
    expect(props.setSearchActive).toHaveBeenCalledWith(false);
    expect(props.setFilteredGames).toHaveBeenCalledWith([]);
  });
});