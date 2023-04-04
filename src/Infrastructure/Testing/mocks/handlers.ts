import { rest } from 'msw'
import { mockData } from '../../../SearchResult/searchResult.test'

import configService from '../../Config/config.service'

const apiUrl: string = `${configService.config.REACT_APP_API_URL}`

export const mockErrorResponse = {
  errorCode: 'AN_ERROR_OCCURRED',
  errorDescription: `My custom error description`,
  referenceId: `a_unique_reference_id`,
}

const handlers = [
  rest.get(`${apiUrl}/search/shows?q=test`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([mockData]))
  }),
  rest.get(`${apiUrl}/shows/:identifier`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData[0].show))
  }),
]

const errorHandlers = {
  getSearch: rest.get(`${apiUrl}/search/shows?q=test`, (req, res, ctx) => {
    return res(ctx.delay(), ctx.status(400), ctx.json(mockErrorResponse))
  }),
  getSingleSearch: rest.get(`$${apiUrl}/shows/:identifier`, (req, res, ctx) => {
    return res(ctx.delay(), ctx.status(400), ctx.json(mockErrorResponse))
  }),
}

export { handlers, errorHandlers }
