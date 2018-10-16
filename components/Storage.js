import { AsyncStorage } from 'react-native';
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
      if(!failed) user.successful.push(reminder);
      else {
        reminder.locked = true; //used to differentiate between failed/successful in completedScreen
        user.failed.push(reminder);
      }
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
}

const localStorage = new Storage();
export default localStorage;





