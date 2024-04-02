export interface APIResponse {
  success: boolean;
  message?: string;
  result?: any;
  error?: any;
}

export interface Exercise {
  id: string;
  name: string;
  muscle: string;
  image: string;
}

export interface Performance {
  id: string | number;
  reps: number;
  weight: number;
  estimated1RM: number;
  createdAt: Date;
}