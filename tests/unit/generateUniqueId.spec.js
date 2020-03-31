const utils = require('../../src/utils/ControllerUtils')

describe('Generate unique id test', () => {
  
  it('should generate an unique id', () => {
    const id = utils.generateUniqueId();
    expect(id).not.toBeNull();
    expect(id).toHaveLength(8);
  });

});