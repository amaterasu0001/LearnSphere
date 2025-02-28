export const login = async (formData) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),  // Ensure formData includes role
    });

    return await response.json();
  } catch (error) {
    return error.response?.data || { message: "Login failed" };
  }
};
