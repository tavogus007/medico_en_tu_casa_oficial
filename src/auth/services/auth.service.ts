import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { AuthDto } from '../dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectEntityManager() private entityManager: EntityManager,
    private configService: ConfigService,
  ) {}

  async login(): Promise<any> {
    const array = [
      {
        token: 'token',
      },
    ];
    return array;
  }
  ////////////////////// EJEMPLOS //////////////////////
  private users = [
    {
      id: 2,
      name: 'nombre',
      cell: '123456',
    },
    {
      id: 3,
      name: 'nombre',
      cell: '987654',
    },
  ];
  getUsuarios() {
    return this.users;
  }
  createLogin() {
    return 'creando..';
  }
  updateLogin() {
    return 'actualizando..';
  }
  deleteLogin() {
    return 'eliminando..';
  }
  updateStatusLogin() {
    return 'actualizando parcialmente..';
  }

  creteAuth(user: AuthDto) {
    return {
      ...user,
    };
  }
}
