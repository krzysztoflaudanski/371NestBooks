import { IsNotEmpty, IsString, Length, IsNumber, Min, Max, IsUUID, IsInt } from 'class-validator';

export class UpdateBookDTO {
    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    title: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1, { message: 'Rating must be at least 1' })
    @Max(5, { message: 'Rating must be at most 5' })
    rating: number; 
   
    @IsNotEmpty()
    @IsNumber()
    @Min(0, { message: 'Price must be at least 0' })
    @Max(1000, { message: 'Price must be at most 1000' })
    price: number;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    authorId: string;
}