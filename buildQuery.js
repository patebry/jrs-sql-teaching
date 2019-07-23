const { keys, values } = require('ramda')
const columns = data => {
  return `(${keys(data).toString()})`
}

const getValues = data => {
  return `(${values(data).toString()})`
    .replace('(', "('")
    .replace(/\,/g, "','")
    .replace(')', "')")
}

module.exports = {
  insert: (table, data) => {
    let str =
      'INSERT INTO ' + table + ` ${columns(data)} VALUES ${getValues(data)}`
    return str
  }
}
