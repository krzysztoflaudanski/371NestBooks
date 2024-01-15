import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { Book, UserOnBooks } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class BooksService {
    constructor(private prismaService: PrismaService) { }

    public getAll(): Promise<Book[]> {
        return this.prismaService.book.findMany({ include: { author: true } });
    }

    public getById(id: Book['id']): Promise<Book | null> {
        return this.prismaService.book.findUnique({
            where: { id },
            include: { author: true }
        });
    }

    public async create(bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<Book> {
        const { authorId, ...otherData } = bookData
        try {
            return await this.prismaService.book.create({
                data: {
                    ...otherData,
                    author: {
                        connect: { id: authorId }
                    }
                }
            });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ConflictException('Title is already taken');
            }
            if (error.code === 'P2025') {
                throw new BadRequestException("Author doesn't exist");
            }
            throw error;
        }
    }

    public async updateById(
        id: Book['id'],
        bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<Book> {
        const { authorId, ...otherData } = bookData
        try {
            return await this.prismaService.book.update({
                where: { id },
                data: {
                    ...otherData,
                    author: {
                        connect: { id: authorId }
                    }
                }
            });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ConflictException('Title is already taken');
            }
            if (error.code === 'P2025') {
                throw new BadRequestException("Author doesn't exist");
            }
            throw error;
        }
    }

    public deleteById(id: Book['id']): Promise<Book> {
        return this.prismaService.book.delete({
            where: { id },
        });
    }

    public async likeBook(likeData: Omit<UserOnBooks, 'id'>): Promise<Book> {
        const { userId, bookId } = likeData;
        return await this.prismaService.book.update({
            where: { id: bookId },
            data: {
                users: {
                    create: {
                        user: {
                            connect: { id: userId },
                        },
                    },
                },
            },
        });
    }

}
