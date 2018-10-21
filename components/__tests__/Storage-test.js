import 'react-native';
import React from 'react';
import storage from '../Storage'
import MockAsyncStorage from 'mock-async-storage';
import {AsyncStorage} from 'react-native'
import {Notifications} from "expo";

describe('Test of the Storage functions', () => {
    beforeAll(() => {
        const mock = () => {
            const mockImpl = new MockAsyncStorage();
            jest.mock('AsyncStorage', () => mockImpl);
            /*jest.mock('Expo.Constants.installationId', ()=> "8af308a3-6e27-455e-81fd-cb45861104d7");*/
        };
        mock();
    });

    beforeEach(async () => {
        //Create userobject and write it to async storage
        const id = Expo.Constants.installationId;
        const reminderId = "00df66cc-0dc4-4c3b-be84-aaab2d3cfbb9";
        const userObj = {
            "id": id,
            "score": -300,
            "reminders": [
                {
                    "id": reminderId,
                    "reminder": "G",
                    "date": "Fri Oct 26  19:49:00 ",
                    "dateMilliseconds": 1540576140000,
                    "locked": true,
                    "img": "file:///storage/emulated/0/DCIM/debb71b7-0be6-43f7-8234-fc6a64b7d7f5.jpg",
                    "imgHint": true,
                    "textHint": false,
                    "attempts": 1,
                    "notification": 1667132076
                }, {
                    "id": "872286bd-348d-41ee-a30f-04185ea90dab",
                    "reminder": "Hei",
                    "date": "Thu Oct 18  20:37:00 ",
                    "dateMilliseconds": 1539887820000,
                    "locked": true,
                    "img": null,
                    "imgHint": false,
                    "textHint": false,
                    "attempts": 0,
                    "notification": null
                }, {
                    "id": "d45df7b1-247f-4b06-8851-38aac6a5457a",
                    "reminder": "Jtk4k",
                    "date": "Thu Oct 18  20:37:00 ",
                    "dateMilliseconds": 1539887820000,
                    "locked": true,
                    "img": null,
                    "imgHint": false,
                    "textHint": false,
                    "attempts": 0,
                    "notification": null
                }],
            "successful": [
                {
                    "id": "d78614ce-f8a4-4847-a53e-703914d01ef2",
                    "reminder": "RingLeBro",
                    "date": "Wed Oct 17  20:30:00 ",
                    "dateMilliseconds": 1539801000000,
                    "locked": false,
                    "img": "file:///storage/emulated/0/DCIM/d09f307d-d9f3-4964-8d91-17b5df0aeb46.jpg",
                    "imgHint": true,
                    "textHint": false,
                    "attempts": 0,
                    "notification": -721311330
                }, {
                    "id": "a2befbb8-776e-4785-a139-2a2ca8bdc8e5",
                    "reminder": "4u",
                    "date": "Thu Oct 18  19:45:00 ",
                    "dateMilliseconds": 1539884700000,
                    "locked": false,
                    "img": "file:///storage/emulated/0/DCIM/9dfdf7ac-c258-43a4-ac53-b6cbabe92cc2.jpg",
                    "imgHint": true,
                    "textHint": false,
                    "attempts": 0,
                    "notification": null
                }, {
                    "id": "2226356b-eef5-4100-8f34-d060ab4b68b2",
                    "reminder": "Energi",
                    "date": "Thu Oct 18  22:13:00 ",
                    "dateMilliseconds": 1539893580000,
                    "locked": false,
                    "img": "file:///storage/emulated/0/DCIM/0f922de3-4332-460b-85a1-2861f938ef45.jpg",
                    "imgHint": true,
                    "textHint": false,
                    "attempts": 0,
                    "notification": -741035335
                }],
            "failed": [
                {
                    "id": "aac71449-b72b-4cb3-a506-d65c09038ff1",
                    "reminder": "Hxhshs",
                    "date": "Wed Oct 17  17:30:00 ",
                    "dateMilliseconds": 1539790200000,
                    "locked": true,
                    "img": "file:///storage/emulated/0/DCIM/7e7c3092-fc21-4e0d-adfb-dbd691d9e594.jpg",
                    "imgHint": false,
                    "textHint": false,
                    "attempts": 0,
                    "notification": null
                }, {
                    "id": "674a2265-e2f1-48c4-83c5-39eb0dbf0918",
                    "reminder": "Tlf",
                    "date": "Thu Oct 18  18:26:00 ",
                    "dateMilliseconds": 1539879960000,
                    "locked": true,
                    "img": "file:///storage/emulated/0/DCIM/db374cd1-783a-4b1e-b6b3-6d68fd12cfde.jpg",
                    "imgHint": true,
                    "textHint": false,
                    "attempts": 1,
                    "notification": null
                }, {
                    "id": "07386efa-9564-4746-b8ef-3da66077ced7",
                    "reminder": "Troll",
                    "date": "Thu Oct 18  20:37:00 ",
                    "dateMilliseconds": 1539887820000,
                    "locked": true,
                    "img": "file:///storage/emulated/0/DCIM/1d35f605-d992-4d6c-b105-eba0b37760ca.jpg",
                    "imgHint": true,
                    "textHint": false,
                    "attempts": 0,
                    "notification": null
                }]
        };
        await AsyncStorage.setItem(id, JSON.stringify(userObj));
    });

    it('Mock Async Storage working', async () => {
        await storage.setItem('myKey', 'myValue');
        const value = await storage.getItem('myKey');
        expect(value).toBe('myValue')
    });

    it('SetState', async () => {
        const getAgain = {count: 1};
        await storage.setItem('myKey', getAgain);
        const valueJson = JSON.parse(await AsyncStorage.getItem('myKey'));
        expect(valueJson).toEqual(getAgain);
    });

    it('GetItem', async () => {
        const id = Expo.Constants.installationId;
        const valueJson = await storage.getItem(id);
        const correct = {
            "failed": [
                {
                    "attempts": 0,
                    "date": "Wed Oct 17  17:30:00 ",
                    "dateMilliseconds": 1539790200000,
                    "id": "aac71449-b72b-4cb3-a506-d65c09038ff1",
                    "img": "file:///storage/emulated/0/DCIM/7e7c3092-fc21-4e0d-adfb-dbd691d9e594.jpg",
                    "imgHint": false,
                    "locked": true,
                    "notification": null,
                    "reminder": "Hxhshs",
                    "textHint": false
                }, {
                    "attempts": 1,
                    "date": "Thu Oct 18  18:26:00 ",
                    "dateMilliseconds": 1539879960000,
                    "id": "674a2265-e2f1-48c4-83c5-39eb0dbf0918",
                    "img": "file:///storage/emulated/0/DCIM/db374cd1-783a-4b1e-b6b3-6d68fd12cfde.jpg",
                    "imgHint": true,
                    "locked": true,
                    "notification": null,
                    "reminder": "Tlf",
                    "textHint": false
                }, {
                    "attempts": 0,
                    "date": "Thu Oct 18  20:37:00 ",
                    "dateMilliseconds": 1539887820000,
                    "id": "07386efa-9564-4746-b8ef-3da66077ced7",
                    "img": "file:///storage/emulated/0/DCIM/1d35f605-d992-4d6c-b105-eba0b37760ca.jpg",
                    "imgHint": true,
                    "locked": true,
                    "notification": null,
                    "reminder": "Troll",
                    "textHint": false
                }],
            "id": "a01650bb-918d-40be-87be-cf376ab6189f",
            "reminders": [
                {
                    "attempts": 1,
                    "date": "Fri Oct 26  19:49:00 ",
                    "dateMilliseconds": 1540576140000,
                    "id": "00df66cc-0dc4-4c3b-be84-aaab2d3cfbb9",
                    "img": "file:///storage/emulated/0/DCIM/debb71b7-0be6-43f7-8234-fc6a64b7d7f5.jpg",
                    "imgHint": true,
                    "locked": true,
                    "notification": 1667132076,
                    "reminder": "G",
                    "textHint": false
                }, {
                    "attempts": 0,
                    "date": "Thu Oct 18  20:37:00 ",
                    "dateMilliseconds": 1539887820000,
                    "id": "872286bd-348d-41ee-a30f-04185ea90dab",
                    "img": null,
                    "imgHint": false,
                    "locked": true,
                    "notification": null,
                    "reminder": "Hei",
                    "textHint": false
                }, {
                    "attempts": 0,
                    "date": "Thu Oct 18  20:37:00 ",
                    "dateMilliseconds": 1539887820000,
                    "id": "d45df7b1-247f-4b06-8851-38aac6a5457a",
                    "img": null,
                    "imgHint": false,
                    "locked": true,
                    "notification": null,
                    "reminder": "Jtk4k",
                    "textHint": false
                }],
            "score": -300,
            "successful": [
                {
                    "attempts": 0,
                    "date": "Wed Oct 17  20:30:00 ",
                    "dateMilliseconds": 1539801000000,
                    "id": "d78614ce-f8a4-4847-a53e-703914d01ef2",
                    "img": "file:///storage/emulated/0/DCIM/d09f307d-d9f3-4964-8d91-17b5df0aeb46.jpg",
                    "imgHint": true,
                    "locked": false,
                    "notification": -721311330,
                    "reminder": "RingLeBro",
                    "textHint": false
                }, {
                    "attempts": 0,
                    "date": "Thu Oct 18  19:45:00 ",
                    "dateMilliseconds": 1539884700000,
                    "id": "a2befbb8-776e-4785-a139-2a2ca8bdc8e5",
                    "img": "file:///storage/emulated/0/DCIM/9dfdf7ac-c258-43a4-ac53-b6cbabe92cc2.jpg",
                    "imgHint": true,
                    "locked": false,
                    "notification": null,
                    "reminder": "4u",
                    "textHint": false
                }, {
                    "attempts": 0,
                    "date": "Thu Oct 18  22:13:00 ",
                    "dateMilliseconds": 1539893580000,
                    "id": "2226356b-eef5-4100-8f34-d060ab4b68b2",
                    "img": "file:///storage/emulated/0/DCIM/0f922de3-4332-460b-85a1-2861f938ef45.jpg",
                    "imgHint": true,
                    "locked": false,
                    "notification": -741035335,
                    "reminder": "Energi",
                    "textHint": false
                }]
        };

        expect(valueJson).toEqual(correct)
    });

    it('GetReminder', async () => {
        const reminderId = "00df66cc-0dc4-4c3b-be84-aaab2d3cfbb9";

        const res = await storage.getReminder(reminderId);
        const correct = "{\"id\":\"" + reminderId + "\",\"reminder\":\"G\",\"date\":\"Fri Oct 26  19:49:00 \",\"dateMilliseconds\":1540576140000,\"locked\":true,\"img\":\"file:///storage/emulated/0/DCIM/debb71b7-0be6-43f7-8234-fc6a64b7d7f5.jpg\",\"imgHint\":true,\"textHint\":false,\"attempts\":1,\"notification\":1667132076}";


        expect(JSON.stringify(res)).toBe(correct)
    });

    it('getStatisticsForUser', async () => {

        const res = await storage.getStatisticsForUser();
        const correct = {
            "activeReminders": 3,
            "allReminderDates": [{"count": 1, "date": "2018-10-26"}, {"count": 6, "date": "2018-10-18"}, {
                "count": 2,
                "date": "2018-10-17"
            }],
            "percentage": 0.49999,
            "score": -300
        };

        expect(res).toEqual(correct)
    });

    it('getActiveRemindersSorted', async () => {
        const id = Expo.Constants.installationId;
        const res = await storage.getActiveRemindersSorted();
        const correct = [
            {
                "attempts": 0,
                "date": "Thu Oct 18  20:37:00 ",
                "dateMilliseconds": 1539887820000,
                "id": "872286bd-348d-41ee-a30f-04185ea90dab",
                "img": null,
                "imgHint": false,
                "locked": false,
                "notification": null,
                "reminder": "Hei",
                "textHint": false
            }, {
                "attempts": 0,
                "date": "Thu Oct 18  20:37:00 ",
                "dateMilliseconds": 1539887820000,
                "id": "d45df7b1-247f-4b06-8851-38aac6a5457a",
                "img": null,
                "imgHint": false,
                "locked": false,
                "notification": null,
                "reminder": "Jtk4k",
                "textHint": false
            }, {
                "attempts": 1,
                "date": "Fri Oct 26  19:49:00 ",
                "dateMilliseconds": 1540576140000,
                "id": "00df66cc-0dc4-4c3b-be84-aaab2d3cfbb9",
                "img": "file:///storage/emulated/0/DCIM/debb71b7-0be6-43f7-8234-fc6a64b7d7f5.jpg",
                "imgHint": true,
                "locked": true,
                "notification": 1667132076,
                "reminder": "G",
                "textHint": false
            }];


        expect(res).toEqual(correct)
    });

    it('getCompletedRemindersSorted', async () => {

        const res = await storage.getCompletedRemindersSorted();
        const correct = [
            {
                "attempts": 0,
                "date": "Wed Oct 17  17:30:00 ",
                "dateMilliseconds": 1539790200000,
                "id": "aac71449-b72b-4cb3-a506-d65c09038ff1",
                "img": "file:///storage/emulated/0/DCIM/7e7c3092-fc21-4e0d-adfb-dbd691d9e594.jpg",
                "imgHint": false,
                "locked": true,
                "notification": null,
                "reminder": "Hxhshs",
                "textHint": false
            }, {
                "attempts": 0,
                "date": "Wed Oct 17  20:30:00 ",
                "dateMilliseconds": 1539801000000,
                "id": "d78614ce-f8a4-4847-a53e-703914d01ef2",
                "img": "file:///storage/emulated/0/DCIM/d09f307d-d9f3-4964-8d91-17b5df0aeb46.jpg",
                "imgHint": true,
                "locked": false,
                "notification": -721311330,
                "reminder": "RingLeBro",
                "textHint": false
            }, {
                "attempts": 1,
                "date": "Thu Oct 18  18:26:00 ",
                "dateMilliseconds": 1539879960000,
                "id": "674a2265-e2f1-48c4-83c5-39eb0dbf0918",
                "img": "file:///storage/emulated/0/DCIM/db374cd1-783a-4b1e-b6b3-6d68fd12cfde.jpg",
                "imgHint": true,
                "locked": true,
                "notification": null,
                "reminder": "Tlf",
                "textHint": false
            }, {
                "attempts": 0,
                "date": "Thu Oct 18  19:45:00 ",
                "dateMilliseconds": 1539884700000,
                "id": "a2befbb8-776e-4785-a139-2a2ca8bdc8e5",
                "img": "file:///storage/emulated/0/DCIM/9dfdf7ac-c258-43a4-ac53-b6cbabe92cc2.jpg",
                "imgHint": true,
                "locked": false,
                "notification": null,
                "reminder": "4u",
                "textHint": false
            }, {
                "attempts": 0,
                "date": "Thu Oct 18  20:37:00 ",
                "dateMilliseconds": 1539887820000,
                "id": "07386efa-9564-4746-b8ef-3da66077ced7",
                "img": "file:///storage/emulated/0/DCIM/1d35f605-d992-4d6c-b105-eba0b37760ca.jpg",
                "imgHint": true,
                "locked": true,
                "notification": null,
                "reminder": "Troll",
                "textHint": false
            }, {
                "attempts": 0,
                "date": "Thu Oct 18  22:13:00 ",
                "dateMilliseconds": 1539893580000,
                "id": "2226356b-eef5-4100-8f34-d060ab4b68b2",
                "img": "file:///storage/emulated/0/DCIM/0f922de3-4332-460b-85a1-2861f938ef45.jpg",
                "imgHint": true,
                "locked": false,
                "notification": -741035335,
                "reminder": "Energi",
                "textHint": false
            }
        ];

        expect(res).toEqual(correct)
    });

    it('setReminder', async () => {
        const id = Expo.Constants.installationId;
        const newReminderID = "aac71449-b72b-4cb3-a506-d65c09038f21";
        const date = new Date("2018-10-19T11:37:03.563Z");
        await storage.setReminder({
            id: newReminderID,
            reminder: "Bal",
            date: date,
            dateMilliseconds: date.getTime(),
            locked: true,
            img: null,
            imgHint: false,
            mapHint: false,
            attempts: 0,
            notification: null,
            location: null
        });

        const res = JSON.parse(await AsyncStorage.getItem(id));
        const correct = "{\"id\":\"a01650bb-918d-40be-87be-cf376ab6189f\",\"score\":-300,\"reminders\":[{\"id\":\"00df66cc-0dc4-4c3b-be84-aaab2d3cfbb9\",\"reminder\":\"G\",\"date\":\"Fri Oct 26  19:49:00 \",\"dateMilliseconds\":1540576140000,\"locked\":true,\"img\":\"file:///storage/emulated/0/DCIM/debb71b7-0be6-43f7-8234-fc6a64b7d7f5.jpg\",\"imgHint\":true,\"textHint\":false,\"attempts\":1,\"notification\":1667132076},{\"id\":\"872286bd-348d-41ee-a30f-04185ea90dab\",\"reminder\":\"Hei\",\"date\":\"Thu Oct 18  20:37:00 \",\"dateMilliseconds\":1539887820000,\"locked\":true,\"img\":null,\"imgHint\":false,\"textHint\":false,\"attempts\":0,\"notification\":null},{\"id\":\"d45df7b1-247f-4b06-8851-38aac6a5457a\",\"reminder\":\"Jtk4k\",\"date\":\"Thu Oct 18  20:37:00 \",\"dateMilliseconds\":1539887820000,\"locked\":true,\"img\":null,\"imgHint\":false,\"textHint\":false,\"attempts\":0,\"notification\":null},{\"id\":\"aac71449-b72b-4cb3-a506-d65c09038f21\",\"reminder\":\"Bal\",\"date\":\"2018-10-19T11:37:03.563Z\",\"dateMilliseconds\":1539949023563,\"locked\":true,\"img\":null,\"imgHint\":false,\"mapHint\":false,\"attempts\":0,\"notification\":null,\"location\":null}],\"successful\":[{\"id\":\"d78614ce-f8a4-4847-a53e-703914d01ef2\",\"reminder\":\"RingLeBro\",\"date\":\"Wed Oct 17  20:30:00 \",\"dateMilliseconds\":1539801000000,\"locked\":false,\"img\":\"file:///storage/emulated/0/DCIM/d09f307d-d9f3-4964-8d91-17b5df0aeb46.jpg\",\"imgHint\":true,\"textHint\":false,\"attempts\":0,\"notification\":-721311330},{\"id\":\"a2befbb8-776e-4785-a139-2a2ca8bdc8e5\",\"reminder\":\"4u\",\"date\":\"Thu Oct 18  19:45:00 \",\"dateMilliseconds\":1539884700000,\"locked\":false,\"img\":\"file:///storage/emulated/0/DCIM/9dfdf7ac-c258-43a4-ac53-b6cbabe92cc2.jpg\",\"imgHint\":true,\"textHint\":false,\"attempts\":0,\"notification\":null},{\"id\":\"2226356b-eef5-4100-8f34-d060ab4b68b2\",\"reminder\":\"Energi\",\"date\":\"Thu Oct 18  22:13:00 \",\"dateMilliseconds\":1539893580000,\"locked\":false,\"img\":\"file:///storage/emulated/0/DCIM/0f922de3-4332-460b-85a1-2861f938ef45.jpg\",\"imgHint\":true,\"textHint\":false,\"attempts\":0,\"notification\":-741035335}],\"failed\":[{\"id\":\"aac71449-b72b-4cb3-a506-d65c09038ff1\",\"reminder\":\"Hxhshs\",\"date\":\"Wed Oct 17  17:30:00 \",\"dateMilliseconds\":1539790200000,\"locked\":true,\"img\":\"file:///storage/emulated/0/DCIM/7e7c3092-fc21-4e0d-adfb-dbd691d9e594.jpg\",\"imgHint\":false,\"textHint\":false,\"attempts\":0,\"notification\":null},{\"id\":\"674a2265-e2f1-48c4-83c5-39eb0dbf0918\",\"reminder\":\"Tlf\",\"date\":\"Thu Oct 18  18:26:00 \",\"dateMilliseconds\":1539879960000,\"locked\":true,\"img\":\"file:///storage/emulated/0/DCIM/db374cd1-783a-4b1e-b6b3-6d68fd12cfde.jpg\",\"imgHint\":true,\"textHint\":false,\"attempts\":1,\"notification\":null},{\"id\":\"07386efa-9564-4746-b8ef-3da66077ced7\",\"reminder\":\"Troll\",\"date\":\"Thu Oct 18  20:37:00 \",\"dateMilliseconds\":1539887820000,\"locked\":true,\"img\":\"file:///storage/emulated/0/DCIM/1d35f605-d992-4d6c-b105-eba0b37760ca.jpg\",\"imgHint\":true,\"textHint\":false,\"attempts\":0,\"notification\":null}]}";

        expect(res).toEqual(JSON.parse(correct))
    });

    it('updateReminder', async () => {
        const id = Expo.Constants.installationId;
        const date = new Date("2018-10-19T11:37:03.563Z");
        const before = JSON.parse(await AsyncStorage.getItem(id));
        await storage.updateReminder({
            id: "00df66cc-0dc4-4c3b-be84-aaab2d3cfbb9",
            reminder: "Bal",
            date: date,
            dateMilliseconds: date.getTime(),
            locked: true,
            img: null,
            imgHint: false,
            mapHint: false,
            attempts: 0,
            notification: null,
            location: null
        });
        const after = JSON.parse(await AsyncStorage.getItem(id));
        const correct = {
            "failed": [{
                "attempts": 0,
                "date": "Wed Oct 17  17:30:00 ",
                "dateMilliseconds": 1539790200000,
                "id": "aac71449-b72b-4cb3-a506-d65c09038ff1",
                "img": "file:///storage/emulated/0/DCIM/7e7c3092-fc21-4e0d-adfb-dbd691d9e594.jpg",
                "imgHint": false,
                "locked": true,
                "notification": null,
                "reminder": "Hxhshs",
                "textHint": false
            }, {
                "attempts": 1,
                "date": "Thu Oct 18  18:26:00 ",
                "dateMilliseconds": 1539879960000,
                "id": "674a2265-e2f1-48c4-83c5-39eb0dbf0918",
                "img": "file:///storage/emulated/0/DCIM/db374cd1-783a-4b1e-b6b3-6d68fd12cfde.jpg",
                "imgHint": true,
                "locked": true,
                "notification": null,
                "reminder": "Tlf",
                "textHint": false
            }, {
                "attempts": 0,
                "date": "Thu Oct 18  20:37:00 ",
                "dateMilliseconds": 1539887820000,
                "id": "07386efa-9564-4746-b8ef-3da66077ced7",
                "img": "file:///storage/emulated/0/DCIM/1d35f605-d992-4d6c-b105-eba0b37760ca.jpg",
                "imgHint": true,
                "locked": true,
                "notification": null,
                "reminder": "Troll",
                "textHint": false
            }],
            "id": "a01650bb-918d-40be-87be-cf376ab6189f",
            "reminders": [{
                "attempts": 0,
                "date": "2018-10-19T11:37:03.563Z",
                "dateMilliseconds": 1539949023563,
                "id": "00df66cc-0dc4-4c3b-be84-aaab2d3cfbb9",
                "img": null,
                "imgHint": false,
                "location": null,
                "locked": true,
                "mapHint": false,
                "notification": null,
                "reminder": "Bal",
                "textHint": false
            }, {
                "attempts": 0,
                "date": "Thu Oct 18  20:37:00 ",
                "dateMilliseconds": 1539887820000,
                "id": "872286bd-348d-41ee-a30f-04185ea90dab",
                "img": null,
                "imgHint": false,
                "locked": true,
                "notification": null,
                "reminder": "Hei",
                "textHint": false
            }, {
                "attempts": 0,
                "date": "Thu Oct 18  20:37:00 ",
                "dateMilliseconds": 1539887820000,
                "id": "d45df7b1-247f-4b06-8851-38aac6a5457a",
                "img": null,
                "imgHint": false,
                "locked": true,
                "notification": null,
                "reminder": "Jtk4k",
                "textHint": false
            }],
            "score": -300,
            "successful": [{
                "attempts": 0,
                "date": "Wed Oct 17  20:30:00 ",
                "dateMilliseconds": 1539801000000,
                "id": "d78614ce-f8a4-4847-a53e-703914d01ef2",
                "img": "file:///storage/emulated/0/DCIM/d09f307d-d9f3-4964-8d91-17b5df0aeb46.jpg",
                "imgHint": true,
                "locked": false,
                "notification": -721311330,
                "reminder": "RingLeBro",
                "textHint": false
            }, {
                "attempts": 0,
                "date": "Thu Oct 18  19:45:00 ",
                "dateMilliseconds": 1539884700000,
                "id": "a2befbb8-776e-4785-a139-2a2ca8bdc8e5",
                "img": "file:///storage/emulated/0/DCIM/9dfdf7ac-c258-43a4-ac53-b6cbabe92cc2.jpg",
                "imgHint": true,
                "locked": false,
                "notification": null,
                "reminder": "4u",
                "textHint": false
            }, {
                "attempts": 0,
                "date": "Thu Oct 18  22:13:00 ",
                "dateMilliseconds": 1539893580000,
                "id": "2226356b-eef5-4100-8f34-d060ab4b68b2",
                "img": "file:///storage/emulated/0/DCIM/0f922de3-4332-460b-85a1-2861f938ef45.jpg",
                "imgHint": true,
                "locked": false,
                "notification": -741035335,
                "reminder": "Energi",
                "textHint": false
            }]
        };

        expect(before).not.toEqual(after);
        expect(after).toEqual(correct);
    });

    it('onComplete', async () => {
        const id = Expo.Constants.installationId;
        const resBefore = JSON.parse(await AsyncStorage.getItem(id));
        await storage.onComplete("00df66cc-0dc4-4c3b-be84-aaab2d3cfbb9", true);
        const resAfter = JSON.parse(await AsyncStorage.getItem(id));
        const correct = {
            "failed": [{
                "attempts": 0,
                "date": "Wed Oct 17  17:30:00 ",
                "dateMilliseconds": 1539790200000,
                "id": "aac71449-b72b-4cb3-a506-d65c09038ff1",
                "img": "file:///storage/emulated/0/DCIM/7e7c3092-fc21-4e0d-adfb-dbd691d9e594.jpg",
                "imgHint": false,
                "locked": true,
                "notification": null,
                "reminder": "Hxhshs",
                "textHint": false
            }, {
                "attempts": 1,
                "date": "Thu Oct 18  18:26:00 ",
                "dateMilliseconds": 1539879960000,
                "id": "674a2265-e2f1-48c4-83c5-39eb0dbf0918",
                "img": "file:///storage/emulated/0/DCIM/db374cd1-783a-4b1e-b6b3-6d68fd12cfde.jpg",
                "imgHint": true,
                "locked": true,
                "notification": null,
                "reminder": "Tlf",
                "textHint": false
            }, {
                "attempts": 0,
                "date": "Thu Oct 18  20:37:00 ",
                "dateMilliseconds": 1539887820000,
                "id": "07386efa-9564-4746-b8ef-3da66077ced7",
                "img": "file:///storage/emulated/0/DCIM/1d35f605-d992-4d6c-b105-eba0b37760ca.jpg",
                "imgHint": true,
                "locked": true,
                "notification": null,
                "reminder": "Troll",
                "textHint": false
            }],
            "id": "a01650bb-918d-40be-87be-cf376ab6189f",
            "reminders": [{
                "attempts": 1,
                "date": "Fri Oct 26  19:49:00 ",
                "dateMilliseconds": 1540576140000,
                "id": "00df66cc-0dc4-4c3b-be84-aaab2d3cfbb9",
                "img": "file:///storage/emulated/0/DCIM/debb71b7-0be6-43f7-8234-fc6a64b7d7f5.jpg",
                "imgHint": true,
                "locked": true,
                "notification": 1667132076,
                "reminder": "G",
                "textHint": false
            }, {
                "attempts": 0,
                "date": "Thu Oct 18  20:37:00 ",
                "dateMilliseconds": 1539887820000,
                "id": "872286bd-348d-41ee-a30f-04185ea90dab",
                "img": null,
                "imgHint": false,
                "locked": true,
                "notification": null,
                "reminder": "Hei",
                "textHint": false
            }, {
                "attempts": 0,
                "date": "Thu Oct 18  20:37:00 ",
                "dateMilliseconds": 1539887820000,
                "id": "d45df7b1-247f-4b06-8851-38aac6a5457a",
                "img": null,
                "imgHint": false,
                "locked": true,
                "notification": null,
                "reminder": "Jtk4k",
                "textHint": false
            }],
            "score": -300,
            "successful": [{
                "attempts": 0,
                "date": "Wed Oct 17  20:30:00 ",
                "dateMilliseconds": 1539801000000,
                "id": "d78614ce-f8a4-4847-a53e-703914d01ef2",
                "img": "file:///storage/emulated/0/DCIM/d09f307d-d9f3-4964-8d91-17b5df0aeb46.jpg",
                "imgHint": true,
                "locked": false,
                "notification": -721311330,
                "reminder": "RingLeBro",
                "textHint": false
            }, {
                "attempts": 0,
                "date": "Thu Oct 18  19:45:00 ",
                "dateMilliseconds": 1539884700000,
                "id": "a2befbb8-776e-4785-a139-2a2ca8bdc8e5",
                "img": "file:///storage/emulated/0/DCIM/9dfdf7ac-c258-43a4-ac53-b6cbabe92cc2.jpg",
                "imgHint": true,
                "locked": false,
                "notification": null,
                "reminder": "4u",
                "textHint": false
            }, {
                "attempts": 0,
                "date": "Thu Oct 18  22:13:00 ",
                "dateMilliseconds": 1539893580000,
                "id": "2226356b-eef5-4100-8f34-d060ab4b68b2",
                "img": "file:///storage/emulated/0/DCIM/0f922de3-4332-460b-85a1-2861f938ef45.jpg",
                "imgHint": true,
                "locked": false,
                "notification": -741035335,
                "reminder": "Energi",
                "textHint": false
            }]
        };
        expect(resBefore).not.toBe(resAfter);
        expect(resAfter).toEqual(correct);
    });
});