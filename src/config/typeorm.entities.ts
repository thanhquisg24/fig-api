import { TokenEntity } from '../modules/token/entities/token.entity';
import { VesingHistoryEntity } from '../modules/vesing-history/entities/vesing-history.entity';
import { VestingAddressEntity } from '../modules/vesting-address/entities/vesting-address.entity';
import { ArticleEntity } from '../article/entities/article.entity';
import { UserEntity } from '../modules/user/entities/user.entity';

const entities = [
  ArticleEntity,
  UserEntity,
  TokenEntity,
  VesingHistoryEntity,
  VestingAddressEntity,
];

export default entities;
