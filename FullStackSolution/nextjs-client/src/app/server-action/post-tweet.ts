'use server'
export async function postTweet(formData:FormData) {
    const content = formData.get('content') as string; 
    console.log('Content:', content);
}