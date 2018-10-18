import React from 'react';


class Util{


    /**
     * Format the user object to fit the chart format.
     * @param user
     * @returns {Array}
     */
    formatDatesForChart(user) {
        var allReminderDates = [];
        var stringArray = [];
        var uniqueArray = [];
        var uniqueDateArray = [];
        user.reminders.forEach(element => {
            allReminderDates.push(new Date(element.dateMilliseconds));
        });
        user.failed.forEach(element => {
            allReminderDates.push(new Date(element.dateMilliseconds));
        });
        user.successful.forEach(element => {
            allReminderDates.push(new Date(element.dateMilliseconds));
        });
        allReminderDates.forEach(element => {
            stringArray.push(JSON.stringify(element).split("T")[0].replace('"',''));
        });
        stringArray.forEach(element => {
            if (!uniqueArray.includes(element)){
                uniqueArray.push(element);
                uniqueDateArray.push({date: element,count:1})
            }else{
                var counter = uniqueDateArray[uniqueArray.indexOf(element)].count+1;
                uniqueDateArray[uniqueArray.indexOf(element)] = {date: element,count:counter}
            }
        });
        return uniqueDateArray;
    }

}


const util = new Util();
export default util;