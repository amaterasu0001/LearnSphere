import mongoose from "mongoose";

const tutorRequestSchema = new mongoose.Schema(
  {
    studentEmail: { type: String, required: true },
    studentName: { type: String, required: true },
    district: { type: String, default: null },
    area: { type: String, default: null },
    medium: { type: String, default: null },
    studentClass: { type: String, default: null },
    subjects: { type: [String], default: [] },
    schoolName: { type: String, default: null },
    daysPerWeek: { type: String, default: "3 days/week" },
    studentGender: { type: String, default: "Any Gender" },
    salaryRange: { type: String, default: "Negotiable" },
    tutorGender: { type: String, default: "Any Gender" },
    address: { type: String, default: null },
    mobile: { type: String, default: null },
  },
  { timestamps: true }
);

const TutorRequest = mongoose.model("TutorRequest", tutorRequestSchema);
export default TutorRequest;
