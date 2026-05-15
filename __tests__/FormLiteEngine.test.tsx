import { FormLiteEngine } from "../src/components/FormLiteEngine";
import type { SchemaField } from "../src/components/FormLiteEngine/types";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, vi } from "vitest";

describe("FormLiteEngine Comprehensive Tests", () => {
  const mockOnSubmit = vi.fn();

  const basicSchema: SchemaField[] = [
    {
      name: "username",
      label: "Username",
      type: "text",
      rules: { required: "Username is required" },
      grid: { md: 12 },
    },
    {
      name: "isAdmin",
      label: "Is Admin",
      type: "switch",
    },
    {
      name: "secretCode",
      label: "Secret Code",
      type: "text",
      showIf: (values: any) => values.isAdmin === true,
    },
  ];

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  // ۱. تست رندر اولیه
  test("renders basic fields correctly", () => {
    render(<FormLiteEngine schema={basicSchema} onSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
  });

  // ۲. تست اعتبارسنجی (Validation)
  test("shows validation error on empty submit", async () => {
    render(<FormLiteEngine schema={basicSchema} onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(
      await screen.findByText(/Username is required/i),
    ).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  // ۳. تست منطق شرطی (Conditional Logic)
  test("handles conditional visibility (showIf)", async () => {
    render(<FormLiteEngine schema={basicSchema} onSubmit={mockOnSubmit} />);

    // در ابتدا فیلد کد مخفی است
    expect(screen.queryByLabelText(/Secret Code/i)).not.toBeInTheDocument();

    // فعال کردن سوئیچ ادمین
    const switchEl = screen.getByRole("switch");
    fireEvent.click(switchEl);

    // حالا باید فیلد ظاهر شود
    expect(await screen.findByLabelText(/Secret Code/i)).toBeInTheDocument();
  });

  // ۴. تست لودینگ و سابمیت موفق
  test("handles submitting state and loading animation", async () => {
    // ۱. شبیه‌سازی تابعی که کمی طول می‌کشد
    const asyncSubmit = vi
      .fn()
      .mockImplementation(() => new Promise((res) => setTimeout(res, 200)));

    render(
      <FormLiteEngine
        schema={basicSchema}
        onSubmit={asyncSubmit}
        loadingStrategy={{ type: "dots" }}
      />,
    );

    // ۲. پر کردن فیلد (حتماً از Role استفاده کن)
    const input = screen.getByRole("textbox", { name: /username/i });
    fireEvent.change(input, { target: { value: "milad" } });

    const submitBtn = screen.getByRole("button", { name: /submit/i });

    // ۳. کلیک روی سابمیت
    fireEvent.click(submitBtn);

    // ۴. کلید حل مشکل: منتظر بمان تا دکمه غیرفعال شود
    // این کار باعث می‌شه مشکل act() هم حل بشه چون waitFor خودش act رو مدیریت می‌کنه
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    // ۵. حالا منتظر بمان تا عملیات تمام شود و دکمه دوباره فعال شود
    await waitFor(() => {
      expect(submitBtn).not.toBeDisabled();
    });

    expect(asyncSubmit).toHaveBeenCalled();
  });

  // ۵. تست کامپوننت سفارشی (Custom Component)
  test("renders custom components correctly", () => {
    const CustomComp = ({ value, onChange }: any) => (
      <input data-testid="custom-input" value={value} onChange={onChange} />
    );

    const customSchema: SchemaField[] = [
      {
        name: "customField",
        label: "Custom",
        type: "custom",
        customComponent: CustomComp,
      },
    ];

    render(<FormLiteEngine schema={customSchema} onSubmit={mockOnSubmit} />);
    expect(screen.getByTestId("custom-input")).toBeInTheDocument();
  });

  test("submits the correct data structure", async () => {
    const onSubmit = vi.fn();
    render(<FormLiteEngine schema={basicSchema} onSubmit={onSubmit} />);

    fireEvent.change(screen.getByRole("textbox", { name: /username/i }), {
      target: { value: "gemini_user" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      // بررسی دقیق آرگومان‌های ورودی به تابع onSubmit
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ username: "gemini_user" }),
        expect.any(Object), // برای فرمت event ای که antd/react-hook-form می‌فرستد
      );
    });
  });


});
