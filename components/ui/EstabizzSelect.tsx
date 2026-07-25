"use client";

/**
 * EstabizzSelect — premium custom listbox/select component
 *
 * Replaces native <select> across the site with an accessible, fully styled
 * custom dropdown that matches the design language in CountryLandingClient.tsx.
 *
 * Accessibility: ARIA combobox + listbox pattern
 * Keyboard: ArrowDown/Up navigates, Enter selects, Escape/Tab closes
 * Positioning: opens upward when < 300px below viewport bottom
 */

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EstabizzSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface EstabizzSelectProps {
  options: EstabizzSelectOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  hint?: string;
  /** Adds a hidden <input> for native form compat */
  name?: string;
  /** "public" → larger (h-[50px], text-[15px]) | "admin" → compact (h-[42px], text-[13.5px]) */
  variant?: "public" | "admin";
  className?: string;
  id?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function EstabizzSelect({
  options,
  value,
  onValueChange,
  placeholder = "Select…",
  label,
  required,
  disabled = false,
  error,
  hint,
  name,
  variant = "admin",
  className = "",
  id: externalId,
}: EstabizzSelectProps) {
  const [open, setOpen] = useState(false);
  const [focusedIdx, setFocusedIdx] = useState(-1);
  const [openUpward, setOpenUpward] = useState(false);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  const autoId = useId();
  const triggerId = externalId ?? `estabizz-select-trigger-${autoId}`;
  const listboxId = `estabizz-select-listbox-${autoId}`;

  // ── Derived ───────────────────────────────────────────────────────────────
  const selectedLabel =
    options.find((o) => o.value === value)?.label ?? "";

  // ── Click outside → close ─────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setFocusedIdx(-1);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // ── Scroll focused option into view ───────────────────────────────────────
  useEffect(() => {
    if (!open || focusedIdx < 0 || !listboxRef.current) return;
    const item = listboxRef.current.children[focusedIdx] as HTMLElement | null;
    item?.scrollIntoView({ block: "nearest" });
  }, [focusedIdx, open]);

  // ── Compute fixed position from trigger rect ──────────────────────────────
  const computePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const upward = spaceBelow < 300;
    setOpenUpward(upward);
    setMenuStyle(
      upward
        ? {
            position: "fixed",
            left: rect.left,
            width: rect.width,
            bottom: window.innerHeight - rect.top + 6,
            top: "auto",
            zIndex: 9999,
          }
        : {
            position: "fixed",
            left: rect.left,
            width: rect.width,
            top: rect.bottom + 6,
            zIndex: 9999,
          },
    );
  }, []);

  // ── Reposition on scroll / resize while open ──────────────────────────────
  useEffect(() => {
    if (!open) return;
    window.addEventListener("scroll", computePosition, true);
    window.addEventListener("resize", computePosition);
    return () => {
      window.removeEventListener("scroll", computePosition, true);
      window.removeEventListener("resize", computePosition);
    };
  }, [open, computePosition]);

  // ── Open / close helpers ──────────────────────────────────────────────────
  const openMenu = useCallback(() => {
    if (disabled) return;
    computePosition();
    setOpen(true);
    // Pre-focus the currently selected option
    const idx = options.findIndex((o) => o.value === value && !o.disabled);
    setFocusedIdx(idx >= 0 ? idx : 0);
  }, [disabled, computePosition, options, value]);

  const closeMenu = useCallback(() => {
    setOpen(false);
    setFocusedIdx(-1);
  }, []);

  const select = useCallback(
    (optValue: string) => {
      onValueChange(optValue);
      closeMenu();
      triggerRef.current?.focus();
    },
    [onValueChange, closeMenu],
  );

  // ── Keyboard handling ─────────────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;

      if (!open) {
        if (
          e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "Enter" ||
          e.key === " "
        ) {
          e.preventDefault();
          openMenu();
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          setFocusedIdx((prev) => {
            let next = prev + 1;
            while (next < options.length && options[next]?.disabled) next++;
            return next < options.length ? next : prev;
          });
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          setFocusedIdx((prev) => {
            let next = prev - 1;
            while (next >= 0 && options[next]?.disabled) next--;
            return next >= 0 ? next : prev;
          });
          break;
        }
        case "Enter":
        case " ": {
          e.preventDefault();
          if (focusedIdx >= 0 && !options[focusedIdx]?.disabled) {
            select(options[focusedIdx].value);
          }
          break;
        }
        case "Escape": {
          e.preventDefault();
          closeMenu();
          triggerRef.current?.focus();
          break;
        }
        case "Tab": {
          closeMenu();
          break;
        }
        case "Home": {
          e.preventDefault();
          const first = options.findIndex((o) => !o.disabled);
          if (first >= 0) setFocusedIdx(first);
          break;
        }
        case "End": {
          e.preventDefault();
          let last = options.length - 1;
          while (last >= 0 && options[last]?.disabled) last--;
          if (last >= 0) setFocusedIdx(last);
          break;
        }
      }
    },
    [disabled, open, openMenu, focusedIdx, options, select, closeMenu],
  );

  // ── Variant styles ────────────────────────────────────────────────────────
  const isPublic = variant === "public";
  const triggerHeight = isPublic ? "h-[50px]" : "h-[42px]";
  const triggerText = isPublic ? "text-[15px]" : "text-[13.5px]";
  const optionText = isPublic ? "text-[14px]" : "text-[13.5px]";

  const triggerBase = [
    "flex w-full items-center justify-between rounded-xl border bg-white dark:bg-[var(--input-background)] px-4 text-left outline-none",
    "transition-all",
    triggerHeight,
    triggerText,
    error
      ? "border-red-300 dark:border-red-700 focus:border-red-400 focus:ring-2 focus:ring-red-200/60 dark:focus:ring-red-800/40"
      : open
        ? "border-[#1677f2] ring-2 ring-[#1677f2]/20"
        : "border-[#dbe7f3] dark:border-[var(--input-border)] hover:border-[#1677f2]/40 focus:border-[#1677f2] focus:ring-2 focus:ring-[#1677f2]/20",
    disabled
      ? "cursor-not-allowed bg-[#f8fafc] dark:bg-[#0a1628] opacity-60"
      : "cursor-pointer",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Optional label */}
      {label && (
        <label
          htmlFor={triggerId}
          className="mb-1.5 block text-[12px] font-bold text-[#334155] dark:text-[#f7f9fc]"
        >
          {label}
          {required && (
            <span className="ml-0.5 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {/* Hidden input for native form compat */}
      {name && <input type="hidden" name={name} value={value} />}

      {/* Trigger */}
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-required={required}
        aria-disabled={disabled}
        aria-invalid={error ? "true" : undefined}
        disabled={disabled}
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={handleKeyDown}
        className={triggerBase}
      >
        <span
          className={
            selectedLabel ? "truncate text-[#0a1628] dark:text-[#f7f9fc]" : "text-[#94a3b8] dark:text-[#64748b]"
          }
        >
          {selectedLabel || placeholder}
        </span>

        {/* Chevron */}
        <svg
          className={`ml-2 h-4 w-4 shrink-0 text-[#64748b] dark:text-[#a9b6c9] transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown menu — position:fixed so it escapes overflow:hidden ancestors */}
      {open && (
        <ul
          ref={listboxRef}
          id={listboxId}
          role="listbox"
          aria-label={label ?? placeholder}
          style={menuStyle}
          className="overflow-hidden rounded-xl border border-[#dbe7f3] dark:border-[var(--border)] bg-white dark:bg-[var(--popover-background)] shadow-[0_12px_40px_rgba(0,60,110,0.14)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.50)]"
        >
          <div className="max-h-[280px] overflow-y-auto py-1">
            {options.map((opt, idx) => {
              const isSelected = opt.value === value;
              const isFocused = idx === focusedIdx;
              const isDisabled = opt.disabled ?? false;

              return (
                <li
                  key={opt.value}
                  id={`${listboxId}-option-${idx}`}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={isDisabled || undefined}
                  onMouseDown={(e) => {
                    e.preventDefault(); // prevent blur before click
                    if (!isDisabled) select(opt.value);
                  }}
                  onMouseEnter={() => !isDisabled && setFocusedIdx(idx)}
                  className={[
                    "flex w-full cursor-pointer items-center gap-2.5 px-4 py-2.5 text-left transition-colors",
                    optionText,
                    isDisabled
                      ? "cursor-not-allowed opacity-40"
                      : isFocused || isSelected
                        ? "bg-[#eaf3ff] dark:bg-[#1677f2]/10"
                        : "hover:bg-[#f0f7ff] dark:hover:bg-[#12223a]",
                    isSelected
                      ? "font-semibold text-[#1677f2] dark:text-[#60a5fa]"
                      : "text-[#334155] dark:text-[#a9b6c9]",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {/* Checkmark for selected */}
                  <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                    {isSelected && (
                      <svg
                        className="h-3.5 w-3.5 text-[#1677f2]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </span>
                  <span className="truncate">{opt.label}</span>
                </li>
              );
            })}
          </div>
        </ul>
      )}

      {/* Error message */}
      {error && (
        <p className="mt-1 text-[11px] font-semibold text-red-600 dark:text-[#f87171]" role="alert">
          {error}
        </p>
      )}

      {/* Hint */}
      {hint && !error && (
        <p className="mt-1 text-[11px] text-[#94a3b8] dark:text-[#a9b6c9]">{hint}</p>
      )}
    </div>
  );
}

export default EstabizzSelect;
