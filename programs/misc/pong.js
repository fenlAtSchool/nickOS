/* MINIFIED CODE:
try{state}catch{state="init"}"over"==state&&(state="init");"init"===state?(dtxt(56,7,"PONG"),dtxt(20,19,"Click to Start"),state="initrun",s[4]=0,task=["updateDisplay",["waitTC",["clearScreen",["execute"],0]]]):"initrun"===state?(ball=[64,32],vel=[1,1],paddle=32,score=0,state="run"):"run"===state?(drawImage(ball[0],ball[1],1,1,[palette[0]]),drawImage(4,paddle,1,4,[,,,,].fill(palette[0])),7<paddle&&s[3]<paddle&&(paddle-=1),124>paddle&&s[3]>paddle&&(paddle+=1),ball[0]+=vel[0],ball[1]+=vel[1],(7>ball[1]||62<ball[1])&&(vel[1]*=-1),126<ball[0]&&(vel[0]=-1),5==ball[0]&&(inBounds(ball[1],paddle,paddle+3)?(vel[0]=1,score++):(state="over",task=["clearScreen",["execute"],0])),drawImage(ball[0],ball[1],1,1,[palette[1]]),drawImage(4,paddle,1,4,[,,,,].fill(palette[1])),dtxt(60,6,score.toString()),updateDisplay()):"over"===state?(dtxt(0,6,"GAME OVER!"),dtxt(0,12,`Your score: ${score}`),updateDisplay(),task=["waitTC",["clearScreen",["initmenu"],0]]):void 0;*/
try{state}catch{state="init"}
if(state == 'over'){state="init"}

switch(state){
case 'init':
  dtxt(56,7,"PONG")
  dtxt(20,19,"Click to Start")
  state = "initrun"
  s[4] = 0
  task = ["updateDisplay",["waitTC",["clearScreen",["execute"], 0]]]
  break

case 'initrun':
  ball = [64,32]
  vel = [1,1]
  paddle = 32
  score = 0
  state = "run"
  break
    
case 'run':
  drawImage(ball[0],ball[1],1,1,[palette[0]])
  drawImage(4,paddle,1,4,Array(4).fill(palette[0]))

  if(paddle > 7 && s[3] < paddle){
    paddle -= 1
  }
  if(paddle < 124 && s[3] > paddle){
    paddle += 1
  }
  
  ball[0] += vel[0]
  ball[1] += vel[1]
  if(ball[1] < 7 || ball[1] > 62){
    vel[1] *= -1
  }
  if(ball[0] > 126){
    vel[0] = -1
  }
  if(ball[0] == 5){
    if(inBounds(ball[1],paddle,paddle+3)){
      vel[0] = 1, score++
    } else {
      state = "over"
      task = ["clearScreen",["execute"],0]
    }
  }
  drawImage(ball[0],ball[1],1,1,[palette[1]])
  drawImage(4,paddle,1,4,Array(4).fill(palette[1]))
  dtxt(60,6,score.toString())
  updateDisplay()
  break

case 'over':
  dtxt(0,6,"GAME OVER!")
  dtxt(0,12,`Your score: ${score}`)
  updateDisplay()
  task = ["waitTC",["clearScreen",["initmenu"],0]]
  break
}
