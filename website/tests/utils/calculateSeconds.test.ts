import calculateSeconds from '../../src/utils/calculateSeconds';



describe('calculate seconds tests', () => {

    it('Should calculate the number of seconds', () => {
        const result = calculateSeconds("2", "10")

        expect(result).toBe(50)
    })

    it('should return NaN if invalid parameters are passed in', () => {
        const result = calculateSeconds('23','test')

        expect(result).toBe(NaN)
    })
})