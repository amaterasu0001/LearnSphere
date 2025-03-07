// export const signup = async (formData) => {
//   try {
//     const response = await fetch("http://localhost:5000/api/auth/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     return await response.json();
//   } catch (error) {
//     return error.response?.data || { message: "Signup failed" };
//   }
// };

export const signup = async (formData) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    // Check if the response is successful (status 200-299)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Signup failed");
    }

    // If the response is successful, return the parsed JSON
    return await response.json();
  } catch (error) {
    // Catch any error from fetch and handle it
    return { success: false, message: error.message || "Signup failed. Please try again." };
  }
};
