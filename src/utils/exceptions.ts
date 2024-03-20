import createHttpError from 'http-errors'
import { BAD_REQUEST } from 'http-status'

export const badRequestError = createHttpError(BAD_REQUEST, 'Invalid email or/and password')
