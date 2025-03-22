import { Controller, Get, Query } from '@nestjs/common'
import { TMDBService } from './tmdb.service'

@Controller('tmdb')
export class TMDBController {
  constructor(private readonly tmdbService: TMDBService) {}

  @Get('/discover/movie')
  discoverMovie(@Query() query) {
    return this.tmdbService.discover('movie', query)
  }

  @Get('/discover/tv')
  discoverTV(@Query() query) {
    return this.tmdbService.discover('tv', query)
  }
}
