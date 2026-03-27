import type { BookingAllDto, BookingCreateDto, BookingDetailDto , BookingUpdateDto } from "@/dtos/booking.dto";
import db from "@/lib/db";

export async function getAllBooking() {
  return db.booking.findMany();
};

export async function getBookingById(id: string) {
  return db.booking.findUnique({
    where: { 
      id: id 
    },
    select: {
      id: true,
      date: true,
      startTime: true,
      endTime: true,
      
      space: {
        select: {
          name: true,
          type: true,
          description: true,
          capacity: true
        }
      }
    }
  });
}

export async function createBooking(data: BookingCreateDto, userId: string) {
  return db.booking.create({
    data: {

      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      // qui
      user: {
        connect: { id: userId }
      },
      // ou
      space: {
        connect: { id: data.spaceId }
      }
    }
  });
}

export async function updateBooking(data: BookingUpdateDto, userId: string) {
  return db.booking.update({
  
    where: { 
      id: data.id,
      userId: userId 
    },
 
    data: {
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
    }
  });
}

export async function deleteBooking(id: string, userId: string) {

  const result = await db.booking.deleteMany({
    where: {
      id: id,
      userId: userId 
    }
  });

  return result.count > 0;
}