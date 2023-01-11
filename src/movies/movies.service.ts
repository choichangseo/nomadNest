import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/Movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) {}

  getAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  getOne(movieID: number): Promise<Movie> {
    const movie = this.movieRepository.findOne({ where: { movieID } });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieID} not found.`);
    }
    return movie;
  }

  async deleteOne(movieID: number) {
    const id = (await this.getOne(movieID)).movieID;
    this.movieRepository.delete({ movieID: id });
  }

  async create(movieData: CreateMovieDTO) {
    const id = await this.getAll();
    if (id.length === 0) {
      this.movieRepository.save({
        movieID: 1,
        ...movieData,
      });
    } else {
      this.movieRepository.save({
        movieID: id.length + 1,
        ...movieData,
      });
    }
  }

  async update(movieID: number, updateData: UpdateMovieDTO) {
    const movie = await this.getOne(movieID);
    this.movieRepository.save({ ...movie, ...updateData });
  }
}
