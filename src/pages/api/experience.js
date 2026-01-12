import getCollecction from "@/services/firebase/crud/getCollecction";

export default async function handler(req, res) {
    try {
        const { result: data } = await getCollecction("experience");

        res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, code: 500, error: error.message });
    }
}
