import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey)

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