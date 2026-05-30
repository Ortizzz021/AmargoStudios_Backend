export interface CreateClienteDto {
  nombre_completo: string;
  email: string;
  telefono?: string;
  empresa?: string;
}

export interface UpdateClienteDto {
  nombre_completo?: string;
  email?: string;
  telefono?: string;
  empresa?: string;
}

export interface ClienteFilterDto {
  nombre?: string;
  empresa?: string;
  page?: string;
  limit?: string;
}
