const [,, ...args] = process.argv

if (args.length !== 1) console.log('makeModel expected exactly one argument')
else {
  const name = args[0]
  console.log(typeof name)
}
