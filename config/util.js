import fs from 'fs'

const rev = fs.readFileSync('.git/HEAD').toString().trim()

export const gitHash = () => {
  return rev.indexOf(':') === -1
    ? rev
    : fs.readFileSync('.git/' + rev.substring(5)).toString().trim()
}

export const buildDate = () => {
  var d = new Date(Date.now())
  return d.toISOString()
}