
import sql from '$lib/server/database';

let sortby = 'containernumber';

export async function load() {
    const rows = await sql`
    SELECT
        containernumber,
        nameofship,
        containersize,
        datecontainershipped
    FROM
        containers
    ORDER BY
        ${sql(sortby)}`;

    console.log({rows});

    return { containers: rows };
}

export const actions = {
    sort: async ({ request }) => {
		const data = await request.formData();
        const newSort = data.get('sortby');
        sortby = newSort;
        return {
            success: true,
            message: 'Sort order changed'
        };
    },

	add: async ({ request }) => {
		const data = await request.formData();
        const containerNumber = data.get('containernumber');
        const nameOfShip = data.get('nameofship');
        const containerSize = data.get('containersize');
        const dateContainerShipped = data.get('datecontainershipped');

        if (containerNumber == 'ERROR') {
            return {
                success: false,
                message: 'Invalid container number'
            };
        }

        await sql`
            INSERT INTO containers
                (containernumber, nameofship, containersize, datecontainershipped)
            VALUES
                (${containerNumber}, ${nameOfShip}, ${containerSize}, ${dateContainerShipped})
        `;
        return {
            success: true,
            message: 'Container added'
        };
    },
};
