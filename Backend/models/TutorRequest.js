import mongoose from "mongoose";

const tutorRequestSchema = new mongoose.Schema(
  {
    studentEmail: { type: String, required: true },
    studentName: { type: String, required: true },
    district: { type: String, default: null },
    instituteName: { type: String, default: null },
    area: { type: String, default: null },
    studentClass: { type: String, default: null },
    subjects: { type: [String], default: [] },
    preferredstyles: { type: String, default: null },
    daysPerWeek: { type: String, default: null },
    studentGender: { type: String, default: null },
    salaryRange: { type: String, default: null },
    tutorGender: { type: String, default: null },
    mothersNumber: { type: String, default: null },
    fathersNumber: { type: String, default: null },
    address: { type: String, default: null },
    mobile: { type: String, default: null },
    studentDetails: { type: String, default: null },
  },
  { timestamps: true }
);

const TutorRequest = mongoose.model("TutorRequest", tutorRequestSchema);
export default TutorRequest;
