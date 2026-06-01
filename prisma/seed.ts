import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import process from 'process';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Admin123!', 10);
  const admin = await prisma.perfil.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      email: 'admin@admin.com',
      password_hash: passwordHash,
      nombre_completo: 'Administrador',
      rol: 'admin',
    },
  });
  console.log('✅ Admin creado:', admin.email);

  const clientesData = [
    { nombre_completo: 'Laura Martínez', email: 'laura@gmail.com', telefono: '3101234567', empresa: 'Creativa SAS' },
    { nombre_completo: 'Andrés Pérez', email: 'andres@outlook.com', telefono: '3209876543', empresa: 'Studio 4K' },
    { nombre_completo: 'Valentina Torres', email: 'vale@hotmail.com', telefono: '3154567890', empresa: 'Independiente' },
    { nombre_completo: 'Carlos Gómez', email: 'carlos@empresa.com', telefono: '3187654321', empresa: 'Gómez Films' },
    { nombre_completo: 'Sofía Ramírez', email: 'sofia@ramirez.co', telefono: '3112345678', empresa: 'SR Producciones' },
  ];

  const clientes = [];
  for (const c of clientesData) {
    const cliente = await prisma.cliente.upsert({
      where: { email: c.email },
      update: {},
      create: c,
    });
    clientes.push(cliente);
    console.log('✅ Cliente creado:', cliente.nombre_completo);
  }

  const servicios = [
    'Video Corporativo',
    'Fotografía de Producto',
    'Cobertura de Evento',
    'Contenido para Redes',
    'Documental Corto',
    'Video Musical',
    'Fotografía de Marca',
  ];

  const cotizacionesData = [
    { clienteIdx: 0, servicio: servicios[0], mensaje: 'Video corporativo de 3 minutos.', presupuesto: 2500000, diasOffset: -10, estado: 'aprobada' },
    { clienteIdx: 1, servicio: servicios[1], mensaje: 'Sesión de fotos para catálogo.', presupuesto: 800000, diasOffset: -7, estado: 'pendiente' },
    { clienteIdx: 2, servicio: servicios[2], mensaje: 'Cobertura de evento empresarial 8 horas.', presupuesto: 1500000, diasOffset: -5, estado: 'en_proceso' },
    { clienteIdx: 3, servicio: servicios[3], mensaje: 'Pack mensual para Instagram y TikTok.', presupuesto: 1200000, diasOffset: -3, estado: 'pendiente' },
    { clienteIdx: 4, servicio: servicios[4], mensaje: 'Documental de 15 minutos.', presupuesto: 4000000, diasOffset: -2, estado: 'aprobada' },
    { clienteIdx: 0, servicio: servicios[5], mensaje: 'Video musical para lanzamiento.', presupuesto: 3000000, diasOffset: -1, estado: 'en_proceso' },
    { clienteIdx: 1, servicio: servicios[6], mensaje: 'Sesión de branding personal.', presupuesto: 600000, diasOffset: 0, estado: 'pendiente' },
    { clienteIdx: 2, servicio: servicios[0], mensaje: 'Video institucional para web.', presupuesto: 1800000, diasOffset: -15, estado: 'rechazada' },
    { clienteIdx: 3, servicio: servicios[1], mensaje: 'Fotos de producto para e-commerce.', presupuesto: 1100000, diasOffset: -8, estado: 'aprobada' },
    { clienteIdx: 4, servicio: servicios[2], mensaje: 'Cobertura de lanzamiento 4 horas.', presupuesto: 900000, diasOffset: -6, estado: 'pendiente' },
    { clienteIdx: 0, servicio: servicios[3], mensaje: 'Contenido semanal 3 meses.', presupuesto: 2200000, diasOffset: -4, estado: 'en_proceso' },
    { clienteIdx: 1, servicio: servicios[4], mensaje: 'Mini documental responsabilidad social.', presupuesto: 3500000, diasOffset: -12, estado: 'aprobada' },
    { clienteIdx: 2, servicio: servicios[5], mensaje: 'Video clip animado artista independiente.', presupuesto: 1600000, diasOffset: -9, estado: 'pendiente' },
    { clienteIdx: 3, servicio: servicios[6], mensaje: 'Branding fotográfico para startup.', presupuesto: 750000, diasOffset: -11, estado: 'rechazada' },
    { clienteIdx: 4, servicio: servicios[0], mensaje: 'Video de capacitación interna.', presupuesto: 2000000, diasOffset: -13, estado: 'aprobada' },
  ];

  for (const c of cotizacionesData) {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + c.diasOffset + 30);
    await prisma.cotizacion.create({
      data: {
        cliente_id: clientes[c.clienteIdx].id,
        servicio: c.servicio,
        mensaje: c.mensaje,
        presupuesto_estimado: c.presupuesto,
        fecha_tentativa: fecha,
        estado: c.estado,
        asignado_a: admin.id,
      },
    });
    console.log(`✅ Cotización: ${c.servicio} - ${c.estado}`);
  }

  console.log('\n🎉 Seed completado');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });