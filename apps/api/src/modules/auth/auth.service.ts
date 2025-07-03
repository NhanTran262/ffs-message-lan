import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  authenticate(): string {
    return 'Hello World!';
  }
}
