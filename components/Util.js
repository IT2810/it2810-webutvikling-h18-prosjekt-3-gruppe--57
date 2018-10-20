import React from 'react';
import Storage from './Storage';
import Score from './Score';
import { Notifications, ImageManipulator, MediaLibrary, Location} from 'expo';


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

    //Creates a new reminder
    //If date is far enough in the future, schedules a notification 
    async createReminder(reminder, date, time, img, coordinates, notificationsStatus) {
        const localNotification = {
            title: "Hello", body: "You have scheduled a reminder for " + date, ios: { sound: true }, android: {
                sound: true, //icon (optional) (string) — URL of icon to display in notification drawer.
                //color (optional) (string) — color of the notification icon in notification drawer.
                priority: "high", sticky: false, vibrate: true
            }
        };
        let notificationID = null;
        if (time - new Date().getTime() > 3600000 && notificationsStatus) {
            const when = time - 3600000;
            notificationID = await Notifications.scheduleLocalNotificationAsync(localNotification, { time: when }); //schedules a notification two hours before reminder
        }
        let bourne_identity = this.generateID();
        let obj = {
            id: bourne_identity,
            reminder: reminder,
            date: date,
            dateMilliseconds: time,
            locked: true,
            img: img,
            imgHint: false,
            mapHint: false,
            attempts: 0,
            notification: notificationID,
            location: coordinates
        }
        return await Storage.setReminder(obj);
    }

    //Takes a uri to a picture and creates an asset in phone storage, returns uri to to asset 
    async savePicture(uri) {
        const img = await ImageManipulator.manipulate(uri, [], { compress: 0.2 });
        const assetImg = await MediaLibrary.createAssetAsync(img.uri);
        return assetImg.uri;
    }

    //Takes a id to a reminder and (if exists) updates penalties and returns image uri 
    async setImage(id) {
        const reminder = await Storage.getReminder(id);
        if(reminder && reminder.img){
            Score.updatePenalties(id, 'imgHint'); 
            return reminder.img; 
        }else{
            return false; 
        }  
    }

    //Fetches device location and returns coordinates 
    async getLocation() {
        const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        return {
                "latitude": location.coords.latitude, 
                "longitude": location.coords.longitude, 
                "latitudeDelta": 0.04,
                "longitudeDelta": 0.05            
        };
    }

    //Takes a id to a reminder and (if exists) updates penalties and returns location 
    async setLocation(id) {
        const reminder = await Storage.getReminder(id);
        if (reminder && reminder.location) {
            Score.updatePenalties(id, 'mapHint');
            return reminder.location;
        } else {
            return false;
        }
    }

    //https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    generateID() {
        var d = new Date().getTime();
        if (typeof performance !== "undefined" && typeof performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        });
    }

    checkDate(date) {
        const limit = 7200000; //two hours
        return (date - new Date().getTime()) > limit ? true : false;
    }
}


const util = new Util();
export default util;