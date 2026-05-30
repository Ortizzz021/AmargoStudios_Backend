import { IClienteRepository } from '../../../domain/repositories/IClienteRepository';
import { ICotizacionRepository } from '../../../domain/repositories/ICotizacionRepository';
import { SubmitContactDto } from '../../dtos/contact.dto';
import { CotizacionWithRelations } from '../../../domain/entities/Cotizacion';

export class SubmitContactUseCase {
  constructor(
    private clienteRepository: IClienteRepository,
    private cotizacionRepository: ICotizacionRepository,
  ) {}

  async execute(dto: SubmitContactDto): Promise<CotizacionWithRelations> {
    let cliente = await this.clienteRepository.findByEmail(dto.email);

    if (!cliente) {
      cliente = await this.clienteRepository.create({
        nombre_completo: dto.nombre_completo,
        email: dto.email,
        telefono: dto.telefono || null,
        empresa: null,
      });
    } else {
      cliente = await this.clienteRepository.update(cliente.id, {
        nombre_completo: dto.nombre_completo,
        telefono: dto.telefono || cliente.telefono,
      });
    }

    return this.cotizacionRepository.create({
      cliente_id: cliente.id,
      servicio: dto.servicio,
      mensaje: dto.mensaje,
      presupuesto_estimado: null,
      fecha_tentativa: null,
    });
  }
}
