const finder = async (word) => {
    const req = await fetch(`https://googledictionaryapi.eu-gb.mybluemix.net/?define=${word}&lang=en`).catch((error) => {
        return error;
    });
    if (req.ok) {
        const res = await req.json();
        let defs = [];

        for (const property in res.meaning) {
            if (res.meaning.hasOwnProperty(property)) {
                for (const def of res.meaning[property]) {
                    defs.push({
                        type: property,
                        definition: def.definition,
                        example: def.example,
                    })
                }
            }
        }

        return defs;
    }
    return null;
};

export const dictionary = finder;