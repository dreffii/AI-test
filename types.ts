
export interface RenderOptions {
  inputImage: File | null;
  referenceImage: File | null;
  viewAngle: string;
  aspectRatio: string;
  depthOfField: string;
  motionBlur: string;
  timeOfDay: string;
  weather: string;
  windStrength: string;
  interiorLights: string;
  activeReflection: string;
  renderStyle: string;
  siteContext: string;
  additionalSitePrompt: string;
  moodStyle: string;
  addFurniture: boolean;
  addVehicles: boolean;
  addPeople: boolean;
  addTrees: boolean;
  addStreetFurniture: boolean;
  addForegroundElements: boolean;
}