import isEmpty from '../../src/utils/is-empty';

describe(' test is-empty util file', () => {

    it('should return false when given a non-empty value', () => {
        const boolVal = isEmpty('test')

        expect(boolVal).toBeFalsy()
    })

    it('should return true when given an empty value', () => {
        const boolVal = isEmpty('')
        
        expect(boolVal).toBeTruthy()
    })

    it('should return true when given an empty object', () => {
        const boolVal = isEmpty({})

        expect(boolVal).toBeTruthy()
    })

    it('should return true when null is passed in', () => {
        const boolVal = isEmpty(null)

        expect(boolVal).toBeTruthy()
    })

})