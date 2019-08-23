const {Miner} = require('../../lib/components/miner');
const fs = require('fs');

describe("Miner", function() {

    it("initiates", function() {
        const miner = new Miner();
        spyOn(miner, 'sendTransaction');
        miner.initTransactions();
        
        expect(miner.sendTransaction).toHaveBeenCalled();
    });

    it('gets cycles', () => {
        const miner = new Miner();
        spyOn(miner, 'sendTransaction');
        const cycles = miner.getCycles();
        
        expect(cycles).toContain(147950, 147951, 147952, 147953);
    });

    it('gets cycles returns null', () => {
        const miner = new Miner();
        spyOn(fs, 'readdirSync').and.throwError;
        expect(miner.getCycles()).toBeNull;
    });

    it('sends transactions', () => {
        const miner = new Miner();
        const minaCoinSpy = spyOn(miner.minaCoin, 'addTransaction');
        miner.sendTransaction('beer');
    
        expect(minaCoinSpy).toHaveBeenCalledTimes(1);
    });

    it('sends transactions throws and error', () => {
        const miner = new Miner();
        const sendTransactionSpy = spyOn(miner, 'sendTransaction');
        miner.sendTransaction(undefined);
    
        expect(sendTransactionSpy).toThrow;
    });

    it('gets prepared data', () => {
        const miner = new Miner();
        spyOn(miner, 'getLatestBlock').and.returnValue({});
    
        const data1 = miner.getData();
    
        expect(data1.theirBalance).toBe(0);
        expect(data1.myBalance).toBe(0);
        expect(data1.latestBlock).toEqual({});
    
        miner.initTransactions();

        const data2 = miner.getData();
    
        expect(data2.theirBalance).toBe(40);
        expect(data2.myBalance).toBe(60);
        expect(data2.latestBlock).toEqual({});
    });
});

// beforeEach(() => {
//     
// });

