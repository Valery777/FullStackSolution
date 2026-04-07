"use server";

export async function longSubmitData(prevState: any, formData: FormData) {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;

    const user = { username, email, createdAt: new Date() };

    await new Promise(resolve => setTimeout(resolve, 1500));

    return `User ${username} submitted successfully`;
}