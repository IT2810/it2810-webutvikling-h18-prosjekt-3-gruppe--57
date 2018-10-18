import React from 'react';
import Storage from './Storage';
import {Notifications} from 'expo';


class Util{


    /**
     * Format the user object to fit the chart format.
     * @param user
     * @returns {Array}
     */
    formatDatesForChart(user) {
        console.log(JSON.stringify(user));
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
        console.log(uniqueDateArray);
        return uniqueDateArray;
    }

    async createReminder(reminder, date, time, img, coordinates) {
        const localNotification = {
            title: "Hello", body: "You have scheduled a reminder for " + date, ios: { sound: true }, android: {
                sound: true, //icon (optional) (string) — URL of icon to display in notification drawer.
                //color (optional) (string) — color of the notification icon in notification drawer.
                priority: "high", sticky: false, vibrate: true
            }
        };
        let notificationID = null;
        if (time - new Date().getTime() > 3600000) {
            const when = time - 3600000;
            notificationID = await Notifications.scheduleLocalNotificationAsync(localNotification, { time: when }); //schedules a notification two hours before reminder
        }
        let bourne_identity = await Storage.generateID();
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
        let rtr = await Storage.setReminder(obj);
    }

    async setPicture(uri) {
        const icon = await ImageManipulator.manipulate(uri, [{ resize: { width: 50, height: 50 } }]);
        const img = await ImageManipulator.manipulate(uri, [], { compress: 0.2 });
        const assetIcon = await MediaLibrary.createAssetAsync(icon.uri);
        const assetImg = await MediaLibrary.createAssetAsync(img.uri);
        MediaLibrary.createAlbumAsync('Remindr', assetIcon)
            .then((album) => {
                MediaLibrary.addAssetsToAlbumAsync(assetImg, album.id)
                    .catch(error => {
                        console.log('An error occured adding assets: ', error);
                    });
            })
            .catch(error => {
                console.log('An error occured creating album: ', error);
            });

        return {img: assetImg.uri, icon: assetIcon.uri};
    }
}


const util = new Util();
export default util;