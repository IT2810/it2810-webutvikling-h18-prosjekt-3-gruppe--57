import { AsyncStorage } from 'react-native';
class Storage {
  
  async getItem(reminderID) {
    try {
      const item = await AsyncStorage.getItem(reminderID);
      return item;
    } catch (error) {
      console.log("Storage/getItem returned error: "+error);
    }
  }

  async setItem(reminderID, obj) {
    try {
      return await AsyncStorage.setItem(reminderID, JSON.stringify(obj));
    } catch (error) {
      console.log("Storage/setItem returned error: " + error);
    }
  }

  async setItems(reminders){
    try {
      return await AsyncStorage.multiSet(reminders);
    } catch (error) {
      console.log("Storage/setItems returned error: " + error);
    }
  }

  async getAll() {
    try {
      let res = [];
      const keys = await AsyncStorage.getAllKeys();
      const obj = await AsyncStorage.multiGet(keys); 
      obj.forEach(element => {
        res.push(JSON.parse(element[1]));
      });
      return res;
    } catch (error) {
      console.log("Storage/getAll returned error: " + error);
    }

    return obj;
  }


  async deleteItem(reminderID) {
    try {
      return AsyncStorage.removeItem(reminderID);
    } catch (error) {
      console.log("Storage/deleteItem returned error: " + error);
    }
  }

  async deleteAll() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.log("Storage/deleteAll returned errro:" + error);
    }
  }

  async checkIfKeyExists(reminderID) {
    try {
      const keys = await AsyncStorage.getAllKeys();
      if(keys.includes(reminderID)) return true;
      else return false;
    } catch (error) {
      console.log("Storage/checkIfKeyExists returned error: " + error);
    }
  }
  
    //https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    generateID() {
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
}

const localStorage = new Storage();
export default localStorage;





