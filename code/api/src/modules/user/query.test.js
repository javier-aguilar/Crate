import request from 'supertest';
import express from 'express';
import graphqlHTTP from 'express-graphql'
import schema from '../../setup/schema';

describe("user queries", () => {
  beforeAll(()  => {
    const server = express();
    server.use(
      '/',
      graphqlHTTP({
        schema: schema,
        graphqli: false
      })
    )
  })

  it("is true", () => {
    expect(true).toBe(true)
  })
})
