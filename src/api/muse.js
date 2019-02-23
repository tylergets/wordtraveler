const findMuse = async (endpoint, word) => {
    const req = await fetch(`https://api.datamuse.com/words?${endpoint}=${word}`)
    const res = await req.json();
    return res;
};

const muse = async (word) => {
    return {
        related: await findMuse("ml", word),
        synonyms: await findMuse("rel_syn", word),
        general: await findMuse("rel_gen", word),
        antonyms: await findMuse("rel_ant", word),
        describes: await findMuse("rel_jja", word),
        adjectives: await findMuse("rel_jjb", word),
        compromises: await findMuse("rel_com", word),
        rhymes: await findMuse("rel_rhy", word),
        homophones: await findMuse("rel_hom", word),
        predecessors: await findMuse("rel_bgb", word),
        followers: await findMuse("rel_bga", word),
        triggers: await findMuse("rel_trg", word),
    }
};

export const finder = muse;