const ArcArray = require('../');

describe('ArcArray promise map', () => {
    it('Should allow us to use await to resolve a map', async () => {
        const testArray = new ArcArray(1,2,3,4,5,6);
        const resolvedArray = await testArray.pMap(async (_data) => {
          return await Promise.resolve(_data)
        })
        expect(resolvedArray).toEqual([1,2,3,4,5,6]);
    });
});
