import firebase_app from "@/services/firebase/config";
import getCollecction from "@/services/firebase/crud/getCollecction";
import getDocument from "@/services/firebase/crud/getDocument";
import { getFile } from "@/services/firebase/fileHandler";
import { collection, getDocs,  getFirestore, orderBy, query, where } from "firebase/firestore";

const db = getFirestore(firebase_app)

export default async function handler(req, res) {
    try {

        if (Object.keys(req.query).length === 0) {
            let data = []
            const q = query(collection(db, 'portfolio'),where('isHidden', 'in', [false, null]), orderBy('isFeatured', 'desc'),orderBy('order' , 'asc') ); // Mengurutkan data berdasarkan timestamp secara menurun
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id });
            });
            await Promise.all(data.map(async (doc) => {
                doc.thumbnail = await getFile(doc.thumbnail);
            }));

            res.status(200).json(data);
        } else if (req.query.portfolio[0]) {
            const { result: portfolioItem } = await getDocument("portfolio", req.query.portfolio[0], true, 'thumbnail', true);

            // Fetch icons for each skill
            if (portfolioItem.skill && portfolioItem.skill.length > 0) {
                const icons = await Promise.all(portfolioItem.skill.map(async (skillId) => {
                    const { result: skillData } = await getDocument("skill", skillId.value);
                    return { icon: skillData.icon, name: skillData.name };
                }));
                portfolioItem.skill = icons;
            }
            portfolioItem.thumbnail = await getFile(portfolioItem.thumbnail);
            res.status(200).json(portfolioItem);
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, code: 500, error: error.message });
    }
}
