"use server";
import { actionClient } from "@/lib/action-client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { returnValidationErrors } from "next-safe-action";
import { headers } from "next/headers";
import { z } from "zod";

const inputSchema = z.object({
  serviceId: z.string(), // aceita ULID/UUID
  date: z.preprocess((arg) => (typeof arg === "string" ? new Date(arg) : arg), z.date()),
});

export const createBooking = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput: { serviceId, date } }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      return returnValidationErrors(inputSchema, {
        _errors: ["Usuário não logado, favor realizar o login para fazer o agendamento!"],
      });
    }
    const service = await prisma.barbershopService.findUnique({
      where: {
        id: serviceId,
      },
    });
    if (!service) {
      return returnValidationErrors(inputSchema, {
        _errors: ["Service not found"],
      });
    }
    // verificar se já existe agendamento para essa data
    const existingBooking = await prisma.booking.findFirst({
      where: {
        barbershopId: service.barbershopId,
        date,
      },
    });
    if (existingBooking) {
      console.error("Já existe um agendamento para essa data.");
       return returnValidationErrors(inputSchema, {
        _errors: ["Já existe um agendamento para essa data."],
      });
    }
    const booking = await prisma.booking.create({
      data: {
        serviceId,
        date,
        userId: session.user.id,
        barbershopId: service.barbershopId,
      },
    });
    return booking;
  });