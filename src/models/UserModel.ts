export type Role = 'ROOT' | 'ADMIN' | 'USER';

interface Negocio {
    nombre: string;
}

export interface UserModel {
    id_usuario?: number;
    nombre: string;
    email: string;
    role: Role;
    estatus?: boolean;
    id_negocio: number;
    negocio?: Negocio;
}

export interface UserRegisterModel extends Omit<UserModel, 'estatus' | 'negocio'> {
    password: string;
}

export interface UserUpdateModel extends Omit<UserModel, 'negocio'> {
    id_usuario?: number
    password?: string;
    estatus: boolean;
}
