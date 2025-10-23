
import { GoogleGenAI, Modality } from "@google/genai";
import { RenderOptions } from '../types';
import { siteContextDescriptions } from '../data/siteContexts';

const fileToPart = async (file: File) => {
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = error => reject(error);
  });
  return {
    inlineData: {
      data: base64,
      mimeType: file.type,
    },
  };
};

export const renderWithAi = async (options: RenderOptions): Promise<string | null> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const { inputImage, referenceImage, ...creativeOptions } = options;

  if (!inputImage) {
    throw new Error("Input image is required for rendering.");
  }
  
  const parts: any[] = [];
  
  parts.push(await fileToPart(inputImage));
  
  if(referenceImage) {
    parts.push(await fileToPart(referenceImage));
  }

  // Build the detailed prompt
  const selectedObjects = [
    creativeOptions.addFurniture && "Furniture",
    creativeOptions.addVehicles && "Vehicles (Cars, Bikes)",
    creativeOptions.addPeople && "People",
    creativeOptions.addTrees && "Trees & Vegetation",
    creativeOptions.addStreetFurniture && "Street Furniture",
    creativeOptions.addForegroundElements && "Foreground Elements"
  ].filter(Boolean).join(', ');

  const cameraView = creativeOptions.viewAngle === "Default Angle" ? "Maintain same view as input" : creativeOptions.viewAngle;

  // Re-structured prompt for better clarity and to potentially avoid server errors.
  const textPrompt = `
Generate a highly detailed, ${creativeOptions.renderStyle} architectural rendering based on the provided image(s) and instructions.

**Primary Goal:** Preserve the building’s original forms and proportions from the first input image. Focus on realistic textures, materials, lighting, and perspective without adding new design elements to the building itself.

**Image Instructions:**
- The first image is the base building structure.
${referenceImage ? '- The second image is a style reference. Adapt its style, lighting, and materials to the base structure.' : '- Render the base structure with realistic textures and materials based on what is visible in the input image (e.g., concrete, glass, wood, metal).'}

**Creative Directives:**
- **Aspect Ratio:** ${creativeOptions.aspectRatio}
- **View / Camera Angle:** ${cameraView}
- **Depth of Field:** ${creativeOptions.depthOfField}
- **Motion Blur:** ${creativeOptions.motionBlur}
- **Time of Day:** ${creativeOptions.timeOfDay}
- **Weather:** ${creativeOptions.weather}
- **Wind Strength:** ${creativeOptions.windStrength}
- **Interior Lights:** ${creativeOptions.interiorLights}
- **Active Reflection:** ${creativeOptions.activeReflection}
- **Render Style:** ${creativeOptions.renderStyle}
- **Mood / Style:** ${creativeOptions.moodStyle}
- **Site Context:** ${siteContextDescriptions[creativeOptions.siteContext as keyof typeof siteContextDescriptions] || creativeOptions.siteContext}. ${creativeOptions.additionalSitePrompt}
- **Objects to include:** ${selectedObjects || 'none'}.
  `.trim();

  parts.push({ text: textPrompt });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: parts },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
      }
    }
    return null;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate image with Gemini API.");
  }
};