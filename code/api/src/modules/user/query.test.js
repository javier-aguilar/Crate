import request from 'supertest';
import express from 'express';
import graphqlHTTP from 'express-graphql'
import schema from '../../setup/schema';

describe("user queries", () => {
  const server =  express();

  beforeAll(()  => {
    server.use(
      '/',
      graphqlHTTP({
        schema: schema,
        graphqli: false
      })
    )
  })

  it("can update a user's email address", async () => {
    const response = await request(server)
      .post('/')
      .send({ query: 'mutation { userUpdate(id: 1, email: "bilbo@baggins.com") { id email } }' })
      .set('Accept', 'application/json')
      .expect(200)

    expect(response.body.data.userUpdate.id).toEqual(1)
    expect(response.body.data.userUpdate.email).toEqual('bilbo@baggins.com')
  })

  it("can update a user's shipping address", async () => {
    const response = await request(server)
      .post('/')
      .send({ query: 'mutation { userUpdate(id: 1, email: "bilbo@baggins.com", address: "123 Fake Street") { id email address } }' })
      .set('Accept', 'application/json')
      .expect(200)

    expect(response.body.data.userUpdate.id).toEqual(1)
    expect(response.body.data.userUpdate.address).not.toEqual("456 Old Street")
    expect(response.body.data.userUpdate.address).toEqual("123 Fake Street")
  })

  it("can update a user's image", async () => {
    const response = await request(server)
      .post('/')
      .send({ query: 'mutation { userUpdate(id: 1, image: "image.jpg") {id image } }' })
      .set('Accept', 'application/json')
      .expect(200)

    expect(response.body.data.userUpdate.id).toEqual(1)
    expect(response.body.data.userUpdate.image).toEqual("image.jpg")
  })

  it("can update a user's description", async () => {
    const response = await request(server)
      .post('/')
      .send({ query: 'mutation { userUpdate(id: 1, description: "I am the greatest of the admins") { id description } }'})
      .expect(200)

    expect(response.body.data.userUpdate.id).toEqual(1)
    expect(response.body.data.userUpdate.description).toEqual("I am the greatest of the admins")
  })
})
