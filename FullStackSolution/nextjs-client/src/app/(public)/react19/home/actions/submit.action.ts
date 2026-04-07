"use server"

export const submitData = async (userData: FormData) => {

    const user = {

        username: userData.get('username')?.toString() || '',
        email: userData.get('email')?.toString() || '',
    }

    console.log('UserData', user);

}