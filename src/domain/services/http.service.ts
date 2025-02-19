import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpCustomService {

    private readonly rickAndMortyApi: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.rickAndMortyApi = this.configService.get<string>('HTTP_RICKANDMORTY_API');
    }


    async findAll() {
        try {
            const response = await firstValueFrom(
                this.httpService.get(`${this.rickAndMortyApi}/api/character`)
            )
            return response.data;
        } catch (error) {
            console.log(error);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
            //throw new InternalServerErrorException(error.menssage);
        }
    }
}
