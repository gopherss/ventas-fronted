export interface BusinessModel {
    id_negocio?: number;
    nombre: string;
    propietario: string;
    direccion: string;
    telefono: string;
    estatus: boolean;
    id_categoria_negocio: number;
}

export interface BusinessCategoryModel {
    id_categoria_negocio: number;
    nombre: string;
}