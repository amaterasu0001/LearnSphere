import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    bachelorInstitute: String,
    bachelorDegree: String,
    bachelorMajor: String,
    hscInstitute: String,
    hscDegree: String,
    hscMajor: String,
    sscInstitute: String,
    sscDegree: String,
    sscMajor: String,
    additionalNumber: String,
    address: String,
    gender: String,
    dateOfBirth: String,
    religion: String,
    birthCertificateNo: String,
    nationality: String,
    facebookProfileLink: String,
    linkedInProfileLink: String,
    fathersName: String,
    fathersNumber: String,
    mothersName: String,
    mothersNumber: String,
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
