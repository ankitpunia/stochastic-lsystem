// In order to suppress the ESLint errors (Should only be used in the main sketch.js file)
/* eslint new-cap: ["error", { "newIsCapExceptions": ["p5"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-env browser */

// Import modules
import p5 from 'p5';
import Rule from './rule';
import LSystem from './lsystem';
import Turtle from './turtle';

export default new p5((sketch) => {
  let lsystem;
  let turtle;

  sketch.setup = () => {
    sketch.createCanvas(window.innerWidth, window.innerHeight);
    sketch.frameRate(10);

    const ruleset = [];
    ruleset[0] = new Rule('F', 'FF+[+F-F-F]-[-F+F+F]', 0.25);
    ruleset[1] = new Rule('F', 'FF-[-F+F+F]+[+F-F-F]', 0.25);
    ruleset[2] = new Rule('F', 'F-[+F]+[-F]', 0.25);
    ruleset[3] = new Rule('F', 'F-[-F+F]+[+F-F]', 0.25);
    lsystem = new LSystem('F', ruleset);
    turtle = new Turtle(lsystem.sentence, sketch.height / 25, sketch.radians(25));
  };

  sketch.draw = () => {
    sketch.background(255);

    sketch.fill(0, 0, 0, 64);
    sketch.strokeWeight(0);
    sketch.textSize(10);
    sketch.textAlign(sketch.CENTER);
    sketch.textFont('monospace');
    sketch.text('Click mouse to make the tree grow\n---\nPress \'space\' to reset', sketch.width / 2, 50);

    sketch.translate(sketch.width / 2, sketch.height);
    sketch.rotate(-Math.PI / 2);
    turtle.draw();
  };

  let counter = 0;

  sketch.mousePressed = () => {
    if (counter < 5) {
      sketch.push();
      lsystem.generate();
      turtle.setToDo(lsystem.sentence);
      sketch.pop();
      counter += 1;
    }
  };

  sketch.keyPressed = () => {
    if (sketch.key === ' ') {
      lsystem.sentence = 'F';
      lsystem.generation = 0;
      turtle.setToDo(lsystem.sentence);
      counter = 0;
    }
  };
});
