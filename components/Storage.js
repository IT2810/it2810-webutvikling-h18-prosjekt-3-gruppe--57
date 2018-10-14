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
      console.log("Storage/setReminder returned error: " + error);
    }
  }
  async setReminder(item) {
    try {
      let user = await this.getItem(Expo.Constants.installationId);
      user.reminders.push(item);
      let rtr = await AsyncStorage.setItem(Expo.Constants.installationId, JSON.stringify(user));
      return rtr;
    } catch (error) {
      console.log("Storage/setItem returned error: " + error);
    }
  }

  async deleteReminder(ID) {
    try {
      let user = await this.getItem(Expo.Constants.installationId);
      user.reminders = user.reminders.filter(function (el) { return el.ID != ID; }); 
      return await AsyncStorage.setItem(Expo.Constants.installationId, JSON.stringify(user));
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
      return await AsyncStorage.setItem(Expo.Constants.installationId, JSON.stringify(user));
    } catch (error) {
      console.log("Storage/deleteAll returned errro:" + error);
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





