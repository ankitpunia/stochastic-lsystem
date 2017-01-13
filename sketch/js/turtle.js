import sketch from './sketch';

export default class Turtle {
  constructor(s, l, t) {
    this.todo = s;
    this.len = l;
    this.theta = t;
    this.stalkMaxLen = this.len * 0.2;
  }

  draw() {
    sketch.stroke(84, 78, 57);
    for (let i = 0; i < this.todo.length; i += 1) {
      const c = this.todo.charAt(i);
      if (c === 'F' || c === 'G') {
        const sw = sketch.map(this.len, 1, sketch.height / 25, 1, 3);
        sketch.strokeWeight(sw);
        sketch.line(0, 0, this.len, 0);
        sketch.translate(this.len, 0);
      } else if (c === '+') {
        sketch.rotate(this.theta);
      } else if (c === '-') {
        sketch.rotate(-this.theta);
      } else if (c === '[') {
        sketch.push();
        this.len *= 2 / 3;
      } else if (c === ']') {
        if (this.len <= this.stalkMaxLen) {
          // Draw leaf
          sketch.noStroke();
          sketch.fill(102, 148, 81);
          sketch.ellipse(0, 0, 10, 4);
        }
        sketch.pop();
        this.len *= 3 / 2;
      }
    }
  }

  setToDo(s) {
    this.todo = s;
  }
}
