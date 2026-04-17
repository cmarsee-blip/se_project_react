import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useFormWithValidation } from "./useFormWithValidation";
import { describe, it, afterEach, expect } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => cleanup());

function TestForm({ validators, defaultValues }) {
  const {
    values,
    handleChange,
    errors,
    validateAll,
    showErrors,
    setShowErrors,
  } = useFormWithValidation(defaultValues, validators);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const ok = validateAll();
        if (!ok) setShowErrors(true);
      }}
    >
      <input
        data-testid="name"
        name="name"
        value={values.name}
        onChange={handleChange}
      />
      <span data-testid="name-error">
        {showErrors && errors.name ? errors.name : ""}
      </span>

      <input
        data-testid="image"
        name="imageUrl"
        value={values.imageUrl}
        onChange={handleChange}
      />
      <span data-testid="image-error">
        {showErrors && errors.imageUrl ? errors.imageUrl : ""}
      </span>

      <input
        data-testid="weather-hot"
        type="radio"
        name="weather"
        value="hot"
        onChange={handleChange}
      />
      <input
        data-testid="weather-cold"
        type="radio"
        name="weather"
        value="cold"
        onChange={handleChange}
      />
      <span data-testid="weather-error">
        {showErrors && errors.weather ? errors.weather : ""}
      </span>

      <button data-testid="submit" type="submit">
        submit
      </button>
    </form>
  );
}

describe("useFormWithValidation", () => {
  it("shows errors after submit when fields are invalid", async () => {
    const validators = {
      name: (v) => (!v || !v.trim() ? "Name is required." : ""),
      imageUrl: (v) => (!v || !v.trim() ? "Image URL is required." : ""),
      weather: (v) => (!v ? "Select a weather type." : ""),
    };

    render(
      <TestForm
        validators={validators}
        defaultValues={{ name: "", imageUrl: "", weather: "" }}
      />,
    );

    const user = userEvent.setup();
    await user.click(screen.getByTestId("submit"));

    expect(screen.getByTestId("name-error")).toHaveTextContent(
      "Name is required.",
    );
    expect(screen.getByTestId("image-error")).toHaveTextContent(
      "Image URL is required.",
    );
    expect(screen.getByTestId("weather-error")).toHaveTextContent(
      "Select a weather type.",
    );
  });

  it("passes validation when valid values provided", async () => {
    const validators = {
      name: (v) => (!v || !v.trim() ? "Name is required." : ""),
      imageUrl: (v) => (!v || !v.trim() ? "Image URL is required." : ""),
      weather: (v) => (!v ? "Select a weather type." : ""),
    };

    render(
      <TestForm
        validators={validators}
        defaultValues={{ name: "", imageUrl: "", weather: "" }}
      />,
    );

    const user = userEvent.setup();
    await user.type(screen.getByTestId("name"), "T-Shirt");
    await user.type(screen.getByTestId("image"), "https://example.com/img.jpg");
    await user.click(screen.getByTestId("weather-hot"));
    await user.click(screen.getByTestId("submit"));

    expect(screen.getByTestId("name-error")).toHaveTextContent("");
    expect(screen.getByTestId("image-error")).toHaveTextContent("");
    expect(screen.getByTestId("weather-error")).toHaveTextContent("");
  });
});
