class Mouse {
  constructor() {
    this.tools = { // Since we don't have enums...
      PEN: 'PEN',
      DISTANCE: 'DISTANCE'
    };
    this.selectedTool = this.tools.PEN;
    this.click = false;
    this.move = false;
    this.pos = {
      x: 0,
      y: 0
    };
    this.previousPos = {
      x: 0,
      y: 0
    };
  }
  down() {
    this.click = true;
  }
  up() {
    this.click = false;
  }
  drag(e, canvas) {
    // normalize mouse position to range 0.0 - 1.0
    this.pos.x = (e.pageX - e.target.offsetLeft) / canvas.element.width;
    this.pos.y = (e.pageY - e.target.offsetTop) / canvas.element.height;
    this.move = true;
  }
  shouldDraw() {
    return this.click && this.move && this.previousPos && this.selectedTool;
  }
  changeTool(newTool) {
    this.selectedTool = newTool == this.selectedTool ? undefined : newTool;
  }
}

module.exports = Mouse;
