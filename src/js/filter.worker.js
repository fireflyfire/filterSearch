
var list;
var filter;
var index;
self.addEventListener('message', function (e) {

    list = e.data.data;
    filter = e.data.filter;
    index = e.data.index;

    handleFilter();
})

function handleFilter() {
    let result = list.filter(item => {
        let res = true;

        for (const key in filter) {
            res = res && item[key].indexOf(filter[key])!=-1;

            if (!res) break;
        }

        return res;
    })

    postMessage({ data: result, index });

    result = null;
    list = null;
    filter = null;
    index = null;
}