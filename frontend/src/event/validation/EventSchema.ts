import { z } from "zod";

export const eventSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  category: z.string().min(1, "La categoría es obligatoria"),
  type: z.enum(["Single", "Recurring"], {
    required_error: "El tipo de evento es obligatorio",
    invalid_type_error: "Tipo de evento inválido",
  }),
  dateString: z.string().min(1, "La fecha es obligatoria"),
  startTime: z.string().min(1, "La hora de inicio es obligatoria"),
  endTime: z.string().min(1, "La hora de finalización es obligatoria"),
  location: z.string().min(1, "La ubicación es obligatoria"),
  description: z.string().min(1, "La descripción es obligatoria"),
});

export type EventData = z.infer<typeof eventSchema>;
