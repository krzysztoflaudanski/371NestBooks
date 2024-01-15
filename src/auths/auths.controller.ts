import { Controller, Body, Post, Request, UseGuards, Response, Delete } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { RegisterDTO } from './dtos/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

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

    @UseGuards(JwtAuthGuard)
    @Delete('logout')
    async logout(@Response() res) {
        res.clearCookie('auth', { httpOnly: true });
        res.send({
            message: 'success',
        });
    }
}
