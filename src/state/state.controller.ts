import { Controller, Get } from '@nestjs/common';

import {StateService} from './state.service'
import { StateEntity } from './entities/state.entity';

@Controller('state')
export class StateController {

    constructor(
        private readonly stateService: StateService
    ){}

    @Get()
    async listStates(): Promise<StateEntity[]> {
        return this.stateService.listStates()
    }
}
