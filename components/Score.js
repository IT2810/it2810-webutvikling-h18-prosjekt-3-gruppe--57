import Storage from './Storage';

class Score {

    //Updates score based on reminder-object
    async updateScore(ID, failed=false){
        console.log("UPDATING SCORE FOR: "+ID);
        const attemptPenalty = -100;
        const imgHintPenalty = -100;
        const imgTextPenalty = -100;
        const lockPenalty = -100;
        const success = 1000;
        const fail = -1000;
        let result = 0; 

        try {
            const reminder = await Storage.getReminder(ID);
            if(!reminder) return false; 
            if(reminder.imgHint) result += imgHintPenalty;
            if(reminder.textHint) result += imgTextPenalty; 
            if(reminder.locked) result += lockPenalty;
            if (failed) result += fail;
            else result += success;
            result += (reminder.attempts*attemptPenalty); 
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
            if(hint === 'imgHint' || hint === 'textHint'){
                reminder.imgHint = true; 
                return await Storage.updateReminder(reminder);
            }
            else return false; 
        } catch (error) {
            console.log("Score/updateScore returned error:" + error);
        }
    }

}

const score = new Score();
export default score;
