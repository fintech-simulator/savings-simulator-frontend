import * as React from "react";
import { cn } from "@/shared/utils/cn";
import { formatToCOP, parseFromCOP } from "@/shared/utils/formatCurrency";

export interface NumericInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  allowDecimal?: boolean;
  allowNegative?: boolean;
  formatAsCurrency?: boolean;
  onChange?: (value: string) => void;
}

const NumericInput = React.forwardRef<HTMLInputElement, NumericInputProps>(
  ({
    className,
    allowDecimal = false,
    allowNegative = false,
    formatAsCurrency = false,
    onKeyDown,
    onChange,
    value,
    ...props
  }, ref) => {
    const [displayValue, setDisplayValue] = React.useState("");

    // Sync display value when external value changes
    React.useEffect(() => {
      if (value !== undefined) {
        const stringValue = String(value);
        if (formatAsCurrency && stringValue && stringValue !== "0") {
          const numValue = parseFloat(stringValue);
          if (!isNaN(numValue)) {
            setDisplayValue(formatToCOP(numValue));
          } else {
            setDisplayValue(stringValue);
          }
        } else {
          setDisplayValue(stringValue);
        }
      }
    }, [value, formatAsCurrency]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Allow: backspace, delete, tab, escape, enter
      if (
        e.key === "Backspace" ||
        e.key === "Delete" ||
        e.key === "Tab" ||
        e.key === "Escape" ||
        e.key === "Enter" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "Home" ||
        e.key === "End"
      ) {
        return;
      }

      // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      if (e.ctrlKey || e.metaKey) {
        return;
      }

      // Allow decimal point if enabled and not already present
      if (allowDecimal && (e.key === "." || e.key === ",") && !displayValue.includes(",")) {
        return;
      }

      // Allow minus sign if enabled and at the beginning
      if (allowNegative && e.key === "-" && e.currentTarget.selectionStart === 0) {
        return;
      }

      // Prevent if not a number
      if (!/^\d$/.test(e.key)) {
        e.preventDefault();
      }

      // Call original onKeyDown if provided
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      if (formatAsCurrency) {
        // Parse the numeric value from the formatted string
        const numericValue = parseFromCOP(inputValue);

        // Update display with formatted value
        if (inputValue === "" || inputValue === "$") {
          setDisplayValue("");
          if (onChange) onChange("");
        } else if (!isNaN(numericValue)) {
          const formatted = formatToCOP(numericValue);
          setDisplayValue(formatted);
          // Send the raw numeric value to the form
          if (onChange) onChange(String(numericValue));
        }
      } else {
        setDisplayValue(inputValue);
        if (onChange) onChange(inputValue);
      }
    };

    return (
      <input
        type="text"
        inputMode="numeric"
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        value={displayValue}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

NumericInput.displayName = "NumericInput";

export { NumericInput };

