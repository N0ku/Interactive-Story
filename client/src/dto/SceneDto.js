// SceneDTO.js
export class SceneDTO {
  constructor({ _id, Actions, Camera, Dialogs, Paths, Plan }) {
    this.id = _id;
    this.action = new ActionDTO(Actions);
    this.camera = Camera.map((cam) => new CameraDTO(cam));
    this.dialogs = Dialogs;
    this.paths = Paths.map((path) => new PathDTO(path));
    this.plan = Plan ? Plan.map((plan) => new PlanDTO(plan)) : [];
  }
}
// ActionDTO.js
class ActionDTO {
  constructor({ VitrineMagasin, Car }) {
    this.VitrineMagasin = {
      observe: VitrineMagasin.observe,
      interact: VitrineMagasin.interact,
      fight: VitrineMagasin.fight,
    };
    this.Car = {
      observe: Car.observe,
      interact: Car.interact,
      fight: Car.fight,
    };
  }
}
// CameraDTO.js
class CameraDTO {
  constructor({ mode, pos, zoom }) {
    this.mode = mode;
    this.pos = pos;
    this.zoom = zoom;
  }
}

// PathDTO.js
class PathDTO {
  constructor({ animIndex, pos, speed }) {
    this.animIndex = animIndex;
    this.pos = pos;
    this.speed = speed;
  }
}

// PlanDTO.js
class PlanDTO {
  constructor({ followObject, timeToStop, camera, path }) {
    this.followObject = followObject;
    this.timeToStop = timeToStop;
    this.camera = new CameraDTO(camera);
    this.path = new PathDTO(path);
  }
}
