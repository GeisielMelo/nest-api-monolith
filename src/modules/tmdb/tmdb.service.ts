import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class TMDBService {
  private readonly API_URL = 'https://api.themoviedb.org/3'
  private TMDB_API_KEY: string

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.TMDB_API_KEY = this.configService.get<string>('tmdb.key')
  }

  async discover(type: 'movie' | 'tv', query) {
    const url = `${this.API_URL}/discover/${type}`
    const params = { ...query, api_key: this.TMDB_API_KEY }
    const response = await firstValueFrom(this.httpService.get(url, { params }))
    return response.data
  }
}
