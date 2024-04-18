import axios from 'axios';
import BackendService from '../../src/services/backend-service';

describe('backend-services', () => {

    let mockPost = jest.fn();
    let mockGet = jest.fn();

    beforeEach(() => {
        jest.resetAllMocks()
        jest.spyOn(axios, 'post').mockImplementation(mockPost)
        jest.spyOn(axios, 'get').mockImplementation(mockGet)
    });

    it('getHealth', async () => {
        mockGet.mockResolvedValue({
            status: 200,
            data: 'UP'
        })
        
        const result = await BackendService.getHealth();

        expect(result.status).toBe(200)
        expect(result.data).toBe('UP')
    });

    it('emailResults', async () => {
        mockPost.mockResolvedValue({
            status: 200,
            data: 'Message Sent Successfully'
        })

        const result = await BackendService.emailResults(
            'test@test.co.uk',
            23,
            12,
            34,
            53,
            12,
            4,
            12,
            12
        )

        expect(result.status).toBe(200)
        expect(result.data).toBe('Message Sent Successfully')
    })

    it('saveResults', async () => {
        mockPost.mockResolvedValue({
            status: 200,
            data: 'Results saved'
        })

        const response = await BackendService.saveResults('Tom','SQL Injection',13,4,3,4,5,3,5,3)

        expect(response.status).toBe(200)
        expect(response.data).toBe('Results saved')
    })

    it('getResults', async () => {
        mockPost.mockResolvedValue({
            status: 200,
            data: {
                name: 'Tom',
                scenario: 'SQL Injection'
            }
        })

        const response = await BackendService.getResults('SQL Injection')

        expect(response.status).toBe(200)
    })

    it('writeScenario', async () => {
        mockPost.mockResolvedValue({
            status: 200,
            data: 'successfully updated'
        })

        const response = await BackendService.writeScenario('Sql Injection', {
            reconnaissance: {},
            actions: {},
            weaponisation: {},
            delivery: {},
            command: {},
            installation: {},
            exploitation: {}
        })

        expect(response.status).toBe(200)
        expect(response.data).toBe('successfully updated')
    })
});