
import { grandexchange } from "runescape-api/osrs/index.js"


//const fetch = require('node-fetch');
const api_url = 'https://secure.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=556';

async function test() {
    /*
     const request = await fetch(api_url);
     const json = await request.json();
     const item = json.item;
     console.log(json);
     const {members, id} = item;
     console.log(id);
     console.log(members);
     */
     grandexchange.getItemGraph(556).then(data => {
        console.log(data)
    })
}
test();