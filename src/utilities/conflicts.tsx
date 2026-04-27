import { type Course } from "../types/Course";

export function parseMeeting(meeting: string): { days: string[], start: number, end: number } | null {
    if (!meeting.trim()) return null;
    const parts = meeting.split(' ');
    if (parts.length !== 2) return null;
    const [daysStr, timeStr] = parts;
    const days = daysStr.split('').filter(d => 'MTuWThF'.includes(d));
    if (days.length === 0) return null;
    const timeParts = timeStr.split('-');
    if (timeParts.length !== 2) return null;
    const start = parseTime(timeParts[0]);
    const end = parseTime(timeParts[1]);
    if (start >= end) return null;
    return { days, start, end };
}

function parseTime(time: string): number {
    const [h, m] = time.split(':').map(Number);
    if (isNaN(h) || isNaN(m)) return -1;
    return h * 60 + m;
}

export function coursesConflict(course1: Course, course2: Course): boolean {
    if (course1.term !== course2.term) return false;
    const m1 = parseMeeting(course1.meets);
    const m2 = parseMeeting(course2.meets);
    if (!m1 || !m2) return false;
    const commonDays = m1.days.filter(d => m2.days.includes(d));
    if (commonDays.length === 0) return false;
    return !(m1.end <= m2.start || m2.end <= m1.start);
}

export function getConflictingCourses(courses: Record<string, Course>, selectedIds: string[]): Record<string, string[]> {
    const conflicts: Record<string, string[]> = {};
    for (const [id, course] of Object.entries(courses)) {
        const conflicting = selectedIds.filter((sid) => {
            const selectedCourse = courses[sid];
            return selectedCourse ? coursesConflict(course, selectedCourse) : false;
        });
        conflicts[id] = conflicting;
    }
    return conflicts;
}  
