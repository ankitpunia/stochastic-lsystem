export default class Rule {
  constructor(predecessor, successor, probability) {
    this.predecessor = predecessor;
    this.successor = successor;
    this.probability = probability || 1;
  }
}
