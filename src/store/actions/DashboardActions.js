
import { ACTIONS } from "../action-constants/Actions";

const DashboardListGetting = ({result, error})=>{

     return {
         type: ACTIONS.DASHBOARD_INSPECTIONS.DASHBOARD_INSPECTIONS_GETTING  ,
         payload:{
             result,
             error
         }
     }
}

const DashboardListFailed = ({result, error})=>{

    return {
        type: ACTIONS.DASHBOARD_INSPECTIONS.DASHBOARD_INSPECTIONS_FAILED ,
        payload:{
            result,
            error
        }
    }
}

const DashboardListGot = ({result, error})=>{

    return {
        type: ACTIONS.DASHBOARD_INSPECTIONS.DASHBOARD_INSPECTIONS_GOT  ,
        payload:{
            result,
            error
        }
    }
}

const DashboardReportGetting = ({result, error})=>{

    return {
        type: ACTIONS.DASHBOARD_REPORT.DASHBOARD_REPORT_GETTING  ,
        payload:{
            result,
            error
        }
    }
}

const DashboardReportFailed = ({result, error})=>{

   return {
       type: ACTIONS.DASHBOARD_REPORT.DASHBOARD_REPORT_FAILED ,
       payload:{
           result,
           error
       }
   }
}

const DashboardReportGot = ({result, error})=>{

   return {
       type: ACTIONS.DASHBOARD_REPORT.DASHBOARD_REPORT_GOT,
       payload:{
           result,
           error
       }
   }
}


export const DashboardActions = {DashboardListGetting, DashboardListFailed, DashboardListGot, DashboardReportGetting, DashboardReportFailed, DashboardReportGot}