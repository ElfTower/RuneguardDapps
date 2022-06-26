const { constants, expectEvent, expectRevert, time } = require('@openzeppelin/test-helpers');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');
const { expect } = require('chai');

const ERC20Mock = artifacts.require('RuneguardCopper');
const VestingWallet = artifacts.require('RuneguardVestingWallet');

const { shouldBehaveLikeVesting } = require('./RuneguardVestingWalletBehaviorTests');

const min = (...args) => args.slice(1).reduce((x, y) => x.lt(y) ? x : y, args[0]);

contract('VestingWallet', function (accounts) {
  const [ sender, beneficiary ] = accounts;

  const amount = web3.utils.toBN(web3.utils.toWei('100'));
  const duration = web3.utils.toBN(4 * 365 * 86400); // 4 years

  beforeEach(async function () {
    this.start = (await time.latest()).addn(3600); // in 1 hour
    this.mock = await VestingWallet.new(beneficiary, this.start, duration);
  });

  it('rejects zero address for beneficiary', async function () {
    await expectRevert(
      VestingWallet.new(constants.ZERO_ADDRESS, this.start, duration),
      'VestingWallet: beneficiary is zero address',
    );
  });

  it('check vesting contract', async function () {
    expect(await this.mock.beneficiary()).to.be.equal(beneficiary);
    expect(await this.mock.start()).to.be.bignumber.equal(this.start);
    expect(await this.mock.duration()).to.be.bignumber.equal(duration);
  });

  describe('vesting schedule', function () {
    beforeEach(async function () {
      this.schedule = Array(64).fill().map((_, i) => web3.utils.toBN(i).mul(duration).divn(60).add(this.start));
      this.vestingFn = timestamp => min(amount, amount.mul(timestamp.sub(this.start)).div(duration));
    });

    describe('ERC20 vesting', function () {
      beforeEach(async function () {
        this.token = await ERC20Mock.new();
        await this.token.transfer(this.mock.address, amount);
        this.getBalance = (account) => this.token.balanceOf(account);
        this.checkRelease = (receipt, to, value) => expectEvent.inTransaction(
          receipt.tx,
          this.token,
          'Transfer',
          { from: this.mock.address, to, value },
        );
      });

      shouldBehaveLikeVesting(beneficiary);
    });
  });
});