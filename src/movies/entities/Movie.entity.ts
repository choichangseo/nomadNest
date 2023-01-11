import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// export class Movie {
//   id: number;
//   title: string;
//   year: number;
//   genres: string[];
// }
@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', comment: '영화 아이디' })
  movieID: number;

  @Column({ type: 'varchar', length: 50, comment: '영화 제목' })
  title: string;

  @Column({ type: 'int', comment: '제작년도' })
  year: number;

  @Column({ type: 'varchar', length: 50, comment: '영화 장르' })
  genres: string;
}
