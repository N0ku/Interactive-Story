
export class ParticleConstructor{
    constructor(basicCoordonates, numParticles, color) {
        this.basicCoordonates = basicCoordonates;
        this.aleatoryCoordonates = [];
        this.numParticles = numParticles;
        this.color = color;
    
        for (let i = 0; i < this.numParticles; i++) {
          this.addCoordonnate(basicCoordonates.x, basicCoordonates.y, basicCoordonates.z);
        }
    }

    addCoordonnate(x, y, z) {
        const coord = new Coordonates(x, y, z).randomWithRange(0,10);
        this.aleatoryCoordonates.push(coord);
    } 
}

class Coordonates{
    constructor(x,y,z){
        this.x = x;
        this.y = y;
        this.z = z;
    }
    get x(){
        return this._x;
    }
    set x(value){
        this._x = value;
    }
    get y(){
        return this._y;
    }
    set y(value){
        this._y = value;
    }
    get z(){
        return this._z;
    }
    set z(value){
        this._z = value;
    }

    randomWithRange(min, max) {
        const range = max - min;
        this.x = min + Math.random() * range;
        this.y = min + Math.random() * range;
        this.z = min + Math.random() * range;
        return this;
      }
}

