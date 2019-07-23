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

const updateValues = data => {
  return keys(data)
    .map(key => {
      return `${key} = ${data[key] === null ? null : `'${data[key]}'`}`
    })
    .toString()
}

module.exports = {
  insert: (table, data) => {
    let query =
      'INSERT INTO ' + table + ` ${columns(data)} VALUES ${getValues(data)}`
    return query
  },
  update: (table, data, id) => {
    let query = `UPDATE ${table} SET ${updateValues(data)} WHERE id = ${id}`
    return query
  }
}
