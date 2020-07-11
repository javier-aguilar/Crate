// App Imports
import models from '../../setup/models'

// Get userproduct by user
export async function getByUser(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id > 0) {
    return await models.UserProduct.findAll({
      where: {
        userId: auth.user.id
      },
      include: [
        {model: models.User, as: 'user'},
        {model: models.Product, as: 'product'},
      ]
    })
  } else {
    throw new Error('Please login to view your product history.')
  }
}
// Get one userProduct
export async function get(parentValue, { id }) {
  return await models.UserProduct.findOne({
    where: { id },
    include: [
      { model: models.User, as: 'user' },
      { model: models.Product, as: 'product' },
    ]
  })
}

// Get all userProducts
export async function getAll() {
  return await models.UserProduct.findAll({
    include: [
      { model: models.User, as: 'user' },
      { model: models.Product, as: 'product' },
    ]
  })
}

// Create userproduct
export async function create(parentValue, { userId }, { auth }) {
  if(auth.user && auth.user.id > 0) {
    return await models.UserProduct.create({
      productId,
      userId: auth.user.id
    })
  } else {
    throw new Error('Please login to create your product history.')
  }
}
