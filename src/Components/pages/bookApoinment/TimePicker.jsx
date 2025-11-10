import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * TimePickerCard – Tailwind + React (single-file, drop-in)
 *
 * Features
 * - 12‑hour clock with AM/PM vertical selector (matches screenshot vibe)
 * - Click to focus hour/minute segments
 * - Keyboard: ↑/↓ to change, ←/→ to switch segment, numbers to type
 * - Mouse wheel on a focused segment increments/decrements
 * - Controlled or uncontrolled (value/onChange optional)
 * - Fully accessible (aria, rolegroup, radiogroup)
 */

export default function TimePickerCard({
  value,
  onChange,
  label = "Select Time",
  className = "",
  // future ready flags
  is12Hour = true,
}) {
  const isControlled = value != null && typeof onChange === "function";

  // Internal state if uncontrolled
  const [internal, setInternal] = useState(() =>
    normalizeTime(value ?? { hour: 12, minute: 0, period: "AM" })
  );

  const time = isControlled
    ? normalizeTime(value)
    : internal;

  const setTime = useCallback(
    (next) => {
      const normalized = normalizeTime(next);
      if (isControlled) onChange?.(normalized);
      else setInternal(normalized);
    },
    [isControlled, onChange]
  );

  // Focus handling between hour/minute segments
  const [focused, setFocused] = useState(/** @type {"hour"|"minute"} */ ("hour"));

  const hourRef = useRef(null);
  const minuteRef = useRef(null);

  // Increment helpers
  const incHour = useCallback((delta) => {
    let h = time.hour;
    if (is12Hour) {
      h = ((h - 1 + delta) % 12 + 12) % 12 + 1; // 1..12 wrap
    } else {
      h = ((h + delta) % 24 + 24) % 24; // 0..23
    }
    setTime({ ...time, hour: h });
  }, [time, setTime, is12Hour]);

  const incMinute = useCallback((delta) => {
    let total = time.minute + delta;
    let carry = 0;
    if (total >= 60) { carry = Math.floor(total / 60); total = total % 60; }
    if (total < 0) { carry = Math.floor((total - 59) / 60); total = 60 + (total % 60); }

    // adjust hour by carry
    if (carry !== 0) incHour(carry);
    setTime({ ...time, minute: clamp(total, 0, 59) });
  }, [time, setTime, incHour]);

  const togglePeriod = useCallback((p) => {
    if (!is12Hour) return;
    if (p !== time.period) setTime({ ...time, period: p });
  }, [time, setTime, is12Hour]);

  // Typing numbers to set hour/minute quickly
  const typedBuffer = useRef("");
  const clearBufferLater = useRef(0);

  const handleTypeDigits = useCallback((segment, key) => {
    // accept digits only
    if (!/^[0-9]$/.test(key)) return;
    window.clearTimeout(clearBufferLater.current);
    typedBuffer.current += key;

    const commit = () => {
      let num = parseInt(typedBuffer.current || "0", 10);
      if (segment === "hour") {
        if (is12Hour) {
          num = clamp(num, 1, 12);
        } else {
          num = clamp(num, 0, 23);
        }
        setTime({ ...time, hour: num });
      } else {
        num = Math.min(59, num);
        setTime({ ...time, minute: num });
      }
      typedBuffer.current = "";
    };

    // smart commit: if two digits typed or number exceeds bounds
    if (segment === "minute") {
      if (typedBuffer.current.length >= 2) commit();
      else clearBufferLater.current = window.setTimeout(commit, 800);
    } else {
      // hour
      if ((is12Hour && parseInt(typedBuffer.current, 10) >= 2 && typedBuffer.current.length === 1) ||
          (!is12Hour && typedBuffer.current.length >= 2)) {
        // Predictive: in 12h mode, starting with 2 may need next digit 0-3
        clearBufferLater.current = window.setTimeout(commit, 500);
      } else if (typedBuffer.current.length >= 2) {
        commit();
      } else {
        clearBufferLater.current = window.setTimeout(commit, 800);
      }
    }
  }, [time, setTime, is12Hour]);

  // Keyboard + Wheel handlers
  const onKeyDown = useCallback((e) => {
    if (e.key === "ArrowUp") { e.preventDefault(); focused === "hour" ? incHour(1) : incMinute(1); }
    else if (e.key === "ArrowDown") { e.preventDefault(); focused === "hour" ? incHour(-1) : incMinute(-1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); setFocused("hour"); hourRef.current?.focus(); }
    else if (e.key === "ArrowRight") { e.preventDefault(); setFocused("minute"); minuteRef.current?.focus(); }
    else if (/^[0-9]$/.test(e.key)) { e.preventDefault(); handleTypeDigits(focused, e.key); }
  }, [focused, incHour, incMinute, handleTypeDigits]);

  useEffect(() => {
    const el = document.getElementById("tp-root");
    el?.addEventListener("keydown", onKeyDown);
    return () => el?.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const display = useMemo(() => formatDisplay(time, is12Hour), [time, is12Hour]);

  return (
    <div
      id="tp-root"
      className={[
        "w-full max-w-md select-none",
        className,
      ].join(" ")}
      role="group"
      aria-label={label}
    >
      <div className="flex items-center justify-between rounded-2xl bg-white shadow-sm ring-1 ring-black/5 px-5 py-3">
        {/* Label */}
        <div className="text-sm font-medium text-gray-600">{label}</div>

        {/* Time & AM/PM */}
        <div className="flex items-center gap-4">
          {/* Time segments */}
          <div className="flex items-baseline font-semibold text-gray-700">
            {/* Hour */}
            <button
              ref={hourRef}
              type="button"
              onClick={() => { setFocused("hour"); hourRef.current?.focus(); }}
              onWheel={(e) => { e.preventDefault(); incHour(e.deltaY > 0 ? -1 : 1); }}
              className={[
                "outline-none tabular-nums text-3xl leading-none",
                focused === "hour" ? "text-gray-900" : "text-gray-500",
                "focus-visible:ring-2 focus-visible:ring-indigo-500/70 rounded"
              ].join(" ")}
              aria-label="Hours"
            >
              {display.hour}
            </button>

            {/* Colon */}
            <span className="px-1 text-2xl text-gray-400">:</span>

            {/* Minute */}
            <button
              ref={minuteRef}
              type="button"
              onClick={() => { setFocused("minute"); minuteRef.current?.focus(); }}
              onWheel={(e) => { e.preventDefault(); incMinute(e.deltaY > 0 ? -1 : 1); }}
              className={[
                "outline-none tabular-nums text-3xl leading-none",
                focused === "minute" ? "text-gray-900" : "text-gray-500",
                "focus-visible:ring-2 focus-visible:ring-indigo-500/70 rounded"
              ].join(" ")}
              aria-label="Minutes"
            >
              {display.minute}
            </button>
          </div>

          {/* AM/PM vertical selector */}
          {is12Hour && (
            <div role="radiogroup" aria-label="AM/PM" className="flex flex-col leading-none">
              <label className="inline-flex items-center gap-1">
                <input
                  type="radio"
                  className="sr-only"
                  name="ampm"
                  checked={time.period === "AM"}
                  onChange={() => togglePeriod("AM")}
                />
                <button
                  type="button"
                  onClick={() => togglePeriod("AM")}
                  className={[
                    "text-xs font-semibold tracking-wide",
                    time.period === "AM" ? "text-gray-700" : "text-gray-400",
                  ].join(" ")}
                  aria-pressed={time.period === "AM"}
                >
                  AM
                </button>
              </label>
              <label className="inline-flex items-center gap-1">
                <input
                  type="radio"
                  className="sr-only"
                  name="ampm"
                  checked={time.period === "PM"}
                  onChange={() => togglePeriod("PM")}
                />
                <button
                  type="button"
                  onClick={() => togglePeriod("PM")}
                  className={[
                    "text-xs font-semibold tracking-wide",
                    time.period === "PM" ? "text-gray-700" : "text-gray-400",
                  ].join(" ")}
                  aria-pressed={time.period === "PM"}
                >
                  PM
                </button>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------- helpers ----------

function pad2(n) {
  return String(n).padStart(2, "0");
}

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

function normalizeTime(val) {
  const def = { hour: 12, minute: 0, period: "AM" };
  const t = { ...def, ...(val ?? {}) };
  // hour bounds are applied later depending on mode; keep safe
  if (t.minute < 0 || t.minute > 59 || Number.isNaN(t.minute)) t.minute = 0;
  if (t.hour == null || Number.isNaN(t.hour)) t.hour = 12;
  if (t.period !== "AM" && t.period !== "PM") t.period = "AM";
  return t;
}

function formatDisplay(t, is12Hour) {
  let hour = t.hour;
  if (is12Hour) {
    if (hour === 0) hour = 12;
    if (hour > 12) hour = ((hour - 1) % 12) + 1; // normalize to 1..12
  }
  return {
    hour: is12Hour ? String(hour) : pad2(hour),
    minute: pad2(t.minute),
    period: t.period,
  };
}

/**
 * Usage
 *
 * <TimePickerCard
 *   value={{ hour: 12, minute: 4, period: "AM" }}
 *   onChange={(t) => console.log(t)}
 * />
 */
