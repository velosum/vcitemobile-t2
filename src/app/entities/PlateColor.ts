import {Entity, PrimaryColumn, Column, BaseEntity} from 'typeorm';

@Entity('platecolor')
export class PlateColor extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    Abbreviation: string;

    @Column()
    Name: string;
}
