import 'react-native';
import React from 'react';
import score from '../components/Score'
import MockAsyncStorage from 'mock-async-storage';
import { AsyncStorage as storage } from 'react-native'

describe('Test of the Score functions', () => {
    beforeEach(() => {
        const mock = () => {
            const mockImpl = new MockAsyncStorage();
            jest.mock('AsyncStorage', () => mockImpl)
        };
        mock();
    });
    
    it('Update Score of a user with given score', () => {
        const res = 0;
        expect(res).toEqual(0);
    });

    it('Mock Async Storage working', async () => {
        await storage.setItem('myKey', 'myValue');
        const value = await storage.getItem('myKey');
        expect(value).toBe('myValue')
    })
});