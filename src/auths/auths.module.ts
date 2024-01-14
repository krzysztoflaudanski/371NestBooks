import { Module } from '@nestjs/common';
import { AuthsController } from './auths.controller';
import { AuthsService } from './auths.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthsController],
  providers: [AuthsService],
  imports: [UsersModule]
})
export class AuthsModule { }
