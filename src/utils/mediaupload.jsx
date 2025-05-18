import { createClient } from "@supabase/supabase-js"

const url = "https://gpfvqdogirmcmayxfjhn.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwZnZxZG9naXJtY21heXhmamhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NjUxMDAsImV4cCI6MjA2MjQ0MTEwMH0.E-xAIVBYI6PAs78SieyiBmadOVH9QOJgDl3lNWpjd5w"

const supabase = createClient(url, key)

export default function mediaUpload(file) {

    const mediaUploadPromise = new Promise(
        (resolve, reject) => {

            if (file == null) {
                reject("No file selected")
                return
            }

            const timestamp = new Date().getTime()
            const newName = timestamp + file.name

            supabase.storage.from("images").upload(newName, file, {
                upsert: false,
                cacheControl: "3600"
            }).then(() => {
                const publicUrl = supabase.storage.from("images").getPublicUrl(newName).data.publicUrl
                resolve(publicUrl)
            }).catch(
                () => {
                    reject("Error occured in supabase connection")
                }
            )
        }
    )

    return mediaUploadPromise

}