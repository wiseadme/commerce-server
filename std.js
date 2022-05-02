const questions = [
  'what is your name?',
  'your age?'
]

function ask(i) {
  process.stdout.write(`\n\n\n ${questions[i]}`)
  process.stdout.write("  >  ")
}

process.stdin.on('data', (data) => {
  process.stdout.write(`\n ${data.toString()}`)
})

ask(0)
ask(1)
