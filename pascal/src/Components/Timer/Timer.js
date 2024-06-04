import moment from "moment";
import React, { useEffect, useState } from "react";
import { CommonService } from "../../utils/commonService";
import "./Timer.scss";

export default function Timer(props) {

   let timeLeftInterval, clearVestedInterval;
   let item = props.data;
   let vestedTimerData = props?.vestedData;
   const [timer, setTimer] = useState();
   const [vestingTimer, setVestingTimer] = useState();

   useEffect(() => {
     clearInterval(timeLeftInterval);
     clearInterval(clearVestedInterval);

     timeLeftInterval = setInterval(() => calculateIcoEndTime(item), 1000);
     clearVestedInterval = setInterval(
       () => calculateVestedTimeEndsIn(vestedTimerData),
       1000
     );
   }, []);

   const calculateIcoEndTime = (item) => {
     let totalTime = Number(item?.StartTime) + Number(item?.duration);
     const result = CommonService.getLeftTime(totalTime * 1000);
     setTimer(result);
     return result;
   };

   const calculateVestedTimeEndsIn = (vestedTimerData) => {
     let item = vestedTimerData;
     let totalTime =
       Number(item?.StartTime) +
       Number(item?.duration) +
       Number(item?.vestedTime);
     const result = CommonService.getLeftTime(totalTime * 1000);
     setVestingTimer(result);

     return result;
   };
   const checkIfIcoEnded = () => {
     if (timer !== undefined) {
       if (
         timer.days == "00" &&
         timer.hrs == "00" &&
         timer.sec == "00" &&
         timer.min == "00"
       ) {
         return true;
       } else {
         return false;
       }
     }
   };

   const checkIfVestingTimeEnded = () => {
     if (vestingTimer !== undefined) {
       if (
         vestingTimer.days == "00" &&
         vestingTimer.hrs == "00" &&
         vestingTimer.sec == "00" &&
         vestingTimer.min == "00"
       ) {
         return true;
       } else {
         return false;
       }
     }
   };
   return (
     <div>
       {props?.type == "icoEndsIn" ? (
         <>
           {props && props.data && props.data.isActive == true ? (
             <>
               <span className={"timer_span"}>
                 {checkIfIcoEnded() == true ? "ICO Ended" : "Ico ends in"} :
               </span>
               &nbsp;&nbsp;
               <span className={"timer_span"}>
                 {`${timer ? timer.days : "00"} days: ${
                   timer ? timer.hrs : "00"
                 } hrs: ${timer ? timer.min : "00"} min: ${
                   timer ? timer.sec : "00"
                 } sec`}
               </span>
             </>
           ) : (
             <span className={"timer_span"}>
               ICO Ended : 0 days: 0 hrs: 0 min: 0 sec
             </span>
           )}
         </>
       ) : null}

       {props && props?.type == "vestedTimer" ? (
         <>
           {
             props && props.vestedData ? (
               <>
                 <span className={"timer_span"}>
                   {checkIfVestingTimeEnded() == true
                     ? null
                     : "Vesting period ends in"}
                 </span>
                 &nbsp;&nbsp;
                 <span className={"timer_span"}>
                   {checkIfVestingTimeEnded() == false ? (
                     <>
                       {`${vestingTimer ? vestingTimer.days : ""} days: ${
                         vestingTimer ? vestingTimer.hrs : ""
                       } hrs: ${
                         vestingTimer.min ? vestingTimer.min : ""
                       } min: ${vestingTimer.sec ? vestingTimer.sec : ""} sec`}
                     </>
                   ) : null}
                 </span>
               </>
             ) : null
             // <span className={"timer_span"}>
             //   Vesting Time Ended : 0 days: 0 hrs: 0 min: 0 sec
             // </span>
           }
         </>
       ) : null}
     </div>
   );
}
