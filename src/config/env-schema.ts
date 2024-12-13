import * as Joi from 'joi';
import { join } from 'path';

export const envSchema = Joi.object({

    DB_TYPE: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_DATABASE: Joi.string().required(),
    PORT: Joi.number().required(),
    NODE_ENV: Joi.string().required()

});