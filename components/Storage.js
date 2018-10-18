import { AsyncStorage } from 'react-native';
import {Notifications} from 'expo';
class Storage {
  async getItem(ID) {
    try {
      const item = await AsyncStorage.getItem(ID);
      return JSON.parse(item);
    } catch (error) {
      console.log("Storage/getItem returned error: " + error);
    }
  }

  async setItem(ID, item) {
    try {
      return await AsyncStorage.setItem(ID, JSON.stringify(item));
    } catch (error) {
      console.log("Storage/setItem returned error: " + error);
    }
  }
  
  async getReminder(ID) {
    try {
      let user = await this.getItem(Expo.Constants.installationId);
      let rtr = false;
      user.reminders.forEach(element => {
        if(element.id === ID) rtr = element;
      });
      return rtr; 
    } catch (error) {
      console.log("Storage/getReminder returned error: " + error);
    }
  }

  async getStatisticsForUser(){
    try {
      const user = await this.getItem(Expo.Constants.installationId);
      const allReminderDates = [] //this.formatDatesForChart(user);
      if(!isNaN(user.successful.length / (user.successful.length + user.failed.length))){
        percentage = user.successful.length / (user.successful.length + user.failed.length);
      }
      return {"score": user.score, "activeReminders": user.reminders.length, "percentage": (percentage - 0.00001), "allReminderDates:":allReminderDates};
    } catch (error) {
      console.log("Storage/getStatisticsForUser returned error:"+error);
    }
  }

  async getActiveRemindersSorted(){
    try {
      const user = await this.getItem(Expo.Constants.installationId);
      const reminders = user.reminders.sort((a,b)=>{
        return a.dateMilliseconds - b.dateMilliseconds;
      });
      reminders.forEach(element => {
        this.checkDate(element.dateMilliseconds) ? element.locked = true : element.locked = false;
      });
      return reminders;
    } catch (error) {
      console.log("Storage/getActiveRemindersSorted returned error: "+error);
    }
  }

  async getCompletedRemindersSorted(){
    try {
      const user = await this.getItem(Expo.Constants.installationId);
      return user.successful.concat(user.failed).sort((a,b)=>{
        return a.dateMilliseconds - b.dateMilliseconds;
      });
    } catch (error) {
      console.log("Storage/getCompletedRemindersSorted returned error: "+error);
    }
  }

  //Pushes an item to reminders[] in user object
  //CAUTION: this function will not check existing reminders, if you want to update a reminder use updateReminder()
  //This function should only be used when creating a new reminder
  async setReminder(item) {
    try {
      let user = await this.getItem(Expo.Constants.installationId);
      user.reminders.push(item);
      let rtr = await this.setItem(Expo.Constants.installationId, user);
      return rtr;
    } catch (error) {
        console.log("Storage/setReminder returned error: " + error);
    }
  }

  //Merge an existing reminder with another, new fields will be added, existing replaced
  async updateReminder(item){
    try {
      const user = await this.getItem(Expo.Constants.installationId);
      let reminder = await this.getReminder(item.id);
      var result = {
        ...reminder,
        ...item
      };
      console.log(result);
      const index = user.reminders.findIndex(x => x.id === item.id);
      user.reminders.splice(index,1,result);
      return await this.setItem(Expo.Constants.installationId, user);
    } catch (error) {
        console.log("Storage/updateReminder returned error: " + error);
    }
  }

  async deleteReminder(ID) {
    try {
      let user = await this.getItem(Expo.Constants.installationId);
      user.reminders = user.reminders.filter(function (el) { return el.id != ID; }); 
      return await this.setItem(Expo.Constants.installationId, user);
    } catch (error) {
      console.log("Storage/deleteItem returned error: " + error);
    }
  }

  //Clears the reminders array in user object
  //Bear in mind this does not affect arrays with failed and successful reminders 
  async deleteAllReminders() {
    try {
      let user = await this.getItem(Expo.Constants.installationId);
      user.reminders.length = 0;
      return await this.setItem(Expo.Constants.installationId, user);
    } catch (error) {
      console.log("Storage/deleteAll returned error:" + error);
    }
  }

  async onComplete(ID,failed){
    try {
      const user = await this.getItem(Expo.Constants.installationId);
      const reminder = await this.getReminder(ID); 
      if(failed) {
        reminder.locked = true;
        user.failed.push(reminder);
      }else {
        reminder.locked = false;
        user.successful.push(reminder);
      }
      if(reminder.notification) await Expo.Notifications.dismissNotificationAsync(reminder.notification); 
      user.reminders = user.reminders.filter(function(el) { return el.id != ID;}); 
      return await this.setItem(Expo.Constants.installationId, user);
    } catch (error) {
      console.log("Storage/onComplete returned error:" + error);
    }
  }

  //https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  generateID() {
    var d = new Date().getTime();
    if (
      typeof performance !== "undefined" &&
      typeof performance.now === "function"
    ) {
      d += performance.now(); //use high-precision timer if available
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
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

const localStorage = new Storage();
export default localStorage;





