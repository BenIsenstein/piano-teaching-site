import firebase from "firebase/app";
import "firebase/storage";
import firebaseConfig from "./firebaseObject"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref();

// Create a child reference
var imagesRef = storageRef.child('images');
// imagesRef now points to 'images'

// Child references can also take paths delimited by '/'
var spaceRef = storageRef.child('images/space.jpg');
// spaceRef now points to "images/space.jpg"
// imagesRef still points to "images"

// Parent allows us to move to the parent of a reference
imagesRef = spaceRef.parent;
// imagesRef now points to 'images'

// Root allows us to move all the way back to the top of our bucket
var rootRef = spaceRef.root;
// rootRef now points to the root

// References can be chained together multiple times
var earthRef = spaceRef.parent.child('earth.jpg');
// earthRef points to 'images/earth.jpg'

// nullRef is null, since the parent of root is null
var nullRef = spaceRef.root.parent;

// Reference's path is: 'images/space.jpg'
// This is analogous to a file path on disk
// spaceRef.fullPath;

// Reference's name is the last segment of the full path: 'space.jpg'
// This is analogous to the file name
// spaceRef.name;

// Reference's bucket is the name of the storage bucket where files are stored
// spaceRef.bucket;

var duckSinkRef = storageRef.child('secondTime.jpg');
let duckBlob = new File(["string"], "name.txt")

(async () => { await duckSinkRef.put(duckBlob) })()