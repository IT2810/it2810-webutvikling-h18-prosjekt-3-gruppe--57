import Storage from './Storage';

class Score {

    //Updates score based on reminder-object
    async updateScore(ID, failed=false){
        const attemptPenalty = -100;
        const imgHintPenalty = -200;
        const mapHintPenalty = -200;
        const lockPenalty = -500;
        const success = 1000;
        const fail = -1000;
        let result = 0; 

        try {
            const reminder = await Storage.getReminder(ID);
            if(!reminder) return false; 
            if(reminder.imgHint) result += imgHintPenalty;
            if(reminder.mapHint) result += mapHintPenalty; 
            if(reminder.locked) result += lockPenalty;
            result += (reminder.attempts*attemptPenalty); 
            if (failed) result = fail;
            else result += success;
            reminder.attempts += 1;
            const user = await Storage.getItem(Expo.Constants.installationId);
            user.score += result; 
            await Storage.setItem(Expo.Constants.installationId,user);
            return await Storage.onComplete(ID,failed);
        } catch (error) {
            console.log("Score/updateScore returned error:"+error);
        }
    }

    //Updates reminder-object if hints have been used
    async updatePenalties(ID, hint){
        try {
            const reminder = await Storage.getReminder(ID);
            if(hint === 'imgHint'){
                reminder.imgHint = true; 
                return await Storage.updateReminder(reminder);
            }else if(hint === 'mapHint'){
                reminder.mapHint = true;
                return await Storage.updateReminder(reminder);
            }
            else return false; 
        } catch (error) {
            console.log("Score/updateScore returned error:" + error);
        }
    }

    async incrementAttempts(ID){
        try {
            let reminder = await Storage.getReminder(ID);
            reminder.attempts += 1; 
            return await Storage.updateReminder(reminder);
        } catch (error) {
            console.log("Score/incrementAttempts returned error: "+ error);
        }
    }

}

const score = new Score();
export default score;
