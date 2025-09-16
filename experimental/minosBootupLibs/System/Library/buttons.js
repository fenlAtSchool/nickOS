require('display.pack')
require('cursors.pack')

class Button extends Window(){
  constructor(x,y,txt, func){
    super(x, y, 5, txt.length * 4)
    this.toExec = func
    clickFunctions.push(() => this.exec())
  }
  exec(){
    requestExecFunction(this.toExec, "")
  }
}
