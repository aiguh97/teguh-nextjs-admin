import getDocument from "@/services/firebase/crud/getDocument";

export default async function handler(req, res) {
    const { id } = req.query;
    const { result } = await getDocument("skills", id);
    res.status(200).json({status: true,code: 200, data});
}