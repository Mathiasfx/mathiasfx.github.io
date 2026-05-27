declare module "three/examples/jsm/loaders/GLTFLoader" {
  import { LoadingManager, Loader, Group } from "three";
  import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

  export interface GLTF {
    scene: Group;
  }

  export class GLTFLoader extends Loader {
    constructor(manager?: LoadingManager);
    setDRACOLoader(loader: DRACOLoader): this;
    load(
      url: string,
      onLoad: (gltf: GLTF) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: unknown) => void
    ): void;
  }
}

declare module "three/examples/jsm/loaders/DRACOLoader" {
  import { LoadingManager, Loader } from "three";

  export class DRACOLoader extends Loader {
    constructor(manager?: LoadingManager);
    setDecoderPath(path: string): this;
    setDecoderConfig(config: { type?: string }): this;
    preload(): this;
    dispose(): void;
  }
}
