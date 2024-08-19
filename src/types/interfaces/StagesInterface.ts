export interface ChartData {
    name: string;
    value: number;
  }

  export interface StageData {
    id: number;
    name: string;
    tier: number;
    description: string;
    color: string;
    challenges: string;
    doing: {
      coping: string;
      needs: string;
      purpose: string;
    };
    being: {
      awareness: string;
      experience: string;
      affect: string;
    };
    thinking: {
      conceptions: string;
      knowledge: string;
      interpretation: string;
    };
  }