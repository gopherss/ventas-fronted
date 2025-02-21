export interface ProductCategoryModel {
    id_categoria_producto?: number;
    id_negocio?: number;
    nombre: string;
}

export interface ProductModel {
    id_producto?: number;
    nombre: string;
    descripcion: string;
    sku?: string;
    precio: number;
    stock: number;
    tipo_unidad: string;
    estatus?: boolean;
    fecha_expiracion?: Date;
    id_negocio?: number;
    createdBy?: number;
    id_categoria_producto?: number;
}

export interface ProductoModePagination extends ProductModel {
    categoriaProducto: {
        nombre: string,
    }
}