import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import '@testing-library/jest-dom';
import Button from '@/components/Button/Button'
import { useRouter } from "next/router";

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));
 
describe('Button Component', () => {
    it("renders the button with children", () => {
        render(<Button color="primary">Click me</Button>);
        expect(screen.getByText("Click me")).toBeInTheDocument();
      });
})

