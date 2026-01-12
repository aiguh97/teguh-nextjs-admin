import getCollecction from "@/services/firebase/crud/getCollecction";
import getDocument from "@/services/firebase/crud/getDocument";

export default async function handler(req, res) {
    try {
        if(Object.keys(req.query).length === 0) {
            const { result: data } = await getCollecction("skill");
            res.status(200).json(data);

        } else if (req.query.skill[0]) {
            const { result: data } = await getDocument("skill", req.query.skill[0]);
            res.status(200).json(data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, code: 500, error: error.message });
    }

}
