import { Controller, Get } from '@nestjs/common';
import { Public } from '../modules/auth/decorators/public.decorator';

@Controller('api')
export class AppController {

    @Public()
    @Get()
    wakeServer(): { message: string } {
        return {
            message: 'El servidor está activo y listo para recibir peticiones',
        };
    }
}
