// expects: theme ("dark" | "light"), selectedTime {hour, minute}
export const AnalogHourFace = ({ theme = "dark", selectedTime }) => {
  const isDark = theme === "dark";
  const radius = 100;          // label circle radius (px)
  const handLen = 80;         // hour hand length (px)
  // Get hour and minute from selectedTime
  const rawHour = selectedTime?.hour ?? 12;
  const minute = selectedTime?.minute ?? 0;
  
  // Normalize hour to 1-12 range (TimePicker uses 1-12)
  let hour = rawHour;
  if (hour > 12) hour = hour % 12;
  if (hour === 0) hour = 12;
  
  // Map hour to clock position index (exactly matching number positioning logic)
  // Number positions: i=0 -> 12 (top), i=1 -> 1, i=2 -> 2, ..., i=11 -> 11
  // So hour 12 uses index 0, hour 1-11 use indices 1-11
  const hourIndex = hour === 12 ? 0 : hour;
  
  // Calculate angle using EXACT same formula as number positioning
  // Numbers use: angle = (i * 30) - 90
  // Hand should use: angle = (hourIndex * 30 + minute*0.5) - 90
  const hourAngle = (hourIndex * 30 + minute * 0.5) - 90;
  
  // Debug: log values to console (check browser console)
  console.log('🔍 Clock Debug:', {
    'selectedTime': selectedTime,
    'rawHour': rawHour,
    'normalizedHour': hour,
    'hourIndex': hourIndex,
    'minute': minute,
    'calculatedAngle': hourAngle,
    'shouldPointTo': hour === 12 ? '12 (top)' : `number ${hour}`
  });

  return (
    <div
      className={`relative mt-6 w-64 h-64 rounded-full ${
        isDark ? "bg-[#EEF1F3]" : "bg-[#EEF1F3]"
      } shadow-sm flex items-center justify-center`}
    >
      {/* CENTER DOT */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-yellow-600 z-10" />

      {/* HOUR HAND (rotates from center) */}
      <div 
        className="absolute left-1/2 top-1/2 pointer-events-none z-20"
        style={{ 
          width: '2px',
          height: `${handLen}px`,
          transformOrigin: '50% 100%',
          transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`,
          backgroundColor: '#EAB308', // yellow-600 equivalent
        }}
      />

      {/* HOUR MARKERS (1-12) */}
      {Array.from({ length: 12 }).map((_, i) => {
        // Map: i=0 -> hourNum=12 (top), i=1 -> hourNum=1, i=2 -> hourNum=2, ..., i=11 -> hourNum=11
        const hourNum = i === 0 ? 12 : i;
        // Angle: 12 at top (-90°), 1 at -60°, 2 at -30°, 3 at 0°, etc.
        const angle = (i * 30) - 90; // Start from top (-90°)
        const rad = (angle * Math.PI) / 180;
        const x = radius * Math.cos(rad);
        const y = radius * Math.sin(rad);
        const isSelected = hourNum === hour;

        return (
          <div
            key={hourNum}
            className="absolute left-1/2 top-1/2 w-8 h-8 -ml-4 -mt-4 flex items-center justify-center font-semibold z-10"
            style={{ transform: `translate(${x}px, ${y}px)` }}
          >
            {isSelected ? (
              <div className="w-8 h-8 rounded-full bg-yellow-600 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {hourNum}
                </span>
              </div>
            ) : (
              <span className={`text-sm ${isDark ? "text-black" : "text-gray-800"}`}>
                {hourNum}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
