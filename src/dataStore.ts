const dataStore = {
    // Key: ENS name or identifier
    'sub1.alice.eth': {
      signature: '0xSignatureForSub1Alice', // Pre-generated signature
      message: {
        sender: '0xSenderAddress1',
        amount: '1000',
      },
    },
    'sub2.alice.eth': {
      signature: '0xSignatureForSub2Alice',
      message: {
        sender: '0xSenderAddress2',
        amount: '2000',
      },
    },
    // Add more records as needed
  };
  
  module.exports = dataStore;
  