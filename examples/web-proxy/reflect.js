function exp (name, cb) {
  return () => {
    console.log(name)
    try {
      cb()
    } catch (e) {
      console.error(e)
    }
  }
}
