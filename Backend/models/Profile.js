import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true }, // ✅ Ensure name is required
    location: { type: String, default: null },
    address: { type: String, default: null },
    gender: { type: String, default: null },
    additionalNumber: { type: String, default: null },
    dateOfBirth: { type: String, default: null },
    nationality: { type: String, default: null },
    fathersName: { type: String, default: null },
    mothersName: { type: String, default: null },
    religion: { type: String, default: null },
    birthCertificateNo: { type: String, default: null },
    facebookProfileLink: { type: String, default: null },
    linkedInProfileLink: { type: String, default: null },
    fathersNumber: { type: String, default: null },
    mothersNumber: { type: String, default: null },
    bachelorInstitute: String,
    bachelorDegree: String,
    bachelorMajor: String,
    hscInstitute: String,
    hscDegree: String,
    hscMajor: String,
    sscInstitute: String,
    sscDegree: String,
    sscMajor: String,
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
