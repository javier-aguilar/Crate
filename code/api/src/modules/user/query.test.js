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

  afterEach( async () => {
    const response =  await request(server)
      .post('/')
      .send({ query: 'mutation { userUpdate(id: 1, name: "The Admin", email: "admin@crate.com", address: "admin address", description: "admin description", image: "admin image") { id } }' })
      .set('Accept', 'application/json')
      .expect(200)
  })

  it("can update a user's email address", async () => {
    const original = await request(server)
      .get('/')
      .send({ query: '{ user(id: 1) { id name email address description image }}' })
      .expect(200)

    var originalId = original.body.data.user.id
    var originalEmail = original.body.data.user.email

    const response = await request(server)
      .post('/')
      .send({ query: 'mutation { userUpdate(id: 1, email: "bilbo@baggins.com") { id email } }' })
      .set('Accept', 'application/json')
      .expect(200)

    expect(response.body.data.userUpdate.id).toEqual(originalId)
    expect(response.body.data.userUpdate.email).not.toEqual(originalEmail)
    expect(response.body.data.userUpdate.email).toEqual('bilbo@baggins.com')
  })

  it("can update a user's shipping address", async () => {
    const original = await request(server)
      .get('/')
      .send({ query: '{ user(id: 1) { id name email address description image }}' })
      .expect(200)

    var originalId = original.body.data.user.id
    var originalAddress = original.body.data.user.address

    const response = await request(server)
      .post('/')
      .send({ query: 'mutation { userUpdate(id: 1, email: "bilbo@baggins.com", address: "123 Fake Street") { id email address } }' })
      .set('Accept', 'application/json')
      .expect(200)

    expect(response.body.data.userUpdate.id).toEqual(originalId)
    expect(response.body.data.userUpdate.address).not.toEqual(originalAddress)
    expect(response.body.data.userUpdate.address).toEqual("123 Fake Street")
  })

  it("can update a user's image", async () => {
    const original = await request(server)
      .get('/')
      .send({ query: '{ user(id: 1) { id name email address description image }}' })
      .expect(200)

    var originalId = original.body.data.user.id
    var originalImage = original.body.data.user.image

    const response = await request(server)
      .post('/')
      .send({ query: 'mutation { userUpdate(id: 1, image: "image.jpg") {id image } }' })
      .set('Accept', 'application/json')
      .expect(200)

    expect(response.body.data.userUpdate.id).toEqual(originalId)
    expect(response.body.data.userUpdate.image).not.toEqual(originalImage)
    expect(response.body.data.userUpdate.image).toEqual("image.jpg")
  })

  it("can update a user's description", async () => {
    const original = await request(server)
      .get('/')
      .send({ query: '{ user(id: 1) { id name email address description image }}' })
      .expect(200)

    var originalId = original.body.data.user.id
    var originalDescription = original.body.data.user.description

    const response = await request(server)
      .post('/')
      .send({ query: 'mutation { userUpdate(id: 1, description: "I am the greatest of the admins") { id description } }'})
      .expect(200)

    expect(response.body.data.userUpdate.id).toEqual(originalId)
    expect(response.body.data.userUpdate.description).not.toEqual(originalDescription)
    expect(response.body.data.userUpdate.description).toEqual("I am the greatest of the admins")
  })
})
