export const Profile = async (email) => {
  try {
    const response = await fetch(`http://localhost:5000/api/auth/profile?email=${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    return await response.json();
  } catch (error) {
    return error.response?.data || { message: "Failed to fetch profile" };
  }
};
