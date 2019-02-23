
const finder = async (word) => {
    const req = await fetch(`https://googledictionaryapi.eu-gb.mybluemix.net/?define=${word}&lang=en`).catch((error) => {
        return error;
    });
    if (req.ok) {
        const res = await req.json();
        return res;
    }
    return null;
};

export const dictionary = finder;