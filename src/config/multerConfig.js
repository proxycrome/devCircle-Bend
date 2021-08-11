import multer from 'multer';
import Datauri from 'datauri/parser.js';
import path from 'path';

const storage = multer.memoryStorage();
export const multerUploads = multer({ storage });

const duri = new Datauri();

export const datauri = req => duri.format(path.extname(req.file.originalname).toString(), req.file.buffer)