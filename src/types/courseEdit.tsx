import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Regex patterns
const courseNumberPattern = /^\d+(-\d+)?$/;
const meetingPattern = /^$|^((M|Tu|W|Th|F)+)\s+\d{1,2}:\d{2}-\d{1,2}:\d{2}$/;

// Zod schema
export const courseEditSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),

  term: z.enum(["Fall", "Winter", "Spring", "Summer"], {
    message: "Term must be Fall, Winter, Spring, or Summer",
  }),

  number: z.string().regex(
    courseNumberPattern,
    "Course number must be like 213 or 213-2"
  ),

  meets: z.string().regex(
    meetingPattern,
    "Must contain days and start-end, e.g., MWF 12:00-13:20"
  ),
});

// Type for the form
export type CourseEditSchema = z.infer<typeof courseEditSchema>;

// Resolver for React Hook Form
export const courseEditResolver = zodResolver(courseEditSchema);