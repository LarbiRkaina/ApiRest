import { Router } from 'express';
import {
    getBookList,
    getBook,
    insertBook,
    updateBook,
    deleteBook,
} from './mock-db';

export const booksApi = Router();

booksApi
    .get('/', async (req, res, next) => {
        try {
            const page = Number(req.query.page);
            const pageSize = Number (req.query.pageSize);
            let bookList = await getBookList();

            if(page && pageSize) {
                const startIndex = (page -1) * pageSize;
                const endIndex = Math.min(startIndex+pageSize, bookList.length);
                bookList = bookList.slice (startIndex, endIndex);
            }
            res.send(bookList);
        } catch(error) {
            next (error);
        }
    } )