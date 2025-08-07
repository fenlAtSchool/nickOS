
try{state}catch{state="init"}

switch(state){
case 'init':
  dtxt(56,7,"PONG")
  dtxt(20,19,"Click to Start")
  updateDisplay()
  state = "initrun"
  task = ["waitTC",["clearScreen",["execute"], 0]]

case 'initrun':
  ball = [64,32]
  vel = [1,1]
  paddle = 0
  score = 0
  state = "run"

case 'run':
  drawImage(1,1,ball[0],ball[1],[palette[0]])
  drawImage(1,4,4,paddle,Array(4).fill(palette[0]))
  drawImage(1,4,124,ball[1],Array(4).fill(palette[0]))

  if(paddle > 7 && s[2] < paddle){
    paddle -= 1
  }
  if(paddle < 124 && s[2] > paddle){
    paddle += 1
  }
  
  ball.map((v,idx) => v + vel[idx])
  if(ball[1] == 6 || ball[1] == 63){
    vel[0] *= -1
  }
  if(ball[0] == 123){
    vel[0] = -1
  }
  if(ball[0] == 7){
    if(inBounds(ball[1],paddle,paddle+3)){
      vel[0] = 1, score++
    } else {
      state = "over"
      task = ["clearScreen",["execute"],0]
    }
  }
  drawImage(1,1,ball[0],ball[1],[palette[0]])
  drawImage(1,6,4,paddle,Array(4).fill(palette[0]))
  drawImage(1,6,124,ball[1],Array(4).fill(palette[0]))
  dtxt(60,6,score.toString())
  updateDisplay()

case 'over':
  dtxt(0,6,"GAME OVER!")
  dtxt(0,12,`Your score: ${score}`)
  state = "ended"

}
