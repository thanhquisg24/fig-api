import { Request, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard } from '../../common/guards/local-auth.guard';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/UserLoginDto';

@Controller('api/v1/auth')
@ApiTags('Auth APIs')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  //handle login
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiBody({ type: UserLoginDto })
  @ApiOkResponse({ description: 'result Token' })
  @ApiBadRequestResponse({
    description: 'Invalid parameter',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async login(@Request() request): Promise<any> {
    return this.authService.login(request.user);
  }

  // @Post('/register')
  // async registerUser(@Body() input: CreateUserDto) {
  //   const check = await this.validate(input.email);
  //   if (!check) {
  //     throw new HttpException(
  //       { message: 'User already exists' },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }

  //   input.password = await this.authService.hashPassword(input.password);
  //   return this.userService.create(input);
  // }

  // @Post('/login')
  // async handleLogin(@Body() input) {
  //   console.log(input, 99999);
  //   const user = await this.userService.getUserByEmail(input.email);
  //   console.log(user);
  // }

  // async validate(email: string) {
  //   try {
  //     const users = await this.userService.geUsersByEmail(email);
  //     return users.length <= 0;
  //   } catch (e) {
  //     return false;
  //   }
  // }
}
