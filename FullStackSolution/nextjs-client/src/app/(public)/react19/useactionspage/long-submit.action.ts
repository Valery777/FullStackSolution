"use server";

export async function longSubmitData(prevState: any, formData: FormData) {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;

    // Convert to real object
    const user = { username, email };

    // Example: validate
    if (!email.includes("@")) {
        return {
            message: "Invalid email address",
            sentObject: user
        };
    }

    // Example: simulate saving to database
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Example: log on server
    console.log("Saving user:", user);

    // Return structured data to client
    return {
        message: `User ${username} saved successfully`,
        sentObject: user
    };
}