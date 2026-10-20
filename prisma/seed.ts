import { PrismaClient } from '@prisma/client';
import { INITIAL_PETS } from '../src/data/mockPets';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed de Callejeros Río IV...');

  for (const pet of INITIAL_PETS) {
    await prisma.pet.upsert({
      where: { id: pet.id },
      update: {},
      create: {
        id: pet.id,
        name: pet.name,
        status: pet.status,
        species: pet.species,
        ageCategory: pet.ageCategory,
        ageApprox: pet.ageApprox,
        size: pet.size,
        sex: pet.sex,
        sociability: pet.sociability,
        healthState: pet.healthState,
        notes: pet.notes,
        goodWithKids: pet.goodWithKids,
        goodWithPets: pet.goodWithPets,
        location: pet.location,
        description: pet.description,
        imageUrl: pet.imageUrl,
        isCastrated: pet.isCastrated,
        isVaccinated: pet.isVaccinated,
        isFavorite: pet.isFavorite ?? false,
      },
    });
  }

  console.log(`Seed completado: ${INITIAL_PETS.length} mascotas registradas.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
