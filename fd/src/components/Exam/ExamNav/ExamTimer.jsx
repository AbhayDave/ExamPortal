import { useTimer } from "react-timer-hook";

export default function ExamTimer({ expiryTimestamp }) {


 const {
   //  totalSeconds,
   seconds,
   minutes,
   hours,
   days,
   isRunning,
   start,
   pause,
   resume,
   restart,
 } = useTimer({
   expiryTimestamp,
   onExpire: () => console.warn("onExpire called"),
 });


  return (
    <div className="text-2xl grid grid-cols-5 font-bold text-center">
      <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      <span>Hours</span>-<span>Minutes</span>-<span>Seconds</span>
    </div>
  );
}
