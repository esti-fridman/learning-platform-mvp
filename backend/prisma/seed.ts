import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // קטגוריה  - שפות
  const Languages = await prisma.category.upsert({
    where: { name: "Languages" },
    update: {},
    create: { name: "Languages" },
  });

  // תת-קטגוריה לשפות
  await prisma.subcategory.upsert({
    where: { name_categoryId: { name: "English", categoryId: Languages.id } },
    update: {},
    create: { name: "English", categoryId: Languages.id },
  });

  await prisma.subcategory.upsert({
    where: { name_categoryId: { name: "Hebrew", categoryId: Languages.id } },
    update: {},
    create: { name: "Hebrew", categoryId: Languages.id },
  });

  await prisma.subcategory.upsert({
    where: { name_categoryId: { name: "Yiddish", categoryId: Languages.id } },
    update: {},
    create: { name: "Yiddish", categoryId: Languages.id },
  });

  await prisma.subcategory.upsert({
    where: { name_categoryId: { name: "French", categoryId: Languages.id } },
    update: {},
    create: { name: "French", categoryId: Languages.id },
  });

  // קטגוריה  - מתמטיקה
  const math = await prisma.category.upsert({
    where: { name: "Math" },
    update: {},
    create: { name: "Math" },
  });

  // תתי-קטגוריות למתמטיקה
  await prisma.subcategory.upsert({
    where: { name_categoryId: { name: "Algebra", categoryId: math.id } },
    update: {},
    create: { name: "Algebra", categoryId: math.id },
  });

  await prisma.subcategory.upsert({
    where: { name_categoryId: { name: "Geometry", categoryId: math.id } },
    update: {},
    create: { name: "Geometry", categoryId: math.id },
  });

  await prisma.subcategory.upsert({
    where: { name_categoryId: { name: "Analysis", categoryId: math.id } },
    update: {},
    create: { name: "Analysis", categoryId: math.id },
  });

    // קטגוריה  - תכנות
    const Programming = await prisma.category.upsert({
        where: { name: "Programming" },
        update: {},
        create: { name: "Programming" },
      });
    
      // תתי-קטגוריות לתכנות
      await prisma.subcategory.upsert({
        where: { name_categoryId: { name: "java", categoryId: Programming.id } },
        update: {},
        create: { name: "java", categoryId: Programming.id },
      });

      await prisma.subcategory.upsert({
        where: { name_categoryId: { name: "Python", categoryId: Programming.id } },
        update: {},
        create: { name: "Python", categoryId: Programming.id },
      });

      await prisma.subcategory.upsert({
        where: { name_categoryId: { name: "React", categoryId: Programming.id } },
        update: {},
        create: { name: "React", categoryId: Programming.id },
      });

      await prisma.subcategory.upsert({
        where: { name_categoryId: { name: "Node.js", categoryId: Programming.id } },
        update: {},
        create: { name: "Node.js", categoryId: Programming.id },
      });
    
}

main()
  .then(() => {
    console.log("✅ Seed data inserted");
  })
  .catch((e: any) => {
    console.error("❌ Error while seeding:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
