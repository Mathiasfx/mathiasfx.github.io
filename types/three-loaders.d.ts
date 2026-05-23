declare module "three/examples/jsm/loaders/GLTFLoader" {
  import { LoadingManager, Loader, Group } from "three";

  export interface GLTF {
    scene: Group;
  }

  export class GLTFLoader extends Loader {
    constructor(manager?: LoadingManager);
    load(
      url: string,
      onLoad: (gltf: GLTF) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: unknown) => void
    ): void;
  }
}
