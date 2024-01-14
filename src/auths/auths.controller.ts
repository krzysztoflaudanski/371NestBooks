import { Controller, Body, Post, Request, UseGuards, Response } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { RegisterDTO } from './dtos/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auths')
export class AuthsController {
    constructor(private authService: AuthsService) { }

    @Post('/register')
    create(@Body() authData: RegisterDTO) {
        return this.authService.register(authData);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Response() res) {
        const tokens = await this.authService.createSession(req.user);
        res.cookie('auth', tokens, { httpOnly: true });
        res.send({
            message: 'success',
        });
    }
}
