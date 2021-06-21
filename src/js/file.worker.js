let files;
let file_number = 0;
let index;

self.addEventListener('message', function (e) {

    files = e.data.data;

    index = e.data.index;

    file_number = files.length;

    handleStr();
})

function handleStr() {
    let table = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onloadend = (event) => {
            let str = event.target.result;

            str = str.replace(/\r\n|\r|\n/g, "<br>");
            const strArr = str.split("<br>");

            for (let idx = 0; idx < strArr.length; idx++) {
                try {
                    const item = JSON.parse(strArr[idx]);
                    item.TypeMsg = String(item.TypeName);
                    table.push(item)
                } catch (e) {
                    continue;
                }
            }
            file_number--;

            if (file_number === 0) {


                postMessage({ data: table, index: index });
                table = null;
                files = null;
                index = null;
                file_number = null;
            }
        }
        reader.readAsText(file);
    }


}

