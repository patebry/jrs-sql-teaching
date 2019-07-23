const { keys, join } = require('ramda')

module.exports = (body, allowedFieds, requiredFields = allowedFieds) => {
  keys(body).map(x => {
    if (!allowedFieds.includes(x)) {
      delete body[x]
    }
  })

  const errorArr = requiredFields.filter(x => !keys(body).includes(x))
  if (errorArr.length > 0) {
    throw new Error(`Missing Required Fields: ${join(', ', errorArr)}`)
  }
  return body
}
