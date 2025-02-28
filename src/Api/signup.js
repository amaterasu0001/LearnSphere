export const signup = async (formData) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    return await response.json();
  } catch (error) {
    return error.response?.data || { message: "Signup failed" };
  }
};
// export const signup = async (formData) => {
//   console.log("Sending data to backend:", formData); // Debug log

//   const response = await fetch("http://localhost:5000/api/auth/signup", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(formData),
//   });

//   const data = await response.json();
//   console.log("Signup API Response:", data); // Debug log

//   return data;
// };
