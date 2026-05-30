export interface Perfil {
  id: string;
  email: string;
  password_hash: string;
  nombre_completo: string;
  rol: string;
  avatar_url: string | null;
  fecha_creacion: Date;
}

export interface PerfilPublic {
  id: string;
  email: string;
  nombre_completo: string;
  rol: string;
  avatar_url: string | null;
  fecha_creacion: Date;
}
