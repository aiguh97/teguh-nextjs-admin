import getCollecction from "@/services/firebase/crud/getCollecction";
import getDocument from "@/services/firebase/crud/getDocument";
import { getFile } from "@/services/firebase/fileHandler";

export default async function handler(req, res) {
    try {
        if(Object.keys(req.query).length === 0) {
            const { result: data } = await getCollecction("certificate");

            await Promise.all(data.map(async (doc) => {
                doc.image = await getFile(doc.image);
            }));

            res.status(200).json(data);
        } else if (req.query.certificate[0]) {
            const { result: data } = await getDocument("certificate", req.query.certificate[0]);
            data.image = await getFile(data.image);
            res.status(200).json(data);
        } 

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, code: 500, error: error.message });
    }
}
