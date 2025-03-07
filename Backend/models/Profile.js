import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true }, // ✅ Ensure name is required
    role: { type: String, required: true, enum: ["student", "tutor"] }, // ✅ Add role to differentiate

    // Common Fields (for both students & tutors)
    location: { type: String, default: null },
    address: { type: String, default: null },
    gender: { type: String, default: null },
    dateOfBirth: { type: String, default: null },
    nationality: { type: String, default: null },
    fathersName: { type: String, default: null },
    mothersName: { type: String, default: null },
    religion: { type: String, default: null },
    additionalNumber: { type: String, default: null },
    facebookProfileLink: { type: String, default: null },
    linkedInProfileLink: { type: String, default: null },

    // 🔵 Tutor-Specific Fields
    bachelorInstitute: String,
    bachelorDegree: String,
    bachelorMajor: String,
    hscInstitute: String,
    hscDegree: String,
    hscMajor: String,
    sscInstitute: String,
    sscDegree: String,
    sscMajor: String,

    // 🟢 Student-Specific Fields
    studentGrade: { type: String, default: null }, // e.g., "Class 10", "HSC 2nd Year"
    preferredSubjects: { type: [String], default: [] }, // Array of subjects
    parentContact: { type: String, default: null },
    schoolName: { type: String, default: null },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
