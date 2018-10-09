import { AsyncStorage } from 'react-native';
class Storage {
  
  async getItem(reminderID) {
    return AsyncStorage.getItem(reminderID)
      .then(obj => {
        return JSON.parse(obj);
      })
      .catch(error => {
        console.log("Oops an error occured:" + error);
      });
  }

  async setItem(reminderID, obj) {
    return AsyncStorage.setItem(reminderID, JSON.stringify(obj));
  }

  async getAll() {
    return AsyncStorage.getAllKeys()
      .then(keys => {
        return AsyncStorage.multiGet(keys).then(res => {
          res.map((result, i, obj) => {
            console.log(obj);
          });
        });
      })
      .catch(error => {
        console.log("Oops an error occured:" + error);
      });
  }

  async deleteItem(reminderID) {
    return AsyncStorage.removeItem(reminderID);
  }

  async deleteAll() {}

  async checkIfKeyExists(reminderID) {
    return AsyncStorage.getAllKeys()
      .then(keys => {
        keys.forEach(currentItem => {
          if (currentItem === reminderID) return true;
        });
        return false;
      })
      .catch(error => {
        console.log("Ops an error occured:" + error);
      });
  }
  /* 
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
    } */
}

const localStorage = new Storage();
export default localStorage;





