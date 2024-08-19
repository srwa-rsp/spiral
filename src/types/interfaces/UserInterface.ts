export interface ResultData {
  id: number;
  user_id: number;
  stages: object;
  feedback: string;
  roadmap_vertical: string[];
  roadmap_horizontal: string[];
}


export interface UserRegister {
  name: string;
  email: string;
  password: string
}
export interface UserLogin {
  email: string;
  password: string
}

