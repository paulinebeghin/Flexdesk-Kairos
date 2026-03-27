import db from "@/lib/db";
import type { SpaceAllSchema, SpaceDetailSchema } from "@/dtos/space.dto";

export async function getAllSpaces() {
  return db.space.findMany();
};

export async function getSpacesById(id : string) {
  return db.space.findUnique({
    where:{id : id },
    select:{id: true,name : true, type : true, description : true, capacity : true }
  });
};