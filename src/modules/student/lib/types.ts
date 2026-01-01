import type {IUser} from "@/modules/auth/lib/types.ts";

export interface IStudent extends IUser{
  admissionNumber: string
}