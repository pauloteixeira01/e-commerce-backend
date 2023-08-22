import { Injectable } from '@nestjs/common';
import {hash} from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm'

import {CreateUserDto} from './dtos/createUser.dto'
import {UserEntity} from './entities/user.entity'

@Injectable()
export class UserService {
    
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity>{

        const saltOrRounds = 10;
        
        const passwordHashed = await hash(createUserDto.password, saltOrRounds);

       return  this.userRepository.save({
        ...createUserDto,
        typeUser: 1,
        password: passwordHashed
       })
        
    }

    async listUsers(): Promise<UserEntity[]> {
        return this.userRepository.find()
    }
}
