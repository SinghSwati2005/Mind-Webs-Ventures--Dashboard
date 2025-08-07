

// "use client";

// import { useEffect, useState } from "react";
// import { Range, getTrackBackground } from "react-range";
// import { useDashboardStore } from "@/store/useDashboardStore";
// import { format, addDays, addMonths, addYears, isValid } from "date-fns";

// const SLIDER_LIMITS = {
//   day: 30,
//   month: 12,
//   year: 5,
// };

// const START_DATE = new Date(2024, 0, 1); // Jan 1, 2024

// function getDateLabel(index: number, unit: "day" | "month" | "year") {
//   try {
//     const date =
//       unit === "day"
//         ? addDays(START_DATE, index * 7)
//         : unit === "month"
//         ? addMonths(START_DATE, index)
//         : addYears(START_DATE, index);
//     return isValid(date) ? format(date, unit === "day" ? "MMM d" : unit === "month" ? "MMM yyyy" : "yyyy") : "Invalid Date";
//   } catch (error) {
//     console.error("Date formatting failed:", error);
//     return "Invalid Date";
//   }
// }

// export default function TimeLineSlider() {
//   const {
//     timeUnit,
//     setTimeUnit,
//     rangeType,
//     setRangeType,
//     timeRange,
//     setTimeRange,
//     timePoint,
//     setTimePoint,
//     setMetrics,
//   } = useDashboardStore();

//   const [localValue, setLocalValue] = useState<number[]>([]);
//   const [isClient, setIsClient] = useState(false);

//   const max = SLIDER_LIMITS[timeUnit];

//   const clamp = (val: number) => Math.min(Math.max(0, val), max);

//   useEffect(() => {
//     setIsClient(true);
//     if (rangeType === "range") {
//       setLocalValue([clamp(timeRange[0]), clamp(timeRange[1])]);
//     } else {
//       setLocalValue([clamp(timePoint)]);
//     }
//   }, []);

//   useEffect(() => {
//     if (rangeType === "range") {
//       const start = 0;
//       const end = Math.min(1, max);
//       setLocalValue([start, end]);
//     } else {
//       setLocalValue([0]);
//     }
//   }, [timeUnit, rangeType]);

//   useEffect(() => {
//     if (rangeType === "range") {
//       const [start, end] = localValue;
//       setTimeRange([clamp(start), clamp(end)]);
//     } else {
//       setTimePoint(clamp(localValue[0]));
//     }

//     const delta =
//       rangeType === "range" ? localValue[1] - localValue[0] : localValue[0];

//     const changePercent = Math.floor(Math.random() * 40 - 20);

//     setMetrics({
//       revenue: 500000 + delta * 2500,
//       users: 1000 + delta * 20,
//       sessions: 2000 + delta * 30,
//       conversion: +(2.5 + (delta % 5) * 0.1).toFixed(2),
//       pageViews: 3000 + delta * 50,
//       change: changePercent,
//     });
//   }, [localValue, timeUnit, rangeType]);

//   return (
//     <div className="bg-[#1e293b] text-white p-6 rounded-xl">
//       <div className="flex justify-between items-center mb-4">
//         <div className="text-xl font-semibold text-purple-400 flex items-center gap-2">
//           <span>📅 Time Period</span>
//           <span className="text-white">
//             {rangeType === "range"
//               ? `${getDateLabel(localValue[0], timeUnit)} - ${getDateLabel(
//                   localValue[1],
//                   timeUnit
//                 )}`
//               : getDateLabel(localValue[0], timeUnit)}
//           </span>
//         </div>

//         {/* Toggle Range / Single */}
//         <div className="flex items-center gap-4">
//           <div className="flex items-center gap-2 text-sm">
//             <span className="text-gray-300">Single Point</span>
//             <label className="relative inline-flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={rangeType === "range"}
//                 onChange={() =>
//                   setRangeType(rangeType === "range" ? "single" : "range")
//                 }
//                 className="sr-only peer"
//               />
//               <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:bg-purple-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
//             </label>
//             <span className="text-gray-300">Range</span>
//           </div>

//           {/* Time Unit Dropdown */}
//           <select
//             className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-600"
//             value={timeUnit}
//             onChange={(e) => setTimeUnit(e.target.value as any)}
//           >
//             <option value="day">Day</option>
//             <option value="month">Month</option>
//             <option value="year">Year</option>
//           </select>
//         </div>
//       </div>

//       {isClient && localValue.length > 0 && (
//         <div className="mt-6">
//           <Range
//             key={`${rangeType}-${timeUnit}`}
//             values={localValue}
//             step={1}
//             min={0}
//             max={max}
//             onChange={(vals) => setLocalValue(vals.map(clamp))}
//             renderTrack={({ props, children }) => (
//               <div
//                 ref={props.ref}
//                 style={{
//                   ...props.style,
//                   height: "6px",
//                   width: "100%",
//                   background: getTrackBackground({
//                     values: localValue,
//                     colors: ["#ccc", "#a855f7", "#ccc"],
//                     min: 0,
//                     max,
//                   }),
//                   borderRadius: "3px",
//                 }}
//                 onMouseDown={props.onMouseDown}
//                 onTouchStart={props.onTouchStart}
//               >
//                 {children}
//               </div>
//             )}
//             renderThumb={({ props, index }) => {
//               const { key, ...thumbProps } = props;
//               return (
//                 <div
//                   key={index}
//                   {...thumbProps}
//                   style={{
//                     ...thumbProps.style,
//                     height: "24px",
//                     width: "24px",
//                     backgroundColor: "#a855f7",
//                     borderRadius: "50%",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     color: "#fff",
//                     fontSize: "10px",
//                     position: "relative",
//                   }}
//                 >
//                   <div className="absolute -top-6 whitespace-nowrap text-sm font-medium">
//                     {getDateLabel(localValue[index], timeUnit)}
//                   </div>
//                 </div>
//               );
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { Range, getTrackBackground } from "react-range";
import { useDashboardStore } from "@/store/useDashboardStore";
import { format, addDays, addMonths, addYears } from "date-fns";

