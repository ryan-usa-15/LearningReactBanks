





const[first] = ["dog", "lizard", "cat"]


console.log(first)

const[,, third] = ["blue", "green", "yellow"]


console.log(third)




const called = "Tallac";
const elevation = 9738;


const mountain = {
    called,
    elevation, 
    teach() {
        console.log(`Mt. ${this.called} is ${this.elevation} feet tall.`)
    }
}

console.log(mountain.teach())


function directions(...args){

    let [start, ...remaining] = args;
    let [finish, ...stops] = remaining.reverse()

    console.log(`count: ${args.length}`)
    console.log(`start in ${start}`)
    console.log(`destination: ${finish}`)
    console.log(`stops between: ${stops.length}`)



}

directions("Truckee", "Tahoe City", "Sunnyside", "Homewood", "Tahoma");



fetch("https://api.randomuser.me/?nat=US&results=1")
    .then(res => res.json())
    .then(json => json.results)
    .then(console.log)
    .catch(console.error)


const getFakePerson = async function myFunction() {
    try{
        let res = await fetch("https://api.randomuser.me/?nat=US&results=1");
        let {results} = await res.json();
        console.log(results);
        console.log("no error");
    }catch(error){
        console.error(error)
    }

};


getFakePerson();


const getPeople = count =>
    new Promise((resolves, rejects) =>{

        const api = `https://api.randomuser.me/?nat=US&results=${count}`;
        const request = new XMLHttpRequest();
        request.open("GET", api);
        request.onload = () => 
            request.status === 200
                ? resolves(JSON.parse(request.response).results)
                : rejects(Error(request.statusText));
        request.onerror = error => rejects(err);
        request.send();



    });


    getPeople(5)
    .then(members => console.log(members))
    .catch(error => console.error(`getPeople failed ${error.message}`));


class Vacation {

    constructor (destination, length){
        this.destination = destination;
        this.length = length;
    }

    print(){
        console.log(`${this.destination} will take ${this.length}`);
    }
}

class Expedition extends Vacation{

    constructor(destination, length,gear){
        super(destination, length)
        this.gear = gear;
    }

    print(){
        super.print();
        console.log(`Bring your ${this.gear.join(" and your ")}`);
    }


}

const trip = new Expedition("Mt. Whitney", 3, ["sunglasses", "camera", "trail mix"]);

trip.print();


export const print=(message) => log(message, new Date())

export const log=(message, timestamp) => 
    console.log(`${timestamp.toString()}: ${message}`);





const createScream = function(logger){
    return function(message){
        logger(message.toUpperCase() + "!!!");
    };
};

const scream = createScream(message => console.log(message))

scream("functions can be returned by other functions");


// add to versus concat with copy
let list = [{title: "rad red"}]
const addColor = (title, array) => array.concat({title})
const newlist = addColor("glam green", list)
console.log(newlist.length);
console.log(list.length)

// same thing with spread operator 
const addColorBrief = (title, list) => [...list, {title}]
addColorBrief("royal purple", list)[1].title

// add to actual list not immutable
list.push({title:"mellow yellow"});
console.log(list.length)

let color_lawn = {
    title: "lawn",
    color: "#00FF00",
    rating: 0
}

const rateColor = function(color, rating){
    return Object.assign({}, color, {rating: rating})
};

console.log(rateColor(color_lawn, 5).rating)
console.log(color_lawn.rating)


// ch 3. change one object 
let places = [
    {name: "Yorktown"},
    {name: "Stratford"},
    {name: "Wakefield"}
]

const editName = (oldName, name, arr)=> arr.map(item => (item.name === oldName ? {...item, name}: item))

let updatedPlaces = editName("Stratford", "HB Woodlawn", places);



console.log(updatedPlaces)




// ch. 3 - object to array
const schools = {
    Yorktown: 10, 
    "Washington & Liberty": 2, 
    Wakefield: 5
}
const schoolArray = Object.keys(schools).map(key => ({ 
    name: key, 
    wins: schools[key]
}))

console.log(schoolArray)



// calculate max value with reduce 

const ages = [3, 33, 66, 77, 99, 2, 4, 11, 56]

const max = ages.reduce((max, value) => (value> max? value : max), 0)

console.log(max);


/// array to a hash object 
const colors=[
    {
        id: "xekare",
        title: "rad red",
        rating: 3
    },
    {
        id: "jbwsof",
        title: "big blue",
        rating: 2
    }

]

const hashColors = colors.reduce(
    (hash, {id, title, rating}) => 
        {
            hash[id] = {title, rating};
            return hash
        }, 
    {});

console.log(hashColors)

///////////////////////////////////////////////////////


// #1 nested value retrieval 
const dan = {
    type: "person",
    data: {
        gender: "male",
        info: {
            id: 22, 
            fullname: {
                first: "Dan",
                last: "Deacon"
            }
        }
    }
}

const deepPick = (fields, object = {}) => {
    const [first, ...remaining] = fields.split(".");
    return remaining.length
        ? deepPick(remaining.join("."), object[first]) 
        : object[first];
};

deepPick("type", dan)
deepPick("data.info.fullname.first", dan);


//////// #2 countdown with delay - recursion, higher order function
const countdown = (value, fn, delay = 1000) => {
    fn(value);
    return value > 0
        ? setTimeout(() => countdown(value - 1, fn, delay), delay)
        :value;
};

const log = value => console.log(value);
countdown(10, log);


////////// #3 curry , hold value 

const userLogs = userName => message => 
    console.log(`${userName} -> ${message}`);

const log2 = userLogs("grandpa23")

log2("attempted to hack the president")
log2("attempted to take out the Kremlin")
log2("successfully launched moon bus ")


/////////// #4 reduce remove doubles
const colors2 = ["red", "red", "green", "blue", "green"]
const uniqueColors = colors2.reduce(
    (unique, color)=>
        unique.indexOf(color ) !== -1 ? unique: 
            [...unique, color],
    []
);

console.log(uniqueColors)


/////////// #5 object into an array 
const schools2 = {
    Yorktown: 10, 
    "Washington & Liberty": 2,
    Wakefield: 5
}

const schoolArray2 = Object.keys(schools2)
    .map(key => 
        ({
            name: key, 
            wins: schools2[key]
        })
);

console.log(schoolArray2)

/////////////// #6 Array filter method 
const schools3 = [
    "Yorktown",
    "Washington & Liberty",
    "Wakefield"
]

const cutSchool = function(cut, list){
   

    //console.log(list)
    //console.log(Array.isArray(list))

   return list.filter(school => school !== cut)

}

console.log(cutSchool("Washington & Liberty", schools3).join(", "));


///////////// #7 reduce to find max value 

const nums = [23,345,456,877,4334,124,623,85,97,53,25,9,3];

const maxNum = nums.reduce(
    (max, age) => 
    {
        if(age > max){
            return age
        }else{
            return max;
        }
    }, 0
);

console.log(maxNum);

