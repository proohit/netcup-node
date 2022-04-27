import { Actions } from '../src/@types/Actions';

describe('actions', () => {
  it('should have all actions', () => {
    const allExpectedActions = ['login', 'infoDnsZone', 'infoDnsRecords'];
    const actualActions = Object.values(Actions);
    expect(actualActions).toEqual(expect.arrayContaining(allExpectedActions));
  });
});
