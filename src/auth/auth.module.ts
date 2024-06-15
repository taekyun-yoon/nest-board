import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/routes/user/user.service';
import { LocalStrategy } from './auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/routes/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'secret_key',
      signOptions: {
        expiresIn: '1h'
      }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}