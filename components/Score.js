import Storage from './Storage';

class Score {

    async updateScore(ID, failed=false){
        console.log("UPDATING SCORE FOR: "+ID);
        const attemptPenalty = -100;
        const imgHintPenalty = -100;
        const imgTextPenalty = -100;
        const success = 1000;
        const fail = -1000;
        let result = 0; 

        try {
            const reminder = await Storage.getReminder(ID);
            console.log();
            if(reminder.imgHint) result += imgHintPenalty;
            else if(reminder.textHint) result += imgTextPenalty; 
            else if (failed) result += fail;
            else if(!failed) result += success;
            result += (reminder.attempts*attemptPenalty); 
            const user = await Storage.getItem(Expo.Constants.installationId);
            user.score = user.score + result; 
            return await Storage.setItem(Expo.Constants.installationId,user);
        } catch (error) {
            console.log("Score/updateScore returned error:"+error);
        }
    }

    async updatePenalties(ID, hint){
        try {
            const reminder = await Storage.getReminder(ID);
            if(hint === "imgHint" || hint === "textHint"){
                reminder.hint = true; 
                return await Storage.setReminder(reminder);
            }
            else return false; 
        } catch (error) {
            console.log("Score/updateScore returned error:" + error);
        }
    }

}

const score = new Score();
export default score;
