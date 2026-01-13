import matrixData from "./pbom_data/matrix.json";
import { FlatTechniques, OscarMatrix, Tactic, Technique } from "./types";

let flatTechniques: FlatTechniques = {};

const getOscarMatrix = (): OscarMatrix => {
  return Object.assign({}, matrixData as OscarMatrix);
};

export const getFlatTechniques = (): FlatTechniques => {
  if (Object.keys(flatTechniques).length === 0) {
    const matrix = getOscarMatrix();
    flatTechniques = Object.keys(matrix).reduce(
      (flatTechnique: FlatTechniques, tacticName: string) => {
        const tactic: Tactic = matrix[tacticName];

        tactic.techniques.forEach((technique: Technique) => {
          flatTechnique[technique.id] = { ...technique, tacticName };
        });

        return flatTechnique;
      },
      {}
    );
  }

  return Object.assign({}, flatTechniques);
};

const getOscarTechnique = (techniqueId: string): Technique => {
  const matrix = getFlatTechniques();
  return matrix[techniqueId];
};

export { getOscarMatrix, getOscarTechnique };
