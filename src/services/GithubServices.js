import axios from "axios";

export const getLastCommitDate = async () => {
    try {
        const response = await axios.get(
            'https://api.github.com/repos/dwi-wijaya/admin-dwiwijaya.com/commits',
            {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN_PERSONAL}`,
                },
            }
        );

        const commits = response.data;

        if (commits && commits.length > 0) {
            return commits[0].commit.author.date;
        }
        return null;
    } catch (error) {
        console.error('Error fetching commit date:', error);
        return null;
    }
}