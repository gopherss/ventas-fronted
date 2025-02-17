export interface ProductCategoryModel {
    id_categoria_producto?: number;
    id_negocio?: number;
    nombre: string;
}

export interface ProductModel {
    id_producto?: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    tipo_unidad: string;
    estatus: boolean;
    id_negocio?: number;
    createdBy: number;
    id_categoria_producto?: number;
}

export interface ProductUpdateModel extends ProductModel {
    sku?: string;
    fecha_expiracion?: Date;
}
