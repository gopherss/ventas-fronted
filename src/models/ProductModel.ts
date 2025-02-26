export interface ProductCategoryModel {
    id_categoria_producto?: number;
    id_negocio?: number;
    nombre: string;
}

// Modelo para cada producto individual
export interface ProductModel {
    id_producto?: number;
    nombre: string;
    descripcion: string;
    sku?: string | null;
    precio: number;
    stock: number;
    tipo_unidad: string;
    estatus?: boolean;
    fecha_expiracion?: Date | null;
    id_negocio?: number;
    createdBy?: number;
    id_categoria_producto?: number;
    categoriaProducto?: {
        nombre: string,
    };
    createdAt?: string;
    updatedAt?: string;
}

// Interfaz para la respuesta paginada de productos
export interface ProductsPaginationResponse {
    total: number;
    page: number;
    limit: number;
    data: ProductModel[];
}