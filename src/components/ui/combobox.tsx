"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Command } from "cmdk";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type ComboboxOption = { value: string; label: string };

type ComboboxProps = {
  options: ComboboxOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  id?: string;
  invalid?: boolean;
  className?: string;
};

/**
 * Searchable single-select (combobox). Type to filter the options.
 * Styled to match the Select component; uses Radix Popover + cmdk.
 */
export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select…",
  searchPlaceholder = "Type to filter…",
  emptyText = "No matches.",
  id,
  invalid,
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-invalid={invalid || undefined}
          className={cn(
            "flex h-11 w-full items-center justify-between rounded-xl border border-input bg-surface px-3.5 py-2 text-sm text-ink shadow-xs transition-colors",
            "focus-visible:outline-none focus-visible:border-brand-400 focus-visible:ring-2 focus-visible:ring-brand-200",
            "aria-[invalid=true]:border-destructive",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
        >
          <span className={cn("line-clamp-1", !selected && "text-ink-soft/70")}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown className="size-4 shrink-0 opacity-60" />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          className={cn(
            "z-50 w-[var(--radix-popover-trigger-width)] overflow-hidden rounded-xl border border-line bg-popover text-ink shadow-md",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          )}
        >
          <Command
            filter={(val, search) =>
              val.toLowerCase().includes(search.toLowerCase().trim()) ? 1 : 0
            }
          >
            <div className="border-b border-line px-3">
              <Command.Input
                placeholder={searchPlaceholder}
                className="h-11 w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-soft/70"
              />
            </div>
            <Command.List className="max-h-60 overflow-y-auto p-1.5">
              <Command.Empty className="py-6 text-center text-sm text-ink-soft">
                {emptyText}
              </Command.Empty>
              {options.map((o) => (
                <Command.Item
                  key={o.value}
                  value={o.label}
                  onSelect={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "relative flex w-full cursor-pointer select-none items-center rounded-lg py-2 pl-3 pr-8 text-sm outline-none transition-colors",
                    "data-[selected=true]:bg-brand-50 data-[selected=true]:text-brand-800",
                  )}
                >
                  <span className="line-clamp-1">{o.label}</span>
                  {value === o.value && (
                    <Check className="absolute right-2.5 size-4 text-brand-600" />
                  )}
                </Command.Item>
              ))}
            </Command.List>
          </Command>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
