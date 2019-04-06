class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while(currentVampire.creator){
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    let ret = null;
    if (this.name === name){
      ret = this;
    }
    for (let child of this.offspring){
      let childName = child.vampireWithName(name);
      if (childName){
        ret = childName
      }
    }
    return ret;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let total = 0;
    for (let child of this.offspring){
      total += child.totalDescendents + 1
    }
    return total;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millennials = [];
    if (this.yearConverted >= 1980){
      millennials.push(this)
    }
    for (let child of this.offspring){
      millennials = [...millennials, ...child.allMillennialVampires];
    }
    // console.log(millennials)
    return millennials;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if (this === vampire || this.creator === null){
      return this;
    } else if (this.isMoreSeniorThan(vampire)){
      return vampire.creator.closestCommonAncestor(this) 
    } else{
      return this.creator.closestCommonAncestor(vampire);
    }
  }
}

module.exports = Vampire;

