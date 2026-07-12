import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const org = await prisma.organization.create({
    data: { name: "Acme Corp", code: "ACME" },
  });

  const dept = await prisma.department.create({
    data: { name: "Engineering", code: "ENG", organizationId: org.id },
  });

  const employee = await prisma.employee.create({
    data: {
      employeeCode: "EMP001",
      firstName: "Shaswat",
      lastName: "Shukla",
      email: "shaswat@example.com",
      designation: "Developer",
      organizationId: org.id,
      departmentId: dept.id,
    },
  });

  const role = await prisma.role.create({
    data: { name: "manager" },
  });

  console.log("EMPLOYEE ID:", employee.id);
  console.log("ROLE ID:", role.id);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());