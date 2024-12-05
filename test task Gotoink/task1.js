function groupBy(array, groupOptions, filter) {
    const filteredArray = filter ? array.filter(filter) : array;

    const recursiveGroupFunction = (items, keys) => {
        if (keys.length === 0) return items;

        const [currentKey, ...remainingKeys] = keys;

        const grouped = {};

        items.forEach((item) => {
            let groupKey;
            
            if (typeof currentKey === "function") {
                groupKey = currentKey(item) || "undefined";
            } else {
                groupKey = item[currentKey] || "undefined";
            }

            if (!grouped[groupKey]) {
                grouped[groupKey] = [];
            }
            grouped[groupKey].push(item);
        });

        for (const key in grouped) {
            grouped[key] = recursiveGroupFunction(grouped[key], remainingKeys);
        }

        return grouped;
    };

    return recursiveGroupFunction(
        filteredArray,
        Array.isArray(groupOptions) ? groupOptions : [groupOptions]
    );
}

const data = [
    { name: "Alice", age: 25, city: "New York", country: "USA" },
    { name: "Bob", age: 30, city: "Los Angeles", country: "USA" },
    { name: "Charlie", age: 25, city: "London", country: "UK" },
    { name: "David", age: 35, city: "New York", country: "USA" },
    { name: "Eve", age: 35, city: "Paris", country: "France" },
];

console.log(groupBy(data, "country"));

console.log(groupBy(data, ["country", "city"]));

console.log(
 groupBy(data, (person) => (person.age >= 30 ? "30 and above" : "Below 30")));

console.log(
  groupBy(data, ["country", "city"], (item) => item.country === "USA"));
