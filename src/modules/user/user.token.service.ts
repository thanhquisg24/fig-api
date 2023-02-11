import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { prepareTxClaim, postTxClaim } from 'src/abi';
import { STATUS } from 'src/common/constants';
import { UserClaimTokenException } from 'src/common/exceptions/ClaimUserToken.exception';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { CreateVesingHistoryDto } from '../vesing-history/dto/create-vesing-history.dto';
import { UpdateVesingHistoryDto } from '../vesing-history/dto/update-vesing-history.dto';
import { VesingHistoryService } from '../vesing-history/vesing-history.service';
import { VestingAddressService } from '../vesting-address/vesting-address.service';
import { ClaimUserTokenDto } from './dto/claim-user-token-dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserTokenService {
  private readonly logger = new Logger(UserTokenService.name);
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
    private readonly vestingAddressService: VestingAddressService,
    private readonly vesingHistoryService: VesingHistoryService,
  ) {}

  @Transactional()
  async claimToken(claimDto: ClaimUserTokenDto): Promise<string> {
    const currentUser = await this.repo.findOneBy({ id: claimDto.userId });
    if (!currentUser) {
      throw new BadRequestException('This User is not exist!');
    }
    if (currentUser.avaiable <= 0) {
      throw new UserClaimTokenException('No Token amount avaiable!');
    }

    const fromVestTrans =
      await this.vestingAddressService.findOneByUserIdAndDecode(currentUser.id);

    if (currentUser.avaiable > fromVestTrans.balance) {
      throw new UserClaimTokenException('Not enough token to transfer!');
    }
    this.logger.log('claimToken() check balance OK');
    const wallet = {
      address: fromVestTrans.address,
      privateKey: fromVestTrans.private_key,
    };
    const amtTotransfer = currentUser.avaiable;
    const toAddr = claimDto.userAddress;
    const r = await prepareTxClaim(wallet, toAddr, 11);
    this.logger.log('claimToken() prepareTxClaim ' + r.prepareTxHash);
    const prepareVestingHistoryRow: CreateVesingHistoryDto = {
      txId: r.prepareTxHash,
      userId: currentUser.id,
      amount: amtTotransfer,
      fromAddress: fromVestTrans.address,
      toAddress: toAddr,
      status: STATUS.PENDING,
    };
    this.logger.log('claimToken() save prepareHistoryRow');
    //1.save prepareVestingHistoryRow
    const prepareHistoryRow = await this.vesingHistoryService.create(
      prepareVestingHistoryRow,
    );

    this.logger.log('claimToken() send TX postTxClaim()');
    //2.send TX
    const postTx = await postTxClaim(r.web3, r.signedTx);
    const postHistoryRow: UpdateVesingHistoryDto = {
      id: prepareHistoryRow.id,
      txId: postTx,
      status: STATUS.SETTLED,
    };
    this.logger.log('claimToken() save postVestingHistoryRow');
    //3.save postVestingHistoryRow
    const up1 = this.vesingHistoryService.update(
      postHistoryRow.id,
      postHistoryRow,
    );
    this.logger.log('claimToken()  update avaiable token of user');
    //4. update avaiable token of user and vestingAddress table
    const up2 = this.repo.update(currentUser.id, {
      avaiable: currentUser.avaiable - amtTotransfer,
    });
    this.logger.log('claimToken()  update balance of vestingAddress table');
    const up3 = this.vestingAddressService.update(fromVestTrans.id, {
      id: fromVestTrans.id,
      balance: fromVestTrans.balance - amtTotransfer,
    });

    //combind promise all
    await Promise.all([up1, up2, up3]);
    return r.prepareTxHash;
  }
}
