// expects: theme ("dark" | "light"), selectedTime {hour, minute}
export const AnalogHourFace = ({ theme = "dark", selectedTime }) => {
  const isDark = theme === "dark";
  const radius = 120;          // label circle radius (px)
  const handLen = 100;         // hour hand length (px)
  const hour = ((selectedTime?.hour ?? 12) % 12) || 12;
  const minute = selectedTime?.minute ?? 0;

  // hour hand angle: 30° per hour + 0.5° per minute
  const hourAngle = hour * 30 + minute * 0.5;

  return (
    <div
      className={`relative mt-6 w-64 h-64 rounded-full ${
        isDark ? "bg-[#EEF1F3]" : "bg-[#f3f4f6]"
      } shadow-sm`}
    >
      {/* CENTER DOT */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-yellow-600/80" />

      {/* HOUR HAND (rotates from center) */}
      <div className="absolute left-1/2 top-1/2 pointer-events-none">
        <div
          className="relative w-[3px] bg-yellow-600 origin-bottom"
          style={{
            height: `${handLen}px`,
            transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`,
          }}
        >
          {/* knob at the tip */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-amber-500/90 ring-4 ring-amber-500/20 flex items-center justify-center text-white text-sm font-semibold">
            {hour === 0 ? 12 : hour}
          </div>
        </div>
      </div>

      {/* HOUR MARKERS */}
      {Array.from({ length: 12 }).map((_, i) => {
        const n = i;
        const angle = n * 30; // degrees
        const rad = (angle * Math.PI) / 180;
        const x = radius * Math.sin(rad);
        const y = -radius * Math.cos(rad); // minus because CSS Y grows down

        return (
          <div
            key={n}
            className="absolute left-1/2 top-1/2 w-8 h-8 -ml-4 -mt-4 flex items-center justify-center font-semibold"
            style={{ transform: `translate(${x}px, ${y}px)` }}
          >
            <span className={`${isDark ? "text-black" : "text-gray-800"}`}>
              {n}
            </span>
          </div>
        );
      })}
    </div>
  );
};
