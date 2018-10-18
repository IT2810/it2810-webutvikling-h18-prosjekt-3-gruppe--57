import 'react-native';
import React from 'react';
import storage from '../components/Storage'
import MockAsyncStorage from 'mock-async-storage';
import {AsyncStorage} from 'react-native'

describe('Test of the Storage functions', () => {
    beforeAll(() => {
        const mock = () => {
            const mockImpl = new MockAsyncStorage();
            jest.mock('AsyncStorage', () => mockImpl);
            /*jest.mock('Expo.Constants.installationId', () => "8af308a3-6e27-455e-81fd-cb45861104d7");*/
        };
        mock();
    });
    
    it('SetState', async () => {
        const getAgain = JSON.parse("{\"count\":1}");
        await storage.setItem('myKey', getAgain);
        const valueJson = await AsyncStorage.getItem('myKey');
        expect(valueJson).toBe(JSON.stringify(getAgain));
    });

    it('GetItem', async () => {
        const getAgain = "{\"count\":1}";
        await AsyncStorage.setItem('myKey', getAgain);
        const valueJson = await storage.getItem('myKey');
        expect(JSON.stringify(valueJson)).toBe(getAgain)
    });

    it('GetReminder', async () => {
        const getAgain = JSON.parse("{\"id\":\"8af308a3-6e27-455e-81fd-cb45861104d7\",\"score\":-300,\"reminders\":[{\"id\":\"00df66cc-0dc4-4c3b-be84-aaab2d3cfbb9\",\"reminder\":\"G\",\"date\":\"Fri Oct 26  19:49:00 \",\"dateMilliseconds\":1540576140000,\"locked\":true,\"img\":\"file:///storage/emulated/0/DCIM/debb71b7-0be6-43f7-8234-fc6a64b7d7f5.jpg\",\"imgHint\":true,\"textHint\":false,\"attempts\":1,\"notification\":1667132076},{\"id\":\"872286bd-348d-41ee-a30f-04185ea90dab\",\"reminder\":\"Hei\",\"date\":\"Thu Oct 18  20:37:00 \",\"dateMilliseconds\":1539887820000,\"locked\":true,\"img\":null,\"imgHint\":false,\"textHint\":false,\"attempts\":0,\"notification\":null},{\"id\":\"d45df7b1-247f-4b06-8851-38aac6a5457a\",\"reminder\":\"Jtk4k\",\"date\":\"Thu Oct 18  20:37:00 \",\"dateMilliseconds\":1539887820000,\"locked\":true,\"img\":null,\"imgHint\":false,\"textHint\":false,\"attempts\":0,\"notification\":null}],\"successful\":[{\"id\":\"d78614ce-f8a4-4847-a53e-703914d01ef2\",\"reminder\":\"RingLeBro\",\"date\":\"Wed Oct 17  20:30:00 \",\"dateMilliseconds\":1539801000000,\"locked\":false,\"img\":\"file:///storage/emulated/0/DCIM/d09f307d-d9f3-4964-8d91-17b5df0aeb46.jpg\",\"imgHint\":true,\"textHint\":false,\"attempts\":0,\"notification\":-721311330},{\"id\":\"a2befbb8-776e-4785-a139-2a2ca8bdc8e5\",\"reminder\":\"4u\",\"date\":\"Thu Oct 18  19:45:00 \",\"dateMilliseconds\":1539884700000,\"locked\":false,\"img\":\"file:///storage/emulated/0/DCIM/9dfdf7ac-c258-43a4-ac53-b6cbabe92cc2.jpg\",\"imgHint\":true,\"textHint\":false,\"attempts\":0,\"notification\":null},{\"id\":\"2226356b-eef5-4100-8f34-d060ab4b68b2\",\"reminder\":\"Energi\",\"date\":\"Thu Oct 18  22:13:00 \",\"dateMilliseconds\":1539893580000,\"locked\":false,\"img\":\"file:///storage/emulated/0/DCIM/0f922de3-4332-460b-85a1-2861f938ef45.jpg\",\"imgHint\":true,\"textHint\":false,\"attempts\":0,\"notification\":-741035335}],\"failed\":[{\"id\":\"aac71449-b72b-4cb3-a506-d65c09038ff1\",\"reminder\":\"Hxhshs\",\"date\":\"Wed Oct 17  17:30:00 \",\"dateMilliseconds\":1539790200000,\"locked\":true,\"img\":\"file:///storage/emulated/0/DCIM/7e7c3092-fc21-4e0d-adfb-dbd691d9e594.jpg\",\"imgHint\":false,\"textHint\":false,\"attempts\":0,\"notification\":null},{\"id\":\"674a2265-e2f1-48c4-83c5-39eb0dbf0918\",\"reminder\":\"Tlf\",\"date\":\"Thu Oct 18  18:26:00 \",\"dateMilliseconds\":1539879960000,\"locked\":true,\"img\":\"file:///storage/emulated/0/DCIM/db374cd1-783a-4b1e-b6b3-6d68fd12cfde.jpg\",\"imgHint\":true,\"textHint\":false,\"attempts\":1,\"notification\":null},{\"id\":\"07386efa-9564-4746-b8ef-3da66077ced7\",\"reminder\":\"Troll\",\"date\":\"Thu Oct 18  20:37:00 \",\"dateMilliseconds\":1539887820000,\"locked\":true,\"img\":\"file:///storage/emulated/0/DCIM/1d35f605-d992-4d6c-b105-eba0b37760ca.jpg\",\"imgHint\":true,\"textHint\":false,\"attempts\":0,\"notification\":null}]}\n");
        await AsyncStorage.setItem('123412341-12341234-13241324', getAgain);
        const valueJson = await storage.getReminder('00df66cc-0dc4-4c3b-be84-aaab2d3cfbb9');
        expect(JSON.stringify(valueJson)).toBe(getAgain)
    });


});