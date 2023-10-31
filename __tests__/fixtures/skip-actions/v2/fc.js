class FC {
  deploy(inputs) {
    console.log(`deploy inputs: ${JSON.stringify(inputs)}`)
    return { v2: 'this is a v2 component' }
  }
}

module.exports = FC;