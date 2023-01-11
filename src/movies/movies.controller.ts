import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/Movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async getAll(): Promise<Movie[]> {
    return await this.moviesService.getAll();
  }
  @Get(':movieID')
  async getOne(@Param('movieID') movieID: number): Promise<Movie> {
    return await this.moviesService.getOne(movieID);
  }

  @Post()
  async create(@Body() movieData: CreateMovieDTO) {
    return this.moviesService.create(movieData);
  }

  @Delete('/:movieID')
  async remove(@Param('movieID') movieID: number) {
    return this.moviesService.deleteOne(movieID);
  }

  @Patch('/:movieID')
  async path(
    @Param('movieID') movieID: number,
    @Body() updateData: UpdateMovieDTO,
  ) {
    return this.moviesService.update(movieID, updateData);
  }
}
