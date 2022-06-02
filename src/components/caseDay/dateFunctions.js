const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const whichType = (alert_type) => {
    let val, color;
    
    switch (alert_type) {
        case 1: val = "Low risk"; color = "gray"; break;
        case 2: val = "Medium risk"; color = "#5162FA"; break;
        case 3: val = "High risk"; color = "red"; break;
    }
    return <div className="alert-type" style={{ color: color }}>{val}</div>;
}
export const formateDate = (date) => {
    return MONTHS[date.getMonth()] + ", " + date.getDate() + " " + date.getFullYear();
}
