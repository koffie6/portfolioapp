import { formatCurrency, formatShares } from "../src/formatting";

describe("Formatting Utilities", () => {
  describe("formatCurrency", () => {
    test("formats whole number with .00", () => {
      expect(formatCurrency(5000)).toBe("R 5 000.00");
    });

    test("formats number with decimals", () => {
      expect(formatCurrency(1234.56)).toBe("R 1 234.56");
    });

    test("formats large number with spaces for thousands", () => {
      expect(formatCurrency(1000000)).toBe("R 1 000 000.00");
    });
  });

  describe("formatShares", () => {
    test("formats simple share count", () => {
      expect(formatShares(110)).toBe("110 shares");
    });

    test("formats large share count with spaces", () => {
      expect(formatShares(1234567)).toBe("1 234 567 shares");
    });
  });
});