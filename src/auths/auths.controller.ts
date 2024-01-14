import { Controller, Body, Post } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { RegisterDTO } from './dtos/create-user.dto';

@Controller('auths')
export class AuthsController {
    constructor(private authService: AuthsService) { }

    @Post('/register')
    create(@Body() authData: RegisterDTO) {
        return this.authService.register(authData);
    }
}