const SLIDER_LIMITS = {
  day: 30,
  month: 12,
  year: 5,
};

const START_DATE = new Date(2024, 0, 1); // Jan 1, 2024

function getDateLabel(index: number, unit: "day" | "month" | "year") {
  try {
    if (typeof index !== 'number' || isNaN(index)) return '';
    
    if (unit === "day") return format(addDays(START_DATE, index * 7), "MMM d");
    if (unit === "month") return format(addMonths(START_DATE, index), "MMM yyyy");
    if (unit === "year") return format(addYears(START_DATE, index), "yyyy");

    return "";
  } catch (error) {
    console.error("Date formatting failed:", error);
    return "";
  }
}


export default function TimeLineSlider() {
  const {
    timeUnit,
    setTimeUnit,
    rangeType,
    setRangeType,
    timeRange,
    setTimeRange,
    timePoint,
    setTimePoint,
    setMetrics,
  } = useDashboardStore();

  const [localValue, setLocalValue] = useState<number[]>([]);
  const [isClient, setIsClient] = useState(false);

  const max = SLIDER_LIMITS[timeUnit];

  const clamp = (val: number) => Math.min(Math.max(0, val), max);

  useEffect(() => {
    setIsClient(true);
    if (rangeType === "range") {
      setLocalValue([clamp(timeRange[0]), clamp(timeRange[1])]);
    } else {
      setLocalValue([clamp(timePoint)]);
    }
  }, []);

  useEffect(() => {
    if (rangeType === "range") {
      const start = 0;
      const end = Math.min(1, max);
      setLocalValue([start, end]);
    } else {
      setLocalValue([0]);
    }
  }, [timeUnit, rangeType]);

  useEffect(() => {
    if (rangeType === "range") {
      const [start, end] = localValue;
      setTimeRange([clamp(start), clamp(end)]);
    } else {
      setTimePoint(clamp(localValue[0]));
    }

    const delta =
      rangeType === "range" ? localValue[1] - localValue[0] : localValue[0];

    const changePercent = Math.floor(Math.random() * 40 - 20);

    setMetrics({
      revenue: 500000 + delta * 2500,
      users: 1000 + delta * 20,
      sessions: 2000 + delta * 30,
      conversion: +(2.5 + (delta % 5) * 0.1).toFixed(2),
      pageViews: 3000 + delta * 50,
      change: changePercent,
    });
  }, [localValue, timeUnit, rangeType, setMetrics, setTimeRange, setTimePoint]);

  return (
    <div className="bg-[#1e293b] text-white p-6 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-semibold text-purple-400 flex items-center gap-2">
          <span>📅 Time Period</span>
       <span className="text-white">
  {localValue.length > 0 &&
    (rangeType === "range"
      ? `${getDateLabel(localValue[0], timeUnit)} - ${getDateLabel(localValue[1], timeUnit)}`
      : getDateLabel(localValue[0], timeUnit))}
</span>

        </div>

        {/* Toggle Range / Single */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-300">Single Point</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rangeType === "range"}
                onChange={() =>
                  setRangeType(rangeType === "range" ? "single" : "range")
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:bg-purple-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
            </label>
            <span className="text-gray-300">Range</span>
          </div>

          {/* Time Unit Dropdown */}
          <select
            className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-600"
            value={timeUnit}
            onChange={(e) => setTimeUnit(e.target.value as any)}
          >
            <option value="day">Day</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>
      </div>

      {isClient && localValue.length > 0 && (
        <div className="mt-6">
          <Range
            key={`${rangeType}-${timeUnit}`}
            values={localValue}
            step={1}
            min={0}
            max={max}
            onChange={(vals) => setLocalValue(vals.map(clamp))}
            renderTrack={({ props, children }) => (
              <div
                ref={props.ref}
                style={{
                  ...props.style,
                  height: "6px",
                  width: "100%",
                  background: getTrackBackground({
                    values: localValue,
                    colors: ["#ccc", "#a855f7", "#ccc"],
                    min: 0,
                    max,
                  }),
                  borderRadius: "3px",
                }}
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
              >
                {children}
              </div>
            )}
            renderThumb={({ props, index }) => {
              const { key, ...thumbProps } = props;
              return (
                <div
                  key={index}
                  {...thumbProps}
                  style={{
                    ...thumbProps.style,
                    height: "24px",
                    width: "24px",
                    backgroundColor: "#a855f7",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    fontSize: "10px",
                    position: "relative",
                  }}
                >
                  <div className="absolute -top-6 whitespace-nowrap text-sm font-medium">
                    {getDateLabel(localValue[index], timeUnit)}
                  </div>
                </div>
              );
            }}
          />
        </div>
      )}
    </div>
  );
}
