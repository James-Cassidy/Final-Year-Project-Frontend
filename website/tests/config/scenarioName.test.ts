import scenarioName from '../../src/config/scenarioName'

describe('scenario name test', () => {
    it('should retrieve global variable', () => {
        let value = scenarioName.scenario
        expect(value).toBe('SQL Injection')
    })
});