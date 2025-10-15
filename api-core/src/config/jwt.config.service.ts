import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  async createJwtOptions(): Promise<JwtModuleOptions> {
    return {
      secret: process.env.JWT_SECRET || 'hard!to-guess_secret',
      signOptions: {
        expiresIn: '3d',
      },
    };
  }
}
